---
layout: default
title:  Defining export files
wikiPageName: DefiningExportFiles
wikiPagePath: wiki/DefiningExportFiles.md
---

[//]: # (startConcept|export_files)
[//]: # (keyword|concept_file)
[//]: # (keyword|concept_load_file)
# Defining export files

## Index

* [The Save Statement](#the-save-statement)
* [Export files in experiment](#export-files-in-experiment)
* [Autosave](#autosave)

## The Save Statement

[//]: # (keyword|statement_save)
Allows to save data in a file. The type of file can be "shp", "text" or "csv". The **`save`** statement can be use in an init block, a reflex, an action or in a user command. Do not use it in experiments.

### Facets 

  * **`to`** (string): an expression that evaluates to an string, the path to the file
  * `data` (any type), (omissible) : any expression, that will be saved in the file
  * `crs` (any type): the name of the projectsion, e.g. crs:"EPSG:4326" or its EPSG id, e.g. crs:4326. Here a list of the CRS codes (and EPSG id): http://spatialreference.org
  * `rewrite` (boolean): an expression that evaluates to a boolean, specifying whether the save will ecrase the file or append data at the end of it
  * `type` (an identifier): an expression that evaluates to an string, the type of the output file (it can be only "shp", "text" or "csv")
  * `with` (map):  

### Usages

* Its simple syntax is:

```
save data to: output_file type: a_type_file;
```

[//]: # (keyword|concept_text)
* To save data in a text file:

```
save (string(cycle) + "->"  + name + ":" + location) to: "save_data.txt" type: "text";
```

[//]: # (keyword|concept_csv)
* To save the values of some attributes of the current agent in csv file:

```
save [name, location, host] to: "save_data.csv" type: "csv";
```

[//]: # (keyword|concept_shapefile)
* To save the geometries of all the agents of a species into a shapefile (with optional attributes):

```
save species_of(self) to: "save_shapefile.shp" type: "shp" with: [name::"nameAgent", location::"locationAgent"] crs: "EPSG:4326";
```

## Export files in experiment

[//]: # (keyword|statement_output_file)
Displays are not the only output you can manage in GAMA. Saving data to a file during an experiment can also be achieved in several ways, depending on the needs of the modeler. One way is provided by the `save` statement, which can be used everywhere in a model or a species. The other way, described here, is to include an **`output_file`** statement in the output section.

```
output_file name:"file_name" type:file_type data:data_to_write; 
```

with:

`file_type`: text, csv or xml
`file_name`: string
`data_to_write`: string

### Example:

```
file name: "results" type: text data: time + "; " + nb_preys + ";" + nb_predators refresh:every(2);  
```

Each time step (or according to the frequency defined in the `refresh` facet of the file output), a new line will be added at the end of the file. If `rewrite: false` is defined in its facets, a new file will be created for each simulation (identified by a timestamp in its name).

Optionally, a `footer` and a `header` can also be described with the corresponding facets (of type string).

## Autosave

[//]: # (keyword|concept_autosave)
Image files can be exported also through the `autosave` facet of the display, as explained in [this previous part](DefiningDisplaysGeneralities#displays-and-layers).
[//]: # (endConcept|export_files)
