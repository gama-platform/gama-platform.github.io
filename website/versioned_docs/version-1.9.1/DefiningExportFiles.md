---
title:  Defining export files
---

[//]: # (startConcept|export_files)
[//]: # (keyword|concept_file)
[//]: # (keyword|concept_load_file)


## The Save Statement

[//]: # (keyword|statement_save)
Allows to save data in a file. The type of file can be "shp", "json" and "kml" for vector spatial data (agents and geometries), "asc" and "geotiff" for raster spatial data (grid), "image" for image, "dimacs", "dot", "gexf", "graphml", "gml" and "graph6" for graphs, "text" and "csv". The **`save`** statement can be use in an init block, a reflex, an action or in a user command.

### Facets 
  * `attributes`, optional, expects any type in [map, list] - Allows to specify the attributes of a shape file or GeoJson file where agents are saved. Can be expressed as a list of string or as a literal map. When expressed as a list, each value should represent the name of an attribute of the shape or agent. The keys of the map are the names of the attributes that will be present in the file, the values are whatever expressions needed to define their value. 
  * `crs`, optional, expects any type - the name of the projection, e.g. crs:"EPSG:4326" or its EPSG id, e.g. crs:4326. [Here](http://spatialreference.org) a list of the CRS codes (and EPSG id)
  * `data`, optional, expects any type - the data that will be saved to the file
  * `header`, optional, expects bool - an expression that evaluates to a boolean, specifying whether the save will write a header if the file does not exist
  * `rewrite`, optional, expects bool - a boolean expression specifying whether to erase the file if it exists or append data at the end of it. Only applicable to "text" or "csv" files. Default is true
  * `to`, optional, expects string - an expression that evaluates to an string, the path to the file, or directly to a file
  * `format`, optional, a string representing the format of the output file (e.g. `shp`, `asc`, `geotiff`, `png`, `text`, `csv`). If the file extension is non ambiguous in facet 'to:', this format does not need to be specified. However, in many cases, it can be useful to do it (for instance, when saving a string to a .pgw file, it is always better to clearly indicate that the expected format is 'text'). 
  * `type`, optional, deprecated, use `format` instead. 

### Usages

* Its simple syntax is:

```
save data to: output_file format: a_type_file;
```

[//]: # (keyword|concept_text)
* To save data in a text file:

```
save (string(cycle) + "->"  + name + ":" + location) to: "save_data.txt" format: text;
```

[//]: # (keyword|concept_csv)
* To save the values of some attributes of the current agent in csv file:

```
save [name, location, host] to: "save_data.csv" format: csv;
```

[//]: # (keyword|concept_shapefile)
* To save the geometries of all the agents of a species into a shapefile or a geojson (with optional attributes):

```
save species_of(self) to: "save_shapefile.shp" format: shp attributes: [name::"nameAgent", location::"locationAgent"] crs: "EPSG:4326";
save species_of(self) to: "save_shapefile.geojson" format: json attributes: [name::"nameAgent", location::"locationAgent"] ;
```
[//]: # (keyword|concept_grid)
* To save a grid into a geotiff or a asc file (the value considered will be the "grid_value" attribute of the cell):

```
save cell to:"../results/grid.tif" format:geotiff;
save cell to:"../results/grid.asc" format:asc;

```
[//]: # (keyword|concept_image)
* To save a grid into an image file:

```
save cell to:"../results/grid.png" format:image;

```
## Export files in an experiment

[//]: # (keyword|statement_output_file)
When the modeler wants to save data at each simulation step, it is recommended to use the `save` statement either in the model itself or in a `reflex` of the `experiment` (the syntax and the use are similar in all the cases).

The use of `save` in `experiment` is mandatory when we want to save a value related to several simulations running in parallel (e.g. the average of a value over several simulations). It is in particular in [`batch` experiments](BatchExperiments) to save a value at the end of simulations.

## Autosave

[//]: # (keyword|concept_autosave)
Image files can be exported also through the `autosave` facet of the display, as explained in [this previous part](DefiningDisplaysGeneralities#displays-and-layers).

[//]: # (endConcept|export_files)