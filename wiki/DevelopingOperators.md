---
layout: default
title:  Developing Operators
wikiPageName: DevelopingOperators
wikiPagePath: wiki/DevelopingOperators.md
---

# Developing Operators



[Operators](Operators) in the GAML language are used to compose complex expressions. An operator performs a function on one, two, or n operands (which are other expressions and thus may be themselves composed of operators) and returns the result of this function. Developing a new operator allows, then, to add a new function to GAML.






## Implementation

A new operator can be **any Java method** that:
  * begins by the [@operator](DevelopingIndexAnnotations#@operator) (other fields can be added to the annotation): `@operator(value = "name_of_the_operator_gaml")`,
```
@operator(value = "rgb")
public static GamaColor rgb(final int r, final int g, final int b, final double alpha) {	
```

The method:
  * must return a value (that has to be one of the GAMA Type: Integer, Double, Boolean, String, IShape, IList, IGraph, IAgent...),
  * can define any number of parameters, defined using Java type,
  * can be either static or non-static:
    * in the case it is static, the number of parameters (except an IScope attribute) of the method is equal to the number of operands of the GAML operator.
    * in the case it is not static, a first operand is added to the operator with the type of the current class.
  * can have a IScope parameter, that will be taken into account as operand of the operator.






## Annotations
### @operator
This annotation represents an "operator" in GAML, and is used to define its name(s) as well as some meta-data that will be used during the validation process.

This annotation contains:
  * **value** (set of string, empty by default): _names of the operator_.
  * **content\_type** (integer) : _if the operator returns a container, type of elements contained in the container_
  * **can\_be\_const** (boolean, false by default): _if true: if the operands are constant, returns a constant value_.
  * **category** (set of string, empty by default): _categories to which the operator belong (for documentation purpose)_.
  * **doc** (set of @doc, empty by default): _the documentation attached to this operator._

### @doc
It provides a unified way of attaching documentation to the various GAML elements tagged by the other annotations. The documentation is automatically assembled at compile time and also used at runtime in GAML editors.
  * **value** (String, "" by default): _a String representing the documentation of a GAML element_.
  * **deprecated** (String, "" by default): _a String indicating (if it is not empty) that the element is deprecated and defining, if possible, what to use instead_.
  * **returns** (String, "" by default): _the documentation concerning the value(s) returned by this element (if any)._.
  * **comment** (String, "" by default): _an optional comment that will appear differently from the documentation itself_.
  * **special\_cases** (set of Strings, empty by default): _an array of String representing the documentation of the "special cases" in which the documented element takes part_.
  * **examples** (set of Strings, empty by default): _an array of String representing some examples or use-cases about how to use this element_.
  * **see** (set of Strings, empty by default): _an array of String representing cross-references to other elements in GAML_.

All these annotations are defined in the `GamlAnnotations.java` file of the `msi.gama.processor` plug-in.
