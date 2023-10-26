---
title:  5. Norms, obligation, and enforcement
---

This last step consists of adding social norms, obligations, and enforcement into the agents' behavior.

## Formulation

* Definition of the policeman species
* Definition of the enforcement done by policeman species
* Definition of the law agents have to follow
* Definition of a gold miner norm to fulfill its obligation and its social norms
* Definition of the enforcement done by gold miners


## Norms, obligations, and enforcement
The BDI architecture of GAMA allows defining explicit social norms, laws that lead to obligations and an enforcement process to sanction or reward the other agent depending on their behavior toward norms. 
A social norm is a set of actions executed under certain conditions which are known by the people as the right things to do in that condition. As it is, it can be assimilated into a plan. However, a norm can be violated which mean an agent chose to disobey and do not execute it while it should. To do this, each agent has an obedient value, between 0 and 1 and computed from its personality and each norm has a threshold. If the obedient value of the agent is above the threshold, the norm is executed.

An obligation is a mental state that can be assimilated with a desire. It is created by a law that indicates under which conditions the agent has to follow a particular obligation. Once again, the law can have a threshold value to be activated or not depending on the obedient value of the agent. If an agent has an obligation, it will give up its current intention and current plan to get this obligation as its intention. Then, it will choose a specific norm to answer this obligation, once again with a threshold on the obedient value.

Finally, an enforcement mechanism can be defined during the perception process. Norms, laws, and obligation can be enforced. If a violation is detected, a sanction can be executed. If the norm/law/obligation is fulfilled, a reward can be executed.

## Model Definition

### law

We add a law to the gold miner species that will create the obligation to get gold if a gold nugget is perceived. This law replaces a rule and expresses the fact that miners are working or not, depending on their obedience value.
```
species miner skills: [moving] control:simple_bdi {
    ...
    law working belief: mine_location new_obligation: has_gold 
       when:not has_obligation(has_gold) and not has_belief(has_gold) strength: 2.0 threshold: threshold_aw;
	
        ...
}
```

### norms

The miners will have two norms. A first one to answer the obligation to collect gold. This norm replaces the previous plan created for this purpose. However, a new plan is declared to get 3 pieces of gold at each time. This plan will be considered illegal by the policeman species.

```
species miner skills: [moving] control: simple_bdi {
    ...
    norm doing_job obligation: has_gold finished_when: has_belief(has_gold) threshold: threshold_obligation {
	if (target = nil) {
	    do add_subintention(has_gold,choose_gold_mine, true);
	    do current_intention_on_hold();
	} else {
	    do goto target: target ;
	    if (target = location)  {
		gold_mine current_mine<- gold_mine first_with (target = each.location);
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
species miner skills: [moving] control: simple_bdi {
    ...
    norm share_information intention: share_information threshold: threshold_norm instantaneous: true {
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
}
```

### Enforcement of the social norm

Finally, for the gold-miner agent, an enforcement is defined about the social norm to communicate the location of mines to other agents. A sanction and a reward are declared to change the liking value with the agent controlled, depending on if the norm is violated or fulfilled.

```
species miner skills: [moving] control:simple_bdi {
    ...
    perceive target: miner in: view_dist {
	myself.agent_perceived <- self;
	enforcement norm:"share_information" sanction:"sanction_to_norm" reward:"reward_to_norm";
    }
		
    sanction sanction_to_norm{
	do change_liking(agent_perceived,-0.1);
    }	
	
    sanction reward_to_norm{
	do change_liking(agent_perceived,0.1);
    }
}
```

### Definition of policeman species
Finally, we define a policeman species that will wander through the map and enforce the miners about the law and the obligation. The sanctions will be a fine collected by policemen.

```
species policeman skills: [moving] control:simple_bdi {
    predicate patroling <- new_predicate("patrolling");
    float view_dist <- 1000.0;
    miner agent_perceived <- nil;
	
    init {
	do add_desire(patroling);
    }
	
    perceive target:miner in: view_dist {
	myself.agent_perceived <- self;
	enforcement law: "working" sanction: "sanction_to_law";
	enforcement obligation: has_gold sanction: "sanction_to_obligation" reward: "reward_to_obligation";
    }
	
    sanction sanction_to_law {
	ask agent_perceived{
	    threshold_law <- 0.0;
	    gold_sold <- gold_sold-5;
	}
	fine <- fine +5;
    }
	
    sanction sanction_to_obligation {
	ask agent_perceived{
	    gold_sold <- gold_sold-3;
	    do remove_intention(sell_gold,true);
	    thresholdObligation <- self.threshold_obligation - 0.1;
	}
	fine <- fine + 3;
    }
	
    sanction reward_to_obligation{
	ask agent_perceived{
	    gold_sold <- gold_sold+2;
	}
	fine <- fine - 2;
    }
	
    plan patrol intention: patroling{
	do wander;
    }
	
    aspect base{
	draw circle(view_dist) color: #blue depth:0.0;
    }
}
```

### Modification of the chart

We add to the output chart displayed the data coming from the policeman.

```
display chart {
	    chart "Money" type: series {
		datalist legend: miner accumulate each.name value: miner accumulate each.gold_sold color: miner accumulate each.my_color;
                data "policeman" value: fine color: #red;
		}
	}

```


## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.0/msi.gaml.architecture.simplebdi/models/BDI%20Architecture/models/Tutorial/BDI%20tutorial%205.gaml
```
