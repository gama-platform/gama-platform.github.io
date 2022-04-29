---
title: Moving cells with neighbors
id: version-1.8.1-_3D Model 03
original_id: _3D Model 03
---

[//]: # (keyword|operator_cube)
[//]: # (keyword|operator_select)
[//]: # (keyword|skill_moving3D)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_light)
[//]: # (keyword|concept_grid)
[//]: # (keyword|concept_neighbors)


_Author : Arnaud Grignard_

Third part of the tutorial : Tuto3D


Code of the model : 

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
