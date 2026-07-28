#!/bin/bash
##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# Lists every /resources/... path referenced from docs/ or
# website/versioned_docs/ that is missing from the resource store
# (website/static/resources if it has been built, otherwise
# gama.wiki/resources) AND from the permanent archive in
# website/versioned_resources/. Anything printed here will render as a
# broken image on the live site.
#
# Usage: run from the repo root: sh script/find_missing_resources.sh

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

RESOURCE_DIR="$ROOT/website/static/resources"
if [ ! -d "$RESOURCE_DIR" ]; then
	RESOURCE_DIR="$ROOT/gama.wiki/resources"
fi

if [ ! -d "$RESOURCE_DIR" ]; then
	echo "No resource store found (checked website/static/resources and gama.wiki/resources)." >&2
	exit 1
fi

grep -rhoE '\]\((/resources/[^)"'"'"'[:space:]]+)' "$ROOT/docs" "$ROOT/website/versioned_docs" 2>/dev/null \
	| sed -E 's/^\]\(//; s/[#?].*$//' \
	| sort -u \
	| while IFS= read -r ref; do
		if [ ! -f "$RESOURCE_DIR${ref#/resources}" ] && [ ! -f "$ROOT/website/versioned_resources${ref#/resources}" ]; then
			echo "$ref"
		fi
	done
