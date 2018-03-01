---
layout: default
title: 3. Social relation
wikiPageName: GoldMinerModel_step3
wikiPagePath: wiki/GoldMinerModel_step3.md
---
# 3. Social relation
This second step consists in adding social relation between agents and the possibility to share information about the known gold mines.

## Formulation
  * Definition of global predicates
  * Definition of the gold miner species
  * Definition of the gold miner perceptions with socialization
  * Definition of a new gold miner plan to share information


## Social relation
The BDI architecture of GAMA allows to define explicit social relations between agents. Based on the work of [Svennevig](http://www.jbe-platform.com/content/books/9789027299055), a social link with another agent is defined as a tuple <agent,liking, dominance, solidarity, familiarity, trust> with the following elements:
* Agent: the agent concerned by the link, identified by its name.
* Liking: a real value between -1 and 1 representing the degree of liking with the agent concerned by the link. A value of -1 indicates that the concerned agent is hated, a value of 1 indicates that the concerned agent is liked.
* Dominance: a real value between -1 and 1 representing the degree of power exerted on the agent concerned by the link. A value of -1 indicates that the concerned agent is dominating, a value of 1 indicates that the concerned agent is dominated.– Solidarity: a real value between 0 and 1 representing the degree of solidarity with the agent concerned by the link. A value of 0 indicates no solidarity with the concerned agent, a value of 1 indicates a complete solidarity with the concerned agent.
* Familiarity: a real value between 0 and 1 representing the degree of familiarity with the agent concerned by the link. A value of 0 indicates no familiarity with the concerned agent, a value of 1 indicates a complete familiarity with the concerned agent. 
* Trust : a real value between -1 and +1 representing the degree of trust with the agent concerned by th link. A value of -1 indicates a doubt about the agent concerned, a value of 1 indicates a complete trust with the concerned agent.

With this definition, a social relation is not necessarily symmetric. For example, let’s take two agents, Alice and Bob, with a social link towards each other. The agent Bob may have a social link <Alice,1,-0.5,0.6,0.8,-0.2> (Bob likes Alice with a value of 1, he thinks he is dominated by Alice, he is solidary with Alice with a value of 0.6, he is familiar with Alice with a value of 0.8 and he doubts about her with a value 0.2) and Alice may have a social link <Bob,-0.2,0.2,0.4,0.5,0.8> (Alice dislikes Bob with a value of 0.2, she thinks she is dominating Bob, she is solidary with Bob with a value of 0.4, she is familiar with Bob with a value of 0.5 and she trusts Bob with a value of 0.5).

## Model Definition
### predicates
We add a new global predicate called _share_information_ that represents the information that the miner wants to share information.
```
global {
	...
	predicate share_information <- new_predicate("share information") ;
        ...
}
```

### perception
We add a new perceive statement for the miner agents. This perceive will allow to create a social relation with the miners that are located at a distance lower or equal to "viewdist" to the agent. 
For each of these miner agents, the agents create a new social relation using the _socialize_ statement with a liking value that depends on the color of the agents: more the agent are close, higher will be the liking value.

```
species miner skills: [moving] control:simple_bdi {
	...
        perceive target:miner in:viewdist {
		socialize liking: 1 -  point(mycolor.red, mycolor.green, mycolor.blue) distance_to point(myself.mycolor.red, myself.mycolor.green, myself.mycolor.blue) / ( 255);
	}
}
```

We also modify the perceive statement previously defined in order to add the desire to share information with a strength of 5 if the agent finds a gold mine.	
```
species miner skills: [moving] control:simple_bdi {
	...
	perceive target:goldmine where (each.quantity > 0) in:viewdist {
		focus mine_at_location var:location;
		ask myself {
			do add_desire(predicate:share_information, strength: 5.0);
			do remove_intention(find_gold, false);
		}
	}
```

### plan
At last, we add a new plan for the miner agents called _share_information_to_friends_ to achieve the intention _share_information_ that is instantaneous.
In this plan, the miner agent first defines its list of friends, i.e. the miners with which it has a social link and that it likes (linking higher than 0). then for each friend, it share its list of known mines (beliefs about their location), then its knowledge about the mines that are empty (beliefs about their location). At last, it removes the desire and intention to _share_information_.

```
species miner skills: [moving] control:simple_bdi {
	...
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

        bool use_social_architecture <- true;
	
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
			do add_desire(predicate:share_information, strength: 5.0);
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
[Back to the start of the tutorial](BDIAgents)
  1. [Creation of the basic model: gold mines and market](GoldMinerModel_step1)
  2. [Definition of the BDI miners](GoldMinerModel_step2)
  4. [Use of emotions and personality for the miners](GoldMinerModel_step4)
