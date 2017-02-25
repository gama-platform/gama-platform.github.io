---
layout: default
title: Installing the SVN version
wikiPageName: InstallingSvnOldVersions
wikiPagePath: wiki/InstallingSvnOldVersions.md
---

# Installing the SVN version



These installation procedures have been tested on MacOS X 10.6 to 10.9, and Windows 8. On Mac OS X 10.10 (Yosemite), please have a look here: [install Java on Yosemite](Installation) for details about the Java version to use. **Eclipse 3.8.2 is the recommended Eclipse version to install GAMA**. Kepler install is still experimental.

**Important note: the current SVN version is no more compatible with the GAMA 1.6.1 release.**
  * If you plan to create plugin that should be compatible with the release, please download the GAMA code source at revision r11988 (on Google Code).
  * If you want to have the last GAMA version (new GUI and APIs), you can download the head revision. The eclipse install should also be updated:
    * EMF should be updated to the latest release available (2.10.2 in Apr. 2015)
    * Xtext should be updated to the latest release (2.8.2 in April 2015)
    * SWT 4.4
    * ummisco.gaml.editbox plugin is now mandatory.






## Detailed Instructions for Eclipse 4.4.2 (Luna SR2)
### Get and configure Eclipse Luna
  1. Download the Eclipse Modeling Tools version of Luna SR2
    * https://eclipse.org/downloads/packages/eclipse-modeling-tools/lunasr2
  1. Unpack it anywhere and run it
  1. Choose a new workspace
    * A workspace is a folder in which Eclipse stores all your projects.
  1. Install the required plugins. � Help � -> � Install new software �
    * In "work with", write "http://download.eclipse.org/modeling/tmf/xtext/updates/composite/releases/", click on "Add" and choose a name (e.g. Xtext)
      * In "Xtext", install the following one:
        * Xtext Complete SDK	2.8.2.v201504100559

### Get code source from GitHub
In Eclipse:
  1. Windows > Open Perspective > Other�
    * Git
  1. Click on "Clone a Git repository"
    * First window:
      * URI: https://github.com/gama-platform/gama.git
    * Branch Selection:
      * Check master
      * Next
    * Local Destination
      * Choose a Directory
      * Finish

You have then to import projects:
  1. Right-Click on Working Directory > Import projects
    * Select a wizard to use for importing projects:
      * "Import existing projects" should be  checked
      * "Working Directory" should be selected
      * Next
    * In Import Projects:
      * Uncheck ��Search for nested project��
      * Check the projects you want to import
      * Finish

Go back to the Java perspective





