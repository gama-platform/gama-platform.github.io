---
title:  Importing Models
---



_Importing_ a model refers to making a model file (or a complete project) available for edition and experimentation in the **workspace**. With the exception of [headless](Headless) experiments, GAMA requires that models be manageable in the current workspace to be able to validate them and eventually experiment them.

There are many situations where a model needs to be _imported_ by the user: someone sent it to him/her by mail, it has been attached to an [issue report](Troubleshooting), it has been shared on the web or a Git repository, or it belongs to a previous workspace after the user has [switched workspace](ChangingWorkspace). The instructions below apply equally to all these situations.

Since model files need to reside in a project to be managed by GAMA, it is usually preferable to import a whole project rather than individual files (unless, of course, the corresponding models are simple enough to not require any additional resources, in which case, the model file can be imported with no harm into an existing project). GAMA will then try to detect situations where a model file is imported alone and, if a corresponding project can be found (for instance, in the upper directories of this file), to import the project instead of the file. As the last resort, GAMA will import orphan model files into a _generic_ project called _"Unclassified Models"_ (which will be created if it does not exist yet).

**The simplest, safest and most secure way to import a project into the workspace is to follow [instructions from this section](ImportingModels#import-gama-project).**

## Table of contents 

* [Importing Models](#importing-models)
  * [The "Import..." Menu Command](#the-import-menu-command)
    * [Import "GAMA Project..."](ImportingModels#import-gama-project)
    * [Import "External files from disk..." and "External files from archive..."](ImportingModels#import-external-files-from-disk-and-external-files-from-archive)
    * ["Other" imports](ImportingModels#other-imports)
  * [Silent import](#silent-import)
  * [Drag'n Drop / Copy-Paste Limitations](#dragn-drop--copy-paste-limitations)
  * [Import from GitHub repository](#import-from-gitHub-repository)


## The "Import..." Menu Command

The simplest, safest and most secure way to import a project into the workspace is to use the built-in "Import..." menu command, available in the contextual menu on the _User models_ (the modeler can only import projects in this category).

![The Import... command in the contextual menu from User models](/resources/images/workspaceProjectsAndModels/import_menu_file_import.png)

The "Import..." command allows the modeler to choose between:

* "GAMA Project...": **import a project** in the workspace (from another folder or an archive),
* "External files from disk...": **import any files** in a project of the workspace (from a folder),
* "External files from archive...": **import any files** in a project of the workspace (from an archive),
* "Other": other ways of importation.

### Import "GAMA Project..."

When "GAMA project..." is chosen, a dialog box will pop-up where the user will be asked to:

1. Enter a location (or browse to a location) containing the GAMA project(s) to import. This can be the folder of a single project or a folder containing several projects. 2 possibilities are available:
  * "Select root directory": the user selects a **folder** containing the project,
  * "Select archive file": the user selects an archive file (e.g. a `.zip`file) containing the project.
2. Choose among the list of available projects (computed by GAMA) the ones to effectively import. Only projects that are not already in the workspace can be imported.
3. Indicate whether or not these projects need to be **copied to** or **linked from** the workspace (the latter is done by default). In the case of an import from an archive, the content will be automatically copied in the workspace.

![Dialog box to import a project.](/resources/images/workspaceProjectsAndModels/import_dialog_import_projects.png)

### Import "External files from disk..." and "External files from archive..."

These two commands allow the user to **import some external files into an existing project of the workspace**. These two commands are very similar, only the source of files is different: a folder or an archive. They allow to filter and select the files to import. The user will be asked to:

1. Enter a location (or browse to a location) containing the files to import.
2. Select the files to import.
3. Select the project in the workspace where the files will be copied.

![Dialog box to import external files into an existing project of the workspace.](/resources/images/workspaceProjectsAndModels/import_dialog_import_external_files.png)


### "Other" imports

When invoked, this command will open a dialog asking the user to choose the source of the importation. It can be a directory in the filesystem (in which GAMA will look for existing projects), a zip file, etc. It is safer, in any case, to choose "Existing Projects into Workspace".

If some extensions have been installed, they could add some entries in this menu (e.g. the [Git extension](InstallingPlugins#git)).

![The dialog box gathering all the possible way of importing a project.](/resources/images/workspaceProjectsAndModels/import_dialog_import.png)



## Silent import
Another (possibly simpler, but less controllable) way of importing projects and models is to either pass a path to a model when [launching](Launching) GAMA from the command line or to double-click on a model file (ending in _.gaml_) in the Explorer or Finder (depending on your OS).

If the file is not already part of an imported project in the current workspace, GAMA will:

1. silently import the project (by creating a link to it),
2. open an editor on the file selected.

This procedure may fail, however, if a project of the same name (but in a different location) already exists in the workspace, in which case GAMA will refuse to import the project (and hence, the file). The solution, in this case, is to rename the project to import (or to rename the existing project in the workspace).




## Drag'n Drop / Copy-Paste Limitations
Currently, **there is no way** to drag and drop an entire project into GAMA _Navigator_ (or to copy a project in the filesystem and paste it in the _Navigator_). Only individual model files, folders or resources can be moved this way (and they have to be dropped or pasted into existing projects).

This limitation might be removed sometime in the future, however, allowing users to use the _Navigator_ as a project drop or paste target, but it is not the case yet.



## Import from GitHub repository

In the case where the [Git plugin is installed in GAMA](InstallingPlugins#git), projects can be imported from a Git repository, as detailed in [the recipes related to the use of Git in GAMA](Using_Git).

