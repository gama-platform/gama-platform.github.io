---
title:  Index of annotations
---




Annotations are used to link Java methods and classes to GAML language.




## @action
This annotation is used to tag a method that will be considered as an action (or primitive) in GAML.
The method must have the following signature: ```
Object methodName(IScope) throws GamaRuntimeException ``` and be contained in a class annotated with [@species](#species) or [@skill](#skill) (or a related class, like a subclass or an interface).

This annotation contains:

  * **name** (String): _the name of the variable as it can be used in GAML_.
  * **virtual** (boolean, false by default): _if true the action is virtual, i.e. equivalent to abstract method in java_.
  * **args** (set of [@arg](#arg), empty by default): _the list of arguments passed to this action. Each argument is an instance of arg_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the action_.





## @arg
This annotation describes an argument passed to an action.

This annotation contains:

  * **name** (String, "" by default): _the name of the argument as it can be used in GAML_.
  * **type** (set of ints, empty by default): _An array containing the textual representation of the types that can be taken by the argument (see `IType`)_.
  * **optional** (boolean, true by default): _whether this argument is optional or not_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the argument._

## @constant
This annotation is used to annotate fields that are used as constants in GAML.

This annotation contains:

  * **category** (set of Strings, empty by default): _an array of strings, each representing a category in which this constant can be classified (for documentation indexes)_.
  * **value** (String): _a string representing the basic keyword for the constant. Does not need to be unique throughout GAML_.
  * **altNames** (set of Strings, empty by default): _an Array of strings, each representing a possible alternative name for the constant. Does not need to be unique throughout GAML_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation attached to this constant_.



## @doc
It provides a unified way of attaching documentation to the various GAML elements tagged by the other annotations. The documentation is automatically assembled at compile time and also used at runtime in GAML editors.

This annotation contains:

  * **value** (String, "" by default): _a String representing the documentation of a GAML element_.
  * **masterDoc** (boolean, false by default): _a boolean representing the fact that this instance of the operator is the master one, that is whether its value will subsume the value of all other instances of it_.
  * **deprecated** (String, "" by default): _a String indicating (if it is not empty) that the element is deprecated and defining, if possible, what to use instead_.
  * **returns** (String, "" by default): _the documentation concerning the value(s) returned by this element (if any)._.
  * **comment** (String, "" by default): _an optional comment that will appear differently from the documentation itself_.
  * **special\_cases** (set of Strings, empty by default): _an array of String representing the documentation of the "special cases" in which the documented element takes part_.
  * **examples** (set of [@example](#example), empty by default): _an array of String representing some examples or use-cases about how to use this element_.
  * **usages** (set of [@usage](#usage), empty by default): _An array of usages representing possible usage of the element in GAML_.
  * **see** (set of Strings, empty by default): _an array of String representing cross-references to other elements in GAML_.


## @example
This facet describes an example, that can be used either in the documentation, as unit test or as pattern.

This annotation contains:

  * **value** (String, "" by default): _a String representing the expression as example_.
  * **var** (String, "" by default): _The variable that will be tested in the equals, if it is omitted a default variable will be used_.
  * **equals** (String, "" by default): _The value to which the value will be compared_.
  * **returnType** (String, "" by default): _The type of the value that should be tested_.
  * **isNot** (String, "" by default): _The value to which the value will be compared_.
  * **raises** (String, "" by default): _The exception or warning that the expression could raise_.
  * **isTestOnly** (boolean, false by default): _specifies that the example should not be included in the documentation_.
  * **isExecutable** (boolean, true by default): _specifies that the example is correct GAML code that can be executed_.
  * **test** (boolean, true by default): _specifies that the example is will be tested with the equals_.
  * **isPattern** (boolean, false by default): _whether or not this example should be treated as part of a pattern (see @usage). If true, the developers might want to consider writing the example line (and its associated lines) using template variables (e.g. $&#123;my_agent})_.
		

## @facet
This facet describes a facet in a list of facets.

This annotation contains:

  * **name** (String): _the name of the facet. Must be unique within a symbol_.
  * **type** (set of int): _the string values of the different types that can be taken by this facet_.
  * **values** (set of Strings, empty by default): _the values that can be taken by this facet. The value of the facet expression will be chosen among the values described here_.
  * **optional** (boolean, false by default): _whether or not this facet is optional or mandatory_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the facet_.





## @facets
This annotation describes a list of facets used by a statement in GAML.

This annotation contains:

  * **value** (set of [@facet](#facet)): array of @facet, each representing a facet name, type..
  * **ommissible** (string): _the facet that can be safely omitted by the modeler (provided its value is the first following the keyword of the statement)_.


## @file
This annotation is used to define a type of file.

This annotation contains:

  * **name** (String): _a (human-understandable) string describing this type of files, suitable for use in composed operator names (e.g. "shape", "image"...). This name will be used to generate two operators: name+"_file" and "is_"+name. The first operator may have variants taking one or several arguments, depending on the @builder annotations present on the class_.
  * **extensions** (set of Strings): _an array of extensions (without the '.' delimiter) or an empty array if no specific extensions are associated to this type of files (e.g. ["png","jpg","jpeg"...]). The list of file extensions allowed for this type of file. These extensions will be used to check the validity of the file path, but also to generate the correct type of file when a path is passed to the generic "file" operator_.
  * **buffer\_content** (int, ITypeProvider.NONE by default): _the type of the content of the buffer. Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the content type is searched using this provider)_.
  * **buffer\_index** (int, ITypeProvider.NONE by default): _the type of the index of the buffer. Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the index type is searched using this provider)_.
  * **buffer\_type** (int, ITypeProvider.NONE by default): _the type of the buffer. Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the type is searched using this provider)_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation attached to this operator_.


## @getter
This annotation is used to indicate that a method is to be used as a getter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:

  * **value** (String): the name of the variable for which the annotated method is to be considered as a getter.
  * **initializer** (boolean, false by default): returns whether or not this getter should also be used as an initializer





## @inside
This annotation is used in conjunction with `@symbol`. It provides a way to tell where this symbol should be located in a model (i.e. what its parents should be). Either direct symbol names (in symbols) or generic symbol kinds can be used.

This annotation contains:

  * **symbols** (set of Strings, empty by default): _symbol names of the parents_.
  * **kinds** (set of int, empty by default): _generic symbol kinds of the parents (see [ISymbolKind.java](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java) for more details)_.





## @operator
This annotation represents an "operator" in GAML and is used to define its name(s) as well as some meta-data that will be used during the validation process.

This annotation contains:

  * **value** (set of Strings, empty by default): _names of the operator_.
  * **category** (set of string, empty by default): _categories to which the operator belongs (for documentation purpose)_.
  * **iterator** (boolean, false by default): _true if this operator should be treated as an iterator (i.e.requires initializing the special variable "each" of WorldSkill within the method)_.
  * **can\_be\_const** (boolean, false by default): _if true: if the operands are constant, returns a constant value_.
  * **content\_type** (int, ITypeProvider.NONE by default): _the type of the content if the returned value is a container. Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the content type is searched using this provider)_.
  * **index\_type** (int, ITypeProvider.NONE by default): _the type of the index if the returned value is a container. Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the index type is searched using this provider)_.
  * **expected\_content\_type** (set of int, empty by default): _if the argument is a container, returns the types expected for its contents. Should be an array of IType.XXX_.
  * **type** (int, ITypeProvider.NONE by default): _the type of the expression if it cannot be determined at compile time (i.e. when the return type is "Object"). Can be directly a type in IType or one of the constants declared in ITypeProvider (in which case, the type is searched using this provider)._.
  * **internal** (boolean, false by default): _returns whether this operator is for internal use only_. 
  * **doc** (set of [@doc](#doc), empty by default): _the documentation attached to this operator._






## @serializer
It allows to declare a custom serializer for Symbols (statements, var declarations, species, experiments, etc.). This serializer will be called instead of the standard serializer, superseding this last one. Serializers must be subclasses of the SymbolSerializer class.

  * **value** (Class): _the serializer class_.






## @setter
This annotation is used to indicate that a method is to be used as a setter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:

  * **value** (String): the name of the variable for which the annotated method is to be considered as a setter.






## @skill
This annotation allows to define a new skill (class grouping variables and actions that can be used by agents).

This annotation contains:

  * **name** (String): _a String representing the skill name in GAML (must be unique throughout GAML)_.
  * **attach\_to** (set of strings): _an array of species names to which the skill will be automatically added (complements the "skills" parameter of species)_.
  * **internal** (boolean, false by default): _return whether this skill is for internal use only_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the skill_.





## @species
This annotation represents a "species" in GAML. The class annotated with this annotation will be the support of a species of agents.

This annotation contains:

  * **name** (string): _the name of the species that will be created with this class as base. Must be unique throughout GAML_.
  * **skills** (set of strings, empty by default): _An array of skill names that will be automatically attached to this species._ Example: ```
 @species(value="animal" skills={"moving"}) ```
  * **internal** (boolean, false by default): _whether this species is for internal use only_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation attached to this operator._






## @symbol
This annotation represents a "statement" in GAML and is used to define its name(s) as well as some meta-data that will be used during the validation process.

This annotation contains:

  * **name** (set of string, empty by default): _names of the statement_.
  * **kind** (int): _the kind of the annotated symbol (see [ISymbolKind.java](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java) for more details)_.
  * **with\_scope** (boolean, true by default): _indicates if the statement (usually a sequence) defines its own scope. Otherwise, all the temporary variables defined in it are actually defined in the super-scope_.
  * **with\_sequence** (boolean): _indicates whether or not a sequence can or should follow the symbol denoted by this class_.
  * **with\_args** (boolean, false by default): _indicates whether or not the symbol denoted by this class will accept arguments_.
  * **remote\_context** (boolean, false by default): _indicates that the context of this statement is actually a hybrid context: although it will be executed in a remote context, any temporary variables declared in the enclosing scopes should be passed on as if the statement was executed in the current context_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation attached to this symbol_.
  * **internal** (boolean, false by default): _returns whether this symbol is for internal use only_.
  * **unique\_in\_context** (boolean, false by default): _Indicates that this statement must be unique in its super context (for example, only one return is allowed in the body of an action)._.
  * **unique\_name** (boolean, false by default): _Indicates that only one statement with the same name should be allowed in the same super context_.


## @type
It provides information necessary to the processor to identify a type.

This annotation contains:

  * **name** (String, "" by default): _a String representing the type name in GAML_.
  * **id** (int, 0 by default): _the unique identifier for this type. User-added types can be chosen between IType.AVAILABLE\_TYPES and IType.SPECIES\_TYPES (exclusive) (cf. [IType.java](https://github.com/gama-platform/gama.old/tree/GAMA_1.9.2/msi.gama.core/src/msi/gaml/types/IType.java))_.
  * **wraps** (tab of Class, null by default): _the list of Java Classes this type is "wrapping" (i.e. representing). The first one is the one that will be used preferentially throughout GAMA. The other ones are to ensure compatibility, in operators, with compatible Java classes (for instance, List and GamaList)_.
  * **kind** (int, ISymbolKind.Variable.REGULAR by default): _the kind of Variable used to store this type. See [ISymbolKind.Variable](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.3/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java)_.
  * **internal** (boolean, false by default): _whether this type is for internal use only_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the facet_.


## @usage
This replaces @special_cases and `@examples`, and unifies the doc for operators, statements, and others.
An @usage can also be used for defining a template for a GAML structure, and in that case, requires the following to be defined:

  * A name (attribute "name"), optional, but better
  * A description (attribute "value"), optional
  * A menu name (attribute "menu"), optional
  * A hierarchical path within this menu (attribute "path"), optional
  * A pattern (attribute "pattern" or concatenation of the @example present in "examples" that define "isPattern" as true)

This annotation contains:

  * **value** (String): _a String representing one usage of the keyword. Note that for usages aiming at defining templates, the description is displayed on a tooltip in the editor. The use of the path allows to remove unnecessary explanations. For instance, instead of writing: description="This template illustrates the use of a complex form of the "create" statement, which reads agents from a shape file and uses the tabular data of the file to initialize their attributes", choose: name="Create agents from shapefile" menu=STATEMENT; path=&#123;"Create", "Complex forms"} description="Read agents from a shape file and initialize their attributes". If no description is provided, GAMA will try to grab it from the context where the template is defined (in the documentation, for example)_.
  * **menu** (String, "" by default): _Define the top-level menu where this template should appear. Users are free to use other names than the provided constants if necessary (i.e. "My templates"). When no menu is defined, GAMA tries to guess it from the context where the template is defined_.
  * **path** (set of Strings, empty by default): The path indicates where to put this template in the menu. For instance, the following annotation: " menu = STATEMENT; path = &#123;"Control", "If"} will put the template in a menu called "If", within "Control", within the top menu "Statement". When no path is defined, GAMA will try to guess it from the context where the template is defined (i.e. keyword of the statement, etc.)
  * **name** (String, "" by default): _The name of the template should be both concise (as it will appear in a menu) and precise (to remove ambiguities between templates)_.
  * **examples** (set of [@example](#example), empty by default): _An array of String representing some examples or use-cases about how to use this element, related to the particular usage above_.
  * **pattern** (String, "" by default): _Alternatively, the contents of the usage can be described using a @pattern (rather than an array of [@example](#example)). The formatting of this string depends entirely on the user (e.g. including `\n` and `\t` for indentation, for instance)_.


## @validator
It allows to declare a custom validator for Symbols (statements, var declarations, species, experiments, etc.). This validator, if declared on subclasses of Symbol, will be called after the standard validation is done. The validator must be a subclass of IDescriptionValidator.

  * **value** (Class): _the validator class_.





## @variable
This annotation is used to describe a single variable or field.

This annotation contains:

  * **name** (String): _the name of the variable as it can be used in GAML_.
  * **type** (int): _The textual representation of the type of the variable (see IType)_.
  * **of** (int, 0 by default): _The textual representation of the content type of the variable (see IType#defaultContentType())_.
  * **index** (int, 0 by default): _The textual representation of the index type of the variable (see IType#defaultKeyType())_.
  * **constant** (boolean, false by default): _returns whether or not this variable should be considered as non modifiable_.
  * **init** (String, "" by default): _the initial value of this variable as a String that will be interpreted by GAML_.
  * **depend\_on** (set of Strings, empty by default): _an array of String representing the names of the variables on which this variable depends (so that they are computed before)_.
  * **internal** (boolean, false by default): _return whether this var is for internal use only_.
  * **doc** (set of [@doc](#doc), empty by default): _the documentation associated to the variable_.






## @vars
This annotation is used to describe a set of variables or fields.

This annotation contains:

  * **value** (set of @var): _an Array of var instances, each representing a variable_.
