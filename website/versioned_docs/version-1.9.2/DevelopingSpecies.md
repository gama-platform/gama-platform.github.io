---
title:  Developing Species
---




Additional [built-in species](BuiltInSpecies) can be defined in Java in order to be used in GAML models. Additional attributes and actions can be defined. It could be very useful in order to define its behavior thanks to external libraries (e.g. [database connection](https://github.com/gama-platform/gama/wiki/UsingDatabase)...).

A new built-in species extends the `GamlAgent` class, which defines the basic GAML agents. As a consequence, new built-in species have all the attributes (`name`, `shape`, ...) and actions (`die`...) of [regular species](https://github.com/gama-platform/gama/wiki/RegularSpecies).






## Implementation

A new species can be **any Java class** that:

  * extends the `GamlAgent` class,
  * begins by the [@species](DevelopingIndexAnnotations#@species): `@species(name = "name_of_the_species_gaml")`,
```
@species(name = "multicriteria_analyzer")
public class MulticriteriaAnalyzer extends GamlAgent {
```

[Similarly to skills](DevelopingSkills), a species can define additional attributes and actions.

### Additional attributes

Defining new attributes needs:

  * to add [@vars](DevelopingIndexAnnotations#@vars) (and one embedded [@variable](DevelopingIndexAnnotations#@variable) per additional attribute) annotation on top of the class,
  * to define [@setter](DevelopingIndexAnnotations#@setter) and [@getter](DevelopingIndexAnnotations#@getter) annotations to the accessors methods.

For example, regular species are defined with the following annotation:
```
@vars({ @variable(name = IKeyword.NAME, type = IType.STRING), @variable(name = IKeyword.PEERS, type = IType.LIST),
	@variable(name = IKeyword.HOST, type = IType.AGENT),
	@variable(name = IKeyword.LOCATION, type = IType.POINT, depends_on = IKeyword.SHAPE),
	@variable(name = IKeyword.SHAPE, type = IType.GEOMETRY) })
```

And accessors are defined using:
```
@getter(IKeyword.NAME)
public abstract String getName();

@setter(IKeyword.NAME)
public abstract void setName(String name);
```

### Additional actions

An additional action is a method annotated by the [@action](DevelopingIndexAnnotations#@action) annotation.
```
@action(name = ISpecies.stepActionName)
public Object _step_(final IScope scope) {
```






## Annotations
### @species
This annotation represents a "species" in GAML. The class annotated with this annotation will be the support of a species of agents.

This annotation contains:

  * **name** (string): _the name of the species that will be created with this class as base. Must be unique throughout GAML_.
  * **skills** (set of strings, empty by default): _An array of skill names that will be automatically attached to this species._ Example: ```
 @species(value="animal" skills={"moving"}) ```
  * **internal** (boolean, false by default): _whether this species is for internal use only_.
  * **doc** (set of @doc, empty by default): _the documentation attached to this operator._

All these annotations are defined in the `GamlAnnotations.java` file of the `msi.gama.processor` plug-in.
