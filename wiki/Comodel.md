---
layout: default
title:  Using Comodel
wikiPageName: Comodel
wikiPagePath: wiki/Comodel.md
---

# Using Comodel

## Introduction
In the trend of developing complex system of multi-disciplinary, composing and coupling models are days by days become the most attractive research objectives. 
GAMA is supporting the co-modelling and co-simulation which are suppose to be the common coupling infrastructure.


## Example of a Comodel 

A Comodel is a model, especially an multi-agent-based, compose several sub-model, called micro-model. A comodel itself could be also a micro-model of an other comodel. From the view of a micro-model, comodel is called a macro-model.

A micro-model must be import, instantiate, and life-control by macro-model.

![](resources/images/comodel/concepts.png)


## Why and when can we use Comodel ?

to be completed...

## Use of Comodel in a GAML model


The GAML language has been evolve by extend the import section. The old importation tell the compiler to merge all imported elements into as one model, but the new one allows modellers to keep the elements come from imported models separately with the caller model.

### Defining a micro-model
Defining a micro-model of comodel is to import an existing model with an alias name. The syntax is: 
``` 
import <path to the GAML model> as <identifier>
```
The identifier is then become the new name of the micro-model.


### Instantiate a micro-model
After the importation and giving an identifier, micro-model must be explicitly instantiated. It could be done by create statement. 
```
create <micro-model identifier> . <experiment name> [optional parameter];
```
THe <exeperiment name> is an expriment inside micro-model. This syntax will generate an experiment agent and attach an implicitly simulation. 

Note: Creation of multi-instant is not create multi-simulation, but multi-experiment. Modellers could create a experiment with multi-simulation by explicitly do the init inside the experiment scope.

### Control micro-model life-cycle
A micro-model can be control as the normal agent by asking the correspond identifier, and also be destroy by the 'o die' statement. As fact, it can be recreate any time we need.


```
ask (<micro-model identifier> . <experiment name>  at <number> ) . simulation {
		...
}
```


## Visualize micro-model

The micro-model species could display in comodel with the support of agent layer

```
agents "name of layer" value: (<micro-model> . <experiment name> at <number>).<get List of agents>;
```



## More details


## Example of the comodel

### Urbanization model with Traffic model

![](resources/images/comodel/comodel_urban_traffic.png)

### Flood model with Evacuation model
Reusing of  two existing models:Flood Simulation and Evacuation.

Toy Models/Evacuation/models/continuous_move.gaml

![](resources/images/comodel/continuous_move_model_display.png)

Toy Models/Flood Simulation/models/Hydrological Model.gaml

![](resources/images/comodel/hydro_model_display.png)

The comodel explore the effect of flood on evacuation plan:

![](resources/images/comodel/comodel_disp_Flood_Evacuation.png)

Simulation results:

![](resources/images/comodel/comodel_Flood_Evacuation.png)
