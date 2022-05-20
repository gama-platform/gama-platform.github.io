---
title:  6. Exploration of the model
---

This final step illustrates how to explore the model through the introduction of batch experiments.


## Formulation

* Add an experiment to launch 10 simulations to analyze the sensitivity toward stochasticity.
* Add an experiment to explore the impact of the `proba_leave` parameter.
* Add an experiment to calibrate the model.

These 3 additions will add each a new experiment of type batch, more details about [batch experiment on this page](BatchExperiments).

## Model Definition

### Sensitivity analysis toward stochasticity

The aim is to run many simulations with the default values for parameters to analyze the impact of stochasticity over the simulation results. We choose as indicator to compare the simulations the `infected_rate` value after 2hours of simulations. We will launch 10 simulations and display the mean and standard deviation values of this variable over the 10 simulations.

To this purpose we need to define a new experiment with the following facet values:

* `type`: the type of the experiment, here we choose the `batch` mode to be able to launch many simulations in one launch.
* `until`: the stop condition in the batch experiment, here `time > 2#h`.
* `repeat`: the number of simulations to run with the same parameter values (number of replications), here 10.

```
experiment test_robustness type: batch until: time > 2#h repeat: 10 {
    reflex information {
	list&lt;float> vals <- simulations collect each.infected_rate;
	write "mean: " + mean(vals) + " standard deviation: " + standard_deviation(vals);	
    }
}
```

Experiments are also a kind of species. They can thus have variables and behaviors. Here we use the `simulations` variable that is the list of the 10 simulations (for the 10 replications). In addition, in batch mode, a reflex is executed at the end of all the replication simulations. We can thus create the list of all the `infected_rate` values (with the `collect` operator) and compute the `mean` and `standard_deviation`.


### Exploration

The aim here is to explore the impact of one parameter over the simulations' result. We keep the same indicator. We add the `parameter` to explore the `experiment` and specify the possible it can take with either the `among` facet or the combination of `min`, `max` and `step` facets.

```
experiment explore_model type: batch until: time > 2#h repeat: 2 {
    parameter "proba_leave" var: proba_leave among: [0, 0.01, 0.05, 0.1, 1.0];
	
    reflex save_results {
	ask simulations {
	    write "proba_leave: " + proba_leave + " infected_rate: " + self.infected_rate;
	    save [proba_leave, self.infected_rate] type: csv to:"results.csv";
	}
    }
}
```

In order to do a deeper investigation, in particular with an external tool, it could be useful to save the values in a file. To this purpose, we use the [`save` statement](Statements#save). In our example, we save a list of values in the csv file (`type: csv`) specified in the `to` facet.


### Calibration

The calibration process corresponds to the search of parameter values that maximize/minimize indicators. To this purpose, we need to define:

* the parameters to explore, with their possible values,
* the indicator to minimize/maximize,
* the exploration method.

Here we choose to minimize the value `abs(infected_rate - 0.5)` (i.e. we want to find parameters' value that makes the simulation having an `infected_rate` as close as possible to 0.5) after 2hours of simulation. The chosen optimization method is a genetic algorithm ([more details on this page](ExplorationMethods)).

```
experiment calibration_model type: batch until: time > 2#h repeat: 3 {
    parameter "infection distance" var: infection_distance min: 1.0 max: 20.0 step: 1;
    parameter "proba infection" var: proba_infection min: 0.01 max: 1.0 step: 0.01;
	
    method genetic pop_dim: 3 max_gen: 5 minimize: abs(infected_rate - 0.5);
}
```


## Complete Model

```
model model6

global {
    int nb_people <- 2147;
    int nb_infected_init <- 5;
    float step <- 5 #mn;
    
    float proba_leave <- 0.05;
    
    float infection_distance <- 5 #m;
    float proba_infection <- 0.05;
    
    file roads_shapefile <- file("../includes/roads.shp");
    file buildings_shapefile <- file("../includes/buildings.shp");
    geometry shape <- envelope(roads_shapefile);    
    graph road_network;
    
    
    int nb_people_infected <- nb_infected_init update: people count (each.is_infected);
    int nb_people_not_infected <- nb_people - nb_infected_init update: nb_people - nb_people_infected;
    float infected_rate update: nb_people_infected/nb_people;
    
    
    init{
        create road from: roads_shapefile;
        road_network <- as_edge_graph(road);        
        create building from: buildings_shapefile;
        create people number:nb_people {
            location <- any_location_in(one_of(building));                
        }
        ask nb_infected_init among people {
            is_infected <- true;
        }
    }
}

species people skills:[moving]{        
    float speed <- (2 + rnd(3)) #km/#h;
    bool is_infected <- false;
    point target;
    
    reflex stay when: target = nil {
        if flip(proba_leave) {
            target <- any_location_in (one_of(building));
        }
    }
        
    reflex move when: target != nil{
        do goto target:target on: road_network;
        if (location = target) {
            target <- nil;
        } 
    }

    reflex infect when: is_infected{
        ask people at_distance infection_distance {
            if flip(proba_infection) {
                is_infected <- true;
            }
        }
    }
    
    aspect circle {
        draw circle(10) color:is_infected ? #red : #green;
    }
    
    aspect geom3D {
        if target != nil {
            draw obj_file("../includes/people.obj", 90::{-1,0,0}) size: 5
            at: location + {0,0,7} rotate: heading - 90 color: is_infected ? #red : #green;
        }
    }
    
}

species road {
    aspect geom {
        draw shape color: #black;
    }
    aspect geom3D {
        draw line(shape.points, 2.0) color: #black;
    }
}

species building {
    aspect geom {
        draw shape color: #gray;
    }
    aspect geom3D {
        draw shape depth: 20 #m border: #black texture:["../includes/roof_top.png","../includes/texture.jpg"];
    }
}

experiment main type: gui {
    parameter "Nb people infected at init" var: nb_infected_init min: 1 max: 2147;

    output {
        monitor "Infected people rate" value: infected_rate;
        
        display map {
            species road aspect:geom;
            species building aspect:geom;
            species people aspect:circle;            
        }
    
        display chart_display refresh: every(10 #cycles) {
            chart "Disease spreading" type: series {
                data "susceptible" value: nb_people_not_infected color: #green;
                data "infected" value: nb_people_infected color: #red;
            }
        }
        display view3D type: opengl ambient_light: 80 {
            image "../includes/luneray.png" refresh:false; 
            species building aspect:geom3D refresh: false;
            species road aspect: geom3D refresh: false;
            species people aspect: geom3D ; 
        }
    }
}

experiment test_robustness type: batch until: time > 2#h repeat: 10 {
    reflex information {
        list&lt;float> vals <- simulations collect each.infected_rate;
        write "mean: " + mean(vals) + " standard deviation: " + standard_deviation(vals);    
    }
}

experiment explore_model type: batch until: time > 2#h repeat: 2 {
    parameter "proba_leave" var: proba_leave among: [0, 0.01, 0.05, 0.1, 1.0];
    
    reflex save_results {
        ask simulations {
            write "proba_leave: " + proba_leave + " infected_rate: " + self.infected_rate;
            save [proba_leave, self.infected_rate] type: csv to:"results.csv";
        }
    }
}

experiment calibration_model type: batch until: time > 2#h repeat: 3 {
    parameter "infection distance" var: infection_distance min: 1.0 max: 20.0 step: 1;
    parameter "proba infection" var: proba_infection min: 0.01 max: 1.0 step: 0.01;
    
    method genetic pop_dim: 3 max_gen: 5 minimize: abs(infected_rate - 0.5);
}
```
