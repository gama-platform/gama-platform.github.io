---
title:  Developing Plugins
---


This page details how to create a new plug-in in order to extend the GAML language with new **skills**, **species**, **displays** or **operators**.
It also details how to create a plug-in that can be  uploaded on an update site and can be installed into the GAMA release.
We consider here that the developer version of GAMA has been installed (as detailled in [this page](InstallingGitVersion)).


## I. Creation of a plug-in

Here are detailed steps to create and configure a new GAMA plug-in.
  
  1. From the Eclipse main menu tab, click on `File`, then `New`, then `Project`, then finally select `plug-in project`.
     ![Annotation 2023-04-14 051051_fileNPP](https://user-images.githubusercontent.com/4437331/231932044-e687832c-b826-4363-876b-5858bad7102b.png)

  2. In the `New plug-in Project`/`Plug-in project` window:
     1. Choose as `name` the name of your plugin
     2. Check `Use default location`
     3. Check `Create a Java Project`
     4. The project should be `targeted to run with` `Eclipse`
     5. `working set` is unchecked
     6. Click on `Next`

     ![Annotation 2023-04-13 1300361_NewPlug_0](https://user-images.githubusercontent.com/4437331/231739147-ecf4aeed-9be0-4a90-8fd9-5cf4da55dec2.png)

  3. In the `New plug-in Project`/`Content` window:
     1. `ID`: could contain the name of your institution and/or your project, e.g. `irit.maelia.gaml.additions`
     2. `Version`: `1.0.0.qualifier` (this latter mention is important if you plan on distributing the plugin on GAMA update site)
     3. `Name`: a concise description of the plugin
     4. Uncheck `Generate an activator`, a Java class that controls the plug-in's life cycle.
     5. Uncheck `This plug-in will make contributions to the UI`
     6. Check `No` when it asks if you would like to `create a rich client application?`
     7. Click on `Next`

     ![Annotation 2023-04-13 125516_NewPluginProject_1](https://user-images.githubusercontent.com/4437331/231737985-01040188-8ff9-4a85-b347-f6ae78d8a14a.png)
     
  4. In the `New plug-in Project`/`Templates` window:
     1. Uncheck `Create a plug-in using a template`
     2. Click on `Finish`

     ![Annotation 2023-04-13 125838_NewPluginProject_2](https://user-images.githubusercontent.com/4437331/231738745-6adda952-2b04-4488-b521-d4731e64c2c6.png)
     
     3. Your plug-in has been created.

  5. Edit the file `Manifest.MF`:
     1. From the **Project Explorer** pane, expand your plugin folder.
     2. Click on the `META-INF` folder.
     3. Click on the `MANIFEST.MF` file.

     ![Annotation 2023-04-13 171044_manifest_drawoverlays](https://user-images.githubusercontent.com/4437331/231804472-1143aaf6-79ae-457e-88be-77d0c440a88a.png)

     4. Click on the `Overview` tab to open the **Overview pane**:
     5. Check as shown `This plug-in is a singleton`
    
     6. Dependencies pane:
        1. Click on the `Dependencies`.
      
        ![Annotation 2023-04-13 172748_dependenciesPane](https://user-images.githubusercontent.com/4437331/231809312-9feaaa1c-8b85-4a1d-a86c-6f9bd214fef3.png)
 
        2. add (at least) the two plug-ins `gama.core` and `gama.dependencies` in the `Required Plug-ins`. When you click on `Add`, a new window will appear without any plug-in. Just write the beginning of the plug-in name in the text field under `Select a plug-in`
        
        ![Annotation 2023-04-13 173511_dependenciesAnnotation](https://user-images.githubusercontent.com/4437331/231811258-2a354b27-1e00-43cc-ae4e-e1932e8ca796.png)
      
      7. Click on the `Runtime` tab to open the Runtime pane:

         ![Annotation 2023-04-13 180418_runtime](https://user-images.githubusercontent.com/4437331/231819103-3fda03ba-fcb4-4a76-aba2-0970bbfe9c83.png)
    
         1. In `Exported Packages`: nothing (but when you will have implemented new packages in the plug-in you should add them there)
         2. Add in the `Classpath` all the additional libraries (`.jar` files) used in the project.
         
      8. Click on the `Extensions` tab to open the Extensions pane:       
         * Click the `Add...` button and add `gaml.extension`

      ![Annotation 2023-04-13 183311_extensions](https://user-images.githubusercontent.com/4437331/231825988-e1227adf-b81f-43b2-bc9f-0b76da0ba0d4.png)
       
   6. On the main menu, click on `File`, then select `Save`, to save the file. This should create a `plugin.xml` file.

   ![Annotation 2023-04-13 183950_pluginXML](https://user-images.githubusercontent.com/4437331/231827556-a7ad6ba5-46cf-45b5-acad-5ce58841f815.png)
 

   7. In the Project Explorer view, select the plugin, right click on it, and in the contextual menu select `Properties`:
  
      ![Annotation 2023-04-13 184528_properties](https://user-images.githubusercontent.com/4437331/231829183-4a740f6e-ed95-4bc7-a430-f443f549ff79.png)

      1. The Properties dialog for your plugin opens as shown.
         
      ![Annotation 2023-04-13 190352_annotationProcessing](https://user-images.githubusercontent.com/4437331/231832953-1023403f-8795-4e89-82e7-a53c4d5343d1.png)

      2. In the `Properties` dialog, go to `Java Compiler`, then `Annotation Processing`: check `Enable project specific settings`, then in `Generated Source Directory`, change `.apt\_generated` to `gaml`,

      ![Annotation 2023-04-13 191019_agamlAnnotation](https://user-images.githubusercontent.com/4437331/231834418-a3a12596-2192-4665-b7d2-181e97d1f2a1.png)

      3. Go again to `Java Compiler`, then `Annotation Processing`, then `Factory path`: check `Enable project specific settings`, then `Add Jars` and choose `gama.processor/gama.processor.jar`
   
      ![Annotation 2023-04-13 192132_factoryPath](https://user-images.githubusercontent.com/4437331/231836600-da9bdd60-e725-431d-ad07-f3cfc6f14607.png)

      4. Close the menu. Click on `Yes` in the succeeding dialogs (**Annotation settings changed ...**). After, this should compile the project and create the `gaml` directory.
      
      ![Annotation 2023-04-13 193119_annotationChangeStop](https://user-images.githubusercontent.com/4437331/231838985-996868f0-f03a-4827-9ec9-6d348bdcc009.png)
     
   8. Return to the `Properties` dialog of your plugin by clicking from the main menu bar, `Project`, then click on `Properties`. Go to `Java Build Path`, click on the `Source` Tab, and check that the `gaml` directory has been added. 
   ![Annotation 2023-04-14 044959_propertiesCheck](https://user-images.githubusercontent.com/4437331/231929493-ecd9577f-0bb2-4c68-94ed-0b7fe88f43e9.png)
        
   9. If the `gaml` folder is not present, click on `Add Folder...` and select the `gaml` directory. Right click on the project, then refresh it (`F5` or from the `File` menu -> `Refresh`)
      
   ![Annotation 2023-04-14 045929_refresh](https://user-images.githubusercontent.com/4437331/231931242-72263058-c751-4c46-b523-6e0d12b48fea.png)
 
   10. Now, there should be a `gaml` directory. This gaml directory will later contain the package containing `GamlAdditions.java`, and other related files generated after creating classes. If there is no package in the folder, try creating a class, then try to `refresh` or `close` the project and reopen it, or `clean` the projects by going into `Project` tabs, and clicking on `clean`.

The plug-in is ready to accept any addition to the GAML language, e.g. skills, actions, operators. To proceed to creating a skill click on this [link](DevelopingSkills).

Do not forget to export the created packages that could be used by "clients", especially the packages containing the code of the additions (in the `plugin.xml` of the new project, tab `Runtime`).

To test the plug-in and use it into GAMA, developers have to define a new **feature project** containing your plugin and its dependencies, and add this feature to the existing `gama.product` file (or a new `.product` file of your own).

The use of feature project is also mandatory to define a plug-in that can be uploaded on the update site and can be installed in the release of GAMA.


## Creation of a feature

A feature is an Eclipse project dedicated to gathering one or several plug-ins to integrate them into a product or to deploy them on the update site and install them from the GAMA release (a feature is mandatory in this case).

Here are detailed steps to create and configure a new feature.

  * `File` > `New` > `Feature project` (or `File` > `New` > `Project...` then  `Plug-in Development` > `Feature Project`)
  * In `Feature properties`
    * Choose a project name (e.g. `institution.gama.feature.pluginsName`)
    * Click on `Next`
  * In Referenced Plug-ins and fragments
    * Check `Initialize from the plug-ins list:`
    * Choose the plug-ins that have to be gathered in the feature
    * Click on `Finish`
  * A new project has been created. The `feature.xml` file will configure the feature.
    * In `Information pane`:
      * You can add description of the various plug-ins of the feature, define the copyright notice and the licence.
    * In `Plug-ins and Fragments`
      * additional plug-ins can be added.

## Addition of a feature to the product

To load the plugin into GAMA, go into the project `gama.product` open the `gama.product` file and go into the overview tab, under the section `Testing`, click `Synchronize`, go into the `Contents` tab, click on `Add...`, and add the features related to your plugin. Click the `Run` tab in the main menu bar, click on `Run Configurations...`, then you should have the gama runtime product window open, click on the `Plug-ins` tab, and check the box next to your plugin in the list. Click on `Apply`. Now that your plugin is accessible in GAMA, we can run the application. Click on `Run`.


**Remark:** To check whether the new plug-in has been taken into account by GAMA, after GAMA launch, it should appear in the Eclipse console in a line beginning by `>> GAMA bundle loaded in `.

If you plan to deploy your plugin to be used by other users from the GAMA community, proceed with the succeeding steps. If not, we can proceed with the creation of skills and types.





In the product, e.g. `gama.product` in the `gama.product` project:

  * go to `Contents` pane
    * Click on `Add...` button
    * In the window select the feature
    * Click on `OK`.


## Create examples model

In order to make your plugin usable by everyone, it is very important to bring potential users model examples to introduce new gaml primitives, statements and operators. This way, modelers can easily get into the plugin you developed in a practical way.

The process is twofold:
   * Mount your plugin into your GAMA (see below or use the `git` version)
   * Create a new project in the user model folder. Put your GAMA model examples there.
   * Move your project into a folder called `models` at the root of the plugin  

Once this is done, you can refresh your `Plugin models` library folder and have access to the plugin models


## How to make a plug-in available at GAMA update site for the GAMA release 

Considering a working GAMA plugin named institution.gama.pluginsName

### Configure plugin to be available for Maven

####  Add `pom.xml` for plugin `institution.gama.pluginsName`:
  * Right click on the project-> `Configure` -> `Convert to maven project`.
  * In the dialog that opened, set the values as this:
    * `Group id`: `institution.gama.pluginsName`
    * `Artifact id`: `institution.gama.pluginsName`
    * `Version`: `1.0.0-SNAPSHOT`, must have -SNAPSHOT if the plugin version is x.x.x.qualifier
    * `Packaging`: `eclipse-plugin`. This element is not in the list (jar/pom/war) because of the incompatible of `tycho`, `maven` and `eclipse`, so just type it in although it will be a warning
  * `Finish`

#### Configure `pom.xml` to recognize the parent `pom.xml` for Maven builds
  * Open `pom.xml` in `institution.gama.pluginsName`
  * In the tab `Overview`, `Parent` section, type in:
    * `Group id`: `org.gama`
    * `Artifact id`: `gama.experimental.parent`
    * `Version`: `2024-07-SNAPSHOT` replace by the gama version you want your plugin to be deployed for, followed by `-SNAPSHOT`
    * `Relative path`: `../gama.experimental.parent`
  * Save

#### Update maven cache in eclipse (optional)

It will fix this compilation error `Project configuration is not up-to-date with pom.xml`. Right click on the project and in the contextual menu select: `Maven`->`Update Project...` or use `Quick Fix`.


### Create a feature for the plugin

#### Create new feature

* `New` -> `Project` -> type in : `feature` -> Select `Feature Project`
* Set:
  * `Project name`: `institution.gama.feature.pluginsName`
  * Uncheck `use default location`, type in: `{current git repository}\institution.gama.feature.pluginsName`
  * `Feature Version`: `1.0.0.qualifier`
* Click `Next`
  * `Initialize from the plugin list` -> check all plugins needed: `institution.gama.pluginsName (1.0.0.qualifier)`
* `Finish`
* Open `feature.xml`, in the tab `Overview`, in the `General Information` section type in:
  * `Update Site URL`: `http://updates.gama-platform.org/experimental`
  * `Update Site Name`: `GAMA Experimental Plugins Update Site`

####  Add `pom.xml` for feature `institution.gama.feature.pluginsName`:

* Right click on the feature project -> `Configure` -> `Convert to maven project`
* Set:
  * `Group id`: `institution.gama.feature.pluginsName`
  * `Artifact id`: `institution.gama.feature.pluginsName`
  * `Version`: `1.0.0-SNAPSHOT` 
  * `Packaging`: `eclipse-feature`
* `Finish`


#### Configure `pom.xml` to recognize the parent `pom.xml` for Maven builds

* Open `pom.xml` in the project `institution.gama.pluginsName`
* In the `Overview` section in the tab `Parent` type in:
  * `Group id`: `org.gama`
  * `Artifact id`: `gama.experimental.parent`
  * `Version`: `2024-07-SNAPSHOT` replace by the gama version you want your plugin to be deployed for, followed by `-SNAPSHOT`
  * `Relative path`: `../gama.experimental.parent`
* `Save`


#### Update maven cache in eclipse (optional)
It will fix this compilation error `Project configuration is not up-to-date with pom.xml`. Select: `Maven`->`Update Project...` from the project contextual menu or use `Quick Fix`.

### Update p2updatesite
* Open `gama.experimental.p2updatesite`
* Tab `Managing the Categories` -> `Add feature` -> `institution.gama.feature.pluginsName`
