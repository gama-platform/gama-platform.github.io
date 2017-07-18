---
layout: default
title: Color defined by choosing a Color Brewer
wikiPageName: Color-Color-Brewer
wikiPagePath: wiki/Color-Color-Brewer.md
---
[//]: # (keyword|operator_brewer_palettes)
[//]: # (keyword|operator_brewer_colors)
[//]: # (keyword|concept_color)
# Color defined by choosing a Color Brewer


_Author :  Arnaud Grignard & Patrick Taillandier_

A model to show how to use color brewer. In this model, two experiments are presents : one just to show the different colors present in some selected brewer, and a second one to show in a grid the different colors of brewler having at least a minimal number of colors passed in parameter.


Code of the model : 

```


model ColorBrewer


global {

//number of colors
int nb_classes<-14 min:5 max: 15;

int square_size <- 10;

//list of palettes that have at least nb_classes
list<string> palettes <- brewer_palettes(nb_classes);

//the current sequential palette from the list of all available sequential Palettes
string sequentialPalette <- "YlOrRd" among:["YlOrRd","Grays","PuBu","BuPu","YlOrBr","Greens","BuGn","GnBu","PuRd","Purples","Blues","Oranges","OrRd","Reds","YlGn","YlGnBu"];

//the current diverging palette from the list of all available diverging Palettes
string divergingPalette <- "BrBG" among:["PRGn","PuOr","RdGy","Spectral","RdYlGn","RdBu","RdYlBu","PiYG","BrBG"];

//the current qualitative palette from the list of all available qualitative Palettes
string qualitativePalette <- "Pastel1" among:["Accents","Paired","Set3","Set2","Set1","Dark2","Pastel2","Pastel1"];

//build the lists of colors from the palettes
list<rgb> SequentialColors<-list<rgb>(brewer_colors(sequentialPalette));
list<rgb> DivergingColors<-list<rgb>(brewer_colors(divergingPalette));
list<rgb> QualitativeColors<-list<rgb>(brewer_colors(qualitativePalette));


	init {
		//if the palettes is not empty
		if (not empty(palettes)) {
			//for each palette
			loop i from: 0 to: length(palettes) - 1 {
				//define a  list of nb_classes colors from the current palette
				list<rgb> colors<-list<rgb>(brewer_colors(palettes[i],nb_classes));
				
				//define the colors of the corresponding cells
				ask cell where (each.grid_y = i){
					color <- colors[grid_x,i];	
				}
			}
		}
	}
}

grid cell width:nb_classes height: max([1,length(palettes)]) ;


//in this experiment, we do not use the cell agents, but we directlty draw the different palettes of colors
experiment BrewerPalette type: gui {
	parameter "Sequential Palettes" var:sequentialPalette category:"Brewer";
	parameter "Diverging Palettes" var:divergingPalette category:"Brewer";
	parameter "Qualitatives Palettes" var:qualitativePalette category:"Brewer";
	output {
		display View1 type:opengl draw_env:false{
			graphics "brewer"{
				//Sequential
				draw "Sequential" at:{-world.shape.width*0.2,0} color:°black perspective:true;
				loop i from:0 to:length(SequentialColors)-1{
					draw square(square_size) color:SequentialColors[i] at: {square_size*(0.5 + i), 0, 0};
				}
				//Diverging
				loop i from:0 to:length(DivergingColors)-1{
					draw "Diverging" at:{-world.shape.width*0.2,1*square_size} color:°black perspective:false;
					draw square(square_size) color:DivergingColors[i] at: {square_size*(0.5 + i), 1*square_size, 0};
				}
				//Qualitative		
				loop i from:0 to:length(QualitativeColors)-1{
					draw "Qualitative" at:{-world.shape.width*0.2,2*square_size} color:°black perspective:false;
					draw square(square_size) color:QualitativeColors[i] at: {square_size*(0.5 + i), 2*square_size, 0};
				}
		    }
		}	
	}
}

//in this experiment, we display the cell agents with the  different aspects
experiment BrewerColoredAgent type: gui {
	parameter "Number of data classes" var:nb_classes category:"Brewer";
	output {
		display View1 {
			grid cell lines: #black ;
		}	
	}
}
```
