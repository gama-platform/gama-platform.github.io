---
layout: default
title: 5. Norms, obligation and enforcement
wikiPageName: BDIAgents_step5
wikiPagePath: wiki/BDIAgents_step5.md
---
# 5. Norms, obligation and enforcement
This last step consists in adding social norms, obligations and enforcement into the agents 'behavior.

## Formulation
  * Definition of global predicates
  * Definition of the policeman species
  * Definition of the enforcement done by policeman species
  * Definition of the law agents have to follow
  * Definition of a gold miner norm to fulfill its obligation and its social norms
  * Definition of the enforcement done by gold miners


## Norms, obligations, and enforcement
The BDI architecture of GAMA allows defining explicit social norms, laws that lead to obligations and an enforcement process to sanction or reward the other agent depending on their behavior toward norms. 
A social norm is a set of actions executed under certain conditions which are known by the people has the right things to do in that conditions. As it is, it can be assimilated into a plan. However, a norm can be violated which mean an agent chose to disobey and do not execute it while it should. To do this, each agent has an obedient value, between 0 and 1 ad computed from its personality and each norm has a threshold. If the obedient value of the agent is above the threshold, the norm is executed.
An obligation is a mental state that can be assimilated with a desire. It is created by a law that indicates under which conditions the agent has to follow a particular obligation. Once again, the law can have a threshold value to be activated or not depending on the obedient value of the agent. If an agent has an obligation, it will give up its current intention and current plan to get this obligation as its intention. Then, it will choose a specific norm to answer this obligation, once again with a threshold on the obedient value.
Finally, an enforcement mechanism can be defined during the perception process. Norms, laws, and obligation can be enforced. If a violation is detected, a sanction can be executed. If the norm/law/obligation is fulfilled, a reward can be executed.

## Model Definition
### law
We add a law to the gold miner species that will create the obligation to get a gold if a gold nugget is perceived. This law replaces a rule and expresses the fact that miners are working or not, depending on their obedience value.
```
species miner skills: [moving] control:simple_bdi {
	...
	law working belief: mine_location new_obligation: has_gold 
   when:not has_obligation(has_gold) and not has_belief(has_gold) strength: 2.0 threshold:thresholdLaw;
	
        ...
}
```

### norms
The miners will have two norms. A first one to answer the obligation to collect gold. This norms replaces the previous plan created for this purpose. However, a new plan is declared to get 3 pieces of gold at each time. This plan will be considered illegal by the policeman species.
```
species miner skills: [moving] control:simple_bdi {
	...
        norm doingJob obligation:has_gold finished_when: has_belief(has_gold) threshold:thresholdObligation{
		if (target = nil) {
			do add_subintention(has_gold,choose_goldmine, true);
			do current_intention_on_hold();
		} else {
			do goto target: target ;
			if (target = location)  {
				goldmine current_mine<- goldmine first_with (target = each.location);
				if current_mine.quantity > 0 {
					gold_transported <- gold_transported+1;
				 	do add_belief(has_gold);
					ask current_mine {quantity <- quantity - 1;}	
				} else {
					do add_belief(new_predicate(empty_mine_location, ["location_value"::target]));
					do remove_belief(new_predicate(mine_at_location, ["location_value"::target]));
				}
				target <- nil;
			}
		}	
	}
}
```

The second norm is a social norm to communicate the list of known mines to one's friends. It replaces the previous plan that did this action, while a new plan is added to give a wrong list of mines to one's friend.
```
species miner skills: [moving] control:simple_bdi {
	...
	norm share_information intention:share_information threshold:thresholdNorm instantaneous: true{
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
```

### enforcement of the social norm
Finally for the gold-miner agent, an enforcement is defined about the social norm to communicate the location of mines to other agents. A sanction and a reward are declared to change the liking value with the agent controlled, depending if the norm is violated or fulfilled.

```
species miner skills: [moving] control:simple_bdi {
	...
	perceive target:miner in:viewdist {
		myself.agent_perceived<-self;
		enforcement norm:"share_information" sanction:"sanctionToNorm" reward:"rewardToNorm";
	}
		
	sanction sanctionToNorm{
		do change_liking(agent_perceived,-0.1);
	}	
	
	sanction rewardToNorm{
		do change_liking(agent_perceived,0.1);
	}
}
```

