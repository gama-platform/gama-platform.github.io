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

# The model principles

The presented model considers the spread of COVID-19 at the scale of a commune in an agent-based fashion: each individual of the commune is represented individually with some specific characteristics (age, sex, household), infectious state and specific daily activities, that can be controlled and limited by an Authority entity which can choose and applied a mitigation policy. The simulations run several virtual worlds in parallel at a one-hour time step, and can compare and assess various policies.


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

- First, download and extract the [GAMA Continuous Build version](https://github.com/gama-platform/gama/releases/tag/continuous) (if you don't know which version to take, choose the one with JDK). If you need more information about how to install GAMA, check the [installation page](https://gama-platform.github.io/wiki/Installation)
- Second download the model [on GitHub](https://github.com/WARMTeam/CoVid19) (click [here](https://github.com/WARMTeam/CoVid19/archive/master.zip) to download it automatically)
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

## Required Data

The model requires a minimal dataset that should be, at least, composed of:

- Demographic data : 

  - A **population.csv** file that contains individual including some basic attributes, i.e. age, gender and household Identifier 

  - Mobility and activity data : What can be done ? is it in the model (a gaml file to create activities) or can we generate them outside (a csv with given column and lines)

- Spatial data:

  - **buildings.shp** : this file should contain the buildings of the considered case. Buildings have to be understood in a wide sense, as the set of locations for activities.
    The shapefile attribute table should contain the column “type” containing the type of the building.

  - **boundary.shp**: this file should contain the boundary of the studied area

  - *[Optional]* **satellite.png** and **satellite.pgw**: if modeler wants to add a georeferenced background image (e.g. Google Map).

- Epidemiological data : One csv file should be given, containing the following parameters:

| Parameter name | Definition | Type [Range] | Default value |
|:-----:|:-----:|:-----:|:-----:|
| Transmission_human | Allowing infections from humans | Boolean | TRUE |
| Transmission_building | Allowing infections from buildings | Boolean | TRUE |
| Successful_contact_rate_human | Successful contact rate for infected humans | Real [≥0] | 0.007086298 |
| Successful_contact_rate_building | Successful contact rate for contaminated buildings | Real [≥0] | 0.007086298 |
| Reduction_asymptomatic | Reduction of the successful contact rate for asymptomatic | Real [0-1] | 0.45 |
| Proportion_asymptomatic | Proportion of asymptomatic infections | Real [0-1] | 0.3 |
| Proportion_dead_asymptomatic | Proportion of fatal symptomatic infections | Real [0-1] | 0.01 |
| Basic_viral_release | Value of viral release in the environment by an infectious individual | Real [≥0] | 3 |
| Basic_viral_decrease | Value of the viral decrease in the environment per step | Real [≥0] | 0.01375 |
| Probability_true_positive | Probability of an infected individual to be positive  | Real [0-1] | 0.89 |
| Probability_true_negative | Probability of a non-infected individual to be negative | Real [0-1] | 0.92 |
| Proportion_wearing_mask | Proportion of Individuals wearing mask | Real [0-1] | 0 |
| Reduction_wearing_mask | Reduction of the successful contact rate for Individuals wearing mask | Real [0-1] | 0.5 |
| Distribution_type_incubation | Type of the distribution for the incubation period | String [Normal, Gamma, Lognormal, Weibull] | Lognormal |
| Parameter_1_incubation | First parameter of the distribution of the incubation period | Real | 1.57 |
| Parameter_2_incubation | Second parameter of the distribution of the incubation period | Real | 0.65 |
| Distribution_type_serial_interval | Type of the distribution for the serial interval | String [Normal, Gamma, Lognormal, Weibull] | Normal |
| Parameter_1_serial_interval | First parameter of the distribution for the serial interval | Real | 3.96 |
| Parameter_2_serial_interval | Second parameter of the distribution for the serial interval | Real | 3.75 |
| Distribution_type_onset_to_recovery | Type of the distribution for the onset to recovery period | String [Normal, Gamma, Lognormal, Weibull] | Lognormal |
| Parameter_1_onset_to_recovery | First parameter of the distribution for the onset to recovery period | Real | 3.034953 |
| Parameter_2_onset_to_recovery | Second parameter of the distribution for the onset to recovery period | Real | 0.34 |


`; // Leave me as the last line please :D
