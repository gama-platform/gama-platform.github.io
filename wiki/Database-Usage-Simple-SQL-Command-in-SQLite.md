---
layout: default
title:  Simple SQL Command in SQLIte
wikiPageName: Database-Usage-Simple-SQL-Command-in-SQLite
wikiPagePath: wiki/Database-Usage-Simple-SQL-Command-in-SQLite.md
---

[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)
#  Simple SQL Command in SQLIte


_Author : Truong Minh Thai_

 This model does SQl query commands:

 * - Create table 
 
 * - Insert data
 
 * - Select data
 
 * - Delete data
 
 * - Drop table 
 
 
 *  Note: the file emptyFile.db is only ... an empty file.


Code of the model : 

```
model SQLite_selectNUpdate

global {
	map<string, string> PARAMS <- ['dbtype'::'sqlite', 'database'::'../../includes/emptyFile.db'];
	init {
		create DB_Accessor;

		// Test of the connection to the database
		if (first(DB_Accessor) testConnection [params::PARAMS] = false) {
			write "Connection impossible";
			do halt;
		}

		ask (DB_Accessor) {
			do executeUpdate params: PARAMS updateComm: "CREATE TABLE registration" + "(id INTEGER PRIMARY KEY, " + " first TEXT NOT NULL, " + " last TEXT NOT NULL, " + " age INTEGER);";
			write "REGISTRATION table has been created.";
			do executeUpdate params: PARAMS updateComm: "INSERT INTO registration " + "VALUES(100, 'Zara', 'Ali', 18);";
			do executeUpdate params: PARAMS updateComm: "INSERT INTO registration " + "VALUES(?, ?, ?, ?);" values: [101, 'Mr', 'Mme', 45];
			do insert params: PARAMS into: "registration" values: [102, 'Mahnaz', 'Fatma', 25];
			do insert params: PARAMS into: "registration" columns: ["id", "first", "last"] values: [103, 'Zaid tim', 'Kha'];
			do insert params: PARAMS into: "registration" columns: ["id", "first", "last"] values: [104, 'Bill', 'Clark'];
			write "Five records have been inserted.";
			write "Click on <<Step>> button to view selected data";
		}

	}

}

species DB_Accessor skills: [SQLSKILL] {
	reflex select {
		list<list> t <- list<list> (self select [params::PARAMS, select::"SELECT * FROM registration"]);
		write "Select before updated " + t;
	}

	reflex update {
		do executeUpdate params: PARAMS updateComm: "UPDATE registration SET age = 30 WHERE id IN (100, 101)";
		do executeUpdate params: PARAMS updateComm: "DELETE FROM registration where id=103 ";
		list<list> t <- list<list> (self select [params::PARAMS, select::"SELECT * FROM registration"]);
		write "Select after updated " + t;
	}

	reflex drop {
		do executeUpdate params: PARAMS updateComm: "DROP TABLE registration";
		write "Registration table has been dropped.";
	}

}

experiment simple_SQL_exp type: gui {
}     
```
