---
layout: default
title: Extension
wikiPageName: Extension_idees.gama.weka
wikiPagePath: wiki/Extension_idees.gama.weka.md
---

# Extension

----

 idees.gama.weka

## Table of Contents
### Operators
[clustering_cobweb](#clustering_cobweb), [clustering_DBScan](#clustering_dbscan), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_xmeans](#clustering_xmeans), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_clustering_cobweb)
### `clustering_cobweb`

#### Possible use: 
  *  **`clustering_cobweb`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clusteredby CobWeb Algorithm based on the given attributes. Some paremeters can be defined: acuity: minimum standard deviation for numeric attributes; cutoff: category utility threshold by which to prune nodes seed

#### Examples: 
```
list<list<agent>> var0 <- clustering_cobweb([ag1, ag2, ag3, ag4, ag5],["size","age", "weight"],["acuity"::3.0, "cutoff"::0.5); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_xmeans](#clustering_xmeans), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_cobweb](#clustering_cobweb), 
    	
----


[//]: # (keyword|operator_clustering_DBScan)
### `clustering_DBScan`

#### Possible use: 
  *  **`clustering_DBScan`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clustered by DBScan Algorithm based on the given attributes. Some paremeters can be defined: distance_f: The distance function to use for instances comparison (euclidean or manhattan); min_points: minimun number of DataObjects required in an epsilon-range-queryepsilon: epsilon -- radius of the epsilon-range-queries

#### Examples: 
```
list<list<agent>> var0 <- clustering_DBScan([ag1, ag2, ag3, ag4, ag5],["size","age", "weight"],["distance_f"::"manhattan"]); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_xmeans](#clustering_xmeans), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_cobweb](#clustering_cobweb), 
    	
----


[//]: # (keyword|operator_clustering_em)
### `clustering_em`

#### Possible use: 
  *  **`clustering_em`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clustered by EM Algorithm based on the given attributes. Some paremeters can be defined: max_iterations: the maximum number of iterations to perform;num_clusters: the number of clusters; minStdDev: minimum allowable standard deviation

#### Examples: 
```
list<list<agent>> var0 <- clustering_em([ag1, ag2, ag3, ag4, ag5],["size","age", "weight"],["max_iterations"::10, "num_clusters"::3]); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_xmeans](#clustering_xmeans), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_DBScan](#clustering_dbscan), [clustering_cobweb](#clustering_cobweb), 
    	
----


[//]: # (keyword|operator_clustering_farthestFirst)
### `clustering_farthestFirst`

#### Possible use: 
  *  **`clustering_farthestFirst`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clustered by Farthest First Algorithm based on the given attributes. Some paremeters can be defined: num_clusters: the number of clusters

#### Examples: 
```
list<list<agent>> var0 <- clustering_farthestFirst([ag1, ag2, ag3, ag4, ag5],["size","age", "weight"],["num_clusters"::3]); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_xmeans](#clustering_xmeans), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_em](#clustering_em), [clustering_DBScan](#clustering_dbscan), [clustering_cobweb](#clustering_cobweb), 
    	
----


[//]: # (keyword|operator_clustering_simple_kmeans)
### `clustering_simple_kmeans`

#### Possible use: 
  *  **`clustering_simple_kmeans`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clustered by K-Means Algorithm based on the given attributes. Some paremeters can be defined: distance_f: The distance function to use. 4 possible distance functions: euclidean (by default) ; 'chebyshev', 'manhattan' or 'levenshtein'; dont_replace_missing_values: if false, replace missing values globally with mean/mode; max_iterations: the maximum number of iterations to perform;num_clusters: the number of clusters

#### Examples: 
```
list<list<agent>> var0 <- clustering_simple_kmeans([ag1, ag2, ag3, ag4, ag5],["size","age", "weight"],["distance_f"::"manhattan", "num_clusters"::3]); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_xmeans](#clustering_xmeans), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_DBScan](#clustering_dbscan), [clustering_cobweb](#clustering_cobweb), 
    	
----


[//]: # (keyword|operator_clustering_xmeans)
### `clustering_xmeans`

#### Possible use: 
  *  **`clustering_xmeans`** (`list<agent>`, `list<string>`, `map<string,unknown>`) --->  `list<list<agent>>` 

#### Result: 
A list of agent groups clustered by X-Means Algorithm based on the given attributes. Some paremeters can be defined: bin_value: value given for true value of boolean attributes; cut_off_factor: the cut-off factor to use;distance_f: The distance function to use. 4 possible distance functions: euclidean (by default) ; 'chebyshev', 'manhattan' or 'levenshtein'; max_iterations: the maximum number of iterations to perform; max_kmeans: the maximum number of iterations to perform in KMeans; max_kmeans_for_children: the maximum number of iterations KMeans that is performed on the child centers;max_num_clusters: the maximum number of clusters; min_num_clusters: the minimal number of clusters

#### Examples: 
```
list<list<agent>> var0 <- clustering_xmeans([ag1, ag2, ag3, ag4, ag5],["size","age", "weight", "is_male"],["bin_value"::1.0, "distance_f"::"manhattan", "max_num_clusters"::10, "min_num_clusters"::2]); 	// var0 equals for example, can return [[ag1, ag3], [ag2], [ag4, ag5]]
```
      

#### See also: 
[clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_DBScan](#clustering_dbscan), [clustering_cobweb](#clustering_cobweb), 

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	
