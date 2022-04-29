---
title: Workspace, Projects and Models
id: version-1.8.1-WorkspaceProjectsAndModels
original_id: WorkspaceProjectsAndModels
---





The **workspace** is a directory in which GAMA stores all the current projects on which the user is working, links to other projects, as well as some meta-data like preference settings, the current status of the different projects, [error markers](ValidationOfModels), and so on.

Except when running in [headless mode](Headless), **GAMA cannot function without a valid workspace**.

The workspace is organized in 4 **[categories](NavigatingWorkspace)**, which are themselves organized into **projects**.

The **projects** present in the **workspace** can be either directly _stored_ within it (as sub-directories), which is usually the case when the user [creates](EditingModels#Creating_a_first_model) a new project, or _linked_ from it (so the workspace will only contain a link to the directory of the project, supposed to be somewhere in the filesystem or on the network). A same **project** can be linked from different **workspaces**.

**GAMA models files** are stored in these **projects**, which may contain also other files (called _resources_) necessary for the **models** to function. A project may, of course, contain several **model files**, especially if they are importing each other, if they represent different views on the same topic, or if they share the same resources.

Learning how to [navigate](NavigatingWorkspace) in the workspace, how to [switch](ChangingWorkspace) workspace or how to [import, export](ImportingModels) is a necessity to use GAMA correctly. It is the purpose of the following sections.

1. [Navigating in the Workspace](NavigatingWorkspace)
2. [Changing Workspace](ChangingWorkspace)
3. [Importing Models](ImportingModels)
