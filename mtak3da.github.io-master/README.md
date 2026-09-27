# Portfolioサイトの更新ガイド

デザイナーが編集するのは、原則として次の2つだけです。

1. `assets/images/` 内の画像
2. [`assets/data/content.json`](assets/data/content.json) 内のテキスト・リンク・画像パス

HTMLとJavaScriptは通常編集不要です。

## 共通設定

`content.json` の `site` で、全ページ共通の情報を変更します。

- `name`: 表示名
- `role`: 表示名の下に出る肩書き
- `email`: Contactページのメールアドレス
- `instagram` / `linkedin`: サイドバーのSNSアイコンのリンク先
- `copyright`: サイドバー下部のコピーライト

`navigation` では、左側ナビゲーションの名前・順序・リンク先を管理します。`separated: true` を付けた項目の前には区切り線が入ります。

## Homeページ

Homeは大きな画像1枚だけで構成されています。

1. `assets/images/home/` または `assets/images/design/` に画像を置きます。
2. `home.image` に画像パスを設定します。
3. `home.alt` に画像の説明を入力します。

```json
"home": {
  "image": "assets/images/home/my-home-image.jpg",
  "alt": "作品イメージの説明"
}
```

横長・縦長のどちらでも使用できます。画面いっぱいにトリミングして表示されます。

## Designページ

画像は `assets/images/design/` に置くのが基本です。design画像は `assets/images/design/` に入っていますが、任意の画像フォルダを使えます。

`design.works` の各項目が、Designページの作品カード1枚になります。

```json
{
  "title": "Project Name",
  "category": "branding",
  "year": "2026",
  "image": "assets/images/design/project-name.jpg",
  "description": "作品の短い説明"
}
```

### タブ（フィルター）のルール

- 先頭に必ず `All` タブが表示されます。
- それ以外のタブは、`category` に入力した値から自動で作られます。
- 同じカテゴリ名を複数の作品に指定すると、そのカテゴリの作品だけが表示されます。
- `graphic-design` は画面上で `graphic design` と表示されます。

新しいタブを追加したい場合は、作品に新しいカテゴリ名を設定するだけです。

```json
"category": "web-design"
```

すると `web design` タブが自動で追加されます。作品カードをクリックすると、画像と説明の拡大表示が開きます。

## Artページ

Artはテキスト中心の展示一覧です。画像は使いません。

`art.exhibitions` に展示を追加・編集してください。

```json
{
  "year": "2026",
  "title": "Exhibition Title",
  "place": "Gallery, City, Country",
  "date": "March 1 – March 20, 2026",
  "description": "展示の短い説明",
  "url": "https://example.com"
}
```

同じ `year` の展示は同じ年の見出しに自動でまとまります。

## Zineページ

Zine画像は `assets/images/zine/` に置きます。

`zine.items` の各項目が、Zineページの1冊になります。

```json
{
  "title": "ZINE TITLE",
  "year": "2026",
  "cover": "assets/images/zine/zine-cover.jpg",
  "description": "Zineの説明",
  "previews": ["zine-1.jpg", "zine-2.jpg", "zine-3.jpg"]
}
```

- `cover` には表紙画像のフルパスを入力します。
- `previews` には `assets/images/zine/` 内のファイル名だけを入力します。
- プレビュー画像は、入力した順番で横並びに表示されます。

## Aboutページ

`about` でAboutページの文章と実績一覧を編集します。

- `statement`: 本文
- `bio`: 略歴。1項目ごとに改行表示されます。
- `details`: 右側の実績・クライアント・受賞歴などの一覧

`details` は見出しと箇条書きのセットです。項目を増やす場合は、同じ形式のオブジェクトを追加してください。

```json
{
  "title": "Awards",
  "items": ["2026 Design Award", "2025 Typography Award"]
}
```

## Contactページ

Contactはテキストのみです。画像はありません。

- `contact.title`: 見出し
- `contact.intro`: メールアドレスの前に表示する文章
- `contact.links`: メール下に表示する外部リンク

メールアドレス自体は、共通設定の `site.email` を変更すると更新されます。

## design画像の出典

現在入っているdesign画像の出典URLは、`content.json` の `imageCredits` に記録しています。画像を差し替えた場合は、この一覧も必要に応じて更新してください。

## ローカルで確認する（Windows）

[`start-preview.bat`](start-preview.bat) をダブルクリックしてください。ブラウザで `http://127.0.0.1:8000/` が開きます。

`index.html` を直接ダブルクリックするとJSONを読み込めないため、必ずこの方法で確認してください。

## GitHub Pages（GitHub.io）で公開する

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ内のファイル一式をリポジトリの一番上の階層へアップロードします。
3. リポジトリの **Settings** → **Pages** を開きます。
4. **Build and deployment** で **Deploy from a branch** を選びます。
5. Branchに `main`、Folderに `/(root)` を指定して保存します。
6. 数分後、表示される `https://ユーザー名.github.io/リポジトリ名/` を開きます。

`content.json` と画像ファイルも一緒にアップロードされていれば、JSONで管理した内容がそのまま公開ページに反映されます。
