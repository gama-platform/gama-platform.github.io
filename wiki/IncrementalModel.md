---
layout: default
title: Incremental Model
wikiPageName: IncrementalModel
wikiPagePath: wiki/IncrementalModel.md
---

# Incremental Model



This tutorial has for goal to give an overview all most of the capabilities of GAMA. In particular, it presents how to build a simple model and the use of GIS data, graphs, 3D visualization, multi-level modeling and differential equations. All the files related to this tutorial (images and models) are available in the Models Library (project Tutorials/Incremental Model).






## Model Overview
The model built in this tutorial concerns the study of the spreading of a disease in a small city.
Three type of entities are taken into account: the people, the buildings and the roads.

We made the following modeling choice:
  * Simulation step: 1 minute
  * People are moving on the roads from building to building
  * People use the shortest path to move between buildings
  * All people have the same speed and move at constant speed
  * Each time, people arrived at a building they are staying a certain time
  * The staying time depends on the current hour (lower at 9h - go to work - at 12h go to lunch - at 18h - go back home)
  * Infected people are never cured

![images/incremental_model.jpg](resources/images/tutorials/incremental_model.jpg)





## Step List

This tutorial is composed of 7 steps corresponding to 7 models. For each step we present its purpose, an explicit formulation and the corresponding GAML code.

  1. [Simple SI Model](IncrementalModel_step1)
  1. [Charts](IncrementalModel_step2)
  1. [Integration of GIS Data](IncrementalModel_step3)
  1. [Movement on Graph](IncrementalModel_step4)
  1. [Visualizing in 3D](IncrementalModel_step5)
  1. [Multi-Level](IncrementalModel_step6)
  1. [Differential Equations](IncrementalModel_step7)
