---
title:  Headless Batch
---


## Getting started

This headless mode is the _Batch_ one. 

The advantage of this mode is how easily it is to prepare and launch, contrarily to the [Headless Legacy](HeadlessLegacy), this mode do not need any other file than the GAML file holding the experiment of [_type_ `batch`](BatchExperiments).

Once you finished preparing your batch experiment, you can run it with a command similar to this out:
```
bash ./gama-headless.sh [option] -batch experimentName /path/to/file.gaml
```
* with:
  * `-batch`: the runner flag to launch a batch exploration
  * `experimentName`: the name of your batch experiment in the following file
  * `/path/to/file.gaml`: the path (relative or absolute) containing the batch experiment

## Simulation Output

Unfortunatly, this mode can't save output data automatically, the actual way to do is saving wanted data inside CSV files from your model.