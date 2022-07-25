---
title:  Server
---

To run a Gama Headless SERVER

- From the release, go to the `headless` directory in your Gama installation and run the script `gama-headless.sh` (or `gama-headless.bat`) with the argument `-socket` followed by the socket you want your Gama server to run on.

    For example on Mac OS you could do:

    ```
    cd Gama.app/Contents/headless
    ```

    to move to the right directory, then run the script to listen on port `6868` with:

    ```
    bash gama-headless.sh -socket 6868
    ```

- From the source code, in Eclipse: 
Instantiate a headless server by running ```msi.gama.headless.id4_full``` with the following argument ```-os ${target.os} -ws ${target.ws} -arch ${target.arch} -nl ${target.nl} -socket 6868``` (you can specify any other port)



The current javascript client version is being developed in this repository [gama.client](https://github.com/gama-platform/gama.client)

## Hello World Visualization in MapBox
- Clone the repository [gama.client](https://github.com/gama-platform/gama.client)
- In ```Javascript/gama_client.js``` edit the following variable ```ABSOLUTE_PATH_TO_GAMA``` to your local path (e.g ```var ABSOLUTE_PATH_TO_GAMA = '/Users/arno/';``` 
- open ```Javascript/index.html```in a browser

## Hello World Message example 
- In ``` chain_messages.js``` edit the following variable ```ABSOLUTE_PATH_TO_GAMA``` to your local path (e.g ```var ABSOLUTE_PATH_TO_GAMA = '/Users/arno/';``` 
- open ```Javascript/message_example```in a browser

 