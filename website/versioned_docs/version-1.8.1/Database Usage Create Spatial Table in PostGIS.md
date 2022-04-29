---
title: CreateBuildingTablePostGIS
id: version-1.8.1-Database Usage Create Spatial Table in PostGIS
original_id: Database Usage Create Spatial Table in PostGIS
---

[//]: # (keyword|statement_remove)
[//]: # (keyword|statement_put)
[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)


_Author : Truong Minh Thai_

This model shows how to create a database and a table in PostGIS using GAMA
 

Code of the model : 

```
model CreateBuildingTablePostGIS


global
{
	map<string, string> PARAMS <- ['host'::'localhost', 'dbtype'::'Postgres', 'database'::'', 'port'::'5433', 'user'::'postgres', 'passwd'::'tmt'];
	init
	{
		create dummy;
		ask dummy
		{
			if (self testConnection [params::PARAMS])
			{
				do executeUpdate params: PARAMS updateComm: "CREATE DATABASE spatial_db with TEMPLATE = template_postgis;";
				write "spatial_BD database was created ";
				remove "database" from: PARAMS;
				put "spatial_db" key: "database" in: PARAMS;
				do executeUpdate params: PARAMS updateComm: "CREATE TABLE bounds" + "( " + " geom GEOMETRY " + ")";
				write "bounds table was created ";
				do executeUpdate params: PARAMS updateComm: "CREATE TABLE buildings " + "( " + " name character varying(255), " + " type character varying(255), " + " geom GEOMETRY " + ")";
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
