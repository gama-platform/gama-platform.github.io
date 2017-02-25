---
layout: default
title: ShortestPath
wikiPageName: Graphs-Shortest-paths
wikiPagePath: wiki/Graphs-Shortest-paths.md
---

[//]: # (keyword|operator_load_shortest_paths)
[//]: # (keyword|operator_all_pairs_shortest_path)
[//]: # (keyword|operator_path_between)
[//]: # (keyword|operator_paths_between)
[//]: # (keyword|operator_\:\:)
[//]: # (keyword|statement_save)
[//]: # (keyword|constant_#cyan)
[//]: # (keyword|constant_#magenta)
[//]: # (keyword|type_path)
[//]: # (keyword|type_matrix)
[//]: # (keyword|concept_graph)
[//]: # (keyword|concept_load_file)
[//]: # (keyword|concept_shortest_path)
[//]: # (keyword|concept_save_file)
# ShortestPath


_Author : Patrick Taillandier_

This model shows how get the shortest path from one point to another on a graph. The experiment proposes two displays : one to show the shortest path, an other to show the first k shortest paths. 


Code of the model : 

```

model ShortestPath

global {
	file shape_file_in <- file('../includes/road.shp') ;
	file shape_file_bounds <- file('../includes/bounds.shp') ;
	geometry shape <- envelope(shape_file_bounds);
	graph road_graph; 
	point source;
	point target;
	path shortest_path;
	list<path> k_shortest_paths;
	int k <- 3; 
	list<rgb> colors <- [#red,#green,#blue,#pink,#cyan,#magenta,#yellow];
	bool save_shortest_paths <- false;
	bool load_shortest_paths <- false;
	string shortest_paths_file <- "../includes/shortest_paths.csv";
	
	init {
		create road from: shape_file_in;
		road_graph <- as_edge_graph(road);
		
		//computes all the shortest paths, puts them in a matrix, then saves the matrix in a file
		if save_shortest_paths {
			matrix ssp <- all_pairs_shortest_path(road_graph);
			write "Matrix of all shortest paths: " + ssp;
			save ssp type:"text" to:shortest_paths_file;
			
		//loads the file of the shortest paths as a matrix and uses it to initialize all the shortest paths of the graph
		} else if load_shortest_paths {
			road_graph <- road_graph load_shortest_paths matrix(file(shortest_paths_file));
		}
	}
	
	reflex compute_shortest_paths {
		source <- point(one_of(road_graph.vertices));
		target <- point(one_of(road_graph.vertices));
		if (source != target) {
			shortest_path <- path_between (road_graph, source,target);
			k_shortest_paths <- list<path>(paths_between(road_graph,source::target,k));	
		}
	}
}

species road  {
	aspect base {
		draw shape color: #black ;
	} 
}

experiment ShortestPath type: gui {
	parameter "number of shortest paths (k)" var: k min: 1 max: 7;
	parameter "Computed all the shortest paths and save the results" var: save_shortest_paths;
	parameter "Load the shortest paths from the file" var: load_shortest_paths;
	
	output {
		display map_shortest_path {
			species road aspect: base;
			graphics "shortest path" {
				if (shortest_path != nil) {
					draw circle(5) at: source color: #green;
					draw circle(5) at: target color: #cyan;
					draw (shortest_path.shape + 2.0) color: #magenta;
				}
			}
		}
		display map_k_shortest_paths {
			species road aspect: base;
			graphics "k shortest paths" {
				if (shortest_path != nil) {
					draw circle(5) at: source color: #green;
					draw circle(5) at: target color: #cyan;
					loop i from: 0 to: length(k_shortest_paths) - 1{
						draw ((k_shortest_paths[i]).shape + 2.0) color: colors[i];
					}
				}
			}
		}
	}
}
```
