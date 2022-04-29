---
title: Basic model
id: version-1.8.1-_3D Model 01
original_id: _3D Model 01
---



_Author : Arnaud Grignard_

First part of the tutorial : Tuto3D


Code of the model : 

```

model Tuto3D

global {
  int nb_cells <-100;	
  init { 
    create cells number: nb_cells { 
      location <- {rnd(100), rnd(100), rnd(100)};       
    } 
  }  
} 
  
species cells{                      
  aspect default {
    draw sphere(1) color:#blue;   
  }
}

experiment Tuto3D  type: gui {
  parameter "Initial number of cells: " var: nb_cells min: 1 max: 1000 category: "Cells" ;	
  output {
    display View1 type:opengl {
      species cells;
    }
  }
}
```
