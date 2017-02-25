---
layout: default
title: 2. People Agents
wikiPageName: RoadTrafficModel_step2
wikiPagePath: wiki/RoadTrafficModel_step2.md
---

# 2. People Agents
This second step Illustrates how to obtain a random point inside a geometry. We will also define some moving agent called _people_.







## Formulation
  * Define a new species of agents: the **people** agents. The **people** agents have a point for geometry and are represented by a yellow circle of radius 10m.
  * At initialization, 100 **people** agents are created. Each **people** agent is placed inside a building of type 'Residential' (randomly selected).





## Model Definition

### species
We define a new species of agents: the **people** agents. In this model, these agents will not have a specific behavior yet. They will be just displayed. Thus, we just have to define an aspect for the agents. We want to represent the **people** agents by a yellow circle of radius 10m. We then use the **circle** value for the **shape** facet of the **draw** command, with the expected color and radius size (defined by the facet **size**).

```
species people {
	rgb color <- #yellow ;
	
	aspect base {
		draw circle(10) color: color;
	}
}
```


### parameter
We have to add a new parameter: the number of **people** agents created

In the global section, definition of the **nb\_people** variable:
```
   int nb_people <- 100;
```

In the experiment section, definition of the parameter:
```
   parameter "Number of people agents" var: nb_people category: "People" ;
```

### creation and placement of the people agents

We have to create **nb\_people** **people** agents. Each **people** is placed in a buildings of type 'Residential' randomly selected. In order to simplify the GAML code, we defined a local variable **residential\_buildings** that represent the list of buildings of type 'Residential'. To filter the list of **building** agents (obtained by **building**), we use the **where** operator. We use the operator **one\_of** to randomly select one agent of this list. There are several ways to place a **people** agent inside this building. In this tutorial, we choose to use the **any\_location\_in** operator. This operator returns a random point situated inside the operand geometry.

```
global {
	...
	init {
		create building from: shape_file_buildings with: [type::string(read ("NATURE"))] {
			if type="Industrial" {
				color <- #blue ;
			}
		}
		create road from: shape_file_roads ;
		list<building> residential_buildings <- building where (each.type="Residential");
		create people number: nb_people {
			location <- any_location_in (one_of (residential_buildings));
		}
	}
}
```

### display
We add the **people** agent in the defined display.

```
   output {
      display city_display {
         species building aspect: base ;
         species road aspect: base ;
         species people aspect: base ;
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
	int nb_people <- 100;
	
	init {
		create building from: shape_file_buildings with: [type::string(read ("NATURE"))] {
			if type="Industrial" {
				color <- #blue ;
			}
		}
		create road from: shape_file_roads ;
		list<building> residential_buildings <- building where (each.type="Residential");
		create people number: nb_people {
			location <- any_location_in (one_of (residential_buildings));
		}
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

species people {
	rgb color <- #yellow ;
	
	aspect base {
		draw circle(10) color: color;
	}
}

experiment road_traffic type: gui {
	parameter "Shapefile for the buildings:" var: shape_file_buildings category: "GIS" ;
	parameter "Shapefile for the roads:" var: shape_file_roads category: "GIS" ;
	parameter "Shapefile for the bounds:" var: shape_file_bounds category: "GIS" ;
	parameter "Number of people agents" var: nb_people category: "People" ;
	
	output {
		display city_display type:opengl {
			species building aspect: base ;
			species road aspect: base ;
			species people aspect: base ;
		}
	}
}
```
