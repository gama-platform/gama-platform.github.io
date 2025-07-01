---
title:  Example usage of clean_network in GAMA Platform
---


## Introduction
The `clean_network` operator can be used used for cleaning and optimizing road networks. It helps deal with issues in GIS data such as disconnected segments, overlapping roads, and imprecise geometry.

## Syntax
```gama
clean_network(
    list<geometry> geometries,
    float tolerance,
    bool split_lines,
    bool keepMainConnectedComponent
)
```

## Parameters Explained

### 1. geometries (list&lt;geometry>)
- What it is: Collection of geometries (usually road segments) to clean
- How to get it: `road collect each.shape` or `road_shapefile.contents`
- Example:
```gama
list<geometry> road_geometries <- road collect each.shape;
list<geometry> road_geometries <- road_shapefile.contents;
```

### 2. tolerance (float)
- What it is: Maximum distance between points to be considered for merging
- Recommended values: 
  - Small networks: 0.1 to 1.0 (e.g., urban network)
  - Large networks: 1.0 to 5.0 (e.g., rural network, highway network)
- Effects:
  - Lower values (e.g., 0.1): More precise, less merging
  - Higher values (e.g., 5.0): More aggressive merging
- Example scenarios:
  - For precise road networks: `tolerance <- 0.5`
  - For rough networks: `tolerance <- 2.0`

### 3. split_lines (boolean)
- What it is: Whether to split roads at intersection points
- Values:
  - true: Split roads at intersections (recommended for navigation)
  - false: Keep roads as continuous lines
- When to use:
  - true: For routing and navigation purposes
  - false: For visualization or analysis only

### 4. keepMainConnectedComponent (boolean)
- What it is: Whether to keep only the main connected network
- Values:
  - true: Remove isolated road segments
  - false: Keep all road segments
- When to use:
  - true: For ensuring network connectivity
  - false: When isolated segments are important

## Common Usage

###  Basic Network Cleaning
```gama
// Basic cleaning with default values
list<geometry> clean_lines <- clean_network(
    road collect each.shape,
    1.0,    // moderate tolerance
    true,   // split at intersections
    true    // keep only main network 
);
```

## Implementation Example

```gama
global {
  // Network cleaning parameters
  float tolerance <- 1.0;
  bool split_lines <- true;
  bool keep_main_connected <- true;

    init {
        // Create initial roads
        create road from: road_shapefile;
        
        // Clean the network
        list<geometry> clean_lines <- clean_network(
            road collect each.shape,
            tolerance,
            split_lines,
            keep_main_connected
        );
        
        // Remove old roads
        ask road {
            do die;
        }
        
        // Create new roads
        loop clean_geom over: clean_lines {
            create road {
                shape <- clean_geom;
            }
        }
        
        // Create network graph
        road_network <- as_edge_graph(road);
    }
}
```

