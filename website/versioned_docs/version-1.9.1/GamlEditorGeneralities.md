---
title:  The GAML Editor - Generalities
---


The GAML Editor is a text editor that proposes several services to support the modeler in writing correct models: an integrated live validation system, a ribbon header that gives access to [experiments](LaunchingExperiments), information, warning and error markers.

## Table of contents 

* [The GAML Editor - Generalities](#the-gaml-editor-generalities)
  * [Creating a first model](#creating-a-first-model)
    * [Create a new model or test file](#create-a-new-model-or-test-file)
    * [Create a new experiment file](#create-a-new-experiment-file)
  * [Status of models in editors](#status-of-models-in-editors)
  * [Editor Preferences](#editor-preferences)
  * [Additional information in the Editor](#additional-information-in-the-editor)
  * [Multiple editors](#multiple-editors)
  * [Local history](#local-history)


## Creating a first model

Editing a model requires that at least one **project** is created in _User Models_. If there is none, right-click on _User Models_ and choose "New... > Gama Project..." (if you already have user projects and want to create a model in one of them, skip the next step).

![Command to create a new GAMA project](/resources/images/editingModels/general_new_project.png)

A dialog is then displayed, offering you to enter the name of the project. You can also choose whether you want to create at the same time a first model file and if you want the project contains [test models](Writing_Tests). An error will be displayed if the project name already exists in the workspace, in which case you will have to change it. Two projects with similar names cannot coexist in the workspace (even if they belong to different categories).

![Choose the name of the new project.](/resources/images/editingModels/general_new_project2.png)


If you want to create a new model file in your project, navigate to it and right-click on it and on the command "New ...>". You have a choice between three kinds of file:

* **Model file**: **to create a normal `.gaml` model file used to define your model.**
* **Experiment file**: to create a file containing only an experiment on an existing model.
* **Test experiment file**: to create [unit test experiment](Writing_Tests). It is typically used to define some unit test on a given model, to ensure its quality and prevent regression bugs.

![Choices of file types that can be created.](/resources/images/editingModels/general_new_file.png)

### Create a new model or test file

A new dialog is displayed, which asks for several required or optional information:

1. The _Container_ is normally the name of the project you have selected, but you can choose to place the file elsewhere. An error will be displayed if the container does not exist (yet) in the workspace. 
2. You can then choose whether you want to create an _empty_ file, a file with already a _skeleton_ of model (with [the main needed elements of a model file](ModelOrganization)) or simply a test model. 
3. Finally, you are invited to give this file a name. An error is displayed if this name already exists in this project. The name of the model, which is by default computed with respect to the name of the file, can be actually completely different (but it may not contain white spaces or punctuation characters). The name of the author, as well as the textual description of the model and the creation of an HTML documentation, are optional.

![Dialog box to create a new model file (similar for a new test file.](/resources/images/editingModels/general_new_model_file.png)

### Create a new experiment file

A new dialog is displayed, which asks for several required or optional information:

1. The _Container_ is normally the name of the project you have selected, but you can choose to place the file elsewhere. An error will be displayed if the container does not exist (yet) in the workspace. 
2. You can then choose the model you want to experiment on. Just type the path toward this gaml model, or browse and select one among all the models existing in the workspace.
3. Finally, you are invited to give this file a name. An error is displayed if this name already exists in this project. The name of the model, which is by default computed with respect to the name of the file, can be actually completely different (but it may not contain white spaces or punctuation characters). The name of the author, as well as the textual description of the model and the creation of an HTML documentation, are optional.
 
![Dialog box to create a new experiment file.](/resources/images/editingModels/general_new_experiment_file.png)


## Status of models in editors

Once this dialog is filled and accepted, GAMA will display the new "empty" model.

![GAMA after the creation of a first project and empty model. ](/resources/images/editingModels/general_view_model.png)


Although GAML files are just plain text files, and can, therefore, be produced or modified in any text processor, using the dedicated GAML editor offers many advantages, among which the live display of errors and model statuses. A model can actually be in four different states, which are visually accessible above the editing area: _Functional_ (grey color), _Experimentable_ (green color), _InError_ (red color), _InImportedError_ (red color). See [the section on model compilation](ValidationOfModels) for more precise information about these statuses.

In its initial state, a model is always in the _Functional_ state (when it is empty), which means it compiles without problems, but cannot be used to launch experiments. If the model is created with a skeleton, it is _Experimentable_. The _InError_ state, depicted below, occurs when the file contains errors (syntactic or semantic ones).

![Display of a model _InError_.](/resources/images/editingModels/general_view_model_with_error.png)

While the file is not saved, these errors remain displayed in the editor and nowhere else. If you save the file, they are now considered as "workspace errors" and get displayed in the "Syntax errors" view below the editor and explanation is available on the error icon in the GAML editor.

![Information about errors are available in the GAML editor and in the Syntax errors view.](/resources/images/editingModels/general_view_model_with_error_explanations.png)

Reaching the _Experimentable_ state requires that all errors are eliminated and that at least one experiment is defined in the model, which is the case now in our toy model. The experiment is immediately displayed as a button in the toolbar, and clicking on it will allow to launch this experiment on your model. See [the section about running experiments](RunningExperiments) for more information on this point.

![Model with an experiment.](/resources/images/editingModels/general_view_model_with_experiment.png)

Experiment buttons are updated in real-time to reflect what is in your code. If more than one experiment is defined, corresponding buttons will be displayed in addition to the first one.

![Model with 3 experiments.](/resources/images/editingModels/general_view_model_with_3_experiments.png)

The toolbar on the top of the GAML editor displays, in addition to the green experiment buttons, a button to add an experiment in the current model.

![Button to create a new experiment.](/resources/images/editingModels/general_button_create_experiment.png)


## Editor Preferences

Text editing in general, and especially in Eclipse-based editors, sports several options and preferences. You might want to turn off/on the numbering of the lines, change the fonts used, change the colors used to highlight the code, etc. All of these preferences are accessible from the "Preferences..." item of the editor contextual menu.

![Access to the Preferences of the editor from the contextual menu.](/resources/images/editingModels/general_view_model_with_preferences.png)

Explore the different items present there, keeping in mind that these preferences will apply to all the editors of GAMA and will be stored in your workspace.

![images/11.editor_preferences.png](/resources/images/editingModels/general_editor_preferences.png)


## Additional information in the Editor

You can choose to display or not some information in your Editor, from the Models menu available when the GAML editor is active.

![Models Menu to access more options for the GAML editor.](/resources/images/editingModels/general_models_edition_menu.png)

In particular, this menu allows the user to activate/deactivate the additional information that can be displayed in the editor:

* "Display line number": the display of the line number in the left margin.
* "Fold code sections": the `-` and `+` icons on the left of each code section can fold/unfold the associated code section.
* "Mark occurrence of symbols": when the name of a variable or species is selected in the code, all its other occurrences will be also marked.
* "Colorize code sections": the code section can be colorized, improving the visualization of the model organization (see below).
* "Show markers overview": a right-click on the left margin of the editor allows the user to add either bookmarks or tasks to the editor (with a mark on the right margin. 

![Addition of a bookmark or a task on a given code element. The markers are also reminded on the right of the editor.](/resources/images/editingModels/general_view_model_with_bookmarks.png)

One particular option, shipped by default with GAMA, is the possibility to not only highlight the code of your model, but also its structure (complementing, in that sense, the _Outline_ view). It is a slightly modified version of a plugin called [EditBox](http://sourceforge.net/projects/editbox/).

![Edition of a model with the highlight of the code structure activated.](/resources/images/editingModels/general_view_model_with_editbox_default.png)

The Default theme of [EditBox](http://sourceforge.net/projects/editbox/) might not suit everyone's tastes, so the preferences allow to entirely customize how the "boxes" are displayed and how they can support the modeler in better understanding "where" it is in the code. The "themes" defined in this way are stored in the workspace, but can also be exported for reuse in other workspaces, or sharing them with other modelers.

![Preferences of the EditBox (used to highlight the structure of the code).](/resources/images/editingModels/general_editbox_preferences.png)




## Multiple editors
GAMA inherits from [Eclipse](http://www.eclipse.org) the possibility to entirely configure the placement of the views, editors, etc. This can be done by rearranging their position using the mouse (click and hold on an editor's title and move it around). In particular, you can have several editors side by side, which can be useful for viewing the documentation while coding a model.

![Example of GAMA organization with multiple editors: one for the code and another one displaying the documentation from the GAMA website.](/resources/images/editingModels/general_view_model_side_by_side.png)




## Local history
Among the various options present to work with models, which you are invited to try out and test at will, one, called _Local history_ is particularly interesting and worth a small explanation. When you edit models, GAMA keeps in the background all the successive versions you save (the history duration is configurable in the preferences), whether or not you are using a versioning system like SVN or Git. This local history is accessible from the contextual menu on the chosen model.

![Open the local history from the contextual menu on the chosen model.](/resources/images/editingModels/global_view_model_with_local_history_menu.png)

This command invokes the opening of a new view, which you can see in the figure below, and which lists the different versions of your file so far. You can then choose one and, right-clicking on it, either open it in a new editor or compare it to your current version.

![images/16.view_model_with_local_history_compare_menu.png](/resources/images/editingModels/global_view_model_with_local_history_compare_menu.png)

This allows you to precisely pinpoint the modifications brought to the file and, in case of problems, to revert them easily, or even revert the entire file to a previous version. Never lose your work again!

![images/17.view_model_with_local_history_side_by_side.png](/resources/images/editingModels/global_view_model_with_local_history_side_by_side.png)

This short introduction to GAML editors is now over. You might want to take a look, now, at [how the models you edit are parsed, validated and compiled](ValidationOfModels), and how this information is accessible to the modeler.