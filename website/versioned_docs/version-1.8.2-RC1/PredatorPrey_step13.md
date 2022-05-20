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

We now need to define the parameters to explore: similarly to `gui` experiment, parameters are taken among the global variables. In a `batch` experiment, it is necessary to define their value range (using the `among` facet or the `min`, `max`, and `step` ones).

```
parameter "Prey max transfer:" var: prey_max_transfer min: 0.05 max: 0.5 step: 0.05 ;
parameter "Prey energy reproduce:" var: prey_energy_reproduce min: 0.05 max: 0.75 step: 0.05;
parameter "Predator energy transfer:" var: predator_energy_transfer min: 0.1 max: 1.0 step: 0.1 ;
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
	save [int(self),prey_max_transfer,prey_energy_reproduce,predator_energy_transfer,predator_energy_reproduce,self.nb_predators,self.nb_preys] 
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
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2013.gaml
```
