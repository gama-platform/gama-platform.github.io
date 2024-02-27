---
title:  5. Visualizing in 3D
---

This step Illustrates how to define a 3D display.


## Formulation

* Add a variable (height: int from 10m to 20m) and modify the aspect of buildings to display them in 3D.
* Add a variable (display\_shape: geometry; shape with a buffer of 2m) and modify the aspect of the roads to display them with this new shape.
* Add a new global variable that indicate if it is night or not (bool: night before 7h and after 20h).
* Define a new aspect (sphere3D) for people to display them as sphere.
* Modify the display to use this new aspect.

![Incremental model 5: add a 3D display to the model.](/resources/images/tutorials/Incremental_model5.jpg)



## Model Definition

### building
First, we add a new variable for buildings (**`height`**) of type float from 10m to 20m. Then we modify the aspect in order to specify a depth for the geometry (using the **`depth`** facet).
```
species building {
    float height <- rnd(10#m, 20#m) ;
    aspect default {
	draw shape color: #gray border: #black depth: height;
    }
}
```

### road
Concerning the road,  we add a new variable (**`display_shape`**) of type geometry that corresponds to the shape of the road with a buffer of 2 meters. Then we modify the aspect in order to display this geometry instead of the shape of the agent. In order to avoid "z-fighting" problems, we add depth to the geometry (of 3 meters).
```
species road {
    geometry display_shape <- shape + 2.0;
    aspect default {
	draw display_shape color: #black depth: 3.0;
    }
}
```

### global variable

We define a new global variable called **`is_night`** of type `bool` to indicate if it is night or not. This variable will be updated at each simulation step and will be `true` if the current hour is lower than 7h or higher than 20h. It will be used in the display to change the light of the scene (to set it darker in the night).
```
global{
    ...
    bool is_night <- true update: current_date.hour < 7 or current_date.hour > 20;
    ...
}
```

### people
We define a new aspect for the people agent called **`sphere3D`**. This aspect draws people agent as a 3m sphere. In order to avoid to cut the sphere in half, we translate the centroid of the drawn sphere to 3m along the z-axis.

```
species people skills:[moving]{		
    ...
    aspect sphere3D{
	draw sphere(3) at: {location.x,location.y,location.z + 3} color:is_infected ? #red : #green;
    }
}
```

### display
The element that we have to modify is the display. We change its name to **map\_3D** to better reflect its visual aspect.

In order to get a 3D aspect, we specify that this display will be an OpenGL one. For that, we just have to add the facet **`type: opengl`**. In addition, 
we first add an ambient light with a `light` statement inside the `display` with the id `#ambient` and an `intensity` set to 20. To get a different light between night and day, we add one more `light` statement with the `#default` id and to have a nice effect night/day, we will set the intensity of the light to 50 during the night, and 127 for the day. To learn more about light, please read this [page](ManipulateLight).

Then, we add a new layer that consists of an image (soil.jpg) by using the **`image`** statement.

In order to see the people inside the building, we add transparency to the building (0.5). The transparency of a layer is a float value between 0 (solid) and 1 (totally transparent). In order to be able to manage this transparency aspect, OpenGL has to draw the people agents before the building, thus we modify the order of drawing of the different layers (people agents before building agents). At last, we modify the displayed aspect of the people agents by the new one: **`sphere3D`**.

```
experiment main_experiment type:gui{
    ...
    output {
	...
	display map_3D type: opengl {
		light #ambient intensity: 20;
		light #default intensity:(is_night ? 0 : 127);
		image "../includes/soil.jpg";
		species road ;
		species people aspect:sphere3D;			
		species building  transparency: 0.5;
	}
	...
    }
}
```





## Complete Model

```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.2/msi.gama.models/models/Tutorials/Incremental%20Model/models/Incremental%20Model%205.gaml
```
