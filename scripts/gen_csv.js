// js/data.js から seoul_gourmet_map.csv（Google My Maps インポート用）を再生成する。
// 実行: node scripts/gen_csv.js   （リポジトリのルートからでも scripts/ からでもOK）
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const dataPath = path.join(repoRoot, "js/data.js");
const outPath = path.join(repoRoot, "seoul_gourmet_map.csv");

const src = fs.readFileSync(dataPath, "utf-8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const DATA = sandbox.window.DATA;

function searchTextFrom(spot) {
  if (spot.map && spot.map.startsWith("https://maps.google.com/?q=")) {
    return decodeURIComponent(spot.map.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ");
  }
  // maps.app.goo.gl の短縮リンクはこの環境から解決できないため、店名+エリアで代用。
  // 現地語（ハングル）の表記があればそちらを優先（Naver/Google検索の精度が上がるため）。
  const parenMatch = spot.name.match(/（([^）]*)）/);
  const hangulPart = parenMatch && /[가-힣]/.test(parenMatch[1]) ? parenMatch[1] : null;
  const primary = hangulPart || spot.name.split("（")[0].trim();
  return `${primary} ${spot.area}`.trim();
}

function naverLink(q) { return "https://map.naver.com/p/search/" + encodeURIComponent(q); }
function googleLink(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

function csvEscape(v) {
  v = String(v == null ? "" : v);
  if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}

// schedule内の「restaurant」アイコン項目のタイトルから、店名で places の spot を突き合わせて
// 「訪問日」「その日の順番」をMy Maps用に付与する。place欄は経路の説明で他店名を含むことが
// あるため使わず、タイトルのみを照合対象にする。
const scheduleHits = []; // { text, date, weekday, order }
for (const day of DATA.schedule) {
  let order = 0;
  for (const it of day.items) {
    if (it.icon !== "restaurant") continue;
    order += 1;
    scheduleHits.push({ text: it.title, date: day.date, weekday: day.weekday, order });
  }
}

function scheduleInfoFor(spot) {
  const readable = spot.name.split("（")[0].trim();
  const hangulMatch = spot.name.match(/（([^）]*)）/);
  const hangul = hangulMatch && /[가-힣]/.test(hangulMatch[1]) ? hangulMatch[1] : null;
  const hit = scheduleHits.find((h) => (readable.length >= 2 && h.text.includes(readable)) || (hangul && h.text.includes(hangul)));
  if (!hit) return { visitDate: "", visitOrder: "" };
  const md = hit.date.slice(5).replace(/^0?(\d+)-0?(\d+)$/, "$1/$2");
  return { visitDate: `${md}(${hit.weekday})`, visitOrder: String(hit.order) };
}

const rows = [["店名", "カテゴリ", "エリア", "順位", "メモ", "営業時間", "予約可否", "訪問日", "その日の順番", "検索用住所", "Naverで開く", "Googleで開く"]];

for (const cat of DATA.places) {
  const isGourmet = cat.category.startsWith("グルメ");
  for (const s of cat.spots) {
    const q = searchTextFrom(s);
    // ショッピング等は今回のscheduleに登場しないため突き合わせ自体を行わない（誤マッチ防止）
    const { visitDate, visitOrder } = isGourmet ? scheduleInfoFor(s) : { visitDate: "", visitOrder: "" };
    rows.push([s.name, cat.category, s.area, s.rank ? `No.${s.rank}` : "", s.desc, s.hours || "", s.reserve || "", visitDate, visitOrder, q, naverLink(q), googleLink(q)]);
  }
}

for (const h of DATA.hotels) {
  const q = h.map.startsWith("https://maps.google.com/?q=")
    ? decodeURIComponent(h.map.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ")
    : h.name;
  const memo = `${h.short}。${h.room}。${h.requests}。予約ID ${h.id}`;
  rows.push([h.name, "🏨 ホテル", h.checkin.split("（")[0] + "〜", "", memo, "", "", "", "", q, naverLink(q), googleLink(q)]);
}

const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
fs.writeFileSync(outPath, csv, "utf-8");
console.log("wrote", outPath, "-", rows.length - 1, "rows");
