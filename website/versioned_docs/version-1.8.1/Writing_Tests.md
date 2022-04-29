---
title: Writing Unit Tests in GAML
id: version-1.8.1-Writing_Tests
original_id: Writing_Tests
---


[Unit testing](https://en.wikipedia.org/wiki/Unit_testing) is an essential instrument to ensure the quality of any software and it has been implemented in GAMA: this allows in particular that parts of the model are behaving as expected and that evolutions in the model do not introduce unexpected changes. To these purposes, the modeler can define a set of assertions that will be tested. Before the execution of the embedded set of instructions, if a setup is defined in the species, model or experiment, it is executed. In a test, if one assertion fails, the evaluation of other assertions continue. 

Writing tests in GAML involves the use of 4 keywords:

* [`assert` statement](Statements#assert),
* [`test` statement](Statements#test),
* [`setup` statement](Statements#setup),
* [`type: test` facet of `experiment`](ModelOrganization#experiment-declarations).

In this unit testing tutorial, we intend to show how to write unit tests in GAML using the statement `test`. 


## What is `test` in GAML?

In GAML, the statement `test` allows the modeler to write a part of code lines to verify if portions of our GAML model are doing exactly what they are expected to do: this is done through the use of several assertions (using `assert` statements). This is done independently from other parts of the model. 

To write a typical GAML unit test, we can follow three steps: 

1. Define a set of attributes to use within the test,
2. Write initialization instructions,
3. Write assertions. 

The aim of using unit testing is to observe the resulting behavior of some parts of our model. If the observed behavior is consistent with the expectations, the unit test passes, otherwise, it fails, indicating that there is a problem concerning the tested part of the model. 

## Introduction to assertions

The basis of Unit tests is to check that given pieces of codes provide expected results. To this purpose, the modeler can write some basic tests that should be true: s/he thus asserts that such expression can be evaluated to true using the `assert` statement. Here are some examples of `assert` uses:

```
assert 1 + 1 = 2;
assert isGreater(5, 6) = false;
assert rnd(1.0) <= 1.0;
```

With the above statements, the modeler states the `1+1` is equal to `2`, `isGreater(5,6)` is false (given the fact that `isGreater` is an action defined in a species) and `rnd(1.0)` always returns a value below 1.0.

`assert` can be used in any behavior statement (as an example in a `reflex`, a `state` or in a `test`. Note that, if they are written outside of a `test` and that the test is not fulfilled, then an exception is thrown during their execution.

As an example, the following model throws the exception: `Assert failed 3>4` (as obviously 3 is not greater than 4 and that the GAML `>` operator is properly implemented on this case).

```
model NewModel

global {
    init {
	assert 3 > 4;
    }
}

experiment NewModel type: gui {}
```

To be able to have a dashboard of the state of your model w.r.t. the unit tests, they need to be written in a `test` and the model launched with an experiment of type `test`. 


## How to write a GAML `test`?

A `test` statement can be used in any species (regular species, global or experiment species) everywhere a `reflex` can be used. Its aim is to gather several asserts in one block. If the tests are executed with any kind of experiment but `test`, they will be executed, but nothing is reported. With a `test` experiment, a kind of dashboard will be displayed.

So we will consider that we start by adding an `experiment` with `type` set to `test`. The following code shows an example.

```
experiment MyTest type: test autorun: true { 
    ...
}
```

Let's consider the following GAML code:
````
model TestModel

global {
    init {
	create test_agent number: 1;
    }
}

species test_agent {
    bool isGreater (int p1, int p2) {
	if (p1 >= p2) {
	    return true;
	} else {
	    return false;
	}
    }

    test testsOK {
	assert isGreater(5, 6) = false;
	assert isGreater(6, 5) = true;
    }
    
    test failingTests {
	assert ! isGreater(6, 6);
    }        
}

experiment MyTest type: test autorun: true { }
````

In this example, the defined action, `isGreater`, returns `true` if a parameter `p1` is greater than a parameter `p2` and `false` if not. So to test it, we declare a unit test using `test` and add inside several `assert` statements. For instance, `assert isGreater(5, 6) = false;` will return `true` if the result of `isGreater(5, 6)` is really false and `false` if not. So, if the action `isGreater` is well-defined, it should return `false`. Considering that "greater" and "greater and equal" should be two different functions, we add a test to check that `isGreater` does not return true in case of equality of its 2 operands. In this case, as the action is not-well implemented the test fails. 

The following picture illustrates the GUI dashboard for unit tests, showing for each test and even each assert whether it passes or fails. Clicking on the button will display in the GAML editor the code line.

![Interface for unit tests execution.](../resources/images/recipes/unit_tests_isgreater.png)

## Use of the `setup` statement

In a species where we want to execute several tests, it is common to want to have the same initial states, in order to prevent the previous tests to have modified the tested object and thus altering the unit test results. To this purpose, we can add the `setup` statement in the species and use it to set the expected initial state of the object to be tested. It will be called before every `test`.

As an example, in the following model, we want to test the operator `translated_by` and `translated_to` on a point. As each of them will modify the point object to be tested, wed add a `setup` to reinitialize it.

```
model TestModel

global {
    geometry loc <- {0,0};
	
    setup {
	loc <- {0,0};	
    }

    test translate_to {
	loc <- loc translated_to {10,10};
	loc <- loc translated_to {10,10};
	assert loc.location = {10,10};
    }
	
    test translated_by {
	loc <- loc translated_by {10,10};
	loc <- loc translated_by {10,10};
	assert loc.location = {20,20};
    }
}

experiment MyTest type: test autorun: true { }
```


## The test experiment

It is also possible to write tests in the `experiment`. The main idea is here to totally separate the model and its tests. 
As an example let's consider the following GAML code, which aims to test several GAML operators, related to the graph datatype:

````
model TestGraphs

global {
    graph the_graph;

    init {
	int i <- 10;
	create node_agent number: 7 {
	    location <- {i, i + ((i / 10) mod 2) * 10};
	    i <- i + 10;
	}

	the_graph <- as_distance_graph(node_agent, 30.0);
    }
}

species edge_agent {
    aspect default {
	draw shape color: #black;
    }
}

species node_agent {
    aspect default {
	draw circle(1) color: #red;
	loop neigh over: the_graph neighbors_of self {
	    draw line([self.location, agent(neigh).location]) color: #black;
	}
    }
}

experiment loadgraph type: gui {
    output {
	display map type: opengl {
	    species edge_agent;
	    species node_agent;
	}
    }
}

experiment MyTest type: test autorun: true {
    test "MyFirstTest" {
	write the_graph;
	write (node_agent[2]);
	write ("Degrees");
	write (the_graph in_degree_of (node_agent[2]));
	write (the_graph out_degree_of (node_agent[2]));
	write (the_graph degree_of (node_agent[2]));
	assert the_graph in_degree_of (node_agent[2]) = 4;
	write (the_graph out_degree_of (node_agent[2]));
	assert the_graph out_degree_of (node_agent[2]) = 4;
	assert the_graph degree_of (node_agent[2]) = 8;
    }
}
````
