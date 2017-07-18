---
layout: default
title:  CreateBuildingTableSQLite
wikiPageName: Database-Usage-Create-Spatial-Table-in-SQLite
wikiPagePath: wiki/Database-Usage-Create-Spatial-Table-in-SQLite.md
---
[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)
#  CreateBuildingTableSQLite


_Author : Truong Minh Thai_

This model shows how to create a database and a table in SQLite using GAMA
 

Code of the model : 

```

model SQLite_selectNUpdate
  
global {
	map PARAMS <- ['dbtype'::'sqlite','database'::'../../includes/spatialite.db'];

	init {
		create dummy ;
		ask (dummy)	
		{ 
			do  executeUpdate params: PARAMS 
					updateComm: "DROP TABLE bounds; " ;
 			do  executeUpdate params: PARAMS 
 					updateComm: "DROP TABLE buildings; " ;
  
 			write "dropped tables!";
			do executeUpdate params: PARAMS updateComm: "CREATE TABLE bounds " +
                   "(id INTEGER PRIMARY KEY, " +
				   " geom BLOB NOT NULL); "  ;
 			do executeUpdate params: PARAMS updateComm: "CREATE TABLE buildings " +
                   "(id INTEGER PRIMARY KEY, " +
                   " name TEXT NOT NULL," +
                   " type TEXT NOT NULL," +
                   " geom BLOB NOT NULL); "  ;

		}
	}
}  

species dummy skills: [SQLSKILL] { } 

experiment default_expr type:gui {

}     
```
