---
layout: default
title: MovingAgents
wikiPageName: User-Interaction-Moving-Agents
wikiPagePath: wiki/User-Interaction-Moving-Agents.md
---

[//]: # (keyword|operator_at_location)
[//]: # (keyword|operator_union)
[//]: # (keyword|operator_inside)
[//]: # (keyword|operator_intersects)
[//]: # (keyword|operator_contains)
[//]: # (keyword|operator_font)
[//]: # (keyword|statement_event)
[//]: # (keyword|constant_#burlywood)
[//]: # (keyword|constant_#olive)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|constant_#wheat)
[//]: # (keyword|constant_#darkseagreen)
[//]: # (keyword|constant_#firebrick)
[//]: # (keyword|type_font)
[//]: # (keyword|concept_gui)
# MovingAgents


_Author : drogoul_

Shows how to move agents using two event layers : 
Click to grab an group of agents, click again to drop them. Press the keys "k" to kill the agents in the selection, and "d" to duplicate them.


Code of the model : 

```
model MovingAgents

global
{
	list<being> moved_agents ;
	geometry shape <- square(1000);
	point target;
	geometry zone <- circle(100);
	bool can_drop;
	init
	{
		create being number: 100;
	}

	action kill (list<agent> selectedAgent, point mousePosition)
	{
		ask moved_agents
		{
			do die;
		}

		moved_agents <- list<being>([]);
	}

	action duplicate (list<agent> selectedAgent, point mousePosition)
	{
		geometry available_space <- (zone at_location target) - (union(moved_agents) + 10);
		create being number: length(moved_agents) with: (location: any_location_in(available_space));
	}

	action click (list<agent> selectedAgent, point mousePosition)
	{
		if (empty(moved_agents))
		{
			list<being> selected_agents <- being inside (zone at_location mousePosition);
			moved_agents <- selected_agents;
			ask selected_agents
			{
				difference <- mousePosition - location;
				color <- # olive;
			}

		} else if (can_drop)
		{
			ask moved_agents
			{
				color <- # burlywood;
			}

			moved_agents <- list<being>([]);
		}

	}

	action move (list<agent> selectedAgent, point mousePosition)
	{
		can_drop <- true;
		target <- mousePosition;
		list<being> other_agents <- (being inside (zone at_location mousePosition)) - moved_agents;
		geometry occupied <- geometry(other_agents);
		ask moved_agents
		{
			location <- mousePosition - difference;
			if (occupied intersects self)
			{
				color <- # red;
				can_drop <- false;
			} else
			{
				color <- # olive;
			}

		}

	}

}

species being skills: [moving]
{
	geometry shape <- square(10);
	point difference <- { 0, 0 };
	rgb color <- # burlywood;
	reflex r
	{
		if (!(moved_agents contains self))
		{
			do wander amplitude: 30;
		}

	}

	aspect default
	{
		draw shape color: color at: location;
	}

}

experiment "Click and Move" type: gui
{
	font regular <- font("Helvetica", 14, # bold);
	output
	{
		display "Click and Move [OPENGL]" type: opengl
		{
			graphics "Empty target" 
			{
				if (empty(moved_agents))
				{
					draw zone at: target empty: false border: false color: #wheat;
				}

			}

			species being;
			event mouse_move action: move;
			event mouse_up action: click;
			event 'k' action: kill;
			event 'c' action: duplicate;
			graphics "Full target" 
			{
				int size <- length(moved_agents);
				if (size > 0)
				{
					rgb c1 <- rgb(#darkseagreen, 120);
					rgb c2 <- rgb(#firebrick, 120);
					draw zone at: target empty: false border: false color: (can_drop ? c1 : c2);
					draw string(size) at: target + { -30, -30 } font: regular color: # white;
					draw "'k': kill" at: target + { -30, 0 } font: regular color: # white;
					draw "'c': copy" at: target + { -30, 30 } font: regular color: # white;
				}

			}

		}
		
		display "Click and Move [JAVA2D]" type: java2D
		{
			graphics "Empty target" 
			{
				if (empty(moved_agents))
				{
					draw zone at: target empty: false border: false color: #wheat;
				}

			}

			species being;
			event mouse_move action: move;
			event mouse_up action: click;
			event 'k' action: kill;
			event 'c' action: duplicate;
			graphics "Full target" 
			{
				int size <- length(moved_agents);
				if (size > 0)
				{
					rgb c1 <- rgb(#darkseagreen, 120);
					rgb c2 <- rgb(#firebrick, 120);
					draw zone at: target empty: false border: false color: (can_drop ? c1 : c2);
					draw string(size) at: target + { -30, -30 } font: regular color: # white;
					draw "'k': kill" at: target + { -30, 0 } font: regular color: # white;
					draw "'c': copy" at: target + { -30, 30 } font: regular color: # white;
				}

			}

		}
		
		
		
	}

}
```
