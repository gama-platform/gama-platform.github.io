---
title:  GAMA
---


<p><img src="https://gama-platform.github.io/resources/images/general/GamaPlatform.png" width="100px" alt="GAMA logo" /></p>

GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations. 

* [**Multiple application domains:**](#multiple-application-domains) Use GAMA for whatever application domain you want. 
* [**High-level and Intuitive Agent-based language:**](#high-level-and-intuitive-agent-based-language) Write your models easily using GAML, a high-level and intuitive agent-based language.
* [**GIS and Data-Driven models:**](#gis-and-data-driven-models) Instantiate agents from any dataset, including GIS data, and execute large-scale simulations (up to millions of agents).
* [**Declarative user interface:**](#declarative-user-interface) Declare interfaces supporting deep inspections on agents, user-controlled action panels, multi-layer 2D/3D displays & agent aspects.

Its latest version, **1.8**, can be freely [downloaded](https://gama-platform.github.io/download) or [built from source](https://github.com/gama-platform/gama/), and comes pre-loaded with several models, [tutorials](Tutorials) and a complete [on-line documentation](Overview).

## Multiple application domains

GAMA has been developed with a very general approach and can be used for many application domains. Some [additional plugins](https://github.com/gama-platform/gama.experimental/tree/GAMA_1.8.1) had been developed to fit with particular needs.

Example of application domains where GAMA is mostly present:

* Transport
* Urban planning
* Epidemiology
* Environment

## Training sessions
Some [training sessions](TrainingSession) about topics such as "urban management", "epidemiology", "risk management" are also provided by the team.
Since GAMA is an open-source software that continues to grow, if you have any particular needs for improvement, feel free to [share it to its active community](https://groups.google.com/forum/#!forum/gama-platform)!

![Multiple application domains](/resources/images/general/multiple_application_domains.png)  

## High-level and intuitive agent-based language

Thanks to its high-level and intuitive language, GAMA has been developed to be used by non-computer scientists. You can declare your species, giving them some special behaviors, create them in your world, and display them in [less than 10 minutes](https://www.youtube.com/watch?v=YGHw1LSzd-E).

GAML is the language used in GAMA, coded in Java. It is an agent-based language, that provides you the possibility to build your model with [several paradigms of modeling](MultiParadigmModeling). Once your model is ready, some features allow you to [explore and calibrate it](ExploringModels), using the parameters you defined as input of your simulation.

We provide you a continual support through the [active mailing list](https://groups.google.com/forum/#!forum/gama-platform) where the team will answer your questions. Besides, you can learn GAML on your own, following the [step by step tutorial](LearnGAMLStepByStep), or [personal learning path](Tutorials) in order reach the point you are interested in.

![High level language](/resources/images/general/high_level_language.png)  


## GIS and Data-Driven models

GAMA (GIS Agent-based Modeling Architecture) provides you, since its creation, the possibility to load easily GIS (Geographic Information System).

You can import a [large number of data types](DataTypes), such as text, files, CSV, shapefile, OSM ([open street map data](ManipulateOSMDatas)), grid, images, SVG, but also 3D files, such as 3DS or OBJ, with their texture.

Some advanced features provide you the possibility to [connect GAMA to databases](UsingDatabase), and also to use powerful statistical tools such as [R](CallingR).

GAMA has been used in [large-scale projects](Projects), using a great number of agents (up to millions of agents).

![Data-driven models](/resources/images/general/data_driven_models.png)  


## Declarative user interface

GAMA provides you the possibility to have multiple displays for the same model. You can add as many visual representations as you want for the same model, in order to highlight a certain aspect of your simulation. Add easily new visual aspects to your agents.

Advanced [3D displays](Defining3DDisplays) are provided: you can control lights, cameras, and also adding textures to your 3D objects. On the other hand, dedicated statements allow you to define easily [charts](DefiningCharts), such as series, histogram, or pies.

During the simulations, some advanced features are available to [inspect the population of your agents](InspectorsAndMonitors). To make your model more interactive, you can add easily some [user-controlled action panels, or mouse events](DefiningUserInteraction).

![Declarative User Interface](/resources/images/general/declarative_UI.png)  

______________________________________
## Development Team

GAMA is developed by several teams under the umbrella of the IRD/SU international research unit [UMMISCO](http://www.ummisco.ird.fr/):

* [UMI 209 UMMISCO](https://www.ummisco.fr/), IRD, 32 Avenue Henri Varagnat, 93143 Bondy Cedex, France.
* [DREAM Research Team](http://www.cit.ctu.edu.vn), University of Can Tho, Vietnam (2011 - 2019).
* [UMR 5505 IRIT](http://www.irit.fr), CNRS/University of Toulouse 1, France (2010 - 2019).
* [UR MIAT](https://mia.toulouse.inra.fr), INRA, 24 Chemin de Borde Rouge, 31326 Castanet Tolosan Cedex, France (2016 - 2019).
* [UMR 6228 IDEES](http://www.umr-idees.fr), CNRS/University of Rouen, France (2010 - 2019).
* [UMR 8623 LRI](http://www.lri.fr), CNRS/University Paris-Sud, France (2011 - 2019).
* [MSI Research Team](http://www.ifi.auf.org/site/content/view/35/46/lang,french/), Vietnam National University, Hanoi, Vietnam (2007 - 2015).



## Citing GAMA
If you use GAMA in your research and want to cite it (in a paper, presentation, whatever), please use this reference:

> Taillandier, P., Gaudou, B., Grignard, A.,Huynh, Q.-N., Marilleau, N., P. Caillou, P., Philippon, D., & Drogoul, A. (2019). Building, composing and experimenting complex spatial models with the GAMA platform. Geoinformatica, (2019), 23 (2), pp. 299-322, [doi:10.1007/s10707-018-00339-6]

or you can choose to cite the website instead:

> GAMA Platform website, http://gama-platform.org

A complete list of references (papers and PhD theses on or using GAMA) is available on the [references](References) page.


## Acknowledgement  

![YourKit logo](/resources/images/introduction/yourkit_logo.png)  

YourKit supports open source projects with its full-featured Java Profiler.
YourKit, LLC is the creator of <a href="https://www.yourkit.com/java/profiler/index.jsp">YourKit Java Profiler</a>
and <a href="https://www.yourkit.com/.net/profiler/index.jsp">YourKit .NET Profiler</a>,
innovative and intelligent tools for profiling Java and .NET applications.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.