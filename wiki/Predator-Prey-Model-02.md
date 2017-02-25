---
layout: default
title: Dynamic of the vegetation (grid)
wikiPageName: Predator-Prey-Model-02
wikiPagePath: wiki/Predator-Prey-Model-02.md
---

[//]: # (keyword|concept_grid)
# Dynamic of the vegetation (grid)


Second part of the tutorial : Predator Prey


Code of the model : 

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
