---
title:  5. Definition of 3D displays
---

This fifth step illustrates how to define 3D displays.

![Result of the Luneray Flu model 5.](/resources/images/tutorials/luneray5.png)


## Formulation

* Define a new 3D aspect for roads.
* Define a new 3D aspect for buildings
* Define a new 3D aspect for people
* Define a new 3D display 


## Model Definition

### species

We define a new aspect for the road species called `geom3D` that draw the road agent that as a black tube of 2m radius built from its geometry. Note that it is possible to get the list of points composing a geometry by using the `points` variable of the geometry. 

![Road image for Luneray's Flu model.](/resources/images/tutorials/roads_display.png)

```
species road {
    //....
    aspect geom3D {
	draw line(shape.points, 2.0) color: #black;
    }
}
```

Concerning the building species, we define an aspect called `geom3D` that draws the shape of the building with a depth of 20 meters and with using a texture "texture.jpg" for the face and a texture for the roof "roof\_top.jpg".

![Building image for Luneray's Flu model.](/resources/images/tutorials/buildings_display.png)

```
species building {
    //....
    aspect geom3D {
	draw shape depth: 20 #m border: #black texture: ["../includes/roof_top.jpg","../includes/texture.jpg"];
    }
}
```

At last, we define a new aspect called `geom3D` for the people species that displays the agent only if it is on a road (target != nil). In this aspect, we use an obj file that contains a 3D object. The use of the `obj_file` operator allows to apply an initial rotation to an obj file. In our case, we add a rotation of -90° along the x-axis. We specify with the `size` facet that we want to draw the 3D object inside a bounding box of 5m. As the location of the 3D object is its centroid and as we want to draw the 3D object on the top of the ground, we use the `at` facet to put an offset along the z-axis. We use also the rotate facet to change the orientation of the 3D object according to the heading of the agent. At last, we choose to draw the 3D object in green if the agent is not infected; in red otherwise.

![3D object used to display people agents in Luneray's Flu model.](/resources/images/tutorials/people_display.png)

```
species people skills:[moving]{		
    //....
    aspect geom3D {
	if target != nil {
	    draw obj_file("../includes/people.obj", 90::{-1,0,0}) size: 5
		at: location + {0,0,7} rotate: heading - 90 color: is_infected ? #red : #green;
	}
    }
}
```

### output

We define a new display called `view3D` of type `opengl` with the facet `antialias` set to false. Inside this display, we first set a `light` of type `ambient` and with an intensity of 80. We then draw a background image representing the satellite image of the Luneray. Note that GAMA is able to manage world files to georeferenced images. In our case, as a PGW file exists in the includes folder, the satellite image will be well localized in the display. After drawing the background image, we display first the building species with their geom3D aspect, then the road species with their geom3D aspect and finally the people species with their geom3D aspect. Only the people agents will be redrawn at each simulation step.


```
experiment main_experiment type: gui {
    output {
    // monitor and other displays	
	display view3D type: opengl antialias: false {
		light #ambient intensity: 80;
		image "../includes/luneray.jpg" refresh: false; 
		species building aspect: geom3D refresh: false;
		species road aspect: geom3D refresh: false;
		species people aspect: geom3D; 
	}
    }
}
```

## Complete Model


```gaml reference
https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Tutorials/Luneray%20flu/models/model5.gaml
```
