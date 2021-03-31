# ipg_site

このプロジェクトは 2 つのフォルダで構成されている。

## [ipg-api-server](./ipg-api-server/README.md)

- ipg でのユーザー管理やデータベースの管理などを行う API サーバー
- 基本的にはこれを[ipg-front](./ipg-front/README.md)から呼び出すことで動的なページの再現を行っている

## [ipg-front](./ipg-front/README.md)

- ipg のフロントページを開発するフォルダ
- このフォルダで開発し、build -> export したものを[github のリポジトリ](https://github.com/ipg-site/ipg-site.github.io)に push することで、[github pages](https://ipg-site.github.io)へデプロイされ、公開される。
