#!/bin/sh

curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add - 
sudo sh -c "echo deb https://deb.nodesource.com/node_6.x yakkety main \ > /etc/apt/sources.list.d/nodesource.list"
sudo apt-get install nodejs
npm install lunr