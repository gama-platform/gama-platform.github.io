---
title:  Defining 3D Displays
---

[//]: # (startConcept|3d_displays)
[//]: # (keyword|concept_3d)

## Table of contents 

* [OpenGL display](#opengl-display)
  * [Position](#position)
  * [Size](#size)
* [Camera](#camera)
* [Dynamic camera](#dynamic-camera)
  * [Camera position](#camera-position)
  * [Camera direction (Look Position)](#camera-direction-look-position)
  * [Camera orientation (Up Vector)](#camera-orientation-up-vector)
    * [Default view](#default-view)
    * [First person view](#first-person-view)
    * [Third Person view](#third-person-view)
* [Lighting](#lighting)

[//]: # (keyword|concept_opengl)
## OpenGL display

The use an OpenGL display, we have to define the attribute `type` of the display with `type:opengl` in the chosen `display` of your model (or use the preferences->display windows to use it by default):
```
output {
    display DisplayName type: opengl {
        species mySpecies;
    }
}
```

The OpenGL display shares most of the features that the java2D offers and that are described [here](DefiningDisplaysGeneralities).

Using 3D display offers much more options to draw and show a simulation. A layer can be positioned and scaled in a 3D world. It is possible to superpose layers on different z value and display different information on the model at different positions on the screen.

### `position`

Layers can be drawn on a different location (x,y, and z) using the `position` facet.

### `size`

Layers can be drawn with a different size (x,y, and z) using the `size` facet.

Here is an example of a display using all the previous facet (experiment to add to the model `Incremental Model 5` with a new `aspect` for the `building` species). You can also dynamically change those value by modifying the sidebar in the display.

```
// Incremental Model 05.gaml

species building {
    float height <- 10#m + rnd(10) #m;
    aspect default {
	draw shape color: #grey  depth: height;
    }
    aspect infection {
	draw shape color: (people overlapping self) one_matches(each.is_infected)? #red : #green  depth: height;
    }	
}

experiment main_experiment type:gui{
    output {
	display map_3D type: opengl {
  	    species road ;
	    species road size: {0.3,0.3,0.3};			
	    species building transparency: 0.5;
	    species building aspect: infection size: {0.3,0.3} position: {0.7,0.0,0.0};
	    species people aspect:sphere3D;				
	}
    }
}
```

![Illustration of the position and size facets on a 3D display.](/resources/images/definingGUIExperiment/displays3D_postion_size.png)


[//]: # (keyword|concept_camera)
## Camera

GAMA platform provides 2 ways of controlling the camera: [Arcball Camera](Displays#arcball-camera-commands)
 and [FreeFly Camera](Displays#freefly-camera-commands), that can be activated from the [Preferences window](#Preferences) or from the display sidebar.

[![Demonstration of the various camera possibilities of the GAMA Platform.](/resources/images/definingGUIExperiment/displays3D_camera_youtube_image.jpg)](http://www.youtube.com/watch?feature=player_embedded&v=rMIVQlul1Ag)


## Dynamic camera

Users have the possibility to set dynamically the parameters of the camera (observer). The [basic camera properties](Displays#opengl-displays) are its **position**, the **direction** in which is pointing, and its **orientation**. Those 3 parameters can be set dynamically at each iteration of the simulation.

### Camera position

The facet `camera_pos` (expecting a 3D point) places the camera at the given position.
The default camera position is `{world.width/2, world.height/2, world.maxDim * 1.5}` to place the camera at the middle of the environment at an altitude that enables to see the entire environment.

### Camera direction (Look Position)

The facet `camera_look_pos` (expecting a 3D point) points the camera toward the given position. The default look position is `{world.width/2, world.height/2, 0}` to look at the center of the environment.

### Camera orientation (Up Vector)

The camera `camera_up_vector` (expecting a 3D point) sets the _up vector_ of the camera.
The _up vector_ direction in your scene is the _up_ direction on your display screen.
The default value is `{0,1,0}`.

Here are some examples that can be done using those 3 parameters. You can test it by running the following model:

[![Demonstration of the various possibilities of camera controls from the simulation.](/resources/images/definingGUIExperiment/displays3D_camera_simu_youtube_image.jpg)](http://www.youtube.com/watch?feature=player_embedded&v=lQVGD8aDKZY)


#### Default view
```
display RealBoids type: opengl {
    ...		
}
```

#### First person view
You can set the position as a first person shooter video game using:
```
display FirstPerson type: opengl
    camera_pos: {boids(1).location.x,-boids(1).location.y,10} 
    camera_look_pos: {cos(boids(1).heading)*world.shape.width,-sin(boids(1).heading)*world.shape.height,0} 
    camera_up_vector: {0.0,0.0,1.0}  {
       ...
}
```

#### Third Person view
You can follow an agent during a simulation by positioning the camera above it using:

```
display ThirdPerson type: opengl 
    camera_pos:{boids(1).location.x,-boids(1).location.y,250}  
    camera_look_pos:{boids(1).location.x,-boids(1).location.y,boids(1).location.z}  {
        ...
} 
```


[//]: # (keyword|concept_light)
## Lighting

In a 3D scene once can define light sources. The way how light sources and 3D object interact is called lighting. Lighting is an important factor to render realistic scenes.

In the real world, the color that we see depend on the interaction between color material surfaces, the light sources and the position of the viewer. There are four kinds of lighting called _ambient_, _diffuse_, _specular_ and _emissive_.

Gama handles _ambient_ light with the following facets on `display`: 

* `ambient_light`: Allows to define the value of the ambient light either using an int (`ambient_light: 125`) or a rgb color (`ambient_light: rgb(255,255,255)`). Default is `rgb(125,125,125)`.

Additional lights can be added in each display using the `light` statement. GAMA provides 3 types of light, each of them with a `color` (expecting an rgb expression) and a `draw_light` (expecting a boolean expression, it will display a representation of the light) facet:

* `point`, similarly to a camera, it is characterized by its location (`position`) and its orientation (`direction`).
* `spot`: it is only characterized by a location, diffusing the light in all the directions.
* `direction`: it is only characterized by a direction.

```
model Tuto3D

global {
    int environmentSize <- 100;
    geometry shape <- cube(environmentSize);

    init {
	create cells number: 100 {
	    location <- {rnd(environmentSize), rnd(environmentSize), rnd(environmentSize)};
	}
    }
}

species cells skills: [moving3D] {
    aspect default {
	draw sphere(environmentSize * 0.01) color: #white;
    }
}

experiment Tuto3D type: gui {
    output {
	display LigthSpot type: opengl background: rgb(10, 40, 55) ambient_light: 0 {
	    light id: 1 type: point
	        position: {environmentSize * (0.5 + cos(cycle + 180)), environmentSize * (0.5 + sin(cycle + 180)), environmentSize / 2}  
	        color: #red 
	        draw_light: true;				
	    
            graphics "env" {
		draw cube(environmentSize) color: #black empty: true;
	    }

	    species cells;
	}
	display LightPoint type: opengl background: rgb(10, 40, 55) ambient_light: 0 {
	    light id: 1 type: spot
		position: {environmentSize * (0.5 + cos(cycle + 180)), environmentSize * (0.5 + sin(cycle + 180)), environmentSize / 2}  
		direction: {1,1,1} 
		color: #blue 
		draw_light: true;			
	    graphics "env" {
		draw cube(environmentSize) color: #black empty: true;
	    }

	    species cells;
	}
		
	display LightDirection type: opengl background: rgb(10, 40, 55) ambient_light: 0 {
	    light id: 1 type: direction
		direction: {1,1,1} 
		color: #green 
		draw_light: true;			
	    graphics "env" {
		draw cube(environmentSize) color: #black empty: true;
	    }

	    species cells;
	}		
    }
}
```

![Illustration of the three kinds of lights.](/resources/images/definingGUIExperiment/displays3D_light.png)


Here is an example using all the available facet to define a diffuse light that rotates around the world.

[![Demonstration of the various possibilities of lighting.](/resources/images/definingGUIExperiment/displays3D_lighting_youtube_image.jpg)](http://www.youtube.com/watch?feature=player_embedded&v=op56elmEEYs)

[//]: # (endConcept|3d_displays)
