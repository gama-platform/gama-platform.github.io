---
title:  Launching GAMA
---


Running GAMA for the first time requires that you launch the application (`Gama.app` on MacOS X, `Gama.exe` on Windows, `Gama` on Linux, located in the folder called `GAMA_VERSION.NUMBER_YOUR_OS_NAME` once you have unzipped the downloaded archive). In case you are unable to launch the application, or if error messages appear, please refer to the [installation](Installation) or [troubleshooting](Troubleshooting) instructions.

## Table of contents 

* [Launching GAMA](#launching-gama)
  * [Launching the Application](#launching-the-application)
  * [Launching the Application from the command line](#launching-the-application-from-the-command-line)
  * [Choosing a Workspace](#choosing-a-workspace)
  * [Welcome Page](#welcome-page)

## Launching the Application

The extraction of the downloaded archive provides:

* on Mac OS X: a single file named `Gama.app`
* on Windows and Linux: a folder named `GAMA_1.8_YOUR_OS_NAME` containing, among many other files and folders, the `Gama.exe` file (for Windows) and `Gama` (for Linux).

Running GAMA requires that you launch the application file (`Gama.app` on Mac OS X, `Gama.exe` on Windows, `Gama` on Linux) by double-clicking on them or from a terminal.


## Launching the Application from the command line

Note that GAMA can also be launched in two different other ways:

1. In a so-called _headless mode_ (i.e. without a user interface, from the command line, in order to conduct experiments or to be run remotely). Please refer to [the corresponding instructions](Headless).
2. From the terminal, using a path to a model file and the name or number of an experiment, in order to allow running this experiment directly (note that the two arguments are optional: if the second is omitted, the file is imported in the workspace if not already present and opened in an editor; if both are omitted, GAMA is launched as usual):

* `Gama.app/Contents/MacOS/Gama path_to_a_model_file#experiment_name_or_number` on Mac OS X
* `Gama path_to_a_model_file#experiment_name_or_number` on Linux
* `Gama.exe path_to_a_model_file#experiment_name_or_number` on Windows


## Choosing a Workspace
Past the splash screen, GAMA will ask you to choose a workspace in which to store your models and their associated data and settings. The workspace can be any folder in your filesystem on which you have read/write privileges. If you want GAMA to remember your choice next time you run it (it can be handy if you run Gama from the command line), simply check the corresponding option. If this dialog does not show up when launching GAMA, it probably means that you inherit from an older workspace used with a previous GAMA version (and still "remembered"). In that case, a warning will be produced to indicate that the model library is out of date, offering you the possibility to create a new workspace.

![Window to choose the workspace.](/resources/images/installationAndLaunching/1.workspace_choice.png)

You can enter its address or browse your filesystem using the appropriate button. If the folder already exists, it will be reused (after a warning if it is not already a workspace). If not, it will be created. It is always a good idea, when you launch a new version of GAMA for the first time, to create a new workspace. You will then, later, be able to [import your existing models](ImportingModels) into it. Failing to do so might lead to odd errors in the various validation processes.

When you try to choose a workspace used with a previous of GAMA, the following pop-up will appear.

![Pop-up that appears when the user chooses a folder used as a workspace in a previous version of GAMA.](/resources/images/installationAndLaunching/2.workspace_choice3.png)


The following pop-up appears when the user wants to create a new workspace in a folder that does not exist. Click on OK to create the folder and set this new folder as the GAMA workspace.

![Pop-up that appears when the user wants to create a new workspace. Click on OK.](/resources/images/installationAndLaunching/2.workspace_choice2.png)



## Welcome Page
As soon as the workspace is created, GAMA will open and you will be presented with its **first window**. GAMA is based on [Eclipse](http://www.eclipse.org) and reuses most of its visual metaphors for organizing the work of the modeler. The main window is then composed of several **parts**, which can be **views** or **editors**, and are organized in a **perspective**. GAMA proposes 2 main perspectives: _Modeling_, dedicated to the creation of models, and _Simulation_, dedicated to their execution and exploration. Other perspectives are available if you use shared models.

The default perspective in which GAMA opens is _Modeling_. It is composed of a central area where [GAML editors](GamlEditorGeneralities) are displayed, which is surrounded by a [Navigator view](NavigatingWorkspace) on the left-hand side of the window, an Outline view (linked with the open editor), the Problems view, which indicates errors and warnings present in the models stored in the workspace and an interactive console, which allows the modeler to try some expressions and get an immediate result.

![GAMA after the first launch.](/resources/images/installationAndLaunching/3.workbench_window.png)

In the absence of previously open models, GAMA will display a _Welcome page_ (actually a web page), from which you can find links to the website, current documentation, tutorials, etc. This page can be kept open (for instance if you want to display the documentation when editing models) but it can also be safely closed (and reopened later from the "Help" menu).

![Menu to open new views.](/resources/images/installationAndLaunching/5.welcome_page.png)

From this point, you are now able to [edit a new model](EditingModels), [navigate in the model library](NavigatingWorkspace), or [import an existing model](ImportingModels).