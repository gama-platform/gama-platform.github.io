---
title:  Defining actions and behaviors
---

[//]: # (startConcept|actions_and_behaviors)
[//]: # (keyword|concept_action)
[//]: # (keyword|concept_reflex)
[//]: # (keyword|concept_behavior)

Both actions and behaviors can be seen as methods in OOP. They can be defined in any species.

## Index

* [Action](#action)
  * [Declare an action](#declare-an-action)
  * [Call an action](#call-an-action)
* [Behavior](#behavior)
* [Example](#example)

## Action

### Declare an action

[//]: # (keyword|statement_action)
An action is a function or procedure run by an instance of species. An action can return a value (in that case, the type of return has to be specified just before the name of the action), or not (in that case, you just have to put the keyword `action` before the name of the action). The former ones are often named **functions**, whereas the latter ones are named **procedures** in many programming languages.

```
species my_species {
    int action_with_return_value {
	// statements...
	return 1;
    }
    action action_without_return_value {
	// statements...
    }
}
```

Arguments can also be mandated in your action. You have to specify the type and the name of the argument:

```
action action_without_return_value (int argA, float argB) {
    // statements...
}
```

If you want to have some optional arguments in the list, you can give some by default values to turn them optional. Nb: it is better to define the optional arguments at the end of the list of argument.

```
action my_action (int argA, float argB <- 5.1, point argC <- {0,0}) {
	// statements...
}
```

### Call an action

[//]: # (keyword|statement_do)
To call an action, it depends whether you want to get the returned value of not:

* to call a procedure (without getting any returned value): you have to use the statement `do`.
* to call a function and thus get the returned value, you need to use `any_agent action(arguments)` and assigned this value to a variable.

You can use the statement `do` in different ways:

* With facets: after specifying the name of your action, you can specify the values of your arguments as if the name of your arguments were facets:

```
do my_action argA: 5 argB: 5.1;
```

* With parenthesis: after specifying the name of your action, you can specify the values of your arguments in the same order they were declared, between parenthesis (just as if you used an operator):

```
do my_action (5,5.1);
```

We encourage you to use the second way. 

To catch the returned value, you have to skip the `do` statement, and store the value directly in a temporary variable:

```
int var1 <- my_action(5,5.1);
// or
int var1 <- my_action(argA: 5, argB: 5.1);
```

## Behavior

[//]: # (keyword|statement_reflex)
A behavior, or reflex, is a set of statements which is called **automatically** at each time step by an agent.
Note that, a behavior is linked to an [**architecture**](BuiltInArchitectures); the reflex-based architecture is the default one, others can be used [with the `controls` facet of the species`](ControlArchitecture).

```
reflex my_reflex {
    write ("Executing the inconditional reflex");
    // statements...
}
```

With the facet `when`, this reflex is only executed when the boolean expression evaluates to true. It is a convenient way to specify the behavior of agents.

```
reflex my_reflex when: flip(0.5) {
    write ("Executing the conditional reflex");
    // statements...
}
```

Reflex, unlike actions, cannot be called from another context. But a reflex can, of course, call actions.

NB: Init is a special reflex, that occurs only when the agent is created.

## Example

To practice a bit with those notions, we will build an easy example. Let's build a model with a species balloon that has 2 attributes: balloon_size (float) and balloon_color (rgb). Each balloon has a random position and color, his aspect is a sphere. Each step, a balloon has a probability to spawn in the environment. Once a balloon is created, its size is 10cm, and each step, the size increases by 1cm. Once the balloon size reaches 50cm, the balloon has a probability to burst. Once 10 balloons are destroyed, the simulation stops. The volume of each balloon is displayed in the balloon position.

![images/burst_the_baloon.png](/resources/images/manipulateBasicSpecies/burst_the_baloon.png) 

Here is one of the multiple possible implementations:

```
model burst_the_baloon

global{
    float worldDimension <- 5#m;
    geometry shape <- square(worldDimension);
    int nbBaloonDead <- 0;

    reflex buildBaloon when: (flip(0.1)) {
	create balloon number: 1;
    }
	
    reflex endSimulation when: nbBaloonDead>10 {
	do pause;
    }
}

species balloon {
    float balloon_size;
    rgb balloon_color;
    
    init {
	balloon_size <- 0.1;
	balloon_color <- rgb(rnd(255),rnd(255),rnd(255));
    }

    reflex balloon_grow {
	balloon_size <- balloon_size + 0.01;
	if (balloon_size > 0.5) {
	    if (flip(0.2)) {
		do balloon_burst;
	    }
	}
    }
	
    float balloon_volume (float diameter) {
	float exact_value <- 2/3 * #pi * diameter^3;
	float round_value <- round(exact_value*1000)/1000;
	return round_value;
    }
	
    action balloon_burst {
	write "the baloon is dead !";
	nbBaloonDead <- nbBaloonDead + 1;
	do die;
    }
	
    aspect balloon_aspect {
	draw circle(balloon_size) color: balloon_color;
	draw string(balloon_volume(balloon_size)) color: #black;
    }
}

experiment my_experiment type: gui {
    output {
	display myDisplay {
	    species balloon aspect: balloon_aspect;
	}
    }
}
```

[//]: # (endConcept|actions_and_behaviors)
