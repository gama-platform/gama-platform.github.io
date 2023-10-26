---
title:  Defining Parameters
---

[//]: # (startConcept|define_parameters)
[//]: # (keyword|concept_parameter)
[//]: # (keyword|concept_gui)

When playing a simulation, you have the possibility to define input parameters, in order to change them and replay the simulation. Defining parameters allows to make the value of a global variable definable by the user through the user graphic interface.

## Index

* [Defining parameters](#defining-parameters)
* [Additional facets](#additional-facets)

## Defining parameters

You can define parameters inside the global scope when defining your global variables with the facet `parameter` (**this way of defining parameters is not the recommended one**, as it makes the variable a parameter of all the experiments that will be defined and does not offer the possibility to redefine its initial and possible values in several ways in each experiment):

```
global {
    int my_integer_global_value <- 5 parameter: "My integer global value";
}
```

When launching your experiment, the parameter will appear in your "Parameters" panel, with the name you chose for the `parameter` facet.

![The Parameter View with a single parameter.](/resources/images/definingGUIExperiment/parameters_1.png)

You can also define your parameter inside the experiment (**recommended**), using the statement `parameter`. You have to specify first the name of your parameter, then the name of the global variable through the facet `var`.

```
global {
    int my_integer_global_value <- 5;
}

experiment MyExperiment type: gui {
    parameter "My integer global value" var:my_integer_global_value;
}
```

NB: This variable has to be initialized with a value. If you do not want to initialize your value in the `global` block, you can initialize the value directly in the `parameter` statement, using the facet `init` or `<-`.

```
global {
    int my_integer_global_value;
}

experiment MyExperiment type: gui {
    parameter "My integer global value" var: my_integer_global_value init: 5;
}
```

## Additional facets

You can use some facets to arrange your parameters. For example, you can categorize your parameters under a label, using the facet `category`:

```
global {
    int attr_1 <- 5 ;
    int attr_2 <- 5 ;
    int attr_3 <- 5 ;
}

experiment MyExperiment type: gui {
    parameter "attr 1" category: "Category 1" var: attr_1 <- 5;
    parameter "attr 2" category: "Category 1" var: attr_2 <- 5;
    parameter "attr 3" category: "Category 2" var: attr_3 init: 5;
}
```

![The Parameter view with several categories.](/resources/images/definingGUIExperiment/parameters_3_category.png)

You also can add some facets such as `min`, `max`, `step` or `among` to improve the declaration of the parameter (and define the possible values the parameter can take). 

```
global {
    string fruit <- "none" ;
    string vegetable <- "none";
    int integer_variable <- 5;
}

experiment MyExperiment type: gui {
    parameter "fruit" category:"food" var: fruit <- "none" among:["none","apple","banana"] ;
    parameter "vegetable" category:"food" var: vegetable <- "none" among:["none","cabbage","carrot"];
    parameter "integer variable" category:"other"var: integer_variable <- 5 min:0 max:100 step:5;
}

```

We can notice that the parameters will not appear graphically in the same way if they are defined with a set of possible values (with `among`) or with a range of possible values (defined by a `min`, `max` and a `step`).

The definition of the initial value and of the possible values can be set in the `global` or in the `experiment` depending on the aim of this limitation: for example if a variable has a maximum value set to 1 in the global, this limitation can be used in the model in order that the variable value does not exceed this value. If the maximum boundary is set in the experiment, some executions of the model can be done without it...

![Parameter View with parameters defined with possible values.](/resources/images/definingGUIExperiment/parameters_possible_values.png)

[//]: # (endConcept|define_parameters)
