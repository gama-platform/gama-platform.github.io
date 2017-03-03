---
layout: default
title:  Comodel of Flood and Evacuation model
wikiPageName: Co-model-Example-comodel_Flood_Evacuation
wikiPagePath: wiki/Co-model-Example-comodel_Flood_Evacuation.md
---

[//]: # (keyword|operator_max_of)
[//]: # (keyword|operator_accumulate)
[//]: # (keyword|operator_sort_by)
[//]: # (keyword|operator_closest_to)
[//]: # (keyword|operator_copy)
[//]: # (keyword|operator_closest_points_with)
[//]: # (keyword|operator_pyramid)
[//]: # (keyword|operator_simplification)
[//]: # (keyword|operator_translated_by)
[//]: # (keyword|operator_overlaps)
[//]: # (keyword|operator_font)
[//]: # (keyword|statement_user_command)
[//]: # (keyword|statement_remove)
[//]: # (keyword|statement_agents)
[//]: # (keyword|constant_#magenta)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|concept_comodel)
# Comodel of Flood and Evacuation model


_Author : HUYNH Quang Nghi_

Co-model example : couple the evacuation model with the flood model. Water win or human win?


Imported models : 

```
model continuous_move 
global { 
	//Shapefile of the buildings
	file building_shapefile <- file("../includes/building.shp");
	//Shape of the environment
	geometry shape <- envelope(building_shapefile);
	int maximal_turn <- 90; //in degree
	int cohesion_factor <- 10;
	//Size of the people
	float people_size <- 2.0;
	//Space without buildings
	geometry free_space;
	//Number of people agent
	int nb_people <- 500;
	//Point to evacuate
	point target_point <- {world.location.x, 0};
	init { 
		
		free_space <- copy(shape);
		//Creation of the buildinds
		create building from: building_shapefile {
			//Creation of the free space by removing the shape of the different buildings existing
			free_space <- free_space - (shape + people_size);
		}
		//Simplification of the free_space to remove sharp edges
		free_space <- free_space simplification(1.0);
		//Creation of the people agents
		create people number: nb_people {
			//People agents are placed randomly among the free space
			location <- any_location_in(free_space);
			target_loc <-  target_point;
		} 		 	
	}	
}
//Species which represent the building 
species building {
	//Height of the buildings
	float height <- 3.0 + rnd(5);
	aspect default {
		draw shape color: #gray depth: height;
	}
}
//Species people which move to the evacuation point using the skill moving
species people skills:[moving]{
	//Target point to evacuate
	point target_loc;
	//Speed of the agent
	float speed <- 0.5 + rnd(1000) / 1000;
	//Velocity of the agent
	point velocity <- {0,0};
	//Direction of the agent taking in consideration the maximal turn an agent is able to make
	int heading max: heading + maximal_turn min: heading - maximal_turn;
	
	//Size of the agent
	float size <- people_size;
	rgb color <- rgb(rnd(255),rnd(255),rnd(255));
		
	//Reflex to kill the agent when it has evacuated the area
	reflex end when: location distance_to target_loc <= 2 * people_size{
		write name + " is arrived";
		do die;
	}
	//Reflex to compute the velocity of the agent considering the cohesion factor
	reflex follow_goal  {
		velocity <- velocity + ((target_loc - location) / cohesion_factor);
	}
	//Reflex to apply separation when people are too close from each other
	reflex separation {
		point acc <- {0,0};
		ask (people at_distance size)  {
			acc <- acc - (location - myself.location);
		}  
		velocity <- velocity + acc;
	}
	//Reflex to avoid the different obstacles
	reflex avoid { 
		point acc <- {0,0};
		list<building> nearby_obstacles <- (building at_distance people_size);
		loop obs over: nearby_obstacles {
			acc <- acc - (obs.location - location);
		}
		velocity <- velocity + acc; 
	}
	//Reflex to move the agent considering its location, target and velocity
	reflex move {
		point old_location <- copy(location);
		do goto target: location + velocity ;
		if (not empty(building overlapping self )) {
			location <- point((location closest_points_with free_space)[1]);
		}
		velocity <- location - old_location;
	}	
	aspect default {
		draw pyramid(size) color: color;
		draw sphere(size/3) at: {location.x,location.y,size} color: color;
	}
}

experiment main type: gui {
	parameter "nb people" var: nb_people min: 1 max: 1000;
	output {
		display map type: opengl {
			species building refresh: false;
			species people;
			graphics "exit" refresh: false {
				draw sphere(2 * people_size) at: target_point color: #green;	
			}
		}
	}
}

```


```
model Evacuation_coupling

import "../../../Toy Models/Evacuation/models/Continuous Move.gaml"
experiment Evacuation_coupling_exp type: gui parent: main
{
	point centroid <- { 0, 180 };
	list<building> getBuilding
	{
		return list(building);
	}

	action transform_environement
	{
		loop t over: list(building)
		{
			t.shape <- t.shape translated_by centroid;
			t.shape <- t.shape * 10;
			t.location <- t.location * 8;
		}

		loop t over: list(people)
		{
			t.speed <- 10.0;
			t.size <- 20.0;
			t.shape <- t.shape translated_by centroid;
			t.location <- t.location * 8;
		}

		target_point <- point(target_point translated_by centroid);
	}

	list<people> getPeople
	{
		return list(people);
	}

	output
	{
	}

}
```


```

model hydro

global {
   //Shapefile for the river
   file river_shapefile <- file("../includes/RedRiver.shp");
   //Shapefile for the dykes
   file dykes_shapefile <- file("../includes/Dykes.shp");
   //Shapefile for the buildings
   file buildings_shapefile <- file("../includes/Building.shp");
   
   //Data elevation file
   file dem_file <- file("../includes/mnt50.asc");  
   //Diffusion rate
   float diffusion_rate <- 0.6;
   //Height of the dykes
   float dyke_height <- 15.0;
   //Width of the dyke
   float dyke_width <- 15.0;
    
   //Shape of the environment using the dem file
   geometry shape <- envelope(dem_file);
   
   //List of the drain and river cells
   list<cell> drain_cells;
   list<cell> river_cells;
   
   
  
   float step <- 1°h;
   
   init {
   	 //Initialization of the cells
      do init_cells;
     //Initialization of the water cells
      do init_water;
     //Initialization of the river cells
     river_cells <- cell where (each.is_river);
     //Initialization of the drain cells
      drain_cells <- cell where (each.is_drain);
     //Initialization of the obstacles (buildings and dykes)
      do init_obstacles;
      //Set the height of each cell
      ask cell {
         obstacle_height <- compute_highest_obstacle();
         do update_color;
      }
   }
   //Action to initialize the altitude value of the cell according to the dem file
   action init_cells {
      ask cell {
         altitude <- grid_value;
         neighbour_cells <- (self neighbors_at 1) ;
      }
   }
   //action to initialize the water cells according to the river shape file and the drain
   action init_water {
      geometry river <- geometry(river_shapefile);
      ask cell overlapping river {
         water_height <- 10.0;
         is_river <- true;
         is_drain <- grid_y = matrix(cell).rows - 1;
      }
   }
   //initialization of the obstacles (the buildings and the dykes)
   action init_obstacles{
      create buildings from: buildings_shapefile  {
         do update_cells;
      }
      create dyke from: dykes_shapefile;
      ask dyke {
          shape <-  shape + dyke_width;
            do update_cells;
      }
   }
   //Reflex to add water among the water cells
   reflex adding_input_water {
   	  float water_input <- rnd(100)/100;
      ask river_cells {
         water_height <- water_height + water_input;
      }
   }
   //Reflex to flow the water according to the altitute and the obstacle
   reflex flowing {
      ask cell {already <- false;}
      ask (cell sort_by ((each.altitude + each.water_height + each.obstacle_height))) {
         do flow;
      }
   }
   //Reflex to update the color of the cell
   reflex update_cell_color {
      ask cell {
         do update_color;
      }
   }
   //Reflex for the drain cells to drain water
   reflex draining {
      ask drain_cells {
         water_height <- 0.0;
      }
   }
   
}
//Species which represent the obstacle
   species obstacle {
   	  //height of the obstacle
      float height min: 0.0;
      //Color of the obstacle
      rgb color;
      //Pressure of the water
      float water_pressure update: compute_water_pressure();
      
      //List of cells concerned
      list<cell> cells_concerned ;
      //List of cells in the neighbourhood 
      list<cell> cells_neighbours;
      
      //Action to compute the water pressure
      float compute_water_pressure {
      	//If the obstacle doesn't have height, then there will be no pressure
         if (height = 0.0) {
            return 0.0;
         } else {
         	//The leve of the water is equals to the maximul level of water in the neighbours cells
            float water_level <- cells_neighbours max_of (each.water_height);
            //Return the water pressure as the minimal value between 1 and the water level divided by the height
            return min([1.0,water_level / height]);
         } 
      }
      
      //Action to update the cells
      action update_cells {
      	//All the cells concerned by the obstacle are the ones overlapping the obstacle
         cells_concerned <- (cell overlapping self);
        	ask cells_concerned {
        	//Add the obstacles to the obstacles of the cell
            add myself to: obstacles;
            water_height <- 0.0;
         }
         //Cells neighbours are all the neighbours cells of the cells concerned
         cells_neighbours <- cells_concerned + cells_concerned accumulate (each.neighbour_cells);
         //The height is now computed
      	 do compute_height();
         if (height > 0.0) {   
         	//We compute the water pressure again
            water_pressure <- compute_water_pressure();
         } else {water_pressure <- 0.0;}
      }
      action compute_height;
      aspect geometry {
         int val <- int( 255 * water_pressure);
         color <- rgb(val,255-val,0);
         draw shape color: color depth: height*5 border: color;
      }
   }
   //Species buildings which is derivated from obstacle
   species buildings parent: obstacle {
   	 //The building has a height randomly chosed between 2 and 10
      float height <- 2.0 + rnd(8);
   }
   //Species dyke which is derivated from obstacle
   species dyke parent: obstacle{
   	
       int counter_wp <- 0;
       int breaking_threshold <- 24;
      
      //Action to represent the break of the dyke
       action break{
         ask cells_concerned {
            do update_after_destruction(myself);
         }
         do die;
      }
      //Action to compute the height of the dyke as the dyke_height without the mean height of the cells it overlaps
      action compute_height
       {
      	   height <- dyke_height - mean(cells_concerned collect (each.altitude));
      
      }
      
      //Reflex to break the dynamic of the water
      reflex breaking_dynamic {
      	if (water_pressure = 1.0) {
      		counter_wp <- counter_wp + 1;
      		if (counter_wp > breaking_threshold) {
      			do break;
      		}
      	} else {
      		counter_wp <- 0;
      	}
      }
      //user command which allows the possibility to destroy the dyke for the user
      user_command "Destroy dyke" action: break; 
   }
   //Grid cell to discretize space, initialized using the dem file
   grid cell file: dem_file neighbors: 8 frequency: 0  use_regular_agents: false use_individual_shapes: false use_neighbors_cache: false {
      //Altitude of the cell
      float altitude;
      //Height of the water in the cell
      float water_height <- 0.0 min: 0.0;
      //Height of the cell
      float height;
      //List of the neighbour cells
      list<cell> neighbour_cells ;
      //Boolean to know if it is a drain cell
      bool is_drain <- false;
      //Boolean to know if it is a river cell
      bool is_river <- false;
      //List of all the obstacles overlapping the cell
      list<obstacle> obstacles;
      //Height of the obstacles
      float obstacle_height <- 0.0;
      bool already <- false;
      
      //Action to compute the highest obstacle among the obstacles
      float compute_highest_obstacle {
         if (empty(obstacles))
         {
            return 0.0; 
         } else {
            return obstacles max_of(each.height);
         }
      }
      //Action to flow the water 
      action flow {
      	//if the height of the water is higher than 0 then, it can flow among the neighbour cells
         if (water_height > 0) {
         	//We get all the cells already done
            list<cell> neighbour_cells_al <- neighbour_cells where (each.already);
            //If there are cells already done then we continue
            if (!empty(neighbour_cells_al)) {
               //We compute the height of the neighbours cells according to their altitude, water_height and obstacle_height
               ask neighbour_cells_al {height <- altitude + water_height + obstacle_height;}
               //The height of the cell is equals to its altitude and water height
               height <-  altitude +  water_height;
               //The water of the cells will flow to the neighbour cells which have a height less than the height of the actual cell
               list<cell> flow_cells <- (neighbour_cells_al where (height > each.height)) ;
               //If there are cells, we compute the water flowing
               if (!empty(flow_cells)) {
                  loop flow_cell over: shuffle(flow_cells) sort_by (each.height){
                     float water_flowing <- max([0.0, min([(height - flow_cell.height), water_height * diffusion_rate])]); 
                     water_height <- water_height - water_flowing;
                     flow_cell.water_height <-flow_cell.water_height +  water_flowing;
                     height <- altitude + water_height;
                  }   
               }
            }
         }
         already <- true;
      }  
      //Update the color of the cell
      action update_color { 
         int val_water <- 0;
         val_water <- max([0, min([255, int(255 * (1 - (water_height / 12.0)))])]) ;  
         color <- rgb([val_water, val_water, 255]);
         grid_value <- water_height + altitude;
      }
      //action to compute the destruction of the obstacle
      action update_after_destruction(obstacle the_obstacle){
         remove the_obstacle from: obstacles;
         obstacle_height <- compute_highest_obstacle();
      }
       
   }


experiment main_gui type: gui {
   parameter "Shapefile for the river" var:river_shapefile category:"Water data";
   parameter "Shapefile for the dykes" var:dykes_shapefile category:"Obstacles";
   parameter "Shapefile for the buildings" var:buildings_shapefile category:"Obstacles";
   parameter "Height of the dykes" var:dyke_height category:"Obstacles";
   parameter "Diffusion rate" var:diffusion_rate category:"Water dynamic";
   output { 
      display map type: opengl {
         grid cell triangulation: true;
         species buildings aspect: geometry;
         species dyke aspect: geometry ;
      }
      display chart_display refresh: every(24) { 
         chart "Pressure on Dykes" type: series {
            data "Mean pressure on dykes " value: mean(dyke collect (each.water_pressure)) style: line color: #magenta ;
            data "Rate of dykes with max pressure" value: (dyke count (each.water_pressure = 1.0))/ length(dyke) style: line color: #red ;
            data "Rate of dykes with high pressure" value: (dyke count (each.water_pressure > 0.5))/ length(dyke) style: line color: #orange ;
            data "Rate of dykes with low pressure" value: (dyke count (each.water_pressure < 0.25))/ length(dyke) style: line color: #green ;
         }
      }
   }
}
```


```
model Flood_coupling

import "../../../Toy Models/Flood Simulation/models/Hydrological Model.gaml"
experiment Flood_coupling_exp type: gui parent: main_gui
{
	point newSize <- { 0.07, 0.07 };
	cell getCellAt (geometry p)
	{
		ask simulation
		{
			return cell closest_to p;
		}

	}

	list<cell> getCell
	{
		return list(cell) where (each.grid_value > 8.0);
	}

	list<buildings> getBuildings
	{
		return list(buildings);
	}

	list<dyke> getDyke
	{
		return list(dyke);
	}

	output
	{
	}

}
```


Code of the model : 

```
model comodel_Flood_Evacuation

import "Flood_coupling.gaml" as myFlood
import "Evacuation_coupling.gaml" as myEvacuation


global
{
	//set the bound of environment
	geometry shape <- envelope(file("../../../Toy Models/Flood Simulation/includes/mnt50.asc"));
	//counting variable of casualty
	int casualty <- 0;
	init
	{
		//create experiment from micro-model myFlood with corresponding parameters
		create myFlood.Flood_coupling_exp with:
		[buildings_shapefile::file("../../../Toy Models/Flood Simulation/includes/Building.shp"), river_shapefile::file("../../../Toy Models/Flood Simulation/includes/RedRiver.shp"), dykes_shapefile::file("../../../Toy Models/Flood Simulation/includes/Dykes.shp"), dem_file::file("../../../Toy Models/Flood Simulation/includes/mnt50.asc")];
		//create the Evacuation micro-model's experiment
		create myEvacuation.Evacuation_coupling_exp with: [nb_people::200, target_point::{ 0, 1580 }, building_shapefile::file("../../../Toy Models/Evacuation/includes/building.shp")]
		{
			//transform the environment and the agents to new location (near the river)
			do transform_environement;
		}

	}

	reflex doing_cosimulation
	{
		//do a step of Flooding
		ask myFlood.Flood_coupling_exp collect each.simulation
		{
			do _step_;
		}

		//people evacate 
		ask myEvacuation.Evacuation_coupling_exp collect each.simulation
		{
			//depending on the real plan of evacuation, we can test the speed of the evacuation with the speed of flooding by doing more or less simulation step  
			if (cycle mod 2 = 0)
			{
				do _step_;
			}

		}

		//loop over the population
		loop thePeople over: first(myEvacuation.Evacuation_coupling_exp).getPeople()
		{
			//get the cell at people's location
			cell theWater <- cell(first(myFlood.Flood_coupling_exp).getCellAt(thePeople));
			//if the water levele is high than 8 meters and people is overlapped, tell him that he must dead
			if (theWater.grid_value > 8.0 and theWater overlaps thePeople)
			{
				ask thePeople
				{
					do die;
				}
				//increase the counting variable
				casualty <- casualty + 1;
			}

		}

	}

}

experiment comodel_Flood_Evacuation_exp type: gui
{
	output
	{
		display "comodel_disp"
		{
			agents "building" value: first(myEvacuation.Evacuation_coupling_exp).getBuilding();
			agents "people" value: first(myEvacuation.Evacuation_coupling_exp).getPeople();
			agents "cell" value: first(myFlood.Flood_coupling_exp).getCell();
			agents "dyke" value: first(myFlood.Flood_coupling_exp).getDyke();
			graphics 'CasualtyView'
			{
				draw ('Casualty: ' + casualty) at: { 0, 4000 } font: font("Arial", 18, # bold) color: # red;
			}

		}

	}

}
```
