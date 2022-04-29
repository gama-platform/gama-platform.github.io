---
title: 3. Social relation
id: version-1.8.1-BDIAgents_step3
original_id: BDIAgents_step3
---

This third step consists in adding social relation between agents and the possibility to share information about the known gold mines.

## Formulation

* Definition of the gold miner perceptions with socialization
* Definition of a new gold miner plan to share information


## Social relationships

The BDI architecture of GAMA allows the modeler to define explicit social relations between agents. Based on the work of [(Svennevig, 2000)](http://www.jbe-platform.com/content/books/9789027299055), a social link with another agent is defined as a tuple <agent, liking, dominance, solidarity, familiarity, trust> with the following elements:

* Agent: the agent concerned by the link, identified by its name.
* Liking: a real value between -1 and 1 representing the degree of liking with the agent concerned by the link. A value of -1 indicates that the concerned agent is hated, a value of 1 indicates that the concerned agent is liked.
* Dominance: a real value between -1 and 1 representing the degree of power exerted on the agent concerned by the link. A value of -1 indicates that the concerned agent is dominating, a value of 1 indicates that the concerned agent is dominated.
* Solidarity: a real value between 0 and 1 representing the degree of solidarity with the agent concerned by the link. A value of 0 indicates no solidarity with the concerned agent, a value of 1 indicates a complete solidarity with the concerned agent.
* Familiarity: a real value between 0 and 1 representing the degree of familiarity with the agent concerned by the link. A value of 0 indicates no familiarity with the concerned agent, a value of 1 indicates a complete familiarity with the concerned agent. 
* Trust: a real value between -1 and +1 representing the degree of trust with the agent concerned by th link. A value of -1 indicates a doubt about the agent concerned, a value of 1 indicates a complete trust with the concerned agent.

With this definition, a social relation is not necessarily symmetric. For example, let's take two agents, Alice and Bob, with a social link towards each other. The agent Bob may have a social link <Alice,1,-0.5,0.6,0.8,-0.2> (Bob likes Alice with a value of 1, he thinks he is dominated by Alice, he is solidary with Alice with a value of 0.6, he is familiar with Alice with a value of 0.8 and he doubts about her with a value 0.2) and Alice may have a social link <Bob,-0.2,0.2,0.4,0.5,0.8> (Alice dislikes Bob with a value of 0.2, she thinks she is dominating Bob, she is solidary with Bob with a value of 0.4, she is familiar with Bob with a value of 0.5 and she trusts Bob with a value of 0.5).

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
We add a new perceive statement for the miner agents. This perceive will allow creating a social relation with the miners that are located at a distance lower or equal to `view_dist` to the agent. 
For each of these miner agents, the agents create a new social relation using the **`socialize`** statement with a liking value that depends on the color of the agents: more the agents are close, higher will be the liking value.

```
species miner skills: [moving] control: simple_bdi {
    ...
    perceive target: miner in: view_dist {
	socialize liking: 1 -  point(my_color.red, my_color.green, my_color.blue) distance_to point(myself.my_color.red, myself.my_color.green, myself.my_color.blue) / 255;
    }
}
```

We also modify the perceive statement previously defined in order to add the desire to share information with a strength of 5 if the agent finds a gold mine.	
```
species miner skills: [moving] control:simple_bdi {
    ...
    perceive target: gold_mine where (each.quantity > 0) in: view_dist {
	focus mine_at_location var:location;
	ask myself {
	    do add_desire(predicate:share_information, strength: 5.0);
	    do remove_intention(find_gold, false);
	}
    }
}
```

### plan
At last, we add a new plan for the miner agents called `share_information_to_friends` to achieve the intention `share_information` that is instantaneous.
In this plan, the miner agent first defines its list of friends, i.e. the miners with which it has a social link and that it likes (liking higher than 0). then for each friend, it shares its list of known mines (beliefs about their location), then its knowledge about the mines that are empty (beliefs about their location). As these information are already bealiefs, we use the _add_directly_belief_ action. At last, it removes the desire and intention to `share_information`.

```
species miner skills: [moving] control: simple_bdi {
    ...
    plan share_information_to_friends intention: share_information instantaneous: true{
	list<miner> my_friends <- list<miner>((social_link_base where (each.liking > 0)) collect each.agent);
	loop known_gold_mine over: get_beliefs_with_name(mine_at_location) {
	    ask my_friends {
		do add_diectly_belief(known_gold_mine);
	    }
	}
	loop known_empty_gold_mine over: get_beliefs_with_name(empty_mine_location) {
	    ask my_friends {
		do add_directly_belief(known_empty_gold_mine);
	    }
	}
		
	do remove_intention(share_information, true); 
    }
}
```

### display
To show the new social link, we propose to create a new agent used to display these links (the display is done in the global section): 
```
global{
...
reflex display_social_links{
		loop tempMiner over: miner{
				loop tempDestination over: tempMiner.social_link_base{
					if (tempDestination !=nil){
						bool exists<-false;
						loop tempLink over: socialLinkRepresentation{
							if((tempLink.origin=tempMiner) and (tempLink.destination=tempDestination.agent)){
								exists<-true;
							}
						}
						if(not exists){
							create socialLinkRepresentation number: 1{
								origin <- tempMiner;
								destination <- tempDestination.agent;
								if(get_liking(tempDestination)>0){
									my_color <- #green;
								} else {
									my_color <- #red;
								}
							}
						}
					}
				}
			}
	}

}

species socialLinkRepresentation{
	miner origin;
	agent destination;
	rgb my_color;
	
	aspect base{
		draw line([origin,destination],50.0) color: my_color;
	}
}

experiment{
...
        display socialLinks type: opengl{
		species socialLinkRepresentation aspect: base;
	}
...
}

```

## Complete Model

```
model BDItutorial3

global {
    int nb_mines <- 10; 
    int nb_miners <-5;
    market the_market;
    geometry shape <- square(20 #km);
    float step <- 10#mn;
    
    string mine_at_location <- "mine_at_location";
    string empty_mine_location <- "empty_mine_location";    
    
    //possible predicates concerning miners
    predicate mine_location <- new_predicate(mine_at_location) ;
    predicate choose_gold_mine <- new_predicate("choose a gold mine");
    predicate has_gold <- new_predicate("extract gold");
    predicate find_gold <- new_predicate("find gold") ;
    predicate sell_gold <- new_predicate("sell gold") ;
    predicate share_information <- new_predicate("share information") ;
    
    float inequality <- 0.0 update: standard_deviation(miner collect each.gold_sold);
    
    init {
        create market {
            the_market <- self;    
        }
        create gold_mine number: nb_mines;
        create miner number: nb_miners;
    }
    
    reflex display_social_links{
		loop tempMiner over: miner{
				loop tempDestination over: tempMiner.social_link_base{
					if (tempDestination !=nil){
						bool exists<-false;
						loop tempLink over: socialLinkRepresentation{
							if((tempLink.origin=tempMiner) and (tempLink.destination=tempDestination.agent)){
								exists<-true;
							}
						}
						if(not exists){
							create socialLinkRepresentation number: 1{
								origin <- tempMiner;
								destination <- tempDestination.agent;
								if(get_liking(tempDestination)>0){
									my_color <- #green;
								} else {
									my_color <- #red;
								}
							}
						}
					}
				}
			}
	}

    reflex end_simulation when: sum(gold_mine collect each.quantity) = 0 and empty(miner where each.has_belief(has_gold)){
        do pause;
        ask miner {
		write name + " : " +gold_sold;
	}
    }
}

species gold_mine {
    int quantity <- rnd(1,20);
    aspect default {
        draw triangle(200 + quantity * 50) color: (quantity > 0) ? #yellow : #gray border: #black;    
    }
}

species market {
    int golds;
    aspect default {
      draw square(1000) color: #black ;
    }
}

species miner skills: [moving] control:simple_bdi {
    
    float view_dist<-1000.0;
    float speed <- 2#km/#h;
    rgb my_color<-rnd_color(255);
    point target;
    int gold_sold;

    bool use_social_architecture <- true;
    
    init {
        do add_desire(find_gold);
    }
    
    perceive target: miner in: view_dist {
        socialize liking: 1 -  point(my_color.red, my_color.green, my_color.blue) distance_to point(myself.my_color.red, myself.my_color.green, myself.my_color.blue) / 255;
    }
        
    perceive target: gold_mine where (each.quantity > 0) in: view_dist {
        focus id: mine_at_location var:location;
        ask myself {
            do add_desire(predicate:share_information, strength: 5.0);
            do remove_intention(find_gold, false);
        }
    }
    
    rule belief: mine_location new_desire: has_gold strength: 2.0;
    rule belief: has_gold new_desire: sell_gold strength: 3.0;
    
        
    plan lets_wander intention: find_gold {
        do wander;
    }
    
    plan get_gold intention:has_gold 
    {
        if (target = nil) {
            do add_subintention(get_current_intention(),choose_gold_mine, true);
            do current_intention_on_hold();
        } else {
            do goto target: target ;
            if (target = location)  {
                gold_mine current_mine<- gold_mine first_with (target = each.location);
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
    
    plan choose_closest_gold_mine intention: choose_gold_mine instantaneous: true {
        list<point> possible_mines <- get_beliefs_with_name(mine_at_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
        list<point> empty_mines <- get_beliefs_with_name(empty_mine_location) collect (point(get_predicate(mental_state (each)).values["location_value"]));
        possible_mines <- possible_mines - empty_mines;
        if (empty(possible_mines)) {
            do remove_intention(has_gold, true); 
        } else {
            target <- (possible_mines with_min_of (each distance_to self)).location;
        }
        do remove_intention(choose_gold_mine, true); 
    }
    
    plan return_to_base intention: sell_gold {
        do goto target: the_market ;
        if (the_market.location = location)  {
            do remove_belief(has_gold);
            do remove_intention(sell_gold, true);
            gold_sold <- gold_sold + 1;
        }
    }
    
    plan share_information_to_friends intention: share_information instantaneous: true {
        list<miner> my_friends <- list<miner>((social_link_base where (each.liking > 0)) collect each.agent);
        loop known_gold_mine over: get_beliefs_with_name(mine_at_location) {
            ask my_friends {
                do add_belief(known_gold_mine);
            }
        }
        loop known_empty_gold_mine over: get_beliefs_with_name(empty_mine_location) {
            ask my_friends {
                do add_belief(known_empty_gold_mine);
            }
        }
        
        do remove_intention(share_information, true); 
    }

    aspect default {
      draw circle(200) color: my_color border: #black depth: gold_sold;
    }
}

species socialLinkRepresentation{
	miner origin;
	agent destination;
	rgb my_color;
	
	aspect base{
		draw line([origin,destination],50.0) color: my_color;
	}
}

experiment GoldBdi type: gui {
    output {
        display map type: opengl {
            species market ;
            species gold_mine ;
            species miner;
        }

        display socialLinks type: opengl{
		species socialLinkRepresentation aspect: base;
	}

        display chart {
            chart "Money" type: series {
		datalist legend: miner accumulate each.name value: miner accumulate each.gold_sold color: miner accumulate each.my_color;
			}
		}
    }
}
```

[Back to the start of the tutorial](BDIAgents)
1. [Creation of the basic model: gold mines and market](BDIAgents_step1)
2. [Definition of the BDI miners](BDIAgents_step2)
4. [Use of emotions and personality for the miners](BDIAgents_step4)
5. [Adding norms, obligations and enforcement](BDIAgents_step5)
  