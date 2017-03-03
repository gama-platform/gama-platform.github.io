---
layout: default
title:  comodel_with_the_coupling
wikiPageName: Co-model-Usage-comodel_with_the_coupling
wikiPagePath: wiki/Co-model-Usage-comodel_with_the_coupling.md
---

[//]: # (keyword|statement_agents)
[//]: # (keyword|concept_comodel)
# comodel_with_the_coupling


_Author : HUYNH Quang Nghi_

This is a simple comodel serve to demonstrate the importation and instatiation of micro-model using the couplings  


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
model M2_coupling
import "m2.gaml"

global
{
}

experiment M2_coupling_exp parent:M2_exp type: gui
{
	list<B> getB{
		return list(B);
	}
	
	//if we redefine the output, i.e, a blank output, the displays in parent experiement dont show.
	output
	{
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


```
model M1_coupling
import "m1.gaml"

global
{
}

experiment M1_coupling_exp parent:M1_exp type: gui
{
	list<A> getA{
		return list(A);
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

import "m1_coupling.gaml" as micro_model_1
import "m2_coupling.gaml" as micro_model_2

global
{
	geometry shape<-envelope(square(100));
	init{
		//micro_model must be instantiated by create statement. We create an experiment inside the micro-model and the simulation will be created implicitly (1 experiment have only 1 simulation).
		create micro_model_1.M1_coupling_exp;
		create micro_model_2.M2_coupling_exp number:5;
	}
	reflex simulate_micro_models{
		
		//tell all experiments of micro_model_1 do 1 step;
		ask (micro_model_1.M1_coupling_exp collect each.simulation){
			do _step_;
		}
		
		//tell the first experiment of micro_model_2 do 1 step;
		ask (micro_model_2.M2_coupling_exp collect each.simulation){
			do _step_;
		}
	}
}

experiment comodel_with_the_coupling type: gui{
	output{
		display "comodel" {
			//to display the agents of micro-models, we use the agent layer with the values come from the coupling.
			agents "agentA" value:first(micro_model_1.M1_coupling_exp).getA();
			agents "agentB" value:first(micro_model_2.M2_coupling_exp).getB();
		}
	}
}
```
