---
title:  8. Complex Behavior
---

This eighth step illustrates how to define more complex actions, how to use conditional statements and iterator operators over containers.


## Formulation

* Definition of more complex behaviors for prey and predator agents:
  * The preys agents are moving to the cell containing the highest quantity of food.
  * The predator agents are moving if possible to a cell that contains preys, otherwise to random cell.



## Model Definition

### parent species
We modify the `basic_move` reflex of the `generic_species` in order to give the `prey` and `predator` a more complex behaviors: instead of choosing a random vegetation cell in the neighborhood, the agents will choose a vegetation cell (still in the neighborhood) thanks to a **`choose_cell`** action. This action will return an empty (`nil`) value in the parent species and will be specialized for each species. 

```
species generic_species {
    ...
    reflex basic_move {
	my_cell <- choose_cell();
	location <- my_cell.location; 
    } 
	
    vegetation_cell choose_cell {
	return nil;
    }
    ...
}
```

### prey species
We specialize the **`choose_cell`** action for the `prey` species: the agent will choose the vegetation cell of the neighborhood (list `my_cell.neighbors2`) that maximizes the quantity of food.

Note that GAMA offers numerous operators to manipulate lists and containers:

* Unary operators: `min`, `max`, `sum`...
* Binary operators:
  * `where`: returns a sub-list where all the elements verify the condition defined in the right operand.
  * `first_with`: returns the first element of the list that verifies the condition defined in the right operand.
  * ...
  
In the case of binary operators, each element (of the first operand list) can be accessed with the pseudo-variable **`each`**.

Thus the `choose_cell` action of the `prey` species is defined by:
```
species prey parent: generic_species {
    ...  
    vegetation_cell choose_cell {
        return (my_cell.neighbors2) with_max_of (each.food);
    }
    ...
}
```

### predator species
We specialize the **`choose_cell`** species for the `predator` species: the agent will choose, if possible, a vegetation cell of the neighborhood (list `my_cell.neighbors2`) that contains at least a `prey` agent; otherwise it will choose a random cell.

We use for this action the **`first_with`** operator on the list of neighbor vegetation cells (`my_cell.neighbors2`) with the following condition: the list of `prey` agents contained in the cell is not empty. Note that we use the **`shuffle`** operator to randomize the order of the list of the neighbor cells.

If all the neighbor cells are empty, then the agent chooses a random cell in the neighborhood (`one_of (my_cell.neighbors2)`).

GAMA contains statements that allow executing blocks depending on some conditions:
```
if condition1 {...} 
else if condition2{...} 
... 
else {...} 
```

This statement means that if condition1 = true then the first block is executed; otherwise, if condition2 = true, then it is the second block, etc. When no conditions are satisfied and an else block is defined (it is optional), this latter is executed.

We then write the `choose_cell` action as follows:
```
species predator parent: generic_species {
    ...
    vegetation_cell choose_cell {
        vegetation_cell my_cell_tmp <- shuffle(my_cell.neighbors2) first_with (!(empty (prey inside (each))));
	if my_ell_tmp != nil {
	    return my_cell_tmp;
	} else {
	    return one_of (my_cell.neighbors2);
	} 
    }
    ...
}
```

Note there is ternary operator allowing to directly use a conditioned structure to evaluate a variable:
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
    float prey_max_transfert <- 0.1;
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
    float proba_reproduce;
    int nb_max_offsprings;
    float energy_reproduce;
    image_file my_icon;
    vegetation_cell my_cell <- one_of(vegetation_cell);
    float energy <- rnd(max_energy) update: energy - energy_consum max: max_energy;

    init {
        location <- my_cell.location;
    }

    reflex basic_move {
        my_cell <- choose_cell();
        location <- my_cell.location;
    }

    reflex eat {
        energy <- energy + energy_from_eat();        
    }

    reflex die when: energy <= 0 {
        do die;
    }

    reflex reproduce when: (energy >= energy_reproduce) and (flip(proba_reproduce)) {
        int nb_offsprings <- rnd(1, nb_max_offsprings);
        create species(self) number: nb_offsprings {
            my_cell <- myself.my_cell;
            location <- my_cell.location;
            energy <- myself.energy / nb_offsprings;
        }

        energy <- energy / nb_offsprings;
    }

    float energy_from_eat {
        return 0.0;
    }

    vegetation_cell choose_cell {
        return nil;
    }

    aspect base {
        draw circle(size) color: color;
    }

    aspect icon {
        draw my_icon size: 2 * size;
    }

    aspect info {
        draw square(size) color: color;
        draw string(energy with_precision 2) size: 3 color: #black;
    }
}

