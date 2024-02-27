---
title:  7. Agent Aspect
---

In this seventh step, we will focus on the display and more specifically the aspects of the agents: how they are represented. It can be a simple shape (circle, square, etc.), an icon, a polygon (see later GIS support).


## Formulation

* Definition of two new aspects for the prey and predator agents:
  * A icon
  * A square with information about the agent energy
* Use of the **`icon`** aspect as default aspect for the prey and predator agents.


## Model Definition

### parent species

We add a new variable of type `image_file` (a particular kind of `file`) called **`my_icon`** to the `generic_species`.
We define as well two new aspects:

* **`icon`**: draw the image given by the variable `my_icon`,
* **`info`**: draw a square of side size `size` and color `color` and draw as a text the energy of the agent (with a precision of 2 digits).

```
species generic_species {
    ...
    image_file my_icon;
    ...
    aspect base {
        draw circle(size) color: color ;
    }
    aspect icon {
        draw my_icon size: 2 * size ;
    }
    aspect info {
        draw square(size) color: color ;
        draw string(energy with_precision 2) size: 3 color: #black ;
    }
}
```

### prey species
We specialize the `prey` species from the `generic_species` species as follows:

* definition of the initial value of the agent variables:
```
species prey parent: generic_species {
    ...  
    image_file my_icon <- image_file("../includes/data/sheep.png") ;
    ...
}
```

The image file is here: [![Icon for the prey agents.](/resources/images/tutorials/predator_prey_sheep.png)](/resources/images/tutorials/predator_prey_sheep.png).

You have to copy it in your project folder: `includes/data/`.

### predator species
As done for the `prey` species, we specialize the `predator` species from the `generic_species` species:

* definition of the initial value of the agent variables:

```
species predator parent: generic_species {
    ...
    image_file my_icon <- image_file("../includes/data/wolf.png") ;
    ...
}
```

The image file is here: [![Icon for the predator species.](/resources/images/tutorials/predator_prey_wolf.png)](/resources/images/tutorials/predator_prey_wolf.png).

You have to copy it in your project folder: `includes/data/`.

### display
We change the default aspect of the prey and predator agents to `icon` aspect.
```
output {
    display main_display {
        grid vegetation_cell lines: #black ;
        species prey aspect: icon ;
        species predator aspect: icon ;
    }
}
```

We define a new display called `info_display` that displays the prey and predator agents with the `info` aspect.
```
output {
    display info_display {
	grid vegetation_cell lines: #black ;
        species prey aspect: info;
        species predator aspect: info;
    }
}
```




## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2007.gaml
```