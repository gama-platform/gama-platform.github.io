---
title:  4. Use of a graph to constraint the movements of people
---

This fourth step illustrates how to use a graph to constraint the movements of agents

![Result of the Luneray Flu model 4.](/resources/images/tutorials/luneray4.png)


## Formulation

* Define a new global variable: the road network (graph).
* Build the road network graph from the road agents
* Add new attribute to the people agents (target)
* Define a new reflex for people agents: stay.
* Modify the move reflex of the people agents.

## Model Definition

### global section

#### global variables

In this model, we want people agents to move from buildings to buildings by using the shortest path in the road network. In order to compute this shortest path, we need to use a graph structure.

We thus define a new global variable called `road_network` of type `graph` that will represent the road network.

```
global{
    //... other attributes
    graph road_network;
	
    //... init
}
```

In order to compute the graph from the road network, we use, just after having created the road agents, the [as_edge_graph](Operators#as_edge_graph) operator. This operator automatically built a graph from a set of polylines. Each extremity point of the lines will become a node in the graph, and each polyline an edge. By default, the graph is not oriented and the weights of the edges are the perimeters of the polylines. It is of course possible to change through the use of some operators.  

```
global {
    // world variable definition

    init{
	create road from: roads_shapefile;
	road_network <- as_edge_graph(road);		
	create building from: buildings_shapefile;
	create people number:nb_people {
	    location <- any_location_in(one_of(building));				
	}
	ask nb_infected_init among people {
	    is_infected <- true;
	}
    }
}
```

### people species

We want to modify the behavior of the people agents in order to make them move from buildings to buildings by using the shortest path in the road network. 

#### Variables

In order to implement this behavior, we will add two variables to our people species:

* `target` of type `point` that will be the location where the agent wants to go

```
species people skills:[moving]{
    //...the other attributes
    point target;
    //....
}
```

#### Behavior

First, we add a new reflex called `stay` that will be activated when the agent is in a house (i.e. its target is null) and that will define with a probability of 0.05 if the agent has to go or not. If the agent has to go, it will randomly choose a new target (a random location inside one of the building). 

```
reflex stay when: target = nil {
    if flip(0.05) {
	target <- any_location_in (one_of(building));
    }
}
```

Then, we modify the `move` reflex. This one will be only activated when the agent will have to move (target not null). Instead of using the `wander` action of the `moving` skill, we use the `goto` one that allows to make an agent moves toward a given target. In addition, it is possible to add a facet `on` to precise on which topology the agent will have to move on. In our case, the topology is the road network.
When the agent reaches its destination (location = target), it sets its target to null.

```
reflex move when: target != nil{
    do goto target: target on: road_network;
    if (location = target) {
	target <- nil;
    } 
}
```

## Complete Model


```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Luneray%20flu/models/model4.gaml
```

[Next step: Definition of 3D displays](LuneraysFlu_step5)
