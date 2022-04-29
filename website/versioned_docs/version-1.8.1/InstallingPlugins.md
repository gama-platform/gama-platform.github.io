---
title: Installing Plugins
id: version-1.8.1-InstallingPlugins
original_id: InstallingPlugins
---


Besides the plugins delivered by the developers of the GAMA platform, there are a number of additional plugins that can be installed to add new functionalities to GAMA or enhance the existing ones. GAMA being based on Eclipse, a number of plugins developed for Eclipse are then available (a complete listing of Eclipse plugins can be found in the so-called [Eclipse MarketPlace](http://marketplace.eclipse.org)).

There are, however, three important restrictions:

1. The current version of GAMA is based on Eclipse 2019-03 (version number 4.11.0), which excludes de facto all the plugins targeting solely a specific different version of Eclipse. These will refuse to install anyway.
2. The Eclipse foundations in GAMA are only a subset of the complete Eclipse platform, and a number of libraries or frameworks (for example the Java Development Toolkit) are not (and will never be) installed in GAMA. So plugins relying on their existence will refuse to install as well.
3. Some components of GAMA rely on a specific version of other plugins and will refuse to work with other versions, essentially because their compatibility will not be ensured anymore. For instance, the parser and validator of the GAML language in GAMA 1.8.0 require [XText v. 2.17.0](http://www.eclipse.org/Xtext/) to be installed.

With these restrictions in mind, it is, however, possible to install interesting additional plugins. We propose here a list of some of these plugins (known to work with GAMA), but feel free to either add a comment if you have tested plugins not listed here or [create an issue](Troubleshooting) if a plugin does not work, in order for us to see what the requirements to make it work are and how we can satisfy them (or not) in GAMA.

## Table of contents 

* [Installing Plugins](#installing-plugins)
  * [Installation](#installation)
  * [Selected plugins provided by GAMA community](#selected-plugins-provided-by-the-gama-community)
    * [Toward participative simulations with Remote.Gui and Gaming plugins](#toward-participative-simulations-with-remotegui-and-gaming-plugins)
    * [RJava plugin](#rjava-plugin)
    * [Weka and Matlab plugins](#weka-and-matlab-plugins)
  * [Selected Plugins](#selected-plugins)
    * [Git](#git)
    * [CSV Edit](#csv-edit)
    * [Quickimage](#quickimage)
    * [RSS/Atom Feed View](#rssatom-feed-view)
    * [CKEditor](#ckeditor)
    * [Startexplorer](#startexplorer)
    * [Pathtools](#pathtools)


## Installation

Installing new plugins is a process identical to the one described when [updating GAMA](Updating), with one exception: the _update site_ to enter is normally provided by the vendor of the additional plugin and must be entered instead of GAMA's one in the dialog. 

Let suppose that we want to install a GAMA plugin developed in order to allow GAMA to ask [R](https://www.r-project.org/) to do some computations. This plugin is developed by the GAMA community, but the installation of any plugin will be similar, **only the address of the update site will change**. To install this plugin, [open the pane to install new plugins](Updating#manual-update): "Help > Install new plugins ... ".

Choose in the "Work with..." text field:
```
msi.gama.experimental.p2updatesite - http://updates.gama-platform.org/experimental
```

If it is not available, you can simply type the address of the update site in the text field:
```
http://updates.gama-platform.org/experimental
```

Among all the plugins, select `RJava` in the category "Optional components of GAMA" and click on "Next >" button.

![Selection of the plugin to install.](../resources/images/installationAndLaunching/installPlugin_choice.png)

The initial dialog is followed by two other ones, a first to report that the plugin satisfies all the dependencies, a second to ask the user to accept the license agreement.

![List of plugins to be installed, including possible dependencies.](../resources/images/installationAndLaunching/installPlugin_Summary.png)

![Licences of the plugin, that need to be accepted to install it.](../resources/images/installationAndLaunching/installPlugin_Licences.png)

Once we dismiss the warning that the plugin is not signed and accept to restart GAMA, we can test the new plugin.
In the case of plugins extending the features of GAMA, some example models are often provided with the new plugins to illustrate its use (and it is the case for `RJava`). These new models are accessible in GAMA from `Plugin models` in a dedicated folder (`GAMA to Rjava` in the case of `RJava`). We may need to refresh the model library to let it appear. **Notice that you need [to configure GAMA to access R](CallingR) before running these models.**

![Models provided with the RJava plugin](../resources/images/installationAndLaunching/installPlugin_RJavaModels.png)


## Selected plugins provided by the GAMA community

The update site located at the address `http://updates.gama-platform.org/experimental` contains new plugins for GAMA mainly developed by the GAMA community ([its Github repository is available here](https://github.com/gama-platform/gama.experimental)). **As the name of the repository highlights it, these plugins are most of them still in development, before integration in the kernel of GAMA.**

### Toward participative simulations with `Remote.Gui` and `Gaming` plugins

There are more and more applications of GAMA for participative simulations ([LittoSim](https://littosim.hypotheses.org/), [MarakAir](https://github.com/gnoubi/MarrakAir), [HoanKiemAir](https://github.com/WARMTeam/HoanKiemAir)...). There was thus a need for new features to improve the possible interactions with simulations and the definition of the Graphical User Interface. The two plugins `Remote.Gui` and `Gaming` (available in the "Participative simulation" category) attempts to fill this need.

* `Remote.Gui` allows exposing some model parameters, in order that they can be modified through [a network](UsingNetwork). This allows, for example, to develop a remote application (e.g. Android application) to control the parameters' values during the simulation. 
* `Gaming` allows the modeler to define displays that are much more interactive. This is used to define serious games in which the users can have a wide range of possible interactions with the simulation.

### `RJava` plugin

This plugin allows the modeler to launch some computation on the [`R` software](https://www.r-project.org/). To this purpose, `R` should be installed on your computer and [GAMA should be properly configured](CallingR). 

This possible connection to `R` opens thus the possibility for the modeler to use all the statistical functions and libraries developed in this tool of reference. In addition, R scripts defined by the modeler can also be used directly from his/her GAMA model.

### `Weka` and `Matlab` plugins

Similarly to `RJava`, `Matlab` and `Weka` plugins allow the modeler to run computations on the [`Matlab`](https://fr.mathworks.com/products/matlab.html) and [Weka](https://www.cs.waikato.ac.nz/ml/weka/) software, taking advantages of all the possibilities of these softwares and of scripts defined by him/herself.  

Notice that the `Matlab` plugin requires that MATLAB 2019a is installed and activated on your computer.





## Selected Plugins

In addition to the plugins provided by GAMA community described above, below is a list of plugins that have been tested to work with GAMA. There are many others so take the time to explore them!


### Git

* Git is a version control system (like CVS or SVN, extensively used in GAMA) http://git-scm.com/. Free sharing spaces are provided on [GitHub](https://github.com/) among others. Installing Git allows to share or gather models that are available in Git repositories.
* **Update site**: [http://download.eclipse.org/egit/updates](http://download.eclipse.org/egit/updates)
* Select the following plugin:
  * Git integration for Eclipse	(in Git integration for Eclipse category).
* **How to use it**:
  * This plugin adds new View for GAMA available from: "Views > Other... > Show view > Other..."
![Available views added by Egit](../resources/images/installationAndLaunching/installPlugin_egitViews.png)
  * As an example, choose "Git Repositories".
  * A new view appears in GAMA. You have to clone an existing Git repository or add a local one. [Details and tutorials about the use of Git in Eclipse](https://www.eclipse.org/egit/).
  * The projects available in the Git repository can now be imported in your `User models`.

![How to import a plugin from a Git repository](../resources/images/installationAndLaunching/installPlugin_egitImportProject.png)


### CSV Edit

* An editor for CSV files. Quite handy if you do not want to launch Excel every time you need to inspect or change the CSV data files used in models. It allows the modification of cells, the insertion, addition, and deletion of a row.
* **Update site**: [https://raw.githubusercontent.com/SegFaultError/CsvEdit/master/csvedit.update/site.xml](https://raw.githubusercontent.com/SegFaultError/CsvEdit/master/csvedit.update/site.xml)
* Website: [https://github.com/Mathieuu/CsvEdit](https://github.com/Mathieuu/CsvEdit)

![Screenshot of a CSV file opened with CSV Edit](../resources/images/installationAndLaunching/installPlugin_csv_edit.png)


### Quickimage

* A lightweight viewer of images, which can be useful when several images are used in a model. It allows viewing images one by one or as thumbnails. Supported formats: `.gif`, `.jpg`, `.jpeg`, `.png`, `.bmp`, `.ico`.
* **Update site**: [http://manu26.manufrog.com/~psnetnu/eclipse/updates/](http://manu26.manufrog.com/~psnetnu/eclipse/updates/)
* Website (but seems outdated): [https://github.com/persal/quickimage](https://github.com/persal/quickimage)

![Displaying all images of a projects as thumbnails with Quickimage](../resources/images/installationAndLaunching/installPlugin_quickimage.png)


### RSS/Atom Feed View

* an RSS feed reader in GAMA! It can allow you to monitor the issues of GAMA from within GAMA itself!
* **Update site**: [http://www.junginger.biz/eclipse/](http://www.junginger.biz/eclipse/)
* Select the following plugin: RSS View (Eclipse 3.x)
* Website: [http://junginger.biz/eclipse/](http://junginger.biz/eclipse/)
* **How to use it**:
  * This plugin adds new View for GAMA available from: "Views > Other... > Show view > Other..."
![Available view added by RSS/Atom Feed View](../resources/images/installationAndLaunching/installPlugin_RSSchoiceView.png)
  * To monitor the issues of GAMA from within GAMA itself: right-click on the RSS View and choose "Add a new feed"
  * Add the address: `http://gh-feed.imsun.net/gama-platform/gama/issues`

![View of the GAMA issues inside GAMA](../resources/images/installationAndLaunching/installPlugin_RSS_GAMAIssues.png)


### CKEditor

* CKEditor is a lightweight and powerful web-based editor, perfect for almost WYSIWYG edition of HTML files. It can be installed, directly in GAMA, in order to edit `.html`, `.htm`, `.xml`, `.svg`, etc. files directly without leaving the platform. No other dependencies are required. A must! 
* **Update site**: [https://kosz.bitbucket.io/eclipse-ckeditor/update-site](https://kosz.bitbucket.io/eclipse-ckeditor/update-site)
* Website: [https://ckeditor.com/](https://ckeditor.com/)

![CKEditor in GAMA to provide a WYSIWIG HTML editor.](../resources/images/installationAndLaunching/installPlugin_ckeditor.png)


### Markdown Text Editor

* Plugin adding Markdown text-editing support to Eclipse. Makes editing text files in Eclipse a lot better. Markdown is a simple and intuitive text format syntax that lets you get rich formatting with 'normal' 
* **Update site**: [https://nodeclipse.github.io/updates/markdown/](https://nodeclipse.github.io/updates/markdown/)
* **How to use it**:
  * Any markdown file can be opened with the **Markdown Editor** (to provide syntax highlighting)
  * The plugin adds to the GAMA view: the **Markdown View**, to render the markdown file.

![A Markdown editor and viewer integrated into GAMA](../resources/images/installationAndLaunching/installPlugin_markdowneditor.png)


### Startexplorer

* A nice utility that allows the user to select files, folders or projects in the [Navigator](NavigatingWorkspace) and open them in the filesystem (either the UI Explorer, Finder, whatever, or in a terminal).
* **Update site**: [http://basti1302.github.com/startexplorer/update/](http://basti1302.github.com/startexplorer/update/)

![The possible actions provided by the Start Explorer plugin](../resources/images/installationAndLaunching/installPlugin_start_explorer.png)


### Pathtools

* Same purpose as StartExplorer, but much more complete, and additionally offers the possibility to add new commands to handle files (open them in specific editors, execute external programs on them, etc.). Very nice and professional. Works flawlessly in GAMA except that contributions to the toolbar are not accepted (so you have to rely on the commands present in the [Navigator](NavigatingWorkspace) pop-up menu).
* **Update site**: [http://cdn.rawgit.com/sandipchitale/pathtools/1.0.64/PathToolsUpdateSite/site.xml](http://cdn.rawgit.com/sandipchitale/pathtools/1.0.64/PathToolsUpdateSite/site.xml)

![The possible actions provided by the Pathtools plugin](../resources/images/installationAndLaunching/installPlugin_pathtools.png)

