---
title:  Installation
---


We made efforts to make the last release of GAMA (1.9.2) as easy as possible to install, by providing a version with an embedded Java JDK, limiting the installation to a 3-steps procedure: download, install and launch.


## Download GAMA

GAMA 1.9.2 (the latest release) comes in a version for each 3 environments Windows, macOS and Linux packaged in easy to use installers. You simply have to go on the [downloads page](https://gama-platform.org/download) and pick the one for your system.

> For advanced users : 
> * GAMA provide also some versions without embedded JDK allowing you to download a lighter archive
>   * This version requires **Java 17 JDK** to be installed on your computer (at least 17.0.3+7)
> * It's also possible to download these 2 kinds of releases in simple zip archive (i.e. without installers), if you do so, please refer to the [post-installation procedure](#windows-post-installation-setting-only-for-zip-install) at the end of this page
> 
> You'll find them on the [Github Release page](https://github.com/gama-platform/gama/releases/latest)


## Install procedure

After downloading the chosen GAMA version from the [Downloads page](https://gama-platform.org/download) for your computer, you only have run the installer, follow steps, and [launch GAMA](Launching).

### Step-by-step Windows

On windows, in addition to running GAMA from the zip file, we have to ways of installing it: the standard installer that you can get from our website, or the winget command.

#### Installer from the website
This is the standard way of installing GAMA on windows.
1. [Download](https://gama-platform.org/download) the installer `.exe` for Windows
1. Double-click on the downloaded `.exe` file
1. Accept to run the app

![Pass Microsoft Defender SmartScreen](/resources/images/Installation/gamaInstall-windows1.png)

4. Follow the installer with the onscreen steps
5. Done, you can start GAMA from your computer now.

> NB: If you need to launch [GAMA Headless](RunningHeadless), GAMA is installed under `C:\Program Files\Gama` by default

#### From winget
For advanced users, you may want to install GAMA from winget, the process is very simple:
1. Open PowerShell
2. Run the command
```
winget.exe install GamaPlatform.Gama
```
That's it, GAMA is installed on your computer!



### Step-by-step macOS

In macOS we have two ways of installing gama: either the regular and user friendly `.dmg` installer, or the command line way with the `homebrew` package manager.

#### DMG version

1. [Download](https://gama-platform.org/download) the installer `.dmg` for macOS
    * There is a built specifically for Macintosh M1 (also called *with Apple silicon*). You can check by clicking on the top-left apple, `About this Mac`: the pop-up window will give details about the processor. If you're not sure and your Macintosh is from 2021 (or earlier) you probably need this specific version
1. Double-click on the downloaded `.dmg` file
1. Drag'n'drop GAMA icon to your computer (Applications folder or Desktop for instance)

![drag-n-drop](/resources/images/Installation/macOS-dragndrop.jpg)

4. Done, you can start GAMA from your computer now. At the first launch of GAMA, a popup window will appear warning you that GAMA is a software downloaded from internet and asking whether you want to open it. Click on the Open button.

![Open GAMA](/resources/images/Installation/macOS-confirmOpen.png)

> NB: Note that the first launch of GAMA should be made in GUI mode (clicking on the icon) and not in headless mode.
> NB2: If you need to launch [GAMA Headless](RunningHeadless) after, GAMA is installed where you _dragged and dropped_ the Gama.app

#### `brew` version

1. Install brew on your computer: just follow the instruction from the [website](https://brew.sh/).
2. Open a terminal
3. Run the command `brew install gama` or `brew install gama-jdk` for the JDK version


### Step-by-step Linux

#### Debian/Ubuntu based

1. [Download](https://gama-platform.org/download) the installer `.deb` for Ubuntu (and any Debian-based systems)
1. Double-click on the downloaded `.deb` file
1. Click on `install`

![install in app store](/resources/images/Installation/ubuntuinstall.png)

4. You could be asked for your password
4. Done, you can start GAMA from your computer now 

> NB: If you need to launch [GAMA Headless](RunningHeadless), GAMA is installed under `/opt/gama-platform`

#### Arch Linux based

AUR packages with latest version of GAMA exists for both version with and without embedded JDK. You can download them with a command as follows:

```
yay -S gama-platform{-jdk}
```

### Step-by-step Docker

A Docker image of GAMA exists to execute [GAMA Headless](RunningHeadless) inside a container.

1. Install docker on your system following the [official documentation](https://docs.docker.com/engine/install/)
1. Pull the GAMA's docker you want to use (e.g. `docker pull gamaplatform/gama:1.9.2`)
1. Run this GAMA's docker with your headless command (e.g. `docker run gamaplatform/gama:1.9.2 -help`)

You can found all the tags and more detailed documentation on the [Docker Hub](https://hub.docker.com/r/gamaplatform/gama) or on the corresponding [Github's Repository](https://github.com/gama-platform/gama.docker)

## System Requirements

GAMA 1.9.2 requires approximately 540MB of disk space and a minimum of 2GB of RAM (to increase the portion of memory usable by GAMA, please refer to [these instructions](Troubleshooting#Memory_problems)). 

## Windows post-installation setting (only for `zip` install)

If you decided to install gama yourself from the `zip` file, it is important that you change the Windows HDPI compatibility settings.
To do so, go to your `Gama.exe` file, right click and it and select `properties`, then go to the `Compatibility` tab and click on the `Change high DPI settings` button:

![image](https://user-images.githubusercontent.com/6374469/226245626-d9e0652d-82e3-445f-839f-a0892dbc4a62.png)

In the new window, check the `Override high DPI scaling behavior` option and select the `System` value. 

![image](https://user-images.githubusercontent.com/6374469/226247023-d233cd47-919b-48cc-804d-000c3d72c8ef.png)

These options are necessary to avoid most graphical problem using gama on Windows
