---
layout: default
title:  Luneray's flu
wikiPageName: LuneraysFlu
wikiPagePath: wiki/LuneraysFlu.md
---

# Luneray's flu


This tutorial has for goal to introduce how to build a model with GAMA and to use GIS data and graphs. In particular, this tutorial shows how to write a simple GAMA model (the structure of a model, the notion of species...) load gis data, to agentify them and to use a network of polylines to constraint the movement of agents. The pdf of the presentation corresponding to this tutorial is available [here](https://github.com/gama-platform/gama/wiki/images/Tutorials/Luneray's flu/Luneray's flu.pdf). All the files related to this tutorial (shapefiles and models) are available [here](https://github.com/gama-platform/gama/wiki/images/Tutorials/Luneray's flu/Luneray's flu.zip). 

The importation of models is described [here] (https://github.com/gama-platform/gama/wiki/G__ImportingModels)


## Model Overview
The model built in this tutorial concerns the spreading of a flu in the city of Luneray (Normandie, France).

![images/Luneray.jpg](resources/images/tutorials/Luneray.jpg)

Two layers of GIS data are used: a road layer (polylines) and a building layer (polygons). In this model, people agents are moving from building to building using the road network. Each infected people can infect the neighbor people.

Some data collected concerning Luneray and the disease:
* Number of inhabitants: 2147 (source : wikipedia)
* Mean speed of the inhabitants (while moving on the road) : 2-5 km/h
* The disease - non lethal - is spreading (by air) from people to people
* Time to cure the disease: more than 100 days
* Infection distance: 10 meters
* Infection probability (when two people are at infection distance) : 0.05/minute

From the data collected, we made some modeling choice:
* Simulation step: 1 minute
* People are moving on the roads from building to building 
* Most of time people are moving to meet their friend then go back home
* People use the shortest path to move between buildings
* All people move at constant speed
* Each time, people arrived at a building they are staying a certain time : they are staying longer in their home than in their friend houses
* Infected people are never cured

![images/Luneray.png](resources/images/tutorials/Luneray.png)

## Step List

This tutorial is composed of 5 steps corresponding to 5 models. For each step we present its purpose, an explicit formulation and the corresponding GAML code.

  1. [Creation of a first basic disease spreading model](LuneraysFlu_step1)
  1. [Definition of monitors and chart outputs](LuneraysFlu_step2)
  1. [Importation of GIS data](LuneraysFlu_step3)
  1. [Use of a graph to constraint the movements of people](LuneraysFlu_step4)
  1. [Definition of 3D displays](LuneraysFlu_step5)
