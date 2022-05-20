##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# This script will correct images path in <files>.md.
#
# ex: <baseUrl>/[docs,wiki]/<file>	
#	prev: ![images/parent_species.png](resources/images/tutorials/parent_species.png)
#	new : ![images/parent_species.png](/resources/images/tutorials/parent_species.png)

#!/bin/sh

for f in ./docs/*.md ; do
	sed -r -i "s/\]\(resources/\]\(\/resources/g" "$f"
	sed -i "s/\"> == \$0/\" \/>/g" "$f"
done
