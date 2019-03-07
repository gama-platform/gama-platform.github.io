---
layout: default
title: 8. Complex Behavior
wikiPageName: PredatorPrey_step8
wikiPagePath: wiki/PredatorPrey_step8.md
---
# 8. Complex Behavior
This eighth step Illustrates how to define and call actions and how to use conditional statements.







## Formulation
  * Definition of more complex behaviors for prey and predator agents:
    * The preys agents are moving to the cell containing the highest quantity of food
    * The predator agents are moving if possible to a cell that contains preys; otherwise random cell





## Model Definition

### parent species
We modify the **basic\_move** reflex of the **generic\_species** in order to give the **prey** and **predator** a more complex behaviors: instead of choose a random vegetation cell in the neighborhood, the agent will choose a vegetation cell (still in the neighborhood) thanks to a **choose\_cell** action.
This action will be specialized for each species.

```
   species generic_species {
        ...
        reflex basic_move {
		myCell <- choose_cell();
		location <- myCell.location; 
	} 
	
	vegetation_cell choose_cell {
		return nil;
	}
        ...
   }
```

We remind that an action is a capability available to the agents of a species (what they can do). It is a block of statements that can be used and reused whenever needed.
  * An action can accept arguments.
  * An action can return a result (statement return)

There are two ways to call an action: using a statement or as part of an expression
  * for actions that do not return a result:
```
do action_name (arg1: v1 arg2: v2);
do action_name (v1, v2);
```

  * for actions that return a result (which is stored in _my\_var_):
```
my_var <- action_name (arg1:v1, arg2:v2);
my_var <- action_name (v1, v2);
```

### prey species
We specialize the **choose\_cell** species for the **prey** species: the agent will choose the vegetation cell of the neighborhood (list myCell.neighbors) that maximizes the quantity of food.

Note that GAMA offers numerous operators to manipulate lists and containers:
  * Unary operators : min, max, sum...
  * Binary operators :
    * where : returns a sub-list where all the elements verify the condition defined in the right operand.
    * first\_with : returns the first element of the list that verifies the condition defined in the right operand.
    * ...
In the case of binary operators, each element (of the first operand list) can be accessed with the keyword **each**

Thus the **choose\_cell** action of the **prey** species is defined by:
```
   species prey parent: generic_species {
      ...  
      vegetation_cell choose_cell {
	  return (myCell.neighbors) with_max_of (each.food);
      }
      ...
   }
```

### predator species
We specialize the **choose\_cell** species for the **predator** species: the agent will choose, if possible, a vegetation cell of the neighborhood (list myCell.neighbors) that contains at least a **prey** agent; otherwise it will choose a random cell.

We use for this action the **first\_with** operator on the list neighbor vegetation cells (myCell.neighbors) with the following condition: the list of **prey** agents contained in the cell is not empty. Note that we use the **shuffle** operator to randomize the order of the list of neighbor cell.

If all the neighbor cells are empty (myCell\_tmp = nil, **nil** is the null value), then the agent choosse a random cell in the neighborhood (one\_of (myCell.neighbors)).

GAMA contains statements that allow to execute blocks depending on some conditions:
```
   if condition1 {...} 
   else if condition2{...} 
   ... 
   else {...} 
```

This statement means that if condition1 = true then the first block is executed; otherwise if condition2 = true, then it is the second block, etc. When no conditions are satisfied and an else block is defined (it is optional), this latter is executed.

We then write the **choose\_cell** action as follows:
```
   species predator parent: generic_species {
      ...
      vegetation_cell choose_cell {
	  vegetation_cell myCell_tmp <- shuffle(myCell.neighbors) first_with (!(empty (prey inside (each))));
	  if myCell_tmp != nil {
		return myCell_tmp;
	  } else {
		return one_of (myCell.neighbors);
	  } 
      }
      ...
   }
```

Note there is ternary operator allowing to directly use a condition structure to evaluate a variable:
```
   condition ? value1 : value2
```
if condition is true, then returns value1; otherwise, returns value2.





## Complete Model

