---
title:  Defining Batch Experiments
---


Batch experiments allow to execute numerous successive simulation runs. They are used to explore the parameter space of a model or to optimize a set of model parameters. [Exploration methods are detailed in this page.](ExplorationMethods)

A Batch experiment is defined by:

```
experiment exp_title type: batch until: condition {
   [parameter to explore]
   [exploration method]
   [reflex]
   [permanent]
}
```

## Table of contents 

* [The batch experiment facets](#the-batch-experiment-facets)
* [Action `_step_` and reflexes](#action-_step_-and-reflexes)
* [Permanent](#permanent)



## The batch experiment facets

Batch experiments have the following three facets:

* `until`: (expression) Specifies when to stop each simulation. Its value is a condition on variables defined in the model. The run will stop when the condition is evaluated to true. If omitted, the first simulation run will go forever, preventing any subsequent run to take place (unless a halt command is used in the model itself).
* `repeat`: (integer) Specifies the number of simulations replications for each parameter configuration (a set of values assigned to the parameters). This means that several simulation will be run with the same parameter values, however a different random seed will be used for the pseudo-random number generator for each simulation. This allows to get some statistical power from the experiments conducted for stochastic models. The default value is 1.
* `keep_seed`: (boolean) If true, the same series of random seeds will be used from one parameter configuration to another. The default value is false.

```
experiment my_batch_experiment type: batch repeat: 5 keep_seed: true until: (cycle = 300) {
   [parameter to explore]
   [exploration method]
}
```


## Action `_step_` and reflexes

As for any species, `experiment` can define as many `reflex` as needed. In a `batch` experiment, they will be executed at the end of each bunch of simulations (set of replications) for a given parameters configuration. Note that at the experiment level, you have access to all the species and all the global variables and to all the simulations (variable `simulations`).

To be complete, each experiment (as any agent) will call at each step (i.e. the end of the replications set) the `_step_` action: this action is in charge of executing the behavior of the experiment agent, that is by default the execution of each of its `reflex`. It is possible to redefine the action `_step_`, but this should be used with care since this inhibits the reflexes.

For instance, the following experiment runs the simulation 5 times, and saves the people agents in a single shapefile at the end of the 5 simulations.
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( time > 1000 ) {
    int cpt <- 0;

    reflex save_people {
	save people type:"shp" to:"people_shape" + cpt + ".shp" with: [is_infected::"INFECTED", is_immune::"IMMUNE"];
	cpt <- cpt + 1;
    }
}
```

The same can be done using the `action _step_ {` instead of `reflex save_people {`.

But if now we want to save information from the 5 simulations and save 1 shapefile per replication, we need to use the built-in attribute `simulations`. To save 1 shapefile per simulation run, we thus need to write:
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( time > 1000 ) {
    reflex end_of_runs {
	int cpt <- 0;
	ask simulations {
	    save people type: "shp" to: "result/people_shape" + cpt + ".shp" with: [is_infected::"INFECTED", is_immune::"IMMUNE"];
	    cpt <- cpt + 1;
	}
    }
}
```

If now we want to save in a file aggregated values over the five simulations, such as the average number of infected people over the five simulations, we need to write:
```
experiment 'Run 5 simulations' type: batch repeat: 5 keep_seed: true until: ( cycle > 1000 ) {
    reflex t {
        save [cycle, simulations mean_of each.nb_infected] to: "result.txt" type: "csv";
    }
}
```

## Permanent
The `permanent` statement allows the modeler to define an output block that will not be re-initialized at the beginning of each simulation but will be filled instead at the end of each simulation.
For instance, this `permanent` section will plot for each simulation the end value of the `food_gathered` variable (defined as a global variable in the model).

```
permanent {
    display Ants background: #white refresh: every(1#cycle) {
	chart "Food Gathered" type: series {
	    data "Food" value: food_gathered;
	}
    }
}
```

## Parameter sets in parallel
There is an option in the `Preferences...` menu of Gama to allow multiple replications to be executed in parallel, that is to fully use assigned cores to computation. In that case, `permanent` and `reflex` blocks in the `experiment` will only be triggered once at the end of the whole set of simulations, rather than after each set of replications. Therefor, this option should only be used when doing none GUI batch experiment
