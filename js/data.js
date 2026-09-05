/* ===== このファイルを編集すると全ページに反映されます ===== */
window.DATA = {
  trip: {
    subtitle: "2026.8.27 (木) 〜 8.30 (日)",
    nights: "3泊4日",
    note: "チュソク連休は 9/24〜26 で今回の日程には重なりません。お店の一斉休業やラッシュの心配なし！",
    rate: "1,000ウォン ≒ 約109円（目安）。現地レートは変動します。※ホテル代は支払予定日（8/22・8/23）の当日レートで日本円に換算されます。"
  },
  /* schedule の各stop（startPlace/endPlace の name、items の place）と同じ文字列をキーにした緯度経度。
     OpenStreetMap Nominatimでジオコーディング（番地までは取れない場合、通り・洞レベルで近似）。
     地図上にルートを描くのに使用（js/app.js の renderSchedule）。 */
  geo: {
    "ホテル ミリオレ ソウル": [37.5689316, 127.0087977],
    "ナインツリー バイ パルナス 東大門": [37.5667347, 127.0028485],
    "金浦国際空港": [37.5590078, 126.7942403],
    "竹統領サムギョプサル 東大門店（東大門）": [37.5683219, 127.0083106],
    "喜粥喜粥（忠武路）": [37.5617898, 126.9877129],
    "ARTIST BAKERY（安国）": [37.5772100, 126.9836300],
    "ソンジョン ポッサム 鍾路店（鍾路）": [37.5688404, 126.9866641],
    "プチョン ユッケ本店（鍾路・広蔵市場）": [37.5701890, 126.9994995],
    "スラケジャン 明洞2号店（明洞）": [37.5629272, 126.9823509],
    "ヌンドンミナリ 聖水店（聖水）": [37.5427627, 127.0539681],
    "江南マックス＆ポッサム（江南駅1番出口）": [37.5007544, 127.0264297],
    "済州黒豚屋上BBQ（狎鴎亭・清潭）": [37.5264397, 127.0364200],
    "ヨンチョンヨンファ 清潭店（狎鴎亭ロデオ）": [37.5239469, 127.0495473],
    "味成屋（明洞）": [37.5638414, 126.9850488],
    "チャギー 鍾路店（鍾閣）": [37.5701700, 126.9838500]
  },
  schedule: [
    { date: "2026-08-27", day: "27", weekday: "木", label: "1日目 ・ 夕方着＆東大門の夜",
      endPlace: { name: "ホテル ミリオレ ソウル", map: "https://maps.google.com/?q=Hotel+Migliore+Seoul+Dongdaemun" },
      items: [
      { time: "18:00", icon: "flight", title: "金浦国際空港 到着（MM743）", place: "Gimpo Airport (GMP)", map: "https://maps.google.com/?q=Gimpo+International+Airport", memo: "関西16:05発→金浦18:00着。空港では大きな両替はせず、地下鉄運賃分だけ現金かカードで用意。両替・WOWPASSチャージは東大門で" },
      { time: "19:00", icon: "train", title: "空港から東大門へ移動", place: "地下鉄5号線（乗り換えなし） / リムジンバス", map: "https://maps.google.com/?q=Gimpo+Airport+Station", memo: "【移動】金浦空港駅から地下鉄5号線で東大門歴史文化公園駅まで乗り換えなし約47〜55分（運賃1,550W・実績値）。国際線ターミナルから空港駅までは徒歩か無料循環バス。楽なら空港リムジン6001/6002番（東大門経由・要時刻確認）" },
      { time: "20:15", icon: "hotel", title: "ホテル ミリオレ ソウル チェックイン", place: "ホテル ミリオレ ソウル（東大門）", map: "https://maps.google.com/?q=Hotel+Migliore+Seoul+Dongdaemun", memo: "1泊目。到着予定20〜21時。高層階・静かな部屋をリクエスト。デラックスツイン（バスタブ有無はランダム）。予約ID 1755518948" },
      { time: "20:45", icon: "exchange", title: "両替（東大門）", place: "APM前 無人両替機（24h）/ Money Box東大門店", map: "https://maps.google.com/?q=APM+Dongdaemun", memo: "APM無人機は24時間・日本語対応。日本円→ウォン両替→WOWPASSにチャージ。少額の現金も確保" },
      { time: "21:00", icon: "restaurant", title: "夕食：竹統領サムギョプサル 東大門店（죽통령삼겹살）", place: "竹統領サムギョプサル 東大門店（東大門）", map: "https://maps.app.goo.gl/KnHUXTihXx9ii4RS8?g_st=ic", memo: "【移動】ミリオレから徒歩2〜3分（同じ장충단로沿い）。【理由】豚肉カテゴリ必須＆1位。到着初日で長距離移動できないため、ホテルと同じ通りにあるこの店が最適。11:40〜23:00・予約不要なので到着が多少ずれても安心" }
    ]},
    { date: "2026-08-28", day: "28", weekday: "金", label: "2日目 ・ 鍾路＆明洞グルメ",
      startPlace: { name: "ホテル ミリオレ ソウル", map: "https://maps.google.com/?q=Hotel+Migliore+Seoul+Dongdaemun" },
      endPlace: { name: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun" },
      items: [
      { time: "07:00", icon: "restaurant", title: "朝食：喜粥喜粥（히죽히죽）の鮑がゆ", place: "喜粥喜粥（忠武路）", map: "https://maps.app.goo.gl/HN1puTrr6XJkkqhe7?g_st=ic", memo: "【移動】ミリオレからドア・ツー・ドアで約15分（地下鉄4号線1駅、動大門歴史文化公園→忠武路）。【理由】粥カテゴリ必須＆1位。07:00開店で朝食に唯一使える時間帯。予約不要" },
      { time: "09:00", icon: "luggage", title: "ミリオレ チェックアウト → ナインツリーへ荷物移動", place: "東大門（ミリオレ → ナインツリー）", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun", memo: "【移動】喜粥喜粥から約15分でミリオレへ戻り、荷物をまとめてナインツリーへ（徒歩約10分）。11時までにミリオレをチェックアウト。正式チェックインは夜〜" },
      { time: "10:30", icon: "cafe", title: "コーヒー休憩：ARTIST BAKERY の塩パン", place: "ARTIST BAKERY（安国）", map: "https://maps.google.com/?q=Artist+Bakery+Anguk", memo: "【移動】ナインツリーから地下鉄で約18〜20分（5号線1駅・乙支路4街→鍾路3街で3号線に乗り換え1駅・安国）。【理由】カフェ・ベーカリーカテゴリ1位。必須ではないが、この後の昼食（鍾路）へ向かう途中に立ち寄れる立地なので追加。ロンドンベーグルミュージアム系列の塩パン専門" },
      { time: "12:30", icon: "restaurant", title: "昼食：ソンジョン ポッサム 鍾路店（손정보쌈）", place: "ソンジョン ポッサム 鍾路店（鍾路）", map: "https://maps.app.goo.gl/v27FHS1rSDW5wDqf7?g_st=ic", memo: "【移動】ARTIST BAKERYから地下鉄・徒歩で約10〜15分（安国→鍾路3街方面）。【理由】ポッサムカテゴリ必須＆1位。11:00〜22:00(休憩14:30〜16:30・LO21:20)・CatchTable予約可" },
      { time: "15:00", icon: "restaurant", title: "小腹に：プチョン ユッケ本店（부촌육회본점）", place: "プチョン ユッケ本店（鍾路・広蔵市場）", map: "https://maps.app.goo.gl/BBz1g5j47iXw9k8Y7?g_st=ic", memo: "【移動】손정보쌈から徒歩約12〜15分（同じ鍾路エリア、広蔵市場そば）。【理由】タコ・ホルモン系カテゴリ必須＆1位。10:00〜21:30(LO21:00)。予約不可・先着順なので混雑時は待つ想定で" },
      { time: "16:30", icon: "cafe", title: "ティー休憩：チャギー 鍾路店（차지 종로점）", place: "チャギー 鍾路店（鍾閣）", map: "https://maps.google.com/?q=차지+종로점+종각", memo: "【移動】부촌육회본점から地下鉄1号線で約12〜15分（鍾路5街→鍾路3街→鍾閣、乗り換えなし2駅）、徒歩なら20〜25分。【理由】2026年4月に韓国上陸した中国発ミルクティーチェーン「CHAGEE（차지）」の国内8号店・鍾路店（종각駅そば、2026/7/30オープン、ブランド初の2階建て店舗）。営業時間は他店舗基準で10:30〜22:00想定（現地未確認・要確認）。予約不要" },
      { time: "18:30", icon: "restaurant", title: "夕食：スラケジャン 明洞2号店（수라게장）", place: "スラケジャン 明洞2号店（明洞）", map: "https://maps.app.goo.gl/gCyQcUKeqb8wA68QA", memo: "【移動】チャギー鍾路店から徒歩約15〜18分（鍾閣→乙支路経由→明洞）。暑ければタクシーで5〜8分。【理由】ケジャンカテゴリ必須＆1位。宮中料理仕立ての上品なカンジャンケジャン。10:00〜24:00・インスタDM予約可（@sura_gejang）" },
      { time: "20:30", icon: "hotel", title: "ナインツリー 正式チェックイン", place: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun", memo: "【移動】明洞から徒歩・地下鉄で約15〜20分（乙支路4街方面）。高層階・静かな部屋リクエスト。歯ブラシ等は持参。予約ID 1755517778" }
    ]},
    { date: "2026-08-29", day: "29", weekday: "土", label: "3日目 ・ 聖水＆江南グルメ",
      startPlace: { name: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun" },
      endPlace: { name: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun" },
      items: [
      { time: "09:30", icon: "restaurant", title: "朝食：ヌンドンミナリ 聖水店（능동미나리）", place: "ヌンドンミナリ 聖水店（聖水）", map: "https://maps.google.com/?q=능동미나리+성수", memo: "【移動】東大門（ナインツリー）から地下鉄で約20〜25分（2号線、聖水駅まで乗り換えなし）。【理由】ユッケカテゴリ必須・1位タイ。미나리곰탕＋육회비빔밥の名店。土日09:00〜24:00。予約不可・先着順なので朝早めに" },
      { time: "13:00", icon: "restaurant", title: "昼食：江南マックス＆ポッサム（강남막국수앤보쌈）", place: "江南マックス＆ポッサム（江南駅1番出口）", map: "https://maps.google.com/?q=강남+막국수+보쌈+강남역", memo: "【移動】聖水から地下鉄2号線で約25〜30分（聖水〜江南は乗り換えなしだが駅数が多い）。【理由】麺カテゴリ4位だが、この後の豚肉・ユッケの2軒も同じ江南・狎鴎亭エリアにあり、まとめて「江南グルメの日」にできる。막국수は軽めで後の肉料理と好相性" },
      { time: "16:30", icon: "restaurant", title: "小腹に：済州黒豚屋上BBQ（제주흑돈옥탑 BLACK BBQ）", place: "済州黒豚屋上BBQ（狎鴎亭・清潭）", map: "https://maps.app.goo.gl/tzTvNtXb7zGZNfrX8?g_st=ic", memo: "【移動】江南駅から地下鉄・徒歩で約15〜20分（3号線新沙経由、または狎鴎亭方面へ）。【理由】豚肉カテゴリ3位（必須は木曜の죽통령삼겹살で充足済み、江南セットのボーナス採用）。休憩15:00〜16:00明けの時間に設定" },
      { time: "19:00", icon: "restaurant", title: "夕食：ヨンチョンヨンファ（영천영화）육회・한우", place: "ヨンチョンヨンファ 清潭店（狎鴎亭ロデオ）", map: "https://maps.app.goo.gl/Jx8h24kw9fsafjtv6?g_st=ic", memo: "【移動】済州黒豚屋上BBQから徒歩・タクシーで約10〜15分（同じ狎鴎亭・清潭エリア）。【理由】ユッケカテゴリ1位タイ（朝の능동미나리と同率1位）。한우육회＆焼き＋육회비빔밥の名店（24時間）。混むので予約推奨" }
    ]},
    { date: "2026-08-30", day: "30", weekday: "日", label: "4日目 ・ 早朝出発",
      startPlace: { name: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun" },
      endPlace: { name: "金浦国際空港", map: "https://maps.google.com/?q=Gimpo+International+Airport" },
      items: [
      { time: "06:00", icon: "gift", title: "起床・お土産の買い忘れチェック", place: "ホテル / 東大門のコンビニ", map: "https://maps.google.com/?q=Dongdaemun+Convenience+Store", memo: "朝食を追加したため通常より30分早め。11:25発なので前夜までにお土産は済ませておくのが安心" },
      { time: "06:15", icon: "luggage", title: "ナインツリー チェックアウト（荷物はフロント預け）", place: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun", memo: "先にチェックアウトを済ませ、荷物だけフロントに預けて身軽に朝食へ" },
      { time: "06:25", icon: "restaurant", title: "朝食：味成屋（미성옥）ソルロンタン", place: "味成屋（明洞）", map: "https://maps.app.goo.gl/ya7VqwFwBxAM8psx8?g_st=ic", memo: "【移動】ナインツリーからタクシーで約5〜8分（明洞、徒歩なら15〜20分）。【理由】鍋・煮込みカテゴリ3位だが、06:00開店で候補の中では唯一この時間に開いていて営業時間の制約をクリアできる。タクシー利用なら通常スケジュールをほぼ崩さず立ち寄れる" },
      { time: "06:55", icon: "luggage", title: "ナインツリーで荷物ピックアップ", place: "ナインツリー バイ パルナス 東大門", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun", memo: "【移動】味成屋からタクシーで約5〜8分。フロントで荷物を受け取り、そのまま空港へ" },
      { time: "07:15", icon: "train", title: "空港へ移動（東大門→金浦）", place: "地下鉄5号線（乗り換えなし） / リムジンバス", map: "https://maps.google.com/?q=Dongdaemun+History+Culture+Park+Station", memo: "東大門歴史文化公園駅から地下鉄5号線で金浦空港駅まで乗り換えなし約47〜55分（運賃1,550W・実績値）。空港駅から国際線ターミナルは徒歩か無料循環バス。始発時間に注意" },
      { time: "08:15", icon: "badge", title: "金浦空港 着・チェックイン/荷物預け", place: "Gimpo Airport (GMP)", map: "https://maps.google.com/?q=Gimpo+International+Airport", memo: "Peachは国際線。金浦はコンパクトな空港なので出発2時間前を目安に手続き。WOWPASS残高は使い切るか調整" },
      { time: "09:00", icon: "gift", title: "免税店", place: "金浦空港内", map: "https://maps.google.com/?q=Gimpo+International+Airport", memo: "朝食は明洞で済ませたので、ここでは最後のお買い物のみ" },
      { time: "11:25", icon: "flight", title: "金浦空港から出発（MM736）", place: "Gimpo Airport (GMP)", map: "https://maps.google.com/?q=Gimpo+International+Airport", memo: "金浦11:25発→関西13:10着。おつかれさま！" }
    ]}
  ],
  places: [
    { category: "グルメ：麺（カルグクス・マッククス・ビビン麺）", tag: "麺", spots: [
      { rank: 1, name: "南浦麺屋（남포면옥）", area: "中区（乙支路）", desc: "ビビン麺 ミシュラン掲載", map: "https://maps.app.goo.gl/ATZkmGPyKodgxrQc7?g_st=ic", hours: "平日11:30〜22:00・土日11:30〜21:00", reserve: "電話予約可" },
      { rank: 2, name: "明洞餃子", area: "明洞", desc: "カルグクス＆マンドゥの老舗", map: "https://maps.google.com/?q=Myeongdong+Kyoja", hours: "10:30〜21:00(LO20:30)", reserve: "不要（回転率が高く行列は短め）" },
      { rank: 3, name: "ジョジョ カルグクス（조조칼국수）", area: "聖水", desc: "カルグクスおすすめ！人気店", map: "https://maps.app.goo.gl/9EoFGSzGQgjn4evFA?g_st=ic", hours: "10:00〜21:30(LO21:00)", reserve: "不要（CatchTable予約も可）" },
      { rank: 4, name: "江南マックス＆ポッサム（강남 막국수앤보쌈）", area: "江南駅1番出口", desc: "エゴマ(荏胡麻)막국수＋ポッサム。Day3昼食で訪問予定", map: "https://maps.google.com/?q=강남+막국수+보쌈+강남역", hours: "10:30〜21:00", reserve: "不要（CatchTable予約も可）" }
    ]},
    { category: "グルメ：サムギョプサル・豚肉", tag: "豚肉", spots: [
      { rank: 1, name: "竹統領サムギョプサル 東大門店（죽통령삼겹살）", area: "東大門", desc: "ここのサムギョプサルも美味しい", map: "https://maps.app.goo.gl/KnHUXTihXx9ii4RS8?g_st=ic", hours: "11:40〜23:00", reserve: "不要" },
      { rank: 2, name: "金豚食堂／クムテジシッタン（금돼지식당）", area: "中区", desc: "ミシュラン・ビブグルマンの名店。17時ごろに予約だけ行かないと入れない人気店。日本人に人気で行く価値あり", map: "https://maps.app.goo.gl/CA5cfhqYQsac7GXG9?g_st=ic", hours: "11:30〜23:00(LO22:15頃)", reserve: "電話・オンライン予約不可。現地整理券／CatchTable・에그다이닝アプリで受付、웨이팅約2時間の人気店" },
      { rank: 3, name: "済州黒豚屋上BBQ（제주흑돈옥탑 BLACK BBQ）", area: "江南", desc: "豚肉ショルダーラックがよき。行くならキャッチテーブルで予約すべし！", map: "https://maps.app.goo.gl/tzTvNtXb7zGZNfrX8?g_st=ic", hours: "11:00〜翌2:00(休憩15:00〜16:00)", reserve: "推奨・CatchTable予約可" }
    ]},
    { category: "グルメ：カンジャンケジャン", tag: "ケジャン", spots: [
      { rank: 1, name: "スラケジャン 明洞2号店（수라게장）", area: "明洞", desc: "宮中料理仕立ての上品なカンジャンケジャン専門店。1号店より空いていて落ち着いた雰囲気。11:00〜22:00", map: "https://maps.app.goo.gl/gCyQcUKeqb8wA68QA", hours: "10:00〜24:00", reserve: "インスタDM予約可（@sura_gejang）" },
      { rank: 2, name: "オダリチプ カンジャンケジャン 明洞直営店（오다리집 간장게장）", area: "明洞", desc: "チェーン店のカンジャンケジャン。日本人に人気", map: "https://maps.app.goo.gl/oDSj8qHvPZfuLRB38", hours: "10:00〜21:00", reserve: "不要（電話問い合わせ可）" },
      { rank: 3, name: "ハムチョ・カンジャンケジャン（함초간장게장）", area: "明洞", desc: "看板は전복장（アワビ醤油漬け）。薬草と一緒に熟成。塩辛すぎず「ご飯泥棒」の異名。明洞駅5/9/10番出口 徒歩1分・11:00〜22:00(LO21:30)", map: "https://maps.app.goo.gl/Udsw9d3YZL27von39", hours: "11:00〜22:00(LO21:30)", reserve: "推奨（웨이팅あり）" }
    ]},
    { category: "グルメ：ユッケ・육회비빔밥", tag: "ユッケ", spots: [
      { rank: 1, name: "ヨンチョンヨンファ（영천영화）", area: "江南（狎鴎亭）", desc: "한우 육회＆육회비빔밥の名店（24時間）。“韓牛の聖地”とも称される。混むので予約推奨", map: "https://maps.app.goo.gl/Jx8h24kw9fsafjtv6?g_st=ic", hours: "24時間", reserve: "推奨〜必須（웨이팅長め・CatchTable予約可）" },
      { rank: 1, name: "ヌンドンミナリ 聖水店（능동미나리）", area: "聖水", desc: "セリユッケ＝미나리곰탕＋육회비빔밥の名店。09:30〜24:00。東大門から2号線で近い", map: "https://maps.google.com/?q=능동미나리+성수", hours: "平日09:30〜24:00・週末09:00〜24:00", reserve: "不可（予約・웨이팅接受なし、先着順）" },
      { rank: 3, name: "プチョン ユッケ本店（부촌육회본점）", area: "鍾路", desc: "超人気店 ユッケ", map: "https://maps.app.goo.gl/BBz1g5j47iXw9k8Y7?g_st=ic", hours: "10:00〜21:30(LO21:00)", reserve: "不可（先着順、웨이팅あり）" }
    ]},
    { category: "グルメ：ポッサム", tag: "ポッサム", spots: [
      { rank: 1, name: "ソンジョン ポッサム 鍾路店（손정보쌈）", area: "鍾路", desc: "ポッサム！", map: "https://maps.app.goo.gl/v27FHS1rSDW5wDqf7?g_st=ic", hours: "平日11:00〜22:00(休憩14:30〜16:30・LO21:20)・土11:30〜22:00・日休", reserve: "CatchTable予約可" },
      { rank: 2, name: "ファミリーソン カルグクスポッサム（패밀리손칼국수보쌈）", area: "聖水", desc: "ポッサム！カルグクスとの組み合わせも楽しめる", map: "https://maps.app.goo.gl/XRqRPmWxiHKoXX666?g_st=ic", hours: "11:30〜22:00", reserve: "不要" },
      { rank: 3, name: "チョンダムンポッサム 北村店（정담은보쌈）", area: "北村（安国）", desc: "韓屋座敷のポッサム専門店。文魚(タコ)ポッサム・カキポッサムが名物。伝統酒とのペアリングも人気。安国駅すぐ", map: "https://maps.app.goo.gl/gNMkDc89G4x66V8d7", hours: "昼11:00〜14:30(LO13:30)・夜16:00〜22:00(LO21:00)", reserve: "CatchTable予約可" },
      { rank: 4, name: "チョンハポッサム（천하보쌈）", area: "北村（三清洞）", desc: "北村・三清洞のポッサム名店。“ソウル三大ポッサム”の一つとも称される。カキポッサムが名物", map: "https://maps.app.goo.gl/7RJthTLYZgBGbYbG8", hours: "11:00〜21:00(LO20:00)・月4週目の日曜休", reserve: "電話予約可" }
    ]},
    { category: "グルメ：鍋・煮込み", tag: "鍋", spots: [
      { rank: 1, name: "土俗村 参鶏湯", area: "西村", desc: "行列必至の参鶏湯名店。全国的にも屈指の知名度", map: "https://maps.google.com/?q=Tosokchon+Samgyetang", hours: "10:00〜22:00(LO21:00)", reserve: "推奨（電話・オンライン予約可）" },
      { rank: 2, name: "陳玉華ハルメ元祖タッカンマリ（진옥화할매원조닭한마리）", area: "鍾路（タッカンマリ横丁）", desc: "タッカンマリならここか隣のお店。日本人に人気で美味しい", map: "https://maps.app.goo.gl/69e462x9FhnV8k5V6?g_st=ic", hours: "10:30〜翌1:00", reserve: "不要" },
      { rank: 3, name: "味成屋／ミソンオク（미성옥）", area: "明洞", desc: "路地裏の名店。ソルロンタン", map: "https://maps.app.goo.gl/ya7VqwFwBxAM8psx8?g_st=ic", hours: "06:00〜21:00", reserve: "不要" },
      { rank: 4, name: "テソン食堂（대성식당）", area: "鍾路3街", desc: "なっこぷせ（낙곱새＝タコ・ホルモン・エビの辛鍋）の人気店。東大門から近い", map: "https://maps.google.com/?q=대성식당+낙곱새+종로3가", hours: "11:30〜21:50頃(LO21:20頃)", reserve: "不要" },
      { rank: 5, name: "テナッ食堂 聖水直営店（테낙식당）", area: "聖水", desc: "ホルモンと鶏肉鍋 おすすめ！", map: "https://maps.app.goo.gl/HRGWETSTT8dBSWxX9?g_st=ic", hours: "情報不明（要現地確認）", reserve: "情報不明" }
    ]},
    { category: "グルメ：タコ・ホルモン系", tag: "ホルモン", spots: [
      { rank: 1, name: "プチョン ユッケ本店（부촌육회본점）", area: "鍾路", desc: "超人気店 ユッケ", map: "https://maps.app.goo.gl/BBz1g5j47iXw9k8Y7?g_st=ic", hours: "10:00〜21:30(LO21:00)", reserve: "不可（先着順、웨이팅あり）" },
      { rank: 2, name: "ヘナムナクチ（해남낙지）", area: "中区", desc: "チュクミとかタコ料理", map: "https://maps.app.goo.gl/o7kjpNQPxBV1tCMHA?g_st=ic", hours: "月〜土11:30〜21:30(休憩15:00〜17:00・LO20:30)・日休", reserve: "不要（電話問い合わせ可）" }
    ]},
    { category: "グルメ：粥", tag: "粥", spots: [
      { rank: 1, name: "喜粥喜粥（히죽히죽）", area: "忠武路", desc: "朝ごはんに鮑がゆが超人気店", map: "https://maps.app.goo.gl/HN1puTrr6XJkkqhe7?g_st=ic", hours: "07:00〜22:00(LO20:50)", reserve: "不要" },
      { rank: 2, name: "瑞源（ソウォン）", area: "中区", desc: "こっちも同じく！（鮑がゆ）", map: "https://maps.app.goo.gl/j221vrBfMLTVBa3G8?g_st=ic", hours: "月〜土07:00〜17:00・日07:00〜14:00・隔週水休", reserve: "不要" },
      { rank: 3, name: "ソンジュク（송죽）", area: "明洞・中区", desc: "キノコ・カキ・エビ粥などが人気の老舗粥専門店。伝統的な朝ごはんに", map: "https://maps.app.goo.gl/KFb1n196VjWeGB91A", hours: "月〜木07:00〜19:00・金07:00〜15:00・土日07:00〜13:00", reserve: "不要" }
    ]},
    { category: "グルメ：カフェ・ベーカリー", tag: "カフェ", spots: [
      { rank: 1, name: "ARTIST BAKERY（アーティストベーカリー）", area: "安国", desc: "塩パン専門。ロンドンベーグルミュージアム系列。安国駅1番出口すぐ・景福宮の前に", map: "https://maps.google.com/?q=Artist+Bakery+Anguk", hours: "07:30〜20:00・年中無休", reserve: "不要" },
      { rank: 2, name: "聖水洞カフェ通り", area: "聖水", desc: "話題のおしゃれカフェ密集エリア", map: "https://maps.google.com/?q=Seongsu+Cafe+Street", hours: "店舗により異なる（目安10:00〜22:00）", reserve: "不要" },
      { rank: 3, name: "チャギー 鍾路店（CHAGEE 차지 종로점）", area: "鍾路（鍾閣）", desc: "2026年4月に韓国上陸した中国発ミルクティーチェーン。鍾路店は国内8号店（2026/7/30オープン、종각駅そば、ブランド初の2階建て店舗）。Day2の午後休憩で訪問予定", map: "https://maps.google.com/?q=차지+종로점+종각", hours: "10:30〜22:00想定（他店舗基準・要現地確認）", reserve: "不要" }
    ]},
    { category: "グルメ：市場・屋台", tag: "市場", spots: [
      { rank: 1, name: "広蔵市場", area: "鍾路", desc: "屋台グルメの宝庫。ユッケ・ピンデトク", map: "https://maps.google.com/?q=Gwangjang+Market", hours: "市場全体09:00〜18:00(日休)・食べ歩き横丁09:00〜23:00(年中無休)", reserve: "不要" }
    ]},
    { category: "ショッピング：東大門（宿から徒歩圏）", tag: "至近", spots: [
      { name: "東大門ファッションタウン", area: "東大門", desc: "深夜まで営業の卸＆小売天国。エリア一帯の総称", map: "https://maps.google.com/?q=Dongdaemun+Market", hours: "店舗により異なる（多くは深夜〜早朝まで営業）", reserve: "不要" },
      { name: "LOTTE FITIN（ロッテフィッティン）", area: "東大門", desc: "東大門駅直結。1-4Fファッション／5Fボウリング等の娯楽／6F化粧品／7-8Fレストラン。デパート感覚で買いやすい", map: "https://maps.google.com/?q=Lotte+Fitin+Dongdaemun", hours: "ショップ10:30〜21:00・飲食11:00〜21:00・カフェ10:30〜23:00", reserve: "不要" },
      { name: "DOOTA MALL（トゥータモール）", area: "東大門", desc: "10:30〜24:00営業の老舗ファッションビル。K-デザイナーブランドが集結（4F）。トレンド重視派に人気", map: "https://maps.google.com/?q=Doota+Mall+Dongdaemun", hours: "10:30〜24:00", reserve: "不要" },
      { name: "Migliore（ミリオレ東大門）", area: "東大門", desc: "老舗の卸＆小売ビル。3万ウォン以上の購入でパスポート提示の即時免税OK", map: "https://maps.google.com/?q=Migliore+Dongdaemun", hours: "10:30〜翌2:00・月休", reserve: "不要" },
      { name: "nyu nyu（ニューニュー）", area: "東大門", desc: "元はアクセサリー特化だったが、今は服・バッグ・雑貨まで扱うファッションビル。個人購入もしやすい", map: "https://maps.google.com/?q=nyu+nyu+Dongdaemun", hours: "11:00〜翌5:00", reserve: "不要" }
    ]},
    { category: "ショッピング：明洞（コスメ定番）", tag: "定番", spots: [
      { name: "明洞", area: "中区", desc: "コスメ＆ファッション街歩きの定番エリア", map: "https://maps.google.com/?q=Myeongdong", hours: "店舗により異なる（街区のため定めなし）", reserve: "不要" },
      { name: "オリーブヤング 明洞本店", area: "明洞", desc: "K-コスメまとめ買いはここ", map: "https://maps.google.com/?q=Olive+Young+Myeongdong", hours: "10:00〜22:30", reserve: "不要" }
    ]},
    { category: "ショッピング：郊外の大型モール", tag: "遠出", spots: [
      { name: "ザ・現代ソウル", area: "汝矣島", desc: "2021年開業、ソウル最大級の百貨店（売場面積 約8.9万㎡・約600店舗）。ドラマ『涙の女王』ロケ地で近年大人気。タンバリンズ・ジェントルモンスターなど日本人に人気のブランドも", map: "https://maps.google.com/?q=The+Hyundai+Seoul", hours: "月〜木10:30〜20:00・金〜日10:30〜20:30（レストラン街は〜22:00）", reserve: "不要" },
      { name: "スターフィールド COEXモール", area: "三成", desc: "地下鉄2号線 三成駅直結。300以上の店舗・グルメが入る大型複合施設。新世界系の免税店も併設。雨天・猛暑日でも屋内で楽しめる。Day3の江南〜三成の動線上", map: "https://maps.google.com/?q=Starfield+COEX+Mall", hours: "10:00〜22:00・年中無休", reserve: "不要" }
    ]}
  ],
  packing: [
    { category: "必須・貴重品", items: ["パスポート", "航空券 / eチケット控え", "現金（円）＆クレジットカード", "海外旅行保険の控え", "ホテル予約確認書"] },
    { category: "電子・通信", items: ["スマホ＋充電ケーブル", "モバイルバッテリー", "SIM / eSIM または WiFiルーター", "変換プラグ（Cタイプ/SE型）", "イヤホン"] },
    { category: "衣類・身の回り", items: ["着替え（3泊分）", "羽織り（冷房対策）", "歩きやすい靴", "折りたたみ傘", "常備薬・絆創膏", "洗面・スキンケア用品", "歯ブラシ・歯磨き粉・カミソリ（ナインツリーは提供なし）"] },
    { category: "あると便利", items: ["エコバッグ（お土産用）", "ウェットティッシュ", "マスク", "ジップ袋", "翻訳アプリ（Papago）をインストール"] }
  ],
  flights: [
    { type: "往路", route: "大阪 関西(KIX) → ソウル 金浦(GMP)", date: "2026-08-27", time: "16:05 → 18:00", airline: "Peach (MM)", no: "MM743" },
    { type: "復路", route: "ソウル 金浦(GMP) → 大阪 関西(KIX)", date: "2026-08-30", time: "11:25 → 13:10", airline: "Peach (MM)", no: "MM736" }
  ],
  hotels: [
    { name: "ホテル ミリオレ ソウル", short: "1泊目（8/27）", checkin: "2026-08-27（15:00〜）", checkout: "2026-08-28（11:00まで）", room: "デラックスツイン（バスタブ有無はランダム）", guests: "大人2名", requests: "高層階・静かな部屋／到着予定 20:00-21:00", id: "1755518948", price: "₩116,729（税・サ込）", payDate: "2026-08-22（当日レートで円換算）", map: "https://maps.google.com/?q=Hotel+Migliore+Seoul+Dongdaemun" },
    { name: "ナインツリー バイ パルナス ソウル 東大門", short: "2〜3泊目（8/28・8/29）", checkin: "2026-08-28（15:00〜）", checkout: "2026-08-30（12:00まで）", room: "スタンダードダブル", guests: "大人2名", requests: "高層階・静かな部屋／到着予定 10:00-11:00", id: "1755517778", price: "₩402,410（税・サ込）", payDate: "2026-08-23（当日レートで円換算）", note: "歯ブラシ・歯磨き粉・カミソリの提供なし（政府方針）／駐車場なし", map: "https://maps.google.com/?q=Nine+Tree+by+Parnas+Seoul+Dongdaemun" }
  ],
  /* 現地からの随時レポート。新しいものを配列の先頭に追加していく（log.html で新着順に表示）。 */
  log: [
    { date: "2026-08-28", time: "朝", text: "喜粥喜粥で朝食完了。現在は平洞洋菓子（평동양과・乙支路2街）のベーカリー／カフェにいる（ARTIST BAKERYとは別、追加または変更を検討中）。" },
    { date: "2026-08-27", time: "夜", text: "竹統領サムギョプサルで夕食後、2軒目としてタクシーでヨンチョンヨンファ（狎鴎亭ロデオ）へ。本来は3日目8/29の夕食予定だった店なので、3日目の献立は要調整。帰りにDOOTA店オリーブヤング（B2F、〜23:30）にも立ち寄り。" },
    { date: "2026-08-27", time: "19:31", text: "WOWPASSのT-money残高へ20,000ウォンを移動。地下鉄5号線で金浦空港→東大門歴史文化公園へ移動開始（運賃1,550ウォン・実績値）。" },
    { date: "2026-08-27", time: "19:2x", text: "金浦空港駅構内でWOWPASSを発行。日本円10,000円をチャージ→85,327ウォン（レート・手数料込み）。" },
    { date: "2026-08-27", time: "18:00", text: "金浦国際空港 到着（MM743、定刻）。" }
  ],
  /* 現地で送ってもらったレシートの記録。krwは実際に支払った金額（免税還付適用後）。マイナスは払い戻し等の受取。 */
  expenses: [
    { date: "2026-08-27", time: "21:47", place: "竹統領サムギョプサル（東大門）", desc: "夕食", krw: 45000 },
    { date: "2026-08-28", time: "08:39", place: "喜粥喜粥（明洞8街）", desc: "朝食（鮑がゆ）", krw: 15000 },
    { date: "2026-08-28", time: "09:01", place: "平洞洋菓子（乙支路2街）", desc: "塩パン・クロッフルセット・アメリカーノ・コールドブリュー", krw: 19700 },
    { date: "2026-08-28", time: "10:49", place: "HEYTEA 明洞店", desc: "ジャスミンホワイトピーチ", krw: 8500 },
    { date: "2026-08-28", time: "11:26", place: "NYU NYU 明洞4街店", desc: "雑貨3点", krw: 28000 },
    { date: "2026-08-28", time: "11:45", place: "쥬니크（Junique）明洞店", desc: "パジャマセット2着（免税後）", krw: 60000 },
    { date: "2026-08-28", time: "14:08", place: "西橋洞（弘大エリア）", desc: "詳細不明瞭", krw: 34000 },
    { date: "2026-08-28", time: "17:04", place: "チャギー 新村店", desc: "Lemon Jasmine Fruit Tea", krw: 5300 },
    { date: "2026-08-28", time: "17:56", place: "明洞8街の薬局／コスメ店", desc: "クリーム等3点（免税後）", krw: 54000 },
    { date: "2026-08-28", time: "20:57", place: "明洞のレストラン（明洞10街）", desc: "夕食4品（推定：수라게장）", krw: 107000 },
    { date: "2026-08-28", time: "21:10", place: "明洞店", desc: "衣類＋ディフューザー（免税後）", krw: 33200 },
    { date: "2026-08-29", time: "08:46〜08:50", place: "乙支路4街駅", desc: "気候同行カード2枚（発行3,000×2＋1日券5,000×2）", krw: 16000 },
    { date: "2026-08-29", time: "10:02", place: "Backerin 聖水店", desc: "パン", krw: 9800 },
    { date: "2026-08-29", time: "10:53", place: "オリーブヤング 聖水店", desc: "コラーゲンゼリー（免税後）", krw: 17800 },
    { date: "2026-08-29", time: "11:39", place: "Etre Bake House（聖水）", desc: "塩パン（現金）", krw: 4100 },
    { date: "2026-08-29", time: "12:09", place: "Mega MGC Coffee（聖水）", desc: "アイスアメリカーノ", krw: 2000 },
    { date: "2026-08-29", time: "13:30", place: "江南マックス＆ポッサム", desc: "昼食", krw: 42000 },
    { date: "2026-08-29", time: "19:41", place: "オリーブヤング DOOTA店", desc: "マスク・スナック・スキンケア等7点（免税後）", krw: 73930 },
    { date: "2026-08-29", time: "22:26", place: "ロッテマート蚕室店", desc: "食品18点（免税後）", krw: 76180 },
    { date: "2026-08-30", time: "00:31", place: "백제정（中区多山路）", desc: "深夜の食事（カップル席）", krw: 40000 },
    { date: "2026-08-30", time: "00:59", place: "NEWNEW（東大門）", desc: "買い物", krw: 46000 },
    { date: "2026-08-30", time: "10:19", place: "CU 金浦空港店", desc: "T-money残高払い戻し（手数料500W差引）", krw: -8100 }
  ],
  budget: [
    { item: "航空券（Peach 往復）", krw: 0, jpy: 35000, memo: "MM743/MM736・1人あたり目安" },
    { item: "宿泊（2ホテル・確定）", krw: 519139, jpy: 56600, memo: "ミリオレ ₩116,729 ＋ ナインツリー ₩402,410（税・サ込／円は支払日レート）" },
    { item: "食事", krw: 200000, jpy: 22000, memo: "1日5万ウォン×4日" },
    { item: "交通", krw: 50000, jpy: 5500, memo: "T-money＋空港往復" },
    { item: "ショッピング・お土産", krw: 200000, jpy: 22000, memo: "お好みで" }
  ]
};
