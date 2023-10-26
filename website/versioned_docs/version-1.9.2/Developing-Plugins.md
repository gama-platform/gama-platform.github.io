---
title:  Developing Plugins
---


This page details how to create a new plug-in in order to extend the GAML language with new skills, species, displays or operators.
It also details how to create a plug-in that can be  uploaded on an update site and can be installed into the GAMA release.
We consider here that the developer version of GAMA has been installed (as detailled in [this page](InstallingGitVersion)).



## I. Creation of a plug-in

Here are detailed steps to create and configure a new GAMA plug-in.

  
  1. From the Eclipse main menu tab, click on File, then New, then Project, then finally select plug-in project.
     ![Annotation 2023-04-14 051051_fileNPP](https://user-images.githubusercontent.com/4437331/231932044-e687832c-b826-4363-876b-5858bad7102b.png)

  2. In the "New plug-in Project" / "Plug-in project" window:
     1. Choose as **name** « name\_of\_the\_plugin » (or anything else)*
     2. Check "Use defaut location"
     3. Check "Create a Java Project"
     4. The project should be targeted to run with Eclipse
     5. working set is unchecked
     6. Click on "Next"

     ![Annotation 2023-04-13 1300361_NewPlug_0](https://user-images.githubusercontent.com/4437331/231739147-ecf4aeed-9be0-4a90-8fd9-5cf4da55dec2.png)

  3. In the "New plug-in Project" / "Content" window:
     1. Id : could contain the name of your institution and/or your project, e.g. « irit.maelia.gaml.additions »
     2. version 1.0.0.qualifier (this latter mention is important if you plan on distributing the plugin on GAMA update site)
     3. Name «This is my First Plugin.»
     4. Uncheck "Generate an activator, a Java class that controls the plug-in's life cycle" ,
     5. Uncheck "This plug-in will make contributions to the UI"
     6. Check "No" when it asks "Would you like to create a rich client application ?"
     7. Click on "Next"

     ![Annotation 2023-04-13 125516_NewPluginProject_1](https://user-images.githubusercontent.com/4437331/231737985-01040188-8ff9-4a85-b347-f6ae78d8a14a.png)
     
  4. In the "New plug-in Project" / "Templates" window:
     1. Uncheck "Create a plug-in using one of the templates"
     2. Click on "Finish"

     ![Annotation 2023-04-13 125838_NewPluginProject_2](https://user-images.githubusercontent.com/4437331/231738745-6adda952-2b04-4488-b521-d4731e64c2c6.png)
     
     3. Your plug-in has been created.

  5. Edit the file "Manifest.MF":
     1. From the Project Explorer pane, expand your plugin folder.
     2. Click on the META-INF folder.
     3. Click on the MANIFEST.MF file.

     ![Annotation 2023-04-13 171044_manifest_drawoverlays](https://user-images.githubusercontent.com/4437331/231804472-1143aaf6-79ae-457e-88be-77d0c440a88a.png)

     4. Click on the Overview tab to open the **Overview pane**:
     5. On the Overview pane, check as shown « This plug-in is a singleton »
    
     6. Dependencies pane:
        1. Click on the Dependencies tab to open the Dependencies Pane.
      
        ![Annotation 2023-04-13 172748_dependenciesPane](https://user-images.githubusercontent.com/4437331/231809312-9feaaa1c-8b85-4a1d-a86c-6f9bd214fef3.png)
 
        2. add (at least minimum) the two plug-ins "msi.gama.core" and "msi.gama.ext" in the "Required Plug-ins". When you click on "Add", a new window will appear without any plug-in. Just write the beginning of the plug-in name in the text field under "Select a plug-in"
        
        ![Annotation 2023-04-13 173511_dependenciesAnnotation](https://user-images.githubusercontent.com/4437331/231811258-2a354b27-1e00-43cc-ae4e-e1932e8ca796.png)
      
      7. Click on the Runtime tab to open the Runtime pane:

         ![Annotation 2023-04-13 180418_runtime](https://user-images.githubusercontent.com/4437331/231819103-3fda03ba-fcb4-4a76-aba2-0970bbfe9c83.png)
    
         1. In exported Packages: nothing (but when you will have implemented new packages in the plug-in you should add them there)
         2. Add in the classpath all the additional libraries (.jar files) used in the project.
         
      8. Click on the Extension tab to open the Extensions pane:       
         * Click the Add button and add "gaml.extension"

      ![Annotation 2023-04-13 183311_extensions](https://user-images.githubusercontent.com/4437331/231825988-e1227adf-b81f-43b2-bc9f-0b76da0ba0d4.png)
       
   6. On the main menu, click on File, then select, Save, to save the file. This should create a "plugin.xml" file.

   ![Annotation 2023-04-13 183950_pluginXML](https://user-images.githubusercontent.com/4437331/231827556-a7ad6ba5-46cf-45b5-acad-5ce58841f815.png)
 

   7. In the Project Explorer pane, Select the plugin, right_click, and in the dropdown menu select Properties:
  
      ![Annotation 2023-04-13 184528_properties](https://user-images.githubusercontent.com/4437331/231829183-4a740f6e-ed95-4bc7-a430-f443f549ff79.png)

      1. The Properties for myFIrstPlugin dialog opens as shown.
         
      ![Annotation 2023-04-13 190352_annotationProcessing](https://user-images.githubusercontent.com/4437331/231832953-1023403f-8795-4e89-82e7-a53c4d5343d1.png)

      2. In the Properties dialog .. Go to Java Compiler, then Annotation Processing: check "Enable project specific settings", then in "Generated Source Directory", change ".apt\_generated" to "gaml",

      ![Annotation 2023-04-13 191019_agamlAnnotation](https://user-images.githubusercontent.com/4437331/231834418-a3a12596-2192-4665-b7d2-181e97d1f2a1.png)

      3. Go again to Java Compiler, then Annotation Processing, then Factory path: check "Enable project specific settings", then "Add Jars" and choose "msi.gama.processor/processor/plugins/msi.gama.processor.1.4.0.jar"
   
      ![Annotation 2023-04-13 192132_factoryPath](https://user-images.githubusercontent.com/4437331/231836600-da9bdd60-e725-431d-ad07-f3cfc6f14607.png)

      4. Close the menu. Click on Yes in the succeeding dialogs (Annotation settings changed ..). After, this should compile the project and create the `gaml` directory.
      
      ![Annotation 2023-04-13 193119_annotationChangeStop](https://user-images.githubusercontent.com/4437331/231838985-996868f0-f03a-4827-9ec9-6d348bdcc009.png)
     
   8. Return to the Properties dialog of your plugin by clicking from the main menu bar, Project, then click on Properties. Go to Java Build Path, click on the Source Tab, and check that the gaml directory has been added. 
   ![Annotation 2023-04-14 044959_propertiesCheck](https://user-images.githubusercontent.com/4437331/231929493-ecd9577f-0bb2-4c68-94ed-0b7fe88f43e9.png)
        
   9. If the gaml folder is not present, click on Add Folder and select the gaml directory. Right click on the project, then refresh it (F5 or from the File menu -> Refresh)
      
   ![Annotation 2023-04-14 045929_refresh](https://user-images.githubusercontent.com/4437331/231931242-72263058-c751-4c46-b523-6e0d12b48fea.png)
 
   10. Now, there should be a gaml directory. This gaml directory will later contain the package containing GamlAdditions.java, and other related files created after creating classes. If there is no package in the folder, try creating a class, then try to refresh or close the project and reopen it, or clean the projects by going into Project tabs, and clicking on clean.

The plug-in is ready to accept any addition to the GAML language, e.g. skills, actions, operators. To proceed to creating a skill click on this [link](https://github.com/gama-platform/gama/wiki/DevelopingSkills).

Do not forget to export the created packages that could be used by "clients", especially the packages containing the code of the additions (in the plugin.xml of the new project, tab "Runtime").

To test the plug-in and use it into GAMA, developers have to define a new feature project containing your plugin and its dependencies, and adds this feature to the existing product (or a new .product file of your own).

The use of feature is also mandatory to define a plug-in that can be uploaded on the update site and can be installed in the release of GAMA.





## Creation of a feature

A feature is an Eclipse project dedicated to gather one or several plug-ins to integrate them into a product or to deploy them on the update site and install them from the GAMA release (a feature is mandatory in this case).

Here are detailled steps to create and configure a new feature.

  * File > New > Feature project (or File > New > Project... then  Plug-in Development > Feature Project)
  * In Feature properties
    * Choose a project name (e.g. "institution.gama.feature.pluginsName")
    * Click on "Next"
  * In Referenced Plug-ins and fragments
    * Check "Initialize from the plug-ins list:"
    * Choose the plug-ins that have to be gathered in the feature
    * Click on "Finish"
  * A new project has been created. The "feature.xml" file will configure the feature.
    * In "Information pane":
      * You can add description of the various plug-ins of the feature, define the copyright notice and the licence.
    * In "Plug-ins and Fragments"
      * In the Plug-ins and Fragments, additional plug-ins can be added.




## Addition of a feature to the product

To load the plugin into GAMA, go into the project ummisco.gama.product and open gama.product and go into the overview tab, under the section Testing, click Synchronize, go into the contents tab, click on Add, and add the features related to your plugin. Click the Run tab in the main menu bar, click on Run Configuration, then you should have the gama runtime product window open, click on the plugins tab, and check your plugin in the list. Click on Apply. Now your plugin is accessible in GAMA, now we can run the application. Click on Run.


**Remark:** To check whether the new plug-in has been taken into account by GAMA, after GAMA launch, it should appear in the Eclipse console in a line beginning by ">> GAMA bundle loaded in ".

If you plan to deploy your plugin to be used by other users from the GAMA community, proceed with the succeeding steps. If not, we can proceed with the creation of skills and types.








In the product, e.g. `gama.product` in the `ummisco.gama.product` project:

  * Contents pane
    * Click on Add button
    * In the window select the feature
    * Click on OK.





## Create examples model

In order to make your plugin usable by everyone, it is very important to bring potential users model examples to introduce new gaml primitives, statements and operators. This way, modelers can easily get into the plugin you developed in a practical way.

The process is twofold:
   * Mount your plugin into your GAMA (see below or use the Git version)
   * Create a new project in the user model folder. Put your GAMA model examples there.
   * Move your project into a folder called "models" at the root of the plugin  

Hence this is done, you can update your Plugin models library folder and have access to the plugin models


## How to make a plug-in available at GAMA update site for the GAMA release 

Considering a working GAMA plugin named institution.gama.pluginsName

### Configure plugin to be available for Maven

a/ Add `pom.xml` for plugin `institution.gama.pluginsName`:

* Right click -> Configure -> Convert to maven project to add pom.xml:
* Set:
  * Group id: institution.gama.pluginsName
  * Artifact id: institution.gama.pluginsName
  * Version: 1.0.0-SNAPSHOT // must have -SNAPSHOT if the plugin version is x.x.x.qualifier
  * Packaging: eclipse-plugin  // this element is not in the list (jar/pom/war) because of the incompatible of tycho, maven and eclipse, so just type it in although it will be a warning
* Finish

b/ Configure pom.xml to recognize the parent pom.xml for Maven builds

* Open pom.xml in institution.gama.pluginsName
* Tab overview, Parent section, type in:
  * Group id: msi.gama
  * Artifact id: msi.gama.experimental.parent
  * Version: 1.7.0-SNAPSHOT
  * Relative path: ../msi.gama.experimental.parent
* Save

c/ Update maven cache in eclipse (optional)
It will fix this compilation error "Project configuration is not up-to-date with pom.xml. Select: Maven->Update Project... from the project context menu or use Quick Fix."

* Right click -> Maven -> Update project


### Create a feature for the plugin

a/ Create new feature

* New -> Project -> type in : feature -> Select "Feature Project"
* Set:
  * Project name: institution.gama.feature.pluginsName
  * Uncheck use default location, type in: `{current git repository}\aaa.bbb.feature.ccc`
  * Feature Version: 1.0.0.qualifier
  * Update Site URL: http://updates.gama-platform.org/experimental
  * Update Site Name: GAMA 1.7.x Experimental Plugins Update Site
* Click Next
  * Initialize from the plugin list -> check all plugins needed:
    institution.gama.pluginsName (1.0.0.qualifier)
* Finish

b/  Add `pom.xml` for feature `institution.gama.feature.pluginsName`:

* Right click -> Configure -> Convert to maven project (to add pom.xml)
* Set:
  * Group id: institution.gama.feature.pluginsName
  * Artifact id: institution.gama.feature.pluginsName
  * Version: 1.0.0-SNAPSHOT 
  * Packaging: eclipse-feature
* Finish

c/ Configure `pom.xml` to recognize the parent `pom.xml` for Maven builds

* Open pom.xml in institution.gama.pluginsName
* Tab overview, Parent section, type in:
  * Group id: msi.gama
  * Artifact id: msi.gama.experimental.parent
  * Version: 1.7.0-SNAPSHOT
  * Relative path: ../msi.gama.experimental.parent
* Save


d/ Update maven cache in eclipse (optional)
It will fix this compilation error "Project configuration is not up-to-date with pom.xml. Select: Maven->Update Project... from the project context menu or use Quick Fix."

* Right click -> Maven -> Update project


### Update p2updatesite category.xml (this step will be done automatically by travis, soon)
Open msi.gama.experimental.p2updatesite

* Tab Managing the Categories -> Add feature -> institution.gama.feature.pluginsName



## How to make a plug-in available as an extension for the GAMA release (obsolete)

Once the plug-in has been tested in the GAMA SVN version, it can be made available for GAMA release users.

First, the `update_site` should be checked out from the SVN repository:

  * File > New > Other... > SVN > Project from SVN
  * In Checkout Project from SVN repository
    * Use existing repository location (it is the same location as for the GAMA code)
    * Next
  * In Select resource:
    * Browse
      * choose svn > update\_site
    * Finish
  * Finish

Now the update\_site project is available in the project list (in Package Explorer).
The sequel describes how to add a new feature to the update site.

  * Open the `site.xml` file
  * In update site Map:
    * Click on Extensions
    * click on the Add Feature... button
      * Choose the feature to be added
      * It should appear in Extensions
    * Select the added feature and click on the Synchronize... button
      * Check Synchronize selected features only
      * Finish
    * Select the added feature and click on the Build button
  * All the files and folder of the update\_site project have been modified.
  * Commit all the modifications on the SVN repository
    * Richt-click on the project, Team > Update
    * Richt-click on the project, Team > Commit...

The plug-in is now available as an extension from the GAMA release.
More details about the update of the GAMA release are available [on the dedicated page](Updating).
