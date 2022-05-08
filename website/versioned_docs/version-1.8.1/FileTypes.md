---
title:  File Types
---

[//]: # (startConcept|load_complex_datas)


GAMA provides modelers with a generic type for files called **file**. It is possible to load a file using the _file_ operator:

```
file my_file <- file("../includes/data.csv");
```

However, internally, GAMA makes the difference between the different types of files.
Indeed, for instance:
```
global {
	init {
		file my_file <- file("../includes/data.csv");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
sepallength
sepalwidth
petallength
petalwidth
type
5.1
3.5
1.4
0.2
Iris-setosa
4.9
3.0
1.4
0.2
Iris-setosa
...
```
Indeed, the content of CSV file is a matrix: each row of the matrix is a line of the file; each column of the matrix is value delimited by the separator (by default ",").

In contrary:
```
global {
	init {
		file my_file <- file("../includes/data.shp");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
```
The content of a shapefile is a list of geometries corresponding to the objects of the shapefile.

In order to know how to load a file, GAMA analyzes its extension. For instance for a file with a ".csv" extension, GAMA knows that the file is a **csv** one and will try to split each line with the _,_ separator. However, if the modeler wants to split each line with a different separator (for instance **;**) or load it as a text file, he/she will have to use a specific file operator.

Indeed, GAMA integrates specific operators corresponding to different types of files.



## Table of contents 

* [File Types](#file-types)
	* [Text File](#text-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [CSV File](#csv-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [Shapefile](#shapefile)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [OSM File](#osm-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [Grid File](#grid-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [Image File](#image-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [SVG File](#svg-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [Property File](#property-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [R File](#r-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [3DS File](#3ds-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)
	* [OBJ File](#obj-file)
		* [Extensions](#extensions)
		* [Content](#content)
		* [Operators](#operators)




## Text File
### Extensions
Here the list of possible extensions for text file:
  * "txt"
  * "data"
  * "csv"
  * "text"
  * "tsv"
  * "xml"

Note that when trying to define the type of a file with the default file loading operator (**file**), GAMA will first try to test the other type of file. For example, for files with ".csv" extension, GAMA will cast them as csv file and not as text file.

### Content
The content of a text file is a list of string corresponding to each line of the text file.
For example:
```
global {
	init {
		file my_file <- text_file("../includes/data.txt");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
sepallength,sepalwidth,petallength,petalwidth,type
5.1,3.5,1.4,0.2,Iris-setosa
4.9,3.0,1.4,0.2,Iris-setosa
4.7,3.2,1.3,0.2,Iris-setosa
```

### Operators
List of operators related to text files:
  * **text\_file(string path)**: load a file (with an authorized extension) as a text file.
  * **text\_file(string path, list content)**: load a file (with an authorized extension) as a text file and fill it with the given content.
  * **is\_text(op)**: tests whether the operand is a text file




## CSV File
### Extensions
Here the list of possible extensions for csv file:
    * "csv"
    * "tsv"

### Content
The content of a csv file is a matrix of string: each row of the matrix is a line of the file; each column of the matrix is value delimited by the separator (by default ",").
For example:
```
global {
	init {
		file my_file <- csv_file("../includes/data.csv");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
sepallength
sepalwidth
petallength
petalwidth
type
5.1
3.5
1.4
0.2
Iris-setosa
4.9
3.0
1.4
0.2
Iris-setosa
...
```

### Operators
List of operators related to csv files:
  * **csv\_file(string path)**: load a file (with an authorized extension) as a csv file with default separator (",").
  * **csv\_file(string path, string separator)**: load a file (with an authorized extension) as a csv file with the given separator.
```
file my_file <- csv_file("../includes/data.csv", ";");
```

  * **csv\_file(string path, matrix content)**: load a file (with an authorized extension) as a csv file and fill it with the given content.
  * **is\_csv(op)**: tests whether the operand is a csv file






## Shapefile
Shapefiles are classical GIS data files. A shapefile is not simple file, but a set of several files (source: wikipedia):
  * Mandatory files :
    * .shp — shape format; the feature geometry itself
    * .shx — shape index format; a positional index of the feature geometry to allow seeking forwards and backwards quickly
    * .dbf — attribute format; columnar attributes for each shape, in dBase IV format

  * Optional files :
    * .prj — projection format; the coordinate system and projection information, a plain text file describing the projection using well-known text format
    * .sbn and .sbx — a spatial index of the features
    * .fbn and .fbx — a spatial index of the features for shapefiles that are read-only
    * .ain and .aih — an attribute index of the active fields in a table
    * .ixs — a geocoding index for read-write shapefiles
    * .mxs — a geocoding index for read-write shapefiles (ODB format)
    * .atx — an attribute index for the .dbf file in the form of shapefile.columnname.atx (ArcGIS 8 and later)
    * .shp.xml — geospatial metadata in XML format, such as ISO 19115 or other XML schema
    * .cpg — used to specify the code page (only for .dbf) for identifying the character encoding to be used

More details about shapefiles can be found [here](http://en.wikipedia.org/wiki/Shapefile).

### Extensions
Here the list of possible extension for shapefile:
  * "shp"

### Content
The content of a shapefile is a list of geometries corresponding to the objects of the shapefile.
For example:
```
global {
	init {
		file my_file <- shape_file("../includes/data.shp");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
...
```

Note that the attributes of each object of the shapefile is stored in their corresponding GAMA geometry. The operator "get" (or "read") allows to get the value of a corresponding attributes.

For example:
```
file my_file <- shape_file("../includes/data.shp");
write "my_file: " + my_file.contents;
loop el over: my_file {
	write (el get "TYPE");
}
```


### Operators
List of operators related to shapefiles:
  * **shape\_file(string path)**: load a file (with an authorized extension) as a shapefile with default projection (if a prj file is defined, use it, otherwise use the default projection defined in the preference).
  * **shape\_file(string path, string code)**: load a file (with an authorized extension) as a shapefile with the given projection (GAMA will automatically decode the code. For a list of the possible projections see: http://spatialreference.org/ref/)
  * **shape\_file(string path, int EPSG\_ID)**: load a file (with an authorized extension) as a shapefile with the given projection (GAMA will automatically decode the epsg code. For a list of the possible projections see: http://spatialreference.org/ref/)
```
file my_file <- shape_file("../includes/data.shp", "EPSG:32601");
```

  * **shape\_file(string path, list content)**: load a file (with an authorized extension) as a shapefile and fill it with the given content.
  * **is\_shape(op)**: tests whether the operand is a shapefile





## OSM File
OSM (Open Street Map) is a collaborative project to create a free editable map of the world. The data produced in this project (OSM File)  represent physical features on the ground (e.g., roads or buildings) using tags attached to its basic data structures (its nodes, ways, and relations). Each tag describes a geographic attribute of the feature being shown by that specific node, way or relation (source: openstreetmap.org).

More details about OSM data can be found [here](http://wiki.openstreetmap.org/wiki/Map_Features).

### Extensions
Here the list of possible extension for shapefile:
  * "osm"
  * "pbf"
  * "bz2"
  * "gz"

### Content
The content of a OSM data is a list of geometries corresponding to the objects of the OSM file.
For example:
```
global {
	init {
		file my_file <- osm_file("../includes/data.gz");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Point
Point
Point
Point
Point
LineString
LineString
Polygon
Polygon
Polygon
...
```

Note that like for shapefiles, the attributes of each object of the osm file is stored in their corresponding GAMA geometry. The operator "get" (or "read") allows to get the value of a corresponding attributes.


### Operators
List of operators related to osm file:
  * **osm\_file(string path)**: load a file (with an authorized extension) as a osm file with default projection (if a prj file is defined, use it, otherwise use the default projection defined in the preference). In this case, all the nodes and ways of the OSM file will becomes a geometry.
  * **osm\_file(string path, string code)**: load a file (with an authorized extension) as a osm file with the given projection (GAMA will automatically decode the code. For a list of the possible projections see: http://spatialreference.org/ref/). In this case, all the nodes and ways of the OSM file will becomes a geometry.
  * **osm\_file(string path, int EPSG\_ID)**: load a file (with an authorized extension) as a osm file with the given projection (GAMA will automatically decode the epsg code. For a list of the possible projections see: http://spatialreference.org/ref/). In this case, all the nodes and ways of the OSM file will becomes a geometry.
```
file my_file <- osm_file("../includes/data.gz", "EPSG:32601");
```
  * **osm\_file(string path, map filter)**: load a file (with an authorized extension) as a osm file with default projection (if a prj file is defined, use it, otherwise use the default projection defined in the preference). In this case, only the elements with the defined values are loaded from the file.
```
//map used to filter the object to build from the OSM file according to attributes. 
map filtering <- map(["highway"::["primary", "secondary", "tertiary", "motorway", "living_street","residential", "unclassified"], "building"::["yes"]]);

//OSM file to load
file&lt;geometry> osmfile <-  file&lt;geometry (osm_file("../includes/rouen.gz", filtering))  ;
```
  * **osm\_file(string path, map filter, string code)**: load a file (with an authorized extension) as a osm file with the given projection (GAMA will automatically decode the code. For a list of the possible projections see: http://spatialreference.org/ref/). In this case, only the elements with the defined values are loaded from the file.
  * **osm\_file(string path, map filter, int EPSG\_ID)**: load a file (with an authorized extension) as a osm file with the given projection (GAMA will automatically decode the epsg code. For a list of the possible projections see: http://spatialreference.org/ref/). In this case, only the elements with the defined values are loaded from the file.
  * **is\_osm(op)**: tests whether the operand is a osm file





## Grid File
Esri ASCII Grid files are classic text raster GIS data.

More details about Esri ASCII grid file can be found [here](http://en.wikipedia.org/wiki/Esri_grid).

Note that grid files can be used to initialize a grid species. The number of rows and columns will be read from the file. Similarly, the values of each cell contained in the grid file will be accessible through the **grid\_value** attribute.

```
grid cell file: grid_file {
}
```

### Extensions
Here the list of possible extension for grid file:
  * "asc"

### Content
The content of a grid file is a list of geometries corresponding to the cells of the grid.
For example:
```
global {
	init {
		file my_file <- grid_file("../includes/data.asc");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
Polygon
...
```

Note that the values of each cell of the grid file is stored in their corresponding GAMA geometry (**grid\_value** attribute). The operator "get" (or "read") allows to get the value of this attribute.

For example:
```
file my_file <- grid_file("../includes/data.asc");
write "my_file: " + my_file.contents;
loop el over: my_file {
	write el get "grid_value";
}
```


### Operators
List of operators related to shapefiles:
  * **grid\_file(string path)**: load a file (with an authorized extension) as a grid file with default projection (if a prj file is defined, use it, otherwise use the default projection defined in the preference).
  * **grid\_file(string path, string code)**: load a file (with an authorized extension) as a grid file with the given projection (GAMA will automatically decode the code. For a list of the possible projections see: http://spatialreference.org/ref/)
  * **grid\_file(string path, int EPSG\_ID)**: load a file (with an authorized extension) as a grid file with the given projection (GAMA will automatically decode the epsg code. For a list of the possible projections see: http://spatialreference.org/ref/)
```
file my_file <- grid_file("../includes/data.shp", "EPSG:32601");
```

  * **is\_grid(op)**: tests whether the operand is a grid file.






## Image File
### Extensions
Here the list of possible extensions for image file:
  * "tif"
  * "tiff"
  * "jpg"
  * "jpeg"
  * "png"
  * "gif"
  * "pict"
  * "bmp"

### Content
The content of an image file is a matrix of int: each pixel is a value in the matrix.

For example:
```
global {
	init {
		file my_file <- image_file("../includes/DEM.png");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
-9671572
-9671572
-9671572
-9671572
-9934744
-9934744
-9868951
-9868951
-10000537
-10000537
...
```

### Operators
List of operators related to csv files:
  * **image\_file(string path)**: load a file (with an authorized extension) as an image file.
  * **image\_file(string path, matrix content)**: load a file (with an authorized extension) as an image file and fill it with the given content.
  * **is\_image(op)**: tests whether the operand is an image file





## SVG File

Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. Note that interactivity and animation features are not supported in GAMA.

More details about SVG file can be found [here](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

### Extensions
Here the list of possible extension for SVG file:
  * "svg"

### Content
The content of a SVG file is a list of geometries.
For example:
```
global {
	init {
		file my_file <- svg_file("../includes/data.svg");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
```

### Operators
List of operators related to svg files:
  * **shape\_file(string path)**: load a file (with an authorized extension) as a SVG file.
  * **shape\_file(string path, point size)**: load a file (with an authorized extension) as a SVG file with the given size:

```
file my_file <- svg_file("../includes/data.svg", {5.0,5.0});
```

  * **is\_svg(op)**: tests whether the operand is a SVG file





## Property File
### Extensions
Here the list of possible extensions for property file:
  * "properties"

### Content
The content of a property file is a map of string corresponding to the content of the file.
For example:
```
global {
	init {
		file my_file <- property_file("../includes/data.properties");
		loop el over: my_file {
			write el;
		}
	}
}
```
with the given property file:
```
sepallength = 5.0
sepalwidth = 3.0
petallength = 4.0
petalwidth = 2.5
type = Iris-setosa
```

will give:
```
3.0
4.0
5.0
Iris-setosa
2.5
```

### Operators
List of operators related to text files:
  * **property\_file(string path)**: load a file (with an authorized extension) as a property file.
  * **is\_property(op)**: tests whether the operand is a property file





## R File
R is a free software environment for statistical computing and graphics. GAMA allows to execute R script (if R is installed on the computer).

More details about R can be found [here](http://www.r-project.org/).

Note that GAMA also integrates some operators to manage R scripts:
  * [R\_compute](Operators#R_compute)
  * [R\_compute\_param](Operators#R_compute_param)

### Extensions
Here the list of possible extensions for R file:
  * "r"

### Content
The content of a R file corresponds to the results of the application of the script contained in the file.

For example:
```
global {
	init {
		file my_file <- R_file("../includes/data.r");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
3.0
```

### Operators
List of operators related to R files:
  * **R\_file(string path)**: load a file (with an authorized extension) as a R file.
  * **is\_R(op)**: tests whether the operand is a R file.




## 3DS File

3DS is one of the file formats used by the Autodesk 3ds Max 3D modeling, animation and rendering software. 3DS files can be used in GAMA to load 3D geometries.

More details about 3DS file can be found [here](http://en.wikipedia.org/wiki/.3ds).

### Extensions
Here the list of possible extension for 3DS file:
  * "3ds"
  * "max"

### Content
The content of a 3DS file is a list of geometries.
For example:
```
global {
	init {
		file my_file <- threeds_file("../includes/data.3ds");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
```

### Operators
List of operators related to 3ds files:
  * **threeds\_file(string path)**: load a file (with an authorized extension) as a 3ds file.
  * **is\_threeds(op)**: tests whether the operand is a 3DS file





## OBJ File
OBJ file is a geometry definition file format first developed by Wavefront Technologies for its Advanced Visualizer animation package. The file format is open and has been adopted by other 3D graphics application vendors.

More details about Obj file can be found [here](http://en.wikipedia.org/wiki/Wavefront_.obj_file).

### Extensions
Here the list of possible extension for OBJ files:
  * "obj"

### Content
The content of a OBJ file is a list of geometries.
For example:
```
global {
	init {
		file my_file <- obj_file("../includes/data.obj");
		loop el over: my_file {
			write el;
		}
	}
}
```

will give:
```
Polygon
```

### Operators
List of operators related to obj files:
  * **obj\_file(string path)**: load a file (with an authorized extension) as a obj file.
  * **is\_obj(op)**: tests whether the operand is a OBJ file

[//]: # (endConcept|load_complex_datas)