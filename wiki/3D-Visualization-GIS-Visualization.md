---
layout: default
title: Visualization of GIS data
wikiPageName: 3D-Visualization-GIS-Visualization
wikiPagePath: wiki/3D-Visualization-GIS-Visualization.md
---
[//]: # (keyword|constant_#sec)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_shapefile)
[//]: # (keyword|concept_texture)
# Visualization of GIS data


_Author :  Patrick Taillandier_

 this model shows how to visualize GIS data without having to create agents  


Code of the model : 

```

model GIS_visualization

global {
	file shape_file_buildings <- shape_file("../includes/building.shp");
	geometry shape <- envelope(shape_file_buildings);
	string texture <- "../images/building_texture/texture1.jpg";
	string roof_texture <- "../images/building_texture/roof_top.png";	
}

experiment GIS_visualization type: gui {
	float minimum_cycle_duration <- 1#s;

	
	output {
		// display of buildings in 3D with texture and with reading their HEIGHT attribute from the shapefile
		display gis_displays_graphics type: opengl  {
			graphics "Buildings as shapes" refresh: false {
				loop bd over: shape_file_buildings {
					draw bd depth: rnd(50) + 50 texture:[roof_texture,texture] border:false;
				}
			}
		}
		
		//display of the building as an image
		display gis_displays_image type: opengl {
			image "Buildings as images" gis: shape_file_buildings.path color: rgb("gray") refresh: false;
		}
	}
}
```
