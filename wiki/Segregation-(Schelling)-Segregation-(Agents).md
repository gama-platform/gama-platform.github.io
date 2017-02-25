---
layout: default
title: segregationAgents
wikiPageName: Segregation-(Schelling)-Segregation-(Agents)
wikiPagePath: wiki/Segregation-(Schelling)-Segregation-(Agents).md
---

[//]: # (keyword|operator_sum)
[//]: # (keyword|statement_remove)
[//]: # (keyword|concept_grid)
# segregationAgents


_Author : _

A model showing the segregation of the people just by putting a similarity wanted parameter using agents to represent the individuals


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
	//Neighbours distance for the perception of the agents
	int neighbours_distance <- 2 max: 10 min: 1 parameter: "Distance of perception:" category: "Population";
	//Number of people agents
	int number_of_people <- 0;
	//Number of happy people
	int sum_happy_people <- 0 update: all_people count (each.is_happy);
	//Number of similar neighbours
	int sum_similar_neighbours <- 0 update: sum (all_people collect each.similar_nearby);
	//Number of neighbours
	int sum_total_neighbours <- 1 update: sum (all_people collect each.total_nearby) min: 1;
	//List of all the places
	list<agent> all_places;
	//List of all the people
	list<base> all_people;  
	
	//Action to write the description of the model in the console
	action description {
		write
		"\\n\\u25B6 Description. \\n\\u25B6 Thomas Schelling model of residential segregation is a classic study of the effects of local decisions on global dynamics. Agents with mild preferences for same-type neighbors, but without preferences for segregated neighborhoods, can wind up producing complete segregation.\\n\\u25B6 In this model, agents populate a grid with a given *density*. They are in two different states : happy when the percentage of same-color neighbours is above their *desired percentage of similarity*; unhappy otherwise. In the latter case, they change their location randomly until they find a neighbourhood that fits their desire. \\n\\u25B6 In addition to the previous parameter, one can adjust the *distance of perception* (i.e.  the distance at which they consider other agents as neighbours) of the agents to see how it affects the global process. ";
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
	//List of all the neighbours agents
	list<base> my_neighbours;
	//computation of the similar neighbours
	int similar_nearby -> {
		(my_neighbours count (each.color = color))
	};
	//Computation of the total neighbours nearby
	int total_nearby -> {
		length (my_neighbours)
	};
	//Boolean to know if the agent is happy or not
	bool is_happy -> {similar_nearby >= (percent_similar_wanted * total_nearby )} ;
}

```


Code of the model : 

```

model segregation

//import the Common Schelling Segregation model
import "../include/Common Schelling Segregation.gaml"

global {
	//List of all the free places
	list<space> free_places ;
	//List of all the places
	list<space> all_places ;
	//Shape of the world
	geometry shape <- square(dimensions);
	
	//Action to initialize the people agents
	action initialize_people { 
		create people number: number_of_people; 
		all_people <- people as list ;  
	} 
	//Action to initialize the places
	action initialize_places { 
		all_places <- shuffle (space);
		free_places <- all_places;  
	} 
}
//Grid to discretize space, each cell representing a free space for the people agents
grid space width: dimensions height: dimensions neighbors: 8 use_regular_agents: false frequency: 0{
	rgb color  <- #black;
}

//Species representing the people agents
species people parent: base  {
	//Color of the people agent
	rgb color <- colors at (rnd (number_of_groups - 1));
	//List of all the neighbours of the agent
	list<people> my_neighbours -> {people at_distance neighbours_distance} ;
	//Cell representing the place of the agent
	space my_place;
	init {
		//The agent will be located on one of the free places
		my_place <- one_of(free_places);
		location <- my_place.location; 
		//As one agent is in the place, the place is removed from the free places
		free_places >> my_place;
	} 
	//Reflex to migrate the people agent when it is not happy 
	reflex migrate when: !is_happy {
		//Add the place to the free places as it will move to another place
		free_places << my_place;
		//Change the place of the agent
		my_place <- one_of(free_places);
		location <- my_place.location; 
		//Remove the new place from the free places
		free_places >> my_place;
	}
	
	aspect default{ 
		draw circle (0.5) color: color; 
	}
}



experiment schelling type: gui {	
	output {
		display Segregation {
			species people;
		}	
		display Charts {
			chart "Proportion of happiness" type: pie background: #gray style: exploded position: {0,0} size: {1.0,0.5}{
				data "Unhappy" value: number_of_people - sum_happy_people color: #green;
				data "Happy" value: sum_happy_people color: #yellow;
			}
			chart "Global happiness and similarity" type: series background: #gray axes: #white position: {0,0.5} size: {1.0,0.5} {
				data "happy" color: #blue value:  (sum_happy_people / number_of_people) * 100 style: spline ;
				data "similarity" color: #red value:  (sum_similar_neighbours / sum_total_neighbours) * 100 style: step ;
			}
		}
	}
}
```
