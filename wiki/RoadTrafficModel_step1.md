---
layout: default
title: 1. Loading of GIS Data
wikiPageName: RoadTrafficModel_step1
wikiPagePath: wiki/RoadTrafficModel_step1.md
---

# 1. Loading of GIS Data
This first step Illustrates how to load GIS data (shapefiles) and to read attributes from GIS data.







## Formulation
  * Set the time duration of a time step to 10 minutes
  * Load, agentify and display two layers of GIS data (building and road). Agentifying a GIS element will allow us to give it a behavior later on (thus not being simply a static/passive object).
  * Read the 'NATURE' attribute of the building data: the buildings of 'Residential' type will be colored in gray, the buildings of 'Industrial' type will be color in blue.





## Model Definition

### species
In this first model, we have to define two species of agents: the **building** agents and the **road** ones. These agents will not have a particular behavior, they will just be displayed.
For each of these species, we define a new attribute: **color** of type _rgb_, with for initial value: "black" for the **road** agent and "gray" (by default) for the **building** agent.
Concerning the **building** agent, we define a second attribute named **type** representing the type of the building ("Residential" or "Industrial").
At last, we define an aspect for these species. In this model, we want to represent the geometry of the agent, we then use the keyword **draw** that allow to draw a given geometry. In order to draw the geometry of the agent we use the attribute **shape** (which is a built-in attribute of all agents).


```
species building {
	string type; 
	rgb color <- #gray  ;
	
	aspect base {
		draw shape color: color ;
	}
}

species road  {
	rgb color <- #black ;
	
        aspect base {
		draw shape color: color ;
	}
}
```


### parameters
GAMA allows to automatically read GIS data that are formatted as shapefiles. In order to let the user chooses his/her shapefiles, we define three parameters. One allowing the user to choose the road shapefile, one allowing him/her to choose the building shapefile, and, at last, one allowing him/her to choose the bounds shapefile. We will come back later on the notion of "bounds" in GAMA.

Definition of the three global variables of type _file_ concerning the GIS files:
```
global {
   file shape_file_buildings <- file("../includes/building.shp");
   file shape_file_roads <- file("../includes/road.shp");
   file shape_file_bounds <- file("../includes/bounds.shp");
}
```

In the experiment section, we add three parameters to allow the user to change the shapefile used directly through the UI:
```
experiment road_traffic type: gui {
   parameter "Shapefile for the buildings:" var: shape_file_buildings category: "GIS" ;
   parameter "Shapefile for the roads:" var: shape_file_roads category: "GIS" ;
   parameter "Shapefile for the bounds:" var: shape_file_bounds category: "GIS" ;
}
```

### agentification of GIS data

In GAMA, the agentification of GIS data is very straightforward: it only requires to use the **create** command with the **from** facet to pass the shapefile. Each object of the shapefile will be directly used to instantiate an agent of the specified species. The reading of an attribute in a shapefile is also very simple. It only requires to use the **with** facet: the argument of this facet is a dictionary of which the keys are the names of the agent attributes and the value the **read** command followed by the name of the shapefile attribute ("NATURE" in our case).

Init section of the global block: creation of the road and building agents from the shape files. Concerning the **building** agents, reading of the "NATURE" attribute of the shapefile to initiate the value of the **type** attribute. If the **type** attribute is equal to "Industrial" set the **color** attribute to "blue".
```
global {
  ...
  init {
   create building from: shape_file_buildings with: [type::read ("NATURE")] {
      if type="Industrial" {
         color <- #blue ;
      }
   }
   create road from: shape_file_roads ;
  } 
```

### time step
In GAMA, by default, a time step represents 1 second. It is possible to redefine this value by overriding the **step** global variable. This value of the time step is used by the moving primitives of GAMA.

In our model, we define that a step represent 10 minutes. Note that it is possible to define the unit of a value by using _#_ + unit name. For instance, #mn or #km for kilometers.

```
global {
  ...
  float step <- 10 #mn;
  ...
}
```
### environment
Building a GIS environment in GAMA requires nothing special, just to define the bounds of the environment, i.e. the geometry of the world agent. It is possible to use a shapefile to automatically define it by computing its envelope. In this model, we use a specific shapefile to define it. However, it would been possible to use the road shapefile to define it and let GAMA computes it enveloppe automatically.

```
global {
  ...
  geometry shape <- envelope(shape_file_bounds); 
  ...
}
```

### display
We define a display to visualize the road and building agents. We use for that the classic **species** keyword. In order to optimize the display we use an opengl display (facet **type: opengl**).

In the **experiment** block:
```
output {
   display city_display type:opengl {
      species building aspect: base ;
      species road aspect: base ;
   }
}
```





## Complete Model

```
model tutorial_gis_city_traffic

global {
	file shape_file_buildings <- file("../includes/building.shp");
	file shape_file_roads <- file("../includes/road.shp");
	file shape_file_bounds <- file("../includes/bounds.shp");
	geometry shape <- envelope(shape_file_bounds);
	float step <- 10 #mn;
	
	init {
		create building from: shape_file_buildings with: [type::string(read ("NATURE"))] {
			if type="Industrial" {
				color <- #blue ;
			}
		}
		create road from: shape_file_roads ;
	}
}

species building {
	string type; 
	rgb color <- #gray  ;
	
	aspect base {
		draw shape color: color ;
	}
}

species road  {
	rgb color <- #black ;
	aspect base {
		draw shape color: color ;
	}
}

experiment road_traffic type: gui {
	parameter "Shapefile for the buildings:" var: shape_file_buildings category: "GIS" ;
	parameter "Shapefile for the roads:" var: shape_file_roads category: "GIS" ;
	parameter "Shapefile for the bounds:" var: shape_file_bounds category: "GIS" ;
	
	output {
		display city_display type:opengl {
			species building aspect: base ;
			species road aspect: base ;
		}
	}
}
```
