---
layout: default
title: Corridor Multi-Level Architecture with Mathematics Model and Agent Based Model
wikiPageName: Multi-Level-Usage-Corridor-(Hybrid-vs-ABM)
wikiPagePath: wiki/Multi-Level-Usage-Corridor-(Hybrid-vs-ABM).md
---
[//]: # (keyword|operator_at_location)
[//]: # (keyword|operator_towards)
[//]: # (keyword|statement_capture)
[//]: # (keyword|statement_release)
[//]: # (keyword|concept_multi_level)
[//]: # (keyword|concept_agent_movement)
# Corridor Multi-Level Architecture with Mathematics Model and Agent Based Model


_Author : _

This model shows how to use multi-level architecture. Two corridors are presented : one which can capture the pedestrians going through it and computing for them the time before releasing them at the end of the corridor, and an other doing nothing, letting the pedestrians moving by themselves in the corridor. 


Code of the model : 

```

model pedestrian_corridor_Hybrid_vs_ABM

global 
{
	
	//Parameters of the environment
	int environment_width <- 200 const: true;
	int environment_height <- 200 const: true;
	geometry shape <- rectangle(environment_width, environment_height);	
	
	
	//Parameters of the pedestrian agents
	rgb pedestrian_green <- #green;
	
	float pedestrian_size <- 1.0;
	geometry pedestrian_shape <- circle (pedestrian_size) ;
	float pedestrian_speed <- 2.0;
 
 	//Parameters of the corridors
	rgb corridor_color <- rgb ('blue');
	int corridor_width <- 160 depends_on: [environment_width];
	int corridor_height <- (int(environment_height * 0.05));

	point corridor_location_0 <- {environment_width / 2, environment_height / 4};
	geometry corridor_shape_0 <- ( (rectangle ({corridor_width, corridor_height})) at_location corridor_location_0) ;

	point corridor_location_1 <- {environment_width / 2, environment_height * 0.75};
	geometry corridor_shape_1 <- ( (rectangle ({corridor_width, corridor_height})) at_location corridor_location_1) ;

	//Parameters of pedestrian generation
	int new_pedestian_generate_frequency <- 8;
	point pedestrian_source_0 <- {0, corridor_location_0.y} ;
	point pedestrian_source_1 <- {0, corridor_location_1.y} ;
	 
	 
	 
	init 
	{
		create corridor number: 2 returns: new_corridors;
		
		ask (new_corridors at 0) 
		{
			do init_corridor corridor_shape: corridor_shape_0 is_hybrid: false;
		}

		ask (new_corridors at 1) 
		{
			do init_corridor corridor_shape: corridor_shape_1 is_hybrid: true; 
		}
	}

	//Generation of pedestrians according to the frequency of generation : one for each corridor
	reflex generate_pedestrians when: ( (cycle mod new_pedestian_generate_frequency) = 0 ) 
	{ 
		create pedestrian number: 2 returns: new_pedestrians;
		
		ask (new_pedestrians at 0) 
		{
			do init_location loc: pedestrian_source_0;
		}
		
		ask (new_pedestrians at 1) 
		{
			do init_location loc: pedestrian_source_1;
		}
	}	
}


//Species for the pedestrians which can move
species pedestrian skills: [moving] {
	geometry shape <- circle(pedestrian_size);
	rgb color;
	corridor last_corridor;
	point target_location;
	float speed <- pedestrian_speed;
	
	//Initialisation of the target location according to its generation location
	action init_location (point loc) {
		location <- loc;
		target_location <- {environment_width, location.y};
		heading <- self towards (target_location);
	}

	//Reflex to move the agent to its target location and make it die once it reached its target
	reflex move_left 
	{
		do move heading: (self) towards (target_location); 
		
		if ( (target_location.x - location.x) <= speed ) 
		{
			do die;
		}
	}
	 
	aspect default 
	{
		draw shape color: color;
	}
}

//Species for the corridor which can capture pedestrians
species corridor  {
	bool capture_pedestrians;
	
	
	action init_corridor (geometry corridor_shape, bool is_hybrid) 
	{
		shape <- corridor_shape;
		capture_pedestrians <- is_hybrid;
	}

	float max_speed <- pedestrian_speed;
	float macro_length min: 0.0 <- float(corridor_width); // the length of macro_patch
	
	//Species to model the pedestrian captured by the corridor
	species captured_pedestrian parent: pedestrian schedules: [] 
	{
		float released_time;  
		
		aspect default { }
	}
	
	init 
	{ 
		create corridor_info_drawer number: 1 with: [target :: self];
	}
	//Reflex to capture the pedestrians overlapping the corridor ie entering the corridor 
	reflex aggregate when: capture_pedestrians 
	{
		list<pedestrian> tobe_captured_pedestrians <- (pedestrian overlapping shape) where ( (each.last_corridor != self) and ((each.location).x < (self.location).x) ) ; 
		
		if !(empty (tobe_captured_pedestrians)) 
		{
			capture tobe_captured_pedestrians as: captured_pedestrian returns: cps { 
				last_corridor <- myself;
			}
			if !(empty (cps)) 
			{
					//Computation of the time when the pedestrians captured will be released according to the speed
					// and the time they should make to pass the corridor if they move by themselves
					float group_outgoing_time <- time + (corridor_width / (pedestrian_speed) ); 
					loop cp over: cps 
					{
							cp.released_time <- group_outgoing_time;
	 				}
			}
		
		}
	}
	
	//Reflex to release the pedestrians when we consider they were enough time inside the corridor 
	reflex disaggregate  
	{
		list tobe_released_pedestrians <- members where (time >= (captured_pedestrian (each)).released_time);
		
		if !(empty (tobe_released_pedestrians)) 
		{
			
			release tobe_released_pedestrians as: pedestrian in: world returns: released_pedestrians;
			
			loop rp over: released_pedestrians 
			{
				rp.speed <- pedestrian_speed;
				rp.location <- {((environment_width / 2) + (corridor_width / 2)), ((corridor_shape_1).location).y};
			}
		}
	}
		
	aspect default 
	{
		draw shape color: corridor_color;
	}
}
 
species corridor_info_drawer 
{
	corridor target;
	
	aspect base 
	{
		if target.capture_pedestrians 
		{
			draw 'Hybrid model (coupling: ABM and Mathematical Model)' color: #blue size: 7 at: {(target.location).x - 90, (target.location).y - 10};
			draw  'Aggregated agents: ' + string(length(target.members)) color: #black size: 7 at: {(target.location).x - 30, (target.location).y + 2};
		} 
		else 
		{
			draw 'Agent-Based Model (ABM)' color: #blue size: 7 at: {(target.location).x - 40, (target.location).y - 10};
		}
	}
}

experiment default_experiment type: gui 
{
	output 
	{
		display default_display 
		{
			species pedestrian;
			species corridor transparency: 0.8;
			species corridor_info_drawer aspect: base;
		}
	}
}
```
