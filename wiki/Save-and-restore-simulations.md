---
layout: default
title: Save and Restore simulations
wikiPageName: Save-and-restore-simulations
wikiPagePath: wiki/Save-and-restore-simulations.md
---
[//]: # (startConcept|use_saveSimulation)
[//]: # (keyword|concept_save)
[//]: # (keyword|concept_simulation)
# Save and Restore simulations

Last version of GAMA has introduced new features to save the state of a simulation at a given simulation cycle. This has two main applications:
  * The possibility to step forward and backward in a simulation,
  * The possibility to save the state of a simulation in a file and to restore a simulation from this file.


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

## Saved simulation file type: gsim

## Other serialization operators
