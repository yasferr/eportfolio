# MSc AI E-Portfolio: GLACIER edition

A simple static website (HTML, CSS, JavaScript; no frameworks). Each of the 8 modules has its own page with aims, learning outcomes and up to 15+ files that every visitor can **view on the page** or **download**.

## 1. Add a file (2 steps)
1. Put the file in the module folder, for example `files/module-1/`.
2. Open `js/data.js`, find the module and add **one line** to its `files` list:

```js
"files/module-1/my-report.pdf",
```

Want a nicer title, a description or groups? Use the long form:

```js
{ path: "files/module-1/my-report.pdf", name: "Report: Sorting algorithms",
  desc: "One short sentence about the file.", category: "Assignments" },
```

- `name` (optional): if missing, it is made from the file name.
- `desc` (optional): shown on the card (2 lines max).
- `includes` (optional): a list of short labels shown on the card as "Inside this file", e.g. `includes: ["Critical evaluation", "Case studies"]`.
- `category` (optional): if at least one file has it, the module page groups files under headings such as "Assignments", "Code", "Reflections".
- A link to a file stored elsewhere (Google Drive, OneDrive) also works: `{ path: "https://...", name: "Dataset", desc: "..." }`. It shows an "Open link" button.

Order in the list = order on the page. With more than 5 files the page automatically shows type filters and a search box.

## 2. What visitors can do
| File type | View on the page | Download |
|---|---|---|
| PDF | yes (on phones it opens in a new tab) | yes |
| Images (png, jpg, gif, webp, svg) | yes | yes |
| Word, PowerPoint, Excel (docx, pptx, xlsx...) | yes, once the site is online | yes |
| Text and code (txt, md, py, r, sql, csv, json) | yes | yes |
| Jupyter notebook (ipynb) | yes, once the site is online (opens in a new tab) | yes |
| mp4 video | yes | yes |
| ZIP / RAR / 7z | no (archives cannot be previewed) | yes |

In the viewer, visitors can move between files with the arrow buttons or the keyboard arrows, and close it with Esc.

**Direct links:** every file has its own link, e.g. `https://YOUR-USERNAME.github.io/eportfolio/module.html?m=1#file-3` opens file 3 of Module 1 straight in the viewer. Handy to paste into your assignment document.

## 3. File name tips
- Use simple names: lowercase, hyphens, no accents or special characters (`sorting-report-v2.pdf`).
- GitHub Pages is **case-sensitive**: `Report.pdf` and `report.pdf` are different files. The path in `data.js` must match exactly.
- Keep files reasonably small so they open quickly (compress big PDFs if you can).

## 4. Publish on GitHub Pages (free, public)
1. Create a free GitHub account, then **New repository** (public), e.g. `eportfolio`.
2. Upload the contents of this folder (**Add file → Upload files**), then **Commit changes**.
3. **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save**.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/eportfolio/`.

### Upload limits (official GitHub rules)
- Uploading in the browser: **max 25 MiB per file** and **max 100 files at a time**.
- With 8 modules x 15 files you may pass 100 files, so upload **one module folder at a time** (open the folder, then Add file → Upload files).
- Files between 25 and 100 MiB: use **GitHub Desktop** (or Git on the command line), or host the file on Google Drive and link it as shown above.
- Files over 100 MiB are not accepted in a normal repository.

### Update later
Open the repository, click a file (for example `js/data.js`), then the pencil icon to edit and **Commit changes**. The site refreshes in about a minute. To add files: open the module folder, **Add file → Upload files**, then add the line to `data.js`.

## If View or Download does not work
- **File not found:** the path in `data.js` must match the real file name exactly, including capital letters and spaces, and the file must be uploaded to the same folder on GitHub.
- **Opened from your computer:** double-clicking `index.html` works for PDFs, images, text and downloads. Word / PowerPoint previews only work once the portfolio is online.
- **Apple Pages (.pages) files** cannot be previewed in any browser. Export them to PDF (Pages: File → Export To → PDF) so visitors can view them.
- **Still stuck:** right-click the button, copy the link and paste it into a new browser tab. If you see "404", the file is missing or the name is different.

## 5. Aims, learning outcomes and other things you can edit in `js/data.js`
Each aim and outcome is one short line. Write `"Key words — a few words of detail"` and the part before the dash is shown in bold:

```js
aims: [
  "Software design — principles, processes and implementation methods.",
  "Communication — presenting critical arguments to diverse audiences."
],
outcomes: [ "Evaluate methods — critically assess tools and techniques." ],
keywords: ["Software Engineering", "Cyber Security"],   // little tags at the top of the module page
```

Every line needs quotes and a comma at the end. Also editable: `PROFILE` (name, about text, the skills that orbit the planet) and for each module `tutor`, `status`, `blurb`.

Tip: the intro plays once per browser session. Animations switch off automatically for visitors who prefer reduced motion.
