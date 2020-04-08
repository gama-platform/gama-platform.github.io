/* <!--
	Copyright (c) 2020-present, GAMA-Platform

	This source code is licensed under the GPL3 license found in the
	LICENSE file in the root directory of this source tree.


	@author : Arthur Brugiere <RoiArthurB>
	@description : This file is the whole content of the gama page about the COVID19
	@url : https://gama-platform.github.io/covid19

	How to use :
		- Your answer should be written in the MarkDown format 
			- you can add links, images, lists, etc 
				==> It's like in the wiki
				- For images, you can save them anywhere, but I prepared a folder for this page. So save them in `gama-platform.github.io/website/static/img/covid19/`
			- If you link a page, you should have an explicit link
				=> That page won't scrap page reference automatically like in the rest of the wiki

		- ⚠️ Do not remove the first line "module.exports = `" nor the last line "`;" ⚠️

	Good to Know : 
		- This file is considered as a JavaScript file, but React do not care about the extension. So I named it "faq.md" to not scare you 🐻
		- This file is used by >> `gama-platform.github.io/website/pages/en/covid19.js`

--> */

/* Leave me as the first line please :D */ module.exports = `

# Description of the project

> Is the containment of a neighbourhood more effective than that of an entire village? Does closing schools reduce transmission peaks ? What is the most effective strategy to adopt when the resources, in terms of enforcement of the rules and capacity of hospitals, are limited ? At what point in time ? 

Those are some of the questions we are helping to answer using a generic model of the containment of the propagation of the COVID-19 epidemics in a city, validated on different case studies (2 in Vietnam to begin with).

x---

# The team working on this project 

The [Institut de recherche pour le développement (IRD) in Vietnam](https://en-vietnam.ird.fr/) has set up a multidisciplinary team of researchers from its research units [UMMISCO](https://www.ummisco.fr/) (Alexis Drogoul, Benoit Gaudou, Arthur Brugière, Kevin Chapuis), [MIVEGEC](https://www.mivegec.ird.fr/en/) (Marc Choisy) and [DIADE](https://diade.ird.fr/en) (Pierre Larmande), assisted by colleagues from [Thuyloi University](http://en.tlu.edu.vn/) (Nguyen Ngoc Doanh), [Can Tho University](https://en.ctu.edu.vn/) (Huỳnh Quang Nghi), [INRAE](https://www.inrae.fr/en) (Patrick Taillandier) and [SPH-HKU](https://sph.hku.hk/en/) (Damien Philippon), to design realistic spatial computer models, in GAMA, from the data provided by the government (census, epidemiological data) or obtained from private actors ([Facebook data](https://dataforgood.fb.com/), mobile telephone data) in order to inform as quickly as possible the public health decisions taken by the Vietnamese authorities, in particular those linked to the impact of containment strategies when cases are detected.

x---

# Overview

| Simulation of containment measures against CoVid19 using GAMA | Side by side simulation of CoVid19 propagation in two case studies |
|:--------:|:-------------:|
| <iframe width="560" height="315" src="https://www.youtube.com/embed/4AxIPHSZZkQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> |  <iframe width="560" height="315" src="https://www.youtube.com/embed/PxFljiGkXrc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> |
| Comparing the impacts of different proportions of people wearing masks | Inter-human and environmental transmissions |
| <iframe width="560" height="315" src="https://www.youtube.com/embed/FYehyECkoh4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | <iframe width="560" height="315" src="https://www.youtube.com/embed/wmgx5FlAxFE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> |
| Impact of a realistic home containment policy | Impact of the duration of the lockdown on the peak of the epidemics |
| <iframe width="560" height="315" src="https://www.youtube.com/embed/he-dvtHDXZE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | <iframe width="560" height="315" src="https://www.youtube.com/embed/uxMUnmaYQQY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> |

x---

# Technical part

If you want to help or just to take a look at our work, you can find [sources here](https://github.com/WARMTeam/CoVid19). More details will come soon, especially the ones related to adapting this model to new case studies.

## Run the model on your computer

If you want to install and run the model on your computer you should 

- First, download and extract the [GAMA Continuous Build version](https://github.com/gama-platform/gama/releases/tag/continuous) (if you don't know which version to take, choose the one with JDK). If you need more informations about how to install GAMA, check the [installation page](https://gama-platform.github.io/wiki/Installation)
- Second download the model [on Github](https://github.com/WARMTeam/CoVid19) ( click [here](https://github.com/WARMTeam/CoVid19/archive/master.zip) to download it automatically)
- Extract that ZIP file somewhere on your computer and [import it on GAMA](https://gama-platform.github.io/wiki/ImportingModels).
- Enjoy our model running on your computer

## The model 

Here's an early draft of the UML graph of our model

![UML](/img/covid19/general-uml.png)

## The epidemiological model

In our model, our _People_ agent follow a slightly modified [SEIR model](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model).

![SEIR](/img/covid19/Epidemic-model-agent.png)

Incubation, serial and infectious periods follow various distributions.
![SEIR](/img/covid19/IncubationPeriod.png)
![SEIR](/img/covid19/Serial-Infectious-Distribution.png)


`; // Leave me as the last line please :D
