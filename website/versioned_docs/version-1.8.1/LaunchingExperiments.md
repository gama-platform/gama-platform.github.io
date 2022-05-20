---
title:  Launching Experiments from the User Interface
---


GAMA supports multiple ways of launching experiments from within the Modeling Perspective, in editors or in the [navigator](NavigatingWorkspace).


## Table of contents 

* [Launching Experiments from the User Interface](#launching-experiments-from-the-user-interface)
  * [From an Editor](#from-an-editor)
  * [From the Navigator](#from-the-navigator)
  * [Running Experiments Automatically](#running-experiments-automatically)
  * [Running Several Simulations](#running-several-simulations)


## From an Editor
As already mentioned in [this page](GamlEditorGeneralities), GAML editors will provide the easiest way to launch experiments. Whenever a model that contains the definition of experiments is validated, these experiments will appear as distinct buttons, in the order in which they are defined in the file, in the header ribbon above the text. Simply clicking one of these buttons launches the corresponding experiment.

![Launch an experiment by clicking on green top buttons.](/resources/images/runningExperiments/launch_editor_launch.png)

For each of those launching buttons, you can see different pictograms, showing the type of experiment. [The various kinds of experiment are described in this page.](ModelOrganization#experiment-declarations)

![Each experiment type is illustrated by a dedicated pictogram.](/resources/images/runningExperiments/launch_editor_different_types_of_experiment.png)


## From the Navigator
You can also launch your experiments from the navigator, by expanding a model and double-clicking on one of the experiments available (the number of experiments for each model is visible also in the navigator). As for the editor, the various types of experimentations are differentiated by a pictogram.

![Experiments can be also be launched directly from the Navigator.](/resources/images/runningExperiments/launch_navigator_launch.png)


## Running Experiments Automatically
Once an experiment has been launched (unless it is run in [headless](Headless) mode, of course), it normally displays its views and waits from an input from the user, usually a click on the "Run" or "Step" buttons (see [here](MenusAndCommands)).

It is, however, possible to make experiments run directly once launched, without requiring any intervention from the user.  To activate this feature, [open the preferences of GAMA](Preferences). In the "Execution" tab, simply check "Auto-run experiments when they are launched" (which is unchecked by default) and hit "Save" to dismiss the dialog. Next time you will launch an experiment, it will run automatically (this option also applies to experiments launched from the command line).

![Preferences to activate the auto-run of experiments.](/resources/images/runningExperiments/launch_prefs_auto_run.png)

When the autorun is set in the Preferences, all the experiments in the workspace will be in autorun mode. If you want to activate this option only for a single experiment, it can be done programmatically by adding the `autorun:` to the `experiment` statement [as detailed in this page](DefiningGUIExperiment). 

## Running Several Simulations

It is possible in GAMA to run several simulations (multi-simulation feature). Each simulation will be launched with the same seed (which means that if the parameters are the same, then the result will be exactly the same). All those simulations are synchronized in the same cycle.

To run several simulations, you have to [write it directly in your model](RunSeveralSimulations).

![Several simulations of the same model can be launched together (with a plot comparing the performance in each of them).](/resources/images/runningExperiments/launch_run_several_simulations.png)
