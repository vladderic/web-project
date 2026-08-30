# Project Brief

## 1. Website Concept

**Website Name:** Project Spotlights

**Website Topic:** Car Discussion Forum - a place for car enthusiasts to share and discuss car builds

**Why:** Mechanics and car enthusiasts constantly need advice when working on cars. This website allows them to access information they need, ask questions and post the builds they are proud of.

**Target Audience:** Mechanics, car enthusiasts and people who are only getting into the car scene as beginners.

**Visitor Outcome:** Share their builds and get the information they need.

**Three Main Sections:**
1. Submit the build form
2. Comment section under each build
3. Reactions to builds

**Key Highlight:** Ability to upload your own builds or browse existing ones.

---

## 2. Visual Plan

**Mood and Tone:** Modern & sleek — a dark showroom/enthusiast-magazine vibe (think Top Gear/Jalopnik).

**Color Palette:**
- Background: `#0D0D12`
- Surface/Card: `#1A1A22`
- Primary (accent): `#FF6B00`
- Accent hover: `#FF8C42`
- Text: `#F5F5F7`

**Typography:**
- Heading Font: Oswald (bold, uppercase, sporty)
- Body Font: Inter (clean and readable)

**Layout Approach:** Sticky header -> hero -> card grid gallery -> submission form -> footer

**Images & Graphics Style:** Rounded card images with zoom-hover and a subtle dark overlay on hover.

**Button & UI Style:** Primary buttons filled with hot-orange accent, secondary buttons dark style that fills orange on hover. Form inputs dark with orange focus outline.

---

## 3. Interaction Specifications

### Interaction 1
- **Interaction Name:** Like a Build
- **Visitor Action:** Clicks the 👍 Like button on a build card.
- **Page Response:** The button fills with orange, the like count increments by 1; clicking again un-likes it (count drops back).
- **HTML Elements:** Reaction button `.like-btn`, like count `<span class="like-count">`
- **JS Event:** `click` on the like button
- **Function Name:** `likeBuild`
- **CSS Class Toggled:** `.liked` (toggled on the like button)

### Interaction 2
- **Interaction Name:** Post a Comment
- **Visitor Action:** Types in a comment box under a build and presses the "Post" button (or Enter).
- **Page Response:** A new comment (with the visitor's name and message) instantly appears in that build's comment list; the input field clears.
- **HTML Elements:** Comment form container, text input, name input, submit button, comment list `<ul>`
- **JS Event:** `click` on the Post button (or `keydown` Enter on the input)
- **Function Name:** `postComment`
- **CSS Class Toggled:** `.comment-item` (new comment element gets this class)

### Interaction 3
- **Interaction Name:** Submit Your Build
- **Visitor Action:** Fills in the submission form (build title, image URL, owner name, build story, category) and clicks "Submit Your Build."
- **Page Response:** A new build card is added to the gallery automatically, the form clears, and a confirmation message shows that the build was submitted.
- **HTML Elements:** Submission form with title, image, name, story, category fields; submit button; gallery container; confirmation message element
- **JS Event:** `submit` on `#build-form`
- **Function Name:** `submitBuild`
- **CSS Class Toggled:** `.build-card` (new card gets this class); `.submission-confirmation` (shown on success)

### Interaction 4
- **Interaction Name:** Filter Builds by Category
- **Visitor Action:** Clicks a filter button (e.g. "All," "Muscle," "JDM," "Trucks") at the top of the gallery.
- **Page Response:** The gallery hides/shows cards so only builds matching the chosen category are visible; the active filter button is highlighted.
- **HTML Elements:** Filter button group, gallery container, each build card (with a `data-category` attribute)
- **JS Event:** `click` on a filter button
- **Function Name:** `filterBuilds`
- **CSS Class Toggled:** `.hidden` (toggled on cards that don't match); `.active-filter` (toggled on the selected filter button)

---

## 4. Architecture Plan

**HTML Structure Plan:**
- `<header class="site-header">` — sticky nav bar with site logo/name and tagline
- `<section class="hero">` — intro band with headline, tagline, and CTA buttons ("Browse Builds" / "Submit Yours")
- `<main>`
  - `<section id="gallery" class="gallery-section">` — contains:
    - `<div class="filter-bar">` — filter buttons group (All / Muscle / JDM / Trucks)
    - `<div id="gallery-grid" class="gallery-grid">` — the responsive card grid
    - Each build card: `<article class="build-card" data-category="...">` containing:
      - `<img class="build-image">`
      - `.build-info` → `<h3 class="build-title">`, `<span class="build-owner">`, `<p class="build-story">`
      - `.reactions` → `<button class="like-btn">` with `<span class="like-count">`
      - `.comments` → `<ul class="comment-list">`, plus `.comment-form` (name input, comment input, post button)
  - `<section id="submit" class="submit-section">` — the "Submit Your Build" `<form id="build-form">` with fields: title, image URL, owner name, build story, category select, and submit button; plus `<p id="confirmation-msg" class="submission-confirmation">`
- `<footer class="site-footer">` — credits line

**CSS Architecture Plan:**
1. **Reset / base** — universal box-sizing, margin/padding reset, body defaults (bg `#0D0D12`, font Inter, color `#F5F5F7`)
2. **Typography** — Oswald for headings, Inter for body
3. **Layout** — sticky header, hero, gallery grid (CSS Grid, responsive `repeat(auto-fill, minmax(260px, 1fr))`), form layout, footer; media queries for mobile stacking
4. **Components** — header, hero, filter buttons, build cards (rounded, zoom-hover on image), like button, comment styles, form inputs, buttons (primary orange, secondary dark), confirmation message
5. **Interactive state styles** — hover states (orange fills, image zoom), `.active-filter`, `.liked` (pressed like button), `.hidden` (for filtering), focus styles on inputs/buttons

**JavaScript Function Map:**
- `likeBuild` — Event: click on `.like-btn` → Toggles `.liked` on the button; increments/decrements the `.like-count`
- `postComment` — Event: click on Post button (or Enter on input) → Appends `.comment-item` to `.comment-list`; clears the comment/name inputs
- `submitBuild` — Event: submit on `#build-form` → Reads form values → creates a new `.build-card` in `#gallery-grid`; shows `#confirmation-msg`; resets the form
- `filterBuilds` — Event: click on a `.filter-btn` → Toggles `.hidden` on `.build-card` based on `data-category`; toggles `.active-filter` on the clicked button

**Implementation Steps:**
1. **HTML skeleton** — build all semantic sections + static starter build cards in `index.html` (pre-seeded gallery so it's not empty)
2. **Reset & base styles** — set up `styles.css` with reset, fonts (Oswald/Inter), color variables, and global layout
3. **Layout styling** — sticky header, hero, gallery grid, form, footer; make responsive
4. **Component styles** — style build cards, buttons, filter bar, comment section, and form inputs per the visual plan
5. **Interactive JS** — `likeBuild` (simplest) → `postComment` → `filterBuilds` → `submitBuild` (most complex, pulls the pieces together)
6. **Test & polish** — verify all four interactions in `script.js`, check mobile layout, and confirm hover/active states
