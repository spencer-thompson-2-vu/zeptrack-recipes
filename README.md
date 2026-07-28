# ZepTrack Recipes

A mobile-first PWA recipe companion for Zepbound (GLP-1) users. Built to complement the ZepTrack nutrition tracking app.

---

## Features

- **5 high-protein, high-fiber dinner recipes** scaled for 3 (adjustable 1–12+)
- **Per-100g macro blocks** in ZepTrack paste-and-parse format
- **Live serving scaler** — ingredients and shopping list update in real time
- **Shopping list** with checkable items (green = already have), copy-to-clipboard
- **Star ratings + Cooked It! counter** per recipe, persisted via localStorage
- **Full-text search** across recipe names, ingredients, and tags
- **Version checker** — notifies when a newer version is available on GitHub
- **PWA installable** — add to home screen on iOS (Safari) or Android (Chrome)
- **Dark mode** matching ZepTrack app palette

---

## Tech Stack

| Layer | Detail |
|---|---|
| Runtime | Vanilla HTML/CSS/JS — zero dependencies, zero build step |
| Fonts | DM Serif Display + Inter via Google Fonts |
| Storage | `localStorage` for ratings, cook counts |
| Hosting | GitHub Pages (static) |
| Version check | `fetch()` against `version.json` in repo root |

---

## File Structure

```
/
├── index.html       # Full app — single file
├── version.json     # Version manifest (checked on load)
└── README.md        # This file
```

---

## Versioning Convention

Format: `MAJOR.MINOR`

| Increment | When |
|---|---|
| MAJOR | Structural overhaul, new data model, breaking localStorage change |
| MINOR | New recipes, UI changes, bug fixes, feature additions |

Current: **v1.1**

### Version History

| Version | Date | Notes |
|---|---|---|
| 1.1 | 2026-07-28 | Initial GitHub Pages release. Dark mode, PWA, logo, version checker. |

---

## Updating the App

### Adding a recipe

1. In `index.html`, add a card in the `#cards-grid` section following the existing pattern
2. Add a `<div class="recipe-page" id="rN">` section with full recipe content
3. Add ingredient data to the `RECIPES` object in the `<script>` block
4. Bump the version in both `index.html` (`APP_VERSION` const) and `version.json`
5. Commit both files — GitHub Pages redeploys in ~60 seconds

### Updating version.json after a deploy

```json
{
  "version": "1.2",
  "released": "YYYY-MM-DD",
  "notes": "Brief description of what changed."
}
```

---

## ZepTrack Macro Format

Each recipe page contains a copy-paste block in this exact format for ZepTrack's paste-and-parse feature:

```
Recipe Name: [name]
Per 100g:
Calories: [n]
Protein: [n]g
Carbs: [n]g
Fat: [n]g
Fiber: [n]g
```

Per-100g values are calculated as: `(total macro for full recipe) ÷ (total finished weight in grams) × 100`

---

## Installing as a Home Screen App

**Android (Chrome):**
1. Open `https://spencer-thompson-2-vu.github.io/zeptrack-recipes/`
2. Tap ⋮ menu → "Add to Home screen"
3. Confirm name and tap Add

**iPhone (Safari only — Chrome does not support PWA install on iOS):**
1. Open the URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll to "Add to Home Screen" → tap Add

---

## Local Development

No build tools needed. Open `index.html` directly in a browser.

Note: the version checker uses `fetch()` which is blocked on `file://` URLs in some browsers. Use a local server for full testing:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Author

Spencer Thompson · [@spencer-thompson-2-vu](https://github.com/spencer-thompson-2-vu)
