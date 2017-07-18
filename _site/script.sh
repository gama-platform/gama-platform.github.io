#!/bin/sh

setup_git() {
  echo "Setting up GIT"
  git config --global user.email "travis@travis-ci.com"
  git config --global user.name "Travis CI"
  git config --global push.default simple
  git remote rm origin
  git remote add origin https://hqnghi88:$HQN_KEY@github.com/gama-platform/gama-platform.github.io.git
}

commit_website_files() {
  echo "Commiting GIT"
  git add -A
  echo "commit "
  
  git commit -q --message "[ci skip] Travis build $(date)"
  echo ${GH_TOKEN}
}

upload_files() {
  echo "Uploading GIT"
  #git remote add origin https://${GH_TOKEN}@github.com/dphilippon/dphilippon.github.io.git
 # git push -f  origin HEAD:master https://hqnghi88:$HQN_KEY@github.com/dphilippon/dphilippon.github.io.git
  git push origin HEAD:master
  #git push --quiet --set-upstream origin master
}

setup_git
commit_website_files
upload_files
