---
title:  3. Social relation
---

This third step consists in adding social relation between agents and the possibility to share information about the known gold mines.

## Formulation

* Definition of the gold miner perceptions with socialization
* Definition of a new gold miner plan to share information


## Social relationships

The BDI architecture of GAMA allows the modeler to define explicit social relations between agents. Based on the work of [(Svennevig, 2000)](http://www.jbe-platform.com/content/books/9789027299055), a social link with another agent is defined as a tuple &lt;agent, liking, dominance, solidarity, familiarity, trust> with the following elements:

* Agent: the agent concerned by the link, identified by its name.
* Liking: a real value between -1 and 1 representing the degree of liking with the agent concerned by the link. A value of -1 indicates that the concerned agent is hated, a value of 1 indicates that the concerned agent is liked.
* Dominance: a real value between -1 and 1 representing the degree of power exerted on the agent concerned by the link. A value of -1 indicates that the concerned agent is dominating, a value of 1 indicates that the concerned agent is dominated.
* Solidarity: a real value between 0 and 1 representing the degree of solidarity with the agent concerned by the link. A value of 0 indicates no solidarity with the concerned agent, a value of 1 indicates a complete solidarity with the concerned agent.
* Familiarity: a real value between 0 and 1 representing the degree of familiarity with the agent concerned by the link. A value of 0 indicates no familiarity with the concerned agent, a value of 1 indicates a complete familiarity with the concerned agent. 
* Trust: a real value between -1 and +1 representing the degree of trust with the agent concerned by th link. A value of -1 indicates a doubt about the agent concerned, a value of 1 indicates a complete trust with the concerned agent.

With this definition, a social relation is not necessarily symmetric. For example, let's take two agents, Alice and Bob, with a social link towards each other. The agent Bob may have a social link &lt;Alice,1,-0.5,0.6,0.8,-0.2> (Bob likes Alice with a value of 1, he thinks he is dominated by Alice, he is solidary with Alice with a value of 0.6, he is familiar with Alice with a value of 0.8 and he doubts about her with a value 0.2) and Alice may have a social link &lt;Bob,-0.2,0.2,0.4,0.5,0.8> (Alice dislikes Bob with a value of 0.2, she thinks she is dominating Bob, she is solidary with Bob with a value of 0.4, she is familiar with Bob with a value of 0.5 and she trusts Bob with a value of 0.5).

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
In this plan, the miner agent first defines its list of friends, i.e. the miners with which it has a social link and that it likes (liking higher than 0). then for each friend, it shares its list of known mines (beliefs about their location), then its knowledge about the mines that are empty (beliefs about their location). As these information are already beliefs, we use the _add_directly_belief_ action. At last, it removes the desire and intention to `share_information`.

```
species miner skills: [moving] control: simple_bdi {
    ...
    plan share_information_to_friends intention: share_information instantaneous: true{
	list&lt;miner> my_friends <- list&lt;miner>((social_link_base where (each.liking > 0)) collect each.agent);
	loop known_gold_mine over: get_beliefs_with_name(mine_at_location) {
		ask my_friends {
			do add_directly_belief(known_gold_mine);
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


```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gaml.architecture.simplebdi/models/BDI%20Architecture/models/Tutorial/BDI%20tutorial%203.gaml
```


  