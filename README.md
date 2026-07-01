# たよりば

若者が「どこに相談すればよいか分からない」という状態から、自分に合った相談窓口を見つけるためのWebアプリです。

<img width="1259" height="681" alt="image" src="https://github.com/user-attachments/assets/fc54ffd0-5387-4ea6-9ce5-d3f2233d0338" />

## README用画像差し替えメモ

画像はUI調整後に差し替え予定です。

### トップページ

<!-- ここにトップページのスクリーンショットを貼る -->
<!-- 推奨画像: docs/images/top.png または GitHubの画像URL -->
<img width="1913" height="949" alt="image" src="https://github.com/user-attachments/assets/f70c382c-2ba7-49ec-a5bc-76c7f49f6911" />

### 探し方ガイド

<!-- ここに guide.html の質問画面スクリーンショットを貼る -->
<img width="1908" height="946" alt="image" src="https://github.com/user-attachments/assets/4370a79b-366b-4008-81f8-aac25001f4a6" />

### 検索画面

<!-- ここに search.html の進捗表示つき検索画面スクリーンショットを貼る -->
<img width="1906" height="946" alt="image" src="https://github.com/user-attachments/assets/0475d79b-e205-4b7b-9710-9d354adcbd4b" />

### 検索結果画面

<!-- ここに results.html の相談先一覧スクリーンショットを貼る -->
<img width="1913" height="939" alt="image" src="https://github.com/user-attachments/assets/9a69aa02-af93-43e7-ba93-73b4d55f5bd3" />

### 詳細画面

<!-- ここに detail.html の相談先詳細スクリーンショットを貼る -->
<img width="1914" height="944" alt="image" src="https://github.com/user-attachments/assets/b3197926-dbe5-434a-8bfb-4a59beda7c65" />

### 相談メモ画面

<!-- ここに memo.html のスクリーンショットを貼る -->
<img width="1913" height="947" alt="image" src="https://github.com/user-attachments/assets/85b89e2d-9919-42d5-b608-69f9bffd4f67" />

## 概要

就職、進路、生活費、人間関係、心身の不調などについて悩みがあっても、相談窓口の情報が複数のWebサイトに分散しており、自分がどこへ相談すればよいか判断しにくいことがあります。

たよりばでは、利用者が「困りごと」「地域」「相談方法」などを選択することで、条件に合う相談先を検索できます。

本アプリは診断や相談への回答を行うものではなく、公的機関や専門的な相談窓口へつなぐための案内サービスとして制作しました。

## 制作背景

悩みを抱えているときは、相談先を探す作業自体が負担になる場合があります。

また、相談窓口の名称だけを見ても、以下のような情報をすぐに判断できないことがあります。

* どのような悩みを相談できるか
* 自分の年齢が対象に含まれるか
* 電話以外の相談方法があるか
* 無料または匿名で相談できるか
* 予約が必要か

そこで、制度名や組織名から探すのではなく、利用者自身の「困りごと」から相談先を探せるWebアプリを制作しました。

## UI/UX改善の方針

本アプリでは、単に相談先を検索するだけでなく、相談者が検索前に感じる不安を減らすことを重視しています。

そのため、以下の点を意識してUIを改善しました。

* いま入力している段階が分かる進捗表示
* 「まだ決められない」を許容する選択肢
* AI診断のように見えない落ち着いた画面設計
* 相談方法や地域を無理に決めさせない導線
* 検索前に探し方を整理できるガイドページ

## 最近の改善

* トップページの導線を整理
* 「相談先を探す」と「探し方を整理する」を別ページに分離
* 探し方ガイドページを追加
* 検索画面に入力状況が分かる進捗表示を追加
* 選択肢UIを見直し、AIサービス風の強いカードUIを軽減
* キーボード操作とfocus-visibleを改善

## 主な機能

### 1. 困りごとのカテゴリ選択

利用者は、自分の悩みに近いカテゴリを選択できます。選択肢は、タイトルと説明が分かれて読める落ち着いた選択行として表示しています。

<img width="934" height="752" alt="image" src="https://github.com/user-attachments/assets/6b1bb26c-5ce3-4cfd-9932-69c91f8c8e60" />

