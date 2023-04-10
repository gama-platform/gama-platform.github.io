---
title:  Troubleshooting
---


This page exposes some of the most common problems a user may encounter when running GAMA — and offers advices and workarounds for them. It will be regularly enriched with new contents. Note also that the [Issues section](https://github.com/gama-platform/gama/issues) of the website might contain precious information on crashes and bugs encountered by other users. If neither the workarounds described here nor the solutions provided by other users allow to solve your particular problem, please submit a new issue report to the developers.

## On Ubuntu (& Linux Systems)

### Workaround if OpenGL display crash GAMA
In case GAMA crashes whenever trying to display an OpenGL display or a Java2D, and you are running Ubuntu 21.10 (or earlier), it probably means that you're using **Wayland** as Display backend. You can fix it by running in a terminal `export GDK_BACKEND=x11` and launch GAMA from this same terminal. This workaround is described [here](https://bugs.eclipse.org/bugs/show_bug.cgi?id=577515) and in [Issue 3373](https://github.com/gama-platform/gama/issues/3373).

### Wrong dark theme

GAMA have trouble managing custom GTK theme (specially dark ones, see [this issue](https://github.com/gama-platform/gama/issues/3137#issuecomment-881300323)). The simplest solution is to explicit change the theme to the default Adwaita as an override of the environment variable.

#### Change desktop application

Simply edit the file at `/usr/share/applications/gama-platform.desktop` and add `GTK_THEME=Adwaita` on the line starting by `Exec=`. You should have something like this : 

```
Exec=env GTK_THEME=Adwaita GDK_BACKEND=x11 /opt/gama-platform/Gama
```

Save the file wait a few seconds and restart GAMA normally.

Note, if you want to force the dark mode, add this instead `GTK_THEME=Adwaita:dark`

#### From command line (hard)

If you are starting GAMA from the command line, use this command : 

```
GTK_THEME=Adwaita /path/to/Gama
```

or this one to use the dark theme variant :  

```
GTK_THEME=Adwaita:dark /path/to/Gama
```


## On macOS 

### First launch of GAMA should be in GUI mode

When GAMA has just been downloaded and installed, it needs to be first launched in its GUI version before using it in the headless mode.
If it is first launched in the headless mode, GAMA will be damaged and the installed version needs to be removed and re-installed.

### Detached displays "vanish" when moved to a secondary monitor (see #3670)

This is a know bug in Eclipse as well, only on macOS. The only workaround consists in (1) detaching the display as usual on the same monitor than GAMA; (2) pressing F3 to display all active windows on screen; (3) grabbing and moving "by hand" the window corresponding to the detached display to the second monitor. It will then work as usual. 

## On Windows

### Problem with some Radeon graphics cards and Opengl display

Some Radeon graphics cards may cause GAMA to crash when using Opengl displays. The best solutions in this case are either to switch to java2D display or, if the computer is equipped with two graphics cards, to specify that the other graphics card should be used for GAMA (see [here](https://pureinfotech.com/set-gpu-app-windows-10/)). 
Sometimes just setting the second GPU as recommended for GAMA won't be enough and Windows will still try to run it from the Radeon chipset, you can try setting the second GPU as the default GPU for everything, for example with NVIDIA cards, in NVidia control panel you can set it as `prefered graphics processor` in the `Global settings` tab.
Alternatively, it has been reported that installing the latest version of `AMD Software: Adrenalin edition` (last tried successfully with 22.10.1) solved the problem but at the cost of very slower rendering.


### Problem with java2D displays

For high-DPI screens, it is possible to observe an offset in java2D displays (not centered, not taking the whole panel, with an erroneous mouse location) with some scaling ratios. [Changing the scaling factor](https://support.microsoft.com/en-us/windows/view-display-settings-in-windows-37f0e05e-98a9-474c-317a-e85422daa8bb#WindowsVersion=Windows_10) to 100%, 125%, 150% or 200% should solve the problem.

### General display problems (blurry icons, strange experiment displays, dark icons, blurry text, different appearance on second screen etc.)

In some computer we noticed numerous display problems those are hard to reproduce because they depend on a specific mix between hardware and software.
If you ever encounter that kind of issue, there are two ways for you to try and act on them: the high DPI settings and the Windows scaling ratio.

#### High DPI settings
Most of those problems can be solved by setting the right high DPI settings in Windows. 
To do so, go to your `Gama.exe` file and right click on it. There chose `Properties` and then click on the `Compatibility` tab. Finally click on the `Change high DPI settings` button:

![image](https://user-images.githubusercontent.com/6374469/226245626-d9e0652d-82e3-445f-839f-a0892dbc4a62.png)

A new window opens, if you installed gama through the installer you should see the `High DPI scaling override` option checked and the `System` value selected. 

![image](https://user-images.githubusercontent.com/6374469/226247023-d233cd47-919b-48cc-804d-000c3d72c8ef.png)

If it's not the case, you can try to set it and then in the properties window click on `Apply` and try to run gama again to see if there's some improvement. If not you can try with different values or to play with the `Program DPI` setting too.


#### Scaling ratio
Many of those issues are related to the the scaling ratio you are using in your windows. If the previous tip didn't work, you can try to play a bit with your scaling ratios to see if there's any improvement. In general, if you have problems we recommend that you stick to the 100% or 200% as those are the values that works the best from our experience. If you have multiple displays and experience problems when  moving gama from one to another, we also recommend that you use the same scaling ratio for the two displays. If not possible, setting as you main monitor the one were gama is going to run could also solve some issues.


## Memory problems
The most common causes of problems when running GAMA are memory problems. Depending on your activities, on the size of the models you are editing, on the size of the experiments you are running, etc., you have a chance to require more memory than what is currently allocated to GAMA. A typical GAMA installation will need between 2 and 4GB of memory to run "normally" and launch small models.
Memory problems are easy to detect: in the bottom-right corner of its window, GAMA will always display the status of the current memory. The first number represents the memory currently used (in MB), the second (always larger) the memory currently allocated by the JVM. And the little trash icon allows to "garbage collect" the memory still used by agents that are not used anymore (if any). If GAMA appears to hang or crash and if you can see that the two numbers are very close, it means that the memory required by GAMA exceeds the memory allocated.


![Memory bar status in GAMA.](/resources/images/installationAndLaunching/trouble_memory_status.png)

There are two ways to circumvent this problem: the first one is to increase the memory allocated to GAMA by the Java Virtual Machine. The second, detailed [on this page](OptimizingModels) is to try to optimize your models to reduce their memory footprint at runtime.
To increase the memory allocated, first locate the file called `Gama.ini`. On Windows and Ubuntu, it is located next to the executable. On Mac OS X, you have to right-click on `Gama.app`, choose "Display Package Contents...", and you will find `Gama.ini` in `Contents/Eclipse`.
This file typically looks like the following (some options/keywords may vary depending on the system), and we are interested in two JVM arguments:

![Gama.ini file: the place to allocate more memory to GAMA to deal with big projects.](/resources/images/installationAndLaunching/trouble_gama_ini.png)


`-Xms` supplies the minimal amount of memory the JVM should allocate to GAMA, `-Xmx` the maximal amount. By changing these values (esp. the second one, of course, for example to 4096M, or 4g, or more!), saving the file and relaunching GAMA, you can probably solve your problem. Note that 32 bits versions of GAMA will not accept to run with a value of `-Xmx` greater than 1500M. See [here](http://stackoverflow.com/questions/14763079/what-are-the-xms-and-xmx-parameters-when-starting-jvms) for additional information on these two options.


## Charting problems
By default the charts of a running experiment are only updated when you are in the experiment view. Therefore if you want to be able to run an experiment and plot its results while still working on the code of a model, you should make sure that the option `Continue to draw displays when in Modeling perspective` is set to true in the `Presentation and Behavior of Graphical Display Views` section of the `Display` tab in the settings.
![settings](https://github.com/gama-platform/gama-platform.github.io/blob/master/resources/images/charts/display_when_modeling.png?raw=true)


## Installation is broken

It may happen that after switching from one GAMA version to another, or after installing a plugin, something breaks your GAMA installation completely and uninstalling/reinstalling won't solve the problem. To fix this, you can go to your home directory and find the `.eclipse` (hidden) folder. For example on Windows it would be at:
```
C:\Users\username\.eclipse
```
There you will find a list of directories all starting with `org.` and one directory with the name starting with a number followed by the system you are using, for example for Windows it could be : `306334380_win32_win32_x86_64`, for linux `1164258503_linux_gtk_x86_64` etc.
That directory contains the list of plugins and some config files that are persistent from one version to another, you can rename it (to `306334380_win32_win32_x86_64-backup` for example) to keep a track of what was your configuration before, and run GAMA again.
GAMA should then create a new clean directory with the basic configuration and no plugin installed, which should solve configuration related problems.

## Silent error when saving a file
In certain configurations, when using the [save statement](Statements#save) an error can happen while the simulation is running and trying to perform the save. To prevent those, make sure that you specified the format in which to save your data (`csv`, `text`, `json` etc.) with the `format` facet.

## Saving SHP file raises an error
If you encounter a runtime error while trying to save an SHP file multiple times, especially if the message is something like `Java error: I/O error ... FileNotFoundException...`, you can try going into your gama preferences and go to `Data and Operators` -> `Optimizations` -> `In-memory shapefile mapping [...]` and set it to false.

## Submitting an Issue
If you think you have found a new bug/issue in GAMA, it is time to create an issue report [here](https://github.com/gama-platform/gama/issues/new)! Alternatively, you can click the [Issues](https://github.com/gama-platform/gama/issues) tab on the project site, search if a similar problem has already been reported (and, maybe, solved) and, if not, enter a new issue with as much information as possible:

* A complete description of the problem and how it occurred.
* The GAMA model or code you are having trouble with. If possible, attach a complete model.
* Screenshots or other files that help describe the issue.

Two files may be particularly interesting to attach to your issue: the **configuration details** and the **error log**. Both can be obtained quite easily from within GAMA itself in a few steps. First, click the "About GAMA..." menu item (under the "Gama Platform" menu on Mac OS X, "Help" menu on Linux & Windows)


![Open information about GAMA windows.](/resources/images/installationAndLaunching/trouble_menu_about_gama.png)


In the dialog that appears, you will find a button called "Installation Details".


![images/dialog_about_gama.png](/resources/images/installationAndLaunching/trouble_dialog_about_gama.png)


Click this button and a new dialog appears with several tabs.


![images/dialog_configuration.png](/resources/images/installationAndLaunching/trouble_dialog_configuration.png)


To provide complete information about the status of your system at the time of the error, you can

(1) copy and paste the text found in the tab "Configuration" into your issue. Although, it is preferable to attach it as a text file (using TextEdit, Notepad or Emacs e.g.) as it may be too long for the comment section of the issue form.

(2) click the "View error log" button, which will bring you to the location, in your file system, of a file called "log", which you can then attach to your issue as well.


![images/log_file.png](/resources/images/installationAndLaunching/trouble_log_file.png)
