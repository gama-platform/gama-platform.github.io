---
title:  4. Weight for Road Network
---


The present model will introduce how to design a road system, or graph, based on the road GIS data and provide each edge a `weight` representing the destruction level of the road.


## Formulation

* Add a **`destruction_coeff`** variable to the `road` agent. The value of this variable is higher or equal to 1 or lower or equal to 2. At initialization, the value of this variable is randomly defined between 1 and 2.
* In the road network graph, more a road is worn out (`destruction_coeff` high), more a `people` agent takes time to go all over it. Then the value of the arc representing the road in the graph is equal to "length of the road `*` destruction\_coeff".
* The color of the road depends on the `destruction_coeff`. If "destruction\_coeff = 1", the road is green, if "destruction\_coeff = 2", the road is red.



## Model Definition

### road agent
We add a **`destruction_coeff`** variable which initial value is randomly defined between 1 and 2 and which have a max of 2. The color of the agent will depend on this variable. In order to simplify the GAML code, we define a new variable  **`colorValue`** that represents the value of red color and that will be defined between 0 and 255.

```
species road  {
    float destruction_coeff <- rnd(1.0,2.0) max: 2.0;
    int colorValue <- int(255*(destruction_coeff - 1)) update: int(255*(destruction_coeff - 1));
    rgb color <- rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0)  update: rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0) ;
    ...
}
```


### weighted road network

In GAMA, adding a weight for a graph is very simple, we use the **`with_weights`** operator with the graph for left-operand and a weight map for the right-operand. The weight map contains the weight of each edge: [edge1::weight1, edge2:: weight2,...]. In this model, the weight will be equal to the length of the road (perimeter of the polyline) **its destruction coefficient**.
```
    init {
        ...
        create road from: shape_file_roads ;
        map&lt;road,float> weights_map <- road as_map (each:: (each.destruction_coeff * each.shape.perimeter));
        the_graph <- as_edge_graph(road) with_weights weights_map;
        ...
    }
```



## Complete Model

```
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2004.gaml
```
