---
title: 12. Image loading
id: version-1.8.1-PredatorPrey_step12
original_id: PredatorPrey_step12
---


This 12th step illustrates how to load an image file and to use it to initialize a grid.


## Formulation

* Building of the initial environment (`food` and `food_prod` of the cells) from an image file.


## Model Definition

### global variable

We add a new global variable to store the image data:
```
file map_init <- image_file("../includes/data/raster_map.png");
```

The image file is here: [![Image to initialize the Prey Predator tutorial model.](../resources/images/tutorials/predator_prey_raster_map.png)](../resources/images/tutorials/predator_prey_raster_map.png)

You have to copy it in your project folder: `includes/data/`.

### Model initialization

In order to have a more complex environment, we want to use this image as the initialization of the environment. The food level available in a `vegetation_cell` will be based on the green level of the corresponding pixel in the image. You will be able to use such a process to represent an existing real environment in your model.

We modify the global `init` of the model in order to cast the image file in a matrix. 

First of all, when the variable `map_init` is defined from an image file (or a csv file), it can be manipulated directly as a matrix, with the dimensions of the image (here it is a 50x50 image, which matches with the grid size). In the case we need to resize the image, we can use the **`file as_matrix  {nb_cols, nb_lines}`** operator that allows converting a file (image, csv) to a matrix composed of `nb_cols` columns and `nb_lines` lines.

Concerning the manipulation of a matrix, it is possible to obtain the element [i,j] of a matrix by using **`my_matrix [i,j]`**.

A grid can be view as a spatial matrix: each cell of a grid has two built-in variables **`grid_x`** and **`grid_y`** that represent the column and line indexes of the cell.

```
init {
    create prey number: nb_preys_init ;
    create predator number: nb_predators_init ;
    ask vegetation_cell {
	color <- rgb (map_init at {grid_x,grid_y}) ;
	food <- 1 - (((color as list) at 0) / 255) ;
	food_prod <- food / 100 ; 
    }
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
    float prey_proba_reproduce <- 0.01;
    int prey_nb_max_offsprings <- 5;
    float prey_energy_reproduce <- 0.5;
    float predator_proba_reproduce <- 0.01;
    int predator_nb_max_offsprings <- 3;
    float predator_energy_reproduce <- 0.5;
    file map_init <- image_file("../includes/data/raster_map.png");
    int nb_preys -> {length(prey)};
    int nb_predators -> {length(predator)};

    init {
        create prey number: nb_preys_init;
        create predator number: nb_predators_init;
        ask vegetation_cell {
            color <-  rgb(map_init at {grid_x,grid_y});
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
    
    reflex stop_simulation when: (nb_preys = 0) or (nb_predators = 0) {
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
        list<prey> reachable_preys <- prey inside (my_cell);
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
    list<vegetation_cell> neighbors2 <- (self neighbors_at 2);
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
```
