---
layout: default
title: Ville 3
wikiPageName: Articles-ville_3
wikiPagePath: wiki/Articles-ville_3.md
---

[//]: # (keyword|operator_gauss)
[//]: # (keyword|concept_gui)
[//]: # (keyword|concept_shapefile)
# Ville 3


_Author : _

Creation of buildings and roads thanks to a shape file. The color of the building depends on the type of the building, while the color of a house depend on its income. People among the world will try to find the best building according to the mean income of their neighbors and their own income.


Code of the model : 

```
model ville

global {
	file shape_file_batiments <- file("../includes/batiments.shp");
	file shape_file_routes <- file("../includes/routes.shp");
	geometry shape <- envelope(shape_file_routes);
	init 
	{
		create route from: shape_file_routes;
		create batiment from: shape_file_batiments with: [type:: string(read("NATURE"))];
		create foyer number: 500;
	}
}

species foyer {
	float revenu <- gauss(1500, 500);
	bool est_satisfait update: calculer_satisfaction();
	batiment habitation;
	batiment lieu_travail;
	init {
		lieu_travail <- one_of(batiment where (each.type = "Industrial"));
		habitation <- choisir_batiment(); 
		do emmenager;
	}
	bool calculer_satisfaction {
		list<foyer> voisins <- foyer at_distance 50.0;
		float revenu_moyen <- mean(voisins collect (each.revenu));
		return empty(voisins) or (revenu_moyen > (revenu * 0.7) and revenu_moyen < (revenu / 0.7));
	}
	action emmenager {
		habitation.capacite <- habitation.capacite - 1;
		location <- any_location_in(habitation.shape);
	}
	action demenager {
		habitation.capacite <- habitation.capacite + 1;
	}
	batiment choisir_batiment {
		return one_of(batiment where (each.capacite >0));
	}
	reflex demenagement when: !est_satisfait {
		do demenager;
		habitation <- choisir_batiment();
		do emmenager;
	}
	aspect revenu {
		int val <- int(255 * (revenu / 3000));
		draw circle(5) color: rgb(255 - val, val, 0);
	}
}
species batiment {
	string type;
	int capacite <- type = "Industrial" ? 0 : int(shape.area / 70.0);
	aspect geometrie {
		draw shape color: type = "Industrial" ? #pink : #gray;
	}

}
species route {
	aspect geometrie {
		draw shape color: #black;
	}

}
experiment ville type: gui {
	output {
		display carte_principale {
			species batiment aspect: geometrie;
			species route aspect: geometrie;
			species foyer aspect: revenu;
		}
	}
}
```
