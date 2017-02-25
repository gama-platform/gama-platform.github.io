---
layout: default
title: Syntax in GAML
wikiPageName: SerializeAgents
wikiPagePath: wiki/SerializeAgents.md
---

Using SavedAgent kind of GamlAgent, it is now possible to serialize and unserialize agents and simulations as a string. It can be done using the operators: `serializeSimulation`, `unserializeSimulation`, `saveSimulation` of `ummisco.gama.serialize`.

Need to be improved:
* serialization of random generator
* serialization of shapes
* to allow any agent to be serialized


Example of use of the two operators:
```
experiment toto {
	list<string> history <- [];

	reflex store when: (cycle < 6){
		add serializeSimulation(cycle) to: history;
	}
	
	reflex restore when: (cycle = 6){
		int i <- unSerializeSimulation(string(history[0]));
	} 
	
	reflex store22 when: cycle=2{
		write "Sauvegarde de la simulation " + saveSimulation("file.xml");
	}
}
```


## Syntax in GAML

How to make it as simple as possible for the modeler to save and restore simulation states, or come back in time ?
(like the creation of new simulations, for instance, which reuses exactly the same syntax than the creation of agents) ? 

### Statements

`store` (to differentiate it from `save`) ?
* `to: ` a file 

`restore` with facets that could allow to precise:
* `at:` a cycle number (to come back at a certain point in time)
* `at: ` a negative number (to come back relatively in time)
* `at: ` a date ? 
* `from:` a file
* `
