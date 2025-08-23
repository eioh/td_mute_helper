# CLAUDE.md

TweetDeckミュート拡張TamperMonkeyスクリプト

## 概要
TamperMonkey用スクリプト
TamperMokey側の記述は以下の通り。
``` js
// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version <version>
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// ==/UserScript==
```

## 主要関数
- `addMuteFilter(word)`: URL/正規表現/ユーザーパターンを処理してミュートフィルターを追加
- `removeMuteFilters(num)`: フィルター一括削除（20秒間隔）
- `getDuplication()`: 重複フィルター検索

## 実行環境
- TweetDeckの`TD.controller.filterManager`に依存
- 日本語UI

## AI回答設定
- 日本語で回答すること

## コミットメッセージルール
- プレフィックスは英語 (add, fix, refactor, update等)
- 説明部分は日本語
- 例
```
add: 新機能の実装
fix: バグ修正とエラーハンドリング追加
refactor: 関数を分割してコードを整理
update: 依存関係を最新バージョンに更新
```