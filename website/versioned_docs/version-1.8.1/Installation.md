---
title:  Installation
---


We made efforts to make the last release of GAMA (1.8.0) as easy as possible to install, by providing a version with an embedded Java JDK, limiting the installation to a 3-steps procedure: download, extract and launch.


## Table of contents 

* [Installation](#installation)
  * [Download GAMA](#download-gama)
  * [Install procedure](#install-procedure)
  * [System Requirements](#system-requirements)
  * [Installation of Java](#installation-of-java)
    * [On MacOS X](#on-macos-x)
    * [On Windows](#on-windows-7--8-64-bits)
    * [On Ubuntu & Linux](#on-ubuntu--linux)
  * [Troubleshooting with Mac OS Sierra](#troubleshooting-with-mac-os-sierra)


## Download GAMA

GAMA 1.8.0 (the last release) comes in 6 different versions:

* 2 versions for each of the 3 environments (by default in 64 bits) Windows, MacOS X and Linux (tested mainly on Ubuntu),
* For each OS, one version includes the Java JDK (1.8.0_161 in 64 bits) and one does not.


It is important to notice that each version has its own pros and contras:

* the version including the Java JDK is easier to install as it only requires to unzip the downloaded file and to run it. But the provided JDK is not automatically updated to fix security issues. This JDK should thus not be used with any other applications.
* the version without JDK requires **Java 1.8 Oracle JDK** to be installed on your computer (at least the update 161). The advantage of this version is that the file download is lighter and that the user can update the Java JDK to prevent new security vulnerabilities.

Note that the previous versions (GAMA 1.8RC2 and 1.7) came with 32 bits version for Windows and Linux (but without any version with an included Java JDK). You first need to determine which version to use (it depends on your computer, which may, or not, support 64 bits instructions, but also on the version of Java already installed, as the number of bits of the two versions must match). **It is not recommended to use it, as many issues have been fixed and many improvements have been introduced in the release**. Nevertheless, it can be downloaded from the [page](https://github.com/gama-platform/gama/releases/tag/v1.8-rc2).

## Install procedure

After having downloaded the chosen GAMA version from the [Downloads page](https://gama-platform.github.io/download), you only have to extract the zip file wherever you want on your machine, and [launch GAMA](Launching).


## System Requirements

GAMA 1.8.0 requires approximately 540MB of disk space (resp. 120MB in its version without Java JDK) and a minimum of 4GB of RAM (to increase the portion of memory usable by GAMA, please refer to [these instructions](Troubleshooting#Memory_problems)). 

The version with JDK does not require the installation of any other software and in particular the Java JDK.

The version without JDK requires that **Java 1.8 Oracle JDK** is installed on your machine.

**Please note that GAMA is not considered as compatible with Java 1.9 and Java 1.10** as it has not been tested under these environments.


## Installation of Java

On all environments, the recommended Java Virtual Machine under which GAMA has been tested is the one distributed by Oracle ([http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)). 
**Please make sure to install the JDK (Java Development Kit) and not the JRE (Java Runtime Environment)**.
GAMA may work with the standard JRE, although it will be slower and may even crash (esp. under MacOS X).

### On Mac OS X
The latest version of GAMA requires a JVM (or JDK or JRE) compatible with Java 1.8 to run. 

_Note for GAMA 1.6.1 users: if you plan to keep a copy of GAMA 1.6.1, you will need to have both Java 1.6 (distributed by Apple) and Java 1.8 (distributed by Oracle) installed at the same time. Because of this bug in SWT (https://bugs.eclipse.org/bugs/show_bug.cgi?id=374199), GAMA 1.6.1 will not run correctly under Java 1.8 (all the displays will appear empty). To install the JDK 1.6 distributed by Apple, follow the instructions here: http://support.apple.com/kb/DL1572. Alternatively, you might want to go to https://developer.apple.com/downloads and, after a free registration step if you're not an Apple Developer, get the complete JDK from the list of downloads._

### On Windows
Please notice that, by default, Internet Explorer and Chrome browsers will download a 32 bits version of the JRE. Running GAMA 32 bits for Windows is ok, but you may want to download the latest JDK instead, in order to both improve the performances of the simulator and be able to run GAMA 64 bits.

  * To download the appropriate java version, follow this link: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
  * Execute the downloaded file
  * You can check that a **Java\\jre8** folder has been installed at the location **C:\\Program Files\\**

In order for Java to be found by Windows, you may have to modify environment variables:

  * Go to the **Control Panel**
  * In the new window, go to **System**
  * On the left, click on **Advanced System parameters**
  * In the bottom, click on **Environment Variables**
  * In System Variables, choose to modify the **Path** variable
  * At the end, add **;C:\\Program Files\\Java\\jre8\\bin** (or jre8\\bin)

### On Ubuntu & Linux

To have a complete overview of java management on Ubuntu, have a look at:

  * [Ubuntu Java documentation](https://help.ubuntu.com/community/Java)
  * for French-speaking users: [http://doc.ubuntu-fr.org/java#installations_alternatives](http://doc.ubuntu-fr.org/java#installations_alternatives)

The Oracle JDK License has changed for releases starting April 16, 2019. The result is that it's now more complicated to install Oracle JDK on Unix system than before.

If you want to simplify the process, you can download GAMA with an embarked JDK. But keep in mind that this JDK should only be used to run GAMA-Platform.

#### Install the Oracle JDK 8

If you still want to install Oracle JDK 8 on your machine, here are some workarounds:
  * [For Debian based OS](https://askubuntu.com/questions/1136401/how-to-install-oracle-java-8-on-ubuntu-19-04)
  * [For Arch-based OS](https://aur.archlinux.org/packages/jdk8)

See [the troubleshooting page](Troubleshooting#on-ubuntu--linux-systems) for more information on workarounds for problems on Ubuntu.

#### Install the OpenJDK 8

***/!\ WARNING /!\\\
OpenJDK is not the recommended way to run GAMA and is not (and won't be) supported.\
We won't help you if you run in any trouble using this JDK.***

Another solution will be to install OpenJDK, the free implementation under the GNU General Public License.

If you use a Debian based OS (Ubuntu, Linux Mint,  ...), you need to do:
```
sudo apt-get install openjdk-8-jdk
```

If you use an Arch-based OS (Manjaro, Antergos, ...), you need to do:
```
sudo pacman -S jdk8-openjdk
```

If you use a Red Hat-based OS (CentOS, Fedora, Scientific Linux ...), you need to do:
```
su -c "yum install java-1.8.0-openjdk"
```

You can then switch between java version using:
```
sudo update-alternatives --config java
```

## Troubleshooting with Mac OS X Sierra

In some cases, "Archive utility.app" in MacOS may damage the files when extracting them from the zip or tar.gz archive files. This problem manifests itself by a dialog opening and explaining that the application is damaged and cannot be launched (see [Issue 2082](https://github.com/gama-platform/gama/issues/2082#issuecomment-271812519) and also [this thread](https://bugs.eclipse.org/bugs/show_bug.cgi?id=398450#c17). In that case, to expand the files, consider using a different utility, like the free [Stuffit Expander](http://my.smithmicro.com/stuffit-expander-mac.html) or directly from the command line. 

Mac OS X Sierra has introduced a series of issues linked to the so-called "quarantine" mode (where applications downloaded from Internet prevent to use and update their internal components, such as the models of the library or the self-updating of the application). See this [page](http://lapcatsoftware.com/articles/app-translocation.html) for background information. To be certain that Gama will work, and until we find an easier solution, the installation should follow these steps:

1. Download the GAMA zip file
2. Unzip it (possibly with another archive utility, see above)
3. Copy and paste `Gama` in the `Applications` folder
4. Launch `Terminal.app`
5. Type `cd /Applications` and hit return.
6. Type `xattr -d -r com.apple.quarantine Gama.app/` and hit return to remove the quarantine attribute

From now on, Gama should be fully functional.
