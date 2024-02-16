---
title:  Using Database Access
---


Database features of GAMA provide a set of actions on Database Management Systems (DBMS). Database features are implemented in the irit.gaml.extensions.database plug-in with these features:

* Agents can execute SQL queries (create, Insert, select, update, drop, delete) to various kinds of DBMS.

These features are implemented in two kinds of components: skill (`SQLSKILL`) and agent (`AgentDB`).

`SQLSKILL` and `AgentDB` provide almost the same features (the same set of actions on DBMS) but with certain slight differences:

* An agent of species `AgentDB` will maintain a unique connection to the database during the whole simulation. The connection is thus initialized when the agent is created and destroyed when it is killed.
* In contrast, an agent of a species with the `SQLSKILL` skill will open a connection each time it wants to execute a query. This means that each action will be composed of three running steps:
  * Make a database connection.
  * Execute an SQL statement.
  * Close database connection.

> An agent with the `SQLSKILL` spends a lot of time to create/close the connection each time it needs to send a query; it saves the database connection (a DBMS often limits the number of simultaneous connections). In contrast, an `AgentDB` agent only needs to establish one database connection that can be used for any action. Because it does not need to create and close the database connection for each action, therefore actions of `AgentDB` agents are executed faster than the actions of `SQLSKILL` ones but we must pay a connection for each agent.

With an inheritance agent of species `AgentDB` or an agent of a species using `SQLSKILL`, we can query data from relational database to create agents, define the environment, or analyze or store simulation results in RDBMS. The database features help us to have more flexibility in the management of simulation models and analysis of simulation results.


## Description

* **Plug-in**: _irit.gaml.extensions.database_
* **Author**: TRUONG Minh Thai, Frederic AMBLARD, Benoit GAUDOU, Christophe SIBERTIN-BLANC


## Supported DBMS

The following DBMS are currently supported:

* SQLite
* MySQL
* PostgreSQL: **The GIS extension needs to be installed and activated in the database.**

Note that, MySQL and Postgres DBMSs require a dedicated server to work while SQLite only needs a file to be accessed.

All the actions are independent from the chosen DBMS. Only the connection parameters are DBMS-dependent.

