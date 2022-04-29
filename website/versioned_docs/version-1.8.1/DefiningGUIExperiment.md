---
title: Defining GUI Experiment
id: version-1.8.1-DefiningGUIExperiment
original_id: DefiningGUIExperiment
---

[//]: # (startConcept|gui_experiments)

When you execute your simulation, you will often need to display some information. For each simulation, you can define some inputs, outputs and behaviors:

* The inputs will be composed of parameters manipulated by the user for each simulation.
* The behaviors will be used to define behavior executed at each step of the **experiment**.
* The outputs will be composed of displays, monitors. They will be defined inside the scope `output`. The definition of their layout can also be set with the `layout` statement.

```
experiment exp_name type: gui {
    [input]
    [beahaviors]
    output {
        layout [layout_option]
        [display statements]
        [monitor statements]
    }
}
```

## Types of experiments

You can define fours types of experiments (through the facet `type`):

* **`gui`** experiments (the default type) are used to play an experiment and displays its outputs. It is also used when the user wants to interact with the simulations.
* **`batch`** experiments are used to play an experiment several times (usually with other input values), used for model exploration. We will [come back to this notion a bit further in the tutorial](BatchExperiments).
* **`test`** experiments are used to [write unit tests](Writing_Tests) on a model (used to ensure its quality).
* **`memorize`** experiments are GUI experiments in which [the simulation state is kept in memory and the user can backtrack to any previous step](Save-and-restore-simulations).


## Experiment attributes

Inside experiment scope, you can access to some built-in attributes which can be useful, such as `minimum_cycle_duration`, to force the duration of one cycle. 

```
experiment my_experiment type: gui {
    float minimum_cycle_duration <- 2.0#minute;
}
```

In addition, the attributes `simulations` (resp. `simulation) contain the list of all the simulation agents that are running in the current experiment (resp. a single simulation, the last element of the simulation list).


## Experiment facets

Finally, in the case of a GUI experiment, the facet `autorun` and `benchmark` can be used such as:
```
experiment name type: gui autorun: true benchmark: true { }
```
When `autorun` is set to `true` the launch of the experiment will be followed automatically by its run. When `benchmark` is set to true, GAMA records the number of invocations and running time of the statements and operators of the simulations launched in this experiment. The results are automatically saved in a csv file in a folder called 'benchmarks' when the experiment is closed.

Other built-ins are available, to learn more about, go to the page **[experiment built-in](ExperimentBuiltIn)**.


## Defining displays layout

The `layout` can be added to `output` to specify the layout of the various displays defined below (e.g. `#nonce`, `#split`, `#stack`, `#vertical` or `#horizontal`). It will also define which elements of the interface are displayed: `parameters`, `navigator`, `editors`, `consoles`, `toolbars`, `tray`, or `tabs` facets (expecting a boolean value).


## Defining elements of the GUI experiment

[//]: # (endConcept|gui_experiments)
In this part, we will focus on the **gui experiments**. We will start with learning how to **[define input parameters](DefiningParameters)**, then we will study the outputs, such as **[displays](DefiningDisplaysGeneralities)**, **[monitors and inspectors](DefiningMonitorsAndInspectors)**, and **[export files](DefiningExportFiles)**. We will finish this part with how to define **[user commands](DefiningUserInteraction)**.
