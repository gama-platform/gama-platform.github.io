---
title:  Developing Statements
---


Statements are a fundamental part of GAML, as they represent both commands (imperative programming style) or declarations (declarative programming style). Developing a new statement allows, then, to add a new instruction to GAML.


## Defining the class

A new statement must be a Java class that:

  * either implements the interface `IStatement` or extends an existing implementation of this interface (like `AbstractStatement` or `AbstractSequenceStatement`).
  * begins by the 2 following mandatory annotations:
    * [@symbol](DevelopingIndexAnnotations#@symbol): `@symbol(name = "name_of_the_statement_gaml", kind = "kind_of_statement", with_sequence = true/false)`,
    * [@inside](DevelopingIndexAnnotations#@inside): `@symbol(kinds = {"kind_of_statement_1","kind_of_statement_2","..."}`

In addition the 4 following optional annotations can be added:

  * [@facets](DevelopingIndexAnnotations#@facets): to describe the set of [@facet](DevelopingIndexAnnotations#@facet) annotations,
  * [@doc](DevelopingIndexAnnotations#@doc): to document the statement.
  * [@serializer](DevelopingIndexAnnotations#@serializer): in addition, statements can benefit from a custom serializer, by declaring `@serializer(CustomSerializer.class)`, with a class extending `SymbolSerializer`.
  * [@validator](DevelopingIndexAnnotations#@validator): in addition, statements can benefit from a custom validation during the validation process, by declaring `@validator(CustomValidator.class)` with a class implementing `IDescriptionValidator` as value. This class will receive the `IDescription` of the statement and be able to execute further validations on the type of expressions, etc. or even to change the `IDescription`  (by adding new information, changing the value of facets, etc.).

Note: GAMA annotations are classes defined into the `msi.gama.precompiler.GamlAnnotations` class.





## Examples

### The `write` statement

The `write` statement is an example of a SINGLE\_STATEMENT (i.e. statement that does not embed a sequence of statements).
It can used inside a BEHAVIOR statement (i.e. `reflex`, `init`...), a SEQUENCE\_STATEMENT (e.g. `loop`, `ask`, `if`...) or a LAYER statement.
It defines a single facet ("message") mandatory and omissible.
```
@symbol(name = IKeyword.WRITE, kind = ISymbolKind.SINGLE_STATEMENT, with_sequence = false)
@inside(kinds = { ISymbolKind.BEHAVIOR, ISymbolKind.SEQUENCE_STATEMENT, ISymbolKind.LAYER })
@facets(value = { 
        @facet(name = IKeyword.MESSAGE, type = IType.NONE, optional = false) 
   }, omissible = IKeyword.MESSAGE)
public class WriteStatement extends AbstractStatement {
```

### The `aspect` statement

The `aspect` statement defines an example of BEHAVIOR statement (i.e. a statement that can written at the same level as `init`, `reflex`...), containing a sequence of embedded statements. It can only be used inside a `species` statement (i.e. the definition of a new species) and the `global` block. It defines a single facet `name` mandatory and omissible.
```
@symbol(name = { IKeyword.ASPECT }, kind = ISymbolKind.BEHAVIOR, with_sequence = true, unique_name = true)
@inside(kinds = { ISymbolKind.SPECIES, ISymbolKind.MODEL })
@facets(value = { @facet(name = IKeyword.NAME, type = IType.ID, optional = true) 
   }, omissible = IKeyword.NAME)
public class AspectStatement extends AbstractStatementSequence {
```

### The `action` statement

The `action` statement defines an example of ACTION statement containing a sequence of embedded statements and that can have arguments.
It can be used (to define an action) in any species, experiment or global statement. It defines several facets and uses a custom validator and a custom serializer.
```
@symbol(name = IKeyword.ACTION, kind = ISymbolKind.ACTION, with_sequence = true, with_args = true, unique_name = true)
@inside(kinds = { ISymbolKind.SPECIES, ISymbolKind.EXPERIMENT, ISymbolKind.MODEL })
@facets(value = {
	@facet(name = IKeyword.NAME, type = IType.ID, optional = false),
	@facet(name = IKeyword.TYPE, type = IType.TYPE_ID, optional = true, internal = true),
	@facet(name = IKeyword.OF, type = IType.TYPE_ID, optional = true, internal = true),
	@facet(name = IKeyword.INDEX, type = IType.TYPE_ID, optional = true, internal = true),
	@facet(name = IKeyword.VIRTUAL, type = IType.BOOL, optional = true) 
    }, omissible = IKeyword.NAME)
@validator(ActionValidator.class)
@serializer(ActionSerializer.class)
public class ActionStatement extends AbstractStatementSequenceWithArgs {
```






## Implementation

All the statements inherit from the abstract class `AbstractStatement`. Statements with a sequence of embedded statements inherit from the class `AbstractStatementSequence` (which extends `AbstractStatement`).

The main methods of a statement class are:

  * its constructor, that is executed at the compilation of the model.
  * `executeOn(final IScope scope)`, it executes the statement on a given scope. **This method is executed at each call of the statement in the model**,
  * `privateExecuteIn(IScope scope)`: the `executeOn(final IScope scope)` method implemented in `AbstractStatement` does some verification and call the `privateExecuteIn(IScope scope)` method to perform the statement. **The execution of any statement should be redefined in this method.**


### Define a SINGLE\_STATEMENT statement

To define a SINGLE\_STATEMENT statement that can be executed in any behavior and sequence of statements and with 2 facets, we first define a new Java class that extends `AbstractStatement` such as:
```
@symbol(name = "testStatement", kind = ISymbolKind.SINGLE_STATEMENT, with_sequence = false)
@inside(kinds = { ISymbolKind.BEHAVIOR, ISymbolKind.SEQUENCE_STATEMENT})
@facets(value = { 
        @facet(name = IKeyword.NAME, type = IType.NONE, optional = false),
        @facet(name = "test_facet", type = IType.NONE, optional = true)     
   }, omissible = IKeyword.NAME)
public class SingleStatementExample extends AbstractStatement {
```

The class should at least implement:

  * a **constructor**: the constructor is called at the compilation. It is usually used to get the expressions given to the facets (using the `getFacet(String)` method) and to store it into an attribute of the class.
```
final IExpression name;

public SingleStatementExample(final IDescription desc) {
	super(desc);
	name = getFacet(IKeyword.NAME);
}
```
  * the **method privateExecuteIn**: this method is executed each time the statement is called in the model.
```
protected Object privateExecuteIn(IScope scope) throws GamaRuntimeException { 
	IAgent agent = scope.getAgent();
	String nameStr = null;
	if (agent != null && !agent.dead()) {
		nameStr = Cast.asString(scope, name.value(scope));
		if (nameStr == null) {
			nameStr = "nil";
		}
		scope.getGui().getConsole().informConsole(nameStr, scope.getRoot());
	}
	return nameStr;
}  
```
The variable `scope` of type `IScope` can be used to:

  * get the current agent with: `scope.getAgent()`
  * evaluate an expression in the current scope: `Cast.asString(scope, message.value(scope))`


### Define a statement with sequence

This kind of statements includes SEQUENCE\_STATEMENT (e.g. `if`, `loop`,...), BEHAVIOR (e.g. `reflex`,...)...

Such a statement is defined in a class extending the `AbstractStatementSequence` class, e.g.:
```
@symbol(name = { IKeyword.REFLEX, IKeyword.INIT }, kind = ISymbolKind.BEHAVIOR, with_sequence = true, unique_name = true)
@inside(kinds = { ISymbolKind.SPECIES, ISymbolKind.EXPERIMENT, ISymbolKind.MODEL })
@facets(value = { @facet(name = IKeyword.WHEN, type = IType.BOOL, optional = true),
	@facet(name = IKeyword.NAME, type = IType.ID, optional = true) }, omissible = IKeyword.NAME)
@validator(ValidNameValidator.class)

public class ReflexStatement extends AbstractStatementSequence {
```

This class should only implement a constructor. The class `AbstractStatementSequence` provides a generic implementation for:

  * `privateExecuteIn(IScope scope)`: it executes each embedded statement with the scope.
  * `executeOn(final IScope scope)`: it executes the statement with a given scope.


### Additional methods that can be implemented

The following methods have a default implementation, but can be overridden if necessary:

  * the **`String getTrace(final IScope scope)` method** is called to trace the execution of statements using [trace statement](Statements#trace).
```
public String getTrace(final IScope scope) {
	// We dont trace write statements
	return "";
} 
```
  * the `setChildren(final List<? extends ISymbol> commands)` is used to define which are the statement children to the sequence statement. By default, all the embedded statements are taken as children





## Annotations

### @symbol

This annotation represents a "statement" in GAML, and is used to define its name(s) as well as some meta-data that will be used during the validation process.

This annotation contains:

  * **name** (set of string, empty by default): _names of the statement_.
  * **kind** (int): _the kind of the annotated symbol (see [ISymbolKind.java](https://github.com/gama-platform/gama/blob/GAMA_1.9.0/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java) for more details)_.
  * **with\_scope** (boolean, true by default): _indicates if the statement (usually a sequence) defines its own scope. Otherwise, all the temporary variables defined in it are actually defined in the super-scope_.
  * **with\_sequence** (boolean): _indicates wether or not a sequence can or should follow the symbol denoted by this class_.
  * **with\_args** (boolean, false by default): _indicates wether or not the symbol denoted by this class will accept arguments_.
  * **remote\_context** (boolean, false by default): _indicates that the context of this statement is actually an hybrid context: although it will be executed in a remote context, any temporary variables declared in the enclosing scopes should be passed on as if the statement was executed in the current context_.
  * **doc** (set of @doc, empty by default): _the documentation attached to this symbol_.

### @inside
This annotation is used in conjunction with symbol. Provides a way to tell where this symbol should be located in a model (i.e. what its parents should be). Either direct symbol names (in symbols) or generic symbol kinds can be used.

This annotation contains:

  * **symbols** (set of Strings, empty by default): _symbol names of the parents_.
  * **kinds** (set of int, empty by default): _generic symbol kinds of the parents (see [ISymbolKind.java](https://github.com/gama-platform/gama/blob/GAMA_1.9.0/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java) for more details)_.

### @facets
This annotation describes a list of facets used by a statement in GAML.

This annotation contains:

  * **value** (set of @facet): array of @facet, each representing a facet name, type..
  * **ommissible** (string): _the facet that can be safely omitted by the modeler (provided its value is the first following the keyword of the statement)_.

### @facet
This facet describes a facet in a list of facets.

This annotation contains:

  * **name** (String): _the name of the facet. Must be unique within a symbol_.
  * **type** (set of Strings): _the string values of the different types that can be taken by this facet_.
  * **values** (set of Strings): _the values that can be taken by this facet. The value of the facet expression will be chosen among the values described here_.
  * **optional** (boolean, false by default): _whether or not this facet is optional or mandatory_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the facet_.

### @doc

It provides a unified way of attaching documentation to the various GAML elements tagged by the other annotations. The documentation is automatically assembled at compile time and also used at runtime in GAML editors.

  * **value** (String, "" by default): _a String representing the documentation of a GAML element_.
  * **deprecated** (String, "" by default): _a String indicating (if it is not empty) that the element is deprecated and defining, if possible, what to use instead_.
  * **returns** (String, "" by default): _the documentation concerning the value(s) returned by this element (if any)._.
  * **comment** (String, "" by default): _an optional comment that will appear differently from the documentation itself_.
  * **special\_cases** (set of Strings, empty by default): _an array of String representing the documentation of the "special cases" in which the documented element takes part_.
  * **examples** (set of Strings, empty by default): _an array of String representing some examples or use-cases about how to use this element_.
  * **see** (set of Strings, empty by default): _an array of String representing cross-references to other elements in GAML_.

### @serializer
It allows to declare a custom serializer for Symbols (statements, var declarations, species, experiments, etc.). This serializer will be called instead of the standard serializer, superseding this last one. Serializers must be subclasses of the SymbolSerializer class.

  * **value** (Class): _the serializer class_.

### @validator
It allows to declare a custom validator for Symbols (statements, var declarations, species, experiments, etc.). This validator, if declared on subclasses of Symbol, will be called after the standard validation is done. The validator must be a subclass of IDescriptionValidator.

  * **value** (Class): _the validator class_.

All these annotations are defined in the `GamlAnnotations.java` file of the `msi.gama.processor` plug-in.

