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

The GAMA team is deeply involved and concerned about the COVID-19 pandemic. 

## Description of the project

> Is the containment of an entire neighbourhood more effective than that of an entire village? What is the most effective strategy? At what point in time? 

That the questions our model want to answer. In this model we're modeling a general structure on top of what we may apply different scenario on different places.

![Early developpement - Comparaison between different containment strategies](/img/covid19/early-containment_strategy.png)

## Technical part

If you want to help or just to take a look at our work, you can find [sources here](https://github.com/WARMTeam/CoVid19).

### The model 

Here's an early draft of the UML graph of our model

![UML](/img/covid19/general-uml.png)

### The epidemiological model

In our model, our _People_ agent follow a slightly modified [SEIR model](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model).

![SEIR](/img/covid19/uml-SEIR.png)


--

Is the mass shooter a maniac or a relatively normal person in a state of great stress? According to the FBI report (Silver, J., Simons, A., & Craun, S. (2018). A Study of the Pre-Attack Behaviors of Active Shooters in the United States Between 2000 – 2013. Federal Bureau of Investigation, U.S. Department of Justice,Washington, D.C. 20535.), only 25% of the active shooters were known to have been diagnosed by a mental health professional with a mental illness of any kind prior to the offense.
The main objects of the model are the humans and the guns. The main factors influencing behavior are the population size, the number of people with mental disabilities (“psycho” in the model terminology) per 100,000 population, the total number of weapons (“guns”) in the population, the availability of guns for humans, the intensity of stressors affecting humans and the threshold level of stress, upon reaching which a person commits an act of mass shooting.
The key difference (in the model) between a normal person and a psycho is that a psycho accumulates stressors and, upon reaching a threshold level, commits an act of mass shooting. A normal person is exposed to stressors, but reaching the threshold level for killing occurs only when the simultaneous effect of stressors on him exceeds this level.
The population dynamics are determined by the following factors: average (normally distributed) life expectancy (“life_span” attribute of humans) and population growth with the percentage of newborns set by the value of the TickReprRatio% slider of the current population volume from 16 to 45 years old.Thus, one step of model time corresponds to a year.

![example img](/img/covid19/cities_gama.png)



`; // Leave me as the last line please :D