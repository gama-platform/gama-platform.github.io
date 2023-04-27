---
title:  Ensure model's reproducibility 
---


There has been a huge effort made in GAMA development in order to ensure the reproducibility of the simulations, i.e. when several simulations of the same models are launched with the same random generator seed and same parameter values, they are supposed to provide the same results.

Nevertheless, GAMA provides several ways to speed up simulations runs, e.g. by making parallel the execution of some agents' behaviors. The use of parallelism may destroy the reproducibility of the simulations. More generally, there are many sources of uncertainty which can break this reproducibility.

## How to ensure reproducibility of a model? 

If you aim at reproducibility, you need to reduce as much as possible all the sources of uncertainty.
* Set the random number generator seed (explicitly set a value to the model's `seed` global attribute).
* Reduce the parallel execution of agents' behaviors. 
  * remove all the explicitly parallel execution, in particular remove / set to false all the `parallel` facets (e.g. in the loop, ask...).
  * Set all of GAMA's settings regarding parallelization to false. You can find them in the `Preferences` menu, then under the tab `Execution` at the section `Parallelism` to disable them globally, or you can set them to false only in your experiment with the corresponding variables as shown belown:

```
experiment 'any exp' {
  init {
	//Make grids schedule their agents in parallel
	gama.pref_parallel_grids <- false;
	//Make experiments run simulations in parallel
	gama.pref_parallel_simulations <- true;
	//Make species schedule their agents in parallel
	gama.pref_parallel_species <- false;
  }
}
```

* Displays are computed independently of the simulation, and in parallel. Limit computation and model modifications in the aspects.
  * Remove any modification of the model in the aspects.
  * Do not use any random operators in the aspects (e.g. `rnd`, `one_of`, `any` ...).
* The use of asynchronous communications (using network) with external applications, the use of files (in particular if they are changed  externally) can also modify the behavior of simulations
* As a safety measure, you can also set your random number generator to `mersenne` as others may not have been as much tested for reproducibility

