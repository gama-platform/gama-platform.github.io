---
title:  3. Integration of GIS Data
---


This step illustrates how to load and agentry GIS data.


## Formulation

* Load, agentify and display two layers of GIS data (building and road).
* Modify the initialization of the people agents to put them inside buildings.

![Incremental model 3: integration of shapefile data inside the model.](/resources/images/tutorials/Incremental_model3.png)



## Model Definition

### species
To integrate easily the two data layers, we have to define two species of agents: the **`building`** agents and the **`road`** ones. These agents will not have a particular behavior, they will just be displayed.
We define an aspect for these species. In this model, we want to represent the geometry of the agent, we then use their geometry in the  `draw` statement. In order to draw the geometry of the agent, we use the attribute **`shape`** (which is a built-in attribute of all agents).

```
species building {
    aspect default {
	draw shape color: #gray border: #black;
    }
}

species road {
    aspect default {
	draw shape color: #black;
    }
}
```


### Global variables

GAMA allows to automatically read GIS data that are formatted as shapefiles. In order to let the user chooses his/her shapefiles, we define two global variables. One allowing the user to choose the road shapefile, one allowing him/her to choose the building shapefile.

Definition of the two global variables of type `file` representing the GIS files:
```
global {
    file buildings_shapefile <- file("../includes/building.shp");
    file roads_shapefile <- file("../includes/road.shp");
}
```

### agentification of GIS data

In GAMA, the agentification of GIS data is very straightforward: it only requires to use the `create` command with the **`from`** facet with the shapefile. Each object of the shapefile will be directly used to instantiate one agent of the specified species.

We modify the init section of the global block in order to create `road` and `building` agents from the shapefiles. Then, we define the initial location of people as a point inside one of the buildings.
```
global {
    ...
    init {
	create road from: roads_shapefile;
	create building from: buildings_shapefile;
	create people number:nb_people {
	    speed <- agent_speed;
	    location <- any_location_in(one_of(building));
	}
	ask nb_infected_init among people {
	    is_infected <- true;
	}
    }
} 
```

Note that the name of a species can be used to obtain all the agents of a species (here `building` returns the list of all the buildings). We can thus use the `one_of` operator on `building` to pick a random building agent. The **`any_location_in`** operator returns a random point inside a geometry or an agent geometry.

### environment
Building a GIS environment in GAMA requires nothing special, just to define the bounds of the environment, i.e. the geometry of the `world` agent. It is possible to use a shapefile to automatically define it by computing its envelope. In this model, we use the road shapefile to define it.

```
global {
    ...
    geometry shape <- envelope(roads_shapefile); 
    ...
}
```

### display
We add to the **map** display the road and building agents. Again, as we named the aspects `default` we can omit to specify them in the `species` inside the `display`.

In the `experiment` block:
```
output {
    display map {
        species road;
	species building;
	species people;			
    }
    ...
}
```




## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Incremental%20Model/models/Incremental%20Model%203.gaml
```
