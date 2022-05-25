---
title:  5. Predator Agent
---


This fifth step illustrates how to use parent species. Indeed, prey and predators share a few common features thus we will define a generic species that will regroup all the common elements (variables, behaviors, and aspects) between the prey and the predator species.



## Formulation

* Definition of a new generic species: `generic_species`.
* Definition of a new species: `predator`.
* `predator` agents move randomly.
* At each simulation step, a `predator` agent can eat a `prey` that is localized at its grid cell.


## Model Definition

### parameters

We add four new parameters related to predator agents:

* The init number of predator agents.
* The max energy of the predator agents.
* The energy gained by a predator agent while eating a prey agent.
* The energy consumed by a predator agent at each time step.

We define four new global variables in the `global` section:
```
global {
    ...
    int nb_predators_init <- 20;
    float predator_max_energy <- 1.0;
    float predator_energy_transfer <- 0.5;
    float predator_energy_consum <- 0.02;
}
```

We define then the four corresponding parameters in the `experiment`:
```
parameter "Initial number of predators: " var: nb_predators_init min: 0 max: 200 category: "Predator" ;
parameter "Predator max energy: " var: predator_max_energy category: "Predator" ;
parameter "Predator energy transfer: " var: predator_energy_transfer  category: "Predator" ;
parameter "Predator energy consumption: " var: predator_energy_consum  category: "Predator" ;
```

### parent species

A species can have a parent species: it automatically gets all the variables, skill and actions/reflex of the parent species.

We define a species called **`generic_species`** that is the parent of the species `prey` and `predator`:

![Relationship between `generic_species`, `prey` and `predator` species.](/resources/images/tutorials/parent_species.png)

This species integrates all of the common feature between the `prey` and `predator` species:
  
* the variables:
  * `size`
  * `color`
  * `max_energy`
  * `max_transfer`
  * `energy_consum`
  * `my_cell`
  * `energy`
* the behaviors:
  * `basic_move` reflex
  * `eat` reflex
  * `die` reflex
* the actions:
  * `energy_from_eat` action
* the aspect:
  * `base` aspect

As the `eat` behavior depends on the species (prey eats on `vegetation_cell`, whereas `predator` agents eat `prey` agents), we introduce an action `energy_from_eat` that will be redefined in each child species. Each species will implement its own eating behavior, returning the amount of energy it gets from this action.  

We remind that an action is a capability available to the agents (what they can do). It is a block of statements that can be used and reused whenever needed.

* An action can accept arguments.
* An action can return a result (statement return).

There are two ways of calling an action: using a statement `do` or as part of an expression:

* for actions that do not return a result:
```
do action_name (arg1: v1 arg2: v2);
do action_name (v1, v2);
```

* for actions that return a result (which is stored in `my_var`):
```
my_var <- action_name (arg1:v1, arg2:v2);
my_var <- action_name (v1, v2);
```

Thus the `generic_species` will have the following code. Note that the action `energy_from_eat` is also defined in this species, but with a default result (return 0.0).

```
species generic_species {
    float size <- 1.0;
    rgb color  ;
    float max_energy;
    float max_transfert;
    float energy_consum;
    vegetation_cell my_cell <- one_of (vegetation_cell) ;
    float energy <- rnd(max_energy) update: energy - energy_consum max: max_energy ;
	
    init {
	location <- my_cell.location;
    }
		
    reflex basic_move {
	my_cell <- one_of (my_cell.neighbors2) ;
	location <- my_cell.location ;
    }
		
    reflex eat {
	energy <- energy + energy_from_eat();
    }

    reflex die when: energy <= 0 {
	do die;
    }

    float energy_from_eat {
	return 0.0;
    } 

	
    aspect base {
	draw circle(size) color: color ;
    }
}
```

### prey species

We specialize the `prey` species from the `generic_species` species:

* definition of the initial value of the agent variables.
* definition of the specific `eat` action: if the current cell contains some food, the prey agent will take either all this food or the `max_transfert` value (if the amount of food is greater than the maximum value the prey can take).

```
species prey parent: generic_species {
    rgb color <- #blue; 
    float max_energy <- prey_max_energy ;
    float max_transfert <- prey_max_transfert ;
    float energy_consum <- prey_energy_consum ;
		
    float energy_from_eat {
	float energy_transfert <- 0.0;
	if(my_cell.food > 0) {
	    energy_transfert <- min([max_transfert, my_cell.food]);
	    my_cell.food <- my_cell.food - energy_transfert;
	} 			
	return energy_transfert;
    }
}
```

### predator species
As done for the `prey` species, we specialize the `predator` species from the `generic_species` species:

* definition of the initial value of the agent variables.
* definition of the specific `eat` action: first, the agent computes the list of prey agents contained by `my_cell` (`reachable_preys` variable); if it is not empty, it chooses one of the elements of this list, it kills it (i.e. asks it to die) and returns the `energy_transfert` variable (that will be added to its own energy).

