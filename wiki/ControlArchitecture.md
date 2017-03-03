---
layout: default
title:  Control Architectures
wikiPageName: ControlArchitecture
wikiPagePath: wiki/ControlArchitecture.md
---

[//]: # (keyword|concept_architecture)
# Control Architectures

GAMA allows to attach built-in control architecture to agents.

[//]: # (keyword|concept_behavior)
These control architectures will give the possibility to the modeler to use for a species a specific control architecture in addition to the [common behavior structure](DefiningActionsAndBehaviors#Behaviour). Note that only one control architecture can be used per species.

The attachment of a control architecture to a species is done through the facets `control`.

For example, the given code allows to attach the `fsm` control architecture to the dummy species.
```
species dummy control: fsm {
}
```

GAMA integrates several agent control architectures that can be used in addition to the common behavior structure:

  * [fsm](#finite-state-machine): finite state machine based behavior model. During its life cycle, the agent can be in several states. At any given time step, it is in one single state. Such an agent needs to have one initial state (the state in which it will be at its initialization)
  * [weighted\_tasks](#task-based): task-based control architecture. At any given time, only the task only the task with the maximal weight is executed.
  * [sorted\_tasks](#task-based): task-based control architecture. At any given time, the tasks are all executed in the order specified by their weights (highest first).
  * [probabilistic\_tasks](#task-based): task-based control architecture. This architecture uses the weights as a support for making a weighted probabilistic choice among the different tasks. If all tasks have the same weight, one is randomly chosen at each step.
  * [user\_only](DefiningUserInteraction#user-control-architecture): allows users to take control over an agent during the course of the simulation. With this architecture, only the user control the agents (no reflexes).
  * [user\_first](user-control-architecture): allows users to take control over an agent during the course of the simulation. With this architecture, the user actions are executed before the agent reflexes.
  * [user\_last](user-control-architecture): allows users to take control over an agent during the course of the simulation. With this architecture, the user actions are executed after the agent reflexes.
  
## Index

* [Finite State Machine](#finite-state-machine)
  * [Declaration](#declaration)
  * [State](#state)
* [Task Based](#task-based)
  * [Declaration](#declaration)
  * [Task](#task)
* [User Control Architecture](#user-control-architectures)
  * [user_only, user_first, user_last](#user_only-user_first-user_last)
  * [user_panel](#user_panel)
  * [user_controlled](#user_controlled)
* [Other Control Architectures](#other-control-architectures)

[//]: # (startConcept|finite_state_machine)
[//]: # (keyword|architecture_fsm)
[//]: # (keyword|concept_fsm)
## Finite State Machine

**FSM (Finite State Machine)** is a finite state machine based behavior model. During its life cycle, the agent can be in several states. At any given time step, it is in one single state. Such an agent needs to have one initial state (the state in which it will be at its initialization).

At each time step, the agent will:

  * first (only if he just entered in its current state) execute statement embedded in the `enter` statement,
  * then all the statements in the state statement
  * it will evaluate the condition of each embedded transition statements. If one condition is fulfilled, the agent execute the embedded statements

Note that an agent executes only one state at each step.

### Declaration

Using the FSM architecture for a species require to use the **control** facet:

```
species dummy control: fsm {
   ...
}
```

### State

#### Attributes
* initial: a boolean expression, indicates the initial state of agent.
* final: a boolean expression, indicates the final state of agent.

#### Sub Statements
* enter: a sequence of statements to execute upon entering the state.
* exit: a sequence of statements to execute right before exiting the state. Note that the `exit` statement will be executed even if the fired transition points to the same state (the FSM architecture in GAMA does not implement 'internal transitions' like the ones found in UML state charts: all transitions, even "self-transitions", follow the same rules).
* transition: allows to define a condition that, when evaluated to true, will designate the next state of the life cycle. Note that the evaluation of transitions is short-circuited: the first one that evaluates to true, in the order in which they have been defined, will be followed. I.e., if two transitions evaluate to true during the same time step, only the first one will be triggered.

Things worth to be mentioned regarding these sub-statements:

* Obviously, only one definition of exit and enter is accepted in a given state
* Transition statements written in the middle of the state statements will only be evaluated at the end, so, even if it evaluates to true, the remaining of the statements found after the definition of the transition will be nevertheless executed. So, despite the appearance, a transition written somewhere in the sequence will "not stop" the state at that point (but only at the end).

#### Definition
A state can contain several statements that will be executed, at each time step, by the agent. There are three exceptions to this rule:

1. statements enclosed in `enter` will only be executed when the state is entered (after a transition, or because it is the initial state).
1. Those enclosed in `exit` will be executed when leaving the state as a result of a successful transition (and before the statements enclosed in the transition).
1. Those enclosed in a transition will be executed when performing this transition (but after the `exit` sequence has been executed).

For example, consider the following example:

```
species dummy control: fsm {       
	state state1 initial: true { 
		write string(cycle) + ":" + name + "->" + "state1";
		transition to: state2 when: flip(0.5) {
			write string(cycle) + ":" + name + "->" + "transition to state1";
		}
		transition to: state3 when: flip(0.2) ; 
	}

	state state2 {
		write string(cycle) + ":" + name + "->" + "state2";
		transition to: state1 when: flip(0.5) { 
			write string(cycle) + ":" + name + "->" + "transition to state1";
		}
		exit {
			write string(cycle) + ":" + name + "->" + "leave state2";
		}
	}
	
	state state3 {
		write string(cycle) + ":" + name + "->" + "state3";
		transition to: state1 when: flip(0.5)  {
			write string(cycle) + ":" + name + "->" + "transition to state1";
		}
		transition to: state2 when: flip(0.2)  ;
	}   
}
```

the dummy agents start at _state1_. At each simulation step they have a probability of 0.5 to change their state to _state2_. If they do not change their state to _state2_, they have a probability of 0.2 to change their state to _state3_. In _state2_, at each simulation step, they have a probability of 0.5 to change their state to _state1_. At last, in _step3_, at each simulation step they have a probability of 0.5 to change their state to _state1_. If they do not change their state to _state1_, they have a probability of 0.2 to change their state to _state2_.

Here a possible result that can be obtained with one dummy agent:

```
0:dummy0->state1
0:dummy0->transition to state1
1:dummy0->state2
2:dummy0->state2
2:dummy0->leave state2
2:dummy0->transition to state1
3:dummy0->state1
3:dummy0->transition to state1
4:dummy0->state2
5:dummy0->state2
5:dummy0->leave state2
5:dummy0->transition to state1
6:dummy0->state1
7:dummy0->state3
8:dummy0->state2
```
[//]: # (endConcept|finite_state_machine)

[//]: # (startConcept|task_based)
[//]: # (keyword|concept_task_based)
[//]: # (keyword|architecture_probabilistic_tasks)
[//]: # (keyword|architecture_weighted_tasks)
[//]: # (keyword|architecture_sorted_tasks)
## Task Based

GAMA integrated several **task-based** control architectures. Species can define any number of tasks within their body. At any given time, only one or several tasks are executed according to the architecture chosen:

  * **weighted\_tasks** : in this architecture, only the task with the maximal weight is executed.
  * **sorted\_tasks** : in this architecture, the tasks are all executed in the order specified by their weights (biggest first)
  * **probabilistic\_tasks**: this architecture uses the weights as a support for making a weighted probabilistic choice among the different tasks. If all tasks have the same weight, one is randomly chosen each step.


### Declaration


Using the Task architectures for a species require to use the **control** facet:

```
species dummy control: weighted_tasks {
   ...
}
```


```
species dummy control: sorted_tasks {
   ...
}
```


```
species dummy control: probabilistic_tasks {
   ...
}
```



### Task

#### Sub elements
Besides a sequence of statements like reflex, a task contains the following sub elements:
  * weight: Mandatory. The priority level of the task.

#### Definition
As reflex, a task is a sequence of statements that can be executed, at each time step, by the agent. If an agent owns several tasks, the scheduler chooses a task to execute based on its current priority weight value.


For example, consider the following example:
```
species dummy control: weighted_tasks {   
	task task1 weight: cycle mod 3 { 
		write string(cycle) + ":" + name + "->" + "task1";
	}
	task task2 weight: 2 { 
		write string(cycle) + ":" + name + "->" + "task2";
	}
}
```

As the **weighted\_tasks** control architecture was chosen, at each simulation step, the dummy agents execute only the task with the highest behavior. Thus,  when _cycle modulo 3_ is higher to 2, task1 is executed; when _cycle modulo 3_ is lower than 2, task2 is executed. In case when _cycle modulo 3_ is equal 2 (at cycle 2, 5, ...), the only the first task defined (here task1) is executed.

Here the result obtained with one dummy agent:
```
0:dummy0->task2
1:dummy0->task2
2:dummy0->task1
3:dummy0->task2
4:dummy0->task2
5:dummy0->task1
6:dummy0->task2
```
[//]: # (endConcept|task_based)

[//]: # (startConcept|user_control_architecture)
[//]: # (keyword|concept_gui)
[//]: # (keyword|architecture_user_first)
[//]: # (keyword|architecture_user_last)
[//]: # (keyword|architecture_user_only)
## User Control Architecture

### user\_only, user\_first, user\_last

A specific type of control architecture has been introduced to allow users to take control over an agent during the course of the simulation. It can be invoked using three different keywords: `user_only`, `user_first`, `user_last`.
```
species user control: user_only {
   ...
}
```

If the control chosen is `user_first`, it means that the user controlled panel is opened first, and then the agent has a chance to run its "own" behaviors (reflexes, essentially, or "init" in the case of a "user\_init" panel).
If the control chosen is `user_last`, it is the contrary.


### user\_panel

This control architecture is a specialization of the Finite State Machine Architecture where the "behaviors" of agents can be defined by using new constructs called `user_panel` (and one `user_init`), mixed with "states" or "reflexes". This `user_panel` translates, in the interface, in a semi-modal view that awaits the user to choose action buttons, change attributes of the controlled agent, etc. Each `user_panel`, like a `state` in FSM, can have a `enter` and `exit` sections, but it is only defined in terms of a set of `user_command`s which describe the different action buttons present in the panel.

user\_commands can also accept inputs, in order to create more interesting commands for the user. This uses the `user_input` statement (and not operator), which is basically the same as a temporary variable declaration whose value is asked to the user. Example:

As `user_panel` is a specialization of `state`, the modeler has the possibility to describe several panels and choose the one to open depending on some condition, using the same syntax than for finite state machines :
  * either adding `transitions` to the user\_panels,
  * or setting the `state` attribute to a new value, from inside or from another agent.

This ensures a great flexibility for the design of the user interface proposed to the user, as it can be adapted to the different stages of the simulation, etc...

Follows a simple example, where, every 10 steps, and depending on the value of an attribute called "advanced", either the basic or the advanced panel is proposed.

```
species user control:user_only {
   user_panel default initial: true {
      transition to: "Basic Control" when: every (10) and !advanced_user_control;
      transition to: "Advanced Control" when: every(10) and advanced_user_control;
   }
   
   user_panel "Basic Control" {
      user_command "Kill one cell" {
         ask (one_of(cell)){
            do die;
         }
      }
      user_command "Create one cell" {
        create cell ;
      } 
      transition to: default when: true;
   }
   user_panel "Advanced Control" {
      user_command "Kill cells" {
        user_input "Number" returns: number type: int <- 10;
        ask (number among cell){
           do die;
        }
      }
      user_command "Create cells" {
        user_input "Number" returns: number type: int <- 10;
        create cell number: number ;
      } 
      transition to: default when: true;
   }
}
```


The panel marked with the "_initial: true_" facet will be the one run first when the agent is supposed to run. If none is marked, the first panel (in their definition order) is chosen.

A special panel called user\_init will be invoked only once when initializing the agent if it is defined.
If no panel is described or if all panels are empty (i.e. no user\_commands), the control view is never invoked. If the control is said to be "user\_only", the agent will then not run any of its behaviors.


### user\_controlled

Finally, each agent provided with this architecture inherits a boolean attribute called `user_controlled`. If this attribute becomes false, no panels will be displayed and the agent will run "normally" unless its species is defined with a `user_only` control.
[//]: # (endConcept|user_control_architecture)

## Other Control Architectures

Some other control architectures are available in additional plugins. For instance, [BDI (Belief, desire, intention) architecture](UsingBDI) is available. Feel free to read about it if you want to learn more.

You need some other control architectures for your model ? Feel free to make your suggestion to the team of developer through the [mailing list](https://groups.google.com/forum/#!forum/gama-platform). Remember also that GAMA is an open-source platform, you can design your own control architecture easily. Go to the section Community/contribute if you want to jump into coding !
