# たよりば

若者が「どこに相談すればよいか分からない」という状態から、自分に合った相談窓口を見つけるためのWebアプリです。

<img width="1259" height="681" alt="image" src="https://github.com/user-attachments/assets/fc54ffd0-5387-4ea6-9ce5-d3f2233d0338" />

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

## 主な機能

### 1. 困りごとのカテゴリ選択

利用者は、自分の悩みに近いカテゴリをカード形式で選択できます。

![カテゴリ選択画面](docs/images/category-select.png)

対応カテゴリの例：

* 仕事・就職
* 学業・進路
* お金・生活
* 住まい
* 家族
* 人間関係
* 心や体の不調

選択中のカードは、枠線と背景色を変えて視覚的に分かるようにしています。

### 2. 地域・相談方法による絞り込み

地域や希望する相談方法を選択して、相談先を絞り込めます。

![検索条件選択画面](docs/images/search-filter.png)

検索条件の例：

* 地域
* 電話
* 対面
* オンライン
* 無料相談
* 匿名相談

### 3. 相談先の一覧表示

入力した条件に合う相談先をカード形式で表示します。

![検索結果画面](docs/images/search-results.png)

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

### 4. 相談先の詳細表示

相談先ごとの詳しい情報を確認できます。

![相談先詳細画面](docs/images/support-detail.png)

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

### 5. お気に入り保存

気になった相談先をお気に入りとして保存できます。

ログイン機能を使用せず、ブラウザのlocalStorageに相談先IDを保存しています。

### 6. 相談内容整理メモ

相談する前に、困っていることや相談したい内容を整理できます。

![相談内容整理メモ](docs/images/consultation-memo.png)

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

* 選択中のカードを色と枠線で表示
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

## 注意事項

本アプリはポートフォリオ用のMVPです。

現在登録されている相談先情報には、動作確認用の架空データが含まれています。

本アプリは医療行為、診断、法律相談、緊急対応を行うものではありません。

実際に相談窓口を利用する際は、必ず各機関の公式サイトで最新情報を確認してください。

## 制作者

東京電機大学大学院　工学研究科
福田太陽


# たよりば

若者向け相談先検索WebアプリのMVPです。

## 起動方法

1. リポジトリをクローンします。
2. `npm install` を実行します。
3. `.env` ファイルを作成し、MongoDB接続文字列を設定します。

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. データベースにシードデータを追加します。

```bash
node seed.js
```

5. 開発サーバーを起動します。

```bash
npm run dev
```

5. ブラウザで `http://localhost:3000` にアクセスします。

## 構成

- `public/` - 静的HTML、CSS、JavaScript
- `routes/` - APIルート
- `db/` - MongoDB接続処理
- `data/` - シードデータ
- `server.js` - Expressサーバー

## API

- `GET /api/supports` - 相談先一覧取得
- `GET /api/supports?category=job&area=tokyo&method=phone&free=true&anonymous=true` - 条件検索
- `GET /api/supports/:supportId` - 相談先詳細取得

## MVPポイント

- カテゴリ選択による相談先検索
- 相談方法・地域による絞り込み
- 相談先詳細表示
- お気に入り、メモ、チェックリスト（localStorage保存）
- MongoDBから相談先データを取得
