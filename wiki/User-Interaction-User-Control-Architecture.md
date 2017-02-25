---
layout: default
title: User Command
wikiPageName: User-Interaction-User-Control-Architecture
wikiPagePath: wiki/User-Interaction-User-Control-Architecture.md
---

[//]: # (keyword|architecture_user_only)
[//]: # (keyword|operator_among)
[//]: # (keyword|statement_user_panel)
[//]: # (keyword|statement_transition)
[//]: # (keyword|statement_user_command)
[//]: # (keyword|statement_user_input)
[//]: # (keyword|skill_user_only)
[//]: # (keyword|concept_gui)
[//]: # (keyword|concept_architecture)
# User Command


_Author : Patrick Taillandier_

Model which shows how to use the advanced user control, to create and kill agents. 


Code of the model : 

```


model user_control

global {

	int nbAgent <- 10;
	bool advanced_user_control <- false;
	init {
		create cell number: nbAgent {
			color <-°green;
		}
		create user;
	}
}

species cell {
	rgb color;	
	aspect default {
		draw circle(1) color: color;
	}
}

species user control:user_only {
   user_panel "Default" initial: true {
      transition to: "Basic Control" when: every (10) and !advanced_user_control;
      transition to: "Advanced Control" when: every(10) and advanced_user_control;
   }
   
   user_panel "Basic Control" {
      user_command "Kill one cell" {
         ask (one_of(cell)){
            do die;
         }
      }
      user_command "Create one cell" {
        create cell { 
			color <-°green; 
		}
      } 
      transition to: "Default" when: true;                    
   }
   user_panel "Advanced Control" {
      user_command "Kill cells" color: #red continue: true{
        user_input "Number" returns: number type: int <- 10;
        ask (number among list(cell)){
           do die;
        }
      }
      user_command "Create cells" color: #green {
        user_input "Number" returns: number type: int <- 10;
        create cell number: number ;
      } 
      transition to: "Default" when: true;        
   }
}


experiment Displays type: gui {
	parameter "advanced user control" var: advanced_user_control <- false;
	output { 
		display map { 
			species cell;
		}
	}
}
```
