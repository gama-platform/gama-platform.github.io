---
layout: default
title: Ville 6
wikiPageName: Articles-ville_6
wikiPagePath: wiki/Articles-ville_6.md
---

[//]: # (keyword|operator_gauss)
[//]: # (keyword|operator_distance_between)
[//]: # (keyword|operator_select)
[//]: # (keyword|statement_remove)
[//]: # (keyword|statement_put)
[//]: # (keyword|type_topology)
[//]: # (keyword|concept_gui)
[//]: # (keyword|concept_shapefile)
[//]: # (keyword|concept_graph)
[//]: # (keyword|concept_3d)
# Ville 6


_Author : _

Creation of buildings and roads thanks to a shape file. The color of the building depends on the type of the building, while the color of a house depend on its income. People among the world will try to find the best building according to the mean income of their neighbors and their own income, but also to their working place. This model add a new display showing the "color" of each building according to the mean income of its residents. The buildings also have a z location given thanks to a mnt file.


Code of the model : 

```
model ville

global {
	file shape_file_batiments <- file("../includes/batiments.shp");
	file shape_file_routes <- file("../includes/routes.shp");
	file mnt <- file("../includes/mnt.asc");
	file texture <- file('../includes/Texture.png');
	geometry shape <- envelope(mnt);
	graph<point, route> reseau_route;
	list<batiment> industries;
	
	init {
		create route from: shape_file_routes;
		reseau_route <- as_edge_graph(route);
		create batiment from: shape_file_batiments with: [type:: string(read("NATURE"))] {
			float z <- (mnt_cell(location)).grid_value;   
			location <- {location.x,location.y,z};
		}
		industries <- batiment select (each.type = "Industrial");
		create foyer number: 500;
	}
}

grid mnt_cell file: mnt;

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
		location <- any_location_in(habitation.shape) + {0,0, (habitation.hauteur + habitation.location.z)};
		habitation.foyers << self;
	}
	action demenager {
		habitation.capacite <- habitation.capacite + 1;
		remove self from: habitation.foyers;
	}
	batiment choisir_batiment {
		batiment b  <- one_of(batiment where ((each.capacite >0) and ( each.distances[lieu_travail]< 1000.0)));
		return b;
	}
	reflex demenagement when: !est_satisfait {
		do demenager;
		habitation <- choisir_batiment();
		do emmenager;
	}
	aspect revenu {
		int val <- int(255 * (revenu / 3000));
		draw sphere(5) color: rgb(255 - val, val, 0);
	}
}
species batiment {
	string type;
	int capacite <- type = "Industrial" ? 0 : int(shape.area / 70.0);
	map<batiment,float> distances;
	int hauteur <- 5 + rnd(10);
	list<foyer> foyers ;
	float revenu_moyen update: empty(foyer) ? 0.0 : mean (foyers collect each.revenu);
	init {
		loop bat over: batiment where (each.type = "Industrial") {
			put (topology(reseau_route) distance_between [self,bat]) at: bat in: distances;
		}
	}
	aspect geometrie {
		draw shape color: type = "Industrial" ? #pink : #gray depth: hauteur;
	}
	aspect information_foyer {
		draw shape color: type = "Industrial" ? #pink : (empty(foyers) ? #gray : rgb(int(255 * (1 - (revenu_moyen / 3000))), int(255 * (revenu_moyen / 3000)), 0)) depth: length(foyers);
	}
}
species route {
	aspect geometrie {
		draw shape color: #black at:{location.x,location.y,(mnt_cell(location)).grid_value};
	}
}
experiment ville type: gui {
	output {
		display carte_principale type: opengl {
			grid mnt_cell triangulation: true texture:texture elevation:true transparency: 0.3;
			species batiment aspect: geometrie;
			species route aspect: geometrie;
			species foyer aspect: revenu;
		}
		display carte_batiment type: opengl {
			species batiment aspect: information_foyer;
		}
	}
}
```
