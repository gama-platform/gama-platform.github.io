---
title:  Installation
---


We made efforts to make the last release of GAMA (1.8.2) as easy as possible to install, by providing a version with an embedded Java JDK, limiting the installation to a 3-steps procedure: download, install and launch.


## Table of contents 

* [Installation](#installation)
  * [Download GAMA](#download-gama)
  * [Install procedure](#install-procedure)
    * [Step-by-step Windows](#step-by-step-windows)
    * [Step-by-step macOS](#step-by-step-macos)
      * [DMG version](#DMG-version)
      * [`brew` version](#brew-version)
    * [Step-by-step Ubuntu](#step-by-step-ubuntu)
  * [System Requirements](#system-requirements)


## Download GAMA

GAMA 1.8.2 (the lastest release) comes in a version for each 3 environments Windows, macOS and Linux packaged in easy to use installers. You simply have to go on the [downloads page](https://gama-platform.org/download) and pick the one for your system.

> For advanced users : 
> * GAMA provide also some versions without embedded JDK allowing you to download a lighter archive
>   * This version requires **Java 17 JDK** to be installed on your computer (at least 17.0.3+7)
> * It's also possible to download these 2 kinds of releases in simple zip archive (i.e. without installers)
> 
> You'll find them on the [Github Release page](https://github.com/gama-platform/gama/releases/latest)


## Install procedure

After downloading the chosen GAMA version from the [Downloads page](https://gama-platform.org/download) for your computer, you only have run the installer, follow steps, and [launch GAMA](Launching).

### Step-by-step Windows

1. [Download](https://gama-platform.org/download) the installer `.exe` for Windows
1. Double-click on the downloaded `.exe` file
1. Accept to run the app

![Pass Microsoft Defender SmartScreen](/resources/images/Installation/gamaInstall-windows1.png)

4. Follow the installer with the onscreen steps
5. Done, you can start GAMA from your computer now.

> NB: If you need to launch [GAMA Headless](RunningHeadless), GAMA is installed under `C:\Program Files\Gama`

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


### Step-by-step Ubuntu

1. [Download](https://gama-platform.org/download) the installer `.deb` for Ubuntu (and any Debian-based systems)
1. Double-click on the downloaded `.deb` file
1. Click on `install`

![install in app store](/resources/images/Installation/ubuntuinstall.png)

4. You could be asked for your password
4. Done, you can start GAMA from your computer now 

> NB: If you need to launch [GAMA Headless](RunningHeadless), GAMA is installed under `/opt/gama-platform`

## System Requirements

GAMA 1.8.2 requires approximately 540MB of disk space and a minimum of 2GB of RAM (to increase the portion of memory usable by GAMA, please refer to [these instructions](Troubleshooting#Memory_problems)). 

