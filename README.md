<<<<<<< HEAD
# gama-platform.github.io 

Welcome in the Gama-Platform web documentation.

This repository is composed of 2 branches : `master` and `sources`.

# WARNING !!

If you're on the `master` branch, keep in mind that your modifications will be erase with the next Travis CI commit (every 24 hours).

If you want to modify the website, go to the `sources` branch and make your change in this branch :)
=======
# gama-platform.github.io - `sources` branch

On this branch, you have all the sources from the website [_gama-platform.github.io_](gama-platform.github.io) which is the documentation of the _Gama-Platform_.

## Editing Website

You saw an error on the website and you want to correct it. The first thing is to check which page should be updated !

### Editing website parameters

The website have a big config file. This file is fully documented and will configure many things from the website (logo, title, etc etc etc). 

You can find it here : _\<project>/website/siteConfig.js_

### Editing `wiki`

Let's start by taking a look at the URL. For example :

```
https://gama-platform.github.io/wiki/Home
                                ^^^^
```

If in the URL you have the keyword `wiki`, you should modify the _GAMA wiki_ and the correction will appear in the website after the next build done by Travis CI.

To keep the same example, the file to edit will be here :

```
https://gama-platform.github.io/wiki/Home
                                ^^^^ ^^^^
=FILE-TO-EDIT=> https://github.com/gama-platform/gama/wiki/Home
                                                      ^^^^ ^^^^
```

### Editing site specific pages

If you don't have the `wiki` keyword, the page you want to edit is probably a React page (like the *download* page or the *index* page).

This pages are located in _\<project>/website/pages/_ and you'll need to have some basics in React to edit pages.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have [NodeJS](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and a terminal to run [shell](https://en.wikipedia.org/wiki/Shell_script) and [PHP](https://php.net/) scripts installed on your machine.

Also, I recommand to use [git](https://git-scm.com/) to download projects, but you can deal without it.

### Installing

Here's a step by step series of command that tell you how to get a development env running.

First of all, you need to download this project on the `sources` branch

```
git clone https://github.com/gama-platform/gama-platform.github.io.git -b sources
```

Now, move on the project and clone the _Gama wiki_ in the folder. This project is not inside by default because I want it updated at each build (in Travis) and I wanted to keep this repo lightweight.

```
cd ./gama-platform.github.io
git clone https://github.com/gama-platform/gama.wiki.git
```

Now, you'll run some custom scripts which will pre-process every files for the website.

The first script will copy every files from _gama.wiki/_ to the right location in the new website.

```
sh ./script/unstructurize.sh
```

The second script will correct some links (to images or else) in markdowns files.

```
sh ./script/link_fixer.sh
```

This two lines will generate a sidebar Docusaurus-friendly (a JSON) from the gama.wiki's one.

```
sed -i '/^$/d' './docs/_Sidebar.md' # Remove blank line
php script/sidebarCopy.php
``` 

The last script will create a header ([learn more here](https://docusaurus.io/docs/en/doc-markdown#markdown-headers)) to have correct title in pages.

```
sh script/autoHeader.sh
```

The final command to prepare the project is to install _npm_ packages. So you should move in the _website/_ sub-folder and install packages listed in `packages.json` file.

```
cd <project>/website
npm install
```

Now you have your project ready to start it in your local machine! Congrats.

All you need to do is to start your project with _npm_ from the _website/_ folder

```
cd <project>/website
npm start
```

In less than a minute, you should have the website running in local on port 3000 open in your favorite browser.

## Deployment

All the deployment (pulling last wiki, running every previous scripts, building React project and publish new version) is done by Travis CI. The whole process is written in the <project>/website/static/.travis.yml file.

Travis CI will regenerate automatically the website every 24 hours.

## Built With

* [React](https://reactjs.org/) - A NodeJS library for building user interfaces
* [Docusaurus 1.9.0](https://docusaurus.io/en/) - The React framework used
* [Fuse.js](https://fusejs.io) - JavaScript lightweight fuzzy-search library.
* [highlight.js](https://highlightjs.org/) - Syntax highlighting for the Web
* [Travis CI](https://travis-ci.org/) - Distributed continuous integration service hosted at GitHub.
* [GAMA Wiki](https://github.com/gama-platform/gama/wiki) - Sources for the whole wiki part of the website 

## Contributing

Please read [CONTRIBUTING.md](https://gama-platform.github.io/wiki/Contribute) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Arthur Brugiere** - *Restarted work since 1.8* - [RoiArthurB](https://github.com/RoiArthurB)

See also the list of [contributors](https://github.com/gama-platform/gama-platform.github.io/contributors) who participated in this project.

## License

This project is licensed under the GPL3 License - see the [LICENSE.md](https://github.com/gama-platform/gama-platform.github.io/blob/sources/LICENSE) file for details
>>>>>>> 56bc5987fdfea42d9777b1a3582ac51812160aa3
