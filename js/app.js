"use strict";

/* ---------- helpers ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const yen = (n) => "¥" + Number(n).toLocaleString("ja-JP");
const won = (n) => Number(n).toLocaleString("ja-JP") + "₩";

/* localStorage-backed checkbox state */
const store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch { return {}; }
  },
  set(key, obj) { localStorage.setItem(key, JSON.stringify(obj)); },
};

async function load(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

/* ---------- Tabs ---------- */
$$("#tabs .tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$("#tabs .tab").forEach((b) => b.classList.remove("active"));
    $$(".panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    $("#" + btn.dataset.tab).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ---------- Trip meta ---------- */
async function renderTrip() {
  try {
    const t = await load("data/trip.json");
    $("#trip-title").textContent = t.title || "旅行";
    $("#trip-subtitle").textContent = t.subtitle || "";
    $("#trip-note").textContent = t.note || "";
    document.title = (t.title || "旅行") + " 🇰🇷";
    window.__rate = t.exchangeRate || null;
  } catch (e) { console.error(e); }
}

/* ---------- Schedule ---------- */
async function renderSchedule() {
  const wrap = $("#schedule");
  try {
    const days = await load("data/schedule.json");
    wrap.innerHTML = days.map((d) => `
      <div class="day-head">
        <span class="day-badge">${esc(d.emoji || "📅")} ${esc(d.weekday || "")}</span>
        <div>
          <div class="day-title">${esc(d.label || "")}</div>
          <div class="day-date">${esc(d.date || "")}</div>
        </div>
      </div>
      <div class="timeline">
        ${(d.items || []).map((it) => `
          <div class="tl-item">
            <div class="tl-time">${esc(it.time || "")}</div>
            <div class="tl-body">
              <div class="tl-title"><span class="ic">${esc(it.icon || "•")}</span>${esc(it.title || "")}</div>
              ${it.place ? `<div class="tl-place">📍 ${esc(it.place)}</div>` : ""}
              ${it.memo ? `<div class="tl-memo">${esc(it.memo)}</div>` : ""}
              ${it.map ? `<a class="map-link" href="${esc(it.map)}" target="_blank" rel="noopener">🗺️ 地図で見る</a>` : ""}
            </div>
          </div>`).join("")}
      </div>`).join("");
  } catch (e) {
    wrap.innerHTML = errCard(e);
  }
}

/* ---------- Places (with visited checkbox) ---------- */
async function renderPlaces() {
  const wrap = $("#places");
  try {
    const cats = await load("data/places.json");
    const state = store.get("places-visited");
    wrap.innerHTML = cats.map((c) => `
      <div class="card">
        <div class="cat-head">${esc(c.emoji || "")} ${esc(c.category || "")}</div>
        ${(c.spots || []).map((s) => {
          const id = `${c.category}::${s.name}`;
          const done = !!state[id];
          return `
          <div class="place-row">
            <button class="place-check ${done ? "done" : ""}" data-id="${esc(id)}">${done ? "✓" : ""}</button>
            <div class="place-info">
              <span class="place-name ${done ? "done" : ""}">${esc(s.name)}</span>
              ${s.area ? `<span class="place-area">${esc(s.area)}</span>` : ""}
              <div class="place-desc">${esc(s.desc || "")}</div>
              ${s.map ? `<a class="map-link" href="${esc(s.map)}" target="_blank" rel="noopener">🗺️ 地図で見る</a>` : ""}
            </div>
          </div>`;
        }).join("")}
      </div>`).join("");

    $$(".place-check", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        const st = store.get("places-visited");
        const id = btn.dataset.id;
        st[id] = !st[id];
        store.set("places-visited", st);
        btn.classList.toggle("done", st[id]);
        btn.textContent = st[id] ? "✓" : "";
        const name = btn.parentElement.querySelector(".place-name");
        name.classList.toggle("done", st[id]);
      });
    });
  } catch (e) {
    wrap.innerHTML = errCard(e);
  }
}

