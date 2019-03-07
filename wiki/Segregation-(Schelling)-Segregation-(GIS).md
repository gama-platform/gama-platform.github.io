---
layout: default
title: segregationGIS
wikiPageName: Segregation-(Schelling)-Segregation-(GIS)
wikiPagePath: wiki/Segregation-(Schelling)-Segregation-(GIS).md
---
[//]: # (keyword|operator_sum)
[//]: # (keyword|statement_remove)
[//]: # (keyword|constant_#lightgray)
[//]: # (keyword|concept_gis)
[//]: # (keyword|concept_shapefile)
# segregationGIS


_Author : _

A model showing the segregation of the people just by putting a similarity wanted parameter using agents to represent the individuals and GIS file for the places


Imported model : 

```
model segregation_base

global {
	//Different colors for the group
	rgb color_1 <- rgb ("yellow") parameter: "Color of group 1:" category: "User interface";
	rgb color_2 <- rgb ("red") parameter: "Color of group 2:" category: "User interface";
	rgb color_3 <- rgb ("blue") parameter: "Color of group 3:" category: "User interface";
	rgb color_4 <- rgb ("orange") parameter: "Color of group 4:" category: "User interface";
	rgb color_5 <- rgb ("green") parameter: "Color of group 5:" category: "User interface";
	rgb color_6 <- rgb ("pink") parameter: "Color of group 6:" category: "User interface";   
	rgb color_7 <- rgb ("magenta") parameter: "Color of group 7:" category: "User interface";
	rgb color_8 <- rgb ("cyan") parameter: "Color of group 8:" category: "User interface";
    list colors <- [color_1, color_2, color_3, color_4, color_5, color_6, color_7, color_8] of: rgb;

	
	//Number of groups
	int number_of_groups <- 2 max: 8 parameter: "Number of groups:" category: "Population";
	//Density of the people
	float density_of_people <- 0.7 parameter: "Density of people:" category: "Population" min: 0.01 max: 0.99;
	//Percentage of similar wanted for segregation
	float percent_similar_wanted <- 0.5 min: float (0) max: float (1) parameter: "Desired percentage of similarity:" category: "Population";
	//Dimension of the grid
	int dimensions <- 40 max: 400 min: 10 parameter: "Width and height of the environment:" category: "Environment";
	//Neighbors distance for the perception of the agents
	int neighbors_distance <- 2 max: 10 min: 1 parameter: "Distance of perception:" category: "Population";
	//Number of people agents
	int number_of_people <- 0;
	//Number of happy people
	int sum_happy_people <- 0 update: all_people count (each.is_happy);
	//Number of similar neighbors
	int sum_similar_neighbors <- 0 update: sum (all_people collect each.similar_nearby);
	//Number of neighbors
	int sum_total_neighbors <- 1 update: sum (all_people collect each.total_nearby) min: 1;
	//List of all the places
	list<agent> all_places;
	//List of all the people
	list<base> all_people;  
	
	//Action to write the description of the model in the console
	action description {
		write
		"\\n\\u25B6 Description. \\n\\u25B6 Thomas Schelling model of residential segregation is a classic study of the effects of local decisions on global dynamics. Agents with mild preferences for same-type neighbors, but without preferences for segregated neighborhoods, can wind up producing complete segregation.\\n\\u25B6 In this model, agents populate a grid with a given *density*. They are in two different states : happy when the percentage of same-color neighbors is above their *desired percentage of similarity*; unhappy otherwise. In the latter case, they change their location randomly until they find a neighborhood that fits their desire. \\n\\u25B6 In addition to the previous parameter, one can adjust the *distance of perception* (i.e.  the distance at which they consider other agents as neighbors) of the agents to see how it affects the global process. ";
	}
	//Initialization of the model
	init {
		//Write the description of the model 
		do description;
		//Initialization of the places
		do initialize_places;
		//Computation of the number of people according to the density of people
		number_of_people <- int( length (all_places) * density_of_people);
		//Initialization of the people
		do initialize_people;
	}
	//Action to initialize places defined in the subclasses
	action initialize_places virtual: true;
	//Action to initialize people in the subclasses
	action initialize_people virtual: true;
}

//Species base representing the people agents
species base {
	rgb color;
	//List of all the neighbors agents
	list<base> my_neighbors;
	//computation of the similar neighbors
	int similar_nearby -> {
		(my_neighbors count (each.color = color))
	};
	//Computation of the total neighbors nearby
	int total_nearby -> {
		length (my_neighbors)
	};
	//Boolean to know if the agent is happy or not
	bool is_happy -> {similar_nearby >= (percent_similar_wanted * total_nearby )} ;
}

```


Code of the model : 

```
model segregation

//Import the model Common Schelling Segregation
import "../include/Common Schelling Segregation.gaml" 
global {
	//List of all the free places
	list<space> free_places  ;  
	//List of all the places
	list<space> all_places ;
	//Neighbors distance for the perception of an agent
	int neighbors_distance <- 50 min: 1 parameter: "Distance of perception:" category: "Population" max: 1000;
	//Shapefile to load
	file shape_file_name <- file("../gis/nha2.shp") parameter: "Shapefile to load:" category: "GIS specific";
	//Shape of the environment
	geometry shape <- envelope(shape_file_name);
	//Square meters per people in m2
	int square_meters_per_people <- 200 parameter: "Occupancy of people (in m2):" category: "GIS specific";
	
	//Action to initialize people agents
	action initialize_people { 
		//Create all the places with a surface given within the shapefile
		create space from: shape_file_name with: [surface :: float(read("AREA"))];
		all_places  <- shuffle(space);
		//Compute the number of people to create considering the density of people
		number_of_people <- int( density_of_people * sum (all_places collect (each.capacity))); 
		create people number: number_of_people;  
	    all_people <- people as list ; 
	    //Move all the people to a new place
		ask people  {  
			do move_to_new_place;       
		}   
	}      
	//Action to initialize the places
	action initialize_places {}   
	
} 

//Species people representing the people
species people parent: base { 
	//Size of the people agent
	float size const: true <- 2.0;
	//Color of the people agent  
	rgb color const: true <- colors at (rnd (number_of_groups - 1)); 
	int red const: true <- (color as list) at 0; 
	int green const: true <- (color as list) at 1;  
	int blue const: true <- (color as list) at 2;  
	//Building in which the agent lives
	space current_building <- nil;
	//List of all the neighbor people agents
	list<people> my_neighbors -> {people at_distance neighbors_distance}; 
	
	//Action to move to a new place
	action move_to_new_place {  
		current_building <- (shuffle(all_places) first_with (((each).capacity) > 0));
		ask current_building {
			do accept one_people: myself;   
		}
	}
	//Reflex to migrate to another place if the agent isn't happy
	reflex migrate when: !is_happy {
		if current_building != nil {
			ask current_building { 
				do remove_one one_people: myself;
			}
		} 
		do move_to_new_place;
	}

	aspect simple {
		draw circle(5) color: color;
	}
}

//Species space representing a space for a people agent to live in
species space {	
	//List of all the people agents living within
	list<people> insiders;
	rgb color <- rgb(255, 255, 255); 
	//Surface of the place
	float surface;
	//Capacity of the place
	int capacity  <- 1 + int(surface / square_meters_per_people);
	
	//Action to accept a people agent  
	action accept (people one_people) {
		add one_people to: insiders;
		location of one_people <- any_location_in(shape);
		capacity <- capacity - 1;
	}
	//Action to remove a people agent
	action remove_one (people one_people){
		remove one_people from: insiders;
		capacity <- capacity + 1;
	}
	aspect simple {
		color <- empty(insiders) ? #white : rgb ([mean (insiders collect each.red), mean (insiders collect each.green), mean (insiders collect each.blue)]);
		draw  square(40) color: color;
	}
	aspect gis {
		color <- empty(insiders) ? #white : rgb( [mean (insiders collect each.red), mean (insiders collect each.green), mean (insiders collect each.blue)]);
		draw shape color: color border: #black;
	} 
	aspect highlighted {
		color <- #blue;
		draw shape+10 color: color;
	}
}


experiment schelling type: gui {	
	output {
		display Town_display  {
			species space aspect: gis;
			species people  aspect: simple;
		}
		display Charts {
			chart "Proportion of happiness" type: histogram background: #lightgray gap:0.05 position: {0,0} size: {1.0,0.5}{
				data "Unhappy" value: number_of_people - sum_happy_people color: #green;
				data "Happy" value: sum_happy_people color: #yellow ;
			}
			chart "Global happiness and similarity" type: series background: #lightgray axes: #white position: {0,0.5} size: {1.0,0.5} {
				data "happy" color: #blue value:  ((sum_happy_people * 100) / number_of_people)  style: spline ;
				data "similarity" color: #red value:  (sum_similar_neighbors / sum_total_neighbors) * 100 style: step ;
			}
		}
	}
}
```
