---
title:  Graph operators and indicators
---


## goals

**load graphs from files** generate graphs using generators
**operators for graph manipulation (including stats)** graphs display

## done

### load graphs from file

For parsing network files, we use the graphstream library which supports the top- 10 file formats. All these formats are supported by GAMA now.

Till now, the GAML langage does not enables an easy way to create primitives that both take more than 3 args as an input and return an object. Thus loading a graph is defined as an action of a skill; one has to create an instance of agent with this skill for loading the network.

```
global {  
	var mongraphe type:graph;
	graph_manager graph_util;

	init { 
		create graph_manager returns: graph_util;
		ask graph_util {
			
			set mongraphe value:load_graph_from_dgs_old(self, [edge_species::edgeSpecy, vertex_species::nodeSpecy,file::"../includes/BarabasiGenerated.dgs"]);
		
		}
	}  
}

```

### graph manipulators

The structure for the manipulation of graphs is based on the existing GAMA graph type. As a consequence, novel algorithms, operators and visualizations will be usable for both spatial graphs (loading from GIS for instance, like roads) and more abstract graphs (not spatialized).

Patrick did some interesting work for searching shortest pathes and so on.

Novel operators should still be defined.

### graph visualization

First of all, we had to disturb many GAMA-gurus for undertanding how to create a novel View (that is, another tab in the simulation perspective) from GAML. A novel display is defined for displaying a network.

```
output {
	graphdisplay nameOfMyDisplay graph: mongraphe {	 
	}
}
```

This line indicates that we would like to display a graph defined in the variable "mongraphe". This simple line will open the display.



## Roadmap

**provide another (simpler !) syntax for loading networks** visu:
  * implement prefuse instead of graphstream for the visualisation
  * map GAML aspects to the view of the network
**implement operators for graph manipulation** add generators for simple graphs generation (with a simple syntax as well)