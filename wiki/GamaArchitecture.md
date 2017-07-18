---
layout: default
title: Architecture of GAMA
wikiPageName: GamaArchitecture
wikiPagePath: wiki/GamaArchitecture.md
---
# Architecture of GAMA



GAMA is made of a number of Eclipse Java projects, some representing the core projects without which the platform cannot be run, others additional plugins adding functionalities or concepts to the platform.

__Vocabulary:__
Each project is either designed as a __plugin__ (containing an xml file "plugin.xml") or as a __feature__ (containing an xml file "feature.xml").
  * A __plugin__ can be seen as a module (or bundle in the OSGI architecture), which can be necessary (the GAMA platform can't run without it) or optional (providing new functionalities to the platform). This decomposition between several plugins ensure the cohesion between functional blocks, each plugin has to be as independent as he can.
  * A __feature__ is a group of one or several modules (or plugin), which can be loaded. NB : Unlike a plugin, a feature does not include source code, but only two files : a build.properties and a feature.xml.

To see how to create a plugin and a feature, please read [this page](InstallingGitVersion).

## Table of contents 

* [Architecture of GAMA](#architecture-of-gama)
	* [The minimal configuration](#the-minimal-configuration)
	* [Optional Plugins](#optional-plugins)
		* [Plugins present in the release version](#plugins-present-in-the-release-version)
		* [Plugins not present by default in the release version](#plugins-not-present-by-default-in-the-release-version)
		* [Plugins not designated to be in the release version](#plugins-not-designated-to-be-in-the-release-version)
	* [Unmaintained projects](#unmaintained-projects)
	* [Features](#features)
	* [Models](#models)
	* [Plugins overview](#plugins-overview)

## The minimal configuration

Here is the list of projects which have to be imported in order to run the GAMA platform, and to execute a simple model in gaml language:

  * `msi.gama.core` : Encapsulates the core of the modeling and simulation facilities offered by the platform : runtime, simulation, meta-model, data structures, simulation kernel, scheduling, etc. It contains 2 main packages :
    * `msi.gama`
    * `msi.gaml`, wich defines the GAML modeling language: keywords, operators, statements, species, skills�
  * `msi.gama.application` : Describes the graphical user interface (`msi.gama.gui` package). This project also contains the file gama1.7.Eclipse3_8_2.product, when you can configure the application (and also launch the application). It contains the following sub-packages :
    * `msi.gama.gui.displays`
    * `msi.gama.gui.navigator`
    * `msi.gama.gui.parameters`
    * `msi.gama.gui.swt`
    * `msi.gama.gui.views`
    * `msi.gama.gui.wizards`
    * `msi.gama.gui.viewers`
  * `msi.gama.ext` : Gathers all the external libraries upon which GAMA relies upon
    * `msi.gama.lang.gaml` : Contains the gaml.xtext file which defines the GAML grammar
    * `msi.gama.lang.gaml.ui` : Contains the GAML Editor (syntax highlighting, code completion�)
  * `msi.gama.processor` : Is responsible for processing the annotations made in the Java source code and producing additions to GAML (Java, properties and documentation files), which are added into a source package called "gaml.additions" (containing two main generated files: GamlAdditions.java and GamlDocumentation.java). These additions are loaded automatically when GAMA launches, allowing extensions made by developers in other plugins to be recognized when their plugin is added to the platform.
  * `ummisco.gaml.editbox` : Project used to define the edit boxes in the gaml ui.

Minimal configuration projects dependencies:

![Minimal configuration projects dependencies](resources/images/developpingExtension/minimal_configuration.png)

## Optional Plugins

### Plugins present in the release version
From this minimal configuration, it is possible to add some features. Here is the list of the features installed by default in the release version:
  * `idees.gama.mapcomparison` : Contains some useful tools to do map comparaison
  * `msi.gaml.extensions.fipa` : Provides some operators for communication between agents, using the FIPA standards
  * `msi.gama.headless` : Enables to run simulations in console mode
  * `simtools.gaml.extensions.traffic` : Provides operators and skills for traffic simulation
  * `simtools.gaml.extensions.physics` : Physics engine, collision modelling, using the library JBullet
  * `ummisco.gaml.extensions.maths` : Solving differential equation, using Euler methods and Runge Kutta.
  * `irit.gaml.extensions.database` : Provides database manipulation tools, using SQL requests
  * `irit.gaml.extensions.test` : Add unitary test statements
  * `ummisco.gama.opengl` : Provide a 3D visualization using OpenGL.
  * `simtools.gamanalyzer.fr` : Adding tools for the analysis of several execution result of a simulation (in order to find some correlations).
  * `dream.gama.opengis` : Used to load some geographic information datas from online GIS server.
  * `simtools.graphanalysis.fr` : Advanced graph operators
 
### Plugins not present by default in the release version
Some other plugins are not present by default in the release version (because their use is very specific), but it's possible to install them through features.
Here is the list of those plugins:
  * `idees.gama.weka` : Data-mining operators, using the library Weka.
  * `msi.gaml.architecture.simplebdi` : Architecture for using the Belief-Desire-Intention software model.
  * `ummisco.gaml.extensions.sound` : Use of sound in simulations
  * `ummisco.gaml.extensions.stats` : Advanced statistics operators
  * `ummisco.gama.communicator` : Communication between several instances of GAMA
  * `ummisco.gaml.extensions.rjava` : Adding the R language into GAMA for data mining
 
### Plugins not designated to be in the release version
Other plugins will never be on the released version, and will never be loaded during the gama execution. They are just used in the "developer" version:
  * `msi.gama.documentation` : Generate automatically the documentation in the wiki form (and also a pdf file)
 
## Unmaintained projects

Some other projects are still in the git repository in case we need to work on it one day, but they are either unfinished, obsolete, or used in very rare situations (They are not delivered in release versions, of course). Here is the list :
  * `cenres.gaml.extensions.hydro` : Provide some tools in order to create hydrology models
  * `msi.gaml.extensions.traffic2d` : Provide some tools for traffic in 2 dimensions (depreciated, now replace by msi.gaml.extensions.traffic)
  * `msi.gaml.extensions.humainmoving` : Provide a skill to represent human movement
  * `ummisco.gama.gpu` : Computation directly on the GPU for more efficiency. Results or not concluant, slower than using CPU.
  * `msi.gama.hpc` : "High Power Computing" to execute gama simulation in several computer.
  * `msi.gaml.extensions.cplex` : Originaly designed to be able to run CPLEX function in GAMA. The CPLEX is a proprietary library, we can't deliver it in the project. Instead, we use a stub, "cplex.jar", that you can replace by the real cplex.jar file.
  * `irit.maelia.gaml.additions` : Used for the project "Maelia". Provide the possibility to represent the computing time in a simulation.
  * `msi.gama.display.web` : Originaly designed to run some GAMA simulation in a browser, inside gama application, using WebGL. Does not work for the moment
  * `ummisco.miro.extension` : Once used for the "miro" project, no longer used.
  * `ummisco.miro.extension.traffic` : Once used for the "miro" project, no longer used.
 
## Features
 
  * `ummisco.gama.feature.audio` : sound plugin
  * `ummisco.feature.stats` : stats plugin
  * `ummisco.gama.feature.opengl.jogl2` : gathers physics and opengl plugins
  * `simtools.graphlayout.feature` : gathers core, ext, processor and graphanalysis plugins
  * `ummisco.gama.feature.core` : gathers mapcomparison, database, test, application, core, ext, headless, gaml, gaml.ui, processor, fipa, traffic and maths plugins
  * `ummisco.gama.feature.dependencies` : a bunch of libraries and plugins
  * `other.gama.feature.plugins` gathers hydro, opengis, addition, web, hpc, cplex, traffic2d, communicator, gpu, stats, extensions and traffic plugins
  * `ummisco.gama.feature.models` : model plugin
  * `idees.gama.features.weka` : weka plugin
  * `ummisco.gama.feature.jogl2.product` : gathering of the following features : core, dependencies, models, jogl2
  * `ummisco.gama.feature.product` : gathering of the following features : core, dependencies, models, jogl1
 
## Models
 
Beside those plugins and features, a project dedicated to gather a bunch of examples is also in the git repository. It contains gaml code:
  * `msi.gama.models`

## Plugins overview

Global architecture of GAMA (nb : the features graphlayout, core, dependencies, plugins, jogl2.product and product are not represented here)

![Global architecture of GAMA](resources/images/developpingExtension/plugin_architecture.png)
