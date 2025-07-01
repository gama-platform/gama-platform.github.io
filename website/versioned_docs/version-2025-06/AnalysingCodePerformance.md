---
title:  Analysing code performance
---


It is a common mistake when trying to optimize any piece of code to go in head first and try to optimize everything possible. The problem with this approach is that everything could be optimized in a computer program, and the task of optimizing itself can be very time-consuming. **So before even optimizing a model, it is important to analyse it, in order to know which part has the most impact on the simulation duration** and to have precise data on your initial execution time to be able to assess your progression.

## Some general concepts and tips before starting

### Randomness

In GAML, **many operators have an (implicit) use of randomness (for example, the [one_of](OperatorsNR#one_of) operator), and this can, of course, impact the simulation duration**.
Depending on your case, you may need to set the random generator to a certain seed during the analysis part, to make sure that every time the simulation is run, it will get exactly the same data and operations done, and thus comparisons of execution time are more fair/stable.
You can do so by adding this line of code to your experiment or your global:
```gaml
float seed <- 1.0; // put any number you want apart from 0, which would mean "pick a random (different) seed for every simulation"
```

In other cases, randomness plays a "real" role in your model, and you may want to take that randomness into account in your optimization. In this case, the right approach would be to repeat the tests for a certain amount of time that you think is reasonable to "neutralize" the effect of randomness and to get an idea of what would be the "average" behaviour, or what could be the extremes.

In any case, it is important to keep in mind that randomness exists in GAMA and to be mindful of it when analysing execution time, as it can have an impact.

### Exponential processes

In reality, most of the real (unexpected) problems regarding execution time are caused by exponential processes. Those are the ones we are trying to spot when analysing the code, most of the time.
By exponential process, you have to understand anything that has an execution time that grows faster than linearly (meaning that grows proportionally) in function of its parameters. 

_**For example:**_ If I run a simulation with 200 agents, I can expect the simulation time to approximately double compared to a simulation of the same model with only 100 agents. If it is not the case and the simulation takes 10 times longer to execute then there is probably a reflex and/or an action somewhere in the model that has an exponential growth of its processing time in function of the number of agents, and this reflex/action is something you really need to monitor. Of course, in this case, it could also be something else, like a part of the code that is only triggered when the number of agents is greater than 150.

Sometimes it is possible to switch from an algorithm of exponential complexity to a linear one, but sometimes it is simply not possible, as the nature of the problem we try to address is exponential. But **knowing that some parts of the code have an exponential growth is still very valuable, as it can help to mitigate its effect on the overall execution time**. If we go back to the previous example, maybe we can determine a number of agents under which the execution time is still reasonable and adapt the simulation to keep the number of agents under that number.

## Using GAML to get the duration of some code's execution time

Analysing a model or a piece of code's performance always comes down to assessing the time it took to do something.
To do so, we have a few options in GAML:
1. Getting the total duration of the previous cycle
2. Processing yourself the elapsed time between two parts of the code using the machine time
3. Using GAML statements to "benchmark" a precise piece of code
4. Getting a detailed report on every duration of every line of code executed

### The `duration` variable

The [`duration`](GlobalSpecies#duration) variable can be used to get the time that the previous step took to execute. At the first step of the simulation, it will be 0, then at the next step it will be the time that the first step took, etc.
It is very useful to easily get an idea of the duration of steps, but if we need to get the duration of the initialization phase, or of some piece of code that is happening inside one step, we will need another tool.


### Using `gama.machine_time`

The [`gama.machine_time`](GlobalSpecies#machine_time) variable is a more versatile tool, it just returns the current time on the computer running the simulation. Using this, we can process the duration of anything we want in the simulation. 

For example, to get (an approximation of) the duration of the initialization of a model, we could write:

```gaml
global{
    float init_time <- gama.machine_time;
	// plenty of other variable declarations
    init{
        // init code
        // ...
        write "Initialization took: " + (gama.machine_time - init_time) + "ms";
    }
}
```

### Using the `benchmark` statement

In addition to this, GAML provides a statement, [benchmark](Statements#benchmark), **that could be used to execute code a certain number of times and that will print in the console the minimum, maximum, and average duration of those executions**. This could be useful to quickly test different parts of the code or alternative codes one after another.
Executing the code multiple times is a common technique in the code optimization world as it is sometimes necessary to eliminate (or assess) the impact of randomness in the given code (as talked about in the section on [randomness](#Randomness)) or on the computer: for example maybe some hidden task starts just at the same moment and impacts the performances of 1 execution.
Here is an example of the use of the benchmark statement to compare two alternative codes:

```gaml
int nb_concat <- 100000;

benchmark message: "concatenation standard" repeat: 10 {
	string result <- '';
	loop times:nb_concat{
		result <- result + rnd(0,10);
	}
}

benchmark message: "concatenation optimized" repeat:10 {
	list<string> content;
	loop times:nb_concat{
		content <+ string(rnd(0,10));
	}
	string result <- concatenate(content);			
}
```

and the result in the console would look something like this:

> concatenation standard (over 10 iteration(s)): min = 687.640833 ms (iteration #0) | max = 1137.205125 ms (iteration #4) | average = 982.2098748999999ms

> concatenation optimized (over 10 iteration(s)): min = 35.088792 ms (iteration #8) | max = 38.443292 ms (iteration #0) | average = 36.3634376ms

### Using the `benchmark` facet of an experiment

This is a more advanced use, the experiment in GAML has a facet called `benchmark` which can be turned to true, in that case every executed line of code will be recorded in a **csv** file along with **its number of calls and accumulated execution time**.

```gama
experiment Benchmarking type: gui benchmark: true { }
```

## Using GAML to get the memory footprint of a simulation

GAML provides 2 variables `gama.max_memory` and `gama.free_memory` that allow the modeler to monitor the footprint of a simulation:
* `gama.max_memory` (in Byte) returns the maximum amount of memory allocated to GAMA. It is thus constant all over an execution. [It can be changed in the configuration file of GAMA](Troubleshooting#memory-problems).
* `gama.free_memory` (in Byte) returns the amount of memory that remains available for the simulation. It allows to deduce the memory used by the simulations.

## How to proceed in practice

### Having an overview of the model's execution time step by step

When you want to optimize a model but do not know where to start, a good (and easy to implement) starting point is to check the global shape of execution time during your simulation.
For that, **we are going to record each step's duration and plot it to get an idea of what's going on during the execution**.

To do so, simply add this reflex into your global block:
```gama
reflex save_step_duration when: cycle>0 {
	save [cycle, duration] to:"durations.csv" format:"csv" rewrite:false;
}
```

This way, you will have every step duration saved in a csv file that you can analyse later on.
Once you have the csv file, you can open it in your favourite spreadsheet to visualise it. From there, there are a few possibilities:
1. The durations are always pretty much the same, no big variation
2. The durations globally increase during the whole simulation
3. The durations have a baseline, but sometimes there are steps that are significantly longer than that baseline
4. The durations are chaotic, once low then high, there's no real baseline

Each of these cases calls for a different approach.

#### Stable duration throughout the simulation
Congratulations, your model is already stable, which means it is probably already well thought! Now it may be harder for you as there are no real clues as to what to improve first, but the good news is that probably any improvement anywhere in the code will reflect in the global model's execution time. See the section about [the things to look for](#What-to-pay-the-most-attention-to) that often cost a lot of execution time.

#### Step duration increases during the simulation
That kind of result points toward an increase in the simulation complexity during its lifespan: as the simulation progresses, there are more and more things to process. 
This is typical of either the number of agents continuously increasing or cumulative data being held and used for processing. 

#### Some steps are significantly longer than the rest
This means that under certain conditions, your model will execute intensive code that is normally not executed. To find exactly what it is, you can inspect the `when` facets of your reflexes and the `if` and `loop while:` conditions in your reflexes and actions.
If those longer steps happen with some form of regularity (for example, every 100 steps), it is very probable that it is linked to some behaviour triggered by time or cycle condition, you can look for `every`, `#now`, or `cycle` keyword use in the code.

#### Chaotic step durations
This may be the hardest case to analyse, as the complexity seems to come from a combination of "unstable" things. 
A good approach here could be to try and isolate different parts of the code. Let's say that your model has two main dynamics that interact together; in that case, what you want to do is to try and analyse each one separately.
To do so, you will probably need to recreate two new models, each only containing one of those dynamics. If both dynamics cannot function without the other, you could mimic the other with a very simple functions that, for example, always return the same thing, or returns values that you have already processed in a previous simulation, so it does not cost anything in execution time.

If there are no such things in your model as different dynamics, then **you could go a step further and log for each reflex and/or action when it is called and the duration of the call**. This way, you could identify the cost of each action/reflex on the overall simulation duration and work from there to optimize only the actions/reflexes that matter the most.

Another thing you can try is to register individually all reflex/action calls, as well as their duration to try and get a better idea of what is happening. Alternatively, you could use the `benchmark` facet of the experiment as described previously, but that may be too many details for now.


## What to pay the most attention to
1. every kind of loop (including the ask statements)
2. number of agents and interactions
3. accumulating data
4. reading and writing files
5. big string concatenation
6. any process that has an exponential nature
7. network code
8. displays/charts
9. platform settings

