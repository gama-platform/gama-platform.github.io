---
layout: default
title: Java version
wikiPageName: NewVersionChanges
wikiPagePath: wiki/NewVersionChanges.md
---
# Java version

Due to changes in the libraries used by GAMA 1.7, this version now **requires JDK/JVM 1.8** to run.

# Changes between 1.6.1 and 1.7 that can influence the dynamics of models

* Initialization order between the initialization of variables and the execution of the `init` block in grids
init -> vars in 1.6.1 / vars -> init in 1.7
* Initialization order of agents -> now, the init block of the agents are not executed at the end of the global init, but during it.
put a sample model to explain the order of creation and its differences
* Initialization of vars to their default value
map ? list ? 
* Systematic casting and verification of types
give examples
* header of CSV files: be careful, in GAMA 1.7, if the first line is detected as a header, it is not read when the file is casted as a matrix (so the first row of the matrix is not the header, but the first line of data)
gives examples
* the step of batch experiments is now executed after all repetitions of simulations are done (not after each one). They can however be still accessed using the attributes `simulations` (see Batch.gaml in Models Library)
* signal and diffuse have been merged into a single statement
* facets do not accept a space between their identifier and the `:` anymore.
* simplification of equation/solve statements and deprecation of old facets
* in FIPA skill, `content`is replaced everywhere with `contents`
* in FIPA skill, `receivers` is replaced everywhere with `to`
* in FIPA skill, `messages` is replaced by `mailbox`
* The pseudo-attribute `user_location` has been removed (not deprecated, unfortunately) and replaced by the "unit" `#user_location`.
* The actions called by an `event` layer do not need anymore to define `point` and `list<agent>` arguments to receive the mouse location and the list of agents selected. Instead, they can now use `#user_location` and they have to compute the selected agents by themselves (using an arbitrary function).
* The random number generators now better handle seeding (larger range), but it can change the series of values previously obtained from a given seed in 1.6.1
* all models now have a starting_date and a current_date. They then dont begin at an hypothetical "zero" date, but at the epoch date defined by ISO 8601 (1970/1/1). It should not change models that dont rely on dates, except that:
* #year (and its nicknames #y, #years) and #month (and its nickname #month) do not longer have a default value (of resp. 30 days and 360 days). Instead, they are always evaluated against the current_date of the model. If no starting_date is defined, the values of #month and #year will then depend on the sequence of months and year since epoch day.
* `as_time`, `as_system_time`, `as_date` and `as_system_date` have been removed

# Enhancements in 1.7

## Simulations
 * simulations can now be run in parallel withing an experiment (with their outputs, displays, etc.)
 * batch experiments inherit from this possibility and can now run their repetitions in parallel too.
 * concurrency between agents is now possible and can be controlled on a species/grid/ask basis (from multi-threaded concurrency to complete parallelism within a species/grid or between the targets of an `ask` statement)

## Language
 * `gama` : a new immutable agent that can be invoked to change preferences or access to platform-only properties (like `machine-time`)
 * `try` and `catch` statements now provide a robust way to catch errors happening in the simulations. 
 * `super` (instead of `self`) and `invoke` (instead of `do`) can now be used to call an action defined in a parent species. 
 * `date` : new data type that offers the possibility to use a real calendar, to define a `starting_date` and to query a `current_date` from a simulation, to parse dates from date files or to output them in custom formats. Dates can be added, subtracted, compared. Various new operators (`minus_months`, etc.) allow for a fine manipulation of their data. Time units (`#sec`, `#s`, `#mn`, `#minute`, `#h`, `#hour`, `#day`, etc.) can be used in conjunction with them. Interval of dates (date1 to date2) can be created and used as a basis for loops, etc. Various simple operators allow for defining conditions based on the current_date (after(date1), before(date2), since(date1), etc.).
 * `font` type allows to define fonts more precisely in `draw` statements
 * BDI control architecture for agents
 * file management, new operators, new statements, new skills(?), new built-in variables, files can now download their contents from the web by using standard http: https: addresses instead of file paths.
 * The `save` can now directly manipulate files and ... save them. So something like `save shape_file("bb.shp", my_agents collect each.shape);` is possible. In addition, a new facet `attributes` allows to define complex attributes to be saved. 
 * `status` statement (to manipulate the status line from GAML)
 * new operators (`sum_of`, `product_of`, etc.)
 * casting of files works
 * co-modeling (importation of micro-models that can be managed within a macro-model)
 * populations of agents can now be easily exported to CSV files using the `save` statement 
 * Simple `messaging` skill between agents  
 * Terminal commands can now be issued from within GAMA using the `console` operator
 * New `status` statement allows to change the text of the status.
 * light statement in 3D display provides the possibility to custom your lights (point lights, direction lights, spot lights)
 * Displays can now inherit from other displays (facets `parent` and `virtual` to describe abstract displays)
 * `on_change:` facet for attributes/parameters allows to define a sequence of statements to run whenever the value changes. 
 * `species` and `experiment` now support the `virtual` boolean facet (virtual species can not be instantiated, and virtual experiments do not show up).

## Data importation
 * draw of complex shapes through obj file
 * new types fo files are taken into account: geotiff and dxf
 * viewers for common files
 * navigator: better overview of model files and their support files, addition of plugin models 

## Editor
 * doc on built-in elements, templates, shortcuts to common tasks, hyperlinks to files used
 * improvement in time, gathering of infos/todos
 * warnings can be removed from model files


## Models library: 
 * New models (make a list)

## Preferences
 * For performances and bug fixes in displays
 * For charts defaults

## Simulation displays
 * OpenGL displays should be up to 3 times faster in rendering
 * fullscreen mode for displays (ESC key)
 * CTRL+O for overlay and CTRL+L for layers side controls
 * cleaner OpenGL displays (less garbage, better drawing of lines, rotation helper, sticky ROI, etc.)
 * possibility to use a new OpenGl pipeline and to define keystoning parameters (for projections)
 * faster java2D displays (esp. on zoom)
 * better user interaction (mouse move, hover, key listener)
 * a whole new set of charts
 * getting values when moving the mouse on charts
 * possibility to declare `permanent layout: ` + `#splitted`, `#horizontal`, `#vertical`, `#stacked` in the `output` section to automatically layout the display view.
 * Outputs can now be managed from the "Views" menu. Closed outputs can be reopened. 
 * Changing simulation names is reflected in their display titles (and it can be dynamic)
 * OpenGL displays now handle rotations of 2D and 3D shapes, combinations of textures and colours, and keystoning

## Error view
 * Much faster (up to 100x !) display of errors
 * Contextual menu to copy the text of errors to clipboard or open the editor on it

## Validation
 * Faster validation of multi-file models (x2 approx.)
 * Much less memory used compared to 1.6.1 (/10 approx.)
 * No more "false positive" errors

## Console
 * Interactive console allows to directly interact with agents (experiments, simulations and any agent) and get a direct feedback on the impact of code execution using a new interpreter integrated with the console. Available in the modeling perspective (to interact with the new `gama` agent) as well as the simulation perspective (to interact with the current `experiment` agent).
 * Console now accepts colored text output 

## Monitor view
 * monitors can have colors
 * monitors now have contextual menus depending on the value displayed (save as CSV, inspect, browse...)

## GAMA-wide online help on the language
 * A global search engine is now available in the top-right corner of the GAMA window to look for GAML idioms

## Serialization
 * Serialize simulations and replay them (to come)
 * Serialization and deserialization of agents between simulations (to come)

## Allow TCP, UDP and MQQT communications between agents in different simulations (to come)