### Definition of policeman species
Finally, we define a policeman species that will wander through the map and enforce the miners about the law and the obligation. The sanctions will be a fine collected by policemen.


```
species policeman skills: [moving] control:simple_bdi {
	predicate patroling <- new_predicate("patrolling");
	float viewdist <- 1000.0;
	miner agent_perceived <- nil;
	
	init {
		do add_desire(patroling);
	}
	
	perceive target:miner in: viewdist{
		myself.agent_perceived <- self;
		enforcement law:"working" sanction:"sanctionToLaw";
		enforcement obligation:has_gold sanction: "sanctionToObligation" reward:"rewardToObligation";
	}
	
	sanction sanctionToLaw{
		ask agent_perceived{
			thresholdLaw <- 0.0;
			gold_sold <- gold_sold-5;
		}
		fine <- fine +5;
	}
	
	sanction sanctionToObligation {
		ask agent_perceived{
			gold_sold <- gold_sold-3;
			do remove_intention(sell_gold,true);
			thresholdObligation <- self.thresholdObligation - 0.1;
		}
		fine <- fine + 3;
	}
	
	sanction rewardToObligation{
		ask agent_perceived{
			gold_sold <- gold_sold+2;
		}
		fine <- fine -2;
	}
	
	plan patrol intention: patroling{
		do wander;
	}
	
	aspect base{
		draw circle(viewdist) color: #blue depth:0.0;
	}
}
```

## Complete Model

