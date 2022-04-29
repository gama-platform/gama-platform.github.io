---
title: 6. Charts
id: version-1.8.1-RoadTrafficModel_step6
original_id: RoadTrafficModel_step6
---


This 6th step illustrates how to display charts.


## Formulation

* Add a chart to display the evolution of the road destruction: the mean value of the `destruction_coeff` of the `road` agents, and its max value (refreshed every 10 simulation steps).
* Add a chart to display the activity of the `people` agent (working or staying home, refreshed every 10 simulation steps).


## Model Definition

### chart display

First, we add a chart of type **`series`** to display the road destruction evolution. To compute the mean of the `destruction_coeff`, we combine the **mean** and **`collect`** operators. `collect` takes a container and an expression as operands and will compute a new list, each element being the evaluation on the container operand of the expression. `mean` computes the average of all the elements of a list. For the max, we use the **`max_of`** operator. (Note that the operator `mean_of` also exists to replace `mean` and `collect`).

```
     output {
         display chart_display refresh:every(10#cycles) {
             chart "Road Status" type: series size: {1, 0.5} position: {0, 0} {
                 data "Mean road destruction" value: mean (road collect each.destruction_coeff) style: line color: #green ;
	         data "Max road destruction" value: road max_of each.destruction_coeff style: line color: #red ;
	     }
             ...
         }
     }
```

Second, we add a chart of type **`pie`** to display the activity of the `people` agents. We use for that the `objective` variable of the `people` agents and the **`count`** operator that allows computing the number of elements of a list that verify a condition.

```
    output {
      ...
      display chart_display refresh: every(10#cycles) {
          ...
          chart "People Objectif" type: pie style: exploded size: {1, 0.5} position: {0, 0.5}{
	       data "Working" value: people count (each.objective="working") color: #magenta ;
	       data "Resting" value: people count (each.objective="resting") color: #blue ;
	  }
     }
   }
```

We chose to display the 2 charts on the same display. As a consequence, we specified the `size` and `position` of each of them to define the layout of this display.



## Complete Model

```
model tutorial_gis_city_traffic

global {
    file shape_file_buildings <- file("../includes/building.shp");
    file shape_file_roads <- file("../includes/road.shp");
    file shape_file_bounds <- file("../includes/bounds.shp");
    geometry shape <- envelope(shape_file_bounds);
    float step <- 10 #mn;
    date starting_date <- date("2019-09-01-00-00-00");	
    int nb_people <- 100;
    int min_work_start <- 6;
    int max_work_start <- 8;
    int min_work_end <- 16; 
    int max_work_end <- 20; 
    float min_speed <- 1.0 #km / #h;
    float max_speed <- 5.0 #km / #h; 
    float destroy <- 0.02;
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
	list<building> industrial_buildings <- building  where (each.type="Industrial") ;
	create people number: nb_people {
	    speed <- rnd(min_speed, max_speed);
	    start_work <- rnd (min_work_start, max_work_start);
	    end_work <- rnd(min_work_end, max_work_end);
	    living_place <- one_of(residential_buildings) ;
	    working_place <- one_of(industrial_buildings) ;
	    objective <- "resting";
	    location <- any_location_in (living_place); 
	}
    }
	
    reflex update_graph{
	map<road,float> weights_map <- road as_map (each:: (each.destruction_coeff * each.shape.perimeter));
	the_graph <- the_graph with_weights weights_map;
    }
}

species building {
    string type; 
    rgb color <- #gray ;
	
    aspect base {
	draw shape color: color ;
    }
}

species road  {
    float destruction_coeff <- rnd(1.0,2.0) max: 2.0;
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
		
    reflex time_to_work when: current_date.hour = start_work and objective = "resting"{
	objective <- "working" ;
	the_target <- any_location_in (working_place);
    }
		
    reflex time_to_go_home when: current_date.hour = end_work and objective = "working"{
	objective <- "resting" ;
	the_target <- any_location_in (living_place); 
    } 
	 
    reflex move when: the_target != nil {
	path path_followed <- goto(target: the_target, on:the_graph, return_path: true);
	list<geometry> segments <- path_followed.segments;
	loop line over: segments {
	    float dist <- line.perimeter;
	    ask road(path_followed agent_from_geometry line) { 
		destruction_coeff <- destruction_coeff + (destroy * dist / shape.perimeter);
	    }
	}
	if the_target = location {
	    the_target <- nil ;
	}
    }
	
    aspect base {
	draw circle(10) color: color border: #black;
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
    parameter "Value of destruction when a people agent takes a road" var: destroy category: "Road" ;
	
    output {
	display city_display type:opengl {
	    species building aspect: base ;
	    species road aspect: base ;
	    species people aspect: base ;
	}
	display chart_display refresh: every(10#cycles) { 
	    chart "Road Status" type: series size: {1, 0.5} position: {0, 0} {
		data "Mean road destruction" value: mean (road collect each.destruction_coeff) style: line color: #green ;
		data "Max road destruction" value: road max_of each.destruction_coeff style: line color: #red ;
	    }
	    chart "People Objectif" type: pie style: exploded size: {1, 0.5} position: {0, 0.5}{
		data "Working" value: people count (each.objective="working") color: #magenta ;
		data "Resting" value: people count (each.objective="resting") color: #blue ;
	    }
	}
    }
}
```
