---
title:  Boids With Flocks
---

[//]: # (keyword|operator_copy)
[//]: # (keyword|operator_triangle)
[//]: # (keyword|operator_buffer)
[//]: # (keyword|operator_polygon)
[//]: # (keyword|operator_convex_hull)
[//]: # (keyword|operator_solid)
[//]: # (keyword|operator_intersects)
[//]: # (keyword|operator_towards)
[//]: # (keyword|operator_sin)
[//]: # (keyword|operator_simple_clustering_by_distance)
[//]: # (keyword|statement_release)
[//]: # (keyword|statement_capture)
[//]: # (keyword|statement_event)
[//]: # (keyword|constant_#lightblue)
[//]: # (keyword|concept_gui)
[//]: # (keyword|concept_skill)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_multi_level)
[//]: # (keyword|concept_clustering)


_Author : _

This model shows the movement of boids following a goal, and creating without their own volonty, a flock . 


Imported model : 

```

model boids 
global torus: torus_environment{ 
	//Number of boids that will be created
	int number_of_agents <- 50 min: 1 max: 1000000;
	//Number of obstacles for the boids movement to represent
	int number_of_obstacles <- 0 min: 0;
	//Maximal speed of the boids
	float maximal_speed <- 15.0 min: 0.1 max: 15.0;
	//Factors for the group of boids
	int cohesion_factor <- 200;
	int alignment_factor <- 100; 
	//Variables for the movement of the boids
	float minimal_distance <- 10.0; 
	int maximal_turn <- 45 min: 0 max: 359; 
	
	int width_and_height_of_environment <- 1000;  
	bool torus_environment <- false; 
	bool apply_cohesion <- true ;
	bool apply_alignment <- true ;
	bool apply_separation <- true;
	bool apply_avoid <- true;  
	bool apply_wind <- true;   
	bool moving_obstacles <- false;   
	int bounds <- int(width_and_height_of_environment / 20); 
	//Vector for the wind
	point wind_vector <- {0,0}; 
	list images of: image_file <- [file('../images/bird1.png'),file('../images/bird2.png'),file('../images/bird3.png')]; 
	int xmin <- bounds;   
	int ymin <- bounds;  
	int xmax <- (width_and_height_of_environment - bounds);     
	int ymax <- (width_and_height_of_environment - bounds);   
	
	//Action to move the goal to the mouse location
	action move_goal(point mouse) {
		ask first(boids_goal) {
			do goto target: mouse speed: 30;
		}
	}
	
	geometry shape <- square(width_and_height_of_environment);
	
	init { 
		//Create the boids agents
		create boids number: number_of_agents { 
			 location <- {rnd (width_and_height_of_environment - 2) + 1, rnd (width_and_height_of_environment -2) + 1 };
		} 
		//Create the obstacles agents
		create obstacle number: number_of_obstacles {
			location <- {rnd (width_and_height_of_environment - 2) + 1, rnd (width_and_height_of_environment -2) + 1 }; 
		}
		//Create the goal that boids will follow
		create  boids_goal;	
	}	
}

//Species boids goal which represents the goal that will be followed by boids agents using the skill moving
species boids_goal skills: [moving] {
	float range  <- 20.0;
	
	//If the mouse is not used, then the goal just wander
	reflex wander {  
		do  wander amplitude: 45 speed: 20;  
	}
	
	aspect default {
		draw circle(10) color: #red ;
		draw circle(40) color: #orange empty: true;
	}
} 
//Species boids which represents the boids agents whom follow the boid goal agents, using the skill moving
species boids skills: [moving] {
	//Speed of the boids agents
	float speed max: maximal_speed <- maximal_speed;
	//Range used to consider the group of the agent
	float range <- minimal_distance * 2;
	point velocity <- {0,0};
		
	//Reflex used when the separation is applied to change the velocity of the boid
	reflex separation when: apply_separation {
		point acc <- {0,0};
		ask (boids overlapping (circle(minimal_distance)))  {
			acc <- acc - ((location) - myself.location);
		}  
		velocity <- velocity + acc;
	}
	
	//Reflex to align the boid with the other boids in the range
	reflex alignment when: apply_alignment {
		list others  <- ((boids overlapping (circle (range)))  - self);
		point acc <- mean (others collect (each.velocity)) - velocity;
		velocity <- velocity + (acc / alignment_factor);
	}
	 
	//Reflex to apply the cohesion of the boids group in the range of the agent
	reflex cohesion when: apply_cohesion {
		list others <- ((boids overlapping (circle (range)))  - self);
		point mass_center <- (length(others) > 0) ? mean (others collect (each.location)) : location;

		point acc <- mass_center - location;
		acc <- acc / cohesion_factor; 
		velocity <- velocity + acc;   
	}
	
	//Reflex to avoid the obstacles
	reflex avoid when: apply_avoid { 
		point acc <- {0,0};
		list&lt;obstacle> nearby_obstacles <- (obstacle overlapping (circle (range)) );
		loop obs over: nearby_obstacles {
			acc <- acc - ((location of obs) - my (location));
		}
		velocity <- velocity + acc; 
	}
	
	//action to represent the bounding of the environment considering the velocity of the boid
	action bounding {
		if  !(torus_environment) {
			if  (location.x) < xmin {
				velocity <- velocity + {bounds,0};
			} else if (location.x) > xmax {
				velocity <- velocity - {bounds,0};
			}
			
			if (location.y) < ymin {
				velocity <- velocity + {0,bounds};
			} else if (location.y) > ymax {
				velocity <- velocity - {0,bounds};
			}
			
		}
	}
	//Reflex to follow the goal 
	reflex follow_goal {
		velocity <- velocity + ((first(boids_goal).location - location) / cohesion_factor);
	}
	//Reflex to apply the wind vector on the velocity
	reflex wind when: apply_wind {
		velocity <- velocity + wind_vector;
	}
	
	//Action to move the agent  
	action do_move {  
		if (((velocity.x) as int) = 0) and (((velocity.y) as int) = 0) {
			velocity <- {(rnd(4)) -2, (rnd(4)) - 2};
		}
		point old_location <- copy(location);
		do goto target: location + velocity;
		velocity <- location - old_location;
	}
	
	//Reflex to apply the movement by calling the do_move action
	reflex movement {
		do do_move;
	}
	
	aspect image {
		draw (images at (rnd(2))) size: {50,50} rotate: heading ;      
	}
	aspect circle { 
		draw circle(15)  color: #red;
	}
	
	aspect default { 
		draw circle(20) color: #lightblue empty: true;
	}
} 

//Species obstacle that represents the obstacles avoided by the boids agents using the skill moving
species obstacle skills: [moving] {
	float speed <- 2.0;
	geometry shape <- triangle(15);
	
	//Reflex to move the obstacles if it is available
	reflex move_obstacles when: moving_obstacles {
		//Will make the agent go to a boid with a 50% probability
		if flip(0.5)  
		{ 
			do goto target: one_of(boids);
		} 
		else{ 
			do wander amplitude: 360;   
		}
	}
	aspect default {
		draw  triangle(20) color: #black ;
	}

}


experiment boids_gui type: gui {
	parameter 'Number of agents' var: number_of_agents;
	parameter 'Number of obstacles' var: number_of_obstacles;
	parameter 'Maximal speed' var: maximal_speed;
	parameter 'Cohesion Factor' var: cohesion_factor;
	parameter 'Alignment Factor' var: alignment_factor; 
	parameter 'Minimal Distance'  var: minimal_distance; 
	parameter 'Maximal Turn'  var: maximal_turn; 
	parameter 'Width/Height of the Environment' var: width_and_height_of_environment ;  
	parameter 'Toroidal Environment ?'  var: torus_environment ; 
	parameter 'Apply Cohesion ?' var: apply_cohesion ;
	parameter 'Apply Alignment ?' var: apply_alignment ;   
	parameter 'Apply Separation ?' var: apply_separation ;   
	parameter 'Apply Avoidance ?' var: apply_avoid ;   
	parameter 'Apply Wind ?' var: apply_wind ;     
	parameter 'Moving Obstacles ?' var: moving_obstacles  ;    
	parameter 'Direction of the wind' var: wind_vector ;  
	
	//Minimum duration of a step to better see the movements
	float minimum_cycle_duration <- 0.01;

	output {
		display Sky  background: #blue type: opengl { 
			image '../images/sky.jpg' refresh: false;
			species boids aspect: image trace: 10 fading: true ;
			species boids_goal;
			species obstacle;
			//Event to call the action move_goal in global if the mouse move within the experiment
			event mouse_move action: move_goal;
		}

	}
}
```


Code of the model : 

```
model boids_flock
//Import the boids model
import "Boids.gaml"
global {
	//Size of the boids
	float boids_size <- float(3);
	//Shape of the boids
	geometry boids_shape <- circle(boids_size);
	//Separation between boids
	float boids_separation <- 4 * boids_size;
	//Distance to allow creation of the flock 
	int flock_creation_distance <- int(boids_separation + 1);
	//Minimum number of member among a flock
	int min_group_member <- 3;
	//Frequency of update for the flock
	int update_frequency <- 10;
	//Frequency of merge for the flock
	int merge_frequency <- 10;
	//Allow the creation of flock
	bool create_flocks <- false;
	//Perception range of the boids
	int base_perception_range <- int(xmax / 100) min: 1;
	
	init {
		//Creation of the different agents viewer
		create boids_agents_viewer;
		create flock_agents_viewer;
		create boids_in_flock_viewer;
	}
	//Reflex to create the flocks if it is available
	reflex create_flocks when: create_flocks {
		
		if (length(boids) > 1) {
			//Clustering by distance of the boids to determine the satisfying boids groups
			list&lt;list&lt;boids>> satisfying_boids_groups <- (boids.population simple_clustering_by_distance flock_creation_distance) where ((length(each)) > min_group_member);
			loop one_group over: satisfying_boids_groups {
				
				geometry potential_flock_polygon <- convex_hull(solid(polygon(one_group collect boids(each).location)) + (base_perception_range + 5));
				//If there is no obstacle between the boids of a potential flock, then the flock is created and all the boids become boids in flock
				if (empty(obstacle overlapping potential_flock_polygon)) {
					create flock {
						capture one_group as: boids_in_flock;
					}
				}

			}

		}

	}

}

//Species flock which represent the flock of boids, using the skill moving
species flock skills: [moving] {
	rgb color <- rgb(rnd(255), rnd(255), rnd(255));
	geometry shape <- polygon(((boids_in_flock))) buffer 10;
	//Range of perception of the flock
	float perception_range <- float(base_perception_range + (rnd(5)));
	//Speed of the flock
	float speed update: mean(boids_in_flock collect each.speed);
	//Reflex to disaggregate the flock if there is a obstacle in the flock
	reflex disaggregate {
		geometry buffered_shape <- shape + perception_range;
		if !(empty(obstacle overlapping buffered_shape)) {
			release members as: boids in: world;
			do die;
		}

	}
	//Reflex to capture the boids nearby in the range of perception with an update_frequency
	reflex capture_nearby_boids when: ((cycle mod update_frequency) = 0) {
		geometry buffered_shape <- shape + perception_range;
		list&lt;boids> nearby_boids <- (boids overlapping buffered_shape);
		if (!(empty(nearby_boids))) {
			geometry new_polygon <- convex_hull(solid(shape + polygon(nearby_boids collect (each.location))));
			if (empty(obstacle overlapping new_polygon)) {
				capture nearby_boids as: boids_in_flock;
			}

		}

	}
	//Reflex to merge the intersecting flocks
	reflex merge_nearby_flocks when: ((cycle mod merge_frequency) = 0) 
	{
		loop f over: (flock) {
			if (f != self and (shape intersects f.shape)) {
				geometry new_shape <- convex_hull(polygon(shape.points + f.shape.points));
				if empty(obstacle overlapping new_shape) {
					list&lt;boids> released_boids;
					ask f {
						release members as: boids in: world returns: released_coms;
						released_boids <- list(released_coms);
						do die;
					}

					if (!empty(released_boids)) {
						capture released_boids as: boids_in_flock;
					}

					shape <- convex_hull(polygon(members collect (boids_in_flock(each).location)));
				}

			}

		}

	}
	//Reflex to make the flock follow the goal
	reflex chase_goal {
		int direction_to_nearest_ball <- (self towards (first(boids_goal)));
		float step_distance <- speed * step;
		float dx <- step_distance * (cos(direction_to_nearest_ball));
		float dy <- step_distance * (sin(direction_to_nearest_ball));
		geometry envelope <- shape.envelope;
		float min_y <- (envelope.points with_min_of (each.y)).y;
		float min_x <- (envelope.points with_min_of (each.x)).x;
		float max_x <- (envelope.points with_max_of (each.x)).x;
		float max_y <- (envelope.points with_max_of (each.y)).y;
		if (((dx + min_x) < xmin) and min_x > xmin) or (((dx + max_x) > xmax) and max_x < xmax) {
			dx <- 0.0;
		}
		if (((dy + min_y) < ymin) and min_y > ymin) or (((dy + max_y) > ymax) and max_y < ymax) {
			dy <- 0.0;
		}
		
		loop com over: boids_in_flock {
			(boids_in_flock(com)).location <- (boids_in_flock(com)).location + { dx, dy };
		}

		shape <- convex_hull(polygon(list(boids_in_flock) collect (each.location)));
	}

	aspect default {
		draw shape color: color;
	}
	//Species boids_in_flock which represents the boids agents captured by the flock
	species boids_in_flock parent: boids {
		float my_age <- 1.0 update: my_age + 0.01;
		reflex separation when: apply_separation {
		}

		reflex alignment when: apply_alignment {
		}

		reflex cohesion when: apply_cohesion {
		}

		reflex avoid when: apply_avoid {
		}

		reflex follow_goal  {
		}

		reflex wind when: apply_wind {
		}

		action do_move {
		}

		reflex movement {
			do do_move;
		}

		aspect default {
			draw circle(my_age) color: ((host as flock).color).darker;
		}

	}

}
//Species flock agents viewer which draw the flock information
species flock_agents_viewer {
	aspect default {
		draw "Flocks: " + (string(length(list(flock)))) at: { width_and_height_of_environment - 810, (width_and_height_of_environment) - 5 } color: #blue size: 80 ;
	}

}
//Species boids agents viewer which draw the boids information
species boids_agents_viewer {
	aspect default {
		draw "Boids: " + (string(length(list(boids)))) at: { width_and_height_of_environment - 810, (width_and_height_of_environment) - 165 } color: #blue size: 80 ;
	}

}

//Species boids_in_flock_viewer which draw the boids in flock information
species boids_in_flock_viewer {
	aspect default {
		draw "Boids in flocks: " + (string(number_of_agents - (length(list(boids))))) at: { width_and_height_of_environment - 810, width_and_height_of_environment - 85 } color:
		#blue size: 80 ;
	}

}


experiment boids_flocks type: gui {
	parameter "Create flock?" var: create_flocks <- true;
	parameter "Number of boids" var: number_of_agents <- 300;
	parameter "Environment size" var: width_and_height_of_environment <- 1600;
	parameter "Moving obstacles?" var: moving_obstacles <- true;
	parameter "Torus environment?" var: torus_environment <- false;
	parameter "Number of obstacles" var: number_of_obstacles <- 5;
	output {
		display default_display {
			species boids_goal;
			species boids aspect: image;
			species obstacle;
			species flock aspect: default transparency: 0.5 {
				species boids_in_flock aspect: default;
			}

			species flock_agents_viewer;
			species boids_agents_viewer;
			species boids_in_flock_viewer;
		}

	}

}
```
