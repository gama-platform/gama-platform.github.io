---
layout: default
title: Extension
wikiPageName: Extension_ummisco.gama.gpu
wikiPagePath: wiki/Extension_ummisco.gama.gpu.md
---
# Extension

----

 ummisco.gama.gpu

## Table of Contents
### Operators
[CPU_path_between](#cpu_path_between), [GPU_path_between](#gpu_path_between), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_CPU_path_between)
### `CPU_path_between`

#### Possible use: 
  *  **`CPU_path_between`** (`graph`, `geometry`, `geometry`) --->  `path` 

#### Result: 
The shortest path between a list of two objects in a graph computed with CPU

#### Examples: 
```
path var0 <- my_graph CPU_path_between (ag1:: ag2); 	// var0 equals A path between ag1 and ag2
```
  
    	
----


[//]: # (keyword|operator_GPU_path_between)
### `GPU_path_between`

#### Possible use: 
  *  **`GPU_path_between`** (`graph`, `geometry`, `geometry`) --->  `path` 

#### Result: 
The shortest path between a list of two objects in a graph computed with GPU

#### Examples: 
```
path var0 <- my_graph GPU_path_between (ag1:: ag2); 	// var0 equals A path between ag1 and ag2
```
  

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	
