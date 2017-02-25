---
layout: default
title: Headless Mode
wikiPageName: Headless
wikiPagePath: wiki/Headless.md
---

# Headless Mode

The aim of this feature is to be able to run one or multiple instances of GAMA without any user interface, so that models and experiments can be launched on a grid or a cluster. Without GUI, the memory footprint, as well as the speed of the simulations, are usually greatly improved.

In this mode, GAMA can only be used to run experiments and that editing or managing models is not possible. In order to launch experiments and still benefit from a user interface (which can be used to prepare headless experiments), launch GAMA normally (see [here](G__Launching)) and refer to this [page](G__RunningExperiments) for instructions.

## Table of contents 

* [Headless Mode](#headless-mode)
	* [Command](#command)
		* [Shell Script](#shell-script)
		* [Java Command](#java-command)
	* [Experiment Input File](#experiment-input-file)
		* [Heading](#heading)
		* [Parameters](#parameters)
		* [Outputs](#outputs)
	* [Output Directory](#output-directory)
	* [Simulation Output](#simulation-output)
		* [Step](#step)
		* [Variable](#variable)
	* [Snapshot files](#snapshot-files)


## Command

There are two ways to run a GAMA experiment in headless mode: using a dedicated shell script (recommended) or directly from the command line. These commands take 2 arguments: an experiment file and an output directory.

### Shell Script
It can be found in the `headless` directory located inside `Gama`. Its name is `gama-headless.sh` on MacOSX and Linux, and `gama-headless.bat` on Windows.

```
 sh gama-headless.sh [m/c/t/hpc/v] $1 $2
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


* For example (using the provided sample), navigate in your terminal to the GAMA root folder and type :

```
sh headless/gama-headless.sh headless/samples/predatorPrey.xml outputHeadLess
```

As specified in **predatorPrey.xml**, this command runs the prey - predator model for 1000 steps and record a screenshot of the main display every 5 steps. The screenshots are recorded in the directory outputHeadLess (under the GAMA root folder).


Not that the current directory to run gama-headless command must be $GAMA\_PATH/headless

### Java Command

```
java -cp $GAMA_CLASSPATH -Xms512m -Xmx2048m -Djava.awt.headless=true org.eclipse.core.launcher.Main -application msi.gama.headless.id4 $1 $2
```

* with:
	* $GAMA\_CLASSPATH gama classpath: contains relative or absolute path of jars inside the gama plugin directory and jars created by users
	* $1 input parameter file: an xml file determining experiment parameters and attended outputs
	* $2 output directory path: a directory which contains simulation results (numerical data and simulation snapshot)

Note that the output directory is created during the experiment and should not exist before.




## Experiment Input File

The XML input file contains for example:

```
<?xml version="1.0" encoding="UTF-8"?>
<Experiment_plan>
 <Simulation id="2" sourcePath="./predatorPrey/predatorPrey.gaml" finalStep="1000" experiment="predPrey">
  <Parameters>
    <Parameter name="nb_predator_init" type="INT" value="53" />
    <Parameter name="nb_preys_init" type="INT" value="621" />
  </Parameters>
  <Outputs>
    <Output id="1" name="main_display" framerate="10" />
    <Output id="2" name="number_of_preys" framerate="1" />
    <Output id="3" name="number_of_predators" framerate="1" />
    <Output id="4" name="duration" framerate="1" />
  </Outputs>
 </Simulation>
</Experiment_plan>
```
Note that several simulations could be determined in one experiment plan. These simulations are run in parallel according to the number of allocated cores.

### Heading

```
<Simulation id="2" sourcePath="./predatorPrey/predatorPrey.gaml" finalStep="1000" experiment="predPrey">
```

* with:
	* `id`: permits to prefix output files for experiment plan with huge simulations.
	* `sourcePath`: contains the relative or absolute path to read the gaml model.
	* `finalStep`: determines the number of simulation step you want to run.
	* `experiment`: determines which experiment should be run on the model. This experiment should exist, otherwise the headless mode will exit.

### Parameters
One line per parameter you want to specify a value to:

```
<Parameter name="nb_predator_init" type="INT" value="53" />
```

  * with:
    * `name`:  name of the parameter in the gaml model
    * `type`:  type of the parameter (INT, FLOAT, BOOLEAN, STRING)
    * `value`: the chosen value

### Outputs
One line per output value you want to retrieve. Outputs can be names of monitors or displays defined in the 'output' section of experiments, or the names of attributes defined in the experiment or the model itself (in the 'global' section).

```
    ... with the name of a monitor defined in the 'output' section of the experiment...
    <Output id="2" name="number_of_preys" framerate="1" />
    ... with the name of a (built-in) variable defined in the experiment itself...
    <Output id="4" name="duration" framerate="1" />
```

* with:
	* `name` : name of the output in the 'output'/'permanent' section in the experiment or name of the experiment/model attribute to retrieve
	* `framerate` : the frequency of the monitoring (each step, each 2 steps,  each 100 steps...).

* Note that :
	* the lower the framerate value the longer the experiment.
	* if the chosen output is a display, an image is produced and the output file contains the path to access this image



## Output Directory
During headless experiments, a directory is created with the following structure:

```
Outputed-directory-path/
    |-simulation-output.xml
    |- snapshot
          |- main_display2-0.png
          |- main_display2-10.png
          |- ...

```
* with:
	* `simulation-output.xml`: containing the results
	* `snapshot`: containing the snapshots produced during the simulation

Is it possible to change the output directory for the images by adding the attribute "output_path" in the xml : 

If we write `<Output id="1" name="my_display" file:"/F:/path/imageName" framerate="10" />`, then the display "my_display" will have the name "imageName-stepNb.png" and will be written in the folder "/F:/path/"

## Simulation Output
A file named `simulation-output.xml` is created with the following contents when the experiment runs.

```
<?xml version="1.0" encoding="UTF-8"?>
<Simulation id="2" >
	<Step id='0' >
		<Variable name='main_display' value='main_display2-0.png'/>
		<Variable name='number_of_preys' value='613'/>
		<Variable name='number_of_predators' value='51'/>
                <Variable name='duration' value='6' />
	</Step>
	<Step id='1' >
		<Variable name='main_display' value='main_display2-0.png'/>
		<Variable name='number_of_preys' value='624'/>
		<Variable name='number_of_predators' value='51'/>
                <Variable name='duration' value='5' />
	</Step>
        <Step id='2'>

...
```

* With:
	* `<Simulation id="2" >` : block containing results of the simulation 2 (this Id is identified in the Input Experiment File)
	* `<Step id='1' > ... </Step>`: one block per step done. The id corresponds to the step number

### Step
```
	<Step id='1' >
		<Variable name='main_display' value='main_display2-0.png'/>
		<Variable name='number_of_preys' value='624'/>
		<Variable name='number_of_predators' value='51'/>
                <Variable name='duration' value='6' />
	</Step>

```

There is one Variable block per Output identified in the output experiment file.

### Variable

```
 <Variable name='main_display' value='main_display2-0.png'/>
```

* with:
	* `name`: name of the output, the model variable
	* `value`: the current value of model variable.

Note that the value of an output is repeated according to the framerate defined in the input experiment file.




## Snapshot files
This directory contains images generated during the experiment. There is one image per displayed output per step (according to the framerate). File names follow a naming convention, e.g:

```
   [outputName][SimulationID]_[stepID].png -> main_display2-20.png
```

Note that images are saved in '.png' format.
