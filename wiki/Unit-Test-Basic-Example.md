---
layout: default
title: Example of Unit Test
wikiPageName: Unit-Test-Basic-Example
wikiPagePath: wiki/Unit-Test-Basic-Example.md
---
[//]: # (keyword|operator_any)
[//]: # (keyword|operator_is)
[//]: # (keyword|statement_setup)
[//]: # (keyword|statement_test)
[//]: # (keyword|statement_assert)
[//]: # (keyword|concept_test)
# Example of Unit Test


_Author : Benoit Gaudou_

A model which shows how to use the unit test to show the possible errors you have to go in the Views, Preferences, Simulation, in "Errors" Uncheck "stop at the first error", to show all the errors.


Code of the model : 

```

model test_unitTest_framework

global {
	init {
		create test_species number: 1;
	}
}

//Species to do the different unit tests
species test_species {
	int a <- 0;
	
	//Setup a to 10 launched before each test
	setup {
		a <- 10;
		write "SetUp : a = " + a;
	}

	//First test executing comparison between numbers
	test t1 {
     	assert 100 + 100 equals: 200;
    		assert 100 + 100 equals: 201;
	}
	
	//Second test executing comparison between list and type
	test t2 {
    	assert any([1,2,3]) is_not: nil;
    	assert any([1,2,3]) is int;
    	assert any([1,2,3]) is_not: 5;
    	assert any([1,2,3]) is float;
    	assert any([1,2,3]) is string;
	}

	//test the incrementation of a
	test incement_a {
   		a<- a + 10;
    		write "a: " + a;
	}
	
	//Third test for lists
	test t3 {
 		list<int> aa;
	 	assert aa[0] raises: "error";
	 	assert aa[0] raises: "";
	 	assert a raises: "error";
	}
}


experiment new type: gui {}
```
