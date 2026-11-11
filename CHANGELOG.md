# Changelog

## Unreleased — prototype (fork of 1.1.1)

- Rename to `flashcards_prototype` / `FlashcardsPrototypeXBlock` so it installs next to the original block.
- Redesign the learner view on the local exemplar design system (launch card, flip, missed/got, outcome
  screen, practice missed), replacing Paragon in the learner view.
- Add an `intro` field for the launch-card text.
- Remove the Studio styling page; keep the `styling` field for OLX compatibility only.
- Sanitize card HTML with `nh3` on Studio save and OLX import.
- Validate Studio saves (400 with a message on bad input) and cap decks at 500 cards; show save errors in Studio.
- Studio editor: connect the Front/Back labels to their editors, stable list keys, label the delete buttons.
- Mark the package as Alpha and make the PyPI publish workflow manual-only.

## 1.1.1 — 2026-07-31

- Fix content library issues
- Harden search indexing: HTML is now stripped with `nh3`, dropping script/style contents and decoding entities.

## 1.1.0 — 2026-07-21

- Add content-search (Meilisearch) support: card fronts and display name are indexed via `index_dictionary`.
- Fix unstyled TinyMCE editor in Studio by resolving skin/content CSS from the bundle (`skin_url: 'default'`).


## 1.0.2rc3 — 2026-06-02

- Preserve flashcards content, display name, and styling during OLX import/export.
- Fix Studio clipboard copy/paste by restoring proper OLX serialization and deserialization for flashcards.
