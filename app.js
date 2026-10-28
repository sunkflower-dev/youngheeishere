const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const play = f => { const a = new Audio(f); a.play().catch(() => {}); return a; };
const colors = { Jun: "#53bdeb", Soonyoung: "#e8a23c", Wonwoo: "#c27cf0" };
const SCREENS = ["lock", "home", "chat", "chrome", "notes", "gallery", "wave", "gmail"];
const GROUP = "Jun, Soonyoung, Wonwoo, You";
const LETTERS = { 2: "ABC", 3: "DEF", 4: "GHI", 5: "JKL", 6: "MNO", 7: "PQRS", 8: "TUV", 9: "WXYZ" };
let cur = "lock", gate = null, nudgeT = null, busy = false, unread = 0;
const bubbles = {}, thumbs = {}, seen = {};
let idle = false;
const gallery = [...CONFIG.gallery];

// Videos are loaded in the background from the start, so they play with NO waiting gap
const pre = document.createElement("div");
pre.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
$("phone").append(pre);
const vids = {};
function getVideo(src) {
  if (!vids[src]) { const v = document.createElement("video"); v.src = src; v.preload = "auto"; v.playsInline = true; vids[src] = v; pre.append(v); }
  return vids[src];
}
[CONFIG.junVideo, ...story.map(s => s.video)].filter(Boolean).forEach(getVideo);


// ---------- iPHONE-STYLE APP ICONS (drawn with SVG) ----------
const svg = inner => `<svg viewBox="0 0 60 60" width="100%" height="100%">${inner}</svg>`;
const petals = ["#fb4a46","#ff9f0a","#ffd60a","#8fd64e","#34c7a0","#2f9bf5","#8e6cf0","#f263b8"]
  .map((c, i) => `<ellipse cx="30" cy="19" rx="7.5" ry="11.5" fill="${c}" transform="rotate(${i * 45} 30 30)"/>`).join("");
const bars = [[13,12],[20,24],[27,36],[34,22],[41,30],[48,14]].map(([x, h]) => `<rect x="${x - 2}" y="${30 - h / 2}" width="4" height="${h}" rx="2" fill="#fff"/>`).join("");
const ICONS = {
  chat: { bg: "#25d366", html: svg(`<path d="M30 11a19 19 0 0 0-16.2 28.9L11 49l9.400-2.700A19 19 0 1 0 30 11z" fill="none" stroke="#fff" stroke-width="3.200" stroke-linejoin="round"/><path d="M23.500 20.500c-1 .4-2.800 2-2.400 4.200.8 4.300 6.500 10.400 12.200 11.400 2 .4 3.800-1 4.300-2.400.2-.7-.2-1.200-.8-1.500l-3.200-1.500c-.6-.3-1.200-.1-1.600.4l-1 1.300c-3-1.200-5.300-3.400-6.300-6.200l1.200-1c.5-.4.7-1 .4-1.700l-1.400-3.200c-.3-.7-.9-.9-1.400-.8z" fill="#fff"/>`) },
  chrome: { bg: "#fff", html: '<span class="cr"><i></i></span>' },
  gmail: { bg: "#fff", html: svg(`<path d="M10 21.500V18a3 3 0 0 1 4.800-2.400L30 27l15.200-11.400A3 3 0 0 1 50 18v3.500L30 36.500z" fill="#ea4335"/><path d="M10 21.500V42a3 3 0 0 0 3 3h4V27z" fill="#4285f4"/><path d="M50 21.500V42a3 3 0 0 1-3 3h-4V27z" fill="#34a853"/><path d="M43 15.800V27l7-5.500V18a3 3 0 0 0-4.800-2.200z" fill="#fbbc04"/>`) },
  notes: { bg: "#fff", html: svg(`<rect width="60" height="17" fill="#ffd60a"/><g stroke="#d1d1d6" stroke-width="1.500"><path d="M8 28h44M8 38h44M8 48h44"/></g>`) },
  gallery: { bg: "#fff", html: svg(`<g style="mix-blend-mode:multiply">${petals}</g>`) },
  wave: { bg: "linear-gradient(160deg,#9a6bff,#4a1fd0)", html: svg(bars) }
};
const DOCK = [
  { bg: "#34c759", html: svg('<path d="M20 14c-2 0-5 2.500-4.500 6 1.800 11 12.500 22.500 24 24.500 3.500.6 6-2.500 6-4.500l-.2-3.500-8.500-3-3.500 4c-4-2-7-5.500-9-9.500l4-3.500-3-8.500z" fill="#fff"/>') },
  { bg: "#34c759", html: svg('<ellipse cx="30" cy="28" rx="19" ry="15" fill="#fff"/><path d="M14 47c3.500-2 5.500-5 5.500-8.500l8 3z" fill="#fff"/>') },
  { bg: "#fff", html: svg('<circle cx="30" cy="30" r="23" fill="#1d8bff"/><circle cx="30" cy="30" r="20" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="1 4.200"/><path d="M41 19L33 33 19 41 27 27z" fill="#fff"/><path d="M41 19L33 33 27 27z" fill="#ff3b30"/>') },
  { bg: "linear-gradient(#fc5c7d,#fa233b)", html: svg('<path d="M26 17l17-4v22a5 5 0 1 1-3-4.600V20l-11 2.500V40a5 5 0 1 1-3-4.600z" fill="#fff"/>') }
];

