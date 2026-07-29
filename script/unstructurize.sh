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

#!/bin/bash

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

# The wiki is the live source of truth and can rename/delete images at any
# time, but our versioned_docs/ snapshots keep referencing whatever paths
# existed when they were published. Backfill (never overwrite) any resource
# still referenced by a versioned doc but no longer shipped by the wiki from
# our own tracked archive, so old doc versions don't end up with broken images.
# See website/versioned_resources/README.md for how to add to this archive.
cp -rn $( dirname "${BASH_SOURCE[0]}" )/../website/versioned_resources/. $( dirname "${BASH_SOURCE[0]}" )/../website/static/resources/

# Update sidebar
if [ -f $( dirname "${BASH_SOURCE[0]}" )/../website/sidebars.json ];then
	rm $( dirname "${BASH_SOURCE[0]}" )/../website/sidebars.json
fi

# Move every <file>.md from a [sub]folder of _gama.wiki/_
# to the folder _docs/_
# https://superuser.com/questions/658075/how-do-i-move-files-out-of-nested-subdirectories-into-another-folder-in-ubuntu
#
# The wiki has multiple subfolders (e.g. WikiOnly/ vs References/GAMLReferences/)
# that can both contain a file with the same name. Flattening them into one
# folder used to silently let whichever file `find` visited last win (via
# `mv --backup=numbered`, which just renamed the loser to *.~1~ with no
# warning) - so a wiki edit could quietly replace a real page with a stub.
# Warn loudly instead so it gets noticed and fixed at the wiki source, but
# don't fail the build over it (mv --backup=numbered keeps the previous
# silent-winner behavior as a fallback).
dupes=$(find gama.wiki/ -type f -iname "*.md" -printf "%f\n" | sort | uniq -d)
if [ -n "$dupes" ]; then
	echo "WARNING: duplicate doc filename(s) found in the wiki - one silently wins, fix this in the wiki source:" >&2
	while IFS= read -r dup; do
		echo "  $dup:" >&2
		find gama.wiki/ -type f -iname "$dup" -print >&2
	done <<< "$dupes"
fi

find gama.wiki/ -type f -iname "*.md" -exec mv --backup=numbered -t docs {} +