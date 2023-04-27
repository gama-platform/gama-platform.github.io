---
title:  Installing the GIT version
---


**Important note:** the current Git version contains 1 main branche:
  * `GAMA_1.9.2`: that contains the code of the GAMA alpha(GAMA 1.9.2) (it works with **JDK 17 LTS** and **Eclipse 2022-12**).

**Changes made to other branches won't be added to the next gama release**

The following tutorial describes the installation for this version.

## Install Eclipse **2022-12**

Download the ["Installer of 2022-12"](https://www.eclipse.org/downloads/packages/release/2022-12/r/eclipse-ide-java-and-dsl-developers) and choose to install the **Eclipse IDE for Java and DSL Developers** version. This is the latest version under which GAMA is certified to work. 

Note: Regarding Java, Eclipse embeds the [Adoptium (ex _Adopt-OpenJDK_) 17 LTS (HotSpot)](https://adoptium.net/releases.html?variant=openjdk17&jvmVariant=hotspot), which is the recommanded version for GAMA, you may be able to use another one, but we won't fix any related issue. 


## Install GAMA source code

The source is to be downloaded from GitHub in two steps: by creating a local clone of the GitHub repository and then importing the different projects that constitute GAMA into the Eclipse workspace.

1. Open the Git perspective:
  * Windows > Perspective > Open Perspective > Other...
  * Choose `Git`
![Open GIT perspective](/resources/images/developpingExtension/GIT_open_perspective.png)
2. Click on "Clone a Git repository"
![Clone Repository](/resources/images/developpingExtension/GIT_Clone_Repository.png)
  * In **Source Git repository** window: 
    * Fill in the URI label with: `https://github.com/gama-platform/gama.git`
    * Other fields will be automatically filled in.
![Source GIT repository](/resources/images/developpingExtension/GIT_source_git_repository.png)    
  * In **Branch Selection** windows, 
    * check the `GAMA_1.9.2` branch
    * Next

![gama_import](https://user-images.githubusercontent.com/55246822/167071984-130df447-fa3b-490e-acdb-32831cf1f970.PNG)  
* In **Local Destination** windows,
    * Choose a Directory (where the source files will be downloaded).
    * Everything else should be unchecked 
    * Finish

![Local destination](/resources/images/developpingExtension/GIT_local_destination.png)

This can take a while...


### Import projects into workspace
You have now to import projects into the workspace (notice that the folders downloaded during the clone will neither be copied nor moved).

_**Note:** contrarily to previous Eclipse versions, import project from the Git perspective does not work properly for GAMA._

1. In the **Java perspective**, choose:
  * `File` / `Import...`,

![Context Working tree](/resources/images/developpingExtension/dialog_install_EOxy_ImportProjects.png)

  * In the install window, select `Git` / `Projects from Git`,
  * Click on Next,
  * In the `Project from Git` window, select `Existing local repository.`,

![Context Local Repository](/resources/images/developpingExtension/dialog_install_EOxy_ImportRespositorySource.png)

  * Click on Next,
  * In the new window, select your Git repository,
  * Click on Next,
  * In the **Select a wizard to used to import projects**, check that 
    * Import existing Eclipse projects is selected
    * Working Tree is selected

![GIT Import projects](/resources/images/developpingExtension/dialog_install_EOxy_ImportWizard.png)    

  * Click on Next,
  * In the **Import project** window,
    * **Uncheck Search for nested projects**
    * Select all the projects
![Choose Projects to import](/resources/images/developpingExtension/GIT_ChooseProjectToImport.png)

  * Finish
3. Clean project (Project menu > Clean ...)


### If you have errors...
If errors continue to show on in the different projects, be sure to correctly set the JDK used in the Eclipse preferences. GAMA (version 1.9.2) is targeting JDK 17, and Eclipse could produce errors if it did not find in your environment. So, either you set the compatibility to 17 by default (in Preferences > Java > Compiler > Compiler Compliance Level) or you change the error produced by Eclipse to a warning only (in Preferences > Java > Compiler > Building > "No strictly compatible JRE for execution environment available).

On Windows : if the project still don't compile, try to add the vm argument in eclipse.ini files (inside the directory where your eclipse is installed)
before the -startup line
Example : 
```
-vm

C:\Program Files\Java\JDK17\bin

-startup 

.....
```

### Run GAMA
0. Be sure to be in the Java Perspective (top right button)
1. In the `ummisco.gama.product` plugin, open the `gama.product` file (`gama.headless.product` is used to produce the headless).
3. Go to "Overview" tab and click on Synchronize
4. Click on "Launch an Eclipse Application"


### GIT Tutorials
For those who want to learn more about Git and Egit, please consult the following tutorials/papers

1. EGIT/User Guide http://wiki.eclipse.org/EGit/User_Guide
2. Git version control with Eclipse (EGIT) - Tutorial http://www.vogella.com/tutorials/EclipseGit/article.html
3. 10 things I hate about Git http://stevebennett.me/2012/02/24/10-things-i-hate-about-git/
4. Learn Git and GitHub Tutorial https://www.youtube.com/playlist?list=PL1F56EA413018EEE1
