---
title:  Batch Experiments
---


By the Batch People

Philippe Caillou,
Thomas Louail,
Nicolas Marilleau,
Huynh Quang Nghi,
Serge Stinckwich,
Patrick Taillandier,
Jean-Daniel Zucker


## What do we have?

Define an experiment, batch mode (but same capabilities as GUI mode)

·         Parameter exploration:  Param element

o   Explicit

o   List with step

·         Method Element

o   Exhaustive

o   Hill climbing

o   Simulated annealing

o   Tabu Search

o   Reactive Tabu Search

o   Genetic Algorithm

·         File export

o   File

## How does it work?

·         The experiment (the plan) creates the simulation (future: Headless mode)


## What would be great in Gama 12.4?

·         Export agent/simulation data in the file

o   =>Define code in the experiment (loop over agents)

·         Put rules for variable exploration

o   Ex: explore b={1,2,3}. if a=2 explore b={2,3} only

o   How? Put code in the exploring loop => put real GAML code in the agent

o   => reflex "method" or "explore"

o   Some existing exploration actions can be used with a ParameterSet (Map?) parameter

·         Show plots in batch

o   Define output with the code/variable of the experiment agent

o   Require a getVariable() operator that gets the last simulation variables values

·         Compare agent trajectories

o   Stats a posteriori

o   (not possible inside a simulation because there is no end)

o   => action « aftersimulation » défined by the user

o   Require a getVariable() operator that gets the last simulation variables values (to be able to loop on agents)

·         Define more parameters/variables in the file (CSV)

o   => use of the Save already working

·         Launch parallel simulation on multicore/clusters

o   => special action "runSimulation" parameter to launch 4 in parallel?

·         "Generate" agents

o   Define agent parameters by using global/previous variables/files

o   Use of an "initSimulation" action before the "runSimulation" to  be able to change manually the simulation parameters

·         Définition graphique de l’espace de valeur, éventuellement en 2D et disjoint

o   Specific OutPut

## The Solution

Define a new **Experimenter** agent and put real code/reflexes/actions... GAML code inside the Experimenter.

## One simple example of what would be great:
```
experiment InteliExplore type: batch repeat: 2 keep_seed: true until: ( time > 200 ) {
      int nbprey init:0;
      int nbpredator init:0;

      init
      {
            //for example read experiment plan from file
           
      }
     

      reflex method
      {
            loop prm over:prey_max
            {
                   do: createsimulation
                   setParameter("nb_preys_init",pr)

                   do: initsimulation

                   if (prey_max&lt;100)
                   setParameter("nb_predators_init",200)
                   if (prey_max>100)
                   setParameter("nb_predators_init",200)

                   do: runsimulation;

                   do: aftersimulation;
                  
            }
      }

      action aftersimulation
      {
            loop over getVariable(agents)
            {
                   log("everything dans file");      //with the save function?
            }     
      }

      chart name: 'Species evolution' type: series background: rgb('white') size: {1,0.4} position: {0, 0.05}
      {
      data initial_number_of_preys value: getValue("nb_preys_init") color: rgb('blue') ;
        data final_number_of_predator value: getValue("nb_predators") color: rgb('red') ;
      }
    file name: 'logsimple' type: text data: 'simulation: '+ step
                                  +'; allparams' + getAllParamters // PROBLEME comment sauver tous les parametres?
                                   + '; nbPreys: ' + getValue("nb_preys_init")
                                    + '; finalPredators: ' + getValue("nb_preys") ;
}

```

## TODO

And Alexis did almost all this in less than a day....... But how does he do that??

- A new type of Custom Experiment

- In this experiment block, an ExperimenterAgent manages the simulations

- Init() may have to create a Simulation to get a Scheduler (?) and/or a World(?)

- He must have a Scheduler to be able to stop/wait in a loop for the end of a Simulation (contradiction with previous point...)

- Its most important function is to be able to call Simulation.step()

=>Create a Simulation Type which has a Step() operator

- Create a ExperimentatorSkill with a lot of usefull actions (Step(int), ...)

- Check that it is possible to define plots, logs, ...