---
title:  8. Complex Behavior
---

This eighth step illustrates how to define more complex actions, how to use conditional statements and iterator operators over containers.


## Formulation

* Definition of more complex behaviors for prey and predator agents:
  * The preys agents are moving to the cell containing the highest quantity of food.
  * The predator agents are moving if possible to a cell that contains preys, otherwise to a random cell.



## Model Definition

### parent species
We modify the `basic_move` reflex of the `generic_species` in order to give the `prey` and `predator` more complex behaviors: instead of choosing a random vegetation cell in the neighborhood, the agents will choose a vegetation cell (still in the neighborhood) thanks to a **`choose_cell`** action. This action will return an empty (`nil`) value in the parent species and will be specialized for each species. 

```
species generic_species {
    ...
    reflex basic_move {
	my_cell <- choose_cell();
	location <- my_cell.location; 
    } 
	
    vegetation_cell choose_cell {
	return nil;
    }
    ...
}
```

### prey species
We specialize the **`choose_cell`** action for the `prey` species: the agent will choose the vegetation cell of the neighborhood (list `my_cell.neighbors2`) that maximizes the quantity of food.

Note that GAMA offers numerous operators to manipulate lists and containers:

* Unary operators: `min`, `max`, `sum`...
* Binary operators:
  * `where`: returns a sub-list where all the elements verify the condition defined in the right operand.
  * `first_with`: returns the first element of the list that verifies the condition defined in the right operand.
  * ...
  
In the case of binary operators, each element (of the first operand list) can be accessed with the pseudo-variable **`each`**.

Thus the `choose_cell` action of the `prey` species is defined by:
```
species prey parent: generic_species {
    ...  
    vegetation_cell choose_cell {
        return (my_cell.neighbors2) with_max_of (each.food);
    }
    ...
}
```

### predator species
We specialize the **`choose_cell`** species for the `predator` species: the agent will choose, if possible, a vegetation cell of the neighborhood (list `my_cell.neighbors2`) that contains at least a `prey` agent; otherwise it will choose a random cell.

We use for this action the **`first_with`** operator on the list of neighbor vegetation cells (`my_cell.neighbors2`) with the following condition: the list of `prey` agents contained in the cell is not empty. Note that we use the **`shuffle`** operator to randomize the order of the list of the neighbor cells.

If all the neighbor cells are empty, then the agent chooses a random cell in the neighborhood (`one_of (my_cell.neighbors2)`).

GAMA contains statements that allow executing blocks depending on some conditions:
```
if condition1 {...} 
else if condition2{...} 
... 
else {...} 
```

This statement means that if condition1 = true then the first block is executed; otherwise, if condition2 = true, then it is the second block, etc. When no conditions are satisfied and an else block is defined (it is optional), this latter is executed.

We then write the `choose_cell` action as follows:
```
species predator parent: generic_species {
    ...
    vegetation_cell choose_cell {
        vegetation_cell my_cell_tmp <- shuffle(my_cell.neighbors2) first_with (!(empty (prey inside (each))));
	if my_cell_tmp != nil {
	    return my_cell_tmp;
	} else {
	    return one_of (my_cell.neighbors2);
	} 
    }
    ...
}
```

Note there is ternary operator allowing to directly use a conditioned structure to evaluate a variable:
```
condition ? value1 : value2
```
if condition is true, then returns value1; otherwise, returns value2.


## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2008.gaml
```