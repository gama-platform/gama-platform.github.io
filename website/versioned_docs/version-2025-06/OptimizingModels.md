---
title:  Optimizing Models
---


This page aims at presenting some tips to optimize the memory footprint or the execution time of a model in GAMA.

> [!Note]
>  The optimizations presented here are only general ideas that work most of the time, but every model is different and sometimes those optimizations won't work or even produce worse execution time. It is thus highly recommended that you try them yourself on your setup and that you build test environment with the tools explained in the previous page ([analysing code performance](AnalysingCodePerformance)) to make sure that they are useful **to your model**._

> [!Note]
>  Some previously known optimizations from GAMA 1.6.1 and above, have become obsolete because they have been included in the compiler. They have, then, been removed from this page. For instance, writing `rgb(0,0,0)` is now compiled directly as `#black`._

## Scheduling

If you have a species of agents that, once created, are not supposed to do anything more (i.e. no behavior, no reflex, their actions triggered by other agents, their attributes being simply read and written by other agents), such as a "data" grid, or agents representing a "background" (from a shape file, etc.), consider using the `schedules: []` facet on the definition of their species. This trick allows to tell GAMA to not schedule any of these agents.

```gaml
grid my_grid height: 100 width: 100 schedules: []  {
      ...
}
```

The `schedules` facet is dynamically computed (even if the agents are not scheduled), so, if you happen to define agents that only need to be scheduled every x cycles, or depending on a condition, you can also write `schedules` to implement this. For instance, the following species will see its instances scheduled every 10 steps and only if a certain condition is met:

```gaml
species my_species schedules: (every 10) ? (condition ? my_species : []) : []  {
     ...
}
```

In the same way, modelers can use the frequency facet to define when the agents of a species are going to be activated. By setting this facet to 0, the agents are never activated.

```gaml
species my_species frequency: 0 {
     ...
}
```

#### Performances
Consider the following model:

```gaml
global {	
	int nb_cells <- 1000;
	bool is_scheduled <- true;
}

grid my_grid height: nb_cells width: nb_cells schedules: is_scheduled ? my_grid : []  ;
```

> With 1 million grid cells, 1 step lasts in average **0.3 ms without scheduling my_grid agents vs 250 ms with scheduling** (GAMA 2025-05).

## Grid

### Optimization Facets

In this section, we present some facets that allow to optimize the use of grids (in particular in terms of memory). Note that all these facets can be combined (see the Life model from the Models library).

#### `use_regular_agents`

If false, then a special class of agents is used. This special class of agents uses fewer memories but has some limitations: the agents cannot inherit from a "normal" species, they cannot have sub-populations, their name cannot be modified, etc.

```gaml
grid cell width: 50 height: 50 use_regular_agents: false ;
```

#### `use_individual_shapes`

If false, then only one geometry is used for all agents. This facet allows to gain a lot of memory, but should not be used if the geometries of the agents are often activated (for instance, by an aspect).

```gaml
grid cell width: 50 height: 50 use_individual_shapes: false ;	
```

#### Performances

Consider the following model:

```gaml
global {	
	int nb_cells <- 2000;
	bool Puse_individual_shapes <- true;
	bool Puse_regular_agents <- true;
}


grid my_grid height: nb_cells width: nb_cells 	
		use_individual_shapes: Puse_individual_shapes 
		use_regular_agents: Puse_regular_agents {
	string toto;
}
```

> With 4 million grid cells, the memory used by the creation of the grid is displayed below, depending on the values of the 2 facets of `grid` (GAMA 2025-05). On this simple example, **the memory use is then reduced by 35%.**

| use_individual_shapes | use_regular_agents | Memory used (MB) |
|-----------------------|--------------------|------------------|
| false                 | false              | 3308.38          |
| false                 | true               | 3307.90          |
| true                  | false              | 5097.77          |
| true  (default)       | true   (default)   | 5073.43          |


### Parallel execution

