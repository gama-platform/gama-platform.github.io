---
layout: default
title: 1. Basic Model
wikiPageName: PredatorPrey_step1
wikiPagePath: wiki/PredatorPrey_step1.md
---

# 1. Basic Model
This first step Illustrates how to write a model in GAMA. In particular, it describes how to structure a model and how to define species - that are the key components of GAMA models.
## Content







## Formulation
  * Definition of the **prey** species
  * Definition of a **nb\_prey\_init** parameter
  * Creation of **nb\_prey\_init** **prey** agents randomly located in the environment (size: 100x100)





## Model Definition

### model structure
A GAMA model is composed of three type of sections:
  * **global** : this section, that is unique, defines the "world" agent, a special agent of a GAMA model. It represents all that is global to the model: dynamics, variables, actions. In addition, it allows to initialize the simulation (init block).
  * **species** and **grid**: these sections define the species of agents composing the model. Grid are defined in the following model step "vegetation dynamic";
  * **experiment** : these sections define a context of execution of the simulations. In particular, it defines the input (parameters) and output (displays, files...) of a model.

More details about the different sections of a GAMA model can be found [here](ModelOrganization).

### species
A [species](RegularSpecies) represents a «prototype» of agents: it defines their common properties.

A species definition requires the definition of three different elements :
  * the internal state of its agents (attributes)
  * their behavior
  * how they are displayed (aspects)

#### Internal state
An [attribute](RegularSpecies#declaration) is defined as follows: type of the attribute  and name. Numerous types of attributes are available: _int (integer), float (floating point number), string, bool (boolean, true or false), point (coordinates), list, pair, map, file, matrix, espèce d’agents, rgb (color), graph, path..._
  * Optional facets: <- (initial value), update (value recomputed at each step of the simulation), function:{..} (value computed each time the variable is used), min, max

In addition to the attributes the modeler explicitly defines, species "inherits" other attributes called "built-in" variables:
  * A name (_name_): the identifier of the species
  * A shape (_shape_): the default shape of the agents to be construct after the species. It can be _a point, a polygon, etc._
  * A location (_location_) : the centroid of its shape.

#### Behavior
In this first model, we define one species of agents: the **prey** agents. For the moment, these agents will not have a particular behavior, they will just exist and be displayed.

#### Display
An agent [aspects](RegularSpecies#the-aspect-statement) have to be defined. An aspect is a way to display the agents of a species : aspect aspect\_name {...}
In the block of an aspect, it is possible to draw :
  * A geometry :  for instance, the shape of the agent (but it may be a different one, for instance a disk instead of a complex polygon)
  * An image : to draw icons
  * A text : to draw a text

In order to display our prey agents we define two attributes:
  * **size** of type float, with for initial value: 1.0
  * **color** of type _rgb_, with for initial value: "blue". It is possible to get a color value by using the symbol _#_ + color name: e.g. #blue, #red, #white, #yellow, #magenta, #pink...

#### Prey species code
For the moment, we only define an aspect for this species. We want to display for each prey agent a circle of radius _size_ and color _color_. We then use the keyword **draw** with a circle shape.

```
species prey {
	float size <- 1.0 ;
	rgb color <- #blue;
		
	aspect base {
		draw circle(size) color: color ;
	}
} 
```


### global section
The global section represents a specific agent, called world. Defining this agent follows the same principle as any agent and is, thus, defined after a species.
The world agent represents everything that is global to the model : dynamics, variables...
It allows to initialize simulations (init block): the world is always created and initialized first when a simulation is launched (before any other agents). The geometry (shape) of the world agent is by default a square with 100m for side size, but can be redefined if necessary (see the [Road traffic tutorial](RoadTrafficModel)).

#### global variable
In the current model, we will only have a certain numbers of preys thus we need to hold this number in a global or world's variable of type integer (_int_) which can be done as follows:
```
global {
   int nb_preys_init <- 200;
}
```

#### Model initialization

The init section of the global block allows to initialize the model which is executing certain commands, here we will create _nb\_preys\_init_ number of prey agents. We use the statement _create_  to create agents of a specific species: **create** species\_name + :
  * number : number of agents to create (int, 1 by default)
  * from : GIS file to use to create the agents (optional, string or file)
  * returns: list of created agents (list)

Definition of the init block in order to create _nb\_preys\_init_ _prey_ agents:
```
   init {
      create prey number: nb_preys_init ;
   }
```

### experiment
An experiment block defines how a model can be simulated (executed). Several experiments can be defined for a given model. They are defined using : **experiment** exp\_name type: gui/batch {`[input]` `[output]`}
  * gui : experiment with a graphical interface, which displays its input parameters and outputs.
  * batch : Allows to setup a series of simulations (w/o graphical interface).

In our model, we define a gui experiment called _prey\_predator_  :
```
experiment prey_predator type: gui {
}
```

#### input
Experiments can define (input) parameters. A parameter definition allows to make the value of a global variable definable by the user through the graphic interface.

A parameter is defined as follows:
**parameter** title var: global\_var category: cat;
  * **title** : string to display
  * **var** : reference to a global variable (defined in the global section)
  * **category** : string used to «store» the operators on the UI - optional
  * **<-** : init value - optional
  * **min** : min value - optional
  * **max** : min value - optional

Note that the init, min and max values can be defined in the global variable definition.

In the experiment, definition of a parameter from the the global variable _nb\_preys\_init_ :
```
experiment prey_predator type: gui {
   parameter "Initial number of preys: " var: nb_preys_init min: 1 max: 1000 category: "Prey" ;
}
```

#### output
Output blocks are defined in an experiment and define how to visualize a simulation (with one or more display blocks that define separate windows). Each display can be refreshed independently by defining the facet **refresh\_every:** nb (int) (the display will be refreshed every nb steps of the simulation).

Each display can include different layers (like in a GIS) :
  * Agents lists : **agents** layer\_name value: agents\_list aspect: my\_aspect;
  * Agents species : **species**  my\_species aspect: my\_aspect
  * Images: **image** layer\_name file: image\_file;
  * Texts : **texte** layer\_name value: my\_text;
  * Charts : see later.

Note that it is possible to define a [opengl display](Defining3DDisplays) (for 3D display) by using the facet **type: opengl**.

In our model, we define a display to draw the _prey_ agents.
```
 output {
      display main_display {
         species prey aspect: base ;
      }
   }
```





## Complete Model

```
model prey_predator

global {
	int nb_preys_init <- 200;
	init {
		create prey number: nb_preys_init ;
	}
}

species prey {
	float size <- 1.0 ;
	rgb color <- #blue;
		
	aspect base {
		draw circle(size) color: color ;
	}
} 

experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init min: 1 max: 1000 category: "Prey" ;
	output {
		display main_display {
			species prey aspect: base ;
		}
	}
}
```
