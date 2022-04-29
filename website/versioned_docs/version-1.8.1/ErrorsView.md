---
title: Errors View
id: version-1.8.1-ErrorsView
original_id: ErrorsView
---


Whenever a runtime error, or a warning, is issued by the currently running experiment, a view called "Errors" is opened automatically. This view provides, together with the error/warning itself, some contextual information about who raised the error (i.e. which agent(s)) and where (i.e. in which portion of the model code). As with other "status" in GAMA, errors will appear in red color and warnings in orange.

Since an error appearing in the code is likely to be raised by several agents at once, GAMA groups similar errors together, simply indicating which agent(s) raised them. Note that, unless the error is raised by the experiment agent itself, its message will indicate that at least 2 agents raised it: the original agent and the experiment in which it is plunged.

When we unfold the error, to have an idea of its location in the code. In addition clicking on one of the lines should highlight the corresponding line in the code.

![Error view in the case of an arithmetic error: division by 0.](../resources/images/runningExperiments/errors_view_div0.png)

One of the most current (and sometimes the most mysterious) error is linked to an empty agent (with the value `nil`) on which we want to access to one of its attributes. It is expressed by `Cannot evaluate ATTRIBUTE_NAME as the target agent is nil` or `Java nil`. In this case, modelers have to check carefully their codes to be sure that all the agent variables have a not nil value.


![Error view in the case of access to an attribute value of a nil agent.](../resources/images/runningExperiments/errors_view_nilagent.png)
