---
title:  4. Emotions and Personality
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

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.2/msi.gaml.architecture.simplebdi/models/BDI%20Architecture/models/Tutorial/BDI%20tutorial%204.gaml
```

