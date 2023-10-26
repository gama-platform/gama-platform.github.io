---
title:  Using GAMA flags
---


## What are flags

GAMA and some of its components (software libraries) make it possible to change some of the software behaviors by setting up "flags". Those are mainly for advanced users and should not be much of a concern for most users.

## Gama flags

GAMA flags are flags that are build directly by GAMA developers, they have to be set in the `Gama.ini` file as a new line item (or as a VM argument) like this `-D<FLAGNAME>=true/false`. For example :
```
-Denable_logging=false
```

### Available flags

 * **`enable_debug`**: Set to `true` by default, it `enable` logging the debug messages (DEBUG.OUT(...), DEBUG.ERR(...) which will follow the declaration of DEBUG.ON() on the classes). Set to false to suppress all debug logging (but regular logging using DEBUG.LOG(...) or DEBUG.TIMER(...) will still operate).
 * **`enable_logging`**: Set to `true` by default, it enables simple logging activities using DEBUG.LOG(...), DEBUG.TIMER(...). Set to `false` to prevent all logging activities (incl. debug ones) 
 * **`use_global_preference_store`**: set to `true` by default, it saves the preferences in the global (managed by the JRE) preference store. Set to `false` to save them in each GAMA instance preference store.
 * **`read_only`**: set to `false` by default, set to `true` if you want the files in the gaml editor to be read-only (impossible to modify them)



## Using Eclipse and SWT flags

GAMA 1.9.2 uses Eclipse 2022-12 as the based component for the IDE. 

More precisely, GAMA uses the **Eclipse Runtime** which provides the foundational support for plug-ins, extension points and extensions (among other facilities), it's the application structure and is built on top of the [OSGi framework](http://osgi.org/osgi_technology). 

GAMA also uses the [**Standard Widget Toolkit**](https://www.eclipse.org/swt/) (or SWT for short). SWT is designed to provide efficient, portable access to the user-interface facilities of the operating systems on which it is implemented.

### Available flags

Both components can be tweaked thanks to the eclipse's [Rich Client Platform interface](https://wiki.eclipse.org/Rich_Client_Platform) using some flags and parameters documented in [the official documentation for Eclipse 2022-12](http://help.eclipse.org/2022-12/index.jsp). 

Here are some links to more detailed explanations about both components and their respective flags:
- [Eclipse Runtime](https://help.eclipse.org/2022-12/index.jsp?topic=%2Forg.eclipse.platform.doc.isv%2Freference%2Fmisc%2Fruntime-options.html)
- [SWT](https://www.eclipse.org/swt/faq.php)

## Using JOGL flags

[JOGL](https://jogamp.org/jogl/www/) in addition with [Glugen](https://jogamp.org/gluegen/www/) (both from [JOGAMP](https://jogamp.org/)) are the two libraries used in GAMA for 3D Graphics, Multimedia and Processing.

### Available flags

Most of them are documented on [the official documentation website](https://jogamp.org/jogl/doc/userguide/).