---
title:  6. Multi-Level
---

This step illustrates how to define a multi-level model.


## Formulation

We propose to let the buildings manage what happens when the people are inside buildings. In this context, we will use the multi-level properties of GAMA: when a people agent will be inside a building, it will be captured by it and its species will be modified. It will be not anymore the people agent that will decide when to leave the building, but the building itself that will release it.

We will need to:

* Define a micro-species of people inside the building species (**`people_in_building`**).
* Define two new behaviors for building: **`let_people_leave`** and **`let_people_enter`**.
* Modify the aspect of the building.
* Modify some global variables for counting the number of infected people.

![Incremental model 6: application of multi-level modeling.](/resources/images/tutorials/Incremental_model6.jpg)


## Model Definition

### building

First, we define a new species called **`people_in_building`** inside the `building` species. Thus, a building could have agents of this species as **`members`** and control them. The `people_in_building` species has for parent the `people` species, which means that a `people_in_building` agent has all the attributes, aspects and behaviors of a `people` agent.

In our case, we want a people agent inside a building does not do anything. Thus, we use the **`schedules`** facet of the species to remove the `people_in_building` from the scheduler.

```
species building {
    ...
    species people_in_building parent: people schedules: [] {
    }
    ...
}
```


We define a first `reflex` for the buildings that will be activated at each simulation step and that will allow the building to capture all the people that are inside its geometry and that are not moving (`target = nil`). Capturing agents means putting them inside its **`members`** list and changing their species: here the `people` agents become `people_in_building` agents.
```
species building {
    ...
    reflex let_people_enter {
	capture (people inside self where (each.target = nil)) as: people_in_building;
    }
    ....
}
```

We define a second reflex for the buildings that will be activated at each simulation step and that will allow the building to release some of the `people_in_building` agents. First, it increments the staying counter of all the `people_in_building` agents. Then it builds the list of leaving people by testing the same probability as before for all the `people_in_building` agents. Finally, if this list is not empty, it releases them as `people` agents (and gives them a new target point).

```
species building {
    ...
    reflex let_people_leave {
	ask people_in_building {
	    staying_counter <- staying_counter + 1;
	}

	release people_in_building where (flip(each.staying_counter / staying_coeff)) as: people in: world {
	    target <- any_location_in(one_of(building));
	}
    }
    ....
}
```

At last, we refine the aspect of the buildings: if there are no people inside the building, we draw it with gray color. If the number of `people_in_building` infected is higher than the number of `people_in_building` not infected, we draw it in red; otherwise in green. The number of infected `people_in_building` and its total number will be computed once a step (through the `update` facet of `building` attribute).

```
species building {
    int nb_infected <- 0 update: self.people_in_building count each.is_infected;
    int nb_total <- 0 update: length(self.people_in_building);

    aspect default {
	draw shape color: nb_total = 0 ? #gray : (float(nb_infected) / nb_total > 0.5 ? #red : #green) border: #black depth: height;
    }
}

```

### global variables

In order to take into account the people that are inside the buildings for the computation of `nb_people_infected`, we first build the list of `people_in_building`. As `people_in_building` is microspecies of `building`, we cannot compute it directly like for the other species, we then aggregate all the list `people_in_building` of all building in a single list (`list_people_in_buildings`). Then, we compute the number of infected people as the number of people infected outside the building + the number of people infected inside them.

```
global  {
    ...
    list<people_in_building> list_people_in_buildings update: (building accumulate each.people_in_building);
    int nb_people_infected <- nb_infected_init update: (people + list_people_in_buildings) count (each.is_infected);
    ...
}
```





## Complete Model

```

https://github.com/gama-platform/gama/blob/GAMA_1.8.2/msi.gama.models/models/Tutorials/Incremental%20Model/models/Incremental%20Model%206.gaml
```
