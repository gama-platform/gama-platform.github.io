---
title:  3. Movement of People
---


This third step presents how to create a road system from GIS data. More precisely, it shows how to build a graph from a list of polylines and to constrain the movement of an agent according to this graph.


## Formulation

* For each `people` agent, definition of 2 new attributes: `living_place` (building of type 'Residential') and `working_place` (building of type 'Industrial').
* For each `people` agent: definition of `start_work` and `end_work` hours attributes that respectively represent when the agent leaves its house to go to work and when it leaves its working place to go back home. These hours will be randomly defined between 6 AM (`min_work_start`) and 8 AM (`max_work_start`) for `start_work` and 4 PM (`min_work_end`) and 8 PM (`max_work_end`) for `end_work`.
* For each `people` agent: definition of an `objective` attribute: this one can 'go home' or 'working'.
* For each `people` agent: define a speed. The speed will be randomly defined between 1 km/h (`min_speed`) and 5 km/h (`max_speed`).
* The `people` agents move along the road, taking the shortest path.
* All the previously introduced values will be defined in global attributes.



## Model Definition

### `people` agents

First, we have to change the skill of the `people` agents: as we want to use an action of the **`moving`** skill (**`goto`**), we will provide the `people` agents with this skill. A [skill](AttachingSkills) is a built-in module that provide the modeler a self-contain and relevant set of actions and variables.

```
species people skills: [moving] {
    ...
}
```

Then, we have to add new attributes to the people agents: `living_place`, `working_place`, `start_work`, `end_work` and `objective`. In addition, we will add a `the_target` variable that will represent the point toward which the agent will be currently moving.

```
species people skills: [moving]{
    rgb color <- #yellow ;
    building living_place <- nil ;
    building working_place <- nil ;
    int start_work ;
    int end_work  ;
    string objective ; 
    point the_target <- nil ;
      
    ...
}
```

We define two reflexes that allow to change the `objective` (and `the_target`) of the agent at the `start_work` and `end_work` hours. Concerning `the_target` value, we choose a random point in the objective building (`working_place` or `living_place`) by using the **`any_location_in`** operator. The attribute `current_date` is a built-in global attribute of type `date` that is automatically incremented from the `starting_date` of the simulation by `step` value. 

```
species people skills: [moving]{  
    ...
    reflex time_to_work when: current_date.hour = start_work and objective = "resting" {
        objective <- "working" ;
	the_target <- any_location_in (working_place);
    }
		
    reflex time_to_go_home when: current_date.hour = end_work and objective = "working" {
        objective <- "resting" ;
	the_target <- any_location_in (living_place); 
    } 
    ...
}
```

At last, we define a reflex that allows the agent to move. If a target point is defined (`the_target != nil`), the agent moves toward its target using the `goto` action (provided by the `moving` skill). Note that we specified a graph to constraint the movement of the agents on the road network with the facet **`on`**. We will see later how this graph is built. The agent uses the shortest path (according to the graph) to go to the target point. When the agent arrives at its destination (`the_target = self.location`), the target is set to nil (the agent will stop moving).

```
species people skills: [moving]{
    ...
    reflex move when: the_target != nil {
	do goto target: the_target on: the_graph ; 
	if the_target = location {
	    the_target <- nil ;
	}
    }
}
```

### Parameters

We add several parameters (and thus global variables) (**`min_work_start`**, **`max_work_start`**, **`min_work_end`**, **`max_work_end`**, **`min_speed`** and **`max_speed`**) and two global variables: **`the_graph`** (graph computed from the road network). In addition, we set the starting date in order that the simulation starts at midnight.

In the global section:
```
global {
    ...
    date starting_date <- date("2019-09-01-00-00-00");
    int min_work_start <- 6;
    int max_work_start <- 8;
    int min_work_end <- 16; 
    int max_work_end <- 20; 
    float min_speed <- 1.0 #km / #h;
    float max_speed <- 5.0 #km / #h; 
    graph the_graph;
    ...
}
```

In the `experiment` section, we add a `parameter` statement for each global variable we want to have as a parameter:
```
experiment road_traffic type: gui {
    ... 
    parameter "Earliest hour to start work" var: min_work_start category: "People" min: 2 max: 8;
    parameter "Latest hour to start work" var: max_work_start category: "People" min: 8 max: 12;
    parameter "Earliest hour to end work" var: min_work_end category: "People" min: 12 max: 16;
    parameter "Latest hour to end work" var: max_work_end category: "People" min: 16 max: 23;
    parameter "minimal speed" var: min_speed category: "People" min: 0.1 #km/#h ;
    parameter "maximal speed" var: max_speed category: "People" max: 10 #km/#h;
    ...
}
```

### Initialization

First, we need to compute from the `road` agents, a graph for the moving of the `people` agents. The operator **`as_edge_graph`** allows doing that. It automatically builds from a set of agents or geometries a graph where the agents are the edges of the graph, a node represent the extremities of the agent geometry.

```
global {
    init {
        ...
        create road from: shape_file_roads ;
        the_graph <- as_edge_graph(road);
        ...
    }
```

We randomly assign one working place and one house to each `people` agent. To simplify the GAML code, we define two temporary variables: the list of buildings of type 'Residential' and the list of buildings of type 'Industrial' (by using the `where` command). At the creation of each `people` agent, we initialize its `speed` (built-in attribute coming from the `moving` skill), `start_work` and `end_work` to each `people` agent (according to the min and max values defined in the global). We define as well an initial objective ("resting"). Concerning the definition of the `living_place` and `working_place`, these ones are randomly chosen among the `residential_buildings` and `industrial_buildings` lists.

```
    init {
        ...
        list<building> residential_buildings <- building where (each.type="Residential");
        list<building>  industrial_buildings <- building  where (each.type="Industrial") ;
        create people number: nb_people {
	    speed <- rnd(min_speed, max_speed);
	    start_work <- rnd (min_work_start, max_work_start);
	    end_work <- rnd(min_work_end, max_work_end);
            living_place <- one_of(residential_buildings) ;
            working_place <- one_of(industrial_buildings) ;
            objective <- "resting";
            location <- any_location_in (living_place); 
       }
    ...
    }
```





## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2003.gaml
```
