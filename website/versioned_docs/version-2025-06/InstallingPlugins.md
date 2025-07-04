---
title:  Installing Plugins
---


Besides the plugins delivered by the developers of the GAMA platform, there are a number of additional plugins that can be installed to add new functionalities to GAMA or enhance the existing ones. GAMA being based on Eclipse, a number of plugins developed for Eclipse are then available (a complete listing of Eclipse plugins can be found in the so-called [Eclipse MarketPlace](http://marketplace.eclipse.org)).

There are, however, some important restrictions:

1. The current version of GAMA is based on Eclipse, which excludes de facto all the plugins targeting solely a specific different version of the IDE. These will refuse to install anyway.
2. The Eclipse foundations in GAMA are only a subset of the complete Eclipse platform, and a number of libraries or frameworks (for example the Java Development Toolkit) are not (and will never be) installed in GAMA. So plugins relying on their existence will refuse to install as well.
3. Some components of GAMA rely on a specific version of other plugins and will refuse to work with other versions, essentially because their compatibility will not be ensured anymore. For instance, the parser and validator of the GAML language in GAMA 1.9.2 require [XText v. 2.29.0](http://www.eclipse.org/Xtext/) to be installed.

With these restrictions in mind, it is, however, possible to install interesting additional plugins. We propose here a list of some of these plugins (known to work with GAMA), but feel free to either add a comment if you have tested plugins not listed here or [create an issue](Troubleshooting) if a plugin does not work, in order for us to see what the requirements to make it work are and how we can satisfy them (or not) in GAMA.

## Installation

### GUI Installation (Standard Method)

Installing new plugins is a process identical to the one described when [updating GAMA](Updating), with one exception: the _update site_ to enter is normally provided by the vendor of the additional plugin and must be entered instead of GAMA's one in the dialog. 

Let suppose that we want to install a GAMA plugin developed in order to allow GAMA to ask [R](https://www.r-project.org/) to do some computations. This plugin is developed by the GAMA community, but the installation of any plugin will be similar, **only the address of the update site will change**. To install this plugin, [open the pane to install new plugins](Updating#manual-update): "Help > Install new plugins ... ".

Choose in the "Work with..." text field:
```
gama.experimental.p2updatesite - https://updates.gama-platform.org/experimental
```

If it is not available, you can simply type the address of the update site in the text field:
```
http://updates.gama-platform.org/experimental/<GAMA-VERSION>
```

> [!NOTE]  
> The `<GAMA-VERSION>` should be replaced by the version of GAMA you are using. 
> 
> For example, if your version is _GAMA **1.9.2**_, then the address is this : `http://updates.gama-platform.org/experimental/1.9.2`

Among all the plugins, select `RJava` in the category "Optional components of GAMA" and click on "Next >" button.

![Selection of the plugin to install.](/resources/images/installationAndLaunching/installPlugin_choice.png)

The initial dialog is followed by two other ones, a first to report that the plugin satisfies all the dependencies, a second to ask the user to accept the license agreement.

![List of plugins to be installed, including possible dependencies.](/resources/images/installationAndLaunching/installPlugin_Summary.png)

![Licences of the plugin, that need to be accepted to install it.](/resources/images/installationAndLaunching/installPlugin_Licences.png)

Once we dismiss the warning that the plugin is not signed and accept to restart GAMA, we can test the new plugin.
In the case of plugins extending the features of GAMA, some example models are often provided with the new plugins to illustrate its use (and it is the case for `RJava`). These new models are accessible in GAMA from `Plugin models` in a dedicated folder (`GAMA to Rjava` in the case of `RJava`). We may need to refresh the model library to let it appear. **Notice that you need [to configure GAMA to access R](CallingR) before running these models.**

![Models provided with the RJava plugin](/resources/images/installationAndLaunching/installPlugin_RJavaModels.png)

### HeadlessiInstallation using _dropins_ folder

For automated deployments, CI/CD pipelines, or when you need to install plugins without using the GUI, you can use Eclipse's `dropins` folder mechanism. This method allows GAMA to automatically detect and load plugins at startup.

#### Prerequisites

- Access to the GAMA installation directory
- The plugin JAR files (both feature and plugin JARs)

#### Installation Steps

1. **Locate the dropins folder**
   
   The `dropins` folder is located in your GAMA installation directory:
   - **Windows**: `C:\Program Files\Gama\dropins\` or `<GAMA_INSTALLATION_PATH>\dropins\`
   - **macOS**: `/Applications/GAMA.app/Contents/Eclipse/dropins/`
   - **Linux**: `/opt/gama-platform/dropins/` or `<GAMA_INSTALLATION_PATH>/dropins/`
   
   If the `dropins` folder doesn't exist, create it in the root of your GAMA installation.

2. **Prepare the plugin files**
   
   Eclipse plugins typically consist of two types of JAR files:
   - **Feature JARs**: These files usually have names like `com.example.plugin.feature_1.0.0.jar`
   - **Plugin JARs**: These files usually have names like `com.example.plugin_1.0.0.jar`
   
  > [!WARNING]  
  > You must include **BOTH** the feature JAR and all associated plugin JARs for the plugin to load correctly. Missing either type will result in the plugin not being recognized.

3. **Copy the files to dropins**
   
   Simply place all your jar files in the dropins folder. You should have them like so:
   
   ```
   dropins/
   ├── com.example.plugin.feature_1.0.0.jar
   └── com.example.plugin_1.0.0.jar
   ```
   
4. **Restart GAMA**
   
   After placing the files, restart GAMA. The platform will automatically scan the dropins folder during startup and load any valid plugins found.


## Selected plugins provided by the GAMA community

The update site located at the address `http://updates.gama-platform.org/experimental` contains new plugins for GAMA mainly developed by the GAMA community ([its Github repository is available here](https://github.com/gama-platform/gama.experimental)). **As the name of the repository highlights it, these plugins are most of them still in development, before integration in the kernel of GAMA.**

