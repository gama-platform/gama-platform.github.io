---
layout: default
title: Defining Charts
wikiPageName: DefiningCharts
wikiPagePath: wiki/DefiningCharts.md
---
[//]: # (startConcept|defining_charts)
# Defining Charts

To visualize result and make analysis about you model, you will certainly have to use charts. You can define 3 types of charts in GAML: histograms, pie, and series. For each type, you will have to determine the data you want to highlight.

## Index

* [Define a chart](#define-a-chart)
* [Data definition](#data-definition)
* [Different types of charts](#different-type-of-charts)

## Define a chart

To define a chart, we have to use the `chart` statement. A chart has to be named (with the `name` facet), and the type has to be specified (with the `type` facet). The value of the `type` facet can be `histogram`, `pie`, `series`, `scatter`, `xy`. A chart has to be defined inside a display.

```
experiment my_experiment type: gui {
	output {
		display "my_display" {
			chart "my_chart" type:pie {
			}
		}
	}
}
```

After declaring your chart, you have to define the data you want to display in your chart.

## Data definition

Data can be specified with:
* several data statements to specify each series
* one datalist statement to give a list of series. It can be useful if the number of series is unknown, variable or too high.
 
The `data` statement is used to specify which variable will be displayed. You have to give your data a name (that will be displayed in your chart), the value of the variable you want to follow (using the `value` facet). You can add come optional facets such as `color` to specify the color of your data.

``` 
global
{
	int numberA <- 2 update:numberA*2;
	int numberB <- 10000 update:numberB-1000;
}

experiment my_experiment type: gui {
	output {
		display "my_display" {
			chart "my_chart" type:pie {
				data "numberA" value:numberA color:#red;
				data "numberB" value:numberB color:#blue;
			}
		}
	}
}
```

(TODO_IMAGE)

The `datalist` statement is used several variables in one statement.  Instead of giving simple values, datalist is used with lists. 

```
datalist ["numberA","numberB"] value:[numberA,numberB] color:[#red,#blue];
```
[TODO]
Datalist provides you some additional facets you can use. If you want to learn more about them, please read the documentation [URL]

## Different types of chart

As we already said, you can display 3 types of graphs: the histograms, the pies and the series.

The histograms:


[TODO]

[//]: # (endConcept|defining_charts)
