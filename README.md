# Caramelize

![Screenshot](https://i.gyazo.com/632979080433dc7fe5f0703aae0c79a5.png)

Scrapbox \[なのに\] Blog

## 概要

特定の Scrapbox Project の特定のタグのついたエントリを SSR して静的ページとして出力します。<br>
サンプル: [Caramelize](https://caramelize.now.sh)

## 設定

now にビルドする場合は secrets 経由で設定します。使わない値は `null` にしてください。

| キー             | 意味                                          | 必須　 | デフォルト値 |
| ---------------- | --------------------------------------------- | ------ | ------------ |
| SCRAPBOX_PROJECT | Scrapbox の Project を指定します              | はい   |
| SCRAPBOX_TAG     | 集めるタグを指定します（#を含める）           | はい   |
| TWITTER_ID       | Twitter の ScreenName （@ 抜き） を指定します | いいえ |
| SITE_NAME        | サイト名を指定します                          | いいえ | Caramelize   |
| SITE_ROOT        | サイトのメインホスト名を指定します            | いいえ |
| GA               | Google Analytics のタグを設定します           | いいえ |

## デプロイ

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/ci7lus/caramelize/tree/master)

## 開発

1. このリポジトリをクローンする
1. `yarn install`
1. `yarn dev`

## License

[MIT License](/LICENSE)
