---
title:  Major changes from 1.8.1 to 1.9.1
---


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

***

## GAMA Server mode

**gama-server** is a new way of running GAMA experiments. It consists of an instance of gama-headless that, once launched, waits for commands sent through websockets and executes them. These commands follow a clear and extensible protocol, enabling its use in many contexts, from the definition of experiment plans in R to the design of dashboards in JavaScript. See the corresponding [wiki page](https://github.com/gama-platform/gama/wiki/HeadlessServer) to setup a server instance of Gama.

***

## Modelling improvements
### `field` type
A new variable type (field) to support the management (import and use) of large raster geographic data. It allows in particular to:
* import large mono/multi-band rasters
* simply access / modify values of spatial grids as simply as before, but with very high performance improvement

Try out:
* Basic syntax to create and visualize fields: [Fields.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Data%20Types%20And%20Structures/Fields.gaml)
* Basic syntax to access/write values in fields: [Accessing Fields.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Modeling/Spatial%20Topology/Fields/Accessing%20Fields.gaml)
* Use of field to superpose information in a trafic simulation: [Traffic and Pollution.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Traffic/models/Traffic%20and%20Pollution.gaml)
* Use of field to represent flows (water): [Waterflow Field Elevation.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Waterflow/models/Waterflow%20Field%20Elevation.gaml)
Use of field to support diffusion process: Anisotropic Diffusion & Uniform Diffusion

### `image` type
* Easier to work with images 

Try out:
* Basic syntax to create an image: [Declaring Images.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Declaring%20Images.gaml)
* Basic syntax to manipulate an image: [Image Manipulation.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Image%20Manipulation.gaml)
* Save snapshot of a simulation displays: [Manual Snapshot.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Manual%20Snapshot.gaml)

### `pedestrian` skill
A new plugin has been integrated in GAMA that allows to simulate pedestrian movement. This plugin uses Helbing's social force model as a basis to support pedestrian walk and offers tools to reconstruct paths from an open environment and obstacles. This two new features are identified by a skill (```pedestrian```) and an operator (```generate_pedestrian_network```) respectively. You can find examples in the models below. 

Try out:
* How to build the pedestrian network that agents use to manage the origin and destination of their trip in the open environment: [Generate pedestrian paths.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Generate%20pedestrian%20paths.gaml)
* A comprehensive list of the parameters that makes it possible how agent avoid obstacles, in a simple ([Simple environment - walk_to.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Simple%20environment%20-%20walk_to.gaml)) and a complex ([Complex environment - walk.gaml](https://github.com/gama-platform/gama/blob/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Complex%20environment%20-%20walk.gaml)) environment

### `advanced_driving` skill
The driving skill has been completely redesigned in order to offer a more realistic representation of driver behavior (by explicitly using the Intelligent Driver Model and Lane-change Model MOBIL) and by allowing to take into account multi-lane vehicles - this allows for example to simulate mixed traffic composed of motorcycles and cars. Besides, the behavior of drivers can be custom to represent non normative behavior, such as dangerous take-off, disrespect of signals, signs, speed limit or road direction and lanes.

Try out:
* An abstract representation of vehicles size (bus, car, motorcycle) and free use of road lanes and direction ([Drive Random.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Drive%20Random.gaml))
* An abstract representation of vehicles managing cross section, with collision avoidance, priority, etc. ([Simple Intersection.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Simple%20Intersection.gaml))
* A very small road system with stops to simulate congestion ([Following Paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Following%20Paths.gaml))

### Physics extension improvement
Physics plugin has been completely rewritten and allows to use native implementations of the bullet library in a redesigned framework (where physical agents can coexist with non-physical ones).

Try out:
* Interaction between static (skill ```static_body```) and dynamic (skill ```dynamic_body```) 3D objects ([Eroding Vulcano.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Eroding%20Vulcano.gaml))
* Manage 3D objects movement based on a Digital Elevation Model ([Flow on Terrain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Flow%20on%20Terrain.gaml))

***

## Experiment
### Batch methods
Batch experiments have been reworked to better distinguish simulation exploration and model calibration. On the first hand, modelers should engage in simulation exploration if they want to launch many simulations across the parameter space, better understand the contribution of stochasticity and evaluate the specific contribution of given parameters to output variability. On the other hand, modelers should use calibration methods if they want to find parameters values of the models, so the simulation outputs are as close as possible to desired ones. A detailed description is provided in this [wiki page](https://github.com/gama-platform/gama/wiki/ExplorationMethods).

Try out:
* A walkthrough of all provided methods to explore, method ``` exploration```, and analyse the sensitivity of your model, including a tool to decide  method ```stochanalyse``` or  method ```sobol``` ([Exploration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Exploration.gaml))
* A walkthrough of minimal way to setup calibration, including the new `PSO` algorithm ([Calibration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Calibration.gaml))

### Headless batch
We implement a way to launch Gama `batch` experiment in headless with a simple command line, using the gama-headless.sh bash script with `-batch` option. For more information, see the related ([wiki page](https://github.com/gama-platform/gama/wiki/HeadlessBatch)). 

### Reproducibility and random number generation
* Great effort towards tracking and limiting the use of random generators outside the ones built in GAMA
* Addition of several new random number generators

***

## Displays
### OpenGL improvements
Great improvements have been done on the displays and specifically on opengl ones. Key points are:
* Lot faster (2 times) on geometries
* Rendering of large-scale images, grids, fields or matrices using the new `mesh` layer, with several colouring options
* More flexibility:
 * `camera` statement to specify the dynamic movements of the camera
 * `light` statements to specify the lighting(s) of the scene
 * `rotate` statement to specify the rotation of the full screen
* Better and more accurate rendering of texts (with 3D, etc.)
* Possibility to choose between several predefined cameras, to save cameras, etc.
### `mesh` layer
* display large rasters
### `layout` improvements
* Allow to easily split or compose the displays 
* Possibility to define borderless displays

***

## User Interface
### Support of HiDPI
* HiDPI and various "display zooms" are now supported natively. Displays, text and icons scale up and down accordingly. Only issues remaining is that the text and icons can be blurry and pixelised on some configurations (Windows 10, Windows 11 with 150% zoom, etc.)
### Support of dark mode 
* Light and dark modes are also now supported out of the box. Preferences allow GAMA to impose its own theme or follow the one defined in the OS. A new syntax highlighting theme for dark mode is accessible from the preferences too.

***

## User Interaction
### Addition of wizards and dialogs
* It is now possible to open wizards and dialogs from the GAML code thanks to the [user_confirm](OperatorsSZ#user_confirm), [user_input_dialog](OperatorsSZ#user_input_dialog), [wizard](OperatorsSZ#wizard) and [wizard_page](OperatorsSZ#wizard_page) operators.

Try out:
* How to define a new wizard ([Wizard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Wizard.gaml))
* detailed use of the new user_input ([User input.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/User%20input.gaml))

### Addition of events
* new events can be defined as `display` layers: `#arrow_down`, `#arrow_up`, `#arrow_left`, `#arrow_right`, `#escape`, `#tab`, `#enter`, `#page_up`, `#page_down`

### Clipboard
* the clipboard can be written and read using the `copy_to_clipboard(value)` and `copy_from_clipboard(type)` operators

***

## Advanced programming usages

### Additions to GAML
* `on_change:` facet can be added to attributes and parameters to trigger any behaviour in response to a change of value. Particularly useful for defining interactive parameters.
* `abort` statement can be defined in any agent (incl. `global` and `experiment`) and executed just before the agent is disposed of. 

### `thread` skill
The new thread skill allows to run actions in a specific thread. In particular, this skill is intended to define the minimal set of behaviours required for agents that are able to run an action in a thread.

### File manipulations: `copy`, `zip`, `delete`, `save` improvements
* One can now completely manipulate files directly in the gama models with dedicated [`copy_file`](OperatorsBC#copy_file), [`delete_file`](OperatorsDH#delete_file), [`rename_file`](OperatorsNR#rename_file)(which can be used to move a file), [`zip`](OperatorsSZ#zip) and [`unzip`](OperatorsSZ#zip) operators.
* `save` accepts more file formats and provides a hook for developers to develop `ISaveDelegate`s

### `network` skill improvements
To increase the integration between Gama and other applications we improved a lot the network capabilities:
* The communication with *web-services* is now easier with the possibility to execute post/get/update/delete HTTP requests directly in gaml with extensions of the `send` action of the networking skill, as described in the `HTTP POST.gaml` and `HTTP GET.gaml` of the `Plugin models` library.
* Adding support for the websocket protocol in the `network` skill
* General work on the network skill with communication outside of Gama in mind

[comment]: # (### Databases extension improvements - SEE WITH BENOIT)

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

## OS and computing environments
GAMA 1.9.1 has been tested on:

  * Windows 10 and 11 on Intel processors
  * MacOS Monterey, Ventura on Intel & Apple Silicon computers
  * Ubuntu 20.04 and 22.04 on Intel processors

_Note that this version drops the support for 32 bits architectures._

### Support of JDK 17+
Gama 1.9.1 brings compatibility with JDK17+ and should remain compatible for the following JDK versions.

### Support of ARM processors
A specific version of GAMA is now built for Apple Silicon processors on macOS. Even if no specific version is produced for the ARM version of Windows, reports show that it works well in emulated mode.

### New installers for Windows, Mac (brew) and Linux (aur, deb)
Gama 1.9.1 comes with a dedicated installer for every platform, so it's easier for newcomers to get it working.
In addition, the macOS version is now fully signed. Linux and macOS users can also benefit from CLI installers.

### New versions of native libraries: SWT, JTS, GeoTools, bullet, JOGL, JGraphT
All the major libraries on which GAMA is relying have been bumped to their latest versions, except GeoTools (version 25) and JGraphT (version 1.5.1).

***

## Changes that can impact models
### 🔴 Errors 🔴: concepts that cannot be used anymore 
* `gama.pref_lib_r`, `gama.pref_lib_spatialite`, `gama.pref_optimize_agent_memory`, `gama.pref_display_triangulator` have been removed
* In experiment, the method statement `exhaustive` and `explicit` does not exist anymore. Use `exploration` instead, see the related documentation on [`batch`](https://github.com/gama-platform/gama/wiki/ExplorationMethods).
* the `material` type (and the corresponding `material:` facet in `draw:`) does not exist anymore and has not been replaced.
* the built-in `equation` types (`SIR`, etc.) do not exist anymore and have not been replaced. 
* `field` cannot be used anymore as a species or variable name. 
* `image` cannot be used anymore as a species or variable name. 
* `to_list` cannot be used anymore as a species or variable name.

### 🔴 Errors 🔴: concepts that need to be written differently
* `timeStamp()` in `SQLSKILL` does not exist anymore. Use `machine_time` instead.
* `dem(...)` operators do not exist anymore. Use a combination of `field` and `mesh` layer to load and draw a digital elevation model
* `event ['k']` should be rewritten as `event 'k'`.
* `generate_complete_graph`, `generate_barabasi_albert`, `generate_watts_strogatz`, and `as_distance_graph` now take different arguments. Please refer to their documentation. 
* `load_graph_from_file` has been removed and replaced by the use of the corresponding graph file types (`graphml_file`, etc.)
* `simplex_generator` has been removed and replaced by `generate_terrain`

### 🟠 Warnings 🟠: 
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

## Preferences
The description of all preferences can be found at this [page](https://gama-platform.org/wiki/next/Preferences). A number of new preferences have been added to cover existing or new aspects of the platform. They are summarised below.
### New preferences
#### Interface tab
* _Startup_ Remember Gama windows sizes
* _Startup_ Several prompts related to the use of workspaces
* _Startup_ Setup a model to run at start
#### Editors tab
* _Edition_ More options (3) for automatic typing
* _Edition_ Turns experiment buttons into a drop down list
* _Syntax_ Coloring according to Gama theme (light|dark)
#### Execution tab
* (New) _Parameters_ Customize parameter view
* _Parallelism_ Use all available threads in batch mode
#### Display tab
* _Chart preferences_ Choose resolution of charts
* (Removed) _Advanced_
* _OpenGL_ Limit the number of frames
* _OpenGL_ Sensitivity of keyboard/mouse/trackpad
* _OpenGL_ Ambiant light intensity
* _OpenGL_ Default camera orientation
#### Data and Operator
* _Random Number Generator_ Display RNG in parameter view
* (Removed) _Optimization_ Many options have been removed to enforce reproducibility
#### (New) Experimental
This tab holds experimental preferences that should be use with care

### Setting and sharing preferences
Gama 1.9.1 brings new options for setting preferences and sharing them among models. 
#### Passing preferences to GAMA at startup
Modellers running the headless or gui versions of GAMA can now pass preferences to the executable using arguments (either in the headless script or in the `Gama.ini` file). The syntax is `-Dpref_name=value` (for instance `-Dpref_display_synchronized=true` to synchronise displays, including snapshots of headless GAMA, with the simulation).  
#### Global or workspace scopes
The default behaviour of GAMA makes sharing preferences between workspaces and models easy, since they are global to the user account. In some instances, however, it can be necessary to restrict them to a local scope (i.e. a workspace). In that case, launching GAMA with the `-Duse_global_preference_store=false` will make it save its preferences in the current workspace and not globally anymore. 

***

## Bug fixes
You can also check the complete list of the closed issues on the [github repository](https://github.com/gama-platform/gama/issues?q=created%3A%3E%3D2020-06-10+is%3Aclosed). Keep in mind that this list is incomplete as a lot of problems where solved without being linked to any issue on github (via the mailing list or internally for example).

***

## Added models
The library of models has undergone some changes. Besides making sure all the models compile and run fine under the new version of GAMA, it also brings some new models, which are listed below:

### Usage of the `pedestrian` skill
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Complex environment - walk.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Complex%20environment%20-%20walk.gaml)
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Generate pedestrian paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Generate%20pedestrian%20paths.gaml)
* [miat.gaml.extensions.pedestrian/models/Pedestrian Skill/models/Simple environment - walk_to.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/miat.gaml.extensions.pedestrian/models/Pedestrian%20Skill/models/Simple%20environment%20-%20walk_to.gaml)

***
### New `graph` capabilities
* [msi.gama.models/models/Data/Data Exportation/models/Save Graphs.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Exportation/models/Save%20Graphs.gaml)
* [msi.gama.models/models/Data/Data Importation/models/Graph Agents Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Agents%20Importation.gaml)
* [msi.gama.models/models/Data/Data Importation/models/Graph Importation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Data%20Importation/models/Graph%20Importation.gaml)
* [msi.gama.models/models/Modeling/Spatial Topology/Graphs/models/Clustering.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Modeling/Spatial%20Topology/Graphs/models/Clustering.gaml)

***
### Utilities
* [msi.gama.models/models/Data/Utils/models/FileUtils.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/FileUtils.gaml)
* [msi.gama.models/models/Data/Utils/models/TestWebAddress.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/TestWebAddress.gaml)
* [msi.gama.models/models/Data/Utils/models/ZipUnzip.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Data/Utils/models/ZipUnzip.gaml)

***
### Elements of GAML syntax
* [msi.gama.models/models/GAML Syntax/Abort statement/Abort.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Abort%20statement/Abort.gaml)
* [msi.gama.models/models/GAML Syntax/Data Types And Structures/Fields.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Data%20Types%20And%20Structures/Fields.gaml)
* [msi.gama.models/models/GAML Syntax/Loop And Iterations/Break and Continue.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Loop%20And%20Iterations/Break%20and%20Continue.gaml)
* [msi.gama.models/models/GAML Syntax/System/Clipboard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/Clipboard.gaml)
* [msi.gama.models/models/GAML Syntax/System/Elements of Syntax.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/Elements%20of%20Syntax.gaml)
* [msi.gama.models/models/GAML Syntax/System/RunThread.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/System/RunThread.gaml)
* [msi.gama.models/models/GAML Syntax/Variables/Declaration of Parameters.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Variables/Declaration%20of%20Parameters.gaml)
* [msi.gama.models/models/GAML Syntax/Variables/Notifying Variables.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/GAML%20Syntax/Variables/Notifying%20Variables.gaml)

***
### New `batch` capabilities
* [msi.gama.models/models/Model Exploration/Batch Simulation/Calibration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Calibration.gaml)
* [msi.gama.models/models/Model Exploration/Batch Simulation/Exploration.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Model%20Exploration/Batch%20Simulation/Exploration.gaml)

***
### Toy models
* [msi.gama.models/models/Toy Models/Art/Gama 1.9/models/GAMA 1.9.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Art/Gama%201.9/models/GAMA%201.9.gaml)
* [msi.gama.models/models/Toy Models/Games/Snake.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/Games/Snake.gaml)
* [msi.gama.models/models/Toy Models/K Nearest Neighbours/models/knn.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Toy%20Models/K%20Nearest%20Neighbours/models/knn.gaml)

***
### Declaration and usage of `field`
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
### New user interaction modalities
* [msi.gama.models/models/Visualization and User Interaction/GUI Design/Parameters and Commands.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/GUI%20Design/Parameters%20and%20Commands.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Confirm Dialog.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Confirm%20Dialog.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/User input.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/User%20input.gaml)
* [msi.gama.models/models/Visualization and User Interaction/User Interaction/models/Wizard.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/User%20Interaction/models/Wizard.gaml)

***
### New `camera` and `light` definitions
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Camera Definitions.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Definitions.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Camera Shared Zoom.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Camera%20Shared%20Zoom.gaml)
* [msi.gama.models/models/Visualization and User Interaction/Visualization/3D Visualization/models/Specular Effects.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/msi.gama.models/models/Visualization%20and%20User%20Interaction/Visualization/3D%20Visualization/models/Specular%20Effects.gaml)

***
### Physics engine demonstrations
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Eroding Vulcano.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Eroding%20Vulcano.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Flow on Terrain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Flow%20on%20Terrain.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Perfect Gas Chamber.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Perfect%20Gas%20Chamber.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Play Pool.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Play%20Pool.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Stairs.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Stairs.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Testing Restitution.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Testing%20Restitution.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Testing Steps.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Testing%20Steps.gaml)
* [simtools.gaml.extensions.physics/models/Physics Engine/models/Tricky Fountain.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.physics/models/Physics%20Engine/models/Tricky%20Fountain.gaml)

***
### New `driving` skill 
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Drive Random.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Drive%20Random.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Following Paths.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Following%20Paths.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Simple Intersection.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Simple%20Intersection.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Advanced models/Traffic.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Advanced%20models/Traffic.gaml)
* [simtools.gaml.extensions.traffic/models/Driving Skill/models/Simple model/Simple Traffic Model.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/simtools.gaml.extensions.traffic/models/Driving%20Skill/models/Simple%20model/Simple%20Traffic%20Model.gaml)

***
### New network capabilities
* [ummisco.gama.network/models/Network/2 Available protocols/HTTP Request/HTTP GET.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/HTTP%20Request/HTTP%20GET.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/HTTP Request/HTTP POST.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/HTTP%20Request/HTTP%20POST.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/TCP protocol/TCP Server And Client Example .gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/TCP%20protocol/TCP%20Server%20And%20Client%20Example%20.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/TCP protocol/TCP Server Example.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/TCP%20protocol/TCP%20Server%20Example.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/WebSocket protocol/WebSocket Server And Client Example .gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/WebSocket%20protocol/WebSocket%20Server%20And%20Client%20Example%20.gaml)
* [ummisco.gama.network/models/Network/2 Available protocols/WebSocket protocol/WebSocket Server Example.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gama.network/models/Network/2%20Available%20protocols/WebSocket%20protocol/WebSocket%20Server%20Example.gaml)

***
### Usage of the `image` type
* [ummisco.gaml.extensions.image/models/Images/models/Casting Images.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Casting%20Images.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Declaring Images.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Declaring%20Images.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Image Manipulation.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Image%20Manipulation.gaml)
* [ummisco.gaml.extensions.image/models/Images/models/Manual Snapshot.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.image/models/Images/models/Manual%20Snapshot.gaml)

***
### New mathematical tests
* [ummisco.gaml.extensions.maths/tests/ODE Tests/models/Consistency Test.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/tests/ODE%20Tests/models/Consistency%20Test.gaml)
* [ummisco.gaml.extensions.maths/tests/ODE Tests/models/Events Test.gaml](https://github.com/gama-platform/gama/tree/GAMA_1.9.1/ummisco.gaml.extensions.maths/tests/ODE%20Tests/models/Events%20Test.gaml)
