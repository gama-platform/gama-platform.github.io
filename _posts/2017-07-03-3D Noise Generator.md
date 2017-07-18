---
layout: home
title: 3D Noise Generator
categories: ['Gama New Feature','Experimental']
date: 03-07-2017
image: /images/3D_noise.png
author: Damien Philippon
---

<h2><b>3D Noise Generator</b></h2>


Noise generation is now being added to GAMA Platform as a feature to generate in a procedural way textures, mountains, ground.
It consists in using gradient noises, reducing heterogeineity caused by randomness. The most famous example might be Perlin Noise
developed by Ken Perlin to fight against the machine-like look of the computer graphics. It can be used to simulate clouds, fire, 
and also different types of textures. 
In GAMA Platform, we decided to add a possibility for users to combine this tools in order to create elevation grid procedurally 
generated but still looking realistics, using the x and y coordinates of the cell as a parameter of the operator <b><i>simplex_generator</i></b>.
But it is also possible to generate a whole world composed of different layers of grid, using the x, y and z coordinates of a cell in the
operator <b><i>improved_generator</i></b>.
Here is a sample result.

<div class='w3-center'><iframe width="560" height="315" src="https://www.youtube.com/embed/MfCaSpODf-I" frameborder="0" allowfullscreen></iframe></div>