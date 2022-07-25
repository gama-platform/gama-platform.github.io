---
title:  Calling R from GAMA models
---


## Introduction

The R language is a powerful tool for statistical computing and graphics, and its community is very large in the world (See the [website](http://www.r-project.org/)). Adding a support for the R language is one of our strong endeavors to accelerate many statistical and data mining tools integration into the GAMA platform.


## Table of contents 

* [Introduction](#introduction)
* [Installing R and rJava](#installing-r-and-rjava)
* [Configuration in GAMA](#configuration-in-gama)
    * [Linking the R connector](#linking-the-r-connector)
    * [Installing the R plugin](#installing-the-r-plugin)
* [Calling R from GAML](#calling-r-from-gaml)
    * [Before computation](#before-computation)
    * [Computation](#computation)
        * [Evaluate an R expression](#evaluate-an-r-expression)
        * [Evaluate an R script](#evaluate-an-r-script)
        * [Convert GAMA object to R object](#convert-gama-object-to-r-object)
        * [Convert a species to a dataframe](#convert-a-species-to-a-dataframe)

## Installing R and rJava

1. Install R on your computer: please refer to the R [official website](https://www.r-project.org/), or to [RStudio](https://www.rstudio.com/) if you want in addition a nice IDE.

2. Before running this model, you should install the rJava library in R. In the R (RStudio) console, write:
`install.packages("rJava")` to install the library. To check that the install is correct, you load the library using `library(rJava)` (in the R console). If no error message appears, it means the installation is correct.

3. In case of trouble:
    * On **MacOSX**, in recent versions you should first write in a terminal:
    ```
    R CMD javareconf
    sudo ln -f -s $(/usr/libexec/java_home)/jre/lib/server/libjvm.dylib /usr/local/lib
    ```

    * For **Linux**, make sure you have the `default-jdk` and `default-jre` packages installed and then execute the command `sudo R CMD javareconf`

    * For **Windows**, make sure you have java environment variable setup

     ```
          JAVA_HOME = C:\Program Files\Java\OpenJDK17U-jdk_x64_windows_hotspot_17.0.2_8\jdk-17.0.2+8\bin\
          CLASSPATH = C:\Program Files\Java\OpenJDK17\bin\
      ```
      If the rJava library doesnt appear in the R library directory, copy the installed rJava library from where he was installed by `install.packages("rJava")` to R\R-4.2.0\library

4. You need to Configure the Environment Variable `R_HOME` (the procedure depends on your OS).
    * **On Windows**,
    ```
          R_HOME = C:\Program Files\R\R-4.2.0\ 
          R_PATH = C:\Program Files\R\R-4.2.0\bin\x64 
      ```

    * **On Linux**, by default it should be `/usr/lib/R`, you can thus just append the line `R_HOME=/usr/lib/R` to your `/etc/environment` file and reboot your computer    
    * **On macOS**, you need to create (or update) the file `environment.plist` in the folder: `~/Library/LaunchAgents/` (for the current user, note that this folder is a hidden folder) or in `/Library/LaunchAgents/` (for all users)
It should look like:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>my.startup</string>
    <key>ProgramArguments</key>
    <array>
      <string>sh</string>
      <string>-c</string>
      <string> launchctl setenv R_HOME /Library/Frameworks/R.framework/Resources/ </string>
    </array>
    <key>RunAtLoad</key>
    <true/>
  </dict>
</plist>
```


## Configuration in GAMA

### Linking the R connector 
From GAMA 1.8.2, you need to specify the path to the R connector library in the GAMA launching arguments.
To this purpose, you need to add to either:
1. the `GAMA.ini` file if you use the release version of GAMA 
2. **or** the launching configuration (if you use the source code version) the following line: (replace `PATH_TO_R` by the path to R, i.e. the value in `$R_HOME`):
    
    * **on macOS**:    `-Djava.library.path=PATH_TO_R/library/rJava/jri/rlibjri.jnilib`
    * **on Windows**:  `-Djava.library.path=PATH_TO_R/library/rJava/jri/`
    * **on Linux**:    `-Djava.library.path=PATH/TO/JRI`

As an example, under macOS, you need to add:
```
-Djava.library.path=/Library/Frameworks/R.framework/Resources/library/rJava/jri/
```
On Windows and Linux, the jri library could be in a different location than the `R_HOME`, for example on Linux by default it would be in:
```
-Djava.library.path=/home/user_name/R/x86_64-pc-linux-gnu-library/3.6/rJava/jri/
```

### Installing the R plugin

Next you need to install the R plugin from Gama. To do it, select "Install new plugins..." in the "Help" menu of Gama.
In the `Work with` drop down select the repository ending with "experimental/" followed by your Gama version.
Once done, you need to select the plugin `rJava`, click on `next` and then `finish`.
![image](https://user-images.githubusercontent.com/6374469/167291685-9e350a5c-9de6-443f-842d-276deb3a785e.png)

After this, you could be asked to "trust" the plugin, simply select the first line and click on `Trust selected`
![image](https://user-images.githubusercontent.com/6374469/167291718-5c4083c6-cade-45cc-b6a6-d0524504e042.png)

Finally, you will be asked to restart Gama, click on `Restart now`.

For more details, readers can refer to [the page dedicated to the installation of additional plugins](InstallingPlugins).


## Calling R from GAML

### Before computation

Any agent aiming at using R for some computation needs to be provided with the `RSkill`.

Before calling any computation, this agent needs to start a connection with the R software.

As an example, if we want  that the `global` agent can use R, we need to have the following minimal model:

```
global skills: [RSkill] {
   init {
      do startR;
   }
}
```

### Computation

#### Evaluate an R expression

The `R_eval` operator can be used to evaluate any R expression. It can  also be used to initialize a variable or call any function. It can return any data type  (depending on the R output).
As in an R session, the various evaluations are dependent on the previous ones.


Example:





```
global skills: [RSkill] {
	
	init{
		do startR;
		
		write R_eval("x<-1");
		write R_eval("rnorm(50,0,5)");
	}

}
```

#### Evaluate an R script

To evaluate an R script, stored in a (text) file, open the file and execute each of its lines.

```
global skills:[RSkill]{
	file Rcode <- text_file("../includes/rScript.txt");
		init{
		do startR;
		// Loop that takes each line of the R script and execute it.
	 	loop s over: Rcode.contents{
			unknown a <- R_eval(s);
			write "R>"+s;
			write a;
		}
	}
}
```


#### Convert GAMA object to R object

To use GAMA complex objects into R functions, we need to transform them using the `to_R_data` operator: it transforms any GAMA object into a R object.

```
global skills:[RSkill] {
	init {
		do startR();
		
		string s2 <- "s2";
		list<int> numlist <- [1,2,3,4]; 
  		write R_eval("numlist = " + to_R_data(numlist));
	}
}
```


#### Convert a species to a dataframe

Dataframe is a powerful R data type allowing to ease data manipulation...
Dataframe wan of course be defined at hand using R commands. But GAML provides the `to_R_dataframe` operator to directly transform a species of agents into a dataframe for future analysis.

```
global skills: [RSkill] {
	
	init{
		do startR();
		
		create people number: 10;
		
		do R_eval("df<-" + to_R_dataframe(people));
		write R_eval("df");
		write R_eval("df$flipCoin");	
	}
}
species people {
	bool flipCoin <- flip(0.5);
}
``` 