---
layout: default
title: Graph Operators
wikiPageName: Graphs-Graph-Operators
wikiPagePath: wiki/Graphs-Graph-Operators.md
---
[//]: # (keyword|operator_as_distance_graph)
[//]: # (keyword|operator_betweenness_centrality)
[//]: # (keyword|operator_degree_of)
[//]: # (keyword|operator_nb_cycles)
[//]: # (keyword|operator_alpha_index)
[//]: # (keyword|operator_beta_index)
[//]: # (keyword|operator_gamma_index)
[//]: # (keyword|operator_connectivity_index)
[//]: # (keyword|operator_connected_components_of)
[//]: # (keyword|operator_maximal_cliques_of)
[//]: # (keyword|operator_biggest_cliques_of)
[//]: # (keyword|constant_#lightgray)
[//]: # (keyword|concept_graph)
# Graph Operators


_Author : Patrick Taillandier_

Model to show how to use the different existing operators for the graph species


Code of the model : 

```

model graphoperators

global {
	graph<geometry,geometry> the_graph;
	list<list> cliques;
	init {
		create people number: 50;
		
		//creation of the graph: all vertices that are at distance <= 20 are connected
		the_graph <- as_distance_graph(people, 20);
		
		//compute the betweenness_centrality of each vertice
		map<people,float> bc <- map<people, float>(betweenness_centrality(the_graph));
		float max_centrality <- max(bc.values);
		float min_centrality <- min(bc.values);
		ask people {
			centrality <- (bc[self] - min_centrality) / (max_centrality - min_centrality);
			centrality_color <- rgb(255, int(255 * (1 - centrality)), int(255 * (1 - centrality)));
		}
		write "mean vertice degree: " + mean(the_graph.vertices collect (the_graph degree_of each));
		write "nb_cycles: " + nb_cycles(the_graph);
		write "alpha_index: " + alpha_index(the_graph);
		write "beta_index: " + beta_index(the_graph);
		write "gamma_index: " + gamma_index(the_graph);
		write "connectivity_index: " + connectivity_index(the_graph);
		write "connected_components_of: " + length(connected_components_of(the_graph));
		
		write "connected_components_of: " + length(connected_components_of(the_graph));
		
		write "maximal_cliques_of:" + (maximal_cliques_of(the_graph) collect (length(each)));
		write "biggest_cliques_of:" + (biggest_cliques_of(the_graph) collect (length(each)));
	}
}

species people {
	float centrality;
	rgb centrality_color;
	aspect centrality{
		draw circle(1) color: centrality_color;
		
	}
}

experiment graphoperators type: gui {
	
	output {
		
		display map background:#lightgray{
			graphics "edges" {
				loop edge over: the_graph.edges {
					draw edge color: #black;
				}
 			}
 			species people aspect: centrality;
		}
	}
}
```
