This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```sh
npm ci
npx supabase start
docker compose up # localhost:12000
```

終了時に`npx supabase stop`を実行すること

## prisma init

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run `npx prisma db pull` to turn your database schema into a Prisma schema.
4. Run `npx prisma generate` to generate the Prisma Client. You can then start querying your database.

## 命名規則
### ファイル内
#### 変数、関数
- camelCase

#### コンポーネント、type、class、interface、enum
- PascalCase

### ファイル名
- camelCase

## ブランチ
基本名前のブランチを使う
developから自分の名前のブランチを切る
developにマージするときはプルリクエストを使う
developからmainにマージされるとそのままデプロイされる

- main
- develop
- ueyama
- tayu
- yuta
- icyou