// ---------- SCREENS ----------
function show(name) {
  SCREENS.forEach(s => $(s).classList.toggle("hidden", s !== name));
  cur = name; $("phone").dataset.screen = name;
  closePicker(); $("viewer").classList.add("hidden");
  if (name === "chat") { unread = 0; badge(); $("msgs").scrollTop = 99999; }
  if (name === "gallery") $("galgrid").innerHTML = gallery.map((g, i) => tile(g, i)).join("");
  if (name === "gmail") mailList();
  if (name === "notes") noteList();
  refreshHints();
}
function badge() {
  const set = (id, n) => { const b = $("badge-" + id); if (b) { b.textContent = n; b.classList.toggle("hidden", !n); } };
  set("chat", unread);
  set("gmail", CONFIG.emails.filter(e => e.unread).length);
}
function toast(app, icon, text, go) {
  $("toast").innerHTML = `<i class="ticon">${icon}</i><div><b>${app}</b><span>${text}</span></div>`;
  $("toast").classList.remove("hidden"); $("toast").onclick = () => { $("toast").classList.add("hidden"); if (go) show(go); };
  play("audio/pop.wav");
  clearTimeout(toast.t); toast.t = setTimeout(() => $("toast").classList.add("hidden"), 3500);
}

// ---------- GATES: the story waits until the reader does the right thing ----------
function waitGate(type, data, el, hint = true) {
  return new Promise(res => {
    gate = { type, data, el, res, hint }; idle = false;
    refreshHints();
    clearTimeout(nudgeT); nudgeT = setTimeout(nudge, 25000);
  });
}
function pass(type, data) {
  if (!gate || gate.type !== type || (data !== undefined && gate.data !== data)) return false;
  const g = gate; gate = null; idle = false; clearTimeout(nudgeT);
  refreshHints(); g.res(); return true;
}
// Soft green glow showing the reader what to tap next (only on steps that have hints)
function hintTargets() {
  if (!gate || !gate.hint) return [];
  const t = gate.type;
  const home = { search: "chrome", analyze: "wave" }[t] || "chat";
  const inApp = {
    search: ["chrome", $("gbtn").classList.contains("hidden") ? $("gsearch") : $("gbtn")],
    analyze: ["wave", $("upl")], upload: ["chat", $("attach")]
  }[t] || ["chat", gate.el];
  if (cur === inApp[0]) return [inApp[1]];                                             // already in the right app
  if (cur === "home" && (t === "search" || t === "analyze" || idle)) return [$("app-" + home).firstElementChild];
  if (idle && cur !== "lock") return [$("homebar")];                                  // lost for 25s: point to home
  return [];
}
function refreshHints() {
  document.querySelectorAll(".hint").forEach(e => e.classList.remove("hint"));
  hintTargets().forEach(e => e && e.classList.add("hint"));
}
function nudge() {
  if (!gate || !gate.hint) return;
  idle = true; refreshHints(); nudgeT = setTimeout(nudge, 25000);
}

