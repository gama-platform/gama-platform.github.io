---
title:  Code Examples
---

This page references a number of code examples with a capture of it running in GAMA.

## Data
### Data Importation
      
1. [3D shapefile loading.gaml](3D_shapefile_loading), _1 experiment, 3D_
2. [ASC File Import.gaml](ESRI_ASCII_to_grid_model) - _ESRI ASCII to grid model, 1 experiment, 2D_
2. [Contour Lines.gaml](Contour_Lines_Import) - _Contour Lines Import, 1 experiment, 3D_
2. [DXF File Import.gaml](DXF_to_Agents_Model), _1 experiment, 2D_
3. [GEOJSON File Import](GEOJSON_File_Loading), _1 experiment, 3D_
4. [Grid DEM.gaml](ASCII_File_to_DEM_Representation) - _ASCII File to DEM Representation, 3 experiments, 3D_
5. [Image Vectorisation.gaml](Image_Vectorisation), _1 experiment, 2D_
6. [OSM File Import.gaml](OSM_file_to_Agents) - _OSM file to Agents, 2 experiments, 2D_
7. [SHP Import.gaml](Shapefile_to_Agents) - _Shapefile to Agents, 1 experiment, 3D_

## Modelling
### Spatial Topology

1. Agent Movement
    1. [Continuous Field of Vision.gaml](ContinuousFieldofVision.gaml), _1 experiment, 2D_
    2. [Follow Path.gaml](Movement_of_an_agent_on_different_paths) - _Movement of an agent on different paths, 1 experiment, 2D_
    3. [Goto Directed Graph.gaml](Directed_Graph_Model) - _Directed Graph Model, 1 experiment, 2D_ 
    4. [Goto Grid.gaml](Movement_on_a_Grid_of_Cells_) - _Movement on a Grid of Cells, 1 experiment, 2D_
    5. [Goto Grid Weights.gaml](Movement_on_a_Grid_of_Cells) - _Movement on a Grid of Cells, 1 experiment, 2D_
    6. [Goto Polygon.gaml](Movement_on_a_Graph_created_by_Polygons), _1 experiment, 2D_
    7. [Moving3D.gaml](Moving3D), _5 experiments, 3D_
    8. [Wander on Graph](Wander), _1 experiment, 2D_
2. Fields
    1. [Accessing Fields.gaml](Accessing_Fields), _1 experiment, 3D_
3. Graphs
    1. [3D Graph](3D_Graph) - _3D_Graph, 2 experiments, 3D_
    2. [Classic Graph Generation.gaml](Graph_Generation) - _Graph Generation, 1 experiment, 2D_
    3. [Graph Building from Agents.gaml](Graph_Generation_using_Agents) - _Graph Generation using Agents, 1 experiment, 2D_
    4. [Strahler.gaml](Strahler) - _Strahler, 1 experiment, 2D_
4. Grids
    1. [Weighted Shortest Path on Grid.gaml](Computation_of_the_shortest_path_on_a_Grid_of_Cells), _Computation of the shortest path on a Grid of Cells, 1 experiment, 2D_

