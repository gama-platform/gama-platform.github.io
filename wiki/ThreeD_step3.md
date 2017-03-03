---
layout: default
title:  3. Connections
wikiPageName: ThreeD_step3
wikiPagePath: wiki/ThreeD_step3.md
---

# 3. Connections









## Formulation
  * Mapping the network of connection

<a href='http://www.youtube.com/watch?feature=player_embedded&v=6ZlBU6xTcfw' target='_blank'><img src='http://img.youtube.com/vi/6ZlBU6xTcfw/0.jpg' width='425' height=344 /></a>





## Model Definition
In this final step we will display edges between cells that are within a given distance.

### Cells update

We add a new reflex to collect the neighbours of the cell that are within a certain distance :

```
species cells skills:[moving3D]{
...
reflex computeNeighbours {
                neighbours <- cells select ((each distance_to self) < 10);
        }  	
}
```

Then we update the cell aspect as follows. For each elements (cells) of the **neighbours** list we draw a line between this neighbour's location and the current cell's location.
```
aspect default {
  draw sphere(environmentSize*0.01) color:#orange;
  loop pp over: neighbors {
    draw line([self.location,pp.location]);
  }	
}
```





## Complete Model

The GIT version of the model can be found here [Model 03.gaml](https://github.com/gama-platform/gama/tree/master/msi.gama.models/models/Tutorials/3D/models/Model 03.gaml)

```
model Tuto3D

global {
  int nb_cells <-100;
  int environmentSize <-100;
  geometry shape <- cube(environmentSize);	
  init { 
    create cells number: nb_cells { 
      location <- {rnd(environmentSize), rnd(environmentSize), rnd(environmentSize)};       
    } 
  }  
} 
    
species cells skills: [moving3D] {  
	rgb color;
	list<cells> neighbors;
	int offset;
	
	reflex move {
      do wander;	
	}	
	
	reflex computeNeighbors {
      neighbors <- cells select ((each distance_to self) < 10);
    }
		
	aspect default {
		draw sphere(environmentSize*0.01) color:#orange;
		loop pp over: neighbors {
			draw line([self.location,pp.location]);
		}	
    }
}


experiment Tuto3D  type: gui {
  parameter "Initial number of cells: " var: nb_cells min: 1 max: 1000 category: "Cells" ;
  output {
    display View1 type:opengl background:rgb(10,40,55){
      graphics "env"{
      	draw cube(environmentSize) color: #black empty:true;	
      }
      species cells;
    }
  }  
}
```