## Detailed Instructions for Eclipse 3.7.2 (Indigo)
**PLEASE NOTE THAT SUPPORT FOR THIS INSTALLATION HAS BEEN STOPPED. IF YOU CANNOT RUN A NEWER VERSION OF ECLIPSE, THEN YOU HAVE TO CHECKOUT THE LATEST VERSION OF GAMA WORKING IN INDIGO (r11438 (on Google Code)).**
  1. Download the Eclipse Modeling Tools version of Indigo
    * http://www.eclipse.org/downloads/packages/eclipse-modeling-tools/indigosr2
  1. Unpack it anywhere and run it
  1. Choose a new workspace
    * A workspace is a folder in which Eclipse stores all your projects.
  1. Install the required plugins. � Help � -> � Install new software �
    * In "Work with", type "http://download.eclipse.org/technology/subversive/0.7/update-site/" and install:
      * In "Subversive SVN Team Provider Plugin (Incubation)"
        * Subversive SVN Team Provider (Incubation)	0.7.9.I20120520-1700
    * In "work with", write "http://download.eclipse.org/modeling/tmf/xtext/updates/composite/releases/", click on "Add" and choose a name (e.g. Xtext)
      * In "Xtext-2.4.1"   (to see it, you have to uncheck the "Show only the latest versions of available software")
        * Xtext SDK	2.4.1.v201304180855
    * If you plan to build a release version, in "work with", write "http://download.eclipse.org/tools/orbit/downloads/drops/R20110523182458/repository/", click on "Add" and choose a name (e.g. ICU)
      * Type 'icu' in the text filter.
      * The site should propose you a list of plugins. Choose (if this version is not available, untick ("Show only the latest versions").
        * International Components for Unicode for Java (ICU4J) Replacement plug-in	4.4.2.v20110208
  1. Eclipse proposes to restart -> Restart now
  1. Add SVN repository exploring perspective
    * To activate this perspective, choose Window / Open Perspective / Other... and select "SVN Repository Exploring"
    * A popup appears (Discovery of SVN connector)
    * Choose: SVN Kit 1.7.x
      * Popup Unsigned content -> ok
    * Popup -> restart now
  1. Configure a new repository location:
    * File > New > Other... > SVN > Repository Location
    * URL: https://gama-platform.googlecode.com/svn
    * Finish (& wait)
  1. Checkout of the GAMA code source
    * In the SVN repository view, navigate to the directory "branches/GAMA\_CURRENT" and select "Find/Checkout As..." from the contectual menu.
    * Choose "Find projects in the children of the selected resource" and follow the indications.
    * Pop-up "Check Out projects", all projects should be selected. Finish.
    * Once the checkout is finished, switch to Java Perspective.

To compile and run GAMA properly, you will need to configure your Eclipse IDE and the GAMA `.product` file.
  1. By default, Eclipse uses Java 7 when it is installed whereas GAMA only needs Java 6. On MacOS X in particular, we may have to change the version of the JDK to ensure that GAMA will run smoothly.
    * Window->Preferences
    * In: Java / Compiler: set "Compiler compliance level" to 1.6
    * In: Java / Installed JREs -> Add -> Standard VM -> JRE home -> Directory and choose the directory of a Java 6 JDK (preferable) or a Java 7 JDK (except for MacOS X, see [Installation](Installation)).
      * Download the JDK 6 (for Windows & Linux) [here](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase6-419409.html#jdk-6u45-oth-JPR)
      * Download the JDK 7 (for Windows & Linux) [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
      * Download the JDK 6 (for Mac OS X) [here](http://support.apple.com/kb/DL1572). To switch between 1.7 and 1.6 (if both are installed), look at the use of `java-home` on this [page](http://docs.oracle.com/javase/7/docs/webnotes/install/mac/mac-jdk.html).
    * In: Java / Installed JREs -> select Java 1.6 (for Mac) or 1.7 (on Windows & Linux).
  1. You should configure the GAMA `.product` file depending on your OS.
    * In the `msi.gama.application` project, open the `gama1.6.1.feature_based_release.product` file.
    * In: the "Launching" tab: check whether the launching options are correct
      * In particular, for a 32bits OS, you have to change in "VM Arguments" "-Xmx1536m" into "-Xmx1024m"
      * For 64bits OS, check that the option "-d32" is not in the "VM Arguments" (otherwise delete it) in the "macosx" specific tab.
  1. Compile and Run GAMA
    * Do a "Project -> Clean... (clean all projects)"
    * In the .product file, in "Overview" tab:
      * click on the � Synchronize � link. This will ensure your product has updated the inclusion of the plugins (from both Eclipse and the new XText). Do not forget to save it.
      * The product, or some of the included features, may complain about missing plugins (identified by an error icon on the plugin icon in the dependencies view). It is normal for "fragments" that apply to another OS than yours and it is harmless in this case. If you are, however, concerned about this, you can install the "delta-pack" for Eclipse 3.7.2 or Eclipse 3.8.2 (follow these steps: http://ugosan.org/eclipse-rcp-delta-pack/. The delta pack itself can be downloaded from [here](http://archive.eclipse.org/eclipse/downloads/drops/R-3.7.2-201202080800/download.php?dropFile=eclipse-3.7.2-delta-pack.zip)).
      * If one of the missing plugins happens to be "com.ibm.icu.base" (and you did not want to install it as told above), you can replace it by "com.ibm.icu" without worries.
      * As of GAMA 1.6.1, we use a version of the SWT binary fragments that is not the one shipped with Eclipse Indigo nor Juno. Although it is not mandatory to use it, it is required if you plan to produce release versions of GAMA from your product. To install it, simply download this [file](https://drive.google.com/file/d/0B8DTAk4nDgyNNmN0NkMtX1RDRDA/edit?usp=sharing) and install it like the delta pack above.
      * click on the � Launch an Eclipse application � link. Note that a run configuration will be automatically created allowing to only click on the run button for future runs.

**If the GAMA launch crashes:**
  * Open Run configurations....
  * In Eclipse Application / gama1.6.1.feature\_based\_release.product configuration, open the plug-ins pane
  * After Launch with: , choose "all workspace and enable plug-ins".




## Detailed Instructions for Eclipse 3.8.2

First note that GAMA will not work with the packaged Juno version (in fact version 4.2 of Eclipse). Instead, you will need to download the core Eclipse package (Eclipse SDK) from http://archive.eclipse.org/eclipse/downloads/drops/R-3.8.2-201301310800/ , and to install additional plugins using this repository: http://download.eclipse.org/releases/juno/ . Among these additional plugins, only the EMF (Eclipse Modeling Framework) components should be necessary. In "Modeling":
  * EMF - Eclipse Modeling Framework SDK
  * EMF Validation Frameworkd SDK

The same instructions (than for Eclipse 3.7.2) can then be applied to this installation, with three differences :
  * The delta-pack for Juno is available [here](http://archive.eclipse.org/eclipse/downloads/drops/R-3.8.2-201301310800/download.php?dropFile=eclipse-3.8.2-delta-pack.zip).
  * The name of the product to use is  `gama1.6.1.feature_based_Eclipse3_8_2_updatable_release.product`
  * The version of XText to use is 2.8.2 and it should be obtained from [here](http://download.eclipse.org/modeling/tmf/xtext/updates/composite/releases/), as this site will also provide updates for EMF and other components necessary for XText to work (you may need to install these components first, notably EMF ones, if the installation of XText does not work).





## Detailed Instructions for Eclipse 4.3.2 (Kepler)
  1. Download the Eclipse Modeling Tools version
  * http://www.eclipse.org/downloads/packages/eclipse-modeling-tools/keplersr2
    1. Unpack it anywhere and run it
    1. Choose a new workspace
      * A workspace is a folder in which Eclipse stores all your projects.
    1. Install the required plugins. � Help � -> � Install new software �
      * In "Work with", type "http://download.eclipse.org/technology/subversive/0.7/update-site/" and install:
        * In "Subversive SVN Team Provider Plugin (Incubation)"
          * Subversive SVN Team Provider (Incubation)	0.7.9.I20120520-1700
      * In "work with", write "http://download.itemis.de/updates/", click on "Add" and choose a name (e.g. Xtext)
        * In "Xtext-2.5.3"
          * Xtext SDK	2.5.3.v20140220820
        * In "Xtext Antlr-2.1.0"
          * Xtext Antlr SDK 2.1.0.v201308291703
      * If you plan to build a release version, in "work with", write "http://download.eclipse.org/tools/orbit/downloads/drops/R20110523182458/repository/", click on "Add" and choose a name (e.g. ICU)
        * Type 'icu' in the text filter.
        * The site should propose you a list of plugins. Choose (if this version is not available, untick ("Show only the latest versions").
          * International Components for Unicode for Java (ICU4J) Replacement plug-in	4.4.2.v20110208
    1. Eclipse proposes to restart -> Restart now
    1. Add SVN repository exploring perspective
      * To activate this perspective, choose Window / Open Perspective / Other... and select "SVN Repository Exploring"
      * A popup appears (Discovery of SVN connector)
      * Choose: SVN Kit 1.7.x
        * Popup Unsigned content -> ok
      * Popup -> restart now
    1. New > repository location
      * https://gama-platform.googlecode.com/svn
      * Finish (& wait)
    1. Checkout of the GAMA code source
      * In the SVN repository view, navigate to the directory "branches/GAMA\_CURRENT" and select "Find/Checkout As..." from the contectual menu.
      * Choose "Find projects in the children of the selected resource" and follow the indications.
      * Pop-up "Check Out projects", all projects should be selected. Select "Check out as a folders into workspace". Click "Next" and then "Finish".
      * Once the checkout is finished, switch to Java Perspective.
    1. Configure Build path of all projects :
      * In the Properties of project, Java build path category, Libraries tab, click on JRE System Libray to change Excution environment from Java 1.6 to Java 1.7
    1. Configure the GAMA `.product` file (gama1.6.1.feature\_based\_release.jogl2.product) :
      * In the `msi.gama.application` project, open the `gama1.6.1.feature_based_release.jogl2.product` file
      * In the "Dependencies" tab:
        * Choose all `org.eclipse.equinox.*` plugins and remove them.
      * Click `Add` button, type in `org.eclipse.equinox` and add all displayed packages.
      * Click `Add` button, type in `org.eclipse.e4`, then select all and click OK.
      * Click `Add Required` button, this will add two more: `org.eclipse.emf.ecore` and `org.eclipse.emf.common`
    1. Configure `ummisco.gama.feature.dependencies` project:
      * In the `ummisco.gama.feature.dependencies` project, open the `feature.xml` file
      * In: the "Plugin" tab:
        * Click `Add` and type in `org.w3c.dom`, choose `org.w3c.dom.events` and `org.w3c.dom.smil`, click OK.
    1. Compile and Run GAMA
      * Do a "Project -> Clean... (clean all projects)"
      * In `gama1.6.1.feature_based_release.jogl2.product` file, in "Overview" tab.
        * click on the � Synchronize � link. This will ensure your product has updated the inclusion of the plugins (from both Eclipse 3.7 and the new XText). Do not forget to save it.
        * click on the � Launch an Eclipse application � link. Note that a run configuration will be automatically created allowing to only click on the run button for future runs.
Have fun!





## Install additional plug-ins

### Install the Graphical Modeling Framework

This installation procedure has been tested on a macbook pro with macosx 10.6 64 bits.

**Important note**: for the moment, the plug-in works only with Eclipse Indigo and graphiti 0.8. Some modifications will be made later to make it works with the latest version of Eclipse and graphiti.

#### Details

The graphical modeling framework is based on the [Graphiti](http://www.eclipse.org/graphiti/) plug-in.

  1. The first step consists in installing the graphiti plug-ins : � Help � -> � Install new software �
In "Work with", choose "Indigo - http://download.eclipse.org/releases/indigo" and install: Graphiti, Graphiti Export, Graphiti SDK and Graphiti SDK Plus.
  1. Eclipse proposes to restart -> Restart now
  1. � Help � -> � Check of Updates �
  1. Install the proposed updates
  1. Eclipse proposes to restart -> Restart now
  1. From the GAMA SVN, checkout the idees.gama.graphicalmodeling, idees.gama.emf.metamodel and idees.gama.feature.graphical\_modeling projects.
    * In the SVN repository view, navigate to the directory "branches/GAMA\_CURRENT" and select the three mentioned projects and select "Find/Checkout As..." from the contectual menu.
    * Choose "Find projects in the children of the selected resource" and follow the indications.
    * Pop-up "Check Out projects", all projects should be selected. Finish.
    * Once the checkout is finished, switch to Java Perspective.
  1. You have to add the plugin to the GAMA `.product` file .
    * In the `msi.gama.application` project, open the `gama1.6.1.feature_based_release.product` file
    * In: the "Dependencies" tab: click on "Add ..." and select the idees.gama.feature.graphical\_modeling plugin
    * In: the "Dependencies" tab: click on "Add Required plug-ins" then save the file
  1. Compile and Run GAMA
    * Do a "Project -> Clean... (clean all projects)"
    * In `gama1.6.1.feature_based_release.product` file, in "Overview" tab.
      * click on the � Synchronize � link. This will ensure your product has updated the inclusion of the plugins. Do not forget to save it.
      * click on the � Launch an Eclipse application � link. Note that, a run configuration will be automatically created allowing to only click on the run button for future runs.

#### Note
If you have some errors on the META-INF/MANIFEST.MF file (in particular on the line  `org.eclipse.draw2d;bundle-version="3.8.3"`), you can follow next steps.

  1. Fix the MANIFEST.MF error (if any)
    * In the plug-in idees.gama.graphicalmodeling, open the file : META-INF/MANIFEST.MF
    * In the 'Dependencies' pane,
      * Select org.eclipse.draw2d (3.8.1) and click on the 'Properties' button
      * In 'Available version to match', select the one you have (mine is the v 3.7.2), and click on 'Match' and 'OK'
    * Save the file
    * Repeat Step 8 (clean, synchronize...)





### Install additional plug-ins to generate the documentation
  1. A plug-in to use Python should be installed as additional plug-ins: � Help � -> � Install new software �
In "Work with", choose "http://pydev.org/updates" and install: PyDev for Eclipse.
  1. Configure the Python Interpreters:
Eclipse -> Preferences -> PyDev -> Interpreters -> Python Interpreter: Quick auto-config.
