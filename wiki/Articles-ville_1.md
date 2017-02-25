---
layout: default
title: Ville 1
wikiPageName: Articles-ville_1
wikiPagePath: wiki/Articles-ville_1.md
---

[//]: # (keyword|operator_gauss)
[//]: # (keyword|concept_gui)
# Ville 1


_Author : _

This is a simple model showing different circle with a color according to the income of the house.


Code of the model : 

```
model ville

global {
	init {
		create foyer number: 500;
	}
}

species batiment {
	string type;
	int capacite;
}

species route {
}

species foyer {
	float revenu <- gauss(1500, 500);
	bool est_satisfait ;
	batiment habitation;
	batiment lieu_travail;
	
	aspect revenu {
		int val <- int(255 * (revenu / 3000));
		draw circle(5) color: rgb(255 - val, val, 0);
	}
}

experiment ville type: gui { 
	output {
		display carte_principale {
			species foyer aspect: revenu;
		}
	}
}
```
