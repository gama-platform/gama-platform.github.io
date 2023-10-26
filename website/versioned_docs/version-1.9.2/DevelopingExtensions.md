---
title:  Developing Extensions
---




GAMA accepts _extensions_ to the GAML language, defined by external programmers and dynamically loaded by the platform each time it is run. Extensions can represent new built-in species, types, file-types, skills, operators, statements, new control architectures or even types of displays. Other internal structures of GAML will be progressively "opened" to this mechanism in the future: display layers (hardwired for the moment), new types of outputs (hardwired for the moment), scheduling policies (hardwired for the moment), random number generators (hardwired for the moment).
The extension mechanism relies on two complementary techniques:

  * the first one consists in defining the GAML extensions [in a plug-in](DevelopingPlugins) (in the OSGI sense, see [here](http://www.eclipse.org/equinox/)) that will be loaded by GAMA at runtime and must "declare" that it is contributing to the platform.
  * the second one is to indicate to GAMA where to look for extensions, using Java annotations that are gathered at compile time (some being also used at runtime) and directly compiled into GAML structures.

The following sections describe this extension process.

*  1. [Developing Plugins](DevelopingPlugins)
*  2. [Developing Skills](DevelopingSkills)
*  3. [Developing Statements](DevelopingStatements)
*  4. [Developing Operators](DevelopingOperators)
*  5. [Developing Types](DevelopingTypes)
*  6. [Developing Species](DevelopingSpecies)
*  7. [Developing Control Architectures](DevelopingControlArchitectures)
*  8. [IScope](DevelopingIScope)
*  9. [Index of annotations](DevelopingIndexAnnotations)
