---
title:  BDI Agents
---



This tutorial aims at presenting the use of BDI agents in GAMA. In particular, this tutorial shows how to define a BDI agents, then to add social relation between BDI agents, to add emotions and a personality to the agents and finally social norms, obligations and enforcements. These notions come from the BEN architecture, described in details in the page [Using BEN architecture](Using-BEN-simple-bdi).

If you are not familiar with agent-based models or GAMA we advise you to have a look at the [prey-predator](PredatorPrey) model first.


## Model Overview
The model built in this tutorial concerns gold miners that try to find and sell gold nuggets. More precisely, we consider that several gold mines containing a certain amount of gold nuggets are located in the environment. In the same way, a market where the miners can sell their gold nuggets is located in the environment. The gold miners try to find gold mines, to extract gold nuggets from them and to sell the gold extracted nuggets at the market.

## Step List

This tutorial is composed of 5 steps corresponding to 5 models. For each step, we present its purpose, an explicit formulation, and the corresponding GAML code.

1. [Creation of the basic model: gold mines and market](BDIAgents_step1)
1. [Definition of the BDI miners](BDIAgents_step2)
1. [Definition of social relations between miners](BDIAgents_step3)
1. [Use of emotions and personality for the miners](BDIAgents_step4)
1. [Adding norms, obligations and enforcement](BDIAgents_step5)
