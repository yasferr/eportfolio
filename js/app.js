/* GLACIER edition: aurora + stars, iris intro, orbiting skills, stacking module cards, file viewer */
const fine = matchMedia("(pointer:fine)").matches;
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sc = (s) => (s === "Completed" ? "done" : s === "In progress" ? "progress" : "");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const initials = () => PROFILE.name.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/* ---------- background ---------- */
function initStars() {
  const box = document.getElementById("stars");
  if (!box) return;
  const n = innerWidth < 600 ? 40 : 80;
  box.innerHTML = Array.from({ length: n }, () => {
    const s = (Math.random() * 1.8 + 0.8).toFixed(1);
    return `<i style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${s}px;height:${s}px;--t:${(3 + Math.random() * 5).toFixed(1)}s;--d:-${(Math.random() * 6).toFixed(1)}s"></i>`;
  }).join("");
}

function initPointer() {
  const glow = document.getElementById("glow");
  const orb = document.getElementById("orb");
  const cta = document.querySelector(".cta");
  let tx = innerWidth * 0.7, ty = innerHeight * 0.3, gx = tx, gy = ty;
  addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    if (orb) {
      orb.style.setProperty("--px", ((e.clientX / innerWidth - 0.5) * 2).toFixed(3));
      orb.style.setProperty("--py", ((e.clientY / innerHeight - 0.5) * 2).toFixed(3));
    }
    if (cta && fine) {
      const r = cta.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < 130;
      cta.style.transform = near ? `translate(${dx * 0.32}px,${dy * 0.32}px)` : "";
    }
  });
  if (!glow || !fine || reduce) { if (glow) glow.style.display = "none"; return; }
  (function loop() {
    gx += (tx - gx) * 0.09; gy += (ty - gy) * 0.09;
    glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- intro ---------- */
function runIntro() {
  const body = document.body;
  let seen = false;
  try { seen = !!sessionStorage.getItem("glacier-seen"); } catch (e) {}
  if (body.classList.contains("skip-loader") || seen || reduce) {
    body.classList.add("skip-loader");
    requestAnimationFrame(() => body.classList.add("loaded"));
    return;
  }
  const iris = document.getElementById("iris");
  if (iris) iris.firstElementChild.textContent = initials();
  setTimeout(() => body.classList.add("loaded"), 1300);
  try { sessionStorage.setItem("glacier-seen", "1"); } catch (e) {}
}

/* ---------- scroll behaviours ---------- */
function countUp(el, to) {
  const t0 = performance.now();
  (function tick(now) {
    const p = clamp((now - t0) / 1500, 0, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const t = e.target;
      setTimeout(() => t.classList.add("in"), (i % 3) * 110);
      t.querySelectorAll("[data-count]").forEach((n) => countUp(n, Number(n.dataset.count)));
      t.querySelectorAll(".fg[data-frac]").forEach((c) => {
        c.style.strokeDashoffset = (263.9 * (1 - Number(c.dataset.frac))).toFixed(1);
      });
      io.unobserve(t);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
}

function initScroll() {
  const bar = document.getElementById("progress");
  const wraps = [...document.querySelectorAll(".sw")];
  function onScroll() {
    const h = document.documentElement;
    if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
    if (reduce) return;
    wraps.forEach((w, i) => {
      const next = wraps[i + 1];
      const card = w.firstElementChild;
      if (!next) return;
      const stick = 96 + i * 14;
      const dist = next.getBoundingClientRect().top - stick;
      const t = clamp(1 - dist / (card.offsetHeight + 34), 0, 1);
      card.style.transform = `scale(${(1 - t * 0.05).toFixed(4)})`;
      card.style.filter = `brightness(${(1 - t * 0.4).toFixed(3)})`;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
}

function initSpotlightCards() {
  if (!fine) return;
  document.querySelectorAll(".fc").forEach((c) => {
    c.addEventListener("mousemove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

/* ---------- pages ---------- */
function orbit(skills) {
  // shortest names go on the small inner ring, longer ones on the outer ring
  const byLen = [...skills].sort((a, b) => a.length - b.length);
  const half = Math.floor(byLen.length / 2);
  const inner = byLen.slice(0, half);
  const outer = byLen.slice(half);
  const mk = (list, rad, t, dir) => list.map((s, k) =>
    `<div class="ring" style="--rad:${rad}px;--t:${t}s;--dir:${dir};--dl:-${((k / list.length) * t).toFixed(2)}s"><span class="pill">${esc(s)}</span></div>`).join("");
  return `
    <div class="orb" id="orb">
      <div class="path" style="width:224px;height:224px"></div>
      <div class="path" style="width:464px;height:464px"></div>
      <div class="core">AI</div>
      ${mk(inner, 112, 24, "normal")}${mk(outer, 232, 40, "reverse")}
    </div>`;
}

function meter(label, value, total) {
  const frac = total ? value / total : 0;
  return `
    <div class="meter">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fe9ff"/><stop offset="1" stop-color="#4f7cff"/></linearGradient></defs>
        <circle class="bgc" cx="50" cy="50" r="42"/>
        <circle class="fg" cx="50" cy="50" r="42" data-frac="${frac}"/>
      </svg>
      <div class="val"><span><span data-count="${value}">0</span><small>/${total}</small></span></div>
      <div class="lab">${esc(label)}</div>
    </div>`;
}

function renderHome() {
  document.title = `${PROFILE.name} | E-Portfolio`;
  const parts = PROFILE.name.split(" ");
  const first = parts[0], rest = parts.slice(1).join(" ");
  document.getElementById("hero").innerHTML = `
    <div class="hero-l">
      <div class="pill-tag rise" style="--d:0"><i></i>${esc(PROFILE.course)} · ${esc(PROFILE.university)}</div>
      <p class="hi rise" style="--d:1">Hello, I’m</p>
      <h1 class="nm rise" style="--d:2"><em>${esc(first)}</em>${rest ? `<small>${esc(rest)}</small>` : ""}</h1>
      <p class="lead rise" style="--d:3">Explore my coursework, reflections and project files, module by module. Every document can be opened or downloaded.</p>
      <div class="actions rise" style="--d:4"><a class="cta" href="#modules">Explore modules <span>↓</span></a><a class="ghost" href="#about">About me</a></div>
    </div>
    <div class="hero-r rise" style="--d:3">${orbit(PROFILE.skills)}</div>`;

  const total = MODULES.length;
  const done = MODULES.filter((m) => m.status === "Completed").length;
  const prog = MODULES.filter((m) => m.status === "In progress").length;
  const files = MODULES.reduce((n, m) => n + m.files.length, 0);
  document.getElementById("about").innerHTML = `
    <div class="glass rv"><div class="eyebrow">About me</div><p class="stmt">${esc(PROFILE.about)}</p></div>
    <div class="glass rv rings">
      ${meter("Completed", done, total)}
      ${meter("In progress", prog, total)}
      <div class="meter"><div class="val" style="position:static;height:140px;display:grid;place-items:center;font-size:2.6rem"><span data-count="${files}">0</span></div><div class="lab">Files</div></div>
    </div>`;

  const hues = [218, 226, 234, 222, 230, 240, 214, 228];
  document.getElementById("stack").innerHTML = MODULES.map((m, i) => `
    <div class="sw" style="--i:${i}">
      <a class="sc" href="module.html?m=${m.id}" style="--h:${hues[i % hues.length]}">
        <div class="num">${String(m.id).padStart(2, "0")}</div>
        <div class="body">
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.blurb)}</p>
          <div class="chips">
            <span class="badge ${sc(m.status)}">${esc(m.status)}</span>
            <span class="badge">${m.files.length} file${m.files.length === 1 ? "" : "s"}</span>
            ${m.tutor ? `<span class="badge">${esc(m.tutor)}</span>` : ""}
            <span class="go">Open module →</span>
          </div>
        </div>
      </a>
    </div>`).join("");
}

/* ---------- files: normalise, view, download ---------- */
const TYPES = {
  pdf: ["pdf", "PDF"],
  png: ["image", "Images"], jpg: ["image", "Images"], jpeg: ["image", "Images"], gif: ["image", "Images"], webp: ["image", "Images"], svg: ["image", "Images"],
  doc: ["office", "Documents"], docx: ["office", "Documents"], ppt: ["office", "Documents"], pptx: ["office", "Documents"], xls: ["office", "Documents"], xlsx: ["office", "Documents"],
  txt: ["text", "Code & data"], md: ["text", "Code & data"], py: ["text", "Code & data"], r: ["text", "Code & data"], sql: ["text", "Code & data"],
  csv: ["text", "Code & data"], tsv: ["text", "Code & data"], json: ["text", "Code & data"], js: ["text", "Code & data"], java: ["text", "Code & data"], c: ["text", "Code & data"], cpp: ["text", "Code & data"], arff: ["text", "Code & data"],
  ipynb: ["notebook", "Code & data"],
  mp4: ["video", "Video"], webm: ["video", "Video"],
  zip: ["archive", "Archives"], rar: ["archive", "Archives"], "7z": ["archive", "Archives"], gz: ["archive", "Archives"], tar: ["archive", "Archives"]
};
const IS_HTTP = /^https?:$/.test(location.protocol);
const IS_PUBLIC = IS_HTTP && !/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname);
const COARSE = matchMedia("(pointer:coarse)").matches;

function prettyName(base) {
  const s = base.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").replace(/(\w)-(?=\w)/g, "$1 ").replace(/\s+/g, " ").trim();
  return s ? s[0].toUpperCase() + s.slice(1) : base;
}

function normaliseFile(entry, i) {
  const e = typeof entry === "string" ? { path: entry } : { ...entry };
  e.path = e.path || e.url || "";
  e.external = /^https?:\/\//i.test(e.path);
  const clean = e.path.split("?")[0].split("#")[0];
  let base = clean.split("/").pop() || "file";
  try { base = decodeURIComponent(base); } catch (err) {}
  e.ext = (base.includes(".") ? base.split(".").pop() : "link").toLowerCase();
  const t = TYPES[e.ext] || ["other", "Other"];
  e.kind = t[0]; e.group = t[1];
  e.name = e.name || prettyName(base);
  e.desc = e.desc || "";
  e.category = e.category || "";
  e.file = base;
  e.url = e.external ? e.path : encodeURI(e.path);
  e.abs = new URL(e.url, location.href).href;
  e.canView = e.external || !["archive", "other"].includes(e.kind);
  e.n = i + 1;
  return e;
}

function fmtSize(b) {
  if (!b) return "";
  return b < 1048576 ? Math.max(1, Math.round(b / 1024)) + " KB" : (b / 1048576).toFixed(1) + " MB";
}

function fileCard(f) {
  return `
    <article class="fc rv" id="file-${f.n}" data-group="${esc(f.group)}" data-q="${esc((f.name + " " + f.desc + " " + f.ext).toLowerCase())}">
      <span class="fnum">${String(f.n).padStart(2, "0")}</span>
      <div class="ftop"><span class="ext">${esc(f.ext)}</span><span class="fsize" data-size="${f.n}"></span></div>
      <strong title="${esc(f.name)}">${esc(f.name)}</strong>
      <span class="d">${esc(f.desc)}</span>
      ${(f.includes || []).length ? `<div class="inc"><small>Inside this file</small><ul>${f.includes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
      <div class="btns">
        ${f.external
          ? `<a class="btn solid" href="${f.url}" target="_blank" rel="noopener">Open link ↗</a>`
          : `${f.canView ? `<a class="btn solid" href="${f.url}" target="_blank" rel="noopener" data-view="${f.n}">View</a>` : `<span class="note">Download only</span>`}
        <a class="btn" href="${f.url}" download="${esc(f.file)}">Download</a>`}
      </div>
    </article>`;
}

function filesSection(files) {
  if (!files.length) return `<p class="empty">No files uploaded yet.</p>`;
  const groups = [...new Set(files.map((f) => f.group))];
  const hasCats = files.some((f) => f.category);
  let body;
  if (hasCats) {
    const cats = [...new Set(files.map((f) => f.category || "Other files"))];
    body = cats.map((c) => {
      const list = files.filter((f) => (f.category || "Other files") === c);
      return `<section class="fgroup"><h3 class="gh">${esc(c)} <small>${list.length}</small></h3><div class="fgrid">${list.map(fileCard).join("")}</div></section>`;
    }).join("");
  } else {
    body = `<div class="fgrid">${files.map(fileCard).join("")}</div>`;
  }
  const tools = files.length > 5 ? `
    <div class="ftools">
      <div class="fchips" role="group" aria-label="Filter by type">
        <button type="button" class="fchip on" data-filter="">All <b>${files.length}</b></button>
        ${groups.map((g) => `<button type="button" class="fchip" data-filter="${esc(g)}">${esc(g)} <b>${files.filter((f) => f.group === g).length}</b></button>`).join("")}
      </div>
      <input class="fsearch" type="search" placeholder="Search files…" aria-label="Search files">
    </div>` : "";
  return `${tools}<p class="fcount" id="fcount" aria-live="polite"></p>${body}<p class="empty" id="fnone" hidden>No files match your search.</p>`;
}

function initFileTools() {
  const chips = [...document.querySelectorAll(".fchip")];
  const input = document.querySelector(".fsearch");
  const cards = [...document.querySelectorAll(".fc")];
  const count = document.getElementById("fcount");
  let group = "";
  function apply() {
    const q = (input ? input.value : "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const ok = (!group || c.dataset.group === group) && (!q || c.dataset.q.includes(q));
      c.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll(".fgroup").forEach((g) => { g.hidden = !g.querySelector(".fc:not([hidden])"); });
    const none = document.getElementById("fnone");
    if (none) none.hidden = shown !== 0;
    if (count) count.textContent = cards.length > 5 ? `Showing ${shown} of ${cards.length} files` : "";
  }
  chips.forEach((b) => b.addEventListener("click", () => {
    group = b.dataset.filter;
    chips.forEach((x) => x.classList.toggle("on", x === b));
    apply();
  }));
  if (input) input.addEventListener("input", apply);
  apply();
}

function loadSizes(files) {
  if (!IS_HTTP) return;
  files.filter((f) => !f.external).forEach((f) => {
    fetch(f.url, { method: "HEAD" }).then((r) => {
      if (!r.ok) return;
      const len = Number(r.headers.get("content-length"));
      const el = document.querySelector(`[data-size="${f.n}"]`);
      if (el && len) el.textContent = fmtSize(len);
    }).catch(() => {});
  });
}

/* ---------- viewer ---------- */
let viewer = null;

function openViewer(files, n) {
  const f = files.find((x) => x.n === n);
  if (!f || !f.canView) return;
  // things that cannot be shown inside the page open in a new tab instead
  if (f.external || (f.kind === "pdf" && COARSE)) { window.open(f.url, "_blank", "noopener"); return; }
  if (f.kind === "notebook" && IS_PUBLIC) { window.open("https://nbviewer.org/url/" + f.abs.replace(/^https?:\/\//, ""), "_blank", "noopener"); return; }

  const viewable = files.filter((x) => x.canView && !x.external);
  const pos = viewable.indexOf(f);
  closeViewer(true);
  const el = document.createElement("div");
  el.className = "vw";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "File viewer: " + f.name);
  el.innerHTML = `
    <div class="vw-bar">
      <div class="vw-title"><span class="ext">${esc(f.ext)}</span><b>${esc(f.name)}</b><small>${pos + 1} / ${viewable.length}</small></div>
      <div class="vw-actions">
        <button type="button" class="vbtn" data-prev aria-label="Previous file" ${pos === 0 ? "disabled" : ""}>←</button>
        <button type="button" class="vbtn" data-next aria-label="Next file" ${pos === viewable.length - 1 ? "disabled" : ""}>→</button>
        <a class="btn" href="${f.url}" download="${esc(f.file)}">Download</a>
        <a class="btn nt" href="${f.url}" target="_blank" rel="noopener">New tab</a>
        <button type="button" class="vbtn close" data-close aria-label="Close viewer">✕</button>
      </div>
    </div>
    <div class="vw-body"></div>`;
  document.body.appendChild(el);
  document.body.classList.add("vw-open");
  const body = el.querySelector(".vw-body");
  const msg = (t) => { body.innerHTML = `<div class="vw-msg"><p>${t}</p><a class="btn solid" href="${f.url}" download="${esc(f.file)}">Download file</a></div>`; };

  if (f.kind === "pdf") body.innerHTML = `<iframe src="${f.url}#view=FitH" title="${esc(f.name)}"></iframe>`;
  else if (f.kind === "image") body.innerHTML = `<div class="vw-img"><img src="${f.url}" alt="${esc(f.name)}"></div>`;
  else if (f.kind === "video") body.innerHTML = `<div class="vw-img"><video src="${f.url}" controls autoplay></video></div>`;
  else if (f.kind === "office") {
    if (IS_PUBLIC) body.innerHTML = `<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(f.abs)}" title="${esc(f.name)}"></iframe>`;
    else msg("Word, PowerPoint and Excel previews work once the portfolio is online. For now you can download the file.");
  } else if (f.kind === "notebook") msg("Notebook previews work once the portfolio is online. For now you can download the file.");
  else if (f.kind === "text") {
    body.innerHTML = `<div class="vw-msg"><p>Loading…</p></div>`;
    fetch(f.url).then((r) => { if (!r.ok) throw 0; return r.text(); }).then((t) => {
      const cut = t.length > 300000;
      body.innerHTML = `<pre class="vw-text"></pre>`;
      body.firstElementChild.textContent = cut ? t.slice(0, 300000) + "\n\n… (preview shortened, download the file to read everything)" : t;
    }).catch(() => msg("This file can’t be previewed here. You can download it instead."));
  }

  const go = (d) => { const t = viewable[pos + d]; if (t) openViewer(files, t.n); };
  el.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeViewer();
    else if (e.target.closest("[data-prev]")) go(-1);
    else if (e.target.closest("[data-next]")) go(1);
    else if (e.target === el || e.target === body) closeViewer();
  });
  viewer = { el, trigger: document.querySelector(`[data-view="${f.n}"]`), go };
  el.querySelector("[data-close]").focus();
  try { history.replaceState(null, "", "#file-" + f.n); } catch (e) {}
}

function closeViewer(keepHash) {
  if (!viewer) return;
  const { el, trigger } = viewer;
  viewer = null;
  el.remove();
  document.body.classList.remove("vw-open");
  if (!keepHash) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} if (trigger) trigger.focus(); }
}

addEventListener("keydown", (e) => {
  if (!viewer) return;
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowLeft") viewer.go(-1);
  else if (e.key === "ArrowRight") viewer.go(1);
});

/* ---------- module page ---------- */
function renderModule() {
  const id = Number(new URLSearchParams(location.search).get("m"));
  const idx = MODULES.findIndex((x) => x.id === id);
  const box = document.getElementById("module");
  if (idx < 0) { box.innerHTML = `<p class="empty" style="padding-top:140px">Module not found.</p>`; return; }
  const m = MODULES[idx], prev = MODULES[idx - 1], next = MODULES[idx + 1];
  let files = m.files.map(normaliseFile);
  if (files.some((f) => f.category)) {
    const order = [...new Set(files.map((f) => f.category || "Other files"))];
    files.sort((a, b) => order.indexOf(a.category || "Other files") - order.indexOf(b.category || "Other files"));
    files.forEach((f, i) => { f.n = i + 1; });
  }
  document.title = `Module ${m.id}: ${m.title} | ${PROFILE.name}`;
  // "Key words — short detail" -> a small card with a bold heading
  // "Key words — short detail" -> numbered row with a bold heading and one line of detail
  const list = (a) => {
    if (!a.length) return `<p class="empty">To be added.</p>`;
    return `<ol class="list">${a.map((t) => {
      const k = t.indexOf(" — ");
      if (k <= 0) return `<li><b>${esc(t)}</b></li>`;
      const body = t.slice(k + 3);
      return `<li><b>${esc(t.slice(0, k))}</b><span>${esc(body.charAt(0).toUpperCase() + body.slice(1))}</span></li>`;
    }).join("")}</ol>`;
  };
  box.innerHTML = `
    <div class="mh">
      <div class="bignum">${String(m.id).padStart(2, "0")}</div>
      <span class="pill-tag rise" style="--d:0"><i></i>Module ${m.id} of ${MODULES.length}</span>
      <h1 class="rise" style="--d:1">${esc(m.title)}</h1>
      <div class="meta rise" style="--d:2">${m.tutor ? `<span>Tutor: ${esc(m.tutor)}</span>` : ""}<span class="badge ${sc(m.status)}">${esc(m.status)}</span></div>
      ${(m.keywords || []).length ? `<div class="kw rise" style="--d:3">${m.keywords.map((k) => `<span>${esc(k)}</span>`).join("")}</div>` : ""}
    </div>
    <div class="two" id="aims">
      <div class="glass rv"><h3>Aims<small>What this module sets out to teach</small></h3>${list(m.aims)}</div>
      <div class="glass rv"><h3>Learning outcomes<small>What I can do on completion</small></h3>${list(m.outcomes)}</div>
    </div>
    ${location.protocol === "file:" ? `<p class="localnote">You are opening the portfolio from your own computer. PDFs, images, text and downloads work here. Word / PowerPoint previews and file sizes appear once the portfolio is online.</p>` : ""}
    <div class="sec-title" id="files"><h2>Files <em>&amp; work</em>${files.length ? ` <span class="cnt">${files.length}</span>` : ""}</h2><p>View any document on this page, or download it. Anyone can do both.</p></div>
    ${filesSection(files)}
    <div class="pn">
      ${prev ? `<a href="module.html?m=${prev.id}"><small>← Previous</small><b>${esc(prev.title)}</b></a>` : `<span></span>`}
      ${next ? `<a class="nx" href="module.html?m=${next.id}"><small>Next →</small><b>${esc(next.title)}</b></a>` : `<span></span>`}
    </div>`;

  initFileTools();
  loadSizes(files);
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-view]");
    if (b) { e.preventDefault(); openViewer(files, Number(b.dataset.view)); }
  });
  addEventListener("hashchange", () => {
    const hh = /^#file-(\d+)$/.exec(location.hash);
    if (hh && !viewer) openViewer(files, Number(hh[1]));
  });
  const h = /^#file-(\d+)$/.exec(location.hash);
  if (h) setTimeout(() => {
    const n = Number(h[1]), card = document.getElementById("file-" + n);
    if (card) card.scrollIntoView({ block: "center" });
    openViewer(files, n);
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  if (document.getElementById("hero")) renderHome();
  if (document.getElementById("module")) renderModule();
  runIntro();
  initPointer();
  initReveal();
  initScroll();
  initSpotlightCards();
});
