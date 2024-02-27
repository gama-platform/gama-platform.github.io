---
title:  9. Stopping condition
---


This 9th step illustrates how to use the `pause` action to stop a simulation.


## Formulation

* Addition of a stopping condition for the simulation: when there is no more prey or predator agents, the simulation stops


## Model Definition

We add a new reflex that stops the simulation if the number of preys or the number of predators is zero.

```
global {
    ...
    reflex stop_simulation when: (nb_preys = 0) or (nb_predators = 0) {
        do pause ;
    } 
}
```


## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2009.gaml
```