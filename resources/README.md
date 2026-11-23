# Versioned resources archive

`versioned_docs/` holds frozen snapshots of past documentation versions, but
`website/static/resources` is regenerated on every build straight from the
current `gama.wiki` (see `script/unstructurize.sh`) and is git-ignored. When
the wiki renames, moves, or deletes an image, any versioned doc that still
references the old path silently breaks (missing `<img>` at build/runtime).

This folder is a git-tracked, permanent archive of **every image** that a
`versioned_docs/**` file references by path (`/resources/...`), whether or
not the live wiki still ships it, so that no wiki change can ever break a
frozen doc version. It mirrors the `resources/` layout exactly (e.g. an image
referenced as `/resources/images/foo/bar.png` lives at
`versioned_resources/images/foo/bar.png`). Only images are archived: PDFs,
zips, ... are plain download links that can't break the build, and weigh
several hundred MB.

`script/unstructurize.sh` copies this archive on top of the freshly
regenerated `website/static/resources` using `cp -rn` (no-clobber), so wiki
content always wins when a file exists in both places, and this archive only
fills gaps.

## Keeping the archive complete

This is automatic when a new doc version is cut from `website/` with
`npm run docusaurus docs:version <v>` (or `npm run docs:version -- <v>`):
the `docusaurus` npm script goes through `script/docusaurus.sh`, which runs
`script/archive_versioned_resources.sh` right after a successful
`docs:version`. Just commit the new files in this folder along with the new
version. (Calling the docusaurus binary directly, e.g. `npx docusaurus`,
bypasses the hook: run `bash script/archive_versioned_resources.sh` by hand
then.) The wiki resources must have been regenerated first.

The archive script copies every image the versioned docs reference that
isn't archived yet, never overwrites, and lists (and exits non-zero on) any
image found nowhere - recover those as described below.

## Checking for new gaps

After the wiki content is refreshed (`gama.wiki` regenerated from
`gama.wiki.bak`), run `script/find_missing_resources.sh` from the repo root.
It diffs every `/resources/...` reference under `docs/` and
`website/versioned_docs/` against what `website/static/resources` (or, if not
built yet, `gama.wiki/resources`) actually contains, and lists anything
missing. References inside comments are ignored: the wiki uses
`<!-- SCREENSHOT NEEDED: ... -->` blocks as placeholders for images that
don't exist yet, and those are never rendered (`script/escapingTags.py`
converts HTML comments into MDX `{/* ... */}` comments, since Docusaurus v4
mode no longer accepts HTML comments). For each missing file, either:

- it still exists in `gama.wiki.bak` under a different path (renamed), or
- it exists somewhere in `gama.wiki.bak`'s git history (deleted),

and can be recovered with `git show <commit>:<path> > destination`. Add the
recovered file to this folder at the path the doc actually references, then
commit it.
