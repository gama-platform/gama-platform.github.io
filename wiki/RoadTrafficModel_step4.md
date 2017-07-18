---
layout: default
title: 4. Weight for Road Network
wikiPageName: RoadTrafficModel_step4
wikiPagePath: wiki/RoadTrafficModel_step4.md
---
# 4. Weight for Road Network
The present model will introduce how to design a road system, or graph, based on the road GIS data and provide each edge a `weight`representing the destruction level of the road.







## Formulation
  * Add a **destruction\_coeff** variable to the **road** agent. The value of this variable is higher or equal to 1 or lower or equal to 2. At initialization, the value of this variable is randomly defined between 1 and 2.
  * In the road network graph, more a road is worn out (destruction\_coeff high), more a **people** agent takes time to go all over it. Then the value of the arc representing the road in the graph is equal to "length of the road `*` destruction\_coeff".
  * The color of the road depends of the **destruction\_coeff**. If "destruction\_coeff = 1", the road is green, if "destruction\_coeff = 2", the road is red.





## Model Definition

### road agent
We add a **destruction\_coeff** variable which initial value is randomly defined between 1 and 2 and that have a max of 2. The color of the agent will depend of this variable. In order to simplify the GAML code, we define a new variable  **colorValue** that represents the value of red color and that will be defined between 0 and 255.

```
   species road  {
	float destruction_coeff <- 1 + ((rnd(100))/ 100.0) max: 2.0;
	int colorValue <- int(255*(destruction_coeff - 1)) update: int(255*(destruction_coeff - 1));
	rgb color <- rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0)  update: rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0) ;

        ...
   }
```


### weigthed road network
In GAMA, adding a weight for a graph is very simple, we use the **as\_edge\_graph** operator with the graph for left-operand and a weight map for the right-operand. A weight contains the weight of each edge: [edge1::weight1, edge2:: weight2,...]. In this model, the weight will be equal to the length of the road (perimeter of the polyline) **its destruction coefficient.
```
    init {
      ...
      create road from: shape_file_roads ;
      map<road,float> weights_map <- road as_map (each:: (each.destruction_coeff * each.shape.perimeter));
      the_graph <- as_edge_graph(road) with_weights weights_map;
      ...
   }
```**





## Complete Model

```
model tutorial_gis_city_traffic

global {
	file shape_file_buildings <- file("../includes/building.shp");
	file shape_file_roads <- file("../includes/road.shp");
	file shape_file_bounds <- file("../includes/bounds.shp");
	geometry shape <- envelope(shape_file_bounds);
	float step <- 10 #mn;
	int nb_people <- 100;
	int current_hour update: (time / #hour) mod 24;
	int min_work_start <- 6;
	int max_work_start <- 8;
	int min_work_end <- 16; 
	int max_work_end <- 20; 
	float min_speed <- 1.0 #km / #h;
	float max_speed <- 5.0 #km / #h; 
	graph the_graph;
	
	init {
		create building from: shape_file_buildings with: [type::string(read ("NATURE"))] {
			if type="Industrial" {
				color <- #blue ;
			}
		}
		create road from: shape_file_roads ;
		map<road,float> weights_map <- road as_map (each:: (each.destruction_coeff * each.shape.perimeter));
		the_graph <- as_edge_graph(road) with_weights weights_map;
		
		
		list<building> residential_buildings <- building where (each.type="Residential");
		list<building>  industrial_buildings <- building  where (each.type="Industrial") ;
		create people number: nb_people {
			speed <- min_speed + rnd (max_speed - min_speed) ;
			start_work <- min_work_start + rnd (max_work_start - min_work_start) ;
			end_work <- min_work_end + rnd (max_work_end - min_work_end) ;
			living_place <- one_of(residential_buildings) ;
			working_place <- one_of(industrial_buildings) ;
			objective <- "resting";
			location <- any_location_in (living_place); 
		}
	}
}

species building {
	string type; 
	rgb color <- #gray  ;
	
	aspect base {
		draw shape color: color ;
	}
}

species road  {
	float destruction_coeff <- 1 + ((rnd(100))/ 100.0) max: 2.0;
	int colorValue <- int(255*(destruction_coeff - 1)) update: int(255*(destruction_coeff - 1));
	rgb color <- rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0)  update: rgb(min([255, colorValue]),max ([0, 255 - colorValue]),0) ;
	
	aspect base {
		draw shape color: color ;
	}
}

species people skills:[moving] {
	rgb color <- #yellow ;
	building living_place <- nil ;
	building working_place <- nil ;
	int start_work ;
	int end_work  ;
	string objective ; 
	point the_target <- nil ;
		
	reflex time_to_work when: current_hour = start_work and objective = "resting"{
		objective <- "working" ;
		the_target <- any_location_in (working_place);
	}
		
	reflex time_to_go_home when: current_hour = end_work and objective = "working"{
		objective <- "resting" ;
		the_target <- any_location_in (living_place); 
	} 
	 
	reflex move when: the_target != nil {
		do goto target: the_target on: the_graph ; 
		if the_target = location {
			the_target <- nil ;
		}
	}
	
	aspect base {
		draw circle(10) color: color;
	}
}

experiment road_traffic type: gui {
	parameter "Shapefile for the buildings:" var: shape_file_buildings category: "GIS" ;
	parameter "Shapefile for the roads:" var: shape_file_roads category: "GIS" ;
	parameter "Shapefile for the bounds:" var: shape_file_bounds category: "GIS" ;
	parameter "Number of people agents" var: nb_people category: "People" ;
	parameter "Earliest hour to start work" var: min_work_start category: "People" min: 2 max: 8;
	parameter "Latest hour to start work" var: max_work_start category: "People" min: 8 max: 12;
	parameter "Earliest hour to end work" var: min_work_end category: "People" min: 12 max: 16;
	parameter "Latest hour to end work" var: max_work_end category: "People" min: 16 max: 23;
	parameter "minimal speed" var: min_speed category: "People" min: 0.1 #km/#h ;
	parameter "maximal speed" var: max_speed category: "People" max: 10 #km/#h;
	
	output {
		display city_display type:opengl {
			species building aspect: base ;
			species road aspect: base ;
			species people aspect: base ;
		}
	}
}
```
