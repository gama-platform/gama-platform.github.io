---
title:  Headless Batch
---


## Getting started

This headless mode is the _Batch_ one. 

The advantage of this mode is how easily it is to prepare and launch, contrarily to the [Headless Legacy](HeadlessLegacy), this mode does not need any other file than the GAML file holding the experiment of _type_ [**batch**](BatchExperiments).

You can run your gama experiment with a command similar to this:
```bash 
./gama-headless.sh [option] -batch experimentName /path/to/file.gaml
```
* with:
  * `-batch`: the flag that indicates it is a batch exploration
  * `experimentName`: the name of your batch experiment in the following file
  * `/path/to/file.gaml`: the path (relative or absolute) to the batch experiment

## Simulation Output

Unfortunatly, this mode can't save output data automatically, the actual way to do is saving wanted data inside CSV files from your model.

## Calling GAMA headless on Windows

The example below assumes that your GAMA application is in folder `D:\software\` and your project (model) file is in folder `D:\my_models\`


### Windows PowerShell

* You can open Windows PowerShell, change your directory to the headless folder and run gama-headless command:
```bash
cd D:\software\GAMA_1.9.0_Windows_with_JDK\headless\
.\gama-headless.bat -batch Optimization D:\my_models\predatorPrey\predatorPrey.gaml
```

### Command Prompt


* You can open Command Prompt, change your directory to the headless folder and run gama-headless command:
```bash
cd D:\software\GAMA_1.9.0_Windows_with_JDK\headless\
gama-headless.bat -batch Optimization D:\my_models\predatorPrey\predatorPrey.gaml
```


### Python Script

* Your python script will have the following lines of code, mainly using the `os` package to run the native system commands

```python
import os
os.chdir("D:\software\GAMA_1.9.0_Windows_with_JDK\headless")
os.system("gama-headless.bat -batch Optimization D:\my_models\predatorPrey\predatorPrey.gaml") 
```
