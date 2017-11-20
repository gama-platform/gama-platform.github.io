---
layout: default
title: 1. Skeleton model
wikiPageName: GoldMinerModel_step1
wikiPagePath: wiki/GoldMinerModel_step1.md
---
# 1. Skeleton model
This first step consists in defining the skeleton model with the gold mines and the gold market.


## Formulation
  * Definition of the gold mine species
  * Definition of the market species
  * Creation of the gold mine and market agents
  * Definition of a display with the gold mines and the market

## Model Definition

### species
In this first model, we have to define two species of agents: the **goldmine** agents and the **market** ones. These agents will not have a particular behavior, they will just be displayed.
For the goldmine species, we define a new attribute: **quantity** of type _int_, with for initial value a random integer between 0 and 20. We also define aspect called **default** that displays the goldmine as a triangle with a gray color if the gold mine is empty, yellow otherwise. The size of the triangle depends on the quantity of gold nuggets in the mine. 
Concerning the market species, we define a new attribute: **golds** of type _int_. We define as well an aspect called **default** that displays the market as a blue square.

```
species goldmine {
	int quantity <- rnd(1,20);
	aspect default
	{
		if (quantity = 0) {
			draw triangle(200) color: #gray border: #black;	
		} else {
			draw triangle(200 + quantity*50) color: #yellow border: #black;	
		}
	 
	}
}

species market {
	int golds;
	aspect default
	{
	  draw square(1000) color: #black ;
	}
}

```
### global variables
We define two global variables for the model: one called **nb_mines** that will be used to define the number of mines and that will be set to 10. One call **the_market** that will represent the market agent (that will be unique). 

In addition, we define the duration of a simulation step to 10 minutes, and we define the shape of the environnement by a square with a side size of 20 kilometers.

```
global {
	int nb_mines <- 10; 
	market the_market;
	float step <- 10#mn;
	geometry shape <- square(20 #km);
}

```
### global init
At the initialisation of the model, we create a market agent and _nb_mines_ goldmine agents. For the market agent, we set the value of the _the_market_ agent with the created agent. 

```
global {
   ...
   init
	{
		create market {
			the_market <- self;
		}
		create goldmine number:nb_mines;
	}
}
```

### display
We define a display to visualize the market and goldmine agents. We use for that the classic **species** keyword. In order to optimize the display we use an opengl display (facet **type: opengl**).

In the **experiment** block:
```
output {
   display map type: opengl {
	species market ;
	species goldmine ;
   }
}
```

## Complete Model

```
model GoldBdi

global {
	int nb_mines <- 10; 
	market the_market;
	float step <- 10#mn;
	
	geometry shape <- square(20 #km);
	
	init
	{
		create market {
			the_market <- self;
		}
		create goldmine number:nb_mines;
	}
}

species goldmine {
	int quantity <- rnd(1,20);
	aspect default
	{
		if (quantity = 0) {
			draw triangle(200) color: #gray border: #black;	
		} else {
			draw triangle(200 + quantity*50) color: #yellow border: #black;	
		}
	 
	}
}

species market {
	int golds;
	aspect default
	{
	  draw square(1000) color: #black ;
	}
}

experiment GoldBdi type: gui {

	output {
		display map type: opengl
		{
			species market ;
			species goldmine ;
		}
	}
}
```

  2. [Definition of the BDI miners](GoldMinerModel_step2)
  3. [Definition of social relations between miners](GoldMinerModel_step3)
  4. [Use of emotions and personality for the miners](GoldMinerModel_step4)
