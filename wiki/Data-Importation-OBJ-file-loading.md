---
layout: default
title: Complex Object Loading
wikiPageName: Data-Importation-OBJ-file-loading
wikiPagePath: wiki/Data-Importation-OBJ-file-loading.md
---

[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_skill)
[//]: # (keyword|concept_obj)
# Complex Object Loading


_Author :  Arnaud Grignard_

Provides a  complex geometry to agents (svg,obj or 3ds are accepted). The geometry becomes that of the agents.


Code of the model : 

```

model obj_loading   

global {

	init { 
		create object;
	}  
} 

species object skills:[moving]{
	
	geometry shape <- obj_file("../includes/teapot.obj") as geometry;
	
	reflex move{
		do wander;
	}
	aspect obj {
		draw shape;
	}
			
}	

experiment Display  type: gui {
	output {
		display complex  background:#gray type: opengl{
		  species object aspect:obj;				
		}
	}
}
```
