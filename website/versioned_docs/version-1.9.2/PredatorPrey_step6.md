---
title:  6. Breeding
---

So far we have created agents only during the initialization of the simulation. In this sixth step, we illustrate how to create new agents during a simulation of a dynamic species.


## Formulation

* Adding of a `reproduce` behavior for the `prey` and `predator` species:
  * When an agent has enough energy, it has a certain probability to have a certain number of offspring.
  * The energy of the offspring is equal to the parent energy divided by the number of offspring.
  * The parent gets the same energy as its offspring.


## Model Definition

### parameters

We add six new parameters related to breeding:

* The reproduction probability for prey agents
* The max number of offspring for prey agents
* The minimum energy to reproduce for prey agents
* The reproduction probability for predator agents
* The max number of offspring for predator agents
* The minimum energy to reproduce for predator agents

We define six new global variables in the global section:
```
global {
    ...
    float prey_proba_reproduce <- 0.01;
    int prey_nb_max_offsprings <- 5; 
    float prey_energy_reproduce <- 0.5; 
    float predator_proba_reproduce <- 0.01;
    int predator_nb_max_offsprings <- 3;
    float predator_energy_reproduce <- 0.5;
    ...
}
```

We define then the six corresponding parameters in the experiment:
```
parameter "Prey probability reproduce: " var: prey_proba_reproduce category: "Prey" ;
parameter "Prey nb max offsprings: " var: prey_nb_max_offsprings category: "Prey" ;
parameter "Prey energy reproduce: " var: prey_energy_reproduce category: "Prey" ;
parameter "Predator probability reproduce: " var: predator_proba_reproduce category: "Predator" ;
parameter "Predator nb max offsprings: " var: predator_nb_max_offsprings category: "Predator" ;
parameter "Predator energy reproduce: " var: predator_energy_reproduce category: "Predator" ;
```

### parent species

The reproduction dynamics is the same for both `prey` and `predator` species, it can thus be implemented only once inside the parent species. But the values of the parameters will depend on the species, and thus have to be set with different values inside each of them.

We add three new variables for the `generic_species`:

* `proba_reproduce`
* `nb_max_offsprings`
* `energy_reproduce`

We add as well a new reflex called **`reproduce`**:
  
* this reflex is activated only when:
  * The energy of the agent is greater or equals to `energy_reproduce`
  * AND according to the probability `proba_reproduce`: for this second condition, we use the **`flip(proba)`** operator that returns `true` according to the probability proba (`false` otherwise).
* this reflex creates `nb_offsprings` (random number between 1 and `nb_max_offsprings`) new agents of the species of the agent using the `create` statement: we use a species casting operator on the current agent.
  * the created agents are initialized as follows:
    * `my_cell`: `my_cell` of the agent creating the agents,
    * `location`: location of `my_cell`,
    * `energy`: energy of the agent creating the agents (use of keyword **[myself](PseudoVariables#myself)**) divided by the number of offsprings.
* after the agent creation, the reflex updates the energy value of the current agent with the value: `energy / nb_offsprings`.

```
species generic_species {
    ...
    float proba_reproduce ;
    int nb_max_offsprings;
    float energy_reproduce;
    ... 
    reflex reproduce when: (energy >= energy_reproduce) and (flip(proba_reproduce)) {
        int nb_offsprings <- rnd(1, nb_max_offsprings);
        create species(self) number: nb_offsprings {
            my_cell <- myself.my_cell ;
            location <- my_cell.location ;
            energy <- myself.energy / nb_offsprings ;
        }
        energy <- energy / nb_offsprings ;
    }
}
```

Note that two keywords (pseudo-variables) can be used to make explicit references to some agents:

* The agent that is currently executing the statements inside the block (for example a newly created agent): **`self`**
* The agent that is executing the statement that contains this block (for instance, the agent that has called the create statement): **`myself`**

### prey species

We specialize the `prey` species from the `generic_species` species as follows:

* definition of the initial value of the agent variables

```
   species prey parent: generic_species {
      ...
      float proba_reproduce <- prey_proba_reproduce ;
      int nb_max_offsprings <- prey_nb_max_offsprings ;
      float energy_reproduce <- prey_energy_reproduce ;
      ...
   }
```

### predator species

As done for the `prey` species, we specialize the `predator` species from the `generic_species` species:

* definition of the initial value of the agent variables:

```
   species predator parent: generic_species {
      ...
      float proba_reproduce <- predator_proba_reproduce ;
      int nb_max_offsprings <- predator_nb_max_offsprings ;
      float energy_reproduce <- predator_energy_reproduce ;
      ...
   }
```



## Complete Model

```gaml reference
https://github.com/gama-platform/gama/blob/GAMA_1.9.2/msi.gama.models/models/Tutorials/Predator%20Prey/models/Model%2006.gaml
```