/* ---------- Packing (with checkbox + progress) ---------- */
async function renderPacking() {
  const wrap = $("#packing");
  try {
    const cats = await load("data/packing.json");
    const state = store.get("packing-checked");
    const total = cats.reduce((n, c) => n + (c.items || []).length, 0);

    wrap.innerHTML = `
      <div class="progress"><div class="progress-bar" id="pack-bar"></div></div>
      ${cats.map((c) => `
        <div class="card">
          <div class="cat-head">${esc(c.emoji || "")} ${esc(c.category || "")}</div>
          ${(c.items || []).map((item) => {
            const id = `${c.category}::${item}`;
            const done = !!state[id];
            return `
            <div class="pack-item">
              <button class="pack-box ${done ? "done" : ""}" data-id="${esc(id)}">${done ? "✓" : ""}</button>
              <span class="pack-label ${done ? "done" : ""}">${esc(item)}</span>
            </div>`;
          }).join("")}
        </div>`).join("")}
      <button class="reset-btn" id="pack-reset">チェックをリセット</button>`;

    const updateBar = () => {
      const st = store.get("packing-checked");
      const done = Object.values(st).filter(Boolean).length;
      $("#pack-bar").style.width = total ? (done / total * 100) + "%" : "0%";
    };
    updateBar();

    $$(".pack-box", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        const st = store.get("packing-checked");
        const id = btn.dataset.id;
        st[id] = !st[id];
        store.set("packing-checked", st);
        btn.classList.toggle("done", st[id]);
        btn.textContent = st[id] ? "✓" : "";
        btn.nextElementSibling.classList.toggle("done", st[id]);
        updateBar();
      });
    });
    $("#pack-reset").addEventListener("click", () => {
      store.set("packing-checked", {});
      renderPacking();
    });
  } catch (e) {
    wrap.innerHTML = errCard(e);
  }
}

/* ---------- Booking & Budget ---------- */
async function renderBooking() {
  const wrap = $("#booking");
  try {
    const b = await load("data/booking.json");
    const flights = (b.flights || []).map((f) => `
      <div class="card">
        <div class="cat-head">✈️ ${esc(f.type || "フライト")}</div>
        <div class="kv"><span class="k">区間</span><span class="v">${esc(f.route || "")}</span></div>
        <div class="kv"><span class="k">日付</span><span class="v">${esc(f.date || "")}</span></div>
        <div class="kv"><span class="k">時刻</span><span class="v">${esc(f.time || "")}</span></div>
        <div class="kv"><span class="k">便名</span><span class="v">${esc(f.airline || "")} ${esc(f.flightNo || "")}</span></div>
        <div class="kv"><span class="k">予約番号</span><span class="v">${esc(f.confirm || "")}</span></div>
      </div>`).join("");

    const hotels = (b.hotels || []).map((h) => `
      <div class="card">
        <div class="cat-head">🏨 ${esc(h.name || "宿泊")}</div>
        <div class="kv"><span class="k">チェックイン</span><span class="v">${esc(h.checkin || "")}</span></div>
        <div class="kv"><span class="k">チェックアウト</span><span class="v">${esc(h.checkout || "")}</span></div>
        <div class="kv"><span class="k">住所</span><span class="v">${esc(h.address || "")}</span></div>
        <div class="kv"><span class="k">予約番号</span><span class="v">${esc(h.confirm || "")}</span></div>
        ${h.map ? `<a class="map-link" href="${esc(h.map)}" target="_blank" rel="noopener">🗺️ 地図で見る</a>` : ""}
      </div>`).join("");

    const budget = b.budget || [];
    const totalKrw = budget.reduce((n, r) => n + (Number(r.planKrw) || 0), 0);
    const totalJpy = budget.reduce((n, r) => n + (Number(r.planJpy) || 0), 0);
    const budgetCard = `
      <div class="card">
        <div class="cat-head">💰 予算メモ</div>
        <table class="budget-table">
          <thead><tr><th>項目</th><th>ウォン</th><th>円</th></tr></thead>
          <tbody>
            ${budget.map((r) => `<tr>
              <td>${esc(r.item)}${r.memo ? `<br><span class="place-desc">${esc(r.memo)}</span>` : ""}</td>
              <td>${r.planKrw ? won(r.planKrw) : "—"}</td>
              <td>${r.planJpy ? yen(r.planJpy) : "—"}</td>
            </tr>`).join("")}
            <tr><td class="budget-total">合計</td><td class="budget-total">${won(totalKrw)}</td><td class="budget-total">${yen(totalJpy)}</td></tr>
          </tbody>
        </table>
        ${window.__rate ? `<p class="rate-hint">💱 ${esc(window.__rate.hint || "")}</p>` : ""}
      </div>`;

    wrap.innerHTML = flights + hotels + budgetCard;
  } catch (e) {
    wrap.innerHTML = errCard(e);
  }
}

function errCard(e) {
  return `<div class="card">読み込みに失敗しました 😢<br><span class="place-desc">${esc(e.message)}</span><br><span class="place-desc">※ローカルで開く場合は簡易サーバー経由で表示してください（README参照）</span></div>`;
}

/* ---------- boot ---------- */
(async function main() {
  await renderTrip();
  renderSchedule();
  renderPlaces();
  renderPacking();
  renderBooking();
})();
