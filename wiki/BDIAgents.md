---
layout: default
title: BDI Agents
wikiPageName: BDIAgents
wikiPagePath: wiki/BDIAgents.md
---
# BDI Agents


This tutorial has for goal to present the use of BDI agents. In particular, this tutorial shows how to define a BDI agents, then to add social relation between BDI agents, to add emotions and a personality to the agents and finally social norms, obligations and enforcements.

If you are not familiar with agent-based models or GAMA we advice you to have a look at the [prey-predator](PredatorPrey) model first.


## Model Overview
The model built in this tutorial concerns gold miners that try to find and sell gold nuggets. More precisely, we consider that several gold mines containing a certain amount of gold nuggets are located in the environnement. In the same way, a market where the miners can sell their gold nuggets is located in the environnment. The gold miners try to find gold mines, to extract gold nuggets from them and to sell the gold extracted nuggets at the market.

## Step List

This tutorial is composed of 5 steps corresponding to 5 models. For each step we present its purpose, an explicit formulation and the corresponding GAML code.

  1. [Creation of the basic model: gold mines and market](GoldMinerModel_step1)
  1. [Definition of the BDI miners](GoldMinerModel_step2)
  1. [Definition of social relations between miners](GoldMinerModel_step3)
  1. [Use of emotions and personality for the miners](GoldMinerModel_step4)
  1. [Adding norms, obligations and enforcement](GoldMinerModel_step5)
