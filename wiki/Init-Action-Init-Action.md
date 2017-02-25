---
layout: default
title: InitAction
wikiPageName: Init-Action-Init-Action
wikiPagePath: wiki/Init-Action-Init-Action.md
---

[//]: # (keyword|operator_user_input)
# InitAction


_Author : Alexis Drogoul_

 This simple example shows how to use the _init_ callback action to build a simulation with some parameters, without declaring them as parameters


Code of the model : 

```

model InitAction

global {
	int agent_number <- 100;
	rgb agent_color <- #red;
	
	init {
		create my_agents number: agent_number;
	}
}

species my_agents {
	aspect default {
		draw square(5) color: agent_color;
	}
}

experiment InitAction type: gui {
	
	action _init_ {
		map<string, int> params <- user_input(["Number of agents"::100, "Color"::#red, "2D"::true]);
		create InitAction_model with: [agent_number::params["Number of agents"], agent_color::rgb(params["Color"])];
	}
	
	output {
		display Simple {
			species my_agents;
		}
	}
	
}

```
