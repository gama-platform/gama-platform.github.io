---
title:  Introduction to GAMA Java API
---


This introduction to the Java API is dedicated to programmers that want to participate in the java code of GAMA. The main purpose is to describe the main packages and classes of the API to makes it simple to find such crucial information such as: how GAMA create containers, agent and geometries, how exceptions and log are managed, how java code maintain Type safety, etc. 

## Table of content

[Concepts](#Concepts)

1. [Factories](#Factories)
2. [Spatial](#Spatial)
3. [Type](#Type)
4. [IScope](#IScope)
5. [Exception](#Exception)
6. [Debug](#Debug)
7. [Test](#Test)

[Packages](#Packages)

* 1.[Core](#Core)


***
***

##  Factories

### Container factories

GAMA provides 2 factories for containers: `GamaListFactory` and `GamaMapFactory`. Each of them has `create` methods to create objects of type `IList` and `IMap`. The types of elements in the container can be specified at creation using one of the elements defined in [`Types`](https://github.com/gama-platform/gama/blob/master/msi.gama.core/src/msi/gaml/types/Types.java). 

Warning: the `create` method is used to create the container, with elements of a given type, **but it also converts elements added in this type**. To avoid conversion (not recommended), use the method `createWithoutCasting`.

1. GamaListFactory : factory to create list of different type (see [Java class](https://github.com/gama-platform/gama/blob/master/msi.gama.core/src/msi/gama/util/GamaListFactory.java)) 

As an example:
```
IList&lt;Double> distribution = GamaListFactory.create(Types.FLOAT);
```

To create `List` object without specifying the type, use `Types.NO_TYPE`:
```
IList&lt;Object> result = GamaListFactory.create(Types.NO_TYPE);
```
or only:
```
IList&lt;Object> result = GamaListFactory.create();
```


2. GamaMapFactory : factory to create map of different type (see [Java class](https://github.com/gama-platform/gama/blob/master/msi.gama.core/src/msi/gama/util/GamaMapFactory.java)) 

As an example:
```
final IMap&lt;String, IList<?>> ncdata = GamaMapFactory.create(Types.STRING, Types.LIST);
```

To create `Map` object without specifying the type, use `Types.NO_TYPE`:
```
IMap&lt;Object, Object> result = GamaMapFactory.create(Types.NO_TYPE, Types.NO_TYPE);
```
or only:
```
IMap&lt;Object, Object> result = GamaMapFactory.create();
```

If you want to use map or set, try to the best to rely on collection that ensure order, so to avoid unconsistency in container access. Try the most to avoid returning high order hash based collection, e.g. Set or Map; in this case, rely on standard definition in Gama:  

3. TOrderedHashMap : see [trove api](https://bitbucket.org/trove4j/trove/src/master/core/src/main/java/gnu/trove/map/).
4. TLinkedHashSet : see [trove api](https://bitbucket.org/trove4j/trove/src/master/core/src/main/java/gnu/trove/set/hash/)

5. Stream : you can use java build-in streams but there is a special version in Gama taken from [StreamEx](https://github.com/amaembo/streamex) that should be preferred.

```
my_container.stream(my_scope)
```

If you want to get a stream back to a Gama container, you can use the collector in Factories:

```
my_container.stream(my_scope).collect(GamaListFactory.toGamaList())
```

### Geometry factory
Gama geometry is based on the well established Jstor geometric library, while geographic aspect are handle using GeoTools library

1. Spatial.Creation : provide several static method to initialize geometries
2.

## Spatial

The Spatial class provide several static access to the main methods to create, query, manipulate and transform geometries

### Operators 

Use as `Spatial.Operators` follow by the operator, usually one of Gaml language:

[union](OperatorsSZ#union), intersection, minus, and other cross geometry operations

### Queries 

closest, distance, overlapping, and other relative spatial relationship

### Transpositions 

enlarge, transpose, rotate, reduce and other specific transposition (like triangulation, squarification, etc.)

### Punctal 

operations relative to points

## Type

`IType`: The main class to manipulate GamaType (main implementation of IType) is [Types](https://github.com/gama-platform/gama/blob/master/msi.gama.core/src/msi/gaml/types/Types.java), that provides access to most common type manipulated in Gama

Opérateur de cast: 
```
Types.get(IType.class)
```

## IScope interface

An object of type IScope represents the context of execution of an agent (including experiments, simulations, and "regular" agents). Everywhere it is accessible (either passed as a parameter or available as an instance variable in some objects), it provides an easy access to a number of features: the current active agent, the shared random number generator, the global clock, the current simulation and experiment agents, the local variables declared in the current block, etc.

It also allows modifying this context, like changing values of local variables, adding new variables, although these functions should be reserved to very specific usages. Ordinarily, the scope is simply passed to core methods that allow to evaluate expressions, cast values, and so on.

### Use of an IScope

A variable `scope` of type `IScope` can be used to:
  * get the current agent with: `scope.getAgentScope()`
```
IAgent agent = scope.getAgentScope();
```
  * evaluate an expression in the current scope:
```
String mes = Cast.asString(scope, message.value(scope));
```
  * know whether the scope has been interrupted:
```
boolean b = scope.interrupted();
```

## Exception

[Exceptions](https://github.com/gama-platform/gama/tree/master/msi.gama.core/src/msi/gama/runtime/exceptions) in GAMA

An exception that can appear in the GAMA platform can be run using the `GamaRuntimeException` class. This class allows throwing an error (using `error(String,IScope)` method) or a warning (using `warning(String,IScope)` method). 

In particular, it can be useful to catch the Java Exception and to throw a GAMA exception.

```
try {
        ...
} catch(Exception e) {
	throw GamaRuntimeException.error("informative message", scope);
}
```

## Debug

Main class for debug is in ummisco.gama.dev.utils : [DEBUG](https://github.com/gama-platform/gama/tree/master/ummisco.gama.annotations/src/ummisco/gama/dev/utils) 

- To turn GAMA Git version to debug mode change variable of the Debug class like: `GLOBAL_OFF = false`

- Turn on or off the debug for one class: `DEBUG.ON()` or `DEBUG.OFF()`

- You can benchmark a method call using : `DEBUG.TIME("Title to log", () -> methodToBenchmark(...))`

- You can use different built-in level to print: `DEBUG.ERR(string s)` `DEBUG.LOG(string s)` `DEBUG.OUT(Object message)`

## Test

There are Gaml primitives and statement to define test:

```
test "Operator + (1)" {
	assert (circle(5) + 5).height with_precision 1 = 20.0;
	assert (circle(5) + 5).location with_precision 9 = (circle(10)).location with_precision 9;
}
```

Everything can be made using Java Annotation (translated to Gaml test) : 

```
examples = { @example (value="...",equals="..." )  }
test = { "..." } // don't forget to turn test arg of examples to false
```

***
***

## Core

The main plugin of the GAMA Platform that defines the core functionalities: most Gaml operators, statements, skills, types, etc.

### Metamodel
***
`IAgent`, `IPopulation`, `IShape`, `ITopology`, 

### Ouputs
***

### Util
***

1. Randomness in Gama: [msi.gama.util.random](https://github.com/gama-platform/gama/tree/master/msi.gama.core/src/msi/gama/util/random)

GamaRND is the main class that implements Random java class. It has several implementations and is mainly used with RandomUtils that define all the Gaml random operators

2. Graph in Gama:

3. File in Gama:

### Operators
The packages where you can find all the operators defined in the core of Gama 
