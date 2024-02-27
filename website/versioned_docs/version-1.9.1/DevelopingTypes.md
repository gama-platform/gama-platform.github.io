---
title:  Developing Types
---




GAML provides a given number of built-in simple types (int, bool...) and more complex ones (path, graph...).
Developing a new type allows, then, to add a new data structure to GAML.






## Implementation
Developing a new type requires the implementation of 2 Java files:

  * the first one that describes the data structure (e.g.: `GamaColor.java` to define a type color)
  * the second one that implements the type itself, wrapping the data structure file (e.g.: `GamaColorType.java`), and providing accessors to data structure attributes.

## The data structure file

The class representing the data structure is a Java class annotated by:

  * a [@vars](DevelopingIndexAnnotations#@vars) annotation to describe the attributes of a complex type. The `@vars` annotation contains a set of `@variable` elements.
```
@vars ({ 
    @variable (
		name = "red",
		type = IType.INT,
		doc = { @doc ("Returns the red component of the color (between 0 and 255)") }),
	@variable (
		name = "green",
		type = IType.INT,
		doc = { @doc ("Returns the green component of the color (between 0 and 255)") }),
	@variable (
		name = "blue",
		type = IType.INT,
		doc = { @doc ("Returns the blue component of the color (between 0 and 255)") }),
})
```

It is recommended that this class implements the `IValue` interface. It provides a clean way to give a string representation of the type and thus eases good serialization of the object. You will need to implement the `stringValue` method:
```
public class GamaColor implements IValue {
	@Override
	public String stringValue(IScope scope) throws GamaRuntimeException {
		...
	}
}
```

You should also have some class attributes that correspond to your custom data type's attributes
```
public class GamaColor implements IValue {
	private int red;
    private int green;
    private int blue;
    ...
}
```
and then you can create setters and/or getters for each of the attributes. Setters and getters are methods annotated by the [@getter](DevelopingIndexAnnotations#@getter) or [@setter](DevelopingIndexAnnotations#@setter) annotations.
```
@getter("red")
public Integer getRed() {
	return this.red;
}

@setter("red")
public void setRed(int red) {
	this.red = red;
}
```

## The type file

The class representing the type is a Java class such that:

  * the class should be annotated by the [@type](DevelopingIndexAnnotations#@type) annotation,
  * the class should extend the class `GamaType<DataStructureFile>` (and thus implement its 3 methods),


Example (from [GamaFloatType.java](https://github.com/gama-platform/gama.old/tree/GAMA_1.9.0/msi.gama.core/src/msi/gaml/types/GamaFloatType.java)):
```
@type(
	name = IKeyword.FLOAT, 
	id = IType.FLOAT, wraps = { Double.class,double.class }, 
	kind = ISymbolKind.Variable.NUMBER, 
	doc = {
		@doc("Represents floating point numbers (equivalent to Double in Java)") }, 
	concept = { IConcept.TYPE })
public class GamaFloatType extends GamaType<Double> {
```

### Inheritance from the `GamaType<T>` class
Each java class aiming at implementing a type should inherit from the GamaType abstract class.
Example (from [GamaColorType.java](https://github.com/gama-platform/gama.old/tree/GAMA_1.9.0/msi.gama.core/src/msi/gaml/types/GamaColorType.java)):
```
public class GamaColorType extends GamaType<GamaColor>
```

This class imposes to implement the three following methods (with the example of the GamaColorType):

  * `public boolean canCastToConst()`
  * `public GamaColor cast(IScope scope, Object obj, Object param)`: the way to cast any object in the type,
  * `public GamaColor getDefault()`: to define the default value of a variable of the current type.

Remark: for each type, a unary operator is created with the exact name of the type. It can be used to cast any expression in the given type.
This operator calls the previous `cast` method.





## Annotations

### @type
It provides information necessary to the processor to identify a type.

This annotation contains:

  * **name** (String, "" by default): _a String representing the type name in GAML_.
  * **id** (int, 0 by default): _the unique identifier for this type. User-added types can be chosen between IType.AVAILABLE\_TYPE and IType.SPECIES\_TYPE (exclusive) (cf. [IType.java](https://github.com/gama-platform/gama.old/tree/GAMA_1.9.0/msi.gama.core/src/msi/gaml/types/IType.java))_.
  * **wraps** (tab of Class, null by default): _the list of Java Classes this type is "wrapping" (i.e. representing). The first one is the one that will be used preferentially throughout GAMA. The other ones are to ensure compatibility, in operators, with compatible Java classes (for instance, List and GamaList)_.
  * **kind** (int, ISymbolKind.Variable.REGULAR by default): _the kind of Variable used to store this type. See [ISymbolKind.Variable](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/ummisco.gama.annotations/src/msi/gama/precompiler/ISymbolKind.java)_.
  * **internal** (boolean, false by default): _whether this type is for internal use only_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the facet_.

All these annotations are defined in the file [GamlAnnotations.java](https://github.com/gama-platform/gama.old/blob/GAMA_1.9.0/ummisco.gama.annotations/src/msi/gama/precompiler/GamlAnnotations.java).
