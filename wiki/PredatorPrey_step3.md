---
layout: default
title: 3. Prey Agent Behavior
wikiPageName: PredatorPrey_step3
wikiPagePath: wiki/PredatorPrey_step3.md
---
# 3. Prey Agent Behavior
This third step Illustrates how to define the behaviors of prey agents and the concept of spatial topology.






## Formulation
  * Random movement of the prey agents to a distance of 2 cells (Von Neumann neighborhood)
  * At each step, the prey agents loss energy
  * At each step, the prey agents eat food if there is food on the cell on which they are localized (with a max of max\_transfer) and gain energy
  * If a prey agent has no more energy, it dies





## Model Definition

### parameters
To define a behavior for the prey agents we add them three new parameters:
  * The max energy of the prey agents
  * The maximum energy that can a prey agent consume from vegetation per tick
  * The energy used by a prey agent at each time step

As we consider these parameters to be global to all prey, we define them in the  global section as follows:

```
   float prey_max_energy <- 1.0;
   float prey_max_transfer <- 0.1;
   float prey_energy_consum <- 0.05;
   
```

Yet we may allow the user to change it from an experiment to another through the user interface. To do so we add the following definition of parameters within the experiment section :
```
   parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
   parameter "Prey max transfer: " var: prey_max_transfer  category: "Prey" ;
   parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
```

### vegetation\_cell grid
We add a new variable for the vegetation\_cell grid called **neighbours**, that contains for each vegetation cell the list of the neighbor vegetation cells (distance of 2 - Von Neumann neighborhood). We will use these neighbors list for the movement of the prey.

```
  grid vegetation_cell width: 50 height: 50 neighbours: 4 {
      ...
      list<vegetation_cell> neighbours <- self neighbours_at 2;
   }
```

Note that the result of the operator **neighbours\_at dist** depends on the type of topology of the agent applying this operator:
  * For a grid topology (grid species), the operator returns the neighbor cells (with a Von Neumann or Moore neighborhood).
  * For a continuous topology, the operator returns the list of agents of which the shape is located at a distance equals or inferior _dist_ meters to the agent shape.

Also note the use of the [self](PseudoVariables#self) pseudo variable which is a reference to the agent currently executing the statement

## Prey agents

We copy the values of the three global parameters into the prey species in order for it to be available for each agent and possibly modified locally.
```
species prey {
   ...
   float max_energy <- prey_max_energy ;
   float max_transfer <- prey_max_transfer ;
   float energy_consum <- prey_energy_consum ;
   ...
}		
```

The energy used by each prey at each timestep is randomly computed initially (within ]0;max\_energy]).
```
species prey {
   ...
   float energy <- (rnd(1000) / 1000) * max_energy  update: energy - energy_consum max: max_energy ;
   ...
}    
```

In order to define the movement behaviour of a prey we will add a **reflex**. A reflex is a block of statements (that can be defined in global or any species) that will be automatically executed at each simulation step if its condition is true, it is defined as follows:
```
   reflex reflex_name when: condition {...}
```

The **when** facet is optional: when it is omitted, the reflex is activated at each time step. Note that if several reflexes are defined for a species, the reflexes will be activated following their definition order.

We define a first reflex called **basic\_move** that allows the prey agents to choose (randomly) a new vegetation\_cell in the neighborhood of my\_cell and to move to this cell.
```
species prey {
   ...
   reflex basic_move { 
       myCell <- one_of (myCell.neighbours) ;
       location <- myCell.location ;
   }
}
```

We define a second reflex called **eat** that will only be activated when there is food in my\_cell and that will allows the prey agents to eat food and gain energy. In order to store the energy gain by the eating (that is equals to the minimum between the **max\_transfer** value and the quantity of food available in **myCell**), we define a local variable called **energy\_transfer**.  A local variable is a variable that will only exist within this block: once it has been executed, the variable is forgotten. To define it, we have to use the following statement:
```
var_type var_name <- value; 
```

Thus, the reflex **eat** is defined by:
```
species prey {
   ...
   reflex eat when: myCell.food > 0 { 
      float energy_transfer <- min([max_transfer, myCell.food]) ;
      myCell.food <- myCell.food - energy_transfer ;
      energy <- energy + energy_transfer ;
   }
}
```

We define a third reflex for the prey agent: when the agent has no more energy, it dies (application of the built-in **die** action):
```
species prey {
   ...
   reflex die when: energy <= 0 {
      do die ;
   }
}
```

Note that an action is a capability available to the agents of a species (what they can do). It is a block of statements that can be used and reused whenever needed. Some actions, called primitives, are directly coded in Java: for instance, the **die** action defined for all the agents.
  * An action can accept arguments. For instance, write takes an argument called message.
  * An action can return a result.

There are two ways to call an action: using a statement or as part of an expression
  * for actions that do not return a result:
```
do action_name arg1: v1 arg2: v2;
```

  * for actions that return a result:
```
my_var <- self action_name (arg1:v1, arg2:v2);
```





## Complete Model

```
model prey_predator

global {
	int nb_preys_init <- 200;
	float prey_max_energy <- 1.0;
	float prey_max_transfer <- 0.1;
	float prey_energy_consum <- 0.05;
	
	init {
		create prey number: nb_preys_init ;
	}
}

species prey {
	float size <- 1.0 ;
	rgb color <- #blue;
	float max_energy <- prey_max_energy ;
	float max_transfer <- prey_max_transfer ;
	float energy_consum <- prey_energy_consum ;
		
	vegetation_cell myCell <- one_of (vegetation_cell) ; 
	float energy <- (rnd(1000) / 1000) * max_energy  update: energy - energy_consum max: max_energy ;
		
	init { 
		location <- myCell.location;
	}
		
	reflex basic_move { 
		myCell <- one_of (myCell.neighbours) ;
		location <- myCell.location ;
	}
	reflex eat when: myCell.food > 0 { 
		float energy_transfer <- min([max_transfer, myCell.food]) ;
		myCell.food <- myCell.food - energy_transfer ;
		energy <- energy + energy_transfer ;
	}
	reflex die when: energy <= 0 {
		do die ;
	}

	aspect base {
		draw circle(size) color: color ;
	}
}

grid vegetation_cell width: 50 height: 50 neighbours: 4 {
	float maxFood <- 1.0 ;
	float foodProd <- (rnd(1000) / 1000) * 0.01 ;
	float food <- (rnd(1000) / 1000) max: maxFood update: food + foodProd ;
	rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food))) ;
	list<vegetation_cell> neighbours  <- (self neighbours_at 2);
}

experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init min: 1 max: 1000 category: "Prey" ;
	parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
	parameter "Prey max transfer: " var: prey_max_transfer  category: "Prey" ;
	parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
	output {
		display main_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: base ;
		}
	}
}
```
