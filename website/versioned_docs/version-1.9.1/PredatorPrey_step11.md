---
title:  11. Writing Files
---


This 11th step illustrates how to save data in a text file.


## Formulation

* At each simulation step, write in a text file:
  * The time step
  * The number of prey and predator agents
  * The min and max energy of the prey and predator agents


## Model Definition

### global section

The main way to write data inside a file is to use the `save` statement:
```
save my_data type: file_type to: file_name;
```
With:

* `my_data`: depends on the data to save and of the type of file
* `file_type` : string
* `file_name` : string

There are 3 main possible types:

* `shp` (shapefile - GIS data): in that case, `my_data` is treated as a list of agents or geometries: all their geometries are saved in the file (with some variables as attributes),
* `txt` (text): in that case, `my_data` is treated as a string, which is written directly in the file,
* `csv`: in that case, `my_data` is treated as a list of values: [val1, val2, val3], that will be written in the file, separated by the `,` separator.

We use this statement (in a global reflex called **`save_result`**) to write:

* The cycle step: use of the **`cycle`** keyword that returns the current simulation step.
* The number of prey and predator agents: use of `nb_preys` and `nb_predators` variables.
* The min and max energy of the prey and predator agents: use of **`list min_of expression`** and **`list max_of expression`** keywords. 

```
reflex save_result when: (nb_preys > 0) and (nb_predators > 0){
    save ("cycle: "+ cycle + "; nbPreys: " + nb_preys
	  + "; minEnergyPreys: " + (prey min_of each.energy)
	  + "; maxSizePreys: " + (prey max_of each.energy) 
	  + "; nbPredators: " + nb_predators           
	  + "; minEnergyPredators: " + (predator min_of each.energy)          
	  + "; maxSizePredators: " + (predator max_of each.energy)) 
	  to: "results.txt" type: "text" rewrite: (cycle = 0) ? true : false;
}
```


## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2011.gaml
```