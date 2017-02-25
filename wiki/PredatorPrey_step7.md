---
layout: default
title: 7. Agent Aspect
wikiPageName: PredatorPrey_step7
wikiPagePath: wiki/PredatorPrey_step7.md
---

# 7. Agent Aspect
In this seventh step we will focus on the display and more specifically the aspects of the agents: how they are represented. It can be a simple shape (circle, square, etc.), an icon, a polygon (see later GIS support).







## Formulation
  * Definition of two new aspects for the prey and predator agents:
    * A icon
    * A square with information about the agent energy

  * Use of the **icon** aspect as default aspect for the prey and predator agents.





## Model Definition

### parent species

We add a new variable of type _file_ called **my\_icon** to the **generic\_species**.
We define as well two new aspects:
  * **icon** : draw the image given by the variable **icon**
  * **info** : draw a square of side size **size** and color **color**; draw as a text the energy of the agent (with a precision of 2)

```
   species generic_species {
      ...
      file my_icon;
      ...
      aspect base {
         draw circle(size) color: color ;
      }
      aspect icon {
         draw my_icon size: 2 * size ;
      }
      aspect info {
         draw square(size) color: color ;
         draw string(energy with_precision 2) size: 3 color: #black ;
      }
   }
```

### prey species
We specialize the **prey** species from the **generic\_species** species:
  * definition of the initial value of the agent variables
```
   species prey parent: generic_species {
      ...  
      file my_icon <- file("../images/predator_prey_sheep.png") ;
      ...
   }
```

The image file is here: ![images/predator_prey_sheep.png](resources/images/tutorials/predator_prey_sheep.png)

You have to copy it in your project folder: images/

### predator species
As done for the **prey** species, we specialize the **predator** species from the **generic\_species** species:
  * definition of the initial value of the agent variables

```
   species predator parent: generic_species {
      ...
      file my_icon <- file("../images/predator_prey_wolf.png") ;
      ...
   }
```

The image file is here: ![images/predator_prey_wolf.png](resources/images/tutorials/predator_prey_wolf.png)

You have to copy it in your project folder: images

### display
We change the default aspect of the prey and predator agents to **icon** aspect.
```
   output {
      display main_display {
         grid vegetation_cell lines: #black ;
         species prey aspect: icon ;
         species predator aspect: icon ;
      }
   }
```

We define a new display called info\_display that displays the prey and predator agents with the **info** aspect.
```
   output {
      display info_display {
         species prey aspect: info;
         species predator aspect: info;
      }
   }
```




## Complete Model

