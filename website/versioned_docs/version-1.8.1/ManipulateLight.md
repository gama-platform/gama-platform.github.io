---
title:  Implementing light
---

[//]: # (startConcept|light)
[//]: # (keyword|concept_3d)
[//]: # (keyword|concept_light)

When using OpenGL display, GAMA provides you the possibility to manipulate one or several lights, making your display more realistic.
Most of the following screenshots will be taken with the following short example gaml: 
```
model test_light

grid cells {
    aspect base {
	draw square(1) at:{grid_x,grid_y} color:#white;
    }
}

experiment my_experiment type:gui{
    output {
	display my_display type: opengl background: #darkblue {
	    species cells aspect: base;
	    graphics "my_layer" {
		draw square(100) color:#white at:{50,50};
		draw cube(5) color:#lightgrey at:{50,30};
		draw cube(5) color:#lightgrey at:{30,35};
		draw cube(5) color:#lightgrey at:{60,35};
		draw sphere(5) color:#lightgrey at:{10,10,2.5};
		draw sphere(5) color:#lightgrey at:{20,30,2.5};
		draw sphere(5) color:#lightgrey at:{40,30,2.5};
		draw sphere(5) color:#lightgrey at:{40,60,2.5};
		draw cone3D(5,5) color:#lightgrey at:{55,10,0};
		draw cylinder(5,5) color:#lightgrey at:{10,60,0};
	    }
	}
    }
}
```

## Index

* [Light generalities](#light-generalities)
* [Default light](#default-light)
* [Custom lights](#custom-lights)

## Light generalities

Before going deep into the code, here is a quick explanation about how light works in OpenGL.
First of all, you need to know that there are 3 types of lights you can manipulate: the **ambient light**, the **diffuse light** and the **specular light**. Each "light" in OpenGL is in fact composed of those 3 types of lights.

### Ambient light

The **ambient light** is the light of your world without any lighting. If a face of a cube is not stricken by the light rays, for instance, this face will appear totally black if there is no ambient light. To make your world more realistic, it is better to have ambient light.
Ambient light has then no position or direction. It is equally distributed to all the objects of your scene.

Here is an example of our GAML scene using only ambient light (color red) (see below [how to define ambient light in GAML](ManipulateLight#ambient-light-1)): 

![Example of a scene with a red ambient light.](/resources/images/lightRecipes/ambient_light.png)

### Diffuse light

The **diffuse light** can be seen as the light rays: if a face of a cube is stricken by the diffuse light, it will take the color of this diffuse light. You have to know that the more perpendicular the face of your object will be to the light ray, the more lightened the face will be.

A diffuse light has then a direction. It can have also a position.
You have 2 categories of diffuse light: the **positional lights**, and the **directional lights**.

#### Positional lights

Those lights have a position in your world. It is the case of **point lights** and **spot lights**.

* **Point lights**

Points lights can be seen as a candle in your world, diffusing the light equally in all the direction.

Here is an example of our GAML scene using only diffuse light, with a point light (color red, the light source is displayed as a red sphere) : 

![Scene with only a red point light.](/resources/images/lightRecipes/point_light.png)

* **Spot lights**

Spot lights can be seen as a torch light in your world. It needs a position, and also a direction and an angle.

Here is an example of our GAML scene using only diffusion light, with a spot light (color red, the light source is displayed as a red cone) : 

![Scene with only a red spot light.](/resources/images/lightRecipes/spot_light.png)

Positional lights, as they have a position, can also have an attenuation according to the distance between the light source and the object. The value of positional lights are computed with the following formula:
```
diffuse_light = diffuse_light * ( 1 / (1 + constante_attenuation + linear_attenuation * d + quadratic_attenuation * d))
```

By changing those 3 values (constante_attenuation, linear_attenuation and quadratic_attenuation), you can control the way light is diffused over your world (if your world is "foggy" for instance, you may turn your linear and quadratic attenuation on). Note that by default, all those attenuations are equal to 0.

Here is an example of our GAML scene using only diffusion light, with a point light with linear attenuation (color red, the light source is displayed as a red sphere): 

![Scene with only diffusion light and red point light with linear attenuation.](/resources/images/lightRecipes/point_light_with_attenuation.png)

#### Directional lights

Directional lights have no real "position": they only have a direction. A directional light will strike all the objects of your world in the same direction. An example of directional light you have in the real world would be the light of the sun: the sun is so far away from us that you can consider that the rays have the same direction and the same intensity wherever they strike.
Since there is no position for directional lights, there is no attenuation either.

Here is an example of our GAML scene using only diffusion light, with a directional light (color red) : 

![Scene with a red directional light.](/resources/images/lightRecipes/direction_light.png)

### Specular light

This is a more advanced concept, giving an aspect a little bit "shinny" to the objects stricken by the specular light. It is used to simulate the interaction between the light and a special material (ex: wood, steel, rubber...).
This specular light is not implemented yet in GAMA, only the two others are.

## Default light

In your OpenGL display, without specifying any light, you will have only one light, with those following properties :

Those values have been chosen in order to have the same visual effect in both OpenGL and java2D displays, when you display 2D objects, and also to have a nice "3D effect" when using the OpenGL displays. We chose the following setting by default: 

* The ambient light value: rgb(127,127,127,255)
* diffuse light value: rgb(127,127,127,255)
* type of light: direction
* direction of the light: (0.5,0.5,-1);

Here is an example of our GAML scene using the default light: 

![Scene with the default light.](/resources/images/lightRecipes/default_light.png)

## Custom lights

In your OpenGL display, you can create up to 8 lights, giving them the properties you want.

### Ambient light

In order to keep it simple, the ambient light can be set directly when you are declaring your display, through the facet `ambient_light`. You will have one only ambient light.

```
experiment my_experiment type: gui {
    output {
	display "my_display" type: opengl ambient_light:100 {
	}
    }
}
```

_Note for developers_: Note that this ambient light is set to the GL_LIGHT0. This GL_LIGHT0 only contains an ambient light, and no either diffuse nor specular light.

### Diffuse light

[//]: # (keyword|statement_light)
In order to add lights, or modifying the existing lights, you can use the statement `light`, inside your `display` scope : 

```
experiment my_experiment type:gui {
    output {
	display "my_display" type:opengl {
	    light id:0;
	}
    }
}
```

This statement has just one non-optional facet: the facet "id". Through this facet, you can specify which light you want. You can control 7 lights, through an integer value between 1 and 7.
Once you are manipulating a light through the `light` statement, the light is turned on. To switch off the light, you have to add the facet `active`, and turn it to `false`.
The light you are declaring through the `light` statement is, in fact, a "diffuse" light. You can specify the color of the diffuse light through the facet `color` (by default, the color will be turned to white).
Another very important facet is the `type` facet. This facet accepts a value among `direction`, `point` and `spot`.

#### Declaring direction light

A direction light, as explained in the first part, is a light without any position. Instead of the facet `position`, you will use the facet `direction`, giving a 3D vector.

Example of implementation: 

```
light id: 1 type: direction direction: {1,1,1} color: rgb(255,0,0);
```

#### Declaring point light

A point light will need a facet `position`, in order to give the position of the light source.

Example of implementation of a basic point light: 

```
light id: 1 type: point position: {10,20,10} color: rgb(255,0,0);
```

You can add, if you want, a custom attenuation of the light, through the facets `linear_attenuation` or `quadratic_attenuation`.

Example of implementation of a point light with attenuation : 

```
light id:1 type: point position: {10,20,10} color: rgb(255,0,0) linear_attenuation: 0.1;
```

#### Declaring spot light

A spot light will need the facet `position` (a spot light is a positional light) and the facet `direction`. A spot light will also need a special facet `spot_angle` to determine the angle of the spot (by default, this value is set to 45 degree).

Example of implementation of a basic spot light: 

```
light id: 1 type: spot position: {0,0,10} direction: {1,1,1} color: rgb(255,0,0) spot_angle: 20;
```

Same as for point light, you can specify an attenuation for a spot light.

Example of implementation of a spot light with attenuation: 

```
light id:1 type:spot position:{0,0,10} direction:{1,1,1} color:rgb(255,0,0) spot_angle:20;
```

Note that when you are working with lights, you can display your lights through the facet `draw_light` (of `display`) to help you to implement your model. The three types of lights are displayed differently:

* The **point** light is represented by a sphere with the color of the diffuse light you specified, in the position of your light source.
* The **spot** light is represented by a cone with the color of the diffuse light you specified, in the position of your light source, the orientation of your light source. The size of the base of the cone will depend on the angle you specified.
* The **direction** light, as it has no real position, is represented with arrows a bit above the world, with the direction of your direction light, and the color of the diffuse light you specified.

![Scene with direction, spot and point lights.](/resources/images/lightRecipes/draw_light.png)

_Note for developers_: Note that, since the GL_LIGHT0 is already reserved for the ambient light (only !), all the other lights (from 1 to 7) are the lights from GL_LIGHT1 to GL_LIGHT7.

[//]: # (endConcept|light)
