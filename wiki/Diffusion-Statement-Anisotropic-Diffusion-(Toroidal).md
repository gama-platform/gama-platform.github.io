---
layout: default
title:  Anisotropic diffusion (Toroidal)
wikiPageName: Diffusion-Statement-Anisotropic-Diffusion-(Toroidal)
wikiPagePath: wiki/Diffusion-Statement-Anisotropic-Diffusion-(Toroidal).md
---

[//]: # (keyword|operator_hsb)
[//]: # (keyword|statement_diffuse)
[//]: # (keyword|type_matrix)
[//]: # (keyword|concept_diffusion)
[//]: # (keyword|concept_matrix)
[//]: # (keyword|concept_math)
[//]: # (keyword|concept_elevation)
# Anisotropic diffusion (Toroidal)


_Author : Benoit Gaudou_

This model is used to show how to construct an anisotropic diffusion through a grid. The cell at the center of the grid emit a pheromon at each step, which is spread through the grid thanks to the diffusion mechanism, using a particular matrix of diffusion, in a toroidal world.


<p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Diffusion Statement/Diffusion Statement Anisotropic Diffusion (Toroidal)/a-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p>Code of the model : 

```

model anisotropic_diffusion_torus

global torus: true {
	int size <- 64; // better to have a pow of 2 for the size of the grid
  	geometry shape <- envelope(square(size) * 10);
  	cells selected_cells;
  	matrix<float> mat_diff <- matrix([
									[4/9,2/9,0/9],
									[2/9,1/9,0.0],
									[0/9,0.0,0.0]]);
	init {
		selected_cells <- location as cells;
	}
	reflex new_Value {
		ask selected_cells{
			phero <- 1.0;
		}  
	}

	reflex diff {
		diffuse var: phero on: cells matrix: mat_diff method:dot_product;	
	}
}


grid cells height: size width: size  {
	float phero  <- 0.0;
	rgb color <- hsb(phero,1.0,1.0) update: hsb(phero,1.0,1.0);
	float grid_value update: phero * 100;
} 


experiment diffusion type: gui {
	output {
		display a type: opengl {
			grid cells elevation: true triangulation: true;
		}
	}
}
```