対応カテゴリの例：

* 仕事・就職
* 学業・進路
* お金・生活
* 住まい
* 家族
* 人間関係
* 心や体の不調

選択中の項目は、控えめな左線と薄い背景色で視覚的に分かるようにしています。

### 2. 探し方ガイド

検索条件を自分で選ぶ前に、短い質問から探し方を整理できます。

ガイドでは相談先を断定せず、整理された条件を確認してから検索結果へ進める構成にしています。

### 3. 地域・相談方法による絞り込み

地域や希望する相談方法を選択して、相談先を絞り込めます。

<img width="948" height="925" alt="image" src="https://github.com/user-attachments/assets/40b82ecf-a509-4fc6-892b-2a5eaf8d1a31" />

検索条件の例：

* 地域
* 電話
* 対面
* オンライン
* 無料相談
* 匿名相談

検索画面では、困りごと、相談方法、地域、任意条件、検索へ進む流れを進捗表示で確認できます。

### 4. 相談先の一覧表示

入力した条件に合う相談先をカード形式で表示します。

<img width="310" height="437" alt="image" src="https://github.com/user-attachments/assets/19573b0a-06a6-48ed-8c31-f93ecde5970a" />

各カードでは、以下の情報を確認できます。

* 相談先名
* 対応する悩み
* 対象年齢
* 相談方法
* 対応地域
* 受付時間
* 無料相談の可否
* 匿名相談の可否

カード全体をクリックすると、その相談先の詳細ページへ移動します。

### 5. 相談先の詳細表示

相談先ごとの詳しい情報を確認できます。

<img width="1151" height="858" alt="image" src="https://github.com/user-attachments/assets/ff636e72-a88a-4fdf-9d3c-d4a7e4692b24" />

詳細画面では、以下の情報を表示します。

* 運営組織
* 対象年齢
* 対応する相談内容
* 相談方法
* 電話番号
* 受付時間
* 費用
* 匿名相談の可否
* 予約の要否
* 公式サイト

掲載情報が変更されている可能性を考慮し、利用前に公式サイトを確認するよう案内しています。

### 6. お気に入り保存

気になった相談先をお気に入りとして保存できます。

ログイン機能を使用せず、ブラウザのlocalStorageに相談先IDを保存しています。

### 7. 相談内容整理メモ

相談する前に、困っていることや相談したい内容を整理できます。

<img width="1050" height="889" alt="image" src="https://github.com/user-attachments/assets/40e8c0ad-a469-4004-b668-51d09fa46e01" />

入力内容はlocalStorageに保存されるため、同じブラウザであればページを閉じた後も確認できます。

個人情報をサーバーへ送信しない構成にしています。

## 使用技術

### フロントエンド

* HTML
* CSS
* JavaScript
* Fetch API
* localStorage

### バックエンド

* Node.js
* Express

### データベース

* MongoDB
* MongoDB Atlas

### 開発環境・ツール

* Visual Studio Code
* Git
* GitHub
* npm
* nodemon

## システム構成

```text
ブラウザ
  ↓ Fetch API
Node.js / Express
  ↓ MongoDB Driver
MongoDB Atlas
```

相談先情報はMongoDB Atlasに保存し、Node.js・Expressで作成したAPIから取得します。

お気に入りと相談メモは、個人情報をサーバー側へ保存しないため、ブラウザのlocalStorageに保存しています。

## ディレクトリ構成

```text
tayoriba/
├─ public/
│  ├─ index.html
│  ├─ search.html
│  ├─ guide.html
│  ├─ results.html
│  ├─ detail.html
│  ├─ favorites.html
│  ├─ memo.html
│  ├─ css/
│  └─ js/
├─ routes/
│  └─ supports.js
├─ db/
│  └─ mongo.js
├─ data/
│  └─ seedSupports.js
├─ docs/
│  └─ images/
├─ server.js
├─ seed.js
├─ package.json
├─ .env.example
└─ README.md
```

## セットアップ方法

### 1. リポジトリを取得

```bash
git clone リポジトリのURL
cd tayoriba
```

