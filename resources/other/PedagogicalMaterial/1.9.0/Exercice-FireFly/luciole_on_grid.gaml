/**
 *  luciole_on_grid
 *  Author: bgaudou
 *  Description: 
 */

model luciole_on_grid

global torus: true{
	int neighbourhoodSize <- 1;
	float diffusionSpeed <- 0.5;
}

grid fireflyOnCell width: 50 height: 50 neighbors: 8 {
	// Attributes of the firefly
	float durationOn;
	float switchOnEvery;
	list<fireflyOnCell> neighbours <- (self neighbors_at neighbourhoodSize); 
	
	// Variables used for computation
	float timeStillOn;		
	bool isOn;
	
	init {
		switchOnEvery <- 1.0 + rnd(19.0);			
		durationOn <- rnd(switchOnEvery);
		isOn <- flip(0.5);
		
		if(isOn) {
			do switchOn;
		} else {
			do switchOff;
		}
	}
		
	reflex update {
		if(timeStillOn > 0 ){
			timeStillOn <- timeStillOn - 1;
		} else {
			do switchOff;
		}		
	}
	
	reflex switchOn when: (cycle mod int(switchOnEvery) = 0) {
		do switchOn;
	}
	
	reflex diffusion {
		fireflyOnCell my_vois <- one_of(neighbours);  
		if(my_vois != nil) {
			float diffDurationOn <-(diffusionSpeed * (my_vois.durationOn - durationOn));
			float diffSwitchOnEvery <- (diffusionSpeed * (my_vois.switchOnEvery - switchOnEvery));		
			
			durationOn <- durationOn + diffDurationOn;
			switchOnEvery <- switchOnEvery + diffSwitchOnEvery;
			
			ask(my_vois){
				durationOn <- durationOn - diffDurationOn;
				switchOnEvery <- switchOnEvery - diffSwitchOnEvery;	
			}
		}
	}
	
	action switchOn {
		color <- #lightgreen;
		isOn <- true;
		timeStillOn <- durationOn;		
	}

	action switchOff {
		color <- #green;
		isOn <- false;
	}		
}

experiment luciolegrid type: gui {
	parameter "Size of the neighbourhood" var: neighbourhoodSize min: 1 max: 5 step: 1;
	parameter "Speed of the diffusion" var: diffusionSpeed min: 0.0 max: 1.0 step: 0.01;
	
	output {
		layout #split;
		
		display grid type: opengl {
			grid fireflyOnCell;
		}
		display distance {
			chart "Différence entre le min et le max de temps_allume" type: series {
				data "distance" value: ((fireflyOnCell with_max_of(each.durationOn)).durationOn - (fireflyOnCell with_min_of(each.durationOn)).durationOn) color: #red marker: false;
			}
		}	
		display t2 {
			chart "Nombre de lucioles éteintes" type: series {
				data "#Eteinte" value: (fireflyOnCell count (each.isOn)) color: #red;
			}
		}	
	}
}
