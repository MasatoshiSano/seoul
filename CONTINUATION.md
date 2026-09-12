# 引き継ぎメモ（次のセッション・別のAIツールへ）

このファイルは、このリポジトリで作業を続ける人／AIエージェント（Claude以外のツールも含む）向けの
引き継ぎです。会話の外側でこの内容だけを見ても迷わないように、決定事項・運用ルール・未解決事項を
まとめてあります。**古い情報は上書きしてよい** — このファイル自体が「今の状態」を表すもので、
過去の作業ログではありません。更新した人は、このファイルも一緒に最新化してください。

最終更新：2026-09-12時点。

## このリポジトリは何か

日本語の個人旅行しおりサイト（静的サイト・バックエンドなし・GitHub Pages公開）。
**2026年8月27日(木)〜30日(日)・3泊4日のソウル旅行**の、
1. 事前の旅程計画（訪問順・お店選定・持ち物・予算見積もり）
2. 旅行中〜旅行後の「実際どうだったか」の記録（現地ログ・実際の支出）

の両方を1つのサイトにまとめている。**旅行はすでに終わっている**（最終日は8/30）。
現在（2026-09-12時点）は、届いたレシート画像をもとに実際の支出記録を精緻化するフェーズ。

- 公開URL：https://masatoshisano.github.io/seoul/
- GitHub Pages の Source は `main` ブランチ。実際の開発は `claude/seoul-places-csv-update-hnbqm8`
  ブランチで行い、都度 `main` にマージしてpushしている（ブランチ名は変わり得るので `git branch -a` で確認）。
- 空港は **金浦（GMP）**。仁川（ICN）ではない。以前 Incheon 前提で書いてしまい、
  ユーザー提供のフライト予約画面のスクショで訂正済み。もしどこかに「仁川」の記述が残っていたらバグ。
- 便：MM743（関西KIX→金浦GMP、8/27 18:00着）／MM736（金浦GMP→関西KIX、8/30 11:25発）。

## ファイル構成とアーキテクチャ

- ビルド不要。素のHTML＋バニラJS。npmもバンドラも無し。
- `js/data.js` — **唯一のデータソース**。`window.DATA` に以下を格納：
  - `geo`：地名 → `[lat, lng]`
  - Day1〜Day4 の `schedule`（各日 `startPlace`/`endPlace`/`items`）
  - `flights`：往復便情報
  - `hotels`：宿泊確定情報
  - `places`：カテゴリ別「行きたい場所」リスト（グルメ・ショッピング等）
  - `packing`：持ち物チェックリスト
  - `log`：**現地からのリアルタイム更新**。新しいものを配列の**先頭**に追加（log.htmlで新着順表示）
  - `expenses`：**実際のレシートの記録**（後述の規約を厳守）
  - `budget`：旅行前の予算見積もり（実績と比較するための基準値。実績で上書きしない）
- `js/app.js` — IIFE形式の描画関数群（`renderSchedule` / `renderPlaces` / `renderPacking` /
  `renderBooking` / `renderLog` / `initRouteMap` など）。`DOMContentLoaded` でまとめて呼び出し。
- `js/icons.js` — `window.ICON` / `window.injectIcons`（インラインSVGのアイコンセット）。
- `css/style.css` — 共通スタイル1枚（Apple.com風、ライト/ダーク対応）。
- 7ページ、すべて同じnav・同じ4アセットを読み込む：
  `index.html` `schedule.html` `places.html` `guide.html` `packing.html` `booking.html` `log.html`
- `schedule.html` には Leaflet.js + OpenStreetMap（CDN、APIキー不要）で日ごとのルート地図があり、
  `leaflet-polylinedecorator` で矢印を表示している（`.day-route*` というCSSクラス接頭辞。
  以前 `.route` という名前だったせいで既存CSSと衝突しゼロ幅になったバグがあったため改名済み。
  同じ接頭辞を再利用しないこと）。
- `scripts/gen_csv.js` — `js/data.js` から Google My Maps 用CSVを生成
  （`seoul_map_day1_0827.csv`〜`day4_0830.csv` ＋ `seoul_map_wishlist.csv`。空港は除外）。
- ユーザー自身が作った実際のGoogle My Mapsへのリンクが `schedule.html` に貼ってある
  （mid=`12uMAsiohCHTfbqAK3I8pVmQ7qAwvk7g`）。Google My Maps はレイヤーごとに**自動で色分けされない**
  （以前「自動で色分けされる」と誤って案内し、ユーザーに訂正された）。手動で色を設定する必要がある。

## 毎回のルーティン（このリポジトリでの定型作業）

1. `js/data.js` / `js/app.js` / CSS / HTML を編集。
2. `node --check js/data.js && node --check js/app.js`（テストスイートは無いので、これが唯一の自動チェック）。
3. 場所・日程データを変更したら `node scripts/gen_csv.js` でCSVを再生成。
4. **キャッシュバスティング版数を上げる** — 7枚のHTML全部にある
   `css/style.css?v=N` / `js/data.js?v=N` / `js/icons.js?v=N` / `js/app.js?v=N` の `N` を、
   **現在の最大値を確認してから**+1する（`grep -rn "v=" *.html` で確認）。
   GitHub Pagesはキャッシュが強いので、これを忘れると本番に反映されない。
