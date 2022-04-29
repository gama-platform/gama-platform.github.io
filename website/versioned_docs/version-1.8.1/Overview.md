---
title: Introduction
id: version-1.8.1-Overview
original_id: Overview
---



[![Demonstration of some of the features of the GAMA Platform](../resources/images/introduction/youtubeVideo1.jpg)](http://www.youtube.com/watch?v=6m_-UY8UBuk)

**GAMA** is a simulation platform, which aims at providing field experts, modellers, and computer scientists with a complete modelling and simulation development environment for building spatially explicit multi-agent simulations. It has been first developed by the Vietnamese-French research team MSI (located at IFI, Hanoi, and part of the IRD/SU International Research Unit UMMISCO) from 2007 to 2010, and is now developed by a consortium of academic and industrial partners led by UMMISCO, among which the University of Rouen, France, the University of Toulouse 1, France, the University of Orsay, France, the University of Can Tho, Vietnam, the National University of Hanoi, EDF R&D, France, and CEA LISC, France.

[![Gama 1.6 Trailer. Agent-based simulation platform](../resources/images/introduction/youtubeVideo2.jpg)](http://www.youtube.com/watch?v=ycbeYxV2B7M)

Some of the features of GAMA are illustrated in the videos above (more can be found [in our Youtube channel](http://www.youtube.com/channel/UCWJ1kWGDDI-9u2f2uD0gcaQ)).

Beyond these features, GAMA also offers:

* A complete modeling language, GAML, for modeling agents and environments
* A large and extensible library of primitives (agent's movement, communication, mathematical functions, graphical features, ...)
* A cross-platform reproducibility of experiments and simulations
* A powerful declarative drawing and plotting subsystem
* A flexible user interface based on the Eclipse platform
* A complete set of batch tools, allowing for a systematic or "intelligent" exploration of models parameters spaces


## Documentation
The documentation of GAMA is available online on the wiki of the project. It is organized around a few central activities ([installing GAMA](Installation), [writing models](WritingModels), [running experiments](LaunchingExperiments), [developing new extensions to the platform](DevelopingExtensions)) and provides complete references on both the [GAML language](GamlLanguage), the platform itself, and the scientific aspects of our work (with a complete [bibliography](References)). Several [tutorials](Tutorials) are also provided in the documentation in order to minimize the learning curve, allowing users to build, step by step, the models corresponding to these tutorials, which are of course shipped with the platform.

The documentation can be accessed from the sidebar of this page. A good starting point for new users is [the installation page](Installation).

A standalone version of the documentation, in PDF format, can be directly downloaded [here](https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv17.pdf)


## Source Code
GAMA can be [downloaded](Download) as a regular application or [built from source](https://github.com/gama-platform/gama), which is necessary if you want to contribute to the platform.
The source code is available from this GITHub repository:

```
https://github.com/gama-platform/gama
```

Which you can also browse from the web [here](https://github.com/gama-platform/gama).
It is, in any case, recommended to follow the instructions on [this page](InstallingGitVersion) in order to build GAMA from source.




## Copyright Information
This is a free software (distributed under the GNU GPL v3 license), so you can have access to the code, edit it and redistribute it under the same terms. Independently of the licensing issues, if you plan on reusing part of our code, we would be glad to know it !




## Developers
GAMA is being designed, developed and maintained by an active group of researchers coming from different institutions in France and Vietnam. Please find below a short introduction to each of them and a summary of their contributions to the platform:

* **[Alexis Drogoul](https://www.researchgate.net/profile/Alexis_Drogoul)**, Senior Researcher at the [IRD](http://www.ird.fr), member of the [UMMISCO](http://www.ummisco.ird.fr) International Research Unit. Mostly working on agent-based modeling and simulation. Has contributed and still contributes to the original design of the platform, including the GAML language (from the meta-model to the editor) and simulation facilities like Java2D displays.
* **[Patrick Taillandier](https://www.researchgate.net/profile/Patrick_Taillandier)**, Researcher at [INRA](http://www.inra.fr/en/), member of the [MIAT](https://mia.toulouse.inra.fr) Research Unit. Contributes since 2008 to the spatial and graph features (GIS integration, spatial operators). Currently working on new features related to graphical modeling, BDI agent architecture, and traffic simulation.
* **[Benoit Gaudou](http://www.researchgate.net/profile/Benoit_Gaudou)**, Associate Professor at the [University Toulouse 1 Capitole](http://www.ut-capitole.fr/), member of the [IRIT](http://www.irit.fr/) CNRS Mixed Research Unit. Contributes since 2010 to documentation and unit test generation and coupling mathematical (ODE and PDE) and agent paradigms.
* **[Arnaud Grignard](https://www.media.mit.edu/people/agrignar/overview/)**, Research Scientist at [MIT MediaLab](https://www.media.mit.edu/), member of the [CityScience Group](https://www.media.mit.edu/groups/city-science/overview/),  software engineer and PhD fellow ([PDI-MSC](http://www.ummisco.ird.fr/pdi/)) at [SU](http://www.upmc.fr/). Contributes since 2011 to the development of new features related to visualization, interaction, online analysis and tangible interfaces.
* **[Huynh Quang Nghi](https://www.researchgate.net/profile/Huynh_Quang_Nghi2)**, software engineering lecturer at [CTU](http://www.ctu.edu.vn) and PhD fellow ([PDI-MSC](http://www.ummisco.ird.fr/pdi/)) at [SU](http://www.upmc.fr/). Contributes since 2012 to the development of new features related to GAML parser, coupling formalisms in EBM-ABM and ABM-ABM.
* **[Truong Minh Thai](https://www.researchgate.net/profile/Thai_Truong_Minh)**, software engineering lecturer at [CTU](http://www.ctu.edu.vn/) and PhD fellow (PRJ322-MOET) at [IRIT](http://www.irit.fr/)-[UT1](http://www.ut-capitole.fr/). Contributes since 2012 to the development of new features related to data management and analysis.
* **[Nicolas Marilleau](http://www.ummisco.ird.fr/index.php?option=com_members&view=member&uid=62&Itemid=70)**, Researcher at the [IRD](http://www.ird.fr), member of the [UMMISCO](http://www.ummisco.ird.fr) International Research Unit and associate researcher at [DISC](http://disc.univ-fcomte.fr) team of [FEMTO-ST](http://www.femto-st.fr) institute. Contributes since 2010 to the development of headless mode and the high performance computing module.
* **[Philippe Caillou](https://www.lri.fr/~caillou)**, Associate professor at the [University Paris Sud 11](http://www.u-psud.fr), member of the [LRI](http://www.lri.fr) and [INRIA](http://www.inria.fr) project-team [TAO](https://tao.lri.fr/tiki-index.php). Contributes since 2012 and actually working on charts, simulation analysis and BDI agents.
* **[Vo Duc An](https://www.researchgate.net/profile/Duc-An_Vo)**, Post-doctoral Researcher, working on synthetic population generation in agent-based modelling, at the [UMMISCO](http://www.ummisco.ird.fr) International Research Unit of the [IRD](http://www.ird.fr). Has contributed to bringing the platform to the Eclipse RCP environment and to the development of several features (e.g., the FIPA-compliant agent communication capability, the multi-level architecture).
* **[Truong Xuan Viet](https://www.researchgate.net/profile/Viet_Truong_Xuan)**, software engineering lecturer at [CTU](http://www.ctu.edu.vn) and PhD fellow ([PDI-MSC](http://www.ummisco.ird.fr/pdi/)) at [SU](http://www.upmc.fr/). Contributes since 2011 to the development of new features related to R caller, online GIS (OPENGIS: Web Map Service - WMS, Web Feature Services - WMS, Google map, etc).
* Samuel Thiriot
* **[Jean-Daniel.Zucker](https://www.researchgate.net/profile/Jean-daniel_Zucker)**, Senior Researcher at the [IRD](http://www.ird.fr), member and director of the [UMMISCO](http://www.ummisco.ird.fr) International Research Unit. Mostly working on Machine Learning and also optimization using agent-based modeling and simulation. Has contributed to different models and advised different students on GAMA since its beginning.

## Citing GAMA
If you use GAMA in your research and want to cite it (in a paper, presentation, whatever), please use this reference:

> Taillandier, P., Gaudou, B., Grignard, A., Huynh, Q.N., Marilleau, N., Caillou, P., Philippon, D., Drogoul, A. (2018), Building, composing and experimenting complex spatial models with the GAMA platform. In Geoinformatica, Springer, https://doi.org/10.1007/s10707-018-00339-6.

or you can choose to cite the website instead:

> GAMA Platform website, http://gama-platform.org

A complete list of references (papers and PhD theses on or using GAMA) is available on the [references](References) page.



## Contact Us
To get in touch with the GAMA developers team, please sign in for the [gama-platform@googlegroups.com mailing list](http://groups.google.com/group/gama-platform). If you wish to contribute to the platform, you might want, instead or in addition, to sign in for the [gama-dev@googlegroups.com mailing list](http://groups.google.com/group/gama-dev). On both lists, we generally answer quite quickly to requests.

Finally, to report bugs in GAMA or ask for a new feature, please refer to  [these instructions](Troubleshooting#Submitting_an_Issue) to do so.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.