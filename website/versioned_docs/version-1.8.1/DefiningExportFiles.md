---
title:  Defining export files
---

[//]: # (startConcept|export_files)
[//]: # (keyword|concept_file)
[//]: # (keyword|concept_load_file)

## Index

* [The Save Statement](#the-save-statement)
* [Export files in experiment](#export-files-in-experiment)
* [Autosave](#autosave)

## The Save Statement

[//]: # (keyword|statement_save)
Allows to save data in a file. The type of file can be "shp", "text" or "csv". The **`save`** statement can be use in an init block, a reflex, an action or in a user command.

### Facets 

  * **`to`** (string): an expression that evaluates to a string, the path to the file.
  * `data` (any type), (omissible): any expression, that will be saved in the file.
  * `crs` (any type): the name of the projection, e.g. `crs:"EPSG:4326"` or its EPSG id, e.g. `crs:4326`. Here a list of the CRS codes (and EPSG id): [http://spatialreference.org](http://spatialreference.org).
  * `rewrite` (boolean): an expression that evaluates to a boolean, specifying whether the save will erase the file or append data at the end of it.
  * `type` (an identifier): an expression that evaluates to a string, the type of the output file (it can be only "shp", "text" or "csv")

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
save species_of(self) to: "save_shapefile.shp" type: "shp" attributes: [name::"nameAgent", location::"locationAgent"] crs: "EPSG:4326";
```

## Export files in an experiment

[//]: # (keyword|statement_output_file)
When the modeler wants to save data at each simulation step, it is recommended to use the `save` statement either in the model itself or in a `reflex` of the `experiment` (the syntax and the use are similar in all the cases).

The use of `save` in `experiment` is mandatory when we want to save a value related to several simulations running in parallel (e.g. the average of a value over several simulations). It is in particular in [`batch` experiments](BatchExperiments) to save a value at the end of simulations.

## Autosave

[//]: # (keyword|concept_autosave)
Image files can be exported also through the `autosave` facet of the display, as explained in [this previous part](DefiningDisplaysGeneralities#displays-and-layers).

[//]: # (endConcept|export_files)