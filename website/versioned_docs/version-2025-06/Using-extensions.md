---
title:  Using extensions
---


The core GAMA software can be extended with some additional plugins, allowing the model to give more capabilities to agents (negotiation, using fuzzy logic, or Bayesian network) or providing connections to external softwares such as R or Matlab.

For instructions to install these additional plugins, interested readers can refer to the [dedicated page](InstallingPlugins).



## Selected plugins provided by the GAMA community

The update site located at the address `http://updates.gama-platform.org/experimental` contains new plugins for GAMA mainly developed by the GAMA community ([its Github repository is available here](https://github.com/gama-platform/gama.experimental)). **As the name of the repository highlights it, these plugins are for most of them still in development, before integration in the kernel of GAMA.**.
In addition, there are a few eclipse plugins that also work with GAMA.

The following plugins have been tested and  are still supported:
* **RJava**: to connect GAMA and R
* **Weka**: to connect GAMA and Weka
* [**Matlab**: to connect GAMA and Matlab](https://github.com/gama-platform/gama.experimental/tree/GAMA_1.9.2/ummisco.gama.extensions.matlab#readme)
* **Argumentation feature**: to allow agents to reason on an argument system
* **Bayesian Network feature**: to use Bayesian Network to make decision
* **Fuzzy logic**: to use fuzzy logic model to make decision
* **Launchpad**: 
* **Camisole**: 
* **ImageAnalysis**: to add image processing algorithms to gama 
* **Mike and Hecras**:
* **MPI**:
* **QRCode**: to add primitives to encode/decode QRCodes in gaml
* **Switch project**:
* **Uml Generator**: to be able to generate uml from gaml models inside the GAMA IDE 
* **Unity**: to connect GAMA to Unity
* **VR**: 
* **Gaming**: to add more interactive types of displays
* **Remote.Gui**: to allow exposing some model parameters in order to interact with external application through a network communication
* **ifcfile**: to add support for ifc files in gaml
* **Netcdf**: to add support for the NetCDF file format in gaml
* **Webcam**: to add webcam handling primitives in gaml 
* **Graphical editor**: to edit gaml models with graphical blocks instead of code
* **Markdown documentation**: to add the possibility to generate the markdown documentation of a model
* **Easy shell**: to add the eclipse [Easy shell](https://marketplace.eclipse.org/content/easyshell) plugin to the GAMA IDE
* **git client**: to add the eclipse git client into the GAMA IDE

### `RJava` plugin

This plugin allows the modeler to launch some computation on the [`R` software](https://www.r-project.org/). To this purpose, `R` should be installed on your computer and [GAMA should be properly configured](CallingR). 

This possible connection to `R` opens thus the possibility for the modeler to use all the statistical functions and libraries developed in this tool of reference. In addition, R scripts defined by the modeler can also be used directly from their GAMA model.


### Toward participative simulations with `Remote.Gui` and `Gaming` plugins

There are more and more applications of GAMA for participative simulations ([LittoSim](https://littosim.hypotheses.org/), [MarakAir](https://github.com/gnoubi/MarrakAir), [HoanKiemAir](https://github.com/WARMTeam/HoanKiemAir)...). There was thus a need for new features to improve the possible interactions with simulations and the definition of the Graphical User Interface. The two plugins `Remote.Gui` and `Gaming` (available in the "Participative simulation" category) attempts to fill this need.

* `Remote.Gui` allows exposing some model parameters, in order that they can be modified through [a network](UsingNetwork). This allows, for example, to develop a remote application (e.g. Android application) to control the parameters' values during the simulation. 
* `Gaming` allows the modeler to define displays that are much more interactive. This is used to define serious games in which the users can have a wide range of possible interactions with the simulation.

### `Weka` and `Matlab` plugins

Similarly to `RJava`, `Matlab` and `Weka` plugins allow the modeler to run computations on the [`Matlab`](https://fr.mathworks.com/products/matlab.html) and [Weka](https://www.cs.waikato.ac.nz/ml/weka/) software, taking advantages of all the possibilities of these softwares and of scripts defined by themselves.  

Notice that the `Matlab` plugin requires MATLAB 2019a to be installed and activated on your computer.

### The graphical editor

The graphical editor allows to create or edit existing GAMA models using only graphical elements, in a similar way to the [scratch programming language](https://scratch.mit.edu/). You can find a complete overview of the plugin [here](G__GraphicalEditor).

### The Git client

This plugin gives you the possibility to have the same git integration in GAMA than in eclipse, with dedicated views and contextual menus directly in the IDE. For more information you can go to it's [dedicated documentation](Using_Git).

