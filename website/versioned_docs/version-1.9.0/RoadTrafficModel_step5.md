---
title:  5. Dynamic weights
---

This 5th step illustrates how to obtain the shortest path from a point to another one and to update the weights of an existing graph.


## Formulation

* At initialization, the value of the `destruction_coeff` of the `road` agents will be equal to 1.
* Add a new parameter: the **`destroy`** parameter that represents the value of destruction when a people agent takes a road. By default, it is equal to 0.02.
* When a people agent arrive at its destination (home or work), it updates the `destruction_coeff` of the `road` agents it took to reach its destination:  "destruction\_coeff = destruction\_coeff - destroy". Then, the graph is updated.



## Model Definition

### global section

We add the **`destroy`** parameter.

In the global section, we define the `destroy` variable:
```
float destroy <- 0.02;
```

In the experiment section, we add a parameter:
```
parameter "Value of destruction when a people agent takes a road" var: destroy category: "Road" ;
```

We define a new reflex that updates the graph at each simulation step. For that, we use the `with_weights` operator. This operator allows to update the weights of an existing graph.

```
global {
    ...
    reflex update_graph{
        map<road,float> weights_map <- road as_map (each:: (each.destruction_coeff * each.shape.perimeter));
        the_graph <- the_graph with_weights weights_map;
     }
}
```

### people agents

At each time-step, after a `people` agent has moved over one or multiple road segments, it updates the value of the destruction coefficient of `road` agents crossed (i.e. roads belonging to the path followed). We have for that to set the argument **`return_path`** to `true` in the `goto` action to obtain the path followed, then to compute the list of agents concerned by this path with the operator **`agent_from_geometry`**.
```
species people skills: [moving]{
    ...
    reflex move when: the_target != nil {
	path path_followed <- goto(target: the_target, on:the_graph, return_path: true);
	list<geometry> segments <- path_followed.segments;
	loop line over: segments {
	    float dist <- line.perimeter;
	    ask road(path_followed agent_from_geometry line) { 
		destruction_coeff <- destruction_coeff + (destroy * dist / shape.perimeter);
	    }
	}
	if the_target = location {
	    the_target <- nil ;
	}
    }
    ...
}	
```



## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2005.gaml
```