// ---------- WHATSAPP ----------
function addMsg(s) {
  const me = s.w === "Jihoon";
  const row = document.createElement("div");
  row.className = "row " + (me ? "me" : "them");
  const ext = (s.file || "").split(".").pop().toLowerCase();
  let body;
  if (s.file && ["jpg", "jpeg", "png"].includes(ext)) body = `<div class="media"><img src="${s.file}" onerror="this.remove()"></div>`;
  else if (s.file) body = `<div class="media">${s.thumb ? `<img src="${s.thumb}" onerror="this.remove()">` : ""}<b class="play">▶</b></div><div class="cap">${s.file}<small>${s.size || ""}</small></div>`;
  else if (s.voice) body = `<div class="voice"><b>▶</b><i></i><small>0:07</small></div>`;
  else body = s.t;
  const time = new Date().toTimeString().slice(0, 5);
  row.innerHTML = `<img class="av" src="images/${s.w.toLowerCase()}.jpg"><div class="msg">${me ? "" : `<span class="name" style="color:${colors[s.w]}">${s.w}</span>`}${body}<span class="ts">${time}${me ? " ✓✓" : ""}</span></div>`;
  $("msgs").appendChild(row);
  $("msgs").scrollTop = 99999;
  const el = row.querySelector(".msg");
  if (s.id) { bubbles[s.id] = el; thumbs[s.id] = s.thumb; }
  el.onclick = () => bubbleClick(s);
  return el;
}
function bubbleClick(s) {
  if (s.voice) play(s.voice);
  if (!s.id || !gate || gate.data !== s.id) return;
  if (gate.type === "open") pass("open", s.id);
  else if (gate.type === "download") showDownload(s);
}
function showDownload(s) {
  $("modal").innerHTML = `<div class="card"><h4>Download file?</h4><p>${s.file} · ${s.size}</p><div class="prog hidden"><i></i></div><div class="btns"><button id="dlNo">Cancel</button><button id="dlOk">Download</button></div></div>`;
  $("modal").classList.remove("hidden");
  $("dlNo").onclick = () => $("modal").classList.add("hidden");
  $("dlOk").onclick = async () => {
    const p = $("modal").querySelector(".prog"); p.classList.remove("hidden");
    await sleep(60); p.firstChild.style.width = "100%"; await sleep(2300);
    $("modal").classList.add("hidden");
    gallery.push({ name: s.file, type: "video", thumb: s.thumb || "images/video.jpg", video: CONFIG.junVideo || undefined });
    toast("Photos", "🖼️", "Saved to Library: " + s.file, "gallery");
    pass("download", s.id);
  };
}
// tap the message box -> the text types itself -> tap send
$("inp").onclick = async () => {
  if (!gate || gate.type !== "me" || busy) return;
  busy = true; $("inp").classList.remove("ph"); $("inp").textContent = "";
  for (const c of gate.data) { $("inp").textContent += c; await sleep(rand(35, 70)); }
  $("send").classList.remove("hidden"); busy = false;
};
$("send").onclick = () => pass("me");
$("attach").onclick = () => {
  if (!gate || gate.type !== "upload") return;
  openPicker(item => { if (item.name === gate.data.name) { closePicker(); pass("upload"); } });
};

