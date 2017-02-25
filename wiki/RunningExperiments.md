---
layout: default
title: Running Experiments
wikiPageName: RunningExperiments
wikiPagePath: wiki/RunningExperiments.md
---

# Running Experiments



_Running an experiment_ is the only way, in GAMA, to execute simulations on a model. Experiments can be run in different ways.
  1. The first, and most common way, consists in [launching an experiment](LaunchingExperiments) from the Modeling perspective, using the [user interface](ExperimentsUserInterface) proposed by the simulation perspective to run simulations.
  1. The second way, detailed on this [page](Launching), allows to automatically launch an experiment when opening GAMA, subsequently using the same [user interface](ExperimentsUserInterface).
  1. The last way, known as running [headless experiments](Headless), does not make use of the user interface and allows to manipulate GAMA entirely from the command line.

All three ways are strictly equivalent in terms of computations (with the exception of the last one omitting all the computations necessary to render simulations on displays or in the UI). They simply differ by their usage:
  1. The first one is heavily used when designing models or demonstrating several models.
  1. The second is intended to be used when demonstrating or experimenting a single model.
  1. The last one is useful when running large sets of simulations, especially over networks or grids of computers.
