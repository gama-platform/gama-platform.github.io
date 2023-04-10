---
title:  Using GAMAnalyzer
---


## Install

Go to Git View -> Click on Import Projects
Add the dependencies in ummisco.gama.feature.dependencies

GamAnalyzer is a tool to monitor several multi-agents simulation

The "agent_group_follower" goal is to monitor and analyze a group of agent during several simulation. This group of agent can be chosen by the user according to criteria chosen by the user. The monitoring process and analysis of these agents involves the extraction, processing and visualization of their data at every step of the simulation.  The data for each simulation are pooled and treated commonly for their graphic representation or clusters.

## Built-in Variable




* **varmap**: All variable that can be analyzed or displayed in a graph.

* **numvarmap**: Numerical variable (on this variable all the aggregator numeric are computed). 

* **qualivarmap**: All non numerical variable. Could be used for BDI to analyze beliefs.

* **metadatahistory**: See updateMetaDataHistory. This matrice store all the metadata like getSimulationScope(), getClock().getCycle(), getUniqueSimName(scope), rule, scope.getAgentScope().getName(), this.getName(), this.agentsCourants.copy(scope), this.agentsCourants.size(), this.getGeometry().


* **lastdetailedvarvalues**: store all the value (in varmap) for all the followed agent for the last iteration.



* **averagehistory**: Average value for each of the numvar 
* **stdevhistory**: Std deviation value for each of the numvar 
* **minhistory**: Min deviation value for each of the numvar 
* **maxhistory**: Max deviation value for each of the numvar
* **distribhistoryparams**: Gives the interval of the distribution described in distribhistory
* **distribhistory**: Distribution of numvarmap

* **multi_metadatahistory**: Aggregate each metadatahistory for each experiment 


## Example 

This example is based on a toy model which is only composed of wandering people. In this example we will use GamAnalyzer to follow the agent people. 

### 
```
agent_group_follower peoplefollower;
```
```
create agentfollower 
{
  do analyse_cluster species_to_analyse:"people";
  peoplefollower<-self;
}
```

### expGlobalNone
No clustering only the current agent follower is displayed
```
aspect base {
  display_mode <-"global";
  clustering_mode <-"none";
  draw shape color: #red;
}
```

### expSimGlobalNone 
The agent_group_follower corresponding to the current iteration and all the already launch experiments are displayed. 
```
aspect simglobal{
  display_mode <-"simglobal";
  clustering_mode <-"none";
  draw shape color: #red;
  int curColor <-0;
  loop geom over: allSimShape{
    draw geom color:SequentialColors[curColor] at:{location.x,location.y,curColor*10};
    curColor <- curColor+1;
  }
}
```
### expCluster
The agent group follower is divided in cluster computed thanks to a dbscan algorithm. Only the current agent_group_follower is displayed
```
aspect cluster {
  display_mode <-"global";
  clustering_mode <-"dbscan";
  draw shape color: #red;
}
```
### expClusterSimGlobal
The agent_group_follower (made of different cluster) corresponding to the current iteration and all the already launch experiments are displayed. 

```
aspect clusterSimGlobal {
  display_mode <-"simglobal";
  clustering_mode <-"dbscan";
  draw shape color: #red;
  int curColor <-0;
  loop geom over: allSimShape{
    draw geom color:SequentialColors[curColor] at:{location.x,location.y,curColor*10};
    curColor <- curColor+1;
  } 
}
```
