---
title: Runtime Concepts
id: version-1.8.1-RuntimeConcepts
original_id: RuntimeConcepts
---

[//]: # (startConcept|runtime_and_schedulers)
[//]: # (keyword|concept_scheduler)

When a model is being simulated, a number of algorithms are applied, for instance, to determine the order in which to run the different agents, or the order in which the initialization of agents is performed, etc. This section details some of them, which can be important when building models and understanding how they will be effectively simulated.


## Table of contents 

* [Simulation initialization](#simulation-initialization)
* [Agents Creation](#agents-creation)
* [Agents Step](#agents-step)
* [Schedule Agents](#schedule-agents)


## Simulation initialization
Once the user launches an experiment, GAMA starts by creating an experiment agent that will manage the initialization of the simulation(s). For each simulation, first, it creates a [`world` agent](GlobalSpecies).

It initializes all its attributes with their init values. This includes its `shape` (that will be used as the environment of the simulation).

If a species of type [grid](GridSpecies) exists in the model, agents of this species are created.

Finally, the `init` statement of the `global` is executed. It should include the creation of all the other agents of [regular species](RegularSpecies) of the simulation. After their creation and initialization, they are added in the list `members` the `world` (that contains all the micro-agent of the `world`).

[//]: # (keyword|concept_optimization)
[//]: # (keyword|statement_create)
[//]: # (keyword|concept_init)
## Agents Creation
Except [`grid`](GridSpecies) agents, other agents are created using the [`create` statement](Statements#create). It is used to allocate memory for each agent and to initialize all its attributes.

If no explicit initialization exists for an attribute, it will get the default value corresponding to its [type](DataTypes).

The initialization of an attribute can be located at several places in the code; they are executed in the following order (which means that, if several ways are used, the attribute will finally have the value of the last applied one):

* in the attribute declaration, using the `init` or `<-` facet.
* using the `from:` or `with` facet of the `create` statement.
* in the `init` block of the species.
* in the embedded block of the `create` statement.

[//]: # (keyword|concept_cycle)
## Agents Step
When an agent is asked to _step_, it means that it is expected to:

* update its variables (facet `update` in the variable declaration), 
* run its behaviors (reflex, state...),
* _step_ its micro-agents (if any).

```
step of agent agent_a
    {
        species_a <- agent_a.species
        architecture_a <- species_a.architecture
        ask architecture_a to step agent_a {
             ask agent_a to update species_a.variables
             ask agent_a to run architecture_a.behaviors
        }

        ask each micro-population mp of agent_a to step {
            list<agent> sub-agents <- mp.compute_agents_to_schedule
            ask each agent_b of sub-agents to step //... recursive call...
        }
    }
```

Notice that, using architecture to manage the behavior of agents, is only a possibility provided by GAMA to ease the development of a model. Modelers who need precise control on the agents' step can:

* redefine the `_step_` action of the species, in order to explicit how the agents will behave,
* implement no behavior in the species (but only `action`). The execution of agents can thus be controlled from a reflex of the `global` that can control the execution of each of them.


## Schedule Agents

The global scheduling of agents is then simply the application of this previous _step_ to the _experiment agent_, keeping in mind that this agent has only one micro-population (of simulation agents, each instance of the model species), and that the simulation(s) inside this population contain(s), in turn, all the "regular" populations of agents of the model.

To influence this schedule, then, one possible way is to change the way populations compute their lists of agents to schedule, which can be done in a model by providing custom definitions to the `schedules` facet of one or several species.

[//]: # (keyword|concept_random)
A practical application of this facet is to reduce simulation artifacts created by the default scheduling of populations, which is sequential (i.e. their agents are executed in turn in their order of creation). To enable pseudo-parallel scheduling based on a random scheduling recomputed at each step, one has simply to define the corresponding species like in the following example:

```
species A schedules: shuffle(A) {...}
```

Moving further, it is possible to enable completely random scheduling, that will eliminate the sequential scheduling of populations, by defining a custom species acting as a scheduler of the agents (that will be executed after the `world` agent):

```
global {...}

species scheduler schedules: shuffle(A + B + C);

species A schedules: [] {...}
species B schedules: [] {...}
species C schedules: [] {...}
```

It is important to suppress the population-based scheduling to avoid having agents being scheduled 2 times (one time in the custom definition, one time by their population). Note that it is not necessary to create a scheduler agent.

Other schemes are possible. For instance, the following definition will completely suppress the default scheduling mechanism to replace it with a custom scheduler that will execute the world, then all agents of species A in a random way and then all agents of species B in their order of creation:

```
global {...} 

species scheduler schedules: shuffle(A) + B; // explicit scheduling in the world

species A schedules [];
species B schedules: [];

```

Complex conditions can be used to express which agents need to be scheduled at each step. For instance, in the following definition, only agents of A that return true to a particular condition are scheduled:

```
species A schedules: A where each.can_be_scheduled() {

    bool can_be_scheduled() {
         ...
         returns true_or_false;
    }
}
```

Be aware that enabling a custom scheduling can potentially end up in non-functional simulations. For example, the following definition will result in an **infinite loop** (which will trigger a stack overflow at some point):

```
global {} // The world is normally scheduled...

species my_scheduler schedules: [world]; // ... but schedules itself again as a consequence of scheduling the micro-species 'my_scheduler'
```

Note that `schedules` facet will not be taken into account when it is added to the `global`. It is thus not possible to unschedule the `world` agent.

[//]: # (endConcept|runtime_and_schedulers)
