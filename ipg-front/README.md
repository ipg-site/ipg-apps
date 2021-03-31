# IPG のフロントプロジェクトフォルダ

## 実行前にすること

ディレクトリに次のファイルを作成する。

- `.env.local` ... local 環境での環境変数を定義したファイル
- `.env.production.local` ... production 環境 = build 時に指定する環境変数を定義したファイル

それぞれのファイルの内容は次のように定義する

### `.env.local`

```
API_SERVER=[ipg-api-serverが動いているポート]
NEXT_PUBLIC_API_SERVER=[ipg-api-serverが動いているポート]
```

もし ipg-api-server がデフォルトの設定で動いている(ポートが 3001 番)なら

```
API_SERVER=http://localhost:3001
NEXT_PUBLIC_API_SERVER=http://localhost:3001
```

というファイルを作成する。

### `.env.production.local`

```
API_SERVER=[本番環境のipg-api-serverのエンドポイント]
NEXT_PUBLIC_API_SERVER=[本番環境のipg-api-serverのエンドポイント]
```

第 15 回関東学生研究論文講演会であれば thetis で動いているので

```
API_SERVER=https://thetis.f-lab.tech.uec.ac.jp/ipg_api
NEXT_PUBLIC_API_SERVER=https://thetis.f-lab.tech.uec.ac.jp/ipg_api
```

と指定する。

## デプロイ方法

- 次のコマンドを実行すると、build -> export -> sitemap generate まで一気にやってくれる

```
yarn build:all
```

- 無事にこのコマンドが実行されると [out](./out)というフォルダが生成され、中に Static HTML として出力される
- このフォルダの中身を全部[github のリポジトリ](https://github.com/ipg-site/ipg-site.github.io)に push されることで[github pages](https://ipg-site.github.io)へデプロイされ、公開される

## 以下 Next.js のの README

---

# NextJS apps

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