### 2. パッケージをインストール

```bash
npm install
```

### 3. 環境変数を設定

`.env.example`をコピーして`.env`を作成します。

```bash
cp .env.example .env
```

Windows PowerShellの場合：

```powershell
Copy-Item .env.example .env
```

`.env`にMongoDB Atlasの接続文字列を設定します。

```env
MONGODB_URI=MongoDB Atlasの接続文字列
PORT=3000
```

### 4. 初期データを投入

```bash
node seed.js
```

### 5. アプリを起動

```bash
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

## API

### 相談先一覧

```http
GET /api/supports
```

### 条件付き検索

```http
GET /api/supports?category=mental&area=tokyo&method=phone
```

### 相談先詳細

```http
GET /api/supports/:supportId
```

例：

```http
GET /api/supports/support003
```

## 工夫した点

### 利用者の困りごとを起点にした検索

相談機関名や制度名を知っていることを前提にせず、利用者が自分の悩みに近いカテゴリを選ぶだけで検索できる構成にしました。

### 個人情報を保存しない設計

MVPでは会員登録を実装せず、お気に入りや相談メモはlocalStorageに保存しています。

これにより、利用者の相談内容をサーバー側へ保存しない構成にしています。

### 初めて利用する人でも迷いにくいUI

* 入力の流れを進捗表示で案内
* 「まだ決められない」を選べる導線
* 選択中の項目を控えめな色と枠線で表示
* 検索条件をタグ形式で表示
* 検索結果が0件の場合に条件変更を案内
* 読み込み中や通信エラー時にメッセージを表示
* スマートフォンでも押しやすいボタンサイズ
* キーボード操作時のフォーカス表示

### フロントエンドとバックエンドの役割を分離

画面表示はHTML・CSS・JavaScript、相談先の取得はNode.js・Express、データ保存はMongoDB Atlasと役割を分けました。

## 苦労した点

MongoDB Atlasとの接続や、検索条件とMongoDB上の配列データを一致させる処理に苦労しました。

特に、以下の対応を行いました。

* MongoDB Node.js Driverのバージョンに合わせた接続処理
* 環境変数による接続情報の管理
* カテゴリ、地域、相談方法の検索条件の統一
* JavaScript共通関数の重複定義の解消
* APIと画面表示の切り分けによるデバッグ

エラーが発生した際は、ブラウザのConsole、APIへの直接アクセス、PowerShellからのAPI確認を使って原因を切り分けました。

## 今後追加したい機能

* 実在する公的相談窓口データの追加
* 対応地域の拡大
* 地図から相談先を探す機能
* 多言語対応
* やさしい日本語への対応
* 相談前チェックリスト
* 情報の最終確認日による更新管理
* 管理者向けの相談先編集画面
* アクセシビリティのさらなる改善

## README用スクリーンショット撮影予定

以下の画面を撮影してREADMEに掲載する予定です。

1. トップページ
   - http://localhost:3000/
   - 3つの導線が見える状態

2. 探し方ガイド画面
   - http://localhost:3000/guide.html
   - 質問と選択肢が見える状態

3. 検索画面
   - http://localhost:3000/search.html
   - 進捗表示と困りごと選択が見える状態

4. 検索結果画面
   - http://localhost:3000/results.html?category=mental&method=phone&area=tokyo
   - 相談先が1件以上表示されている状態

5. 相談先詳細画面
   - http://localhost:3000/detail.html?id=support003
   - 相談先の詳細、できること、最初の一言が見える状態

6. 相談メモ画面
   - http://localhost:3000/memo.html
   - 入力欄が見える状態



## 注意事項

本アプリは、ポートフォリオ用に制作したMVPです。

現在登録されている相談先情報には、機能確認を目的とした架空データが含まれています。表示される電話番号やWebサイトは、実際の相談には利用できません。

本アプリは、医療行為、診断、法律相談および緊急対応を行うものではありません。

今後、実在する相談窓口を掲載する場合は、各機関の公式情報を確認し、情報の出典と最終確認日を明記する予定です。

## 制作者

東京電機大学大学院
工学研究科 情報通信工学専攻
福田　太陽
