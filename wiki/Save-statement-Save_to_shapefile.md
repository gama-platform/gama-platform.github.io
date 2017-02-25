---
layout: default
title: Save to Shapefile
wikiPageName: Save-statement-Save_to_shapefile
wikiPagePath: wiki/Save-statement-Save_to_shapefile.md
---

[//]: # (keyword|operator_copy)
[//]: # (keyword|statement_save)
[//]: # (keyword|concept_save_file)
[//]: # (keyword|concept_shapefile)
# Save to Shapefile


_Author : Patrick Taillandier_

This is a model that shows how to save agents inside a Shapefile to reuse it later or to keep it.


Code of the model : 

```

model Savetoshapefile

global {
	init {
		geometry free_space <- copy(shape);
		
		//creation of the building agents that will be saved
		create building number: 50 {
			shape <- square(5.0);
			location <- any_location_in (free_space - 5.0);
			free_space <- free_space - shape;
		}
		//save building geometry into the shapefile: add the attribute TYPE which value is set by the type variable of the building agent
		save building to:"../results/buildings.shp" type:"shp" with:[type::"TYPE"];
	}
}

//species that represent the building agents that will be saved
species building {
	string type <- flip(0.8) ? "residential" : "industrial";
	aspect default {
		draw shape color: type = "residential" ? #gray : #pink;
	}
}
experiment main type: gui {
	output {
		display map {
			species building;
		}
	}
}
```
