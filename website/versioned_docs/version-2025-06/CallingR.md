---
title:  Calling R from GAMA models
---


## Introduction

The R language is a powerful tool for statistical computing and graphics, and its community is very large in the world (See the [website](http://www.r-project.org/)). Adding a support for the R language is one of our strong endeavors to accelerate many statistical and data mining tools integration into the GAMA platform.


## Installing R and rJava

### Install R on your computer 
Please refer to the R [official website](https://www.r-project.org/), or to [RStudio](https://www.rstudio.com/) if you want in addition a nice IDE.
### install the rJava library in R 
In the R (RStudio) console, write:
```
install.packages("rJava")
``` 
to install the library. To check that the install is correct, you load the library using `library(rJava)` (in the R console). If no error message appears, it means the installation is correct.

#### In case of trouble
##### For **MacOSX**
in recent versions you should first write in a terminal:
```bash
R CMD javareconf
sudo ln -f -s $(/usr/libexec/java_home)/jre/lib/server/libjvm.dylib /usr/local/lib
```
##### For **Linux**
make sure you have the `default-jdk` and `default-jre` packages installed and then execute the command `sudo R CMD javareconf`

##### For **Windows**
make sure you have a `JAVA_HOME` and a `CLASSPATH` environment variable setup, if not you need to create and set them, for example:
```bash
JAVA_HOME="C:\Program Files\Java\OpenJDK17\"
CLASSPATH="C:\Program Files\Java\OpenJDK17\bin\"
```

### Set the environment variable `R_HOME`
#### **On Windows** 
set the environment variables as follows.
`R_HOME` is the root directory where we can find the `library` folder in your `R` installation, so it should look like this:
```bash
R_HOME="C:\Program Files\R\R-4.2.2\" 
```
`R_PATH` should point to the folder containing your `R` interpreter, the variable should be set with something similar to this (adapting with your R version and R installation path):
```bash
R_PATH="C:\Program Files\R\R-4.2.0\bin\x64" 
```

#### **On Linux** 
By default it should be `/usr/lib/R`, you can thus just append the line `R_HOME=/usr/lib/R` to your `/etc/environment` file and reboot your computer    

#### **On macOS**
You need to create (or update) the file `environment.plist` in the folder: `~/Library/LaunchAgents/` (for the current user, note that this folder is a hidden folder) or in `/Library/LaunchAgents/` (for all users)
It should look like:
```xml
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
#### **Recommended** 
If the rJava library doesn't appear in the R library directory, copy the installed rJava library from where it was installed (with `install.packages("rJava")`) to the `library` folder in your `R_HOME`.

### Updating the `Path` variable (Windows only)
In addition, on Windows you also **need** to add to your `Path` environment variable the path to your `R` binaries, by default located in `C:\Program Files\R\R-4.2.2\bin\x64` for `R-4.2.2 64bits`.
The `Path` variable is a variable already created by Windows, so you just have to edit it to **add** a new path, no need to delete anything.


## Configuration in GAMA

### Linking the R connector 
From GAMA 1.9.0, you need to specify the path to the R connector library in the GAMA launching arguments.
To this purpose, you need to add to either:
1. the `GAMA.ini` file if you use the release version of GAMA 
2. **or** the launching configuration (if you use the source code version) the following line: (replace `PATH_TO_R` by the path to R, i.e. the value in `$R_HOME`):
    
    * **on macOS**:    `-Djava.library.path=PATH_TO_R/library/rJava/jri/rlibjri.jnilib`
    * **on Windows**:  `-Djava.library.path=PATH_TO_R\library\rJava\jri\`
    * **on Linux**:    `-Djava.library.path=PATH/TO/JRI`

As an example, under macOS, you need to add:
```
-Djava.library.path=/Library/Frameworks/R.framework/Resources/library/rJava/jri/
```
On Windows and Linux, the jri library could be in a different location than the `R_HOME`, for example on Linux by default it would be in:
```
-Djava.library.path=/home/user_name/R/x86_64-pc-linux-gnu-library/3.6/rJava/jri/
```
On Windows it can be located in the user's `AppData\local` or in `Documents\R`.

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

## Troubleshooting

It is possible that after installing everything, Gama works normally but crashes every time you try to use the skill `RSkill` without any error message. If that's the case, the problem is certainly that Gama is unable to load the `jri` library or its dependencies (other R packages). Make sure that the path you wrote in the `.ini` file is correct and that every environment variable is set with proper values.

Also on windows, check that the `Path` variable contains the path to your `R` installation.

If after checking everything the problem is still there, you can try copying the `.dll` files at the `R_PATH` location and the `jri.dll` and paste them into your `JAVA_PATH` directory (the `bin` folder of your jdk).