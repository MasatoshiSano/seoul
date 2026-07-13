# 🧳 ソウル旅行 2026

同行者とURLで共有できる、かわいい旅のしおり＆スケジュール管理サイトです。
スマホで見やすく、日程・行きたい場所・持ち物・予約&予算をまとめて管理できます。

**期間：2026.8.27 (木) 〜 8.30 (日) ・ 3泊4日**

---

## 📱 できること

| タブ | 内容 |
|------|------|
| 📅 **日程** | 日ごとのタイムライン。時刻・場所・メモ・地図リンク |
| 📍 **行きたい場所** | グルメ / ショッピング / 観光をカテゴリ別に管理。行ったら✓（端末に保存） |
| ✅ **持ち物** | チェックリスト。進捗バー付き。旅行前に何度でも使える（端末に保存） |
| ✈️💰 **予約 & 予算** | フライト・ホテルの予約情報 ＋ 予算メモ（ウォン⇔円） |

> ✓ のチェック状態は各自のブラウザ（端末）に保存されます。共有はされないので、自分専用のチェックとして使えます。

---

## ✏️ 内容の編集方法

日程やお店の情報は `data/` 内のJSONファイルを編集するだけで更新できます。

### 日程を追加・変更する → `data/schedule.json`
1日ぶんの予定を1ブロックとして、`items` に予定を足していきます。

```json
{
  "time": "14:00",
  "title": "カフェでひと休み",
  "place": "聖水洞のカフェ",
  "map": "https://maps.google.com/?q=Seongsu+Cafe",
  "memo": "映えスイーツを食べる",
  "icon": "☕"
}
```

- `map` は Google マップの検索URL（`https://maps.google.com/?q=場所名`）でOK。空 `""` でも可
- `icon` は好きな絵文字

### 行きたい場所を追加する → `data/places.json`
```json
{ "name": "店名", "desc": "ひとこと説明", "area": "エリア", "map": "https://maps.google.com/?q=..." }
```

### 持ち物を追加する → `data/packing.json`
`items` の配列に文字列を足すだけ。

### 予約・予算を編集する → `data/booking.json`
フライト便名・ホテルの予約番号・予算金額を書き換えます。

### 旅行のタイトルや注意書き → `data/trip.json`

---

## 🌐 GitHub Pages で公開する（URL共有）

1. GitHub のリポジトリページで **Settings → Pages** を開く
2. **Source** を「Deploy from a branch」にする
3. Branch を `main`（または公開したいブランチ）、フォルダを `/ (root)` にして **Save**
4. 数分後、`https://<ユーザー名>.github.io/seoul/` で公開されます 🎉
5. このURLを同行者に共有すればOK

---

## 💻 ローカルで確認する

JSONを `fetch` で読み込むため、HTMLファイルを直接ダブルクリックで開くと表示されません。
簡易サーバー経由で開いてください。

```bash
# Python がある場合
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

---

## 🗂️ ファイル構成

```
index.html          サイト本体
css/style.css       デザイン
js/app.js           表示ロジック（JSON読み込み・チェック保存）
data/trip.json      旅行タイトル・注意書き・為替目安
data/schedule.json  日程（ここを編集）
data/places.json    行きたい場所リスト
data/packing.json   持ち物リスト
data/booking.json   予約情報・予算
```

Have a nice trip! 🇰🇷✈️
