---
title:  Exploration  calibration methods
---

[//]: # (startConcept|exploration_methods)
[//]: # (keyword|concept_batch)

Several methods are currently available in GAMA to explore and calibrate your simulation model.

## Table of contents 

* [The `method` statement](#the-method-statement)
* [Exploration, analysis and calibration methods in a nutshell](#rationals-behind-using-batch-methods)
* [The exploration method](#exploration-methods)
> * [Exhaustive sampling: `factorial`](#exhaustive-exploration-of-the-parameter-space-factorial-sampling)
> * [Random sampling: `uniform`](#random-exploration-of-the-parameter-space-uniform-sampling)
> * [Latin Hypercube sampling: `latinhypercube`](#latin-hypercube-sampling)
> * [Othrogonal sampling: `orthogonal`](#orthogonal-sampling)
* [Analysis methods](#analysis-methods)
> * [Analysis of stochasticity: `stochanalyse`](#stochastic-analysis-stochanalyse)
> * [Sobol analysis: `sobol`](#sobol-analysis-sobol)
> * [Morris analysis: `morris`](#morris-analysis-morris)
> * [Beta analysis: `betad`](#beta-analysis-betad)
* [Calibration methods](#calibration-methods)
> * [Hill Climbing: `hill_climbing`](#hill-climbing-hill-climbing)
> * [Simulated Annealing: `annealing`](#simulated-annealing-annealing)
> * [Tabu Search: `tabu`](#tabu-search-tabu)
> * [Reactive Tabu Search: `reactive_tabu`](#reactive-tabu-search-reactive-tabu)
> * [Genetic Algorithm: `genetic`](#genetic-algorithm-genetic)
> * [Particle Swarm Optimization: `pso`](#particle-swarm-optimization-pso)

[//]: # (keyword|concept_algorithm)
## The `method` statement
The optional `method` statement controls the algorithm which drives the batch.

If this element is omitted, the batch will run an `exploration` method with default facets, see the [exploration section](#exploration-methods) for more details.

Examples of the use of `method` statement:
```
method exploration;
```
another examples with custom options
```
method genetic 
    pop_dim: 3 crossover_prob: 0.7 mutation_prob: 0.1 
    nb_prelim_gen: 1 max_gen: 5  
    minimize: nb_infected 
    aggregation: "max";
```

## Rationals behind using batch methods

Overall Gama provides three uses of batch `method` for [exploration](#exploration-methods), [analysis](#analysis-methods) and [calibration](#calibration-methods):
* The first type stands for classical exploration of simulation models by launching simulations for a given set of parameters. The purpose of such approach is to better understand the behavior of the model exploring different scenarios corresponding to a set of points in the parameter space. See the section dedicated to [exploration](#exhaustive-exploration-of-the-parameter-space-exhaustive).
* The set of methods dedicated to analysis are meant to better understand how the model outputs are determined by stochastic processes and input parameters, what usually is referred to as Sensitivity Analysis. See the section dedicated to [analysis](#analysis-methods)
* The last set of methods are used to choose a satisfying set of parameter value to achieve as close as possible desired outputs, what usually is referred to as Calibration. See the section dedicated to [calibration](#calibration-methods)

## Exploration methods

Exploration is the simplest and the most intuitive way to get a better understanding of the behavior of a model simulation across various input conditions. Basically it consists in launching simulations replicates (using facet `repeat`) for a parameter set (a vector of parameter values), retrieve outcomes, going to explore another parameter set, retrieve outcomes, and so on so force. The list or set of points in the parameter space to explore depend on the sampling algorithms used, via the `sampling` facet. Gama provides 6 different algorithms, `saltelli`, `morris`, `latinhypercube`, `orthogonal`, `uniform` and `factorial`, among which 4 are detailed in the sections below. Another aspect is the outcome of the exploration: it is up to the modelers to define, in the model or the experiment how outputs of the simulation should be saved. Most detailed outputs will be a record of any variable of interest step by step for each simulation, or an aggregate value over the course of a simulation for each simulation and at the most, only an aggregate value over each simulations replications. It depends on what you want to observe and how you want to statistically explore results of simulation. For state of the art exploration strategy for agent-based simulation, see for instance Borgonovo et al., Sensitivity analysis of agent-based models: a new protocol. Comput Math Organ Theory 28, 52–94 (2022).

#### Generic method facets (i.e. parameters):

* `sample`: number of points to explore in the parameter space. Optional, when omitted default value is 124.
* `sampling`: the methods used to automatically draw points from the parameter space. Optional, when omitted default sampling is `factorial`
* `with`: the explicit list of points (map) to explore. Optional, when omitted no default value, when used the two previous facet are bypassed.
* `from`: the explicit list of points to explore, encoded in a csv file where the line corresponds to one point in the parameter space, each column a parameter value. Optional, when omitted no default value, when used the two previous facet are bypassed.

#### Examples:

When you want to explicitly define the points in the parameter space to explore, just put them (a point is a map of parameter name as key and parameter value as value) in a list

```
method exploration with: [
		["parameter1"::0.1, "parameter2":: 0.01],
		["parameter1"::0.5, "parameter2":: 0.2],
		["parameter1"::1.0, "parameter2":: 0.05],
	];
```

An alternative is to put the list of points in a csv file, where each lines will stands for a point in the parameter space, each column defining a parameter.

```
experiment exploration type: batch keep_seed:true until:( time > 5000 ) repeat:40 {
	method exploration from:"../includes/my_custom_batch_exploration.csv";
}
```

When no precise hypothesis is made on the configuration of the parameter space, Gama provides built-in exploration strategies using the `sampling` facet:

```
experiment exploration type: batch keep_seed:true until:( time > 5000 ) repeat:40 {
	method exploration sample:100 sampling:uniform;
}
```


In the next sub-sections we detail the various sampling methods modelers can use as exploration strategies.

### Exhaustive exploration of the parameter space: `factorial` sampling

This is the default batch exploration sampling algorithm. It explores all the combination of parameter values in a sequential way.

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

### random exploration of the parameter space: `uniform` sampling

Provides a quick and simple way to explore the parameter space, drawing uniformly each points. The drawing algorithm treat parameters in two distinctive ways: when `min` and `max` facet of the parameter is used, the value is drawn uniformly within the boundaries (included); when a list/set of values is defined, the value is drawn uniformly within this list/set. Each parameter value is treated independently. The algorithm select as many points as defined by the `sample` facet.   

Example:

```
experiment exploration type: batch until:( time > 5000 ) repeat:40 {
	method exploration sample:100 sampling:uniform;
}
```

### latin hypercube sampling

The procedure of Latin Hypercube Sampling (LHS) works upon a grid view of the parameter space: each parameter is divided into _n_ slices, with _n_ based on `sample` facet, making up a matrix with _d_ dimensions, with _d_ the number of parameters. At first iteration, the procedure select one slice per parameter, draw a value for each ones (within the boundaries of the slice) and exclude each selected slice; then procedure continue until no more slices remains. For a simple yet more precise definition, see the [wikipedia](https://en.wikipedia.org/wiki/Latin_hypercube_sampling) page.  

Example:

```
experiment exploration type: batch until:( time > 5000 ) repeat:40 {
	method exploration sample:100 sampling:latinhypercube;
}
```

### orthogonal sampling

The procedure behind orthogonal sampling is an extension of LHS optimizing the density of points over the parameter space. It means that, based on the a grid view constraint, it will try to minimize the distance between each points. see the [wikipedia](https://en.wikipedia.org/wiki/Latin_hypercube_sampling) page of LHS. 

Example:

```
experiment exploration type: batch until:( time > 5000 ) repeat:40 {
	method exploration sample:100 sampling:othogonal;
}
```

## Analysis Methods

Analysis methods provide statistical insights into the understanding of simulation model behavior. Contrary to mere exploration procedure, analysis methods refer in Gama to as statistical analysis of outputs based on input parameters; that is, sensitivity analysis. Gama embeds two types of such analysis : one to gauge the [impact of stochasticity](#stochastic-analysis-stochanalyse) and three other options to evaluate the contribution of parameters, i.e. [Sobol](#sobol-analysis-sobol), [Morris](#morris-analysis-morris) and [Beta_d](#beta-analysis-betad). 

The first method relies on statistical tests to evaluate how much simulations output generated with the exact same input parameter values are correlated. Consequently modelers can decide, based on a correlation threshold of their choice, how many simulation replications they need to build coherent aggregated outputs (i.e. one that do not rely to much on stochastic discretion of results). More explanation is provided in the corresponding section. The other set of methods focuses on contribution of parameters over outputs variability. 

Gama provides three different measurements of inputs contribution to outputs variability : the Sobol, Morris and Beta indexes. Each cover different aspect of output variability and provide various insight on parameters contribution. For instance Sobol depicts weights, whereas Morris proposes valence (i.e. positive or negative impacts) on parameters contributions. Beta index gains insight based on the general distribution of results, while the two other look at variance of results. More information to be found on corresponding sub-sections.

There is generic parameters of such methods, in particular the targeted `outputs` which are to be determine for all analysis methods. However `sobol` and `morris` methods have specific facets, while `stochanalyse` and `betad` don't.

#### Common facets of all analysis methods:
* `outputs`: the list of output variables to analyse through the chosen method. Mandatory.
* `report`: the path to the file where the results of the chosen method will be written. Mandatory.
* `results`: the path to the file where the variable designated in `outputs` and the corresponding parameter values (point) will be written. Optional, when omitted no raw result report will be written.

### Stochastic Analysis: `stochanalyse`

This method embedded three different index to measure the impact of stochastic processes. For each of them, given thresholds make it possible to outline the number of replicates required to satisfy statistical criteria such as p-value or student test. The three indicators are:

* student t test (see [Lee et al., 2015](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwii2v6Q4939AhVNTKQEHRt2AugQFnoECAcQAQ&url=https%3A%2F%2Fwww.jasss.org%2F18%2F4%2F4.html&usg=AOvVaw0XACedj9zAa5PFAL7ePiyG))
* standard error (see [Bobachev and Morris, 2010](https://ieeexplore.ieee.org/abstract/document/5601895/))
* coefficient of variation (see this [blog post](https://eracons.com/resources/mcs-post-processing) for neat concise explanation)

Each measure is made _n_ times, one for each simulation point, with _n_ the value of facet `sample`, and _m_ replicates for each point, with _m_ the value of facet experiment `repeat`. It means that, we provide _n_ statistical tests, for which we have _m_ instance. The tests are conducted with 2 replicates, then 3, 4, etc. up to _m_; repeated _n_ times. Tests gives you correlation, error and variation indexes, for 2 to _m_ replicates, with various build-in thresholds to decide if test is successful on not. Those tests are repeated _n_ times to ensure that the test is not only processed on a particular configuration of the simulation, for example a point in the parameter space that emphasis or decrease stochastic processes. 

#### Useful facets:
* `sample`: the number of point of the parameter space to build. Optional, when omitted default value is 1.
* `sampling`: the sampling algorithm used to draw `sample` number of points
* `from`: a file with corresponding points of scenarios that might have higher stochastic impact. Optional.
* `with`: a given list of points (map). Optional. 

#### Exemple

```
experiment stoch type: batch until: time > end_cycle repeat:40 keep_simulations:false {
	method stochanalyse outputs:["num_dead"] results:"Results/stochanalysis.txt" sample:3;
} 
```

In this example, 40 x 3 simulations will be run; stochastic indexes will be computed over 3 different point in the parameter space and failure/success computed from 2 to 40 replicates.

### Sobol Analysis: `sobol`

This is an implementation of the Sobol sensitivity analysis exploration. It is based on the implementation of the algorithm provided by http://moeaframework.org under the GPL GNU licence.

Rational behind the Sobol sensitivity analysis can be found in Saltelli article (https://doi.org/10.1016/S0010-4655(02)00280-1). To put it simple, the procedure randomly drawn N x P points in the parameter space (with N defined by the `sample` parameter and P the number of parameters to explore), execute the set of associated simulation and compute first, second and total ordered sensitivity indexes. Intuitively, those values give an estimated contribution of the parameters to the variability of one or several outputs (the `outputs` list in parameter of the method). 


#### Useful facet:
* `sample`, the size of the sample N for the sobol sequence. Mandatory.

#### Example:

```
experiment Sobol type: batch keep_seed:true until:( time > 5000 ) {
	method sobol outputs:["num_dead"] sample:100 report:"Results/sobol.txt" results:"Results/sobol_raw.csv";
}
```

### Morris Analysis: `morris`

The corresponding method is an implementation of the Morris sensitivity analysis exploration. It is a Java re-implementation of the R package [sensitivity](https://cran.r-project.org/web/packages/sensitivity/index.html) and proposes two main feature : the sampling method and a sensitivity analysis, both attached to the statement `morris` (both as the name of an analysis method and a keyword to define a sampling method).

Rational behind the Morris sensitivity analysis can be found in the [Morris's seminal article](https://www.tandfonline.com/doi/abs/10.1080/00401706.1991.10484804); more resources (including open access ones) can be found [here](https://www.sciencedirect.com/topics/engineering/morris-method). Compared to Sobol analysis, Morris does not include interaction effect between parameters but provide a positive/negative valence to the impact of parameters in addition to the magnitude of the contribution. In short, Morris analysis the contribution of parameter one factor at a time (OFAT), making it possible to elicit most impactful parameters, also giving insight on the direction of contribution of parameters, that is increasing the value of one parameter with a negative Morris index, will impact negatively the value of the outputs of interest.  

#### Useful facet:
* `sample`: the size of the sample for the sobol sequence. Mandatory.
* `level`: the number of times the Morris sampling will slightly change the value of parameters to evaluate sensitivity of outputs. Optional, when omitted default value is 4

#### Example:

```
experiment Morris type: batch keep_seed:true until:( time > 5000 ) {
	method morris outputs:["num_dead"] sample:100 level:4 report:"Results/morris.txt" results:"Results/morris_raw.csv";
}
```

### Beta Analysis: `betad`

This method corresponds to the proposed sensitivity analysis by [Baucells and Borgonovo](https://doi.org/10.1287/mnsc.2013.1719). Contrary to both Sobol and Morris SA methods, `betad` is not based on results variance but rely on the global distribution of results; which means that it includes full interactions between parameters in the assessment of one factor impact on the whole distribution of outputs. To put it simply, beta distribution evaluates how much variation on a parameter input will increase the maximum absolute differences 

Most important contribution of this method is to provide a third evaluation which may push or hinder results from Morris and Sobol. Used together, the three method provides solid understanding of input contribution over outputs of interests.

#### Useful facet:
* `sample`: the size of the sample for the sobol sequence. Mandatory.
* `sampling`: contrary to sobol and morris, no particular sampling algorithm had been defined to fit `beta^d` index computation. Optional, when omitted default is factorial.

#### Example:

```
experiment Morris type: batch keep_seed:true until:( time > 5000 ) {
	method betad outputs:["num_dead"] sample:100 sampling:orthogonal report:"Results/betad.txt" results:"Results/beta_raw.csv";
}
```

## Calibration Methods

Calibration is the third exploration feature of the batch experiments. Conversely to previous exploration methods, calibration will try to find the best combination of inputs to obtain best matching for desired outputs. In short, calibration is an optimization of input parameter values in order to be as close as possible to desired outputs. To elicit how close the input allows to be relatively to requested output, the algorithm uses a fitness measure, that is a variable, defined in the model, which evaluate the 'distance' between a specific simulation outputs and the requested one. It is up to modelers to define this variable within the model keeping in mind that the fitness could be minimize (with 0 a perfect match) or maximized (can always be improved).

Specific facets dedicated to calibration methods are:

* `minimize` or `maximize` (mandatory for optimization methods): a facet defining the expression to be optimized.
* `aggregation` (optional): the possible values are `min` or `max` (string). Each combination of parameter values is tested `repeat` times. The aggregated fitness of one combination is by default the average of fitness values obtained with those repetitions. This aggregated fitness can be turned to the minimum or the maximum of the obtained fitness values using this facet.
* other parameters that are specific to the exploration method (optional): see below for a description of these facets.

### Hill Climbing: `hill_climbing`

This algorithm is an implementation of the Hill Climbing algorithm. [See the Wikipedia article for a more detailed explanation](https://en.wikipedia.org/wiki/Hill_climbing). This is a local search method that tries at each step, given a solution `s`, to find a solution `s'` in the neighborhood of `s` that increases (or decreases depending on the aim of the exploration) the fitness. This method is more efficient than the global exploration to find an optimum, but with the risk of finding a local optimum, whereas a global optimum could exist. 

#### Algorithm:

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

#### Method facets (i.e. parameters):

* `iter_max`: number of iterations before stoping the exploration.

#### Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method hill_climbing iter_max: 50 maximize: food_gathered;
}
```


### Simulated Annealing: `annealing`

This algorithm is an implementation of the Simulated Annealing algorithm. [See the Wikipedia article](https://en.wikipedia.org/wiki/Simulated_annealing) for more details. This is a global search method able to find an approximation of a global optimum. The idea is close to the one of slow cooling: given a solution, the algorithm will look for a better one in its neighborhood. This size of the neighborhood (represented by the temperature) will decrease over the execution of the algorithm.

#### Algorithm:

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

#### Method facets (i.e. parameters):

* `temp_init`: Initial temperature.
* `temp_end`: Final temperature.
* `temp_decrease`: Temperature decrease coefficient.
* `nb_iter_cst_temp`: Number of iterations per level of temperature.

#### Example:

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


### Tabu Search: `tabu`

This algorithm is an implementation of the Tabu Search algorithm. [See the Wikipedia article](https://en.wikipedia.org/wiki/Tabu_search) for more details. This is a local search method. To avoid the issue of local optimum, two additional principals are added: (i) _worsening_, i.e. the algorithm can sometimes choose a worse solution, (ii) _prohibitions_, i.e. solutions that have already been explored will become **tabu** in order to avoid that the algorithm considers them repeatedly.

#### Algorithm:

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

#### Method facets (i.e. parameters):

* `iter_max`: number of iterations.
* `tabu_list_size`: size of the tabu list.


#### Example: 

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;

    method tabu 
        iter_max: 50 tabu_list_size: 5 
        maximize: food_gathered;
}
```

### Reactive Tabu Search: `reactive_tabu`

This algorithm is a simple implementation of the Reactive Tabu Search algorithm (Battiti et al., 1993). This Reactive Tabu Search is an enhanced version of the Tabu search. It adds two new elements to the classic Tabu Search. The first one concerns the size of the tabu list: in the Reactive Tabu Search, this one is not constant anymore but it dynamically evolves according to the context. Thus, when the exploration process visits too often the same solutions, the tabu list is extended in order to favor the diversification of the search process. On the other hand, when the process has not visited an already known solution for a high number of iterations, the tabu list is shortened in order to favor the intensification of the search process. The second new element concerns the adding of cycle detection capacities. Thus, when a cycle is detected, the process applies random movements in order to break the cycle.

#### Method parameters:

* `iter_max`: number of iterations.
* `tabu_list_size_ini`: initial size of the tabu list.
* `tabu_list_size_min`: minimal size of the tabu list.
* `tabu_list_size_max`: maximal size of the tabu list.
* `nb_tests_wthout_col_max`: number of movements without collision before shortening the tabu list.
* `cycle_size_min`: minimal size of the considered cycles.
* `cycle_size_max`: maximal size of the considered cycles.

#### Example: 

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


### Genetic Algorithm: `genetic`

This is a simple implementation of Genetic Algorithms (GA). [See the Wikipedia article](https://en.wikipedia.org/wiki/Genetic_algorithm) for more details. The principle of GA is to search an optimal solution by applying evolution operators on an initial population of solutions. There are three types of evolution operators:

* Crossover: Two solutions are combined in order to produce new solutions.
* Mutation: a solution is modified.
* Selection: only a part of the population is kept. Different techniques can be applied to this selection. Most of them are based on solution quality (fitness).

Representation of the solutions:

* Individual solution: &#123;Param1 = val1; Param2 = val2; ...}
* Gene: Parami = vali

Initial population building: the system builds nb\_prelim\_gen random initial populations composed of pop\_dim individual solutions. Then, the best pop\_dim solutions are selected to be part of the initial population.

Selection operator: roulette-wheel selection: the probability to choose a solution is equal to fitness(solution)/ Sum of the population fitness. A solution can be selected several times. Ex: population composed of 3 solutions with fitness (that we want to maximize) 1, 4 and 5. Their probability to be chosen is equal to 0.1, 0.4 and 0.5.

Mutation operator: The value of one parameter is modified. Ex: The solution &#123;Param1 = 3; Param2 = 2} can mute to &#123;Param1 = 3; Param2 = 4}

Crossover operator: A cut point is randomly selected and two new solutions are built by taking the half of each parent solution. Ex: let &#123;Param1 = 4; Param2 = 1} and &#123;Param1 = 2; Param2 = 3} be two solutions. The crossover operator builds two new solutions: &#123;Param1 = 2; Param2 = 1} and &#123;Param1 = 4; Param2 = 3}.

#### Method facets (i.e. parameters):

* `pop_dim`: size of the population (number of individual solutions).
* `crossover_prob`: crossover probability between two individual solutions.
* `mutation_prob`: mutation probability for an individual solution.
* `nb_prelim_gen`: number of random populations used to build the initial population.
* `max_gen`: number of generations.

#### Example:

```
experiment Batch type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed ) or ( time > 400 ) {
    parameter 'Evaporation:' var: evaporation_rate among: [ 0.1 , 0.2 , 0.5 , 0.8 , 1.0 ] unit: 'rate every cycle (1.0 means 100%)';
    parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.3;
	
    method genetic maximize: food_gathered 
        pop_dim: 5 crossover_prob: 0.7 mutation_prob: 0.1 
        nb_prelim_gen: 1 max_gen: 20; 
}
```

### Particle Swarm Optimization: `pso`

This is an implementation of the Partical Swarm Optimization algorithme (PSO). [See the Wikipedia article](https://en.wikipedia.org/wiki/Particle_swarm_optimization) for more details. It solves a problem by having a population of candidate solutions, here dubbed particles, and moving these particles around in the search-space according to simple mathematical formula over the particle's position and velocity. Each particle's movement is influenced by its local best known position, but is also guided toward the best known positions in the search-space, which are updated as better positions are found by other particles. This is expected to move the swarm toward the best solutions. 


#### Method facets (i.e. parameters):

* `iter_max`, number of iterations.
* `num_particles`, number of particles.
* `weight_cognitive`, weight for the cognitive component.
* `weight_inertia`, weight for the inertia component.
* `weight_social`, weight for the social component.

#### Example:

```
experiment PSO type: batch keep_seed: true repeat: 3 until: ( time > 5000 ) {
	parameter 'Infection rate' var: infection_rate min: 0.1 max:0.5 step:0.01;
	parameter 'Probability of dying:' var: dying_proba min: 0.01 max: 0.2 step:0.01;
	method pso num_particles: 3 weight_inertia:0.7 weight_cognitive: 1.5 weight_social: 1.5  iter_max: 5  minimize: num_dead  ; 
}
```

[//]: # (endConcept|exploration_methods)
