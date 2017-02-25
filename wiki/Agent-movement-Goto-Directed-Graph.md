---
layout: default
title:  Directed Graph Model
wikiPageName: Agent-movement-Goto-Directed-Graph
wikiPagePath: wiki/Agent-movement-Goto-Directed-Graph.md
---

[//]: # (keyword|operator_polyline)
[//]: # (keyword|operator_reverse)
[//]: # (keyword|operator_directed)
[//]: # (keyword|statement_switch)
[//]: # (keyword|statement_match)
[//]: # (keyword|type_path)
[//]: # (keyword|concept_graph)
[//]: # (keyword|concept_agent_movement)
[//]: # (keyword|concept_skill)
#  Directed Graph Model


_Author :  Patrick Taillandier_

Model representing how to directed graph using GIS Data for the road networks : the GIS contains a column defining the direction of the roads and people moving from one random point to another on this graph


Code of the model : 

```

model simplemodel

global {
	file road_file <- file("../includes/gis/roads.shp");
	geometry shape <- envelope(road_file);
	graph the_graph; 
	
	init {
		create road from: road_file with:[direction::int(read("DIRECTION"))] {
			switch direction {
				match 0 {color <- #green;}
				match 1 {color <- #red;
					//inversion of the road geometry
					shape <- polyline(reverse(shape.points));
				}
				match 2 {color <- #blue;
					//bidirectional: creation of the inverse road
					create road {
						shape <- polyline(reverse(myself.shape.points));
						direction <- 2;
						color <- #blue;
					}
				} 
			}
		}
		//The operator directed modify the graph created by as_edge_graph(road) to a directed graph
		the_graph <- directed(as_edge_graph(road)) ;
		
		
		create people number: 1000 {
			//The operator any_location_in returns a random point located in one of the road agents
			target <- any_location_in(one_of (road)) ;
			location <- any_location_in (one_of(road));
			source <- location;
		} 
	}
}

species road {
	int direction;
	rgb color;
	aspect geom {
		draw shape color: color;
	}
}
//The people agents use the skill moving which have built-in variables such as speed, target, location, heading and built-in operators
species people skills: [moving] {
	point target;
	path my_path; 
	point source;
	string r_s;
	string r_t; 
	aspect circle {
		draw circle(10) color: #green;
	}
	
	reflex movement {
		
		//The operator goto is a built-in operator derivated from the moving skill, moving the agent from its location to its target, 
		//   restricted by the on variable, with the speed and returning the path followed
		my_path <- self goto (on:the_graph, target:target, speed:10, return_path: true);
		
		//If the agent arrived to its target location, then it choose randomly an other target on the road
		if (target = location) {			
			target <- any_location_in(one_of (road)) ;
			source <- location;
		}
	}
}

experiment simplemodel type: gui {
	output {
		display map {
			species road aspect: geom;
			species people aspect: circle;
		}
	}
}
```
