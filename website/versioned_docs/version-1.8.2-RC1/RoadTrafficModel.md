---
title:  Road Traffic
---


This tutorial has for goal to present the use of GIS data and complex geometries. In particular, this tutorial shows how to load gis data, to agentify them and to use a network of polylines to constraint the movement of agents. All the files related to this tutorial (shapefiles and models) are available in the Library models (`Tutorials`, `Road Traffic`).

If you are not familiar with agent-based models or GAMA, we advise you to have a look at the [prey-predator](PredatorPrey) model first.


## Model Overview

The model built in this tutorial concerns the study of road traffic in a small city. Two layers of GIS data are used: a road layer (polylines) and a building layer (polygons). The building GIS data contain an attribute: the 'NATURE' of each building: a building can be either 'Residential' or 'Industrial'. In this model, people agents are moving along the road network. Each morning, they are going to an industrial building to work, and each night they are coming back home. Each time a people agent takes a road, it wears it out. More a road is worn out, more a people agent takes time to go all over it. The town council is able to repair some roads.


![Road traffic tutorial: a screenshot of the final state of the model.](/resources/images/tutorials/road_traffic.png)


## Step List

This tutorial is composed of 7 steps corresponding to 7 models. For each step, we present its purpose, an explicit formulation, and the corresponding GAML code.

1. [Loading of GIS data (buildings and roads)](RoadTrafficModel_step1)
1. [Definition of people agents](RoadTrafficModel_step2)
1. [Movement of the people agents](RoadTrafficModel_step3)
1. [Definition of weight for the road network](RoadTrafficModel_step4)
1. [Dynamic update of the road network](RoadTrafficModel_step5)
1. [Definition of a chart display](RoadTrafficModel_step6)
1. [Automatic repair of roads](RoadTrafficModel_step7)
