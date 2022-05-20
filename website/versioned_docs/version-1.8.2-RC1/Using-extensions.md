---
title:  Using extensions
---


The core GAMA software can be extended with some additional plugins, allowing the model to give more capabilities to agents (negotiation, using fuzzy logic, or Bayesian network) or providing connections to external softwares (such as R or Matlab).

For instructions to install these additional plugins, interested readers can refer to the [dedicated page](InstallingPlugins#rjava-plugin).



## Selected plugins provided by the GAMA community

The update site located at the address `http://updates.gama-platform.org/experimental` contains new plugins for GAMA mainly developed by the GAMA community ([its Github repository is available here](https://github.com/gama-platform/gama.experimental)). **As the name of the repository highlights it, these plugins are most of them still in development, before integration in the kernel of GAMA.**

The following plugins have been tested and  are still supported:
* **RJava**: to connect GAMA en R
* **Weka**: to connect GAMA en Weka
* **Matlab**: to connect GAMA en Matlab
* **Argumentation feature**: to allow agents to reason on an argument system
* **Bayesian Network feature**: to use Bayesian Network to make decision
* **Fuzzy logic**: to use fuzzy logic model to make decision
* **Launchpad**: 
* ****: 

### `RJava` plugin

This plugin allows the modeler to launch some computation on the [`R` software](https://www.r-project.org/). To this purpose, `R` should be installed on your computer and [GAMA should be properly configured](CallingR). 

This possible connection to `R` opens thus the possibility for the modeler to use all the statistical functions and libraries developed in this tool of reference. In addition, R scripts defined by the modeler can also be used directly from his/her GAMA model.


### Toward participative simulations with `Remote.Gui` and `Gaming` plugins

There are more and more applications of GAMA for participative simulations ([LittoSim](https://littosim.hypotheses.org/), [MarakAir](https://github.com/gnoubi/MarrakAir), [HoanKiemAir](https://github.com/WARMTeam/HoanKiemAir)...). There was thus a need for new features to improve the possible interactions with simulations and the definition of the Graphical User Interface. The two plugins `Remote.Gui` and `Gaming` (available in the "Participative simulation" category) attempts to fill this need.

* `Remote.Gui` allows exposing some model parameters, in order that they can be modified through [a network](UsingNetwork). This allows, for example, to develop a remote application (e.g. Android application) to control the parameters' values during the simulation. 
* `Gaming` allows the modeler to define displays that are much more interactive. This is used to define serious games in which the users can have a wide range of possible interactions with the simulation.

### `Weka` and `Matlab` plugins

Similarly to `RJava`, `Matlab` and `Weka` plugins allow the modeler to run computations on the [`Matlab`](https://fr.mathworks.com/products/matlab.html) and [Weka](https://www.cs.waikato.ac.nz/ml/weka/) software, taking advantages of all the possibilities of these softwares and of scripts defined by him/herself.  

Notice that the `Matlab` plugin requires that MATLAB 2019a is installed and activated on your computer.



