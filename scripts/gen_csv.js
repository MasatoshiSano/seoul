// js/data.js から Google My Maps インポート用のCSVを複数枚に分けて再生成する。
// 実行: node scripts/gen_csv.js   （リポジトリのルートからでも scripts/ からでもOK）
//
// 出力：
//   seoul_map_day1_0827.csv 〜 day4_0830.csv … 日ごとの実際のルート（ホテル→立寄り店→ホテル）
//   seoul_map_wishlist.csv                  … 行きたい場所のうち、まだ日程に入っていない候補
// My Mapsに別レイヤーとしてそれぞれインポートすると、レイヤー単位で自動的に色分けされる。
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const dataPath = path.join(repoRoot, "js/data.js");

const src = fs.readFileSync(dataPath, "utf-8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const DATA = sandbox.window.DATA;

function csvEscape(v) {
  v = String(v == null ? "" : v);
  if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}
function naverLink(q) { return "https://map.naver.com/p/search/" + encodeURIComponent(q); }
function googleLink(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
function writeCsv(outPath, header, rows) {
  const csv = [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
  fs.writeFileSync(outPath, csv, "utf-8");
  console.log("wrote", path.relative(repoRoot, outPath), "-", rows.length, "rows");
}

// 現地語（ハングル）表記があればそちらを検索クエリに優先採用（Naver/Google検索の精度が上がるため）。
function searchTextFromSpot(spot) {
  if (spot.map && spot.map.startsWith("https://maps.google.com/?q=")) {
    return decodeURIComponent(spot.map.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ");
  }
  const parenMatch = spot.name.match(/（([^）]*)）/);
  const hangulPart = parenMatch && /[가-힣]/.test(parenMatch[1]) ? parenMatch[1] : null;
  const primary = hangulPart || spot.name.split("（")[0].trim();
  return `${primary} ${spot.area}`.trim();
}

function queryFromMapField(mapUrl, fallbackText) {
  if (mapUrl && mapUrl.startsWith("https://maps.google.com/?q=")) {
    return decodeURIComponent(mapUrl.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ");
  }
  return fallbackText;
}

function readableAndHangul(name) {
  const readable = name.split("（")[0].trim();
  const hangulMatch = name.match(/（([^）]*)）/);
  const hangul = hangulMatch && /[가-힣]/.test(hangulMatch[1]) ? hangulMatch[1] : null;
  return { readable, hangul };
}

// schedule内の「restaurant/cafe」項目タイトルと places の spot 名を突き合わせる。
// place欄は経路説明で他店名を含むことがあるため使わず、titleのみを照合対象にする。
// ショッピング等は突き合わせ対象外（グルメ限定にして誤マッチを防止）。
function findMatchingSpot(title) {
  for (const cat of DATA.places) {
    if (!cat.category.startsWith("グルメ")) continue;
    for (const s of cat.spots) {
      const { readable, hangul } = readableAndHangul(s.name);
      if ((readable.length >= 2 && title.includes(readable)) || (hangul && title.includes(hangul))) return s;
    }
  }
  return null;
}

function isScheduledSpot(spot) {
  const { readable, hangul } = readableAndHangul(spot.name);
  for (const day of DATA.schedule) {
    for (const it of day.items) {
      if (it.icon !== "restaurant" && it.icon !== "cafe") continue;
      if ((readable.length >= 2 && it.title.includes(readable)) || (hangul && it.title.includes(hangul))) return true;
    }
  }
  return false;
}

// ---- 1) 日ごとのCSV：その日の実ルート（ホテル/空港の発着＋レストラン/カフェの立ち寄り順） ----
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
const dayHeader = ["ピン表示名（タイトルに選択）", "時刻", "名前", "メモ", "検索用住所", "Naverで開く", "Googleで開く"];

DATA.schedule.forEach((day, di) => {
  const stops = [];
  if (day.startPlace && !day.startPlace.name.includes("空港")) stops.push({ hotel: true, label: day.startPlace.name, map: day.startPlace.map, memo: "この日の出発地点" });
  for (const it of day.items) {
    if (it.icon !== "restaurant" && it.icon !== "cafe") continue;
    stops.push({ hotel: false, label: it.place || it.title, map: it.map, time: it.time, memo: it.memo, title: it.title });
  }
  if (day.endPlace && !day.endPlace.name.includes("空港")) stops.push({ hotel: true, label: day.endPlace.name, map: day.endPlace.map, memo: "この日の到着地点" });

  let order = 0;
  const rows = stops.map((st) => {
    const spot = findMatchingSpot(st.title || st.label);
    const q = spot ? searchTextFromSpot(spot) : queryFromMapField(st.map, st.label);
    const pin = st.hotel ? `🏨 ${st.label}` : (() => { order += 1; return `${CIRCLED[order - 1] || `(${order})`} ${st.time} ${st.label}`; })();
    return [pin, st.time || "", st.label, st.memo || "", q, naverLink(q), googleLink(q)];
  });

  const outPath = path.join(repoRoot, `seoul_map_day${di + 1}_${day.date.slice(5).replace("-", "")}.csv`);
  writeCsv(outPath, dayHeader, rows);
});

// ---- 2) 行きたい場所のうち、まだ日程に入っていない候補 ----
const wishlistHeader = ["店名", "カテゴリ", "エリア", "順位", "メモ", "営業時間", "予約可否", "検索用住所", "Naverで開く", "Googleで開く"];
const wishlistRows = [];
for (const cat of DATA.places) {
  for (const s of cat.spots) {
    if (cat.category.startsWith("グルメ") && isScheduledSpot(s)) continue; // 日程確定済みは除外
    const q = searchTextFromSpot(s);
    wishlistRows.push([s.name, cat.category, s.area, s.rank ? `No.${s.rank}` : "", s.desc, s.hours || "", s.reserve || "", q, naverLink(q), googleLink(q)]);
  }
}
writeCsv(path.join(repoRoot, "seoul_map_wishlist.csv"), wishlistHeader, wishlistRows);
