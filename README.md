# Flashcards (Prototype)

> **This is a prototype, not production-ready.** It is being shared with OpenCraft to judge whether a
> real implementation is worth building.

A fork of OpenCraft's [FlashcardsXBlock](https://github.com/open-craft/FlashcardsXBlock) (forked at
`4fd1e1d`, version 1.1.1), renamed so both blocks can be installed side by side:

- Python package `flashcards` → `flashcards_prototype`; distribution `FlashcardsXBlock` → `FlashcardsPrototypeXBlock`
- Block type / OLX tag `flashcards` → `flashcards_prototype`
- Class `FlashcardsXBlock` → `FlashcardsPrototypeXBlock`; default display name "Flashcards (Prototype)"
- JavaScript init functions `FlashcardsPrototypeBlock` / `FlashcardsPrototypeEditor`

What changed beyond the rename:

- **Learner view redesigned** from the Exemplars-System Figma file: launch card, full-window deck,
  flip, "Missed it" / "Got it", outcome screen, "practice what you missed". It is built on the local
  [exemplar design system](../exemplar-design-system) instead of Paragon and renders in a shadow root.
  In the learning app it opens in the app's full-window modal.
- **New `intro` field** for the launch-card text, editable in Studio.
- **Styling page removed** from the Studio editor. The `styling` field is kept only so existing
  content and OLX still load.
- **Card HTML is sanitized** with `nh3` when saved from Studio and when imported from OLX, and Studio
  saves are validated (a bad save returns a 400 and Studio shows the error). Decks are capped at 500 cards.
- The prebuilt bundles in `flashcards_prototype/public/` were rebuilt from the new frontend.

The original copyright and the LICENSE file are kept.

## Requirements

The frontend depends on the design system through a local path
(`"@zoux/exemplar-design-system": "file:../../exemplar-design-system"` in `frontend/package.json`),
so it only builds when `exemplar-design-system` is checked out next to this repo. The Python package
and the committed bundles in `public/` work without it.

## Installation

Not published to PyPI (the publish workflow is disabled). Install from a checkout:

```sh
pip install -e path/to/xblock-flashcards-prototype
```

In Tutor, add the git URL of wherever this repo ends up to `OPENEDX_EXTRA_PIP_REQUIREMENTS`.

## Usage

In Studio, open the course's "Advanced settings" and add `"flashcards_prototype"` to the
"Advanced module list". Then add "Flashcards (Prototype)" from a unit's "Advanced" component list.

### XBlock workbench

```sh
cd ../xblock-sdk
uv pip install --python .venv/bin/python -e ../xblock-flashcards-prototype
.venv/bin/python manage.py runserver
```

Then open http://localhost:8000 and pick the "FlashcardsPrototypeXBlock" scenario.

## Screenshots

The screenshots in `screenshots/` show the **original** block's UI, not the redesign.

## Development notes

- Python tests: `uv run pytest` (or `mise run test`). Lint: `uv run tox -e quality`.
- The PyPI publish workflow (`.github/workflows/pypi-publish.yml`) only runs manually for now.

### Frontend

The frontend is built using Typescript and React; it must be built before it can be used.
See ./mise.toml and ./frontend/package.json for available tasks.
An example development workflow could look something like this:

```sh
# install dependencies
mise run frontend-install

# run a development server with hot-reloading
mise run frontend-dev

# edit the frontend files

# when ready, kill the dev server, and build the frontend.
# If you have this XBlock installed on your Open edX devstack, you can then refresh the page to see updates in live components in a course on the devstack.
mise run frontend-build

# check the unit tests
mise run frontend-test
```

## Want to contribute?

This prototype has no issue tracker yet. For the original block, see
[open-craft/FlashcardsXBlock](https://github.com/open-craft/FlashcardsXBlock/issues).
