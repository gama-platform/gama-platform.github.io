---
title:  Changelog
---


## Major changes from 1.9.2 to 1.9.3
This is a maintenance release, aiming at fixing bugs observed in 1.9.2 and improving stability and performances. The most important changes brought by this version are a dramatic improvement in compilation time and memory usage, especially useful for large models, and a rework of gama-server which is now also available in GUI mode and with added features for both GUI and headless use.  

### Detailed changes
 
<details>
 <summary>This release of GAMA contains new features and fixes, including:</summary>

* The use of java 17 is now forced for every part of gama (some modules were still requiring older versions)
* Switch the 3d rendering library from Jzy3d 2.4-rc to JOGL 2.5.0 
* Improvement of the script gama-headless that previously wouldn't set gama correctly to handle recorded experiment
* Restore the `schedule` facet that was wrongly removed
* The headless script now loads the parameters from GAMA.ini if it's available
* Some icons rendering have been improved
* A new parameter to the [`darker`](https://gama-platform.org/wiki/next/OperatorsDH#darker) operator has been added to set the percentage of darkness instead of the default 10% darker
* The "insert template" menu options that were incomplete and not always working have been fixed
* It is now possible to call variables defined in the experiment in the interactive console
* The handling of error messages in the interactive console have been improved
* In the editor information messages and warnings can now be displayed directly above the line instead of having to hover the icon. It can be turned on/off with a parameter in the settings
* A new warning has been introduced when two displays have the same name in one experiment (can cause a lot of problems)
* The use of gis files in a comodeling context used to raise exceptions and has been fixed
* Some operators working with geometries now do a better job at converting their input arguments
* Some fixes have been brought to the use of variables of type `type` and the `type_of` operator
* A new built-in variable has been introduce: `#user_location_in_display` it represents the location of the mouse in the coordinates of the display, contrary to `#user_location` that is expressed in the world's coordinate system.
* It is now possible to get the latest alpha version of GAMA through winget with the name `GamaPlatform.GamaAlpha`
* GAMA is now based on eclipse 2023-09
* A small gap has been added between layers in 3d to fight some rendering problems
* The rendering of opengl displays has been improved and is now faster
* The library Bullet, used for the physics skills has been updated to version 18.6.0
* The use of the `ask` statement over the list `simulations` used to produce weird behaviours but has now been fixed
* We can now use textures in 2D displays
* The text output of the sobol analysis can now be exported to easy to handle csv
* It is now possible to use box2D as a physics engine to efficiently emulate 2d worlds' physics
* Operators `antialiased`, `blurred` and `sharpened` have a new parameter to define how many times they are going to be applied to the image and have been optimized
* The displays are now automatically updated when toggling the antialiasing option
* All agents have a new property `index` that represents their index in the the species 
* Some format issues in the `save` statement have been fixed
* The display of wireframe circles in 3d has been fixed
* Arc of circles were rendered with only half of the asked radius and it has been fixed
* The depth parameter of the `line` operator is now taken into account and creates rectangles
* Gama server now also runs in GUI mode and can be used to control the interface
* The loading of models in gama-server has been optimized
* The settings of gama-server (port, enabled/disabled, ping_interval) have been added to the settings window of gama
* No more error raising when closing a physical simulation
* Chart displays have been optimized and can now run forever without slowing down or increasing memory consumption
* When using the `accumulate_value` facet for the data of a chart the x value is now updated instead of always using the first x value
* The serialization engine XStream has completely been removed and replaced by FST, support for xml has been dropped in favor of json and binary
* The operator `to_json` that transforms a map into a json formatted string has been introduced to replace `as_json_string` which is now deprecated
* Gama-server sends a new kind of data: the simulation status when it's updated (loaded, paused etc.), mostly useful for interacting with GUI currently
* The compilation of gaml models has been drastically improved and is now sped up and takes way less memory
* An issue in the `neighbors_at` operator where it would not always pick the right geometry as a source in certain conditions has been fixed
* The output of the stochastic analysis for the batch has been reworked
* Some display problems in heatmap have been fixed
* The operators to test types (`is_shape`, `is_csv` etc.) that were missing are back
* It is now possible to have conditions in the displays
* MQTT requests can now also benefit from the `raw` statement like other network protocols
* Some bug have been fixed gama-server making it more resilient to client disconnection
* Drawing speed has been improved
* The position of scaled mesh layer was wrong and has been fixed
* When deserializing a json containing an integer too big, it is now transformed into a float instead of raising an exception
* The highlight functionality is back into the inspect panel
* The use of keystone in displays with mesh was broken and is now fixed
* The responsiveness of the code editor has been improved
* The code coloration has been improved for some cases
* The JGraphT library has been bumped to 1.5.2
* A new command for gama-server is available: `validate` which can be used to check that a gaml expression is valid, either just syntactically or also semantically
* Faster runtime access to species
* Can now send step and stepBack commands with empty number of steps it will be considered as one step
* Fixes the getStopCondition exception that would arise in headless legacy mode sometimes
* Many runtime exception that were related to gama scope have been fixed, like the ones that could happen when inspecting an agent
* Compilation errors that were sometimes shown on perfectly fine code have been fixed
* The neighborhood of cells in hexagonal grids was sometimes wrong and has been fixed
* Serialization of agents in list was broken and is now fixed
* Deserialized agents are now added to the population of simulation
* Some exceptions were raised in certain cases when clicking on buttons in the parameter view, this is now fixed
* Using arithmetic operators on fields was causing side effects and has been fixed
 


</details>



***

### Changes that can impact models

#### 🔴 Errors 🔴: concepts that need to be written differently

<details>
 <summary>View detailed changes</summary>

* Now that all agents have an `index` property, it can conflict with models that used to have a property called `index` defined in their agent or just some variables called `index` in the code
* Saving a simulation is now done in binary or json and not in xml as it was the case before. It is thus not possible to save a simulation or agents in an older version of GAMA and open it in 1.9.3 and conversely.
* graphs cannot be drawn unless they are spatial graphs, an error is now raised if a model tries to do so

</details>



### Preferences

Three new parameters have been introduced;
* The `enable server` parameter can be used to activate or disactivate the gama-server mode in GUI
* The `server port` parameter will on which port will gama-server listen when running in GUI
* The `server ping` will set the interval between two pings sent by gama-server to keep alive connections with its client
* The `increment factor` will set the value of a factor regulating the level of z-factor (for distance between layers in opengl displays)


### Added models
The library of models has undergone some changes. Besides making sure all the models compile and run fine under the new version of GAMA, it also brings some new models, which are listed below:


<details>
 <summary>View all new models list</summary>


* The model [Box2D Library.gaml](https://github.com/gama-platform/gama/blob/d821c20e7552f582e26ab0ee1f168302a1a05e18/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Box2D%20Library.gaml) to demonstrate the use of box2d as a physics engine
* The model [Serialization to Json.gaml](https://github.com/gama-platform/gama/blob/608733139a13c13d4516e5925c86a42471544f8f/ummisco.gama.serialize/models/Serialization/models/Serialization%20to%20Json.gaml) to showcase how to serialize objects into json in gama as well as deserialize json formatted strings into gama objects
* The model [2 External GAMA controller.gaml](https://github.com/gama-platform/gama/commit/b64fbd5bc39bfa8f05b2a332ce2157f62e0a0ff9) can be used to understand how to use an external program (in this case html) to control gama through gama-server
* A few classic video games like [Flappy bird.gaml](https://github.com/gama-platform/gama/commit/fc4bc538b0d02e7702bbbf951eb34d93f7d4499c), [pacman](https://github.com/gama-platform/gama/blob/2c2931185beba5f5fbb6365df9965cc2f776ebe2/msi.gama.models/models/Toy%20Models/Games/pacman/models/pacman.gaml) and [tetris](https://github.com/gama-platform/gama/blob/2c2931185beba5f5fbb6365df9965cc2f776ebe2/msi.gama.models/models/Toy%20Models/Games/tetris/tetris.gaml)
* The model [Conditional aspect selection.gaml](https://github.com/gama-platform/gama/blob/e35225fe130eff4a69ac9b372eecb796ef204e64/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/Conditional%20aspect%20selection.gaml) to showcase how to select different aspects in displays according to some external condition

</details>


---
---

## Major changes from 1.9.1 to 1.9.2

**The GAMA development team is pleased to announce the release of GAMA 1.9.2**. This is a maintenance release, aiming at fixing bugs observed in 1.9.1 and clarifying some of its concepts. No new major feature has been added, except the possibility to define `#mouse_drag` events. 

### Detailed changes

<details>
 <summary>This release of GAMA contains new features and fixes, including:</summary>

* 2D displays can now also be locked (only from the user interface currently)
* A new event has been introduced: `mouse_drag`, an example is available in the model library: [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Mouse Drag.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.2/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Mouse%20Drag.gaml)
* Fixes potential issues with `user_location` on touch screens
* Fixes many issues on keyboard events (see issue [#3770](https://github.com/gama-platform/gama/issues/3770), and [this commit](https://github.com/gama-platform/gama/commit/48973746ba47191f0aac92fff1908a950ae07d3c))
* Fixes control buttons not updating while in fullscreen ([#3769](https://github.com/gama-platform/gama/issues/3769))
* Fixes the saving of matrices using the `save` statement that was faulty for non-square matrices
* Fixes the casting from `matrix` to `string` that was faulty for non-square matrices
* Adds the operator `exp_rnd` to generate a random number following an exponential distribution (example in [msi.gama.models/models/Visualization and User Interaction/Visualization/Charts/models/Distribution.gaml](https://github.com/gama-platform/gama/blob/bc6dd960f608af2a61b358cfbb1eba0d89329d05/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/Charts/models/Distribution.gaml))
* Various fixes and improvements for the reading/writing of `csv` files (see this [commit](https://github.com/gama-platform/gama/commit/ead1fd816bf55b1f6838127122750959fc33b999), [this one](https://github.com/gama-platform/gama/commit/fbe60ca9a72f5b2be322d5bfe1b7ac179079ffcd), [this one](https://github.com/gama-platform/gama/commit/c4eb5023019a8f360d29870c7c3b7d6f425f4a8f) and this [issue](https://github.com/gama-platform/gama/issues/3817))
* Fixes bugs in the gaml editor when a display didn't contain any code
* Improves the display of fields/mesh ([#3796](https://github.com/gama-platform/gama/issues/3796))
* Fixes runtime error happening in torus models in certain cases ([#3783](https://github.com/gama-platform/gama/issues/3783))
* Improvement of the type inference system for matrices ([#3792](https://github.com/gama-platform/gama/issues/3792))
* Fixes `hpc` flag being ignored in some cases in headless mode ([#3687](https://github.com/gama-platform/gama/issues/3687))
* Fixes a bug in `save_simulation` where simulations with variables of type font couldn't be saved ([#3815](https://github.com/gama-platform/gama/issues/3815))
* Fixes default camera in 3d displays not being applied unless explicitly written ([#3811](https://github.com/gama-platform/gama/issues/3811))
* Enables steps in `loop` statement to be of float type instead of silently casting it to int ([#3810](https://github.com/gama-platform/gama/issues/3810))
* Type casting has been made more consistent (see [#3809 for colors](https://github.com/gama-platform/gama/issues/3809), [#3803](https://github.com/gama-platform/gama/issues/3803) for lists and [#3806](https://github.com/gama-platform/gama/issues/3806) for pairs )
* Improves memory management when drawing images (see [this commit](https://github.com/gama-platform/gama/commit/7839e38a71694621fab9174b1f8a8e5e81f866ec))
* Fixes rendering issues in documentation navigation within gama on windows ([#3804](https://github.com/gama-platform/gama/issues/3804))
* Better handling of `HTTP` responses (see this [commit](https://github.com/gama-platform/gama/commit/9f95125c85a3d63fe69e7c6697c3f48c1aa8e841))
* Fixes runtime errors happening in some models with dynamic cameras ([#3821](https://github.com/gama-platform/gama/issues/3821))
* Fixes issues related to search dialog in the help menu for macOS ([#3829](https://github.com/gama-platform/gama/issues/3829) and [#3828](https://github.com/gama-platform/gama/issues/3828))
* Fixes some issues leading Morris exploration not being run (see this [commit](https://github.com/gama-platform/gama/commit/faa37a417e54e45d9ee305a89ed618f4ee10dd09))
* Makes gama-server able to execute multiple commands at the same time in parallel for each client (see this [commit](https://github.com/gama-platform/gama/commit/e7abe5c69bed37472bb631aada11b88c33ee0716))
* Adds an optional keepalive function to gama-server (see this [commit](https://github.com/gama-platform/gama/commit/e7abe5c69bed37472bb631aada11b88c33ee0716))
* Fixes exception raising sometimes when clients disconnect from gama-server (see this [commit](https://github.com/gama-platform/gama/commit/30ab9f193dbd8fe7747d140744badc27b1351e9c))
* Splitting the gama-server command `fetch` into two commands: `upload` and `download`
* Adding some verification on the format and types for the `parameters` option of the `load` and `reload` commands of gama-server
* Renaming the `memorize` type into `record` 
* Introducing `compress` facet to indicate if a `memorize`/`record` experiment should use compression (reduces memory usage but increase computation time)
* Introducing different formats used internally for `memorize`/`record` experiments that can be: `xml`, the legacy one, or two new ones: `json` and `binary` (both faster and more memory efficient) and can be set with the `format` facet of the experiment.
* Fixing issues in the script `gama-headless.sh` used in macOS ([#3766](https://github.com/gama-platform/gama/issues/3766) and this [commit](https://github.com/gama-platform/gama/commit/1f0436ea9f668283f4824aefba5d0f1b13274318))
* Multiple fixes on the `moran` operator (see this [issue](https://github.com/gama-platform/gama/issues/3848), this [commit](https://github.com/gama-platform/gama/commit/a4f3aad5d4dc9dfa56d5b5e4a9a8dda671f249b5) and [this one](https://github.com/gama-platform/gama/commit/01fa686a905bb2e37314496ab14a2b4a24d8ea07))
* Fixing the shortcut for code suggestion in macOS ([#3852](https://github.com/gama-platform/gama/issues/3852))
* ASC file using dx/dy format can now be read too
* Big memory leaks have been fixed for operations on images
* Miscellaneous internal/architecture improvements
* Fixes exceptions raised in tabu searches in some cases
* Fixes the `copy` operator on `shape` variables
* New splash screen
* Improves the navigation in the parameter by not refreshing it completely when one parameter changes (for example in batch mode)
* Fixes the initialisation order for experiment parameters
* Various general fixes in the display of svg
* All the geometries defined in an svg file are now accessible separately (allowing to draw only some of them, or to have different color for each for example)
* Adds a parameter to set an automatic `z` increment in between layers in opengl
 

</details>

***

### Changes that can impact models

#### 🔴 Errors 🔴: concepts that need to be written differently

<details>
 <summary>View detailed changes</summary>

* All skills belonging to the "driving" skill have been renamed for more intuitive names, the skill `advanced_driving` has been replaced by `driving`, the skill `skill_road` is replaced by `road_skill` and `skill_road_node` is replaced by `intersection_skill`

* The `loop` statements using a `step` facet are not casting the `step` value into an `int` anymore which means that if you had loops that used `float` variables as a step, they may behave differently.

* casting colors (`rgb` type) into different types changed in some cases:
  * casting an `rgb` into a `float` now returns the same result as casting to an `int` instead of returning `0`
  * casting an `rgb` into a `point` now returns a point formed like this `{red, green, blue}` instead of `{0,0,0}`
  * casting an `rgb` into a `list` now returns a list of its four components: red, green, blue and alpha instead of just red, green and blue

* casting a `string` into a `list` now returns a list of string composed of all the letters of the original `string`. For example: `list("some string")` will return this list: `["s", "o", "m", "e", " ", "s", "t", "r", "i", "n", "g"]`

* casting into a `pair` has been homogenized, overall most cases are kept unchanged but some fringe cases are eliminated. The general rule is that casting anything into a `pair` will now result in a pair where the first and the second elements are the same initial object. For example: `pair([1,2,3])` will return this pair: `[1,2,3]::[1,2,3]`. The only exceptions are casting a `pair` into a `pair` which will result in no change, and casting a `map` into a `pair` that will result in a pair where the first element is the list of keys of the map and the second is the list of values of the map.

* The gama-server command `fetch` has been split into two different commands: `upload` and `download` and cannot be used anymore. See [here](https://gama-platform.org/wiki/HeadlessServer#the-download-command) the documentation on how to use those commands.

* The type of experiment `memorize` should be renamed `record`. In addition there's now two additional facets you can set for `memorize`/`record` experiments: `format` and `compress`. The `format` facet indicates the internal format used to save each step, and can be `"xml"`, `"binary"` or `"json"`. The `compress` facet indicates whether or not the saved step should be compressed or not. Compressed ones will take less memory in the long run, but will take more time to save/load.

</details>



### Preferences
The description of all preferences can be found at this [page](https://gama-platform.org/wiki/Preferences). A number of new preferences have been added to cover existing or new aspects of the platform. 



### Bug fixes
You can also check the complete list of the closed issues on the [github repository](https://github.com/gama-platform/gama/issues?q=created%3A2023-04-13..2023-09-07+is%3Aclosed). Keep in mind that this list is incomplete as a lot of problems where solved without being linked to any issue on github (via the mailing list or internally for example).



### Added models
The library of models has undergone some changes. Besides making sure all the models compile and run fine under the new version of GAMA, it also brings some new models, which are listed below:

<details>
 <summary>View all new models list</summary>

* A model to showcase the use of SVG files: [ummisco.gaml.extensions.image/models/Images/models/SVG Manipulation.gaml](https://github.com/gama-platform/gama/blob/cfda0e49894472cd1475b055f886715d056222f4/ummisco.gaml.extensions.image/models/Images/models/SVG%20Manipulation.gaml)
* An example model to test the new `mouse_drag` event: [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Mouse Drag.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.2/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Mouse%20Drag.gaml)
* Pedestrian movement following Mehdi Moussaid's model: [msi.gama.models/models/Toy Models/Pedestrian/models/Moussaid model.gaml](https://github.com/gama-platform/gama/blob/3192728f30e9ee89245ca89b1cfad4bd5e75f8ce/msi.gama.models/models/Toy%20Models/Pedestrian/models/Moussaid%20model.gaml) 
* A new example of data importation to get a mapbox image as a background of the simulation: [msi.gama.models/models/Data/Data Importation/models/MapBox Image Import As Background Image.gaml](https://github.com/gama-platform/gama/blob/cfda0e49894472cd1475b055f886715d056222f4/msi.gama.models/models/Data/Data%20Importation/models/MapBox%20Image%20Import%20As%20Background%20Image.gaml)

</details>

--- 
---

## Previous major changes since 1.8.1 brought by 1.9.1

**The GAMA development team is pleased to announce the release of GAMA 1.9.1**

This version, while maintaining the power, stability, expressiveness and ease of use of GAMA, brings new capabilities and openings to the platform, making it even more intuitive to use by modelers and even more versatile in terms of applications. 

This major release of GAMA contains many new features and fixes, including:

- **A much more fluid and powerful IDE**, offering support for all the latest technologies, from HiDPI displays to JDK 17 and Apple Silicon processors. 
- **A new server mode** of GAMA, offering a clear and extensible exchange protocol, which completely revolutionizes the way to interact with the platform from R, Python or any web client. 
- **Increased model exploration possibilities** thanks to new calibration and optimization methods, also directly usable in the server mode. 
- **The addition of the two new data types `field` and `image`**, which make it even easier to load, analyze, visualize and produce raster data
- **A much more powerful graph manipulation** than previous versions, but still easy to couple with agents
- **A focus on urban mobility applications**, with `skill` `advanced_driving` and `pedestrian`, which make it much easier to produce realistic large-scale models.
- **The possibility to simulate physical interactions between agents** thanks to the new `skill`s `static_body`, `dynamic_body` and `physical_simulation`, which rely on the native `bullet` library. 
- **New and faster display capabilities**, offering more intuitive handling of agents and organisation of display surfaces, making it easier than ever to build interactive simulations, serious games or advanced scientific visualisations.

### Comparison chart 

  | Gama 1.8.1 | Gama 1.9.1
-- | -- | --
Java and environments | Java 11 and x86 (intel architecture) | Java 17, x86 and ARM architectures (notably Apple Silicon)
Server mode | - | Headless server / connection with Python and R
Model exploration | Exhaustive sampling and calibration | Several new sampling methods (e.g. latinhypercube), sensitivity analysis (e.g. Sobol) and calibration
Physics modeling | Limited | Extended features with native bullet library and influences/forces computations
Mobility modeling | `moving` and `driving` skills | `moving`, `advanced_driving` (non normative traffic) and `pedestrian` (Social force model) skills
Raster data integration | Limited with `grid` (bad performances above 500x500) | New `field` and `image` types allow larger sizes and better performances
Graph integration | Programmatic with fixed layout | Import / export to 6 graph file formats (e.g. .graphml, .gml) with various spatial layouts rendering

### Detailed changes

<details>
 <summary>View detailed changelog</summary>

### GAMA Server mode

**gama-server** is a new way of running GAMA experiments. It consists of an instance of gama-headless that, once launched, waits for commands sent through websockets and executes them. These commands follow a clear and extensible protocol, enabling its use in many contexts, from the definition of experiment plans in R to the design of dashboards in JavaScript. See the corresponding [wiki page](https://github.com/gama-platform/gama/wiki/HeadlessServer) to setup a server instance of Gama.

***

### Modelling improvements

#### `field` type

A new variable type (field) to support the management (import and use) of large raster geographic data. It allows in particular to:
* import large mono/multi-band rasters
* simply access / modify values of spatial grids as simply as before, but with very high performance improvement

Try out:
* Basic syntax to create and visualize fields: [Fields.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Data%20Types%20And%20Structures/Fields.gaml)
* Basic syntax to access/write values in fields: [Accessing Fields.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Modeling/Spatial%20Topology/Fields/Accessing%20Fields.gaml)
* Use of field to superpose information in a trafic simulation: [Traffic and Pollution.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Traffic/models/Traffic%20and%20Pollution.gaml)
* Use of field to represent flows (water): [Waterflow Field Elevation.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Waterflow/models/Waterflow%20Field%20Elevation.gaml)
* Use of field to support diffusion process: [Anisotropic Diffusion](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.maths/models/Diffusion%20Statement/models/Anisotropic%20Diffusion%20(Simple%2C%20Field).gaml) & [Uniform Diffusion](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.maths/models/Diffusion%20Statement/models/Uniform%20Diffusion%20(Field).gaml)

#### `image` type
* Easier to work with images 

Try out:
* Basic syntax to create an image: [Declaring Images.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Declaring%20Images.gaml)
* Basic syntax to manipulate an image: [Image Manipulation.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Image%20Manipulation.gaml)
* Save snapshot of a simulation displays: [Manual Snapshot.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Manual%20Snapshot.gaml)

#### `pedestrian` skill
A new plugin has been integrated in GAMA that allows to simulate pedestrian movement. This plugin uses Helbing's social force model as a basis to support pedestrian walk and offers tools to reconstruct paths from an open environment and obstacles. This two new features are identified by a skill (```pedestrian```) and an operator (```generate_pedestrian_network```) respectively. You can find examples in the models below. 

Try out:
* How to build the pedestrian network that agents use to manage the origin and destination of their trip in the open environment: [Generate pedestrian paths.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Generate%20pedestrian%20paths.gaml)
* A comprehensive list of the parameters that makes it possible how agent avoid obstacles, in a simple ([Simple environment - walk_to.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Simple%20environment%20-%20walk_to.gaml)) and a complex ([Complex environment - walk.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Complex%20environment%20-%20walk.gaml)) environment

#### `advanced_driving` skill
The driving skill has been completely redesigned in order to offer a more realistic representation of driver behavior (by explicitly using the Intelligent Driver Model and Lane-change Model MOBIL) and by allowing to take into account multi-lane vehicles - this allows for example to simulate mixed traffic composed of motorcycles and cars. Besides, the behavior of drivers can be custom to represent non normative behavior, such as dangerous take-off, disrespect of signals, signs, speed limit or road direction and lanes.

Try out:
* An abstract representation of vehicles size (bus, car, motorcycle) and free use of road lanes and direction ([Drive Random.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Drive%20Random.gaml))
* An abstract representation of vehicles managing cross section, with collision avoidance, priority, etc. ([Simple Intersection.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Simple%20Intersection.gaml))
* A very small road system with stops to simulate congestion ([Following Paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Following%20Paths.gaml))

#### Physics extension improvement
Physics plugin has been completely rewritten and allows to use native implementations of the bullet library in a redesigned framework (where physical agents can coexist with non-physical ones).

Try out:
* Interaction between static (skill ```static_body```) and dynamic (skill ```dynamic_body```) 3D objects ([Eroding Vulcano.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Eroding%20Vulcano.gaml))
* Manage 3D objects movement based on a Digital Elevation Model ([Flow on Terrain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Flow%20on%20Terrain.gaml))

***

### Experiment

#### Batch methods

Batch experiments have been reworked to better distinguish simulation exploration and model calibration. On the first hand, modelers should engage in simulation exploration if they want to launch many simulations across the parameter space, better understand the contribution of stochasticity and evaluate the specific contribution of given parameters to output variability. On the other hand, modelers should use calibration methods if they want to find parameters values of the models, so the simulation outputs are as close as possible to desired ones. A detailed description is provided in this [wiki page](https://github.com/gama-platform/gama/wiki/ExplorationMethods).

Try out:
* A walkthrough of all provided methods to explore, method ``` exploration```, and analyse the sensitivity of your model, including a tool to decide  method ```stochanalyse``` or  method ```sobol``` ([Exploration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Exploration.gaml))
* A walkthrough of minimal way to setup calibration, including the new `PSO` algorithm ([Calibration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Calibration.gaml))

#### Headless batch

We implement a way to launch Gama `batch` experiment in headless with a simple command line, using the gama-headless.sh bash script with `-batch` option. For more information, see the related ([wiki page](https://github.com/gama-platform/gama/wiki/HeadlessBatch)). 

#### Reproducibility and random number generation

* Great effort towards tracking and limiting the use of random generators outside the ones built in GAMA
* Addition of several new random number generators

***

### Displays

#### OpenGL improvements

Great improvements have been done on the displays and specifically on opengl ones. Key points are:
* Lot faster (2 times) on geometries
* Rendering of large-scale images, grids, fields or matrices using the new `mesh` layer, with several colouring options
* More flexibility:
 * `camera` statement to specify the dynamic movements of the camera
 * `light` statements to specify the lighting(s) of the scene
 * `rotate` statement to specify the rotation of the full screen
* Better and more accurate rendering of texts (with 3D, etc.)
* Possibility to choose between several predefined cameras, to save cameras, etc.

#### `mesh` layer

* display large rasters

#### `layout` improvements

* Allow to easily split or compose the displays 
* Possibility to define borderless displays

***

### User Interface

#### Support of HiDPI

* HiDPI and various "display zooms" are now supported natively. Displays, text and icons scale up and down accordingly. Only issues remaining is that the text and icons can be blurry and pixelised on some configurations (Windows 10, Windows 11 with 150% zoom, etc.)

#### Support of dark mode 

* Light and dark modes are also now supported out of the box. Preferences allow GAMA to impose its own theme or follow the one defined in the OS. A new syntax highlighting theme for dark mode is accessible from the preferences too.

***

### User Interaction

#### Addition of wizards and dialogs

* It is now possible to open wizards and dialogs from the GAML code thanks to the [user_confirm](OperatorsSZ#user_confirm), [user_input_dialog](OperatorsSZ#user_input_dialog), [wizard](OperatorsSZ#wizard) and [wizard_page](OperatorsSZ#wizard_page) operators.

Try out:
* How to define a new wizard ([Wizard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Wizard.gaml))
* detailed use of the new user_input ([User input.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/User%20input.gaml))

#### Addition of events

* new events can be defined as `display` layers: `#arrow_down`, `#arrow_up`, `#arrow_left`, `#arrow_right`, `#escape`, `#tab`, `#enter`, `#page_up`, `#page_down`

#### Clipboard

* the clipboard can be written and read using the `copy_to_clipboard(value)` and `copy_from_clipboard(type)` operators

***

### Advanced programming usages

#### Additions to GAML

* `on_change:` facet can be added to attributes and parameters to trigger any behaviour in response to a change of value. Particularly useful for defining interactive parameters.
* `abort` statement can be defined in any agent (incl. `global` and `experiment`) and executed just before the agent is disposed of. 

#### `thread` skill

The new thread skill allows to run actions in a specific thread. In particular, this skill is intended to define the minimal set of behaviours required for agents that are able to run an action in a thread.

#### File manipulations: `copy`, `zip`, `delete`, `save` improvements

* One can now completely manipulate files directly in the gama models with dedicated [`copy_file`](OperatorsBC#copy_file), [`delete_file`](OperatorsDH#delete_file), [`rename_file`](OperatorsNR#rename_file)(which can be used to move a file), [`zip`](OperatorsSZ#zip) and [`unzip`](OperatorsSZ#zip) operators.
* `save` accepts more file formats and provides a hook for developers to develop `ISaveDelegate`s

#### `network` skill improvements

To increase the integration between Gama and other applications we improved a lot the network capabilities:
* The communication with *web-services* is now easier with the possibility to execute post/get/update/delete HTTP requests directly in gaml with extensions of the `send` action of the networking skill, as described in the `HTTP POST.gaml` and `HTTP GET.gaml` of the `Plugin models` library.
* Adding support for the websocket protocol in the `network` skill
* General work on the network skill with communication outside of Gama in mind

### Graph improvements

#### Shortest paths
Integration of new algorithms for computing shortest paths in graphs.
* BidirectionalDijkstra: default one - ensure to find the best shortest path - compute one shortest path at a time: https://www.homepages.ucl.ac.uk/~ucahmto/math/2020/05/30/bidirectional-dijkstra.html
* DeltaStepping: ensure to find the best shortest path - compute one shortest path at a time: The delta-stepping algorithm is described in the paper: U. Meyer, P. Sanders, $\Delta$-stepping: a parallelizable shortest path algorithm, Journal of Algorithms, Volume 49, Issue 1, 2003, Pages 114-152, ISSN 0196-6774
* CHBidirectionalDijkstra: ensure to find the best shortest path - compute one shortest path at a time. Based on precomputations (first call of the algorithm). Implementation of the hierarchical query algorithm based on the bidirectional Dijkstra search. The query algorithm is originally described the article: Robert Geisberger, Peter Sanders, Dominik Schultes, and Daniel Delling. 2008. Contraction hierarchies: faster and simpler hierarchical routing in road networks. In Proceedings of the 7th international conference on Experimental algorithms (WEA'08), Catherine C. McGeoch (Ed.). Springer-Verlag, Berlin, Heidelberg, 319-333
* TransitNodeRouting: ensure to find the best shortest path - compute one shortest path at a time. Based on precomputations (first call of the algorithm). The algorithm is designed to operate on sparse graphs with low average outdegree. the algorithm is originally described the article: Arz, Julian &amp; Luxen, Dennis &amp; Sanders, Peter. (2013). Transit Node Routing Reconsidered. 7933. 10.1007/978-3-642-38527-8_7.

#### Input/ouput

You can now load / save your graph into dedicated file format such as .gml, .dot or .gefx to build your graph.

Try out:
* Load agents from a graph file ([Graph Agents Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Agents%20Importation.gaml)) 
* Load the entire graph from files ([Graph Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Importation.gaml)) 
* Save graphs into dedicated files format ([Save Graphs.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Exportation/models/Save%20Graphs.gaml))

#### Layout

Non spatial graph can be rendered using operators to locate nodes on a circle, as a grid lattice or considering connection as forces.

***

### OS and computing environments
GAMA 1.9.1 has been tested on:

  * Windows 10 and 11 on Intel processors
  * MacOS Monterey, Ventura on Intel & Apple Silicon computers
  * Ubuntu 20.04 and 22.04 on Intel processors

_Note that this version drops the support for 32 bits architectures._

#### Support of JDK 17+
Gama 1.9.1 brings compatibility with JDK17+ and should remain compatible for the following JDK versions.

#### Support of ARM processors
A specific version of GAMA is now built for Apple Silicon processors on macOS. Even if no specific version is produced for the ARM version of Windows, reports show that it works well in emulated mode.

#### New installers for Windows, Mac (brew) and Linux (aur, deb)
Gama 1.9.1 comes with a dedicated installer for every platform, so it's easier for newcomers to get it working.
In addition, the macOS version is now fully signed. Linux and macOS users can also benefit from CLI installers.

#### New versions of native libraries: SWT, JTS, GeoTools, bullet, JOGL, JGraphT
All the major libraries on which GAMA is relying have been bumped to their latest versions, except GeoTools (version 25) and JGraphT (version 1.5.1).

***

### Changes that can impact models

#### 🔴 Errors 🔴: concepts that cannot be used anymore 
* `gama.pref_lib_r`, `gama.pref_lib_spatialite`, `gama.pref_optimize_agent_memory`, `gama.pref_display_triangulator` have been removed
* In experiment, the method statement `exhaustive` and `explicit` does not exist anymore. Use `exploration` instead, see the related documentation on [`batch`](https://github.com/gama-platform/gama/wiki/ExplorationMethods).
* the `material` type (and the corresponding `material:` facet in `draw:`) does not exist anymore and has not been replaced.
* the built-in `equation` types (`SIR`, etc.) do not exist anymore and have not been replaced. 
* `field` cannot be used anymore as a species or variable name. 
* `image` cannot be used anymore as a species or variable name. 
* `to_list` cannot be used anymore as a species or variable name.

#### 🔴 Errors 🔴: concepts that need to be written differently
* `timeStamp()` in `SQLSKILL` does not exist anymore. Use `machine_time` instead.
* `dem(...)` operators do not exist anymore. Use a combination of `field` and `mesh` layer to load and draw a digital elevation model
* `event ['k']` should be rewritten as `event 'k'`.
* `generate_complete_graph`, `generate_barabasi_albert`, `generate_watts_strogatz`, and `as_distance_graph` now take different arguments. Please refer to their documentation. 
* `load_graph_from_file` has been removed and replaced by the use of the corresponding graph file types (`graphml_file`, etc.)
* `simplex_generator` has been removed and replaced by `generate_terrain`

#### 🟠 Warnings 🟠: 
* `grid` + `lines:` is deprecated and replaced by `border:`
* `save` + `type:` is deprecated and replaced by `format:`
* `display` + `draw_env:` is deprecated and replaced by `axes:`
* `display` + `synchronized:` is deprecated. `synchronized:` should now be defined on `output:`
* `display` + `camera_pos:` is deprecated. Should be replaced by `location:` defined on a `camera` statement inside the `display`
* `display` + `camera_interaction:` is deprecated. Should be replaced by `locked:` defined on a `camera` statement inside the `display`
* `display` + `camera_up_vector:` is deprecated. Not used anymore.
* `display` + `camera_look_pos:` is deprecated. Should be replaced by `target:` defined on a `camera` statement inside the `display`
* `display` + `focus:` is deprecated. Should be replaced by `target:` defined on a `camera` statement inside the `display`
* `display` + `ambient_light:` is deprecated. Should be replaced by `intensity:` defined on a `light #ambient` statement inside the `display`
* `light` + `position:` is deprecated and replaced by `location:`
* `light` + `update:` is deprecated and replaced by `dynamic:`
* `light` + `color:` is deprecated and replaced by `intensity:`
* `light` + `name:` now takes a `string` and not an `int`
* `light` + `draw_light:` is deprecated and replaced by `show:`
* `light` + `type:` now takes a `string` among `#spot`, `#point` or `#direction`
* `user_input` is deprecated and should be replaced by `user_input_dialog`
* `draw` + `empty:` is deprecated and replaced by `wireframe:`
* `image` (layer) + `file:` is deprecated and replaced by the direct use of the file name as the default facet
* `event` now takes a string for its default facet (preferably the defined constants like `#mouse_move`, `#left_arrow`, etc.)
* `event` + `action:` is deprecated as the definition of the action should directly follow the statement definition
* the `with_optimizer_type` operator is deprecated and replaced by `with_shortestpath_algorithm`

***

### Preferences

The description of all preferences can be found at this [page](https://gama-platform.org/wiki/next/Preferences). A number of new preferences have been added to cover existing or new aspects of the platform. They are summarised below.

#### New preferences

##### Interface tab

* _Startup_ Remember Gama windows sizes
* _Startup_ Several prompts related to the use of workspaces
* _Startup_ Setup a model to run at start

##### Editors tab
* _Edition_ More options (3) for automatic typing
* _Edition_ Turns experiment buttons into a drop down list
* _Syntax_ Coloring according to Gama theme (light|dark)

##### Execution tab
* (New) _Parameters_ Customize parameter view
* _Parallelism_ Use all available threads in batch mode

##### Display tab
* _Chart preferences_ Choose resolution of charts
* (Removed) _Advanced_
* _OpenGL_ Limit the number of frames
* _OpenGL_ Sensitivity of keyboard/mouse/trackpad
* _OpenGL_ Ambiant light intensity
* _OpenGL_ Default camera orientation

##### Data and Operator
* _Random Number Generator_ Display RNG in parameter view
* (Removed) _Optimization_ Many options have been removed to enforce reproducibility

##### (New) Experimental
This tab holds experimental preferences that should be use with care

### Setting and sharing preferences
Gama 1.9.1 brings new options for setting preferences and sharing them among models. 
#### Passing preferences to GAMA at startup
Modellers running the headless or gui versions of GAMA can now pass preferences to the executable using arguments (either in the headless script or in the `Gama.ini` file). The syntax is `-Dpref_name=value` (for instance `-Dpref_display_synchronized=true` to synchronise displays, including snapshots of headless GAMA, with the simulation).  
#### Global or workspace scopes
The default behaviour of GAMA makes sharing preferences between workspaces and models easy, since they are global to the user account. In some instances, however, it can be necessary to restrict them to a local scope (i.e. a workspace). In that case, launching GAMA with the `-Duse_global_preference_store=false` will make it save its preferences in the current workspace and not globally anymore. 

***

### Bug fixes
You can also check the complete list of the closed issues on the [github repository](https://github.com/gama-platform/gama/issues?q=created%3A%3E%3D2020-06-10+is%3Aclosed). Keep in mind that this list is incomplete as a lot of problems where solved without being linked to any issue on github (via the mailing list or internally for example).

***

### Added models
The library of models has undergone some changes. Besides making sure all the models compile and run fine under the new version of GAMA, it also brings some new models, which are listed below:

#### Usage of the `pedestrian` skill
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Complex environment - walk.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Complex%20environment%20-%20walk.gaml)
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Generate pedestrian paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Generate%20pedestrian%20paths.gaml)
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Simple environment - walk_to.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Simple%20environment%20-%20walk_to.gaml)

***
#### New `graph` capabilities
* [msi.gama.models/models/Data/Data Exportation/models/Save Graphs.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Exportation/models/Save%20Graphs.gaml)
* [msi.gama.models/models/Data/Data Importation/models/Graph Agents Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Agents%20Importation.gaml)
* [msi.gama.models/models/Data/Data Importation/models/Graph Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Importation.gaml)
* [msi.gama.models/models/Modeling/Spatial Topology/Graphs/models/Clustering.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Modeling/Spatial%20Topology/Graphs/models/Clustering.gaml)

***
#### Utilities
* [msi.gama.models/models/Data/Utils/models/FileUtils.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/FileUtils.gaml)
* [msi.gama.models/models/Data/Utils/models/TestWebAddress.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/TestWebAddress.gaml)
* [msi.gama.models/models/Data/Utils/models/ZipUnzip.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/ZipUnzip.gaml)

***
#### Elements of GAML syntax
* [msi.gama.models/models/GAML Syntax/Abort statement/Abort.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Abort%20statement/Abort.gaml)
* [msi.gama.models/models/GAML Syntax/Data Types And Structures/Fields.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Data%20Types%20And%20Structures/Fields.gaml)
* [msi.gama.models/models/GAML Syntax/Loop And Iterations/Break and Continue.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Loop%20And%20Iterations/Break%20and%20Continue.gaml)
* [msi.gama.models/models/GAML Syntax/System/Clipboard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/Clipboard.gaml)
* [msi.gama.models/models/GAML Syntax/System/Elements of Syntax.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/Elements%20of%20Syntax.gaml)
* [msi.gama.models/models/GAML Syntax/System/RunThread.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/RunThread.gaml)
* [msi.gama.models/models/GAML Syntax/Variables/Declaration of Parameters.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Variables/Declaration%20of%20Parameters.gaml)
* [msi.gama.models/models/GAML Syntax/Variables/Notifying Variables.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Variables/Notifying%20Variables.gaml)

***
#### New `batch` capabilities
* [msi.gama.models/models/Model Exploration/Batch Simulation/Calibration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Calibration.gaml)
* [msi.gama.models/models/Model Exploration/Batch Simulation/Exploration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Exploration.gaml)

***
#### Toy models
* [msi.gama.models/models/Toy Models/Art/Gama 1.9/models/GAMA 1.9.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Art/Gama%201.9/models/GAMA%201.9.gaml)
* [msi.gama.models/models/Toy Models/Games/Snake.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Games/Snake.gaml)
* [msi.gama.models/models/Toy Models/K Nearest Neighbours/models/knn.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/K%20Nearest%20Neighbours/models/knn.gaml)

***
#### Declaration and usage of `field`
* [msi.gama.models/models/Modeling/Spatial Topology/Fields/Accessing Fields.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Modeling/Spatial%20Topology/Fields/Accessing%20Fields.gaml)
* [msi.gama.models/models/Toy Models/Waterflow/models/Waterflow Field Elevation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Waterflow/models/Waterflow%20Field%20Elevation.gaml)
* [msi.gama.models/models/Toy Models/Traffic/models/Traffic and Pollution.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Traffic/models/Traffic%20and%20Pollution.gaml)
* [ummisco.gaml.extensions.maths/models/Diffusion Statement/models/Anisotropic Diffusion (Simple, Field).gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/models/Diffusion%20Statement/models/Anisotropic%20Diffusion%20(Simple,%20Field).gaml)
* [ummisco.gaml.extensions.maths/models/Diffusion Statement/models/Uniform Diffusion (Field).gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/models/Diffusion%20Statement/models/Uniform%20Diffusion%20(Field).gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/Building Heatmap.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/Building%20Heatmap.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/DEM Generator.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/DEM%20Generator.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/Palettes and Gradients.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/Palettes%20and%20Gradients.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/Worm Heatmap.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/Worm%20Heatmap.gaml)

***
#### New user interaction modalities
* [msi.gama.models/models/Visualization and User Interaction/GUI Design/Parameters and Commands.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/GUI%20Design/Parameters%20and%20Commands.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Confirm Dialog.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Confirm%20Dialog.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/User input.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/User%20input.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Wizard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Wizard.gaml)

***
#### New `camera` and `light` definitions
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Camera Definitions.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Definitions.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Camera Shared Zoom.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Shared%20Zoom.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Specular Effects.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Specular%20Effects.gaml)

***
#### Physics engine demonstrations
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Eroding Vulcano.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Eroding%20Vulcano.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Flow on Terrain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Flow%20on%20Terrain.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Perfect Gas Chamber.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Perfect%20Gas%20Chamber.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Play Pool.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Play%20Pool.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Stairs.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Stairs.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Testing Restitution.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Testing%20Restitution.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Testing Steps.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Testing%20Steps.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Tricky Fountain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Tricky%20Fountain.gaml)

***
#### New `driving` skill 
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Drive Random.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Drive%20Random.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Following Paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Following%20Paths.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Simple Intersection.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Simple%20Intersection.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Traffic.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Traffic.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Simple model/Simple Traffic Model.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Simple%20model/Simple%20Traffic%20Model.gaml)

***
#### New network capabilities
* [ummisco.gama.network/models/Network/2 Available protocols/HTTP Request/HTTP GET.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/HTTP%20Request/HTTP%20GET.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/HTTP Request/HTTP POST.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/HTTP%20Request/HTTP%20POST.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/TCP protocol/TCP Server And Client Example .gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/TCP%20protocol/TCP%20Server%20And%20Client%20Example%20.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/TCP protocol/TCP Server Example.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/TCP%20protocol/TCP%20Server%20Example.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/WebSocket protocol/WebSocket Server And Client Example .gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/WebSocket%20protocol/WebSocket%20Server%20And%20Client%20Example%20.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/WebSocket protocol/WebSocket Server Example.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/WebSocket%20protocol/WebSocket%20Server%20Example.gaml)

***
#### Usage of the `image` type
* [ummisco.gaml.extensions.image/models/Images/models/Casting Images.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Casting%20Images.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Declaring Images.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Declaring%20Images.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Image Manipulation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Image%20Manipulation.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Manual Snapshot.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Manual%20Snapshot.gaml)

***
#### New mathematical tests
* [ummisco.gaml.extensions.maths/tests/ODE Tests/models/Consistency Test.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/tests/ODE%20Tests/models/Consistency%20Test.gaml)
* [ummisco.gaml.extensions.maths/tests/ODE Tests/models/Events Test.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/tests/ODE%20Tests/models/Events%20Test.gaml)


</details>