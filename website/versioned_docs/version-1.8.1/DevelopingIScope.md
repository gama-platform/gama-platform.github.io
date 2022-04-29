---
title: IScope interface
id: version-1.8.1-DevelopingIScope
original_id: DevelopingIScope
---




An object of type IScope represents the context of execution of an agent (including experiments, simulations, and "regular" agents). Everywhere it is accessible (either passed as a parameter or available as an instance variable in some objects), it provides an easy access to a number of features: the current active agent, the shared random number generator, the global clock, the current simulation and experiment agents, the local variables declared in the current block, etc.

It also allows modifying this context, like changing values of local variables, adding new variables, although these functions should be reserved to very specific usages. Ordinarily, the scope is simply passed to core methods that allow to evaluate expressions, cast values, and so on.


## Use of an IScope

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
