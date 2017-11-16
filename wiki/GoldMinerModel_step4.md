---
layout: default
title: 4. Emotions and Personality
wikiPageName: GoldMinerModel_step4
wikiPagePath: wiki/GoldMinerModel_step4.md
---
# 4. Emotions and Personality
This last step consists in adding emotions that will impact the gold miner agent behavior and defining the personality of the agents.

## Formulation
  * Definition of global emotions
  * Modification of the miner species to integrate emotions and personality

## Emotions
The BDI architecture of GAMA gives the possibility to generate emotions and to use them in the cognition. The definition of emotions in GAMA is based on the OCC theory of emotions. According to this theory, an emotion is a valued answer to the appraisal of a situation. In GAMA an emotion is represented by a set of 5 elements :
* _E_: the name of the emotion felt by agent i.
* _P_: the predicate that represents the fact about which the emotion is expressed.
* _A_: the agent causing the emotion.
* _I_: the intensity of the emotion.
* _D_: the decay of the emotion’s intensity.

The BDI architecture of GAMA integrates a dynamic creation of emotions processes that will create emotions according to the mental states of the agent. More precisely, twenty emotions can be created: eight emotions related to events, four emotions related to other agents and eight emotions related to actions. 

The complete description of these emotions and their creation rules can be found in [(Bourgais et at., 2017)](https://hal.archives-ouvertes.fr/hal-01573384/document).

## Personality
In order to facilitate the parametrization of the BDI agents, we add the possibility to define all the parameters related to the BDI architecture through the OCEAN model, which proposes to represent the personality of a person according to five factors (correspoding the 5 variables of the BDI agents):
_O_: represents the openness of someone (open-minded/narrow-minded).
_C_: represents the consciousness  of someone (act with preparations/impulsive).
_E_: represents the extroversion of someone (extrovert/shy).
_A_: represents the amicability of someone (friendly/hostile).
_N_: represent the degree of control someone has on its emotions (calm/neurotic)
\end{itemize}

Each of these variables has a value between 0 and 1. 0.5 represents the neutral value, below 0.5, the value is considered negatively and above 0.5, it is considered positively. For example, someone with a value of 1 for _N_ is considered as calm and someone with a value of 0 for _A_ is considered as hostile.

## Model Definition
### emotions
We add a new global emotion called _joy_ that represents the joy emotion.
```
global {
	...
	emotion joy <- new_emotion("joy");
        ...
}
```

### emotions and personality
To use emotion (and to activate the automatic emotion generation process), we just have to set the value of the built-in variable _use_emotions_architecture_ to true (false by default). In our case, one of the possible desires concerns the predicate _has_gold_, and when an agent fulfill this desire and find a gold nugget (plan _getGold_), it gets the belief _has_gold_, and the emotion engine automatically creates a _joy_ emotion. 

To be able to define the parameter of a BDI agent through the OCEAN model, we have to set the value of the built-in variable _use_personality_ to true (false by default). In this model, we chose to use the default value of the _O_, _C_, _E_, _A_ and _N_ variables (default value: 0.5). The interest of using the personality in our case is to allows the emotion engine to give a lifetime to the created emotions (otherwise, the emotions would have a infinite lifetime).

In this model, we only use the emotions to define if the miner agents is going to share or not its knowledge about the gold mines. We consider that the miner only shares information if it has a joy emotion.
```
species miner skills: [moving] control:simple_bdi {
        ...
        bool use_emotions_architecture <- true;
        bool use_personality <- true;
		
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus mine_at_location var:location;
		ask myself {
			if (has_emotion(joy)) {do add_desire(predicate:share_information, strength: 5.0);}
			do remove_intention(find_gold, false);
		}
	}
        ...
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
	predicate share_information <- new_predicate("share information") ;
	
	
	emotion joy <- new_emotion("joy");
	
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
	
	bool use_emotions_architecture <- true;
	bool use_personality <- true;
	
	init
	{
		do add_desire(find_gold);
	}
	
	perceive target:miner in:viewdist {
		socialize liking: 1 -  point(mycolor.red, mycolor.green, mycolor.blue) distance_to point(myself.mycolor.red, myself.mycolor.green, myself.mycolor.blue) / ( 255);
	}
		
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus mine_at_location var:location;
		ask myself {
			if (has_emotion(joy)) {do add_desire(predicate:share_information, strength: 5.0);}
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
	plan share_information_to_friends intention: share_information instantaneous: true{
		list<miner> my_friends <- list<miner>((social_link_base where (each.liking > 0)) collect each.agent);
		loop known_goldmine over: get_beliefs_with_name(mine_at_location) {
			ask my_friends {
				do add_belief(known_goldmine);
			}
		}
		loop known_empty_goldmine over: get_beliefs_with_name(empty_mine_location) {
			ask my_friends {
				do add_belief(known_empty_goldmine);
			}
		}
		
		do remove_intention(share_information, true); 
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
