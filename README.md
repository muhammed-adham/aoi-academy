# AOI Academy website

A bilingual (English / Arabic) website for a training academy: courses, rooms and labs, instructors, news, videos,
booking and enrollment forms. Plain HTML, CSS and JavaScript. There is **no build step and no framework**.

## Run it

The pages load the header and footer with `fetch()` and the scripts are ES modules, so open the site through a
local web server (double-clicking the HTML files will not work).

```powershell
npx http-server -c-1
```

Any static server works (`python -m http.server`, VS Code Live Server, ...). Then open <http://localhost:8080>.

## Folder structure

```
index.html, courses.html, ...     one HTML file per page (content only, no inline scripts or styles)
components/
  header.html, footer.html        shared header and footer, inserted into every page
assets/
  css/
    loading.css                   Arabic loading screen (loaded first, before anything else)
    main.css                      imports base, navbar, buttons, cards, forms, layout, ui
    pages/                        styles used by one page only (home, news, videos, ...)
  js/
    core/                         shared code (see below)
    pages/                        one small script per page: <script type="module" src="assets/js/pages/x.js">
  data/                           English content: courses, rooms, instructors, videos, news, hero slides, demo data
  i18n/                           Arabic: the UI dictionary (ui.ar.js) and the Arabic version of each data file
```

### `assets/js/core`

| File | Purpose |
| --- | --- |
| `boot.js` | Start-up every page runs first: language, header/footer, event handling, reveal |
| `config.js` | Site settings (demo data on/off, YouTube API key, storage keys) |
| `i18n.js` | Language switching and the translator (English text in the page -> Arabic) |
| `components.js` | Loads `components/*.html` (cached, so there is no flash) and marks the active menu link |
| `actions.js` | Event delegation: `data-action`, `data-submit`, `data-change` attributes instead of inline handlers |
| `forms.js` | Sign in / sign up / enrollment / booking / contact forms |
| `auth.js`, `storage.js` | Demo sign-in state and safe `localStorage` / `sessionStorage` wrappers |
| `dom.js` | Small helpers (`$`, `$$`, `escapeHtml`, `getParam`) |
| `timing.js` | Page timing log in the browser console |
| `ui/` | Reusable widgets: cards, "Show more", filter pills, custom select arrows, page extras |

## How things work

### Pages

Every page has the same shape: the shared `<head>`, `<div id="header">`, a `<main id="main">`, `<div id="footer">`, and
one `<script type="module">` that imports `assets/js/pages/<page>.js`. That script starts with
`import '../core/boot.js'` and then renders the page (usually from a data file).

### Languages

English is written directly in the HTML and in the data files. When Arabic is selected, `core/i18n.js` walks the page and
replaces every text that has an entry in the dictionary; switching back restores the English. The visitor's choice is
remembered in `localStorage` (`lang`). Arabic visitors see a loading screen until the page is ready, so they never see
English flash first.

* **Fixed interface text**: add `"English text": "النص العربي"` to `assets/i18n/ui.ar.js`.
* **Text with numbers** ("12 Weeks", "$200/hour"): patterns at the top of `ui.ar.js`.
* **Data** (courses, rooms, instructors, videos): put the Arabic in the matching `assets/i18n/<name>.ar.js`;
  the data module attaches it to each item and registers it with the translator.
* News articles and the home slider keep their own Arabic text and are drawn again when the language changes.

### Changing content

| To change | Edit |
| --- | --- |
| Courses | `assets/data/courses.js` and `assets/i18n/courses.ar.js` |
| Rooms and labs | `assets/data/rooms.js` and `assets/i18n/rooms.ar.js` |
| Instructors | `assets/data/instructors.js` and `assets/i18n/instructors.ar.js` |
| Videos (YouTube ids) | `assets/data/videos.js` and `assets/i18n/videos.ar.js` |
| News | `assets/data/news.js` and `assets/i18n/news.ar.js` |
| Home page slides | `assets/data/hero-slides.js` |
| Header / footer | `components/header.html`, `components/footer.html` |

### Demo data

`assets/data/demo.js` adds extra sample courses, news, videos and rooms so you can see how lists, filters and
"Show more" behave when full. Turn it off with `demoData: false` in `assets/js/core/config.js`.

### Forms

There is no backend. Submitting the enrollment, booking or contact form stores a summary in `sessionStorage` and opens
`success.html`, which shows it. Sign in / sign up only remember the visitor in this browser (demo). Connect the
`onSubmit(...)` handlers in `core/forms.js` to a real API when one exists.

### YouTube view counts

The videos page shows live view counts using the YouTube Data API. The key in `core/config.js` is visible in the
browser: restrict it in Google Cloud Console to your website's domain and to "YouTube Data API v3" only. Leave it empty
to hide the counts.

## Conventions

* No inline `style`, `onclick` or `<script>` blocks in the HTML: styles live in `assets/css`, behaviour in `assets/js`.
* Behaviour is attached with `data-action`, `data-submit` and `data-change` (see `core/actions.js`).
* Text coming from data is always escaped with `escapeHtml` before it is put into HTML.
* Two-space indentation, LF line endings (see `.editorconfig`).
