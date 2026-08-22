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
  // maps.app.goo.gl の短縮リンクはこの環境から解決できないため、店名(全角括弧の前)+エリアで代用
  const primary = spot.name.split("（")[0].trim();
  return `${primary} ${spot.area}`.trim();
}

function naverLink(q) { return "https://map.naver.com/p/search/" + encodeURIComponent(q); }
function googleLink(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

function csvEscape(v) {
  v = String(v == null ? "" : v);
  if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}

const rows = [["店名", "カテゴリ", "エリア", "順位", "メモ", "営業時間", "予約可否", "検索用住所", "Naverで開く", "Googleで開く"]];

for (const cat of DATA.places) {
  for (const s of cat.spots) {
    const q = searchTextFrom(s);
    rows.push([s.name, cat.category, s.area, s.rank ? `No.${s.rank}` : "", s.desc, s.hours || "", s.reserve || "", q, naverLink(q), googleLink(q)]);
  }
}

for (const h of DATA.hotels) {
  const q = h.map.startsWith("https://maps.google.com/?q=")
    ? decodeURIComponent(h.map.replace("https://maps.google.com/?q=", "")).replace(/\+/g, " ")
    : h.name;
  const memo = `${h.short}。${h.room}。${h.requests}。予約ID ${h.id}`;
  rows.push([h.name, "🏨 ホテル", h.checkin.split("（")[0] + "〜", "", memo, "", "", q, naverLink(q), googleLink(q)]);
}

const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
fs.writeFileSync(outPath, csv, "utf-8");
console.log("wrote", outPath, "-", rows.length - 1, "rows");
