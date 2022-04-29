---
title: CreateBuildingTableMySQL
id: version-1.8.1-Database Usage Create Spatial Table in MySQL
original_id: Database Usage Create Spatial Table in MySQL
---

[//]: # (keyword|statement_remove)
[//]: # (keyword|statement_put)
[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)


_Author : Truong Minh Thai_

This model shows how to create a database and a table in MySQL using GAMA
 

Code of the model : 

```
model CreateBuildingTableMySQL


global
{
	map<string, string> PARAMS <- ['host'::'localhost', 'dbtype'::'MySQL', 'database'::'', 'port'::'8889', 'user'::'root', 'passwd'::'root'];
	init
	{
		create test_species number: 1;
		ask test_species
		{
			if (self testConnection [params::PARAMS])
			{
				do executeUpdate params: PARAMS updateComm: "CREATE DATABASE spatial_DB_GAMA";
				write "spatial_BD_GAMA database was created ";
				remove "database" from: PARAMS;
				put "spatial_DB_GAMA" key: "database" in: PARAMS;
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

species test_species skills: [SQLSKILL]
{
}

experiment default_expr type: gui
{
}
```
