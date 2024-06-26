---
title:  Predator Prey
---


This tutorial presents the structure of a GAMA model as well as the use of a grid topology. In particular, this tutorial shows how to define a basic model, to define "grid agents" which are able to move within the constraints. It also introduces the displays and agents' aspect.

All the files related to this tutorial (images and models) are available in the Models Library (project Tutorials/Predator Prey).

## Content

## Model Overview
In this model, three types of entities are considered: preys, predators and vegetation cells. Preys
eat grass on the vegetation cells and predators eat preys. At each simulation step, grass grows on the vegetation cells. Concerning the predators and preys, at each simulation step, they move (to a neighbor cell), eat, die if they do not have enough energy, and eventually reproduce.

![Tutorial models Predator-Prey.](/resources/images/tutorials/predator_prey.png)


## Step List

This tutorial is composed of 13 steps corresponding to 13 models which are incremental representation of the same model, starting with the simplest model 1 and finishing with the latest one, model 13. For each step, we will present its purpose, an explicit formulation and the corresponding GAML code of the model.

1. [Basic model (prey agents)](PredatorPrey_step1)
1. [Dynamic of the vegetation (grid)](PredatorPrey_step2)
1. [Behavior of the prey agent](PredatorPrey_step3)
1. [Use of Inspectors/monitors](PredatorPrey_step4)
1. [Predator agents (parent species)](PredatorPrey_step5)
1. [Breeding of prey and predator agents](PredatorPrey_step6)
1. [Agent display (aspect)](PredatorPrey_step7)
1. [Complex behaviors for the preys and predators](PredatorPrey_step8)
1. [Adding of a stopping condition](PredatorPrey_step9)
1. [Definition of charts](PredatorPrey_step10)
1. [Writing files](PredatorPrey_step11)
1. [Image loading (raster data)](PredatorPrey_step12)
1. [Exploration of the model](PredatorPrey_step13)
