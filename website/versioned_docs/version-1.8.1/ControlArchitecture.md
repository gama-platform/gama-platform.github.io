---
title:  Control Architectures
---

[//]: # (keyword|concept_architecture)

GAMA allows the modeler to attach built-in control architecture to agents.

[//]: # (keyword|concept_behavior)
These control architectures will give the possibility to the modeler to use for a species a specific control architecture in addition to the [common behavior structure](DefiningActionsAndBehaviors#Behaviour). Note that only one control architecture can be used per species.

The attachment of a control architecture to a species is done through the facets `control`.

For example, the given code attaches the `fsm` control architecture to the dummy species.
```
species dummy control: fsm {
}
```

GAMA integrates several agent control architectures that can be used in addition to the common behavior structure:

* [fsm](#finite-state-machine): finite state machine based behavior model. During its life cycle, the agent can be in several states. At any given time step, it is in one single state. Such an agent needs to have one initial state (the state in which it will be at its initialization)
* [weighted\_tasks](#task-based): task-based control architecture. At any given time, only the task with the maximal weight is executed.
* [sorted\_tasks](#task-based): task-based control architecture. At any given time, the tasks are all executed in the order specified by their weights (highest first).
* [probabilistic\_tasks](#task-based): task-based control architecture. This architecture uses the weights as a support for making a weighted probabilistic choice among the different tasks. If all tasks have the same weight, one is randomly chosen at each step.
* [rules](#rules-based-architecture): rules-based control architecture. This architecture uses a set of rules, that will be executed if a given condition is fulfilled and in an order defined by a priority.
* [user\_only](#user_only-user_first-user_last): allows users to take control over an agent during the course of the simulation. With this architecture, only the user control the agents (no reflexes).
* [user\_first](#user_only-user_first-user_last): allows users to take control over an agent during the course of the simulation. With this architecture, the user actions are executed before the agent reflexes.
* [user\_last](#user_only-user_first-user_last): allows users to take control over an agent during the course of the simulation. With this architecture, the user actions are executed after the agent reflexes.
  

An [exhaustive list of the architectures available with GAMA](BuiltInArchitectures) provides all the variables and additional actions provided by an architecture.


## Index

* [Finite State Machine](#finite-state-machine)
  * [Declaration](#declaration)
  * [`state` statement](#state-statement)
* [Task Based](#task-based)
  * [Declaration](#declaration)
  * [`task`](#task-statement)
* [User Control Architecture](#user-control-architectures)
  * [user_only, user_first, user_last](#user_only-user_first-user_last)
  * [Additional attribute](#additional-attribute)
  * [user_panel](#user_panel)
* [Other Control Architectures](#other-control-architectures)

[//]: # (startConcept|finite_state_machine)
[//]: # (keyword|architecture_fsm)
[//]: # (keyword|concept_fsm)
## Finite State Machine

**FSM (Finite State Machine)** is a finite state machine-based behavior model. During its life cycle, the agent can be in several states. At any given time step, it is in one single state. Such an agent needs to have one initial state (the state in which it will be at its initialization).

At each time step, the agent will:

* first (only if he just entered in its current state) execute statement embedded in the `enter` statement,
* then all the statements in the `state` statement,
* it will evaluate the condition of each embedded `transition` statements. If one condition is fulfilled, the agent executes the embedded statements.

**Note that an agent executes only one state at each step**.

### Declaration

Using the FSM architecture for a species require to use the **control** facet:

```
species dummy control: fsm {
   ...
}
```

### `state` statement

#### Facets

* `initial`: a boolean expression, indicates the initial state of the agent (only one state with `initial` set to true is allowed in a species).
* `final`: a boolean expression, indicates the final state of the agent.

#### Sub Statements

* `enter`: a sequence of statements to execute upon entering the state.
* `exit`: a sequence of statements to execute right before exiting the state. Note that the `exit` statement will be executed even if the fired transition points to the same state (the FSM architecture in GAMA does not implement 'internal transitions' like the ones found in UML statecharts: all transitions, even "self-transitions", follow the same rules).
* `transition`: allows to define a condition that, when evaluated to true, will designate the next state of the life-cycle. Note that the evaluation of transitions is short-circuited: the first one that evaluates to true, in the order in which they have been defined, will be followed. I.e., if two transitions evaluate to true during the same time step, only the first one will be triggered.

Things worth to be mentioned regarding these sub-statements:

* Obviously, only one definition of `exit` and `enter` is accepted in a given `state`.
* `transition` statements written in the middle of the state statements will only be evaluated at the end, so, even if it evaluates to true, the remaining of the statements found after the definition of the transition will be nevertheless executed. So, despite the appearance, a transition written somewhere in the sequence will "not stop" the state at that point (but only at the end).

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

The dummy agents start at _state1_. At each simulation step, they have a probability of 0.5 to change their state to _state2_. If they do not change their state to _state2_, they have a probability of 0.2 to change their state to _state3_. In _state2_, at each simulation step, they have a probability of 0.5 to change their state to _state1_. At last, in _step3_, at each simulation step, they have a probability of 0.5 to change their state to _state1_. If they do not change their state to _state1_, they have a probability of 0.2 to change their state to _state2_.

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
## Task-Based

GAMA integrated several **task-based** control architectures. Species can define any number of tasks within their body. At any given time, only one or several tasks are executed according to the architecture chosen:

* `weighted_tasks`: in this architecture, only the task with the maximal weight is executed.
* `sorted_tasks`: in this architecture, the tasks are all executed in the order specified by their weights (biggest first)
* `probabilistic_tasks`: this architecture uses the weights as a support for making a weighted probabilistic choice among the different tasks. If all tasks have the same weight, one is randomly chosen each step.


### Declaration


Using one of the task architectures for a species requires to use the **control** facet:

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



### `task` statement

#### Facets
Besides a sequence of statements like `reflex`, a task contains the following additional facet:

* `weight`: Mandatory. The priority level of the task.

#### Definition
As `reflex`, a `task` is a sequence of statements that can be executed, at each time step, by the agent. If an agent owns several tasks, the scheduler chooses a task to execute based on its current priority weight value.

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

## Rules-based architecture

The behavior of an agent with the rules-based architecture can contain `reflex` and `rule` statements. The `reflex` block will always be executed first. Then the rules are fired (executed) when their condition becomes true and in the order defined by their decreasing priorities. 

### Declaration

Using the rules-based architectures for a species requires to use the **control** facet:

```
species dummy control: rules {
   ...
}
```

### `rule` statement

#### facets

* `when`: (boolean), the condition that needs to be fulfilled to execute the rule.
* `priority`: (float), an optional priority for the rule, which is used to sort activable rules and run them in that order.

#### Definition

As `reflex`, a `rule` is a sequence of statements that can be executed, at each time step, by the agent. They are executed if and only if their condition expression (`when` facet) is fulfilled. Among all the rules that fulfill their condition, the tasks are executed in the decreasing order of their priority (`priority` facet).

For example, consider the following example:

```
species simple_rules_statements control: rules {
	
    int priority_of_a <- 0 update: rnd(100);
    int priority_of_b <- 0 update: rnd(100);
	
    reflex show_priorities {
	write "Priority of rule a = " + priority_of_a + ", priority of rule b = " + priority_of_b;
    }

    rule a when: priority_of_a < 50 priority: priority_of_a {
	write "  Rule a fired with priority: " + priority_of_a;
    }
	
    rule b when: priority_of_b > 25 priority: priority_of_b {
	write "  Rule b fired with priority: " + priority_of_b;
    }
}
```

At each simulation step, first, the agents update the priority values associated with the rules. The `reflex` will first display these values. Then the conditions are evaluated and the rules that can be executed are executed in their priority order.

Here a possible result:
```
Priority of rule a = 38, priority of rule b = 32
  Rule a fired with priority: 38
  Rule b fired with priority: 32
Priority of rule a = 91, priority of rule b = 32
  Rule b fired with priority: 32
Priority of rule a = 37, priority of rule b = 2
  Rule a fired with priority: 37
Priority of rule a = 77, priority of rule b = 90
  Rule b fired with priority: 90
Priority of rule a = 32, priority of rule b = 23
  Rule a fired with priority: 32
Priority of rule a = 18, priority of rule b = 7
  Rule a fired with priority: 18
Priority of rule a = 95, priority of rule b = 94
  Rule b fired with priority: 94
Priority of rule a = 20, priority of rule b = 5
  Rule a fired with priority: 20
Priority of rule a = 78, priority of rule b = 47
  Rule b fired with priority: 47
Priority of rule a = 77, priority of rule b = 76
  Rule b fired with priority: 76
```

[//]: # (startConcept|user_control_architecture)
[//]: # (keyword|concept_gui)
[//]: # (keyword|architecture_user_first)
[//]: # (keyword|architecture_user_last)
[//]: # (keyword|architecture_user_only)
## User Control Architecture

### `user_only`, `user_first`, `user_last`

A specific type of control architecture has been introduced to allow users to take control of an agent during the course of the simulation. When the user gets control of the agent, a control panel will appear in the interface. This architecture can be invoked using three different keywords: `user_only`, `user_first`, `user_last`.
```
species user control: user_only {
   ...
}
```

If the control chosen is `user_first`, it means that the user-controlled panel is opened first, and then the agent has a chance to run its "own" behaviors (reflexes, essentially, or "init" in the case of a "user\_init" panel).
If the control chosen is `user_last`, it is the contrary.

### Additional attribute

Each agent provided with this architecture inherits a boolean attribute called `user_controlled`. If this attribute becomes false, no panels will be displayed and the agent will run "normally" unless its species is defined with a `user_only` control.

### `user_panel`

This control architecture is a specialization of the Finite State Machine Architecture where the "behaviors" of agents can be defined by using new constructs called `user_panel` (and one `user_init`), mixed with `state` or `reflex`. This `user_panel` translates, in the interface, in a semi-modal view that awaits the user to choose action buttons, change attributes of the controlled agent, etc. Each `user_panel`, like a `state` in FSM, can have an `enter` and `exit` sections, but it is only defined in terms of a set of `user_command`s which describe the different action buttons present in the panel.

`user_command` can also accept inputs, in order to create more interesting commands for the user. This uses the `user_input` statement (and not operator), which is basically the same as a temporary variable declaration whose value is asked to the user. 

As `user_panel` is a specialization of `state`, the modeler has the possibility to describe several panels and choose the one to open depending on some condition, using the same syntax than for finite state machines:

* either adding `transitions` to the user\_panels,
* or setting the `state` attribute to a new value, from inside or from another agent.

This ensures great flexibility for the design of the user interface proposed to the user, as it can be adapted to the different stages of the simulation, etc...

Follows a simple example, where, every 10 steps, and depending on the value of an attribute called "advanced", either the basic or the advanced panel is proposed. (The full model is provided in the GAMA model library.)

```
species user control:user_only {
   user_panel default initial: true {
      transition to: "Basic Control" when: every (10 #cycles) and !advanced_user_control;
      transition to: "Advanced Control" when: every(10 #cycles) and advanced_user_control;
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

The panel marked with the `initial: true` facet will be the one run first when the agent is supposed to run. If none is marked, the first panel (in their definition order) is chosen.

A special panel called `user_init` will be invoked only once when initializing the agent if it is defined.
If no panel is described or if all panels are empty (i.e. no `user_command`), the control view is never invoked. If the control is said to be `user_only`, the agent will then not run any of its behaviors.



[//]: # (endConcept|user_control_architecture)

## Other Control Architectures

Some other control architectures are available in additional plugins. For instance, [BDI (Belief, desire, intention) architecture](UsingBDI) is available. Feel free to read about it if you want to learn more.

Do you need some other control architectures for your model? Feel free to make your suggestion to the team of developers through the [mailing list](https://groups.google.com/forum/#!forum/gama-platform). Remember also that GAMA is an open-source platform, you can design your own control architecture easily. Go to the section Community/contribute if you want to jump into coding!