```
model GoldBdi

global {
	int nb_mines <- 10; 
	int nbminer<-5;
	int nb_police <- 1;
	int fine <-0;
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
		create policeman number:nb_police;
	}
	
	reflex end_simulation when: sum(goldmine collect each.quantity) = 0 and empty(miner where each.has_belief(has_gold)){
		do pause;
		ask miner{
			write name + " : " +gold_sold;
		}
		write "**********************";
		write "fine : " + fine;
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

species policeman skills: [moving] control:simple_bdi {
	predicate patroling <- new_predicate("patrolling");
	float viewdist <- 1000.0;
	miner agent_perceived <- nil;
	
	init {
		do add_desire(patroling);
	}
	
	perceive target:miner in: viewdist{
		enforcement law:"working" sanction:"sanctionToLaw";
		enforcement obligation:has_gold /*when:has_belief(has_gold)*/ sanction: "sanctionToObligation" reward:"rewardToObligation";
	}
	
	sanction sanctionToLaw{
		ask agent_perceived{
			thresholdLaw <- 0.0;
			gold_sold <- gold_sold-5;
		}
		fine <- fine +5;
	}
	
	sanction sanctionToObligation {
		ask agent_perceived{
			gold_sold <- gold_sold-3;
			do remove_intention(sell_gold,true);
			thresholdObligation <- self.thresholdObligation - 0.1;
		}
		fine <- fine + 3;
	}
	
	sanction rewardToObligation{
		ask agent_perceived{
			gold_sold <- gold_sold+2;
		}
		fine <- fine -2;
	}
	
	plan patrol intention: patroling{
		do wander;
	}
	
	aspect base{
		draw circle(viewdist) color: #blue depth:0.0;
	}
}

species miner skills: [moving] control:simple_bdi {
	
	float viewdist<-1000.0;
	float speed <- 2#km/#h;
	rgb mycolor<-rnd_color(255);
	point target;
	int gold_sold;
	int gold_transported<-0;
	agent agent_perceived<-nil;
	
    bool use_social_architecture <- true;
	bool use_emotions_architecture <- true;
	bool use_personality <- true;
	
	float openness <- gauss(0.5,0.12);
	float conscientiousness <- gauss(0.5,0.12);
	float extraversion <- gauss(0.5,0.12);
	float agreeableness <- gauss(0.5,0.12);
	float neurotism <- gauss(0.5,0.12);
	
	float plan_persistence <- 1.0;
	float intention_persistence <- 1.0;
	
	float thresholdLaw <- 1.0;
	float thresholdObligation <- 1.0;
	float thresholdNorm <- 0.5;
	
	init
	{
		do add_desire(find_gold);
	}
	
	perceive target:self{
		if(gold_transported>0){
			do add_belief(has_gold);
		} else {
			do remove_belief(has_gold);
		}
	}
	
	perceive target:miner in:viewdist {
		myself.agent_perceived<-self;
		socialize liking: point(mycolor.red, mycolor.green, mycolor.blue) distance_to point(myself.mycolor.red, myself.mycolor.green, myself.mycolor.blue) / ( 255) - 1;
		enforcement norm:"share_information" sanction:"sanctionToNorm" reward:"rewardToNorm";
	}
		
	sanction sanctionToNorm{
		do change_liking(agent_perceived,-0.1);
	}	
	
	sanction rewardToNorm{
		do change_liking(agent_perceived,0.1);
	}
		
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus id:mine_at_location var:location;
		ask myself {
			if (has_emotion(joy)) {do add_desire(predicate:share_information, strength: 5.0);}
			do remove_intention(find_gold, false);
		}
	}
	
	rule belief: has_gold new_desire: sell_gold strength: 3.0;
	
	law working belief: mine_location new_obligation: has_gold when:not has_obligation(has_gold) and not has_belief(has_gold) strength: 2.0 threshold:thresholdLaw;
	
	plan letsWander intention:find_gold 
	{
		do wander;
	}
	
	norm doingJob obligation:has_gold finished_when: has_belief(has_gold) threshold:thresholdObligation{
		if (target = nil) {
			do add_subintention(has_gold,choose_goldmine, true);
			do current_intention_on_hold();
		} else {
			do goto target: target ;
			if (target = location)  {
				goldmine current_mine<- goldmine first_with (target = each.location);
				if current_mine.quantity > 0 {
					gold_transported <- gold_transported+1;
				 	do add_belief(has_gold);
					ask current_mine {quantity <- quantity - 1;}	
				} else {
					do add_belief(new_predicate(empty_mine_location, ["location_value"::target]));
					do remove_belief(new_predicate(mine_at_location, ["location_value"::target]));
				}
				target <- nil;
			}
		}	
	}
	
	plan getMoreGold intention:has_gold
	{
		if (target = nil) {
			do add_subintention(has_gold,choose_goldmine, true);
			do current_intention_on_hold();
		} else {
			do goto target: target ;
			if (target = location)  {
				goldmine current_mine<- goldmine first_with (target = each.location);
				if current_mine.quantity > 0 {
					gold_transported <- 3;
				 	do add_belief(has_gold);
					ask current_mine {if(quantity>=3) {
						quantity <- quantity - 3;
					}else {
						quantity <- 0;
					} 
					}	
				} else {
					do add_belief(new_predicate(empty_mine_location, ["location_value"::target]));
					do remove_belief(new_predicate(mine_at_location, ["location_value"::target]));
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
	
	plan return_to_base intention: sell_gold when: has_belief(has_gold){
		do goto target: the_market ;
		if (the_market.location = location)  {
			do remove_belief(has_gold);
			do remove_intention(sell_gold, true);
			gold_sold <- gold_sold + gold_transported;
			gold_transported <- 0;
		}
	}
	
	norm share_information intention:share_information threshold:thresholdNorm instantaneous: true{
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
	
	plan share_information_to_friends intention: share_information instantaneous: true{
		list<miner> my_friends <- list<miner>((social_link_base where (each.liking > 0)) collect each.agent);
		loop known_goldmine over: get_beliefs_with_name(empty_mine_location) {
			ask my_friends {
				do add_belief(known_goldmine);
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
			species policeman aspect:base;
		}
		
	}
}
```
[Back to the start of the tutorial](BDIAgents)
  1. [Creation of the basic model: gold mines and market](GoldMinerModel_step1)
  2. [Definition of the BDI miners](GoldMinerModel_step2)
  3. [Definition of social relations between miners](GoldMinerModel_step3)
  4. [Use of emotions and personality for the miners](GoldMinerModel_step4)
