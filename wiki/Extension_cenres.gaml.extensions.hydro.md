---
layout: default
title: Extension
wikiPageName: Extension_cenres.gaml.extensions.hydro
wikiPagePath: wiki/Extension_cenres.gaml.extensions.hydro.md
---
# Extension

----

 cenres.gaml.extensions.hydro

## Table of Contents
### Operators
[water_area_for](#water_area_for), [water_level_for](#water_level_for), [water_polylines_for](#water_polylines_for), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_water_area_for)
### `water_area_for`

#### Possible use: 
  * `geometry` **`water_area_for`** `float` --->  `float`
  *  **`water_area_for`** (`geometry` , `float`) --->  `float`

#### Special cases:     
  * if the left operand is a polyline and the right operand a float for the water y coordinate, returrns the area of the water (water flow area)

#### Examples: 
```
waterarea <- my_river_polyline water_area_for my_height_value
```
  
    	
----


[//]: # (keyword|operator_water_level_for)
### `water_level_for`

#### Possible use: 
  * `geometry` **`water_level_for`** `float` --->  `float`
  *  **`water_level_for`** (`geometry` , `float`) --->  `float`

#### Special cases:     
  * if the left operand is a polyline and the right operand a float for the area, returrns the y coordinate of the water (water level)

#### Examples: 
```
waterlevel <- my_river_polyline water_level_for my_area_value
```
  
    	
----


[//]: # (keyword|operator_water_polylines_for)
### `water_polylines_for`

#### Possible use: 
  * `geometry` **`water_polylines_for`** `float` --->  `msi.gama.util.IList<msi.gama.util.IList<msi.gama.metamodel.shape.GamaPoint>>`
  *  **`water_polylines_for`** (`geometry` , `float`) --->  `msi.gama.util.IList<msi.gama.util.IList<msi.gama.metamodel.shape.GamaPoint>>`

#### Special cases:     
  * if the left operand is a polyline and the right operand a float for the water y coordinate, returrns the shapes of the river sections (list of list of points)

#### Examples: 
```
waterarea <- my_river_polyline water_area_for my_height_value
```
  

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	
