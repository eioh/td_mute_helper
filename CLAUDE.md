# CLAUDE.md

TweetDeckミュート拡張TamperMonkeyスクリプト

## 概要
TamperMonkey用スクリプト
TamperMokey側の記述は以下の通り。
``` js
// ==UserScript==
// @name td\mute\helper
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require path/to/main.js
// ==/UserScript==
```

## 主要関数
- `MutePicture(word)`: URL/正規表現/ユーザーパターンを処理
- `removePicture(num)`: フィルター一括削除（20秒間隔）
- `getDuplication()`: 重複フィルター検索

## 実行環境
- TweetDeckの`TD.controller.filterManager`に依存
- jQuery使用、日本語UI

## AI回答設定
- 日本語で回答すること