---
title:  GAMA
---


GAMA is an easy-to-use open source modeling and simulation environment for creating spatially explicit agent-based simulations. 
It has been developed to be used in any [application domain](projects): urban mobility, climate change adaptation, epidemiology, disaster evacuation strategy design, urban planning, are some of the application domains in which GAMA users are involved and for which they create models.

The generality of the agent-based approach advocated by GAMA is accompanied by a high degree of openness, which is manifested, for example, in the development of [plugins](InstallingPlugins#selected-plugins-provided-by-the-gama-community) designed to meet specific needs, or by the possibility of calling GAMA from other software or languages (such as R or Python). 
This openness allows the more than 2000 users of GAMA to use it for a wide variety of purposes: scientific simulation, scenario exploration and visualization, negotiation support, serious games, mediation or communication tools, the possibilities are endless! 

The latest version of GAMA, labeled **1.9.1**, can be freely [downloaded](https://gama-platform.github.io/download) or built from [source](https://github.com/gama-platform/gama/), and comes with hundreds of templates, [tutorials](Tutorials), and extensive [online documentation](#Documentation).

## Data-driven models

The relevance of agent-based models depends largely on the quality of the data on which they are built and the ease with which they can access it. GAMA offers the possibility to load and manipulate easily GIS (Geographic Information System) data in the models, in order to make them the environment of artificial agents. It is also possible to directly import and use directly in models a [large number of data types](DataTypes), such as CSV files, Shapefiles, [OSM](ManipulateOSMDatas) data, grids, images, SVG files, but also 3D files, such as 3DS or OBJ. GAMA also offers models the possibility to connect directly to [databases](UsingDatabase) and to use external tools and environments such as [R](CallingR).


## GAML, a high-level, intuitive agent-based language

GAMA, although dedicated to providing a scientific approach to model building and exploration, was also developed to be used by non-computer scientists: it is possible to create a simulated world, declare agent species, assign behaviors to them and display them and their interactions in [less than 10 minutes] (https://www.youtube.com/watch?v=YGHw1LSzd-E). 

GAML also offers all the power needed by advanced modelers: being an agent-oriented language coded in Java, it offers the possibility to build integrated models with [several modeling paradigms] (MultiParadigmModeling), to [explore their parameter space and calibrate them] (ExploringModels) and to run virtual experiments with powerful visualization capabilities, all without leaving the platform.

GAML can be learned easily by first following the [step-by-step tutorial](LearnGAMLStepByStep) and then exploring the other [tutorials](Tutorials) and educational resources available on this site. Since 2007, the GAMA developers have also provided ongoing support via the [active mailing list](https://groups.google.com/forum/#!forum/gama-platform). Finally, in addition to this online support, [training sessions](TrainingSession) for specialized audiences, on topics such as urban management, epidemiology, risk management, are also organized and delivered by GAMA developers and users. 

## Declarative user interface

The user interface for writing models and running experiments is one of the strong points of GAMA. The platform offers the possibility to have several displays for the same model, to add as many visual representations as necessary for the agents and thus to highlight the elements of interest in the simulations easily and nicely. 

The [3D displays](Defining3DDisplays) are provided with all the necessary support for realistic rendering. A rich set of instructions makes it easy to define [graphics](DefiningCharts) for more dashboard-like presentations.

During simulations, interactive features can be made available to [inspect the population of agents](InspectorsAndMonitors), define [user-controlled action panels, or interactions with the displays](DefiningUserInteraction) and external devices. GAMA also includes specific modules and plugins to handle the interactivity with the users through networks, handhelds, and other remote devices. 

![Declarative User Interface](/resources/images/general/welcome_page_modeling_simulation_perspective.png)  

## Documentation

Beyond these features, GAMA also offers:

* A large and extensible library of primitives (agent's movement, communication, mathematical functions, graphical features, ...)
* A cross-platform reproducibility of experiments and simulations
* A complete set of batch tools, allowing for a systematic or "intelligent" exploration of models parameters spaces

and much more ! 

All the features of GAMA are documented online on this wiki. It is organized around a few central activities ([installing GAMA](Installation), [writing models](WritingModels), [running experiments](LaunchingExperiments), [developing new extensions to the platform](DevelopingExtensions)) and provides complete references on both the [GAML language](GamlLanguage), the platform itself, the scientific aspects behind GAMA (with a complete [bibliography](References)), and also all the communication around it, notably videos [here](Resources_TrainingVideos) and [here](LargeProjects). Several [tutorials](Tutorials) are also provided in the documentation in order to minimize the learning curve, allowing users to build, step by step, the models corresponding to these tutorials, which are of course shipped with the platform. The documentation can be accessed from the sidebar of this page. A good starting point for new users is [the installation page](Installation).

## Source Code
GAMA can be [downloaded](https://gama-platform.org/download) as a regular application or [built from source](https://github.com/gama-platform/gama), which is necessary if you want to contribute to the platform. The source code is available from this GITHub repository:

```
https://github.com/gama-platform/gama
```

Which you can also browse from [here](https://github.com/gama-platform/gama).
It is, in any case, recommended to follow the instructions on [this page](InstallingGitVersion) in order to build GAMA from source.

## Citing GAMA
If you use GAMA in your research and want to cite it (in a paper, presentation, whatever), please use this reference:

> Taillandier, P., Gaudou, B., Grignard, A.,Huynh, Q.-N., Marilleau, N., P. Caillou, P., Philippon, D., & Drogoul, A. (2019). Building, composing and experimenting complex spatial models with the GAMA platform. Geoinformatica, (2019), 23 (2), pp. 299-322, [doi:10.1007/s10707-018-00339-6]

or you can choose to cite the website instead:

> GAMA Platform website, http://gama-platform.org

A complete list of references (papers and PhD theses on or using GAMA) is available on the [references](References) page.

## Contact Us
To get in touch with the GAMA developers team, please sign in for the [gama-platform@googlegroups.com mailing list](http://groups.google.com/group/gama-platform). If you wish to contribute to the platform, you might want, instead or in addition, to sign in for the [gama-dev@googlegroups.com mailing list](http://groups.google.com/group/gama-dev). On both lists, we generally answer quite quickly to requests.

Finally, to report bugs in GAMA or ask for a new feature, please refer to  [these instructions](Troubleshooting#Submitting_an_Issue) to do so.

## Copyright Information
This is a free software (distributed under the GNU GPL v3 license), so you can have access to the code, edit it and redistribute it under the same terms. Independently of the licensing issues, if you plan on reusing part of our code, we would be glad to know it !


## Acknowledgement  

![YourKit logo](/resources/images/introduction/yourkit_logo.png)  

YourKit supports open source projects with its full-featured Java Profiler.
YourKit, LLC is the creator of <a href="https://www.yourkit.com/java/profiler/index.jsp">YourKit Java Profiler</a>
and <a href="https://www.yourkit.com/.net/profiler/index.jsp">YourKit .NET Profiler</a>,
innovative and intelligent tools for profiling Java and .NET applications.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.