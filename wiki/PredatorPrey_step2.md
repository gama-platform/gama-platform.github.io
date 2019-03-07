---
layout: default
title: 2. Vegetation Dynamic
wikiPageName: PredatorPrey_step2
wikiPagePath: wiki/PredatorPrey_step2.md
---
`[IN PROGRESS]`
# 2. Vegetation Dynamic
This second steps present the idea of environment or topological space. Defining a "vegetation" environment allows to define the movement of the preys through dynamic variables (use of the _update_ facet). We will also discover more about displays.








## Formulation
  * Definition of a grid (for the vegetation)
  * Definition of a dynamic for each cell (food production)
  * Display of the cell color according to the quantity of food
  * Localization of the prey agents on the cells (at its center)





## Model Definition

### grid

In GAMA, grids are specific agent species with a particular topology. First, a grid allow yet constrains the movement of other (moving) agents but they can have variables and behaviors.

A grid is defined as follows:
```
   grid grid_name width: nb_cols height: nb_lines neighbors: 4/6/8 {
      ...
   }
```

With:
  * width : number of cells along x-axis
  * height : number of cells along y-axis
  * neighbors : neighborhood type (4 - Von Neumann, 6 - hexagon or 8 - Moore)

In our model, we define a grid species, called **vegetation\_cell** composed of 50x50 cells and with a Von Neumann neighborhood.
In order for each grid agents (or cell of the grid) to represent the vegetation, we provide them with four variables:
  * _maxFood_ : maximum food that a cell can contain -> type: _float_ ; init value: 1.0
  * _foodProd_ : food produced at each simulation step -> type: _float_ ; init value: random number between 0 and 0.01
  * _food_ : current quantity of food -> type: _float_ ; init value: random number between 0 and 1.0; at each simulation step : food <- food + foodProd
  * _color_ : color of the cell -> type: _rgb_ ; init value: color computed according to the food value: more the food value is close to 1.0, greener the color is, more the food value is close to 0,  whiter the color is; update : computation of the new color depending on the current level of food (at each simulation step).

The **update** facet allows to give a behavior to the agents. Indeed, at each simulation step, each agent is activated (by default, in a random order) and first applies for each dynamic variable (in their definition order) its update expression. In the present case, it allows us to link the displayed color of the cell to its food level.
```
   grid vegetation_cell width: 50 height: 50 neighbors: 4 {
      float maxFood <- 1.0 ;
      float foodProd <- (rnd(1000) / 1000) * 0.01 ;
      float food <- (rnd(1000) / 1000) update: food + foodProd max: maxFood;
      rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) ;
   }
```

There are several ways to define colors in GAML:
  * the simplest way consists in using the symbol _#_ + the color name (for a limited set of  [colors](Index#Constants_and_colors)):
```
   #blue
   #red
```
  * Another way consists in defining the 3 rgb integer values: rgb(red, green, blue) with red, green and blue between 0 and 255 (as we used in the current model.
```
   rgb(0,0,0) : black ; rgb(255,255,255) : white
   rgb(255,0,0) : red ;  rgb(0,255,0) : green ;  rgb(0,0,255) : blue
```


### prey agents
In order to relate our prey agents to the vegetation cell grid, we add them with one new variable : **my\_cell** of type vegetation\_cell and for init value one of the vegetation\_cell (chosen randomly).

```
   species prey {
      ...
      vegetation_cell myCell <- one_of (vegetation_cell) ;
   } 
```

It is possible to obtain the list of all agents of a given species by using the name of the species while **one\_of** to pick one element randomly from this list.

We linked each prey agent to a vegetation\_cell but we need to locate them onto the cell. To do so, we set the prey location as equals to the location of the vegetation cell (i.e. its centroid **location**), we use in the init block the **<-** statement that allows to modify the value of a variable :
```
species prey {
     ...
     init {
         location <- myCell.location;
     }
}
```

### display
In order to visualize the vegetation , we need to add it to the display. We use for that the statement **grid** with the optional facet **lines** to draw the border of the cells. Note that grid agents have built-in aspect thus it is not necessary to define one.
```
   output {
      display main_display {
         grid vegetation_cell lines: #black;
         species prey aspect: base ;
      }
   }
```

Note that the layers in a display work like layers in a GIS; the drawing order will be respected. In our model, the prey agents will be drawn above the vegetation\_cell grid thus they need to be declared afterward.




## Complete Model

```
model prey_predator

global {
	int nb_preys_init <- 200;
	init {
		create prey number: nb_preys_init ;
	}
}

species prey {
	float size <- 1.0 ;
	rgb color <- #blue;
	vegetation_cell myCell <- one_of (vegetation_cell) ;
		
	init {
		location <- myCell.location;
	}
		
	aspect base {
		draw circle(size) color: color ;
	}
}

grid vegetation_cell width: 50 height: 50 neighbors: 4 {
	float maxFood <- 1.0 ;
	float foodProd <- (rnd(1000) / 1000) * 0.01 ;
	float food <- (rnd(1000) / 1000) max: maxFood update: food + foodProd ;
	rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food))) ;
}

experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init min: 1 max: 1000 category: "Prey" ;
	output {
		display main_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: base ;
		}
	}
}
```
