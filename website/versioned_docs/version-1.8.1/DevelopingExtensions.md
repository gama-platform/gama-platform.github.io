---
title:  Developing Extensions
---




GAMA accepts _extensions_ to the GAML language, defined by external programmers and dynamically loaded by the platform each time it is run. Extensions can represent new built-in species, types, file-types, skills, operators, statements, new control architectures or even types of displays. Other internal structures of GAML will be progressively "opened" to this mechanism in the future: display layers (hardwired for the moment), new types of outputs (hardwired for the moment), scheduling policies (hardwired for the moment), random number generators (hardwired for the moment).
The extension mechanism relies on two complementary techniques:

  * the first one consists in defining the GAML extensions [in a plug-in](DevelopingPlugins) (in the OSGI sense, see [here](http://www.eclipse.org/equinox/)) that will be loaded by GAMA at runtime and must "declare" that it is contributing to the platform.
  * the second one is to indicate to GAMA where to look for extensions, using Java annotations that are gathered at compile time (some being also used at runtime) and directly compiled into GAML structures.

The following sections describe this extension process.

  * 1. [Installing the GIT version](InstallingGitVersion)
  * 2. [Architecture of GAMA](GamaArchitecture)
  * 3. [Developing a Plugin](DevelopingPlugins)
  * 4. [Developing a Skill](DevelopingSkills)
  * 5. [Developing a Statement](DevelopingStatements)
  * 6. [Developing an Operator](DevelopingOperators)
  * 7. [Developing a Type](DevelopingTypes)
  * 8. [Developing a Species](DevelopingSpecies)
  * 9. [Developing a Control Architecture](DevelopingControlArchitectures)
  * 10. [Index of annotations](DevelopingIndexAnnotations)
