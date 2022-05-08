---
title:   CreateBuildingTableMSSQL
---

[//]: # (keyword|statement_remove)
[//]: # (keyword|statement_put)
[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)


_Author : Truong Minh Thai_

This model shows how to create a database and a table in MSSQL using GAMA
 

Code of the model : 

```
model CreateBuildingTable_MSSQL


global
{
	map&lt;string, string> PARAMS <- ['host'::'127.0.0.1', 'dbtype'::'sqlserver', 'database'::'', 'port'::'1433', 'user'::'sa', 'passwd'::'tmt'];
	init
	{
		create dummy;
		ask dummy
		{
			if (self testConnection [params::PARAMS])
			{
				do executeUpdate params: PARAMS updateComm: "CREATE DATABASE spatial_DB";
				write "spatial_BD database was created ";
				remove  "database" from: PARAMS;
				put "spatial_DB" key: "database" in: PARAMS;
				do executeUpdate params: PARAMS updateComm: "CREATE TABLE bounds" + "( " + " geom GEOMETRY " + ")";
				write "bounds table was created ";
				do executeUpdate params: PARAMS updateComm: "CREATE TABLE buildings " + "( " + " name VARCHAR(255), " + " type VARCHAR(255), " + " geom GEOMETRY " + ")";
				write "buildings table was created ";
			} else
			{
				write "Connection to MySQL can not be established ";
			}

		}

	}

}

species dummy skills: [SQLSKILL]
{
}

experiment default_expr type: gui
{
}
```
