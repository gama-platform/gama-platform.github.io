---
layout: default
title:  Uniform diffusion
wikiPageName: Diffusion-Statement-Uniform-Diffusion
wikiPagePath: wiki/Diffusion-Statement-Uniform-Diffusion.md
---

[//]: # (keyword|operator_hsb)
[//]: # (keyword|statement_diffuse)
[//]: # (keyword|concept_diffusion)
[//]: # (keyword|concept_matrix)
[//]: # (keyword|concept_math)
[//]: # (keyword|concept_elevation)
# Uniform diffusion


_Author : Benoit Gaudou_

This model is used to show how a diffusion works with a uniform matrix of diffusion in a grid. The cell at the center of the grid emit a pheromon at each step, which is spread through the grid thanks to the diffusion mechanism. Without passing a diffusion matrix, the default diffusion matrix is a uniform matrix 3x3, with value 1/nb_neighbors.


<p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Diffusion Statement/Diffusion Statement Uniform Diffusion/uniform_diffusion_in_4_neighbors_grid-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p><p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Diffusion Statement/Diffusion Statement Uniform Diffusion/uniform_diffusion_in_8_neighbors_grid-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p>Code of the model : 

```

model uniform_diffusion

global {
	int size <- 64; // better to have a pow of 2 for the size of the grid
  	geometry shape <- envelope(square(size) * 10);
  	cells_eight_nb selected_cells_8;
  	cells_four_nb selected_cells_4;

	// Initialize the emiter cell as the cell at the center of the word
	init {
		selected_cells_8 <- location as cells_eight_nb;
		selected_cells_4 <- location as cells_four_nb;
	}
	reflex new_Value {
		ask selected_cells_4 {
			phero <- 1.0;
		}
		ask selected_cells_8 {
			phero <- 1.0;
		}
	}
	reflex diff {
		// Declare a diffusion on the grid "cells", with a uniform matrix of diffusion. The value of the diffusion
		// will be store in the new variable "phero" of the cell.
		diffuse var: phero on: cells_eight_nb ;
		diffuse var: phero on: cells_four_nb ;
	}
}


grid cells_eight_nb height: size width: size neighbors: 8 {
	// "phero" is the variable storing the value of the diffusion
	float phero  <- 0.0;
	// the color of the cell is linked to the value of "phero".
	rgb color <- hsb(phero,1.0,1.0) update: hsb(phero,1.0,1.0);
	// Update the "grid_value", which will be used for the elevation of the cell
	float grid_value update: phero * 100;
} 

grid cells_four_nb height: size width: size neighbors: 4 {
	// "phero" is the variable storing the value of the diffusion
	float phero  <- 0.0;
	// the color of the cell is linked to the value of "phero".
	rgb color <- hsb(phero,1.0,1.0) update: hsb(phero,1.0,1.0);
	// Update the "grid_value", which will be used for the elevation of the cell
	float grid_value update: phero * 100;
} 


experiment diffusion type: gui {
	output {
		display uniform_diffusion_in_8_neighbors_grid type: opengl {
			// Display the grid with elevation
			grid cells_eight_nb elevation: true triangulation: true;
		}
		display uniform_diffusion_in_4_neighbors_grid type: opengl {
			// Display the grid with elevation
			grid cells_four_nb elevation: true triangulation: true;
		}
	}
}
```
