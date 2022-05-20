---
title:  13. Model exploration
---


This 13th step illustrates how to explore the model using a batch experiment.


## Formulation

* Addition of a new experiment of type batch.
* Definition of the parameters to be explored.
* Definition of the exploration method.


## Model Definition

The model itself (the `global` and the various species) will be modified. We will simply add a new experiment to define a new way of launching the simulation.

### batch experiment

We will thus add a new `experiment` in the file. The specificity of this experiment will be its `type`: we will define a `batch` experiment, instead of a `gui` (as done until now). This experiment will not manage any display but will run several simulations to explore the parameter space (depending on the exploration method).

```
experiment Optimization type: batch repeat: 2 keep_seed: true until: ( time > 200 ) {
    ...
}
```

A `batch` experiment comes with more facets:

* **`repeat`**: the number of simulations to launch for a single parameter configuration,
* **`keep_seed`**: set whether the seed of the random number generator is the same for each first replication (the first simulation run for a given parameter configuration),
* **`until`**: define the simulation stop condition.

### Parameters definition

We now need to define the parameters to explore: similarly to `gui` experiment, parameters are taken among the global variables. In a `batch` experiment, it is necessary to define their value range (using the `among` facet or the `min`, `max` and `step` ones).

```
parameter "Prey max transfert:" var: prey_max_transfert min: 0.05 max: 0.5 step: 0.05 ;
parameter "Prey energy reproduce:" var: prey_energy_reproduce min: 0.05 max: 0.75 step: 0.05;
parameter "Predator energy transfert:" var: predator_energy_transfert min: 0.1 max: 1.0 step: 0.1 ;
parameter "Predator energy reproduce:" var: predator_energy_reproduce min: 0.1 max: 1.0 step: 0.1;
```

### Exploration method

Finally, the exploration method has to be specified (the default method is exhaustive exploration). GAMA provides several methods, [detailed in this page](ExplorationMethods).
We choose here the Tabu search method, defined by:
```
method tabu maximize: nb_preys + nb_predators iter_max: 10 tabu_list_size: 3;
```

### Save exploration results

In a previous step, we introduced the save of results at each step of a simulation. When exploring a model, it could be interesting to save results after each simulation.

To this purpose, we will use again the `save` statement but in a `reflex` of the `experiment` and not a reflex of the model. In **a batch experiment**, the reflexes are executed after all the replications for a single parameter configuration. The built-in `simulations` variable contains all the simulations; we can thus ask them the results we want to save. In addition, we save the parameter values to keep track. 

We will use the `save` statement to save the results as a `csv` file (as it is easier to manipulate by analysis software, such as R). We can thus save a list of values:

```
reflex save_results_explo {
    ask simulations {
	save [int(self),prey_max_transfert,prey_energy_reproduce,predator_energy_transfert,predator_energy_reproduce,self.nb_predators,self.nb_preys] 
          to: "results.csv" type: "csv" rewrite: (int(self) = 0) ? true : false header: true;
    }		
}
```
This saved for each simulation its `self.nb_predators` and `self.nb_preys`. Note that `self` here is mandatory!


### Deal with the simulation stop

An issue we will have with the model is that it already has a stop condition: it pauses when either the number of preys or the number of predators become zero. We will introduce a new global variable `is_batch` to specify whether the simulation is in batch mode or not. In batch mode, the reflex `stop_simulation` should not be executed.

```
global {
    ...
    bool is_batch <- false;
    ...
    reflex stop_simulation when: ((nb_preys = 0) or (nb_predators = 0)) and !is_batch {
	do pause ;
    } 
}
```

This variable should thus now be initialized by default to `false` (so in the `init` block of the model) and in the batch experiment to true.

```
experiment Optimization type: batch repeat: 2 keep_seed: true until: ( time > 200 ) {
    ...
    parameter "Batch mode:" var: is_batch <- true;
    ...
}
```


## Conclusion