We chose to implement 3 main query actions:
* `select`: that will execute the SELECT SQL queries. It will return a result dataset.
* `insert`: that will execute the INSERT SQL queries. It will return the number of records that are affected by the SQL query.
* `executeUpdate`: that can execute any CREATE/INSERT/DROP/DELETE SQL queries (basically all the queries that do not return a dataset. It generalizes the `insert` action.


## SQLSKILL skill

### Define a species that uses the `SQLSKILL` skill

Example of declaration:

```
species toto skills: [SQLSKILL] {
	//insert your descriptions here
}
```

Agents with such a skill can use new actions defined in the skill. All these actions need information for the database connection.

### Map of connection parameters for SQL

In the actions defined in the `SQLSKILL`, a parameter containing the connection parameters is required. It is a map with _key::value_ pairs with the following **keys**:

  * `dbtype` (mandatory): DBMS type value. Its value is a string. We must use "mysql" when we want to connect to a MySQL. That is the same for "postgres", "sqlite" (ignore case sensitive)
  * `host` (optional): Host name or IP address of data server. It is absent when we work with SQlite.
  * `port` (optional): Port of connection. It is not required when we work with SQLite.
  * `database`  (mandatory): Name of database. It is the file name including the path when we work with SQLite. 
  * `user` (optional): Username. It is not required when we work with SQLite.
  * `passwd`  (optional): Password. It is not required when we work with SQLite.
  * `srid` (optional): srid (Spatial Reference Identifier) corresponds to a spatial reference system. This value is specified when GAMA connects to spatial database. If it is absent then GAMA uses spatial reference system defined in _Preferences->External_ configuration. 

**Example**: Definitions of connection parameters

```
// POSTGRES connection parameter
map <string, string>  POSTGRES <- [
     'host'::'localhost',
     'dbtype'::'postgres',
     'database'::'BPH',
     'port'::'5432',
     'user'::'postgres',
     'passwd'::'abc'];

//SQLite
map <string, string>  SQLITE <- [
    'dbtype'::'sqlite',
    'database'::'../includes/meteo.db'];

// MySQL connection parameter
map <string, string>  MySQL <- [
    'host'::'localhost',
    'dbtype'::'MySQL',
    'database'::'', // it may be a empty string
    'port'::'3306',
    'user'::'root',
    'passwd'::'abc'];
```

### Action `testConnection`: test a connection to a database

**Syntax**:

> _**testConnection** (params: map &lt;string, string>)_
The action tests the connection to a given database.

* **Return**: boolean. It is:
  * `true`: the agent can connect to the DBMS (to the given Database with the given name and password).
  * `false`: the agent cannot connect (either the server is not started, the database does not exist or the user/password are not correct).
* **Arguments**:
  * `params` (type = `map <string, string>`): map of connection parameters
* **Exceptions**: _GamaRuntimeException_

**Example**: Check a connection to a MySQL database.

```
// Needs to be executed in the context of an agent with the SQLSKILL skill.
// MySQL is the connection parameters map defined above.
if (testConnection(MySQL)){
	write "Connection is OK" ;
}else{
	write "Connection is false" ;
}	
```

### Action `select`: select data from a database

**Syntax**:

> _**select** (params: map &lt;string, string>, select: string, values: list)_
The action creates a connection to a DBMS and executes the select statement. If the connection or selection fails then it throws a GamaRuntimeException.

* **Return**: `list<list>`. If the selection succeeds, it returns a list with three elements:
  * The first element is a list of column names.
  * The second element is a list of column types.
  * The third element is a data set.
* **Arguments**:
  * `params` (type = map&lt;string,string>): map containing the connection parameters
  * `select` (type = string): A SQL query returning values, i.e. a SELECT query. The selection query can be a parametric query (i.e. it can contain question marks).
  * `values` (type = list): List of values that are used to replace question marks. This is an optional parameter.
* **Exceptions**: _GamaRuntimeException_

**Example**: select data from table points.

```
map <string, string>   PARAMS <- ['dbtype'::'sqlite', 'database'::'../includes/meteo.db'];
list<list> t <- select(PARAMS, "SELECT * FROM points ;");
```

**Example**: select data from table point with question marks from table points.

```
map <string, string> PARAMS <- ['dbtype'::'sqlite', 'database'::'../includes/meteo.db'];
list<list> t <- select(params: PARAMS, 
                       select: "SELECT temp_min FROM points where (day>? and day<?);",
                       values: [10,20] );
```

### Action `insert`: Insert data into a database

**Syntax**:

> _**insert** (param: map&lt;string,string>,  into:  string, columns: list&lt;string>, values: list)_ 
The action creates a connection to a DBMS and executes the insert statement. If the connection or insertion fails then it throws a_GamaRuntimeException_.

* **Return**: int

> If the insertion succeeds, it returns a number of records inserted by the insert.

* **Arguments**:
  *`params` (type = map&lt;string,string>): map containing the connection parameters.
  *`into` (type = string): the table name.
  *`columns` (type=list&lt;string>): list of column names of the table. It is an optional argument. If it is not specified then all columns of table are selected.
  *`values` (type=list): list of values that are used to insert into the table chosen columns. Hence the columns and values must have same size.
* **Exceptions**:_GamaRuntimeException

**Example**: Insert data into table registration.

```
map<string, string> PARAMS <- ['dbtype'::'sqlite', 'database'::'../../includes/Student.db'];

do insert (params: PARAMS, 
           into: "registration", 
           values: [102, 'Mahnaz', 'Fatma', 25]);

do insert (params: PARAMS, 
                into: "registration", 
                columns: ["id", "first", "last"], 
                values: [103, 'Zaid tim', 'Kha']);

int n <- insert (params: PARAMS, 
                 into: "registration", 
                 columns: ["id", "first", "last"], 
                 values: [104, 'Bill', 'Clark']);
```

### Action `executeUpdate`: Execution update commands

**Syntax**:

> _**executeUpdate** (param: map&lt;string,string>, updateComm:  string, columns: list&lt;string>, values: list)_
The action executeUpdate executes an update command (create/insert/delete/drop) by using the current database connection of the agent. If the database connection or the update command fails then it throws a GamaRuntimeException. Otherwise, it returns an integer value.

* **Return**: int. It returns a number of records affected by the SQL query.
* **Arguments**:
  * `params` (type = map&lt;string,string>): map containing the connection parameters,
  * `updateComm` (type = string): SQL query string. It may be one of the SQL commands: _create_, _update_, _delete_ and _drop_ with or without question marks.
  * `columns` (type=list&lt;string>):  list of column names of the table.
  * `values` (type=list): list of values that are used to replace question marks if appropriate. This is an optional parameter.
* **Exceptions**: _GamaRuntimeException_

**Examples**: Using action `executeUpdate` to execute some SQL commands (create, insert, update, delete and drop).

```
map<string, string> PARAMS <- ['dbtype'::'sqlite',  'database'::'../../includes/Student.db'];
// Create table
do executeUpdate (params: PARAMS, 
                  updateComm: "CREATE TABLE registration" 
                              + "(id INTEGER PRIMARY KEY, " 
                              + " first TEXT NOT NULL, " + " last TEXT NOT NULL, " 
                              + " age INTEGER);");

// Insert into 
do executeUpdate (params: PARAMS,  
                  updateComm: "INSERT INTO registration " + "VALUES(100, 'Zara', 'Ali', 18);");
do insert (params: PARAMS, into: "registration", 
           columns: ["id", "first", "last"], 
           values: [103, 'Zaid tim', 'Kha']);

// executeUpdate with question marks
do executeUpdate (params: PARAMS,
                  updateComm: "INSERT INTO registration " + "VALUES(?, ?, ?, ?);",  
                 values: [101, 'Mr', 'Mme', 45]);

//update 
int n <-  executeUpdate (params: PARAMS, 
                          updateComm: "UPDATE registration SET age = 30 WHERE id IN (100, 101)" );

// delete
int n <- executeUpdate (params: PARAMS, 
                        updateComm: "DELETE FROM registration where id=? ",  
                        values: [101] );

// Drop table
do executeUpdate (params: PARAMS, updateComm: "DROP TABLE registration");
```



## AgentDB

`AgentBD` is a built-in species, which supports behaviors that look like actions in `SQLSKILL` but differs in that it uses only one connection for several actions. It means that `AgentDB` creates a connection to the database and keeps that connection open for its later operations.

### Define a species that is an inheritance of `AgentDB`

Example of declaration:

```
species agtDB parent: AgentDB {  
	//insert your descriptions here
} 
```

### Action `connect`: Connect to a database

**Syntax**:

> _**connect** (params: map&lt;string,string>)_
This action makes a connection to the database. If a connection is established then it will assign the connection object into a built-in attribute of the species (conn) otherwise it throws a GamaRuntimeException.

* **Return**: connection
* **Arguments**:
  * `params` (type = map&lt;string,string>): map containing the connection parameters
* **Exceptions**: GamaRuntimeException

**Example**: Connect to PostgreSQL

```
// POSTGRES connection parameter
map <string, string>  POSTGRES <- [
                                        'host'::'localhost',
                                        'dbtype'::'postgres',
                                        'database'::'BPH',
                                        'port'::'5433',
                                        'user'::'postgres',
                                        'passwd'::'abc'];
ask agtDB {
      do connect (params: POSTGRES);
}
```

### Action `isConnected`: Check whether an agent is connected to a database

**Syntax**:

> _**isConnected** (params: map&lt;string,string>)_
This action checks if an agent is connected to a database.

* **Return**: Boolean.  If the agent is connected to a database then isConnected returns true; otherwise it returns false.
* **Arguments**:
  * `params` (type = map&lt;string,string>): map containing the connection parameters

**Example**: Check whether the agents agtDB are connected.

```
ask agtDB {
	if (self isConnected){
              write "It already has a connection";
	}else{
              do connect (params: POSTGRES);
        } 
}
```

### Action `close`: Close the current connection

**Syntax**:

> _**close**_
This action closes the current database connection of the current agent. If the agent does not have any database connection then it throws a GamaRuntimeException.

**Example**: close the connection of all the agtDB agents.

```
ask agtDB {
	if (self.isConnected()){
	      do close;
	}
}
```

### Action `getParameter`: Get connection parameters

**Syntax**:

> _**getParameter**_
This action returns the connection parameters of the current agent.

* **Return**: `map<string,string>`

**Example**:

```
ask agtDB {
	if (self.isConnected()){
		write "the connection parameter: " +self.getParameter();
        }
}
```

### Set connection parameters

**Syntax**:

> _**setParameter** (params: map&lt;string,string>)_
This action sets new values for connection parameters and closes the current connection of the agent. If it can not close the current connection then it will throw GamaRuntimeException. If the species wants to make the connection to database with the new values then action `connect` must be called.

* **Return**: null
* **Arguments**:
  * `params` (type = map&lt;string,string>): map containing the connection parameters
* **Exceptions**: _GamaRuntimeException_

**Example**:

```
ask agtDB {
	if (self.isConnected()){
             do setParameter params: MySQL;
             do connect params: self.getParameter();
        }
}
```

### Retrieve data from a database by using `AgentDB`
Because `AgentDB`'s connection to the database is kept alive, it can execute several SQL queries using only the `connect` action once. Hence `AgentDB` can do actions such as `select`, `insert`, `executeUpdate` with the same parameters as those of `SQLSKILL` _except for the **params** parameter which is always absent_.

**Examples**:

```
map<string, string> PARAMS <- ['dbtype'::'sqlite', 'database'::'../../includes/Student.db'];
ask agtDB {
   do connect params: PARAMS;

   // Create table
   do executeUpdate updateComm: "CREATE TABLE registration" 
	+ "(id INTEGER PRIMARY KEY, " 
        + " first TEXT NOT NULL, " + " last TEXT NOT NULL, " 
        + " age INTEGER);";

   // Insert into 
   do executeUpdate updateComm: "INSERT INTO registration " 
        + "VALUES(100, 'Zara', 'Ali', 18);";
   do insert into: "registration" columns: ["id", "first", "last"]
	     values: [103, 'Zaid tim', 'Kha'];
 
   // executeUpdate with question marks
   do executeUpdate updateComm: "INSERT INTO registration VALUES(?, ?, ?, ?);" 
	            values: [101, 'Mr', 'Mme', 45];
   
   //select
   list<list> t <- self.select("SELECT * FROM registration;");
    
   //update 
   int n <- self.executeUpdate(updateComm: "UPDATE registration SET age = 30 WHERE id IN (100, 101)");
     
   // delete
   int n <- executeUpdate ( updateComm: "DELETE FROM registration where id=? ",  values: [101] );
     
   // Drop table
   do executeUpdate updateComm: "DROP TABLE registration";
}
```

## Using database features to define the environment and create agents

In GAMA, it is possible to initialize the simulations from data stored in a database: we can use the results of the `select` action of `SQLSKILL` or `AgentDB` to create agents or to define the boundary of the environment in the same way we do with shape files. Further more, we can also save simulation data that are generated by the simulation including geometry data.

Note that GAMA only supports PostGIS and MySQL as spatial DBMS.


### Define the boundary of the environment from the database

* **Step 1**: specify the SELECT query by declaring a map object with keys as below:

  * `dbtype` (mandatory): DBMS type value. Its value is a string. We must use "mysql" when we want to connect to a MySQL. That is the same for "postgres", "sqlite" (ignore case sensitive)
  * `host` (optional): Host name or IP address of data server.
  * `port` (optional): Port of connection. 
  * `database`  (mandatory): Name of database.  
  * `user` (optional): Username. 
  * `passwd`  (optional): Password. 
  * `srid` (optional): srid (Spatial Reference Identifier) corresponds to a spatial reference system. This value is specified when GAMA connects to spatial database. If it is absent then GAMA uses spatial reference system defined in _Preferences->External_ configuration. 
  * `select` (mandatory): selection query.


**Example**:

```
map<string,string> BOUNDS <- [	
	//'srid'::'32648',
	'host'::'localhost',								
        'dbtype'::'postgres',
	'database'::'spatial_DB',
	'port'::'5433',								
        'user'::'postgres',
	'passwd'::'tmt',
	'select'::'SELECT ST_AsBinary(geom) as geom FROM bounds;' ];
```

* **Step 2**: define the boundary of the environment by using the map object defined in the first step (in the `global` block of the model).

```
geometry shape <- envelope(BOUNDS);
```

Note: We can do the same way if we work with MySQL and we must convert Geometry format in GIS database to binary format.


### Create agents from the result of a `select` action

If we are familiar with how to create agents from a shapefile then it becomes very simple to create agents from datbase data. We can do as below:

* **Step 1**: Define a species with `SQLSKILL` or `AgentDB`

```
species DB_accessor skills: SQLSKILL {
	//insert your descriptions here	
}	
```

* **Step 2**: Define a connection and selection parameters

```
global {
	map<string,string> PARAMS <- [	//'srid'::'32648', // optional
					'host'::'localhost',
					'dbtype'::'postgis',
					'database'::'spatial_db',
					'port'::'5432',
					'user'::'postgres',
					'passwd'::''];	
	string QUERY <- "SELECT type, ST_AsEWKB(geom) as geom FROM buildings;";
}      
```

* **Step 3**: Create species by using selected results

```
init {
	create DB_accessor {
		create buildings from: select(PARAMS, QUERY)
				 with:[ nature::"type", shape::"geom"];
	 }
   ...
}
```

### Save Geometry data to database

Saving agents in a database will be simply a set of insertion into the database. We can do as below:

* **Step 1**: Define a species with SQLSKILL or AgentDB

```
species DB_accessor skills: SQLSKILL {  
	//insert your descriptions here
} 
```

* **Step 2**: Define a connection and create GIS database and tables

```
global {
	map<string,string> PARAMS <-  [//'srid'::'4326', // optional
					'host'::'localhost','dbtype'::'postgres','database'::'spatial_db',
					'port'::'5432','user'::'postgres','passwd'::''];

	init {
	   create DB_accessor ;
	   ask DB_accessor {
		if (self.testConnection(PARAMS)){
	           // create GIS database	
 		   do executeUpdate(params:PARAMS, 
		      updateComm: "CREATE DATABASE spatial_db with TEMPLATE = template_postgis;"); 
 		   remove key: "database" from: PARAMS;
		   put "spatial_db" key:"database" in: PARAMS;
		
                   //create table
                   do executeUpdate params: PARAMS 
				  updateComm : "CREATE TABLE buildings "+
				  "( "  +
                   	               " name character varying(255), " + 
                                       " type character varying(255), " + 
                                       " geom GEOMETRY " + 
                                   ")";
		    }else {
 			write "Connection to MySQL can not be established ";
 		    }	
		}
	}
}
```

* **Step 3**: Insert geometry data to the GIS database

```
ask building {
   ask DB_Accessor {
	do insert(params: PARAMS, 
                  into: "buildings",
		  columns: ["name", "type","geom"],
		  values: [myself.name, myself.type, myself.shape];
   }
}
```
