---
layout: default
title: OSM Loading Driving
wikiPageName: Driving-Skill-OSM-Loading-Driving
wikiPagePath: wiki/Driving-Skill-OSM-Loading-Driving.md
---

[//]: # (keyword|operator_osm_file)
[//]: # (keyword|operator_covers)
[//]: # (keyword|operator_get)
[//]: # (keyword|operator_in)
[//]: # (keyword|operator_last)
[//]: # (keyword|statement_put)
[//]: # (keyword|statement_save)
[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_gis)
[//]: # (keyword|concept_shapefile)
[//]: # (keyword|concept_save_file)
[//]: # (keyword|concept_osm)
# OSM Loading Driving


_Author : Patrick Taillandier_

Model to show how to import OSM Files, using them to create agents for a road network, and saving the different agents in shapefiles. The first goal of this model is to prepare data for the driving skill models.


Code of the model : 

```


model OSMdata_to_shapefile 
 
global{
	//map used to filter the object to build from the OSM file according to attributes. for an exhaustive list, see: http://wiki.openstreetmap.org/wiki/Map_Features
	map filtering <- map(["highway"::["primary", "secondary", "tertiary", "motorway", "living_street","residential", "unclassified"]]);
	
	//OSM file to load
	file<geometry> osmfile <-  file<geometry>(osm_file("../includes/rouen.gz", filtering))  ;
	
	geometry shape <- envelope(osmfile);
	graph the_graph; 
	map<point, intersection> nodes_map;
	
	

	init {
		write "OSM file loaded: " + length(osmfile) + " geometries";
		
		//from the OSM file, creation of the selected agents
		loop geom over: osmfile {
			if (shape covers geom) {
				string highway_str <- string(geom get ("highway"));
				if (length(geom.points) = 1 ) {
					if ( highway_str != nil ) {
						string crossing <- string(geom get ("crossing"));
						create intersection with: [shape ::geom, type:: highway_str, crossing::crossing] {
							nodes_map[location] <- self;
						}
					}
				} else {
					string oneway <- string(geom get ("oneway"));
					float maxspeed_val <- float(geom get ("maxspeed"));
					string lanes_str <- string(geom get ("lanes"));
					int lanes_val <- empty(lanes_str) ? 1 : ((length(lanes_str) > 1) ? int(first(lanes_str)) : int(lanes_str));
					create road with: [shape ::geom, type:: highway_str, oneway::oneway, maxspeed::maxspeed_val, lanes::lanes_val] {
						if lanes < 1 {lanes <- 1;} //default value for the lanes attribute
						if maxspeed = 0 {maxspeed <- 50.0;} //default value for the maxspeed attribute
					}
				}	
			}
		}
		write "Road and node agents created";
		
		ask road {
			point ptF <- first(shape.points);
			if (not(ptF in nodes_map)) {
				create intersection with:[location::ptF] {
					nodes_map[location] <- self;
				}	
			}
			point ptL <- last(shape.points);
			if (not(ptL in nodes_map)) {
				create intersection with:[location::ptL] {
					nodes_map[location] <- self;
				}
			}
		}
			
		write "Supplementary node agents created";
		ask intersection {
			if (empty (road overlapping (self))) {
				do die;
			}
		}
		
		write "node agents filtered";
		
		//Save all the road agents inside the file with the path written, using the with: facet to make a link between attributes and columns of the resulting shapefiles. 
		save road type:"shp" to:"../includes/roads.shp" with:[lanes::"lanes",maxspeed::"maxspeed", oneway::"oneway"] ;
		save intersection type:"shp" to:"../includes/nodes.shp" with:[type::"type", crossing::"crossing"] ;
		write "road and node shapefile saved";
	}
}
	

species road{
	rgb color <- rgb(rnd(255),rnd(255),rnd(255));
	string type;
	string oneway;
	float maxspeed;
	int lanes;
	aspect base_ligne {
		draw shape color: color; 
	}
	
} 
	
species intersection {
	string type;
	string crossing;
	aspect base { 
		draw square(3) color: #red ;
	}
} 
	

experiment fromOSMtoShapefiles type: gui {
	output {
		display map type: opengl {
			graphics "world" {
				draw world.shape.contour;
			}
			species road aspect: base_ligne  refresh: false  ;
			species intersection aspect: base   refresh: false ;
		}
	}
}
```
