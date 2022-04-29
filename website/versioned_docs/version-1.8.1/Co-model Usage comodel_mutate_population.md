---
title: comodel_with_the_coupling
id: version-1.8.1-Co-model Usage comodel_mutate_population
original_id: Co-model Usage comodel_mutate_population
---

[//]: # (keyword|operator_dead)
[//]: # (keyword|operator_any)
[//]: # (keyword|operator_triangle)
[//]: # (keyword|operator_sort)
[//]: # (keyword|operator_accumulate)
[//]: # (keyword|statement_agents)
[//]: # (keyword|constant_#lime)
[//]: # (keyword|concept_comodel)


_Author : HUYNH Quang Nghi_

This is a simple comodel serve to demonstrate the importation and instatiation of micro-model  using the couplings  with the mutation the population of micro-model. A population can be a collection from itself and from other mircro-model


Imported models : 

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
model comodel_with_the_coupling

import "PreyPredator_coupling.gaml" as myP


global
{
	// set the shape of world as a rectangle 200 x 100
	geometry shape <- rectangle(200, 100);
	init
	{
		//instantiate three instant of micro-model PreyPredator
		create myP.PreyPredator_coupling_exp with: [shape::square(100), preyinit::rnd(20), predatorinit::1] number: 3;
		
		//explicitly save the orginal population of predator and original population of prey of each micro-model
		list<agent> lstpredator0 <- myP.PreyPredator_coupling_exp[0].getPredator();
		list<agent> lstprey0 <- myP.PreyPredator_coupling_exp[0].getPrey();
		
		list<agent> lstpredator1 <- myP.PreyPredator_coupling_exp[1].getPredator();
		list<agent> lstprey1 <- myP.PreyPredator_coupling_exp[1].getPrey();
		
		list<agent> lstpredator2 <- myP.PreyPredator_coupling_exp[2].getPredator();
		list<agent> lstprey2 <- myP.PreyPredator_coupling_exp[2].getPrey();
		
		//mutate the popuplation of micro-model by assigning the list above to  the population of micro-models
		(myP.PreyPredator_coupling_exp[0].simulation).lstPredator <- lstpredator2;
		(myP.PreyPredator_coupling_exp[1].simulation).lstPredator <- lstprey2;
		(myP.PreyPredator_coupling_exp[2].simulation).lstPredator <- lstprey1;
		
		
		(myP.PreyPredator_coupling_exp[0].simulation).lstPrey <- lstprey0 + lstprey1;
		(myP.PreyPredator_coupling_exp[1].simulation).lstPrey <- lstpredator1;
		(myP.PreyPredator_coupling_exp[2].simulation).lstPrey <- lstpredator0 + lstprey2;
		
		//change the shape correspond with the new role of agent in the new populations
		ask (myP.PreyPredator_coupling_exp accumulate each.simulation.lstPredator)
		{
			shape <- triangle(2);
		}

		ask (myP.PreyPredator_coupling_exp accumulate each.simulation.lstPrey)
		{
			shape <- circle(0.5);
		}

	}

	reflex simulate_micro_models
	{
		// ask all simulation do their job
		ask (myP.PreyPredator_coupling_exp collect each.simulation)
		{
			do _step_;
		}

	}

}

experiment comodel_with_the_coupling_exp type: gui
{
	output
	{
		//a mixing display of all agents from all populations
		display "comodel"
		{
			agents "agentprey" value: (myP.PreyPredator_coupling_exp accumulate each.getPrey());
			agents "agentpredator" value: (myP.PreyPredator_coupling_exp accumulate each.getPredator());
		}

	}

}
```