// ---------- PHOTOS: tiles, picker, viewer ----------
function tile(g, i, label) {
  const dur = g.type === "video" || g.type === "analysis" ? '<span class="dur">▶</span>' : "";
  return `<div class="tile" data-i="${i}"><img src="${g.thumb}" onerror="this.remove()">${dur}${label ? `<small>${g.name}</small>` : ""}</div>`;
}
function openPicker(cb) {
  $("picker").innerHTML = `<div class="ph2"><span>Photos</span><span id="pclose">Cancel</span></div><div class="pick">` + gallery.map((g, i) => tile(g, i, true)).join("") + `</div>`;
  $("picker").classList.remove("hidden");
  $("pclose").onclick = closePicker;
  $("picker").querySelector(".pick").onclick = e => { const d = e.target.closest("[data-i]"); if (d) cb(gallery[d.dataset.i]); };
}
function closePicker() { $("picker").classList.add("hidden"); }
function openViewer(g) {
  const v = $("viewer");
  v.innerHTML = `<span id="vclose">✕</span>`;
  if (g.type === "video" && g.video) {
    const el = getVideo(g.video); el.controls = true; el.currentTime = 0;
    el.onerror = () => { el.remove(); v.insertAdjacentHTML("beforeend", `<img src="${g.thumb}">`); };
    if (el.error) el.onerror(); else { v.append(el); el.play().catch(() => {}); }
  } else if (g.type === "analysis") {
    v.insertAdjacentHTML("beforeend", `<img src="${g.thumb}" onerror="this.outerHTML='<div class=line></div>'">`);
  } else v.insertAdjacentHTML("beforeend", `<img src="${g.thumb}">`);
  v.classList.remove("hidden");
  $("vclose").onclick = () => { v.classList.add("hidden"); v.innerHTML = ""; };
}

// ---------- WAVEFORM APP ----------
$("upl").onclick = () => openPicker(async item => {
  if (item.name !== "younghee_is_here.mp4") return;
  closePicker();
  $("waveRes").innerHTML = "⏳ Analyzing " + item.name + "…";
  await sleep(2500);
  $("waveRes").innerHTML = `<b>${item.name}</b><div class="line"></div>Audio tracks: 0<br>Peak level: 0 dB<br>Result: flat line`;
  pass("analyze");
});

// ---------- CHROME / GOOGLE ----------
function homeMode(on) { ["gHome", "gTiles"].forEach(i => $(i).classList.toggle("hidden", !on)); $("gRes").classList.toggle("hidden", on); }
$("gsearch").onclick = async () => {
  if (!gate || gate.type !== "search" || busy) return;
  busy = true; homeMode(true); $("gq").classList.remove("ph"); $("gq").textContent = "";
  for (const c of gate.data) { $("gq").textContent += c; await sleep(rand(50, 100)); }
  $("gbtn").classList.remove("hidden"); busy = false; refreshHints();
};
$("gbtn").onclick = () => { if (pass("search")) $("gbtn").classList.add("hidden"); };

// ---------- GMAIL ----------
function mailList() {
  $("mailui").innerHTML = `<div class="gtop"><span class="back">‹</span><div class="gbar">Search in mail<span class="gav">J</span></div></div><div class="lbl">Primary</div>` +
    CONFIG.emails.map((m, i) => `<div class="mail${m.unread ? " unread" : ""}" data-i="${i}"><div class="mav" style="background:${m.color || "#5f6368"}">${m.from[0]}</div><div class="mtx"><b>${m.from}</b><span class="tm">${m.time}</span><span class="sj">${m.subject}</span><small>${m.body.replace(/\n/g, " ")}</small></div></div>`).join("") +
    `<div class="fab">✏️ Compose</div>`;
  bindBack($("mailui"));
  $("mailui").onclick = e => {
    const d = e.target.closest(".mail"); if (!d) return;
    const m = CONFIG.emails[d.dataset.i];
    m.unread = false; badge();
    $("mailui").innerHTML = `<p class="up" id="mback">‹ Inbox</p><h2>${m.subject}</h2><p><b>${m.from}</b> · ${m.time}</p><div class="mailbody">${m.body}</div>`;
    $("mback").onclick = mailList;
  };
}

