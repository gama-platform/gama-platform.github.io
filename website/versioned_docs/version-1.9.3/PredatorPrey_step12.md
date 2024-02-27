---
title:  12. Image loading
---


This 12th step illustrates how to load an image file and to use it to initialize a grid.


## Formulation

* Building of the initial environment (`food` and `food_prod` of the cells) from an image file.


## Model Definition

### global variable

We add a new global variable to store the image data:
```
file map_init <- image_file("../includes/data/raster_map.png");
```

The image file is here: [![Image to initialize the Prey Predator tutorial model.](/resources/images/tutorials/predator_prey_raster_map.png)](/resources/images/tutorials/predator_prey_raster_map.png)

You have to copy it in your project folder: `includes/data/`.

### Model initialization

In order to have a more complex environment, we want to use this image as the initialization of the environment. The food level available in a `vegetation_cell` will be based on the green level of the corresponding pixel in the image. You will be able to use such a process to represent an existing real environment in your model.

We modify the global `init` of the model in order to cast the image file in a matrix. 

First of all, when the variable `map_init` is defined from an image file (or a csv file), it can be manipulated directly as a matrix, with the dimensions of the image (here it is a 50x50 image, which matches with the grid size). In the case we need to resize the image, we can use the **`file as_matrix  {nb_cols, nb_lines}`** operator that allows converting a file (image, csv) to a matrix composed of `nb_cols` columns and `nb_lines` lines.

Concerning the manipulation of a matrix, it is possible to obtain the element [i,j] of a matrix by using **`my_matrix [i,j]`**.

A grid can be view as a spatial matrix: each cell of a grid has two built-in variables **`grid_x`** and **`grid_y`** that represent the column and line indexes of the cell.

```
init {
    create prey number: nb_preys_init ;
    create predator number: nb_predators_init ;
    ask vegetation_cell {
	color <- rgb (map_init at {grid_x,grid_y}) ;
	food <- 1 - (((color as list) at 0) / 255) ;
	food_prod <- food / 100 ; 
    }
}
```

## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2012.gaml
```