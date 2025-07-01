---
title:   Headless mode for dummies
---


## Overview

This tutorial presents the headless mode usage of GAMA. We will execute the Predator-Prey model, already presented in [this tutorial](PredatorPrey_step1).
Headless mode is documented [in its dedicated part](RunningHeadless), here, we focus on the definition of an experiment plan, where the model is run several times. We only consider the shell script execution, not the java command execution.

In headless-mode, GAMA can be seen as any shell command, whose behavior is controlled by passing arguments to it.
You must provide 2 arguments : 

* an **input experiment file**, used to describe the execution plan of your model, its inputs and the expected outputs.
* an **output directory**, where the results of the execution are stored
 
Headless-mode is a little more technical to handle than the general GAMA use-case, and the following commands and code have been solely tested on a Linux Ubuntu 22.04 machine with the default GAMA 1.9.2 (installer version, with embedded JDK).

You may have to perform some adjustments (such as paths definition) according to your machine, OS, java and GAMA versions and so on.



## Setup 

### GAMA version

Headless mode is frequently updated by GAMA developers, so you have to get the very latest build version of GAMA. You can download it here  [https://github.com/gama-platform/gama/releases](https://github.com/gama-platform/gama/releases) Be sure to pick the **Continuous build**  version (The name looks like `GAMA1.7_Linux_64_02.26.17_da33f5b.zip`) and **not** the major release, e.g. `GAMA1.7_Linux_64.zip`.
Big note on Windows OS (maybe on others), GAMA must be placed outside of several sensible folders (Program Files, Program Filesx64, Windows).  RECOMMENDED: Place GAMA in Users Folder of windows OS.

### gama-headless.sh script setup


The `gama-headless.sh` script can be found under the `headless` directory, in GAMA installation directory e.g. : `~/GAMA/headless/`


### Modifying the script (a little bit)

The original script looks like this: 
```bash
#! /bin/bash
memory=2048m
declare -i i	

i=0
echo ${!i}	

for ((i=1;i<=$#;i=$i+1))
do
if test ${!i} = "-m"
then
    i=$i+1
    memory=${!i}
else
    PARAM=$PARAM\ ${!i}
    i=$i+1
    PARAM=$PARAM\ ${!i}
fi
done	

echo "******************************************************************"
echo "* GAMA version 1.9.2                                             *"
echo "* http://gama-platform.org                                       *"
echo "* (c) 2007-2023 UMI 209 UMMISCO IRD/UPMC & Partners              *"
echo "******************************************************************"
passWork=.work$RANDOM	

java -cp ../plugins/org.eclipse.equinox.launcher*.jar -Xms512m -Xmx$memory  -Djava.awt.headless=true org.eclipse.core.launcher.Main  -application msi.gama.headless.id4 -data $passWork $PARAM $mfull $outputFile
rm -rf $passWork
```

Notice the final command of the script `rm -rf $passWork`. It is intended to remove the temporary file used during the execution of the script. For now, we should comment this commmand, in order to check the logs if an error appears: `#rm -rf $passWork`

### Setting the experiment file


Headless mode uses a XML file to describe the execution plan of a model. An example is given in the [headless mode documentation page](RunningHeadless).

The script looks like this :
**N.B. this version of the script, given as an example, is deprecated**
```xml
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

As you can see, you need to define 3 things in this minimal example:

* Simulation:  its id, path to the model, finalStep (or stop condition), and name of the experiment
* Parameters name, of the model for *this* simulation (i.e. Simulation of id= 2)
* Outputs of the model: their id, name, type, and the rate (expressed in cycles) at which they are logged in the results file during the simulation


We now describe how to constitute your experiment file.

## Experiment File: Simulation

### id

For now, we only consider one single execution of the model, so the simulation `id` is not critical, let it unchanged.
Later example will include different simulations in the same experiment file.
Simulation `id` is a string. Don't introduce weird symbols into it. 

### sourcePath 

`sourcePath` is the relative (or absolute) path to the model file you want to execute headlessly.

Here we want to execute the [fourth model of the Predator Prey tutorial suite](PredatorPrey_step4), located in `~/GAMA/plugins/msi.gama.models_1.7.0.XXXXXXXXXXXX/models/Tutorials/Predator Prey/models` (with XXXXXXXXXXXX replaced by the number of the release you downloaded)
  
So we set `sourcePath="../plugins/msi.gama.models_1.7.0.201702260518/models/Tutorials/Predator Prey/models/Model 07.gaml"`  (Remember that the headless script is located in `~/GAMA/headless/`)
 
Depending on the directory you want to run the `gama-headless.sh` script, sourcePath must me modified accordingly.
Another workaround for shell more advanced users is to define a  `$GAMA_PATH`, `$MODEL_PATH` and `$OUPUT_PATH` in `gama-headless.sh` script.
Don't forget the quotes `"` around your path.

### finalStep

The duration, in cycles, of the simulation. 

### experiment

This is the name of (one of) the experiment statement at the end of the model code.

In our case there is only one, called `prey_predator` and  it looks like this :

```
experiment prey_predator type: gui {
	parameter "Initial number of preys: " var: nb_preys_init min: 1 max: 1000 category: "Prey" ;
	parameter "Prey max energy: " var: prey_max_energy category: "Prey" ;
	parameter "Prey max transfert: " var: prey_max_transfert  category: "Prey" ;
	parameter "Prey energy consumption: " var: prey_energy_consum  category: "Prey" ;
	output {
		display main_display {
			grid vegetation_cell lines: #black ;
			species prey aspect: base ;
		}
		monitor "Number of preys" value: nb_preys ;
	}
}  
```

So we are now able to constitute the entire Simulation tag: 

```xml
<Simulation id="2" sourcePath="~/GAMA/plugins/msi.gama.models_1.7.0.201702260518/models/Tutorials/Predator Prey/models/Model 01.gaml" finalStep="1000" experiment="prey_predator">
```
	

N.B. the numbers after `msi.gama.models` (the number of your GAMA release actually) have to be adapted to your own release of GAMA number.
The path to the GAMA installation directory has also to be adapted of course.


## Experiment File: Parameters

The parameters section of the experiment file describes the parameters names, types and values to be passed to the model for its execution.

Let's say we want to fix the number of preys and their max energy  for this simulation.
We look at the experiment section of the model code and use their **title**. 
The title of a parameter is the name that comes right after the `parameter` statement. In our case,  the strings "Initial number of preys: " and "Prey max energy: " (Mind the spaces, quotes and colon)


The parameters section of the file would look like :
```xml
<Parameters>
	<Parameter name="Initial number of preys: " type="INT" value="621" />
	<Parameter name="Prey max energy: " type="FLOAT" value="1.0" />
</Parameters>
```

Any declared parameter can be set this way, yet you don't have to set all of them, provided they are initialized with a default value in the model (see the global statement part of the model code).



## Experiment File: Outputs


Output section of the experiment file is pretty similar to the previous one, except for the `id` that have to be set for each of the outputs .

We can log some of the declared outputs  : `main_display` and `number_of_preys`.

The outputs section would look like the following:
```xml
<Outputs>
	<Output id="1" name="main_display" framerate="10" />
	<Output id="2" name="Number of preys" framerate="1" />
</Outputs>
```

Outputs must have an id, a name, and a framerate.

* `id` is a number that identifies the output
* framerate is the rate at which the output is written in the result file. It's a number of cycle of simulation (integer). In this example the display is saved every 10 cycle
* `name` is either the "title" of the corresponding monitor. In our case, the second output's is the title of the monitor `"Number of preys"`, i.e. "Number of preys"

We also save a **display** output, that is an image of the simulation graphical display named `main_display` in the code of the model. Theses images is what you would have seen if you had run the model in the traditional GUI mode.




## Execution and results

Our new version of the experiment file is ready : 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Experiment_plan>
	<Simulation id="2" sourcePath="/absolute/path/to/your/model/file/Model 04.gaml" finalStep="1000" experiment="prey_predator">
		<Parameters>
			<Parameter name="Initial number of preys: " type="INT" value="621" />
			<Parameter name="Prey max energy: " type="FLOAT" value="1.0" />
		</Parameters>
		<Outputs>
			<Output id="1" name="main_display" framerate="10" />
			<Output id="2" name="Number of preys" framerate="1" />
		</Outputs>
	</Simulation>
</Experiment_plan>
```



### Execution 


We have to launch the `gama-headless.sh` script and provide two arguments : the experiment file we just completed and the path of a directory where the results will be written.

**Warning** In this example ,we are lazy and define the source path as the absolute path to the model we want to execute. If you want to use a relative path, note that it has to be define relatively to the location of your **ExperimentFile.xml location** (and the location where you launched the script)



In a terminal, position yourself in the headless directory : `~/GAMA/headless/`.

Then type the following command:  
	
```bash 
gama-headless.sh -v ~/a/path/to/MyExperimentFile.xml  /path/to/the/desired/output/directory  
```

And replace paths by the location of your ExperimentFile and output directory

You should obtain the following output in the terminal : 

```
******************************************************************
* GAMA version 1.7.0 V7                                          *
* http://gama-platform.org                                       *
* (c) 2007-2016 UMI 209 UMMISCO IRD/UPMC & Partners              *
******************************************************************
>GAMA plugin loaded in 2927 ms: 	msi.gama.core
>GAMA plugin loaded in 67 ms: 	ummisco.gama.network
>GAMA plugin loaded in 56 ms: 	simtools.gaml.extensions.traffic
>GAMA plugin loaded in 75 ms: 	simtools.gaml.extensions.physics
>GAMA plugin loaded in 1 ms: 	irit.gaml.extensions.test
>GAMA plugin loaded in 75 ms: 	ummisco.gaml.extensions.maths
>GAMA plugin loaded in 47 ms: 	msi.gaml.extensions.fipa
>GAMA plugin loaded in 92 ms: 	ummisco.gama.serialize
>GAMA plugin loaded in 49 ms: 	irit.gaml.extensions.database
>GAMA plugin loaded in 2 ms: 	msi.gama.lang.gaml
>GAMA plugin loaded in 1 ms: 	msi.gama.headless
>GAMA plugin loaded in 103 ms: 	ummisco.gama.java2d
>GAMA plugin loaded in 189 ms: 	msi.gaml.architecture.simplebdi
>GAMA plugin loaded in 129 ms: 	ummisco.gama.opengl
>GAMA building GAML artefacts>GAMA total load time 4502 ms.
 in 714 ms
cpus :8
Simulation is running...
....................................................................................................
Simulation duration: 7089ms
```

### Results 

The results are stored in the output directory you provided as the second argument of the script.

3 items have appeared:

* A `console_output.txt` file, containing the output of the GAMA console of the model execution if any
* a XML file `simulation-outputXX.xml`, where XX is the `id` number of your simulation. In our case it should be 2.
* the folder `snapshots` containing the screenshots coming from the second declared output : `main_display`. image name format is `main_display[id]_[cycle].png`.

The values of the monitor "Number of preys" are stored in the xml file `simulation-outputXX.xml`



## Common error messages 


`Exception in thread "Thread-7" No parameter named prey_max_energy in experiment prey_predator`
Probably a typo in the name or the title of a parameter. check spaces, capital letters, symbols and so on.


`java.io.IOException: Model file does not exist: /home/ubuntu/dev/tutoGamaHeadless/../plugins/msi.gama.models_1`
This may be a relative path mistake; try with absolute path.

`java.lang.NumberFormatException: For input string: "1.0"`
This may be a problem of type declaration in the parameter section. 


## Going further 

### Experiments of several simulation

You can launch several simulation by replicating the simulation declaration in your ExperimentFile.xml and varying the values of the parameters.
Since you will have to edit the experiment file by hand, you should do that only for a reasonable number of simulations (e.g. &lt;10 )



### Design of experiments plans

For more systematic parameter values samples, you should turn towards a more adapted tool such as GAMAR, to generate a `ExperimentFile.xml` with a huge number of simulations.


