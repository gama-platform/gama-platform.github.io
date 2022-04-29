---
title: Writing Models
id: version-1.8.1-WritingModels
original_id: WritingModels
---




Models in GAMA play the same role as classes in Java or C++: they represent both the knowledge about a particular phenomenon a user wants to simulate and the way(s) to simulate it. A model is nothing more than a text file (or a collection of text files that refer to each other), which contains instructions in a [specific language](GamlLanguage) called GAML (for "GAMA Modeling Language").
A model can then be theoretically edited using any text processor and later loaded into GAMA to [run experiments](RunningExperiments). However, because of the richness of the language, using a dedicated tool (with online help, live validation) is clearly the best way to write correct models.

The GUI version of GAMA offers such an _integrated model development environment_, which is composed of a set of coupled tools to support modelers in the [edition](EditingModels), [validation](ValidationOfModels), and [management](WorkspaceProjectsAndModels) of models. An optional [graphical modeling editor](G__GraphicalEditor) can also be installed on top of these tools to support higher-level modeling activities (similar to what a UML editor with Java bindings may provide to a Java development environment).

This chapter contains a description of these different tools and a comprehensive guide to the [GAML language](GamlLanguage), including a [complete reference](GamlReference) of all the built-in structures and facilities offered in its current version.

Please proceed to one of these sections :

  * 1. [Editing Models](EditingModels)
  * 2. [GAML Language](GamlLanguage)
  * 3. [GAML Reference](GamlReference)
  * 4. [Optimizing Models](OptimizingModels)