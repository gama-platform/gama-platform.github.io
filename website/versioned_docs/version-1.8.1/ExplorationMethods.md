---
title:  Exploration Methods
---

[//]: # (startConcept|exploration_methods)
[//]: # (keyword|concept_batch)

Several exploration methods are currently available in GAMA and described below.


## Table of contents 

* [The `method` statement](#the-method-statement)
* [Exhaustive exploration of the parameter space: `exhaustive`](#exhaustive-exploration-of-the-parameter-space-exhaustive)
* [Hill Climbing: `hill_climbing`](#hill-climbing-hill-climbing)
* [Simulated Annealing: `annealing`](#simulated-annealing-annealing)
* [Tabu Search: `tabu`](#tabu-search-tabu)
* [Reactive Tabu Search: `reactive_tabu`](#reactive-tabu-search-reactive-tabu)
* [Genetic Algorithm: `genetic`](#genetic-algorithm-genetic)

[//]: # (keyword|concept_algorithm)
## The `method` statement
The optional `method` statement controls the algorithm which drives the batch.

If this element is omitted, the batch will run using the `exhaustive` method, changing one parameter value at each step until all the possible combinations of parameter values have been covered. See the Exhaustive exploration of the parameter space for more details.

When used, this element must contain at least a name attribute to specify the algorithm to use. It has theses facets:

* `minimize` or `maximize` (mandatory for optimization methods): an facet defining the expression to be optimized.
* `aggregation` (optional): the possible values are `min` or `max`. Each combination of parameter values is tested `repeat` times. The aggregated fitness of one combination is by default the average of fitness values obtained with those repetitions. This facet can be used to tune this aggregation function and to choose to compute the aggregated fitness value as the minimum or the maximum of the obtained fitness values.
* other parameters linked to the exploration method (optional): see below for a description of these factes.

Examples of the use of the `method` statement:
```
method exhaustive minimize: nb_infected ;
```
or
```
method genetic 
    pop_dim: 3 crossover_prob: 0.7 mutation_prob: 0.1 
    nb_prelim_gen: 1 max_gen: 5  
    minimize: nb_infected 
    aggregation: "max";
```

[//]: # (keyword|concept_parameter)
## Exhaustive exploration of the parameter space: `exhaustive`

This is the default batch exploration method. It explores all the combination of parameter values in a sequential way.

Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;
}
```

The order of the simulations depends on the order of the parameters. In our example, the first combinations will be the followings:

* evaporation\_rate = 0.1, diffusion\_rate = 0.1, (2 times)
* evaporation\_rate = 0.1, diffusion\_rate = 0.4, (2 times)
* evaporation\_rate = 0.1, diffusion\_rate = 0.7, (2 times)
* evaporation\_rate = 0.1, diffusion\_rate = 1.0, (2 times)
* evaporation\_rate = 0.2, diffusion\_rate = 0.1, (2 times)
* ...

Note: this method can also be used for optimization by adding a `maximize` or a `minimize` facet to the `method` statement:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method exhaustive maximize: food_gathered;
}
```


## Hill Climbing: `hill_climbing`

This algorithm is an implementation of the Hill Climbing algorithm. [See the Wikipedia article for a more detailed explanation](https://en.wikipedia.org/wiki/Hill_climbing). This a local search method that tried at each step, given a solution `s`, to find a solution `s'` in the neighborhood of `s` and that increases (or decreases depending on the aim of the exploration) the fitness. This method is more efficient than the global exploration to find an optimum, but with the risk of finding a local optimum, whereas a global optimum could exist. 

### Algorithm:

```
 Initialization of an initial solution s 
 iter = 0
 While iter <= iter_max, do:
   Choice of the solution s' in the neighborhood of s that maximize the fitness function
   If f(s') > f(s)
     s = s'
   Else
     end of the search process
   EndIf
   iter = iter + 1
 EndWhile
```

### Method facets (i.e. parameters):

* `iter_max`: number of iterations before stoping the exploration.

### Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method hill_climbing iter_max: 50 maximize: food_gathered;
}
```


## Simulated Annealing: `annealing`

This algorithm is an implementation of the Simulated Annealing algorithm. [See the Wikipedia article](https://en.wikipedia.org/wiki/Simulated_annealing) for more details. This is a global search method able to find an approximation of a global optimum. The idea is close to the one of slow cooling: given a solution, the algorithm will look for a better one in its neighborhood. This size of the neighborhood (represented by the temperature) will decrease over the execution of the algorithm.

### Algorithm:

```
 Initialization of an initial solution s 
 temp = temp_init
 While temp > temp_end, do:
   iter = 0
   While iter < nb_iter_cst_temp, do:
     Random choice of a solution s2 in the neighborhood of s  
     df = f(s2)-f(s)
     If df > 0 
       s = s2
     Else,
       rand = random number between 0 and 1
       If rand < exp(df/temp)
         s = s2
       EndIf
     EndIf
     iter = iter + 1
   EndWhile
   temp = temp * temp_decrease
 EndWhile
```

### Method facets (i.e. parameters):

* `temp_init`: Initial temperature.
* `temp_end`: Final temperature.
* `temp_decrease`: Temperature decrease coefficient.
* `nb_iter_cst_temp`: Number of iterations per level of temperature.

### Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method annealing 
        temp_init: 100  temp_end: 1 
        temp_decrease: 0.5 nb_iter_cst_temp: 5 
        maximize: food_gathered;
}
```


## Tabu Search: `tabu`

This algorithm is an implementation of the Tabu Search algorithm. [See the Wikipedia article](https://en.wikipedia.org/wiki/Tabu_search) for more details. This is a local search method. To avoid the issue of local optimum, two additional principals are added: (i) _worsening_, i.e. the algorithm can sometimes choose a worse solution, (ii) _prohitions_, i.e. solutions that have already been explored will become **tabu** in order to avoid that the algorithm considers them repeatedly.

### Algorithm:

```
 Initialization of an initial solution s 
 tabuList = {}
 iter = 0
 While iter <= iter_max, do:
   Choice of the solution s2 in the neighborhood of s such that:
     s2 is not in tabuList
     the fitness function is maximal for s2
   s = s2
   If size of tabuList = tabu_list_size
     removing of the oldest solution in tabuList 
   EndIf
   tabuList = tabuList + s
   iter = iter + 1
 EndWhile
```

### Method facets (i.e. parameters):

* `iter_max`: number of iterations.
* `tabu_list_size`: size of the tabu list.


### Example: 

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method tabu 
        iter_max: 50 tabu_list_size: 5 
        maximize: food_gathered;
}
```

## Reactive Tabu Search: `reactive_tabu`

This algorithm is a simple implementation of the Reactive Tabu Search algorithm (Battiti et al., 1993). This Reactive Tabu Search is an enhanced version of the Tabu search. It adds two new elements to the classic Tabu Search. The first one concerns the size of the tabu list: in the Reactive Tabu Search, this one is not constant anymore but it dynamically evolves according to the context. Thus, when the exploration process visits too often the same solutions, the tabu list is extended in order to favor the diversification of the search process. On the other hand, when the process has not visited an already known solution for a high number of iterations, the tabu list is shortened in order to favor the intensification of the search process. The second new element concerns the adding of cycle detection capacities. Thus, when a cycle is detected, the process applies random movements in order to break the cycle.

### Method parameters:

* `iter_max`: number of iterations.
* `tabu_list_size_ini`: initial size of the tabu list.
* `tabu_list_size_min`: minimal size of the tabu list.
* `tabu_list_size_max`: maximal size of the tabu list.
* `nb_tests_wthout_col_max`: number of movements without collision before shortening the tabu list.
* `cycle_size_min`: minimal size of the considered cycles.
* `cycle_size_max`: maximal size of the considered cycles.

### Example: 

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method reactive_tabu 
        iter_max: 50 tabu_list_size_init: 5 tabu_list_size_min: 2 tabu_list_size_max: 10 
        nb_tests_wthout_col_max: 20 cycle_size_min: 2 cycle_size_max: 20 
        maximize: food_gathered;
}
```


## Genetic Algorithm: `genetic`

This is a simple implementation of Genetic Algorithms (GA). [See the Wikipedia article](https://en.wikipedia.org/wiki/Genetic_algorithm) for more details. The principle of GA is to search an optimal solution by applying evolution operators on an initial population of solutions. There are three types of evolution operators:

* Crossover: Two solutions are combined in order to produce new solutions.
* Mutation: a solution is modified.
* Selection: only a part of the population is kept. Different techniques can be applied to this selection. Most of them are based on solution quality (fitness).

Representation of the solutions:

* Individual solution: {Param1 = val1; Param2 = val2; ...}
* Gene: Parami = vali

Initial population building: the system builds nb\_prelim\_gen random initial populations composed of pop\_dim individual solutions. Then, the best pop\_dim solutions are selected to be part of the initial population.

Selection operator: roulette-wheel selection: the probability to choose a solution is equal to fitness(solution)/ Sum of the population fitness. A solution can be selected several times. Ex: population composed of 3 solutions with fitness (that we want to maximize) 1, 4 and 5. Their probability to be chosen is equal to 0.1, 0.4 and 0.5.

Mutation operator: The value of one parameter is modified. Ex: The solution {Param1 = 3; Param2 = 2} can mute to {Param1 = 3; Param2 = 4}

Crossover operator: A cut point is randomly selected and two new solutions are built by taking the half of each parent solution. Ex: let {Param1 = 4; Param2 = 1} and {Param1 = 2; Param2 = 3} be two solutions. The crossover operator builds two new solutions: {Param1 = 2; Param2 = 1} and {Param1 = 4; Param2 = 3}.

### Method facets (i.e. parameters):

* `pop_dim`: size of the population (number of individual solutions).
* `crossover_prob`: crossover probability between two individual solutions.
* `mutation_prob`: mutation probability for an individual solution.
* `nb_prelim_gen`: number of random populations used to build the initial population.
* `max_gen`: number of generations.

### Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;
	
    method genetic maximize: food_gathered 
        pop_dim: 5 crossover_prob: 0.7 mutation_prob: 0.1 
        nb_prelim_gen: 1 max_gen: 20; 
}
```

[//]: # (endConcept|exploration_methods)