The `grid` statement can also specify whether the agents of the grid are computed in parallel, using the facet `parallel`. This could increase (depending on the computation) the execution time.
For more details about the pros and cons of doing so, please refer to the [parallel](#parallel) section.

### Use of `field` instead of grids

`grid` provides a simple way to manipulate raster data in an agent-based model using agents. It is also perfect to discretize the environment and provides an easy way to locate and move agents in space. Nevertheless, as each cell is an agent, it can be very memory-consuming to use this approach. To round this issue, `field` data types have been introduced. **A `field` can be summarized as a spatialized matrix.** It could be considered as a great alternative to grid when the agentification of each cell is not so important, e.g., when the grid represents a landscape where cells contain a biomass value of a crop.

#### Performance (Memory used)

To investigate the memory footprint by fields, we compute the memory used by a simulation (in fact, the average over 5 initializations) after the initialisation when creating 1, 5, 10 fields of different sizes. As a comparison, a grid 2000x2000 with 1 attribute (so equivalent to 1 field) uses ~3300MB (versus ~1850MB for 1 field) and a grid 5000x5000 with 1 attribute uses at least 21GBytes, with an initialization time much higher.

| Number of Agents | 1 Field (MB) | 5 Fields (MB) | 10 Fields (MB)   |
|------------------|--------------|---------------|------------------|
| 2000 * 2000      | 3180.22      | 3299.00       | 3467.11          |
| 5000 * 5000      | 3340.59      | 4103.78       | 5066.26          |
| 10000 * 10000    | 3919.9       | 6981.23       | 10823.51         |
| 20000 * 20000    | 6207.72      | 18417.16      | More than 32 GB  |

#### Performance (time)

A simple test of time performance consists of executing a simple update of an attribute of the grid or an update of the field values. The following table displays the average duration of a step, with and without the parallel facet set to true for the grid. Field is much faster for this simple update.

| Filed (ms) | Grid with parallel: false (ms) | Grid with parallel: true (ms) |
|------------|--------------------------------|-------------------------------|
| 0.015      | 1920                           | 670                           | 


## Operators

In GAMA, as in any other languages, some operators or order of execution of operators are more efficient than others. This section is dedicated to identify common mistakes and provide better alternative in the use of operators.

### List operators

#### first_with

It is sometimes necessary to randomly select an element of a list that verifies a given condition.
Many modelers use the **`one_of`** and the **`where`** operators to do this:

```gaml
bug one_big_bug <- one_of (bug where (each.size > 10));
```

Whereas it is often more optimized to use the **`shuffle`** operator to shuffle the list, then the **`first_with`** operator to select the first element that verifies the condition:

```gaml
bug one_big_bug <- shuffle(bug) first_with (each.size > 10);
```

##### Performance

Below are some performance data. The second method (shuffle and first_with) provides much better results, whatever the size of the list of bugs. The results below have been produced with 1M bug agents.

| Method         | Average Time (ms)  |
|----------------|--------------------|
| `one_of`       | 450.61             |
| `first_with`   | 128.48             |


#### where / count

It is quite common to want to count the number of elements of a list or a container that verify a condition.
Several options are possible, including:

```gaml
int n <- length(my_container where (each.size > 10));
```

or using the dedicated `count` operator:

```gaml
int n <- my_container count (each.size > 10);
```

##### Performance 

Below are some performance data. We can notice that **both methods have similar results** (showing that `length` operator execution time is very small). The execution is approximately linear with the number of elements of the list.

| Number of Elements | length / where (avg ms) | count (avg ms) |
|--------------------|-------------------------|----------------|
| 100                | 0.0424                  | 0.0616         |
| 1,000              | 0.3556                  | 0.3268         |
| 10,000             | 4.4532                  | 4.9113         |
| 100,000            | 53.6059                 | 54.8167        |
| 1,000,000          | 614.4510                | 602.4465       |


### Spatial operators

#### container of agents in `closest_to`, `at_distance`, `overlapping`, `inside`

Several spatial query operators (such as **`closest_to`**, **`at_distance`**, **`overlapping`**, or **`inside`**) allow to restrict the agents being queried to a container of agents. For instance, one can write:

```gaml
agent closest_agent <- a_container_containing_agents closest_to self;
```

This expression is formally equivalent to :

```gaml
agent closest_agent <- a_container_containing_agent with_min_of (each distance_to self);
```

But `closest_to` is much faster **if the container is large**, as it will query the agents using a spatial index (instead of browsing the whole container). Note that sometimes, when you have a small number of agents, the first syntax will be faster. The same applies to the other operators. 

Below are the results of the execution of the 2 examples above (in average of 10 repetitions), with different sizes of the container. The model creates 1,000,001 agents, chooses 1 randomly, and creates sublists of various sizes among all the other agents.

| Number of Elements | closest_to (avg ms) | with_min_of / distance_to (avg ms) |
|--------------------|---------------------|-------------------------------------|
| 100                | 89.65               | 0.05                                |
| 1,000              | 79.30               | 0.39                                |
| 10,000             | 2.90                | 4.80                                |
| 100,000            | 18.29               | 94.85                               |
| 1,000,000          | 202.15              | 1125.64                             |

In the previous example, we focused on getting the closest agent over a set of agents. But it is common to want to get the closest agent among all the agents of a species. In that case, we can use the species name instead of a container. The species name is, in fact, the population of all the agents of a species. Note that, even if predator and list(predator) are very similar, they are not of the same datatype.
 
```gaml
predator closest_predator <- predator with_min_of (each distance_to self);
```

or

```gaml
predator closest_predator <- list(predator) closest_to self;
```

But these two operators can be painfully slow if your species has many instances (even in the second form). In that case, always prefer using **directly** the species directly as the left member:

```gaml
predator closest_ predator <- predator closest_to self;
```

Not only is the syntax clearer, but the speed gain can be phenomenal because, in that case, the list of instances is not used (we just check if the agent is an instance of the left species).

Below are the results of the execution of the 3 examples above (in average of 10 repetitions), with different sizes of the population. The model creates N agents of a species and 1 agent of another species. **We can see that species closest_to is definitely highly more performant than the 2 other approaches.**


| Number of Elements | with_min_of / distance_to (avg ms)  | list closest_to (avg ms)  | species closest_to (avg ms)  |
|--------------------|-------------------------------------|---------------------------|------------------------------|
| 100                | 0.016                               | 0.017                     | 0.008                        |
| 1,000              | 0.145                               | 0.085                     | 0.006                        |
| 10,000             | 1.661                               | 0.834                     | 0.004                        |
| 100,000            | 23.738                              | 12.393                    | 0.019                        |
| 1,000,000          | 554.434                             | 310.786                   | 0.159                        |

However, what happens if one wants to query instances belonging to 2 or more species? If we follow our reasoning, the immediate way to write it would be (if predator 1 and predator 2 are two species):

```gaml
agent closest_agent <- (list(predator1) + list(predator2)) closest_to self; 
```

or, more simply:

```gaml
agent closest_agent <- (predator1 + predator2) closest_to self;
```

The first syntax suffers from the same problem as the previous syntax: GAMA has to browse through the list (created by the concatenation of the species populations) to filter agents. The solution, then, is again to use directly the species, as GAMA is clever enough to create a temporary "fake" population out of the concatenation of several species, which can be used exactly like a list of agents, but provides the advantages of a species population (no iteration made during filtering).

Below are the results of the execution of the 2 examples above (in average of 10 repetitions), with different sizes of the population. The model creates N/2 agents of each of 2 species and 1 agent of another third species. **We can see that species closest_to is definitely highly more performant than the other approache.**

| Number of Elements | concat list (avg ms) | concat species (avg ms) |
|--------------------|----------------------|--------------------------|
| 100                | 0.019                | 0.010                    |
| 1,000              | 0.103                | 0.003                    |
| 10,000             | 1.066                | 0.015                    |
| 100,000            | 10.748               | 0.041                    |
| 1,000,000          | 214.712              | 0.252                    |

#### Accelerate **`closest_to`** with a first spatial filtering

The **`closest_to`** operator can sometimes be slow if numerous agents are concerned by this query. If the modeler is just interested in a small subset of agents, it is possible to apply a first spatial filtering on the agent list by using the **`at_distance`** operator.

For example, if the modeler wants first to do a spatial filtering of 10m:

```gaml
predator1 closest_agent <- (predator1 at_distance 10) closest_to self;
```

To be sure to find an agent, the modeler can use a test statement:

```gaml
agent closest_agent <- (predator1 at_distance 10) closest_to self;
if (closest_agent = nil) {closest_agent  <- predator1 closest_to self;}
```

Below are the results of the execution of the 2 examples above (in average of 10 repetitions), with different sizes of the population. The model creates N/2 agents of each of 2 species and 1 agent of another third species. **We can see that species closest_to is definitely highly more performant than the other approach.**

| Number of Elements | `filter → closest_to` (avg ms)  | `closest_to on species → filter` (avg ms) |
|--------------------|---------------------------------|-------------------------------------------|
| 100                | 0.01077                         | 0.00849                                   |
| 1,000              | 0.02844                         | 0.00227                                   |
| 10,000             | 0.21476                         | 0.00374                                   |
| 100,000            | 3.698                           | 0.02328                                   |
| 1,000,000          | 52.077                          | 0.16445                                   |

## Displays

### shape

It is quite common to want to display an agent as a circle or a square. A common mistake is to mix up the shape to draw and the geometry of the agent in the model. If the modeler just wants to display a particular shape, he/she should not modify the agent geometry (i.e. its `shape` attribute, which is a point by default), but just specify the shape to draw in the agent aspect.

```gaml
species bug {
     int size <- rnd(100);
	
      aspect circle {
          draw circle(2) color: #blue;
      }
}
```

### circle vs square / sphere vs cube

Note that in OpenGL (3D) and Java2D (2D), the two rendering subsystems used in GAMA, creating and drawing a circle geometry is more time consuming than creating and drawing a square (or a rectangle). In the same way, drawing a sphere is more time consuming than drawing a cube. Hence, if you want to optimize your model displays and if the rendering does not explicitly need "rounded" agents, try to use squares/cubes rather than circles/spheres.

### OpenGL refresh facets

In OpenGL display, it is possible to specify that it is not necessary to refresh a layer with the facet **`refresh`**. If in a species, the properties used for visualization (location, shape or color) are never modified, you can set **`refresh`** to false. Example:

```gaml
display city_display_opengl type: opengl{
     species building aspect: base refresh: false;
     species road aspect: base refresh: false;
     species people aspect: base;
}
```

## Manipulating containers and species

Manipulating containers (lists, maps etc.) and agents are usually the core of a model and the most critical parts of the code in terms of performances.

### parallel

It is possible to execute the reflexes of agents of a species in parallel threads. This can greatly improve the execution time of a model as by default agents are executed one after another. To activate parallel execution of agents you just need to set the `parallel` facet of the `species` (or `grid`) to true:

```gaml
species dummy_species parallel:true{

}
grid my_grid parallel:true{

}
```

> [!Note]
> By default this option is not activated because we **cannot guaranty the reproducibility of an experiment** if it is. It implies that we do not know in advance which agent is going to be executed first, this also means that if your agents are meant to be executed in a certain order, this could break your model.

Take for example this model where each cell of a grid has an effect on its neighbouring cells ,here disabling them, each disabled cell will be represented by the red color and enabled cells by the green color:

```gaml
model parallel

grid my_grid parallel:false width:5 height:5 {
	
	bool to_be_executed <- true;
	rgb color <- #green update:to_be_executed ? #green : #red;
	reflex cancel_neighbours {
		if to_be_executed{
			write "I am cell '" + name + "' and my reflexes are executed";
			loop c over:neighbors{
				c.to_be_executed <- false;
			}			
		}
		to_be_executed <- true; // we reset for the next cycle
	}
}

experiment a {
	
	output{
		display main type:2d antialias:false{			
			grid my_grid border:#black;
		}
		
	}
}
```

With parallel set to `false` (the default) the order of execution of each cell is always the same and can be predicted to yield this display after the first cycle:

![image](https://github.com/user-attachments/assets/8f968b7c-930f-4f15-a03d-260432417a39)

But if you change its value to `true` you can end up with this:

![image](https://github.com/user-attachments/assets/6a8c0f96-c71d-4a0f-bce4-bfef87cb7375)
And it can change every cycle (or not) and there's no way to know in advance how it's going to look.

### Iterating over containers

In gama there are multiple ways of iterating over containers and agents:
* the `ask` statement to iterate over agents
* the `loop` statement to iterate over anything, with its multiple syntaxes:
  * `times` iterates a certain number of times
  * `over` iterates directly over a list
  * `from` and `to` provide an index to iterate in a range of values
  * `until` iterates until a certain condition is met
* the different container operators (such as `collect` or `where`) provide shortcuts for generic list manipulation tasks

In general the specialized operators (see [this page](OperatorsAA#containers-related-operators) in the documentation for the full list) are way more efficient, followed by `ask` and the loop `over`, then comes the other loop syntaxes.
So as a general rule of thumb you should **use as much as possible the container-related operators** instead of the generic `loop` and `ask` statements.
Here is an example model that showcases the difference in execution time of the different methods to sum the value of a property of all the agents in the simulation:

```gaml
model accessinglistitems

global{
	int nb_agents <- 50000;	
}

species b{
	
	int v;
	
	init {
		v <- rnd(0, 10);
	}
}

experiment e {

	parameter "number of agents" var:nb_agents;

	reflex fill_list_from_agents {
		
		write "Start benchmarking with " + nb_agents + " agents";
		
		// we reset the agents
		ask b{
			do die;
		}
		create b number:nb_agents;
		
		int s1 <- 0;
		benchmark "sum with loop over" repeat:100{
			s1 <- 0;
			loop obj over:b{
				s1 <- s1 + obj.v;
			}
		}
		
		int s2 <- 0;
		benchmark "sum with loop from to" repeat:100{
			int to <- length(b)-1;
			s2 <- 0;
			loop i from:0 to:to{
				s2 <- s2 + b[i].v;
			}
		}
		
		int s3 <- 0;
		benchmark "sum with loop times" repeat:100{
			int to <- length(b);
			int i <- 0;
			s3 <- 0;
			loop times:to{
				s3 <- s3 + b[i].v;
				i <- i + 1;
			}
		}
		
		int s4 <- 0;
		benchmark "sum with ask"  repeat:100{
			s4 <- 0;
			ask b{
				s4 <- s4 + v;
			}
		}
		
		int s5 <- 0;
		benchmark "sum with collect" repeat:100{
			s5 <- sum(b collect (each.v));
		}
		
		// we check that all methods yield the same result
		assert s1 = s2;
		assert s2 = s3;
		assert s3 = s4;
		assert s4 = s5;
		
	}
}
```

Which gives results similar to this:

![image](https://github.com/user-attachments/assets/6baa35bb-0dc6-4957-bcc8-b59827c3545c)


## Big string manipulation

String manipulation, and especially concatenation (adding two strings together) is harmless for performances in normal condition, but once strings become big enough (thousands of characters), every operation becomes extremely costly. Moreover, the execution time of concatenation seem to be an exponential function of the size of the string.
Take for example this model:

```gaml
model stringconcat

experiment test {
	
	reflex concat {
		string s;
		int nb_concat <- 100;
		loop times:nb_concat{
			s <- s + rnd(0,10);
		}
		
	}
}
```

We are simply concatenating random digits into a string, ending up with a 100 character string.
So far so good, this is good enough and works flawlessly on most machines. Now change `nb_concat` to `100000` and the operation starts to be non-negligible (for example it takes more than half a second on my computer).
We can modify a bit the model to have a more precise idea of how long it takes, and let's check how long it would take to compute 200 000 and 300 000 concatenations:

```gaml
model stringconcat

experiment test {
	
	
	action concatenate_string(int nb){
		string s <- '';			
		loop times:nb{
			s <- s + rnd(0,10);
		}
	}
	reflex concat {
		
		benchmark "concatenating 100 000 times" repeat:10  {
			do concatenate_string(100000);			
		}
		
		benchmark "concatenating 200 000 times" repeat:10  {
			do concatenate_string(200000);			
		}
		
		benchmark "concatenating 300 000 times" repeat:10  {
			do concatenate_string(300000);			
		}
		
	}
}
```

With that model you should notice that 200 000  characters is significantly slower than 100 000, in my case it was more than 4 times slower, and 300 000 even more as it was almost 10 times slower. Results on my computer looked like this:

|number of concatenations|100 000 characters|200 000 characters|300 000 characters|
|---:|:---:|:---:|:---:|
|**duration**|619 ms| 2563 ms | 5749 ms|

![image](https://github.com/user-attachments/assets/fd31d76a-875b-4bd3-9e36-ce19aa7c3f11)

This can be particularly annoying because creating big string is itself a way to optimize outputing data from a model (it is often faster to write a big string once than small strings many times).

To help with string concatenation, it is advised to use the [concatenate](OperatorsBC#concatenate) operator: instead of concatenating many times your text into one string, append each small string into a list of string, and when all the component are collected, merge them only once with the operator.
Let's modify the previous model to see how it works:

```gaml
model stringconcat

experiment test {
	
	
	action concatenate_string(int nb){
		list<string> list_strings <- [];			
		loop times:nb{
			list_strings <+ string(rnd(0,10));
		}
		string s <- concatenate(list_strings);
	}
	reflex concat {
		
		benchmark "concatenating 100 000 times" repeat:10  {
			do concatenate_string(100000);			
		}
		
		benchmark "concatenating 200 000 times" repeat:10  {
			do concatenate_string(200000);			
		}
		
		benchmark "concatenating 300 000 times" repeat:10  {
			do concatenate_string(300000);			
		}
		
	}
}
```

On the same computer as in the previous example I get those results:
|number of concatenations|100 000 characters|200 000 characters|300 000 characters|
|---:|:---:|:---:|:---:|
|**duration**|15 ms| 35 ms| 45 ms|

Now let's compare them:

|number of concatenations|100 000 characters|200 000 characters|300 000 characters|
|---:|:---:|:---:|:---:|
|**duration initial approach**|619 ms| 2563 ms| 5749 ms|
|**duration using concatenate**|15 ms| 35 ms| 45 ms|

![image](https://github.com/user-attachments/assets/8a02a277-6f96-404a-ad0d-01df23bc3696)

Not only it is orders of magnitude faster, but it is also growing linearly instead of exponentially which is more sustainable in case I want to concatenate even bigger strings in the future.

## Threads

Since GAMA 1.9.1, a new skill has been added to implement [threads](BuiltInSkills#thread) in agents. The idea is not to give full control of threads to parallelize operations inside the simulation (though this could be achieved too), but to provide a way to communicate with the outside without blocking the execution of your simulation.
GAMA simulation running mostly on one thread, having some heavy asynchronous operation running in a separate thread could greatly improve the simulation time, for example you can use threads to push the state of your simulation to an external web API every 10 minutes.

> [!Note]
> Using threads to interact with your simulation could completely break its reproducibility in a similar way as it is explained in [the parallel section](#parallel). 
