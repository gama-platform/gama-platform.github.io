---
layout: default
title: OSM file to Agents
wikiPageName: Data-Importation-OSM-Loading
wikiPagePath: wiki/Data-Importation-OSM-Loading.md
---
[//]: # (keyword|operator_osm_file)
[//]: # (keyword|operator_rnd_color)
[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_osm)
[//]: # (keyword|concept_gis)
# OSM file to Agents


_Author :  Patrick Taillandier_

Model which shows how to import a OSM File in GAMA and use it to create Agents. In this model, a filter is done to take only into account the roads and the buildings contained in the file. 


Code of the model : 

```

model simpleOSMLoading 
 
global{
	
	//map used to filter the object to build from the OSM file according to attributes. for an exhaustive list, see: http://wiki.openstreetmap.org/wiki/Map_Features
	map filtering <- map(["highway"::["primary", "secondary", "tertiary", "motorway", "living_street","residential", "unclassified"], "building"::["yes"]]);
	//OSM file to load
	file<geometry> osmfile <-  file<geometry>(osm_file("../includes/rouen.gz", filtering))  ;
	
	//compute the size of the environment from the envelope of the OSM file
	geometry shape <- envelope(osmfile);
	
	init {
		//possibility to load all of the attibutes of the OSM data: for an exhaustive list, see: http://wiki.openstreetmap.org/wiki/Map_Features
		create osm_agent from:osmfile with: [highway_str::string(read("highway")), building_str::string(read("building"))];
		
		//from the created generic agents, creation of the selected agents
		ask osm_agent {
			if (length(shape.points) = 1 and highway_str != nil ) {
				create node_agent with: [shape ::shape, type:: highway_str]; 
			} else {
				if (highway_str != nil ) {
					create road with: [shape ::shape, type:: highway_str];
				} else if (building_str != nil){
					create building with: [shape ::shape];
				}  
			}
			//do the generic agent die
			do die;
		}
	}	
}

species osm_agent {
	string highway_str;
	string building_str;
} 
	
species road {
	rgb color <- rnd_color(255);
	string type;
	aspect default {
		draw shape color: color; 
	}
} 
	
species node_agent {
	string type;
	aspect default { 
		draw square(3) color: #red ;
	}
} 
	
species building {
	aspect default { 
		draw shape color: rgb(200,200,200);
	}
}  

experiment load_OSM type: gui {
	output {
		display map type: opengl {
			species building refresh: false;
			species road refresh: false  ;
			species node_agent refresh: false ;
		}
	}
}
```
