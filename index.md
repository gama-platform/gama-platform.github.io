---
layout: default
title: Welcome to Gama Platform
wikiPageName: Home
wikiPagePath: wiki/Home.md
---

**The new website of GAMA is now available at this address : [gama-platform.org](http://gama-platform.org/)**

<div style="text-align:center"><img src ="https://github.com/gama-platform/gama/wiki/resources/images/general/GamaPlatform.png" width="800"/></div>

GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations. 

* [**Multiple application domains :**](#multiple-application-domains) Use GAMA for whatever application domain you want.
* [**High-level and Intuitive Agent-based language :**](high-level-and-intuitive-agent-based-language) Write your models easily using GAML, a high-level and intuitive agent-based language.
* [**GIS and Data-Driven models :**](#gis-and-data-driven-models) Instantiate agents from any dataset, including GIS data, and execute large-scale simulations (up to millions of agents).
* [**Declarative user interface :**](#declarative-user-interface) Declare interfaces supporting deep inspections on agents, user-controlled action panels, multi-layer 2D/3D displays & agent aspects.

Its latest version, **1.7**, can be freely [downloaded](Download) or [built from source](https://github.com/gama-platform/gama/), and comes pre-loaded with several models, [tutorials](Tutorials) and a complete [on-line documentation](Overview).

## Multiple application domains

GAMA has been developed with a very general approach, and can be used for many application domains. Some [additional plugins](TODO_URL) had been developed to fit with particular needs.

Example of application domains where GAMA is mostly present :
* Transport
* Urban planning
* Epidemiology
* Environment

Some [training sessions](TrainingSession) about topics such as "urban management", "epidemiology", "risk management" are also provided by the team.
Since GAMA is an open-source software that continues to grow, if you have any particular needs of improvement, feel free to [share it to its active community](https://groups.google.com/forum/#!forum/gama-platform) !

<div style="text-align:center"><img src ="https://github.com/gama-platform/gama/wiki/resources/images/general/multiple_application_domains.png" width="800"/></div>

## High level and intuitive language

Thanks to its high-level and intuitive language, GAMA has been developed to be used by non-computer scientists. You can declare your species, giving them some special behaviors, create them in your world, and display them in [less than 10 minutes](TODO_URL).

GAML is the language used in GAMA, coded in Java. It is an agent-based language, that provides you the possibility to build your model with [several paradigms of modeling](MultiParadigmModeling). Once your model is ready, some features allows you to [explore and calibrate it](ExploringModels), using the parameters you defined as input of your simulation.

We provides you a continual support through the [active mailing list](https://groups.google.com/forum/#!forum/gama-platform) where the team will answer your questions. Besides, you can learn GAML on your own, following the [step by step tutorial](LearnGAMLStepByStep), or [personal learning path](TODO_URL) in order reach the point you are interested in.

<div style="text-align:center"><img src ="https://github.com/gama-platform/gama/wiki/resources/images/general/high_level_language.png" width="800"/></div>

## GIS and Data-Driven models

GAMA (GIS Agent-based Modeling Architecture) provides you, since its creation, the possibility to load easily GIS (Geographic Information System).

You can import a [large number of data types](DataTypes), such as text, files, CSV, shapefile, OSM ([open street map data](ManipulateOSMDatas)), grid, images, SVG, but also 3D files, such as 3DS or OBJ, with their texture.

Some advanced features provides you the possibility to [connect GAMA to databases](UsingDatabase), and also to use powerful statistical tools such as [R](CallingR).

GAMA has been used in [large-scale projects](Projects), using a great number of agents (up to millions of agents).

<div style="text-align:center"><img src ="https://github.com/gama-platform/gama/wiki/resources/images/general/data_driven_models.png" width="800"/></div>

## Declarative user interface

GAMA provides you the possibility to have multiple displays for the same model. You can add as much visual representations as you want for the same model, in order to highlight a certain aspect of your simulation. Add easily new visual aspects to your agents.

Advanced [3D displays](Defining3DDisplays) are provided : you can control lights, cameras, and also adding textures to your 3D objects. In an other hand, dedicated statements allows you to define easily [charts](DefiningCharts), such as series, histogram, or pies.

During the simulations, some advanced features are available to [inspect the population of your agents](InspectorsAndMonitors). To make your model more interactive, you can add easily some [user-controlled action panels, or mouse events](DefiningUserInteraction).

<div style="text-align:center"><img src ="https://github.com/gama-platform/gama/wiki/resources/images/general/declarative_UI.png" width="800"/></div>

______________________________________


GAMA is developed by several teams under the umbrella of the IRD/UPMC international research unit [UMMISCO](http://www.ummisco.ird.fr/):

* [MSI Research Team](http://www.ifi.auf.org/site/content/view/35/46/lang,french/), Vietnam National University, Hanoi, Vietnam (2007 - 2015)
* [UMR 6228 IDEES](http://www.umr-idees.fr), CNRS/University of Rouen, France (2010 - 2015)
* [UMR 5505 IRIT](http://www.irit.fr), CNRS/University of Toulouse 1, France (2010 - 2015)
* [DREAM Research Team](http://www.cit.ctu.edu.vn), University of Can Tho, Vietnam (2011 - 2015)
* [UMR 8623 LRI](http://www.lri.fr), CNRS/University Paris-Sud, France (2011 - 2015)

---

**Acknowledgement**:  

![](https://www.yourkit.com/images/yklogo.png)  

*YourKit supports open source projects with its full-featured Java Profiler.
YourKit, LLC is the creator of <a href="https://www.yourkit.com/java/profiler/index.jsp">YourKit Java Profiler</a>
and <a href="https://www.yourkit.com/.net/profiler/index.jsp">YourKit .NET Profiler</a>,
innovative and intelligent tools for profiling Java and .NET applications.*
