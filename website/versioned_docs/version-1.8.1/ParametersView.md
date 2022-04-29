---
title: Parameters View
id: version-1.8.1-ParametersView
original_id: ParametersView
---




In the case of an [experiment](DefiningGUIExperiment), the modeler can [define the parameters](DefiningParameters) s/he wants to be able to modify to explore the simulation, and thus the ones he wants to be able to display and alter in the GUI interface.

**It important to notice that all modifications made in the parameters will be taken into account in case of simulation reload only. Launch of a new experiment from the model perspective will erase the modifications.**



## Table of contents 

* [Parameters View](#parameters-view)
  * [Parameters View](#parameters-view)
  * [Modification of parameters values](#modification-of-parameters-values)


## Parameters View
The modeler can [define parameters](DefiningParameters) that can be displayed in the GUI and that are sorted by categories. Note that the interface will depend on the data type of the parameter: e.g. for string parameters, a simple text box will be displayed whereas a color selector will be available for color parameters. It can also depend on the way the parameter is defined: an integer or a float parameter will be displayed with a slider if its min and max values are defined, and a simple text field otherwise. The parameter's value displayed is the initial value provided to the variables associated with the parameters in the model.

![Example of parameters view.](../resources/images/runningExperiments/parameters_simple_parameter_view.png)


The above parameters view is generated from the following code:
```
global
{
	int i;
	float f;
	string s;
	list l;
	matrix m;
	pair p;
	rgb c;
}

experiment maths type: gui {
    parameter "my_integer" var: i <- 0 category:"Simple types";
    parameter "my_float" var: f <- 0.0 category:"Simple types";
    parameter "my_string" var: s <- "" category:"Simple types";

    parameter "my_list" var: l <- [] category:"Complex types";
    parameter "my_matrix" var: m <- matrix([[1,2],[3,4]]) category:"Complex types";
    parameter "my_pair" var: p <- 3::5 category:"Complex types";
    parameter "my_color" var: c <- #green category:"Complex types";

    output {}
}
```
Click on Edit button in case of list or map parameters or the color or matrix will open an additional window to modify the parameter value.


The model `Library models > Visualization and User Interaction > GUI Design > Interactive Elements.gaml` exemplifies all the possible way of displaying parameters (and other interactive elements). Even interactive elements (buttons or parameters will a behavior associated with a value change) can be added to the Parameter View.

![All the graphical way of viewing parameters in the simulation perspective.](../resources/images/runningExperiments/parameters_all_graphical_elements.png)


## Modification of parameters values

The modeler can modify the parameter values. After modifying the parameter values, you can reload the simulation by clicking on the top-right circular arrow button. 

It is important to understand that modification of a parameter value is immediately taken into account in the simulation: **the value of the variable in the model is modified**. **BUT** the effect on the simulation will depend on the use of this variable in the model:

* if the variable is used at initialization of the simulation (e.g. it contains the number of agents to be created), then a change of its value will not be visible in the simulation running as it is not used,
* if the variable is used during the simulation (e.g. the pheromones evaporation rate in ants models), a change in the parameter view will have an impact on the simulation behavior.

You can also add a new simulation to the old one, using those new parameters, by clicking on the top-right plus symbol button.

If he wants to come back to the initial value of parameters, he can click on the top-right red curved arrow of the parameters view.

![Buttons in the Parameter View.](../resources/images/runningExperiments/parameters_parameter_view_buttons.png)

