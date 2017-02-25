---
layout: default
title: 3D shapefile loading
wikiPageName: Data-Importation-3D-shapefile-Loading
wikiPagePath: wiki/Data-Importation-3D-shapefile-Loading.md
---

[//]: # (keyword|operator_shape_file)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_shapefile)
[//]: # (keyword|concept_load_file)
# 3D shapefile loading


_Author :  _

Model which shows how to create a shape using a 3D Shapefile after this one has been loaded. 


Code of the model : 

```
model shapefile_loading

global {
	
	//file variable that will store the shape file
	file shape_file_gis_3d_objects <- shape_file('../includes/Mobilier.shp', 0);
	geometry shape <- envelope(shape_file_gis_3d_objects);
	init {
		create gis_3d_object from: shape_file_gis_3d_objects;
	}
}

species gis_3d_object {
	aspect base {
		draw shape at:{world.shape.width/2,world.shape.height/2,0};
	}
}

experiment display_shape type: gui {

	output {
		display city_display type: opengl draw_env:false{
			species gis_3d_object aspect: base;
		}

	}
}

```
