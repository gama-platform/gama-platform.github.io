---
title:  Headless Server
---


## Running a Gama Headless server:

Before doing anything, make sure that you possess the rights to create files and directories at the location you are running gama-server because it will need it to create workspaces on the fly.

### From the release
Go to the `headless` directory in your Gama installation folder and run the script `gama-headless.sh` (or `gama-headless.bat`) with the argument `-socket` followed by the port number you want your Gama server to run on.

For example on Mac OS you could do:

```bash
cd Gama.app/Contents/headless
```

to move to the right directory, then run the script to listen on port `6868` with:

```bash 
gama-headless.sh -socket 6868
```

### From the command-line tool

The users who installed gama through a `.deb` file or `aur` have access to the command `gama-headless` and thus only need to open a terminal and run 
```bash
gama-headless -socket 6868
``` 
to run a Gama server on the port `6868`. 

### From the source code
In Eclipse, instantiate a headless server by running ```msi.gama.headless.id4_full``` with the following argument ```-os ${target.os} -ws ${target.ws} -arch ${target.arch} -nl ${target.nl} -socket 6868``` (you can specify any other port)

### From docker

First ensure to pull the official docker image 

```bash
docker pull gamaplatform/gama:<version>
```

Then, run the container with the image you just pulled.

Do not forget to (1) expose the port you're starting your server on, and (2) mount your workspace inside the started container as below :

```bash
docker run -v <path/to/your/workspace>:/working_dir -p 6868:6868 gamaplatform/gama:<version> -socket 6868
```

For more informations, please refer to [Docker's official documentation](https://docs.docker.com/engine/reference/commandline/run/) or [GAMA image's repository](https://github.com/gama-platform/gama.docker).


## Connection

To connect to gama-server as a client you just need to access the following address: `ws://<ip>:<port>`. For example if you try to connect to a gama-server running on your current computer and started with the command `gama-headless -socket 6868`, you will have to connect to `ws://localhost:6868`.

Once a client is connected, gama-server will send a json object of type `ConnectionSuccessful`.

## General description of interactions

Once connected, you can ask gama-server to execute different commands to control the execution of different simulations. 

If you close your client application (or just close the socket on client-side) **gama-server will destroy all running simulations** of that client, so you have to keep your client alive. 

For every command treated by gama-server, it will send back a json object describing if the command has been executed correctly or if there was a problem. If an unexpected exception is raised in gama-server, it will try to send the connected clients a json-object describing it. 
The same goes if a simulation throws an exception/error while running, the client that asked for it to run will receive it as a json-object. 

In addition, the client can ask gama-server to receive (or not) the different outputs of a simulation: `write` statements, dialogs, status-bar changes etc. they will be sent as they come, in a specific json wrapper.

## Available commands

All the commands sent to gama-server must be formatted as a `json` object. 

The available commands are:

### The `exit` command

This command is used to kill gama-server. 
It is triggered by sending a json object formatted as follows to the server
```json
{
  "type": "exit"
}
```
#### Answer from gama-server
It is the only command that won't send back a json object.

### The `load` command
This command is used to ask the server to initialize a specific experiment in a gaml file on the server's file-system.
It is triggered by sending a json object formatted as follows to the server:
```yaml
{
  "type": "load",
  "model": "<gaml_file_path>",
  "experiment": "<experiment_name>",
  "console": "<console>", //optional
  "status": "<status>", //optional
  "dialog": "<dialog>", //optional
  "runtime": "<runtime>",//optional
  "parameters": "<params>", //optional
  "until": "<end_condition>", //optional
}
```
The `model` parameter indicates the path of the experiment file on the server's file-system, and `experiment` is the actual name of the experiment to run.
The four parameters `console`, `status`, `dialog` and `runtime` are booleans used to determine if the messages from respectively the console, the status-bar, the dialogs and the runtime errors should be redirected to the client. They are optional as per default `console` and `runtime` are set to `true` and the two others to `false`. 
You can add an array of parameters that will be used to initialize the experiment's variables with the values you picked.
The value of `parameters` should be formatted as follows:
```yaml
[
  {
    "type": "<type of the first parameter>",
    "value": "<value of the first parameter>",
    "name": "<name of the first parameter in the gaml file>"
  },
  {
    "type": "<type of the second parameter>",
    "value": "<value of the second parameter>",
    "name": "<name of the second parameter in the gaml file>"
  },
 ...
]
```

You can also add an ending condition to your simulation with the parameter `until`, the condition must be expressed in gaml.

#### Answer from gama-server
The `content` field of the response json sent by gama-server after processing this command will directly contain the `experiment_id` value stored as a string.
The experiment id should be used in all the other commands to refer to that specific experiment in order to control it.

### The `play` command

This command is used to actually run an experimented already initialized.
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "play",
  "exp_id": "<experiment_id>",
  "sync": "<synchronized>", //optional
}
```

The `experiment_id` is used to identify the experiment to play, and the optional `sync` is a boolean used in the case where there was an end condition defined in the `load` command, if it is true, gama-server will not send a response to the command, but only a end of simulation message once the condition is reached, if it's false gama-server will send both the response to the command and the `SimulationEnded` message.

#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.
In case where the end condition is reached, a message of type `SimulationEnded` is sent to the client with an empty `content`.


### The `pause` command

This command is used to pause a running experiment.
It is triggered by sending a json object formatted as follows to the server
```json
{
  "type": "pause",
  "exp_id": "<experiment_id>"
}
```

#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.

### The `step` command

This command is used to process one (or a defined number of) step(s) of a simulation that has already been loaded.
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "step",
  "exp_id": "<experiment_id>",
  "nb_step": "<number_of_steps>", //optional
  "sync": "<synchronized>", // optional
}
```
As usual `exp_id` refers to the experiment you want to apply the command to. The `nb_step` parameter indicates how many steps you want to execute, if you do not give that parameter gama-server will execute one step. The `sync` parameter indicates whether gama-server must wait for the end of the step(s) to send back a success message (when its value is true), or just plan the step(s) and send one directly after (when its value is false), this parameter can be ignored and will be interpreted as if it were `false`. 

