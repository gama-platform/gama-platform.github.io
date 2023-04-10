---
title:  Navigating in the Workspace
---


All the models that you edit or run using GAMA are accessible from a central location: the _Navigator_, which is always on the left-hand side of the main window and cannot be closed. This view presents the models currently present in (or linked from) your **workspace**.

![Overview of GAMA user interface: highlight on the mode Navigator.](/resources/images/workspaceProjectsAndModels/navigator_first.png)

## Table of contents 

* [Navigating in the Workspace](#navigating-in-the-workspace)
  * [Status of projects and models](#status-of-projects-and-models)
  * [The Different Categories of Models](#the-different-categories-of-models)
    * [Library models](#library-models)
    * [Plugin models](#plugin-models)
    * [Test models](#test-models)
    * [User models](#user-models)
  * [Inspect Models](#inspect-models)
  * [Moving Models Around](#moving-models-around)
  * [Closing and Deleting Projects](#closing-and-deleting-projects)


## Status of projects and models

All the projects and models have an icon with a red or green circle on it. This eases to locate models containing **compilation errors** (red circle) and projects that have been successfully validated (green circle).

![Projects with and without errors.](/resources/images/workspaceProjectsAndModels/navigator_error.png)


## The Different Categories of Models

In the _Navigator_, models are organized in four different categories: _Models library_, _Plugin models_, _Test models_, and _User models_. This organization is purely logical and does not reflect where the models are actually stored in the workspace (or elsewhere). Whatever their actual location, **model files** need to be stored in **projects**, which may contain also other files (called _resources_) needed for the models to function (such as data files). A project may, of course, contain several model files, especially if they are importing each other, if they represent different models on the same topic, or if they share the same resources.

![The 4 categories of model projects.](/resources/images/workspaceProjectsAndModels/navigator_categories.png)

### Library models

This category represents the models that are shipped with each version of GAMA. They do not reside in the workspace but are considered as _linked_ from it. This link is established every time a new workspace is created. Their actual location is within a plugin (msi.gama.models) of the GAMA application. This category contains 7 main projects in GAMA 1.9.0, which are further refined in folders and sub-folders that contain model files and resources.

![Library models expanded.](/resources/images/workspaceProjectsAndModels/navigator_library_2_folders_expanded.png)

The 7 main projects on the Library models are:

* **Data**: all these plugins illustrate how to manage data in GAML. This includes how to **import** data (in all the supported formats) into a model, **export** (i.e. save) agents or data in the simulations in files, **clean** data (e.g. clean a road network), get and save data in **databases**, and use **data analysis** operators.
* **GAML Syntax**: these models have the only goal to illustrate the syntax of the GAML language. This includes how to use the various data structures (list, map, matrix...), architectures, loop, interactions, and conditional structures, or how to schedule agents... 
* **Model Exploration**: all these models illustrate the various ways to explore models and in particular the various possible experiment (batch, multi-simulations...).
* **Modeling**: these models provide implementations of various classical difficulties encountered by modelers: how to make agents move (on a graph, a grid...), how to implement decision-making process...
* **Toy Models**: these models are replications of classical models from the literature, including Sugarscape, Schelling, ants, boids...
* **Tutorials**: this project contains all the files of the various tutorials (available from the website).
* **Visualization and User Interaction**: these models illustrate most of the GAMA features in terms of visualization and interactions with the simulation, e.g. the 3D visualization... 

![Main projects in the Library models.](/resources/images/workspaceProjectsAndModels/navigator_models_library_expanded.png)

It may happen, on some occasions, that the library of models is not synchronized with the version of GAMA that uses your workspace. This is the case if you use different versions of GAMA to work with the same workspace. In that case, it is required that the library be manually updated. This can be done using the "Update library" item in the contextual menu.

![Refresh the library models in case of synchronization issue.](/resources/images/workspaceProjectsAndModels/navigator_update_library.png)


To look up for a particular model in the library, users can use the "Find model..." search bar, which allows looking for models by their title (for example, models containing "BDI" in the example below).

![Search for models containing BDI in their name.](/resources/images/workspaceProjectsAndModels/navigator_menu_search.png)


### Plugin models

This category represents the models that are related to a specific plugin (additional or integrated by default). The corresponding plugin is shown between parenthesis.

![List of the projects available in the Plugin models category](/resources/images/workspaceProjectsAndModels/navigator_plugin_models.png)

When you [add an additional plugin extending the GAML language](InstallingPlugins) is added, a new project can be added to this category.


## Test models

These models are unit tests for the GAML language: they aim at testing each element of the language to check whether they produce the expected result. The aim is to avoid regression after evolutions of the software. [They can be run](ValidationOfModels) from the validation view.


### User models

This category regroups all the projects that have been [created](GamlEditorGeneralities) or [imported](ImportingModels) in the workspace by the user. Each project can be actually a folder that resides in the folder of the workspace (so they can be easily located from within the filesystem) or a link to a folder located anywhere in the filesystem (in case of a project importation). Any modification (addition, removal of files...) made to them in the file system (or using another application) is immediately reflected in the _Navigator_ and vice-versa.

Model files, although it is by no means mandatory, usually reside in a sub-folder of the project called `models`. Similarly, all the test models are located in the `tests` folder.

![Classical architecture of a project.](/resources/images/workspaceProjectsAndModels/navigator_user_expanded.png)


## Inspect Models

Each model is presented as a node in the navigation workspace, including _Experiment_ buttons and/or a _Contents_ node and/or a _Uses_ node and/or a _Tags_ node and/or an _Imports_ node.

![All the information available from the model node.](/resources/images/workspaceProjectsAndModels/navigator_inspect_model.png)

* **Imports**: The node _Impots_ lists all the model files that are imported in the current model.

![_Imports_ node lists all the imported models.](/resources/images/workspaceProjectsAndModels/navigator_imports.png)

* **Uses node**: The node _Uses_ is present if your model uses some external resources, **and if the path to the resource is correct** (if the path to the resource is not correct, the resource will not be displayed under _Uses_).

![When the model includes external files they are listed in the _Uses_ node.](/resources/images/workspaceProjectsAndModels/navigator_uses_correct_paths.png)
![When the path is not correct, external files are not listed in the _Uses_ node.](/resources/images/workspaceProjectsAndModels/navigator_uses_non_correct_paths.png)

* **Tags node**: The node _Tags_ lists all the tags that have been specified in the header of the model.

![List of the tags describing the model.](/resources/images/workspaceProjectsAndModels/navigator_tags.png)

* **Contents**: The node _Contents_ describes the tree of all the elements in the model. It is similar to the Overview view.

* **Experiment button **: Experiment buttons are present if your model contains experiments (it is usually the case !). To run the corresponding experiment, just click on it. To learn more about running experiments, jump into this [section](LaunchingExperiments).

![Experiment buttons that can launch experiments from the Navigator.](/resources/images/workspaceProjectsAndModels/navigator_experiments.png)



## Moving Models Around
Model files, as well as resources, or even complete projects, can be moved around between the "Models Library"/"Plugin Models" and "Users Models" categories, or within them, directly in the _Navigator_. **Drag'n drop operations are supported**, as well as copy and paste. For example, the model `Life.gaml`, present in the "Models Library", can perfectly be copied and then pasted in a project in the "Users Model". This local copy in the workspace can then be further edited by the user without altering the original one.

![Copy and paste a model anywhere in the Navigator.](/resources/images/workspaceProjectsAndModels/navigator_menu_copy_paste.png)


## Closing and Deleting Projects
Users can choose to get rid of old projects by either **closing** or **deleting** them. Closing a project means that it will still reside in the workspace (and be still visible, although a bit differently, in the _Navigator_) but its model(s) won't participate to the build process and won't be displayable until the project is opened again.

![images/navigator_menu_close.png](/resources/images/workspaceProjectsAndModels/navigator_menu_close.png)
![images/navigator_close_result.png](/resources/images/workspaceProjectsAndModels/navigator_close_result.png)

**Deleting** a project must be invoked when the user wants this project to not appear in the workspace anymore (unless that is, it is [imported](ImportingModels) again). Invoking this command will effectively make the workspace "forget" about this project, and this can be further doubled with a deletion of the project's resources and models from the filesystem.

![images/navigator_menu_delete.png](/resources/images/workspaceProjectsAndModels/navigator_menu_delete.png)
![images/navigator_delete_dialog.png](/resources/images/workspaceProjectsAndModels/navigator_delete_dialog.png)
