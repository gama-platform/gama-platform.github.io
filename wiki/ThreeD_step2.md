---
layout: default
title: 2. Moving Cells
wikiPageName: ThreeD_step2
wikiPagePath: wiki/ThreeD_step2.md
---
# 2. Moving Cells


This second step model adds the **moving3D** skills to the **cell** agents and simply makes move the **cells** agent by defining a reflex that will call the action **move**. We will also add additional visual information to the display.





## Formulation
  * Redefining the shape of the world with a 3D Shape.
  * Attaching new skills (**moving3D**) to **cells** agent.
  * Modify **cells** aspect
  * Add a graphics layer

<a href='http://www.youtube.com/watch?feature=player_embedded&v=_QqUbC0MWRU' target='_blank'><img src='http://img.youtube.com/vi/_QqUbC0MWRU/0.jpg' width='425' height=344 /></a>





## Model Definition



### Global Section


#### Global variable
We use a new global variable called _environmentSize\_that to define the size of our 3D environment.
In the global section we define the new variable
```
int environmentSize <-100;
```

Then we redefine the shape of the world (by default the shape of the world is a 100x100 square) as cube that will have the size defined by the _environment\_size_ variable. To do so we change the shape of the world in the **global** section:

```
geometry shape <- cube(environmentSize);	
```

#### Model initialization


When we create the **cells** agent we want to place them randomly in the 3D environement. To do so we set the location with a random value for _x_, _y_ and _z_ between 0 and _environmentSize_.

```
create cells number: nb_cells { 
  location <- {rnd(environmentSize), rnd(environmentSize), rnd(environmentSize)};       
}
```

### Moving3D skills
In the previous example, we only created **cells** agent that did not have any behavior. In this step we want to make move the **cells** agent. To do so we add a **moving3D** skills to the cells.

More information on built-in skills proposed by Gama can be found [here](BuiltInSkills)

```
species cells skills:[moving3D]{
...  	
}
```

Then we define a new reflex for the species **cells** that consists in calling the action _move_ bundled in **moving3D** skills.
```
reflex move{
  do move;
}	                    
```

Finally we modify a bit the aspect of the sphere to set its size according to the _environmentSize_ global variable previously defined.
```
aspect default {
  draw sphere(environmentSize*0.01) color:#blue;   
}
```




### Experiment
The experiment is the same as the previous one except that we will display the bounds of the environment by using the **graphics** layer.


```
graphics "env"{
  draw cube(environmentSize) color: #black empty:true;	
}
```

#### Output
```
output {
  display View1 type:opengl{
    graphics "env"{
      draw cube(environmentSize) color: #black empty:true;	
    }
    species cells;  
  }
}
```





## Complete Model

The GIT version of the model can be found here [Model 02.gaml](https://github.com/gama-platform/gama/tree/master/msi.gama.models/models/Tutorials/3D/models/Model 02.gaml)

```
model Tuto3D   

global {
  int nb_cells <-100;
  int environmentSize <-100;
  geometry shape <- cube(environmentSize);	
  init { 
    create cells number: nb_cells { 
      location <- {rnd(environmentSize), rnd(environmentSize), rnd(environmentSize)};       
    } 
  }  
} 
  
species cells skills:[moving3D]{  
	
  reflex move{
  	do move;
  }	                    
  aspect default {
    draw sphere(environmentSize*0.01) color:#blue;   
  }
}

experiment Tuto3D  type: gui {
  parameter "Initial number of cells: " var: nb_cells min: 1 max: 1000 category: "Cells" ;
  output {
    display View1 type:opengl{
      graphics "env"{
      	draw cube(environmentSize) color: #black empty:true;	
      }
      species cells;
    }
  }
}
```

> 
