---
layout: default
title: Variables and Attributes
wikiPageName: VariablesAndAttributes
wikiPagePath: wiki/VariablesAndAttributes.md
---


# Variables and Attributes



Variables and attributes represent named data that can be used in an expression. They can be accessed depending on their _scope_:
  * the scope of attributes declared in a species is itself, its child species and its micro-species.
  * the scope of temporary variables is the one in which they have been declared, and all its sub-scopes.
Outside its _scope_ of validity, an expression cannot use a variable or an attribute directly. However, attributes can be used in a remote fashion by using a dotted notation on a given agent (see [here](#Remote_Access)).


## Table of contents 

* [Variables and Attributes](#variables-and-attributes)
	* [Direct Access](#direct-access)
	* [Remote Access](#remote-access)



## Direct Access
When an agent wants to use either one of the variables declared locally, one of the attributes declared in its species (or parent species), one of the attributes declared in the macro-species of its species, it can directly invoke its name and the compiler will do the rest (i.e. finding the variable or attribute in the right scope).
For instance, we can have a look at the following example:

```
species animal {
   float energy <- 1000 min: 0 max: 2000 update: energy - 0.001;
   int age_in_years <- 1 update: age_in_years + int (time / 365);
   
   action eat (float amount <- 0) {
       float gain <- amount / age_in_years;
       energy <- energy + gain;
   }

   reflex feed {
      int food_found <- rnd(100);
      do eat (amount: food_found); 
   }

}
```

  * **Species declaration**
> Everywhere in the species declaration, we are able to directly name and use:
    * `time`, a global built-in variable,
    * `energy` and `age_in_years`, the two species attributes.
> Nevertheless, in the species declaration, but outside of the action `eat` and the reflex `feed`, we **cannot** name the variables:
    * `amount`, the argument of `eat` action,
    * `gain`, a local variable defined into the `eat` action,
    * `food_found`, the local variable defined into the `feed` reflex.

  * **`Eat` action declaration**
> In the `eat` action declaration, we can directly name and use:
    * `time`, a global built-in variable,
    * `energy` and `age_in_years`, the two species attributes,
    * `amount`, which is an argument to the action `eat`,
    * `gain`, a temporary variable within the action.
> We **cannot** name and use the variables:
    * `food_found`, the local variable defined into the `feed` reflex.

  * **`feed` reflex declaration**
> Similarly, in the `feed` reflex declaration, we can directly name and use:
    * `time`, a global built-in variable,
    * `energy` and `age_in_years`, the two species variables,
    * `food_found`, the local variable defined into the reflex.
> But we **cannot** access to variables:
    * `amount`, the argument of `eat` action,
    * `gain`, a local variable defined into the `eat` action.





## Remote Access
When an expression needs to get access to the attribute of an agent which does not belong to its scope of execution, a special notation (similar to that used in Java) has to be used:

```
remote_agent.variable
```

where remote\_agent can be the name of an agent, an expression returning an agent, self, myself or each. For instance, if we modify the previous species by giving its agents the possibility to feed another agent found in its neighbourhood, the result would be:

```
species animal {
   float energy <- 1000 min: 0 max: 2000 update: energy - 0.001;
   int age_in_years <- 1 update: age_in_years + int (time / 365);
   action eat (float amount <- 0.0) {
       float gain <- amount / age_in_years;
       energy <- energy + gain;
   }
   action feed (animal target){
       if (agent_to_feed != nil) and (agent_to_feed.energy < energy { // verifies that the agent exists and that it need to be fed
            ask agent_to_feed {
                do eat amount: myself.energy / 10; // asks the agent to eat 10% of our own energy
            }
            energy <- energy - (energy / 10); // reduces the energy by 10%
       }
   }
   reflex {
       animal candidates <- agents_overlapping (10 around agent.shape); gathers all the neighbours
       agent_to_feed value: candidates with_min_of (each.energy); //grabs one agent with the lowest energy 
       do feed target: agent_to_feed; // tries to feed it
   }
}
```

In this example, agent\_to\_feed.energy, myself.energy and each.energy show different remote accesses to the attribute energy. The dotted notation used here can be employed in assignments as well. For instance, an action allowing two agents to exchange their energy could be defined as:

```
action random_exchange {//exchanges our energy with that of the closest agent
     animal one_agent <- agent_closest_to (self)/>
     float temp  <-one_agent.energy; // temporary storage of the agent's energy
     one_agent.energy <- energy; // assignment of the agent's energy with our energy
     energy <- temp;
}
```
