---
layout: default
title: 6. Breeding
wikiPageName: PredatorPrey_step6
wikiPagePath: wiki/PredatorPrey_step6.md
---
# 6. Breeding
So far we created agents only during the initialisation of the simulation. In this sixth step we Illustrate how to create new agents during a simulation of a dynamic species.







## Formulation
  * Adding of a reproduce action of the prey and predator agents:
    * When a agent has energy enough, it has a certain probability to have a certain number of offspring
    * The energy of the offspring is equal to the parent energy divided by the number of offspring
    * The parent get the same energy as its offspring




## Model Definition

### parameters

We add six new parameters related to breeding:
  * The reproduction probability for prey agents
  * The max number of offspring for prey agents
  * The minimum energy to reproduce for prey agents
  * The reproduction probability for predator agents
  * The max number of offspring for predator agents
  * The minimum energy to reproduce for predator agents

We define six new global variables in the global section:
```
global {
   ...
   float prey_proba_reproduce <- 0.01;
   int prey_nb_max_offsprings <- 5; 
   float prey_energy_reproduce <- 0.5; 
   float predator_proba_reproduce <- 0.01;
   int predator_nb_max_offsprings <- 3;
   float predator_energy_reproduce <- 0.5;
}
```

We define then the six corresponding parameters in the experiment:
```
   parameter "Prey probability reproduce: " var: prey_proba_reproduce category: "Prey" ;
   parameter "Prey nb max offsprings: " var: prey_nb_max_offsprings category: "Prey" ;
   parameter "Prey energy reproduce: " var: prey_energy_reproduce category: "Prey" ;
   parameter "Predator probability reproduce: " var: predator_proba_reproduce category: "Predator" ;
   parameter "Predator nb max offsprings: " var: predator_nb_max_offsprings category: "Predator" ;
   parameter "Predator energy reproduce: " var: predator_energy_reproduce category: "Predator" ;
```

### parent species
We add three new variables for the **generic\_species**:
  * proba\_reproduce
  * nb\_max\_offsprings
  * energy\_reproduce

We add as well a new reflex called **reproduce**:
  * this reflex is activated only when:
    * the energy of the agent is greater or equals to energy\_reproduce
    * AND according to the probability proba\_reproduce: for this second condition, we use the **flip(proba)** operator that returns _true_ according to the probability proba (_false_ otherwise).


  * this reflex creates **nb\_offsprings** (random number between 1 and nb\_max\_offsprings) new agent of species the species of the agent using the create statement: we use a species casting operator on the current agent.
    * the created agents are initialized as follows:
      * myCell: myCell of the agent creating the agents
      * location: location of myCell
      * energy: energy of the agent creating the agents (use of keyword **[myself](PseudoVariables#myself)**) divided by the number of offsprings.

  * after the agent creation, the reflex updates the energy value of the current agent with the value: energy / nb\_offsprings

```
   species generic_species {
      ...
      float proba_reproduce ;
      int nb_max_offsprings;
      float energy_reproduce;
      ... 
      reflex reproduce when: (energy >= energy_reproduce) and (flip(proba_reproduce)) {
         int nb_offsprings <- 1 + rnd(nb_max_offsprings -1);
         create species(self) number: nb_offsprings {
            myCell <- myself.myCell ;
            location <- myCell.location ;
            energy <- myself.energy / nb_offsprings ;
         }
         energy <- energy / nb_offsprings ;
      }
   }
```

Note that two keywords can be used to make explicit references to some agents :
  * The agent that is currently executing the statements inside the block (for example a newly created agent): **self**
  * The agent that is executing the statement that contains this block (for instance, the agent that has called the create statement): **myself**

### prey species
We specialize the **prey** species from the **generic\_species** species:
  * definition of the initial value of the agent variables

```
   species prey parent: generic_species {
      ...
      float proba_reproduce <- prey_proba_reproduce ;
      int nb_max_offsprings <- prey_nb_max_offsprings ;
      float energy_reproduce <- prey_energy_reproduce ;
      ...
   }
```

### predator species
As done for the **prey** species, we specialize the **predator** species from the **generic\_species** species:
  * definition of the initial value of the agent variables

```
   species predator parent: generic_species {
      ...
      float proba_reproduce <- predator_proba_reproduce ;
      int nb_max_offsprings <- predator_nb_max_offsprings ;
      float energy_reproduce <- predator_energy_reproduce ;
      ...
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
	int nb_max_offsprings;
	float energy_reproduce;
	vegetation_cell myCell <- one_of (vegetation_cell) ;
	float energy <- (rnd(1000) / 1000) * max_energy  update: energy - energy_consum max: max_energy ;
	
	init {
		location <- myCell.location;
	}
		
	reflex basic_move {
		myCell <- one_of (myCell.neighbors) ;
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
}

species prey parent: generic_species {
	rgb color <- #blue;
	float max_energy <- prey_max_energy ;
	float max_transfert <- prey_max_transfert ;
	float energy_consum <- prey_energy_consum ;
	float proba_reproduce <- prey_proba_reproduce ;
	int nb_max_offsprings <- prey_nb_max_offsprings ;
	float energy_reproduce <- prey_energy_reproduce ;
		
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
		
	reflex eat when: ! empty(reachable_preys) {
		ask one_of (reachable_preys) {
			do die ;
		}
		energy <- energy + energy_transfert ;
	}
}
	
grid vegetation_cell width: 50 height: 50 neighbors: 4 {
	float maxFood <- 1.0 ;
	float foodProd <- (rnd(1000) / 1000) * 0.01 ;
	float food <- (rnd(1000) / 1000) max: maxFood update: food + foodProd ;
	rgb color <- rgb(int(255 * (1 - food)), 255, int(255 * (1 - food))) update: rgb(int(255 * (1 - food)), 255, int(255 *(1 - food)));
	list<vegetation_cell> neighbors  <- (self neighbors_at 2); 
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
			species prey aspect: base ;
			species predator aspect: base ;
		}
		monitor "Number of preys" value: nb_preys;
		monitor "Number of predators" value: nb_predators;
	}
}
```
