---
layout: default
title: Extension
wikiPageName: Extension_idees.gama.mapcomparison
wikiPagePath: wiki/Extension_idees.gama.mapcomparison.md
---
# Extension

----

 idees.gama.mapcomparison

## Table of Contents
### Operators
[fuzzy_kappa](#fuzzy_kappa), [fuzzy_kappa_sim](#fuzzy_kappa_sim), [kappa](#kappa), [kappa_sim](#kappa_sim), [percent_absolute_deviation](#percent_absolute_deviation), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_fuzzy_kappa)
### `fuzzy_kappa`

#### Possible use: 
  *  **`fuzzy_kappa`** (`list<agent>`, `list`, `list`, `list<float>`, `list`, `matrix<float>`, `float`) --->  `float`
  *  **`fuzzy_kappa`** (`list<agent>`, `list`, `list`, `list<float>`, `list`, `matrix<float>`, `float`, `list`) --->  `float` 

#### Result: 
fuzzy kappa indicator for 2 map comparisons: fuzzy_kappa(agents_list,list_vals1,list_vals2, output_similarity_per_agents,categories,fuzzy_categories_matrix, fuzzy_distance). Reference: Visser, H., and T. de Nijs, 2006. The map comparison kit, Environmental Modelling & Software, 21
fuzzy kappa indicator for 2 map comparisons: fuzzy_kappa(agents_list,list_vals1,list_vals2, output_similarity_per_agents,categories,fuzzy_categories_matrix, fuzzy_distance, weights). Reference: Visser, H., and T. de Nijs, 2006. The map comparison kit, Environmental Modelling & Software, 21

#### Examples: 
```
fuzzy_kappa([ag1, ag2, ag3, ag4, ag5],[cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2], similarity_per_agents,[cat1,cat2,cat3],[[1,0,0],[0,1,0],[0,0,1]], 2)
fuzzy_kappa([ag1, ag2, ag3, ag4, ag5],[cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2], similarity_per_agents,[cat1,cat2,cat3],[[1,0,0],[0,1,0],[0,0,1]], 2, [1.0,3.0,2.0,2.0,4.0])
```
  
    	
----


[//]: # (keyword|operator_fuzzy_kappa_sim)
### `fuzzy_kappa_sim`

#### Possible use: 
  *  **`fuzzy_kappa_sim`** (`list<agent>`, `list`, `list`, `list`, `list<float>`, `list`, `matrix<float>`, `float`) --->  `float`
  *  **`fuzzy_kappa_sim`** (`list<agent>`, `list`, `list`, `list`, `list<float>`, `list`, `matrix<float>`, `float`, `list`) --->  `float` 

#### Result: 
fuzzy kappa simulation indicator for 2 map comparisons: fuzzy_kappa_sim(agents_list,list_vals1,list_vals2, output_similarity_per_agents,fuzzy_transitions_matrix, fuzzy_distance). Reference: Jasper van Vliet, Alex Hagen-Zanker, Jelle Hurkens, Hedwig van Delden, A fuzzy set approach to assess the predictive accuracy of land use simulations, Ecological Modelling, 24 July 2013, Pages 32-42, ISSN 0304-3800, 
fuzzy kappa simulation indicator for 2 map comparisons: fuzzy_kappa_sim(agents_list,list_vals1,list_vals2, output_similarity_per_agents,fuzzy_transitions_matrix, fuzzy_distance, weights). Reference: Jasper van Vliet, Alex Hagen-Zanker, Jelle Hurkens, Hedwig van Delden, A fuzzy set approach to assess the predictive accuracy of land use simulations, Ecological Modelling, 24 July 2013, Pages 32-42, ISSN 0304-3800, 

#### Examples: 
```
fuzzy_kappa_sim([ag1, ag2, ag3, ag4, ag5], [cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2], similarity_per_agents,[cat1,cat2,cat3],[[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1]], 2)
fuzzy_kappa_sim([ag1, ag2, ag3, ag4, ag5], [cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2], similarity_per_agents,[cat1,cat2,cat3],[[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1]], 2,[1.0,3.0,2.0,2.0,4.0])
```
  
    	
----


[//]: # (keyword|operator_kappa)
### `kappa`

#### Possible use: 
  *  **`kappa`** (`list`, `list`, `list`) --->  `float`
  *  **`kappa`** (`list`, `list`, `list`, `list`) --->  `float` 

#### Result: 
kappa indicator for 2 map comparisons: kappa(list_vals1,list_vals2,categories). Reference: Cohen, J. A coefficient of agreement for nominal scales. Educ. Psychol. Meas. 1960, 20.
kappa indicator for 2 map comparisons: kappa(list_vals1,list_vals2,categories, weights). Reference: Cohen, J. A coefficient of agreement for nominal scales. Educ. Psychol. Meas. 1960, 20. 

#### Examples: 
```
kappa([cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2],[cat1,cat2,cat3])
float var1 <- kappa([1,3,5,1,5],[1,1,1,1,5],[1,3,5]); 	// var1 equals the similarity between 0 and 1
float var2 <- kappa([1,1,1,1,5],[1,1,1,1,5],[1,3,5]); 	// var2 equals 1.0
kappa([cat1,cat1,cat2,cat3,cat2],[cat2,cat1,cat2,cat1,cat2],[cat1,cat2,cat3], [1.0, 2.0, 3.0, 1.0, 5.0])
```
  
    	
----


[//]: # (keyword|operator_kappa_sim)
### `kappa_sim`

#### Possible use: 
  *  **`kappa_sim`** (`list`, `list`, `list`, `list`) --->  `float`
  *  **`kappa_sim`** (`list`, `list`, `list`, `list`, `list`) --->  `float` 

#### Result: 
kappa simulation indicator for 2 map comparisons: kappa(list_valsInits,list_valsObs,list_valsSim, categories). Reference: van Vliet, J., Bregt, A.K. & Hagen-Zanker, A. (2011). Revisiting Kappa to account for change in the accuracy assessment of land-use change models, Ecological Modelling 222(8).
kappa simulation indicator for 2 map comparisons: kappa(list_valsInits,list_valsObs,list_valsSim, categories, weights). Reference: van Vliet, J., Bregt, A.K. & Hagen-Zanker, A. (2011). Revisiting Kappa to account for change in the accuracy assessment of land-use change models, Ecological Modelling 222(8)

#### Examples: 
```
kappa([cat1,cat1,cat2,cat2,cat2],[cat2,cat1,cat2,cat1,cat3],[cat2,cat1,cat2,cat3,cat3], [cat1,cat2,cat3])
kappa([cat1,cat1,cat2,cat2,cat2],[cat2,cat1,cat2,cat1,cat3],[cat2,cat1,cat2,cat3,cat3], [cat1,cat2,cat3],[1.0, 2.0, 3.0, 1.0, 5.0])
```
  
    	
----


[//]: # (keyword|operator_percent_absolute_deviation)
### `percent_absolute_deviation`

#### Possible use: 
  * `list<float>` **`percent_absolute_deviation`** `list<float>` --->  `float`
  *  **`percent_absolute_deviation`** (`list<float>` , `list<float>`) --->  `float` 

#### Result: 
percent absolute deviation indicator for 2 series of values: percent_absolute_deviation(list_vals_observe,list_vals_sim)

#### Examples: 
```
percent_absolute_deviation([200,300,150,150,200],[250,250,100,200,200])
```
  

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	
