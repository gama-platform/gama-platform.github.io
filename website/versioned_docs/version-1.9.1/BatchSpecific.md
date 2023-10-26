---
title:  Batch Specific UI
---


When an [experiment of type Batch](BatchExperiments) is run, a dedicated UI is displayed, depending on the parameters to explore and of the exploration methods.


## Table of contents 

* [Batch Specific UI](#batch-specific-ui)
  * [Information bar](#information-bar)
  * [Batch UI](#batch-ui)

## Information bar

In batch mode, the top information bar displays 3 distinct information (instead of only the cycle number in the GUI experiment):

* The **run** number: One run corresponds to N executions of simulation with one given parameters values (N is an integer given by the facet `repeat` in the definition of a [batch `experiment`](BatchExperiments). The number of runs is chosen by the [exploration method](ExplorationMethods)).
* The **simulation** number: the number of replications done (and the number of replications specified with the `repeat` facet);
* The number of **thread**: the number of threads used for the simulation.

![images/batch_Information_bar.png](/resources/images/runningExperiments/batch_Information_bar.png)


## Batch UI

The parameters view is also a bit different in the case of a Batch UI: 

* it shows both the parameters of the experiment, with a distinction between the ones that will be explored and the ones that will not.
* it also shows the state of the exploration. The provided information will depend on [the exploration method](ExplorationMethods#exhaustive-exploration-of-the-parameter-space).

The following interface is generated given the following `experiment` (the exploration method is here the `exhaustive one`):
```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed) or (time > 400) {
   parameter 'Size of the grid:' var: gridsize init: 75 unit: 'width and height';
   parameter 'Number:' var: ants_number init: 200 unit: 'ants';
   parameter 'Evaporation:' var: evaporation_per_cycle among: [0.1, 0.2, 0.5, 0.8, 1.0] unit: 'rate every cycle (1.0 means 100%)';
   parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

   method exhaustive maximize: food_gathered;
}
```

![The batch UI for an exhaustive exploration method.](/resources/images/runningExperiments/batch_Parameters_pane_exhaustive.png)


The interface summarises all model parameters and the parameters given to the exploration method:

* **Environment and Population**: displays all the model parameters that should not be explored. Those parameters must be initialized with a fixed value when they are defined in the `experiment`.
* **Parameters to explore**: the parameters to explore are the parameters defined in the experiment with a range of values (with `among` facet or `min`, `max` and `step` facets);
* **Exploration method**: it displays information about the exploration method and the stop condition. It displays the size of the parameter space in the case of the exhaustive method, and different parameters (e.g. mutation or crossover probability...) for other methods. Finally, the best and the last fitnesses found are shown, along with the associated parameter sets.

The following interface corresponds to the same experiment as previously, but with [the `genetic` exploration method](ExplorationMethods#genetic-algorithm).

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed) or (time > 400) {
   // [Parameters]
   method genetic maximize: food_gathered;
}
```

![The batch UI for a genetic exploration method.](/resources/images/runningExperiments/batch_Parameters_pane_genetic.png)

