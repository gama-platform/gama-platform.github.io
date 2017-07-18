---
layout: default
title: Save to Ascii
wikiPageName: Save-statement-Save_to_asc
wikiPagePath: wiki/Save-statement-Save_to_asc.md
---
[//]: # (keyword|statement_save)
[//]: # (keyword|concept_save_file)
[//]: # (keyword|concept_asc)
# Save to Ascii


_Author : Patrick Taillandier_

This is a model that shows how to save a grid inside a ASCII File to reuse it later or to keep it.


Code of the model : 

```

model SavetoAsc

global {
	init {	
		//save grid "grid_value" attribute into the asc file.
		save cell to:"../results/grid.asc" type:"asc";
	}
}

//Grid that will be saved in the ASC File
grid cell width: 50 height: 50 {
	float grid_value <- self distance_to world.location;
	rgb color <- rgb(255 * (1 - grid_value / 50), 0,0);
}

experiment main type: gui {
	output {
		display map {
			grid cell lines: #black;
		}
	}
}
```