// ---------- NOTES ----------
function noteList() {
  $("noteui").innerHTML = `<div class="phdr" style="padding:0"><span class="back">‹</span></div><h1 class="big">Notes</h1><div class="ngroup">` +
    CONFIG.notes.map((n, i) => `<div class="note" data-i="${i}"><b>${n.title}</b><small>${n.body.replace(/\n/g, " ")}</small></div>`).join("") + `</div>`;
  bindBack($("noteui"));
  $("noteui").onclick = e => {
    const d = e.target.closest(".note"); if (!d) return;
    const n = CONFIG.notes[d.dataset.i];
    $("noteui").innerHTML = `<p class="nup" id="nback">‹ Notes</p><h2>${n.title}</h2><div id="notebody">${n.body}</div>`;
    $("nback").onclick = noteList;
  };
}
function bindBack(root) { root.querySelectorAll(".back").forEach(b => (b.onclick = () => show("home"))); }

// ---------- STORY STEPS ----------
async function npc(s) {
  await sleep(rand(800, 1800));
  $("sub").textContent = s.w + " is typing…";
  await sleep(Math.min(900 + (s.t || "").length * 45, 6500));
  $("sub").textContent = GROUP;
  addMsg(s);
  if (cur === "chat") play("audio/pop.wav");
  else { unread++; badge(); toast("WhatsApp", "💬", `${s.w}: ${s.t || "sent a file"}`, "chat"); }
}
async function myMsg(s) {
  await waitGate("me", s.me, $("inp"), false);
  addMsg({ w: "Jihoon", t: s.me });
  $("inp").textContent = "Message"; $("inp").classList.add("ph"); $("send").classList.add("hidden");
  await sleep(1200);
}
async function openVideo(s) {
  const f = $("full"), src = s.video || (s.open === "vid1" && CONFIG.junVideo) || "";
  f.innerHTML = '<span id="vx">✕</span>'; f.classList.remove("hidden");
  let ok = false;
  const v = src ? getVideo(src) : null;
  if (v && !v.error) {                                // real video file (already preloaded)
    v.controls = false; v.currentTime = 0; v.poster = thumbs[s.open] || "";
    f.prepend(v); v.play().catch(() => {});
    if (s.text) setTimeout(() => f.insertAdjacentHTML("beforeend", `<p>${s.text}</p>`), (s.secs || 3) * 1000);
    ok = await new Promise(done => { v.onended = () => done(true); v.onerror = () => done(false); $("vx").onclick = () => done(true); });
    v.pause();
  }
  if (!ok) {                                          // no file found: show the picture instead
    f.innerHTML = `<img src="${thumbs[s.open] || "images/video.jpg"}" onerror="this.remove()">`;
    await sleep((s.secs || 4) * 1000);
    if (s.sound) play(s.sound);
    if (s.text) { f.classList.add("flash"); f.innerHTML += `<p>${s.text}</p>`; await sleep(1800); }
  }
  f.classList.add("hidden"); f.classList.remove("flash"); f.innerHTML = "";
}
async function searchStep(s) {
  await waitGate("search", s.search, $("gsearch"));
  homeMode(false);
  $("gRes").innerHTML = `<div class="tabs"><b>All</b><span>Images</span><span>Videos</span><span>News</span><span>Maps</span></div>
    <p class="cnt">About 0 results (0.${Math.floor(rand(20, 60))} seconds)</p>
    <p>Your search - <b>${s.search}</b> - did not match any documents.</p><p>Suggestions:</p>
    <ul><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul>`;
  if (s.laugh) { await sleep(1500); glitch(); play(s.laugh); }
}
async function glitch() { $("phone").classList.add("glitch"); await sleep(900); $("phone").classList.remove("glitch"); }
async function finale(s) {
  await glitch();
  const f = $("full"); f.innerHTML = `<img src="${s.image || "images/reflection.jpg"}">`; f.classList.remove("hidden");
  play("audio/screech.wav"); await sleep(1500);
  play("audio/foundyou.wav"); await sleep(2500);
  $("final").textContent = s.finale; $("final").classList.remove("hidden");
}
async function playStory() {
  for (const s of story) {
    if (s.w) await npc(s);
    else if (s.me !== undefined) await myMsg(s);
    else if (s.open) {   // glow only when the reader has opened this video before (or hint:true)
      await waitGate("open", s.open, bubbles[s.open], s.hint ?? !!seen[s.open]);
      seen[s.open] = true; await openVideo(s);
    }
    else if (s.download) await waitGate("download", s.download, bubbles[s.download]);
    else if (s.analyze) {
      await waitGate("analyze", undefined, $("upl"));
      gallery.push({ name: "Audio Analysis Result", type: "analysis", thumb: "images/gallery/analysis.jpg" });
    }
    else if (s.upload) {
      await waitGate("upload", { name: s.upload }, $("attach"));
      addMsg({ w: "Jihoon", file: s.upload, size: s.size, id: s.id, thumb: s.thumb || "images/gallery/analysis.jpg" });
      await sleep(1200);
    }
    else if (s.search) await searchStep(s);
    else if (s.pause) await sleep(s.pause);
    else if (s.finale) {
      if (s.after) await waitGate("open", s.after, bubbles[s.after]);   // wait until the reader taps the photo
      await finale(s);
    }
  }
}

