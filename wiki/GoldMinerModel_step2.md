---
layout: default
title: 2. BDI Agents
wikiPageName: GoldMinerModel_step2
wikiPagePath: wiki/GoldMinerModel_step2.md
---
# 2. BDI Agents
This second step consists in defining the gold miner agents using the GAMA BDI architecture.

## Formulation
  * Definition of global predicates
  * Definition of the gold miner species
  * Definition of the gold miner perceptions
  * Definition of the gold miner rules
  * Definition of the gold miner plans
  * Creation and display of the gold miners


## BDI agents
A classic paradigm to formalize the internal architecture of cognitive agents in Agent-Oriented Software Engineering is the BDI (Belief-Desire-Intention) paradigm. This paradigm, based on the philosophy of action [(Bratman, 1987)](https://philpapers.org/rec/braipa), allows to design expressive and realistic agents. 

The concepts of Belief-Desire-Intention can be summarized as follow for the the Gold Miner: the Miner agent has a general desire to find gold. As it is the only thing it wants at the beginning, it is its initial intention (what it is currently doing). To find gold, it wanders around (its plan is to wander). When it perceives some gold nuggets, it stores this information (it has a new belief about the existence and location of this gold nugget), and it adopts a new desire (it wants to extract the gold). When it perceives a gold nugget, the intention to find gold is put on hold and a new intention is selected (to extract gold). To achieve this intention, the plan has two steps, i.e. two new (sub)intentions: to choose a gold nugget to extract (among its known gold nuggets) and to go and take it. And so on.

In GAMA, we propose a control architecture for agents based on this paradigm. This control architecture provides the agents with 3 database linked to the agent cognition:
* **belief_base** (what it knows): the internal knowledge the agent has about the world or about its internal state, updated during the simulation. A belief can concern any type of information (a quantity, a location, a boolean value, etc).
* **desire_base** (what it wants): objectives that the agent would like to accomplish, also updated during the simulation. Desires can have hierarchical links (sub/super desires) when a desire is created as an intermediary objective.
* **intention_base** (what it is doing): what the agent has chosen to do. The current intention will determine the selected plan. Intentions can be put on hold (for example when they require a sub-intention to be achieved).

In addition, the BDI architecture provides agents with three types of behavior structures
* **Perception**: a perception is a function executed at each iteration to update the agent’s Belief base, to know the changes in its environment (the world, the other agents and itself). The agent can perceive other agents up to a fixed distance or inside a specific geometry. 
* **Rule**: a rule is a function executed at each iteration to infer new desires or beliefs from the agent’s current beliefs and desires, i.e. a new desire or belief can emerge from the existing ones. 
* **Plan**: the agent has a set of plans, which are behaviors defined to accomplish specific intentions. Plans can be instantaneous and/or persistent, and may have a priority value (that can be dynamic), used to select a plan when several possible plans are available to accomplish the same intention.

To be more precise on the behavior of BDI agents (what the agent is going to do when activated), this one is composed of 10 steps (see [(Caillou et al., 2017)](https://hal.archives-ouvertes.fr/hal-01216165/document) and [(Taillandier et al., 2016)](https://hal.archives-ouvertes.fr/hal-01391002/document) for more details):
1. _Perceive_: Perceptions are executed.
1. _Rule_: Rules are executed.
1. _Is one of my intentions achieved?_: If one of my intentions is achieved, sets the current plan to nil and removes the intention from the intention base. If the achieved intention’s super-intention is on hold, it is reactivated (its sub-intention just got completed).
1. _Do I keep the current intention?_: To take into account the environment instability, an intention-persistence coefficient is applied: with this probability, the current intention is removed from the intention stack. 
1. _Do I have a current plan?_: If I have a current plan, just execute it. Similarly to intentions, a plan-persistence coefficient is defined: with this probability, the current plan is just dropped.
1. _Choose a desire as new current intention_: If the current intention is on hold (or the intention base is empty), choose a desire as new current intention. The new selected intention is the desire with higher priority.
1. _Choose a plan as a new current plan_: The new current plan is selected among the plans compatible with the current intention (and if their activation condition is checked) and with the highest priority.
1. _Execute the plan_: The current plan is executed.
1. _Is my plan finished?_: To allow persistent plans, a plan may have a termination condition. If it is not reached, the same plan will be kept for the next iteration.
1. _Was my plan instantaneous?_: Most agent based simulation frameworks (GAMA included) are synchronous frameworks using steps. One consequence is that it may be useful to apply several plans during one single step. For example, if a step represents a day or a year, it would be unrealistic for an agent to spend one step to apply a plan like "choose a destination". This kind of plans (mostly reasoning plans) can be defined as instantaneous: in this case a new thinking loop is applied during the same agent step.


The architecture introduces two new main types of variables related to cognition: 
* **predicate**: a predicate unifies the representation of the information about the world. It can represent a situation, an event or an action. 

* **mental_state**: it represents the element (belief, desire, intention) manipulated by the agent and the architecture to take a decision. A mental state is composed of a modality, a predicate or another mental state, a real value and a lifetime. The modality indicates the type of the mental state (e.g. a belief or a desire), the predicate indicates the fact about which is this mental state (a mental state can also be about another mental state like a belief about a belief, etc), the value has a different interpretation depending on the modality and finally, the lifetime indicate the duration of the mental state (it can be infinite).

## Model Definition
### predicates
As a first step of the integration of the BDI agents in our model, we define a set of global predicate that will represent all the information that will be manipulated by the miner agents:
* _mine_location_: represents the information about the location of a gold mine.
* _choose_goldmine_: represents the information that the miner wants to choose a gold mine.
* _has_gold_: represents the information that the miner has a gold nugget.
* _find_gold_: represents the information that the miner wants to find gold.
* _sell_gold_: represents the information that the miner wants to sell gold.

We define as well two global string (_mine_at_location_ and _empty_mine_location_) for simplification purpose and to avoid misspellings.
```
global {
        ...
	string mine_at_location <- "mine_at_location";
	string empty_mine_location <- "empty_mine_location";
	
	predicate mine_location <- new_predicate(mine_at_location) ;
	predicate choose_goldmine <- new_predicate("choose a gold mine");
	predicate has_gold <- new_predicate("extract gold");
	predicate find_gold <- new_predicate("find gold") ;
	predicate sell_gold <- new_predicate("sell gold") ;
        ...
}
```	
### skeleton of the miner species
We then define a miner species with the _moving_ skill and the _simple_bdi_ control architecture. The miner agents have 5 variables:
* _viewdist_: distance of perception of the miner agent
* _speed_: speed of the agent
* _mycolor_: the color of the agent (random color)
* _target_: where the agent wants to go
* _gold_sold_: the number of gold nuggets sold by the agent

We define the init block of the species such as to add at the creation of the agent the desire to find gold nuggets (_find_gold_ predicate). we use for that the _add_desire_ action provides with the BDI architecture.

At last, we define an aspect in which we draw the agent with its _mycolor_ color and with a depth that depends on the number of gold nuggets collected.

```	
species miner skills: [moving] control:simple_bdi {
	float viewdist<-1000.0;
	float speed <- 2#km/#h;
	rgb mycolor<-rnd_color(255);
	point target;
	int gold_sold;
	
	init
	{
		do add_desire(find_gold);
	}
	aspect default {
	        draw circle(200) color: mycolor border: #black depth: gold_sold;
	}
}
```

### perception	
We add a _perceive_ statement for the miner agents. This perceive will allow to detect the gold mine that are not empty (i.e. the quantity of gold is higher than 0) at a distance lower or equal to "viewdist". The use of the _focus_ statement allows to add for each detected goldmine a belief corresponding to the location of this goldmine. The name of the belief will be "mine_at_location" and the location value of the goldmine will be stored in the _values_ (a map) variable of the belief at the key "location_value". 
In addition, we ask the miner agent to remove the intention to find gold, allowing the agent to choose a new intention. The boolean value of the _remove_intention_ action is used to specify if the agent should or not remove the given intention from the desire base as well. In our case, we choose to keep the desire to find golds.


```
species miner skills: [moving] control:simple_bdi {
	...	
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus mine_at_location var:location;
		ask myself {
			do remove_intention(find_gold, false);
		}
	}
}
```

Note that the perceive statement works as the ask statement: the instructions written in the statement are executed in the context of the perceive agents. It is for that that we have to use the _myself_ keyword to ask the miner agent to execute the _remove_intention_ action.


### rules
We define two rules for the miner agents:
* if the agent believes that there is somewhere at least one gold mine with gold nuggets, the agent gets the new desire to has a gold nugget with a strength of 2. 
* if the agent believes that it has a gold nugget, the agent gets the new desire to sell the gold nugget with a strength of 3. 

```
species miner skills: [moving] control:simple_bdi {
	...
	rule belief: mine_location new_desire: has_gold strength: 2.0;
	rule belief: has_gold new_desire: sell_gold strength: 3.0;
}
```

The strength of a desire will be used when selecting a desire as a new intention: the agent will choose as new intention the one with the highest strength. In our model, if the agent has the desires to find gold, to has gold and to sell gold, it will choose as intention to sell gold as it is the one with the highest strength. It is possible to replace this deterministic choice by a probabilistic one by setting the _probabilistic_choice_ built-in varibale of the BDI agent to true (false by default).


### plans

The last (and most important) part of the definition of BDI agents consist in defining the plans that the agents can carry out to acheive its intention. 

The first plan called _letsWander_ is defined to achieve the _find_gold_ intention. This plan will just consists in executing the _wander_ action of the _moving_ skill (random move).
```
species miner skills: [moving] control:simple_bdi {
        ...
        plan letsWander intention:find_gold 
	{
		do wander;
	}
       ...
}
```

The second plan called _getGold_ is defined to achieve the _has_gold_ intention. if the agent has no target (it does not know where to go), it adds a new sub-intention to choose a goldmine and put the current intention on hold (the agent will wait to select a gold mine to go before executing again this plan). The _add_subintention_ has 3 arguments: the sub-intention (choose_goldmine), the super intention (extract_gold) and a boolean that defines if the sub-intention should or not be added as well as a desire.
If the agent has already a target, it moves toward this target using the _goto_ action of the _moving_ skill. If the agent reaches its target - goldmine - (target = location), the agent tries to extract gold nuggets from it. If the corresponding goldmine (that one located at the target location) is not empty, the agent extract a gold nugget from it: the agent adds the belief that it has a gold nugget, then the quantity of golds in the gold mine is reduced. Otherwise, if the gold mine is empty, the agent adds the belief that this gold mine is empty. then the target is set to nil.

```
species miner skills: [moving] control:simple_bdi {
        ...
        plan getGold intention:has_gold
	{
		if (target = nil) {
			do add_subintention(has_gold,choose_goldmine, true);
			do current_intention_on_hold();
		} else {
			do goto target: target ;
			if (target = location)  {
				goldmine current_mine<- goldmine first_with (target = each.location);
				if current_mine.quantity > 0 {
				 	do add_belief(has_gold);
					ask current_mine {quantity <- quantity - 1;}	
				} else {
					do add_belief(new_predicate(empty_mine_location, ["location_value"::target]));
				}
				target <- nil;
			}
		}	
	}
       ...
}
```

The third plan called _choose_closest_goldmine_ is defined to achieve the _choose_goldmine_ intention that is instantaneous. First, the agent defines the list of all the gold mines it knows (_mine_at_location_ beliefs), then removes the gold mines that it knows that they are empty (_empty_mine_location_ beliefs). If the list of the possible mines is empty, the agent removes the desire and the intention to _extract_gold_. We use for that the _remove_intention_ action, that removes an intention from the intention base; the second argument allows to define if the intention should be removed as well from the desire base. If the agent knows at least one gold mine that is not empty, it defines as its new target the closest gold mine.

```
species miner skills: [moving] control:simple_bdi {
        ...
        plan choose_closest_goldmine intention: choose_goldmine instantaneous: true{
		list<point> possible_mines <- get_beliefs_with_name(mine_at_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
		list<point> empty_mines <- get_beliefs_with_name(empty_mine_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
		possible_mines <- possible_mines - empty_mines;
		if (empty(possible_mines)) {
			do remove_intention(extract_gold, true); 
		} else {
			target <- (possible_mines with_min_of (each distance_to self)).location;
		}
		do remove_intention(choose_goldmine, true); 
	}
       ...
}
```


The last plan called _return_to_base_ is defined to achieve the _sell_gold_ intention. The agent moves in direction of the market using the _goto_ action. if the agent reaches the market, it sells its gold nugget to it: first, it removes the belief that it has a gold nugget, then it removes the intention and the desire to sell golds, at last it increments its _gold_sold_ variable. 

```
species miner skills: [moving] control:simple_bdi {
        ...
        plan return_to_base intention: sell_gold {
		do goto target: the_market ;
		if (the_market.location = location)  {
			do remove_belief(has_gold);
			do remove_intention(sell_gold, true);
			gold_sold <- gold_sold + 1;
		}
	}
       ...
}
```
## Gobal section
We define two new global variables:
* _nbminer_: number of gold miners
* _inequality_: recomputed at each simulation step: standard deviation of the number of gold nuggets extracted per miners.

In the global init, after creating the gold mines and the market, we create the gold miner agents.

At last, we define a global reflex _end_simulation_ that is activated when all the gold mines are empty and no more miner has a gold nuggets and that pauses the simulation.
```
global {
	...
	int nbminer<-5;
	float inequality <- 0.0 update:standard_deviation(miner collect each.gold_sold);
	...
        init
	{
		...
		create miner number:nbminer;
	}
	
	reflex end_simulation when: sum(goldmine collect each.quantity) = 0 and empty(miner where each.has_belief(has_gold)){
		do pause;
	}
}
```

## Map display
We add to the map display the miner species.
```
experiment GoldBdi type: gui {

	output {
		display map type: opengl
		{
			species market ;
			species goldmine ;
			species miner;
		}
	}
}
```
## Complete Model

```
model GoldBdi

global {
	int nb_mines <- 10; 
	int nbminer<-5;
	market the_market;
	
	string mine_at_location <- "mine_at_location";
	string empty_mine_location <- "empty_mine_location";
	
	float step <- 10#mn;
	
	//possible predicates concerning miners
	predicate mine_location <- new_predicate(mine_at_location) ;
	predicate choose_goldmine <- new_predicate("choose a gold mine");
	predicate has_gold <- new_predicate("extract gold");
	predicate find_gold <- new_predicate("find gold") ;
	predicate sell_gold <- new_predicate("sell gold") ;
	
	
	
	float inequality <- 0.0 update:standard_deviation(miner collect each.gold_sold);
	
	geometry shape <- square(20 #km);
	
	init
	{
		create market {
			the_market <- self;	
		}
		create goldmine number:nb_mines;
		create miner number:nbminer;
	}
	
	reflex end_simulation when: sum(goldmine collect each.quantity) = 0 and empty(miner where each.has_belief(has_gold)){
		do pause;
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

species miner skills: [moving] control:simple_bdi {
	
	float viewdist<-1000.0;
	float speed <- 2#km/#h;
	rgb mycolor<-rnd_color(255);
	point target;
	int gold_sold;
	
	init
	{
		do add_desire(find_gold);
	}
		
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus mine_at_location var:location;
		ask myself {
			do remove_intention(find_gold, false);
		}
	}
	rule belief: mine_location new_desire: has_gold strength: 2.0;
	rule belief: has_gold new_desire: sell_gold strength: 3.0;
	
		
	plan letsWander intention:find_gold 
	{
		do wander;
	}
	
	plan getGold intention:has_gold 
	{
		if (target = nil) {
			do add_subintention(has_gold,choose_goldmine, true);
			do current_intention_on_hold();
		} else {
			do goto target: target ;
			if (target = location)  {
				goldmine current_mine<- goldmine first_with (target = each.location);
				if current_mine.quantity > 0 {
				 	do add_belief(has_gold);
					ask current_mine {quantity <- quantity - 1;}	
				} else {
					do add_belief(new_predicate(empty_mine_location, ["location_value"::target]));
				}
				target <- nil;
			}
		}	
	}
	
	plan choose_closest_goldmine intention: choose_goldmine instantaneous: true{
		list<point> possible_mines <- get_beliefs_with_name(mine_at_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
		list<point> empty_mines <- get_beliefs_with_name(empty_mine_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
		possible_mines <- possible_mines - empty_mines;
		if (empty(possible_mines)) {
			do remove_intention(has_gold, true); 
		} else {
			target <- (possible_mines with_min_of (each distance_to self)).location;
		}
		do remove_intention(choose_goldmine, true); 
	}
	
	plan return_to_base intention: sell_gold {
		do goto target: the_market ;
		if (the_market.location = location)  {
			do remove_belief(has_gold);
			do remove_intention(sell_gold, true);
			gold_sold <- gold_sold + 1;
		}
	}

	aspect default {
	  draw circle(200) color: mycolor border: #black depth: gold_sold;
	}
}

experiment GoldBdi type: gui {

	output {
		display map type: opengl
		{
			species market ;
			species goldmine ;
			species miner;
		}
	}
}
```
[Back to the start of the tutorial](BDIAgents)
  1. [Creation of the basic model: gold mines and market](GoldMinerModel_step1)
  3. [Definition of social relations between miners](GoldMinerModel_step3)
  4. [Use of emotions and personality for the miners](GoldMinerModel_step4)
  5. [Adding norms, obligations and enforcement](GoldMinerModel_step5)
