---
layout: default
title: 4. Use of a graph to constraint the movements of people]
wikiPageName: LuneraysFlu_step4
wikiPagePath: wiki/LuneraysFlu_step4.md
---

# 4. Use of a graph to constraint the movements of people]
This fourth step illustrates how to use a graph to constraint the movements of agents


![images/luneray4.tiff](resources/images/tutorials/luneray4.tiff)




## Formulation
  * Define a new global variable: the road network (graph).
  * Build the road network graph from the road agents
  * Add new attribute to the people agents (target and in_my_house)
  * Define a new reflex for people agents: stay.
  * Modify the move reflex of the people agents.

## Model Definition

### global section

#### global variables

In this model, we want that people agents move from buildings to buildings by using the shortest path in the road network. In order to compute this shortest path, we need to use a graph structure.

We thus define a new global variable called _road\_network_ of type _graph_ that will represent the road network.

```
global{
	//... other attributes
	graph road_network;
	
	//... init
}
```

In order to compute the graph from the road network, we use, just after having creating the road agents, the [as_edge_graph](Operators#as_edge_graph) operator. This operator automatically built a graph from a set of polylines. Each extremity point of the lines will become a node in the graph, and each polyline an edge. By default, the graph is not oriented and the weights of the edges are the perimeters of the polylines. It is of course possible to change through the use of some operators.  

```
global {
	// world variable definition

	init{
		create road from: roads_shapefile;
		road_network <- as_edge_graph(road);
		create building from: buildings_shapefile;
		create people number:nb_people {
			my_home <- one_of(building);
			location <- any_location_in(my_home);
		}
		ask nb_infected_init among people {
			is_infected <- true;
		}	
	}
}
```

### people species

We want to modify the behavior of the people agents in order to make them move from buildings to buildings by using the shortest path in the road network. In addition, we want to integrate the fact that people will stay in the building a certain time before moving to another building. This staying time will depend if the agent is in its house or in another house (different probabilities of moving). 

### variables
In order to implement this behavior, we will add two variables to our people species:
   * _target_ of type _point_ that will be the location where the agent wants to go
   * _in\_my\_house_ of type _bool_ that will just say if the agent is in its house or not. At the beginning the agent will be in its house, so we initialize this variable by _true_.

```
species people skills:[moving]{
	//...the other attributes
	point target;
	bool in_my_house <- true;
	//....
}
```

### behavior

First, we add a new reflex called _stay_ that will be activated when the agent is in a house (i.e. its target is null) and that will define if the agent has to go or not. If the agent has to go, it will randomly choose a new target (a random location inside one of the building). We define two probabilities of moving: 0.01 if the agent is in its house, 0.1 otherwise (more chance to move if the agent is not in its house).
```
reflex stay when: target = nil {
	if flip(in_my_house ? 0.01 : 0.1) {
		building bd_target <- in_my_house ? one_of(building) : my_house;
		target <- any_location_in (bd_target);
		in_my_house <- not in_my_house;
	}
}
```

Then, we modify the _move_ reflex. This one will be only activated when the agent will have to move (target not null). Instead of using the _wander_ action of the _moving_ skill, we use the _goto_ one that allows to make an agent moves toward a given target. In addition, it is possible to add a facet _on_ to precise on which topology the agent will have to move on. In our case, the topology is the road network.
When the agent reach its destination (location = target), it sets its target to null.

```
reflex move when: target != nil{
	do goto target:target on: road_network;
	if (location = target) {
		target <- nil;
	} 
}
```
## Complete Model

```
model SI_city4 

global{ 
	int nb_people <- 2147;
	int nb_infected_init <- 5;
	float step <- 1 #mn;
	file roads_shapefile <- file("../includes/roads.shp");
	file buildings_shapefile <- file("../includes/buildings.shp");
	geometry shape <- envelope(roads_shapefile);
	int nb_people_infected <- nb_infected_init update: people count (each.is_infected);
	int nb_people_not_infected <- nb_people - nb_infected_init update: nb_people - nb_people_infected;
	float infected_rate update: nb_people_infected/nb_people;
	
	graph road_network;
	
	init{
		create road from: roads_shapefile;
		road_network <- as_edge_graph(road);
		create building from: buildings_shapefile;
		create people number:nb_people {
			my_house <- one_of(building);
			location <- any_location_in(my_house);
		}
		ask nb_infected_init among people {
			is_infected <- true;
		}
	}
	
	reflex end_simulation when: infected_rate = 1.0 {
		do pause;
	}
}

species people skills:[moving]{		
	float speed <- (2 + rnd(3)) #km/#h;
	bool is_infected <- false;
	building my_house;
	point target;
	bool in_my_house <- true;
	
	reflex stay when: target = nil {
		if flip(in_my_house ? 0.01 : 0.1) {
			building bd_target <- in_my_house ? one_of(building) : my_house;
			target <- any_location_in (bd_target);
			in_my_house <- not in_my_house;
		}
	}
		
	reflex move when: target != nil{
		do goto target:target on: road_network;
		if (location = target) {
			target <- nil;
		} 
	}
	reflex infect when: is_infected{
		ask people at_distance 10 #m {
			if flip(0.05) {
				is_infected <- true;
			}
		}
	}
	aspect circle{
		draw circle(10) color:is_infected ? #red : #green;
	}
}

species road {
	aspect geom {
		draw shape color: #black;
	}
}

species building {
	aspect geom {
		draw shape color: #gray;
	}
}

experiment main_experiment type:gui{
	parameter "Nb people infected at init" var: nb_infected_init min: 1 max: 2147;
	output {
		monitor "Infected people rate" value: infected_rate;
		
		display map type: opengl{
			species road aspect:geom;
			species building aspect:geom;
			species people aspect:circle;			
		}
		
		display chart refresh:every(10) {
			chart "Disease spreading" type: series {
				data "susceptible" value: nb_people_not_infected color: #green;
				data "infected" value: nb_people_infected color: #red;
			}
		}
	}
}
```

[Next step: Definition of 3D displays](LuneraysFlu_step5)
