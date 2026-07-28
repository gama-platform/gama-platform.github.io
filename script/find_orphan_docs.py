#!/usr/bin/env python3
##
# Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
#
# This source code is licensed under the GPL3 license found in the
# LICENSE file in the root directory of this source tree.
##

# Docusaurus happily builds a doc that isn't listed in any sidebar: it just
# gets a route (reachable by direct URL) with no nav entry, so it becomes
# unfindable through normal browsing. Docusaurus itself doesn't warn about
# this, so this script cross-references, for every version (current docs/
# plus each website/versioned_docs/version-*), the set of *.md files on disk
# against every doc id referenced anywhere in that version's sidebar JSON.
#
# Usage: python3 script/find_orphan_docs.py   (run from repo root)

import json
import os
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEBSITE = os.path.join(ROOT, "website")


def collect_ids(node, ids):
	if isinstance(node, str):
		ids.add(node)
	elif isinstance(node, dict):
		if isinstance(node.get("id"), str):
			ids.add(node["id"])
		for v in node.values():
			collect_ids(v, ids)
	elif isinstance(node, list):
		for v in node:
			collect_ids(v, ids)


def doc_ids_in_dir(d):
	return {f[:-3] for f in os.listdir(d) if f.endswith(".md") and not f.startswith("_")}


def main():
	versions = [("current", os.path.join(ROOT, "docs"), os.path.join(WEBSITE, "sidebars.json"))]

	versions_file = os.path.join(WEBSITE, "versions.json")
	if os.path.isfile(versions_file):
		for v in json.load(open(versions_file)):
			versions.append((
				v,
				os.path.join(WEBSITE, "versioned_docs", f"version-{v}"),
				os.path.join(WEBSITE, "versioned_sidebars", f"version-{v}-sidebars.json"),
			))

	labels = [label for label, _, _ in versions]
	orphan_in = defaultdict(set)
	present_in = defaultdict(set)

	for label, docs_dir, sidebar_file in versions:
		if not os.path.isdir(docs_dir) or not os.path.isfile(sidebar_file):
			print(f"skipping {label}: missing docs dir or sidebar file", file=sys.stderr)
			continue

		all_ids = doc_ids_in_dir(docs_dir)
		listed_ids = set()
		collect_ids(json.load(open(sidebar_file)), listed_ids)

		for doc_id in all_ids:
			present_in[doc_id].add(label)
		for doc_id in all_ids - listed_ids:
			orphan_in[doc_id].add(label)

	always = {i: v for i, v in orphan_in.items() if v == present_in[i]}
	sometimes = {i: v for i, v in orphan_in.items() if v != present_in[i]}

	def fmt(vers):
		return ", ".join(sorted(vers, key=labels.index))

	print(f"=== Always orphaned (unreachable in every version they exist in) — {len(always)} ===")
	for doc_id in sorted(always):
		print(f"  {doc_id}.md  [{fmt(present_in[doc_id])}]")

	print(f"\n=== Sometimes orphaned (in nav for some versions, missing for others) — {len(sometimes)} ===")
	for doc_id in sorted(sometimes):
		missing = orphan_in[doc_id]
		present = present_in[doc_id] - missing
		print(f"  {doc_id}.md  orphaned in [{fmt(missing)}], listed in [{fmt(present)}]")

	print(f"\nTotal orphan doc-version pairs: {sum(len(v) for v in orphan_in.values())}")


if __name__ == "__main__":
	main()
