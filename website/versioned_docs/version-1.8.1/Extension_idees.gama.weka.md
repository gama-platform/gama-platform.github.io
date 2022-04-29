---
title: Extension
id: version-1.8.1-Extension_idees.gama.weka
original_id: Extension_idees.gama.weka
---


----

 idees.gama.weka

## Table of Contents
### Operators
[classifier](#classifier), [classify](#classify), [clustering_cobweb](#clustering_cobweb), [clustering_DBScan](#clustering_dbscan), [clustering_em](#clustering_em), [clustering_farthestFirst](#clustering_farthestfirst), [clustering_simple_kmeans](#clustering_simple_kmeans), [clustering_xmeans](#clustering_xmeans), [train_bn](#train_bn), [train_chaid](#train_chaid), [train_gauss](#train_gauss), [train_j48](#train_j48), [train_jrip](#train_jrip), [train_mlp](#train_mlp), [train_rbf](#train_rbf), [train_reptree](#train_reptree), [train_rf](#train_rf), [train_smo](#train_smo), [train_smo_reg](#train_smo_reg), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_classifier)
### `classifier`

#### Possible use: 
  *  **`classifier`** (`any`) --->  `classifier` 

#### Result: 
Casts the operand into the type classifier
    	
----


[//]: # (keyword|operator_classify)
### `classify`

#### Possible use: 
  * `idees.gama.types.GamaClassifier` **`classify`** `map` --->  `string`
  *  **`classify`** (`idees.gama.types.GamaClassifier` , `map`) --->  `string`
  * `idees.gama.types.GamaClassifier` **`classify`** `agent` --->  `string`
  *  **`classify`** (`idees.gama.types.GamaClassifier` , `agent`) --->  `string` 

#### Result: 
use a classifier to classify an instance; use: classify(classifier, an agent)
use a classifier to classify an instance; use: train_j48(classifier, map of attribute values)

#### Examples: 
```
my_classifier classify self
my_classifier classify ["weight"::65,"size"::175]
```
      

#### See also: 
[train_chaid](#train_chaid), [train_j48](#train_j48), 
    	
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


[//]: # (keyword|operator_train_bn)
### `train_bn`

#### Possible use: 
  *  **`train_bn`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a Bayesian Network classifier; use: train_bn(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_bn(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]]);
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_chaid)
### `train_chaid`

#### Possible use: 
  *  **`train_chaid`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`, `map<string,unknown>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a CHAID classifier; use: train_j48(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values, the parameters);two parameters can be defined: binary_split: Binary splits on nominal attributes? (default: false); split_point: split point value (default: 0.05)

#### Examples: 
```
train_j48(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]],map(["binary_split"::true, "split_point"::0.03]));
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_gauss)
### `train_gauss`

#### Possible use: 
  *  **`train_gauss`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a GAUSSIAN Process Regression classifier; use: train_gauss(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_gauss(data,[ "weight", "size"],"Age");
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_j48)
### `train_j48`

#### Possible use: 
  *  **`train_j48`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`, `map<string,unknown>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a J48 classifier; use: train_j48(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values, the parameters);Eight parameters can be defined: binary_split: Binary splits on nominal attributes? (default: false); unpruned: Unpruned tree? (default: false); reduced_error_pruning: Use reduced error pruning? (default: false); sub_tree_raising: Subtree raising to be performed? (default: false); laplace: Determines whether probabilities are smoothed using Laplace correction when predictions are generated (default: false); min_nb_obj: Minimum number of instances (default: 2); numFolds: Number of folds for reduced error pruning (default: 3); confidence_factor: Confidence level (default: 0.25)

#### Examples: 
```
train_j48(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]],map(["unpruned"::true]));
```
      

#### See also: 
[classify](#classify), [train_chaid](#train_chaid), 
    	
----


[//]: # (keyword|operator_train_jrip)
### `train_jrip`

#### Possible use: 
  *  **`train_jrip`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`, `map<string,unknown>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a JRip classifier; use: train_jrip(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values, the parameters);four parameters can be defined: nb_run:Nb of Runs of optimizations  (default: 2); min_nb_obj: The minimal number of instance weights within a split (default: 2.0); prunning: Whether use pruning, i.e. the data is clean or not (default: true); num_folds: The number of folds to split data into Grow and Prune for IREP (default: 3)

#### Examples: 
```
train_jrip(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]],map(["prunning"::true]));
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_mlp)
### `train_mlp`

#### Possible use: 
  *  **`train_mlp`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`, `map<string,unknown>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a Multi-layer perceptron classifier; use: train_mlp(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values, the parameters);

#### Examples: 
```
train_mlp(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]],map([]));
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_rbf)
### `train_rbf`

#### Possible use: 
  *  **`train_rbf`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a normalized Gaussian radial basisbasis function network Regression classifier; use: train_gauss(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_gauss(data, [ "weight", "size"],"Age");
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_reptree)
### `train_reptree`

#### Possible use: 
  *  **`train_reptree`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a REP Decision/Regression classifier; use: train_reptree(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_reptree(data,[ "weight", "size"],"Age");
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_rf)
### `train_rf`

#### Possible use: 
  *  **`train_rf`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a Random Forest classifier; use: train_rf(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_rf(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]]);
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_smo)
### `train_smo`

#### Possible use: 
  *  **`train_smo`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`, `map<string,unknown>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a Support vector classifier; use: train_smo(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values, the parameters);

#### Examples: 
```
train_smo(data, [ "weight", "size"],"sexe",["sexe"::["M", "F"]],map([]));
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 
    	
----


[//]: # (keyword|operator_train_smo_reg)
### `train_smo_reg`

#### Possible use: 
  *  **`train_smo_reg`** (`container`, `list<string>`, `string`, `java.util.Map<java.lang.String,msi.gama.util.IList<java.lang.String>>`) --->  `idees.gama.types.GamaClassifier` 

#### Result: 
Build and train a Support Vector Regression classifier; use: train_smo_reg(data, list of attributes, name of the class, for each nominal attribute and the class, their possible values);

#### Examples: 
```
train_smo_reg(data, [ "weight", "size"],"Age");
```
      

#### See also: 
[classify](#classify), [train_j48](#train_j48), 

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	