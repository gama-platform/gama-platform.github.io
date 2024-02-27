---
title:  6. Charts
---


This 6th step illustrates how to display charts.


## Formulation

* Add a chart to display the evolution of the road destruction: the mean value of the `destruction_coeff` of the `road` agents, and its max value (refreshed every 10 simulation steps).
* Add a chart to display the activity of the `people` agent (working or staying home, refreshed every 10 simulation steps).


## Model Definition

### chart display

First, we add a chart of type **`series`** to display the road destruction evolution. To compute the mean of the `destruction_coeff`, we combine the **mean** and **`collect`** operators. `collect` takes a container and an expression as operands and will compute a new list, each element being the evaluation on the container operand of the expression. `mean` computes the average of all the elements of a list. For the max, we use the **`max_of`** operator. (Note that the operator `mean_of` also exists to replace `mean` and `collect`).

```
     output {
         display chart_display refresh:every(10#cycles) {
             chart "Road Status" type: series size: {1, 0.5} position: {0, 0} {
                 data "Mean road destruction" value: mean (road collect each.destruction_coeff) style: line color: #green ;
	         data "Max road destruction" value: road max_of each.destruction_coeff style: line color: #red ;
	     }
             ...
         }
     }
```

Second, we add a chart of type **`pie`** to display the activity of the `people` agents. We use for that the `objective` variable of the `people` agents and the **`count`** operator that allows computing the number of elements of a list that verify a condition.

```
    output {
      ...
      display chart_display refresh: every(10#cycles) {
          ...
          chart "People Objectif" type: pie style: exploded size: {1, 0.5} position: {0, 0.5}{
	       data "Working" value: people count (each.objective="working") color: #magenta ;
	       data "Resting" value: people count (each.objective="resting") color: #blue ;
	  }
     }
   }
```

We chose to display the 2 charts on the same display. As a consequence, we specified the `size` and `position` of each of them to define the layout of this display.



## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2006.gaml
```
