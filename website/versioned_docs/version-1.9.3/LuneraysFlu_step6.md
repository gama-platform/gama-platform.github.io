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
	list<float> vals <- simulations collect each.infected_rate;
	write "mean: " + mean(vals) + " standard deviation: " + standard_deviation(vals);	
    }
}
```

Experiments are also a kind of species. They can thus have variables and behaviors. Here we use the `simulations` variable that is the list of the 10 simulations (for the 10 replications). In addition, in batch mode, a reflex is executed at the end of all the replication simulations. We can thus create the list of all the `infected_rate` values (with the `collect` operator) and compute the `mean` and `standard_deviation`.


### Exploration

The aim here is to explore the impact of one parameter over the simulations' results. We keep the same indicator. We add the `parameter` to explore the `experiment` and specify the possibility it can take with either the `among` facet or the combination of `min`, `max`, and `step` facets.

```
experiment explore_model type: batch until: time > 2#h repeat: 2 {
    parameter "proba_leave" var: proba_leave among: [0, 0.01, 0.05, 0.1, 1.0];
	
    reflex save_results {
	ask simulations {
	    write "proba_leave: " + proba_leave + " infected_rate: " + self.infected_rate;
	    save [proba_leave, self.infected_rate] type: csv to:"results.csv" rewrite: (int(self) = 0) ? true : false header: true ;
	}
    }
}
```

In order to do a deeper investigation, in particular with an external tool, it could be useful to save the values in a file. For this purpose, we use the [`save` statement](Statements#save). In our example, we save a list of values in the csv file (`type: csv`) specified in the `to` facet.


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


```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.2/msi.gama.models/models/Tutorials/Luneray%20flu/models/model6.gaml
```
