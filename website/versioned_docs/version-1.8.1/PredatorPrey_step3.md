---
title: 3. Prey Agent Behavior
id: version-1.8.1-PredatorPrey_step3
original_id: PredatorPrey_step3
---

This third step illustrates how to define the behaviors of prey agents and the concept of spatial topology.


## Formulation

* Random movement of the prey agents to a distance of 2 cells (Von Neumann neighborhood).
* At each step, the prey agents loss energy.
* At each step, the prey agents eat food if there is food on the cell on which they are localized (with a max of `max_transfer`) and gain energy.
* If a prey agent has no more energy, it dies.


## Model Definition

### Parameters
To define the behavior for the prey agents, we add to them three new parameters:

* The max energy of the prey agents.
* The maximum energy that can a prey agent consume from vegetation per step.
* The energy used by a prey agent at each time step.

As we consider these parameters to be global to all preys, we define them in the `global` section as follows:

```
float prey_max_energy <- 1.0;
float prey_max_transfer <- 0.1;
float prey_energy_consum <- 0.05;
```

Yet we may allow the user to change their values through the user interface. To do so, we add the following definition of parameters within the `experiment` section:
```
parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
parameter "Prey max transfer: " var: prey_max_transfer  category: "Prey" ;
parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
```

### `vegetation_cell` grid

We add a new variable for the `vegetation_cell` grid called `neighbors2`, that contains for each vegetation cell the list of the neighbor vegetation cells (at a distance of 2 - Von Neumann neighborhood). We will use these neighbors list for the movement of the prey. Note that the attribute `neighbors` is a built-in attribute of any grid agent (it contains the agents of the grid at a distance 1).

```
grid vegetation_cell width: 50 height: 50 neighbors: 4 {
    ...
    list<vegetation_cell> neighbors2 <- self neighbors_at 2;
}
```

Note that the result of the operator `neighbors_at dist` depends on the type of topology of the agent applying this operator:

* For a grid topology (grid species), the operator returns the neighbor cells (with a Von Neumann or Moore neighborhood).
* For a continuous topology, the operator returns the list of agents of which the shape is located at a distance equals or inferior `dist` meters to the agent shape.
* Inside a `graph` topology, it returns the agents separated by only one edge from the calling agent (independently of their spatial location).

Also, note the use of the [`self`](PseudoVariables#self) pseudo-variable which is a reference to the agent currently executing the statement.

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

The energy used by each prey at each timestep is randomly computed initially (within `]0;max_energy]`).
```
species prey {
    ...
    float energy <- rnd(max_energy) update: energy - energy_consum max: max_energy ;
    ...
}    
```

In order to define the movement behavior of preys, we will add a `reflex`. A reflex is a block of statements (that can be defined in global or any species) that will be automatically executed at each simulation step if its condition is true, it is defined as follows:
```
reflex reflex_name when: condition {...}
```

The `when` facet is optional: when it is omitted, the reflex is activated at each time step. Note that if several reflexes are defined for a species, the reflexes will be activated following their definition order.

We define a first reflex called `basic_move` that allows the prey agents to choose (randomly) a new `vegetation_cell` in the neighborhood of `my_cell` and to move to this cell.
```
species prey {
    ...
    reflex basic_move { 
        my_cell <- one_of (my_cell.neighbors2) ;
        location <- my_cell.location ;
    }
}
```

We define a second reflex called **`eat`** that will only be activated when there is food in `my_cell` and that will allow the prey agents to eat food and gain energy. In order to store the energy gain by the eating (that equals to the minimum between the `max_transfer` value and the quantity of food available in `my_cell`), we define a local variable called `energy_transfer`.  A local variable is a variable that will only exist within this block: once it has been executed, the variable is forgotten. To define it, we have to use the following statement:
```
var_type var_name <- value; 
```

Thus, the reflex `eat` is defined by:
```
species prey {
    ...
    reflex eat when: my_cell.food > 0 { 
        float energy_transfer <- min([max_transfer, my_cell.food]) ;
        my_cell.food <- my_cell.food - energy_transfer ;
        energy <- energy + energy_transfer ;
    }
}
```

We define a third reflex for the prey agent: when the agent has no more energy, it dies (application of the built-in `die` action):
```
species prey {
    ...
    reflex die when: energy <= 0 {
        do die ;
    }
}
```

Note that an action is a capability available to the agents of a species (what they can do). It is a block of statements that can be used and reused whenever needed. Some actions, called primitives, are directly coded in Java: for instance, the **`die`** action defined for all the agents.

* An action can accept arguments. For instance, `write` takes an argument called message.
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
		
    vegetation_cell my_cell <- one_of (vegetation_cell) ; 
    float energy <- rnd(max_energy) update: energy - energy_consum max: max_energy ;
		
    init { 
        location <- my_cell.location;
    }
		
    reflex basic_move { 
	my_cell <- one_of (my_cell.neighbors2) ;
	location <- my_cell.location ;
    }
    reflex eat when: my_cell.food > 0 { 
	float energy_transfer <- min([max_transfer, my_cell.food]) ;
	my_cell.food <- my_cell.food - energy_transfer ;
	energy <- energy + energy_transfer ;
    }
    reflex die when: energy <= 0 {
	do die ;
    }

    aspect base {
	draw circle(size) color: color ;
    }
}

grid vegetation_cell width: 50 height: 50 neighbors: 4 {
    float max_food <- 1.0 ;
    float food_prod <- rnd(0.01) ;
    float food <- rnd(1.0) max: max_food update: food + food_prod ;
    rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food))) ;
    list<vegetation_cell> neighbors2  <- (self neighbors_at 2);
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
