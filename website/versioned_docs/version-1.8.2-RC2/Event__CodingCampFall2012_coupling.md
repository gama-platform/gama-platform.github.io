---
title:  Coupling GAMA with hydrodynamics simulators
---






The maps.gaml.extensions has been extended in order to allow modeler to write its own equation systems (as simple strings), specify parameters with their values and variables and "solve"/integrate them either step by step or N steps by N steps.

An example has been implemented on the Lokta-Voltera equation system.

Possible extension:
  * parse the equations to detect errors
  * rename the skill has EDO, because we consider only variables depending on time
  * extends to solve EDP
  * add some methods/algorithms in order to "resolve" the system, in a sense of finding some equilibria (asymptots or oscillation equilibrium...)


**Results**: Verifying the old operators (A simple example "CallingR" is uploaded in the model list); Applying these statistical operators on the data loaded from RDBMS.

Results:
  * 1.Added PostgresSQL driver into SQSKILL and AgentDB.
  * 2.Wrote example models for testing.
  * Now,GAMA supported query features for MySQL, MSSQL, PostgresSQL and SQLite.


Integration of a 3D Physics Engine Library (http://jbullet.advel.cz/) in `simtools.gaml.extensions.physics`
This has been implemented as a new skill.

```
species myPhysicsAgent skills: [physical3D]
```

More details: [3D Physics Engine](Event__CodingCampFall2012_models)