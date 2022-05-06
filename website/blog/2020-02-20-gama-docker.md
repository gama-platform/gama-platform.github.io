---
<!-- Below you'll find a prepared template to create a blog post, but you can find the full official documentation here: "-->"
<!-- https: "//docusaurus.io/docs/en/adding-blog -->"
<!-- If "true" the post will be accessible only by direct link -->: ""
<!-- If you want to post it, remove the line below -->: ""
unlisted: true
title: GAMA Platform is now on Docker
<!-- Author Part -->: ""
<!-- Update if you want to put your name, otherwise leave it to default -->: ""
author: GAMA Team
authorURL: "https://github.com/gama-platform"
<!-- If you want to specify your title, position, status... , you can uncomment the entry below and set your status -->: ""
<!-- This will be display below your name -->: ""
<!-- authorTitle: "Community Manager -->"
<!-- An image can be fetched from your FaceBook account, given by the authorFBID (from Facebook) -->: ""
<!-- Your authorFBID is available in the URL of your FB page: "https://www.facebook.com/[authorFBID]-->"
authorFBID: GamaPlatform
<!-- If no FB, put a custom link below for your Personal Profile -->: ""
<!-- To be linked on twitter if someone share your link -->: ""
<!-- @[authorTwitter] // ex: "@gamaplatform -->"
authorTwitter: gamaplatform
<!-- Tags/Categories will be used in the next version (v2) of the Docusaurus framework -->: ""
<!-- but they can already be specified in your article header.-->: ""
tags: [docker, headless, release]
---

![Containers](https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff)

We are excited to share the details of a new development - a packaging and deployment methodology for the GAMA Platform headless application using Docker.

<!--truncate-->

Docker tooling helps simplify and streamline the complexities associated with full build-configure-and-push strategies. Our aim is to keep the Dockerfile content as simple as possible in order to help the widest possible audience to understand and use this.

## Why Docker?

* Docker provides a robust platform for Continuous Delivery, Continuous Integration and Continuous Deployment, facilitating delivery of innovation faster.
* Facilitates customers packaging their configured systems into images and containers
* Facilitates easy portability to virtual machines or bare metal servers, on-premise or in the cloud (IaaS)
* Docker provides a transparent mechanism that facilitates collaboration with the open-source community, facilitating rapid convergence on best practices for DevOps (build, functional/PSR test, demo, deploy).

## What for

This container aim to help the usage of the GAMA headless to everyone. Thanks to that container, you'll be able to easily deploy a container on  

[![Github gama.docker](https://i.imgur.com/bCXNqmJ.png)](https://github.com/gama-platform/gama.docker)

## Roadmap

Even if the container is already usable, this image Docker is still under an heavy developpement and you should use it wisely. Our goal in a near future are :

* To reduce it's size. The container packed the whole GAMA software, but the headless do not use it all, so we have to cut every useless part for the headless
* Have a fully working CI based on the [Travis-CI](https://travis-ci.org/gama-platform/) releases
* Improve the usability of the container. For now a lot of mistakes have been made about the input/output of the container

## Try it!

Even if it's not perfectly finished, we already published our Dockerfiles on [Github](https://github.com/gama-platform/gama.docker) and the [Docker Hub](https://hub.docker.com/r/gamaplatform/gama). Go take a look if you're interested.

We would love to hear about your experiences with the GAMA Platform on Docker so we can continue to improve it.

Enjoy!