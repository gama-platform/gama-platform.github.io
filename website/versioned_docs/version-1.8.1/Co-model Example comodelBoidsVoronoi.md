---
title:  Comodel of Boids and Voronoi
---

[//]: # (keyword|operator_copy)
[//]: # (keyword|operator_triangle)
[//]: # (keyword|operator_using)
[//]: # (keyword|operator_closest_to)
[//]: # (keyword|operator_accumulate)
[//]: # (keyword|statement_event)
[//]: # (keyword|statement_agents)
[//]: # (keyword|constant_#lightblue)
[//]: # (keyword|type_topology)
[//]: # (keyword|concept_comodel)


_Author : HUYNH Quang Nghi_

Co-model example : Voronoi applied on Boids.


Imported models : 

```

model voronoi
 
global {
	// Parameters 
	//Number of points
	int num_points <- 4 min: 1 max: 1000;
	//Size of the environment
	int env_width <- 100 min: 10 max: 400;
	int env_height <- 100 min: 10 max: 400;
	
	// Environment
	geometry shape <- rectangle(env_width, env_height);
	
	init { 
		write 'This model shows how Voronoi-like shapes can be drawn on a regular surface. A set of mobile agents is placed on a grid. Each agent possesses an attribute called *inside_color*. Each step, the agents move randomly and the grid cells paint themselves using the *inside_color* of the nearest agent. Dynamical boundaries then appear on the screen without any further calculations.';
		//Creation of all the points
		create center number: num_points ;  
	}   
} 
//Grid for the voronoi clustering
grid cell width: env_width height: env_height neighbors: 8 use_regular_agents: false {
	// Note: since GAMA 1.7, the topology needs to be specified for this computation to use continuous distances
	center closest_center <- nil update: (center closest_to self.location) using topology(world);
	rgb color <- #white update: (closest_center).color;
}
//Species representing the center of a Voronoi point
species center skills: [moving] { 
	rgb color <- rgb([rnd (255),rnd (255),rnd (255)]); 
	//Make the center of the cluster wander in the environment       
	reflex wander {
		do wander amplitude: 90;
	}  
	aspect base {
		draw square(1.0) color: color;
	}
}


experiment voronoi type: gui{ 
	parameter 'Number of points:' var: num_points;
	parameter 'Width of the environment:' var: env_width;
	parameter 'Height of the environment:' var: env_height;
	
	output {
		display Voronoi type: opengl {
			grid cell  ;
			species center aspect: base ;
		}
	}	
}
```


```
model Voronoi_coupling

import "../../../Toy Models/Voronoi/Voronoi.gaml"


experiment Voronoi_coupling_exp type:gui  parent:voronoi{
	
	list&lt;center> getCenter{
		return list(center);
	}
	list&lt;cell> getCell{
		return list(cell);
	}
	
	
	output{
	}
}
```


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


```
model Boids_coupling

import "../../../Toy Models/Boids/models/Boids.gaml"


experiment Boids_coupling_exp type:gui  parent:boids_gui{
	
	list&lt;boids_goal> getBoids_goal{
		return list(boids_goal);
	}
	
	list&lt;boids> getBoids{
		return list(boids);
	}
	
	
	output{
	}
}
```


Code of the model : 

```
model comodelBoidsVoronoi
import "Boids_coupling.gaml" as myBoids
import "Voronoi_coupling.gaml" as myVoronoi


global
{
	// set the bound of the environment
	geometry shape <- envelope(100);
	
	init
	{	
		//create experiment from micro-model myBoids
		create myBoids.Boids_coupling_exp with: [shape::square(0.5), width_and_height_of_environment::100, number_of_agents::100];
		//create experiment form micro-model myVoronoi
		create myVoronoi.Voronoi_coupling_exp with:[num_points::100, env_width::100, env_height::100];
	}

	reflex simulate_micro_models
	{
		//tell myBoids to step a cycle
		ask (myBoids.Boids_coupling_exp collect each.simulation){ do _step_;}
		//get all boids's location into a list
		list&lt;point> theLocations<-(myBoids.Boids_coupling_exp accumulate each.getBoids()) collect each.location;
		//myVoronoi do a step with the location of their agent from the location list above 
		ask (myVoronoi.Voronoi_coupling_exp collect each.simulation){ ask center{location<-theLocations at (int(self)); }do _step_;}
	}

}

experiment comodel_Boids_Voronoi_Exp type: gui
{
	output
	{
		display "comodel_disp" 
		{
			agents "cell" value: (myVoronoi.Voronoi_coupling_exp accumulate each.getCell());
			
			agents "boids_goal" value: (myBoids.Boids_coupling_exp accumulate each.getBoids_goal()) {draw circle(5) color:#red;}
			
			agents "boids" value: (myBoids.Boids_coupling_exp accumulate each.getBoids()) {draw circle(1) color:#blue;}
			
		}

	}

}
```
