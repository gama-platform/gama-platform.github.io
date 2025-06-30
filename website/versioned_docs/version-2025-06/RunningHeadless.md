---
title:  Running Headless
---


## What is GAMA Headless

The headless mode gives the possibility run one or multiple instances of GAMA without any user interface so that models and experiments can be launched on a grid or a cluster. Without GUI, the memory footprint, as well as the speed of the simulations, are usually greatly improved.

In this mode, GAMA can only be used to run experiments. Editing or managing models is not possible. In order to launch experiments and still benefit from a user interface (which can be used to prepare headless experiments), launch GAMA normally (see [here](Launching)) and refer to this [page](RunningExperiments) for instructions.

## Different headless modes
  
1. The first and oldest way, called _**Legacy mode**_ and detailed [here](HeadlessLegacy), consists in explicitly writing your full experiment plan (i.e each simulation you want to run, with each parameter sets) in an XML file. This way of using the Headless was the first implementation of the headless inside GAMA.
1. The second way, called _**Headless Batch**_ and detailed on this [page](HeadlessBatch), allows launching a [GAML batch experiment](BatchExperiments) in headless mode (i.e. without having to open GAMA's interface). This way is the most natural way to use the headless as it works exactly like in GUI Batch mode.
1. The last way, called _**Headless Server**_ and described [there](HeadlessServer), let you open an interactive GAMA headless server on which you can dynamically send experiments to run. This last mode is interesting for using GAMA as back-end of other project like web projects.

## General knowledge about using GAMA Headless

There are two ways to run a GAMA experiment in headless mode: using a dedicated bash wrapper (recommended) or directly from the command line. 

### Bash Wrapper (recommended)
The wrapper file can be found in the `headless` directory located inside [Gama's installed folder](Installation). It is named `gama-headless.sh` on macOS and Linux, or `gama-headless.bat` on Windows.

You can start using it like so :

```bash 
bash ./gama-headless.sh [m/c/hpc/v] [launchingMode]
```

with:
* general headless options [-m/c/hpc/v]:
  * `-m memory` : memory allocated to gama (e.g. `-m 8g` to set it at 8GiB)
  * `-c` : console mode, the simulation description could be written with the stdin
  * `-hpc nb_of_cores` : limit to a specific number of cores the number of simulation running in parallel (eg. `-hpc 3` to limit GAMA at using 3 cores/running 3 simulation at a time)
  * `-v` : verbose mode. trace are displayed in the console 
* _launchingMode_ will depend on which headless mode you'll use and explained in following pages


You also can display general help on every options with this command: 
```bash 
./gama-headless.sh -help
```

Which, for release 2025.5.0 will output:
```
******************************************************************
* GAMA version 2025.5.0-SNAPSHOT                                         *
* http://gama-platform.org                                       *
* (c) 2007-2024 UMI 209 UMMISCO IRD/SU and Partners              *
******************************************************************
org.eclipse.equinox.launcher_1.6.1000.v20250227-1734.jar
..\plugins\org.eclipse.equinox.launcher_1.6.1000.v20250227-1734.jar
Commande ECHO désactivée.
Will run with these options:
-server -XX:+UseG1GC -XX:+UseStringDeduplication -Dorg.eclipse.swt.graphics.Resource.reportNonDisposed=false -Xms4096m -Xss128m -Xmn1024m -XX:+UseAdaptiveSizePolicy -XX:+OptimizeStringConcat -Dosgi.locking=none -Dswt.enable.themedScrollBar=true -Dosgi.checkConfiguration=false -Dosgi.requiredJavaVersion=21 -Declipse.log.level=ERROR -Dorg.eclipse.ecf.provider.filetransfer.retrieve.retryAttempts=10 -Dorg.eclipse.ecf.provider.filetransfer.retrieve.closeTimeout=6000 -Dorg.eclipse.ecf.provider.filetransfer.retrieve.readTimeout=6000 -Denable_logging=true -Denable_debug=true -Duse_global_preference_store=true -Dswt.autoScale=exact -Dread_only=false -Duse_old_tabs=true -Duse_legacy_drawers=false -Duse_delayed_resize=false -Declipse.e4.inject.javax.disabled=true -Djts.relate=ng --add-exports=java.base/java.lang=ALL-UNNAMED --add-exports=java.desktop/sun.awt=ALL-UNNAMED --add-exports=java.desktop/sun.java2d=ALL-UNNAMED --add-exports=java.desktop/sun.java2d.loops=ALL-UNNAMED --add-exports=java.desktop/sun.awt.image=ALL-UNNAMED --add-exports=java.base/java.math=ALL-UNNAMED --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/jdk.internal.loader=ALL-UNNAMED --add-opens=java.base/java.math=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.base/java.util.concurrent.atomic=ALL-UNNAMED --add-opens=java.base/java.net=ALL-UNNAMED --add-opens=java.base/java.security=ALL-UNNAMED --add-opens=java.desktop/java.awt=ALL-UNNAMED --add-opens=java.desktop/java.awt.image=ALL-UNNAMED --add-opens=java.desktop/java.awt.color=ALL-UNNAMED --add-opens=java.desktop/sun.awt.image=ALL-UNNAMED --add-opens=java.desktop/sun.java2d=ALL-UNNAMED --add-opens=java.desktop/sun.java2d.loops=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.time=ALL-UNNAMED --add-opens=java.base/java.util.concurrent.locks=ALL-UNNAMED --add-opens=java.base/java.text=ALL-UNNAMED --add-opens=java.base/java.lang.ref=ALL-UNNAMED --add-opens=java.sql/java.sql=ALL-UNNAMED -Dfile.encoding=UTF-8 -Dorg.eclipse.swt.browser.DefaultType=edge
workDir = .work32529
memory = 4096m
"JDK"
> FLAG  : enable_debug                                  set to________ true
> FLAG  : enable_logging                                set to________ true
> FLAG  : use_global_preference_store                   set to________ true
> JAI   : ImageIO extensions                            loaded for____ BTF|TF8|TIF|TIFF|arx|asc|bmp|btf|gif|jp2|jpeg|jpg|pbm|pgm|png|ppm|tf8|tif|tiff|wbmp
> GAMA  : version 2025.5.0-SNAPSHOT                     loading on____ Windows 11 10.0, processor amd64, JDK OpenJDK 64-Bit Server VM Eclipse Adoptium version 23.0.2+7
> GAMA  : Plugin gama.core                              loaded in_____ 2256ms
> GAMA  : Plugin gama.extension.bdi                     loaded in_____ 176ms
> GAMA  : Plugin gama.extension.database                loaded in_____ 276ms
> GAMA  : Plugin gama.extension.fipa                    loaded in_____ 23ms
> GAMA  : Snapshot services                             inactive______ (headless mode)
> GAMA  : Plugin gama.extension.image                   loaded in_____ 45ms
> GAMA  : Plugin gama.extension.maths                   loaded in_____ 166ms
> GAMA  : Plugin gama.extension.network                 loaded in_____ 0ms
> GAMA  : Plugin gama.extension.pedestrian              loaded in_____ 45ms
> GAMA  : Plugin gama.extension.physics                 loaded in_____ 201ms
> GAMA  : Plugin gama.extension.serialize               loaded in_____ 19ms
> GAMA  : Plugin gama.extension.stats                   loaded in_____ 50ms
> GAMA  : Plugin gama.extension.traffic                 loaded in_____ 93ms
> GAMA  : Plugin gama.headless                          loaded in_____ 0ms
> GAML  : Initializing parser                           done in_______ 411ms
> GAMA  : Plugin gaml.compiler                          loaded in_____ 427ms
> GAMA  : Loading extensions to 'create'                done in_______ 17ms
> GAMA  : Loading extensions to 'save'                  done in_______ 239ms
> GAMA  : Loading extensions to 'draw'                  done in_______ 13ms
> GAMA  : Loading extensions to 'event'                 done in_______ 3ms
> GAMA  : Gathering built-in models                     done in_______ 9ms
> GAMA  : Loading constants                             done in_______ 361ms
> GAML  : Plugins with language additions               loaded in_____ 4644ms
Welcome to Gama-platform.org version GAMA 2025.5.0-SNAPSHOT

sh ./gama-headless.sh [Options]

List of available options:
        === Headless Options ===
                -m [mem]                      -- allocate memory (ex 2048m)
                -c                            -- start the console to write xml parameter file
                -v                            -- verbose mode
                -hpc [core]                   -- set the number of core available for experimentation
                -p                            -- start pipeline to interact with another framework
                -ping_interval [pingInterval] -- when in server mode (socket parameter set), defines in milliseconds the time between each ping packet sent to clients to keep alive the connection. The default value is 10000, set to -1 to deactivate this behaviour.
        === Infos ===
                -help                         -- get the help of the command line
                -version                      -- get the the version of gama
        === Library Runner ===
                -validate                     -- invokes GAMA to validate models present in built-in library and plugins
                -test                         -- invokes GAMA to execute the tests present in built-in library and plugins and display their results
        === GAMA Headless Runner ===
                -socket [socketPort]          -- starts socket pipeline to interact with another framework
                -batch [experimentName] [modelFile.gaml]
                                              -- Run batch experiment in headless mode
                -xml [experimentName] [modelFile.gaml] [xmlOutputFile.xml]
                                              -- build an xml parameter file from a model
                [xmlHeadlessFile.xml] [outputDirectory]
                                              -- default usage of GAMA headless
```

### Java Command (hard)

As GAMA is developed in Java, you can start the Headless mode by load appropriate bundle and starting it like this:

```bash
java -cp $GAMA_CLASSPATH -Xms512m -Xmx2048m -Djava.awt.headless=true org.eclipse.core.launcher.Main -application msi.gama.headless.id4 [options]
```

with:
* `$GAMA_CLASSPATH`: contains the relative or absolute path of jars inside the GAMA plugin directory and jars created by users
* _options_ as explained above and in following pages

Note that we recommend you to open bash wrapper to have more detailed about how we imagine starting GAMA in headless mode.