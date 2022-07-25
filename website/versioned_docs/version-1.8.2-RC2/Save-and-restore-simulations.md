---
title:  Save and Restore simulations
---


Last version of GAMA has introduced new features to save the state of a simulation at a given simulation cycle. This has two main applications:

* The possibility to save the state of a simulation
* The possibility to restore a simulation from this file.
* The possibility to go backward to an older state of a simulation.


## Save a simulation


```
experiment saveSimu type: gui {

	reflex store when: cycle = 5 {		
		write "================ START SAVE + self " + " - " + cycle ;		
		write "Save of simulation : " + saveSimulation('saveSimu.gsim');
		write "================ END SAVE + self " + " - " + cycle ;			
	}	
	
	output {
		display main_display {
			species road aspect: geom;
			species people aspect: base;						
		}
	}	
}
```

## Restore a simulation

```
experiment reloadSavedSimuOnly type: gui {
	
	action _init_ {
		create simulation from: saved_simulation_file("saveSimu.gsim");	
	}

	output {
		display main_display {
			species road aspect: geom;
			species people aspect: base;						
		}
	}	
}
```

## Memorize simulation 

```
model memorize

global {
	init{
		create people number:1;	
	}
}
	
species people skills: [moving] {
		
	init{
		location <- {50, 50};		
	}
	reflex movement {
		location <- {location.x + 1,location.y};
	}
		
	aspect base {
		draw circle(5) color: color;
		draw ""+cycle;
	}
}

experiment memorizeExp type: memorize {

	output {
		display map {
			species people aspect: base;
		}
	}
}
```