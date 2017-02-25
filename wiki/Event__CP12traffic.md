---
layout: default
title: Traffic simulation and Physics constraints operators
wikiPageName: Event__CP12traffic
wikiPagePath: wiki/Event__CP12traffic.md
---

# Traffic simulation and Physics constraints operators

**Traffic simulation**

A first task that we done was to define a new plug-in in order to take into account the fact that a road has a limited number of lanes.

We propose a plug-in that contains the driving plug-in. This plug-in extends the moving skill. In particular, it proposes a new primitive "gotoTraffic" that integrates a collision avoiding algorithm.
2 models (in "models/experimental models") were proposed to illustrate the use of our plug-in.

DrivingSkill.java implements a new skill in `package msi.gaml.extensions.traffic`
```
@skill("driving")
public class DrivingSkill extends MovingSkill{
...
}
```

New model in `msi.gama.models/experimental_models/traffic`

**Physics constraints operators**

A second plugin is under development concerning physic computation. In particular, it allows to handle collisions between two convex polygons. A first toy model concerning pool game was developed.
Library used: http://www.jbox2d.org/

`src/msi/gaml/extensions/physics/PhysicsSkill.java` implements a new skill in `package msi.gaml.extensions.physics`
```
@skill("physical")
public class PhysicsSkill extends Skill{
        @setter("physical_world")
        public void setWorldAgent(final IAgent _agent, final IAgent _world){
                if(_world == null)
                        return;
                        
                PhysicalWorldAgent pwa = (PhysicalWorldAgent)_world;
                pwa.registerAgent(_agent);
        }


```
