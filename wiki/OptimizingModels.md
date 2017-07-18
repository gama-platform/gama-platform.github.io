---
layout: default
title: Optimizing Models
wikiPageName: OptimizingModels
wikiPagePath: wiki/OptimizingModels.md
---
[//]: # (startConcept|optimizing_tips)
[//]: # (keyword|concept_optimization)
# Optimizing Models


This page aims at presenting some tips to optimize the memory footprint or the execution time of a model in GAMA.

_Note:  since GAMA 1.6.1, some optimizations have become obsolete because they have been included in the compiler. They have, then, been removed from this page. For instance, writing 'rgb(0,0,0)' is now compiled directly as '#black'._


## Table of contents 

* [machine_time](#machinetime)
* [Scheduling](#scheduling)
* [Grid](#grid)
	* [Optimization Facets](#optimization-facets)
		* [use_regular_agents](#useregularagents)
		* [use_individual_shapes](#useindividualshapes)
* [Operators](#operators)
	* [List operators](#list-operators)
		* [first_with](#firstwith)
		* [where / count](#where--count)
	* [Spatial operators](#spatial-operators)
		* [container of agents in closest_to, at_distance, overlapping, inside](#container-of-agents-in-closestto-atdistance-overlapping-inside)
		* [Accelerate  with a first spatial filtering](#accelerate--with-a-first-spatial-filtering)
* [Displays](#displays)
	* [shape](#shape)
	* [circle vs square / sphere vs cube](#circle-vs-square--sphere-vs-cube)
	* [OpenGL refresh facets](#opengl-refresh-facets)



[//]: # (keyword|attribute_machine_time)
## machine\_time

In order to optimize a model, it is important to exactly know which part of the model take times. The simplest to do that is to use the **machine\_time** built-in global variable that gives the current time in milliseconds. Then to compute the time taken by a statement, a possible way is to write:

```
float t <- machine_time;
// here a block of instructions that you consider as "critical"
// ...
write "duration of the last instructions: " + (machine_time - t);
```



[//]: # (keyword|concept_scheduler)
## Scheduling

If you have a species of agents that, once created, are not supposed to do anything more (i.e. no behavior, no reflex, their actions triggered by other agents, their attributes being simply read and written by other agents), such as a "data" grid, or agents representing a "background" (from a shape file, etc.), consider using the `schedules: []` facet on the definition of their species. This trick allows to tell GAMA to not schedule any of these agents.

```
grid my_grid height: 100 width: 100 schedules: [] 
{
      ...
}
```

The `schedules:` facet is dynamically computed (even if the agents are not scheduled), so, if you happen to define agents that only need to be scheduled every x cycles, or depending on a condition, you can also write `schedules:` to implement this. For instance, the following species will see its instances scheduled every 10 steps and only if a certain condition is met:

```
species my_species schedules: (every 10) ? (condition ? my_species : []) : [] 
{
     ...
}
```

In the same way, modelers can use the frequency facet to define when the agents of a species are going to be activated. By setting this facet to 0, the agents are never activated.
```
species my_species frequency: 0
{
     ...
}
```


[//]: # (keyword|concept_grid)
## Grid

### Optimization Facets
In this section, we present some facets that allow to optimize the use of grid (in particular in terms of memories). Note that all these facet can be combined (see the Life model from the Models library).

#### use\_regular\_agents
If false, then a special class of agents is used. This special class of agents used less memories but has some limitation: the agents cannot inherit from a "normal" species, they cannot have sub-populations, their name cannot be modified, etc.
```
grid cell width: 50 height: 50 use_regular_agents: false ;
```

#### use\_individual\_shapes
If false, then only one geometry is used for all agents. This facet allows to gain a lot of memory, but should not be used if the geometries of the agents are often activated (for instance, by an aspect).

```
grid cell width: 50 height: 50 use_individual_shapes: false ;	
```


## Operators

### List operators
[//]: # (keyword|operator_first_with)
[//]: # (keyword|operator_shuffle)
[//]: # (keyword|one_of)
#### first\_with
It is sometimes necessary to randomly select an element of a list that verifies a certain condition.
Many modelers use the **one\_of** and the **where** operators to do this:
```
bug one_big_bug <- one_of (bug where (each.size > 10));
```
Whereas it is often more optimized to use the **shuffle** operator to shuffle the list, then the **first\_with** operator to select the first element that verifies the condition:
```
bug one_big_bug <- shuffle(bug) first_with (each.size > 10);
```
[//]: # (keyword|operator_where)
[//]: # (keyword|operator_count)
#### where / count
It is quite common to want to count the number of elements of a list or a container that verify a condition.
The obvious to do it is :
```
int n <- length(my_container where (each.size > 10));
```
This will however create an intermediary list before counting it, and this operation can be time consuming if the number of elements is important. To alleviate this problem, GAMA includes an operator called **count** that will count the elements that verify the condition by iterating directly on the container (no useless list created) :
```
int n <- my_container count (each.size > 10);
```
### Spatial operators
[//]: # (keyword|operator_closest_to)
[//]: # (keyword|operator_at_distance)
[//]: # (keyword|operator_overlapping)
[//]: # (keyword|operator_inside)
#### container of agents in closest\_to, at\_distance, overlapping, inside
Several spatial query operators (such as **closest\_to**, **at\_distance**, **overlapping** or **inside**) allow to restrict the agents being queried to a container of agents. For instance, one can write:
```
agent closest_agent <- a_container_containing_agents closest_to self;
```
This expression is formally equivalent to :
```
agent closest_agent <- a_container_containing_agent with_min_of (each distance_to self);
```
But it is much faster **if your container is large**, as it will query the agents using a spatial index (instead of browsing through the whole container). Note that in some cases, when you have a small number of agents, the first syntax will be faster. The same applies for the other operators. 

Now consider a very common case: you need to restrict the agents being queried, not to a container, but to a species (which, actually, acts as a container in most cases). For instance, you want to know which predator is the closest to the current agent. If we apply the pattern above, we would write:
```
predator closest_predator <- predator with_min_of (each distance_to self);
```
or
```
predator closest_predator <- list(predator) closest_to self;
```

But these two operators can be painfully slow if your species has many instances (even in the second form). In that case, always prefer using **directly** the species as the left member:
```
predator closest_ predator <- predator closest_to self;
```
Not only is the syntax clearer, but the speed gain can be phenomenal because, in that case, the list of instances is not used (we just check if the agent is an instance of the left species).

However, what happens if one wants to query instances belonging to 2 or more species ? If we follow our reasoning, the immediate way to write it would be (if predator 1 and predator 2 are two species):
```
agent closest_agent <- (list(predator1) + list(predator2)) closest_to self; 
```
or, more simply:
```
agent closest_agent <- (predator1 + predator2) closest_to self;
```
The first syntax suffers from the same problem than the previous syntax: GAMA has to browse through the list (created by the concatenation of the species populations) to filter agents. The solution, then, is again to use directly the species, as GAMA is clever enough to create a temporary "fake" population out of the concatenation of several species, which can be used exactly like a list of agents, but provides the advantages of a species population (no iteration made during filtering).

#### Accelerate **closest\_to** with a first spatial filtering
The **closest\_to** operator can sometimes be slow if numerous agents are concerned by this query. If the modeler is just interested by a small subset of agents, it is possible to apply a first spatial filtering on the agent list by using the **at\_distance** operator.
For example, if the modeler wants first to do a spatial filtering of 10m:
```
agent closest_agent <- (predator1 at_distance 10) closest_to self;
```

To be sure to find an agent, the modeler can use a test statement:
```
agent closest_agent <- (predator1 at_distance 10) closest_to self;
if (closest_agent = nil) {closest_agent  <- predator1 closest_to self;}
```




[//]: # (keyword|concept_display)
## Displays

[//]: # (keyword|concept_geometry)
[//]: # (keyword|concept_shape)
[//]: # (keyword|statement_draw)
### shape
It is quite common to want to display an agent as a circle or a square. A common mistake is to mix up the shape to draw and the geometry of the agent in the model. If the modeler just wants to display a particular shape, he/she should not modify the agent geometry (which is a point by default), but just specify the shape to draw in the agent aspect.

```
species bug {
     int size <- rnd(100);
	
      aspect circle {
          draw circle(2) color: °blue;
      }
}
```

[//]: # (keyword|operator_circle)
[//]: # (keyword|operator_sphere)
[//]: # (keyword|operator_rectangle)
[//]: # (keyword|operator_cube)
### circle vs square / sphere vs cube
Note that in OpenGL and Java2D (the two rendering subsystems used in GAMA), creating and drawing a circle geometry is more time consuming than creating and drawing a square (or a rectangle). In the same way, drawing a sphere is more time consuming than drawing a cube. Hence, if you want to optimize your model displays and if the rendering does not explicitly need "rounded" agents, try to use squares/cubes rather than circles/spheres.

[//]: # (keyword|concept_opengl)
[//]: # (keyword|concept_refresh)
### OpenGL refresh facets
In OpenGL display, it is possible to specify that it is not necessary to refresh a layer with the facet **refresh**. If a species of agents is never modified in terms of visualization (location, shape or color), you can set **refresh** to false. Example:
```
display city_display_opengl type: opengl{
     species building aspect: base refresh: false;
     species road aspect: base refresh: false;
     species people aspect: base;
}
```
[//]: # (endConcept|optimizing_tips)
