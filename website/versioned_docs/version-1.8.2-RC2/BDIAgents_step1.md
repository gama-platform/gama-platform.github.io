---
title:  1. Skeleton model
---

This first step consists in defining the skeleton model with the gold mines and the gold market.


## Formulation

* Definition of the gold mine species
* Definition of the market species
* Creation of the gold mine and market agents
* Definition of a display with the gold mines and the market

## Model Definition

### species
In this first model, we have to define two species of agents: the **`gold_mine`** agents and the **`market`** ones. These agents will not have a particular behavior, they will just be displayed.
For the gold mine species, we define a new attribute: **`quantity`** of type `int`, with for initial value a random integer between 1 and 20. We also define an `aspect` named **`default`** that displays the gold mine as a triangle with a gray color if the gold mine is empty, yellow otherwise. The size of the triangle depends on the quantity of gold nuggets in the mine. 
Concerning the market species, we define a new attribute: **`golds`** of type `int`. We define as well an aspect named **`default`** that displays the market as a blue square.

```
species gold_mine {
    int quantity <- rnd(1,20);
    aspect default {
	draw triangle(200 + quantity * 50) color: (quantity > 0) ? #yellow : #gray border: #black;	
    }
}

species market {
    int golds;
    aspect default {
        draw square(1000) color: #black ;
    }
}
```

### global variables
We define two global variables for the model: one called **`nb_mines`** that will be used to define the number of mines and that will be set to 10. One call **`the_market`** that will represent the market agent (that will be unique). 

In addition, we define the duration of a simulation step to 10 minutes, and we define the shape of the environment by a square with a side size of 20 kilometers.

```
global {
    int nb_mines <- 10; 
    market the_market;
    float step <- 10#mn;
    geometry shape <- square(20 #km);
}
```

### global init
At the initialization of the model, we create a market agent and `nb_mines` gold mine agents. For the market agent, we set the value of the `the_market` agent with the created agent. 

```
global {
    ...
    init {
        create market {
	    the_market <- self;
	}
	create gold_mine number: nb_mines;
    }
}
```

### display
We define a display to visualize the market and gold mine agents. We use for that the classic **`species`** keyword. In order to optimize the display, we use an OpenGL display (facet **`type: opengl`**).

In the **`experiment`** block:
```
output {
    display map type: opengl {
	species market ;
	species gold_mine ;
   }
}
```

## Complete Model


```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gaml.architecture.simplebdi/models/BDI%20Architecture/models/Tutorial/BDI%20tutorial%201.gaml
```
