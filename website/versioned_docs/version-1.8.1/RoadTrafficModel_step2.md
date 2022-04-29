---
title: 2. People Agents
id: version-1.8.1-RoadTrafficModel_step2
original_id: RoadTrafficModel_step2
---


This second step illustrates how to obtain a random point inside a geometry. We will also define some moving agent called `people`.


## Formulation

* Define a new species of agents: the **`people`** agents. The `people` agents have a point for geometry and are represented by a yellow circle of radius 10m.
* At initialization, 100 `people` agents are created. Each `people` agent is placed inside a building of type 'Residential' (randomly selected).


## Model Definition

### species

We define a new species of agents: the **people** agents. In this model, these agents will not have a specific behavior yet. They will be just displayed. Thus, we just have to define an aspect for the agents. We want to represent the `people` agents by a yellow circle of radius 10m. We then use the **`circle`** operator to define the shape to draw in the **`draw`** command, with the expected inner color (facet **`color`**) and border color (facet **`border`**).

```
species people {
    rgb color <- #yellow ;
	
    aspect base {
	draw circle(10) color: color border: #black;
    }
}
```


### Parameter
We add a new parameter: the number of `people` agents created.

In the global section, we first define the **`nb_people`** variable:
```
    int nb_people <- 100;
```

In the `experiment` section, we introduce a new `parameter`:
```
    parameter "Number of people agents" var: nb_people category: "People" ;
```


### Creation and placement of the people agents

We have to create `nb_people` `people` agents. Each `people`agent is placed in a building of type 'Residential' randomly selected. In order to simplify the GAML code, we define a local variable **`residential_buildings`** that contain the list of the buildings of type 'Residential'. To filter the list of `building` agents (obtained by `building`), we use the **`where`** operator. We use the operator **`one_of`** to randomly select one agent of this list. There are several ways to place a `people` agent inside the selected building. In this tutorial, we choose to use the **`any_location_in`** operator. This operator returns a random point situated inside the operand geometry.

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
	draw circle(10) color: color border: #black;
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
