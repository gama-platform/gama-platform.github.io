---
layout: default
title:  Agents from Database in SQLite QGIS
wikiPageName: Database-Usage-Agents-from-Database-in-SQLite_QGis
wikiPagePath: wiki/Database-Usage-Agents-from-Database-in-SQLite_QGis.md
---
[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)
#  Agents from Database in SQLite QGIS


_Author : Truong Minh Thai_

 This model loads data from vnm_adm2 that is created by QGis.

 * In this case we do not need using AsBinary() to convert blob data to WKB format.  
 
 * In other case, if we load Geometry data that is created by using libspatialite library then we must use Asbinary() 
 * to convert geometry to WKB format (see SQLite_libspatialite model)


Code of the model : 

```
model Sqlite_QGis
 
  
global { 
	map BOUNDS <- [//'srid'::'4326', // optinal
				  "dbtype"::"sqlite",
				  "database"::"../../includes/spatialite.db"
				  ,"select"::	"select geom  from bounds;" 
														
							  ]; 
	map PARAMS <- [//'srid'::'4326', // optinal
					"dbtype"::"sqlite",
					"database"::"../../includes/bph.db"];
	string QUERY <- "SELECT name, type, geom as geom FROM buildings ;";
	geometry shape <- envelope(BOUNDS);		  	
		  	
	init {
		create DB_accessor {
			create buildings from: (self select [params:: PARAMS, select:: QUERY]) 
							 with:[ 'name'::"name",'type'::"type", 'shape':: geometry("geom")];
		 }
	}
}

species DB_accessor skills: [SQLSKILL];

species buildings {
	string type;
	aspect default {
		draw shape color: #gray ;
	}	
}	

experiment DB2agentSQLite type: gui {
	output {
		display fullView {
			species buildings aspect: default;
		}
	}
}
```
