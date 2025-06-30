---
title:  Product your own release of GAMA
---


## Install Maven if not already installed
Download the latest version of Maven here: &lt;https://maven.apache.org/download.cgi>. Proceed to install it as explained on this page: &lt;https://maven.apache.org/install.html>

## Locate the `build.sh` shell script
It is located in the `travis` folder at the root of the `gama` Git repository on your computer. 

## Launch the script
Simply run the script in your terminal and the build should begin and log its activity. 

## Run it manually

If for some reason the script is not available or not working, you can still very easily produce the release yourself.
To do so just follow those steps:
1. open a terminal and go to the project `gama.annotations`
2. run the command:
```bash
mvn clean install
```
3. go to the project `gama.processor`
4. run the same mvn command
5. go to the project `gama.parent`
6. run the same mvn command one last time

## Locate the applications built by the script
They are in `gama.product/target/products/gama.application.product` in their binary form or alternatively in `gama.product/target/products` in their zipped form. 


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
