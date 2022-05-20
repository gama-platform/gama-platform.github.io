---
title:  GAMA Platform
---


GAMA is an open-source modeling and simulation development environment for building spatially explicit agent-based simulations. 
It has been developed with a very general approach and can be used in any [application domain](Projects).
). Some [additional plugins](InstallingPlugins#selected-plugins-provided-by-the-gama-community) have been developed to fit particular needs. The source code is available from the dedicated [Github repository](https://github.com/gama-platform/gama.experimental).

Its latest version, **1.8.2**, can be freely [downloaded](https://gama-platform.github.io/download) or built from [source](https://github.com/gama-platform/gama/), and comes preloaded with hundreds of models, [tutorials](Tutorials) and a complete [on-line documentation](Overview).

## Large data-driven models

GAMA provides, since its creation, the possibility to load and manipulate GIS (Geographic Information System) data in the models. One can also import and directly use a [large number of data types](DataTypes), such as CSV files, shapefiles, OSM ([open street map data](ManipulateOSMDatas)), grid, images, SVG, but also 3D files, such as 3DS or OBJ. It also provides models with the possibility to directly [connect to databases](UsingDatabase) and use external tools and environments such as [R](CallingR).

![Data-driven models](/resources/images/general/data_driven_models.png)  

## High-level and intuitive agent-based language

Thanks to GAML, its high-level and intuitive language, GAMA has been developed to be used by non-computer scientists: one can actually create a simulated world, declare species of agents, provide them with behaviors, and display them and their interactions in [less than 10 minutes](https://www.youtube.com/watch?v=YGHw1LSzd-E). GAML also offers all the power needed by advanced modellers: being an agent-oriented language coded in Java, it provides the possibility to build integrated models with [several paradigms of modeling](MultiParadigmModeling), to [explore their parameters space and calibrate them](ExploringModels) and to run virtual experiments, all of these without leaving the platform.

GAML can be learnt easily by following first the [step by step tutorial](LearnGAMLStepByStep) and then exploring the other [tutorials](Tutorials) and pedagogical resources available throughout this site. Since 2007, the developers behind GAMA also provide a continuous support through the [active mailing list](https://groups.google.com/forum/#!forum/gama-platform). Finally, in addition to this online support, [training sessions](TrainingSession) for specialised audiences, on topics such as "urban management", "epidemiology", "risk management" are also organised and delivered by GAMA developers and users. 

## Declarative user interface

The user interface for both writing models and running experiments is one of the strongest points of GAMA. The platform indeed provides the possibility to have multiple displays for the same model, add as many visual representations as needed for the agents and therefore highlight the elements of interest in the simulations easily and beautifully. 
Advanced [3D displays](Defining3DDisplays) are provided with all the support required for realistic renderings. Of course, dedicated statements allow to easily define [charts](DefiningCharts) for more dashboard-like presentations.

During simulations, interactive features can be made available to [inspect the population of agents](InspectorsAndMonitors), define [user-controlled action panels, or interactions with the displays](DefiningUserInteraction) and external devices. 

![Declarative User Interface](/resources/images/general/welcome_page_modeling_simulation_perspective.png)  

______________________________________
## Development Team

GAMA is developed by several teams under the umbrella of the IRD/SU international research unit [UMMISCO](http://www.ummisco.fr/):

* [UMI 209 UMMISCO](https://www.ummisco.fr/), IRD/SU, 32 Avenue Henri Varagnat, 93143 Bondy Cedex, France.
* [ACROSS International Joint Lab](https://across-lab.org), Thuyloi University, Hanoi, Vietnam (since 2021)
* [DREAM Research Team](http://www.cit.ctu.edu.vn), University of Can Tho, Vietnam (since 2011).
* [UMR 5505 IRIT](http://www.irit.fr), CNRS/University of Toulouse 1, France (since 2010).
* [UR MIAT](https://mia.toulouse.inra.fr), INRAE, 24 Chemin de Borde Rouge, 31326 Castanet Tolosan Cedex, France (since 2016).
* [UMR 6228 IDEES](http://www.umr-idees.fr), CNRS/University of Rouen, France (2010 - 2019).
* [UMR 8623 LRI](http://www.lri.fr), CNRS/University Paris-Sud, France (2011 - 2019).
* [MSI Research Team](https://ifi.vnu.edu.vn/en/news/Research/Modeling-and-Simulation-Lab-MSI-LAB-346.html), Vietnam National University, Hanoi, Vietnam (2007 - 2015).



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