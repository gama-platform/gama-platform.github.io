---
layout: default
title: OBJ File to Geometry
wikiPageName: Data-Importation-OBJ-file-drawing
wikiPagePath: wiki/Data-Importation-OBJ-file-drawing.md
---
[//]: # (keyword|operator_\:\:)
[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_skill)
[//]: # (keyword|concept_obj)
# OBJ File to Geometry


_Author :  Arnaud Grignard_

Model which shows how to use a OBJ File to draw a complex geometry. The geometry is simply used, in this case, to draw the agents.


Code of the model : 

```


model obj_drawing   

global {
	geometry shape <- square(40);

	init { 
		create object number: 30;
	}  
} 

species object skills: [moving]{
	rgb color <- rgb(rnd(255),rnd(255),rnd(255));
	int size <- rnd(10) + 1;
	int rot <- 1000 + rnd(1000);
	reflex m when: every(100) {
		do wander amplitude: 30 speed: 0.001;
	}
	aspect obj {
		draw obj_file("../includes/teapot.obj") color: color size: size rotate: cycle/rot::{0,1,0};
	}
}	

experiment Display  type: gui {
	output {
		display ComplexObject type: opengl background:°orange{
			species object aspect:obj;				
		}
	}
}
```
