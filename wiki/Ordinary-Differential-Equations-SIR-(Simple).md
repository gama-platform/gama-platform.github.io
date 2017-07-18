---
layout: default
title: SIR (Simple)
wikiPageName: Ordinary-Differential-Equations-SIR-(Simple)
wikiPagePath: wiki/Ordinary-Differential-Equations-SIR-(Simple).md
---
[//]: # (keyword|operator_diff)
[//]: # (keyword|statement_equation)
[//]: # (keyword|statement_\=)
[//]: # (keyword|statement_solve)
[//]: # (keyword|concept_equation)
[//]: # (keyword|concept_math)
# SIR (Simple)


_Author : hqnghi_

A simple example of ODE use into agents with the example of the SIR equation system.


<p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Ordinary Differential Equations/Ordinary Differential Equations SIR (Simple)/display_charts-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p>Code of the model : 

```

model simple_ODE_SIR

global {
	init{
		create agent_with_SIR_dynamic number:1;
	}
}


species agent_with_SIR_dynamic {
	int N <- 1500 ;
	int iInit <- 1;		

    float t;  
	float S <- N - float(iInit); 	      
	float I <- float(iInit); 
	float R <- 0.0; 
	
	float alpha <- 0.2 min: 0.0 max: 1.0;
	float beta <- 0.8 min: 0.0 max: 1.0;

	float h <- 0.01;
   
	equation SIR{ 
		diff(S,t) = (- beta * S * I / N);
		diff(I,t) = (beta * S * I / N) - (alpha * I);
		diff(R,t) = (alpha * I);
	}
                
    reflex solving {
    	solve SIR method: "rk4" step: h ;//cycle_length: 1/h ;
    }    
}


experiment maths type: gui {
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
