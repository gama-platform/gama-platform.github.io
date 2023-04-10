---
title:  Major changes from 1.8.1 to 1.9.0
---


## Population generation
We can now completely generate a population of agents based on the description of its distribution thanks to the `generate` [statement](Statements#generate).

## Mobility modelling 
* Pedestrian Skill: A new plugin has been integrated in GAMA that allows to simulate pedestrian movement. This plugin uses Helbing's social force model as a basis and offers tools to reconstruct paths from an open environment. Example models to illustrate how to use the plugin are provided.
* New Driving Skill: The driving skill has been completely redesigned in order to offer a more realistic representation of driver behavior (by explicitly using the Intelligent Driver Model and Lane-change Model MOBIL) and by allowing to take into account multi-lane vehicles - this allows for example to simulate mixed traffic composed of motorcycles and cars.

## Thread skill
The new thread skill allows to run actions in a specific thread. In particular, this skill is intended to define the minimal set of behaviours required for agents that are able to run an action in a thread.

## Field & Mesh
New variable type (field) to support the management (import and use) of large raster geographic data. It allows in particular to:
* import large mono/multi-band rasters 
* display large rasters


## Headless
We have two new headless modes:
* **batch** makes it possible to run a simulation in gama-headless without any external file in a simple command line
* **gama-server** runs an instance of gama-headless that will just wait for commands and execute them live.

## Installers & versions
Gama 1.9.0 comes with a dedicated installer for every platform, so it's easier for newcomers to get it working.
The MacOS version is now signed and we even have a special build for the M1 architecture which dramatically improves the performances.

## Physics


## Network
To increase the integration between Gama and other applications we improved a lot the network capabilities:
* The communication with *web-services* is now easier with the possibility to execute post/get/update/delete HTTP requests directly in gaml with extensions of the `send` action of the networking skill, as described in the `HTTP POST.gaml` and `HTTP GET.gaml` of the `Plugin models` library.
* Adding support for the websocket protocol in the `network` skill
* General work on the network skill with communication outside of Gama in mind

## Parameters exploration methods 
SOBOL, PSO, Custom

## Speed improvement
better use of threads

## Shortest path
Integration of new algorithms for computing shortest paths in graphs.
* BidirectionalDijkstra: default one - ensure to find the best shortest path - compute one shortest path at a time: https://www.homepages.ucl.ac.uk/~ucahmto/math/2020/05/30/bidirectional-dijkstra.html
* DeltaStepping: ensure to find the best shortest path - compute one shortest path at a time: The delta-stepping algorithm is described in the paper: U. Meyer, P. Sanders, $\Delta$-stepping: a parallelizable shortest path algorithm, Journal of Algorithms, Volume 49, Issue 1, 2003, Pages 114-152, ISSN 0196-6774
* CHBidirectionalDijkstra: ensure to find the best shortest path - compute one shortest path at a time. Based on precomputations (first call of the algorithm). Implementation of the hierarchical query algorithm based on the bidirectional Dijkstra search. The query algorithm is originally described the article: Robert Geisberger, Peter Sanders, Dominik Schultes, and Daniel Delling. 2008. Contraction hierarchies: faster and simpler hierarchical routing in road networks. In Proceedings of the 7th international conference on Experimental algorithms (WEA'08), Catherine C. McGeoch (Ed.). Springer-Verlag, Berlin, Heidelberg, 319-333
* TransitNodeRouting: ensure to find the best shortest path - compute one shortest path at a time. Based on precomputations (first call of the algorithm). The algorithm is designed to operate on sparse graphs with low average outdegree. the algorithm is originally described the article: Arz, Julian &amp; Luxen, Dennis &amp; Sanders, Peter. (2013). Transit Node Routing Reconsidered. 7933. 10.1007/978-3-642-38527-8_7.
	

## Layouts

## Environment
Gama 1.9.0 now works with JDK17 and has been tested with Windows 10 and 11, MacOS Big Sur and Monterey as well as Ubuntu 20.04 and 22.04.
This version drops the support for 32 bits architectures.

## User interface
We integrated a full support for the dark mode on every platform.

## User interaction
It is now possible to open wizards and dialogs from the GAML code thanks to the [user_confirm](OperatorsSZ#user_confirm), [user_input_dialog](OperatorsSZ#user_input_dialog), [wizard](OperatorsSZ#wizard) and [wizard_page](OperatorsSZ#wizard_page) operators.

## Display OpenGL
Great improvements have been done on the displays and specifically on opengl ones. Keypoints are:
* It is a lot faster (2 times)
* It is more flexible and all the display's settings about the camera/rotation/light are now done with proper separate statements inside the display instead of through facets

## File manipulation
You can now completely manipulate files directly in the gama models with dedicated [`copy_file`](OperatorsBC#copy_file), [`delete_file`](OperatorsDH#delete_file), [`rename_file`](OperatorsNR#rename_file)(which can be used to move a file), [`zip`](OperatorsSZ#zip) and [`unzip`](OperatorsSZ#zip) operators.

## Bug fixes
A huge work has been done to make this version more stable and bug free

## Experiment Reproducibility

## Better IDE

## GAML

## File import

## Serialization



You can also check the complete list of the closed issues on the [github repository](https://github.com/gama-platform/gama/issues?q=+is%3Aclosed+label%3A%22V.+1.8.2%22%2C%22V.+1.9.0%22). Keep in mind that this list is incomplete as a lot of problems where solved without being linked to any issue on github (via the mailing list or internally for example).


You can find here a detailed list of all the commits since 1.8.1 that are neither merges nor ci-related:
* [5ab27e15b](https://github.com/gama-platform/gama/commit/5ab27e15b) - Fix typos in model
* [0c492b2d8](https://github.com/gama-platform/gama/commit/0c492b2d8) - [FIX] Re-add removed xtext dependency Re-add org.apache.commons.lang next to lang3 (cf commit efa57054df0d55fe2f0adebea432c73f7e6abc7e ) as needed by xtext to compile. Without this dependency, after a 'clean' in Eclipse, Gama doesn't start anymore
* [989d0fab2](https://github.com/gama-platform/gama/commit/989d0fab2) - Updating version number to 1.8.2-RC2 for installers
* [48b6f0307](https://github.com/gama-platform/gama/commit/48b6f0307) - Update MulticriteriaAnalyzeOperator.java
* [ca726ace0](https://github.com/gama-platform/gama/commit/ca726ace0) - Documentation fix
* [d2d51e117](https://github.com/gama-platform/gama/commit/d2d51e117) - Networking documentation
* [d37f7b00c](https://github.com/gama-platform/gama/commit/d37f7b00c) - Update windows_installer_script.iss
* [efa57054d](https://github.com/gama-platform/gama/commit/efa57054d) - Replaces org.apache.commons.lang dependency w. org.apache.commons.lang3
* [8fcbf279e](https://github.com/gama-platform/gama/commit/8fcbf279e) - Adds a preference to render charts at smaller sizes
* [3ab16731f](https://github.com/gama-platform/gama/commit/3ab16731f) - Deleting TcpSkill
* [7e328c983](https://github.com/gama-platform/gama/commit/7e328c983) - Fixing links in the documentation
* [fbc23ccf2](https://github.com/gama-platform/gama/commit/fbc23ccf2) - Refines the user input dialog
* [622d30425](https://github.com/gama-platform/gama/commit/622d30425) - Fixes [#3463](https://github.com/gama-platform/gama/issues/3463) and adds the possibility to remove titles from dialogs
* [40e85f860](https://github.com/gama-platform/gama/commit/40e85f860) - Simplifies Java2D on macOS + corrects background in layout
* [455092add](https://github.com/gama-platform/gama/commit/455092add) - try to fix [#3461](https://github.com/gama-platform/gama/issues/3461)
* [1f52612c7](https://github.com/gama-platform/gama/commit/1f52612c7) - Mino adjustments on the Linux part of [#3448](https://github.com/gama-platform/gama/issues/3448)
* [5ab771e18](https://github.com/gama-platform/gama/commit/5ab771e18) - Refinements of SwingControl
* [ebe4c5f97](https://github.com/gama-platform/gama/commit/ebe4c5f97) - [#3448](https://github.com/gama-platform/gama/issues/3448) again
* [918f4c251](https://github.com/gama-platform/gama/commit/918f4c251) - Continues to address [#3448](https://github.com/gama-platform/gama/issues/3448) on Windows
* [4b35623bc](https://github.com/gama-platform/gama/commit/4b35623bc) - First commit in a series that addresses [#3448](https://github.com/gama-platform/gama/issues/3448)
* [0ab781677](https://github.com/gama-platform/gama/commit/0ab781677) - Fixes [#3459](https://github.com/gama-platform/gama/issues/3459). Preferences set in a model are now restored at the end.
* [6f431c092](https://github.com/gama-platform/gama/commit/6f431c092) - workaround for [#3433](https://github.com/gama-platform/gama/issues/3433)
* [73d029825](https://github.com/gama-platform/gama/commit/73d029825) - Small changes to the chart outputs (with back/front images)
* [456b3ccda](https://github.com/gama-platform/gama/commit/456b3ccda) - Addresse [#3442](https://github.com/gama-platform/gama/issues/3442)
* [2016cab7b](https://github.com/gama-platform/gama/commit/2016cab7b) - Improves the coloring of text and the editors' menu on windows
* [46c6e6b4a](https://github.com/gama-platform/gama/commit/46c6e6b4a) - Possible solution to [#3339](https://github.com/gama-platform/gama/issues/3339). Please test !
* [9ea4ff224](https://github.com/gama-platform/gama/commit/9ea4ff224) - Reverts one more change that causes compilation problems
* [d55641ae2](https://github.com/gama-platform/gama/commit/d55641ae2) - Reverts somes changes which seem to create compilation problems
* [68f6f788e](https://github.com/gama-platform/gama/commit/68f6f788e) - Enforces the use of LinkedHashSet over HashSet in more classes
* [acb143b2a](https://github.com/gama-platform/gama/commit/acb143b2a) - Replaces HashSet with LinkedHashSet where possible.
* [9e5c9908f](https://github.com/gama-platform/gama/commit/9e5c9908f) - Fixes [#3458](https://github.com/gama-platform/gama/issues/3458).
* [4aa718d89](https://github.com/gama-platform/gama/commit/4aa718d89) - References the issue in the code
* [f888addb5](https://github.com/gama-platform/gama/commit/f888addb5) - Addresses [#3435](https://github.com/gama-platform/gama/issues/3435). Please test on Windows and Linux.
* [846b87997](https://github.com/gama-platform/gama/commit/846b87997) - [RANDOM] remove gaussian mean and stdv from pseudo skew distribution
* [ed366446f](https://github.com/gama-platform/gama/commit/ed366446f) - [RANDOM] add mean and stdv parameter to skewed gaussian random distribution
* [64f2b49ad](https://github.com/gama-platform/gama/commit/64f2b49ad) - [BATCH] make it possible to ACTUALLY use average fitness for optimization purpose
* [c5938db1e](https://github.com/gama-platform/gama/commit/c5938db1e) - Reverting the previous solution for [#3339](https://github.com/gama-platform/gama/issues/3339).
* [489e32e6f](https://github.com/gama-platform/gama/commit/489e32e6f) - Fixes [#3453](https://github.com/gama-platform/gama/issues/3453) by enhancing the validator of user_command
* [7a15cd76a](https://github.com/gama-platform/gama/commit/7a15cd76a) - Small fixes of errors in OpenGL
* [cb55981a1](https://github.com/gama-platform/gama/commit/cb55981a1) - gamaserver: set param by title or varname
* [36e036bf4](https://github.com/gama-platform/gama/commit/36e036bf4) - gamaserver: parameters's type casting
* [b7e231fda](https://github.com/gama-platform/gama/commit/b7e231fda) - Allows to evaluation vars early
* [515185797](https://github.com/gama-platform/gama/commit/515185797) - Fixes [#3438](https://github.com/gama-platform/gama/issues/3438) and provides a basis for border/background of layers
* [1530985cc](https://github.com/gama-platform/gama/commit/1530985cc) - gamaserver: set param by varname, not title
* [51a2b1285](https://github.com/gama-platform/gama/commit/51a2b1285) - add  field for experiment agent
* [92d6b375a](https://github.com/gama-platform/gama/commit/92d6b375a) - Reverts changes that prevented mouse clicks on opengl
* [efb45278a](https://github.com/gama-platform/gama/commit/efb45278a) - Gets rid of deprecated JApplet and addresses [#3446](https://github.com/gama-platform/gama/issues/3446)
* [09c2c7890](https://github.com/gama-platform/gama/commit/09c2c7890) - Cleanses ILayeredDisplayData and ILayerData from unused events
* [a32cd225b](https://github.com/gama-platform/gama/commit/a32cd225b) - Prevents possiblities of NPE in the management of views
* [6a6df9b3d](https://github.com/gama-platform/gama/commit/6a6df9b3d) - Corrects a wrong display angle
* [afb3fb083](https://github.com/gama-platform/gama/commit/afb3fb083) - Fixes [#3443](https://github.com/gama-platform/gama/issues/3443) by displaying a disabled image when unchecked
* [dd8076c45](https://github.com/gama-platform/gama/commit/dd8076c45) - gamaserver:minor modif
* [e97080194](https://github.com/gama-platform/gama/commit/e97080194) - Fixes an error introduced in the previous commit
* [b725d8cdb](https://github.com/gama-platform/gama/commit/b725d8cdb) - Fixes [#3436](https://github.com/gama-platform/gama/issues/3436) by taking into account strings of length 1.
* [5d6d7124a](https://github.com/gama-platform/gama/commit/5d6d7124a) - Addresses [#3437](https://github.com/gama-platform/gama/issues/3437) by calling the correct addValue() method
* [98fea8d1f](https://github.com/gama-platform/gama/commit/98fea8d1f) - Addresses [#3445](https://github.com/gama-platform/gama/issues/3445). Please test.
* [6446d4af1](https://github.com/gama-platform/gama/commit/6446d4af1) - fix [#3416](https://github.com/gama-platform/gama/issues/3416)
* [d2e5bcdf5](https://github.com/gama-platform/gama/commit/d2e5bcdf5) - Addresses [#3451](https://github.com/gama-platform/gama/issues/3451). Please test with various displays and zooms
* [d20571eeb](https://github.com/gama-platform/gama/commit/d20571eeb) - Removes two apparently conflicting (and useless) computations
* [f8eacb6b9](https://github.com/gama-platform/gama/commit/f8eacb6b9) - ALlows to set zNear and zFar
* [b53b371b1](https://github.com/gama-platform/gama/commit/b53b371b1) - gamaserver: eliminate a double compilation of model
* [ae24c917b](https://github.com/gama-platform/gama/commit/ae24c917b) - gamaserver: separate exp_job and exp_controller
* [da7b871b7](https://github.com/gama-platform/gama/commit/da7b871b7) - gamaserver: work on reload mechanism
* [20436b7ed](https://github.com/gama-platform/gama/commit/20436b7ed) - minor improve gamaserver controller (reload)
* [ad628944a](https://github.com/gama-platform/gama/commit/ad628944a) - catch an exception closed-ring
* [e25ca501d](https://github.com/gama-platform/gama/commit/e25ca501d) - Fixes [#3450](https://github.com/gama-platform/gama/issues/3450)
* [2d3f99b71](https://github.com/gama-platform/gama/commit/2d3f99b71) - Fix warning flags in library models
* [a5bc324c1](https://github.com/gama-platform/gama/commit/a5bc324c1) - fix network test
* [0ef07caba](https://github.com/gama-platform/gama/commit/0ef07caba) - fix network test
* [122cf4c03](https://github.com/gama-platform/gama/commit/122cf4c03) - fetch meesage from network when it come
* [019af9afc](https://github.com/gama-platform/gama/commit/019af9afc) - Fixing shortcut icon issue
* [0bad673c8](https://github.com/gama-platform/gama/commit/0bad673c8) - fix [#3432](https://github.com/gama-platform/gama/issues/3432) by finish the implementation of websocket in GAML
* [3978b58cd](https://github.com/gama-platform/gama/commit/3978b58cd) - Moves all mouse/world coordinates and ROI computation to CameraHelper
* [7078362ef](https://github.com/gama-platform/gama/commit/7078362ef) - Avoids a NPE when layouting displays
* [6d320ebaf](https://github.com/gama-platform/gama/commit/6d320ebaf) - Fixes [#3441](https://github.com/gama-platform/gama/issues/3441) by reinstalling a line suppressed by mistake
* [ee3f8d3f3](https://github.com/gama-platform/gama/commit/ee3f8d3f3) - Prevents an NPE when the experiment closes in batch
* [f5ea626ec](https://github.com/gama-platform/gama/commit/f5ea626ec) - Add 8bits icons
* [f1e81514c](https://github.com/gama-platform/gama/commit/f1e81514c) - Adds the possibility to know if the screen is HiDPI or not.
* [178ef48b4](https://github.com/gama-platform/gama/commit/178ef48b4) - fix for [#3439](https://github.com/gama-platform/gama/issues/3439)
* [edfea3dfc](https://github.com/gama-platform/gama/commit/edfea3dfc) - fix for [#3440](https://github.com/gama-platform/gama/issues/3440)
* [48a59ac28](https://github.com/gama-platform/gama/commit/48a59ac28) - Prevents a threading error when setting preferences
* [0865478b8](https://github.com/gama-platform/gama/commit/0865478b8) - Error fixed in the `tell` action.
* [b979fec0f](https://github.com/gama-platform/gama/commit/b979fec0f) - Reenables the visible / transparency facets for charts
* [0e570571f](https://github.com/gama-platform/gama/commit/0e570571f) - Allows to redefine built-in actions in 'model'
* [5f8526bcf](https://github.com/gama-platform/gama/commit/5f8526bcf) - Fixes the arg ('message') that prevents from redefining the primitive
* [667229534](https://github.com/gama-platform/gama/commit/667229534) - Unlocks the coordinates in [#mouse_move](https://github.com/gama-platform/gama/issues/mouse_move) events
* [50b0cf156](https://github.com/gama-platform/gama/commit/50b0cf156) - Addition of the 'capitalize' operator on strings
* [6c67eb3de](https://github.com/gama-platform/gama/commit/6c67eb3de) - Various enhancements and bugfixes
* [e609f674c](https://github.com/gama-platform/gama/commit/e609f674c) - Add a simple operator to play a sound
* [5fc235b52](https://github.com/gama-platform/gama/commit/5fc235b52) - Fixes an issue where all displays would be synchronized by default
* [cae14bd9b](https://github.com/gama-platform/gama/commit/cae14bd9b) - [MVN] Bump Wagon from 2.12 to 3.5.1 Should fix deploy silent timeout error when SCP May break on future v4 as SCP is now deprecated by Apache Maven...
* [bc37007a5](https://github.com/gama-platform/gama/commit/bc37007a5) - Reduces the flickering introduced on Windows by the last commit
* [24b29d753](https://github.com/gama-platform/gama/commit/24b29d753) - Fixes [#3338](https://github.com/gama-platform/gama/issues/3338) by implementing a new way to display experiments in editors
* [722092ff6](https://github.com/gama-platform/gama/commit/722092ff6) - local maven build on m1 in 20s
* [e5d00a5b7](https://github.com/gama-platform/gama/commit/e5d00a5b7) - reactivate multithread tcp server in network plugin
* [6325dfd83](https://github.com/gama-platform/gama/commit/6325dfd83) - for [#3430](https://github.com/gama-platform/gama/issues/3430) : add sender in raw message
* [063344750](https://github.com/gama-platform/gama/commit/063344750) - Improves the doc of IGamaConverter
* [d807dfff5](https://github.com/gama-platform/gama/commit/d807dfff5) - Further refactoring of the Converter hierarchy in serialize
* [2d7f1f255](https://github.com/gama-platform/gama/commit/2d7f1f255) - Tries to address [#3423](https://github.com/gama-platform/gama/issues/3423) by refreshing the Windows icon
* [1a69ef09a](https://github.com/gama-platform/gama/commit/1a69ef09a) - Provides a possible solution to [#3428](https://github.com/gama-platform/gama/issues/3428). **NEEDS TO BE TESTED**
* [8a4790cea](https://github.com/gama-platform/gama/commit/8a4790cea) - Preliminary refactoring of the Converter hierarchy ([#3428](https://github.com/gama-platform/gama/issues/3428)). PLEASE TEST
* [a35351fdb](https://github.com/gama-platform/gama/commit/a35351fdb) - Adds two missing icons.
* [dbf66719d](https://github.com/gama-platform/gama/commit/dbf66719d) - Fixes [#3434](https://github.com/gama-platform/gama/issues/3434) by implementing vivid colors and a larger gutter for markers
* [8ac5b1b4d](https://github.com/gama-platform/gama/commit/8ac5b1b4d) - Fixes [#3426](https://github.com/gama-platform/gama/issues/3426) on Linux (already fixed on macOS)
* [15688bf3b](https://github.com/gama-platform/gama/commit/15688bf3b) - Fixes a problem with the upscaling of java2D displays on HiDPI Windows
* [816b04961](https://github.com/gama-platform/gama/commit/816b04961) - Workaround a blocking problem on Windows with 2+ java2D displays
* [939fac5b5](https://github.com/gama-platform/gama/commit/939fac5b5) - refix for [#3418](https://github.com/gama-platform/gama/issues/3418): messagebox's identifier is null as raw message from outside of gama is not wellformed-gamamessage, so to avoid, push that raw message to ALL channel
* [e0ad73eb9](https://github.com/gama-platform/gama/commit/e0ad73eb9) - Update windows_installer_script.iss
* [a1b33f17a](https://github.com/gama-platform/gama/commit/a1b33f17a) - Restricts the "reparenting" trick to macOS
* [b9db7c7ab](https://github.com/gama-platform/gama/commit/b9db7c7ab) - Fixes a rare case of interthread blocking on Windows
* [39a26a0b0](https://github.com/gama-platform/gama/commit/39a26a0b0) - Fixes more problems and glitches on macOS.
* [13f006aec](https://github.com/gama-platform/gama/commit/13f006aec) - Improves both sync & autosave (crash on macOS)
* [f8674fa4e](https://github.com/gama-platform/gama/commit/f8674fa4e) - Fixing [#3422](https://github.com/gama-platform/gama/issues/3422) + changing default install directory to 64 bits Program Files
* [5ae988cf9](https://github.com/gama-platform/gama/commit/5ae988cf9) - fix [#3431](https://github.com/gama-platform/gama/issues/3431)
* [ed19d985c](https://github.com/gama-platform/gama/commit/ed19d985c) - Modernizes a bit the Event Layer model
* [ece98c502](https://github.com/gama-platform/gama/commit/ece98c502) - Addresses [#3426](https://github.com/gama-platform/gama/issues/3426) for macOS (working).
* [414cb3c88](https://github.com/gama-platform/gama/commit/414cb3c88) - Simplifies the management of display synchronization
* [7f145326b](https://github.com/gama-platform/gama/commit/7f145326b) - Enables to control synchronization of experiments from the GUI
* [2a7ed08ca](https://github.com/gama-platform/gama/commit/2a7ed08ca) - Adds possibilities to parameters:
* [2cce9edfd](https://github.com/gama-platform/gama/commit/2cce9edfd) - Remove the public transport skill (linked to ESCAPE) from GAMA
* [aff310769](https://github.com/gama-platform/gama/commit/aff310769) - add the possibility to remove the "Agent says" from the tell action.
* [d3cbe8cd6](https://github.com/gama-platform/gama/commit/d3cbe8cd6) - [SEARCH] Change inbuilt URL search Make it compatible with new search page with Algolia with commit gama-platform/gama-platform.github.io/commit/15efbe199960c906414240976346fd5373acd09d
* [6251ab01e](https://github.com/gama-platform/gama/commit/6251ab01e) - Fixes quitting the application impossible with displays open.
* [6def566aa](https://github.com/gama-platform/gama/commit/6def566aa) - Generalizes the drawing within the SWT thread
* [bcb8bd4de](https://github.com/gama-platform/gama/commit/bcb8bd4de) - Fixes two problems of fullscreen views. Adds debug info.
* [a2701127c](https://github.com/gama-platform/gama/commit/a2701127c) - Removing some old DEBUG infos
* [46788bed9](https://github.com/gama-platform/gama/commit/46788bed9) - Continues fixing glitches on the new displays architecture.
* [b386cdc60](https://github.com/gama-platform/gama/commit/b386cdc60) - Continues fixing small problems on displays (esp. in macOS)
* [36c2695be](https://github.com/gama-platform/gama/commit/36c2695be) - fix [#3427](https://github.com/gama-platform/gama/issues/3427)
* [2cb5b95fe](https://github.com/gama-platform/gama/commit/2cb5b95fe) - fixes an error with roadskill
* [f2618e4c9](https://github.com/gama-platform/gama/commit/f2618e4c9) - Two macOS problems solved
* [9341e74c4](https://github.com/gama-platform/gama/commit/9341e74c4) - Changes for the displays
* [cb23c9213](https://github.com/gama-platform/gama/commit/cb23c9213) - Update GIS Data with .prj file
* [bd82c528e](https://github.com/gama-platform/gama/commit/bd82c528e) - minor clean irit.database
* [a2114b807](https://github.com/gama-platform/gama/commit/a2114b807) - raw message for tcp server
* [bbd38c85b](https://github.com/gama-platform/gama/commit/bbd38c85b) - [Headless Batch] Doesn't encode URI - Related [#3417](https://github.com/gama-platform/gama/issues/3417)
* [7f5f1a5a8](https://github.com/gama-platform/gama/commit/7f5f1a5a8) - fixes [#3419](https://github.com/gama-platform/gama/issues/3419)
* [a505ed678](https://github.com/gama-platform/gama/commit/a505ed678) - gamalistener add param when reload, add crs in output
* [017238a1e](https://github.com/gama-platform/gama/commit/017238a1e) - add a test in the driving skill to avoid an error
* [3d39a5390](https://github.com/gama-platform/gama/commit/3d39a5390) - Fix bat headless script [#3393](https://github.com/gama-platform/gama/issues/3393)
* [0d5cae104](https://github.com/gama-platform/gama/commit/0d5cae104) - [HEADLESS] Remove '-write-xmi' from help message Don't know how to use it, what it is for, nor anything
* [a40087a78](https://github.com/gama-platform/gama/commit/a40087a78) - [REALEASE] Update predatorPrey xml sample More coherent with new documentation
* [4b5a826e9](https://github.com/gama-platform/gama/commit/4b5a826e9) - [HEADLESS] Make wrapper executable file Remove the need to launch it with 'bash ./gama-headless.sh'
* [4b98046fd](https://github.com/gama-platform/gama/commit/4b98046fd) - Remove preferences about spacialite in the preferences model
* [ff3b41127](https://github.com/gama-platform/gama/commit/ff3b41127) - Clean database code
* [44accb3e6](https://github.com/gama-platform/gama/commit/44accb3e6) - remove MySQL connector lib from  build.properties  as it  is not used anymore
* [0ecdf213e](https://github.com/gama-platform/gama/commit/0ecdf213e) - Remove the "support" of spatialite... sqlite is kept,  but  not its spatial component
* [26fc422c2](https://github.com/gama-platform/gama/commit/26fc422c2) - Refactor of  the databases : rely on Geotools for MySQL and POSTGRES/POSTGIS connection - remove the external library for mysql
* [4a0bd1ce9](https://github.com/gama-platform/gama/commit/4a0bd1ce9) - [JDK] Move release M1 on new JDK 17.0.3-7 LTS Same as every other release
* [c76d955db](https://github.com/gama-platform/gama/commit/c76d955db) - gamalistener some minorr cleanup
* [0fea79018](https://github.com/gama-platform/gama/commit/0fea79018) - Fixes a type problem on `all_indexes_of`
* [4d3af63e2](https://github.com/gama-platform/gama/commit/4d3af63e2) - [DOC] Rename exhaustive index md filename ci docs
* [3c1af2dc9](https://github.com/gama-platform/gama/commit/3c1af2dc9) - gamalistener: add params when launch, interactive mode
* [5ad72a9e6](https://github.com/gama-platform/gama/commit/5ad72a9e6) - Simple changes for debugging and improving toolbar behavior
* [365cc80ab](https://github.com/gama-platform/gama/commit/365cc80ab) - [DOC] Generate doc every Saturday midnight
* [3422b50da](https://github.com/gama-platform/gama/commit/3422b50da) - gamalistener: add reload, paramset
* [c15417eee](https://github.com/gama-platform/gama/commit/c15417eee) - update databasr project
* [2c8ec9cb0](https://github.com/gama-platform/gama/commit/2c8ec9cb0) - Update Databases : remove Oracle  and SQL Server support from GAMA core The support has been moved in a dedicated experimental plugin
* [c6d8366b1](https://github.com/gama-platform/gama/commit/c6d8366b1) - update tree and season toy model
* [ad7ff429d](https://github.com/gama-platform/gama/commit/ad7ff429d) - real fix for [#3407](https://github.com/gama-platform/gama/issues/3407) and some other toy comodel which has myself computation issue in creation of micro experiment
* [a6dba9fc3](https://github.com/gama-platform/gama/commit/a6dba9fc3) - Fixes an incorrect snapshot operation in opengl
* [f6aae1234](https://github.com/gama-platform/gama/commit/f6aae1234) - fix [#3413](https://github.com/gama-platform/gama/issues/3413)
* [a602503c2](https://github.com/gama-platform/gama/commit/a602503c2) - Removes some useless preferences + improves slider presentation
* [7cfc8a08e](https://github.com/gama-platform/gama/commit/7cfc8a08e) - Fixes [#3411](https://github.com/gama-platform/gama/issues/3411).
* [db74a08ba](https://github.com/gama-platform/gama/commit/db74a08ba) - update database model for Postresql/postgis
* [7fcbb1562](https://github.com/gama-platform/gama/commit/7fcbb1562) - [HEADLESS] Fix batch simulations not starting Link to 1eeb4495690e10eb57b07643fb1fa601eae870df - HeadlessExperimentController.java
* [0a7366954](https://github.com/gama-platform/gama/commit/0a7366954) - [HEADLESS] Finish fix [#3376](https://github.com/gama-platform/gama/issues/3376) Link to 0b00905a9317ac03f68a1839e04762d3a9138f54
* [1eeb44956](https://github.com/gama-platform/gama/commit/1eeb44956) - Prevents problems in non-NEWT Windows
* [46c311354](https://github.com/gama-platform/gama/commit/46c311354) - Repair the  connection with MYSQL
* [f61b9c37f](https://github.com/gama-platform/gama/commit/f61b9c37f) - Follow up on [#3376](https://github.com/gama-platform/gama/issues/3376)
* [577dfb5c0](https://github.com/gama-platform/gama/commit/577dfb5c0) - Added example for Stochastic Differential Equations
* [0b00905a9](https://github.com/gama-platform/gama/commit/0b00905a9) - Addresses [#3376](https://github.com/gama-platform/gama/issues/3376). Please test !
* [15960462d](https://github.com/gama-platform/gama/commit/15960462d) - Add dynamic: true to camera in order that it can be moved from  process
* [bcffa2910](https://github.com/gama-platform/gama/commit/bcffa2910) - Update Comodel Example (Populations Mutated).gaml
* [b3d7d12cb](https://github.com/gama-platform/gama/commit/b3d7d12cb) - Update TestWebAddress.gaml
* [1aac29cf4](https://github.com/gama-platform/gama/commit/1aac29cf4) - fixing broken is_reachable + model
* [d6d8646c8](https://github.com/gama-platform/gama/commit/d6d8646c8) - Fixes [#3392](https://github.com/gama-platform/gama/issues/3392) by adding a small delay to static layers
* [4291b6b52](https://github.com/gama-platform/gama/commit/4291b6b52) - Update  doc of the  Rules architecture
* [0a9c772f6](https://github.com/gama-platform/gama/commit/0a9c772f6) - updated ODE library models
* [1c8d6d008](https://github.com/gama-platform/gama/commit/1c8d6d008) - Improves the TextDisplayer for parameters. Adds a new splash screen.
* [02602bd36](https://github.com/gama-platform/gama/commit/02602bd36) - fixing [#3379](https://github.com/gama-platform/gama/issues/3379)
* [dac13ed7e](https://github.com/gama-platform/gama/commit/dac13ed7e) - Fix [#3410](https://github.com/gama-platform/gama/issues/3410)
* [43c47995e](https://github.com/gama-platform/gama/commit/43c47995e) - [FIX] Remove need of removed HTML page for Headless
* [aabf346c7](https://github.com/gama-platform/gama/commit/aabf346c7) - for [#3410](https://github.com/gama-platform/gama/issues/3410)
* [478c5fe97](https://github.com/gama-platform/gama/commit/478c5fe97) - Update  doc and  processor to display some missing statements: address issue  [#92](https://github.com/gama-platform/gama/issues/92) of the website
* [e02fb9a7c](https://github.com/gama-platform/gama/commit/e02fb9a7c) - Fixes [#3400](https://github.com/gama-platform/gama/issues/3400) by introducing the new 'text' statement in parameters
* [34ec62fc6](https://github.com/gama-platform/gama/commit/34ec62fc6) - for [#3410](https://github.com/gama-platform/gama/issues/3410)
* [306251231](https://github.com/gama-platform/gama/commit/306251231) - Remove client server code from GAMA source (now in
* [b9f590c02](https://github.com/gama-platform/gama/commit/b9f590c02) - clean data of Buildings of Montpellier
* [df186ccc7](https://github.com/gama-platform/gama/commit/df186ccc7) - typos in library models
* [8b0489e05](https://github.com/gama-platform/gama/commit/8b0489e05) - enables to define the maximal y value for radar chart (chart.... y_range: 100) - related to: [#3408](https://github.com/gama-platform/gama/issues/3408)
* [927cacde1](https://github.com/gama-platform/gama/commit/927cacde1) - fix [#3407](https://github.com/gama-platform/gama/issues/3407) , change error meesage of unavailable display type to warning
* [9b7d99b0f](https://github.com/gama-platform/gama/commit/9b7d99b0f) - Fix [#3403](https://github.com/gama-platform/gama/issues/3403) by initializing the torus in the Field DiffusionContext
* [657b9648d](https://github.com/gama-platform/gama/commit/657b9648d) - Follow up to the last commit
* [b92aef002](https://github.com/gama-platform/gama/commit/b92aef002) - Moves GamaObjFile to core (from opengl)
* [3023f3eb9](https://github.com/gama-platform/gama/commit/3023f3eb9) - Fixed headless wrapper again
* [e8132d269](https://github.com/gama-platform/gama/commit/e8132d269) - Add a new operator (and model) to test the reachability of a web address
* [071a2fd0e](https://github.com/gama-platform/gama/commit/071a2fd0e) - Fixing headless wrapper for windows without JDK
* [583877ca5](https://github.com/gama-platform/gama/commit/583877ca5) - improve the visual aspect of model Ant foraging in charts
* [a5409dda7](https://github.com/gama-platform/gama/commit/a5409dda7) - Minor visual change and setting of camera for Toy Model library
* [f8a3dce85](https://github.com/gama-platform/gama/commit/f8a3dce85) - Updater Jsoner for colors
* [8c3623108](https://github.com/gama-platform/gama/commit/8c3623108) - Fixes [#3404](https://github.com/gama-platform/gama/issues/3404) by using 'invokeLater' rather than 'invokeAndWait' in AWT
* [7a70ab9fa](https://github.com/gama-platform/gama/commit/7a70ab9fa) - Add a link between core and serialize to use xstream to Jsonify some objects
* [96d937f1c](https://github.com/gama-platform/gama/commit/96d937f1c) - MInor visuale change
* [c570b227d](https://github.com/gama-platform/gama/commit/c570b227d) - fix [#3402](https://github.com/gama-platform/gama/issues/3402)
* [a374890ca](https://github.com/gama-platform/gama/commit/a374890ca) - [DOC] Fix html tag for documentation ci docs
* [960332aa5](https://github.com/gama-platform/gama/commit/960332aa5) - update mapquest appkey
* [16b998ef6](https://github.com/gama-platform/gama/commit/16b998ef6) - Update l-tri light
* [04c966784](https://github.com/gama-platform/gama/commit/04c966784) - fixes the path to the file used for the download data model
* [f9d8fdaf1](https://github.com/gama-platform/gama/commit/f9d8fdaf1) - improve the visual aspect of OBj file loading model (size of the world)
* [da7efad7f](https://github.com/gama-platform/gama/commit/da7efad7f) - Follow-up previous commit
* [c2cd82f6d](https://github.com/gama-platform/gama/commit/c2cd82f6d) - Fixes [#3399](https://github.com/gama-platform/gama/issues/3399).
* [1a1440f40](https://github.com/gama-platform/gama/commit/1a1440f40) - Fixes [#3397](https://github.com/gama-platform/gama/issues/3397). Fixes [#3391](https://github.com/gama-platform/gama/issues/3391).
* [dcc3bf6af](https://github.com/gama-platform/gama/commit/dcc3bf6af) - [MAC SIGN] Clear *.tmp jar files - Fix [#3377](https://github.com/gama-platform/gama/issues/3377) v2 ci release
* [c8fac62a0](https://github.com/gama-platform/gama/commit/c8fac62a0) - [MAC SIGN] Clear *.tmp jar files - Fix [#3377](https://github.com/gama-platform/gama/issues/3377) ci release
* [0a140cdf1](https://github.com/gama-platform/gama/commit/0a140cdf1) - updated ODE test models
* [c73edd053](https://github.com/gama-platform/gama/commit/c73edd053) - Add lib in the META-INF for JSON export
* [b0470d18a](https://github.com/gama-platform/gama/commit/b0470d18a) - Update Serializer to add the possibility to export into JSON
* [221dd3a3d](https://github.com/gama-platform/gama/commit/221dd3a3d) - [GEN*] Clean javadoc Change from bad HTML to full MarkDown
* [3797afd1c](https://github.com/gama-platform/gama/commit/3797afd1c) - Fix Incremental Model lightning
* [42da666f8](https://github.com/gama-platform/gama/commit/42da666f8) - Prevents native physics models to hang on quitting on macOS and Linux
* [4a43bc61d](https://github.com/gama-platform/gama/commit/4a43bc61d) - Remove one of the Websocket used to get the simulation output
* [e99eb13e2](https://github.com/gama-platform/gama/commit/e99eb13e2) - Fixes [#3389](https://github.com/gama-platform/gama/issues/3389).
* [44f2476c3](https://github.com/gama-platform/gama/commit/44f2476c3) - Fixes [#3388](https://github.com/gama-platform/gama/issues/3388)
* [dd2504b18](https://github.com/gama-platform/gama/commit/dd2504b18) - Modified ODE models
* [ab92bc74f](https://github.com/gama-platform/gama/commit/ab92bc74f) - remove the parallel computation in the hydrological model (issue [#3380](https://github.com/gama-platform/gama/issues/3380))
* [0cafd2c08](https://github.com/gama-platform/gama/commit/0cafd2c08) - Fixes [#3346](https://github.com/gama-platform/gama/issues/3346) -- but not the "frontmost display" part.
* [37fe21e21](https://github.com/gama-platform/gama/commit/37fe21e21) - Fixes [#3386](https://github.com/gama-platform/gama/issues/3386) by removing the "classical" built-in equations
* [f243a1092](https://github.com/gama-platform/gama/commit/f243a1092) - fix [#3387](https://github.com/gama-platform/gama/issues/3387)
* [715569f7a](https://github.com/gama-platform/gama/commit/715569f7a) - Fixes [#3385](https://github.com/gama-platform/gama/issues/3385) (keeping a cache of the built-in doc)
* [c7047abef](https://github.com/gama-platform/gama/commit/c7047abef) - Documentation fixing [#3002](https://github.com/gama-platform/gama/issues/3002)
* [9d5b9aee6](https://github.com/gama-platform/gama/commit/9d5b9aee6) - Fixing Table Of Content  (https://github.com/gama-platform/gama/wiki/BuiltInArchitectures)
* [dd0d054b1](https://github.com/gama-platform/gama/commit/dd0d054b1) - [#3384](https://github.com/gama-platform/gama/issues/3384) missing file, sorry benoit
* [af94d59e2](https://github.com/gama-platform/gama/commit/af94d59e2) - [#3384](https://github.com/gama-platform/gama/issues/3384) please test
* [834b9c5d5](https://github.com/gama-platform/gama/commit/834b9c5d5) - Documentation fixing [#3002](https://github.com/gama-platform/gama/issues/3002)
* [bbba98d88](https://github.com/gama-platform/gama/commit/bbba98d88) - [CLEAN] Remove unsused package
* [6c365bf68](https://github.com/gama-platform/gama/commit/6c365bf68) - Improve the visual aspect of pedestrian models
* [77cc9e6ef](https://github.com/gama-platform/gama/commit/77cc9e6ef) - improve visual aspect of genstar example model
* [e24264186](https://github.com/gama-platform/gama/commit/e24264186) - Suppresses some harmless warnings.
* [27d562bed](https://github.com/gama-platform/gama/commit/27d562bed) - Add a simple example of usage of the driving skill
* [8c0ba94ad](https://github.com/gama-platform/gama/commit/8c0ba94ad) - Hides some very little used preferences from the prefs view
* [8680a1822](https://github.com/gama-platform/gama/commit/8680a1822) - Fixes [#3383](https://github.com/gama-platform/gama/issues/3383)
* [2eff8d5b3](https://github.com/gama-platform/gama/commit/2eff8d5b3) - Remove rotation in ants
* [74d1aaf04](https://github.com/gama-platform/gama/commit/74d1aaf04) - Fixes [#3365](https://github.com/gama-platform/gama/issues/3365).
* [11b2a5f3d](https://github.com/gama-platform/gama/commit/11b2a5f3d) - MapBox v1.0 Proof of concept
* [89a1811b9](https://github.com/gama-platform/gama/commit/89a1811b9) - Remove RFile and the RCaller lib from GAMA The access to R is delegated to the external plugin (cF. experimental)
* [cdb2394eb](https://github.com/gama-platform/gama/commit/cdb2394eb) - Reorganizes the display views:
* [8d5a571dc](https://github.com/gama-platform/gama/commit/8d5a571dc) - Update doc / processor to generate pdf
* [c34e95e64](https://github.com/gama-platform/gama/commit/c34e95e64) - MapBox Client WIP (Code cleaning)
* [3f4aa1e10](https://github.com/gama-platform/gama/commit/3f4aa1e10) - gama listener launch experiment without parameter input from xml of headless
* [a15a507ad](https://github.com/gama-platform/gama/commit/a15a507ad) - Improves the handling of NEWT Windows when going fullscreen
* [e2585a287](https://github.com/gama-platform/gama/commit/e2585a287) - New feature : capability  to send HTTP request (e.g. to  Web service)
* [14dee4ea6](https://github.com/gama-platform/gama/commit/14dee4ea6) - Addresses the continuation of [#3337](https://github.com/gama-platform/gama/issues/3337)
* [ac91e928a](https://github.com/gama-platform/gama/commit/ac91e928a) - fixes data for traffic tutorial
* [2b46fa03e](https://github.com/gama-platform/gama/commit/2b46fa03e) - update of the processor to manage  better some exotic data type returned by  operators
* [f2a9baf4c](https://github.com/gama-platform/gama/commit/f2a9baf4c) - clean gis data of road traffic tuto
* [30f266ef1](https://github.com/gama-platform/gama/commit/30f266ef1) - Working on GAMAWeb Client (WIP)
* [4ddf06ceb](https://github.com/gama-platform/gama/commit/4ddf06ceb) - Documenting [#3342](https://github.com/gama-platform/gama/issues/3342)
* [7d50289d7](https://github.com/gama-platform/gama/commit/7d50289d7) - fixes a problem with pie chart and background color
* [3621175a2](https://github.com/gama-platform/gama/commit/3621175a2) - complement for [#2984](https://github.com/gama-platform/gama/issues/2984)
* [9fd1124ca](https://github.com/gama-platform/gama/commit/9fd1124ca) - Fixes [#2984](https://github.com/gama-platform/gama/issues/2984).
* [cbe2ec283](https://github.com/gama-platform/gama/commit/cbe2ec283) - Fixes [#3338](https://github.com/gama-platform/gama/issues/3338). Better display of editor buttons on Windows
* [93ccdf7b6](https://github.com/gama-platform/gama/commit/93ccdf7b6) - Adds native Apple Silicon launcher
* [22c941cbb](https://github.com/gama-platform/gama/commit/22c941cbb) - Adresses [#3337](https://github.com/gama-platform/gama/issues/3337), [#3353](https://github.com/gama-platform/gama/issues/3353), [#3358](https://github.com/gama-platform/gama/issues/3358). Please test and close issues if ok
* [dad367de1](https://github.com/gama-platform/gama/commit/dad367de1) - [HEADLESS] More permissive JDK check Was very strict on the name format, but it can create some issues like for AlpineLinux which is used as based for GAMA Dockers ci release
* [7a3eee23a](https://github.com/gama-platform/gama/commit/7a3eee23a) - add more possibilities (and examples) for pie charts (related to issue [#3343](https://github.com/gama-platform/gama/issues/3343))
* [ecb0b0c98](https://github.com/gama-platform/gama/commit/ecb0b0c98) - address [#3372](https://github.com/gama-platform/gama/issues/3372)
* [059fddae3](https://github.com/gama-platform/gama/commit/059fddae3) - [LIN] Apply workaround and fix [#3373](https://github.com/gama-platform/gama/issues/3373)
* [d581b4e9c](https://github.com/gama-platform/gama/commit/d581b4e9c) - Fixed headless wrapper for windows [#3367](https://github.com/gama-platform/gama/issues/3367)
* [9cf7ecac4](https://github.com/gama-platform/gama/commit/9cf7ecac4) - [GHA JDK] Remove jdk check on gama-headless.sh w/ JDK build
* [2f23142be](https://github.com/gama-platform/gama/commit/2f23142be) - Fix for [#3371](https://github.com/gama-platform/gama/issues/3371)
* [bd8dc664f](https://github.com/gama-platform/gama/commit/bd8dc664f) - fixes [#3342](https://github.com/gama-platform/gama/issues/3342) for opengl
* [0af9ed4c3](https://github.com/gama-platform/gama/commit/0af9ed4c3) - Fixes [#3370](https://github.com/gama-platform/gama/issues/3370) by setting a default workspace name
* [cb38badf5](https://github.com/gama-platform/gama/commit/cb38badf5) - Working on GamaWeb HelloWorld
* [c86d2a6e1](https://github.com/gama-platform/gama/commit/c86d2a6e1) - Update Copyright year in Info.plist
* [f49e3680e](https://github.com/gama-platform/gama/commit/f49e3680e) - More trials to make GLCanvas and NEWTCanvas coexist...
* [baabbd002](https://github.com/gama-platform/gama/commit/baabbd002) - updated file operators and examples
* [ee2732065](https://github.com/gama-platform/gama/commit/ee2732065) - fixes [#3355](https://github.com/gama-platform/gama/issues/3355): keep the order of the experiments in a file
* [c3a8f544c](https://github.com/gama-platform/gama/commit/c3a8f544c) - should fix issue [#102](https://github.com/gama-platform/gama/issues/102) (of the documentation) : improve the paring of files constructors to avoid displaying empty example block
* [29219efd1](https://github.com/gama-platform/gama/commit/29219efd1) - updated documentation for copy/rename
* [eeb3d7f9f](https://github.com/gama-platform/gama/commit/eeb3d7f9f) - Reinstiates the -Duse_native_opengl_window flag (false by default)
* [acda6dbe1](https://github.com/gama-platform/gama/commit/acda6dbe1) - complement for [#3366](https://github.com/gama-platform/gama/issues/3366)
* [dd33b001e](https://github.com/gama-platform/gama/commit/dd33b001e) - Fix the restoration of simulations from files
* [6e78ecd57](https://github.com/gama-platform/gama/commit/6e78ecd57) - Address  issue  [#90](https://github.com/gama-platform/gama/issues/90) of the GAMA  website: generation of the documentation of skills' actions
* [456b96840](https://github.com/gama-platform/gama/commit/456b96840) - add a warning for the projection of grids (related to issue [#3345](https://github.com/gama-platform/gama/issues/3345))
* [313ae572b](https://github.com/gama-platform/gama/commit/313ae572b) - Fixes [#3366](https://github.com/gama-platform/gama/issues/3366) by providing a correct copy of function calls
* [0b3ab4333](https://github.com/gama-platform/gama/commit/0b3ab4333) - [HEAD] Port ummisco.gama.product wrapper to w/jdk version + Check JDK version + catch -write-xmi option + Update copyright year everywhere
* [0f456db01](https://github.com/gama-platform/gama/commit/0f456db01) - fixes [#3357](https://github.com/gama-platform/gama/issues/3357) - propose a rename_file and a copy_file operators
* [56fc5c3ea](https://github.com/gama-platform/gama/commit/56fc5c3ea) - Fix previous revert
* [9df63faaf](https://github.com/gama-platform/gama/commit/9df63faaf) - Revert d4750ea51
* [2aa74390e](https://github.com/gama-platform/gama/commit/2aa74390e) - Fixing issue [#3288](https://github.com/gama-platform/gama/issues/3288)
* [d4750ea51](https://github.com/gama-platform/gama/commit/d4750ea51) - [GHA RELEASE] Add format for ArchLinux based ci release
* [67dd3df30](https://github.com/gama-platform/gama/commit/67dd3df30) - [1.8.1] Cherrypick new ISSUE_TEMPLATE files
* [b47e22bd9](https://github.com/gama-platform/gama/commit/b47e22bd9) - gamalistener, try with json format standardized
* [05324c17c](https://github.com/gama-platform/gama/commit/05324c17c) - [GHA DEB] Fix switching java version Do for Debian installer test job ci release
* [98eaa00be](https://github.com/gama-platform/gama/commit/98eaa00be) - [GHA DEB TEST] Update Java Env before running test ci release
* [d3da9813f](https://github.com/gama-platform/gama/commit/d3da9813f) - [HEADLESS] Add catch if not running JDK 17
* [77638d097](https://github.com/gama-platform/gama/commit/77638d097) - [GHA DEB] Fix fix path in headless helper for jdk build v2 Forgot to remove previous command which was to fix... 🙈 ci release
* [40099a5f8](https://github.com/gama-platform/gama/commit/40099a5f8) - Update TcpSkill.java
* [ed975e4e4](https://github.com/gama-platform/gama/commit/ed975e4e4) - [GHA DEB] Fix fix path in headless helper for jdk build Set full path for the JDK embedded binary ci release
* [990650117](https://github.com/gama-platform/gama/commit/990650117) - fixing typos and error messages in tcp skill
* [4fcef7daa](https://github.com/gama-platform/gama/commit/4fcef7daa) - [GHA DEB] Fix path relative path in headless helper We know where GAMA is install, so we can hard-code it and limit future problem ci release
* [923f51b9e](https://github.com/gama-platform/gama/commit/923f51b9e) - [GHA DEB] Explicit update apt database Prevent current error downloading inexisting package ci release
* [fd1ea5832](https://github.com/gama-platform/gama/commit/fd1ea5832) - [GHA DEB] Apply previous commit for w/ JDK on the fly ci release
* [fe6782a2d](https://github.com/gama-platform/gama/commit/fe6782a2d) - [DEB] Add Dependency and conflicts Will install JDK 17 automatically for light version and replace version w/ JDK if already present
* [4c374cab3](https://github.com/gama-platform/gama/commit/4c374cab3) - address [#3360](https://github.com/gama-platform/gama/issues/3360)
* [ccc131834](https://github.com/gama-platform/gama/commit/ccc131834) - [GHA DEB] Install local deb can't be chained in command ci release
* [4f8f307c4](https://github.com/gama-platform/gama/commit/4f8f307c4) - [DEB] Add GPL3 copyright in release ci release
* [53ac2dae5](https://github.com/gama-platform/gama/commit/53ac2dae5) - [GHA DEB] Fix test installer job
* [71b32ae57](https://github.com/gama-platform/gama/commit/71b32ae57) - [DEB] Copy icon in product Fix missing icon in drawer and task bar
* [dc7c65c22](https://github.com/gama-platform/gama/commit/dc7c65c22) - [PUB] Fix macOS loop Empty cells in array are skipped in bash, which was missing some of our builds ci release
* [b33f47921](https://github.com/gama-platform/gama/commit/b33f47921) - [GHA DEB] Fix post remove script Fix deadlock script from bad copy-paste
* [ff9fb14fe](https://github.com/gama-platform/gama/commit/ff9fb14fe) - [GHA REL] Auto-scale archive upload loop ci release
* [1b9794ff5](https://github.com/gama-platform/gama/commit/1b9794ff5) - [GHA REL] Add linux zip in gama-zip-builds artifact Last thing missing for publish script ci release
* [585f5ed38](https://github.com/gama-platform/gama/commit/585f5ed38) - [GHA REL] Fix echo var instead of command ci release
* [57835d20a](https://github.com/gama-platform/gama/commit/57835d20a) - Fix some issues on unuserialize
* [5812716cb](https://github.com/gama-platform/gama/commit/5812716cb) - Revert "[MAC SIGN] Use absolute path for source txt file"
* [167513de8](https://github.com/gama-platform/gama/commit/167513de8) - [GHA REL] Pass Github's var to bash env one ci release
* [0d9973e80](https://github.com/gama-platform/gama/commit/0d9973e80) - [MAC SIGN] Use absolute path for source txt file
* [8611c6be7](https://github.com/gama-platform/gama/commit/8611c6be7) - [GHA DEB] Change postrm file permission ci release
* [880522a9f](https://github.com/gama-platform/gama/commit/880522a9f) - [GHA MAC] Process only files flagged in pre-sign job ci release
* [b64b960ac](https://github.com/gama-platform/gama/commit/b64b960ac) - Fix color printing
* [9509a07ee](https://github.com/gama-platform/gama/commit/9509a07ee) - [DEB] Better clean-up after install Also, add 'gama-headless' in system PATH
* [22ba009bb](https://github.com/gama-platform/gama/commit/22ba009bb) - Revert "[JAR] Remove useless lib from jSerialComm"
* [36f0a1477](https://github.com/gama-platform/gama/commit/36f0a1477) - Revert "[GEOTOOLS] Clean jar file"
* [62403e287](https://github.com/gama-platform/gama/commit/62403e287) - [MAC PRE-SIGN] Prettier logs
* [a42507214](https://github.com/gama-platform/gama/commit/a42507214) - [MAC SIGN] Not deleting source file anymore ci release
* [b0f2d7d8d](https://github.com/gama-platform/gama/commit/b0f2d7d8d) - [GHA MAC] Use result file from pre-sign job ci release
* [7734ed68f](https://github.com/gama-platform/gama/commit/7734ed68f) - [GHA MAC] Add pre-signing CI step Use Linux VM to fetch list of jar to open and sign -> Done to prevent silent hanging of heavy MacOS' Github runner
* [d0d5fa9a4](https://github.com/gama-platform/gama/commit/d0d5fa9a4) - [GHA MAC] Remove IS_WITH_JDK reverse var
* [70a6f1df9](https://github.com/gama-platform/gama/commit/70a6f1df9) - restructure websocket, move to network plugin (to be a protocol beside tcp, udp) and to be able to use tcp, udp in headless listener
* [1a0a314aa](https://github.com/gama-platform/gama/commit/1a0a314aa) - [RELEASE] Add exe installer
* [97d23da34](https://github.com/gama-platform/gama/commit/97d23da34) - [JDK] Start revert 993db9eb52 Still missing aarch64 build
* [14897659c](https://github.com/gama-platform/gama/commit/14897659c) - [GHA DEB] Change permission for postinst script was bad permissions 644 (must be >=0555 and <=0775) -> Is now 0775 ci release
* [8deb4c4b6](https://github.com/gama-platform/gama/commit/8deb4c4b6) - [GHA DEB] Fix unzip path ci release
* [45c0b9cb5](https://github.com/gama-platform/gama/commit/45c0b9cb5) - [GHA DEB] Add postinst file Set permissions for freshly installed gama application ci release
* [aa9b3cff8](https://github.com/gama-platform/gama/commit/aa9b3cff8) - [GHA MAC] Un-parallelize signatures ci release
* [4e03770a9](https://github.com/gama-platform/gama/commit/4e03770a9) - [GHA MAC] Parallelize per archi Only run 2 VM at a time, 4 seems too big :( ci release
* [c0ef62ebf](https://github.com/gama-platform/gama/commit/c0ef62ebf) - [MAC SIGN] Clear some debug log
* [17b62c460](https://github.com/gama-platform/gama/commit/17b62c460) - [GHA MAC] Re-parallelize 4 signing processes Error seems to come from old Xcode application usage ci release
* [4f70217ea](https://github.com/gama-platform/gama/commit/4f70217ea) - [GHA WIN] Write sed modification in file Command was applied only in log display text, not an infile modification
* [9e5f0334f](https://github.com/gama-platform/gama/commit/9e5f0334f) - [GHA MAC] Bump runner to JDK 17 LTS
* [17729e0cc](https://github.com/gama-platform/gama/commit/17729e0cc) - [GHA MAC] Use default Xcode version Was hardcoded on 13.0 from before it turns default one ci release
* [e12e3da31](https://github.com/gama-platform/gama/commit/e12e3da31) - [GHA MAC] Signing one build at a time ci release
* [e7054f7bd](https://github.com/gama-platform/gama/commit/e7054f7bd) - [GHA WIN] Fix msi needs + Add mendatory LICENSE file + Unzip ressources + Fix input directory ci release
* [022fdc1c9](https://github.com/gama-platform/gama/commit/022fdc1c9) - [GHA MAC] Explicit shell for composite Github Action ain't smart enough to know which runner to run bash commands, so it needs to be explicited for each job step ci release
* [9bbc6662c](https://github.com/gama-platform/gama/commit/9bbc6662c) - [GHA MAC] Full checkout Less clean, but should work well ci release
* [f9a7452f5](https://github.com/gama-platform/gama/commit/f9a7452f5) - [GHA MAC] Checkout composite action first + soft parts comments ci release
* [46f4d4b48](https://github.com/gama-platform/gama/commit/46f4d4b48) - [GHA MAC] Move from matrix to composite action Will allow to more easily/prettily separate signature for 4 macOS built ci release
* [fcab28e66](https://github.com/gama-platform/gama/commit/fcab28e66) - [GHA MAC] Try to reverse list on JDK ci release
* [993db9eb5](https://github.com/gama-platform/gama/commit/993db9eb5) - [JDK] Temporary link hard-coded Temurin is releasing a new stable version, so hard code link to have script still running ci release
* [ff131d259](https://github.com/gama-platform/gama/commit/ff131d259) - [GHA MAC] Sub-parallelize mac builds Only 2 VM at the time, should prevent signature timeout ci release
* [6e88c1eab](https://github.com/gama-platform/gama/commit/6e88c1eab) - [GHA MAC] Try to reverse list only for JDK ones ci release
* [27653ff50](https://github.com/gama-platform/gama/commit/27653ff50) - [GHA MAC] Print processed file only if opened ci release
* [b499af34f](https://github.com/gama-platform/gama/commit/b499af34f) - [GHA MAC] Add delay between each mac VM + keep reverse list only for JDK ones   -> Try to reduce submission concurrency ci release
* [ed64a99ba](https://github.com/gama-platform/gama/commit/ed64a99ba) - [JAR] Remove useless lib from jSerialComm ci release
* [3bfbb74b9](https://github.com/gama-platform/gama/commit/3bfbb74b9) - [GHA MAC] Apply job delay for JDK signing ci release
* [1dbe17012](https://github.com/gama-platform/gama/commit/1dbe17012) - Adding windows inno-setup script + icon
* [f7abf5568](https://github.com/gama-platform/gama/commit/f7abf5568) - [GHA MAC] Replace missing tac command ci release
* [bcf391e06](https://github.com/gama-platform/gama/commit/bcf391e06) - [GEOTOOLS] Clean jar file Remove useless native lib like for DragonBSD May help fix signature script for MacOS
* [64f67d8cd](https://github.com/gama-platform/gama/commit/64f67d8cd) - [GHA MAC] Try to de-parallelize macos jobs ci release
* [06707de9d](https://github.com/gama-platform/gama/commit/06707de9d) - [GHA MAC] Add debug information while signing ci release
* [f6aaae916](https://github.com/gama-platform/gama/commit/f6aaae916) - [GHA DEB] Fix debian package preparation Forgot to change zip file name to process
* [43232545a](https://github.com/gama-platform/gama/commit/43232545a) - [GHA MAC] Try to fix macOS hanging Send text console message every 25 seconds to not have job timeouted ci release
* [b123b2b45](https://github.com/gama-platform/gama/commit/b123b2b45) - Revert 3ebee6152 - Can't use self hosted MacOS runner
* [4580e65a2](https://github.com/gama-platform/gama/commit/4580e65a2) - [PUBLISH] Refactor renaming loop ci release
* [783111a78](https://github.com/gama-platform/gama/commit/783111a78) - [GHA DOC] Disable latest commit message trigger Use only workflow ones to trigger doc generation Prevent re-trigger release or else
* [2e117b691](https://github.com/gama-platform/gama/commit/2e117b691) - [GHA DEB] Fix filename for post-package build check ci release
* [8b8e56260](https://github.com/gama-platform/gama/commit/8b8e56260) - [DEB] Fix wrong copy-paste ci release
* [91462c461](https://github.com/gama-platform/gama/commit/91462c461) - [DEB] Add EOL mark
* [d4120979b](https://github.com/gama-platform/gama/commit/d4120979b) - [GHA DEB] Fix wrong command ci release Promise, it's the last one...
* [367d6e9c1](https://github.com/gama-platform/gama/commit/367d6e9c1) - [GHA DEB] Fix missing folder ci release
* [344933caa](https://github.com/gama-platform/gama/commit/344933caa) - [DEB] Generate 2 release for GAMA w/ and w/o JDK
* [bf39a8d71](https://github.com/gama-platform/gama/commit/bf39a8d71) - [DEB] Get extra ressources from current branch
* [ebe09227c](https://github.com/gama-platform/gama/commit/ebe09227c) - [DEB] Change default icon for linux Moving to icns like MacOS Will bring easier icon evolution (only one file) and xpm ain't much supported by linux
* [a351c05a7](https://github.com/gama-platform/gama/commit/a351c05a7) - [DOC] Trigger website rebuild with POST request instead of empty commit
* [4724b0646](https://github.com/gama-platform/gama/commit/4724b0646) - [GHA DOC] Fix publish git commands v2
* [57fa1a295](https://github.com/gama-platform/gama/commit/57fa1a295) - [GHA DOC] Mini optimisation Doesn't generate product, not needed for documentation workflow 🧐
* [f19fc1e14](https://github.com/gama-platform/gama/commit/f19fc1e14) - [DOC] Remove WebsiteGeneration.md generation File removed since gama-platform/gama-platform.github.io[#86](https://github.com/gama-platform/gama/issues/86) Remove one error line while generating documentation
* [0e81712d2](https://github.com/gama-platform/gama/commit/0e81712d2) - [GHA DOC] Fix wiki update git commands
* [bf0c078d6](https://github.com/gama-platform/gama/commit/bf0c078d6) - [GHA DOC] Fix paths broken since moved from Travis to Github Actions
* [4d001b66f](https://github.com/gama-platform/gama/commit/4d001b66f) - [GHA DOC] Remove push trigger Needed to enable workflow present only on non-default branch
* [551c26732](https://github.com/gama-platform/gama/commit/551c26732) - [GHA DOC] Enable workflow
* [99d1ebac8](https://github.com/gama-platform/gama/commit/99d1ebac8) - [GHA DOC] Regen doc on GAMA_1.8.2 branch
* [20aecfa70](https://github.com/gama-platform/gama/commit/20aecfa70) - [TRAVIS] Init refresh doc GHA
* [faa146194](https://github.com/gama-platform/gama/commit/faa146194) - fixes [#3347](https://github.com/gama-platform/gama/issues/3347)
* [75aa3047a](https://github.com/gama-platform/gama/commit/75aa3047a) - Base for a workaround for [#2828](https://github.com/gama-platform/gama/issues/2828)
* [028025d2a](https://github.com/gama-platform/gama/commit/028025d2a) - BoxAndWhisker charts first version
* [4243f84e8](https://github.com/gama-platform/gama/commit/4243f84e8) - BDI tutorial
* [18da57fb2](https://github.com/gama-platform/gama/commit/18da57fb2) - Update BDI tutorial 3.gaml
* [a3ec486eb](https://github.com/gama-platform/gama/commit/a3ec486eb) - Fixing typos in prey-predator tutorial
* [20ca04aea](https://github.com/gama-platform/gama/commit/20ca04aea) - fixes [#3340](https://github.com/gama-platform/gama/issues/3340)
* [c4964aec8](https://github.com/gama-platform/gama/commit/c4964aec8) - update of scheduler models to schedule the manager
* [2bb1367b5](https://github.com/gama-platform/gama/commit/2bb1367b5) - fixes 3339
* [1676e41ce](https://github.com/gama-platform/gama/commit/1676e41ce) - gamalistener try with styling in webgis
* [5463c6770](https://github.com/gama-platform/gama/commit/5463c6770) - workaround for [#3334](https://github.com/gama-platform/gama/issues/3334)
* [bd4f9aaff](https://github.com/gama-platform/gama/commit/bd4f9aaff) - fix wrong declaration of startup model preference, mentioned in [#3332](https://github.com/gama-platform/gama/issues/3332)
* [4b2d5af0f](https://github.com/gama-platform/gama/commit/4b2d5af0f) - sorry, remove wrong file
* [cfeef0ffc](https://github.com/gama-platform/gama/commit/cfeef0ffc) - HeadlessListener add expression evaluate
* [191e29aab](https://github.com/gama-platform/gama/commit/191e29aab) - Fixes [#3336](https://github.com/gama-platform/gama/issues/3336) by correctly handling double values in temporal expressions
* [e41f33f0b](https://github.com/gama-platform/gama/commit/e41f33f0b) - update parameter initialization
* [c893f9716](https://github.com/gama-platform/gama/commit/c893f9716) - fix advanced social force model
* [cbc1239bc](https://github.com/gama-platform/gama/commit/cbc1239bc) - HeadlessListener try to use processQueue
* [8d19a47c4](https://github.com/gama-platform/gama/commit/8d19a47c4) - HeadlessListener mimic processCommand of experimentController
* [d590dc77f](https://github.com/gama-platform/gama/commit/d590dc77f) - Simplifies some OpenGL geometrical operations
* [cffcbb21d](https://github.com/gama-platform/gama/commit/cffcbb21d) - Avoids a casting problem when passing only points
* [d38b6eb9e](https://github.com/gama-platform/gama/commit/d38b6eb9e) - See [#2761](https://github.com/gama-platform/gama/issues/2761). Prevents overlays to rotate when the display rotates
* [32a4f40d5](https://github.com/gama-platform/gama/commit/32a4f40d5) - Darkns the red color in the navigator
* [a88e7ca21](https://github.com/gama-platform/gama/commit/a88e7ca21) - Possible fix for [#3335](https://github.com/gama-platform/gama/issues/3335).
* [5503a9ea6](https://github.com/gama-platform/gama/commit/5503a9ea6) - Update MessageFactory.java
* [f6f53dc2f](https://github.com/gama-platform/gama/commit/f6f53dc2f) - fix wrong declaration of default model preference, mentioned in [#3332](https://github.com/gama-platform/gama/issues/3332)
* [cb9312a60](https://github.com/gama-platform/gama/commit/cb9312a60) - Fixes [#3332](https://github.com/gama-platform/gama/issues/3332) - a NPE due to a bad initialization of preferences
* [1322364f5](https://github.com/gama-platform/gama/commit/1322364f5) - Fixes [#3305](https://github.com/gama-platform/gama/issues/3305) by coloring built-in attributes in shapefiles in red
* [00531c7ff](https://github.com/gama-platform/gama/commit/00531c7ff) - re-add old genstar operatirs
* [a33244b09](https://github.com/gama-platform/gama/commit/a33244b09) - headless listener, some manangement of stocking experiments
* [dca10a2a9](https://github.com/gama-platform/gama/commit/dca10a2a9) - Attempts to improve the appearance of GAMA on M1 macOS (see [#3324](https://github.com/gama-platform/gama/issues/3324))
* [93dbbfc62](https://github.com/gama-platform/gama/commit/93dbbfc62) - add raw facet to connect statement, turn the message of only TCP to raw format, no compositeMessage
* [4db2bbd3a](https://github.com/gama-platform/gama/commit/4db2bbd3a) - Update TcpSkill.java
* [3a640525f](https://github.com/gama-platform/gama/commit/3a640525f) - adding basic documentation to tcp skill
* [c9a3629eb](https://github.com/gama-platform/gama/commit/c9a3629eb) - Adding raw tcp skill to the network plugin
* [6f9b62687](https://github.com/gama-platform/gama/commit/6f9b62687) - typo in Moving 3D Object.gaml
* [3730e24b9](https://github.com/gama-platform/gama/commit/3730e24b9) - [TRAVIS] Add M1 build in zip w/ jdk script
* [638af7860](https://github.com/gama-platform/gama/commit/638af7860) - [TRAVIS] Clean zipping script Remove dead code, still need to optimize copy-pasted parts
* [032202cfb](https://github.com/gama-platform/gama/commit/032202cfb) - [BUILD] Add extraresource on M1 build
* [af2b66aa3](https://github.com/gama-platform/gama/commit/af2b66aa3) - [MAVEN] Move back Tycho on stable 2.6.0
* [fdf60f9da](https://github.com/gama-platform/gama/commit/fdf60f9da) - [MAVEN] Clean build target Sorry, but noone is using Linux ppc64le anymore...
* [4822a6220](https://github.com/gama-platform/gama/commit/4822a6220) - [MAVEN] Fix commit d367474fbdc8b10d255a52420783b1b16704360e Properly link SWT M1 fragment for Maven compilation
* [5faade08d](https://github.com/gama-platform/gama/commit/5faade08d) - add environment aarch64 forr  [#3331](https://github.com/gama-platform/gama/issues/3331)
* [0a73a1b3f](https://github.com/gama-platform/gama/commit/0a73a1b3f) - Tries to circumvent the bug in SWT regarding HiDPI handling...
* [aa94633a5](https://github.com/gama-platform/gama/commit/aa94633a5) - Removes autoscaleup in Java2D Displays
* [1929e680d](https://github.com/gama-platform/gama/commit/1929e680d) - Generalizes the "bringToTop(...)" call in the activation of displays
* [0c4f0659d](https://github.com/gama-platform/gama/commit/0c4f0659d) - Forces the activation of views on macOS.
* [cb6fe2777](https://github.com/gama-platform/gama/commit/cb6fe2777) - Adds option (-Dsun.java2d.uiScale.enabled=false)for fractional scales
* [94d0cdeb8](https://github.com/gama-platform/gama/commit/94d0cdeb8) - Avoids a stall when having a fullscreen display on macOS
* [d367474fb](https://github.com/gama-platform/gama/commit/d367474fb) - Adds missing SW component ([#3324](https://github.com/gama-platform/gama/issues/3324))
* [5f0e824a3](https://github.com/gama-platform/gama/commit/5f0e824a3) - Fixes [#3325](https://github.com/gama-platform/gama/issues/3325). Requires further testing on fast PCs / macOS / Linux
* [ecd888e23](https://github.com/gama-platform/gama/commit/ecd888e23) - Fixes [#3313](https://github.com/gama-platform/gama/issues/3313) and [#3239](https://github.com/gama-platform/gama/issues/3239). Needs to be tested carefully on fast PCs
* [f9f75d7cd](https://github.com/gama-platform/gama/commit/f9f75d7cd) - upload zip and compile from the temp unzip onserver
* [b1ff8a156](https://github.com/gama-platform/gama/commit/b1ff8a156) - headless listener, commit output endpoint to get geojson of species
* [0948990aa](https://github.com/gama-platform/gama/commit/0948990aa) - headless listener, commit the example of geojson serializing
* [03f4a0355](https://github.com/gama-platform/gama/commit/03f4a0355) - Fixes [#3324](https://github.com/gama-platform/gama/issues/3324) by providing native M1 libraries to JOGL and JBullet
* [2bcdbce1e](https://github.com/gama-platform/gama/commit/2bcdbce1e) - WebUI, stepping, closing experiment
* [cce01b70b](https://github.com/gama-platform/gama/commit/cce01b70b) - better JS display management
* [939456cce](https://github.com/gama-platform/gama/commit/939456cce) - gama lisening mode, add exit command
* [bc6b72842](https://github.com/gama-platform/gama/commit/bc6b72842) - Bump SWT version from 2021-12 to 2022-03 ci release
* [a10547458](https://github.com/gama-platform/gama/commit/a10547458) - Adds a plugin required by Guava on Eclipse 2022-03
* [f3792e89f](https://github.com/gama-platform/gama/commit/f3792e89f) - Adds a different animator depending on the architecture and os
* [4571e7b1f](https://github.com/gama-platform/gama/commit/4571e7b1f) - Fixes [#3307](https://github.com/gama-platform/gama/issues/3307). Adds a timer and distinguishes between heap/non-heap memory
* [b89eacabd](https://github.com/gama-platform/gama/commit/b89eacabd) - gama listening mode, basically usable, need review to reorganise classes and more features
* [f4c21f291](https://github.com/gama-platform/gama/commit/f4c21f291) - Adds a simplified GLAnimator to better address [#3324](https://github.com/gama-platform/gama/issues/3324).
* [a188a2525](https://github.com/gama-platform/gama/commit/a188a2525) - Sort of "fixes" [#3323](https://github.com/gama-platform/gama/issues/3323) by declaring ranges of names in menus
* [2df6e07a9](https://github.com/gama-platform/gama/commit/2df6e07a9) - Minor additions and changes in some Library models
* [a2bb31564](https://github.com/gama-platform/gama/commit/a2bb31564) - Adds a preference for setting the default intensity of lights in OpenGL
* [d1efcb416](https://github.com/gama-platform/gama/commit/d1efcb416) - Fixes [#3326](https://github.com/gama-platform/gama/issues/3326) & warnings for camera, light and rotation in Java2D display
* [a4124f0e1](https://github.com/gama-platform/gama/commit/a4124f0e1) - Fixes [#3328](https://github.com/gama-platform/gama/issues/3328). Big with smooth: true and refresh: false in mesh layers.
* [750b85c86](https://github.com/gama-platform/gama/commit/750b85c86) - Use of black magic to fix [#3267](https://github.com/gama-platform/gama/issues/3267) (genstar)
* [6e3e9b798](https://github.com/gama-platform/gama/commit/6e3e9b798) - First step to fix Genstar errors ([#3267](https://github.com/gama-platform/gama/issues/3267))
* [b0ddba32c](https://github.com/gama-platform/gama/commit/b0ddba32c) - Fixes [#3327](https://github.com/gama-platform/gama/issues/3327) by drawing visual affordances on foldable sections
* [80fd6050b](https://github.com/gama-platform/gama/commit/80fd6050b) - Add 'cells_overlapping' to provide better results than the cells_in when geometry are polylines.
* [892a4c47d](https://github.com/gama-platform/gama/commit/892a4c47d) - Genstar: replace genstar jar files by the code of Genstar
* [5dcc57596](https://github.com/gama-platform/gama/commit/5dcc57596) - Update ProjectSetForGama.psf
* [d16d81026](https://github.com/gama-platform/gama/commit/d16d81026) - Improves (by a factor of 10x !) the "smoothing" of mesh displays
* [58135680c](https://github.com/gama-platform/gama/commit/58135680c) - Put smaller and better structured sources for JOGL
* [075c830c3](https://github.com/gama-platform/gama/commit/075c830c3) - Modification of some default values for attributes in these models
* [ba8fe52a8](https://github.com/gama-platform/gama/commit/ba8fe52a8) - Fixes [#3271](https://github.com/gama-platform/gama/issues/3271) by documenting the necessity to read 'end_conversation'
* [ebac92d32](https://github.com/gama-platform/gama/commit/ebac92d32) - change the name of a model (download spatial data)
* [b33340288](https://github.com/gama-platform/gama/commit/b33340288) - add a warning for Gamagrid file in case of problem with the CRS ([#3304](https://github.com/gama-platform/gama/issues/3304))
* [3bf0bb666](https://github.com/gama-platform/gama/commit/3bf0bb666) - [PRODUCT] Fix new guard options Related to conversation on commit 492cf3b3d33bb0e398c75e1dfce2d4d5a6000e65
* [906890ffd](https://github.com/gama-platform/gama/commit/906890ffd) - Removes the fonts still residing in the opengl plugin (not used anymore)
* [f00d44695](https://github.com/gama-platform/gama/commit/f00d44695) - Fixes [#3321](https://github.com/gama-platform/gama/issues/3321) and reduces the pressure on memory when building textures
* [edd183eb3](https://github.com/gama-platform/gama/commit/edd183eb3) - Fix a Windows bug (incorrect "hidden" event sent to displays w/o tabs)
* [e9e8ca0c8](https://github.com/gama-platform/gama/commit/e9e8ca0c8) - Tests solution to [#3318](https://github.com/gama-platform/gama/issues/3318) on Linux and fixes one specific issue
* [0f781fbc6](https://github.com/gama-platform/gama/commit/0f781fbc6) - GAMA listener, try to add dynamic output
* [2dd2405bb](https://github.com/gama-platform/gama/commit/2dd2405bb) - js dynamic add widget of output
* [c267590d6](https://github.com/gama-platform/gama/commit/c267590d6) - Fixes [#3318](https://github.com/gama-platform/gama/issues/3318). Needs to be tested more seriously on Linux and Windows
* [bb20f7580](https://github.com/gama-platform/gama/commit/bb20f7580) - Removes two arguments ("use_old_sync_strategy" and "use_old_animator")
* [4b08a62c8](https://github.com/gama-platform/gama/commit/4b08a62c8) - Adds JOGL sources
* [c16f29d10](https://github.com/gama-platform/gama/commit/c16f29d10) - Adds the option to print the stack trace of the current Thread
* [fa7f3dc2d](https://github.com/gama-platform/gama/commit/fa7f3dc2d) - Update README.md
* [2f46735d1](https://github.com/gama-platform/gama/commit/2f46735d1) - Update README.md
* [b760e0a4a](https://github.com/gama-platform/gama/commit/b760e0a4a) - Eliminates a useless condition (taken in charge already)
* [974822ce8](https://github.com/gama-platform/gama/commit/974822ce8) - Eliminates an error introduced in the previous commit
* [8d8ab30fb](https://github.com/gama-platform/gama/commit/8d8ab30fb) - A fix to the previous workaround to enable JOGL to run on Ubuntu [#3199](https://github.com/gama-platform/gama/issues/3199)
* [733101632](https://github.com/gama-platform/gama/commit/733101632) - A tentative fix for [#3199](https://github.com/gama-platform/gama/issues/3199). Needs to be verified and heavily tested !
* [e3ab832bd](https://github.com/gama-platform/gama/commit/e3ab832bd) - Adds an "Attributes" category to shapefiles in the navigator (see [#3305](https://github.com/gama-platform/gama/issues/3305))
* [9a7c8ea73](https://github.com/gama-platform/gama/commit/9a7c8ea73) - [#3312](https://github.com/gama-platform/gama/issues/3312) test inf
* [492cf3b3d](https://github.com/gama-platform/gama/commit/492cf3b3d) - Adding more options to guard against JVM crazyness :)
* [897cdefa3](https://github.com/gama-platform/gama/commit/897cdefa3) - Improves the formatting of the source files
* [a6c30971e](https://github.com/gama-platform/gama/commit/a6c30971e) - Adds the arguments of GAMA in the product with their default value
* [a667e6042](https://github.com/gama-platform/gama/commit/a667e6042) - [#2984](https://github.com/gama-platform/gama/issues/2984) Avoids recreating executors in case of a "listening server" mode
* [06441d5e5](https://github.com/gama-platform/gama/commit/06441d5e5) - Addresses (and fixes) [#2984](https://github.com/gama-platform/gama/issues/2984) by providing an executor based runtime
* [f27edf781](https://github.com/gama-platform/gama/commit/f27edf781) - new js ui
* [6c4667801](https://github.com/gama-platform/gama/commit/6c4667801) - change  the classpath, so that headless uses the default Java version of the workspace
* [e15a6489a](https://github.com/gama-platform/gama/commit/e15a6489a) - change classpath of the headless to fix compilation  error  introdducedd by  Websocket
* [71896e22b](https://github.com/gama-platform/gama/commit/71896e22b) - Fixes [#2176](https://github.com/gama-platform/gama/issues/2176) by adding a 'rotate:' facet to layers
* [d600af94a](https://github.com/gama-platform/gama/commit/d600af94a) - simple web gui to communicate with gama headless daemon
* [82f67f8d7](https://github.com/gama-platform/gama/commit/82f67f8d7) - headless run as daemon, communicate through websocket
* [b3d199c25](https://github.com/gama-platform/gama/commit/b3d199c25) - Corrects a bug where casting a field to a matrix would return the field
* [b9f113740](https://github.com/gama-platform/gama/commit/b9f113740) - Fixes a bug where inspecting in OpenGL would lead to an NPE
* [9510a1c89](https://github.com/gama-platform/gama/commit/9510a1c89) - Fixes a bug where the deprecation of a facet could lead to a NPE
* [ba5159ab7](https://github.com/gama-platform/gama/commit/ba5159ab7) - Make deprecated 'ambient_light' facet work again in the new light system
* [7a093a406](https://github.com/gama-platform/gama/commit/7a093a406) - Fixes [#3306](https://github.com/gama-platform/gama/issues/3306).
* [d661da131](https://github.com/gama-platform/gama/commit/d661da131) - A bit of cleansing of constants and keywords
* [e665ff7b5](https://github.com/gama-platform/gama/commit/e665ff7b5) - Refactors 'light' in 'display' to be on par with 'camera' and 'rotation'
* [a6d88bdfe](https://github.com/gama-platform/gama/commit/a6d88bdfe) - Fixes [#2761](https://github.com/gama-platform/gama/issues/2761). Addition of the `rotation` statement.
* [374578a79](https://github.com/gama-platform/gama/commit/374578a79) - Reenables rotation of displays (for [#2761](https://github.com/gama-platform/gama/issues/2761)). Simplifies cameras
* [6949c48f9](https://github.com/gama-platform/gama/commit/6949c48f9) - Enforcing the "positive y" policy regarding cameras in GAML/GAMA ([#2694](https://github.com/gama-platform/gama/issues/2694))
* [07abedd23](https://github.com/gama-platform/gama/commit/07abedd23) - Reduces the number of resources used to draw arrows
* [c023c8c57](https://github.com/gama-platform/gama/commit/c023c8c57) - Fix for [#995](https://github.com/gama-platform/gama/issues/995). Addition of the [#isometric](https://github.com/gama-platform/gama/issues/isometric) camera
* [46500e8ae](https://github.com/gama-platform/gama/commit/46500e8ae) - Implements an explicit release of buffers in dispose() (see [#3307](https://github.com/gama-platform/gama/issues/3307))
* [b08cc3e46](https://github.com/gama-platform/gama/commit/b08cc3e46) - Fixes a problem of camera settings in Grid DEM.gaml model
* [ac8cc8039](https://github.com/gama-platform/gama/commit/ac8cc8039) - Adapts library models to the new camera declaration syntax
* [4d8eac87c](https://github.com/gama-platform/gama/commit/4d8eac87c) - Fixes for [#2757](https://github.com/gama-platform/gama/issues/2757), [#2742](https://github.com/gama-platform/gama/issues/2742), [#1159](https://github.com/gama-platform/gama/issues/1159), [#579](https://github.com/gama-platform/gama/issues/579), [#2746](https://github.com/gama-platform/gama/issues/2746) and [#2640](https://github.com/gama-platform/gama/issues/2640)
* [f5b9e4277](https://github.com/gama-platform/gama/commit/f5b9e4277) - Adds a default getMaxDimension() method to IShape
* [9335339b2](https://github.com/gama-platform/gama/commit/9335339b2) - Adds 'rounded' method
* [6134efc98](https://github.com/gama-platform/gama/commit/6134efc98) - Handles 'autorun' so that experiments run once the displays are ready
* [29fd57e4b](https://github.com/gama-platform/gama/commit/29fd57e4b) - Allows to create a separator without a "width"
* [dfbb06b3d](https://github.com/gama-platform/gama/commit/dfbb06b3d) - Makes sure the search for display views happens in the right thread
* [bfab2b59f](https://github.com/gama-platform/gama/commit/bfab2b59f) - Adds the reference to the new icon ('display.camera2')
* [5ec9cec47](https://github.com/gama-platform/gama/commit/5ec9cec47) - Accepts arbitrary collections for the "among" facet in "parameter"
* [69263d2ef](https://github.com/gama-platform/gama/commit/69263d2ef) - Allows to specify a horizontal offset for pop-up menus
* [1ea39d14a](https://github.com/gama-platform/gama/commit/1ea39d14a) - Adds a new icon for the camera controls
* [ba2d13743](https://github.com/gama-platform/gama/commit/ba2d13743) - Minor change to grammar to accomodate for the use of camera in display
* [d8f307286](https://github.com/gama-platform/gama/commit/d8f307286) - move PlayMusicSkill from network to gaml.extensions.sound
* [4475a0d9c](https://github.com/gama-platform/gama/commit/4475a0d9c) - make network export org.eclipse.paho.client.mqttv3-1.0.2-3.jar
* [dedbc28ed](https://github.com/gama-platform/gama/commit/dedbc28ed) - Update gama.product
* [aaae3e669](https://github.com/gama-platform/gama/commit/aaae3e669) - uupdate  of  the product to deal with some specific tiff files.
* [77ed1993c](https://github.com/gama-platform/gama/commit/77ed1993c) - Fixes [#3303](https://github.com/gama-platform/gama/issues/3303) -- empty strings were not considered in a rare case
* [8147c34fb](https://github.com/gama-platform/gama/commit/8147c34fb) - Fixes [#2279](https://github.com/gama-platform/gama/issues/2279) by attaching size/position to the trace elements.
* [9f59fce33](https://github.com/gama-platform/gama/commit/9f59fce33) - Substantial change to deal with [#2744](https://github.com/gama-platform/gama/issues/2744), [#3279](https://github.com/gama-platform/gama/issues/3279), [#3221](https://github.com/gama-platform/gama/issues/3221)
* [f13000309](https://github.com/gama-platform/gama/commit/f13000309) - Improves the documentation and robustness of autosave in display/output
* [5b2e4e6cd](https://github.com/gama-platform/gama/commit/5b2e4e6cd) - Fixes [#3121](https://github.com/gama-platform/gama/issues/3121) by adding an autosave: facet for the output section
* [4c489c558](https://github.com/gama-platform/gama/commit/4c489c558) - Fixes [#3302](https://github.com/gama-platform/gama/issues/3302) by adding information to multiple imports
* [50d968d2f](https://github.com/gama-platform/gama/commit/50d968d2f) - Avoids a NPE when consulting the documentation of global attributes
* [e688d85fb](https://github.com/gama-platform/gama/commit/e688d85fb) - Avoids a NPE when consulting the documentation of actions / primitives
* [40010c8d6](https://github.com/gama-platform/gama/commit/40010c8d6) - Moves a global list from GamlSyntacticConverter to ISymbolKind
* [847443e99](https://github.com/gama-platform/gama/commit/847443e99) - Computes for once the documentation of primitives and their args
* [3c16740ba](https://github.com/gama-platform/gama/commit/3c16740ba) - Avoids creating useless StringBuilder for actions with no args
* [d3f14efaf](https://github.com/gama-platform/gama/commit/d3f14efaf) - Fixes [#3285](https://github.com/gama-platform/gama/issues/3285) by ensuring rotateModel() is called inside the drawing loop
* [d661d6990](https://github.com/gama-platform/gama/commit/d661d6990) - Fixes [#3279](https://github.com/gama-platform/gama/issues/3279) Issue when upVector was aligned with the lookAt vector
* [0e57d04c3](https://github.com/gama-platform/gama/commit/0e57d04c3) - Adds a more meaningful documentation to 'seed' (cf. [#3300](https://github.com/gama-platform/gama/issues/3300))
* [d23ad76c9](https://github.com/gama-platform/gama/commit/d23ad76c9) - Fixes a problem where built-in variables were not correctly documented
* [66d774d65](https://github.com/gama-platform/gama/commit/66d774d65) - [BATCH] rebuild Saatteli sampling correctly and add proper path for automatic output batch file
* [898ae1f7f](https://github.com/gama-platform/gama/commit/898ae1f7f) - adding support for GamaColor serialization (see [#3288](https://github.com/gama-platform/gama/issues/3288) )
* [fe7d91523](https://github.com/gama-platform/gama/commit/fe7d91523) - [BATCH] add raw result outputs for Sobol, need to extend to all batch, plus remove Set from exploration algo
* [61e89ee82](https://github.com/gama-platform/gama/commit/61e89ee82) - [HEADLESS] Error on batch XML GAMA will display an error message when generating an XML for a batch experiment and inform about the '-batch' flag for this purpose Fix [#2972](https://github.com/gama-platform/gama/issues/2972)
* [8550de9ca](https://github.com/gama-platform/gama/commit/8550de9ca) - [COMPILE] Finish bump GAMA version Forgot some extra pom.xml
* [b523b9a09](https://github.com/gama-platform/gama/commit/b523b9a09) - [COMPILE] Finish bump versions Comments / GAMA version / default project JDK
* [7eeaa85ae](https://github.com/gama-platform/gama/commit/7eeaa85ae) - fix warnings in library models
* [c0f101653](https://github.com/gama-platform/gama/commit/c0f101653) - Cherrypick 673a0deab1b798e881edb5e0b0853f9d880fa665 ' fix for [#3230](https://github.com/gama-platform/gama/issues/3230) ' Picked to resolve breaking auto-merging following commit
* [6d3331b42](https://github.com/gama-platform/gama/commit/6d3331b42) - complement for item of [#2955](https://github.com/gama-platform/gama/issues/2955)
* [0c6c8a190](https://github.com/gama-platform/gama/commit/0c6c8a190) - add menu item for [#2955](https://github.com/gama-platform/gama/issues/2955)
* [648b3fb04](https://github.com/gama-platform/gama/commit/648b3fb04) - Fixes [#3299](https://github.com/gama-platform/gama/issues/3299)
* [0f1f8b8f1](https://github.com/gama-platform/gama/commit/0f1f8b8f1) - A solution to [#2955](https://github.com/gama-platform/gama/issues/2955). Plus some additions to parameters:
* [f7c6f1e33](https://github.com/gama-platform/gama/commit/f7c6f1e33) - Simplification of the scheduler/controller operations for experiments
* [ae4b88343](https://github.com/gama-platform/gama/commit/ae4b88343) - [Batch] remove keep simulation from Sobol, first step to deal with [#3263](https://github.com/gama-platform/gama/issues/3263)
* [2c141f869](https://github.com/gama-platform/gama/commit/2c141f869) - fixes some issues with batch exploration (avoid repetition of tested solutions)
* [b2c58a381](https://github.com/gama-platform/gama/commit/b2c58a381) - change rnd_choice to make it work like in GAMA 1.8.1
* [7e83ce28c](https://github.com/gama-platform/gama/commit/7e83ce28c) - A refactoring of ExperimentScheduler with the following features:
* [a09e6c1a4](https://github.com/gama-platform/gama/commit/a09e6c1a4) - Adding headers and auto-javadoc to msi.gama.annotations
* [653e8971b](https://github.com/gama-platform/gama/commit/653e8971b) - Adding headers and auto-javadoc to msi.gama.processor
* [dd7f6f6f6](https://github.com/gama-platform/gama/commit/dd7f6f6f6) - Adding headers and auto-javadoc to core extensions
* [ef5662621](https://github.com/gama-platform/gama/commit/ef5662621) - Adding headers and auto-javadoc to all GAMA UI plugins
* [f655e2b85](https://github.com/gama-platform/gama/commit/f655e2b85) - Adding headers and auto-javadoc to msi.gama.lang.gaml and headless
* [aa944e592](https://github.com/gama-platform/gama/commit/aa944e592) - Adding headers and auto-javadoc to msi.gama.core
* [2df167baf](https://github.com/gama-platform/gama/commit/2df167baf) - Adding headers and auto-javadoc to msi.gama.documentation
* [f4eece21d](https://github.com/gama-platform/gama/commit/f4eece21d) - Cleansing commit
* [d36560e4e](https://github.com/gama-platform/gama/commit/d36560e4e) - Fixes [#3294](https://github.com/gama-platform/gama/issues/3294) and provides new preferences regarding the save actions
* [31ddfab89](https://github.com/gama-platform/gama/commit/31ddfab89) - replace Hashset by LinkedHashSet
* [47cf56e96](https://github.com/gama-platform/gama/commit/47cf56e96) - Fixes [#3266](https://github.com/gama-platform/gama/issues/3266), with a few API changes (see below):
* [081b16055](https://github.com/gama-platform/gama/commit/081b16055) - [ZIP] Update jdk link regex Only for MacOS and Windows
* [dc39b47ed](https://github.com/gama-platform/gama/commit/dc39b47ed) - Merge pull request [#3283](https://github.com/gama-platform/gama/issues/3283) from gama-platform/GAMA_1.8.2_jdk17
* [03b6c46b8](https://github.com/gama-platform/gama/commit/03b6c46b8) - [ZIP] Regex latest JDK 17
* [55737e89d](https://github.com/gama-platform/gama/commit/55737e89d) - Fixes issues [#3284](https://github.com/gama-platform/gama/issues/3284) by correctly tracking column numbers in csv files
* [e30c0ff79](https://github.com/gama-platform/gama/commit/e30c0ff79) - Addresses Issue [#3288](https://github.com/gama-platform/gama/issues/3288) by providing :
* [d3f3b5b46](https://github.com/gama-platform/gama/commit/d3f3b5b46) - Fixes a bug introduced in the latest commit.
* [a962a942b](https://github.com/gama-platform/gama/commit/a962a942b) - Commit dedicated to accelerate the startup sequence of GAMA (by ~2x)
* [c9262c160](https://github.com/gama-platform/gama/commit/c9262c160) - [TYCHO] Move to official release
* [377fb00eb](https://github.com/gama-platform/gama/commit/377fb00eb) - Fixes [#3280](https://github.com/gama-platform/gama/issues/3280)
* [a74426df4](https://github.com/gama-platform/gama/commit/a74426df4) - add new file operators (zip/unzip/delete)
* [b6b0df7a8](https://github.com/gama-platform/gama/commit/b6b0df7a8) - [JOGL] Add jzy3d maven repository
* [faa736dae](https://github.com/gama-platform/gama/commit/faa736dae) - [ZIP] Re-add sudo in JDK zipping script
* [8c6006bba](https://github.com/gama-platform/gama/commit/8c6006bba) - [JDK17] Set Tycho to properly use JDK 17
* [71363c6c7](https://github.com/gama-platform/gama/commit/71363c6c7) - [ENHANCEMENT] Bump msi.gama.processor version Bump from 1.4.0 to 1.8.2 for more homogeneous project
* [bb7de69df](https://github.com/gama-platform/gama/commit/bb7de69df) - [JOGL] Update local jar with jzy3d/jogl-maven-deployer 2.4 RC 4
* [8c584b44f](https://github.com/gama-platform/gama/commit/8c584b44f) - [JDK17] Change embedded version Downgrade to LTS version (17.0.1+12)
* [2bb9b4431](https://github.com/gama-platform/gama/commit/2bb9b4431) - [JDK17] Init commit to new building architecture Bump from Tycho 2.4.0 to 2.6.0-SNAPSHOT (waiting for official release) Bump SWT to 2021-03 to 2021-12 Bump JDK from 15 to 17
* [fef1536a1](https://github.com/gama-platform/gama/commit/fef1536a1) - [merge] merge with conflicting commit ce409d7b
* [605551cad](https://github.com/gama-platform/gama/commit/605551cad) - fixes [#2945](https://github.com/gama-platform/gama/issues/2945)
* [15839b2df](https://github.com/gama-platform/gama/commit/15839b2df) - fixes [#3273](https://github.com/gama-platform/gama/issues/3273)
* [22dbbd4aa](https://github.com/gama-platform/gama/commit/22dbbd4aa) - fixes [#3272](https://github.com/gama-platform/gama/issues/3272) - copy of graph now copy also the weights
* [6848b16a8](https://github.com/gama-platform/gama/commit/6848b16a8) - Possible fix for [#3268](https://github.com/gama-platform/gama/issues/3268).
* [dd9e55426](https://github.com/gama-platform/gama/commit/dd9e55426) - Handles incompatibility between actions in imported models
* [af3a50791](https://github.com/gama-platform/gama/commit/af3a50791) - Reverts eb11efda852d2621377590f72bad16878ee6c19c / [#2945](https://github.com/gama-platform/gama/issues/2945)
* [903656a3b](https://github.com/gama-platform/gama/commit/903656a3b) - A follow-up to ce409d7bee43c3dc04c9051b61caaf36cce0dec0
* [eb11efda8](https://github.com/gama-platform/gama/commit/eb11efda8) - Fixes [#2945](https://github.com/gama-platform/gama/issues/2945). Graphs created from nodes do not duplicate edges anymore
* [4f5bd45c6](https://github.com/gama-platform/gama/commit/4f5bd45c6) - Removal of 'as_distance_graph(container, map)'
* [ce409d7be](https://github.com/gama-platform/gama/commit/ce409d7be) - Possible fix for [#3263](https://github.com/gama-platform/gama/issues/3263). Please test !
* [5b221236a](https://github.com/gama-platform/gama/commit/5b221236a) - Fixes [#3262](https://github.com/gama-platform/gama/issues/3262).
* [f3e3566fb](https://github.com/gama-platform/gama/commit/f3e3566fb) - Fixes [#3265](https://github.com/gama-platform/gama/issues/3265).
* [eac5eb404](https://github.com/gama-platform/gama/commit/eac5eb404) - Fixes [#3221](https://github.com/gama-platform/gama/issues/3221).
* [b15828886](https://github.com/gama-platform/gama/commit/b15828886) - Fixes a problem of thread race in macOS
* [d19141870](https://github.com/gama-platform/gama/commit/d19141870) - Avoids NPE in two OpenGL components
* [ddd2907e8](https://github.com/gama-platform/gama/commit/ddd2907e8) - Fixes [#3261](https://github.com/gama-platform/gama/issues/3261).
* [22d0d8827](https://github.com/gama-platform/gama/commit/22d0d8827) - Corrects a model with the new name for tTest: t_test
* [b70a74842](https://github.com/gama-platform/gama/commit/b70a74842) - For [#3260](https://github.com/gama-platform/gama/issues/3260) and [#3265](https://github.com/gama-platform/gama/issues/3265). Gathers and reorders all statistical operators.
* [cffbdaf94](https://github.com/gama-platform/gama/commit/cffbdaf94) - Fixes [#3260](https://github.com/gama-platform/gama/issues/3260) by getting rid of the 2 stat operators calling RCaller
* [485f0260d](https://github.com/gama-platform/gama/commit/485f0260d) - Fixes Issue [#3264](https://github.com/gama-platform/gama/issues/3264).
* [d515ee511](https://github.com/gama-platform/gama/commit/d515ee511) - Should fix [#3258](https://github.com/gama-platform/gama/issues/3258) by forcing the navigator to refresh its contents.
* [b1b66f30d](https://github.com/gama-platform/gama/commit/b1b66f30d) - Fixes Issue [#3254](https://github.com/gama-platform/gama/issues/3254) by looking at subspecies members when a list whose contents type is a species is passed as a filter.
* [1bef2f76f](https://github.com/gama-platform/gama/commit/1bef2f76f) - Fixes Issue [#3250](https://github.com/gama-platform/gama/issues/3250) by adding a GraphicsScope
* [be37bac1a](https://github.com/gama-platform/gama/commit/be37bac1a) - [Batch] clean up doc of Sobol batch method
* [76886804d](https://github.com/gama-platform/gama/commit/76886804d) - Merge remote-tracking branch 'origin/GAMA_1.8.2' into GAMA_1.8.2_batch
* [56b84be1f](https://github.com/gama-platform/gama/commit/56b84be1f) - Add tTest to regression model
* [efa94f149](https://github.com/gama-platform/gama/commit/efa94f149) - [GAML Syntax] add random network and found a bug with graph generator
* [47b437f68](https://github.com/gama-platform/gama/commit/47b437f68) - [Stats] add tTest statistics to have p-value from 2 vectors
* [6e484fd08](https://github.com/gama-platform/gama/commit/6e484fd08) - [Stats] add RSquare statistics and residuals attribute to GamaRegression type
* [9b4f2d01d](https://github.com/gama-platform/gama/commit/9b4f2d01d) - Attempt to fix issue [#3111](https://github.com/gama-platform/gama/issues/3111)  by  introducing a new Converter for BDIPlan
* [945ea5155](https://github.com/gama-platform/gama/commit/945ea5155) - [R] commit Results folder
* [6d60da691](https://github.com/gama-platform/gama/commit/6d60da691) - [traffic] Avoid duplicating info in road nodes
* [94c015934](https://github.com/gama-platform/gama/commit/94c015934) - Fixes the save of the result in SoBol
* [c5adef1c5](https://github.com/gama-platform/gama/commit/c5adef1c5) - [Fix] strange case of empty outputs
* [d3e486e05](https://github.com/gama-platform/gama/commit/d3e486e05) - [REPORT] add a report for Sobol First and Total indices, but bugged
* [479b66880](https://github.com/gama-platform/gama/commit/479b66880) - [traffic] Fix incorrect return value for `as_driving_graph`
* [bed5a0e61](https://github.com/gama-platform/gama/commit/bed5a0e61) - [FIX] fix repeat effect in Saltelli sampling to fit MoaeFramework expected output table
* [13e414d0d](https://github.com/gama-platform/gama/commit/13e414d0d) - Merge remote-tracking branch 'origin/GAMA_1.8.2' into GAMA_1.8.2_batch
* [4a45a26a7](https://github.com/gama-platform/gama/commit/4a45a26a7) - [BATCH] separate exploration and calibration in batch experiment
* [4ddc5b1ca](https://github.com/gama-platform/gama/commit/4ddc5b1ca) - Slightly adjust a warning message
* [475d5e6d5](https://github.com/gama-platform/gama/commit/475d5e6d5) - [traffic] Improve an error msg
* [670addd83](https://github.com/gama-platform/gama/commit/670addd83) - allows to load color from OSM data
* [a67b137d6](https://github.com/gama-platform/gama/commit/a67b137d6) - Update ImageUtils.java
* [be13e83ed](https://github.com/gama-platform/gama/commit/be13e83ed) - [traffic] Throw an error when using parallelism with driving skill
* [d7e072278](https://github.com/gama-platform/gama/commit/d7e072278) - [traffic] Fix unwanted deadlocks at intersections
* [6936f735c](https://github.com/gama-platform/gama/commit/6936f735c) - [Sobol] Try to output a report
* [bf3533f43](https://github.com/gama-platform/gama/commit/bf3533f43) - [Merge] pull back changes from main 1.8.2 branch
* [5b5f851eb](https://github.com/gama-platform/gama/commit/5b5f851eb) - Fixes an issue in the annotation processor
* [f5c8a5b23](https://github.com/gama-platform/gama/commit/f5c8a5b23) - [GitFix] roll back to a non pushed commit
* [9f819c291](https://github.com/gama-platform/gama/commit/9f819c291) - workaroung
* [c7fa7521a](https://github.com/gama-platform/gama/commit/c7fa7521a) - [Refactor] refactor packages of kernel batch feature
* [6493b143d](https://github.com/gama-platform/gama/commit/6493b143d) - [batch] toward a clean batch branch
* [640de1b83](https://github.com/gama-platform/gama/commit/640de1b83) - [batch] fighting with git to have a proper batch branch
* [945ef1226](https://github.com/gama-platform/gama/commit/945ef1226) - Make the description of preferences on parallelism more explicit
* [01e98569d](https://github.com/gama-platform/gama/commit/01e98569d) - Add public transport skill to the traffic plugin
* [45d84bc11](https://github.com/gama-platform/gama/commit/45d84bc11) - Fixes java2D displays not shown on macOS in mixed envrts (w. opengl).
* [fde23e373](https://github.com/gama-platform/gama/commit/fde23e373) - Resolves one locking problem with NEWT displays
* [ff11705a7](https://github.com/gama-platform/gama/commit/ff11705a7) - Fixes a problem where reading large shapefiles would fill the memory
* [02fde134f](https://github.com/gama-platform/gama/commit/02fde134f) - More work on the interthreading issues on Windows 11/macOSX
* [b015274e4](https://github.com/gama-platform/gama/commit/b015274e4) - Continue working on interlocking threads on JDK17...
* [a192a0ae7](https://github.com/gama-platform/gama/commit/a192a0ae7) - Removes one possible thread interlocking w. multiple Java2D displays
* [203206961](https://github.com/gama-platform/gama/commit/203206961) - Better handles the refreshing of the navigator
* [9f355658b](https://github.com/gama-platform/gama/commit/9f355658b) - Maintenance commit + fixes serious issue in workspace cloning
* [f65e6ec8b](https://github.com/gama-platform/gama/commit/f65e6ec8b) - Corrects threading issues with OpenGL displays (esp. new NEWT ones)
* [4c4645ee9](https://github.com/gama-platform/gama/commit/4c4645ee9) - Adresses [#3245](https://github.com/gama-platform/gama/issues/3245).More a patch than a fix, however...
* [6468602e7](https://github.com/gama-platform/gama/commit/6468602e7) - Fixes [#3241](https://github.com/gama-platform/gama/issues/3241) by setting a minimum size for parameters controls
* [8ba72ba19](https://github.com/gama-platform/gama/commit/8ba72ba19) - Fixes [#3243](https://github.com/gama-platform/gama/issues/3243). Please test for possible impact on parameters
* [ebcdae8fe](https://github.com/gama-platform/gama/commit/ebcdae8fe) - Correctly sets color and font of input dialogs. ci release
* [f73074a0a](https://github.com/gama-platform/gama/commit/f73074a0a) - Fixes a silent bug that could prevent user input dialogs to open
* [ccf0b260e](https://github.com/gama-platform/gama/commit/ccf0b260e) - Fixes [#3149](https://github.com/gama-platform/gama/issues/3149) with Java2D displays.
* [0df4f85b2](https://github.com/gama-platform/gama/commit/0df4f85b2) - try to fix [#3224](https://github.com/gama-platform/gama/issues/3224)
* [dca6ee79d](https://github.com/gama-platform/gama/commit/dca6ee79d) - [batch] refactor a little bit the batch experiment package, begin to add exploration methods
* [640de1b83](https://github.com/gama-platform/gama/commit/640de1b83) - [batch] fighting with git to have a proper batch branch
* [6493b143d](https://github.com/gama-platform/gama/commit/6493b143d) - [batch] toward a clean batch branch
* [c7fa7521a](https://github.com/gama-platform/gama/commit/c7fa7521a) - [Refactor] refactor packages of kernel batch feature
* [9f819c291](https://github.com/gama-platform/gama/commit/9f819c291) - workaroung
* [f5c8a5b23](https://github.com/gama-platform/gama/commit/f5c8a5b23) - [GitFix] roll back to a non pushed commit
* [bf3533f43](https://github.com/gama-platform/gama/commit/bf3533f43) - [Merge] pull back changes from main 1.8.2 branch
* [6936f735c](https://github.com/gama-platform/gama/commit/6936f735c) - [Sobol] Try to output a report
* [475d5e6d5](https://github.com/gama-platform/gama/commit/475d5e6d5) - [traffic] Improve an error msg
* [4ddc5b1ca](https://github.com/gama-platform/gama/commit/4ddc5b1ca) - Slightly adjust a warning message
* [4a45a26a7](https://github.com/gama-platform/gama/commit/4a45a26a7) - [BATCH] separate exploration and calibration in batch experiment
* [13e414d0d](https://github.com/gama-platform/gama/commit/13e414d0d) - Merge remote-tracking branch 'origin/GAMA_1.8.2' into GAMA_1.8.2_batch
* [bed5a0e61](https://github.com/gama-platform/gama/commit/bed5a0e61) - [FIX] fix repeat effect in Saltelli sampling to fit MoaeFramework expected output table
* [479b66880](https://github.com/gama-platform/gama/commit/479b66880) - [traffic] Fix incorrect return value for `as_driving_graph`
* [d3e486e05](https://github.com/gama-platform/gama/commit/d3e486e05) - [REPORT] add a report for Sobol First and Total indices, but bugged
* [c5adef1c5](https://github.com/gama-platform/gama/commit/c5adef1c5) - [Fix] strange case of empty outputs
* [94c015934](https://github.com/gama-platform/gama/commit/94c015934) - Fixes the save of the result in SoBol
* [6d60da691](https://github.com/gama-platform/gama/commit/6d60da691) - [traffic] Avoid duplicating info in road nodes
* [945ea5155](https://github.com/gama-platform/gama/commit/945ea5155) - [R] commit Results folder
* [9b4f2d01d](https://github.com/gama-platform/gama/commit/9b4f2d01d) - Attempt to fix issue [#3111](https://github.com/gama-platform/gama/issues/3111)  by  introducing a new Converter for BDIPlan
* [6e484fd08](https://github.com/gama-platform/gama/commit/6e484fd08) - [Stats] add RSquare statistics and residuals attribute to GamaRegression type
* [47b437f68](https://github.com/gama-platform/gama/commit/47b437f68) - [Stats] add tTest statistics to have p-value from 2 vectors
* [efa94f149](https://github.com/gama-platform/gama/commit/efa94f149) - [GAML Syntax] add random network and found a bug with graph generator
* [56b84be1f](https://github.com/gama-platform/gama/commit/56b84be1f) - Add tTest to regression model
* [76886804d](https://github.com/gama-platform/gama/commit/76886804d) - Merge remote-tracking branch 'origin/GAMA_1.8.2' into GAMA_1.8.2_batch
* [be37bac1a](https://github.com/gama-platform/gama/commit/be37bac1a) - [Batch] clean up doc of Sobol batch method
* [1bef2f76f](https://github.com/gama-platform/gama/commit/1bef2f76f) - Fixes Issue [#3250](https://github.com/gama-platform/gama/issues/3250) by adding a GraphicsScope
* [b1b66f30d](https://github.com/gama-platform/gama/commit/b1b66f30d) - Fixes Issue [#3254](https://github.com/gama-platform/gama/issues/3254) by looking at subspecies members when a list whose contents type is a species is passed as a filter.
* [d515ee511](https://github.com/gama-platform/gama/commit/d515ee511) - Should fix [#3258](https://github.com/gama-platform/gama/issues/3258) by forcing the navigator to refresh its contents.
* [485f0260d](https://github.com/gama-platform/gama/commit/485f0260d) - Fixes Issue [#3264](https://github.com/gama-platform/gama/issues/3264).
* [cffbdaf94](https://github.com/gama-platform/gama/commit/cffbdaf94) - Fixes [#3260](https://github.com/gama-platform/gama/issues/3260) by getting rid of the 2 stat operators calling RCaller
* [b70a74842](https://github.com/gama-platform/gama/commit/b70a74842) - For #3260 and [#3265](https://github.com/gama-platform/gama/issues/3265). Gathers and reorders all statistical operators.
* [22d0d8827](https://github.com/gama-platform/gama/commit/22d0d8827) - Corrects a model with the new name for tTest: t_test
* [ddd2907e8](https://github.com/gama-platform/gama/commit/ddd2907e8) - Fixes [#3261](https://github.com/gama-platform/gama/issues/3261).
* [d19141870](https://github.com/gama-platform/gama/commit/d19141870) - Avoids NPE in two OpenGL components
* [b15828886](https://github.com/gama-platform/gama/commit/b15828886) - Fixes a problem of thread race in macOS
* [eac5eb404](https://github.com/gama-platform/gama/commit/eac5eb404) - Fixes [#3221](https://github.com/gama-platform/gama/issues/3221).
* [f3e3566fb](https://github.com/gama-platform/gama/commit/f3e3566fb) - Fixes [#3265](https://github.com/gama-platform/gama/issues/3265).
* [5b221236a](https://github.com/gama-platform/gama/commit/5b221236a) - Fixes [#3262](https://github.com/gama-platform/gama/issues/3262).
* [ce409d7be](https://github.com/gama-platform/gama/commit/ce409d7be) - Possible fix for [#3263](https://github.com/gama-platform/gama/issues/3263). Please test !
* [4f5bd45c6](https://github.com/gama-platform/gama/commit/4f5bd45c6) - Removal of 'as_distance_graph(container, map)'
* [eb11efda8](https://github.com/gama-platform/gama/commit/eb11efda8) - Fixes [#2945](https://github.com/gama-platform/gama/issues/2945). Graphs created from nodes do not duplicate edges anymore
* [903656a3b](https://github.com/gama-platform/gama/commit/903656a3b) - A follow-up to ce409d7bee43c3dc04c9051b61caaf36cce0dec0
* [af3a50791](https://github.com/gama-platform/gama/commit/af3a50791) - Reverts eb11efda852d2621377590f72bad16878ee6c19c / [#2945](https://github.com/gama-platform/gama/issues/2945)
* [dd9e55426](https://github.com/gama-platform/gama/commit/dd9e55426) - Handles incompatibility between actions in imported models
* [6848b16a8](https://github.com/gama-platform/gama/commit/6848b16a8) - Possible fix for [#3268](https://github.com/gama-platform/gama/issues/3268).
* [22dbbd4aa](https://github.com/gama-platform/gama/commit/22dbbd4aa) - fixes [#3272](https://github.com/gama-platform/gama/issues/3272) - copy of graph now copy also the weights
* [15839b2df](https://github.com/gama-platform/gama/commit/15839b2df) - fixes [#3273](https://github.com/gama-platform/gama/issues/3273)
* [605551cad](https://github.com/gama-platform/gama/commit/605551cad) - fixes [#2945](https://github.com/gama-platform/gama/issues/2945)
* [fef1536a1](https://github.com/gama-platform/gama/commit/fef1536a1) - [merge] merge with conflicting commit ce409d7b
* [2bb9b4431](https://github.com/gama-platform/gama/commit/2bb9b4431) - [JDK17] Init commit to new building architecture Bump from Tycho 2.4.0 to 2.6.0-SNAPSHOT (waiting for official release) Bump SWT to 2021-03 to 2021-12 Bump JDK from 15 to 17
* [8c584b44f](https://github.com/gama-platform/gama/commit/8c584b44f) - [JDK17] Change embedded version Downgrade to LTS version (17.0.1+12)
* [bb7de69df](https://github.com/gama-platform/gama/commit/bb7de69df) - [JOGL] Update local jar with jzy3d/jogl-maven-deployer 2.4 RC 4
* [71363c6c7](https://github.com/gama-platform/gama/commit/71363c6c7) - [ENHANCEMENT] Bump msi.gama.processor version Bump from 1.4.0 to 1.8.2 for more homogeneous project
* [8c6006bba](https://github.com/gama-platform/gama/commit/8c6006bba) - [JDK17] Set Tycho to properly use JDK 17
* [faa736dae](https://github.com/gama-platform/gama/commit/faa736dae) - [ZIP] Re-add sudo in JDK zipping script
* [b6b0df7a8](https://github.com/gama-platform/gama/commit/b6b0df7a8) - [JOGL] Add jzy3d maven repository
* [a74426df4](https://github.com/gama-platform/gama/commit/a74426df4) - add new file operators (zip/unzip/delete)
* [377fb00eb](https://github.com/gama-platform/gama/commit/377fb00eb) - Fixes [#3280](https://github.com/gama-platform/gama/issues/3280)
* [c9262c160](https://github.com/gama-platform/gama/commit/c9262c160) - [TYCHO] Move to official release
* [a962a942b](https://github.com/gama-platform/gama/commit/a962a942b) - Commit dedicated to accelerate the startup sequence of GAMA (by ~2x)
* [d3f3b5b46](https://github.com/gama-platform/gama/commit/d3f3b5b46) - Fixes a bug introduced in the latest commit.
* [e30c0ff79](https://github.com/gama-platform/gama/commit/e30c0ff79) - Addresses Issue [#3288](https://github.com/gama-platform/gama/issues/3288) by providing :
* [55737e89d](https://github.com/gama-platform/gama/commit/55737e89d) - Fixes issues [#3284](https://github.com/gama-platform/gama/issues/3284) by correctly tracking column numbers in csv files
* [03b6c46b8](https://github.com/gama-platform/gama/commit/03b6c46b8) - [ZIP] Regex latest JDK 17
* [dc39b47ed](https://github.com/gama-platform/gama/commit/dc39b47ed) - Merge pull request [#3283](https://github.com/gama-platform/gama/issues/3283) from gama-platform/GAMA_1.8.2_jdk17
* [b55cb47f4](https://github.com/gama-platform/gama/commit/b55cb47f4) - [GHA] Update to JDK 17
* [081b16055](https://github.com/gama-platform/gama/commit/081b16055) - [ZIP] Update jdk link regex Only for MacOS and Windows
* [47cf56e96](https://github.com/gama-platform/gama/commit/47cf56e96) - Fixes [#3266](https://github.com/gama-platform/gama/issues/3266), with a few API changes (see below):
* [31ddfab89](https://github.com/gama-platform/gama/commit/31ddfab89) - replace Hashset by LinkedHashSet
* [d36560e4e](https://github.com/gama-platform/gama/commit/d36560e4e) - Fixes [#3294](https://github.com/gama-platform/gama/issues/3294) and provides new preferences regarding the save actions
* [f4eece21d](https://github.com/gama-platform/gama/commit/f4eece21d) - Cleansing commit
* [2df167baf](https://github.com/gama-platform/gama/commit/2df167baf) - Adding headers and auto-javadoc to msi.gama.documentation
* [aa944e592](https://github.com/gama-platform/gama/commit/aa944e592) - Adding headers and auto-javadoc to msi.gama.core
* [f655e2b85](https://github.com/gama-platform/gama/commit/f655e2b85) - Adding headers and auto-javadoc to msi.gama.lang.gaml and headless
* [ef5662621](https://github.com/gama-platform/gama/commit/ef5662621) - Adding headers and auto-javadoc to all GAMA UI plugins
* [dd7f6f6f6](https://github.com/gama-platform/gama/commit/dd7f6f6f6) - Adding headers and auto-javadoc to core extensions
* [653e8971b](https://github.com/gama-platform/gama/commit/653e8971b) - Adding headers and auto-javadoc to msi.gama.processor
* [a09e6c1a4](https://github.com/gama-platform/gama/commit/a09e6c1a4) - Adding headers and auto-javadoc to msi.gama.annotations
* [7e83ce28c](https://github.com/gama-platform/gama/commit/7e83ce28c) - A refactoring of ExperimentScheduler with the following features:
* [b2c58a381](https://github.com/gama-platform/gama/commit/b2c58a381) - change rnd_choice to make it work like in GAMA 1.8.1
* [2c141f869](https://github.com/gama-platform/gama/commit/2c141f869) - fixes some issues with batch exploration (avoid repetition of tested solutions)
* [ae4b88343](https://github.com/gama-platform/gama/commit/ae4b88343) - [Batch] remove keep simulation from Sobol, first step to deal with [#3263](https://github.com/gama-platform/gama/issues/3263)
* [f7c6f1e33](https://github.com/gama-platform/gama/commit/f7c6f1e33) - Simplification of the scheduler/controller operations for experiments
* [0f1f8b8f1](https://github.com/gama-platform/gama/commit/0f1f8b8f1) - A solution to [#2955](https://github.com/gama-platform/gama/issues/2955). Plus some additions to parameters:
* [648b3fb04](https://github.com/gama-platform/gama/commit/648b3fb04) - Fixes [#3299](https://github.com/gama-platform/gama/issues/3299)
* [0c6c8a190](https://github.com/gama-platform/gama/commit/0c6c8a190) - add menu item for [#2955](https://github.com/gama-platform/gama/issues/2955)
* [6d3331b42](https://github.com/gama-platform/gama/commit/6d3331b42) - complement for item of [#2955](https://github.com/gama-platform/gama/issues/2955)
* [c0f101653](https://github.com/gama-platform/gama/commit/c0f101653) - Cherrypick 673a0deab1b798e881edb5e0b0853f9d880fa665 ' fix for [#3230](https://github.com/gama-platform/gama/issues/3230) ' Picked to resolve breaking auto-merging following commit
* [7eeaa85ae](https://github.com/gama-platform/gama/commit/7eeaa85ae) - fix warnings in library models
* [b523b9a09](https://github.com/gama-platform/gama/commit/b523b9a09) - [COMPILE] Finish bump versions Comments / GAMA version / default project JDK
* [8550de9ca](https://github.com/gama-platform/gama/commit/8550de9ca) - [COMPILE] Finish bump GAMA version Forgot some extra pom.xml
* [61e89ee82](https://github.com/gama-platform/gama/commit/61e89ee82) - [HEADLESS] Error on batch XML GAMA will display an error message when generating an XML for a batch experiment and inform about the '-batch' flag for this purpose Fix [#2972](https://github.com/gama-platform/gama/issues/2972)
* [fe7d91523](https://github.com/gama-platform/gama/commit/fe7d91523) - [BATCH] add raw result outputs for Sobol, need to extend to all batch, plus remove Set from exploration algo
* [898ae1f7f](https://github.com/gama-platform/gama/commit/898ae1f7f) - adding support for GamaColor serialization (see [#3288](https://github.com/gama-platform/gama/issues/3288) )
* [66d774d65](https://github.com/gama-platform/gama/commit/66d774d65) - [BATCH] rebuild Saatteli sampling correctly and add proper path for automatic output batch file
* [d23ad76c9](https://github.com/gama-platform/gama/commit/d23ad76c9) - Fixes a problem where built-in variables were not correctly documented
* [0e57d04c3](https://github.com/gama-platform/gama/commit/0e57d04c3) - Adds a more meaningful documentation to 'seed' (cf. [#3300](https://github.com/gama-platform/gama/issues/3300))
* [d661d6990](https://github.com/gama-platform/gama/commit/d661d6990) - Fixes [#3279](https://github.com/gama-platform/gama/issues/3279) Issue when upVector was aligned with the lookAt vector
* [d3f14efaf](https://github.com/gama-platform/gama/commit/d3f14efaf) - Fixes [#3285](https://github.com/gama-platform/gama/issues/3285) by ensuring rotateModel() is called inside the drawing loop
* [3c16740ba](https://github.com/gama-platform/gama/commit/3c16740ba) - Avoids creating useless StringBuilder for actions with no args
* [847443e99](https://github.com/gama-platform/gama/commit/847443e99) - Computes for once the documentation of primitives and their args
* [40010c8d6](https://github.com/gama-platform/gama/commit/40010c8d6) - Moves a global list from GamlSyntacticConverter to ISymbolKind
* [e688d85fb](https://github.com/gama-platform/gama/commit/e688d85fb) - Avoids a NPE when consulting the documentation of actions / primitives
* [50d968d2f](https://github.com/gama-platform/gama/commit/50d968d2f) - Avoids a NPE when consulting the documentation of global attributes
* [4c489c558](https://github.com/gama-platform/gama/commit/4c489c558) - Fixes [#3302](https://github.com/gama-platform/gama/issues/3302) by adding information to multiple imports
* [5b2e4e6cd](https://github.com/gama-platform/gama/commit/5b2e4e6cd) - Fixes [#3121](https://github.com/gama-platform/gama/issues/3121) by adding an autosave: facet for the output section
* [f13000309](https://github.com/gama-platform/gama/commit/f13000309) - Improves the documentation and robustness of autosave in display/output
* [9f59fce33](https://github.com/gama-platform/gama/commit/9f59fce33) - Substantial change to deal with #2744, #3279, [#3221](https://github.com/gama-platform/gama/issues/3221)
* [8147c34fb](https://github.com/gama-platform/gama/commit/8147c34fb) - Fixes [#2279](https://github.com/gama-platform/gama/issues/2279) by attaching size/position to the trace elements.
* [77ed1993c](https://github.com/gama-platform/gama/commit/77ed1993c) - Fixes [#3303](https://github.com/gama-platform/gama/issues/3303) -- empty strings were not considered in a rare case
* [aaae3e669](https://github.com/gama-platform/gama/commit/aaae3e669) - uupdate  of  the product to deal with some specific tiff files.
* [dedbc28ed](https://github.com/gama-platform/gama/commit/dedbc28ed) - Update gama.product
* [4475a0d9c](https://github.com/gama-platform/gama/commit/4475a0d9c) - make network export org.eclipse.paho.client.mqttv3-1.0.2-3.jar
* [d8f307286](https://github.com/gama-platform/gama/commit/d8f307286) - move PlayMusicSkill from network to gaml.extensions.sound
* [ba2d13743](https://github.com/gama-platform/gama/commit/ba2d13743) - Minor change to grammar to accomodate for the use of camera in display
* [1ea39d14a](https://github.com/gama-platform/gama/commit/1ea39d14a) - Adds a new icon for the camera controls
* [69263d2ef](https://github.com/gama-platform/gama/commit/69263d2ef) - Allows to specify a horizontal offset for pop-up menus
* [5ec9cec47](https://github.com/gama-platform/gama/commit/5ec9cec47) - Accepts arbitrary collections for the "among" facet in "parameter"
* [bfab2b59f](https://github.com/gama-platform/gama/commit/bfab2b59f) - Adds the reference to the new icon ('display.camera2')
* [dfbb06b3d](https://github.com/gama-platform/gama/commit/dfbb06b3d) - Makes sure the search for display views happens in the right thread
* [29fd57e4b](https://github.com/gama-platform/gama/commit/29fd57e4b) - Allows to create a separator without a "width"
* [6134efc98](https://github.com/gama-platform/gama/commit/6134efc98) - Handles 'autorun' so that experiments run once the displays are ready
* [9335339b2](https://github.com/gama-platform/gama/commit/9335339b2) - Adds 'rounded' method
* [f5b9e4277](https://github.com/gama-platform/gama/commit/f5b9e4277) - Adds a default getMaxDimension() method to IShape
* [4d8eac87c](https://github.com/gama-platform/gama/commit/4d8eac87c) - Fixes for #2757, #2742, #1159, #579, #2746 and [#2640](https://github.com/gama-platform/gama/issues/2640)
* [ac8cc8039](https://github.com/gama-platform/gama/commit/ac8cc8039) - Adapts library models to the new camera declaration syntax
* [b08cc3e46](https://github.com/gama-platform/gama/commit/b08cc3e46) - Fixes a problem of camera settings in Grid DEM.gaml model
* [46500e8ae](https://github.com/gama-platform/gama/commit/46500e8ae) - Implements an explicit release of buffers in dispose() (see [#3307](https://github.com/gama-platform/gama/issues/3307))
* [c023c8c57](https://github.com/gama-platform/gama/commit/c023c8c57) - Fix for [#995](https://github.com/gama-platform/gama/issues/995). Addition of the #isometric camera
* [07abedd23](https://github.com/gama-platform/gama/commit/07abedd23) - Reduces the number of resources used to draw arrows
* [6949c48f9](https://github.com/gama-platform/gama/commit/6949c48f9) - Enforcing the "positive y" policy regarding cameras in GAML/GAMA (#2694)
* [374578a79](https://github.com/gama-platform/gama/commit/374578a79) - Reenables rotation of displays (for [#2761](https://github.com/gama-platform/gama/issues/2761)). Simplifies cameras
* [a6d88bdfe](https://github.com/gama-platform/gama/commit/a6d88bdfe) - Fixes [#2761](https://github.com/gama-platform/gama/issues/2761). Addition of the `rotation` statement.
* [e665ff7b5](https://github.com/gama-platform/gama/commit/e665ff7b5) - Refactors 'light' in 'display' to be on par with 'camera' and 'rotation'
* [d661da131](https://github.com/gama-platform/gama/commit/d661da131) - A bit of cleansing of constants and keywords
* [7a093a406](https://github.com/gama-platform/gama/commit/7a093a406) - Fixes [#3306](https://github.com/gama-platform/gama/issues/3306).
* [ba5159ab7](https://github.com/gama-platform/gama/commit/ba5159ab7) - Make deprecated 'ambient_light' facet work again in the new light system
* [9510a1c89](https://github.com/gama-platform/gama/commit/9510a1c89) - Fixes a bug where the deprecation of a facet could lead to a NPE
* [b9f113740](https://github.com/gama-platform/gama/commit/b9f113740) - Fixes a bug where inspecting in OpenGL would lead to an NPE
* [b3d199c25](https://github.com/gama-platform/gama/commit/b3d199c25) - Corrects a bug where casting a field to a matrix would return the field
* [82f67f8d7](https://github.com/gama-platform/gama/commit/82f67f8d7) - headless run as daemon, communicate through websocket
* [d600af94a](https://github.com/gama-platform/gama/commit/d600af94a) - simple web gui to communicate with gama headless daemon
* [71896e22b](https://github.com/gama-platform/gama/commit/71896e22b) - Fixes [#2176](https://github.com/gama-platform/gama/issues/2176) by adding a 'rotate:' facet to layers
* [e15a6489a](https://github.com/gama-platform/gama/commit/e15a6489a) - change classpath of the headless to fix compilation  error  introdducedd by  Websocket
* [6c4667801](https://github.com/gama-platform/gama/commit/6c4667801) - change  the classpath, so that headless uses the default Java version of the workspace
* [f27edf781](https://github.com/gama-platform/gama/commit/f27edf781) - new js ui
* [06441d5e5](https://github.com/gama-platform/gama/commit/06441d5e5) - Addresses (and fixes) [#2984](https://github.com/gama-platform/gama/issues/2984) by providing an executor based runtime
* [a667e6042](https://github.com/gama-platform/gama/commit/a667e6042) - #2984 Avoids recreating executors in case of a "listening server" mode
* [a6c30971e](https://github.com/gama-platform/gama/commit/a6c30971e) - Adds the arguments of GAMA in the product with their default value
* [897cdefa3](https://github.com/gama-platform/gama/commit/897cdefa3) - Improves the formatting of the source files
* [492cf3b3d](https://github.com/gama-platform/gama/commit/492cf3b3d) - Adding more options to guard against JVM crazyness :)
* [9a7c8ea73](https://github.com/gama-platform/gama/commit/9a7c8ea73) - #3312 test inf
* [e3ab832bd](https://github.com/gama-platform/gama/commit/e3ab832bd) - Adds an "Attributes" category to shapefiles in the navigator (see [#3305](https://github.com/gama-platform/gama/issues/3305))
* [733101632](https://github.com/gama-platform/gama/commit/733101632) - A tentative fix for [#3199](https://github.com/gama-platform/gama/issues/3199). Needs to be verified and heavily tested !
* [8d8ab30fb](https://github.com/gama-platform/gama/commit/8d8ab30fb) - A fix to the previous workaround to enable JOGL to run on Ubuntu [#3199](https://github.com/gama-platform/gama/issues/3199)
* [974822ce8](https://github.com/gama-platform/gama/commit/974822ce8) - Eliminates an error introduced in the previous commit
* [b760e0a4a](https://github.com/gama-platform/gama/commit/b760e0a4a) - Eliminates a useless condition (taken in charge already)
* [2f46735d1](https://github.com/gama-platform/gama/commit/2f46735d1) - Update README.md
* [fa7f3dc2d](https://github.com/gama-platform/gama/commit/fa7f3dc2d) - Update README.md
* [c16f29d10](https://github.com/gama-platform/gama/commit/c16f29d10) - Adds the option to print the stack trace of the current Thread
* [4b08a62c8](https://github.com/gama-platform/gama/commit/4b08a62c8) - Adds JOGL sources
* [bb20f7580](https://github.com/gama-platform/gama/commit/bb20f7580) - Removes two arguments ("use_old_sync_strategy" and "use_old_animator")
* [c267590d6](https://github.com/gama-platform/gama/commit/c267590d6) - Fixes [#3318](https://github.com/gama-platform/gama/issues/3318). Needs to be tested more seriously on Linux and Windows
* [2dd2405bb](https://github.com/gama-platform/gama/commit/2dd2405bb) - js dynamic add widget of output
* [0f781fbc6](https://github.com/gama-platform/gama/commit/0f781fbc6) - GAMA listener, try to add dynamic output
* [e9e8ca0c8](https://github.com/gama-platform/gama/commit/e9e8ca0c8) - Tests solution to [#3318](https://github.com/gama-platform/gama/issues/3318) on Linux and fixes one specific issue
* [edd183eb3](https://github.com/gama-platform/gama/commit/edd183eb3) - Fix a Windows bug (incorrect "hidden" event sent to displays w/o tabs)
* [f00d44695](https://github.com/gama-platform/gama/commit/f00d44695) - Fixes [#3321](https://github.com/gama-platform/gama/issues/3321) and reduces the pressure on memory when building textures
* [906890ffd](https://github.com/gama-platform/gama/commit/906890ffd) - Removes the fonts still residing in the opengl plugin (not used anymore)
* [3bf0bb666](https://github.com/gama-platform/gama/commit/3bf0bb666) - [PRODUCT] Fix new guard options Related to conversation on commit 492cf3b3d33bb0e398c75e1dfce2d4d5a6000e65
* [d807958e4](https://github.com/gama-platform/gama/commit/d807958e4) - [BOT] Init Slate bot Automatically close stale Issues and Pull Requests that tend to accumulate during a project. - https://github.com/marketplace/stale
* [23b52b349](https://github.com/gama-platform/gama/commit/23b52b349) - [SLATE] Extreme dry-run before real bot launch
* [2db246108](https://github.com/gama-platform/gama/commit/2db246108) - [SLATE] Fix Dry-run option Wrong copy-paste
* [b33340288](https://github.com/gama-platform/gama/commit/b33340288) - add a warning for Gamagrid file in case of problem with the CRS (#3304)
* [ebac92d32](https://github.com/gama-platform/gama/commit/ebac92d32) - change the name of a model (download spatial data)
* [94c2d2f14](https://github.com/gama-platform/gama/commit/94c2d2f14) - [SLATE] Disable bot
* [ba8fe52a8](https://github.com/gama-platform/gama/commit/ba8fe52a8) - Fixes [#3271](https://github.com/gama-platform/gama/issues/3271) by documenting the necessity to read 'end_conversation'
* [075c830c3](https://github.com/gama-platform/gama/commit/075c830c3) - Modification of some default values for attributes in these models
* [58135680c](https://github.com/gama-platform/gama/commit/58135680c) - Put smaller and better structured sources for JOGL
* [d16d81026](https://github.com/gama-platform/gama/commit/d16d81026) - Improves (by a factor of 10x !) the "smoothing" of mesh displays
* [5dcc57596](https://github.com/gama-platform/gama/commit/5dcc57596) - Update ProjectSetForGama.psf
* [892a4c47d](https://github.com/gama-platform/gama/commit/892a4c47d) - Genstar: replace genstar jar files by the code of Genstar
* [80fd6050b](https://github.com/gama-platform/gama/commit/80fd6050b) - Add 'cells_overlapping' to provide better results than the cells_in when geometry are polylines.
* [b0ddba32c](https://github.com/gama-platform/gama/commit/b0ddba32c) - Fixes [#3327](https://github.com/gama-platform/gama/issues/3327) by drawing visual affordances on foldable sections
* [6e3e9b798](https://github.com/gama-platform/gama/commit/6e3e9b798) - First step to fix Genstar errors (#3267)
* [750b85c86](https://github.com/gama-platform/gama/commit/750b85c86) - Use of black magic to fix [#3267](https://github.com/gama-platform/gama/issues/3267) (genstar)
* [a4124f0e1](https://github.com/gama-platform/gama/commit/a4124f0e1) - Fixes [#3328](https://github.com/gama-platform/gama/issues/3328). Big with smooth: true and refresh: false in mesh layers.
* [d1efcb416](https://github.com/gama-platform/gama/commit/d1efcb416) - Fixes [#3326](https://github.com/gama-platform/gama/issues/3326) & warnings for camera, light and rotation in Java2D display
* [a2bb31564](https://github.com/gama-platform/gama/commit/a2bb31564) - Adds a preference for setting the default intensity of lights in OpenGL
* [2df6e07a9](https://github.com/gama-platform/gama/commit/2df6e07a9) - Minor additions and changes in some Library models
* [a188a2525](https://github.com/gama-platform/gama/commit/a188a2525) - Sort of "fixes" [#3323](https://github.com/gama-platform/gama/issues/3323) by declaring ranges of names in menus
* [f4c21f291](https://github.com/gama-platform/gama/commit/f4c21f291) - Adds a simplified GLAnimator to better address [#3324](https://github.com/gama-platform/gama/issues/3324).
* [b89eacabd](https://github.com/gama-platform/gama/commit/b89eacabd) - gama listening mode, basically usable, need review to reorganise classes and more features
* [4571e7b1f](https://github.com/gama-platform/gama/commit/4571e7b1f) - Fixes [#3307](https://github.com/gama-platform/gama/issues/3307). Adds a timer and distinguishes between heap/non-heap memory
* [f3792e89f](https://github.com/gama-platform/gama/commit/f3792e89f) - Adds a different animator depending on the architecture and os
* [a10547458](https://github.com/gama-platform/gama/commit/a10547458) - Adds a plugin required by Guava on Eclipse 2022-03
* [bc6b72842](https://github.com/gama-platform/gama/commit/bc6b72842) - Bump SWT version from 2021-12 to 2022-03 ci release
* [939456cce](https://github.com/gama-platform/gama/commit/939456cce) - gama lisening mode, add exit command
* [cce01b70b](https://github.com/gama-platform/gama/commit/cce01b70b) - better JS display management
* [2bcdbce1e](https://github.com/gama-platform/gama/commit/2bcdbce1e) - WebUI, stepping, closing experiment
* [03f4a0355](https://github.com/gama-platform/gama/commit/03f4a0355) - Fixes [#3324](https://github.com/gama-platform/gama/issues/3324) by providing native M1 libraries to JOGL and JBullet
* [0948990aa](https://github.com/gama-platform/gama/commit/0948990aa) - headless listener, commit the example of geojson serializing
* [b1ff8a156](https://github.com/gama-platform/gama/commit/b1ff8a156) - headless listener, commit output endpoint to get geojson of species
* [f9f75d7cd](https://github.com/gama-platform/gama/commit/f9f75d7cd) - upload zip and compile from the temp unzip onserver
* [ecd888e23](https://github.com/gama-platform/gama/commit/ecd888e23) - Fixes #3313 and [#3239](https://github.com/gama-platform/gama/issues/3239). Needs to be tested carefully on fast PCs
* [5f0e824a3](https://github.com/gama-platform/gama/commit/5f0e824a3) - Fixes [#3325](https://github.com/gama-platform/gama/issues/3325). Requires further testing on fast PCs / macOS / Linux
* [d367474fb](https://github.com/gama-platform/gama/commit/d367474fb) - Adds missing SW component (#3324)
* [94d0cdeb8](https://github.com/gama-platform/gama/commit/94d0cdeb8) - Avoids a stall when having a fullscreen display on macOS
* [cb6fe2777](https://github.com/gama-platform/gama/commit/cb6fe2777) - Adds option (-Dsun.java2d.uiScale.enabled=false)for fractional scales
* [0c4f0659d](https://github.com/gama-platform/gama/commit/0c4f0659d) - Forces the activation of views on macOS.
* [1929e680d](https://github.com/gama-platform/gama/commit/1929e680d) - Generalizes the "bringToTop(...)" call in the activation of displays
* [aa94633a5](https://github.com/gama-platform/gama/commit/aa94633a5) - Removes autoscaleup in Java2D Displays
* [0a73a1b3f](https://github.com/gama-platform/gama/commit/0a73a1b3f) - Tries to circumvent the bug in SWT regarding HiDPI handling...
* [5faade08d](https://github.com/gama-platform/gama/commit/5faade08d) - add environment aarch64 forr  [#3331](https://github.com/gama-platform/gama/issues/3331)
* [4822a6220](https://github.com/gama-platform/gama/commit/4822a6220) - [MAVEN] Fix commit d367474fbdc8b10d255a52420783b1b16704360e Properly link SWT M1 fragment for Maven compilation
* [fdf60f9da](https://github.com/gama-platform/gama/commit/fdf60f9da) - [MAVEN] Clean build target Sorry, but noone is using Linux ppc64le anymore...
* [af2b66aa3](https://github.com/gama-platform/gama/commit/af2b66aa3) - [MAVEN] Move back Tycho on stable 2.6.0
* [032202cfb](https://github.com/gama-platform/gama/commit/032202cfb) - [BUILD] Add extraresource on M1 build
* [638af7860](https://github.com/gama-platform/gama/commit/638af7860) - [TRAVIS] Clean zipping script Remove dead code, still need to optimize copy-pasted parts
* [3730e24b9](https://github.com/gama-platform/gama/commit/3730e24b9) - [TRAVIS] Add M1 build in zip w/ jdk script
* [e22591225](https://github.com/gama-platform/gama/commit/e22591225) - [GHA] Add M1 build and signing
* [31fe58244](https://github.com/gama-platform/gama/commit/31fe58244) - [GHA] Publish job waits M1 build signing jobs
* [b90d5d46b](https://github.com/gama-platform/gama/commit/b90d5d46b) - [GHA] Remove maven cache Conflicts because previous run used Tycho 3.0.0-SNAPSHOT ci release
* [53e71b35c](https://github.com/gama-platform/gama/commit/53e71b35c) - [GHA] Optimize artefact move between jobs + re-add maven cache
* [b19e388f3](https://github.com/gama-platform/gama/commit/b19e388f3) - [GHA] Re apply b90d5d46b
* [774ade107](https://github.com/gama-platform/gama/commit/774ade107) - [GHA] Use self-hosted MacOS runners ci release
* [6f9b62687](https://github.com/gama-platform/gama/commit/6f9b62687) - typo in Moving 3D Object.gaml
* [c9a3629eb](https://github.com/gama-platform/gama/commit/c9a3629eb) - Adding raw tcp skill to the network plugin
* [3a640525f](https://github.com/gama-platform/gama/commit/3a640525f) - adding basic documentation to tcp skill
* [4db2bbd3a](https://github.com/gama-platform/gama/commit/4db2bbd3a) - Update TcpSkill.java
* [61eb8a02c](https://github.com/gama-platform/gama/commit/61eb8a02c) - Revert "Merge branch 'GAMA_1.8.2' of https://github.com/gama-platform/gama into GAMA_1.8.2"
* [2e22a931a](https://github.com/gama-platform/gama/commit/2e22a931a) - [GHA] Add M1 build in publish script ci release
* [b6da01339](https://github.com/gama-platform/gama/commit/b6da01339) - [GHA] Remove MacOS ZIP format release Only .dmg will be release now
* [93dbbfc62](https://github.com/gama-platform/gama/commit/93dbbfc62) - add raw facet to connect statement, turn the message of only TCP to raw format, no compositeMessage
* [dca10a2a9](https://github.com/gama-platform/gama/commit/dca10a2a9) - Attempts to improve the appearance of GAMA on M1 macOS (see [#3324](https://github.com/gama-platform/gama/issues/3324))
* [a33244b09](https://github.com/gama-platform/gama/commit/a33244b09) - headless listener, some manangement of stocking experiments
* [00531c7ff](https://github.com/gama-platform/gama/commit/00531c7ff) - re-add old genstar operatirs
* [1322364f5](https://github.com/gama-platform/gama/commit/1322364f5) - Fixes [#3305](https://github.com/gama-platform/gama/issues/3305) by coloring built-in attributes in shapefiles in red
* [cb9312a60](https://github.com/gama-platform/gama/commit/cb9312a60) - Fixes [#3332](https://github.com/gama-platform/gama/issues/3332) - a NPE due to a bad initialization of preferences
* [f6f53dc2f](https://github.com/gama-platform/gama/commit/f6f53dc2f) - fix wrong declaration of default model preference, mentioned in [#3332](https://github.com/gama-platform/gama/issues/3332)
* [5503a9ea6](https://github.com/gama-platform/gama/commit/5503a9ea6) - Update MessageFactory.java
* [a88e7ca21](https://github.com/gama-platform/gama/commit/a88e7ca21) - Possible fix for [#3335](https://github.com/gama-platform/gama/issues/3335).
* [32a4f40d5](https://github.com/gama-platform/gama/commit/32a4f40d5) - Darkns the red color in the navigator
* [d38b6eb9e](https://github.com/gama-platform/gama/commit/d38b6eb9e) - See [#2761](https://github.com/gama-platform/gama/issues/2761). Prevents overlays to rotate when the display rotates
* [cffcbb21d](https://github.com/gama-platform/gama/commit/cffcbb21d) - Avoids a casting problem when passing only points
* [d590dc77f](https://github.com/gama-platform/gama/commit/d590dc77f) - Simplifies some OpenGL geometrical operations
* [8d19a47c4](https://github.com/gama-platform/gama/commit/8d19a47c4) - HeadlessListener mimic processCommand of experimentController
* [cbc1239bc](https://github.com/gama-platform/gama/commit/cbc1239bc) - HeadlessListener try to use processQueue
* [c893f9716](https://github.com/gama-platform/gama/commit/c893f9716) - fix advanced social force model
* [e41f33f0b](https://github.com/gama-platform/gama/commit/e41f33f0b) - update parameter initialization
* [191e29aab](https://github.com/gama-platform/gama/commit/191e29aab) - Fixes [#3336](https://github.com/gama-platform/gama/issues/3336) by correctly handling double values in temporal expressions
* [cfeef0ffc](https://github.com/gama-platform/gama/commit/cfeef0ffc) - HeadlessListener add expression evaluate
* [4b2d5af0f](https://github.com/gama-platform/gama/commit/4b2d5af0f) - sorry, remove wrong file
* [bd4f9aaff](https://github.com/gama-platform/gama/commit/bd4f9aaff) - fix wrong declaration of startup model preference, mentioned in [#3332](https://github.com/gama-platform/gama/issues/3332)
* [5463c6770](https://github.com/gama-platform/gama/commit/5463c6770) - workaround for [#3334](https://github.com/gama-platform/gama/issues/3334)
* [1676e41ce](https://github.com/gama-platform/gama/commit/1676e41ce) - gamalistener try with styling in webgis
* [2bb1367b5](https://github.com/gama-platform/gama/commit/2bb1367b5) - fixes 3339
* [c4964aec8](https://github.com/gama-platform/gama/commit/c4964aec8) - update of scheduler models to schedule the manager
* [20ca04aea](https://github.com/gama-platform/gama/commit/20ca04aea) - fixes [#3340](https://github.com/gama-platform/gama/issues/3340)
* [a3ec486eb](https://github.com/gama-platform/gama/commit/a3ec486eb) - Fixing typos in prey-predator tutorial
* [18da57fb2](https://github.com/gama-platform/gama/commit/18da57fb2) - Update BDI tutorial 3.gaml
* [4243f84e8](https://github.com/gama-platform/gama/commit/4243f84e8) - BDI tutorial
* [028025d2a](https://github.com/gama-platform/gama/commit/028025d2a) - BoxAndWhisker charts first version
* [75aa3047a](https://github.com/gama-platform/gama/commit/75aa3047a) - Base for a workaround for [#2828](https://github.com/gama-platform/gama/issues/2828)
* [faa146194](https://github.com/gama-platform/gama/commit/faa146194) - fixes [#3347](https://github.com/gama-platform/gama/issues/3347)
* [20aecfa70](https://github.com/gama-platform/gama/commit/20aecfa70) - [TRAVIS] Init refresh doc GHA
* [99d1ebac8](https://github.com/gama-platform/gama/commit/99d1ebac8) - [GHA DOC] Regen doc on GAMA_1.8.2 branch
* [551c26732](https://github.com/gama-platform/gama/commit/551c26732) - [GHA DOC] Enable workflow
* [4d001b66f](https://github.com/gama-platform/gama/commit/4d001b66f) - [GHA DOC] Remove push trigger Needed to enable workflow present only on non-default branch
* [bf0c078d6](https://github.com/gama-platform/gama/commit/bf0c078d6) - [GHA DOC] Fix paths broken since moved from Travis to Github Actions
* [0e81712d2](https://github.com/gama-platform/gama/commit/0e81712d2) - [GHA DOC] Fix wiki update git commands
* [f19fc1e14](https://github.com/gama-platform/gama/commit/f19fc1e14) - [DOC] Remove WebsiteGeneration.md generation File removed since gama-platform/gama-platform.github.io#86 Remove one error line while generating documentation
* [57fa1a295](https://github.com/gama-platform/gama/commit/57fa1a295) - [GHA DOC] Mini optimisation Doesn't generate product, not needed for documentation workflow 🧐
* [4724b0646](https://github.com/gama-platform/gama/commit/4724b0646) - [GHA DOC] Fix publish git commands v2
* [a351c05a7](https://github.com/gama-platform/gama/commit/a351c05a7) - [DOC] Trigger website rebuild with POST request instead of empty commit
* [c0ec45085](https://github.com/gama-platform/gama/commit/c0ec45085) - [GHA] Add release in .deb archive This will allow smooth installation for every Debian based linux distribution And is a first step for the issue [#3350](https://github.com/gama-platform/gama/issues/3350)
* [ebe09227c](https://github.com/gama-platform/gama/commit/ebe09227c) - [DEB] Change default icon for linux Moving to icns like MacOS Will bring easier icon evolution (only one file) and xpm ain't much supported by linux
* [bf39a8d71](https://github.com/gama-platform/gama/commit/bf39a8d71) - [DEB] Get extra ressources from current branch
* [344933caa](https://github.com/gama-platform/gama/commit/344933caa) - [DEB] Generate 2 release for GAMA w/ and w/o JDK
* [367d6e9c1](https://github.com/gama-platform/gama/commit/367d6e9c1) - [GHA DEB] Fix missing folder ci release
* [d4120979b](https://github.com/gama-platform/gama/commit/d4120979b) - [GHA DEB] Fix wrong command ci release Promise, it's the last one...
* [91462c461](https://github.com/gama-platform/gama/commit/91462c461) - [DEB] Add EOL mark
* [8b8e56260](https://github.com/gama-platform/gama/commit/8b8e56260) - [DEB] Fix wrong copy-paste ci release
* [2e117b691](https://github.com/gama-platform/gama/commit/2e117b691) - [GHA DEB] Fix filename for post-package build check ci release
* [783111a78](https://github.com/gama-platform/gama/commit/783111a78) - [GHA DOC] Disable latest commit message trigger Use only workflow ones to trigger doc generation Prevent re-trigger release or else
* [3c1d3f587](https://github.com/gama-platform/gama/commit/3c1d3f587) - [GHA] Refactor using Matrix
* [a459a65a2](https://github.com/gama-platform/gama/commit/a459a65a2) - [GHA] Fix matrix cleanup Did remove Signing script ci release
* [f0dded012](https://github.com/gama-platform/gama/commit/f0dded012) - [GHA] Apply matrix refactor on Debian packaging
* [4580e65a2](https://github.com/gama-platform/gama/commit/4580e65a2) - [PUBLISH] Refactor renaming loop ci release
* [3ebee6152](https://github.com/gama-platform/gama/commit/3ebee6152) - [GHA] Use self-hosted MacOS Shared GH's macOS runners always loose in timeout... ci release
* [b123b2b45](https://github.com/gama-platform/gama/commit/b123b2b45) - Revert 3ebee6152 - Can't use self hosted MacOS runner
* [43232545a](https://github.com/gama-platform/gama/commit/43232545a) - [GHA MAC] Try to fix macOS hanging Send text console message every 25 seconds to not have job timeouted ci release
* [f6aaae916](https://github.com/gama-platform/gama/commit/f6aaae916) - [GHA DEB] Fix debian package preparation Forgot to change zip file name to process
* [06707de9d](https://github.com/gama-platform/gama/commit/06707de9d) - [GHA MAC] Add debug information while signing ci release
* [64f67d8cd](https://github.com/gama-platform/gama/commit/64f67d8cd) - [GHA MAC] Try to de-parallelize macos jobs ci release
* [bcf391e06](https://github.com/gama-platform/gama/commit/bcf391e06) - [GEOTOOLS] Clean jar file Remove useless native lib like for DragonBSD May help fix signature script for MacOS
* [e50e817eb](https://github.com/gama-platform/gama/commit/e50e817eb) - [GHA] Clean debug macos + Re-parallel + Reverse jar list order ci release
* [6005289b1](https://github.com/gama-platform/gama/commit/6005289b1) - [GHA] Better clean-up ci release
* [f7abf5568](https://github.com/gama-platform/gama/commit/f7abf5568) - [GHA MAC] Replace missing tac command ci release
* [1dbe17012](https://github.com/gama-platform/gama/commit/1dbe17012) - Adding windows inno-setup script + icon
* [3bfbb74b9](https://github.com/gama-platform/gama/commit/3bfbb74b9) - [GHA MAC] Apply job delay for JDK signing ci release
* [ed64a99ba](https://github.com/gama-platform/gama/commit/ed64a99ba) - [JAR] Remove useless lib from jSerialComm ci release
* [b499af34f](https://github.com/gama-platform/gama/commit/b499af34f) - [GHA MAC] Add delay between each mac VM + keep reverse list only for JDK ones   -> Try to reduce submission concurrency ci release
* [27653ff50](https://github.com/gama-platform/gama/commit/27653ff50) - [GHA MAC] Print processed file only if opened ci release
* [6e88c1eab](https://github.com/gama-platform/gama/commit/6e88c1eab) - [GHA MAC] Try to reverse list only for JDK ones ci release
* [ff131d259](https://github.com/gama-platform/gama/commit/ff131d259) - [GHA MAC] Sub-parallelize mac builds Only 2 VM at the time, should prevent signature timeout ci release
* [b07b88bd9](https://github.com/gama-platform/gama/commit/b07b88bd9) - [GHA] Fix script
* [993db9eb5](https://github.com/gama-platform/gama/commit/993db9eb5) - [JDK] Temporary link hard-coded Temurin is releasing a new stable version, so hard code link to have script still running ci release
* [fcab28e66](https://github.com/gama-platform/gama/commit/fcab28e66) - [GHA MAC] Try to reverse list on JDK ci release
* [46f4d4b48](https://github.com/gama-platform/gama/commit/46f4d4b48) - [GHA MAC] Move from matrix to composite action Will allow to more easily/prettily separate signature for 4 macOS built ci release
* [f9a7452f5](https://github.com/gama-platform/gama/commit/f9a7452f5) - [GHA MAC] Checkout composite action first + soft parts comments ci release
* [9bbc6662c](https://github.com/gama-platform/gama/commit/9bbc6662c) - [GHA MAC] Full checkout Less clean, but should work well ci release
* [022fdc1c9](https://github.com/gama-platform/gama/commit/022fdc1c9) - [GHA MAC] Explicit shell for composite Github Action ain't smart enough to know which runner to run bash commands, so it needs to be explicited for each job step ci release
* [c83950704](https://github.com/gama-platform/gama/commit/c83950704) - [GHA] Init windows.msi built ci release
* [e7054f7bd](https://github.com/gama-platform/gama/commit/e7054f7bd) - [GHA WIN] Fix msi needs + Add mendatory LICENSE file + Unzip ressources + Fix input directory ci release
* [e12e3da31](https://github.com/gama-platform/gama/commit/e12e3da31) - [GHA MAC] Signing one build at a time ci release
* [17729e0cc](https://github.com/gama-platform/gama/commit/17729e0cc) - [GHA MAC] Use default Xcode version Was hardcoded on 13.0 from before it turns default one ci release
* [9e5f0334f](https://github.com/gama-platform/gama/commit/9e5f0334f) - [GHA MAC] Bump runner to JDK 17 LTS
* [4f70217ea](https://github.com/gama-platform/gama/commit/4f70217ea) - [GHA WIN] Write sed modification in file Command was applied only in log display text, not an infile modification
* [17b62c460](https://github.com/gama-platform/gama/commit/17b62c460) - [GHA MAC] Re-parallelize 4 signing processes Error seems to come from old Xcode application usage ci release
* [c0ef62ebf](https://github.com/gama-platform/gama/commit/c0ef62ebf) - [MAC SIGN] Clear some debug log
* [4e03770a9](https://github.com/gama-platform/gama/commit/4e03770a9) - [GHA MAC] Parallelize per archi Only run 2 VM at a time, 4 seems too big :( ci release
* [aa9b3cff8](https://github.com/gama-platform/gama/commit/aa9b3cff8) - [GHA MAC] Un-parallelize signatures ci release
* [45c0b9cb5](https://github.com/gama-platform/gama/commit/45c0b9cb5) - [GHA DEB] Add postinst file Set permissions for freshly installed gama application ci release
* [b0ecbf16c](https://github.com/gama-platform/gama/commit/b0ecbf16c) - [GHA] Fix recursive parameter
* [8deb4c4b6](https://github.com/gama-platform/gama/commit/8deb4c4b6) - [GHA DEB] Fix unzip path ci release
* [14897659c](https://github.com/gama-platform/gama/commit/14897659c) - [GHA DEB] Change permission for postinst script was bad permissions 644 (must be >=0555 and <=0775) -> Is now 0775 ci release
* [97d23da34](https://github.com/gama-platform/gama/commit/97d23da34) - [JDK] Start revert 993db9eb52 Still missing aarch64 build
* [1a0a314aa](https://github.com/gama-platform/gama/commit/1a0a314aa) - [RELEASE] Add exe installer
* [70a6f1df9](https://github.com/gama-platform/gama/commit/70a6f1df9) - restructure websocket, move to network plugin (to be a protocol beside tcp, udp) and to be able to use tcp, udp in headless listener
* [d0d5fa9a4](https://github.com/gama-platform/gama/commit/d0d5fa9a4) - [GHA MAC] Remove IS_WITH_JDK reverse var
* [7734ed68f](https://github.com/gama-platform/gama/commit/7734ed68f) - [GHA MAC] Add pre-signing CI step Use Linux VM to fetch list of jar to open and sign -> Done to prevent silent hanging of heavy MacOS' Github runner
* [b0f2d7d8d](https://github.com/gama-platform/gama/commit/b0f2d7d8d) - [GHA MAC] Use result file from pre-sign job ci release
* [aa5109984](https://github.com/gama-platform/gama/commit/aa5109984) - [GHA] Remove composite workflow for MacOS sign ci release
* [a42507214](https://github.com/gama-platform/gama/commit/a42507214) - [MAC SIGN] Not deleting source file anymore ci release
* [62403e287](https://github.com/gama-platform/gama/commit/62403e287) - [MAC PRE-SIGN] Prettier logs
* [36f0a1477](https://github.com/gama-platform/gama/commit/36f0a1477) - Revert "[GEOTOOLS] Clean jar file"
* [22ba009bb](https://github.com/gama-platform/gama/commit/22ba009bb) - Revert "[JAR] Remove useless lib from jSerialComm"
* [c75bd5473](https://github.com/gama-platform/gama/commit/c75bd5473) - [GHA] ci release
* [9509a07ee](https://github.com/gama-platform/gama/commit/9509a07ee) - [DEB] Better clean-up after install Also, add 'gama-headless' in system PATH
* [b64b960ac](https://github.com/gama-platform/gama/commit/b64b960ac) - Fix color printing
* [880522a9f](https://github.com/gama-platform/gama/commit/880522a9f) - [GHA MAC] Process only files flagged in pre-sign job ci release
* [8611c6be7](https://github.com/gama-platform/gama/commit/8611c6be7) - [GHA DEB] Change postrm file permission ci release
* [0d9973e80](https://github.com/gama-platform/gama/commit/0d9973e80) - [MAC SIGN] Use absolute path for source txt file
* [167513de8](https://github.com/gama-platform/gama/commit/167513de8) - [GHA REL] Pass Github's var to bash env one ci release
* [5812716cb](https://github.com/gama-platform/gama/commit/5812716cb) - Revert "[MAC SIGN] Use absolute path for source txt file"
* [350ed40fc](https://github.com/gama-platform/gama/commit/350ed40fc) - [GHA] Fix publish string var usage ci release
* [57835d20a](https://github.com/gama-platform/gama/commit/57835d20a) - Fix some issues on unuserialize
* [ccad589fa](https://github.com/gama-platform/gama/commit/ccad589fa) - [GHA] Fix publish string var usage ci release
* [585f5ed38](https://github.com/gama-platform/gama/commit/585f5ed38) - [GHA REL] Fix echo var instead of command ci release
* [1b9794ff5](https://github.com/gama-platform/gama/commit/1b9794ff5) - [GHA REL] Add linux zip in gama-zip-builds artifact Last thing missing for publish script ci release
* [6779c531c](https://github.com/gama-platform/gama/commit/6779c531c) - [GHA] Fix publish string var usage ci release
* [ff9fb14fe](https://github.com/gama-platform/gama/commit/ff9fb14fe) - [GHA REL] Auto-scale archive upload loop ci release
* [b33f47921](https://github.com/gama-platform/gama/commit/b33f47921) - [GHA DEB] Fix post remove script Fix deadlock script from bad copy-paste
* [f2844873d](https://github.com/gama-platform/gama/commit/f2844873d) - [GHA] Add auto-test deb install/remove package ci release
* [dc7c65c22](https://github.com/gama-platform/gama/commit/dc7c65c22) - [PUB] Fix macOS loop Empty cells in array are skipped in bash, which was missing some of our builds ci release
* [71b32ae57](https://github.com/gama-platform/gama/commit/71b32ae57) - [DEB] Copy icon in product Fix missing icon in drawer and task bar
* [53ac2dae5](https://github.com/gama-platform/gama/commit/53ac2dae5) - [GHA DEB] Fix test installer job
* [4f8f307c4](https://github.com/gama-platform/gama/commit/4f8f307c4) - [DEB] Add GPL3 copyright in release ci release
* [ccc131834](https://github.com/gama-platform/gama/commit/ccc131834) - [GHA DEB] Install local deb can't be chained in command ci release
* [4c374cab3](https://github.com/gama-platform/gama/commit/4c374cab3) - address [#3360](https://github.com/gama-platform/gama/issues/3360)
* [fe6782a2d](https://github.com/gama-platform/gama/commit/fe6782a2d) - [DEB] Add Dependency and conflicts Will install JDK 17 automatically for light version and replace version w/ JDK if already present
* [fd1ea5832](https://github.com/gama-platform/gama/commit/fd1ea5832) - [GHA DEB] Apply previous commit for w/ JDK on the fly ci release
* [923f51b9e](https://github.com/gama-platform/gama/commit/923f51b9e) - [GHA DEB] Explicit update apt database Prevent current error downloading inexisting package ci release
* [4fcef7daa](https://github.com/gama-platform/gama/commit/4fcef7daa) - [GHA DEB] Fix path relative path in headless helper We know where GAMA is install, so we can hard-code it and limit future problem ci release
* [990650117](https://github.com/gama-platform/gama/commit/990650117) - fixing typos and error messages in tcp skill
* [ed975e4e4](https://github.com/gama-platform/gama/commit/ed975e4e4) - [GHA DEB] Fix fix path in headless helper for jdk build Set full path for the JDK embedded binary ci release
* [40099a5f8](https://github.com/gama-platform/gama/commit/40099a5f8) - Update TcpSkill.java
* [77638d097](https://github.com/gama-platform/gama/commit/77638d097) - [GHA DEB] Fix fix path in headless helper for jdk build v2 Forgot to remove previous command which was to fix... 🙈 ci release
* [d3da9813f](https://github.com/gama-platform/gama/commit/d3da9813f) - [HEADLESS] Add catch if not running JDK 17
* [98eaa00be](https://github.com/gama-platform/gama/commit/98eaa00be) - [GHA DEB TEST] Update Java Env before running test ci release
* [05324c17c](https://github.com/gama-platform/gama/commit/05324c17c) - [GHA DEB] Fix switching java version Do for Debian installer test job ci release
* [b47e22bd9](https://github.com/gama-platform/gama/commit/b47e22bd9) - gamalistener, try with json format standardized
* [67dd3df30](https://github.com/gama-platform/gama/commit/67dd3df30) - [1.8.1] Cherrypick new ISSUE_TEMPLATE files
* [d4750ea51](https://github.com/gama-platform/gama/commit/d4750ea51) - [GHA RELEASE] Add format for ArchLinux based ci release
* [594da79e2](https://github.com/gama-platform/gama/commit/594da79e2) - [GHA] Parallize better linux jobs No need to wait for debian installer test to start packaging for ArchLinux
* [2aa74390e](https://github.com/gama-platform/gama/commit/2aa74390e) - Fixing issue [#3288](https://github.com/gama-platform/gama/issues/3288)
* [9df63faaf](https://github.com/gama-platform/gama/commit/9df63faaf) - Revert d4750ea51
* [56fc5c3ea](https://github.com/gama-platform/gama/commit/56fc5c3ea) - Fix previous revert
* [0f456db01](https://github.com/gama-platform/gama/commit/0f456db01) - fixes [#3357](https://github.com/gama-platform/gama/issues/3357) - propose a rename_file and a copy_file operators
* [4996d15f2](https://github.com/gama-platform/gama/commit/4996d15f2) - [GHA] Finish removing ArchLinux packages ci release
* [0b3ab4333](https://github.com/gama-platform/gama/commit/0b3ab4333) - [HEAD] Port ummisco.gama.product wrapper to w/jdk version + Check JDK version + catch -write-xmi option + Update copyright year everywhere
* [313ae572b](https://github.com/gama-platform/gama/commit/313ae572b) - Fixes [#3366](https://github.com/gama-platform/gama/issues/3366) by providing a correct copy of function calls
* [456b96840](https://github.com/gama-platform/gama/commit/456b96840) - add a warning for the projection of grids (related to issue [#3345](https://github.com/gama-platform/gama/issues/3345))
* [6e78ecd57](https://github.com/gama-platform/gama/commit/6e78ecd57) - Address  issue  [#90](https://github.com/gama-platform/gama/issues/90) of the GAMA  website: generation of the documentation of skills' actions
* [dd33b001e](https://github.com/gama-platform/gama/commit/dd33b001e) - Fix the restoration of simulations from files
* [acda6dbe1](https://github.com/gama-platform/gama/commit/acda6dbe1) - complement for [#3366](https://github.com/gama-platform/gama/issues/3366)
* [eeb3d7f9f](https://github.com/gama-platform/gama/commit/eeb3d7f9f) - Reinstiates the -Duse_native_opengl_window flag (false by default)
* [29219efd1](https://github.com/gama-platform/gama/commit/29219efd1) - updated documentation for copy/rename
* [c3a8f544c](https://github.com/gama-platform/gama/commit/c3a8f544c) - should fix issue [#102](https://github.com/gama-platform/gama/issues/102) (of the documentation) : improve the paring of files constructors to avoid displaying empty example block
* [ee2732065](https://github.com/gama-platform/gama/commit/ee2732065) - fixes [#3355](https://github.com/gama-platform/gama/issues/3355): keep the order of the experiments in a file
* [baabbd002](https://github.com/gama-platform/gama/commit/baabbd002) - updated file operators and examples
* [f49e3680e](https://github.com/gama-platform/gama/commit/f49e3680e) - More trials to make GLCanvas and NEWTCanvas coexist...
* [c86d2a6e1](https://github.com/gama-platform/gama/commit/c86d2a6e1) - Update Copyright year in Info.plist
* [cb38badf5](https://github.com/gama-platform/gama/commit/cb38badf5) - Working on GamaWeb HelloWorld
* [0af9ed4c3](https://github.com/gama-platform/gama/commit/0af9ed4c3) - Fixes [#3370](https://github.com/gama-platform/gama/issues/3370) by setting a default workspace name
* [bd8dc664f](https://github.com/gama-platform/gama/commit/bd8dc664f) - fixes [#3342](https://github.com/gama-platform/gama/issues/3342) for opengl
* [2f23142be](https://github.com/gama-platform/gama/commit/2f23142be) - Fix for [#3371](https://github.com/gama-platform/gama/issues/3371)
* [9cf7ecac4](https://github.com/gama-platform/gama/commit/9cf7ecac4) - [GHA JDK] Remove jdk check on gama-headless.sh w/ JDK build
* [d581b4e9c](https://github.com/gama-platform/gama/commit/d581b4e9c) - Fixed headless wrapper for windows [#3367](https://github.com/gama-platform/gama/issues/3367)
* [059fddae3](https://github.com/gama-platform/gama/commit/059fddae3) - [LIN] Apply workaround and fix [#3373](https://github.com/gama-platform/gama/issues/3373)
* [ecb0b0c98](https://github.com/gama-platform/gama/commit/ecb0b0c98) - address [#3372](https://github.com/gama-platform/gama/issues/3372)
* [7a3eee23a](https://github.com/gama-platform/gama/commit/7a3eee23a) - add more possibilities (and examples) for pie charts (related to issue [#3343](https://github.com/gama-platform/gama/issues/3343))
* [dad367de1](https://github.com/gama-platform/gama/commit/dad367de1) - [HEADLESS] More permissive JDK check Was very strict on the name format, but it can create some issues like for AlpineLinux which is used as based for GAMA Dockers ci release
* [22c941cbb](https://github.com/gama-platform/gama/commit/22c941cbb) - Adresses #3337, #3353, [#3358](https://github.com/gama-platform/gama/issues/3358). Please test and close issues if ok
* [93ccdf7b6](https://github.com/gama-platform/gama/commit/93ccdf7b6) - Adds native Apple Silicon launcher
* [cbe2ec283](https://github.com/gama-platform/gama/commit/cbe2ec283) - Fixes [#3338](https://github.com/gama-platform/gama/issues/3338). Better display of editor buttons on Windows
* [9fd1124ca](https://github.com/gama-platform/gama/commit/9fd1124ca) - Fixes [#2984](https://github.com/gama-platform/gama/issues/2984).
* [3621175a2](https://github.com/gama-platform/gama/commit/3621175a2) - complement for [#2984](https://github.com/gama-platform/gama/issues/2984)
* [7d50289d7](https://github.com/gama-platform/gama/commit/7d50289d7) - fixes a problem with pie chart and background color
* [4ddf06ceb](https://github.com/gama-platform/gama/commit/4ddf06ceb) - Documenting [#3342](https://github.com/gama-platform/gama/issues/3342)
* [30f266ef1](https://github.com/gama-platform/gama/commit/30f266ef1) - Working on GAMAWeb Client (WIP)
* [f2a9baf4c](https://github.com/gama-platform/gama/commit/f2a9baf4c) - clean gis data of road traffic tuto
* [2b46fa03e](https://github.com/gama-platform/gama/commit/2b46fa03e) - update of the processor to manage  better some exotic data type returned by  operators
* [ac91e928a](https://github.com/gama-platform/gama/commit/ac91e928a) - fixes data for traffic tutorial
* [14dee4ea6](https://github.com/gama-platform/gama/commit/14dee4ea6) - Addresses the continuation of [#3337](https://github.com/gama-platform/gama/issues/3337)
* [e2585a287](https://github.com/gama-platform/gama/commit/e2585a287) - New feature : capability  to send HTTP request (e.g. to  Web service)
* [a15a507ad](https://github.com/gama-platform/gama/commit/a15a507ad) - Improves the handling of NEWT Windows when going fullscreen
* [3f4aa1e10](https://github.com/gama-platform/gama/commit/3f4aa1e10) - gama listener launch experiment without parameter input from xml of headless
* [c34e95e64](https://github.com/gama-platform/gama/commit/c34e95e64) - MapBox Client WIP (Code cleaning)
* [8d5a571dc](https://github.com/gama-platform/gama/commit/8d5a571dc) - Update doc / processor to generate pdf
* [cdb2394eb](https://github.com/gama-platform/gama/commit/cdb2394eb) - Reorganizes the display views:
* [89a1811b9](https://github.com/gama-platform/gama/commit/89a1811b9) - Remove RFile and the RCaller lib from GAMA The access to R is delegated to the external plugin (cF. experimental)
* [11b2a5f3d](https://github.com/gama-platform/gama/commit/11b2a5f3d) - MapBox v1.0 Proof of concept
* [74d1aaf04](https://github.com/gama-platform/gama/commit/74d1aaf04) - Fixes [#3365](https://github.com/gama-platform/gama/issues/3365).
* [2eff8d5b3](https://github.com/gama-platform/gama/commit/2eff8d5b3) - Remove rotation in ants
* [8680a1822](https://github.com/gama-platform/gama/commit/8680a1822) - Fixes [#3383](https://github.com/gama-platform/gama/issues/3383)
* [8c0ba94ad](https://github.com/gama-platform/gama/commit/8c0ba94ad) - Hides some very little used preferences from the prefs view
* [27d562bed](https://github.com/gama-platform/gama/commit/27d562bed) - Add a simple example of usage of the driving skill
* [e24264186](https://github.com/gama-platform/gama/commit/e24264186) - Suppresses some harmless warnings.
* [77cc9e6ef](https://github.com/gama-platform/gama/commit/77cc9e6ef) - improve visual aspect of genstar example model
* [6c365bf68](https://github.com/gama-platform/gama/commit/6c365bf68) - Improve the visual aspect of pedestrian models
* [bbba98d88](https://github.com/gama-platform/gama/commit/bbba98d88) - [CLEAN] Remove unsused package
* [834b9c5d5](https://github.com/gama-platform/gama/commit/834b9c5d5) - Documentation fixing [#3002](https://github.com/gama-platform/gama/issues/3002)
* [af94d59e2](https://github.com/gama-platform/gama/commit/af94d59e2) - #3384 please test
* [dd0d054b1](https://github.com/gama-platform/gama/commit/dd0d054b1) - #3384 missing file, sorry benoit
* [9d5b9aee6](https://github.com/gama-platform/gama/commit/9d5b9aee6) - Fixing Table Of Content  (https://github.com/gama-platform/gama/wiki/BuiltInArchitectures)
* [c7047abef](https://github.com/gama-platform/gama/commit/c7047abef) - Documentation fixing [#3002](https://github.com/gama-platform/gama/issues/3002)
* [715569f7a](https://github.com/gama-platform/gama/commit/715569f7a) - Fixes [#3385](https://github.com/gama-platform/gama/issues/3385) (keeping a cache of the built-in doc)
* [f243a1092](https://github.com/gama-platform/gama/commit/f243a1092) - fix [#3387](https://github.com/gama-platform/gama/issues/3387)
* [37fe21e21](https://github.com/gama-platform/gama/commit/37fe21e21) - Fixes [#3386](https://github.com/gama-platform/gama/issues/3386) by removing the "classical" built-in equations
* [0cafd2c08](https://github.com/gama-platform/gama/commit/0cafd2c08) - Fixes [#3346](https://github.com/gama-platform/gama/issues/3346) -- but not the "frontmost display" part.
* [ab92bc74f](https://github.com/gama-platform/gama/commit/ab92bc74f) - remove the parallel computation in the hydrological model (issue [#3380](https://github.com/gama-platform/gama/issues/3380))
* [dd2504b18](https://github.com/gama-platform/gama/commit/dd2504b18) - Modified ODE models
* [44f2476c3](https://github.com/gama-platform/gama/commit/44f2476c3) - Fixes [#3388](https://github.com/gama-platform/gama/issues/3388)
* [e99eb13e2](https://github.com/gama-platform/gama/commit/e99eb13e2) - Fixes [#3389](https://github.com/gama-platform/gama/issues/3389).
* [4a43bc61d](https://github.com/gama-platform/gama/commit/4a43bc61d) - Remove one of the Websocket used to get the simulation output
* [42da666f8](https://github.com/gama-platform/gama/commit/42da666f8) - Prevents native physics models to hang on quitting on macOS and Linux
* [3797afd1c](https://github.com/gama-platform/gama/commit/3797afd1c) - Fix Incremental Model lightning
* [221dd3a3d](https://github.com/gama-platform/gama/commit/221dd3a3d) - [GEN*] Clean javadoc Change from bad HTML to full MarkDown
* [b0470d18a](https://github.com/gama-platform/gama/commit/b0470d18a) - Update Serializer to add the possibility to export into JSON
* [c73edd053](https://github.com/gama-platform/gama/commit/c73edd053) - Add lib in the META-INF for JSON export
* [0a140cdf1](https://github.com/gama-platform/gama/commit/0a140cdf1) - updated ODE test models
* [c8fac62a0](https://github.com/gama-platform/gama/commit/c8fac62a0) - [MAC SIGN] Clear *.tmp jar files - Fix [#3377](https://github.com/gama-platform/gama/issues/3377) ci release
* [dcc3bf6af](https://github.com/gama-platform/gama/commit/dcc3bf6af) - [MAC SIGN] Clear *.tmp jar files - Fix [#3377](https://github.com/gama-platform/gama/issues/3377) v2 ci release
* [1a1440f40](https://github.com/gama-platform/gama/commit/1a1440f40) - Fixes #3397. Fixes [#3391](https://github.com/gama-platform/gama/issues/3391).
* [c2cd82f6d](https://github.com/gama-platform/gama/commit/c2cd82f6d) - Fixes [#3399](https://github.com/gama-platform/gama/issues/3399).
* [da7efad7f](https://github.com/gama-platform/gama/commit/da7efad7f) - Follow-up previous commit
* [f9d8fdaf1](https://github.com/gama-platform/gama/commit/f9d8fdaf1) - improve the visual aspect of OBj file loading model (size of the world)
* [04c966784](https://github.com/gama-platform/gama/commit/04c966784) - fixes the path to the file used for the download data model
* [16b998ef6](https://github.com/gama-platform/gama/commit/16b998ef6) - Update l-tri light
* [960332aa5](https://github.com/gama-platform/gama/commit/960332aa5) - update mapquest appkey
* [a374890ca](https://github.com/gama-platform/gama/commit/a374890ca) - [DOC] Fix html tag for documentation ci docs
* [c570b227d](https://github.com/gama-platform/gama/commit/c570b227d) - fix [#3402](https://github.com/gama-platform/gama/issues/3402)
* [96d937f1c](https://github.com/gama-platform/gama/commit/96d937f1c) - MInor visuale change
* [7a70ab9fa](https://github.com/gama-platform/gama/commit/7a70ab9fa) - Add a link between core and serialize to use xstream to Jsonify some objects
* [8c3623108](https://github.com/gama-platform/gama/commit/8c3623108) - Fixes [#3404](https://github.com/gama-platform/gama/issues/3404) by using 'invokeLater' rather than 'invokeAndWait' in AWT
* [f8a3dce85](https://github.com/gama-platform/gama/commit/f8a3dce85) - Updater Jsoner for colors
* [a5409dda7](https://github.com/gama-platform/gama/commit/a5409dda7) - Minor visual change and setting of camera for Toy Model library
* [583877ca5](https://github.com/gama-platform/gama/commit/583877ca5) - improve the visual aspect of model Ant foraging in charts
* [071a2fd0e](https://github.com/gama-platform/gama/commit/071a2fd0e) - Fixing headless wrapper for windows without JDK
* [e8132d269](https://github.com/gama-platform/gama/commit/e8132d269) - Add a new operator (and model) to test the reachability of a web address
* [3023f3eb9](https://github.com/gama-platform/gama/commit/3023f3eb9) - Fixed headless wrapper again
* [b92aef002](https://github.com/gama-platform/gama/commit/b92aef002) - Moves GamaObjFile to core (from opengl)
* [657b9648d](https://github.com/gama-platform/gama/commit/657b9648d) - Follow up to the last commit
* [9b7d99b0f](https://github.com/gama-platform/gama/commit/9b7d99b0f) - Fix [#3403](https://github.com/gama-platform/gama/issues/3403) by initializing the torus in the Field DiffusionContext
* [927cacde1](https://github.com/gama-platform/gama/commit/927cacde1) - fix [#3407](https://github.com/gama-platform/gama/issues/3407) , change error meesage of unavailable display type to warning
* [8b0489e05](https://github.com/gama-platform/gama/commit/8b0489e05) - enables to define the maximal y value for radar chart (chart.... y_range: 100) - related to: [#3408](https://github.com/gama-platform/gama/issues/3408)
* [df186ccc7](https://github.com/gama-platform/gama/commit/df186ccc7) - typos in library models
* [b9f590c02](https://github.com/gama-platform/gama/commit/b9f590c02) - clean data of Buildings of Montpellier
* [306251231](https://github.com/gama-platform/gama/commit/306251231) - Remove client server code from GAMA source (now in
* [34ec62fc6](https://github.com/gama-platform/gama/commit/34ec62fc6) - for [#3410](https://github.com/gama-platform/gama/issues/3410)
* [e02fb9a7c](https://github.com/gama-platform/gama/commit/e02fb9a7c) - Fixes [#3400](https://github.com/gama-platform/gama/issues/3400) by introducing the new 'text' statement in parameters
* [478c5fe97](https://github.com/gama-platform/gama/commit/478c5fe97) - Update  doc and  processor to display some missing statements: address issue  [#92](https://github.com/gama-platform/gama/issues/92) of the website
* [aabf346c7](https://github.com/gama-platform/gama/commit/aabf346c7) - for [#3410](https://github.com/gama-platform/gama/issues/3410)
* [43c47995e](https://github.com/gama-platform/gama/commit/43c47995e) - [FIX] Remove need of removed HTML page for Headless
* [dac13ed7e](https://github.com/gama-platform/gama/commit/dac13ed7e) - Fix [#3410](https://github.com/gama-platform/gama/issues/3410)
* [02602bd36](https://github.com/gama-platform/gama/commit/02602bd36) - fixing [#3379](https://github.com/gama-platform/gama/issues/3379)
* [1c8d6d008](https://github.com/gama-platform/gama/commit/1c8d6d008) - Improves the TextDisplayer for parameters. Adds a new splash screen.
* [0a9c772f6](https://github.com/gama-platform/gama/commit/0a9c772f6) - updated ODE library models
* [4291b6b52](https://github.com/gama-platform/gama/commit/4291b6b52) - Update  doc of the  Rules architecture
* [d6d8646c8](https://github.com/gama-platform/gama/commit/d6d8646c8) - Fixes [#3392](https://github.com/gama-platform/gama/issues/3392) by adding a small delay to static layers
* [1aac29cf4](https://github.com/gama-platform/gama/commit/1aac29cf4) - fixing broken is_reachable + model
* [b3d7d12cb](https://github.com/gama-platform/gama/commit/b3d7d12cb) - Update TestWebAddress.gaml
* [bcffa2910](https://github.com/gama-platform/gama/commit/bcffa2910) - Update Comodel Example (Populations Mutated).gaml
* [15960462d](https://github.com/gama-platform/gama/commit/15960462d) - Add dynamic: true to camera in order that it can be moved from  process
* [0b00905a9](https://github.com/gama-platform/gama/commit/0b00905a9) - Addresses [#3376](https://github.com/gama-platform/gama/issues/3376). Please test !
* [577dfb5c0](https://github.com/gama-platform/gama/commit/577dfb5c0) - Added example for Stochastic Differential Equations
* [f61b9c37f](https://github.com/gama-platform/gama/commit/f61b9c37f) - Follow up on [#3376](https://github.com/gama-platform/gama/issues/3376)
* [46c311354](https://github.com/gama-platform/gama/commit/46c311354) - Repair the  connection with MYSQL
* [1eeb44956](https://github.com/gama-platform/gama/commit/1eeb44956) - Prevents problems in non-NEWT Windows
* [0a7366954](https://github.com/gama-platform/gama/commit/0a7366954) - [HEADLESS] Finish fix [#3376](https://github.com/gama-platform/gama/issues/3376) Link to 0b00905a9317ac03f68a1839e04762d3a9138f54
* [7fcbb1562](https://github.com/gama-platform/gama/commit/7fcbb1562) - [HEADLESS] Fix batch simulations not starting Link to 1eeb4495690e10eb57b07643fb1fa601eae870df - HeadlessExperimentController.java
* [db74a08ba](https://github.com/gama-platform/gama/commit/db74a08ba) - update database model for Postresql/postgis
* [7cfc8a08e](https://github.com/gama-platform/gama/commit/7cfc8a08e) - Fixes [#3411](https://github.com/gama-platform/gama/issues/3411).
* [a602503c2](https://github.com/gama-platform/gama/commit/a602503c2) - Removes some useless preferences + improves slider presentation
* [f6aae1234](https://github.com/gama-platform/gama/commit/f6aae1234) - fix [#3413](https://github.com/gama-platform/gama/issues/3413)
* [a6dba9fc3](https://github.com/gama-platform/gama/commit/a6dba9fc3) - Fixes an incorrect snapshot operation in opengl
* [ad7ff429d](https://github.com/gama-platform/gama/commit/ad7ff429d) - real fix for [#3407](https://github.com/gama-platform/gama/issues/3407) and some other toy comodel which has myself computation issue in creation of micro experiment
* [c6d8366b1](https://github.com/gama-platform/gama/commit/c6d8366b1) - update tree and season toy model
* [2c8ec9cb0](https://github.com/gama-platform/gama/commit/2c8ec9cb0) - Update Databases : remove Oracle  and SQL Server support from GAMA core The support has been moved in a dedicated experimental plugin
* [c15417eee](https://github.com/gama-platform/gama/commit/c15417eee) - update databasr project
* [3422b50da](https://github.com/gama-platform/gama/commit/3422b50da) - gamalistener: add reload, paramset
* [365cc80ab](https://github.com/gama-platform/gama/commit/365cc80ab) - [DOC] Generate doc every Saturday midnight
* [5ad72a9e6](https://github.com/gama-platform/gama/commit/5ad72a9e6) - Simple changes for debugging and improving toolbar behavior
* [3c1af2dc9](https://github.com/gama-platform/gama/commit/3c1af2dc9) - gamalistener: add params when launch, interactive mode
* [4d3af63e2](https://github.com/gama-platform/gama/commit/4d3af63e2) - [DOC] Rename exhaustive index md filename ci docs
* [0fea79018](https://github.com/gama-platform/gama/commit/0fea79018) - Fixes a type problem on `all_indexes_of`
* [c76d955db](https://github.com/gama-platform/gama/commit/c76d955db) - gamalistener some minorr cleanup
* [4a0bd1ce9](https://github.com/gama-platform/gama/commit/4a0bd1ce9) - [JDK] Move release M1 on new JDK 17.0.3-7 LTS Same as every other release
* [26fc422c2](https://github.com/gama-platform/gama/commit/26fc422c2) - Refactor of  the databases : rely on Geotools for MySQL and POSTGRES/POSTGIS connection - remove the external library for mysql
* [0ecdf213e](https://github.com/gama-platform/gama/commit/0ecdf213e) - Remove the "support" of spatialite... sqlite is kept,  but  not its spatial component
* [44accb3e6](https://github.com/gama-platform/gama/commit/44accb3e6) - remove MySQL connector lib from  build.properties  as it  is not used anymore
* [ff3b41127](https://github.com/gama-platform/gama/commit/ff3b41127) - Clean database code
* [4b98046fd](https://github.com/gama-platform/gama/commit/4b98046fd) - Remove preferences about spacialite in the preferences model
* [4b5a826e9](https://github.com/gama-platform/gama/commit/4b5a826e9) - [HEADLESS] Make wrapper executable file Remove the need to launch it with 'bash ./gama-headless.sh'
* [a40087a78](https://github.com/gama-platform/gama/commit/a40087a78) - [REALEASE] Update predatorPrey xml sample More coherent with new documentation
* [0d5cae104](https://github.com/gama-platform/gama/commit/0d5cae104) - [HEADLESS] Remove '-write-xmi' from help message Don't know how to use it, what it is for, nor anything
* [3d39a5390](https://github.com/gama-platform/gama/commit/3d39a5390) - Fix bat headless script [#3393](https://github.com/gama-platform/gama/issues/3393)
* [017238a1e](https://github.com/gama-platform/gama/commit/017238a1e) - add a test in the driving skill to avoid an error
* [a505ed678](https://github.com/gama-platform/gama/commit/a505ed678) - gamalistener add param when reload, add crs in output
* [7f5f1a5a8](https://github.com/gama-platform/gama/commit/7f5f1a5a8) - fixes [#3419](https://github.com/gama-platform/gama/issues/3419)
* [bbd38c85b](https://github.com/gama-platform/gama/commit/bbd38c85b) - [Headless Batch] Doesn't encode URI - Related [#3417](https://github.com/gama-platform/gama/issues/3417)
* [a2114b807](https://github.com/gama-platform/gama/commit/a2114b807) - raw message for tcp server
* [cb23c9213](https://github.com/gama-platform/gama/commit/cb23c9213) - Update GIS Data with .prj file
* [670addd83](https://github.com/gama-platform/gama/commit/670addd83) - allows to load color from OSM data
* [a67b137d6](https://github.com/gama-platform/gama/commit/a67b137d6) - Update ImageUtils.java
* [6800661db](https://github.com/gama-platform/gama/commit/6800661db) - Fixes [#3232](https://github.com/gama-platform/gama/issues/3232) and simplifies some layer operations in OpenGL
* [4128c8462](https://github.com/gama-platform/gama/commit/4128c8462) - Makes sure all flags are logged when they are loaded.
* [b22584674](https://github.com/gama-platform/gama/commit/b22584674) - Avoids an SWT error at the end of experiments
* [96a911186](https://github.com/gama-platform/gama/commit/96a911186) - Reestablishes mouselistener in the SWT-implementation of JOGL displays.
* [19daec602](https://github.com/gama-platform/gama/commit/19daec602) - Adresses an issue of "sticky CTRL key" on macOS
* [3651574bd](https://github.com/gama-platform/gama/commit/3651574bd) - Corrects various issues introduced in the previous commit on NEWT
* [1f2a3f0fa](https://github.com/gama-platform/gama/commit/1f2a3f0fa) - Fixes [#3238](https://github.com/gama-platform/gama/issues/3238).
* [ad4d1d614](https://github.com/gama-platform/gama/commit/ad4d1d614) - try to fix [#3224](https://github.com/gama-platform/gama/issues/3224)
* [eac9f2cf1](https://github.com/gama-platform/gama/commit/eac9f2cf1) - Updates the icon on macOS to adhere to the new standards
* [7855a8c84](https://github.com/gama-platform/gama/commit/7855a8c84) - Complete new implementation of OpenGL displays using NEWT Windows
* [859136f6f](https://github.com/gama-platform/gama/commit/859136f6f) - Fixes [#3236](https://github.com/gama-platform/gama/issues/3236)
* [bb03ec4ef](https://github.com/gama-platform/gama/commit/bb03ec4ef) - fixes [#3236](https://github.com/gama-platform/gama/issues/3236)
* [e904f1773](https://github.com/gama-platform/gama/commit/e904f1773) - fixes [#3035](https://github.com/gama-platform/gama/issues/3035)
* [c6f72a46e](https://github.com/gama-platform/gama/commit/c6f72a46e) - Fixes a blocking bug when opening chart editors (left side properties)
* [88e2146ac](https://github.com/gama-platform/gama/commit/88e2146ac) - Addresses [#3061](https://github.com/gama-platform/gama/issues/3061) by allowing to change the background color of titles
* [7ecd61f91](https://github.com/gama-platform/gama/commit/7ecd61f91) - fixes [#3224](https://github.com/gama-platform/gama/issues/3224)
* [01d96fab2](https://github.com/gama-platform/gama/commit/01d96fab2) - Fixes [#3228](https://github.com/gama-platform/gama/issues/3228)
* [bf803ced0](https://github.com/gama-platform/gama/commit/bf803ced0) - [MAC] Upgrade to XCode 13 Didn't saw that it was installed, but not used...
* [9e9c08416](https://github.com/gama-platform/gama/commit/9e9c08416) - [MAC] Optimisation of mac-sign algo Check .jar file to see if needed to be open to sign files. If not, skip jar
* [a397af0dc](https://github.com/gama-platform/gama/commit/a397af0dc) - [GHA] Small artefact transfert optimization MacOS actions doesn't download every zip made, but just the MacOS' ones. Should save more or less 30 seconds, but make the pipeline cleaner
* [558073abc](https://github.com/gama-platform/gama/commit/558073abc) - [MAC] Fix signing actions upload Forgot the working dir... Sorry
* [a3f2151b7](https://github.com/gama-platform/gama/commit/a3f2151b7) - [MAC] Fix w/ JDK packaging I forgot a crappy little tiny dash.. 🙃🙃🙃
* [f300a357a](https://github.com/gama-platform/gama/commit/f300a357a) - [MAC] Validate plist before signing app
* [caaf9e8c0](https://github.com/gama-platform/gama/commit/caaf9e8c0) - [GHA] Re-Add release command when manually triggered
* [fee008e59](https://github.com/gama-platform/gama/commit/fee008e59) - [GHA] Fix 'ci' build detection
* [17a82fcf7](https://github.com/gama-platform/gama/commit/17a82fcf7) - [TRAVIS] Update release scripts 'thePath' variable is managed outside the script mac releases are .dmg file
* [9bc18a9bd](https://github.com/gama-platform/gama/commit/9bc18a9bd) - [GHA] Exchange artefacts from 'signed' to 'publish' job
* [407c8ae5a](https://github.com/gama-platform/gama/commit/407c8ae5a) - [GHA] Clean mac zip after being extracted
* [0ff7ec595](https://github.com/gama-platform/gama/commit/0ff7ec595) - [RELEASE] Fix script for new Mac dmg
* [5063cb090](https://github.com/gama-platform/gama/commit/5063cb090) - [GHA] Fix missing signing script Missing from build job to sign job
* [547859b64](https://github.com/gama-platform/gama/commit/547859b64) - [GHA] Use variable path in action scripts Not relative broken path anymore
* [44c1c058e](https://github.com/gama-platform/gama/commit/44c1c058e) - [GHA] Clean workspace between two signing
* [dff9a4c26](https://github.com/gama-platform/gama/commit/dff9a4c26) - [MAC] Fix missing entitlements file
* [1a5e810f0](https://github.com/gama-platform/gama/commit/1a5e810f0) - [GHA] Better use secrets And start remove debug splitting
* [225234562](https://github.com/gama-platform/gama/commit/225234562) - [GHA] Split macos certificats steps - debug purpose
* [047c034c9](https://github.com/gama-platform/gama/commit/047c034c9) - Reverts the developments made for #3210 and [#3193](https://github.com/gama-platform/gama/issues/3193)
* [2c9c042c5](https://github.com/gama-platform/gama/commit/2c9c042c5) - Simplifies the creation of fullscreen shells
* [0057f151d](https://github.com/gama-platform/gama/commit/0057f151d) - [GHA] Bring back double dashes probably eaten by macos ;)
* [f759a459c](https://github.com/gama-platform/gama/commit/f759a459c) - [GHA] Doesnt use 'working-directory' cf. https://github.com/actions/upload-artifact/issues/246
* [a654a8ffa](https://github.com/gama-platform/gama/commit/a654a8ffa) - [GHA] Debug display files I make this commit on a terminal from my phone :3
* [865e313e9](https://github.com/gama-platform/gama/commit/865e313e9) - [GHA] Detect build artefacts - n2
* [643c93c51](https://github.com/gama-platform/gama/commit/643c93c51) - [GHA] Detect build artefacts
* [917c6fcef](https://github.com/gama-platform/gama/commit/917c6fcef) - [GHA] Update upload archive env path
* [0d6b74a9f](https://github.com/gama-platform/gama/commit/0d6b74a9f) - [GHA] Manual check bool condition If true == true...
* [3630bca8f](https://github.com/gama-platform/gama/commit/3630bca8f) - [GHA] No encapsulation in steps' if Seems to prevent correct boolean execution
* [062c31a13](https://github.com/gama-platform/gama/commit/062c31a13) - [GHA] Add some verbose debug
* [879566d79](https://github.com/gama-platform/gama/commit/879566d79) - [GHA] Fix if condition syntax
* [4c95046ba](https://github.com/gama-platform/gama/commit/4c95046ba) - [GHA] Fix YAML file indentation
* [66a3a3ced](https://github.com/gama-platform/gama/commit/66a3a3ced) - [GHA] Implement MacOS signing middle job First launch, will probably fail
* [99ef9bcd6](https://github.com/gama-platform/gama/commit/99ef9bcd6) - [GHA] Make zip archive outside publish.sh withJDK is needed to sign with MacOS, so we generate it before
* [3648883f1](https://github.com/gama-platform/gama/commit/3648883f1) - [DEL] Remove useless workflow Accendently added for MacBook
* [00f408b84](https://github.com/gama-platform/gama/commit/00f408b84) - [GHA] Use JDK maven cache option Remove one action, and it'll be maintained
* [b94b7bbe9](https://github.com/gama-platform/gama/commit/b94b7bbe9) - [MacSIGN] Push inactivated apple sign tools I prefer to setup everything from my Linux ;)
* [e9b2d1af5](https://github.com/gama-platform/gama/commit/e9b2d1af5) - [ECLIPSE] Reapply 8013f865f (removed by merge)
* [c8811dc6a](https://github.com/gama-platform/gama/commit/c8811dc6a) - [Eclipse] Fix endline format Switch to standard UTF-8 line the rest of the repo
* [8013f865f](https://github.com/gama-platform/gama/commit/8013f865f) - [ECLIPSE] Remove per os RAM args - Fix [#3220](https://github.com/gama-platform/gama/issues/3220)
* [98e1e9181](https://github.com/gama-platform/gama/commit/98e1e9181) - Prevents views from being asked to close two or more times
* [d05036c75](https://github.com/gama-platform/gama/commit/d05036c75) - Enhancements to remove hidden exceptions in experiments lifecycles
* [f313a033e](https://github.com/gama-platform/gama/commit/f313a033e) - minor fixes
* [dabbb53f5](https://github.com/gama-platform/gama/commit/dabbb53f5) - Fixes [#3210](https://github.com/gama-platform/gama/issues/3210)
* [c1326ba29](https://github.com/gama-platform/gama/commit/c1326ba29) - [traffic] Avoid an exception in `ready_to_cross`
* [7b7d89800](https://github.com/gama-platform/gama/commit/7b7d89800) - [traffic] Remove overridden `die` action as it doesn't work
* [380968c3c](https://github.com/gama-platform/gama/commit/380968c3c) - fixes [#3094](https://github.com/gama-platform/gama/issues/3094)
* [651cac239](https://github.com/gama-platform/gama/commit/651cac239) - verify the 1.8.2 update site ci deploy missed a file
* [7a06ec4e1](https://github.com/gama-platform/gama/commit/7a06ec4e1) - verify the 1.8.2 update site ci deploy
* [08b89d65f](https://github.com/gama-platform/gama/commit/08b89d65f) - Fixes [#3198](https://github.com/gama-platform/gama/issues/3198) by rewiring createAgents() in ExperimentPopulation
* [157f4a5ab](https://github.com/gama-platform/gama/commit/157f4a5ab) - Add a tentative entitlements.plist file
* [fa20941c2](https://github.com/gama-platform/gama/commit/fa20941c2) - Workaround and fix for [#3195](https://github.com/gama-platform/gama/issues/3195).
* [48825ba05](https://github.com/gama-platform/gama/commit/48825ba05) - Resizes ExpandBar+Items asynchronously
* [421afc3d0](https://github.com/gama-platform/gama/commit/421afc3d0) - Removes useless variable
* [f3694a70f](https://github.com/gama-platform/gama/commit/f3694a70f) - Removes useless workaround (for [#2745](https://github.com/gama-platform/gama/issues/2745), not relevant anymore)
* [dd4808059](https://github.com/gama-platform/gama/commit/dd4808059) - Remove further DEBUG messages
* [04c5df346](https://github.com/gama-platform/gama/commit/04c5df346) - Small change in "building heatmap.gaml"
* [a5e57c827](https://github.com/gama-platform/gama/commit/a5e57c827) - Removing debug instructions
* [ac8242313](https://github.com/gama-platform/gama/commit/ac8242313) - Fixes [#3127](https://github.com/gama-platform/gama/issues/3127). gradient now behaves like LinearGradient in Java.
* [ea1527013](https://github.com/gama-platform/gama/commit/ea1527013) - Avoids an NPE when validating literal maps
* [f2f5a12be](https://github.com/gama-platform/gama/commit/f2f5a12be) - [traffic] Re-enable the safety check when crossing intersections
* [2cd38bc72](https://github.com/gama-platform/gama/commit/2cd38bc72) - [BUILD] Downgrade Eclipse base to 2021-03 - Fix [#3199](https://github.com/gama-platform/gama/issues/3199) JOGL doesn't seems to support latest 2021-06 version. Very likely that it'll never do and we will have to change the opengl stack inside GAMA soon
* [e1725d15b](https://github.com/gama-platform/gama/commit/e1725d15b) - Fixes [#3203](https://github.com/gama-platform/gama/issues/3203) by using the ManagementFactory class to retrieve max memory
* [db9e55258](https://github.com/gama-platform/gama/commit/db9e55258) - Fixes [#3204](https://github.com/gama-platform/gama/issues/3204)
* [369d94e32](https://github.com/gama-platform/gama/commit/369d94e32) - [traffic] Remove duplicate geometries in example shapefiles
* [a12551f48](https://github.com/gama-platform/gama/commit/a12551f48) - remove warnings in 2 models of the lib
* [8a3afe7df](https://github.com/gama-platform/gama/commit/8a3afe7df) - [traffic] Rework example models
* [55763ac75](https://github.com/gama-platform/gama/commit/55763ac75) - Fixes [#2980](https://github.com/gama-platform/gama/issues/2980). Tested on two different models.
* [e7488b3fb](https://github.com/gama-platform/gama/commit/e7488b3fb) - Fixes [#2300](https://github.com/gama-platform/gama/issues/2300) by allowing attributes to be specified in inspectors
* [768598f5d](https://github.com/gama-platform/gama/commit/768598f5d) - Completely fixes [#3017](https://github.com/gama-platform/gama/issues/3017). Please test.
* [41d3e9100](https://github.com/gama-platform/gama/commit/41d3e9100) - Completely closes [#3141](https://github.com/gama-platform/gama/issues/3141) by removing the non-existing var `messages`
* [3a7dd81de](https://github.com/gama-platform/gama/commit/3a7dd81de) - Fixes [#3194](https://github.com/gama-platform/gama/issues/3194). Please test.
* [4a68ba22a](https://github.com/gama-platform/gama/commit/4a68ba22a) - Fixes [#3190](https://github.com/gama-platform/gama/issues/3190) (again) by hiding meshes when inspecting
* [c8b479173](https://github.com/gama-platform/gama/commit/c8b479173) - Moves PlatformHelper to core and DPIHelper to ui.shared
* [1ef4cc4b7](https://github.com/gama-platform/gama/commit/1ef4cc4b7) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [b970549da](https://github.com/gama-platform/gama/commit/b970549da) - Add a run(Callable&lt;T>) to WorkbenchHelper
* [387593746](https://github.com/gama-platform/gama/commit/387593746) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [dc2db7ba9](https://github.com/gama-platform/gama/commit/dc2db7ba9) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [eccc90cf5](https://github.com/gama-platform/gama/commit/eccc90cf5) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [7741c686a](https://github.com/gama-platform/gama/commit/7741c686a) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [1eb390fb6](https://github.com/gama-platform/gama/commit/1eb390fb6) - Gets rid of the blind usage of WorkbenchHelper.getSheet();
* [cfccfe7c6](https://github.com/gama-platform/gama/commit/cfccfe7c6) - Revert "Moves DPIHelper and ViewsHelper to ui.shared, PlatformHelper to core."
* [5b6d4c686](https://github.com/gama-platform/gama/commit/5b6d4c686) - Removes the shared target platform
* [89d50e2b7](https://github.com/gama-platform/gama/commit/89d50e2b7) - Moves DPIHelper and ViewsHelper to ui.shared, PlatformHelper to core.
* [2917630db](https://github.com/gama-platform/gama/commit/2917630db) - Changes the default update site
* [d16d3842f](https://github.com/gama-platform/gama/commit/d16d3842f) - [traffic] Fix inconsitencies when updating vars
* [9b0140de9](https://github.com/gama-platform/gama/commit/9b0140de9) - [traffic] Revert "add info on the fact that there is still a road in random drive"
* [d1221151c](https://github.com/gama-platform/gama/commit/d1221151c) - [Genstar] fix generate validator with genstar_pop_generator
* [ed622574e](https://github.com/gama-platform/gama/commit/ed622574e) - [HL] Fix XML generation Don't turn output file.xml into a folder anymore
* [c1b3c5f32](https://github.com/gama-platform/gama/commit/c1b3c5f32) - [DEPENDENCIES] Remove useless included features Revert most of ba71ec4152e8f61c9a7a668a98c1d8c588627ab4
* [78f9e9b3b](https://github.com/gama-platform/gama/commit/78f9e9b3b) - [HL-wrap] Update headless wrapper flags
* [64e2f9a38](https://github.com/gama-platform/gama/commit/64e2f9a38) - [HL] Remove usused/useless 'ext' folder
* [44a8a94fa](https://github.com/gama-platform/gama/commit/44a8a94fa) - [GHA] Use same JDK-OpenJ9
* [ba71ec415](https://github.com/gama-platform/gama/commit/ba71ec415) - [GHA] Add plugin in feature dependencies Revert 6aa07d576e66c0e726dca6335f992559da84c6c5
* [ed668d43a](https://github.com/gama-platform/gama/commit/ed668d43a) - [FIX GHA] Configuration version not 1.8.2 yet neither...
* [b348f55c9](https://github.com/gama-platform/gama/commit/b348f55c9) - [FIX GHA] GamaApplication not 1.8.2 yet
* [30b64d355](https://github.com/gama-platform/gama/commit/30b64d355) - [GHA] Fix product for linux start
* [4637e48f0](https://github.com/gama-platform/gama/commit/4637e48f0) - [GHA] Validate use gama-headless.sh helper Should prevent missing libraries and other problems
* [6fa757c02](https://github.com/gama-platform/gama/commit/6fa757c02) - [BUILD] Upgrade base eclipse version Bump from 2021-03 to 2021-06
* [d003fc5af](https://github.com/gama-platform/gama/commit/d003fc5af) - [BUILD] Upgrade Tycho version Bump from 2.2.0 to 2.4.0
* [147c1051d](https://github.com/gama-platform/gama/commit/147c1051d) - [GHA] Display full compilation log ci clean
* [7e087573f](https://github.com/gama-platform/gama/commit/7e087573f) - Removes useless (?) features from the gama.dependencies feature
* [6e2a723a6](https://github.com/gama-platform/gama/commit/6e2a723a6) - Fix [#3107](https://github.com/gama-platform/gama/issues/3107) adding more documentation on pedestrian_network_generation operator
* [a3e25491e](https://github.com/gama-platform/gama/commit/a3e25491e) - [GHA] Raise bash error after cat log
* [b15763d59](https://github.com/gama-platform/gama/commit/b15763d59) - [GHA] Display logs when validate fail
* [bfffd0ae0](https://github.com/gama-platform/gama/commit/bfffd0ae0) - Simplifies separators in toolbars. Corrects memory setting in product
* [430c8100c](https://github.com/gama-platform/gama/commit/430c8100c) - Second fix for [#3189](https://github.com/gama-platform/gama/issues/3189) (regarding separators in other toolbars)
* [93b1e0ea0](https://github.com/gama-platform/gama/commit/93b1e0ea0) - Fixes [#3184](https://github.com/gama-platform/gama/issues/3184). Temporary solution, which does the job.
* [a93560409](https://github.com/gama-platform/gama/commit/a93560409) - Let display toolbars adopt the color of the background by default
* [bbded0b7d](https://github.com/gama-platform/gama/commit/bbded0b7d) - Fixes [#3191](https://github.com/gama-platform/gama/issues/3191) since nobody seems to be willing to ...
* [b0e7d5111](https://github.com/gama-platform/gama/commit/b0e7d5111) - Fixes [#3186](https://github.com/gama-platform/gama/issues/3186)
* [6e0de1b20](https://github.com/gama-platform/gama/commit/6e0de1b20) - Bumps ummisco.gama.annotions to JDK 11
* [2da8d796e](https://github.com/gama-platform/gama/commit/2da8d796e) - Corrects wrong size of buttons when clicked and exited
* [35a2fd3db](https://github.com/gama-platform/gama/commit/35a2fd3db) - Improves toolbar appearance for Windows
* [a029a4936](https://github.com/gama-platform/gama/commit/a029a4936) - More work on dark/light themes and toolbars
* [0ee44821d](https://github.com/gama-platform/gama/commit/0ee44821d) - Tries to get rid of an annoying error regarding the version of ANTLR
* [5df7f4853](https://github.com/gama-platform/gama/commit/5df7f4853) - Improves  the display of icons on Windows
* [8b5061d2a](https://github.com/gama-platform/gama/commit/8b5061d2a) - Fixes [#3189](https://github.com/gama-platform/gama/issues/3189) and the issue of different heights of buttons in editor
* [21416fd74](https://github.com/gama-platform/gama/commit/21416fd74) - Trying to fix Github Actions and Tycho
* [e10048d7d](https://github.com/gama-platform/gama/commit/e10048d7d) - Tries to fix Travis compilation
* [50bdbf056](https://github.com/gama-platform/gama/commit/50bdbf056) - Addresses [#3190](https://github.com/gama-platform/gama/issues/3190). Please test !
* [6aa07d576](https://github.com/gama-platform/gama/commit/6aa07d576) - Correctly labels the swt fragment for macOS in the feature
* [767e2aa91](https://github.com/gama-platform/gama/commit/767e2aa91) - Various enhancements:
* [913ea6249](https://github.com/gama-platform/gama/commit/913ea6249) - Fixes [#3187](https://github.com/gama-platform/gama/issues/3187) with an explicit flag to turn off the "new style" tabs
* [3aa8de677](https://github.com/gama-platform/gama/commit/3aa8de677) - Addresses #3180, #3138, #3184 and [#2990](https://github.com/gama-platform/gama/issues/2990)
* [67740f876](https://github.com/gama-platform/gama/commit/67740f876) - [HL] Update wrapper script for linux \& mac
* [f9f09e1bc](https://github.com/gama-platform/gama/commit/f9f09e1bc) - [HL Batch] Add throws exception for new Batch Runner
* [acee76530](https://github.com/gama-platform/gama/commit/acee76530) - [HL Batch] Remove doubled function Probably caused by a the [#3171](https://github.com/gama-platform/gama/issues/3171) PR merge
* [ead98a2ae](https://github.com/gama-platform/gama/commit/ead98a2ae) - Merge pull request [#3188](https://github.com/gama-platform/gama/issues/3188) from ndgnuh/write-xmi
* [f59ae1bca](https://github.com/gama-platform/gama/commit/f59ae1bca) - Addresses [#3187](https://github.com/gama-platform/gama/issues/3187) by putting back separations between tabs using CSS
* [9ae088dd0](https://github.com/gama-platform/gama/commit/9ae088dd0) - Forces showing the memory monitor.
* [fe73001b9](https://github.com/gama-platform/gama/commit/fe73001b9) - improve the robustness in shapefile reading while testing geom validity
* [03a68d490](https://github.com/gama-platform/gama/commit/03a68d490) - Fixes [#2313](https://github.com/gama-platform/gama/issues/2313)
* [46af3c878](https://github.com/gama-platform/gama/commit/46af3c878) - Extends fix to [#3180](https://github.com/gama-platform/gama/issues/3180) to other environments
* [179c525cf](https://github.com/gama-platform/gama/commit/179c525cf) - A first attempt to solve [#3180](https://github.com/gama-platform/gama/issues/3180). Needs more thorough testing.
* [4681192ec](https://github.com/gama-platform/gama/commit/4681192ec) - add info on the fact that there is still a road in random drive
* [96a63c5dd](https://github.com/gama-platform/gama/commit/96a63c5dd) - Addresses [#3180](https://github.com/gama-platform/gama/issues/3180) by synchronizing SWT and AWT threads when opening a menu
* [a9fe99b12](https://github.com/gama-platform/gama/commit/a9fe99b12) - Forgets about the /doc/ local folder
* [0451ffe33](https://github.com/gama-platform/gama/commit/0451ffe33) - Gets rid of local files that should not be committed
* [e79a7b516](https://github.com/gama-platform/gama/commit/e79a7b516) - Fixes [#2987](https://github.com/gama-platform/gama/issues/2987) and simplifies the management of layers
* [d52f0a8bf](https://github.com/gama-platform/gama/commit/d52f0a8bf) - fixes [#3175](https://github.com/gama-platform/gama/issues/3175)
* [99e2611c7](https://github.com/gama-platform/gama/commit/99e2611c7) - Adds a short life CRS cache to solve issue [#3020](https://github.com/gama-platform/gama/issues/3020).
* [581987acf](https://github.com/gama-platform/gama/commit/581987acf) - Hopefully fixes [#2915](https://github.com/gama-platform/gama/issues/2915) by harmonizing the access to actions documentation
* [c7d51264a](https://github.com/gama-platform/gama/commit/c7d51264a) - Removes temporarily the compression/uncompression of documentation
* [011506daf](https://github.com/gama-platform/gama/commit/011506daf) - Cosmetic changes related to [#2915](https://github.com/gama-platform/gama/issues/2915)
* [4e06fdf5c](https://github.com/gama-platform/gama/commit/4e06fdf5c) - Makes sure that all actions are returned by AbstractGamlAdditions
* [0dad5aa15](https://github.com/gama-platform/gama/commit/0dad5aa15) - Tries to fix [#3141](https://github.com/gama-platform/gama/issues/3141). "mailbox" and "messages" are actually synonyms.
* [2bed20aa9](https://github.com/gama-platform/gama/commit/2bed20aa9) - Reinforces the guarding against exceptions in parameters
* [3129e4975](https://github.com/gama-platform/gama/commit/3129e4975) - Helps understanding [#3016](https://github.com/gama-platform/gama/issues/3016) by reporting the faulty file names
* [de7cde620](https://github.com/gama-platform/gama/commit/de7cde620) - Fixes #3043 (old bug linked to [#2367](https://github.com/gama-platform/gama/issues/2367))
* [39aea54e7](https://github.com/gama-platform/gama/commit/39aea54e7) - Fixes Issue [#3114](https://github.com/gama-platform/gama/issues/3114) by adding a platform wide menu for "New ... "
* [871086cc3](https://github.com/gama-platform/gama/commit/871086cc3) - fixes an issue in the driving skill
* [5ea4eaabf](https://github.com/gama-platform/gama/commit/5ea4eaabf) - fixes an issue with randomdrive and road without any following roads
* [7a576c4d0](https://github.com/gama-platform/gama/commit/7a576c4d0) - fixes several issue related to batch and explicit explo method
* [bae27549f](https://github.com/gama-platform/gama/commit/bae27549f) - Update ExperimentPlan.java
* [124d730a1](https://github.com/gama-platform/gama/commit/124d730a1) - Merge pull request [#3171](https://github.com/gama-platform/gama/issues/3171) from gama-platform/GAMA_1.8.2_headless
* [0c64cc945](https://github.com/gama-platform/gama/commit/0c64cc945) - improve robustness of pedestrian path construction
* [f6c412a66](https://github.com/gama-platform/gama/commit/f6c412a66) - fixes an issue with ColorBrewer
* [d7481becf](https://github.com/gama-platform/gama/commit/d7481becf) - offer the possibility to start a local search from a given init sol
* [a2c2f0490](https://github.com/gama-platform/gama/commit/a2c2f0490) - fixes an error with batch (exhaustive exploration)
* [d2724589f](https://github.com/gama-platform/gama/commit/d2724589f) - improve batch mode in free mode
* [ff7a8c428](https://github.com/gama-platform/gama/commit/ff7a8c428) - fixes a minor issue with genetic algorithm
* [d9984a1d6](https://github.com/gama-platform/gama/commit/d9984a1d6) - fixes an issue with genetic algorithms
* [54c740079](https://github.com/gama-platform/gama/commit/54c740079) - [HL-Batch] Remove headless parallel simulation Allow to have same batch parallel simulations as in gui + Function never check by the 'classical' headless mode (with XML files)
* [f0717acff](https://github.com/gama-platform/gama/commit/f0717acff) - Update GamaExecutorService.java
* [8ed7959e3](https://github.com/gama-platform/gama/commit/8ed7959e3) - first step to parallelize simulations with different parameter set in batch mode
* [615c796e9](https://github.com/gama-platform/gama/commit/615c796e9) - try to improve the robustness of shapefile read
* [19fd59e92](https://github.com/gama-platform/gama/commit/19fd59e92) - fixes an issue with genetic algorithm
* [5d08e9c7e](https://github.com/gama-platform/gama/commit/5d08e9c7e) - [HL] set 'workspaceCreate' for new batch command
* [2af799f8c](https://github.com/gama-platform/gama/commit/2af799f8c) - Fixes [#3169](https://github.com/gama-platform/gama/issues/3169). Emits warnings for parameters with the same display name
* [09bd85c79](https://github.com/gama-platform/gama/commit/09bd85c79) - Handles (silences) harmless exceptions in the main app loop.
* [5483686c0](https://github.com/gama-platform/gama/commit/5483686c0) - Add "tutorial" to the keywords
* [71eabbb0f](https://github.com/gama-platform/gama/commit/71eabbb0f) - Avoids a warning because of the deprecation of JApplet
* [906d45ae4](https://github.com/gama-platform/gama/commit/906d45ae4) - Add an error msg when a road is too narrow
* [26a6d2d24](https://github.com/gama-platform/gama/commit/26a6d2d24) - update model about  spatial queries  to cover all the added  operators
* [36606060f](https://github.com/gama-platform/gama/commit/36606060f) - Fixes an issue in the executor
* [d21446a33](https://github.com/gama-platform/gama/commit/d21446a33) - Cleans the code of simulation Executors and makes it easier to be reused
* [382589b32](https://github.com/gama-platform/gama/commit/382589b32) - Allow moving across > 2 road segments in 1 step
* [8790a8000](https://github.com/gama-platform/gama/commit/8790a8000) - Removes the dependency to SimulationPopulation in SimulationRunner
* [9c3db49d6](https://github.com/gama-platform/gama/commit/9c3db49d6) - [HL-Batch] Use max concurrency
* [a4da4f346](https://github.com/gama-platform/gama/commit/a4da4f346) - Fix for [#3156](https://github.com/gama-platform/gama/issues/3156); freezes the GL animator when in modeling perspective
* [9a72a9b48](https://github.com/gama-platform/gama/commit/9a72a9b48) - Corrects a bug where a variable would be incorrectly updated
* [5f29cd34d](https://github.com/gama-platform/gama/commit/5f29cd34d) - Uses a Directed Acyclic Graph for the hierarchy of species
* [bc9348455](https://github.com/gama-platform/gama/commit/bc9348455) - Improves the behavior of the single-threaded animator when paused.
* [8d0cbe631](https://github.com/gama-platform/gama/commit/8d0cbe631) - Should completely fix [#3068](https://github.com/gama-platform/gama/issues/3068).
* [e0db9efef](https://github.com/gama-platform/gama/commit/e0db9efef) - Adds the source code of JGraphT
* [d23511d54](https://github.com/gama-platform/gama/commit/d23511d54) - add an action in the driving skill to force a move
* [09cc6c315](https://github.com/gama-platform/gama/commit/09cc6c315) - Optimizes and improves the detection of cycles between variables
* [318daa345](https://github.com/gama-platform/gama/commit/318daa345) - In the scope of [#3068](https://github.com/gama-platform/gama/issues/3068): moves ordering of variables to GamaPopulation
* [0d4f304f6](https://github.com/gama-platform/gama/commit/0d4f304f6) - Improves the handling of points and dates in batch explorations (#3019)
* [20cb96099](https://github.com/gama-platform/gama/commit/20cb96099) - Adds a method to RandomUtils to draw a random point
* [a32acc56f](https://github.com/gama-platform/gama/commit/a32acc56f) - Reenables the editing of models
* [87a84b8ef](https://github.com/gama-platform/gama/commit/87a84b8ef) - Adds a flag allowing to block the editing of model files in GAML editor
* [a31ae4d72](https://github.com/gama-platform/gama/commit/a31ae4d72) - #2946. Addition of regex_matches/match_regex
* [0e09e8fce](https://github.com/gama-platform/gama/commit/0e09e8fce) - Fixes [#2313](https://github.com/gama-platform/gama/issues/2313) by allowing composed rename operations
* [9d4054772](https://github.com/gama-platform/gama/commit/9d4054772) - Adjust IDM formula
* [459548b1c](https://github.com/gama-platform/gama/commit/459548b1c) - Fixes [#3047](https://github.com/gama-platform/gama/issues/3047) by supporting saving consoles to log files
* [b8cfde451](https://github.com/gama-platform/gama/commit/b8cfde451) - Fixes a stack overflow error in reading gama (agent) attributes
* [95689dc82](https://github.com/gama-platform/gama/commit/95689dc82) - Corrects an issue where adding species would not return a IPopulationSet
* [dc1c6439a](https://github.com/gama-platform/gama/commit/dc1c6439a) - Produces initial doc template as a .md file (not .html anymore)
* [e40257d35](https://github.com/gama-platform/gama/commit/e40257d35) - Allow users to choose lanes manualy on new road
* [bff81c112](https://github.com/gama-platform/gama/commit/bff81c112) - Amend 8aaf8dd4d8f1b3989180bcbfc0fdd50e33658ede
* [73301554f](https://github.com/gama-platform/gama/commit/73301554f) - Follow up of ef2afea006a48695b6bd089c414a0f4a9797f666
* [43b0f674e](https://github.com/gama-platform/gama/commit/43b0f674e) - Follow up
* [ef2afea00](https://github.com/gama-platform/gama/commit/ef2afea00) - Adds new verifications to the processor
* [5f2a301fe](https://github.com/gama-platform/gama/commit/5f2a301fe) - Several additions to the new display sync mechanism
* [9b3df8fc3](https://github.com/gama-platform/gama/commit/9b3df8fc3) - Removes misleading message when cloning workspace
* [89ce978ad](https://github.com/gama-platform/gama/commit/89ce978ad) - Correctly applies new preferences to the last workspace(s); see [#3115](https://github.com/gama-platform/gama/issues/3115)
* [b48823283](https://github.com/gama-platform/gama/commit/b48823283) - Better handles number format issues in preferences passed as parameters
* [3aebaeb57](https://github.com/gama-platform/gama/commit/3aebaeb57) - Allows preferences to be overriden if passed as VM arguments to GAMA
* [ca55bd325](https://github.com/gama-platform/gama/commit/ca55bd325) - Remove extra brace
* [8aaf8dd4d](https://github.com/gama-platform/gama/commit/8aaf8dd4d) - Fix a bug when finding leaders
* [01f3d3383](https://github.com/gama-platform/gama/commit/01f3d3383) - Reverses the logic by replacing "no_logging" with "enable_logging"
* [b7a89d83f](https://github.com/gama-platform/gama/commit/b7a89d83f) - Adds the "no_logging" flag (formerly GLOBAL_OFF flag in DEBUG)
* [18455e0a3](https://github.com/gama-platform/gama/commit/18455e0a3) - Allows to read flags from vm args / system properties
* [c869860cf](https://github.com/gama-platform/gama/commit/c869860cf) - Refactor traffic plugin
* [886a9fa6d](https://github.com/gama-platform/gama/commit/886a9fa6d) - Several bits of additions (see warning below):
* [7c7693da7](https://github.com/gama-platform/gama/commit/7c7693da7) - Fix another linked road issue
* [43eb9aa1d](https://github.com/gama-platform/gama/commit/43eb9aa1d) - Make `unregister` an action in driving skill
* [38041245b](https://github.com/gama-platform/gama/commit/38041245b) - [CI] Manual workflow trigger deploy new release test 2 - Setting a custom commit-message variable (TRAVIS_MSG) and setting it with a conditional step
* [8345987a7](https://github.com/gama-platform/gama/commit/8345987a7) - [CI] Manual workflow trigger deploy new release test 2 - Change script parameter value
* [090a12444](https://github.com/gama-platform/gama/commit/090a12444) - [CI] Manual workflow trigger deploy new release test 1
* [09351f25b](https://github.com/gama-platform/gama/commit/09351f25b) - Fix a bug relating to IDM
* [7d224fb0a](https://github.com/gama-platform/gama/commit/7d224fb0a) - Fix some issues with `findLeader`
* [77b6fa736](https://github.com/gama-platform/gama/commit/77b6fa736) - Initialize `vehicle_ordering` in its getter
* [8d8d8eb92](https://github.com/gama-platform/gama/commit/8d8d8eb92) - Amend 52f5c9b1cdc8b4a85b927fa411bf686036f27d4d
* [8d9a66ab1](https://github.com/gama-platform/gama/commit/8d9a66ab1) - Refactor `findLeader` and `findFollower`
* [fd2d4b47f](https://github.com/gama-platform/gama/commit/fd2d4b47f) - Solve an issue where 2 threads would get locked at startup
* [1e5d50d8b](https://github.com/gama-platform/gama/commit/1e5d50d8b) - Simplifies the "old" sync strategy and prevents an error in the "new"
* [8e31eaae3](https://github.com/gama-platform/gama/commit/8e31eaae3) - Fix vehicles using linked road when proba=0.0
* [6419f1486](https://github.com/gama-platform/gama/commit/6419f1486) - Bumps LibBulletJME to 11.0.0
* [7954606ed](https://github.com/gama-platform/gama/commit/7954606ed) - Simplifies the synchronization of displays.
* [52f5c9b1c](https://github.com/gama-platform/gama/commit/52f5c9b1c) - change a bit the behavior of external_factor action (driving skill)
* [db141c1b5](https://github.com/gama-platform/gama/commit/db141c1b5) - remove arraylist and hashset for driving skill
* [ab69639c0](https://github.com/gama-platform/gama/commit/ab69639c0) - Removes debug code
* [a8a15eac3](https://github.com/gama-platform/gama/commit/a8a15eac3) - First tentative to fix [#3161](https://github.com/gama-platform/gama/issues/3161).
* [3ce225a87](https://github.com/gama-platform/gama/commit/3ce225a87) - Temp fix for `findFollower`
* [7ddb9ebbc](https://github.com/gama-platform/gama/commit/7ddb9ebbc) - add a new parameter for buffer: single sided
* [1b7fa3abc](https://github.com/gama-platform/gama/commit/1b7fa3abc) - Sets the default FPS to 60
* [f55cd9ef7](https://github.com/gama-platform/gama/commit/f55cd9ef7) - Change how leaders/followers are found in `advanced_driving` skill (#3160)
* [dd43c11af](https://github.com/gama-platform/gama/commit/dd43c11af) - fixes [#3151](https://github.com/gama-platform/gama/issues/3151)
* [e23da0893](https://github.com/gama-platform/gama/commit/e23da0893) - modification to avoid stuck vehicles (overlapping case)
* [f9a5c9223](https://github.com/gama-platform/gama/commit/f9a5c9223) - Fixes issue [#3103](https://github.com/gama-platform/gama/issues/3103).
* [8f3103b96](https://github.com/gama-platform/gama/commit/8f3103b96) - fixes an error in a pedestrian model
* [2a86ae6b6](https://github.com/gama-platform/gama/commit/2a86ae6b6) - change name of some attributes in pedestrian skill
* [60cfb66a1](https://github.com/gama-platform/gama/commit/60cfb66a1) - [LIB] Fix  [#3159](https://github.com/gama-platform/gama/issues/3159) Rename 'Mondiran' to 'Mondrian'
* [8bc1df146](https://github.com/gama-platform/gama/commit/8bc1df146) - Casting a matrix&lt;int> into matrix&lt;float> wrongfully returned a field
* [5ed78e875](https://github.com/gama-platform/gama/commit/5ed78e875) - The serialization of matrices wrongfully displayed the list of rows
* [c7cc59fb6](https://github.com/gama-platform/gama/commit/c7cc59fb6) - Fixes a bug in the computation of lazy arguments
* [1737aa206](https://github.com/gama-platform/gama/commit/1737aa206) - Wrong compilation error when no arguments were provided to an operator
* [ca440a908](https://github.com/gama-platform/gama/commit/ca440a908) - Fixes [#3157](https://github.com/gama-platform/gama/issues/3157). listValu() was using the wrong field (dayOfWeek())
* [84f57b29a](https://github.com/gama-platform/gama/commit/84f57b29a) - Improves the computation time of spatial indexes
* [40a90a6ae](https://github.com/gama-platform/gama/commit/40a90a6ae) - fixes an issue with overlapping vehicles.
* [9cb7dda71](https://github.com/gama-platform/gama/commit/9cb7dda71) - Adjust the error msg in 1930973
* [193097314](https://github.com/gama-platform/gama/commit/193097314) - Fix vertex issue in `compute_path`
* [1d0243c36](https://github.com/gama-platform/gama/commit/1d0243c36) - fixes failed tests with touches and partiallyOverlapping
* [0a08e0b2d](https://github.com/gama-platform/gama/commit/0a08e0b2d) - fixes an issue with point and partiallyOverlapping and touches
* [090f730ce](https://github.com/gama-platform/gama/commit/090f730ce) - add a test to avoid a nullpointerException
* [af39e4043](https://github.com/gama-platform/gama/commit/af39e4043) - try to fix gha, remove ecf specific repo
* [73eaf38c6](https://github.com/gama-platform/gama/commit/73eaf38c6) - fixes [#3153](https://github.com/gama-platform/gama/issues/3153)
* [c2bbfe511](https://github.com/gama-platform/gama/commit/c2bbfe511) - Introduces the visitor pattern in spatial indices.
* [7a717ec52](https://github.com/gama-platform/gama/commit/7a717ec52) - Adds a common IIntersectable interface to GamaPoint and Envelope3D
* [e40f2cb7e](https://github.com/gama-platform/gama/commit/e40f2cb7e) - Cuts release of ICollector instances from the pool when pooling is off
* [11ed4cbc5](https://github.com/gama-platform/gama/commit/11ed4cbc5) - Prevents a possible NPE in RandomUtils
* [048d899af](https://github.com/gama-platform/gama/commit/048d899af) - Fixes [#3154](https://github.com/gama-platform/gama/issues/3154). '<' and '<=' shared the same algorithm.
* [ac354799b](https://github.com/gama-platform/gama/commit/ac354799b) - Add a new batch algorithm (PSO)
* [26955355f](https://github.com/gama-platform/gama/commit/26955355f) - fixes [#3152](https://github.com/gama-platform/gama/issues/3152)
* [e17b52cc1](https://github.com/gama-platform/gama/commit/e17b52cc1) - [LIB] Fix warning library models Remove explicit 'nil' init value
* [5fdeae9f9](https://github.com/gama-platform/gama/commit/5fdeae9f9) - Deprecates ILocation and removes all of its uses (replace by GamaPoint)
* [330679ee9](https://github.com/gama-platform/gama/commit/330679ee9) - #3150
* [f6da3ef76](https://github.com/gama-platform/gama/commit/f6da3ef76) - Allows certain global variables to be declared as const
* [7b8e680b1](https://github.com/gama-platform/gama/commit/7b8e680b1) - Removes warning produced by point and data variables
* [6c4230328](https://github.com/gama-platform/gama/commit/6c4230328) - Removes further indivual project preferences
* [eb300e5bd](https://github.com/gama-platform/gama/commit/eb300e5bd) - Removes specific preferences for project compilation
* [76dc9af7e](https://github.com/gama-platform/gama/commit/76dc9af7e) - Removes specific project settings
* [f766f0d20](https://github.com/gama-platform/gama/commit/f766f0d20) - Tries to pass all plugins to a Java SE-11 compliance.
* [8349a3c14](https://github.com/gama-platform/gama/commit/8349a3c14) - Removes warnings about unused variables
* [a9937a985](https://github.com/gama-platform/gama/commit/a9937a985) - Simplifies the superclass call when no parameter in editors
* [71907c449](https://github.com/gama-platform/gama/commit/71907c449) - Replaces an == comparison between Strings by equals
* [d57d08b67](https://github.com/gama-platform/gama/commit/d57d08b67) - Removes a useless call to Math.round(...)
* [d21d537a4](https://github.com/gama-platform/gama/commit/d21d537a4) - Makes sure GAML Xtext poolSet can be accessed by several threads
* [fcb59f09f](https://github.com/gama-platform/gama/commit/fcb59f09f) - Tunes parameters for performance (30% gain on GAML compilation)
* [a950a8ec4](https://github.com/gama-platform/gama/commit/a950a8ec4) - Improves the access to JBox2D (still not functional) instead of Bullet
* [d0e39d90e](https://github.com/gama-platform/gama/commit/d0e39d90e) - Workarounds some issues on HiDPI screens
* [e673be383](https://github.com/gama-platform/gama/commit/e673be383) - Should address most (if not all) of the issues in [#3146](https://github.com/gama-platform/gama/issues/3146)
* [ca45425da](https://github.com/gama-platform/gama/commit/ca45425da) - Some changes to the OpenGL displays:
* [200469836](https://github.com/gama-platform/gama/commit/200469836) - propose 2 implementations of SFM
* [1ed2722f4](https://github.com/gama-platform/gama/commit/1ed2722f4) - First step into the transformation of value "editors": speed
* [90bcf02d8](https://github.com/gama-platform/gama/commit/90bcf02d8) - Fix another division by zero, related to [#3112](https://github.com/gama-platform/gama/issues/3112)
* [b44ebffec](https://github.com/gama-platform/gama/commit/b44ebffec) - Simplification of the parameters / preferences views
* [6ed464047](https://github.com/gama-platform/gama/commit/6ed464047) - Corrects glitches in slides, point editors and backgrounds of expression
* [1979d87eb](https://github.com/gama-platform/gama/commit/1979d87eb) - Work on the positioning/ of sliders and toolbars in parameters
* [63592ea6e](https://github.com/gama-platform/gama/commit/63592ea6e) - fixes [#3140](https://github.com/gama-platform/gama/issues/3140)
* [fdf07733a](https://github.com/gama-platform/gama/commit/fdf07733a) - Reorganization of the value editors (addition of EditorToolbar)
* [6e8ece36a](https://github.com/gama-platform/gama/commit/6e8ece36a) - More improvements to the management of fonts and colors
* [856753187](https://github.com/gama-platform/gama/commit/856753187) - Generalizes the toggles for expandable items
* [711efca5c](https://github.com/gama-platform/gama/commit/711efca5c) - More simplifications of the drawing of flat buttons
* [ffa059b72](https://github.com/gama-platform/gama/commit/ffa059b72) - Works around the problem of missing text in buttons on Windows
* [331b7b942](https://github.com/gama-platform/gama/commit/331b7b942) - More experiments with fonts, sizes, bounds and buttons
* [0ce1fb67c](https://github.com/gama-platform/gama/commit/0ce1fb67c) - More experiments with default button heights
* [049ee01ea](https://github.com/gama-platform/gama/commit/049ee01ea) - More changes related to button heights
* [1906c95e8](https://github.com/gama-platform/gama/commit/1906c95e8) - More changes related to the removal of custom fonts.
* [5d617d1db](https://github.com/gama-platform/gama/commit/5d617d1db) - Various simplifications related to fonts in the UI
* [7a2d5b678](https://github.com/gama-platform/gama/commit/7a2d5b678) - Removes custom fonts from all the places they have been used
* [ee81d0844](https://github.com/gama-platform/gama/commit/ee81d0844) - A first simplification of the navigator: removal of custom font sizes
* [995a6bac1](https://github.com/gama-platform/gama/commit/995a6bac1) - Fixes [#3132](https://github.com/gama-platform/gama/issues/3132) (considering torus environment in field).
* [c048a9987](https://github.com/gama-platform/gama/commit/c048a9987) - Multiple changes in variables, parameters, UI & UI themes:
* [bc95a9593](https://github.com/gama-platform/gama/commit/bc95a9593) - Fixes [#3134](https://github.com/gama-platform/gama/issues/3134) by restoring the SVGSalamander library.
* [f4aa55ef2](https://github.com/gama-platform/gama/commit/f4aa55ef2) - [Genstar] add more doc details
* [feb95e056](https://github.com/gama-platform/gama/commit/feb95e056) - [Operator] add cartesian_product operator to combine a list of lists
* [335f921d5](https://github.com/gama-platform/gama/commit/335f921d5) - [Genstar] add generator from matrix - still need to understand how to make reference to specise attributes in facets, rather than string
* [72bb45c8c](https://github.com/gama-platform/gama/commit/72bb45c8c) - [model lib] add minimal fields examples in data type and structure model folder
* [c96b5577f](https://github.com/gama-platform/gama/commit/c96b5577f) - A rudimentary untested color provider using RGB bands to display fields.
* [9f366ce8b](https://github.com/gama-platform/gama/commit/9f366ce8b) - Adds a number of options and functions to 'field' and 'mesh'
* [982b0af0a](https://github.com/gama-platform/gama/commit/982b0af0a) - Fixes a bug with color statistics
* [95777eb80](https://github.com/gama-platform/gama/commit/95777eb80) - Removal of the (unused) plugin graphanalysis
* [0ff4ed9fe](https://github.com/gama-platform/gama/commit/0ff4ed9fe) - Add graph clustering operators (and an example model).
* [f15a0a854](https://github.com/gama-platform/gama/commit/f15a0a854) - remove useless file (false commited)
* [ea8783e2a](https://github.com/gama-platform/gama/commit/ea8783e2a) - Add a new model to generate an environment
* [75f780031](https://github.com/gama-platform/gama/commit/75f780031) - [GITIGNORE] Clean up useless doublon Ping kévin ;)
* [36167f40e](https://github.com/gama-platform/gama/commit/36167f40e) - [Genstar] add .* files of the native genstar plugin
* [b9f6d79e6](https://github.com/gama-platform/gama/commit/b9f6d79e6) - git pushMerge branch 'GAMA_1.8.2' of github.com:gama-platform/gama into GAMA_1.8.2
* [8f9d65778](https://github.com/gama-platform/gama/commit/8f9d65778) - [GHA] Try to fix compilation Unpacking 'simtools.gaml.extensions.physics' plugin
* [e80151bb4](https://github.com/gama-platform/gama/commit/e80151bb4) - remove useless jar (jgrapht)
* [1e4a47a68](https://github.com/gama-platform/gama/commit/1e4a47a68) - add a new model example for exporting graph
* [f92e8a5bf](https://github.com/gama-platform/gama/commit/f92e8a5bf) - new possibility in the save statement: possibility to export graphs
* [bc4e8c72d](https://github.com/gama-platform/gama/commit/bc4e8c72d) - [Genstar] extension prototype that provide new generate statement
* [75a889940](https://github.com/gama-platform/gama/commit/75a889940) - fixes an warning un a model (Agent movement)
* [74c0d5638](https://github.com/gama-platform/gama/commit/74c0d5638) - New layout algorithms
* [cf587fa95](https://github.com/gama-platform/gama/commit/cf587fa95) - improve shortest path computation (new algorithms)
* [48db2b9d4](https://github.com/gama-platform/gama/commit/48db2b9d4) - Fixes an annoying bug where GAMA would not remember the workspace
* [5a124fbb1](https://github.com/gama-platform/gama/commit/5a124fbb1) - Should allow loading native libraries more easily.
* [ed7d144b9](https://github.com/gama-platform/gama/commit/ed7d144b9) - minor change
* [dbd1af2a1](https://github.com/gama-platform/gama/commit/dbd1af2a1) - fixes a test on graph
* [5b29ea000](https://github.com/gama-platform/gama/commit/5b29ea000) - fixes graph model
* [e9504f392](https://github.com/gama-platform/gama/commit/e9504f392) - reintroduce graph generation
* [59554e37a](https://github.com/gama-platform/gama/commit/59554e37a) - add the possibility to indicate a list of strength and a list of lifetime values when adding a list of desries, beliefs, uncertainties and ideals
* [07ed179d3](https://github.com/gama-platform/gama/commit/07ed179d3) - for Arthur
* [1b2d1734e](https://github.com/gama-platform/gama/commit/1b2d1734e) - Adds a new type to GAMA: field;
* [a50648816](https://github.com/gama-platform/gama/commit/a50648816) - Simplifies the display of ants in the "Classic" model
* [3ffa904dd](https://github.com/gama-platform/gama/commit/3ffa904dd) - Small correction regarding the "old" syntax
* [287af1d8e](https://github.com/gama-platform/gama/commit/287af1d8e) - Simplifies the VMArgs and puts 4096Mb as the min+max heap memory
* [64128eedb](https://github.com/gama-platform/gama/commit/64128eedb) - Simple correction of the copyright year
* [ff3033bba](https://github.com/gama-platform/gama/commit/ff3033bba) - Removes a small debug mark
* [ca4071234](https://github.com/gama-platform/gama/commit/ca4071234) - First addition of the JBox2D physics engine alongside Bullet (3D).
* [eb5db6c2d](https://github.com/gama-platform/gama/commit/eb5db6c2d) - Speeds up the initial opening of the PreferencesView.
* [f9215c24e](https://github.com/gama-platform/gama/commit/f9215c24e) - Rewriting of the "Text Display" to demonstrate some of the new features
* [4115400d6](https://github.com/gama-platform/gama/commit/4115400d6) - Rewriting of the StringDrawer with a gain in speed and memory used
* [5cc2139a3](https://github.com/gama-platform/gama/commit/5cc2139a3) - Small additions to ICoordinates (allowing to set an offset for adding
* [55222e832](https://github.com/gama-platform/gama/commit/55222e832) - Provides access to the enablement / disablement of OpenGL states
* [80d19e27b](https://github.com/gama-platform/gama/commit/80d19e27b) - Pass the border to all polygons (not only the ones with holes)
* [c5fdc6663](https://github.com/gama-platform/gama/commit/c5fdc6663) - Adds a utility method to know if an OpenGL object has a border
* [a712192d9](https://github.com/gama-platform/gama/commit/a712192d9) - Deprecates the 'warnings' attribute of experiments (never really used)
* [2ab03ee31](https://github.com/gama-platform/gama/commit/2ab03ee31) - Improves and harmonizes the console messages at the launch
* [20f59fc21](https://github.com/gama-platform/gama/commit/20f59fc21) - Fixes a leak (listener) that was polluting the metamodel of GAMA
* [a9c882ca7](https://github.com/gama-platform/gama/commit/a9c882ca7) - Fixes a small glitch where normals were not computed correctly
* [ec8add593](https://github.com/gama-platform/gama/commit/ec8add593) - Corrects a wrong path in the model
* [1e0d15cdf](https://github.com/gama-platform/gama/commit/1e0d15cdf) - Trying to deal with Maven's strange requirements...
* [7f911135d](https://github.com/gama-platform/gama/commit/7f911135d) - A number of updates and additions, around three main tasks:
* [cda878d43](https://github.com/gama-platform/gama/commit/cda878d43) - Adds the native libs for Libbulletjme library and the Java wrapper
* [70b1f0540](https://github.com/gama-platform/gama/commit/70b1f0540) - fixes [#3109](https://github.com/gama-platform/gama/issues/3109)
* [440a254d9](https://github.com/gama-platform/gama/commit/440a254d9) - Fixes Issue [#3108](https://github.com/gama-platform/gama/issues/3108).
* [11a48daad](https://github.com/gama-platform/gama/commit/11a48daad) - Allow built-in models to inherit correcty from skills
* [f00194144](https://github.com/gama-platform/gama/commit/f00194144) - Notify the population listeners after their initialization
* [ca85946f0](https://github.com/gama-platform/gama/commit/ca85946f0) - Corrects a wrong build directive.
* [ba78e15de](https://github.com/gama-platform/gama/commit/ba78e15de) - Better distinction between fields and variables within the processor
* [5da024045](https://github.com/gama-platform/gama/commit/5da024045) - Directly adds the sources of vecmath 1.5.2 (not maintained anymore)
* [6ef738469](https://github.com/gama-platform/gama/commit/6ef738469) - Adds a constructor to easily build arguments (caller,map(string, value))
* [5b0f1e169](https://github.com/gama-platform/gama/commit/5b0f1e169) - Adds a function to get the largest dimension of an Envelope3D
* [b010c3ad6](https://github.com/gama-platform/gama/commit/b010c3ad6) - add possiblity to autosave facet to specify the path, file name
* [b6444cae5](https://github.com/gama-platform/gama/commit/b6444cae5) - Allows models to inherit from parent models (experimental)
* [ae03f636b](https://github.com/gama-platform/gama/commit/ae03f636b) - some improvment of the pedestrian skill
* [3c3767ff8](https://github.com/gama-platform/gama/commit/3c3767ff8) - CSV Reader should read stream with UTF-8 standard
* [9a4eb98b4](https://github.com/gama-platform/gama/commit/9a4eb98b4) - Incorporates JBullet's code (lib too old to be maintained)
* [61e851b05](https://github.com/gama-platform/gama/commit/61e851b05) - Addition of an "init/copy" mechanism in object pools
* [aef68cedb](https://github.com/gama-platform/gama/commit/aef68cedb) - Small time optimization for the rendering in Java2D
* [b9a24ca36](https://github.com/gama-platform/gama/commit/b9a24ca36) - Bumps JBullet to 1.0.1 and adds the sources
* [4e1d9e0cc](https://github.com/gama-platform/gama/commit/4e1d9e0cc) - remove the empty project (pedestrian plugin)
* [6c3240dd7](https://github.com/gama-platform/gama/commit/6c3240dd7) - build new plugin
* [a8c79b5e6](https://github.com/gama-platform/gama/commit/a8c79b5e6) - fixes a issue with pedestrian skill
* [fb050ad3f](https://github.com/gama-platform/gama/commit/fb050ad3f) - new plugin pedestrian
* [1d5e72c5a](https://github.com/gama-platform/gama/commit/1d5e72c5a) - avoid a floating point error in the computation of angles (operator angle_betweeen)
* [68a8ac7d1](https://github.com/gama-platform/gama/commit/68a8ac7d1) - Addresses [#3099](https://github.com/gama-platform/gama/issues/3099): new syntax for accessing sublists
* [4292ff43d](https://github.com/gama-platform/gama/commit/4292ff43d) - Addresses [#3099](https://github.com/gama-platform/gama/issues/3099) by proposing 'between' in addition to 'copy_between'
* [6ca9973c4](https://github.com/gama-platform/gama/commit/6ca9973c4) - Addresses [#3095](https://github.com/gama-platform/gama/issues/3095). Needs to be tested, though, with ill formed strings
* [0ece8c755](https://github.com/gama-platform/gama/commit/0ece8c755) - Simplifies usage of DataType in headless classes
* [f3fc1930a](https://github.com/gama-platform/gama/commit/f3fc1930a) - Simplifies headless further by removing useless classes/methods
* [651dc06aa](https://github.com/gama-platform/gama/commit/651dc06aa) - Simplifies again the headless classes in order to facilitate debugging
* [d07c657e2](https://github.com/gama-platform/gama/commit/d07c657e2) - Continue addressing [#3096](https://github.com/gama-platform/gama/issues/3096). Simmplification of some headless operations.
* [9924772b0](https://github.com/gama-platform/gama/commit/9924772b0) - Corrects a bug introduced in the previous commit on GamaShapeFile
* [1b6c6375a](https://github.com/gama-platform/gama/commit/1b6c6375a) - #3096 again. A stupid commit error.
* [ffcb1b8e8](https://github.com/gama-platform/gama/commit/ffcb1b8e8) - Addresses [#3096](https://github.com/gama-platform/gama/issues/3096). Needs to be tested thoroughly in headless mode !
* [a27f72004](https://github.com/gama-platform/gama/commit/a27f72004) - Adding sources for JOGL and GeoTools.
* [db786f8e3](https://github.com/gama-platform/gama/commit/db786f8e3) - Simplification of the "imported" SVGSalamander library
* [f98459f76](https://github.com/gama-platform/gama/commit/f98459f76) - Factorisation of some operations in GIS files.
* [59dd46b35](https://github.com/gama-platform/gama/commit/59dd46b35) - More work on [#2967](https://github.com/gama-platform/gama/issues/2967). Previous solution was actually not working.
* [93941a999](https://github.com/gama-platform/gama/commit/93941a999) - Modernizes the progress listener for shapefiles
* [d1ba5bd6d](https://github.com/gama-platform/gama/commit/d1ba5bd6d) - Workarounds [#2967](https://github.com/gama-platform/gama/issues/2967) by adjusting the size of Windows submenus on the fly
* [4f580e685](https://github.com/gama-platform/gama/commit/4f580e685) - placeholder for websocket and web display in experimental repo
* [d673eb79b](https://github.com/gama-platform/gama/commit/d673eb79b) - missed pushing
* [14fd8033c](https://github.com/gama-platform/gama/commit/14fd8033c) - use jdk 11 ci release
* [c148508eb](https://github.com/gama-platform/gama/commit/c148508eb) - re compare with master continuous
* [0a7a201fd](https://github.com/gama-platform/gama/commit/0a7a201fd) - Fixes [#3062](https://github.com/gama-platform/gama/issues/3062) by deprecating user_input in favor of user_input_dialog
* [c8f5833c5](https://github.com/gama-platform/gama/commit/c8f5833c5) - Addresses [#3091](https://github.com/gama-platform/gama/issues/3091). Please test !
* [3563c37c3](https://github.com/gama-platform/gama/commit/3563c37c3) - Adresses [#3090](https://github.com/gama-platform/gama/issues/3090). Should not block if OpenGL cannot be initialized
* [653ea2e04](https://github.com/gama-platform/gama/commit/653ea2e04) - Fixes [#3036](https://github.com/gama-platform/gama/issues/3036) by correctly incrementing userSize when a header is present
* [1f4dc8b59](https://github.com/gama-platform/gama/commit/1f4dc8b59) - [README] Update badges with GH Actions
* [72e13378b](https://github.com/gama-platform/gama/commit/72e13378b) - Fixes [#3071](https://github.com/gama-platform/gama/issues/3071) by adding the desired preferences
* [282e6b1e0](https://github.com/gama-platform/gama/commit/282e6b1e0) - Fixes [#3059](https://github.com/gama-platform/gama/issues/3059) by casting the returned value of actions in int/float cases
* [7f0e2ee1a](https://github.com/gama-platform/gama/commit/7f0e2ee1a) - Fix [#3078](https://github.com/gama-platform/gama/issues/3078). Emits a warning when @inside a missing from a symbol.
* [b29f9fe15](https://github.com/gama-platform/gama/commit/b29f9fe15) - Adresses [#3085](https://github.com/gama-platform/gama/issues/3085) by reporting an error (instead of a warning)
* [2924b552a](https://github.com/gama-platform/gama/commit/2924b552a) - Updates the doc of GAML extension points
* [fbf3a6284](https://github.com/gama-platform/gama/commit/fbf3a6284) - New version of Wizards (with documentation)
* [b795192c1](https://github.com/gama-platform/gama/commit/b795192c1) - Addd rewrite: false in Tutorial Luneray flu, as default behavior of save statement is now to rewrite data in the file.
* [6ee43ac49](https://github.com/gama-platform/gama/commit/6ee43ac49) - some minor fix
* [6934a17b5](https://github.com/gama-platform/gama/commit/6934a17b5) - Fixes a compilation/linking error
* [f03b10f44](https://github.com/gama-platform/gama/commit/f03b10f44) - Reorganizes maths/stats operators and types in their plugins
* [f58e05755](https://github.com/gama-platform/gama/commit/f58e05755) - Add a method to compute a distance between 2 points along a polyline
* [121be67e9](https://github.com/gama-platform/gama/commit/121be67e9) - try to fix deployment to ovh
* [47598b1b0](https://github.com/gama-platform/gama/commit/47598b1b0) - fix seg fault of embeddedJDK version
* [968a790ec](https://github.com/gama-platform/gama/commit/968a790ec) - Moves some types (Regression) and operators in the maths plugin
* [8c4e0292b](https://github.com/gama-platform/gama/commit/8c4e0292b) - fixes issue with folder type
* [6515e0bc7](https://github.com/gama-platform/gama/commit/6515e0bc7) - work on wizards. Add folder type and foldereditor
* [5634b6e0a](https://github.com/gama-platform/gama/commit/5634b6e0a) - Moves the models related to databases to the database plugin
* [0b82d9b3c](https://github.com/gama-platform/gama/commit/0b82d9b3c) - Dispatches libraries in physics and database plugins
* [22cd9fdcb](https://github.com/gama-platform/gama/commit/22cd9fdcb) - revert some effort to resolve the zip corrupt on macos
* [887441a48](https://github.com/gama-platform/gama/commit/887441a48) - Add Wizard operator
* [8926448c7](https://github.com/gama-platform/gama/commit/8926448c7) - return to default zip ci release
* [416a5764f](https://github.com/gama-platform/gama/commit/416a5764f) - add the possibility to define a "confirm dialog box"
* [25819c857](https://github.com/gama-platform/gama/commit/25819c857) - misreplace script
* [455b366f1](https://github.com/gama-platform/gama/commit/455b366f1) - try with 7zip ci release
* [436227bcd](https://github.com/gama-platform/gama/commit/436227bcd) - Temporarily solves a strange problem with javax.xml
* [79c641d1a](https://github.com/gama-platform/gama/commit/79c641d1a) - remove some trash of experimental in exported Sets
* [bebb3b9a3](https://github.com/gama-platform/gama/commit/bebb3b9a3) - Removes Experimental projects from the Working/Project set
* [6b76005d7](https://github.com/gama-platform/gama/commit/6b76005d7) - Tries to solve the guava libraries conflict
* [648555c68](https://github.com/gama-platform/gama/commit/648555c68) - Bumping to version 25.0 of Geotools together with additional libraries
* [83f0652f8](https://github.com/gama-platform/gama/commit/83f0652f8) - Removes old version of StreamEx
* [b77d66207](https://github.com/gama-platform/gama/commit/b77d66207) - Bumped JFreeChart to 1.5.3
* [156e29f27](https://github.com/gama-platform/gama/commit/156e29f27) - Bumped Streamex to version 0.7.3
* [2fcaf2df2](https://github.com/gama-platform/gama/commit/2fcaf2df2) - Removes older version of JTS
* [2ff25afcc](https://github.com/gama-platform/gama/commit/2ff25afcc) - Removes kabeja lib files
* [7c5c2f0d0](https://github.com/gama-platform/gama/commit/7c5c2f0d0) - See [#3082](https://github.com/gama-platform/gama/issues/3082). CleanUp, Formatter, WorkingSet & Prefs
* [47d1c3f9d](https://github.com/gama-platform/gama/commit/47d1c3f9d) - [tmp]cat the log
* [4d1d51209](https://github.com/gama-platform/gama/commit/4d1d51209) - [temp] view log error
* [655b64cfa](https://github.com/gama-platform/gama/commit/655b64cfa) - Exports the new kabeja packages and JTS leftovers
* [ae74166ff](https://github.com/gama-platform/gama/commit/ae74166ff) - Bumped JTS to 1.18.1 and moved Kabeja to sources
* [f738e8bd3](https://github.com/gama-platform/gama/commit/f738e8bd3) - Avoids creating a new dependency to Apache Collections
* [2cb5bc5bc](https://github.com/gama-platform/gama/commit/2cb5bc5bc) - Temporary workaround for issue [#3068](https://github.com/gama-platform/gama/issues/3068)
* [ec9bb7cb7](https://github.com/gama-platform/gama/commit/ec9bb7cb7) - return to jdk 15 ci release
* [8f46d397a](https://github.com/gama-platform/gama/commit/8f46d397a) - addresses [#3061](https://github.com/gama-platform/gama/issues/3061)
* [c5d33b9eb](https://github.com/gama-platform/gama/commit/c5d33b9eb) - fix a bug of shp viewer did not display the file content
* [1badc145f](https://github.com/gama-platform/gama/commit/1badc145f) - port from master the travis scripts
* [5695cbe64](https://github.com/gama-platform/gama/commit/5695cbe64) - test gha
* [5b167c546](https://github.com/gama-platform/gama/commit/5b167c546) - make sure it use jdk 15
* [f069938df](https://github.com/gama-platform/gama/commit/f069938df) - Changes the splash screen for 1.8.2
* [49c1a4449](https://github.com/gama-platform/gama/commit/49c1a4449) - Allows to wipe preferences
* [6b3aeb574](https://github.com/gama-platform/gama/commit/6b3aeb574) - use eclipse 2020-12 and xtext 24
* [d83f20da0](https://github.com/gama-platform/gama/commit/d83f20da0) - Update msi.gama.processor_1.4.0.jar
* [652f6fb36](https://github.com/gama-platform/gama/commit/652f6fb36) - test github action
* [f27701460](https://github.com/gama-platform/gama/commit/f27701460) - use jdk 14
* [e717e3417](https://github.com/gama-platform/gama/commit/e717e3417) - mvn chain fixed with the port of processor 2.0
* [ab8f0de14](https://github.com/gama-platform/gama/commit/ab8f0de14) - More theme handling
* [0796872df](https://github.com/gama-platform/gama/commit/0796872df) - Improves the SWT look and feel on macOS
* [1b73278dc](https://github.com/gama-platform/gama/commit/1b73278dc) - Removes useless dependencies
* [f47edf883](https://github.com/gama-platform/gama/commit/f47edf883) - Removes useless dependencies
* [38bda0b4e](https://github.com/gama-platform/gama/commit/38bda0b4e) - Gets rid of syntax errors in GML files using the new version of GeoTools
* [03ce79370](https://github.com/gama-platform/gama/commit/03ce79370) - More improvements to theme handling
* [8061520e4](https://github.com/gama-platform/gama/commit/8061520e4) - More improvements in the handling of light/dark themes for GAMA 1.8.2
* [62b139ce4](https://github.com/gama-platform/gama/commit/62b139ce4) - Improves the handling of light/dark UI themes by GAMA.
* [003d576c9](https://github.com/gama-platform/gama/commit/003d576c9) - Addition of some methods to prepare for the light/dark theme
* [a86080cbd](https://github.com/gama-platform/gama/commit/a86080cbd) - some change to make gama launch on win, should review for consistency
* [f763bc7fc](https://github.com/gama-platform/gama/commit/f763bc7fc) - update some pom for maven build with jdk 11
* [391c8e4a9](https://github.com/gama-platform/gama/commit/391c8e4a9) - Adds the SWT theme plugin to begin working on OS theme compliance
* [47defcb59](https://github.com/gama-platform/gama/commit/47defcb59) - I Needed to change the java used in some plugin from 1.8 to 11
* [b503c8ce5](https://github.com/gama-platform/gama/commit/b503c8ce5) - New additions to adjust the correct library set to JDK 15/Eclipse 4.17
* [84a8e87e6](https://github.com/gama-platform/gama/commit/84a8e87e6) - Addition of several libraries to satisfy the dependencies of GeoTools
* [4d1dddf72](https://github.com/gama-platform/gama/commit/4d1dddf72) - First addition of GeoTools 21.4 and JTS 1.17.
* [209884eef](https://github.com/gama-platform/gama/commit/209884eef) - Remove useless librairies that introduce compilation errors due to diplacation of packages to import
* [c2f4e8f4d](https://github.com/gama-platform/gama/commit/c2f4e8f4d) - First commit to this branch. Main goals are:
* [0bb5694a2](https://github.com/gama-platform/gama/commit/0bb5694a2) - git pushMerge branch 'master' of github.com:gama-platform/gama
* [5184eb935](https://github.com/gama-platform/gama/commit/5184eb935) - [HEADLESS] Remove workspace creation when not launching simulations - [#3049](https://github.com/gama-platform/gama/issues/3049)
* [7a9a2aeca](https://github.com/gama-platform/gama/commit/7a9a2aeca) - [HEADLESS] Fix workspace creation on first run
* [b8e32ae2e](https://github.com/gama-platform/gama/commit/b8e32ae2e) - [HEADLESS] Script create workspace in output folder + fix display if error
* [07550d125](https://github.com/gama-platform/gama/commit/07550d125) - [HEADLESS] Script create defined unique workspace folder
* [6c97bc57f](https://github.com/gama-platform/gama/commit/6c97bc57f) - first try for comodeling when using different gis in micromodel
* [6a2108402](https://github.com/gama-platform/gama/commit/6a2108402) - fix example model of network TCP protocool: 1. server and client in 1 single model 2. fix real teleport base on TCP (instead of MQTT public server)
* [337d714c1](https://github.com/gama-platform/gama/commit/337d714c1) - improve the example model of ODE
* [0c6a2e2b8](https://github.com/gama-platform/gama/commit/0c6a2e2b8) - fix a NPE of comodel when merging non-grid species
* [d9f69dc53](https://github.com/gama-platform/gama/commit/d9f69dc53) - improve management of multi-files for grids
* [dc9335534](https://github.com/gama-platform/gama/commit/dc9335534) - where are you now, Travis? and commit for [#3033](https://github.com/gama-platform/gama/issues/3033)
* [1b3deff6e](https://github.com/gama-platform/gama/commit/1b3deff6e) - fixing bugs about law enforcement
* [d496589ed](https://github.com/gama-platform/gama/commit/d496589ed) - Some simplifications  in  the documentation of some operators
* [03f3aabc2](https://github.com/gama-platform/gama/commit/03f3aabc2) - new toc.xml for  GAMA 1.8.1
* [d261e49ea](https://github.com/gama-platform/gama/commit/d261e49ea) - update of  XSL files to reduce the side of the operator blocks
* [f8d7ef874](https://github.com/gama-platform/gama/commit/f8d7ef874) - update toc related file: the toc xml can now be created  from the sidebar.md file
* [073c25c0a](https://github.com/gama-platform/gama/commit/073c25c0a) - update constants for 1.8.1 pdfd generation on my laptop
* [524c3181a](https://github.com/gama-platform/gama/commit/524c3181a) - update Type converter to manage some missing types
* [d7035a8a1](https://github.com/gama-platform/gama/commit/d7035a8a1) - update documentation of the various operators
* [faa0684ac](https://github.com/gama-platform/gama/commit/faa0684ac) - update processor (to add documentation to type generated operators)
* [95e06ad24](https://github.com/gama-platform/gama/commit/95e06ad24) - [ENHANCEMENT] Force apply ImgBot on wiki
* [d81fcb858](https://github.com/gama-platform/gama/commit/d81fcb858) - add a null pointer exception in split_lines operator
* [507895f61](https://github.com/gama-platform/gama/commit/507895f61) - Addresses [#3006](https://github.com/gama-platform/gama/issues/3006) by implementing a different "check in among" for floats
* [b3d34edf1](https://github.com/gama-platform/gama/commit/b3d34edf1) - Starts to update some application icons (several still pending)
* [004256617](https://github.com/gama-platform/gama/commit/004256617) - In order to address [#2996](https://github.com/gama-platform/gama/issues/2996), simplifies the management of logs in headless
* [ad6dbdf61](https://github.com/gama-platform/gama/commit/ad6dbdf61) - Fixes [#2985](https://github.com/gama-platform/gama/issues/2985) by adding a possible index to `add` operations to containers
* [a933f5188](https://github.com/gama-platform/gama/commit/a933f5188) - Adds a missing mention to version 1.8.1
* [ac3c8ca48](https://github.com/gama-platform/gama/commit/ac3c8ca48) - More explicit error message when an experiment is not correctly named
* [71b86341a](https://github.com/gama-platform/gama/commit/71b86341a) - Fixes [#3003](https://github.com/gama-platform/gama/issues/3003). Avoids empty error messages.
* [959c6b48d](https://github.com/gama-platform/gama/commit/959c6b48d) - Update README.md
* [740b48d99](https://github.com/gama-platform/gama/commit/740b48d99) - Fixes [#3000](https://github.com/gama-platform/gama/issues/3000) by memorizing the species context of the "super" calls
* [33fc3d970](https://github.com/gama-platform/gama/commit/33fc3d970) - Merge pull request [#2999](https://github.com/gama-platform/gama/issues/2999) from gama-platform/imgbot
* [1a29564bb](https://github.com/gama-platform/gama/commit/1a29564bb) - Replace a "do halt" by a "do pause" in an example model for headless for OSX
* [54c0e7bd1](https://github.com/gama-platform/gama/commit/54c0e7bd1) - AgentDB: remove the fact that AgentDB does not support the connection to a SQLite database. Note that: when having several AgentDB trying to update the same file, there will be an exception as the DB file is locked. We should advice to have a single agentDB connected to a single file.
* [d384e0618](https://github.com/gama-platform/gama/commit/d384e0618) - Database bug fix on the testConnection actions of agentDB species. Update of library model to test all connections
* [e342f0344](https://github.com/gama-platform/gama/commit/e342f0344) - Addresses [#2997](https://github.com/gama-platform/gama/issues/2997). Please test.


