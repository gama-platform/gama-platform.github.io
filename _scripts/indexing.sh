#!/bin/sh

cat lunr.json | node build-index.js > index.json
cat lunr.operators.json | node build-index.js > index_operator.json
cat lunr.architectures.json | node build-index.js > index_architectures.json
cat lunr.skills.json | node build-index.js > index_skills.json
cat lunr.species.json | node build-index.js > index_species.json
cat lunr.types.json | node build-index.js > index_types.json
cat lunr.literals.json | node build-index.js > index_literals.json
cat lunr.statements.json | node build-index.js > index_statements.json
cat lunr.constants.json | node build-index.js > index_constants.json