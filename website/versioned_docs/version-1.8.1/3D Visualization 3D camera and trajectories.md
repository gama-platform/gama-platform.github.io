---
title:  3D Camera and Camera Positionning with Boids model
---

[//]: # (keyword|operator_copy)
[//]: # (keyword|operator_triangle)
[//]: # (keyword|operator_hsb)
[//]: # (keyword|operator_sin)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_camera)


_Author : Arnaud Grignard_

Model using the Boids model to represent the flight of boids following a goal and avoiding obstacles.

Five experiments are proposed with differents goals : understanding of the model used (Boids_gui), 3D Display (start), 3D Display with trajectories analysis of boids (trajectory_analysis), one coupling both previous experiments and the time simulated with boids going higher and higher according to the time (SpaceTimeCube) and a model presenting the different views possible in the 3D Display : first person, third person and global view (Multiple view). 


Imported model : 

```
model boids 

//make the environment torus according to the bool variable torus_environment 
global torus: torus_environment{ 
	
	//Variable to represent the number of boids to create
	int number_of_agents <- 10 min: 1 max: 1000000;
	//Variable to represent the number of obstacles to create
	int number_of_obstacles <- 5 min: 0;
	//Variable to represent the maximal speed of the boids agents
	float maximal_speed <- 15.0 min: 0.1 max: 15.0;
	
	//Variables to manage the boids movements
	int cohesion_factor <- 200;
	int alignment_factor <- 100; 
	float minimal_distance <- 10.0; 
	int maximal_turn <- 90 min: 0 max: 359; 
	
	//Variables for the environment 
	int width_and_height_of_environment <- 800;  
	bool torus_environment <- false; 
	bool apply_cohesion <- true ;
	bool apply_alignment <- true ;
	bool apply_separation <- true;
	bool apply_goal <- true;
	bool apply_avoid <- true;  
	bool apply_wind <- true;   
	bool moving_obstacles <- false;   
	
	//Bounds of the environment
	int bounds <- int(width_and_height_of_environment / 20) depends_on: [width_and_height_of_environment]; 
	//Vector to represent the direction of the wind
	point wind_vector <- {0,0}; 
	
	//Variables for the goal : its duration and its location determined randomlly
	int goal_duration <- 30 update: (goal_duration - 1); 
	point goal <- {rnd (width_and_height_of_environment - 2) + 1, rnd (width_and_height_of_environment -2) + 1 }; 
	
	//Images available for the aspect of the boids
	list images of: image_file <- [file('../images/bird1.png'),file('../images/bird2.png'),file('../images/bird3.png')]; 
	
	//Determine the bounding rectangle of the environment
	int xmin <- bounds depends_on: [bounds];    
	int ymin <- bounds depends_on: [bounds];  
	int xmax <- (width_and_height_of_environment - bounds);     
	int ymax <- (width_and_height_of_environment - bounds);   

	geometry shape <- square(width_and_height_of_environment);
	init { 
		create boids number: number_of_agents { 
			 location <- {rnd (width_and_height_of_environment - 2) + 1, rnd (width_and_height_of_environment -2) + 1 };
		} 
				 
		create obstacle number: number_of_obstacles {
			location <- {rnd (width_and_height_of_environment - 2) + 1, rnd (width_and_height_of_environment -2) + 1 }; 
		}
		
		create  boids_goal {
			location <- goal;
		}	
	}	
}


species boids_goal skills: [moving] {
	float range  <- 20.0;
	float size  <- 10.0;
	
	reflex wander {  
		do  wander amplitude: 45 speed: 20;  
		goal <- location;
	}
	
	aspect default {
		draw circle(10) color: #red ;
		draw circle(40) color: #orange empty: true;
	}
} 

species boids skills: [moving] {
	float speed max: maximal_speed <- maximal_speed;
	float range <- minimal_distance * 2;
	int heading ;
	point velocity <- {0,0};
	int size <- 5;
		
	reflex separation when: apply_separation {
		point acc <- {0,0};
		ask (boids overlapping (circle(minimal_distance)))  {
			acc <- acc - ((location) - myself.location);
		}  
		velocity <- velocity + acc;
	}
	
	reflex alignment when: apply_alignment {
		list others  <- ((boids overlapping (circle (range)))  - self);
		point acc <- mean (others collect (each.velocity)) - velocity;
		velocity <- velocity + (acc / alignment_factor);
	}
	 
	reflex cohesion when: apply_cohesion {
		list others <- ((boids overlapping (circle (range)))  - self);
		point mass_center <- (length(others) > 0) ? mean (others collect (each.location)) : location;

		point acc <- mass_center - location;
		acc <- acc / cohesion_factor; 
		velocity <- velocity + acc;   
	}
	
	reflex avoid when: apply_avoid { 
		point acc <- {0,0};
		list&lt;obstacle> nearby_obstacles <- (obstacle overlapping (circle (range)) );
		loop obs over: nearby_obstacles {
			acc <- acc - ((location of obs) - my (location));
		}
		velocity <- velocity + acc; 
	}
	
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
	
	reflex follow_goal when: apply_goal {
		velocity <- velocity + ((goal - location) / cohesion_factor);
	}
	
	reflex wind when: apply_wind {
		velocity <- velocity + wind_vector;
	}
	  
	action do_move {  
		if (((velocity.x) as int) = 0) and (((velocity.y) as int) = 0) {
			velocity <- {(rnd(4)) -2, (rnd(4)) - 2};
		}
		point old_location <- copy(location);
		do goto target: location + velocity;
		velocity <- location - old_location;
	}
	
	reflex movement {
		do do_move;
	}
	
	aspect image {
		draw (images at (rnd(2))) size: 35 rotate: heading color: rgb([0,0,rnd(200) + 55]);      
	}
	aspect circle { 
		draw circle(15) rotate: 90 + heading color: #red;
	}
	
	aspect default { 
		draw triangle(15) rotate: 90 + heading color: #yellow;
	}
} 

species obstacle skills: [moving] {
	float speed <- 2.0;
	geometry shape <- triangle(15);
	
	reflex move_obstacles when: moving_obstacles {
		if flip(0.5)  
		{ 
			do goto target: one_of(boids);
		} 
		else{ 
			do wander amplitude: 360;   
		}
	}
	aspect default {
		draw  triangle(20) color: #yellow ;
	}

	
	aspect geom {
		draw shape color: #yellow;
	}
}


experiment Boids_gui type: gui {
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
	parameter 'Follow Goal ?' var: apply_goal ; 
	parameter 'Apply Avoidance ?' var: apply_avoid ;   
	parameter 'Apply Wind ?' var: apply_wind ;     
	parameter 'Moving Obstacles ?' var: moving_obstacles  ;    
	parameter 'Direction of the wind' var: wind_vector ;  
	
	output {
		display Sky
		{
			image 'background' file:'../images/sky.jpg';
			species boids aspect: image;
			species boids_goal;
			species obstacle;
		}
	}
}
```


Code of the model : 

```

model boidsVisualization

//import everything from Boids model, even the experiments
import "../includes/Boids.gaml"

experiment start type: gui {
	
	//each cycle will have a minimum duration of 0.03 second to slow the experiment allowing a better view of the dynamics
	float minimum_cycle_duration <- 0.03;
	
	//the type opengl allows the 3D Display instead of only 2D
	output {
		display RealBoids  type:opengl z_fighting:false {
			image 'background' file:'../images/sky.jpg';
			species boids aspect: image  position:{0,0,0.1};
			species boids_goal transparency:0.2 position:{0,0,0.1};
			species obstacle position:{0,0,0.1}; 		
		}
	}
}

experiment trajectory_analysis type: gui {
	
	float minimum_cycle_duration <- 0.03;
	output {
		
		display RealBoids  type:opengl {
			image 'background' file:'../images/sky.jpg';
			species boids trace:100{
			    draw triangle(20) rotate: 90 + heading color: hsb (float(heading)/360.0,1.0,1.0) depth:8 ;	
			}
			species boids_goal transparency:0.2 position:{0,0,0.1};
			species obstacle position:{0,0,0.1}; 		
		}
	}
}

experiment SpaceTimeCube type: gui {
	
	float minimum_cycle_duration <- 0.03;
	output {
		display RealBoids  type:opengl {
			image 'background' file:'../images/sky.jpg';
			species boids aspect: image transparency:0.5 position:{0,0,0.11};
			species boids_goal transparency:0.2 position:{0,0,0.1};
			species obstacle position:{0,0,0.1}; 		
		}
		
		display SpaceTimeCubeAll  type:opengl {
			image 'background' file:'../images/sky.jpg';
			species boids trace:100{
			    draw triangle(20) rotate: 90 + heading color: hsb (float(heading)/360.0,1.0,1.0) depth:8 at: {location.x ,location.y,location.z+time};	
			}
			species boids_goal trace:100{
				draw sphere(10) color: #yellow at: {location.x ,location.y,location.z+time};
			}	
		}
				
	}
}

experiment MultipleView type: gui {
	float minimum_cycle_duration <- 0.03;
	output {
		display RealBoids   type:opengl {
			image 'background' file:'../images/sky.jpg';
			species boids aspect: image  transparency:0.5 position:{0,0,0.25};
			species boids_goal transparency:0.2 position:{0,0,0.25};
			species obstacle ;
			species boids  aspect: image transparency:0.2 position:{0,0,0.24};		
		}
		//The facet camera_pos is the position of the camera in the 3D display and the facet camera_look_pos is the position where the camera is looking
		display ThirdPersonn  type:opengl camera_interaction:false camera_pos:{int(first(boids).location.x),int(first(boids).location.y),250} 
		camera_look_pos:{int(first(boids).location.x),(first(boids).location.y),0} camera_up_vector:{0.0,-1.0,0.0} {
		
			image 'background' file:'../images/sky.jpg';
			species obstacle;
			species boids{
			    draw triangle(20) rotate: 90 + heading color: hsb (float(heading)/360.0,1.0,1.0) depth:8 ;	
			}
			species boids_goal{
				draw sphere(10) color: #yellow;
			}	
		}
		
		//The facet camera_up_vector allows the definition of the vector on which the top of the camera point at, it has to be perpendicular to the look vector
		display FirstPerson  type:opengl camera_interaction:false camera_pos:{int(first(boids).location.x),int(first(boids).location.y),10} 
			camera_look_pos:{cos(first(boids).heading)*first(boids).speed+int(first(boids).location.x),
			sin(first(boids).heading)*first(boids).speed+int(first(boids).location.y),10} 
			camera_up_vector:{0.0,0.0,1.0} {	
			image 'background' file:'../images/sky.jpg';
			species obstacle ;
			species boids{
			    draw triangle(20) rotate: 90 + heading color: hsb (float(heading)/360.0,1.0,1.0) depth:8 ;	
			}
			species boids_goal{
				draw sphere(10) color: #yellow;
			}		
		}
	}
}
```
