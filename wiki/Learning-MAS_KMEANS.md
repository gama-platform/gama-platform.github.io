---
layout: default
title: Agent Based Clustering
wikiPageName: Learning-MAS_KMEANS
wikiPagePath: wiki/Learning-MAS_KMEANS.md
---

[//]: # (keyword|operator_cross)
[//]: # (keyword|operator_cube)
[//]: # (keyword|operator_rnd_color)
[//]: # (keyword|operator_even)
[//]: # (keyword|operator_closest_to)
[//]: # (keyword|operator_font)
[//]: # (keyword|constant_#grey)
[//]: # (keyword|constant_#bold)
[//]: # (keyword|type_font)
# Agent Based Clustering


_Author : Jean-Danie Zucker with Patrick Taillandier's and Arnaud Grignard's Help_

Code of the model : 

```
model MASKMEANS


global
{
// the number of classes to create (kmeans)
// It corresponds to the centroids
	int k <- 4;
	// the number of points
	int N <- 100;
	//number of dimensions
	int dimensions;
	init
	{
	//create datapoints agents
		create datapoints number: N
		{
			if (dimensions = 3)
			{
				location <- { rnd(100), rnd(100), rnd(100) };
			}

			if (dimensions = 2)
			{
				location <- { rnd(100), rnd(100) };
			}

		}

		//create centroid agents
		create centroids number: k
		{
			if (dimensions = 3)
			{
				location <- { rnd(100), rnd(100), rnd(100) };
			}

			if (dimensions = 2)
			{
				location <- { rnd(100), rnd(100) };
			}

		}

		//give a random color to each centroid (i.e. to each datapoints agents of the group)
		loop c over: centroids
		{
			rgb col <- rnd_color(255);
			ask c
			{
				color_kmeans <- col;
			}

		}

	}

	reflex assign_points_to_centroid when: even(cycle)
	{
	// The "assignment" step is also referred to as expectation step,
		ask centroids
		{
			mypoints <- list<datapoints> ([]);
		}

		loop pt over: datapoints
		{
			ask pt
			{
				mycenter <- (centroids) closest_to self;
				color_kmeans <- mycenter.color_kmeans;
				add self to: mycenter.mypoints;
			}

		}

	}

	reflex update_centroids when: not even(cycle)
	{
	// the "update step" as maximization step,
	// making this algorithm a variant of the generalized expectation-maximization algorithm.

	//We give a random color to each group (i.e. to each datapoints agents of the group)
		loop center over: centroids
		{
		//old code... center.location <- geometry(center.mypoints).location;
			center.location <- mean(center.mypoints collect each.location);
		}

	}

}

species datapoints
{
	rgb color_kmeans <- # grey;
	centroids mycenter;
	aspect kmeans_aspect2D
	{
		draw circle(2) color: color_kmeans;
	}

	aspect kmeans_aspect3D
	{
		draw sphere(2) color: color_kmeans;
	}

}

species centroids
{
	rgb color_kmeans <- # grey;
	list<datapoints> mypoints;
	aspect kmeans_aspect2D
	{
		draw cross(3, 0.5) color: color_kmeans border: # black;
		loop pt over: mypoints
		{
			draw line([location, pt]) + 0.1 color: color_kmeans;
		}
	}

	aspect kmeans_aspect3D
	{
		draw cube(5) color: color_kmeans border: # black;
		loop pt over: mypoints
		{
			draw line([location, pt], 0.2) color: color_kmeans;
		}
	}

}

experiment clustering2D type: gui
{
	parameter "Number of clusters to split the data into" var: k category: "KMEANS";
	parameter "Number of points to be clustered" var: N init: 100;
	parameter "Number of dimensions" var: dimensions init: 2 min: 2 max: 2;
	font regular <- font("Helvetica", 14, # bold);
		
	point target <- { 20, 95 };
	output
	{
		display map_kmeans
		{
			species datapoints aspect: kmeans_aspect2D;
			species centroids aspect: kmeans_aspect2D;
			graphics "Full target"
			{
				draw rectangle(100, 4) color: # yellow at: target + { 30, 0 };
				if (not even(cycle))
				{
				// the "update step" as maximization step, (a mean is done to recenter)
					draw "Next step is maximisation step the centroid will move to the means of its points" at: target + { 0, 0 } font: regular color: # red;
				} else
				{
					draw "Next step is estimation Step (each point is assigned the color of his nearest centroid" at: target + { 0, 0 } font: regular color: # green;
				}

			}

		}

	}
}

experiment clustering3D type: gui
{
	parameter "Number of clusters to split the data into" var: k category: "KMEANS";
	parameter "Number of points to be clustered" var: N init: 100;
	font regular <- font("Helvetica", 14, # bold);
	point target <- { 20, 95 };
	parameter "Number of dimensions" var: dimensions init: 3 min: 3 max: 3;
	action _init_ {
		create MASKMEANS_model with: [dimensions::3];
	}
	output
	{
		display map_kmeans type: opengl
		{
			species datapoints aspect: kmeans_aspect3D;
			species centroids aspect: kmeans_aspect3D;
		}

	}

}

```
