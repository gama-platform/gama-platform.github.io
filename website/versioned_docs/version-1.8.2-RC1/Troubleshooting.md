---
title:  Troubleshooting
---


This page exposes some of the most common problems a user may encounter when running GAMA — and offers advices and workarounds for them. It will be regularly enriched with new contents. Note also that the [Issues section](https://github.com/gama-platform/gama/issues) of the website might contain precious information on crashes and bugs encountered by other users. If neither the workarounds described here nor the solutions provided by other users allow to solve your particular problem, please submit a new issue report to the developers.

## Table of contents 

* [Troubleshooting](#troubleshooting)
    * [Table of contents](#table-of-contents)
    * [On Ubuntu (& Linux Systems)](#on-ubuntu--linux-systems)
        * [Workaround if OpenGL display crash GAMA](#workaround-if-opengl-display-crash-gama)
    * [On macOS](#on-macos)
        * [First launch of GAMA should be in GUI mode](#first-launch-of-gama-should-be-in-gui-mode)
    * [On Windows](#on-windows)
        * [Problem with some Radeon graphics cards and Opengl display](#problem-with-some-radeon-graphics-cards-and-opengl-display)
        * [Problem with High-DPI devices and Java2D display](#problem-with-high-dpi-devices-and-java2d-display)
    * [Memory problems](#memory-problems)
    * [Submitting an Issue](#submitting-an-issue)

## On Ubuntu (& Linux Systems)

### Workaround if OpenGL display crash GAMA
In case GAMA crashes whenever trying to display an OpenGL display or a Java2D, and you are running Ubuntu 21.10 (or earlier), it probably means that you're using **Wayland** as Display backend. You can fix it by running in a terminal `export GDK_BACKEND=x11` and launch GAMA from this same terminal. This workaround is described here: https://bugs.eclipse.org/bugs/show_bug.cgi?id=577515 and in [Issue 3373](https://github.com/gama-platform/gama/issues/3373).


## On macOS 

### First launch of GAMA should be in GUI mode

When GAMA has just been downloaded and installed, it needs to be first launched in its GUI version before using it in the headless mode.
If it is first launched in the headless mode, GAMA will be damaged and the installed version needs to be removed and re-installed.


## On Windows

### Problem with some Radeon graphics cards and Opengl display

Some Radeon graphics cards may cause GAMA to crash when using Opengl displays. The best solutions in this case are either to switch to java2D display or, if the computer is equipped with two graphics cards, to specify to specify that the other graphics card should be used for GAMA (see [here](https://pureinfotech.com/set-gpu-app-windows-10/)).


### Problem with high-DPI devices and java2D display

For high-DPI screens, it is possible to observe an offset in java2D displays (not centered, not taking the whole panel, with an erroneous mouse location) when a scaling value is not a value divisible by 100, for example a scaling of 250%. [Changing the scaling factor](https://support.microsoft.com/en-us/windows/view-display-settings-in-windows-37f0e05e-98a9-474c-317a-e85422daa8bb#WindowsVersion=Windows_10) for a value divisible by 100 (200%, 300%) solves the problem.


## Memory problems
The most common causes of problems when running GAMA are memory problems. Depending on your activities, on the size of the models you are editing, on the size of the experiments you are running, etc., you have a chance to require more memory than what is currently allocated to GAMA. A typical GAMA installation will need between 2 and 4GB of memory to run "normally" and launch small models.
Memory problems are easy to detect: in the bottom-right corner of its window, GAMA will always display the status of the current memory. The first number represents the memory currently used (in MB), the second (always larger) the memory currently allocated by the JVM. And the little trash icon allows to "garbage collect" the memory still used by agents that are not used anymore (if any). If GAMA appears to hang or crash and if you can see that the two numbers are very close, it means that the memory required by GAMA exceeds the memory allocated.


![Memory bar status in GAMA.](/resources/images/installationAndLaunching/trouble_memory_status.png)

There are two ways to circumvent this problem: the first one is to increase the memory allocated to GAMA by the Java Virtual Machine. The second, detailed [on this page](OptimizingModels) is to try to optimize your models to reduce their memory footprint at runtime.
To increase the memory allocated, first locate the file called `Gama.ini`. On Windows and Ubuntu, it is located next to the executable. On Mac OS X, you have to right-click on `Gama.app`, choose "Display Package Contents...", and you will find `Gama.ini` in `Contents/Eclipse`.
This file typically looks like the following (some options/keywords may vary depending on the system), and we are interested in two JVM arguments:

![Gama.ini file: the place to allocate more memory to GAMA to deal with big projects.](/resources/images/installationAndLaunching/trouble_gama_ini.png)


`-Xms` supplies the minimal amount of memory the JVM should allocate to GAMA, `-Xmx` the maximal amount. By changing these values (esp. the second one, of course, for example to 4096M, or 4g, or more!), saving the file and relaunching GAMA, you can probably solve your problem. Note that 32 bits versions of GAMA will not accept to run with a value of `-Xmx` greater than 1500M. See [here](http://stackoverflow.com/questions/14763079/what-are-the-xms-and-xmx-parameters-when-starting-jvms) for additional information on these two options.




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
