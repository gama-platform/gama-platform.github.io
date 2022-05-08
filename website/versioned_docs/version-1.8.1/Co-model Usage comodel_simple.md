---
title:  Simple syntax demonstration of Comodeling 
---

[//]: # (keyword|concept_comodel)


_Author : HUYNH Quang Nghi_

This is a simple comodel serve to demonstrate the importation and instatiation of micro-model without using the couplings  


Imported models : 

```
model M2


global
{
	int n <- 4;
	init
	{
		create B number: n;
	}

}

species B skills: [moving]
{
	int IQ <- rnd(100);
	reflex dolive
	{
		write "" + "i'm alive !!";
		do wander;
	}

	aspect default
	{
		draw square(1) color: # red;
	}

}

experiment M2_exp type: gui
{
	output
	{
		display "m2_disp"
		{
			species B aspect: default;
		}

	}

}


```


```
model M1


global
{
	int n <- 8;
	init
	{
		create A number: n;
	}

}

species A skills: [moving]
{
	int IQ <- rnd(100);
	reflex dolive
	{
		write "" + "i'm alive !!";
		do wander;
	}

	aspect default
	{
		draw square(1) color: # green;
	}

}

experiment M1_exp type: gui
{
	output
	{
		display "m1_disp"
		{
			species A aspect: default;
		}

	}

}


```


Code of the model : 

```
model Comodel_simple

import "m1.gaml" as micro_model_1
import "m2.gaml" as micro_model_2


global
{
	init
	{
	//micro_model must be instantiated by create statement. We create an experiment inside the micro-model and the simulation will be created implicitly (1 experiment have only 1 simulation).
		create micro_model_1.M1_exp number: 5;
		create micro_model_2.M2_exp;
	}

	reflex simulate_micro_models
	{

	//tell the first experiment of micro_model_1 do 1 step;
		ask first(micro_model_1.M1_exp).simulation
		{
			do _step_;
		}

		//tell the  experiment at 3 of micro_model_1 do 1 step;
		ask (micro_model_1.M1_exp at 3).simulation
		{
			do _step_;
		}

		//tell all experiments of micro_model_1 do 1 step;
		ask (micro_model_1.M1_exp collect each.simulation)
		{
			do _step_;
		}

		//tell all experiments of micro_model_2 do 1 step;
		ask (micro_model_2.M2_exp collect each.simulation)
		{
			do _step_;
		}
		
		//kill simulation  of micro_model and recreate then
		ask  (micro_model_2.M2_exp collect each.simulation){
			do die;
		}
		ask (micro_model_2.M2_exp){
			create simulation{do _init_;}
		}
	}
}

experiment Comodel_simple_exp type: gui
{
}
```
