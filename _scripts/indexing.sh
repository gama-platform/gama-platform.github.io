#!/bin/sh

cat ./indexes/lunr.json | node ./_scripts/build-index.js > ./indexes/index.json
cat ./indexes/lunr.operators.json | node ./_scripts/build-index.js > ./indexes/index_operator.json
cat ./indexes/lunr.architectures.json | node ./_scripts/build-index.js > ./indexes/index_architectures.json
cat ./indexes/lunr.skills.json | node ./_scripts/build-index.js > ./indexes/index_skills.json
cat ./indexes/lunr.species.json | node ./_scripts/build-index.js > ./indexes/index_species.json
cat ./indexes/lunr.types.json | node ./_scripts/build-index.js > ./indexes/index_types.json
cat ./indexes/lunr.literals.json | node ./_scripts/build-index.js > ./indexes/index_literals.json
cat ./indexes/lunr.statements.json | node ./_scripts/build-index.js > ./indexes/index_statements.json
cat ./indexes/lunr.constants.json | node ./_scripts/build-index.js > ./indexes/index_constants.json