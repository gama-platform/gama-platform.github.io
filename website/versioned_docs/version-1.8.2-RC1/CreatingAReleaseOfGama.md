---
title:  Product your own release of GAMA
---


## Install Maven if not already installed
Download the latest version of Maven here: &lt;https://maven.apache.org/download.cgi>. Proceed to install it as explained on this page: &lt;https://maven.apache.org/install.html>

## Locate the `build.sh` shell script
It is located at the root of the `gama` Git repository on your computer. The easiest way to proceed is to select one of the GAMA projects in the Eclipse explorer and choose, in the contextual menu, `Show in > System Explorer`. Then open a shell with this path and `cd ..`. Alternatively, you can open a shell and `cd` to your Git repository and then inside `gama`. 

## Launch the script
Simply type `../build.sh` in your terminal and the build should begin and log its activity.

## Locate the applications built by the script
They are in `ummisco.gama.product/target/products/ummisco.gama.application.product` in their binary form or alternatively in `ummisco.gama.product/target/products` in their zipped form. 


## Instruction for Travis build (Continuous Integration)
GAMA is built by Travis-ci.org. There are some triggers for developers to control travis:

  * "ci skip": skip the build for a commit
  * "ci deploy": deploy the artifacts/features to p2 server (currently to the ovh server of gama, www.gama-platform.org/updates)
  * "ci clean": used with ci deploy, this trigger remove all old artifacts/features in server's p2 repository
  * "ci docs": tell travis  to regenerate the documentation of operators on wiki page, and update the website githubio
  * "ci release": travis release zip package for OSs and place it on https://github.com/gama-platform/gama/releases/tag/latest
  * "ci ext": The msi.gama.ext has big size, so it is not rebuilt every time, it will be compiled automatically only when it was changed, Or use this command to force travis to deploy msi.gama.ext
  * "ci fullbuild": Full deploy all features/plugins

These instructions above can be used in 2 ways:

  * Place them anywhere in the commit message, i.e: " fix bug #1111 ci deploy ci clean ci docs", " update readme ci skip "
  * In Travis-ci, go to More Options -> Settings, add an environment variable named MSG, add the value as string, i.e.: "ci fullbuild ci deploy ci clean ci docs"
