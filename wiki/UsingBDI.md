---
layout: default
title: Using BDI
wikiPageName: UsingBDI
wikiPagePath: wiki/UsingBDI.md
---
[//]: # (keyword|concept_bdi)
# Using BDI

## Install
You need to run the Git version.

The plugin need to be add with Eclipse doing the following:

  * In ummisco.gama.feature.core open the feature.xml file.
  * In plug-ins click add the msi.gaml.architecture.simplebdi

## Acteur Projet
A website (still in construction) of the ACTEUR project can be found here http://acteur-anr.fr/


## An introduction to cognitive agent

The belief-desire-intention software model (usually referred to simply, but ambiguously, as BDI) is a software model developed for programming intelligent agents.

  * **Belief**: State of the agent.
  * **Desire**: Objectives that the agent would like to accomplish.
  * **Intention**: What the agent has chosen to do.
    * **Plan**: Sequences of actions that an agent can perform to achieve one or more of its intensions.

## Basic Example: A fire rescue model using cognitive agent

We introduce a simple example to illustrate the use of the BDI architecture.

This simple model consists in creating "cognitive" agent whose goal is to extinguish a fire. In a first approximation we consider only one static water area and fire area. The aim is not to have a realistic model but to illustrate how to give a "cognitive" behavior to an agent using the BDI architecture.

First let's create a BDI agent using the key control **simple\_bdi** (A description of all existing control architectures is available [here](BuiltInArchitectures).)

### Species Helicopter creation

```
species helicopter skills:[moving] control: simple_bdi{
...
}
```

#### Attributes
The species `helicopter` needs 2 attributes to represent the water value and its speed.
```
float waterValue;
float speed <- 10.0;
```

#### Predicates
The predicate are the structure that are used to define a belief, a desire or an intention.
In this model we choose to declare 3 different predicates.


```
predicate patrol_desire <- new_predicate("patrol") with_priority 1;
predicate water_predicate <- new_predicate("has water", true) with_priority 3;
predicate no_water_predicate <- new_predicate("has water", false) ;
```
The **new_predicate()** tool creates a predicate. It needs a name (string type) and it can contain a map of values, a priority (double type) or a truth value (boolean type).
The **with_priority** tool add a priority to a predicate. The priority is used as an argument when the agent has to choose between two predicates (to choose an intention for example).

#### Initialization
The initialization consists in setting the attribute **waterValue** to 1 and to add one desire. Three optional parameters are also set. The first desire added in the desire base is the **patrol\_desire** saying that the helicopter wants to patrol. The optional parameters are specific to the BDI plug-in. You can specify the commitment of an agent to his intentions and his plans with the variables intention_persistence and plan_persistence that are floats between 0.0 (no commitment) and 1.0. The variable probabilistic_choice is a boolean that enables the agent to use a probabilistic choice (when true) or a deterministic choice (when false) when trying to find a plan or an intention.
```
waterValue <-1.0;
do add_desire(patrol_desire);
intention_persistence <- 1.0;
plan_persistence <- 1.0;
probabilistic_choice <- false;	
```

#### Perception
At each iteration, the helicopter has two perceptions to do. The first one is about itself. The helicopter needs to perceive if it has water or not. If it has water, it adds the belief corresponding belief and removes the belief that it does not have water. And if it does not have water, that is the contrary.
```
perceive target:self{
	if(waterValue>0){
		do add_belief(water_predicate);
		do remove_belief(no_water_predicate);
	}
	if(waterValue<=0){
		do add_belief(no_water_predicate);
		do remove_belief(water_predicate);
	}
}
```
The second perception is about the fires. Here, the fires are represented with the species **fireArea**. The helicopter has a radius of perception of 10 meters. If it perceives a fire, it will focus on the location of this fire. The **focus** tool create a belief with the same name as the focus (here, "fireLocation") and will store the value of the focused variable (here, the variable location from the specie fireArea) with a priority of 10 in this example. Once the fire is perceived, the helicopter removes its intention of patrolling.
```
perceive target:fireArea in: 10{
	focus fireLocation var:location priority:10;
	ask myself{
		do remove_intention(patrol_desire, true);
	}
}
```

#### Rules
The agent can use rules to create desires from beliefs. In this example, the agent has two rules. The first **rule** is to have a desire corresponding to the belief of a location of a fire. It means that when the agent has the belief that there is a fire in a particular location, it will have the desire to extinguish it. This permits to have the location value in the desire base.
The second rule is to create the desire to have water when the agent has the belief that it not has water.

```
rule belief: new_predicate("fireLocation") new_desire: get_belief_with_name("fireLocation");
rule belief: no_water_predicate new_desire: water_predicate;
```

#### Plan
##### Patrolling
This plan will be used when the agent has the intention to patrol.
```
plan patrolling intention: patrol_desire{
  do wander;
}
```
##### stopFire
This plan is executed when the agent has the intention to extinguish a fire.
```
plan stopFire intention: new_predicate("fireLocation") {
	point target_fire <- point(get_current_intention().values["location_value"] );
	if(waterValue>0){
		if (self distance_to target_fire <= 1) {
			fireArea current_fire <- fireArea first_with (each.location = target_fire);
			if (current_fire != nil) {
				 waterValue <- waterValue - 1.0;
				 current_fire.size <-  current_fire.size - 1;
				 if ( current_fire.size <= 0) {
					ask  current_fire {do die;}
					do remove_belief(get_current_intention());
					do remove_intention(get_current_intention(), true);
					do add_desire(patrol_desire);
				}
			} else {
				do remove_belief(get_current_intention());
				do remove_intention(get_current_intention(), true);
				do add_desire(patrol_desire);
			}
		} else {
			do goto target: target_fire;
		}
	} else {
		do add_subintention(get_current_intention(),water_predicate,true);
		do current_intention_on_hold();
	}
}
```
##### gotoTakeWater
This plan is executed when the agent has the intention to have water.
```
plan gotoTakeWater intention: water_predicate {
    	waterArea wa <- first(waterArea);
        do goto target: wa);
    	if (self distance_to wa <= 1) {
    		waterValue <- waterValue + 2.0;
	}
}
```
Plans can have other options. They can have a priority (with the facet priority), a boolean condition to start (with the facet when) or a boolean condition to stop (with the facet finished_when).

#### Rest of the code
##### Aspect of the helicopter
```
aspect base {
	draw circle(1) color: #black;	
}
```

##### FireArea Species
```
species fireArea{
        float size <-1.0;	

        aspect base {
          draw circle(size) color: #red;
        }
}
```

##### WaterArea Species
```
species waterArea{
	float size <-10.0;

	aspect base {
	  draw circle(size) color: #blue;		
	}
}
```
