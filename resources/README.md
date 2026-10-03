# Versioned resources archive

`versioned_docs/` holds frozen snapshots of past documentation versions, but
`website/static/resources` is regenerated on every build straight from the
current `gama.wiki` (see `script/unstructurize.sh`) and is git-ignored. When
the wiki renames, moves, or deletes an image, any versioned doc that still
references the old path silently breaks (missing `<img>` at build/runtime).

This folder is a git-tracked, permanent archive of every image that a
`versioned_docs/**` (or `docs/**`) file references by path
(`/resources/...`) but that is no longer present in the live wiki. It mirrors
the `resources/` layout exactly (e.g. an image referenced as
`/resources/images/foo/bar.png` lives at
`versioned_resources/images/foo/bar.png`).

`script/unstructurize.sh` copies this archive on top of the freshly
regenerated `website/static/resources` using `cp -rn` (no-clobber), so wiki
content always wins when a file exists in both places, and this archive only
fills gaps.

## Regenerating / checking for new gaps

After the wiki content is refreshed (`gama.wiki` regenerated from
`gama.wiki.bak`), run `script/find_missing_resources.sh` from the repo root.
It diffs every `/resources/...` reference under `docs/` and
`website/versioned_docs/` against what `website/static/resources` (or, if not
built yet, `gama.wiki/resources`) actually contains, and lists anything
missing. For each missing file, either:

- it still exists in `gama.wiki.bak` under a different path (renamed), or
- it exists somewhere in `gama.wiki.bak`'s git history (deleted),

and can be recovered with `git show <commit>:<path> > destination`. Add the
recovered file to this folder at the path the doc actually references, then
commit it.
