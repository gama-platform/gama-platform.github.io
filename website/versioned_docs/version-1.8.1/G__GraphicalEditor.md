---
title:  The Graphical Editor
---


The graphical editor that allows defining a GAMA model through a graphical interface (`gadl` files). It is based on the Graphiti Eclipse plugin. It allows as well to produce a graphical model (diagram) from a `gaml` model.


![images/graphical_editor/gm_predator_prey.png](/resources/images/graphicalEditor/gm_predator_prey.png)

## Table of contents 

* [The Graphical Editor](#the-graphical-editor)
	* [Installing the graphical editor](#installing-the-graphical-editor)
	* [Creating a first model](#creating-a-first-model)
	* [Status of models in editors](#status-of-models-in-editors)
	* [Diagram definition framework](#diagram-definition-framework)
	* [Features](#features)
		* [agents](#agents)
			* [species](#species)
			* [grid](#grid)
			* [Inheriting link](#inheriting-link)
			* [world](#world)
		* [agent features](#agent-features)
			* [action](#action)
			* [reflex](#reflex)
			* [aspect](#aspect)
		* [experiment](#experiment)
			* [GUI experiment](#gui-experiment)
			* [display](#display)
			* [batch experiment](#batch-experiment)
		* [BDI Architecture](#BDI-Architecture)
			* [plan](#plan)
			* [rule](#rule)
			* [perception](#perception)
		* [Finite State Machine](#Finite-State-Machine-Architecture)
			* [state](#state)
		* [Tasked-based Architecture](#Task-based-Architecture)
			* [task](#task)
	* [Pictogram color modification](#pictogram-color-modification)
	* [GAML Model generation](#gaml-model-generation)


## Installing the graphical editor
Using the graphical editor requires to install the graphical modeling plug-in. See [here](InstallingPlugins) for information about plug-ins and their installation.

The graphical editor plug-in is called **Graphical\_modeling** and is directly available from the GAMA update site **http://updates.gama-platform.org/graphical_modeling**


![install](/resources/images/graphicalEditor/installing_graphical_editor.JPG)


Note that the graphical editor is still under development. Updates of the plug-in will be added to the GAMA website. After installing the plug-in (and periodically), check for updates for this plug-in: in the "Help" menu, choose "Check for Updates" and install the proposed updates for the graphical modeling plug-in.




## Creating a first model

A new diagram can be created in a new GAMA project. First, right-click on a project, then select "New" on the contextual menu.
In the New Wizard, select "GAMA -> Model Diagram", then "Next>"

![images/graphical_editor/newDiagram.png](/resources/images/graphicalEditor/newDiagram.png)

In the next Wizard dialog, select the type of diagram (Empty, Skeleton or Example) then the name of the file and the author.

![images/graphical_editor/modeldiagramNew.png](/resources/images/graphicalEditor/modeldiagramNew.png) 

Skeleton and Example diagram types allow to add to the diagram some basic features.


## Status of models in editors

Similarly to GAML editor, the graphical editor proposes a live display of errors and model statuses. A graphical model can actually be in three different states, which are visually accessible above the editing area: **Functional** (orange color), **Experimentable** (green color) and **InError** (red color). See [the section on model validation](ValidationOfModels) for more precise information about these statuses.

In its initial state, a model is always in the **Functional** state, which means it compiles without problems, but cannot be used to launch experiments. The **InError** state occurs when the file contains errors (syntactic or semantic ones).

Reaching the **Experimentable** state requires that all errors are eliminated and that at least one experiment is defined in the model. The experiment is immediately displayed as a button in the toolbar, and clicking on it will allow the modeler to launch this experiment on your model.

Experiment buttons are updated in real-time to reflect what's in your code. If more than one experiment is defined, corresponding buttons will be displayed in addition to the first one.





## Diagram definition framework

The following figure presents the editing framework:

![images/graphical_editor/framework.png](/resources/images/graphicalEditor/framework.png)





## Features

### agents
#### species

![images/graphical_editor/species.png](/resources/images/graphicalEditor/species.png)

The species feature allows the modeler to define a species with a continuous topology. A species is always a micro-species of another species. The top-level (macro-species of all species) is the world species.

  * **source**: a species (macro-species)
  * **target**: -

![images/graphical_editor/Frame_Speciesdef1.png](/resources/images/graphicalEditor/Frame_Speciesdef1.png)


#### grid

![images/graphical_editor/grid.png](/resources/images/graphicalEditor/grid.png)

The grid feature allows the modeler to define a [species](ManipulateBasicSpecies) with a [grid topology](GridSpecies). A grid is always a micro-species of another species.

  * **source**: a species (macro-species)
  * **target**: -

![images/graphical_editor/Frame_grid.png](/resources/images/graphicalEditor/Frame_grid.png)

#### Inheriting link
The inheriting link feature allows the modeler to define an inheriting link between two species.

  * **source**: a species (parent)
  * **target**: a species (child)

![images/graphical_editor/inhereting_link.png](/resources/images/graphicalEditor/inhereting_link.png)


#### world

![images/graphical_editor/world.png](/resources/images/graphicalEditor/world.png)

When a model is created, a world species is always defined. It represents the global part of the model. The world species, which is unique, is the top-level species. All other species are micro-species of the world species.

![images/graphical_editor/Frame_world.png](/resources/images/graphicalEditor/Frame_world.png)

### agent features

#### action

![images/graphical_editor/action.png](/resources/images/graphicalEditor/action.png)

The action feature allows the modeler to define an action for a species.

  * **source**: a species (owner of the action)
  * **target**: -

![images/graphical_editor/Frame_action.png](/resources/images/graphicalEditor/Frame_action.png)

#### reflex

![images/graphical_editor/reflex.png](/resources/images/graphicalEditor/reflex.png)

The reflex feature allows the modeler to define a reflex for a species.

  * **source**: a species (owner of the reflex)
  * **target**: -

![images/graphical_editor/Frame_reflex.png](/resources/images/graphicalEditor/Frame_reflex.png)

#### aspect

![images/graphical_editor/aspect.png](/resources/images/graphicalEditor/aspect.png)

The aspect feature allows the modeler to define an aspect for a species.

  * **source**: a species (owner of the aspect)
  * **target**: -

![images/graphical_editor/Frame_aspect.png](/resources/images/graphicalEditor/Frame_aspect.png)


![images/graphical_editor/Frame_Aspect_layer.png](/resources/images/graphicalEditor/Frame_Aspect_layer.png)

#### equation
![images/graphical_editor/equation.png](/resources/images/graphicalEditor/equation.png)

The equation feature allows the modeler to define an equation for a species.

  * **source**: a species (owner of the equation)
  * **target**: -

### experiment
#### GUI experiment

![images/graphical_editor/guiXP.png](/resources/images/graphicalEditor/guiXP.png)

The GUI Experiment feature allows the modeler to define a GUI experiment.

  * **source**: world species
  * **target**: -

![images/graphical_editor/Frame_Experiment.png](/resources/images/graphicalEditor/Frame_Experiment.png)

#### display

![images/graphical_editor/display.png](/resources/images/graphicalEditor/display.png)

The display feature allows the modeler to define a display.

  * **source**: GUI experiment
  * **target**: -

![images/graphical_editor/Frame_display.png](/resources/images/graphicalEditor/Frame_display.png)


![images/graphical_editor/Frame_layer_display.png](/resources/images/graphicalEditor/Frame_layer_display.png)

#### batch experiment

![images/graphical_editor/batchxp.png](/resources/images/graphicalEditor/batchxp.png)

The Batch Experiment feature allows the modeler to define a Batch experiment.

  * **source**: world species
  * **target**: -




### BDI Architecture
#### Plan

![images/graphical_editor/plan.png](/resources/images/graphicalEditor/plan.png)

The Plan feature allows the modeler to define a plan for a BDI species, i.e. a sequence of statements that will be executed in order to fulfill a particular intention.

  * **source**:  a species with a BDI architecture
  * **target**: -

#### Rule

![images/graphical_editor/rule.png](/resources/images/graphicalEditor/rule.png)

The Rule feature allows the modeler to define a rule for a BDI species, i.e. a function executed at each iteration to infer new desires or beliefs from the agent’s current beliefs and desires.

  * **source**:  a species with a BDI architecture
  * **target**: -

#### Perception

![images/graphical_editor/perception.png](/resources/images/graphicalEditor/perception.png)

The Perception feature allows the modeler to define a perception for a BDI species, i.e. a function executed at each iteration that updates the agent’s Belief base according to the agent perception.

  * **source**:  a species with a BDI architecture
  * **target**: -

### Finite State Machine Architecture
#### State

![images/graphical_editor/state.png](/resources/images/graphicalEditor/state.png)

The State feature allows the modeler to define a state for a FSM species, i.e. sequence of statements that will be executed if the agent is in this state (an agent has a unique state at a time).

  * **source**:  a species with a finite state machine architecture
  * **target**: -


### Task-based Architecture
#### Task

![images/graphical_editor/task.png](/resources/images/graphicalEditor/task.png)

The Task feature allows the modeler to define a task for a Tasked-based species, i.e. sequence of statements that can be executed, at each time step, by the agent. If an agent owns several tasks, the scheduler chooses a task to execute based on its current priority weight value.

  * **source**:  a species with a task-based architecture
  * **target**: -



## Pictogram color modification
It is possible to change the color of a pictogram.

  * Right-click on a pictogram, then select the "Chance the color".





## GAML Model generation
It is possible to automatically generate a Gaml model from a diagram.

  * Right-click on the graphical framework (where the diagram is defined), then select the "Generate Gaml model".
A new GAML model with the same name as the diagram is created (and open).
