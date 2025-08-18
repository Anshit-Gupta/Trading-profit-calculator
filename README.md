# Trading — Profit & Expense Calculator

A small, focused web tool (vanilla HTML/CSS/JS) to compute purchase costs, expenses and selling price with margin. Includes:

* Theme toggle (Light / Dark) with persistent preference.
* Language toggle (English ↔ हिंदी) — full UI and summary translations.
* Unit selectors for Mandi Tax, Agent/Arhat and Mandi Agent Commission (₹ / %).
* Optional **Mandi Agent Commission** (toggleable) — excluded from calculations when turned off.
* Polished UI, accessibility attributes, and clear calculation logic.

---

## Demo

https://anshit-gupta.github.io/Trading-profit-calculator/

---

## Features

* **Purchase total** = `Purchase Price × Quantity`.
* Percent options (%) are applied to the Purchase Total (not per-unit) — this is the expected mandi convention.
* **Mandi Agent Commission** can be included/excluded via a checkbox. When excluded, it is removed from costs and the breakdown.
* **Margin (%)** (optional) computes Selling Price (per unit) and Net Profit.
* **Localization**: All form labels, summary labels, breakdown items, buttons and messages translate between English and Hindi. Translations are stored in `script.js` and applied at runtime.
* **Accessibility**: Theme & Language controls use `role="switch"` and `aria-checked`. Form controls are keyboard-focusable.

---

## Tech

* Plain HTML, CSS and JavaScript (no frameworks).
* Currency formatting uses `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.

---


## Files

* `index.html` — main UI
* `style.css` — styling and layout
* `script.js` — calculation, toggles, localization and UI logic

---

## Behaviour & Implementation notes


### Localization

* The app stores the original English `innerHTML` for all translatable elements at load time and restores them when switching back to English. This preserves inline markup such as `<strong>`.
* Translations live in `script.js` under a `translations` object (keyed by language code). Add/modify translations there.

### Theme

* Theme preference is saved to `localStorage` under `trade_calc_theme`.
* Theme toggling updates `data-theme="dark"` on the `html` element so CSS variables switch cleanly.

---

## Edge cases & testing

Recommended tests and validations:

* Zero quantity: the Purchase Total should be `₹0.00` and percent-based expenses become `₹0.00`.
* Empty margin: should hide the profit block and show a friendly message.
* Negative or nonsensical input prevention: HTML `min="0"` is set on numeric fields. You may want to add additional validation for empty strings or NaNs.
* Language switching must preserve formatting and markup inside translatable strings — use `innerHTML` for those.

---

## Accessibility

* Theme & language controls: `role="switch"`, `tabindex="0"`, `aria-checked` are used.
* Inputs use semantic `input` elements with proper `type="number"` and `min` attributes.
* Consider adding visually hidden labels for screen readers if you expand the UI.

---

## AI usage & attribution

This project was developed with a mix of manual coding and **AI-assisted scaffolding**. Specifically:

* AI was used to generate initial HTML/CSS scaffolding and language translation drafts.
* All generated code and translations were reviewed, corrected, and tested manually.

