---
layout: default
title: continuous_move
wikiPageName: Evacuation-continuous_move
wikiPagePath: wiki/Evacuation-continuous_move.md
---

[//]: # (keyword|operator_copy)
[//]: # (keyword|operator_not)
[//]: # (keyword|operator_closest_points_with)
[//]: # (keyword|operator_pyramid)
[//]: # (keyword|operator_simplification)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_shapefile)
[//]: # (keyword|concept_gis)
[//]: # (keyword|concept_agent_movement)
[//]: # (keyword|concept_skill)
# continuous_move


_Author : Patrick Taillandier_

A 3D model which show how to represent an evacuation system with obstacles, cohesion factor and velocity. The people are placed randomly and have to escape by going to a target point


![F:\Gama\GamaWiki\resources\images\modelLibraryScreenshots\Toy Models\Evacuation\Evacuation continuous_move\map-10.png](F:\Gama\GamaWiki\resources\images\modelLibraryScreenshots\Toy Models\Evacuation\Evacuation continuous_move\map-10.png)

Code of the model : 

```
model continuous_move 
global { 
	//Shapefile of the buildings
	file building_shapefile <- file("../includes/building.shp");
	//Shape of the environment
	geometry shape <- envelope(building_shapefile);
	int maximal_turn <- 90; //in degree
	int cohesion_factor <- 10;
	//Size of the people
	float people_size <- 2.0;
	//Space without buildings
	geometry free_space;
	//Number of people agent
	int nb_people <- 500;
	//Point to evacuate
	point target_point <- {world.location.x, 0};
	init { 
		
		free_space <- copy(shape);
		//Creation of the buildinds
		create building from: building_shapefile {
			//Creation of the free space by removing the shape of the different buildings existing
			free_space <- free_space - (shape + people_size);
		}
		//Simplification of the free_space to remove sharp edges
		free_space <- free_space simplification(1.0);
		//Creation of the people agents
		create people number: nb_people {
			//People agents are placed randomly among the free space
			location <- any_location_in(free_space);
			target_loc <-  target_point;
		} 		 	
	}	
}
//Species which represent the building 
species building {
	//Height of the buildings
	float height <- 3.0 + rnd(5);
	aspect default {
		draw shape color: #gray depth: height;
	}
}
//Species people which move to the evacuation point using the skill moving
species people skills:[moving]{
	//Target point to evacuate
	point target_loc;
	//Speed of the agent
	float speed <- 0.5 + rnd(1000) / 1000;
	//Velocity of the agent
	point velocity <- {0,0};
	//Direction of the agent taking in consideration the maximal turn an agent is able to make
	int heading max: heading + maximal_turn min: heading - maximal_turn;
	
	//Size of the agent
	float size <- people_size;
	rgb color <- rgb(rnd(255),rnd(255),rnd(255));
		
	//Reflex to kill the agent when it has evacuated the area
	reflex end when: location distance_to target_loc <= 2 * people_size{
		write name + " is arrived";
		do die;
	}
	//Reflex to compute the velocity of the agent considering the cohesion factor
	reflex follow_goal  {
		velocity <- velocity + ((target_loc - location) / cohesion_factor);
	}
	//Reflex to apply separation when people are too close from each other
	reflex separation {
		point acc <- {0,0};
		ask (people at_distance size)  {
			acc <- acc - (location - myself.location);
		}  
		velocity <- velocity + acc;
	}
	//Reflex to avoid the different obstacles
	reflex avoid { 
		point acc <- {0,0};
		list<building> nearby_obstacles <- (building at_distance people_size);
		loop obs over: nearby_obstacles {
			acc <- acc - (obs.location - location);
		}
		velocity <- velocity + acc; 
	}
	//Reflex to move the agent considering its location, target and velocity
	reflex move {
		point old_location <- copy(location);
		do goto target: location + velocity ;
		if (not empty(building overlapping self )) {
			location <- point((location closest_points_with free_space)[1]);
		}
		velocity <- location - old_location;
	}	
	aspect default {
		draw pyramid(size) color: color;
		draw sphere(size/3) at: {location.x,location.y,size} color: color;
	}
}

experiment main type: gui {
	parameter "nb people" var: nb_people min: 1 max: 1000;
	output {
		display map type: opengl camera_pos: {world.location.x,-world.shape.height*1.5,70}
                        camera_look_pos:{world.location.x,0,0}    {
			image '../images/soil.jpg';
			species building refresh: false;
			species people;
			graphics "exit" refresh: false {
				draw sphere(2 * people_size) at: target_point color: #green;	
			}
		}
	}
}

```
