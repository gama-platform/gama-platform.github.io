---
layout: default
title: Overlay
wikiPageName: Overlay-Overlay
wikiPagePath: wiki/Overlay-Overlay.md
---

[//]: # (keyword|operator_font)
[//]: # (keyword|statement_overlay)
[//]: # (keyword|constant_#pixels)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|concept_overlay)
[//]: # (keyword|concept_display)
[//]: # (keyword|concept_graphic)
# Overlay


_Author : Alexis Drogoul and Patrick Taillandier_

Model to show how to use overlay layers in a display


Code of the model : 

```

model Overlay

global
{
	//define the color for each possible type (among "water", "vegetation" and "building")
	map<string,rgb> color_per_type <- ["water"::#blue, "vegetation":: #green, "building":: #pink];
}

//define a simple grid with 10 rows and 10 columns
grid cell width: 10 height: 10 {
	//each cell has a random type
	string type <- one_of(color_per_type.keys);
	rgb color <- color_per_type[type];
}
experiment overlay type: gui
{
    output 
    {
        display map 
        {
        	//define a new overlay layer positioned at the coordinate 5,5, with a constant size of 180 pixels per 100 pixels.
            overlay "Overlay" position: { 5, 5 } size: { 180 #px, 100 #px } background: # black transparency: 0.5 border: #black rounded: true
            {
            	//for each possible type, we draw a square with the corresponding color and we write the name of the type
                float y <- 30#px;
                loop type over: color_per_type.keys
                {
                    draw square(10#px) at: { 20#px, y } color: color_per_type[type] border: #white;
                    draw type at: { 40#px, y + 4#px } color: # white font: font("SansSerif", 18, #bold);
                    y <- y + 25#px;
                }

            }
            //then we display the grid
			grid cell lines: #black;
        }

    }
}
```
