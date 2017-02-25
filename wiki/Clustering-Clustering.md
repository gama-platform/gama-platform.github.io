---
layout: default
title:  Clustering of agents by K Means and DBScan
wikiPageName: Clustering-Clustering
wikiPagePath: wiki/Clustering-Clustering.md
---

[//]: # (keyword|operator_dbscan)
[//]: # (keyword|operator_rnd_color)
[//]: # (keyword|operator_kmeans)
[//]: # (keyword|constant_#grey)
[//]: # (keyword|concept_clustering)
[//]: # (keyword|concept_statistic)
#  Clustering of agents by K Means and DBScan


_Author :  Patrick Taillandier_

A model to show how to use clustering operators and two methods of clustering (K Means and DBScan) with the goal of regrouping agents in clusters


Code of the model : 

```

model clustering

global {
	//the number of groups to create (kmeans)
	int k <- 4;
	
	//the maximum radius of the neighborhood (DBscan)
	float eps <- 10.0; 
	
	//the minimum number of elements needed for a cluster (DBscan)
	int minPoints <- 3;
	
	init {
		//create dummy agents
		create dummy number: 100;
	}
	
	reflex cluster_building {
		//create a list of list containing for each dummy agent a list composed of its x and y values
		list<list> instances <- dummy collect ([each.location.x, each.location.y]);
		
		//from the previous list, create groups with the eps and minPoints parameters and the DBSCAN algorithm (https://en.wikipedia.org/wiki/DBSCAN)
		list<list<int>> clusters_dbscan <- list<list<int>>(dbscan(instances, eps,minPoints));
		
		//We give a random color to each group (i.e. to each dummy agents of the group)
       loop cluster over: clusters_dbscan {
			rgb col <- rnd_color(255);
			loop i over: cluster {
				ask dummy[i] {color_dbscan <- col;}
			}
		}
		
		//from the previous list, create k groups  with the Kmeans algorithm (https://en.wikipedia.org/wiki/K-means_clustering)
		list<list<int>> clusters_kmeans <- list<list<int>>(kmeans(instances, k));
		
		//We give a random color to each group (i.e. to each dummy agents of the group)
		loop cluster over: clusters_kmeans {
			rgb col <- rnd_color(255);
			loop i over: cluster {
				ask dummy[i] {color_kmeans <- col;}
			}
		}
	}
	
}

species dummy {
	rgb color_dbscan <- #grey;
	rgb color_kmeans <- #grey;
	aspect dbscan_aspect {
		draw circle(2) color: color_dbscan;
	}
	aspect kmeans_aspect {
		draw circle(2) color: color_kmeans;
	}
}

experiment clustering type: gui {
	parameter "Number of clusters to split the data into" var: k category: "KMEANS";
	parameter "Maximum radius of the neighborhood to be considered" var: eps category: "DBSCAN";
	parameter "Minimum number of points needed for a cluster " var: minPoints category: "DBSCAN";
	output {
		display map_dbscan{
			species dummy aspect: dbscan_aspect;
		}
		display map_kmeans{
			species dummy aspect: kmeans_aspect;
		}
	}
}
```
