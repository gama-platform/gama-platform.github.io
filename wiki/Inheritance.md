---
layout: default
title: Inheritance
wikiPageName: Inheritance
wikiPagePath: wiki/Inheritance.md
---
[//]: # (startConcept|inheritance)
[//]: # (keyword|concept_inheritance)
# Inheritance

As for multiple programming language, inheritance can be used in GAML. It is used to structure better your code, when you have some complex models.

## Index

* [Mother species / child species](#mother-species-/-child-species)
* [Virtual actions](#virtual-actions)
* [Get all the subspecies from a species](#get-all-the-subspecies-from-a-species)

## Mother species / child species

To make a species inherit from a mother species, you have to add the facet `parent`, and specify the mother species.

```
species mother_species {
}

species child_species parent:mother_species {
}
```

Thus, all the attributes, actions and reflex of the mother species are inherited to the child species.

```
species mother_species {
	int attribute_A;
	action action_A {}
}

species child_species parent:mother_species {
	init {
		attribute_A <- 5;
		do action_A;
	}
}
```

If the mother species has a particular skill, its children will inherit all the attributes and actions.

```
species mother_species skills:[moving] {
}

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

## Virtual action

You have also the possibility to declare a virtual action in the mother species, which means an action without implementation, by using the facet `virtual`:

```
action virtual_action virtual:true;
```

When you declare an action as virtual in a species, this species becomes abstract, which means you cannot instantiate agent from it. All the children of this species has to implement this virtual action.

```
species virtual_mother_species {
	action my_action virtual:true;
}

species child_species parent:virtual_mother_species {
	action my_action {
		// some statements
	}
}
```

## Get all the subspecies from a species

If you declare a "mother" species, you create a "child" agent, then "mother" will return the population of agents "mother" and **not** the population of agents "child", as it is shown in the following example : 
```
global
{
    init {
        create child number:2;
        create mother number:1;
    }
    reflex update {
        write length(mother); // will write 1 and not 3
    }
}

species mother {}

species child parent:mother {}
```

We reminds you that "subspecies" is a built-in attribute of the agent. Using this attribute, you can easily get all the subspecies agents of the mother species by writing the following gaml function : 

```
global
{
    init {
        create child number:2;
        create mother number:1;
    }
    reflex update {
        write length(get_all_instances(mother)); // will write 3 (1+2)
    }
    list<agent> get_all_instances(species<agent> spec) {
        return spec.population +  spec.subspecies accumulate (get_all_instances(each));
    }
}

species mother {}

species child parent:mother {}
```
[//]: # (endConcept|inheritance)
