---
title:  Defining Batch Experiments
---


Batch experiments allow to execute numerous successive simulation runs. They are used to explore the parameter space of a model or to optimize a set of model parameters. [Exploration methods are detailed in this page.](ExplorationMethods)

A Batch experiment is defined by:

```
experiment exp_title type: batch until: condition {
   [parameter to explore]
   [exploration method]
   [reflex]
   [permanent]
}
```


## The batch experiment facets

Batch experiments have the following three facets:

* `until`: (expression) Specifies when to stop each simulation. Its value is a condition on variables defined in the model. The run will stop when the condition is evaluated to true. If omitted, the first simulation run will go forever, preventing any subsequent run to take place (unless a halt command is used in the model itself).
* `repeat`: (integer) Specifies the number of simulations replications for each parameter configuration (a set of values assigned to the parameters). This means that several simulation will be run with the same parameter values, however a different random seed will be used for the pseudo-random number generator for each simulation. This allows to get some statistical power from the experiments conducted for stochastic models. The default value is 1.
* `keep_seed`: (boolean) If true, the same series of random seeds will be used from one parameter configuration to another. The default value is false.

```
experiment my_batch_experiment type: batch repeat: 5 keep_seed: true until: (cycle = 300) {
   [parameter to explore]
   [exploration method]
}
```


## Action `_step_` and reflexes

As for any species, `experiment` can define as many `reflex` as needed. In a `batch` experiment, they will be executed at the end of each bunch of simulations (set of replications) for a given parameters configuration. Note that at the experiment level, you have access to all the species and all the global variables and to all the simulations (variable `simulations`).

To be complete, each experiment (as any agent) will call at each step (i.e. the end of the replications set) the `_step_` action: this action is in charge of executing the behavior of the experiment agent, that is by default the execution of each of its `reflex`. It is possible to redefine the action `_step_`, but this should be used with care since this inhibits the reflexes.

For instance, the following experiment runs the simulation 5 times, and saves the people agents in a single shapefile at the end of the 5 simulations.
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( time > 1000 ) {
    int cpt <- 0;

    reflex save_people {
	    save people type:"shp" to:"people_shape" + cpt + ".shp" with: [is_infected::"INFECTED", is_immune::"IMMUNE"];
	    cpt <- cpt + 1;
    }
}
```

The same can be done using the `action _step_ {` instead of `reflex save_people {`.

But if now we want to save information from the 5 simulations and save 1 shapefile per replication, we need to use the built-in attribute `simulations`. To save 1 shapefile per simulation run, we thus need to write:
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( time > 1000 ) {
    reflex end_of_runs {
	int cpt <- 0;
	    ask simulations {
	        save people type: "shp" to: "result/people_shape" + cpt + ".shp" with: [is_infected::"INFECTED", is_immune::"IMMUNE"];
	        cpt <- cpt + 1;
	    }
    }
}
```

If now we want to save in a file aggregated values over the five simulations, such as the average number of infected people over the five simulations, we need to write:
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( cycle > 1000 ) {
    reflex t {
        save [cycle, simulations mean_of each.nb_infected] to: "result.txt" type: "csv";
    }
}
```

## Permanent
The `permanent` statement allows the modeler to define an output block that will not be re-initialized at the beginning of each simulation but will be filled instead at the end of each simulation.
For instance, this `permanent` section will plot for each simulation the end value of the `food_gathered` variable (defined as a global variable in the model).

```
permanent {
    display Ants background: #white refresh: every(1#cycle) {
    	chart "Food Gathered" type: series {
	        data "Food" value: food_gathered;
	    }
    }
}
```

It can be particularly useful when exploring values of parameters to plot their influence over some metric. For example here is a model based on Thomas Schelling's model of residential segregation (described in many library models) where we use batch to explore the parameter `number_of_groups`. For each value of this parameter we will run 10 simulations to mitigate the impact of randomness. We will then use the `permanent` statement to display the average happiness after 50 simulation steps in function of the number of groups in which the population is split:
```
/**
* Name: NewModel
* Based on the internal empty template. 
* Author: baptiste
* Tags: 
*/


model shelling_exploration


global {
	//Different colors for the group
    list colors <- [rgb ("yellow"), rgb ("red"), rgb ("blue"), 
    	rgb ("orange"), rgb ("green"), rgb ("pink"), rgb ("magenta") , rgb ("cyan")
    ] of: rgb;

	
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
	list<space> all_places ;
	//List of all the people
	list<base> all_people;  
	//List of all the free places
	list<space> free_places ;
	
	//Shape of the world
	geometry shape <- square(dimensions);
	
	

	//Initialization of the model
	init {
		//Initialization of the places
		do initialize_places;
		//Computation of the number of people according to the density of people
		number_of_people <- int( length (all_places) * density_of_people);
		//Initialization of the people
		do initialize_people;
	}
	
	
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

//Species base representing the people agents
species base {
	rgb color;
	//List of all the neighbours agents
	list<base> my_neighbours;
	//computation of the similar neighbours
	int similar_nearby -> 
		(my_neighbours count (each.color = color))
	;
	//Computation of the total neighbours nearby
	int total_nearby -> 
		length (my_neighbours)
	;
	//Boolean to know if the agent is happy or not
	bool is_happy -> similar_nearby >= (percent_similar_wanted * total_nearby ) ;
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
	list<people> my_neighbours -> people at_distance neighbours_distance ;
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
	
}


experiment explo type:batch until:cycle>50 repeat:10 parallel:10{
	
	parameter "nb groups" var:number_of_groups min:2 max:8;
	
	method exploration;
	
	
	permanent {
		display Comparison background: #white {
			chart "Number of happy people" type: xy {
				data "Groups "  value:{number_of_groups, simulations mean_of (each.sum_happy_people)} ;
				
			}
		}
	}	
}

```
Which gives us a result that looks something like this:
![image](https://user-images.githubusercontent.com/6374469/224968198-bec9c2df-7799-4e0b-ad20-a4b49d819549.png)




## Parameter sets in parallel
There is an option in the `Preferences...` menu of Gama to allow multiple replications to be executed in parallel, that is to fully use assigned cores to computation. In that case, `permanent` and `reflex` blocks in the `experiment` will only be triggered once at the end of the whole set of simulations, rather than after each set of replications. Therefor, this option should only be used when doing none GUI batch experiment
