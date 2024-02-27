---
title:  4. Inspectors and Monitors
---


This fourth step illustrates how to monitor more precisely the simulation. Practically, we will define monitors to follow the evolution of specific variables (or expressions) whereas inspectors allow the user to follow the state of a given agent (or a species).


## Formulation

* Adding of a monitor to follow the evolution of the number of prey agents


## Model Definition

### global variable
We add a new global variable:

* `nb_preys`: returns, each time it is called, the current number of (live) prey agents

To do so we use the `->{expression}` facet which returns the value of **expression**, each time it is called.
We use as well the operator `length` that returns the number of elements in a list.

Thus, in the global section, we add the `nb_preys` global variable:
```
int nb_preys -> {length (prey)};
```

### monitor
A monitor allows users to follow the value of an arbitrary expression in GAML. It has to be defined in an output section. A monitor is defined as follows:
```
monitor monitor_name value: an_expression refresh: every(nb_steps);
```

With:

* `value`: mandatory, that value will be displayed in the monitor.
* `refresh`: bool, optional: if the expression is true, compute (default is true).

In this model, we define a monitor to follow the value of the variable **nb\_preys**:
```
monitor "number of preys" value: nb_preys;
```

### inspector

Inspectors allow to obtain information about a species or an agent. There are two kinds of agent information features:

* **Species browser**: provides information about all the agents of a species. Available in the Agents menu.

![images/browser_table.png](/resources/images/tutorials/predator_prey_browser.png)

* **Agent inspector**: provides information about one specific agent. Also allows to change the values of its variables during the simulation. Available from the Agents menu, by right\_clicking on a display, in the species inspector, or when inspecting another agent. It provides also the possibility to «highlight» the inspected agent.

![images/inspector.png](/resources/images/tutorials/predator_prey_inspector.png)



## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2004.gaml
```