#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.

### The `stepBack` command

This command is used to rollback the simulation one (or a defined number of) step(s) back. This command only works on experiments of type `memorize`.
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "stepBack",
  "exp_id": "<experiment_id>",
  "nb_step": "<number_of_steps>", //optional
  "sync": "<synchronized>", // optional
}
```

The parameters are exactly the same as in the `step` command.

#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.

### The `stop` command

This command is used to stop (kill) a running experiment.
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "stop",
  "exp_id": "<experiment_id>",
}
```
#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.

### The `reload` command

This command is used to reload an experiment. The experiment will be stop and the initialization process run again. You can use this command to change the simulation parameters or the ending condition. 
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "reload",
  "exp_id": "<experiment_id>",
  "parameters": "<params>", //optional
  "until": "<end_condition>", //optional
}
```
Just like for the `load` command, the `parameters` and the `until` parameters are optional and must follow the same formatting.

#### Answer from gama-server

This command has an empty `content` field in the response json sent by gama-server after processing it.



### The `expression` command

This command is used to ask the server to evaluate a `gaml` expression having an experiment as context.  
It is triggered by sending a json object formatted as follows to the server
```yaml
{
  "type": "expression",
  "exp_id": "<experiment_id>",
  "expr": "<expression to evaluate>"
}
```

For example if you want to know the number of agents of species `people` currently present in the simulation represented by the id `123`, you could send this command to gama-server:
```yaml
{
  "type": "expression",
  "exp_id": "123",
  "expr": "length(people)"
}
```

#### Answer from gama-server
If the command is executed successfully by gama-server the `content` field of the response json will directly contain the result of the evaluated expression as a string.


## Gama-server messages

All messages send by gama-server follow a json architecture that is formatted as follows:
```yaml
{
  "type": "some string describing the type of message",
  "content": "a field containing everything additional information for the message", //It can be a string, an int or a json object
  "exp_id": "contains the experiment id (as a string) to which this message is linked to", //Optional, its presence depends on the message's type
  "command": "a json containing the original command to which gama is responding",//Optional, is only present in messages responding directly to a command sent by the client
}
```

### Messages types
All messages have in common a `type` field that informs the client of the type of message sent.
The different types possibles are:
* `ConnectionSuccessful`: Used when a client connected without any problem to gama-server
* `SimulationStatus`: Signals a message representing a simulation status
* `SimulationStatusInform`: Signals a message representing a simulation inform status
* `SimulationStatusError`: Signals a message representing a simulation error status
* `SimulationStatusNeutral`: Signals a message representing a simulation neutral status
* `SimulationOutput`: Signals a message as would be written in the console by a `write` statement in gama with an interface
* `SimulationDebug`: Signals a message as would be written in the console by a `debug` statement in gama with an interface
* `SimulationDialog`: Signals a message representing what would be a dialog in gama with an interface
* `SimulationErrorDialog`: Signals a message representing what would be an dialog in gama with an interface
* `SimulationError`: Signals a message representing an error raised in a running simulation
* `RuntimeError`: Signals a message representing an exception raised in gama-server while trying to process a command
* `GamaServerError`: Signals a message representing an unknown exception raised in gama-server (can be unrelated to any command)
* `MalformedRequest`: Signals that a command sent by the client doesn't follow the expected format (lack of parameter, wrong type etc.)
* `CommandExecutedSuccessfully`: Signals that a command sent by the client was executed without any problem on gama-server
* `SimulationEnded`: Signals that a running simulation **reached its end condition** and stopped. Beware if the simulation stops for another reason, this message won't be send.
* `UnableToExecuteRequest`: Signals that a command cannot be executed, though it may be formatted correctly. It mainly occurs when trying to execute a command on a simulation that is not currently running.



### Connection related answers

When your client is connected correctly to gama-server, a message is sent. Its **type** is `ConnectionSuccessful` with an empty content.
In case of problem, the client may receive a message of **type** `GamaServerError` or just get a timeout/broken connection message at the socket level.

### Command answers

For every command described in the [commands section](#available-commands), the client will received a json answer formatted as follows:
```yaml
{
  "type": "some string describing the type of message",
  "content": "a field containing every additional information for the message", //It can be a string, an int or a json object, depending on the type of message, it could also be empty
  "command": "a json containing the original command to which gama is responding"
}
```
So for example if you send an expression command to gama, with an `experiment_id` of value **2** and you want to evaluate the expression `length(people)` to know the number of agent **people** in that simulation. You may receive an answer looking like this:
```yaml
{
  "type": "CommandExecutedSuccessfully", //The type indicates that everything went normally
  "content": 102, //There are 102 agents of the species people in your simulation at the time of evaluation
  "command": //The description of the command you sent, as interpreted by gama-server and turned into a json
  {
    "type": "expression",
    "exp_id": "2",
    "expr": "length(people)",
  }
}
```

The `command` field is very useful for clients that run multiple simulations and commands at the same time, as it can be used to retrace which command the message responds to. 
**Note**: The `command` field contains all the parameters of the command sent by the client, including those that are not useful for GAMA to execute the command, you can thus use it to store more data, like an internal id used by the client, some kind of counter etc.. 

In case there is an error resulting from the processing of your command, you may receive an error message of type:
* **MalformedRequest** if you forgot a mandatory parameter to execute the command or gave objects that couldn't be de-serialized. The list of required parameters will be sent as a string in the `content` field.
* **UnableToExecuteRequest** if you are trying to execute a command on a simulation that is not currently running or some other problem of "logic". You will find more informations in the `content` field.
* **RuntimeError** and **GamaServerError** if while executing your command, an exception happens, either in gaml code for **RuntimeError** or in gama's code for **GamaServerError**. The exception's description will be given in the `content` field, as a json object containing the error message and the stack trace.

There is no `exp_id` field in those messages, because it is already included in all the `command` fields that are related to an experiment.

### errors and exceptions

In addition to the error messages you can receive when directly requesting to execute a command (`MalformedRequest`, `UnableToExecuteRequest`) described in the [command answers](#command-answers) section, or the network errors that can be raised for external problems, it is possible that gama-server encounters an exception while running. In that case gama-server will send a json message formatted as described in the [Gama-server messages](#gama-server-messages) section, the two different types would either be `GamaServerError`, `RuntimeError` or `SimulationError` and the `content` field would be filled as follows:
```yaml
{
  "exception": "The java class of the exception",
  "message": "The message describing the problem",
  "stack": [],//The stack trace of the exception given as a list of strings
}
```
the `exp_id` and `command` fields would be present if possible, depending on where the exception happens.

### Simulations outputs

As mentioned in the [introduction](#general-description-of-interactions) and the description of the [load command](#the-load-command). You can ask gama-server to redirect the simulation's outputs. There are 3 different types of output produced by a simulation that you can chose to redirect or not:
* the messages in the dialogs
* the messages in the status-bar
* the messages in the gama console
Each has an associated boolean that you have to set to `true` in the [load command](#the-load-command) in order to have it redirected to the client.

The output messages are sent directly to the client as soon as they are asked by the simulation. The format of the output messages follows the usual [message format](#gama-server-messages). The `exp_id` will always be filled with the current experiment id, the 'command' field won't be present.
The different types of messages possible are:
* for dialog messages: `SimulationDialog` and `SimulationErrorDialog` respectively for normal dialogs and error dialogs
* for status messages: `SimulationStatusNeutral`, `SimulationStatusError`, `SimulationStatusInform`, `SimulationStatus`
* for console messages: `SimulationOutput` for the messages written with the `write` statement and `SimulationDebug` for the ones written with the `debug` statement.

The `content` field will be formatted as follows:
* for dialog messages, it's directly a string containing the message
* for status messages: 
```yaml
{
  "message": "the status message",
  "icon": "the name/path of the associated icon", //only present for some SimulationStatus and SimulationStatusInform messages
  "color": 
  {
    "r": "red value", 
    "g": "green value", 
    "b": "blue value",
  }, // The background color in the status-bar, only present in some SimulationStatus messages
}
```
* for console messages:
```yaml
{
  "message": "the message as it would be written in the console",
  "color": 
  {
    "r": red_value, 
    "g": green_value, 
    "b": blue value,
  }, // The text color
  "cycle": simulation_cycle, // the cycle of the simulation at the moment the debug statement is executed, only for SimulationDebug messages
}
```

## Python wrapper

A python package is available to interact with Gama server as a client, you can find it [here](https://github.com/gama-platform/Gama-client-python). It will take care of formatting the queries to the server and receiving the answers. You simply have to install the package into your python environment with the command `pip install gama-client` and then import `gama_client` into your python files. For more information follow the `README.md` available on the package's github.

## Javascript Client
There is also a javascript client being developed in this repository [gama.client](https://github.com/gama-platform/gama.client)

### Hello World Visualization in MapBox
- Clone the repository [gama.client](https://github.com/gama-platform/gama.client)
- In `js/gama_client.js` edit the following variable `ABSOLUTE_PATH_TO_GAMA` to your local path (e.g `var ABSOLUTE_PATH_TO_GAMA = '/Users/arno/';`) 
- open `index.html`in a browser

### Hello World Message example 
- In `js/simple_syntax.js` edit the following variable `modelPath` to your model's path 
- open `syntax.html`in a browser

## Troubleshooting

### crash on `load` command

It is possible that gama-server starts and accepts connections, but crashes when receiving a `load` command with a message of the type:
```
java.lang.Exception: java.lang.NoClassDefFoundError: org/eclipse/core/resources/ResourcesPlugin
        at org.java_websocket.server.WebSocketServer$WebSocketWorker.run(WebSocketServer.java:1093)
