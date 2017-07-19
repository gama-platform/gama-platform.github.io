---
layout: default
title: Product your own release of GAMA
wikiPageName: CreatingAReleaseOfGama
wikiPagePath: wiki/CreatingAReleaseOfGama.md
---
# Product your own release of GAMA

## Install Maven if not already installed
Download the latest version of Maven here: <https://maven.apache.org/download.cgi>. Proceed to install it as explained on this page: <https://maven.apache.org/install.html>

## Locate the `build.sh` shell script
It is located at the root of the `gama` Git repository on your computer. The easiest way to proceed is to select one of the GAMA projects in the Eclipse explorer and choose, in the contextual menu, `Show in > System Explorer`. Then open a shell with this path and `cd ..`. Alternatively, you can open a shell and `cd` to your Git repository and then inside `gama`. 

## Launch the script
Simply type `../build.sh` in your terminal and the build should begin and log its activity.

## Locate the applications built by the script
They are in `ummisco.gama.product/target/products/ummisco.gama.application.product` in their binary form or alternatively in `ummisco.gama.product/target/products` in their zipped form. 

