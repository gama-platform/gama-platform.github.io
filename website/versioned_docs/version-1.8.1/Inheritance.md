---
title:  Inheritance
---

[//]: # (startConcept|inheritance)
[//]: # (keyword|concept_inheritance)

As for many object-oriented programming languages, inheritance can be used in GAML. It is used to structure better your code when you have some complex models. It is, for example, useful when you have defined two different species with many attributes and behaviors in common: you can factorize everything in common in a **parent** species, and let in the **child species** only the differences between these 2 species. Notice that a behavior an action defined in a parent species can be redefined in a children species, in order to code a difference in terms of behavior, or simply execute the action of the parent and complete it with some other statements.

## Index

* [Mother species / child species](#mother-species-/-child-species)
* [Virtual actions](#virtual-actions)
* [Get all the subspecies from a species](#get-all-the-subspecies-from-a-species)

## Mother species/child species

To make a species inherit from a mother species, you have to add the facet `parent`, and specify the mother species.

```
species mother_species { }

species child_species parent: mother_species { }
```

Thus, all the attributes, actions and reflex of the mother species are inherited to the child species.

```
species mother_species {
    int attribute_A;
    action action_A {}
}

species child_species parent: mother_species {
    init {
	attribute_A <- 5;
	do action_A;
    }
}
```

If the mother species has a particular skill, its children will inherit all the attributes and actions.

```
species mother_species skills:[moving] { }

species child_species parent:mother_species {
    init {
	speed <- 2.0;
    }
    reflex update {
	do wander;
    }
}
```

You can redefine an action or a reflex by declaring an action or a reflex with the same name.

In the redefined action, it is common to call the action of the mother species with some specific parameters or to add more computations. To this purpose, you need to use:

* `invoke` instead of `do` to call an action (procedure) of the mother species.
* `super.action_name()` to call  an action (function) of the mother species.

```
species animal {
    int age <- 0;
	
    action grow {
	age <- age + 1;
    }
	
    int get_age {
	return age;
    }
}

species cat parent: animal {
    action grow {
	invoke grow();   // call the action growth of the mother species animal
	write "I am a cat and I grow up";
    }
	
    int get_age {
	return super.get_age() * 7;  // call the action get_age from the mother species animal
                                     // 1 year is 7 year for cats
    }
}
```

## Virtual action

You have also the possibility to declare a virtual action in the mother species, which means an action without implementation, by using the facet `virtual`. Note that, when using `virtual` facet, the statement has to start by `action` and not a return type. If the action is expecting to return a value you need to add the `type` facet:

```
action virtual_action virtual: true;

action vistual_action_with_return_value virtual: true type: any_type;
```

When you declare an action as virtual in a species, this species becomes abstract, which means you cannot instantiate agent from it. All the children of this species have to implement this virtual action.

```
species virtual_mother_species {
    action my_action virtual:true;
}

species child_species parent: virtual_mother_species {
    action my_action {
	// some statements
    }
}
```

## Get all the subspecies from a species

If you declare a `mother` species, you create a `child` agent, then `mother` will return the population of agents `mother` and **not** the population of agents `child`, as it is shown in the following example: 
```
global {
    init {
        create child number: 2;
        create mother number: 1;
    }
    reflex update {
        write length(mother); // will write 1 and not 3
    }
}

species mother {}

species child parent: mother {}
```

We remind you that `subspecies` is a built-in attribute of the agent. Using this attribute, you can easily get all the subspecies agents of the mother species by writing the following GAML function: 

```
global
{
    init {
        create child number: 2;
        create mother number: 1;
    }
    reflex update {
        write length(get_all_instances(mother)); // will write 3 (1+2)
    }
    list&lt;agent> get_all_instances(species&lt;agent> spec) {
        return spec.population +  spec.subspecies accumulate (get_all_instances(each));
    }
}

species mother {}

species child parent: mother {}
```

The operator `of_generic_species` can also be used to filter a list of agents and get all the agents of a given species or of its children species. As a consequence, in the previous example, to count all the agents of `mother` and `child` species you can only write:

```
write length(agents of_generic_species mother);
```

[//]: # (endConcept|inheritance)
