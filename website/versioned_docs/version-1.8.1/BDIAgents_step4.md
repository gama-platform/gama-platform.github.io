---
title: 4. Emotions and Personality
id: version-1.8.1-BDIAgents_step4
original_id: BDIAgents_step4
---

This fourth step consists of adding emotions that will impact the gold miner agent behavior and defining the personality of the agents.

## Formulation

* Definition of global emotions
* Modification of the miner species to integrate emotions and personality

## Emotions
The BDI architecture of GAMA gives the possibility to generate emotions and to use them in the cognition. The definition of emotions in GAMA is based on the OCC theory of emotions. According to this theory, an emotion is a valued answer to the appraisal of a situation. In GAMA an emotion is represented by a set of 5 elements:

* _E_: the name of the emotion felt by agent i.
* _P_: the predicate that represents the fact about which the emotion is expressed.
* _A_: the agent causing the emotion.
* _I_: the intensity of the emotion.
* _D_: the decay of the emotion's intensity.

The BDI architecture of GAMA integrates a dynamic creation of emotions process that will create emotions according to the mental states of the agent. More precisely, twenty emotions can be created: eight emotions related to events, four emotions related to other agents and eight emotions related to actions. 

The complete description of these emotions and their creation rules can be found in [(Bourgais et al., 2017)](https://hal.archives-ouvertes.fr/hal-01573384/document).

## Personality
In order to facilitate the parametrization of the BDI agents, we add the possibility to define all the parameters related to the BDI architecture through the OCEAN model, which proposes to represent the personality of a person according to five factors (corresponding to the 5 variables of the BDI agents):

* _O_: represents the openness of someone (open-minded/narrow-minded).
* _C_: represents the consciousness of someone (act with preparations/impulsive).
* _E_: represents the extroversion of someone (extrovert/shy).
* _A_: represents the agreeableness of someone (friendly/hostile).
* _N_: represent the degree of control someone has on its emotions (calm/neurotic)

Each of these variables has a value between 0 and 1. 0.5 represents the neutral value, below 0.5, the value is considered negatively and above 0.5, it is considered positively. For example, someone with a value of 1 for _N_ is considered as calm and someone with a value of 0 for _A_ is considered as hostile.

## Model Definition
### Emotions

We add a new global emotion called `joy` that represents the joy emotion.

```
global {
    ...
    emotion joy <- new_emotion("joy");
    ...
}
```

### Emotions and personality

To use emotions (and to activate the automatic emotion generation process), we just have to set the value of the built-in variable `use_emotions_architecture` to true (false by default). In our case, one of the possible desires concerns the predicate `has_gold`, and when an agent fulfill this desire and find a gold nugget (plan `get_gold`), it gets the belief `has_gold`, and the emotion engine automatically creates a `joy` emotion. 

To be able to define the parameter of a BDI agent through the OCEAN model, we have to set the value of the built-in variable `use_personality` to true (false by default). In this model, we chose to use the default value of the _O_, _C_, _E_, _A_ and _N_ variables (default value: 0.5). The interest of using the personality in our case is to allow the emotion engine to give a lifetime to the created emotions (otherwise, the emotions would have an infinite lifetime).

In this model, we only use the emotions to define if the miner agents are going to share or not its knowledge about the gold mines. We consider that the miner only shares information if it has a joy emotion (and the agent tells that it is joyfous).
```
species miner skills: [moving] control: simple_bdi {
    ...
    bool use_emotions_architecture <- true;
    bool use_personality <- true;
		
    perceive target: gold_mine where (each.quantity > 0) in: view_dist {
	focus mine_at_location var:location;
	ask myself {
	    if (has_emotion(joy)) { 
                write self.name + " is joyous";
                do add_desire(predicate:share_information, strength: 5.0);
            }
	    do remove_intention(find_gold, false);
	}
    }
    ...
}
```

## Complete Model

```
model BDItutorial4

global {
    int nb_mines <- 10; 
    int nb_miners <- 5;
    market the_market;
    
    string mine_at_location <- "mine_at_location";
    string empty_mine_location <- "empty_mine_location";
    
    float step <- 10#mn;
    
    //possible predicates concerning miners
    predicate mine_location <- new_predicate(mine_at_location) ;
    predicate choose_gold_mine <- new_predicate("choose a gold mine");
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
    bool use_emotions_architecture <- true;
    bool use_personality <- true;
    
    init {
        do add_desire(find_gold);
    }
    
    perceive target:miner in:view_dist {
        socialize liking: 1 -  point(my_color.red, my_color.green, my_color.blue) distance_to point(myself.my_color.red, myself.my_color.green, myself.my_color.blue) / ( 255);
    }
        
    perceive target: gold_mine where (each.quantity > 0) in: view_dist {
        focus id: mine_at_location var: location;
        ask myself {
            if (has_emotion(joy)) {
                write self.name + " is joyous";
                do add_desire(predicate:share_information, strength: 5.0);
            }
            do remove_intention(find_gold, false);
        }
    }
    
    rule belief: mine_location new_desire: has_gold strength: 2.0;
    rule belief: has_gold new_desire: sell_gold strength: 3.0;
    
    plan lets_wander intention:find_gold {
        do wander;
    }
    
    plan get_gold intention:has_gold  {
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
    
    plan choose_closest_gold_mine intention: choose_gold_mine instantaneous: true{
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
    plan share_information_to_friends intention: share_information instantaneous: true{
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
        display map type: opengl
        {
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
3. [Definition of social relations between miners](BDIAgents_step3)
5. [Adding norms, obligations and enforcement](BDIAgents_step5)
