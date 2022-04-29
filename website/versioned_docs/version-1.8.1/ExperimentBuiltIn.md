---
title: The 'experiment' built-in species (Under Construction)
id: version-1.8.1-ExperimentBuiltIn
original_id: ExperimentBuiltIn
---




As described in the [presentation of GAML](Introduction), any experiment attached to a model is a species (introduced by the keyword `experiment` which directly or indirectly inherits from an abstract species called `experiment` itself. This abstract species (sub-species of `agent`) defines several attributes and actions that can then be used in any experiment.






## `experiment` attributes
`experiment` defines several attributes, which, in addition to the attributes inherited from [`agent`](AgentBuiltIn), form the minimal set of knowledge any experiment will have access to.
 


## `experiment` actions