---
layout: default
title: Defining GUI Experiment
wikiPageName: DefiningGUIExperiment
wikiPagePath: wiki/DefiningGUIExperiment.md
---
[//]: # (startConcept|gui_experiments)
# Defining GUI Experiment

When you execute your simulation, you will often need to display some information. For each simulation, you can define some inputs and outputs:
* The inputs will be composed of parameters manipulated by the user for each simulation.
* The outputs will be composed of displays, monitors or output files. They will be define inside the scope `output`.

```
experiment exp_name type: gui {
   [input]
   output {
     [display statements]
     [monitor statements]
     [file statements]
   }
}
```

You can define two types of experiment (through the facet `type`):
* **`gui`** experiments (the default type) are used to play an experiment, and interpret its outputs.
* **`batch`** experiments are used to play an experiment several times (usually with other input values), used for model exploration. We will come back to this notion a bit further in the tutorial.

Inside experiment scope, you can access to some built-ins which can be useful, such as `minimum_cycle_duration`, to force the duration of one cycle.

```
experiment my_experiment type: gui {
	float minimum_cycle_duration <- 2.0#minute;
}
```

Other built-ins are available, to learn more about, go to the page **[experiment built-in](ExperimentBuiltIn)**.

[//]: # (endConcept|gui_experiments)
In this part, we will focus on the **gui experiments**. We will start with learning how to **[define input parameters](DefiningParameters)**, then we will study the outputs, such as **[displays](DefiningDisplaysGeneralities)**, **[monitors and inspectors](DefiningMonitorsAndInspectors)**, and **[export files](DefiningExportFiles)**. We will finish this part with how to define **[user commands](DefiningUserInteraction)**.
