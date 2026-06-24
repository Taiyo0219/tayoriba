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
