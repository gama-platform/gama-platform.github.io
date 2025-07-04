---
title:  Running Experiments
---




_Running an experiment_ is the only way, in GAMA, to execute simulations on a model. Experiments can be run in different ways.
  
1. The first, and most common way, consists in [launching an experiment](LaunchingExperiments) from the Modeling perspective, using the [user interface](ExperimentsUserInterface) proposed by the simulation perspective to run simulations.
1. The second way, detailed on this [page](Launching), allows to automatically launch an experiment when opening GAMA, subsequently using the same [user interface](ExperimentsUserInterface).
1. The last way, known as running [headless experiments](RunningHeadless), does not make use of the user interface and allows to manipulate GAMA entirely from the command line.

All three ways are strictly equivalent in terms of computations (with the exception of the last one omitting all the computations necessary to render simulations on displays or in the UI). They simply differ by their usage:

1. The first one is heavily used when designing models or demonstrating several models.
1. The second is intended to be used when demonstrating or experimenting a single model.
1. The last one is useful when running large sets of simulations, especially over networks or grids of computers.


## Generic knowledge to start GAMA Headless

There are two ways to run a GAMA experiment in headless mode: using a dedicated bash wrapper (recommended) or directly from the command line. 


### Bash Wrapper
The file can be found in the `headless` directory located inside the [GAMA's installed folder](Installation). It is named `gama-headless.sh` on macOS and Linux, or `gama-headless.bat` on Windows.

```
 bash gama-headless.sh [m/c/t/hpc/v] $1 $2
```

* with:
	* $1 input parameter file : an xml file determining experiment parameters and attended outputs
	* $2 output directory path : a directory which contains simulation results (numerical data and simulation snapshot)
	* options [-m/c/t/hpc/v]
		* -m memory : memory allocated to gama
		* -c : console mode, the simulation description could be written with the stdin
		* -t : tunneling mode, simulation description are read from the stdin, simulation results are printed out in stdout
		* -hpc nb_of_cores : allocate a specific number of cores for the experiment plan
		* -v : verbose mode. trace are displayed in the console 


* For example (using the provided sample), navigate in your terminal to the `headless` folder inside your GAMA root folder and type:

```
bash gama-headless.sh samples/predatorPrey.xml outputHeadLess
```

As specified in **predatorPrey.xml**, this command runs the prey - predator model for 1000 steps and record a screenshot of the main display every 5 steps. The screenshots are recorded in the directory `outputHeadLess` (under the GAMA root folder).


Note that the current directory to run gama-headless command must be $GAMA\_PATH/headless

### Java Command

```
java -cp $GAMA_CLASSPATH -Xms512m -Xmx2048m -Djava.awt.headless=true org.eclipse.core.launcher.Main -application msi.gama.headless.id4 $1 $2
```

* with:
  * $GAMA\_CLASSPATH GAMA classpath: contains the relative or absolute path of jars inside the GAMA plugin directory and jars created by users
  * $1 input parameter file: an XML file determining experiment parameters and attended outputs
  * $2 output directory path: a directory which contains simulation results (numerical data and simulation snapshot)

Note that the output directory is created during the experiment and should not exist before.