```
model prey_predator

global {
	int nb_preys_init <- 200;
	int nb_predators_init <- 20;
	float prey_max_energy <- 1.0;
	float prey_max_transfert <- 0.1 ;
	float prey_energy_consum <- 0.05;
	float predator_max_energy <- 1.0;
	float predator_energy_transfert <- 0.5;
	float predator_energy_consum <- 0.02;
	float prey_proba_reproduce <- 0.01;
	int prey_nb_max_offsprings <- 5; 
	float prey_energy_reproduce <- 0.5; 
	float predator_proba_reproduce <- 0.01;
	int predator_nb_max_offsprings <- 3;
	float predator_energy_reproduce <- 0.5;
	
	int nb_preys -> {length (prey)};
	int nb_predators -> {length (predator)};
	
	init {
		create prey number: nb_preys_init ; 
		create predator number: nb_predators_init ;
	}
}

species generic_species {
	float size <- 1.0;
	rgb color  ;
	float max_energy;
	float max_transfert;
	float energy_consum;
	float proba_reproduce ;
	float nb_max_offsprings;
	float energy_reproduce;
	file my_icon;
	vegetation_cell myCell <- one_of (vegetation_cell) ;
	float energy <- (rnd(1000) / 1000) * max_energy  update: energy - energy_consum max: max_energy ;
	
	init {
		location <- myCell.location;
	}
		
	reflex basic_move {
		myCell <- one_of (myCell.neighbours) ;
		location <- myCell.location ;
	}
		
	reflex die when: energy <= 0 {
		do die ;
	}
	
	reflex reproduce when: (energy >= energy_reproduce) and (flip(proba_reproduce)) {
		int nb_offsprings <- 1 + rnd(nb_max_offsprings -1);
		create species(self) number: nb_offsprings {
			myCell <- myself.myCell ;
			location <- myCell.location ;
			energy <- myself.energy / nb_offsprings ;
		}
		energy <- energy / nb_offsprings ;
	}
	
	aspect base {
		draw circle(size) color: color ;
	}
	aspect icon {
		draw my_icon size: 2 * size ;
	}
	aspect info {
		draw square(size) color: color ;
		draw string(energy with_precision 2) size: 3 color: #black ;
	}
}

species prey parent: generic_species {
	rgb color <- #blue;
	float max_energy <- prey_max_energy ;
	float max_transfert <- prey_max_transfert ;
	float energy_consum <- prey_energy_consum ;
	float proba_reproduce <- prey_proba_reproduce ;
	int nb_max_offsprings <- prey_nb_max_offsprings ;
	float energy_reproduce <- prey_energy_reproduce ;
	file my_icon <- file("../images/predator_prey_sheep.png") ;
		
	reflex eat when: myCell.food > 0 {
		float energy_transfert <- min([max_transfert, myCell.food]) ;
		myCell.food <- myCell.food - energy_transfert ;
		energy <- energy + energy_transfert ;
	}
}
	
species predator parent: generic_species {
	rgb color <- #red ;
	float max_energy <- predator_max_energy ;
	float energy_transfert <- predator_energy_transfert ;
	float energy_consum <- predator_energy_consum ;
	list<prey> reachable_preys update: prey inside (myCell);
	float proba_reproduce <- predator_proba_reproduce ;
	int nb_max_offsprings <- predator_nb_max_offsprings ;
	float energy_reproduce <- predator_energy_reproduce ;
        file my_icon <- file("../images/predator_prey_wolf.png") ;
	
	reflex eat when: ! empty(reachable_preys) {
		ask one_of (reachable_preys) {
			do die ;
		}
		energy <- energy + energy_transfert ;
	}
}
	
grid vegetation_cell width: 50 height: 50 neighbours: 4 {
	float maxFood <- 1.0 ;
	float foodProd <- (rnd(1000) / 1000) * 0.01 ;
	float food <- (rnd(1000) / 1000) max: maxFood update: food + foodProd ;
	rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food))) ;
	list<vegetation_cell> neighbours  <- (self neighbours_at 2); 
}

experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init  min: 0 max: 1000 category: "Prey" ;
	parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
	parameter "Prey max transfert: " var: prey_max_transfert  category: "Prey" ;
	parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
	parameter "Initial number of predators: " var: nb_predators_init  min: 0 max: 200 category: "Predator" ;
	parameter "Predator max energy: " var: predator_max_energy category: "Predator" ;
	parameter "Predator energy transfert: " var: predator_energy_transfert  category: "Predator" ;
	parameter "Predator energy consumption: " var: predator_energy_consum  category: "Predator" ;
	parameter 'Prey probability reproduce: ' var: prey_proba_reproduce category: 'Prey' ;
	parameter 'Prey nb max offsprings: ' var: prey_nb_max_offsprings category: 'Prey' ;
	parameter 'Prey energy reproduce: ' var: prey_energy_reproduce category: 'Prey' ;
	parameter 'Predator probability reproduce: ' var: predator_proba_reproduce category: 'Predator' ;
	parameter 'Predator nb max offsprings: ' var: predator_nb_max_offsprings category: 'Predator' ;
	parameter 'Predator energy reproduce: ' var: predator_energy_reproduce category: 'Predator' ;
	
	output {
		display main_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: icon ;
			species predator aspect: icon ;
		}
		display info_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: info ;
			species predator aspect: info ;
		}
		monitor "Number of preys" value: nb_preys;
		monitor "Number of predators" value: nb_predators;
	}
}
```
