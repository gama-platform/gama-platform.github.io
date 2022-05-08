---
title:   Agents to Database in SQLite
---

[//]: # (keyword|skill_SQLSKILL)
[//]: # (keyword|concept_database)


_Author : Truong Minh Thai_

   init: Select data from table vnm_adm2 (Created via QGis software)  and create  agents

 * savetosql: Save data of agent into MySQL.
 
 * transform= true because you need to transform geometry data from Absolute(GAMA) to Gis
 

Code of the model : 

```

model agent2DB_SQLite  
  
global {  
	file buildingsShp <- file('../../includes/building.shp');
	file boundsShp <- file('../../includes/bounds.shp');
	geometry shape <- envelope(boundsShp);
	
	map&lt;string,string> PARAMS <- [
				'dbtype'::'sqlite', 
				//'srid'::'4326', // optinal
				'database'::'../../includes/spatialite.db'
			
				];


	init {
		create buildings from: buildingsShp with: [type::string(read ('NATURE'))];
		create bounds from: boundsShp;
		
		create DB_Accessor  
		{ 			
			do executeUpdate params: PARAMS updateComm: "DELETE FROM buildings";	
			do executeUpdate params: PARAMS updateComm: "DELETE FROM bounds";			
		}
		write "Click on <&lt;Step>> button to save data of agents to DB";		 
	}
}   
 
species DB_Accessor skills: [SQLSKILL] ;   

species bounds {
	reflex printdata{
		 write ' name : ' + (name) ;
	}
	 
	reflex savetosql{  // save data into SQLite
		write "begin bound";
		ask DB_Accessor {
			do insert params: PARAMS into: "bounds"
					  columns: ["geom"]
					  values: [myself.shape];
		}
	    write "finish bound";
	}		
}	

species buildings {
	string type;
	
	reflex printdata{
		 write ' name : ' + (name) + '; type: ' + (type) + "shape:" + shape;
	}
	
	reflex savetosql{  // save data into SQLite
		write "begin"+ name;
		ask DB_Accessor {
			do insert params: PARAMS into: "buildings"
					  columns: ["name", "type","geom"]
					  values: [myself.name,myself.type,myself.shape];
		}
	    write "finish "+ name;
	}	
	
	aspect default {
		draw shape color: #gray ;
	}
}    

experiment default_expr type: gui {
	output {
		
		display GlobalView {
			species buildings aspect: default;
		}
	}
}

```
