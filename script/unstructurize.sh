##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# This script will move every <file>.md in the root docs/ folder.
# The goal is to have a path-less architecture on the website
# similare to paths on the github wiki
#
# ex: <baseUrl>/[docs,wiki]/<file>

#!/bin/sh

# If no folder _docs/_ create one
if [ ! -d $( dirname "${BASH_SOURCE[0]}" )/../docs ];then
	mkdir $( dirname "${BASH_SOURCE[0]}" )/../docs
fi

# Remove folder _.git/_
if [ -d $( dirname "${BASH_SOURCE[0]}" )/../gama.wiki/.git ];then
	rm -fr $( dirname "${BASH_SOURCE[0]}" )/../gama.wiki/.git
fi

# Remove template webpage
if [ -f $( dirname "${BASH_SOURCE[0]}" )/../website/pages/en/template.js ];then
	rm $( dirname "${BASH_SOURCE[0]}" )/../website/pages/en/template.js
fi

# Update folder resource in the static folder in _website/_
if [ -d $( dirname "${BASH_SOURCE[0]}" )/../website/static/resources ];then
	rm -fr $( dirname "${BASH_SOURCE[0]}" )/../website/static/resources
fi
mv $( dirname "${BASH_SOURCE[0]}" )/../gama.wiki/resources $( dirname "${BASH_SOURCE[0]}" )/../website/static/

# Update database.json in the static folder in _website/_
if [ -f $( dirname "${BASH_SOURCE[0]}" )/../website/database/index.json ];then
	rm $( dirname "${BASH_SOURCE[0]}" )/../website/database/index.json
fi
mv $( dirname "${BASH_SOURCE[0]}" )/../gama.wiki/WikiOnly/database.json $( dirname "${BASH_SOURCE[0]}" )/../website/static/database/index.json

# Update sidebar
if [ -f $( dirname "${BASH_SOURCE[0]}" )/../website/sidebars.json ];then
	rm $( dirname "${BASH_SOURCE[0]}" )/../website/sidebars.json
fi

# Move every <file>.md from a [sub]folder of _gama.wiki/_
# to the folder _docs/_
# https://superuser.com/questions/658075/how-do-i-move-files-out-of-nested-subdirectories-into-another-folder-in-ubuntu
find gama.wiki/ -type f -iname "*.md" -exec mv --backup=numbered -t docs {} +

echo echo $(find docs/ -type f -iname "*.md" | wc -l)
