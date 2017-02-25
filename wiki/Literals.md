---
layout: default
title: Literals
wikiPageName: Literals
wikiPagePath: wiki/Literals.md
---

# Literals



_(some literal expressions are also described in [data types](DataTypes))_

A literal is a way to specify an unnamed constant value corresponding to a given data type. GAML supports various types of literals for often — or less often — used data types.

## Table of contents 

* [Literals](#literals)
	* [Simple Types](#simple-types)
	* [Literal Constructors](#literal-constructors)
	* [Universal Literal](#universal-literal)




## Simple Types
Values of simple (i.e. not composed) types can all be expressed using literal expressions. Namely:

  * **bool**: `true` and `false`.
  * **int**: decimal value, such as `100`, or hexadecimal value if preceded by `'#'` (e.g. `#AAAAAA`, which returns the int `11184810`)
  * **float**: the value in plain digits, using `'.'` for the decimal point (e.g. `123.297`)
  * **string**: a sequence of characters enclosed between quotes (`'my string'`) or double quotes (`"my string"`)




## Literal Constructors
Although they are not strictly literals in the sense given above, some special constructs (called _literal constructors_) allow the modeler to declare constants of other data types. They are actually [operators](Operators) but can be thought of literals when used with constant operands.

  * **pair**: the key and the value separated by `::` (e.g. `12::'abc'`)
  * **list**: the elements, separated by commas, enclosed inside square brackets (e.g. `[12,15,15]`)
  * **map**: a list of pairs (e.g. `[12::'abc', 13::'def']`)
  * **point**: 2 or 3 int or float ordinates enclosed inside curly brackets (e.g. `{10.0,10.0,10.0}`)



[//]: # (keyword|concept_nil)
## Universal Literal
Finally, a special literal, of type `unknown`, is shared between the data types and all the agent types (aka species). Only `bool`, `int` and `float`, which do not derive from `unknown`, do not accept this literal. All the others will accept it (e.g. `string s <- nil;` is ok).

  * **unknown**: `nil`, which represents the non-initialized (or, literally, _unknown_) value.
