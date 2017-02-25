---
layout: default
title: Diffusion in a cuve (Cycle length)
wikiPageName: Diffusion-Statement-Diffusion-in-a-cuve-(Cycle-length)
wikiPagePath: wiki/Diffusion-Statement-Diffusion-in-a-cuve-(Cycle-length).md
---

[//]: # (keyword|operator_hsb)
[//]: # (keyword|statement_diffuse)
[//]: # (keyword|type_matrix)
[//]: # (keyword|concept_diffusion)
[//]: # (keyword|concept_matrix)
[//]: # (keyword|concept_math)
[//]: # (keyword|concept_elevation)
# Diffusion in a cuve (Cycle length)


_Author : Julien Mazars_

This model is used to show how to use diffusion on a grid, and how to accelerate the process by computing several times the diffusion at each step. The cells at the center of the grid emit a pheromon at the cycle 0, which is spread through the grid thanks to the diffusion mechanism, using a particular matrix of diffusion. The "avoid_mask" facet is used in order to have a constant sum of pheromon. 


<p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Diffusion Statement/Diffusion Statement Diffusion in a cuve (Cycle length)/a-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p><p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Diffusion Statement/Diffusion Statement Diffusion in a cuve (Cycle length)/quick-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p>Code of the model : 

```

model cycle_length

global {
	int size <- 64; // better to have a pow of 2 for the size of the grid
	int cycle_length <- 5;
  	geometry shape <- envelope(square(size));
  	list<cells> selected_cells;
  	list<quick_cells> selected_quick_cells;
  	// Declare an uniform diffusion matrix
  	matrix<float> mat_diff <- matrix([
									[1/9,1/9,1/9],
									[1/9,1/9,1/9],
									[1/9,1/9,1/9]]);
									
	int impulse_area_size <- 6;

	// Initialize the emiter cells as the cells at the center of the word
	init {
		selected_cells <- list<cells>(cells where (each.grid_x < location.x+impulse_area_size
			and each.grid_x > location.x-impulse_area_size
			and each.grid_y < location.y+impulse_area_size
			and each.grid_y > location.y-impulse_area_size
		));
		selected_quick_cells <- list<quick_cells>(quick_cells where (each.grid_x < location.x+impulse_area_size
			and each.grid_x > location.x-impulse_area_size
			and each.grid_y < location.y+impulse_area_size
			and each.grid_y > location.y-impulse_area_size
		));
	}
	reflex init_value when:cycle=0 {
		ask(selected_cells){
			phero <- 1.0;
		}
		ask(selected_quick_cells){
			phero <- 1.0;
		}		
	}

	reflex diff {
		// Declare a diffusion on the grid "cells" and on "quick_cells". The diffusion declared on "quick_cells" will make 5 computations at each step to accelerate the process. 
		// The value of the diffusion will be store in the new variable "phero" of the cell.
		// In order to not loosing phero value, we apply a hand made mask (with the operator "where") and we turn the "avoid_mask" facet to true.
		list cells_where_diffuse <- cells where (each.grid_x < size-cycle_length and each.grid_x > cycle_length and each.grid_y < size-cycle_length and each.grid_y > cycle_length);
		diffuse var: phero on: cells_where_diffuse matrix: mat_diff avoid_mask: true method:dot_product;	
		list quick_cells_where_diffuse <- quick_cells where (each.grid_x < size-cycle_length and each.grid_x > cycle_length and each.grid_y < size-cycle_length and each.grid_y > cycle_length);
		diffuse var: phero on: quick_cells_where_diffuse matrix: mat_diff avoid_mask: true cycle_length: 10 method:dot_product;
	}
}


grid cells height: size width: size {
	// "phero" is the variable storing the value of the diffusion
	float phero  <- 0.0;
	// The color of the cell is linked to the value of "phero".
	rgb color <- (phero = 0) ? #black : hsb(phero,1.0,1.0) update: (phero = 0) ? #black : hsb(phero,1.0,1.0);
} 

grid quick_cells height: size width: size {
	// "phero" is the variable storing the value of the diffusion
	float phero  <- 0.0;
	// The color of the cell is linked to the value of "phero".
	rgb color <- (phero = 0) ? #black : hsb(phero,1.0,1.0) update: (phero = 0) ? #black : hsb(phero,1.0,1.0);
} 


experiment diffusion type: gui {
	output {
		display a type: opengl {
			// Display the grid with elevation
			grid cells elevation: phero*10 triangulation: true;
		}
		display quick type: opengl {
			// Display the grid with elevation
			grid quick_cells elevation: phero*10 triangulation: true;
		}
	}
}
```
