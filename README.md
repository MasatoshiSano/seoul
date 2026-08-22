# 🧳 ソウル旅のしおり 2026

同行者とURLで共有できる、**Apple.com風**の複数ページ構成の旅のしおりサイトです。
スマホで見やすく、日程・行きたい場所・お金/交通・持ち物・予約&予算をまとめて確認できます。

**期間：2026.8.27 (木) 〜 8.30 (日) ・ 3泊4日 ／ Peach MM743・MM736（関西⇄仁川）**

> 🔄 **作業を別セッションで続ける場合は、まず [`CONTINUATION.md`](./CONTINUATION.md) を読んでください。**
> 現在進行中のタスク（グルメ候補の順位付け→ルート再構築）の引き継ぎ内容が書かれています。

---

## 📄 ページ構成

| ページ | ファイル | 内容 |
|--------|---------|------|
| トップ | `index.html` | 旅の概要・各ページ入口 |
| 日程 | `schedule.html` | 4日間のタイムライン |
| 行きたい場所 | `places.html` | グルメ / ショッピング / 観光（訪問チェック） |
| お金・交通 | `guide.html` | 両替所・WOWPASS・CHECK iN SEOUL・気候同行カード・空港アクセス・東大門豆知識 |
| 持ち物 | `packing.html` | チェックリスト（進捗バー） |
| 予約 & 予算 | `booking.html` | フライト・ホテル・予算 |

チェック状態は各自のブラウザ（端末）に保存されます。

---

## ✏️ 内容の編集方法

日程・お店・持ち物・予約などのデータは **`js/data.js` の1ファイル**にまとまっています。
ここを編集すると、全ページに反映されます。

```js
// 例：js/data.js の schedule に予定を追加
{ time: "14:00", icon: "☕", title: "カフェ休憩", place: "聖水洞", map: "https://maps.google.com/?q=Seongsu", memo: "映えスイーツ" }
```

デザイン（色・レイアウト）は `css/style.css`、表示ロジックは `js/app.js` です。

---

## 🌐 GitHub Pages で公開する

1. リポジトリの **Settings → Pages** を開く（直リンク：`https://github.com/<user>/seoul/settings/pages`）
2. **Source** =「Deploy from a branch」
3. **Branch** = `main`、フォルダ = `/ (root)` → **Save**
4. 数分後 `https://<user>.github.io/seoul/` で公開されます

---

## 💻 ローカルで確認する

```bash
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

## 🗂️ ファイル構成

```
index.html / schedule.html / places.html / guide.html / packing.html / booking.html
css/style.css          デザイン（Apple風・ライト/ダーク対応）
js/data.js             すべてのデータ（ここを編集）
js/app.js              表示ロジック
seoul_map_day1_0827.csv 〜 day4_0830.csv  日ごとの実ルート（Google My Maps インポート用・自動生成）
seoul_map_wishlist.csv  行きたい場所のうち日程未定の候補（Google My Maps インポート用・自動生成）
scripts/gen_csv.js      上記CSV一式の生成スクリプト
```

### 🗺️ Google My Maps 用CSVについて

`js/data.js` の内容から `scripts/gen_csv.js` で複数のCSVを生成しています。
`js/data.js` を更新したら `node scripts/gen_csv.js` を実行して作り直してください。

- `seoul_map_day1_0827.csv` 〜 `seoul_map_day4_0830.csv`：その日の実際のルート（ホテル/空港→立寄り店→ホテル/空港、訪問順）
- `seoul_map_wishlist.csv`：「行きたい場所」のうち、まだ日程に組み込まれていない候補（グルメ＋ショッピング）

[Google My Maps](https://mymaps.google.com) には、この5枚をそれぞれ**別レイヤーとして**インポートしてください。
レイヤーごとに自動で異なる色が割り当てられるため、日ごと・候補用で色分けされた地図になります。
インポート時、マーカーのタイトルに使う列として日ごとのCSVでは **「ピン表示名（タイトルに選択）」** を選ぶと、
`①07:00 店名` のように丸数字＋時刻がピンの横にそのまま表示され、クリックしなくても訪問順がわかります。

よい旅を！🇰🇷✈️
