# TypeORM の使い方

このプログラムでは TypeORM というのをつかってデータベースのモデルやコントローラーを作っている。

以降、 `Memo` テーブルを作るとして話をすすめる。

[参考サイト](https://qiita.com/elipmoc101/items/9b1e6b3efa62f3c2a166)

## エンティティの作り方、マイグレーションの仕方

- [src/entities](./src/entities)フォルダに`memo.entity.ts`という名前で保存する
- 中に定義をする。デコレーターとか使う
- マイグレーションするため一旦ビルドするので `yarn build` する
- マイグレーションは `yarn typeorm migration:generate -d ./src/migrations -n create-memo` とすると行われる。勝手にマイグレーションファイルが作られる ( `-d` オプションで指定されたやつ )
  - `yarn build` が成功していないと `No changes in database schema were found` と怒られる(なにも変更がされてない)
- マイグレーションファイルは勝手に作られる。と思う。
  - もしすっごく複雑なことをするなら自分で書くといいと思う
- `yarn build` をしたあとに `yarn typeorm migration:run` でマイグレーションが実行される。
  - これでデータベースにテーブルが作られる。

## モジュール、コントローラー、サービスの作り方

- 以下のコマンドを実行

```bash
nest g mo [名前] # モジュール
nest g co [名前] # コントローラー
nest g s [名前] # サービス
```

## エンティティの追加

- 作ったエンティティを生成したモジュールに組み込む

```ts
import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
```

- となっている。これを

```ts
import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo } from 'src/entities/memo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [TypeOrmModule.forFeature([Memo])],
})
export class MemoModule {}
```

- とエンティティ、そして TypeORM の関数を使って imports に指定する
- さらにサービスにリポジトリを登録する。TypeORM におけるリポジトリとはデータを読み出すタンクのようなもの

```ts
import { Injectable } from '@nestjs/common';
import { Memo } from 'src/entities/memo.entity'; // これを追加
import { Repository } from 'typeorm'; // これを追加
import { InjectRepository } from '@nestjs/typeorm'; // これを追加

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {} // このへん全部追加
}
```

## サービスに関数を追加

- データベースのテーブルからデータを読んだり書き込んだりする関数をサービスファイルにつくる。

```ts
import { Injectable } from '@nestjs/common';
import { Memo } from 'src/entities/memo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}

  addMemo(name: string, description: string) {
    const memo = new Memo();
    memo.name = name;
    memo.description = description;
    return this.memoRepository.insert(memo);
  }

  getMemoList() {
    return this.memoRepository.find();
  }
}
```

- `addMemo` は `Memo` テーブルにデータをインサートする関数
- `getMemoList` は `Memo` テーブルからデータを引っ張ってくる関数

## コントローラーに関数を追加

- コントローラーの API のエンドポイントでさっきサービスでつくった関数を使ってデータを呼び出す。

```ts
import { Controller, Get, Post, Query } from '@nestjs/common';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
  constructor(private readonly service: MemoService) {}

  @Get()
  getMemoList() {
    return this.service.getMemoList();
  }

  @Post()
  addMemo(@Query() query: { name: string; description: string }) {
    return this.service.addMemo(query.name, query.description);
  }
}
```

- こんな感じで実装する。
