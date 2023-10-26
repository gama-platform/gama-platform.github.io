---
title:  3. Connections
---



## Formulation

* Mapping the network of connection

[![3D tutorial: creation of a 3D distance graph amon cells.](/resources/images/tutorials/3D_model_3.png)](http://www.youtube.com/watch?feature=player_embedded&v=6ZlBU6xTcfw)



## Model Definition
In this final step, we will display edges between cells that are within a given distance.

### Cells update

We add a new reflex to collect the neighbors of the cell that are within a certain distance:

```
species cells skills:[moving3D]{
...
    reflex compute_neighbors {
        neighbors <- cells select ((each distance_to self) < 10);
    }  	
}
```

Then we update the cell aspect as follows. For each element (cells) of the `neighbors` list, we draw a line between this neighbor's location and the current cell's location.
```
aspect default {
    draw sphere(environment_size*0.01) color: #orange;
    loop pp over: neighbors {
        draw line([self.location,pp.location]);
    }	
}
```


## Complete Model


```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/3D/models/Model%2003.gaml
```
