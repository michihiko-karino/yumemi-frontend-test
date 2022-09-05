# ゆめみさんのフロントエンドコーディング試験の胸を借りる１週間

https://zenn.dev/karino_m/scraps/4107b6603be184

デプロイしたもの
https://yumemi-frontend-test-michihiko-karino.vercel.app/

# local development

## 初回

```
npm install -g vercel
npm install
cp .env.sample .env
```

`.env`ファイルの`SERVER_RESAS_API_KEY`を自分のRESAS APIキーに置き換える必要があります。

APIキーの取得はこちらから
https://opendata.resas-portal.go.jp/

## ビルド実行

```
npm run dev
```

# Lint&Format

```
npm run lint
```

# deploy

vercelのアカウントが必要になります

```
vercel
```
