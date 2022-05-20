---
title:  Running Headless
---


## What is GAMA Headless

The headless mode gives the possibility run one or multiple instances of GAMA without any user interface so that models and experiments can be launched on a grid or a cluster. Without GUI, the memory footprint, as well as the speed of the simulations, are usually greatly improved.

In this mode, GAMA can only be used to run experiments. Editing or managing models is not possible. In order to launch experiments and still benefit from a user interface (which can be used to prepare headless experiments), launch GAMA normally (see [here](Launching)) and refer to this [page](RunningExperiments) for instructions.

## Different headless modes
  
1. The first and oldest way, called _**Legacy mode**_ and detailed [here](HeadlessLegacy), consists in explicitly writing your full experiment plan (i.e each simulation you want to run, with each parameter sets) in an XML file. This way of using the Headless was the first implementation of the headless inside GAMA.
1. The second way, called _**Headless Batch**_ and detailed on this [page](HeadlessBatch), allows launching a [GAML batch experiment](BatchExperiments) in headless mode (i.e. without having to open GAMA's interface). This way is the most natural way to use the headless as it works exactly like in GUI Batch mode.
1. The last way, called _**Headless Server**_ and described [there](HeadlessServer), let you open an interactive GAMA headless server on which you can dynamically send experiments to run. This last mode is interesting for using GAMA as back-end of other project like web projects.

## General knowledge about using GAMA Headless

There are two ways to run a GAMA experiment in headless mode: using a dedicated bash wrapper (recommended) or directly from the command line. 

### Bash Wrapper (recommended)
The wrapper file can be found in the `headless` directory located inside [Gama's installed folder](Installation). It is named `gama-headless.sh` on macOS and Linux, or `gama-headless.bat` on Windows.

You can start using it like so :

```
 bash ./gama-headless.sh [m/c/hpc/v] [launchingMode]
```

* with:
	* general headless options [-m/c/t/hpc/v]
		* `-m memory` : memory allocated to gama (e.g. `-m 8g` to set it at 8GiB)
		* `-c` : console mode, the simulation description could be written with the stdin
		* `-hpc nb_of_cores` : limit to a specific number of cores the number of simulation running in parallel (eg. `-hpc 3` to limit GAMA at using 3 cores/running 3 simulation at a time=
		* `-v` : verbose mode. trace are displayed in the console 
	* _launchingMode_ will depend on which headless mode you'll use and explained in following pages


You also can display general help on every options with this command: 
```
bash ./gama-headless.sh -help
```

Which, for release 1.8.2, will output:
```
******************************************************************
* GAMA version 1.8.2                                             *
* http://gama-platform.org                                       *
* (c) 2007-2022 UMI 209 UMMISCO IRD/SU & Partners                *
******************************************************************
Welcome to Gama-platform.org version GAMA 1.8.2

sh ./gama-headless.sh [Options]

List of available options:
	=== Headless Options ===
		-m [mem]                     -- allocate memory (ex 2048m)
		-c                           -- start the console to write xml parameter file
		-v                           -- verbose mode
		-hpc [core]                  -- set the number of core available for experimentation
		-socket [socketPort]         -- start socket pipeline to interact with another framework
		-p                           -- start pipeline to interact with another framework
	=== Infos ===
		-help                        -- get the help of the command line
		-version                     -- get the the version of gama
	=== Library Runner ===
		-validate                    -- invokes GAMA to validate models present in built-in library and plugins
		-test                        -- invokes GAMA to execute the tests present in built-in library and plugins and display their results
	=== GAMA Headless Runner ===
		-batch [experimentName] [modelFile.gaml]
		                             -- Run batch experiment in headless mode
		-xml [experimentName] [modelFile.gaml] [xmlOutputFile.xml]
		                             -- build an xml parameter file from a model
		[xmlHeadlessFile.xml] [outputDirectory]
		                             -- default usage of GAMA headless
```

### Java Command (hard)

As GAMA is developed in Java, you can start the Headless mode by load appropriate bundle and starting it like this:

```
java -cp $GAMA_CLASSPATH -Xms512m -Xmx2048m -Djava.awt.headless=true org.eclipse.core.launcher.Main -application msi.gama.headless.id4 [options]
```

* with:
  * `$GAMA_CLASSPATH`: contains the relative or absolute path of jars inside the GAMA plugin directory and jars created by users
  * _options_ as explained above and in following pages

Note that we recommend you to open bash wrapper to have more detailed about how we imagine starting GAMA in headless mode.