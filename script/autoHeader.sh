##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# Docusaurus need some metadata in <files>.md to display a better website.
# This particular header should be define in a header following rules
# explain in the doc (link below)
#
# Good2Know : If we don't precise id tag in the header, Docusaurus
# will set the filename as the id (which is precisely the id wanted)
# 
# https://docusaurus.io/docs/en/doc-markdown#markdown-headers

#!/bin/sh

DOC_DIR="docs"

# Loop though every md files in subfolder $DOC_DIR
find $DOC_DIR -name "*.md" | while read pathfile; do 

	# If no header set
	# check if first line is "---"
	if [ "$(awk 'FNR <= 1' \"./$pathfile\")" != "---" ];then
	
		# Looking for the main title in file (tag h1)
		title=$(sed -n '/^\#\ /p' "$pathfile");

		# If a title was find, add it in the header	
		if [ ! -z "$title" ];then
			# Remove the "#" from the title
			title=$(echo "$title" | sed 's/\#//g')

			sed -i '/^\#\ /d' "$pathfile"
		fi;

		# Start Header
		sed -i '1s/^/---\n\n/' "$pathfile";

		# Writing title
		sed -i -e "1s/^/title: $title\n/" "$pathfile";

		# The id is (by default) egal to the filename
		# -> We want it

		# End Header
		sed -i '1s/^/---\n/' "$pathfile";
	fi
done
