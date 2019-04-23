```
src
  pages
    index.js
    books.js
    about.js
    books
      html
        beginner
          index.md -> /books/html/beginner/index [Book]
          0101.md  -> /books/html/beginner/0101 [Note]
  assets
    css
    sass
  components
    atoms
    molecules
    organisms
    templates
    layouts
static
  images
  favicon.ico
```

# 書籍の追加

`src/pages/books`以下にマークダウンを作成することで*本*を追加できる。<br>

マークダウンは以下のルールで作成する。

`src/pages/books/[category]/[varity]/[note].md`

- category: 本のカテゴリ
- varity: 本の種類
- note: 本の内容

## noteのファイル名に関するルール

- ファイル名が`index`担っているものは本の概要として扱われる。
- 本の内容は`001.md`など数値で構成されたファイル名で作成する。
- ファイル名の昇順でページがソートされて表示される。


# 画像などの静的コンテンツの配置

`statis`に配置したファイルは`public`にコピーされる。
本の中で扱いたいファイルは`static`に配置する。