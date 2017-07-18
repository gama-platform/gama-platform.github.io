---
layout: default
title: 3D Graph
wikiPageName: Graphs-3D-Graph
wikiPagePath: wiki/Graphs-3D-Graph.md
---
[//]: # (keyword|operator_cube)
[//]: # (keyword|operator_as_distance_graph)
[//]: # (keyword|operator_degree_of)
[//]: # (keyword|operator_^)
[//]: # (keyword|operator_hsb)
[//]: # (keyword|skill_moving3D)
[//]: # (keyword|concept_graph)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_skill)
# 3D Graph


_Author : Arnaud Grignard_

Model using a 3D Graph and updating it at each step according to the location and the degree of each sphere. An arc is created between two adjacent spheres. Two different experiments are proposed : one with a dynamic size for the spheres according to their degree, one simpler with no update of the size.


Code of the model : 

```
  

model graph3D

global {
	int number_of_agents parameter: 'Number of Agents' min: 1 <- 200 category: 'Initialization';
	int width_and_height_of_environment parameter: 'Dimensions' min: 100 <- 500 category: 'Initialization';
	
	//Distance to know if a sphere is adjacent or not with an other
	int distance parameter: 'distance ' min: 1 <- 100;
	
	
	int degreeMax <- 1;
	geometry shape <- cube(width_and_height_of_environment);
	
	
	graph my_graph;
	init {
		
		//creation of the node agent ie the spheres with a random location in the environment
		create node_agent number: number_of_agents {
			location <- { rnd(width_and_height_of_environment), rnd(width_and_height_of_environment), rnd(width_and_height_of_environment) };
		}
		
		do degreeMax_computation;
		
		ask node_agent {
			do compute_degree;
		}
	}
	
	reflex updateDegreeMax {
		do degreeMax_computation;
	}

	action degreeMax_computation {
		my_graph <- node_agent as_distance_graph(distance);
		degreeMax <- 1;
		ask node_agent {
			if ((my_graph) degree_of (self) > degreeMax) {
				degreeMax <- (my_graph) degree_of (self);
			}
		}
	}
}


species node_agent skills: [moving3D] {
	int degree;
	float radius;
	rgb color ;
	float speed <- 5.0;
	reflex move {
		//make the agent move randomly
		do wander;
		//compute the degree of the agent
		do compute_degree;
	}
	
	
	action compute_degree {
		degree <- my_graph = nil ? 0 : (my_graph) degree_of (self);
		radius <- ((((degree + 1) ^ 1.4) / (degreeMax))) * 5;
		color <- hsb(0.66,degree / (degreeMax + 1), 0.5);
	}

    aspect base {
		draw sphere(10) color:°black;
	}
	
	aspect dynamic {
		draw sphere(radius) color: color;
	}

}

experiment Display type: gui {
	output {
		display WanderingSphere type: opengl { 
			species node_agent aspect: dynamic;
			graphics "edges" {
				//Creation of the edges of adjacence
				if (my_graph != nil) {
					loop eg over: my_graph.edges {
						geometry edge_geom <- geometry(eg);
						float val <- 255 * edge_geom.perimeter / distance; 
						draw line(edge_geom.points, 0.5)  color: rgb(val,val,val);
					}
				}
				
			}
		}
	}
}


experiment SimpleDisplay type: gui {
	output {
		display WanderingSphere type: opengl { 
			species node_agent aspect: base;
			graphics "edges" {
				if (my_graph != nil) {
					loop eg over: my_graph.edges {
						geometry edge_geom <- geometry(eg);
						float val <- 255 * edge_geom.perimeter / distance; 
						draw line(edge_geom.points) color:°black;
					}
				}
				
			}
		}
	}
}
```
