---
title:  Calling gama from another program
---


This tutorial presents an example for using Headless. The tutorial shows how to use Headless Legacy mode, Headless batch and Headless server.
All the files related to this tutorial (images and models) are available in the Headless folder (headless/samples/predatorPrey).

## 1. Example using python with Headless legacy
 
```python
import os

GAMA_folder_with_SDK = r"D:\software\GAMA_1.9.2_Windows_with_JDK\headless"

Model_file = GAMA_folder_with_SDK + r"\samples\predatorPrey\predatorPrey.gaml"

ExperimentName = "prey_predator"
XML_file = GAMA_folder_with_SDK + r"\samples\predatorPrey.xml"
Output_folder = GAMA_folder_with_SDK + r"\samples\predatorPrey"

os.chdir(GAMA_folder_with_SDK)
os.system("gama-headless.bat -xml " + ExperimentName + " " + Model_file + " " + XML_file)
os.system("gama-headless.bat " + XML_file + " "+ Output_folder)
print("Results of the model is in the folder:" + Output_folder)
print("Snapshot is store in the folder:" + Output_folder + r"\snapshot")
```
The results of the experiment is stored in the set folder. In which the snapshot for every step is also saved in the snapshot folder.
![Snapshot folder of Headless legacy](https://user-images.githubusercontent.com/11825516/232184826-53d83320-6cc2-4025-b619-632eb10739d2.png)


## 2. Example on using python with Headless batch

```python
import os
GAMA_folder_with_SDK = r"D:\software\GAMA_1.9.2_Windows_with_JDK\headless"

Model_file = GAMA_folder_with_SDK + r"\samples\predatorPrey\predatorPrey.gaml"

ExperimentName = "Optimization"

os.chdir(GAMA_folder_with_SDK)
os.system("gama-headless.bat -batch " + ExperimentName + " " + Model_file)

print("The result is store in the file:" + GAMA_folder_with_SDK + r"\samples\predatorPrey\results.csv")
```

## 3. Example on using python with Headless server 

The legacy version allows you to access the headless feature of GAMA by controling the model parameters and experiment plan from oustide GAMA model file . The headless batch, allows you to access the headless feature of GAMA with the model parameters and experiment plans defined inside the GAMA model file. The headless server, allows you to not only to access the headless feature but also to interact with the currently running GAMA experiment. You can load, play, pause, reload, stop and exit an experiment with very specific commands as described [here](https://github.com/gama-platform/gama/wiki/HeadlessServer#available-commands).

The general sequence of operations is:
* Start the server from a command line `gama-headless.sh -socket 6868` , this opens the communication via port 6868 using websockets.
* Connect to the server from another application/script that supports interacting with websockets. e.g., python. See below to use a python wrapper.
* Start with the `load` command to load an experiment and then use one of the specific commands as described [here](https://github.com/gama-platform/gama/wiki/HeadlessServer#available-commands) to construct a sequence of operations as required by your workflow. 


### Start the GAMA server

On your command line, execute the following commmand, you will find the gama-headless.sh in the headless folder inside your GAMA installation.

```bash
gama-headless.sh -socket 6868
```
### Use the Python wrapper instead

The GAMA developers have made available an elegant python wrapper that simplifies using GAMA server with python scripts and is available [here](https://github.com/gama-platform/Gama-client-python). However if you are not a serious programmer and just want to use this tool, the following bare minimum code shall get you started and you can slowly add one command after another to build your sequence of operations to interact with the GAMA server. Before you can start, you have to install the wrapper. In your python environment, install the **gama-client** package with the command:

`pip install gama-client`

You can check that everything went well by opening a python console and try the following line:

`from gama_client.base_client import GamaBaseClient`

If you don't see any error messages, then the python wrapper has been installed correctly. 

### Bare minimum code

The whole interaction with the GAMA server is facilitated using the `asyncio` library in Python and our wrapper that we installed in the previous step. The discussion on use of asyncio is beyond the scope of this tutorial, so just take it as granted. This whole interaction can be considered a dialouge (two way communication) between the client (you/ your script) and the server (GAMA server). You send a command to the server, and the server sends back a message. You parse this message and its contents and construct the next command to interact with the server. This back and forth continues untill you use the `exit` command or if an error occurs on the server. 

Among all the messages sent by the server, as a beginner you should know about these four main messages: `ConnectionSuccessful` (you connected to the server), `CommandExecutedSuccessfully` (your command was well received and executed), `UnableToExecuteRequest` (something is wrong with your model), `MalformedRequest` (something is wrong with your command format) 

Just run the following python script and if all goes well, you are ready to use the GAMA server via python. 
 
```python

import asyncio
from gama_client.base_client import GamaBaseClient

async def message_handler(message):
    print("received message:", message)


async def main():
    client = GamaBaseClient("localhost", 6868, message_handler)
    await client.connect(False)

    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())
```

### It gets even better !

**A word of caution** 
It is recommended that you slowly build on to the above script by adding [commands](https://github.com/gama-platform/gama/wiki/HeadlessServer#available-commands) step by step. You may use the script below as guidance to learn and to stay on course and not having to search a lot through the documentation. Blindly copy-pasting  the code and changing the parameters without understanding is not advised.  

The python wrapper makes it even easier for beginners. So easy that you just have to change values of the following 5 variables in the sample python script below to make use of GAMA server.

```
    MY_SERVER_URL = "localhost"
    MY_SERVER_PORT = 6868
    GAML_FILE_PATH_ON_SERVER = r"D:\Gama\headless\samples\predatorPrey\predatorPrey.gaml"  
    EXPERIMENT_NAME = "prey_predatorExp"
    MY_EXP_INIT_PARAMETERS = [{"type": "int", "name": "nb_preys_init", "value": 100}]
```


#### Sample python script


```python
import asyncio
from asyncio import Future
from typing import Dict

from gama_client.base_client import GamaBaseClient
from gama_client.command_types import CommandTypes
from gama_client.message_types import MessageTypes

experiment_future: Future
play_future: Future
pause_future: Future
expression_future: Future
step_future: Future
stop_future: Future


async def message_handler(message: Dict):
    print("received", message)
    if "command" in message:
        if message["command"]["type"] == CommandTypes.Load.value:
            experiment_future.set_result(message)
        elif message["command"]["type"] == CommandTypes.Play.value:
            play_future.set_result(message)
        elif message["command"]["type"] == CommandTypes.Pause.value:
            pause_future.set_result(message)
        elif message["command"]["type"] == CommandTypes.Expression.value:
            expression_future.set_result(message)
        elif message["command"]["type"] == CommandTypes.Step.value:
            step_future.set_result(message)
        elif message["command"]["type"] == CommandTypes.Stop.value:
            stop_future.set_result(message)


async def main():

    global experiment_future
    global play_future
    global pause_future
    global expression_future
    global step_future
    global stop_future

    # Experiment and Gama-server constants
    MY_SERVER_URL = "localhost"
    MY_SERVER_PORT = 6868
    GAML_FILE_PATH_ON_SERVER = r"D:\Gama\headless\samples\predatorPrey\predatorPrey.gaml"
    EXPERIMENT_NAME = "prey_predatorExp"
    MY_EXP_INIT_PARAMETERS = [{"type": "int", "name": "nb_preys_init", "value": 100}]

    client = GamaBaseClient(MY_SERVER_URL, MY_SERVER_PORT, message_handler)

    print("connecting to Gama server")
    await client.connect()

    print("initialize a gaml model")
    experiment_future = asyncio.get_running_loop().create_future()
    await client.load(GAML_FILE_PATH_ON_SERVER, EXPERIMENT_NAME, True, True, True, MY_EXP_INIT_PARAMETERS)
    gama_response = await experiment_future

    try:
        experiment_id = gama_response["content"]
    except Exception as e:
        print("error while initializing", gama_response, e)
        return

    print("initialization successful, running the model")
    play_future = asyncio.get_running_loop().create_future()
    await client.play(experiment_id)
    gama_response = await play_future
    if gama_response["type"] != MessageTypes.CommandExecutedSuccessfully.value:
        print("error while trying to run the experiment", gama_response)
        return

    print("model running, waiting a bit")
    await asyncio.sleep(2)

    print("pausing the model")
    pause_future = asyncio.get_running_loop().create_future()
    await client.pause(experiment_id)
    gama_response = await pause_future
    if gama_response["type"] != MessageTypes.CommandExecutedSuccessfully.value:
        print("Unable to pause the experiment", gama_response)
        return

    expression_future = asyncio.get_running_loop().create_future()
    await client.expression(experiment_id, r"cycle")
    gama_response = await expression_future
    print("asking simulation the value of: cycle=", gama_response["content"])

    expression_future = asyncio.get_running_loop().create_future()
    await client.expression(experiment_id, r"nb_preys/nb_preys_init")
    gama_response = await expression_future
    print("asking simulation the value of: nb_preys/nb_preys_init=",  gama_response["content"])

    print("asking gama to run 10 more steps of the experiment")
    step_future = asyncio.get_running_loop().create_future()
    await client.step(experiment_id, 10, True)
    gama_response = await step_future
    if gama_response["type"] != MessageTypes.CommandExecutedSuccessfully.value:
        print("Unable to execute 10 new steps in the experiment", gama_response)
        return

    expression_future = asyncio.get_running_loop().create_future()
    await client.expression(experiment_id, r"cycle")
    gama_response = await expression_future
    print("asking simulation the value of: cycle=", gama_response["content"])

    print("killing the simulation")
    stop_future = asyncio.get_running_loop().create_future()
    await client.stop(experiment_id)
    gama_response = await stop_future
    if gama_response["type"] != MessageTypes.CommandExecutedSuccessfully.value:
        print("Unable to stop the experiment", gama_response)
        return


if __name__ == "__main__":
    asyncio.run(main())
```