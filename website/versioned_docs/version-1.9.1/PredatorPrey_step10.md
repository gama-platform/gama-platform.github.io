---
title:  10. Charts
---


This 10th step illustrates how to define charts.



## Formulation

* Addition of a new display to visualize:
  * One chart representing the evolution of the quantity of prey and predator agents over time.
  * Two histograms representing the energy distribution of the prey and predator agents.


## Model Definition

### output

GAMA can display various chart types:

* Time series
* Pie charts
* Histograms

A chart must be defined in a display: it behaves exactly like any other layer.

Definition of a chart:

```
chart chart_name type: chart_type {
    [data]
}
```

The data to draw are defined inside the `chart` block as follow, using the `data` statement:

```
data data_legend value: data_value
```

We add a new display called **`Population_information`** that refreshes every 5 simulation steps.
Inside this display, we define 3 charts: one of type `series` (i.e. time series chart), two of type `histogram`:

* "Species evolution"; background: white; size: {1, 0.5}; position: {0, 0}
  * data1: `nb_preys`; color : blue
  * data2: `nb_predators`; color : red

* "Prey Energy Distribution"; background: lightGray; size: {0.5, 0.5}; position: {0, 0.5}
  * data "]0;0.25]": number of preys with (each.energy <= 0.25) ;
  * data "]0.25;0.5]": number of preys with ((each.energy > 0.25) and (each.energy <= 0.5)) ;
  * data "]0.5;0.75]": number of preys with ((each.energy > 0.5) and (each.energy <= 0.75)) ;
  * data "]0.75;1]": number of preys with  (each.energy > 0.75) ;

* "Predator Energy Distribution"; background: lightGray; size: {0.5, 0.5}; position: {0.5, 0.5}
  * data "]0;0.25]": number of predators with (each.energy <= 0.25) ;
  * data "]0.25;0.5]": number of predators with ((each.energy > 0.25) and (each.energy <= 0.5)) ;
  * data "]0.5;0.75]": number of predators with ((each.energy > 0.5) and (each.energy <= 0.75)) ;
  * data "]0.75;1]": number of predators with  (each.energy > 0.75) ;

To evaluate the value of the data of the two histogram, we use the operator **`list count condition`** that returns the number of elements of `list` for which the condition is true.

```
display Population_information refresh:every(5#cycles) {
    chart "Species evolution" type: series size: {1,0.5} position: {0, 0} {
	data "number_of_preys" value: nb_preys color: #blue ;
	data "number_of_predator" value: nb_predators color: #red ;
    }
    chart "Prey Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0, 0.5} {
	data "]0;0.25]" value: prey count (each.energy <= 0.25) color:#blue;
	data "]0.25;0.5]" value: prey count ((each.energy > 0.25) and (each.energy <= 0.5)) color:#blue;
	data "]0.5;0.75]" value: prey count ((each.energy > 0.5) and (each.energy <= 0.75)) color:#blue;
	data "]0.75;1]" value: prey count (each.energy > 0.75) color:#blue;
    }
    chart "Predator Energy Distribution" type: histogram background: #lightgray size: {0.5,0.5} position: {0.5, 0.5} {
	data "]0;0.25]" value: predator count (each.energy <= 0.25) color: #red ;
	data "]0.25;0.5]" value: predator count ((each.energy > 0.25) and (each.energy <= 0.5)) color: #red ;
	data "]0.5;0.75]" value: predator count ((each.energy > 0.5) and (each.energy <= 0.75)) color: #red ;
	data "]0.75;1]" value: predator count (each.energy > 0.75) color: #red;
    }
}
```


## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2010.gaml
```
