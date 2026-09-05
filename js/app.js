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

  function queryFromMapField(mapUrl, fallbackText) {
    if (mapUrl && mapUrl.startsWith("https://maps.google.com/?q=")) {
      return decodeURIComponent(mapUrl.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ");
    }
    return fallbackText || "";
  }

  function buildDayRoute(d) {
    const geo = D.geo || {};
    const withGeo = (label, map, isPlace) => ({ label, query: queryFromMapField(map, label), map, geo: geo[label] || null, isPlace: !!isPlace });
    const stops = [];
    if (d.startPlace) stops.push(withGeo(d.startPlace.name, d.startPlace.map, true));
    for (const it of d.items) {
      if (it.icon !== "restaurant" && it.icon !== "cafe") continue;
      const label = it.place || it.title;
      stops.push(withGeo(label, it.map, false));
    }
    if (d.endPlace) stops.push(withGeo(d.endPlace.name, d.endPlace.map, true));
    return stops;
  }

  function directionsUrl(stops) {
    if (stops.length < 2) return null;
    const origin = encodeURIComponent(stops[0].query);
    const destination = encodeURIComponent(stops[stops.length - 1].query);
    const mid = stops.slice(1, -1).map((s) => encodeURIComponent(s.query)).join("|");
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
    if (mid) url += `&waypoints=${mid}`;
    return url;
  }

  function initRouteMap(mapId, stops) {
    const el = document.getElementById(mapId);
    const withGeo = stops.filter((s) => s.geo);
    if (!el || !window.L || withGeo.length < 2) { if (el) el.remove(); return; }
    const map = L.map(mapId, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    const latlngs = withGeo.map((s) => s.geo);
    const line = L.polyline(latlngs, { color: "#3a6df0", weight: 3.5, opacity: 0.85 }).addTo(map);
    if (window.L.polylineDecorator) {
      L.polylineDecorator(line, {
        patterns: [{ offset: "8%", repeat: "12%", symbol: L.Symbol.arrowHead({ pixelSize: 11, pathOptions: { color: "#3a6df0", fillOpacity: 0.9, weight: 0 } }) }]
      }).addTo(map);
    }
    let order = 0;
    withGeo.forEach((s) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="day-route-pin${s.isPlace ? " day-route-pin-hotel" : ""}">${s.isPlace ? "🏨" : ++order}</div>`,
        iconSize: [26, 26], iconAnchor: [13, 13]
      });
      L.marker(s.geo, { icon }).addTo(map).bindPopup(esc(s.label));
    });
    map.fitBounds(line.getBounds(), { padding: [24, 24] });
  }

  function renderSchedule() {
    const wrap = $("#schedule"); if (!wrap) return;
    const dayRoutes = D.schedule.map(buildDayRoute);
    wrap.innerHTML = D.schedule.map((d, di) => {
      const stops = dayRoutes[di];
      const allUrl = directionsUrl(stops);
      const mapId = `day-route-map-${d.day}`;
      return `
      <div class="day">
        <div class="day-head">
          <div class="day-num">${esc(d.day)}</div>
          <div class="day-meta">
            <div class="day-title">${esc(d.label)}</div>
            <div class="day-sub">${esc(d.date)}（${esc(d.weekday)}）</div>
          </div>
        </div>
        ${stops.length >= 2 ? `
        <div class="day-route">
          <div class="day-route-head">
            <span>${window.ICON("place")} この日のルート（ホテル→お店→ホテル）</span>
            ${allUrl ? `<a class="day-route-all" href="${esc(allUrl)}" target="_blank" rel="noopener">アプリで開く ›</a>` : ""}
          </div>
          <div class="day-route-map" id="${mapId}"></div>
          <div class="day-route-chain">
            ${stops.map((s, i) => `${i > 0 ? '<span class="day-route-arrow">→</span>' : ""}<a class="day-route-chip" href="${esc(s.map || "#")}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("")}
          </div>
        </div>` : ""}
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
      </div>`;
    }).join("");
    D.schedule.forEach((d, di) => initRouteMap(`day-route-map-${d.day}`, dayRoutes[di]));
  }

  function scheduleHitsForPlaces() {
    const hits = [];
    for (const day of D.schedule || []) {
      for (const it of day.items) {
        if (it.icon !== "restaurant" && it.icon !== "cafe") continue;
        hits.push({ text: it.title, date: day.date, time: it.time });
      }
    }
    return hits;
  }

  function scheduleInfoForSpot(spot, hits) {
    const readable = spot.name.split("（")[0].trim();
    const hangulMatch = spot.name.match(/（([^）]*)）/);
    const hangul = hangulMatch && /[가-힣]/.test(hangulMatch[1]) ? hangulMatch[1] : null;
    const hit = hits.find((h) => (readable.length >= 2 && h.text.includes(readable)) || (hangul && h.text.includes(hangul)));
    if (!hit) return null;
    const md = hit.date.slice(5).replace(/^0?(\d+)-0?(\d+)$/, "$1/$2");
    return { date: md, time: hit.time };
  }

  function renderPlaces() {
    const wrap = $("#places"); if (!wrap) return;
    const hits = scheduleHitsForPlaces();
    const draw = () => {
      const st = store.get("seoul-places");
      wrap.innerHTML = D.places.map((c) => `
        <div class="cat">
          <div class="cat-head">${esc(c.category)} <span class="tag">${esc(c.tag)}</span></div>
          <div class="card">
          ${c.spots.map((s) => {
            const id = c.category + "::" + s.name, done = !!st[id];
            const sched = c.category.startsWith("グルメ") ? scheduleInfoForSpot(s, hits) : null;
            return `<div class="row${sched ? " scheduled" : ""}">
              <button class="check" data-id="${esc(id)}" aria-pressed="${done}" aria-label="訪問済みにする">${done ? "✓" : ""}</button>
              <div class="row-body">
                ${s.rank ? `<span class="rank-badge rank-${s.rank <= 3 ? s.rank : "n"}">No.${s.rank}</span>` : ""}
                ${sched ? `<span class="sched-badge">📅 ${esc(sched.date)} ${esc(sched.time)}</span>` : ""}
                <span class="row-name ${done ? "done" : ""}">${esc(s.name)}</span><span class="row-area">${esc(s.area)}</span>
                <div class="row-desc">${esc(s.desc)}</div>
                ${s.hours || s.reserve ? `<div class="row-meta">${s.hours ? `<span>🕐 ${esc(s.hours)}</span>` : ""}${s.reserve ? `<span>📅 予約: ${esc(s.reserve)}</span>` : ""}</div>` : ""}
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
    const hotel = (D.hotels || []).map((h) => `
      <div class="ticket">
        <h3>${window.ICON("hotel")} ${esc(h.name)}</h3>
        ${h.short ? `<div class="kv"><span class="k">泊数</span><span class="v">${esc(h.short)}</span></div>` : ""}
        <div class="kv"><span class="k">チェックイン</span><span class="v">${esc(h.checkin)}</span></div>
        <div class="kv"><span class="k">チェックアウト</span><span class="v">${esc(h.checkout)}</span></div>
        <div class="kv"><span class="k">部屋</span><span class="v">${esc(h.room)}</span></div>
        <div class="kv"><span class="k">人数</span><span class="v">${esc(h.guests)}</span></div>
        <div class="kv"><span class="k">リクエスト</span><span class="v">${esc(h.requests)}</span></div>
        <div class="kv"><span class="k">予約ID</span><span class="v">${esc(h.id)}</span></div>
        ${h.price ? `<div class="kv"><span class="k">料金</span><span class="v">${esc(h.price)}</span></div>` : ""}
        ${h.payDate ? `<div class="kv"><span class="k">支払予定日</span><span class="v">${esc(h.payDate)}</span></div>` : ""}
        ${h.note ? `<div class="kv"><span class="k">注意</span><span class="v">${esc(h.note)}</span></div>` : ""}
        <div style="margin-top:10px"><a class="maplink" href="${esc(h.map)}" target="_blank" rel="noopener">地図で見る</a></div>
      </div>`).join("");
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
    const expenseDays = {};
    (D.expenses || []).forEach((e) => { (expenseDays[e.date] = expenseDays[e.date] || []).push(e); });
    const grandTotal = (D.expenses || []).reduce((n, e) => n + e.krw, 0);
    const expenses = (D.expenses && D.expenses.length) ? `
      <div class="ticket">
        <h3>${window.ICON("payments")} 実際の支出（レシート記録）</h3>
        ${Object.keys(expenseDays).map((date) => {
          const items = expenseDays[date];
          const subtotal = items.reduce((n, e) => n + e.krw, 0);
          return `
          <table class="budget">
            <thead><tr><th colspan="2">${esc(date)}</th><th>${won(subtotal)}</th></tr></thead>
            <tbody>
              ${items.map((e) => `<tr>
                <td>${esc(e.time)}</td>
                <td>${esc(e.place)}<br><span class="sub">${esc(e.desc)}</span></td>
                <td>${e.krw < 0 ? "−" + won(Math.abs(e.krw)) : won(e.krw)}</td>
              </tr>`).join("")}
            </tbody>
          </table>`;
        }).join("")}
        <table class="budget">
          <tbody><tr class="total"><td colspan="2">総合計</td><td>${won(grandTotal)}</td></tr></tbody>
        </table>
      </div>` : "";
    wrap.innerHTML = flights + hotel + budget + expenses;
  }

  function renderLog() {
    const wrap = $("#log"); if (!wrap) return;
    if (!D.log || !D.log.length) {
      wrap.innerHTML = `<p class="sec-sub" style="text-align:center">まだ更新はありません。</p>`;
      return;
    }
    wrap.innerHTML = `<div class="tl">${D.log.map((e) => `
      <div class="tl-item">
        <div class="tl-time">${esc(e.time)}</div>
        <div class="tl-body">
          <div class="tl-title">${window.ICON("log")} ${esc(e.date)}</div>
          <div class="tl-memo">${esc(e.text)}</div>
        </div>
      </div>`).join("")}</div>`;
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
    renderLog();
    if (window.injectIcons) window.injectIcons();
    themeToggle();
  });
})();