species prey parent: generic_species {
    rgb color <- #blue;
    float max_energy <- prey_max_energy;
    float max_transfert <- prey_max_transfert;
    float energy_consum <- prey_energy_consum;
    float proba_reproduce <- prey_proba_reproduce;
    int nb_max_offsprings <- prey_nb_max_offsprings;
    float energy_reproduce <- prey_energy_reproduce;
    image_file my_icon <- image_file("../includes/data/sheep.png");

    float energy_from_eat {
        float energy_transfert <- 0.0;
        if(my_cell.food > 0) {
            energy_transfert <- min([max_transfert, my_cell.food]);
            my_cell.food <- my_cell.food - energy_transfert;
        }             
        return energy_transfert;
    }

    vegetation_cell choose_cell {
        return (my_cell.neighbors2) with_max_of (each.food);
    }
}

species predator parent: generic_species {
    rgb color <- #red;
    float max_energy <- predator_max_energy;
    float energy_transfert <- predator_energy_transfert;
    float energy_consum <- predator_energy_consum;
    float proba_reproduce <- predator_proba_reproduce;
    int nb_max_offsprings <- predator_nb_max_offsprings;
    float energy_reproduce <- predator_energy_reproduce;
    image_file my_icon <- image_file("../includes/data/wolf.png");

    float energy_from_eat {
        list&lt;prey> reachable_preys <- prey inside (my_cell);
        if(! empty(reachable_preys)) {
            ask one_of (reachable_preys) {
                do die;
            }
            return energy_transfert;
        }
        return 0.0;
    }

    vegetation_cell choose_cell {
        vegetation_cell my_cell_tmp <- shuffle(my_cell.neighbors2) first_with (!(empty(prey inside (each))));
        if my_cell_tmp != nil {
            return my_cell_tmp;
        } else {
            return one_of(my_cell.neighbors2);
        }
    }
}

grid vegetation_cell width: 50 height: 50 neighbors: 4 {
    float max_food <- 1.0;
    float food_prod <- rnd(0.01);
    float food <- rnd(1.0) max: max_food update: food + food_prod;
    rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 * (1 - food)));
    list&lt;vegetation_cell> neighbors2 <- (self neighbors_at 2);
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
    parameter 'Prey probability reproduce: ' var: prey_proba_reproduce category: 'Prey';
    parameter 'Prey nb max offsprings: ' var: prey_nb_max_offsprings category: 'Prey';
    parameter 'Prey energy reproduce: ' var: prey_energy_reproduce category: 'Prey';
    parameter 'Predator probability reproduce: ' var: predator_proba_reproduce category: 'Predator';
    parameter 'Predator nb max offsprings: ' var: predator_nb_max_offsprings category: 'Predator';
    parameter 'Predator energy reproduce: ' var: predator_energy_reproduce category: 'Predator';

    output {
        display main_display {
            grid vegetation_cell lines: #black;
            species prey aspect: icon;
            species predator aspect: icon;
        }

        display info_display {
            grid vegetation_cell lines: #black;
            species prey aspect: info;
            species predator aspect: info;
        }

        monitor "Number of preys" value: nb_preys;
        monitor "Number of predators" value: nb_predators;
    }
}
```
