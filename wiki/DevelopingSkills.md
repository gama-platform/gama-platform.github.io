---
layout: default
title: Developing a New Skill
wikiPageName: DevelopingSkills
wikiPagePath: wiki/DevelopingSkills.md
---
# Developing a New Skill



A skill adds new features (attributes) and new capabilities (actions) to the instances of the species that use it.





## Defining the class

A Skill is basically a **singleton** and **stateless** Java class that:
  * extends the abstract class `Skill`,
  * begins by the annotation [@skill](DevelopingIndexAnnotations#@skill): `@skill(name = "name_of_the_skill_in_gaml")`.

Note: GAMA annotations are classes defined into the `msi.gama.precompiler.GamlAnnotations` class.





## Defining new attributes

To add new attributes to the species that declares this skill, developers have to define them before the class using the [@vars](DevelopingIndexAnnotations#@vars) and `@variable` annotations.
The `@vars` annotation contains a set of `@variable` elements.

In a [@variable](DevelopingIndexAnnotations#@variable) element, one has to define the name, the type and the default value of the attribute. For example in MovingSkill:
```
@vars({
  @variable(name = IKeyword.SPEED, type = IType.FLOAT, init = "1.0"),
  @variable(name = IKeyword.HEADING, type = IType.INT, init = "rnd(359)")
})
```

In order to detail how to access these new attributes (if needed), developers have to define a getter (using `@getter`) and a setter (using `@setter`) methods.
If no getter (and setter) is defined, the attribute can nevertheless be set and get, using implicit by default getter and setter. But as soon as a getter and/or a setter is defined, they replace the implicit default ones.
For example:
```
@getter(IKeyword.SPEED)
public double getSpeed(final IAgent agent) {
    return (Double) agent.getAttribute(IKeyword.SPEED);
}

@setter(IKeyword.SPEED)
public void setSpeed(final IAgent agent, final double s) {
    agent.setAttribute(IKeyword.SPEED, s);
}
```





## Defining new actions
An action (also called `primitive`) is basically a Java method that can be called from the GAML language using the same syntax as the one used for calling actions defined in a model. The method should be annotated with `@action`, supplying the name of the action as it will be available in GAML.

The developer can also define parameters for this action using the annotation `@arg` will a set of parameters names. For example, the action `goto` of the MovingSkill is defined as follows:
```
@action(name="goto", args={ 
    @arg(name = "target", type = { IType.AGENT, IType.POINT,IType.GEOMETRY }, optional = false),
    @arg(name = IKeyword.SPEED, type = IType.FLOAT, optional = true),
    @arg(name = "on", type = { IType.GRAPH }, optional = true)
    }
)

public IPath primGoto(final IScope scope) throws GamaRuntimeException {
...
}
```
It is called in GAMA models with:
```
do goto (target: the_target, on: the_graph);
```
or
```
path path_followed <- self goto (target: the_target, on: the_graph, return_path: true);
```





### Access to parameters in actions
To get the value of the arguments passed in GAML to the Java code, two methods can be useful:
  * `scope.hasArg("name_of_argument")` returns a boolean value testing whether the argument "name\_of\_argument" has been defined by the modeler, since all the arguments to actions should be considered as optional.
  * `getArg(name_arg,IType)`, `getFloatArg(name_param_of_float)`, `getIntArg(name_param_of_int)` and their variants return the value of the given parameter using a given (or predefined) type to cast it.





### Warnings
Developers should notice that:
  * the method associated with an action has to return a non-void object.
  * the method should have only one parameter: the scope (type IScope).
  * the method can only throw `GamaRuntimeException`s. Other exceptions should be caught in the method and wrapped in a `GamaRuntimeException` before being thrown.





## Annotations
### @skill
This annotations Allows to define a new skill (class grouping variables and actions that can be used by agents).

This annotation contains:
  * **name** (String): _a String representing the skill name in GAML (must be unique throughout GAML)_.
  * **attach\_to** (set of strings): _an array of species names to which the skill will be automatically added (complements the "skills" parameter of species)_.
  * **internal** (boolean, false by default): _return whether this skill is for internal use only_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the skill_.


### @variable
This annotations is used to describe a single variable or field.

This annotation contains:
  * **name** (String): _the name of the variable as it can be used in GAML_.
  * **type** (int): _The textual representation of the type of the variable (see IType)_.
  * **of** (int, 0 by default): _The textual representation of the content type of the variable (see IType#defaultContentType())_.
  * **index** (int, 0 by default): _The textual representation of the index type of the variable (see IType#defaultKeyType())_.
  * **constant** (int, false by default): _returns whether or not this variable should be considered as non modifiable_.
  * **init** (String, "" by default): _the initial value of this variable as a String that will be interpreted by GAML_.
  * **depend\_on** (set of Strings, empty by default): _an array of String representing the names of the variables on which this variable depends (so that they are computed before)_.
  * **internal** (boolean, false by default): _return whether this var is for internal use only_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the variable_.

### @doc
It provides a unified way of attaching documentation to the various GAML elements tagged by the other annotations. The documentation is automatically assembled at compile time and also used at runtime in GAML editors.
  * **value** (String, "" by default): _a String representing the documentation of a GAML element_.
  * **deprecated** (String, "" by default): _a String indicating (if it is not empty) that the element is deprecated and defining, if possible, what to use instead_.
  * **returns** (String, "" by default): _the documentation concerning the value(s) returned by this element (if any)._.
  * **comment** (String, "" by default): _an optional comment that will appear differently from the documentation itself_.
  * **special\_cases** (set of Strings, empty by default): _an array of String representing the documentation of the "special cases" in which the documented element takes part_.
  * **examples** (set of Strings, empty by default): _an array of String representing some examples or use-cases about how to use this element_.
  * **see** (set of Strings, empty by default): _an array of String representing cross-references to other elements in GAML_.

### @getter
This annotations is used to indicate that a method is to be used as a getter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:
  * **value** (String): the name of the variable for which the annotated method is to be considered as a getter.
  * **initializer** (boolean, false by default): returns whether or not this getter should also be used as an initializer

### @setter
This annotations is used to indicate that a method is to be used as a setter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:
  * **value** (String): the name of the variable for which the annotated method is to be considered as a setter.

### @action
This annotations is used to tag a method that will be considered as an action (or primitive) in GAML.
The method must have the following signature: ```
Object methodName(IScope) throws GamaRuntimeException ``` and be contained in a class annotated with @species or @skill (or a related class, like a subclass or an interface).

This annotation contains:
  * **name** (String): _the name of the variable as it can be used in GAML_.
  * **virtual** (boolean, false by default): _if true the action is virtual, i.e. equivalent to abstract method in java_.
  * **args** (set of arg, empty by default): _the list of arguments passed to this action. Each argument is an instance of arg_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the action_.

### @arg
This annotations describes an argument passed to an action.

This annotation contains:
  * **name** (String, "" by default): _the name of the argument as it can be used in GAML_.
  * **type** (set of ints, empty by default): _An array containing the textual representation of the types that can be taken by the argument (see IType)_.
  * **optional** (boolean, true by default): _whether this argument is optional or not_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the argument._



All these annotations are defined in the `GamlAnnotations.java` file of the `msi.gama.processor` plug-in.
