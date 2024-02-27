---
title:  2. People Agents
---


This second step illustrates how to obtain a random point inside a geometry. We will also define some moving agent called `people`.


## Formulation

* Define a new species of agents: the **`people`** agents. The `people` agents have a point for geometry and are represented by a yellow circle of radius 10m.
* At initialization, 100 `people` agents are created. Each `people` agent is placed inside a building of type 'Residential' (randomly selected).


## Model Definition

### species

We define a new species of agents: the **people** agents. In this model, these agents will not have a specific behavior yet. They will be just displayed. Thus, we just have to define an aspect for the agents. We want to represent the `people` agents by a yellow circle of radius 10m. We then use the **`circle`** operator to define the shape to draw in the **`draw`** command, with the expected inner color (facet **`color`**) and border color (facet **`border`**).

## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2002.gaml
```