Caused by: java.lang.NoClassDefFoundError: org/eclipse/core/resources/ResourcesPlugin
        at msi.gama.lang.gaml.indexer.GamlResourceIndexer.<clinit>(GamlResourceIndexer.java:54)
        at msi.gama.lang.gaml.resource.GamlResource.doLinking(GamlResource.java:362)
        at org.eclipse.xtext.resource.XtextResource.updateInternalState(XtextResource.java:304)
        at org.eclipse.xtext.resource.XtextResource.updateInternalState(XtextResource.java:292)
        at msi.gama.lang.gaml.resource.GamlResource.updateInternalState(GamlResource.java:308)
        at org.eclipse.xtext.resource.XtextResource.doLoad(XtextResource.java:182)
        at org.eclipse.xtext.linking.lazy.LazyLinkingResource.doLoad(LazyLinkingResource.java:115)
        at org.eclipse.emf.ecore.resource.impl.ResourceImpl.load(ResourceImpl.java:1563)
        at org.eclipse.emf.ecore.resource.impl.ResourceImpl.load(ResourceImpl.java:1342)
        at org.eclipse.emf.ecore.resource.impl.ResourceSetImpl.demandLoad(ResourceSetImpl.java:259)
        at org.eclipse.emf.ecore.resource.impl.ResourceSetImpl.demandLoadHelper(ResourceSetImpl.java:274)
        at org.eclipse.xtext.resource.XtextResourceSet.getResource(XtextResourceSet.java:266)
        at org.eclipse.xtext.resource.SynchronizedXtextResourceSet.getResource(SynchronizedXtextResourceSet.java:33)
        at msi.gama.lang.gaml.validation.GamlModelBuilder.buildModelDescription(GamlModelBuilder.java:111)
        at msi.gama.lang.gaml.validation.GamlModelBuilder.compile(GamlModelBuilder.java:97)
        at msi.gama.headless.core.HeadlessSimulationLoader.loadModel(HeadlessSimulationLoader.java:155)
        at msi.gama.headless.core.HeadlessSimulationLoader.loadModel(HeadlessSimulationLoader.java:126)
        at msi.gama.headless.job.JobListFactory.constructAllJobs(JobListFactory.java:46)
        at msi.gama.headless.script.ExperimentationPlanFactory.buildExperiment(ExperimentationPlanFactory.java:183)
        at msi.gama.headless.listener.LoadCommand.launchGamlSimulation(LoadCommand.java:74)
        at msi.gama.headless.listener.LoadCommand.execute(LoadCommand.java:37)
        at msi.gama.headless.listener.LoadCommand.execute(LoadCommand.java:1)
        at msi.gama.headless.listener.CommandExecutor.process(CommandExecutor.java:43)
        at msi.gama.headless.listener.GamaWebSocketServer.onMessage(GamaWebSocketServer.java:209)
        at org.java_websocket.server.WebSocketServer.onWebsocketMessage(WebSocketServer.java:712)
        at org.java_websocket.drafts.Draft_6455.processFrameText(Draft_6455.java:986)
        at org.java_websocket.drafts.Draft_6455.processFrame(Draft_6455.java:910)
...
```
This issue arises because gama-server tries to create a workspace for your experiment but does not have the appropriate rights to do it. 
It can be the case in windows if you run gama-server directly from the `headless` directory from the installation folder (protected by default) and that you are not an Admin