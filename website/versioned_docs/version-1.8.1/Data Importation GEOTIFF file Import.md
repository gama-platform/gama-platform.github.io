---
title: GeoTIFF file to Grid of Cells
id: version-1.8.1-Data Importation GEOTIFF file Import
original_id: Data Importation GEOTIFF file Import
---

[//]: # (keyword|operator_max_of)
[//]: # (keyword|operator_min_of)
[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_tif)
[//]: # (keyword|concept_gis)
[//]: # (keyword|concept_grid)


_Author :  Patrick Taillandier_

Model which shows how to create a grid of cells by using a GeoTIFF File. 


Code of the model : 

```

model geotiffimport

global {
	//definiton of the file to import
	file grid_data <- file('../includes/bogota_grid.tif') ;
	
	//computation of the environment size from the geotiff file
	geometry shape <- envelope(grid_data);	
	
	float max_value;
	float min_value;
	init {
		max_value <- cell max_of (each.grid_value);
		min_value <- cell min_of (each.grid_value);
		ask cell {
			int val <- int(255 * ( 1  - (grid_value - min_value) /(max_value - min_value)));
			color <- rgb(val,val,val);
		}
	}
}

//definition of the grid from the geotiff file: the width and height of the grid are directly read from the asc file. The values of the asc file are stored in the grid_value attribute of the cells.
grid cell file: grid_data;

experiment show_example type: gui {
	output {
		display test {
			grid cell lines: #black;
		}
	} 
}
```