```
model prey_predator

global {
	int nb_preys_init <- 200;
	int nb_predators_init <- 20;
	float prey_max_energy <- 1.0;
	float prey_max_transfert <- 0.1 ;
	float prey_energy_consum <- 0.05;
	float predator_max_energy <- 1.0;
	float predator_energy_transfert <- 0.5;
	float predator_energy_consum <- 0.02;
	float prey_proba_reproduce <- 0.01;
	int prey_nb_max_offsprings <- 5; 
	float prey_energy_reproduce <- 0.5; 
	float predator_proba_reproduce <- 0.01;
	int predator_nb_max_offsprings <- 3;
	float predator_energy_reproduce <- 0.5;
	
	int nb_preys -> {length (prey)};
	int nb_predators -> {length (predator)};
	
	init {
		create prey number: nb_preys_init ; 
		create predator number: nb_predators_init ;
	}
}

species generic_species {
	float size <- 1.0;
	rgb color  ;
	float max_energy;
	float max_transfert;
	float energy_consum;
	float proba_reproduce ;
	float nb_max_offsprings;
	float energy_reproduce;
	image_file my_icon;
	vegetation_cell myCell <- one_of (vegetation_cell) ;
	float energy <- (rnd(1000) / 1000) * max_energy  update: energy - energy_consum max: max_energy ;
	
	init {
		location <- myCell.location;
	}
		
	reflex basic_move {
		myCell <- choose_cell();
		location <- myCell.location; 
	} 
	
	vegetation_cell choose_cell {
		return nil;
	}
		
	reflex die when: energy <= 0 {
		do die ;
	}
	
	reflex reproduce when: (energy >= energy_reproduce) and (flip(proba_reproduce)) {
		int nb_offsprings <- 1 + rnd(nb_max_offsprings -1);
		create species(self) number: nb_offsprings {
			myCell <- myself.myCell ;
			location <- myCell.location ;
			energy <- myself.energy / nb_offsprings ;
		}
		energy <- energy / nb_offsprings ;
	}
	
	aspect base {
		draw circle(size) color: color ;
	}
	aspect icon {
		draw my_icon size: 2 * size ;
	}
	aspect info {
		draw square(size) color: color ;
		draw string(energy with_precision 2) size: 3 color: #black ;
	}
}

species prey parent: generic_species {
	rgb color <- #blue;
	float max_energy <- prey_max_energy ;
	float max_transfert <- prey_max_transfert ;
	float energy_consum <- prey_energy_consum ;
	float proba_reproduce <- prey_proba_reproduce ;
	int nb_max_offsprings <- prey_nb_max_offsprings ;
	float energy_reproduce <- prey_energy_reproduce ;
	file my_icon <- file("../images/predator_prey_sheep.png") ;
		
	reflex eat when: myCell.food > 0 {
		float energy_transfert <- min([max_transfert, myCell.food]) ;
		myCell.food <- myCell.food - energy_transfert ;
		energy <- energy + energy_transfert ;
	}
	
	vegetation_cell choose_cell {
		return (myCell.neighbors) with_max_of (each.food);
	}
}
	
species predator parent: generic_species {
	rgb color <- #red ;
	float max_energy <- predator_max_energy ;
	float energy_transfert <- predator_energy_transfert ;
	float energy_consum <- predator_energy_consum ;
	list<prey> reachable_preys update: prey inside (myCell);
	float proba_reproduce <- predator_proba_reproduce ;
	int nb_max_offsprings <- predator_nb_max_offsprings ;
	float energy_reproduce <- predator_energy_reproduce ;
	file my_icon <- file("../images/predator_prey_wolf.png") ;
	
	reflex eat when: ! empty(reachable_preys) {
		ask one_of (reachable_preys) {
			do die ;
		}
		energy <- energy + energy_transfert ;
	}
	
	vegetation_cell choose_cell {
		vegetation_cell myCell_tmp <- shuffle(myCell.neighbors) first_with (!(empty (prey inside (each))));
		if myCell_tmp != nil {
			return myCell_tmp;
		} else {
			return one_of (myCell.neighbors);
		} 
	}
}
	
grid vegetation_cell width: 50 height: 50 neighbors: 4 {
	float maxFood <- 1.0 ;
	float foodProd <- (rnd(1000) / 1000) * 0.01 ;
	float food <- (rnd(1000) / 1000) max: maxFood update: food + foodProd ;
	rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food))) ;
	list<vegetation_cell> neighbors  <- (self neighbors_at 2); 
}

experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init  min: 0 max: 1000 category: "Prey" ;
	parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
	parameter "Prey max transfert: " var: prey_max_transfert  category: "Prey" ;
	parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
	parameter "Initial number of predators: " var: nb_predators_init  min: 0 max: 200 category: "Predator" ;
	parameter "Predator max energy: " var: predator_max_energy category: "Predator" ;
	parameter "Predator energy transfert: " var: predator_energy_transfert  category: "Predator" ;
	parameter "Predator energy consumption: " var: predator_energy_consum  category: "Predator" ;
	parameter 'Prey probability reproduce: ' var: prey_proba_reproduce category: 'Prey' ;
	parameter 'Prey nb max offsprings: ' var: prey_nb_max_offsprings category: 'Prey' ;
	parameter 'Prey energy reproduce: ' var: prey_energy_reproduce category: 'Prey' ;
	parameter 'Predator probability reproduce: ' var: predator_proba_reproduce category: 'Predator' ;
	parameter 'Predator nb max offsprings: ' var: predator_nb_max_offsprings category: 'Predator' ;
	parameter 'Predator energy reproduce: ' var: predator_energy_reproduce category: 'Predator' ;
	
	output {
		display main_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: icon ;
			species predator aspect: icon ;
		}
		display info_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: info ;
			species predator aspect: info ;
		}
		monitor "Number of preys" value: nb_preys;
		monitor "Number of predators" value: nb_predators;
	}
}
```
