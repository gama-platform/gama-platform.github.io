---
title:  7. Automatic Road Repair
---


This 7th step illustrates how to select in a list of elements that optimizes a given function.


## Formulation

* Add a new parameter, **`repair_time`**, that is equal to 2.
* Every **`repair_time`**, the `road` with the highest `destruction_coeff` value is repaired (set its `destruction_coeff` to 1).


## Model Definition

### parameters
We add a new parameter: the **`repair_time`**.

In the global section, we define the `repair_time` variable:
```
int repair_time <- 2 ;
```

In the experiment section, we define the associated parameter:
```
parameter "Number of steps between two road repairs" var: repair_time category: "Road" ;
```

### road repairing

We have to add a reflex method in the global section that is triggered every `repair_time` hours. This reflex selects, thanks to the **`with_max_of`** operator the `road` agent with the highest `destruction_coeff` value, then sets this value at 1.

```
global {
    ...
    reflex repair_road when: every(repair_time #hour) {
	road the_road_to_repair <- road with_max_of (each.destruction_coeff) ;
	ask the_road_to_repair {
	    destruction_coeff <- 1.0 ;
	}
    }
}
```

## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.2/msi.gama.models/models/Tutorials/Road%20Traffic/models/Model%2007.gaml
```
