---
layout: default
title: comodel with mixed behaviors 
wikiPageName: Co-model-Usage-comodel_mix_behaviors
wikiPagePath: wiki/Co-model-Usage-comodel_mix_behaviors.md
---

[//]: # (keyword|operator_dead)
[//]: # (keyword|operator_any)
[//]: # (keyword|operator_triangle)
[//]: # (keyword|operator_sort)
[//]: # (keyword|operator_round)
[//]: # (keyword|operator_sort_by)
[//]: # (keyword|operator_last)
[//]: # (keyword|operator_font)
[//]: # (keyword|operator_distance_between)
[//]: # (keyword|operator_with_precision)
[//]: # (keyword|operator_accumulate)
[//]: # (keyword|skill_fsm)
[//]: # (keyword|architecture_fsm)
[//]: # (keyword|type_topology)
[//]: # (keyword|statement_state)
[//]: # (keyword|statement_transition)
[//]: # (keyword|statement_diffuse)
[//]: # (keyword|statement_agents)
[//]: # (keyword|statement_overlay)
[//]: # (keyword|statement_inspect)
[//]: # (keyword|statement_exhaustive)
[//]: # (keyword|statement_permanent)
[//]: # (keyword|statement_genetic)
[//]: # (keyword|constant_#lime)
[//]: # (keyword|constant_#zoom)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|constant_#plain)
[//]: # (keyword|constant_#darkgray)
[//]: # (keyword|constant_#pixels)
[//]: # (keyword|constant_#darkgreen)
[//]: # (keyword|concept_comodel)
# comodel with mixed behaviors 


_Author : HUYNH Quang Nghi_

This is a simple comodel serve to demonstrate the mixing behaviors of preyPredator with the Ants. Ants are the prey, fleeing from Predators, when they are not chasing, they try to do job of the ants.


Imported models : 

```
model ants

global {
	//Evaporation value per cycle
	float evaporation_per_cycle <- 5.0 min: 0.0 max: 240.0 parameter: 'Evaporation of the signal (unit/cycle):' category: 'Signals';
	//Diffusion rate of the pheromon among the grid
	float diffusion_rate <- 1.0 min: 0.0 max: 1.0 parameter: 'Rate of diffusion of the signal (%/cycle):' category: 'Signals';
	//Size of the grid
	int gridsize <- 100 min: 30 parameter: 'Width and Height of the grid:' category: 'Environment and Population';
	//Number of ants
	int ants_number <- 200 min: 1 parameter: 'Number of ants:' category: 'Environment and Population';
	//Frequency of update of the grid
	int grid_frequency <- 1 min: 1 max: 100 parameter: 'Grid updates itself every:' category: 'Environment and Population';
	//Number of food places among the grid
	int number_of_food_places <- 5 min: 1 parameter: 'Number of food depots:' category: 'Environment and Population';
	float grid_transparency <- 1.0;
	file ant_shape_empty const: true <- file('../icons/ant.png');
	image_file ant_shape_full const: true <- file('../icons/full_ant.png');
	//The center of the grid that will be considered as the nest location
	point center const: true <- { round(gridsize / 2), round(gridsize / 2) };
	int food_gathered <- 1;
	int food_placed <- 1;
	rgb background const: true <- rgb(#99CC66);
	rgb food_color const: true <- rgb(#312200);
	rgb nest_color const: true <- rgb(#000000); 

	geometry shape <- square(gridsize);
	init {
		//Creation of the food places placed randomly with a certain distance between each
		loop times: number_of_food_places {
			point loc <- { rnd(gridsize - 10) + 5, rnd(gridsize - 10) + 5 };
			list<ant_grid> food_places <- (ant_grid where ((each distance_to loc) < 5));
			ask food_places {
				if food = 0 {
					food <- 5;
					food_placed <- food_placed + 5;
					color <- food_color;  
				}                                           
			}
		}
		//Creation of the ants that will be placed in the nest
		create ant number: ants_number with: (location: center);
	}
	//Reflex to diffuse the pheromon among the grid
	reflex diffuse {
      diffuse var:road on:ant_grid proportion: diffusion_rate radius:3 propagation: gradient method:convolution;
   }
  
}

//Grid used to discretize the space to place food
grid ant_grid width: gridsize height: gridsize neighbors: 8 frequency: grid_frequency use_regular_agents: false use_individual_shapes: false{
	bool is_nest const: true <- (topology(ant_grid) distance_between [self, center]) < 4;
	float road <- 0.0 max: 240.0 update: (road <= evaporation_per_cycle) ? 0.0 : road - evaporation_per_cycle;
	rgb color <- is_nest ? nest_color : ((food > 0) ? food_color : ((road < 0.001) ? background : rgb(#009900) + int(road * 5))) update: is_nest ? nest_color : ((food > 0) ?
	food_color : ((road < 0.001) ? background : rgb(#009900) + int(road * 5)));
	int food <- 0;
}
//Species ant that will move and follow a final state machine
species ant skills: [moving] control: fsm {
	float speed <- 1.0;
	bool has_food <- false;
	
	//Reflex to place a pheromon stock in the cell
	reflex diffuse_road when:has_food=true{
      ant_grid(location).road <- ant_grid(location).road + 100.0;
   }
	//Action to pick food
	action pick (int amount) {
		has_food <- true;
		ant_grid place <- ant_grid(location);
		place.food <- place.food - amount;
	}
	//Action to drop food
	action drop {
		food_gathered <- food_gathered + 1;
		has_food <- false;
		heading <- heading - 180;
	}
	//Action to find the best place in the neighborhood cells
	point choose_best_place {
		container list_places <- ant_grid(location).neighbors;
		if (list_places count (each.food > 0)) > 0 {
			return point(list_places first_with (each.food > 0));
		} else {
			list_places <- (list_places where ((each.road > 0) and ((each distance_to center) > (self distance_to center)))) sort_by (each.road);
			return point(last(list_places));
		}

	}
	//Reflex to drop food once the ant is in the nest
	reflex drop when: has_food and (ant_grid(location)).is_nest {
		do drop();
	}
	//Reflex to pick food when there is one at the same location
	reflex pick when: !has_food and (ant_grid(location)).food > 0 {
		do pick(1);
	}
	//Initial state to make the ant wander 
	state wandering initial: true {
		do wander(amplitude: 90);
		float pr <- (ant_grid(location)).road;
		transition to: carryingFood when: has_food;
		transition to: followingRoad when: (pr > 0.05) and (pr < 4);
	}
	//State to carry food once it has been found
	state carryingFood {
		do goto(target: center);
		transition to: wandering when: !has_food;
	}
	//State to follow a pheromon road if once has been found
	state followingRoad {
		point next_place <- choose_best_place();
		float pr <- (ant_grid(location)).road;
		location <- next_place;
		transition to: carryingFood when: has_food;
		transition to: wandering when: (pr < 0.05) or (next_place = nil);
	}

	aspect info {
		draw circle(1) empty: !has_food color: #red;
		if (destination != nil) {
			draw line([location + {0,0,0.5}, destination + {0,0,0.5}]) + 0.1 color: #white border: false;
		}

		draw circle(4) empty: true color: #white;
		draw string(self as int) color: #white font: font("Helvetica", 12 * #zoom, #bold) at: my location - {1, 1, -0.5};
		draw state color: #yellow  font: font("Helvetica", 10 * #zoom, #plain) at: my location + { 1, 1, 0.5 } perspective: false;
	}

	aspect icon {
		draw ant_shape_empty size: {7,5} rotate: my heading + 1;
	}

	aspect default {
		draw square(1) empty: !has_food color: #blue rotate: my heading;
	}
}	
//Simple experiment to display the ants
experiment Displays type: gui {
	point quadrant_size <- { 0.5, 0.5 };
	float inc <- 0.001;
	float pos <- 0.0;
	reflex moving_quadrant {
	//pos <- pos + inc;
		if (pos > 0.5 or pos <= 0) {
			inc <- -inc;
		}
		
	}

	output {
		display Ants background: #white type: opengl {
			image '../images/soil.jpg' position: { pos, pos } size: quadrant_size;
			agents "agents" transparency: 0.5 position: { pos, pos } size: quadrant_size value: (ant_grid as list) where ((each.food > 0) or (each.road > 0) or (each.is_nest));
			species ant position: { pos, pos } size: quadrant_size aspect: icon;
			grid ant_grid lines: #darkgray position: { 0.5, 0 } size: quadrant_size;
			species ant position: { 0.5, 0 } size: quadrant_size aspect: info;
		}
	}
}
//Complete experiment that will inspect all ants in a table
experiment Complete type: gui {
	parameter 'Number:' var: ants_number init: 100 unit: 'ants' category: 'Environment and Population';
	parameter 'Grid dimension:' var: gridsize init: 100 unit: '(number of rows and columns)' category: 'Environment and Population';
	parameter 'Number of food depots:' var: number_of_food_places init: 5 min: 1 category: 'Environment and Population';

	// Experimentator

	init {
		write "Experimentator agent running " + self;
	   ants_number <- 200;
	}


	output {
		display Ants2D type: java2D {
			image '../images/soil.jpg' position: { 0.05, 0.05 } size: { 0.9, 0.9 };
			agents "agents" transparency: 0.7 position: { 0.05, 0.05 } size: { 0.9, 0.9 } value: (ant_grid as list) where ((each.food > 0) or (each.road > 0) or (each.is_nest)) ;
			species ant position: { 0.05, 0.05 } size: { 0.9, 0.9 } aspect: icon;
			overlay "Texts" transparency: 0.3 background: rgb (99, 85, 66,255)  position: {10°px, 10°px} size: {250°px, 150°px} border: rgb (99, 85, 66,255) rounded: true{
				draw ant_shape_full at: {60°px, 70°px} size: {140°px, 100°px} rotate: -60;
				draw ('Food foraged: ' + (((food_placed = 0 ? 0 : food_gathered / food_placed) * 100) with_precision 2) + '%') at: {40°px,70°px} font:font("Arial", 18, #bold) color: #white;
				draw ('Carrying ants: ' + (((100 * ant count (each.has_food or each.state = "followingRoad")) / length(ant)) with_precision 2) + '%') at: {40°px, 100°px} font:font("Arial", 18 , #bold) color: #white;
			}
					
		}
		inspect "All ants" type: table value: ant attributes: ['name', 'location', 'heading','state'];
	}
}
//Batch experiment to find the best way to maximize the food gathered using exhaustive method
experiment Batch type: batch repeat: 4 keep_seed: true until: (food_gathered = food_placed) or (time > 1000) {
	parameter 'Size of the grid:' var: gridsize init: 75 unit: 'width and height';
	parameter 'Number:' var: ants_number among:[10,20,50] unit: 'ants';
	parameter  'Evaporation:' var: evaporation_per_cycle among: [0.1, 0.5, 2.0, 10.0] unit: 'units every cycle';
	parameter  'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.2;
	method exhaustive maximize: food_gathered;

	
	permanent {
		display Comparison background: #white {
			chart "Food Gathered" type: series {
					data "Min" value:  min(ants_model collect each.food_gathered ) style: spline color: #darkgreen ;
					data "Max" value:  max(ants_model collect each.food_gathered ) style: spline color: #red ;
			}
		}
	}
}

//Batch experiment to find the best way to maximize the food gathered using genetic method
experiment Genetic type: batch repeat: 2 keep_seed: true until: (food_gathered = food_placed) or (time > 1000) {
	parameter 'Size of the grid:' var: gridsize init: 75 unit: '(width and height)';
	parameter 'Number:' var: ants_number among:[10,20,50] unit: 'ants';
	parameter  'Evaporation:' var: evaporation_per_cycle among: [0.1, 0.5, 2.0, 10.0] unit: 'units every cycle';
	parameter 'Diffusion:' var: diffusion_rate min: 0.1 max: 1.0 unit: 'rate every cycle (1.0 means 100%)' step: 0.2;
	method genetic maximize: food_gathered pop_dim: 5 crossover_prob: 0.7 mutation_prob: 0.1 nb_prelim_gen: 1 max_gen: 20;
	
		permanent {
		display Comparison background: #white {
			chart "Food Gathered" type: series {
					data "Min" value:  min(ants_model collect each.food_gathered ) style: spline color: #darkgreen ;
					data "Max" value:  max(ants_model collect each.food_gathered ) style: spline color: #red ;
			}
		}
	}
}

```


```
model Ants_coupling

import "../../../Toy Models/Ants (Foraging and Sorting)/models/Ant Foraging (Complex).gaml" 



experiment Ants_coupling_exp type:gui  parent:Complete{
	
	list<ant> getAnts{
		return list(ant);
	}
	
	list<ant_grid> getAnt_grid{
		return list(ant_grid);
	}
	
	output{	
	}
}
```


```
model PreyPredator
 global
{
	geometry shape <- square(100);
	float perceipt_radius <- 20.0;
	int preyinit <- 500;
	int predatorinit <- 3;
	list<agent> lstPredator <- list<agent>(predator);
	list<agent> lstPrey <- list<agent>(prey);
	init
	{
		create prey number: preyinit;
		create predator number: predatorinit;
		lstPredator <- list<agent>(predator);
		lstPrey <- list<agent>(prey);
	}

}

species generic_species skills: [moving]
{
	float speed <- 1.0;
	point goal <- nil;
	bool is_chased <- false;
	reflex live_with_my_goal
	{
		if (goal != nil)
		{
			do wander speed: speed;
			do goto target: goal speed: speed;
		} else
		{
			do wander speed: speed;
		}

	}

}

species prey parent: generic_species
{
	geometry shape <- circle(0.5);
	float speed <- 0.2;
	rgb color <- # green;
	reflex fleeing
	{
		if (length((lstPredator where (each != nil and !dead(each) and each distance_to self < perceipt_radius))) > 0)
		{
			speed <- 1.0;
			is_chased <- true;
			color <- # lime;
			if (goal = nil)
			{
				agent a <- any(((lstPrey where (each != nil and !dead(each) and !generic_species(each).is_chased))));
				if (a != nil and !dead(a))
				{
					if (flip(0.5))
					{
						goal <- a.location;
					} else
					{
						goal <- any_location_in(world.shape);
					}

				} else
				{
					goal <- any_location_in(world.shape);
				}

			}

		}

		if (goal != nil and self.location distance_to goal < 0.5)
		{
			goal <- nil;
		}

		if (length((lstPredator where (each != nil and !dead(each))) where (each distance_to self <= perceipt_radius)) = 0)
		{
			is_chased <- false;
			color <- # green;
			speed <- 0.2;
		}

	}

	aspect default
	{
		draw shape color: color;
	}

}

species predator parent: generic_species
{
	geometry shape <- triangle(2);
	rgb color <- # red;
	reflex hunting
	{
		if (goal = nil)
		{
			list tmp <- (lstPrey where (!dead(each) and each.shape distance_to self.shape < perceipt_radius));
			if (length(tmp) > 0)
			{
				agent a <- first(tmp sort (each.shape distance_to self.shape));
				if (a = nil)
				{
					a <- any((lstPrey where (!dead(each))));
				}

				if (a != nil)
				{
					speed <- 2.0;
					goal <- a.location;
				}

			}

		} else if ((self.location distance_to goal < 0.5))
		{
			ask lstPrey where (!dead(each) and each.location distance_to goal < 0.5)
			{
				do die;
			}

			goal <- nil;
			speed <- 1.0;
		}

	}

	aspect default
	{
		draw circle(perceipt_radius) color: # pink empty: true;
		draw shape color: color rotate: 90 + my heading;
	}

}

experiment prey_predator_exp type: gui
{
	output
	{
		display main_display

		{
			species prey;
			species predator;
		}

	}

}
```


```
model PreyPredator_coupling
import "PreyPredator.gaml"

global
{	
}

experiment PreyPredator_coupling_exp parent:prey_predator_exp type: gui
{
geometry shape<- square(100);
	list<prey> getPrey{
		return list(prey);
	}
		list<predator> getPredator{
		return list(predator);
	}
	
	//if we redefine the output, i.e, a blank output, the displays in parent experiement dont show.
	output
	{
	}

}


```


Code of the model : 

```
model comodel_mix_behaviors

import "PreyPredator_coupling.gaml" as myPreyPredator
import "Ants_coupling.gaml" as myAnt


global
{
	//set the shape of environment: square 100 
	geometry shape <- square(100);
	// the variable that refer to the ants population in micro-model 
	list<agent> theAnts;
	// the variable that refer to the prey population in micro-model
	list<prey> thePreys;
	
	init
	{
		//create the Ants micro-model with the size of grid is 100 and the population have 500 ants.
		create myAnt.Ants_coupling_exp with: [gridsize::100,ants_number::500];
		//create the PreyPredator micro-model with the parameters and the number of the prey is equal with the size of ants population
		create myPreyPredator.PreyPredator_coupling_exp with: [shape::square(100), preyinit::myAnt.Ants_coupling_exp[0].simulation.ants_number, predatorinit::3]  
		{
			// set the size of micro-model PreyPredator equal with the size of the grid of myAnt
			shape <- square(100);
		}

		// save the original population of the Ants and the Preys
		theAnts <- myAnt.Ants_coupling_exp accumulate each.getAnts();
		thePreys <- list<prey>(myPreyPredator.PreyPredator_coupling_exp accumulate each.getPrey());


	}

	reflex simulate_micro_models
	{
		// ask myAnt do a step
		ask (myAnt.Ants_coupling_exp collect each.simulation)
		{
			do _step_;
		}
		// ask myPreyPredator do a step, too
		ask (myPreyPredator.PreyPredator_coupling_exp collect each.simulation)
		{
			do _step_;
		}

		//check if a Prey is chased, set the position of that agent to the location of prey 
		//if not, set ant's location to agent location.
		// if the agent (prey) died, then tell the ant do die
		loop i from: 0 to: length(theAnts) - 1
		{
			if (!dead(thePreys at i) and !dead(theAnts at i))
			{
				if (!(thePreys at i).is_chased)
				{
					(thePreys at i).location <- (theAnts at i).location;
				} else
				{
					(theAnts at i).location <- (thePreys at i).location;
				}

			} else
			{
				ask (theAnts at i)
				{
					do die;
				}

			}

		}

	}

}

experiment comodel_mix_behaviors_exp type: gui
{
	output
	{
		display "comodel"
		{
			agents "ant_grid" value: myAnt.Ants_coupling_exp accumulate each.getAnt_grid() transparency: 0.7;
			agents "agentprey" value: (myPreyPredator.PreyPredator_coupling_exp accumulate each.getPrey());
			agents "agentpredator" value: (myPreyPredator.PreyPredator_coupling_exp accumulate each.getPredator());
		}

	}

}
```