## Toy Models
### Ants (Foraging and Sorting)
1. [Ants Foraging.gaml](AntsForaging), _3 experiments, 2D_
### Art
1. [Trees and Seasons](TreesAndSeasons), _3 experiments, 3D_
2. [Mondrian City.gaml](MondrianCity), _1 experiment, 2D_
### Boids
1. [Boids 3D Motion.gaml](Boids_3D_Motion), _1 experiment, 3D_ 
### Bubble Sort
1. [Bubble Sort 3D.gaml](Creating_color_and_sort_cubes_by_color), _1 experiment, 3D_
### Epidemiology
1. [SIR (ABM vs EBM).gaml](comparison_ABM_EBM_SIR), _1 experiment, 2D_
### Evacuation
1. [Continuous Move.gaml](ContinuousMove), _1 experiment, 3D_
### Flood Simulation
1. [Hydrological Model.gaml](HydrologicaModel), _1 experiment, 3D_
### K Neareast Neighbours
1. [knn.gaml](K_Nearest_Neighbors), _1 experiment, 2D_ 
### Learning
1. [Mas KMeans.gaml](Agent_Based_Clustering), _2 experiments, 2D, 3D_
### Life
1. [Life.gaml](Life), _1 experiment, 2D_
### Multi-level Data Analysis
1. [Graph from Bug (Mirror Graph).gaml](SpatialGraph3d), _1 experiment, 3D_ 
2. [MODAVI.gaml](MODAVI), _1 experiment, 2D_
### Predator Prey
1. [Lotka-Volterra (Influence of Integration Step).gaml](ODE_LotkaVolterra), _1 experiment, 2D, Charts_
### Segregation (Schelling)
1. [Segregation (Agents).gaml](Segregation_Agents), _1 experiment, 2D_
### Soccer
1. [Soccer.gaml](Soccer_Game), _1 experiment, 2D_
### Sugarscape
1. [Sugarscape.gaml](Sugarscape), _1 experiment, 2D_
### Traffic
1. [Netlogo Traffic Model-2 Roads.gaml](NetlogoTrafficmodel2), _1 experiment, 2D_
2. [Traffic and pollution.gaml](Traffic_and_Pollution), _1 experiment, 3D_
### Waterflow
1. [Waterflow Field Elevation.gaml](Waterflowgridelevation), _1 experiment, 3D_

## Visualisation and User Interaction
### Visualisation
1. 3D Visualisation
    1. [Moving 3D Object.gaml](Moving_3D_Object), _1 experiment, 3D_
2. Charts
    1. [Series.gaml](Series), _1 experiment, 2D, charts_
3. [DEM Generator.gaml](DEM_Generator), _1 experiment, 3D_

## Plugin Models
### BDI Architecture
1. [CityEscape_BDI_Emotions.gaml](City_Evacuation), _1 experiment, 2D_

### Diffusion Statement
1. [Anisotropic Diffusion (Simple, Field).gaml](Anisotropic_Diffusion_Simple_Field), _1 experiment, 3D_

### Driving Skill
1. Advanced Models
     1. [Drive Random.gaml](Drive_Random), _2 experiments, 2D_
     2. [Simple Intersection.gaml](Simple_Intersection), _1 experiment, 2D_
2. Simple model
     1. [Simple Traffic Model](Simple_Traffic_Model), _1 experiment, 2D_

### Images
1. [Casting Images.gaml](Casting_Images), _1 experiment, 2D, 3D_
2. [Image Manipulation.gaml](Image_Manipulation), _1 experiment, 2D_  

### Ordinary Differential Equations
1. Examples
    1. [Stochastic Differential Equation.gaml](Stochastic_Differential_Equations), _1 experiment, 2D, charts_
2. For Advanced Users
    1. [SIR (Split in Agents, Multiple Strains).gaml](SIR_Split_in_Agents_Multiple_Strains), _1 experiment, 2D, charts_
### Pedestrian Skill
1. [Complex environment-walk.gaml](pedestrian_complex_environment), _1 experiment, 2D_
2. [Generate pedestrian paths.gaml](generate_pedestrian_paths), _1 experiment, 2D_  
3. [Simple environment-walk_to.gaml](pedestrian_simple_environment), _3 experiments, 2D_

### Physics Engine
1. [Eroding Volcano.gaml](Eroding_Volcano), _1 experiment, 3D_
2. [Flow on Terrain.gaml](Flow_on_Terrain), _1 experiment, 3D_
3. [Hello World.gaml](FallingObjects), _1 experiment, 3D_
4. [Play Pool.gaml](PlayPool), _1 experiment, 3D_
5. [Stairs.gaml](stairs), _1 experiment, 3D_
       
      