---
layout: default
title: Possibility to directly create agents from a CSV file
wikiPageName: Event__CodingCampFall2012_improvements
wikiPagePath: wiki/Event__CodingCampFall2012_improvements.md
---
Improvements and Enhancements




# Possibility to directly create agents from a CSV file
The create statement has been extended in order to let the possibility to create agents of specified species directly from a CSV file.
An agent is created by line of the CSV file. It is also possible to read the different column of the file using the read operator: **read (column\_index) (start at 0)**

```
read(1)
```

For example:
```
create people from: "data_file.csv" with: [speed::read(0), age:: read(1)];
```

It is also possible to specify that the CSV file has a header that can give the name of the different column using the **header** facet (**boolean**). It this case, it is possible to directly use this name to read the column value: **read("attribute1")**.

For example:
```
create people from: "data_file.csv" with: [speed::read("SPEED"), age:: read("AGE")] header: true;
```

# Improving and simplifying the syntax of GAML
New features:
  * Possibility to define 3D points with the **{x,y,z}** syntax:
```
let pt type: point <- {2, 5, 3};
```
# Documenting and enhancing the command line version

#summary One-sentence summary of this page.


The aim of this feature is to run models and experiments on a grid or a cluster without GUI and to take advantages of High Performance Computing. It promises efficient running by accelerating each simulation and experiment plan computing. The GUI is not loaded and managed. Several simulations could be run in parallel, at same time.


There is two ways to run a GAMA experiment in headless mode: using command-line launcher or Java command line. These commands take 2 arguments: an experiment file and an output directory.

For the command-line :
```
 sh gamaHeadless.sh $1 $2
```
  * with:
    * $1 input parameter file : an xml file determining experiment parameters and attended outputs
    * $2 output directory path : a directory which contains simulation results (numerical data and simulation snapshot)

[go to headless documentation](Headless)

# Torus environment
It is now possible to use toroidal environment for grid and continuous environments (even with complex GIS geometries).  The only thing to do is to use the **torus** facet.

For a grid:
```
grid cell width: 5 height: 5 neighbors: 8 torus: true 
```

For the continuous environment:
```
environment bounds: {50,50} torus: true;
```

Be careful concerning toroidal continuous environment: the computation required by these environment is high, thus they should be used only when they are really necessary.

A demonstration of a continuous toroidal environment is given in the experimental model: testTorus-> continuous\_torus.


![http://gama-platform.googlecode.com/files/toroidalEnv.png](http://gama-platform.googlecode.com/files/toroidalEnv.png)

# Communication Skill
Plugin-needed: msi.gaml.extensions.fipa

The communicating skill now re-works on GAMA 1.5. Sample toy models are found in "models/fipa".

# Update of the Trust Skill to Gama 1.5

# Hexgonal geometry and grid
It is now possible to create a hexagon of with the given width and height (point) thanks to the operator **hexagon({width, height})**

```
hexagon({3,4})
```

In the same way, an operator has been defined in order to decomposed a geometry into a set of hexagons of a given a number of columns and rows. This operator returns a set of hexagons: geometry as\_hexagonal\_grid({nb\_cols, nb\_rows})

```
shape as_hexagonal_grid({50, 40})
```

At last, it is now possible to define a hexagonal grid. To do so, the neighbors should is set to **6**. It is possible to use torus environment with hexagonal grid.

```
grid cell width: 20 height: 20 neighbors: 6 torus: true;
```


![http://gama-platform.googlecode.com/files/imageHexGrid.png](http://gama-platform.googlecode.com/files/imageHexGrid.png)

# Using HSB color

Add [HSB](http://en.wikipedia.org/wiki/HSL_and_HSV) color to be able to iterate through colors and use it to represent qualitative data.

Example:

The association of the orientation of agents is enhanced by mapping the orientation of the agent to a hue.

```
color hsb_to_rgb ([heading/360,1.0,1.0]);
```

In the following example boids are represented by a triangle with the colors depending on their heading. [![](http://gama-platform.googlecode.com/files/HSB_Color.png)](http://gama-platform.googlecode.com/files/Dynamic_Color_HSB.mov)


# Multicore runner in Headless Mode
Results: distribution of command-line version on multicore machine, integration with GAMA interface, visualisation of outputs.




# Defining interaction in a model

One statement have been added to facilitate the proposal of serious game on which user could interact through a map. It is now possible to catch event done on 2D display in order to do an action and to modify clicked agent attributes.

## Attributes
  * **name** (omissible) ` [mouse_down , mouse_up] `
  * **action** name of the action to be run

## Definition
Allows to interact with the simulation by capturing mouse event and do an action. This action could apply a change on environment or on agents, according to the goal.

Events are determine for a display. Thus, they can be play a different behavior

```
event [event_type] action: myAction
```
  * event\_type (mouse\_down or mouse\_up
  * myAction is an action written in the global block. This action have to follow the specification below.

```

 global
 {
   ...
   action myAction 
   {
     arg location type: point; // contains le location of the click in the environment
     arg selected_agents type: list; // contains agents clicked by the event
    
    ... //code written by the authors ...
   } 
 }

 experiment Simple type:gui {
	parameter 'Evaporation Rate:' var: evaporation_rate;
	parameter 'Diffusion Rate:' var: diffusion_rate;
	output { 
		display Ants refresh_every: 2 { 
			grid ant_grid;
			species ant aspect: default;
			text tt value: string ( food_remaining ) size: 24.0 position: { 20 , 20 } color: rgb ( 'white' );
			event mouse_up action: myAction;
		}  

...

```

# Driving skill in 2D (skill: driving2d)

A skill (inherited from moving skill) permits agent to move to the target and avoid the others.

## Attributes
  * **heading** initial heading of agent
  * **obstacle\_species** list of species to avoid
  * **background\_species** list of species on which agent move

## Action
The action inherits the "goto" action of moving skill.

```
do vehicle_goto target: target on: the_graph speed: speed target_type: true returns: moving_status;
```

  * **target** the goal (in type of location) for agent to go
  * **speed** maximum of moving distance for each step
  * **on** the topology on which agent moves. By default, the topology is the graph and agent uses the shortest path algorithm to move
  * **target\_type** if "true", agent goes to the exact location of the target. Otherwise (in the case of false target), agent go to an point on the topology that is nearest to the target.
  * **returns** the action returns an integer with the meaning: -1: failed to move; 0: success to move closer and closer to the target; 1: arrive the false target; 2: arrive the target

```

 reflex move_with_vehicle_goto when: target != nil{
			let moving_status type: int <- -1;
			do vehicle_goto target: target on: the_graph speed: speed target_type: true returns: moving_status;
			if (int(moving_status) > 0){
				let temp_targets <- list(targetpoint) - target;
				set target <- one_of(temp_targets);
			}
			
		}
```
