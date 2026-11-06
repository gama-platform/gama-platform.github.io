#!/bin/bash
##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# Snapshots every image referenced by website/versioned_docs/ into the
# git-tracked archive website/versioned_resources/, so that the wiki can
# later rename or delete images without ever breaking a frozen doc version
# (Docusaurus fails the build on a missing markdown image).
#
# Files already in the archive are never overwritten. Only images are
# archived (PDFs, zips, ... are plain download links that can't break the
# build, and weigh several hundred MB).
#
# Run it from anywhere, after the wiki resources have been regenerated
# (website/static/resources or gama.wiki/resources must exist), and
# especially right after cutting a new doc version
# (`npm run docusaurus docs:version <version>`). Then commit the new files.
#
# Usage: bash script/archive_versioned_resources.sh

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
ARCHIVE="$ROOT/website/versioned_resources"

RESOURCE_DIR="$ROOT/website/static/resources"
if [ ! -d "$RESOURCE_DIR" ]; then
	RESOURCE_DIR="$ROOT/gama.wiki/resources"
fi

if [ ! -d "$RESOURCE_DIR" ]; then
	echo "No resource store found (checked website/static/resources and gama.wiki/resources)." >&2
	exit 1
fi

copied=0
missing=0
while IFS= read -r ref; do
	rel="${ref#/resources}"
	[ -f "$ARCHIVE$rel" ] && continue
	if [ -f "$RESOURCE_DIR$rel" ]; then
		mkdir -p "$(dirname "$ARCHIVE$rel")"
		cp "$RESOURCE_DIR$rel" "$ARCHIVE$rel"
		copied=$((copied + 1))
	else
		echo "Not found anywhere (recover it from gama.wiki.bak history): $ref" >&2
		missing=$((missing + 1))
	fi
done < <(
	# Comments are skipped: they hold screenshot placeholders for images that
	# don't exist yet (`<!-- SCREENSHOT NEEDED ... -->`, converted into
	# `{/* ... */}` by script/escapingTags.py) and are never rendered.
	# Only site-absolute paths (preceded by `(`, a quote, `=` or a space) are
	# kept, not `/resources/` appearing inside an external https://... URL.
	find "$ROOT/website/versioned_docs" -type f \( -name "*.md" -o -name "*.mdx" \) -exec cat {} + \
		| perl -0777 -pe 's/<!--.*?-->//gs; s/\{\/\*.*?\*\/\}//gs' \
		| grep -oiE '(^|[("'"'"'=[:space:]])/resources/[^])"'"'"'[:space:]>]+\.(png|jpe?g|gif|svg|webp|bmp)' \
		| sed -E 's|^[^/]*||' \
		| sort -u
)

echo "Archived $copied new image(s) into website/versioned_resources/ ($missing not found)."
[ "$missing" -eq 0 ]
