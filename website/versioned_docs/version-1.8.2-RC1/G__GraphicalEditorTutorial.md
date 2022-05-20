---
title:  Creation of a basic disease spreading model
---

This tutorial illustrates how to create simple agents and make them move in their environment.

## Formulation

* Define the people species with a moving skill
* Define the move reflex that allows the people agent to move randomly and the infect_others reflex that allows them to infect other people agents.
* Define the aspect of the people species
* Add the people species to a display
* Add a chart display to follow the evolution of the number of infected people

## Diagram Definition

### Project and diagram
The first step of this tutorial consists in defining a new project, then in defining a new model from a skeleton (choose "skeleton" in "Choose a diagram".

![images/graphical_editor/create_diagram.gif](/resources/images/graphicalEditor/create_diagram.gif)


### diagram structure
A GAMA diagram is composed of three main types of elements:
* **world **: this element, generated at the creation of the diagram, that is unique, defines the "world" agent, a special agent of a GAMA model. It represents all that is global to the model: dynamics, variables, actions. In addition, it allows to initialize the simulation (init block).
* **species** and **grid**: these elements define the species of agents composing the model.
* **experiment **: these elements define a context of the execution of the simulations. In particular, it defines the input (parameters) and output (displays, files...) of a model.


### species

![images/graphical_editor/create_people.gif](/resources/images/graphicalEditor/create_people.gif)

A [species](RegularSpecies) represents a «prototype» of agents: it defines their common properties.

Three main elements can be defined in a species:

* the internal state of its agents (attributes)
* their behavior
* how they are displayed (aspects)

In our model, we define a new people species. In addition, we want to add a new capability to our agent: the possibility to move randomly. For that, we add a specific skill to our people agents. A [skill](AttachingSkills) is a built-in module that provides the modeler a self-contain and relevant set of actions and variables. The [moving](BuiltInSkills#moving) provides the agents with several attributes and actions related to movement. 

#### Internal state
An [attribute](RegularSpecies#declaration) is defined as follows: type of the attribute and name. Numerous types of attributes are available: _int (integer), float (floating-point number), string, bool (boolean, true or false), point (coordinates), list, pair, map, file, matrix, agents species, rgb (color), graph, path..._

In addition to the attributes the modeler explicitly defines, species "inherits" other attributes called "built-in" variables:

* A name (_name_): the identifier of the species
* A shape (_shape_): the default shape of the agents to be constructed after the species. It can be _a point, a polygon, etc._
* A location (_location_): the centroid of its shape.

In our model, we define 2 new attributes to our people agents: 

* **is_infected** of type bool, with for initial value: false
* **color** of type rgb, with for initial value: #green


#### Behavior

![images/graphical_editor/create_reflex.gif](/resources/images/graphicalEditor/create_reflex.gif)

GAMA proposes several ways to define the behavior of a species: dynamic variables (update facet), reflexes...

A [reflex](DefiningActionsAndBehaviors#behaviors) is a element (that can be defined to the world or any species) that will be automatically executed at each simulation step if its condition is true. The condition is optional: when it is omitted, the reflex is activated at each time step. 

We define a first reflex called **move** that is activated at each simulation step (no condition) and that makes the people move randomly using the wander action from the [moving](BuiltInSkills#moving) skill with an amplitude of 30°.
```
do wander amplitude: 30.0;
```

We define a second reflex called **infect** that is activated only when the agent is infected (is_infected = true) and that ask all the people at a distance of 5m to test a probability to be infected.
```
ask people at_distance 5.0 {
     if flip(0.1) {
	is_infected <- true;
        color <- #red;
     }
}
```

The [ask](Statements#ask) allows an agent to ask other agents to do something (i.e. to execute a sequence of statements). The [at_distance](OperatorsAA#at_distance) operator allows to get the list of agents (here of people agents) that are located at a distance lower or equal to the given distance (here 5m). The [flip](OperatorsDH#flip) operator allows to test a probability.

#### Display

![images/graphical_editor/create_aspect.gif](/resources/images/graphicalEditor/create_aspect.gif)

An agent [aspects](RegularSpecies#the-aspect-statement) have to be defined. An aspect is a way to display the agents of a species.

In an aspect, it is possible to draw:
* A geometry: for instance, the shape of the agent (but it may be a different one, for instance, a circle instead of a complex polygon)
* An image: to draw icons
* A text: to draw a text

In our model, we define an aspect for the people agent called **circle** that draw the agents as a circle of 1m radius with a color that depends on their **color** attribute. If the people agent is infected, it will be drawn in red, in green otherwise.

### global section
The global section represents a specific agent, called [world](GlobalSpecies). Defining this agent follows the same principle as any agent and is, thus, defined after a species.
The world agent represents everything that is global to the model: dynamics, variables...
It allows to initialize simulations (init block): the world is always created and initialized first when a simulation is launched (before any other agents). The geometry (shape) of the world agent is by default a square with 100m for side size but can be redefined if necessary. The _step_ attribute of the world agent allows to specify the duration of one simulation step (by default, 1 step = 1 seconde).

#### Model initialization

![images/graphical_editor/init_sim.gif](/resources/images/graphicalEditor/init_sim.gif)

The init section of the world allows to initialize the define what will happen at the initialization of a simulation, for instance, to create agents. We use the statement _create_  to create agents of a specific species: **create** species\_name + :

* number: number of agents to create (int, 1 by default)
* from: GIS file to use to create the agents (optional, string or file)
* returns: list of created agents (list)

For our model, we define the init block in order to create _nb\_people_ _people_ agents and ask _nb\_infected\_init_ of them to be infected:
```
create people number: nb_people;
ask one_of(people) {
   is_infected <- true;
   color <- #red;
}
```

### experiment
An experiment defines how a model can be simulated (executed). Several experiments can be defined for a given model. Two types of experiment exists:
* gui: experiment with a graphical interface, which displays its input parameters and outputs.
* batch: Allows to setup a series of simulations (w/o graphical interface).

In our model, a gui experiment called _my\_GUI\_xp_ is already defined.

#### output
![images/graphical_editor/define_display.gif](/resources/images/graphicalEditor/define_display.gif)

[Output](DefiningGUIExperiment) blocks are defined in an experiment and define how to visualize a simulation (with one or more [display](DefiningDisplaysGeneralities) blocks that define separate windows). Each display can be refreshed independently by defining the facet **refresh\_every:** nb (int) (the display will be refreshed every nb steps of the simulation).

Each display can include different layers (like in a GIS):

* Agents lists : **agents** layer\_name value: agents\_list aspect: my\_aspect;
* Agents species : **species**  my\_species aspect: my\_aspect
* Images: **image** layer\_name file: image\_file;
* Charts : see later.

Note that it is possible to define a [opengl display](Defining3DDisplays) (for 3D display or just to optimize the display) by using the facet `type: opengl`.

In our model, we add to the existing display _my\_display_ a layer for the people species with the circle aspect.

#### Run simulation
To run the simulation, just click on the button corresponding to the existing experiment (in our case _my_GUI_xp_)
![images/graphical_editor/run_sim.gif](/resources/images/graphicalEditor/run_sim.gif)

#### Define a chart
It is possible to define a chart layer in a display. In our model, we add a new display called _chart_ in which we define a layer of type chart to display the evolution of the number of infected and susceptible people.

![images/graphical_editor/create_chart.gif](/resources/images/graphicalEditor/create_chart.gif)

![images/graphical_editor/sim_with_chart.gif](/resources/images/graphicalEditor/sim_with_chart.gif)

