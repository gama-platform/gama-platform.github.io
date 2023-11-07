---
title:  2. Vegetation Dynamic
---


This second step presents the idea of environment or topological space. Defining a "vegetation" environment allows to define the movement of the preys through dynamic variables (use of the _update_ facet). We will also discover more about displays.


## Formulation

* Definition of a grid (for the vegetation)
* Definition of a dynamic for each cell (food production)
* Display of the cell color according to the quantity of food
* Localization of the prey agents on the cells (at its center)


## Model Definition

### grid

In GAMA, grids are specific agent species with a particular topology. First, a grid allows yet constrains the movement of other (moving) agents but they can have variables and behaviors.

A grid is defined as follows:
```
grid grid_name width: nb_cols height: nb_lines neighbors: 4/6/8 {
    ...
}
```

With:

* `width`: number of cells along the x-axis
* `height`: number of cells along the y-axis
* `neighbors`: neighborhood type (4 - Von Neumann, 6 - hexagon or 8 - Moore)

In our model, we define a grid species, called **`vegetation_cell`** composed of 50x50 cells and with a Von Neumann neighborhood.
In order for each grid agents (or cell of the grid) to represent the vegetation, we provide them with four variables:

* `max_food`: maximum food that a cell can contain -> type: `float` ; init value: `1.0`.
* `food_prod`: food produced at each simulation step -> type: `float` ; init value: random number between 0 and 0.01.
* `food`: current quantity of food -> type: `float` ; init value: random number between 0 and 1.0; at each simulation step: food &lt;- food + food_prod.
* `color`: color of the cell -> type: `rgb` ; init value: color computed according to the food value: more the food value is close to 1.0, greener the color is, more the food value is close to 0,  whiter the color is; update: computation of the new color depending on the current level of food (at each simulation step).

The `update` facet allows to give a behavior to the agents. Indeed, at each simulation step, each agent is activated (by default, in its creation order) and first applies for each dynamic variable (in their definition order) its update expression. In the present case, it allows us to link the displayed color of the cell to its food level.
```
grid vegetation_cell width: 50 height: 50 neighbors: 4 {
    float max_food <- 1.0 ;
    float food_prod <- rnd(0.01) ;
    float food <- rnd(1.0) max: max_food update: food + food_prod;
    rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) 
         update: rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) ;
}
```

There are several ways to define colors in GAML:

* the simplest way consists in using the symbol `#` + the color name (for a limited set of  [colors](Index#Constants_and_colors)): `#blue`, `#red`...
* Another way consists in defining the 3 RGB integer values: rgb(red, green, blue) with red, green and blue between 0 and 255 (as we used in the current model): `rgb(0,0,0)`  for black, `rgb(255,255,255)` for white, `rgb(255,0,0)` for red, `rgb(0,255,0)` for green, or  `rgb(0,0,255)` for blue.



### prey agents
In order to relate our prey agents to the vegetation cell grid, we add them with one new attribute: `my_cell` of type `vegetation_cell` and for init value one of the `vegetation_cell` (chosen randomly).

```
species prey {
    ...
    vegetation_cell my_cell <- one_of (vegetation_cell) ;
} 
```

It is possible to obtain the list of all agents of a given species by using the name of the species while `one_of` to pick one element randomly from this list.

We linked each prey agent to a `vegetation_cell` but we need to locate them onto the cell. To do so, we set the prey `location` as equals to the `location` of the vegetation cell (i.e. its centroid), we use in the `init` block the `<-` statement that allows to modify the value of a variable:
```
species prey {
    ...
    init {
        location <- my_cell.location;
    }
}
```

### display
In order to visualize the vegetation, we need to add it to the display. We use for that the statement `grid` with the optional facet `border` to draw the border of the cells. Note that grid agents have built-in aspect thus it is not necessary to define one: it is a square with the `color` attribute as value.
```
   output {
       display main_display {
           grid vegetation_cell border: #black;
           species prey aspect: base ;
       }
   }
```

Note that the layers in a display work like layers in a GIS; the drawing order will be respected. In our model, the prey agents will be drawn above the vegetation\_cell grid thus they need to be declared afterward.




## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2002.gaml
```