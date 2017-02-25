---
layout: default
title:  Agents from Database in MySQL
wikiPageName: Database-Usage-Agents-from-Database-in-MySQL
wikiPagePath: wiki/Database-Usage-Agents-from-Database-in-MySQL.md
---

[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)
#  Agents from Database in MySQL


_Author : Benoit Gaudou_

 This model does SQl query commands and create agents using the results


Code of the model : 

```
model DB2agentMySQL

global {
	map<string,string> BOUNDS <- [	//'srid'::'32648', // optinal
									'host'::'localhost',
									'dbtype'::'MySQL',
									'database'::'spatial_DB',
									'port'::'8889',
									'user'::'root',
									'passwd'::'root',
								  	"select"::"SELECT geom FROM bounds;" ];
	map<string,string> PARAMS <- [	//'srid'::'32648', // optinal
									'host'::'localhost',
									'dbtype'::'MySQL',
									'database'::'spatial_DB',
									'port'::'8889',
									'user'::'root',
									'passwd'::'root'];
	
	string QUERY <- "SELECT name, type, geom FROM buildings ;";
	geometry shape <- envelope(BOUNDS);		  	
	 	
	init {
		create DB_accessor {
			create buildings from: list(self select [params:: PARAMS, select:: QUERY]) 
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
