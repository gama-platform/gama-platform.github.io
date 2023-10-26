#!/bin/bash

# Clean false positive of `escapingTags.py`
for f in $( dirname "${BASH_SOURCE[0]}" )/../docs/*.md ; do
	sed -i "s/&lt;a /<a /g" "$f"
	sed -i "s/&lt;A /<A /g" "$f"
	sed -i "s/&lt;img /<img /g" "$f"
done

# Remove meta files not for website
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/G__BlankPage.md"
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/Operators.md"
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/OperatorsSplitted.md"
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/Index.md"
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/Event"*
# https://github.com/gama-platform/gama-platform.github.io/issues/118
rm -fr "$( dirname "${BASH_SOURCE[0]}" )/../docs/UnitsAndConstantsPDF.md"

# Verify every MD have a FM title, otherwise set one by default
for f in $( dirname "${BASH_SOURCE[0]}" )/../docs/*.md ; do
	newTitle=$((basename $f) | cut -d "." -f 1 | sed "s/[-_]/ /g")

	sed -i "s/^title:\ $/^title:\ $newTitle/g" "$f"
done