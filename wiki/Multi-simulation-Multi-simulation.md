---
layout: default
title: Multi Simulation
wikiPageName: Multi-simulation-Multi-simulation
wikiPagePath: wiki/Multi-simulation-Multi-simulation.md
---

[//]: # (keyword|operator_font)
[//]: # (keyword|statement_overlay)
[//]: # (keyword|constant_#pixels)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|concept_multi_simulation)
# Multi Simulation


_Author : Patrick Taillandier_

Model to show how to use multi-simulation, i.e. to run several times the same GUI experiment with potentially different parameter sets 


Code of the model : 

```

model multi_simulation

global {
	//definition of three global variables of which the initial values will be used by the first simulation 
	int nb_agents <- 10;
	float agent_speed <- 1.0;
	rgb agent_color <- #green;
	
	
	init {
		create dummy number: nb_agents;
	}
}

//definition a simple species that just move randomly at a given speed
species dummy skills: [moving]{
	rgb color <- #green;
	reflex move {
		do wander speed: agent_speed;
	}
	aspect default {
		draw circle(2) color: agent_color border: #black;
	}
}

experiment main type: gui {
	//definition of a minimal duration for each cycle. As the model is very simple, it can run too fast to observe the results, so we slow it down.
	float minimum_cycle_duration <- 0.1;
	
	//we define a init block to create new simulations
	init {
		//we create a second simulation (the first simulation is always created by default) with the given parameters
		create simulation with: [nb_agents:: 5, agent_speed:: 3.0, agent_color:: #red];
		
	}
	output {
		display map {
			//we use an overlay to display the speed of the agents in the simulation
			overlay "Overlay" position: { 5, 5 } size: { 180 #px, 30 #px } background: # black transparency: 0.5 border: #black rounded: true
            {
               draw "agent_speed: " + agent_speed color: # white font: font("SansSerif", 20, #bold) at: { 10°px, 20°px };
            }
			species dummy;
		}
	}
}
```