```
species predator parent: generic_species {
    rgb color <- #red ;
    float max_energy <- predator_max_energy ;
    float energy_transfert <- predator_energy_transfert ;
    float energy_consum <- predator_energy_consum ;

    float energy_from_eat {
	list<prey> reachable_preys <- prey inside (my_cell);	
	if(! empty(reachable_preys)) {
	    ask one_of (reachable_preys) {
		do die;
	    }
	    return energy_transfert;
	}
	return 0.0;
    }
}
```

Note that we used the **`ask`** statement. This statement allows to make a remote agent executes a list of statements.
Use of the ask statement as follows:
```
ask one_agent { }
```
or
```
ask agents_list { }
```

We used as well the `species/agent list inside geometry/agent` operator. This operator returns all the agents of the specified species (or from the specified agent list) that are inside the given geometry or agent geometry.

### global init block
Like in the previous model, in the init block of the model, we create `nb_predators_init`.

```
global {
    ...
    init {
        create prey number: nb_preys_init ;
        create predator number: nb_predators_init ;
    }
}
```

### monitor
Like in the previous model, we define a monitor to display the number of predator agents.

Definition of a global variable `nb_predator` that returns the current number of `predator` agents:
```
global {
    ...
    int nb_predators -> {length (predator)};
    ...
}
```

Definition of the corresponding monitor:
```
monitor "number of predators" value: nb_predators ;
```


### display
Also, do not forget to add the line to display predators in your simulation
```
display main_display {
    ...
    species predator aspect: base ;
}
```


## Complete Model

```
model prey_predator

global {
    int nb_preys_init <- 200;
    int nb_predators_init <- 20;
    float prey_max_energy <- 1.0;
    float prey_max_transfert <- 0.1;
    float prey_energy_consum <- 0.05;
    float predator_max_energy <- 1.0;
    float predator_energy_transfert <- 0.5;
    float predator_energy_consum <- 0.02;
    int nb_preys -> {length(prey)};
    int nb_predators -> {length(predator)};

    init {
	create prey number: nb_preys_init;
	create predator number: nb_predators_init;
    }
}

species generic_species {
    float size <- 1.0;
    rgb color;
    float max_energy;
    float max_transfert;
    float energy_consum;
    vegetation_cell my_cell <- one_of (vegetation_cell);
    float energy <- rnd(max_energy) update: energy - energy_consum max: max_energy;
	
    init {
	location <- my_cell.location;
    }

    reflex basic_move {
	my_cell <- one_of(my_cell.neighbors2);
	location <- my_cell.location;
    }

    reflex eat {
	energy <- energy + energy_from_eat();
    }

    reflex die when: energy <= 0 {
	do die;
    }

    float energy_from_eat {
	return 0.0;
    } 

    aspect base {
	draw circle(size) color: color;
    }
}

species prey parent: generic_species {
    rgb color <- #blue;
    float max_energy <- prey_max_energy;
    float max_transfert <- prey_max_transfert;
    float energy_consum <- prey_energy_consum;
	
    float energy_from_eat {
	float energy_transfert <- 0.0;
	if(my_cell.food > 0) {
	    energy_transfert <- min([max_transfert, my_cell.food]);
	    my_cell.food <- my_cell.food - energy_transfert;
	} 			
	return energy_transfert;
    }
}

species predator parent: generic_species {
    rgb color <- #red;
    float max_energy <- predator_max_energy;
    float energy_transfert <- predator_energy_transfert;
    float energy_consum <- predator_energy_consum;
		
    float energy_from_eat {
	list<prey> reachable_preys <- prey inside (my_cell);	
	if(! empty(reachable_preys)) {
	    ask one_of (reachable_preys) {
		do die;
	    }
	    return energy_transfert;
	}
	return 0.0;
    }		
}

grid vegetation_cell width: 50 height: 50 neighbors: 4 {
    float max_food <- 1.0;
    float food_prod <- rnd(0.01);
    float food <- rnd(1.0) max: max_food update: food + food_prod;
    rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food)));
    list<vegetation_cell> neighbors2  <- (self neighbors_at 2); 
}

experiment prey_predator type: gui {
    parameter "Initial number of preys: " var: nb_preys_init min: 0 max: 1000 category: "Prey";
    parameter "Prey max energy: " var: prey_max_energy category: "Prey";
    parameter "Prey max transfert: " var: prey_max_transfert category: "Prey";
    parameter "Prey energy consumption: " var: prey_energy_consum category: "Prey";
    parameter "Initial number of predators: " var: nb_predators_init min: 0 max: 200 category: "Predator";
    parameter "Predator max energy: " var: predator_max_energy category: "Predator";
    parameter "Predator energy transfert: " var: predator_energy_transfert category: "Predator";
    parameter "Predator energy consumption: " var: predator_energy_consum category: "Predator";
	
    output {
	display main_display {
	    grid vegetation_cell lines: #black;
	    species prey aspect: base;
	    species predator aspect: base;
	}

	monitor "Number of preys" value: nb_preys;
	monitor "Number of predators" value: nb_predators;
    }
}
```
