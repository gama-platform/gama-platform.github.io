---
title: comodel Urban and Traffic model
id: version-1.8.1-Co-model Example comodel_Urban_Traffic
original_id: Co-model Example comodel_Urban_Traffic
---

[//]: # (keyword|operator_rnd_color)
[//]: # (keyword|operator_exp)
[//]: # (keyword|operator_as_map)
[//]: # (keyword|operator_\:\:)
[//]: # (keyword|operator_with_weights)
[//]: # (keyword|operator_max_of)
[//]: # (keyword|operator_closest_to)
[//]: # (keyword|operator_using)
[//]: # (keyword|operator_sort_by)
[//]: # (keyword|operator_last)
[//]: # (keyword|statement_using)
[//]: # (keyword|statement_agents)
[//]: # (keyword|constant_#sec)
[//]: # (keyword|constant_#km)
[//]: # (keyword|constant_#lightgray)
[//]: # (keyword|constant_#cyan)
[//]: # (keyword|type_topology)
[//]: # (keyword|concept_comodel)


_Author : HUYNH Quang Nghi_

Co-model example : coupling urban growth model with the traffic model.


Imported models : 

```

model raster3


global
{ 
	//File for the ascii grid
	file asc_grid <- grid_file("../includes/cantho_1999_v6.asc");
	//Shapefile for the road
	file road_shapefile <- shape_file("../includes/roads15_3.shp");
	//Shapefile for the city
	file city_center_shapefile <- shape_file("../includes/city center.shp");
	//Shape of the environment
	geometry shape <- envelope(asc_grid);
	//Graph of the roads
	graph roads_network;
	
	// Dynamic list of the cells to consider at each cycle
	list<plot> empty_plots <- plot where (each.grid_value = 0.0) update: shuffle(plot where (each.grid_value = 0.0));
	
	list<rgb> plot_colors <- [ 
		#lightgray, //empty
		#orange, // 1 built
		#blue // 2 River-lake
	];
	//Radius of density
	int density_radius <- 4;
	//Weight of density
	float weight_density <- 0.05;
	//Weight of the road distance
	float weight_road_dist <- 0.5;
	//Weight of the city center distance
	float weight_cc_dist <- 0.3;
	//Number of plot allowing to build a building
	int nb_plots_to_build <- 195;

	init
	{
		//Creation of the roads using the shapefile of the road
		create roads from: road_shapefile;
		//Creation of the city center using the city center shapefile
		create city_center from: city_center_shapefile;
		//Creation of the graph of the road network
		roads_network <- as_edge_graph(roads);
		
		//Each road has to compute its distance from the city center
		ask roads {
			do compute_cc_dist;
		}
		//Compute the city distance for each plot
		ask empty_plots {
			do compute_distances;
		}
		//Normalization of the distance
		do normalize_distances;
	}
	//Action to normalize the distance
	action normalize_distances {
		//Maximum distance from the road of all the plots
		float max_road_dist <- empty_plots max_of each.dist_route;
		//Maximum distance from the city center for all the plots
		float max_cc_dist <- empty_plots max_of each.dist_cv;
		//Normalization of  each empty plot according to the maximal value of each attribute
		ask empty_plots {
			dist_cv <- 1 - dist_cv / max_cc_dist;
			dist_route <- 1 - dist_route / max_road_dist;
		}
	}
	
	
	//Reflex representing the global dynamic of the model
	reflex dynamique_globale when: weight_density != 0 or weight_road_dist != 0 or weight_cc_dist != 0 {
		//Ask to each empty plot to compute its constructability
		ask empty_plots {
			constructability <- compute_constructability();
		}
		list<plot> ordered_plots <- empty_plots sort_by (each.constructability);
		ordered_plots <- nb_plots_to_build last ordered_plots;
		//Build on each empty plot having the highest constructability
		ask ordered_plots
		{
			do build;
		}
	}	
}
//Species representing the city center
species city_center {
	aspect default {
		draw circle(300) color: #cyan;
	}	
}
//Species representing the roads
species roads
{
	float dist_cv;
	//Action to compute the city center distance for the road
	action compute_cc_dist {
		using topology(roads_network)
		{
			dist_cv <- self distance_to first(city_center);
		}
	}
	aspect default {
		draw shape color: #black;	
	}
}
//Grid species to represent the different building plots
grid plot file: asc_grid use_individual_shapes: false use_regular_agents: false neighbors: 4
{
	rgb color <- grid_value = -1 ? #white : plot_colors[int(grid_value)];
	//Distance from the road
	float dist_route <- 0.0;
	//Distance from the city center
	float dist_cv <- 0.0;
	//Constructability of the plot
	float constructability;
	
	//Action to compute all the distances for the cell
	action compute_distances
	{
		roads route_pp <- roads closest_to self;
		dist_route <- (self distance_to route_pp) using topology(world);
		dist_cv <- dist_route + route_pp.dist_cv;
	}
	//Action to build on the cell
	action build
	{
		grid_value <- 1.0;
		color <- plot_colors[1];
	}
	//Action to compute the constructability of the plot cell
	float compute_constructability
	{
		//Get all the neighbors plots
		list<plot> voisins <- (self neighbors_at density_radius);
		//Compute the density of all the neighbors plots
		float densite <- (voisins count (each.grid_value = 1.0)) / length(voisins);
		return (densite * weight_density + dist_route * weight_road_dist + dist_cv * weight_cc_dist) / (weight_density + weight_road_dist + weight_cc_dist);
	}			
}

experiment raster type: gui {
 	parameter "Weight of the density criteria" var: weight_density;
 	parameter "Weight of the distance to roads criteria" var: weight_road_dist;
 	parameter "Weight of the distance to city center criteria" var: weight_cc_dist;
 	output {
 		display map type: opengl {
			grid plot;
			species roads;
			species city_center;
		}
	}
}

```


```
model Urban_coupling

import "../../../Toy Models/Urban Growth/models/raster model.gaml"
experiment Urban_coupling_exp type: gui parent: raster
{
	list<plot> getPlot
	{
		return list(plot);
	}

}
```


```

model traffic

global {
	//Shapefile of the buildings
	file building_shapefile <- file("../includes/buildings.shp");
	//Shapefile of the roads
	file road_shapefile <- file("../includes/roads.shp");
	//Shape of the environment
	geometry shape <- envelope(road_shapefile);
	//Step value
	float step <- 10 #s;
	//Graph of the road network
	graph road_network;
	//Map containing all the weights for the road network graph
	map<road,float> road_weights;
	
	init {
		//Initialization of the building using the shapefile of buildings
		create building from: building_shapefile;
		//Initialization of the road using the shapefile of roads
		create road from: road_shapefile;
		
		//Creation of the people agents
		create people number: 1000{
			//People agents are located anywhere in one of the building
			location <- any_location_in(one_of(building));
      	}
      	//Weights of the road
      	road_weights <- road as_map (each::each.shape.perimeter);
      	road_network <- as_edge_graph(road);
	}
	//Reflex to update the speed of the roads according to the weights
	reflex update_road_speed  {
		road_weights <- road as_map (each::each.shape.perimeter / each.speed_coeff);
		road_network <- road_network with_weights road_weights;
	}
}
//Species to represent the people using the skill moving
species people skills: [moving]{
	//Target point of the agent
	point target;
	//Probability of leaving the building
	float leaving_proba <- 0.05; 
	//Speed of the agent
	float speed <- 5 #km/#h;
	rgb color <- rnd_color(255);
	//Reflex to leave the building to another building
	reflex leave when: (target = nil) and (flip(leaving_proba)) {
		target <- any_location_in(one_of(building));
	}
	//Reflex to move to the target building moving on the road network
	reflex move when: target != nil {
		do goto target: target on: road_network recompute_path: false move_weights: road_weights;
		if (location = target) {
			target <- nil;
		}	
	}
	
	aspect default {
		draw circle(5) color: color;
	}
}
//Species to represent the buildings
species building {
	aspect default {
		draw shape color: #gray;
	}
}
//Species to represent the roads
species road {
	//Capacity of the road considering its perimeter
	float capacity <- 1 + shape.perimeter/30;
	//Number of people on the road
	int nb_people <- 0 update: length(people at_distance 1);
	//Speed coefficient computed using the number of people on the road and the capicity of the road
	float speed_coeff <- 1.0 update:  exp(-nb_people/capacity) min: 0.1;
	
	aspect default {
		draw (shape + 3 * speed_coeff) color: #red;
	}
}
experiment trafic type: gui {
	float minimum_cycle_duration <- 0.01;
	output {
		display carte type: opengl{
			species building refresh: false;
			species road ;
			species people ;
		}
	}
}
```


```
model Traffic_coupling

import "../../../Toy Models/Traffic/models/Simple traffic model.gaml"
experiment Traffic_coupling_exp type: gui parent: trafic
{
	list<building> getBuilding
	{
		return list(building);
	}

	list<people> getPeople
	{
		return list(people);
	}

	list<road> getRoad
	{
		return list(road);
	}

}
```


Code of the model : 

```
model comodel_Urban_Traffic

import "Traffic_coupling.gaml" as myTraffic
import "Urban_coupling.gaml" as myUrban


global
{
	//set the bound of the world
	geometry shape <- envelope(shape_file("../../../Toy Models/Traffic/includes/roads.shp"));
	init
	{
		//create Traffic micro-model's experiment
		create myTraffic.Traffic_coupling_exp with:
		[building_shapefile::file("../../../Toy Models/Traffic/includes/buildings.shp"), road_shapefile::file("../../../Toy Models/Traffic/includes/roads.shp")];
		//create Urban micro-model;s experiment
		create myUrban.Urban_coupling_exp with:
		[asc_grid::grid_file("../../../Toy Models/Urban Growth/includes/cantho_1999_v6.asc"), road_shapefile::shape_file("../../../Toy Models/Urban Growth/includes/roads15_3.shp"), city_center_shapefile::shape_file("../../../Toy Models/Urban Growth/includes/city center.shp")];
	}

	reflex simulate_micro_models
	{
		//ask simulation of micro-model step one
		ask myTraffic.Traffic_coupling_exp collect each.simulation
		{
			do _step_;
		}

		// tell the urban to grow up every 200 step
		ask myUrban.Urban_coupling_exp collect each.simulation
		{
			if (cycle mod 200 = 0)
			{
				do _step_;
			}

		}

	}

}

experiment comodel_Urban_Traffic_exp type: gui
{
	output
	{
		display "comodel_disp"
		{
			agents "Plotgrid" value: first(myUrban.Urban_coupling_exp).getPlot() size: { 0.037, 0.052 };
			agents "building" value: first(myTraffic.Traffic_coupling_exp).getBuilding();
			agents "people" value: first(myTraffic.Traffic_coupling_exp).getPeople();
			agents "road" value: first(myTraffic.Traffic_coupling_exp).getRoad();
		}

	}

}
```
