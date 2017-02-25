---
layout: default
title: SpatialGraph3d
wikiPageName: Multi-level-data-analysis-Graph-From-Bug-(Mirror-Graph)
wikiPagePath: wiki/Multi-level-data-analysis-Graph-From-Bug-(Mirror-Graph).md
---

[//]: # (keyword|operator_hsb)
[//]: # (keyword|operator_degree_of)
[//]: # (keyword|type_topology)
[//]: # (keyword|statement_using)
[//]: # (keyword|concept_graph)
[//]: # (keyword|concept_mirror)
[//]: # (keyword|concept_3d)
# SpatialGraph3d


_Author : Arnaud Grignard_

From the reference model "bug.gaml" a spatial graph is created. We create a species node that mirrors the species bug and then a spatial graph is creating using as_distance_graph operator. The species node should then define its own related_to method to decide wether or not a node is related to another one.


Code of the model : 

```


model Graph

//Import the model Common Bug Species model
import '../includes/Common Bug Species.gaml'

global {
	//Distance to link two bugs
	int distance parameter: 'Distance' min: 1 <- 25 category: 'Model';
	//variable to start the animation of the model
	int startAnimation parameter: 'Start Animation ' min: 1 <- 25 category: 'Animation View';
	//Variable to save the time animation
	int timeAnim <- 0;
	//Reflex to update the time of animation
	reflex updateAnimation 
	{
		if (time > startAnimation) 
		{
			timeAnim <- int(time - startAnimation);
		}
	}
}
//Species node_agent mirroring the bug species, represented as graph node
species node_agent mirrors: list(bug) parent: graph_node edge_species: edge_agent {
	//Their location is the one of the target location
	point location <- target.location update: target.location;
	
	//Action to know if an agent is related to another agent considering their distance
	bool related_to (node_agent other) {
		using topology(target) {
			return (target.location distance_to other.target.location) < distance;
		}

	}

	aspect base {
		draw sphere(2) color: #green;
	}

	aspect dynamic {
		int degree <- (my_graph) degree_of (self);
		draw sphere(1 + (degree / 5.0)) color: #blue;
	}

}
//Species edge to represent the edges of the graph
species edge_agent parent: base_edge {
	rgb color;
	aspect base {
		draw shape color: #green;
	}
	
	aspect dynamic {
		shape <- line([{ self.source.location.x, self.source.location.y, self.source.location.z }, { self.target.location.x, self.target.location.y, self.target.location.z }]);
		float val <- 255.0 * (shape.perimeter / distance);
		color <- hsb(val, 1.0, 1.0);
		draw shape + 0.1 color: color border: color;
	}

}

experiment AdvancedView type: gui {
	output {
		display graph_plus_bug_layered type: opengl { 
		  species bug aspect: base;
		  species node_agent aspect: base position: { 0, 0, 0.2 };
		  species edge_agent aspect: base position: { 0, 0, 0.2 };
		  species node_agent aspect: dynamic position: { 0, 0, 0.4 };
		  species edge_agent aspect: dynamic position: { 0, 0, 0.4 };
		}
	}
}


```
