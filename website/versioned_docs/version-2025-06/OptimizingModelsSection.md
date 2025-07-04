---
title:  Optimizing Models
---


Now that you are becoming more comfortable with GAML, it is time to think about how the runtime works, to be able to run more optimized models. Indeed, if you have already tried to write some models using GAML, you may have noticed that the execution time depends significantly on how you implement your model!

We will first present you in this part some [runtime concepts](RuntimeConcepts) (and present the species facet [`scheduler`](RuntimeConcepts#schedule-agents)). We will then continue with a detailed explanation on how to [analyze code performance](AnalysingCodePerformance) and will finish by showing you some [tips to optimize your models](OptimizingModels) (how to increase performance using [scheduling](OptimizingModels#scheduling), [grids](OptimizingModels#grid), [displays](OptimizingModels#displays), and how to [choose your operators](OptimizingModels#operators)).