Congratulations, you have completed your first GAMA models! Now, you have enough knowledge to create many models that includes: dynamic grid-based environment, moving and interacting agents and the needed visualization to make good use of your simulation. Feel free to use this knowledge to create your very own models! Or perhaps you want to continue your study with the more advanced [tutorials](Tutorials)?



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
    file map_init <- image_file("../includes/data/raster_map.png");
    int nb_preys -> {length(prey)};
    int nb_predators -> {length(predator)};
    bool is_batch <- false;

    init {
        create prey number: nb_preys_init;
        create predator number: nb_predators_init;
        ask vegetation_cell {
            color <- rgb (map_init at {grid_x,grid_y});
            food <- 1 - (((color as list) at 0) / 255);
            food_prod <- food / 100; 
        }
    }
    
    reflex save_result when: (nb_preys > 0) and (nb_predators > 0){
        save ("cycle: "+ cycle + "; nbPreys: " + nb_preys
            + "; minEnergyPreys: " + (prey min_of each.energy)
            + "; maxSizePreys: " + (prey max_of each.energy) 
               + "; nbPredators: " + nb_predators           
               + "; minEnergyPredators: " + (predator min_of each.energy)          
               + "; maxSizePredators: " + (predator max_of each.energy)) 
               to: "results.txt" type: "text" rewrite: (cycle = 0) ? true : false;
    }
    
    reflex stop_simulation when: ((nb_preys = 0) or (nb_predators = 0)) and !is_batch {
        do pause;
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

        display Population_information refresh: every(5#cycles) {
            chart "Species evolution" type: series size: {1,0.5} position: {0, 0} {
                data "number_of_preys" value: nb_preys color: #blue;
                data "number_of_predator" value: nb_predators color: #red;
            }
            chart "Prey Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0, 0.5} {
                data "]0;0.25]" value: prey count (each.energy <= 0.25) color:#blue;
                data "]0.25;0.5]" value: prey count ((each.energy > 0.25) and (each.energy <= 0.5)) color:#blue;
                data "]0.5;0.75]" value: prey count ((each.energy > 0.5) and (each.energy <= 0.75)) color:#blue;
                data "]0.75;1]" value: prey count (each.energy > 0.75) color:#blue;
            }
            chart "Predator Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0.5, 0.5} {
                data "]0;0.25]" value: predator count (each.energy <= 0.25) color: #red;
                data "]0.25;0.5]" value: predator count ((each.energy > 0.25) and (each.energy <= 0.5)) color: #red;
                data "]0.5;0.75]" value: predator count ((each.energy > 0.5) and (each.energy <= 0.75)) color: #red;
                data "]0.75;1]" value: predator count (each.energy > 0.75) color: #red;
            }
        }

        monitor "Number of preys" value: nb_preys;
        monitor "Number of predators" value: nb_predators;
    }
}

experiment Optimization type: batch repeat: 2 keep_seed: true until: ( time > 200 ) {
    parameter "Prey max transfert:" var: prey_max_transfert min: 0.05 max: 0.5 step: 0.05;
    parameter "Prey energy reproduce:" var: prey_energy_reproduce min: 0.05 max: 0.75 step: 0.05;
    parameter "Predator energy transfert:" var: predator_energy_transfert min: 0.1 max: 1.0 step: 0.1;
    parameter "Predator energy reproduce:" var: predator_energy_reproduce min: 0.1 max: 1.0 step: 0.1;
    parameter "Batch mode:" var: is_batch <- true;
    
    method tabu maximize: nb_preys + nb_predators iter_max: 10 tabu_list_size: 3;
    
    
    reflex save_results_explo {
        ask simulations {
            save [int(self),prey_max_transfert,prey_energy_reproduce,predator_energy_transfert,predator_energy_reproduce,self.nb_predators,self.nb_preys] 
                   to: "results.csv" type: "csv" rewrite: (int(self) = 0) ? true : false header: true;
        }        
    }
}
```
