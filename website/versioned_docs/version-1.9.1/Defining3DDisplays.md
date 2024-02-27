---
title:  Defining 3D Displays
---


## OpenGL display

The use an OpenGL display, we have to define the attribute `type` of the display with `type:opengl` in the chosen `display` of your model (or use the preferences->display windows to use it by default):
```
output {
    display DisplayName type: opengl {
        species mySpecies;
    }
}
```

The OpenGL display shares most of the features that the java2D offers and that are described [here](DefiningDisplaysGeneralities). Using 3D display offers much more options to draw and show a simulation. A layer can be positioned and scaled in a 3D world. It is possible to superpose layers on different z value and display different information on the model at different positions on the screen.

Most of the features offers by GAMA in 3D can be found as model example in the model library in the [Visualization and User Interaction/3D Visualization](https://github.com/gama-platform/gama.old/tree/GAMA_1.8.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization)

Such as:

- 3D Model: Creating a simple model with building in 3D from a GIS file extruded in [Building Elevation.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Building%20Elevation.gaml) 

![Building_Elevation.](/resources/images/runningExperiments/building_elevation.png)

- Built-in 3D shapes supported by GAMA are described in [Built-In Shapes.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Built-In%20Shapes.gaml)

![built-in_shape](/resources/images/runningExperiments/built-in_shape.png)

- Features related to camera and the way to manipulate it are found in [Camera Definitions.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Definitions.gaml)

![camera_definition](/resources/images/runningExperiments/camera_definition.png)

- Different point of view can be described on the same simulation and shared by different displays in [Camera Shared Zoom.experiment](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Shared%20Zoom.experiment) 

![shared_zoom](/resources/images/runningExperiments/shared_zoom.png)

- Any GIS file can be visualized in 3D and a texture can be applied to the 3D shape in [GIS Visualization.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/GIS%20Visualization.gaml)

![gis_vizu](/resources/images/runningExperiments/gis_vizu.png)

- GAMA is handling different kind of lighting such as spot lights and point lights as illustrated in [Lighting.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.8.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Lighting.gaml)

![light_vizu](/resources/images/runningExperiments/light_vizu.png)

- [Moving 3D object.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.8.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Moving%203D%20object.gaml) which shows how to draw a moving objet as a OBJ File and how to apply a 3D rotation on it 

![moving_object_vizu](/resources/images/runningExperiments/moving_object_vizu.png)

- Specular light can also be defined as illustrated in [Specular effects.gaml](https://github.com/gama-platform/gama.old/blob/GAMA_1.8.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Specular%20effects.gaml)

![lighting_vizu_2](/resources/images/runningExperiments/lighting_vizu_2.png)
