---
layout: default
title:  Defining Batch Experiments
wikiPageName: BatchExperiments
wikiPagePath: wiki/BatchExperiments.md
---

[//]: # (keyword|concept_batch)
# Defining Batch Experiments

Batch experiments allows to execute numerous successive simulation runs.They are used to explore the parameter space of a model or to optimize a set of model parameters.

A Batch experiment is defined by:

```
experiment exp_title type: batch {
   [parameter to explore]
   [exploration method]
   [reflex]
   [permanent]
}
```

## Table of contents 

* [The batch experiment facets](#the-batch-experiment-facets)
* [Action _step](#action-step)
* [Reflexes](#reflexes)
* [Permanent](#permanent)



## The batch experiment facets
Batch experiment have the following three facets:
* until: (expression) Specifies when to stop each simulations. Its value is a condition on variables defined in the model. The run will stop when the condition is evaluated to true. If omitted, the first simulation run will go forever, preventing any subsequent run to take place (unless a halt command is used in the model itself).
* repeat: (integer) A parameter configuration corresponds to a set of values assigned to each parameter. The attribute repeat specifies the number of times each configuration will be repeated, meaning that as many simulations will be run with the same parameter values. Different random seeds are given to the pseudo-random number generator. This allows to get some statistical power from the experiments conducted. Default value is 1.
* keep\_seed: (boolean) If true, the same series of random seeds will be used from one parameter configuration to another. Default value is false.

```
experiment my_batch_experiment type: batch repeat: 5 keep_seed: true until: time = 300 {
   [parameter to explore]
   [exploration method]
}
```


## Action _step
The_step_action of an experiment is called at the end of a simulation. It is possible to override this action to apply a specific action at the end of each simulation. Note that at the experiment level, you have access to all the species and all the global variables._

For instance, the following experiment runs the simulation 5 times, and, at the end of each simulation, saves the people agents in a shapefile.
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( time > 1000 ) {
	int cpt <- 0;
	action _step_ {
		save people type:"shp" to:"people_shape" + cpt + ".shp" with: [is_infected::"INFECTED",is_immune::"IMMUNE"];
		cpt <- cpt + 1;
	}
}

A second solution to achieve the same result is to use reflexes (see below).
```


## Reflexes
It is possible to write reflexes inside a batch experiment. This reflex will be executed at the end of each simulation. For instance, the following reflex writes at the end of each simulation the value of the variable _food\_gathered_:

```
reflex info_sim {
	write "Running a new simulation " + simulation + " -> " + food_gathered;
}
```

[//]: # (keyword|concept_output)
[//]: # (keyword|concept_permanent)
## Permanent
The **permanent** section allows to define a output block that will not be re-initialized at the beginning of each simulation but will be filled at the end of each simulation.
For instance, this **permanent** section will allows to display for each simulation the end value of the _food\_gathered_ variable.
```
permanent {
	display Ants background: rgb('white') refresh:every(1) {
		chart "Food Gathered" type: series {
			data "Food" value: food_gathered;
		}
	}
}
```