// ---------- PHONE: LOCK -> PASSCODE -> HOME ----------
function buildPhone() {
  $("hint").textContent = CONFIG.showHint ? "Hint: " + CONFIG.passcode : "";
  $("dots").innerHTML = "<i></i><i></i><i></i><i></i>";
  $("keys").innerHTML = [1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(k => k === "" ? "<span></span>" :
    `<button data-k="${k}" class="${k === "⌫" ? "plain" : ""}">${k}${k === "⌫" ? "" : `<small>${LETTERS[k] || ""}</small>`}</button>`).join("");
  $("dock").innerHTML = DOCK.map(d => `<div style="background:${d.bg}">${d.html}</div>`).join("");
  $("apps").innerHTML = CONFIG.apps.map(a => { const ic = ICONS[a.id] || { bg: a.color, html: a.icon };
    return `<div class="app" data-id="${a.id}" id="app-${a.id}"><div style="background:${ic.bg}">${ic.html}</div>${a.name}<span class="badge hidden" id="badge-${a.id}"></span></div>`; }).join("");
  $("apps").onclick = e => { const a = e.target.closest(".app"); if (a) show(a.dataset.id); };
  $("homebar").onclick = () => { if (cur !== "lock" && cur !== "home") show("home"); };
  ["chat", "chrome", "gallery", "wave"].forEach(id => bindBack($(id)));
  badge();
}
function waitForPasscode() {          // true = correct code, false = cancelled
  return new Promise(resolve => {
    let typed = "";
    const dots = () => [...$("dots").children].forEach((d, i) => d.classList.toggle("on", i < typed.length));
    $("cancel").onclick = () => { typed = ""; dots(); resolve(false); };
    $("keys").onclick = async e => {
      const b = e.target.closest("button"); if (!b) return;
      const k = b.dataset.k;
      if (k === "⌫") typed = typed.slice(0, -1); else if (typed.length < 4) typed += k;
      dots();
      if (typed.length === 4) {
        if (typed === CONFIG.passcode) resolve(true);
        else { $("dots").classList.add("shake"); await sleep(350); $("dots").classList.remove("shake"); typed = ""; dots(); }
      }
    };
  });
}
async function run() {
  buildPhone(); show("lock"); $("sub").textContent = GROUP;
  while (true) {
    await new Promise(r => ($("lock").onclick = r)); $("lock").onclick = null;
    $("swipe").classList.add("hidden"); $("pad").classList.remove("hidden");
    if (await waitForPasscode()) break;
    $("pad").classList.add("hidden"); $("swipe").classList.remove("hidden");
  }
  show("home");
  await sleep(2500);
  playStory();
}
run();   // the phone starts on the lock screen right away
