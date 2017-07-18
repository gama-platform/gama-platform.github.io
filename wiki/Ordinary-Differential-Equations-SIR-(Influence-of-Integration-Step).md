---
layout: default
title: SIR (Influence of Integration Step).gaml
wikiPageName: Ordinary-Differential-Equations-SIR-(Influence-of-Integration-Step)
wikiPagePath: wiki/Ordinary-Differential-Equations-SIR-(Influence-of-Integration-Step).md
---
[//]: # (keyword|operator_diff)
[//]: # (keyword|statement_equation)
[//]: # (keyword|statement_\=)
[//]: # (keyword|statement_solve)
[//]: # (keyword|constant_#sec)
[//]: # (keyword|concept_equation)
[//]: # (keyword|concept_math)
# SIR (Influence of Integration Step).gaml


_Author : hqnghi_

A SIR model to illustrate the impact of the change of the integration parameters.


<p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Ordinary Differential Equations/Ordinary Differential Equations SIR (Influence of Integration Step)/SIR_1-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p><p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Ordinary Differential Equations/Ordinary Differential Equations SIR (Influence of Integration Step)/SIR_10-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p><p><img src="gm_wiki/resources/images/modelLibraryScreenshots/Additionnal Plugins/Ordinary Differential Equations/Ordinary Differential Equations SIR (Influence of Integration Step)/SIR_100-10.png" alt="Eclipse folder." title class="img-responsive"> == $0</p>Code of the model : 

```

model SIR_influence_of_integration_step

global { 
	float step<-1#s;
	float beta <- 0.8 ; 	
	float delta <- 0.01 ; 
	
	float s1 <- 1#s;
	float s2 <- 1.5#s;
	float s3 <- 2#s;
	
	init {
		create SIR_agt with: [h::1,myUnit::s1];
		create SIR_agt with: [h::0.1,myUnit::s2];
		create SIR_agt with: [h::0.01,myUnit::s3];	
  	}  
}



species SIR_agt {
	int N <- 500;
    float t;    

	float I <- 1.0; 
	float S <- N - I; 
	float R <- 0.0; 
		
   	float h;   		
	float myUnit<-1#s;
	equation SIR{ 
		diff(S,t) =myUnit* (- beta  * S * I / N);
		diff(I,t) =myUnit* (beta * S * I / N) - (delta * I);
		diff(R,t) =myUnit* (delta * I);
	} 

	reflex solving {
		solve SIR method: "rk4" step: h;// cycle_length:mycycle ;
//		S<-S*myUnit;
//		I<-I*myUnit;
//		R<-R*myUnit;
	}      
}


experiment mysimulation1 type: gui { 
 	output { 
		display SIR_1  {
			chart "SI - h=1" type: series background: #white {
				data 'S' value: first(SIR_agt where (each.myUnit = s1)).S color: #green;				
				data 'I' value: first(SIR_agt where (each.myUnit = s1)).I color: #red ;
				data 'R' value: first(SIR_agt where (each.myUnit = s1)).R color: #blue ;				
			}
		}
		
		display SIR_10 {
			chart "SI - h=0.1" type: series background: #white{
				data 'S' value: first(SIR_agt where (each.myUnit = s2)).S color: #green;				
				data 'I' value: first(SIR_agt where (each.myUnit = s2)).I color: #red ;
				data 'R' value: first(SIR_agt where (each.myUnit = s2)).R color: #blue ;				
			}
		}
		
		display SIR_100  {
			chart "SI - h=0.01" type: series background: #white {
				data 'S' value: first(SIR_agt where (each.myUnit = s3)).S color: #green;				
				data 'I' value: first(SIR_agt where (each.myUnit = s3)).I color: #red ;
				data 'R' value: first(SIR_agt where (each.myUnit = s3)).R color: #blue ;				
			}
		}	
	}
}
```
