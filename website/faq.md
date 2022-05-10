/* <!--
	Copyright (c) 2020-present, GAMA-Platform

	This source code is licensed under the GPL3 license found in the
	LICENSE file in the root directory of this source tree.


	@author : Arthur Brugiere <RoiArthurB>
	@description : This file is a semi-structured database for the page FAQ 

	How to use :
		- Your question should be on a single line and start with "#"
			- /!\ If you do not write a question, the bloc will not be used
		- Your answer should be written in the MarkDown format 
			- you can add links, images, lists, etc 
				==> It's like in the wiki
			- If you link a page, you should have an explicit link (relative or absolute) 
				=> That page won't scrap page référence automatically like in the rest of the wiki
		- You should separate every question with a MD separator ( "---" )
		- /!!\ Do not remove the first line "module.exports = `" nor the last line "`;" /!!\

	Good to Know : 
		- This file is considered as a JavaScript file, but React do not care about the extension. So I named it "faq.md" to not scare you 🐻
		- This file is used by >> gama-platform.github.io/website/pages/en/faq.js

--> */

module.exports = `
# What is GAMA?

GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations. 

* [**Multiple application domains:**](wiki/Home#multiple-application-domains) Use GAMA for whatever application domain you want. 
* [**High-level and Intuitive Agent-based language:**](wiki/Home#high-level-and-intuitive-agent-based-language) Write your models easily using GAML, a high-level and intuitive agent-based language.
* [**GIS and Data-Driven models:**](wiki/Home#gis-and-data-driven-models) Instantiate agents from any dataset, including GIS data, and execute large-scale simulations (up to millions of agents).
* [**Declarative user interface:**](wiki/Home#declarative-user-interface) Declare interfaces supporting deep inspections on agents, user-controlled action panels, multi-layer 2D/3D displays & agent aspects.

---

# How to cite GAMA?
If you use GAMA in your research and want to cite it (in a paper, presentation, whatever), please use this reference:

> Taillandier, P., Gaudou, B., Grignard, A.,Huynh, Q.-N., Marilleau, N., P. Caillou, P., Philippon, D., & Drogoul, A. (2019). Building, composing and experimenting complex spatial models with the GAMA platform. Geoinformatica, (2019), 23 (2), pp. 299-322, [doi:10.1007/s10707-018-00339-6]

or you can choose to cite the website instead:

> GAMA Platform website, http://gama-platform.org

A complete list of references (papers and PhD theses on or using GAMA) is available on the [references](References) page.

---

# Can we record a video from an experiment ?

No, we cannot directly. But you have two alternatives:

- With the set of images generated with the \`autosave\` facet of an experiment, you can construct your own video file using powerful software such as [ffmpeg](https://www.ffmpeg.org/).
- You can directly record the video stream using software such as [VLC Media Player](http://www.videolan.org/vlc/index.html) or [QuickTime](http://www.apple.com/quicktime/download/).

---

# Agent movement

This sub-section is composed of the following models :

* [ Movement of an agent on different paths](Agent-movement-Follow-Path)

* [ Follow Weighted Network](Agent-movement-Follow-Weighted-Network-(Agents))

* [ Directed Graph Model](Agent-movement-Goto-Directed-Graph)

* [ Movement on a Grid of Cells](Agent-movement-Goto-Grid)

* [ Shortest Path Computation on a Graph](Agent-movement-Goto-Network)

* [ Movement on a Graph created by Polygons](Agent-movement-Goto-Polygon)

* [ Movement in 3D](Agent-movement-Moving3D)

---


`;