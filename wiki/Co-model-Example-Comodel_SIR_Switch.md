---
layout: default
title:  Comodel SIR Switch
wikiPageName: Co-model-Example-Comodel_SIR_Switch
wikiPagePath: wiki/Co-model-Example-Comodel_SIR_Switch.md
---

[//]: # (keyword|operator_diff)
[//]: # (keyword|statement_equation)
[//]: # (keyword|statement_\=)
[//]: # (keyword|statement_solve)
[//]: # (keyword|concept_comodel)
[//]: # (keyword|concept_math)
[//]: # (keyword|concept_equation)
# Comodel SIR Switch


_Author : HUYNH Quang Nghi_

This is a comodel that implement the dynamic of SIR_switch: it will use the EBM when the density of population is big and ABM when the density of population is low. It demonstrate the capability of using dynamically the legacy models.
SIR_ABM_coupling is the coupling that manipulates the elements inside SIR_ABM model and proposes the function would be used from outside. SIR_ABM is a simple example of SIR that use the agents to represent the spreading of disease..
SIR_EBM_coupling is the coupling that manipulates the elements inside SIR_EBM model and proposes the function would be used from outside. SIR_EBM is a simple example of ODE use into agents with the example of the SIR equation system.


Imported models : 

```
model SIR_ABM 

global{
	geometry shape<-envelope(square(100));
	float beta <- 0.5 ; 	 
	float nu <- 0.001 ;
	float delta <- 0.01;
	init{
		create Host number:495 ;
		create Host number:5{state<-1;}
		
	}
}

species Host skills:[moving]{
	int state<-0;
	list<rgb> color<-[#green, #red, #yellow];
	reflex moving{
		do wander;
	}


    
    reflex become_infected when: state=1 {
    	list n<- self neighbors_at(1);
    	ask n{    		
	    	if (flip(beta)) {
				state<-1;    
	        }
    	}
    }
    
    reflex become_immune when: (state=1 and flip(delta)) {
    	state<-2;
    }
    
            
	aspect base{
		draw circle(1) color: color[state];
	}
}
experiment SIR_ABM_exp type:gui{
	output {
		display gridDisp{
			species Host aspect:base;
		}
	}
}
```


```
model SIR_ABM_coupling

import "SIR_ABM.gaml"
experiment SIR_ABM_coupling_exp type: gui parent: SIR_ABM_exp
{
	int get_num_S
	{
		return length(Host where (each.state = 0));
	}

	int get_num_I
	{
		return length(Host where (each.state = 1));
	}

	int get_num_R
	{
		return length(Host where (each.state = 2));
	}

	action set_num_S_I_R (int numS, int numI, int numR)
	{
		unknown call;
		call <- set_num_S(numS);
		call <- set_num_I(numI);
		call <- set_num_R(numR);
	}

	action set_num_S (int num)
	{
		ask (Host where (each.state = 0))
		{
			do die;
		}

		create Host number: num
		{
			state <- 0;
		}

	}

	action set_num_I (int num)
	{
		ask (Host where (each.state = 1))
		{
			do die;
		}

		create Host number: num
		{
			state <- 1;
		}

	}

	action set_num_R (int num)
	{
		ask (Host where (each.state = 2))
		{
			do die;
		}

		create Host number: num
		{
			state <- 2;
		}

	}

	output
	{
	}

}
```


```
model SIR_EBM

global {
	init{
		create agent_with_SIR_dynamic;
	} 
}


species agent_with_SIR_dynamic {
	int N <- 495 ;
	int iInit <- 5;		

    float t;  
	float S <- N - float(iInit); 	      
	float I <- float(iInit); 
	float R <- 0.0; 
	
	float alpha <- 0.2;
	float beta <- 0.8; 

	float h <- 0.01;
   
	equation SIR{ 
		diff(S,t) = (- beta *   S * I / N);
		diff(I,t) = (  beta*  S * I / N) - (alpha * I)  ;
		diff(R,t) = (  alpha  *  I) ;
	}
                
    reflex solving {
//    	write S;
    	solve SIR method: "rk4" step: h;// cycle_length: 1/h ;
    }    
}


experiment SIR_EBM_exp type: gui {
	output { 
		display display_charts {
			chart "SIR_agent" type: series background: #white {
				data 'S' value: first(list(agent_with_SIR_dynamic)).S color: #green ;				
				data 'I' value: first(list(agent_with_SIR_dynamic)).I color: #red ;
				data 'R' value: first(list(agent_with_SIR_dynamic)).R color: #blue ;
			}
		}
	}
}
```


```
model SIR_EBM_coupling

import "SIR_EBM.gaml"
experiment SIR_EBM_coupling_exp type: gui parent: SIR_EBM_exp
{
	int get_num_S
	{
		return first(agent_with_SIR_dynamic).S;
	}

	int get_num_I
	{
		return first(agent_with_SIR_dynamic).I;
	}

	int get_num_R
	{
		return first(agent_with_SIR_dynamic).R;
	}

	action set_num_S_I_R (int numS, int numI, int numR)
	{
		unknown call;
		call <- set_num_S(numS);
		call <- set_num_I(numI);
		call <- set_num_R(numR);
	}

	action set_num_S (int num)
	{
		first(agent_with_SIR_dynamic).S <- float(num);
	}

	action set_num_I (int num)
	{
		first(agent_with_SIR_dynamic).I <- float(num);
	}

	action set_num_R (int num)
	{
		first(agent_with_SIR_dynamic).R <- float(num);
	}

	output
	{
	}

}
```


Code of the model : 

```
model Comodel_SIR_Switch

import "Legacy_models/SIR_EBM_coupling.gaml" as SIR_1
import "Legacy_models/SIR_ABM_coupling.gaml" as SIR_2


global
{
	geometry shape <- envelope(square(100));
	int switch_threshold <- 120; // threshold for switching models
	int threshold_to_IBM <- 220; // threshold under which the model swith to IBM
	int threshold_to_Maths <- 20;
	init
	{
		create SIR_1.SIR_EBM_coupling_exp;
		create SIR_2.SIR_ABM_coupling_exp;
		create Switch;
	}

}

species Switch
{
	int S <- 495;
	int I <- 5;
	int R <- 0;
	reflex request_from_micro_model
	{
		//if the size of S population and I population are bigger than a threshold, use the EBM
		if (S > threshold_to_Maths and I > threshold_to_Maths)
		{
			ask world
			{
				unknown call;
				call <- first(SIR_1.SIR_EBM_coupling_exp).set_num_S_I_R(myself.S, myself.I, myself.R);
				ask first(SIR_1.SIR_EBM_coupling_exp).simulation
				{
					loop times: 5
					{
						do _step_;
					}

				}

				myself.S <- first(SIR_1.SIR_EBM_coupling_exp).get_num_S();
				myself.I <- first(SIR_1.SIR_EBM_coupling_exp).get_num_I();
				myself.R <- first(SIR_1.SIR_EBM_coupling_exp).get_num_R();
			}

		}
		
		//if the size of S population or  I population are smaller  than a threshold, use the ABM
		if (I < threshold_to_IBM or S < threshold_to_IBM)
		{
			ask world
			{
				unknown call;
				call <- first(SIR_2.SIR_ABM_coupling_exp).set_num_S_I_R(myself.S, myself.I, myself.R);
				ask first(SIR_2.SIR_ABM_coupling_exp).simulation
				{
					loop times: 1
					{
						do _step_;
					}

				}

				myself.S <- first(SIR_2.SIR_ABM_coupling_exp).get_num_S();
				myself.I <- first(SIR_2.SIR_ABM_coupling_exp).get_num_I();
				myself.R <- first(SIR_2.SIR_ABM_coupling_exp).get_num_R();
			}

		}

	}

	aspect base
	{
		draw square(100);
	}

}

experiment Simple_exp type: gui
{
	output
	{
		display co_SIR_chart
		{
			chart "SIR_agent" type: series background: # white
			{
				data 'S' value: first(Switch).S color: # green;
				data 'I' value: first(Switch).I color: # red;
				data 'R' value: first(Switch).R color: # yellow;
			}

		}

	}

}
```
