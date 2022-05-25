---
title:  10. Charts
---


This 10th step illustrates how to define charts.



## Formulation

* Addition of a new display to visualize:
  * One chart representing the evolution of the quantity of prey and predator agents over time.
  * Two histograms representing the energy distribution of the prey and predator agents.


## Model Definition

### output

GAMA can display various chart types:

* Time series
* Pie charts
* Histograms

A chart must be defined in a display: it behaves exactly like any other layer.

Definition of a chart:

```
chart chart_name type: chart_type {
    [data]
}
```

The data to draw are defined inside the `chart` block as follow, using the `data` statement:

```
data data_legend value: data_value
```

We add a new display called **`Population_information`** that refreshes every 5 simulation steps.
Inside this display, we define 3 charts: one of type `series` (i.e. time series chart), two of type `histogram`:

* "Species evolution"; background: white; size: {1, 0.5}; position: {0, 0}
  * data1: `nb_preys`; color : blue
  * data2: `nb_predators`; color : red

* "Prey Energy Distribution"; background: lightGray; size: {0.5, 0.5}; position: {0, 0.5}
  * data "]0;0.25]": number of preys with (each.energy <= 0.25) ;
  * data "]0.25;0.5]": number of preys with ((each.energy > 0.25) and (each.energy <= 0.5)) ;
  * data "]0.5;0.75]": number of preys with ((each.energy > 0.5) and (each.energy <= 0.75)) ;
  * data "]0.75;1]": number of preys with  (each.energy > 0.75) ;

* "Predator Energy Distribution"; background: lightGray; size: {0.5, 0.5}; position: {0.5, 0.5}
  * data "]0;0.25]": number of predators with (each.energy <= 0.25) ;
  * data "]0.25;0.5]": number of predators with ((each.energy > 0.25) and (each.energy <= 0.5)) ;
  * data "]0.5;0.75]": number of predators with ((each.energy > 0.5) and (each.energy <= 0.75)) ;
  * data "]0.75;1]": number of predators with  (each.energy > 0.75) ;

To evaluate the value of the data of the two histogram, we use the operator **`list count condition`** that returns the number of elements of `list` for which the condition is true.

```
display Population_information refresh:every(5#cycles) {
    chart "Species evolution" type: series size: {1,0.5} position: {0, 0} {
	data "number_of_preys" value: nb_preys color: #blue ;
	data "number_of_predator" value: nb_predators color: #red ;
    }
    chart "Prey Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0, 0.5} {
	data "]0;0.25]" value: prey count (each.energy <= 0.25) color:#blue;
	data "]0.25;0.5]" value: prey count ((each.energy > 0.25) and (each.energy <= 0.5)) color:#blue;
	data "]0.5;0.75]" value: prey count ((each.energy > 0.5) and (each.energy <= 0.75)) color:#blue;
	data "]0.75;1]" value: prey count (each.energy > 0.75) color:#blue;
    }
    chart "Predator Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0.5, 0.5} {
	data "]0;0.25]" value: predator count (each.energy <= 0.25) color: #red ;
	data "]0.25;0.5]" value: predator count ((each.energy > 0.25) and (each.energy <= 0.5)) color: #red ;
	data "]0.5;0.75]" value: predator count ((each.energy > 0.5) and (each.energy <= 0.75)) color: #red ;
	data "]0.75;1]" value: predator count (each.energy > 0.75) color: #red;
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
    int nb_preys -> {length(prey)};
    int nb_predators -> {length(predator)};

    init {
        create prey number: nb_preys_init;
        create predator number: nb_predators_init;
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
