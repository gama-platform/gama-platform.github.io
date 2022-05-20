---
title:  Controls of experiments
---


The simulation perspective adds on the user interface a number of new menus and commands (i.e. buttons) that are specific to experiment-related tasks.


## Table of contents 

* [Controls of experiments](#controls-of-experiments)
  * [Experiment Menu](#experiment-menu)
  * [Agents Menu](#agents-menu)
  * [General Toolbar](#general-toolbar)



## Experiment Menu
A menu, called "**Experiment**", allows controlling the current experiment. It shares some of its commands with the general toolbar (see [below](#general-toolbar)).

![The Experiment menu available in the Simulation perspective.](/resources/images/runningExperiments/menuCommand_menu_experiment.png)


* **Run/Pause Experiment**: allows to run or pause the experiment depending on its current state.
* **Step Experiment**: runs the experiment for one cycle and pauses it after.
* **Reload Experiment**: stops the current experiment, deletes its contents and reloads it, **taking into account the [parameters values](ParametersView) that might have been changed by the user**.
* **Stop at first error**: if checked, the current experiment will stop running when an error is issued. The default value can be configured in the [preferences](Preferences).
* **Treat warnings like errors**: if checked, a warning will be considered as an error (and if the previous item is checked, will stop the experiment). The default value can be configured in the [preferences](Preferences).
* **Display errors and warning**: if checked, displays the errors and warnings issued by the experiment. If not, do not display them. The default value can be configured in the [preferences](Preferences).
* **Close Experiment**: forces the experiment to stop, whatever it is currently doing, purges the memory from it, and switches to the modeling perspective. **Use this command with caution**, as it can have undesirable effects depending on the state of the experiment (for example, if it is reading files, or outputting data, etc.).


## Agents Menu

A second menu is added in the simulation perspective: "**Agents**". This menu allows for easy access to the different agents that populate an experiment.

![The Agents menu, available from the Simulation perspective.](/resources/images/runningExperiments/menuCommand_menu_agents.png)


This hierarchical menu is always organized in the same way, whatever the experiment being run. A first level is dedicated to the current top-level **experiment** agent: it allows the modeler to inspect the agent itself and to [browse](InspectorsAndMonitors) its population(s) (i.e. the **simulation** agents). A second level lists the "micro-populations" present in each simulation agent and allows to inspect the agent itself. And the third level will give access to an overview of all the agents of the population in a table ("Browse ant population...") and to each individual agent in these populations. This organization is, of course, recursive: if these agents are themselves, hosts of micro-populations, they will be displayed in their individual menu.


Each agent, when selected, will reveal a similar individual menu. This menu will contain a set of predefined actions, [the commands defined by the user for this species](DefiningUserInteraction#define-user-command) if any, and then the micro-populations hosted by this agent, if any. Agents (like the instances of "ant" below) that do not host other agents and whose species has no user commands will have a "simple" individual menu.

![Menu to display possible actions on individual random agents.](/resources/images/runningExperiments/menuCommand_menu_agents_individual.png)

These are the 4 actions that will be there most of the time:

* **Inspect**: open an [inspector](InspectorsAndMonitors) on this agent.
* **Focus on all displays**: this option is not accessible if no displays are defined. Makes all the displays zoom on the selected agent (if it is displayed) so that it occupies the whole view.
* **Highlight**: makes this agent the current "highlighted" agent, forcing it to appear "highlighted" in all the displays that might have been defined.
* **Kill**: destroys the selected agent and disposes of it. **Use this command with caution**, as it can have undesirable effects if the agent is currently executing its behavior.

If an agent hosts other agents (it is the case in [multi-level architecture](MultiLevelArchitecture)), you can access to the micro-population quite easily (e.g. in the model `Library models/Modeling/Multi-Level Usage/Corridor.gaml`): 

![Display of random species, when it contains micro-species.](/resources/images/runningExperiments/menuCommand_menu_agents_multi_level.png)

If [user commands](DefiningUserInteraction#define-user-command) are defined for a species (for example in the existing model `Library models/Visualization and User Interaction/User Interaction/User Command.gaml`), their individuals' menu will look like the following. Notice that in this model two species have user command:

1. the simulation agent (2 user commands are defined in the `global` section of the model),
2. the ants agents (2 user commands defined in the `species` definition section).

![Display of the user commands available in agents of the model.](/resources/images/runningExperiments/menuCommand_menu_agents_user_command.png)



## General Toolbar

The last piece of user interface specific to the Simulation Perspective is a toolbar, which contains controls and information displays related to the current experiment.

This toolbar is voluntarily minimalist, with four buttons already present in the [experiment menu](#experiment-menu) (namely, "Play/Pause Experiment", "Step Experiment", "Reload Experiment" and "Close Experiment"), which do not need to be detailed here, and two new controls ("Experiment status" and "Cycle Delay"), which are explained below.

![The toolbar controlling the simulation.](/resources/images/runningExperiments/menuCommand_toolbar.png)


While opening an experiment, the status will display some information about what's going on. For instance, GAMA is busy instantiating the agents or opening the displays.

![Experiment status during the initialization of the experiment: instantiation of agents.](/resources/images/runningExperiments/menuCommand_toolbar_instantiating_agents.png)


![Experiment status during the initialization of the experiment: building of outputs.](/resources/images/runningExperiments/menuCommand_toolbar_building_outputs.png)


The orange color usually means that, although the experiment is not ready, things are progressing without problems (a red color message is an indication that something went wrong). When the loading of the experiment is finished, GAMA displays the message "Simulation ready" on a green background. If the user runs the simulation, the status changes and displays the number of cycles already elapsed in the simulation currently managed by the experiment.

![Experiment status toolbar when the simulation is running.](/resources/images/runningExperiments/menuCommand_toolbar_running.png)


Hovering over the status produces more accurate information about the internal clock of the simulation.

![More information on the experiment run when the mouse hovers the toolbar.](/resources/images/runningExperiments/menuCommand_toolbar_running_with_info.png)

When we launch an experiment, an experiment agent is created with its own internal clock. It will then create 1 (or more) simulation agent(s). The toolbar provides thus information about both the experiment agent and the simulation(s), from top to bottom:

* the number of cycles elapsed,
* the simulated time already elapsed (in the example above, one cycle lasts one second of _simulated time_) for the simulation agents only, 
* the duration of cycle in milliseconds, 
* the average duration of one cycle (computed over the number of cycles elapsed),
* the total duration, so far, of the simulation (still in milliseconds).

In the case of a multi-simulation (i.e. an experiment launching several simulations), one block per simulation is displayed.

![Information from the toolbar in case of multi-simulation.](/resources/images/runningExperiments/menuCommand_toolbar_running_with_info_multi_simu.png)

Although these durations are entirely dependent on the speed of the simulation engine (and, of course, the number of agents, their behaviors, etc.), there is a way to control it partially with the second control, which allows the user to force a minimal duration (in milliseconds) for a cycle, from 0s (its initial position) to 1s. Note that this minimal duration (or delay) will remain the same for the subsequent reloads of the experiment.

![Toolbar to set the minimum duration for 1 cycle.](/resources/images/runningExperiments/menuCommand_toolbar_running_with_delay.png)


In case it is necessary to have more than 1s of delay, it has to be defined, instead, as an attribute of the [experiment](Statements#experiment).