5. UIを見た目で確認する場合はオフラインコピーでテストする（下記）。
6. 作業ブランチでコミット→push。その後：
   ```
   git checkout main
   git merge --ff-only origin/main
   git merge --no-ff <作業ブランチ>
   git push origin main
   git checkout <作業ブランチ>
   ```
   `main` がGitHub Pagesの公開対象なので、必ずここまでやる。

### ローカルでの見た目確認

ブラウザを直接操作できない環境なので、オフラインコピー＋Playwrightで確認する：
```bash
cp -r js css *.html /tmp/sitetestN/
cd /tmp/sitetestN && python3 -m http.server <port>   # cdと起動を同じ1コマンドで（別々だとcwdがずれてバグる）
```
Playwright（`NODE_PATH=/opt/node22/lib/node_modules node script.js`、ブラウザは
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`）でスクショ・console errorを確認。
`waitUntil: 'load'` は使わない — Leafletマップの外部OSMタイル取得がサンドボックスのproxy経由で
ハングしてタイムアウトする。`waitUntil: 'domcontentloaded'` を使うこと。終わったら
`pkill -f "http.server <port>"` を忘れずに。

## 「実際の支出（expenses）」記録の規約

`booking.html` の「実際の支出（レシート記録）」セクション用データ。ユーザーは現地から届いたレシート
写真をOCRしてここに正確に反映することを重視している（省略・カテゴリ丸めを嫌う）。

- `krw` は**実際に支払った金額**。免税店の「即時還付（즉시환급）」レシートでは、
  **Purchase Price／결제금액**の欄が正しい値（Total Amount／판매가격 ではない — それは還付前の総額）。
- マイナスの `krw` は払い戻し等の受取（例：空港でのT-money残高払い戻し）。
- `desc` は**具体的な商品名**を書く（「食品18点」ではなく「辛ラーメンGOLD／カヌアメリカーノミニ／…」）。
  レシートが不鮮明で読めない場合は、正直に「詳細不明瞭」等と書く。憶測で商品名を捏造しない。
- 同じ店・同じ日時・同じ金額の別のレシート（例：店独自のレシート＋免税書類）が2枚届いたら、
  それは**同一取引**。二重計上しない。免税書類（Global Tax Free / Cube Refund等）の店名・住所の方が
  信頼できることが多い（店独自レシートは店名が略記／読み取りにくいことがある）。
- 合計金額の再計算：
  ```bash
  node -e "global.window={};require('./js/data.js');const D=global.window.DATA;
  console.log(D.expenses.length, D.expenses.reduce((n,e)=>n+e.krw,0));"
  ```
- **レシート写真はそのセッションの会話内でしか参照できない**（リポジトリには保存されない）。
  セッションが要約・リセットされると、未処理の画像はもう見えなくなる。過去のエントリに詳細を
  追加してほしいと言われても画像が無ければ、憶測で埋めずに「もう一度送ってほしい」と正直に伝える。

### 未解決・詳細不足のまま残っている支出（2026-09-12時点）

以下4件は商品名レベルの詳細が取れていない（元レシート画像が届いていない／読めなかった）：
- 西橋洞（弘大エリア）34,000W（8/28 14:08）
- 明洞のレストラン（明洞10街）107,000W（8/28 20:57、夕食）
- 明洞店 33,200W（8/28 21:10、衣類＋ディフューザー）
- オリーブヤング DOOTA店 73,930W（8/29 19:41）

レシートが見つかり次第、`js/data.js` の `expenses` 配列の該当エントリの `desc` を更新する。

## 確定済みの実地情報（推測で上書きしない）

- 金浦↔東大門：地下鉄5号線で乗り換えなし、実績運賃 **1,550W**（当初見積もりの約1,650Wより安かった）。
- WOWPASS は「一般（決済）残高」と「T-money（交通）残高」が別会計。一般残高からT-moneyへチャージすると、
  一般側の履歴には「인출／引き出し」、T-money側には「충전／チャージ」と表示される。**現金の引き出しではない**、
  内部振替。
- 기후동행카드（観光客向け短期版）の有効期間は**購入時刻に関係なく当日4:00始まり〜終了日翌4:00まで**。
  購入日＝利用開始日固定（前もって開始日を選べない）。
- 영천영화 청담店：東大門ではなく**狎鴎亭ロデオ**にある、慶尚北道 永川発祥の**韓牛ユッケ専門店**
  （以前「東大門の2軒目」と誤記していたが訂正済み）。
- Day1夜は 죽통령サムギョプサル（東大門）→ タクシーで영천영화 청담店（狎鴎亭ロデオ）の2軒はしご。

## まだ判断が必要で、勝手に確定しない方がいい項目

- **Day3の夕食予定が영천영화のまま**：`schedule` のDay3夕食欄には元々영천영화を予定していたが、
  実際にはDay1の夜（狎鴎亭ロデオへのタクシー移動）で先に食べてしまっている。Day3の代わりの店は
  ユーザーから聞いていない。ユーザーが言及するまで、こちらから勝手に埋めない。
- **平洞洋菓子（Day2朝、乙支路2街）**が、元々予定していたARTIST BAKERYの代わりなのか、それとも
  追加で立ち寄っただけなのか、ユーザーからの明言はない。

## 進め方の基本方針

- サイトの文言はすべて日本語。
- 空港名・店名・運賃・メニュー内容などを憶測で断定しない。WebSearch/WebFetchで裏取りするか、
  不確かな場合は「推定」「未確認」と明記する。
- 予算（`budget`）と実績（`expenses`）は別物として扱う。実績が予算を超えていても`budget`側を書き換えない
  （比較のための基準値として残す）。
