---
title: Developing architecture
id: version-1.8.1-DevelopingControlArchitectures
original_id: DevelopingControlArchitectures
---




In addition to existing [control architectures](BuiltInArchitectures), developers can add new ones.

Defining a new control architecture needs to [create new statements of type behavior](DevelopingStatements) and included in species statements and to define how to manage their execution.






## Implementation

A control architecture is a Java class, that:

  * is annotated by the [@skill](DevelopingIndexAnnotations#@skill) annotation,
  * extends the `AbstractArchitecture` class (to get benefits of everything from the `reflex`-based control architecture, the `ReflexArchitecture` class can be extended instead).

The `AbstractArchitecture` extends the `ISkill` and `IStatement` interfaces and add the 2 following methods:

  * `public abstract boolean init(IScope scope) throws GamaRuntimeException;`
  * `public abstract void verifyBehaviors(ISpecies context);`

The three main methods to implement are thus:

  * `public void setChildren(final List<? extends ISymbol> children)`: this method will be called at the compilation of the model. It allows to manage all the embeded statements (in `children`) and for example separate the statements that should be executed at the initialization only from the ones that should be executed at each simulation step. Following example allows to test the name of the all the embedded statements:
```
for ( final ISymbol c : children ) {
   if( IKeyword.INIT.equals(c.getFacet(IKeyword.KEYWORD).literalValue()) ) {
```
  * `public abstract boolean init(IScope scope) throws GamaRuntimeException`: this method is called only once, at the initialization of the agent.
  * `public Object executeOn(final IScope scope) throws GamaRuntimeException`: this method is executed at each simulation step. It should manage the execution of the various embedded behaviors (e.g. their order or choose which one will be executed...).
