---
title:  Developing Skills
---


## Defining the class as a skill

In this section we will be creating a class "FirstClass", that is included in a package named "skill". 

1. Create Package

   1. From the Project Explorer pane, go to your plugin's folder, and then go to the src folder. 

   ![Annotation 2023-04-14 062743_srcFolder](https://user-images.githubusercontent.com/4437331/231942371-9a97121c-b351-40de-a165-6d6ffc5ac8d7.png)

   2. Right click on the src folder. Click on New > Package.

   ![Annotation 2023-04-14 063846_createNewPackage](https://user-images.githubusercontent.com/4437331/231943146-e04f9802-26e6-4c1c-919a-e80c9783e1fa.png)
  
   3. In the New Java Package dialog, set the Name to "skills".  
       
   ![Annotation 2023-04-14 192946_skillsAnnotate](https://user-images.githubusercontent.com/4437331/232116038-ba5d71de-bbb9-49fd-bec7-c2e2acb064c6.png)

   4. Click on Finish. This will create the package "skills".
   
   ![Annotation 2023-04-14 193406_annotationSkillspackage](https://user-images.githubusercontent.com/4437331/232117116-a132c3ab-bd4b-461c-81d4-61bcb1d09d65.png)

2. Create class in the Package

   1. In the Project Explorer, go to the folder of the Plugin. We create the Java class in this package. To do this, right click on the package, then click on New, select Class.

   ![Annotation 2023-04-14 193910_annotaClass](https://user-images.githubusercontent.com/4437331/232118107-19dba383-b6ab-428c-b425-6b61625a3063.png)

   2. On the New Java class dialog, set the Name to 'FirstSkill'. Click on Finish.

   ![Annotation 2023-04-14 194703_firqstSkill](https://user-images.githubusercontent.com/4437331/232119595-95cc1f38-8e5b-4f24-91f3-55ccc70a0ca9.png)

   3. Now we have an empty Java class named FirstSkill. Note as well that the GamlAdditions.java file was also automatically added into the gaml/gaml.additions.myFirstPlugin folder.

   ![Annotation 2023-04-14 195443_annotationskillsfirstskill](https://user-images.githubusercontent.com/4437331/232121164-f77195ca-287a-45f0-adfd-137cfbe95e44.png)

      
## Using Annotations to define class as a skill

Annotations are used to link Java methods and classes to GAML language. Note that GAMA annotations are classes defined into the `msi.gama.precompiler.GamlAnnotations` class.

We need to tell GAMA that our class "FirstSkill" will be used as skill. To do that we will use Annotation in writing the code of the class. The annotations for skill is described as follows:

### @skill
This annotations Allows to define a new skill (class grouping variables and actions that can be used by agents).

This annotation contains:
* **name** (String): _a String representing the skill name in GAML (must be unique throughout GAML)_.
* **attach\_to** (set of strings): _an array of species names to which the skill will be automatically added (complements the "skills" parameter of species)_.
* **internal** (boolean, false by default): _return whether this skill is for internal use only_.
* **doc** (set of @doc, empty by default): _the documentation associated to the skill_.

    1. Just before the class declaration, add this line to indicate that this class is a skill named "FirstSkill"
 
 `@skill(name = "FirstSkill")`

![Annotation 2023-04-21 073852_myfirstSkillModif](https://user-images.githubusercontent.com/4437331/233549582-a911fc91-b5ae-4edb-b200-c019fcb15d1d.png)




In line 3, a red broken line under the skill word can be seen. This is an error since at this point in the code. Hover your mouse over the error, and the message box would indicate that the skill cannot be resolved to a type.

![Annotation 2023-04-21 074530_errorModif](https://user-images.githubusercontent.com/4437331/233550370-9481ff4f-8bf2-4ed6-aaf8-205b8a91d001.png)



To correct this error, we take the suggestion of importing 'skill' (msi.gama.precompiler.GamaAnnotations). Click on this option.

![Annotation 2023-04-21 074953_importskill](https://user-images.githubusercontent.com/4437331/233551037-ab339f1c-be52-42d9-8f33-f2b11f21cc3b.png)




It is a good practice to define all the names of plugins/actions/variables in the IKeyword class, which is located in the plugin msi.gama.common.interfaces.IKeyword.java.

In this class you can define a string variable which contain the name of your plugin.

`String FIRST_SKILL = "FirstSkill";`


Now that we have defined a global string containing the name of the plugin, we can use it in the annotation and in the code of the class.

`@skill(name = IKeyword.FIRST_SKILL)`

We have now defined that our current class is a skill that can be used in GAMA.

To use our plugin in gaml model, we have to create a species using the skill:

```gaml
species tutorialSpecies skills:[FirstSkill]
{
}
```

## Defining new attributes for the skill

Now we have a skill that is empty. So we need to add some variable for the plugin to have a purpose.

To add new attributes to the species that declares this skill, we have to define them before the class using annotation like we did before.

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

The `@vars` annotation contains a set of `@variable` elements.

Just like we did before with the declaration of the name of our skill, we can declare globally the name of our incomming new variables, in the IKeyword class.


`String FIRST_VARIABLE = "FirstVariable";`
`String SECOND_VARIABLE = "SecondVariable";`

Now that we have defined the names of our variables, we need to declare them in our skill class.

Here is how to declare the variables:

```java
@vars({
  @variable(name = IKeyword.FIRST_VARIABLE, type = IType.INT, init = "1"),
  @variable(name = IKeyword.SECOND_VARIABLE, type = IType.FLOAT, init = "1.0")
})
```

In order to access these new attributes, in the GAMA application, you need to define `@getter` and  `@setter` methods:

### @getter
This annotations is used to indicate that a method is to be used as a getter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:
  * **value** (String): the name of the variable for which the annotated method is to be considered as a getter.
  * **initializer** (boolean, false by default): returns whether or not this getter should also be used as an initializer

### @setter
This annotations is used to indicate that a method is to be used as a setter for a variable defined in the class. The variable must be defined on its own (in vars).

This annotation contains:
  * **value** (String): the name of the variable for which the annotated method is to be considered as a setter.


```java
@getter(IKeyword.FIRST_VARIABLE)
public int getFirstVariable(final IAgent agent) {
    return (int) agent.getAttribute(IKeyword.FIRST_VARIABLE);
}

@setter(IKeyword.FIRST_VARIABLE)
public void setFirstVariable(final IAgent agent, final int value) {
    agent.setAttribute(IKeyword.FIRST_VARIABLE, value);
}

@getter(IKeyword.SECOND_VARIABLE)
public double getFirstVariable(final IAgent agent) {
    return (double) agent.getAttribute(IKeyword.SECOND_VARIABLE);
}

@setter(IKeyword.SECOND_VARIABLE)
public void setFirstVariable(final IAgent agent, final double value) {
    agent.setAttribute(IKeyword.SECOND_VARIABLE, value);
}

```

At this point we can use the variable defined directly in our agent :
```gaml
species tutorialSpecies skills:[FirstSkill]
{
	init
	{
		write(firstVariable);
		write(SecondVariable);
	}
}
```


## Defining new actions

An action (also called `primitive`) is basically a Java method that can be called from the GAML language using the same syntax as the one used for calling actions defined in a model. The method should be annotated with `@action`, supplying the name of the action as it will be available in GAML.


### @action
This annotations is used to tag a method that will be considered as an action (or primitive) in GAML.
The method must have the following signature: ```
Object methodName(IScope) throws GamaRuntimeException ``` and be contained in a class annotated with @species or @skill (or a related class, like a subclass or an interface).

This annotation contains:
  * **name** (String): _the name of the variable as it can be used in GAML_.
  * **virtual** (boolean, false by default): _if true the action is virtual, i.e. equivalent to abstract method in java_.
  * **args** (set of arg, empty by default): _the list of arguments passed to this action. Each argument is an instance of arg_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the action_.

We can also define parameters for this action using the annotation `@arg` will a set of parameters names. 

### @arg
This annotations describes an argument passed to an action.

This annotation contains:
  * **name** (String, "" by default): _the name of the argument as it can be used in GAML_.
  * **type** (set of ints, empty by default): _An array containing the textual representation of the types that can be taken by the argument (see IType)_.
  * **optional** (boolean, true by default): _whether this argument is optional or not_.
  * **doc** (set of @doc, empty by default): _the documentation associated to the argument._


Here is an example of an empty action for our skill (dont forget to define every keywords like ```IKeyword.NUMBER_TO_ADD``` in the IKeyword class):


```java
@action(name = "add", 
		args = {
			@arg(name = IKeyword.NUMBER_TO_ADD, type = IType.INT, optional = false)})
@doc("Function to add a number to FirstVariable")
public int add(final IScope scope){
	return 0;
}

```

Now that we have defined the action we can access the parameter ```IKeyword.NUMBER_TO_ADD``` and use it as we want.

### Access to parameters in actions
To get the value of the arguments passed in GAML to the Java code, two methods can be useful:
  * `scope.hasArg("name_of_argument")` returns a boolean value testing whether the argument "name\_of\_argument" has been defined by the modeler, since all the arguments to actions should be considered as optional.
  * `getArg(name_arg,IType)`, `getFloatArg(name_param_of_float)`, `getIntArg(name_param_of_int)` and their variants return the value of the given parameter using a given (or predefined) type to cast it.


### Warnings
Developers should notice that:
  * the method should have only one parameter: the scope (type IScope).
  * the method can only throw `GamaRuntimeExceptions`. Other exceptions should be caught in the method and wrapped in a `GamaRuntimeException` before being thrown.

Here is the complete action code :

```java
@action(name = "add", 
		args = {
			@arg(name = IKeyword.NUMBER_TO_ADD, type = IType.INT, optional = false)})
@doc("Function to add a number to FirstVariable")
public int add(final IScope scope)
{
	int firstVariable = getVariable(scope.getAgent());
	int numberToAdd = (Integer) scope.getArg(IKeyword.NUMBER_TO_ADD);

	setVariable(scope.getAgent(), firstVariable + numberToAdd);

	return firstVariable + numberToAdd;
}
```

It is called in GAMA models with:

```gaml
species tutorialSpecies skills:[FirstSkill]
{
	init
	{
		do add(5);
		int result <- add(10);
		
		write(firstVariable);
		write(secondVariable);
	}
}
```

For our action we used the annotation `@doc` to give a description of what the purpose of the action.

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



## Complete java class

```java
package skills;

import msi.gama.common.interfaces.IKeyword;
import msi.gama.metamodel.agent.IAgent;
import msi.gama.precompiler.GamlAnnotations.action;
import msi.gama.precompiler.GamlAnnotations.arg;
import msi.gama.precompiler.GamlAnnotations.doc;
import msi.gama.precompiler.GamlAnnotations.getter;
import msi.gama.precompiler.GamlAnnotations.setter;
import msi.gama.precompiler.GamlAnnotations.skill;
import msi.gama.precompiler.GamlAnnotations.variable;
import msi.gama.precompiler.GamlAnnotations.vars;
import msi.gama.runtime.IScope;
import msi.gaml.skills.Skill;
import msi.gaml.types.IType;

@vars({
	  @variable(name = IKeyword.FIRST_VARIABLE, type = IType.INT, init = "1"),
	  @variable(name = IKeyword.SECOND_VARIABLE, type = IType.FLOAT, init = "1.0")
	})
@skill(name = "FirstSkill")
public class FirstSkill extends Skill
{
	
	@getter(IKeyword.FIRST_VARIABLE)
	public int getFirstVariable(final IAgent agent) {
	    return (Integer) agent.getAttribute(IKeyword.FIRST_VARIABLE);
	}

	@setter(IKeyword.FIRST_VARIABLE)
	public void setFirstVariable(final IAgent agent, final int value) {
		agent.setAttribute(IKeyword.FIRST_VARIABLE, value);
	}

	@getter(IKeyword.SECOND_VARIABLE)
	public double getSecondVariable(final IAgent agent) {
	    return (double) agent.getAttribute(IKeyword.SECOND_VARIABLE);
	}
	
	@setter(IKeyword.SECOND_VARIABLE)
	public void setSecondVariable(final IAgent agent, final double value) {
	    agent.setAttribute(IKeyword.SECOND_VARIABLE, value);
	}
	
	@action(name = "add", 
			args = {
					@arg(name = IKeyword.NUMBER_TO_ADD, type = IType.INT, optional = false)})
	@doc("Function to add a number to FirstVariable")
	public int add(final IScope scope)
	{
		int firstVariable = getFirstVariable(scope.getAgent());
		int numberToAdd = (Integer) scope.getArg(IKeyword.NUMBER_TO_ADD);
		
		setFirstVariable(scope.getAgent(), firstVariable + numberToAdd);
		
		return firstVariable + numberToAdd;
	}
}
```

## Complete gaml model


```gaml
/**
* Name: FirstSkill
* First skill tutorial. 
* Author: Lucas Grosjean, Julius Bangate
* Tags: tutorial, skill
*/

model FirstSkill

global{
	init {
		create tutorial;
	}
}

species tutorial skills:[FirstSkill] {
	init {
		do add(5);
		int result <- add(10);
		
		write(firstVariable);
		write(secondVariable);
	}
}

experiment main{}
```