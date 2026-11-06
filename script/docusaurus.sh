#!/bin/bash
##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# Thin wrapper around the docusaurus CLI, used by the `docusaurus` and
# `docs:version` npm scripts of website/package.json (which put
# node_modules/.bin in the PATH).
#
# Every command is passed through untouched, except that after a successful
# `docs:version <version>`, every image referenced by the new frozen version
# is archived into website/versioned_resources/ (see
# script/archive_versioned_resources.sh), so later wiki changes can't break it.
#
# Usage (from website/): npm run docusaurus docs:version <version>
#                    or: npm run docs:version -- <version>

docusaurus "$@" || exit $?

if [ "$1" = "docs:version" ] && [ -n "$2" ] && [[ "$2" != -* ]]; then
	echo
	echo "=== Archiving images referenced by the versioned docs"
	if ! bash "$( dirname "${BASH_SOURCE[0]}" )/archive_versioned_resources.sh"; then
		echo "WARNING: version $2 was created, but some of its images could not be archived (see above)." >&2
		exit 1
	fi
	echo "Don't forget to commit website/versioned_resources/ along with the new version."
fi
