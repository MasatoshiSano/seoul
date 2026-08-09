"use strict";
(function () {
  const D = window.DATA || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const yen = (n) => "¥" + Number(n).toLocaleString("ja-JP");
  const won = (n) => Number(n).toLocaleString("ja-JP") + "₩";
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch { return {}; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  function fillHero() {
    const dates = $("#hero-dates");
    if (dates && D.trip) dates.textContent = D.trip.subtitle + " ・ " + D.trip.nights;
    const note = $("#hero-note");
    if (note && D.trip) note.innerHTML = window.ICON("check") + " <b>安心</b> " + esc(D.trip.note);
  }

  function renderSchedule() {
    const wrap = $("#schedule"); if (!wrap) return;
    wrap.innerHTML = D.schedule.map((d) => `
      <div class="day">
        <div class="day-head">
          <div class="day-num">${esc(d.day)}</div>
          <div class="day-meta">
            <div class="day-title">${esc(d.label)}</div>
            <div class="day-sub">${esc(d.date)}（${esc(d.weekday)}）</div>
          </div>
        </div>
        <div class="tl">
          ${d.items.map((it) => `
            <div class="tl-item">
              <div class="tl-time">${esc(it.time)}</div>
              <div class="tl-body">
                <div class="tl-title">${window.ICON(it.icon)} ${esc(it.title)}</div>
                ${it.place ? `<div class="tl-place">${window.ICON("place")} ${esc(it.place)}</div>` : ""}
                ${it.memo ? `<div class="tl-memo">${esc(it.memo)}</div>` : ""}
                ${it.map ? `<a class="maplink" href="${esc(it.map)}" target="_blank" rel="noopener">地図で見る</a>` : ""}
              </div>
            </div>`).join("")}
        </div>
      </div>`).join("");
  }

  function renderPlaces() {
    const wrap = $("#places"); if (!wrap) return;
    const draw = () => {
      const st = store.get("seoul-places");
      wrap.innerHTML = D.places.map((c) => `
        <div class="cat">
          <div class="cat-head">${esc(c.category)} <span class="tag">${esc(c.tag)}</span></div>
          <div class="card">
          ${c.spots.map((s) => {
            const id = c.category + "::" + s.name, done = !!st[id];
            return `<div class="row">
              <button class="check" data-id="${esc(id)}" aria-pressed="${done}" aria-label="訪問済みにする">${done ? "✓" : ""}</button>
              <div class="row-body">
                <span class="row-name ${done ? "done" : ""}">${esc(s.name)}</span><span class="row-area">${esc(s.area)}</span>
                <div class="row-desc">${esc(s.desc)}</div>
                <a class="maplink" href="${esc(s.map)}" target="_blank" rel="noopener">地図で見る</a>
              </div>
            </div>`;
          }).join("")}
          </div>
        </div>`).join("");
      $$(".check", wrap).forEach((b) => b.addEventListener("click", () => {
        const st = store.get("seoul-places"), id = b.dataset.id;
        st[id] = !st[id]; store.set("seoul-places", st);
        b.setAttribute("aria-pressed", st[id]); b.textContent = st[id] ? "✓" : "";
        b.parentElement.querySelector(".row-name").classList.toggle("done", st[id]);
      }));
    };
    draw();
  }

  function renderPacking() {
    const wrap = $("#packing"); if (!wrap) return;
    const total = D.packing.reduce((n, c) => n + c.items.length, 0);
    const draw = () => {
      const st = store.get("seoul-packing");
      wrap.innerHTML = `
        <p class="progress-label" id="pk-label"></p>
        <div class="progress"><span id="pk-bar"></span></div>
        ${D.packing.map((c) => `
          <div class="cat">
            <div class="cat-head" style="font-size:19px">${esc(c.category)}</div>
            <div class="card">
            ${c.items.map((item) => {
              const id = c.category + "::" + item, done = !!st[id];
              return `<div class="row">
                <button class="check good" data-id="${esc(id)}" aria-pressed="${done}" aria-label="用意した">${done ? "✓" : ""}</button>
                <div class="row-body"><span class="row-name ${done ? "done" : ""}">${esc(item)}</span></div>
              </div>`;
            }).join("")}
            </div>
          </div>`).join("")}
        <button class="reset" id="pk-reset">チェックをリセット</button>`;
      const bar = () => {
        const st = store.get("seoul-packing"), done = Object.values(st).filter(Boolean).length;
        $("#pk-bar").style.width = total ? (done / total * 100) + "%" : "0%";
        $("#pk-label").textContent = `準備 ${done} / ${total} 個`;
      };
      bar();
      $$(".check", wrap).forEach((b) => b.addEventListener("click", () => {
        const st = store.get("seoul-packing"), id = b.dataset.id;
        st[id] = !st[id]; store.set("seoul-packing", st);
        b.setAttribute("aria-pressed", st[id]); b.textContent = st[id] ? "✓" : "";
        b.parentElement.querySelector(".row-name").classList.toggle("done", st[id]);
        bar();
      }));
      $("#pk-reset").addEventListener("click", () => { store.set("seoul-packing", {}); draw(); });
    };
    draw();
  }

  function renderBooking() {
    const wrap = $("#booking"); if (!wrap) return;
    const flights = D.flights.map((x) => `
      <div class="ticket">
        <h3>${window.ICON("flight")} ${esc(x.type)} ・ ${esc(x.no)}</h3>
        <div class="kv"><span class="k">区間</span><span class="v">${esc(x.route)}</span></div>
        <div class="kv"><span class="k">日付</span><span class="v">${esc(x.date)}</span></div>
        <div class="kv"><span class="k">時刻</span><span class="v">${esc(x.time)}</span></div>
        <div class="kv"><span class="k">便名</span><span class="v">${esc(x.airline)} ${esc(x.no)}</span></div>
      </div>`).join("");
    const h = D.hotel;
    const hotel = `
      <div class="ticket">
        <h3>${window.ICON("hotel")} ${esc(h.name)}</h3>
        <div class="kv"><span class="k">チェックイン</span><span class="v">${esc(h.checkin)}</span></div>
        <div class="kv"><span class="k">チェックアウト</span><span class="v">${esc(h.checkout)}</span></div>
        <div class="kv"><span class="k">住所</span><span class="v">${esc(h.address)}</span></div>
        <div style="margin-top:10px"><a class="maplink" href="${esc(h.map)}" target="_blank" rel="noopener">地図で見る</a></div>
      </div>`;
    const tk = D.budget.reduce((n, r) => n + (r.krw || 0), 0);
    const tj = D.budget.reduce((n, r) => n + (r.jpy || 0), 0);
    const budget = `
      <div class="ticket">
        <h3>${window.ICON("payments")} 予算メモ</h3>
        <table class="budget">
          <thead><tr><th>項目</th><th>ウォン</th><th>円</th></tr></thead>
          <tbody>
            ${D.budget.map((r) => `<tr>
              <td>${esc(r.item)}${r.memo ? `<br><span class="sub">${esc(r.memo)}</span>` : ""}</td>
              <td>${r.krw ? won(r.krw) : "—"}</td>
              <td>${r.jpy ? yen(r.jpy) : "—"}</td>
            </tr>`).join("")}
            <tr class="total"><td>合計</td><td>${won(tk)}</td><td>${yen(tj)}</td></tr>
          </tbody>
        </table>
        <p class="rate">💱 ${esc(D.trip.rate)}</p>
      </div>`;
    wrap.innerHTML = flights + hotel + budget;
  }

  function themeToggle() {
    const btn = $("#themebtn"); if (!btn) return;
    const root = document.documentElement;
    btn.addEventListener("click", () => {
      const dark = root.getAttribute("data-theme") === "dark"
        || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      root.setAttribute("data-theme", dark ? "light" : "dark");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fillHero();
    renderSchedule();
    renderPlaces();
    renderPacking();
    renderBooking();
    if (window.injectIcons) window.injectIcons();
    themeToggle();
  });
})();
