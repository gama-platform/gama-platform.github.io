---
layout: default
title:  Convertion of CSV data to Matrix
wikiPageName: Data-Importation-CSV-File-Loading
wikiPagePath: wiki/Data-Importation-CSV-File-Loading.md
---

[//]: # (keyword|operator_csv_file)
[//]: # (keyword|type_matrix)
[//]: # (keyword|concept_csv)
[//]: # (keyword|concept_load_file)
# Convertion of CSV data to Matrix


_Author :  Patrick Taillandier_

Model which shows how to initialize a matrix by using the content of a CSV File. The model load a CSV File, and write its content in the console. 


Code of the model : 

```


model CSVfileloading

global {
	file my_csv_file <- csv_file("../includes/iris.csv",",");
	
	init {
		//convert the file into a matrix
		matrix data <- matrix(my_csv_file);
		//loop on the matrix rows (skip the first header line)
		loop i from: 1 to: data.rows -1{
			//loop on the matrix columns
			loop j from: 0 to: data.columns -1{
				write "data rows:"+ i +" colums:" + j + " = " + data[j,i];
			}	
		}		
	}
}

experiment main type: gui;
```
