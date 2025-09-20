# TD Mute Helper

TweetDeck/X 用のミュートフィルターをまとめて追加・削除できる Tampermonkey 用ユーザースクリプトです。HTML/CSS 分離のカスタムダイアログで入力しやすく、複数のミュートパターンに対応します。

## 概要
- 統合ダイアログでフレーズ/正規表現/URL/ユーザー系などを一括操作
- 厳密な入力バリデーションと分かりやすいエラーメッセージ
- 重複フィルターの検出とクリーンアップ
- 単一ファイルにバンドルして配布（`dist/main.js`）

## 主な機能
- 6タブ統合ダイアログ（左：タブ、右：入力）
  - フレーズ: 通常のキーワード
  - 正規表現: `/pattern/` のスラッシュ不要（内部で補完）
  - URL: 通常 URL と t.co に対応
  - ユーザーキーワード: `user|keyword` 形式（`@@user|keyword` も可）
  - ユーザー正規表現: 例 `spam_.*`, `bot[0-9]+`
  - 削除: 古い順に phrase 型を指定数削除
- 安全な操作設計（Enter 誤操作防止、明示ボタンで実行）
- 重複の自動検出・除去

## フォルダ構成
```
td_mute_helper/
├─ src/                       # 開発用ソース
│  ├─ main.js                # エントリーポイント（IIFE）
│  ├─ config.js              # 定数・設定（VERSION はビルド時注入）
│  ├─ userscript-header.txt  # UserScript ヘッダー（@version は自動置換）
│  ├─ initialization.js      # 初期化・イベント設定
│  ├─ utils/
│  │  ├─ sleep.js
│  │  └─ error-handling.js
│  ├─ dialog/
│  │  ├─ dialog.html         # ダイアログの HTML テンプレート
│  │  ├─ dialog.css          # ダイアログの CSS
│  │  ├─ dialog-html.js      # HTML/CSS を import して注入
│  │  └─ dialog-controller.js# ダイアログ制御
│  └─ filters/
│     ├─ mute-patterns.js    # パターン判定・各操作の入り口
│     ├─ mute-operations.js  # 追加/削除ロジック
│     └─ duplication.js      # 重複検出
├─ test/
│  ├─ test.js                # 簡易テスト
│  └─ test-validation.js     # バリデーション系テスト
├─ dist/
│  └─ main.js                # バンドル済み出力（配布物）
├─ build.js                  # esbuild カスタムビルド
├─ AGENTS.md                 # Codex/開発運用ガイド
├─ package.json              # npm スクリプト・設定
└─ .gitignore
```

## セットアップ
```bash
npm install
```

## 開発
```bash
npm run dev   # 監視 + ソースマップ
```
変更すると自動で `dist/main.js` を再生成します。

## 本番ビルド
```bash
npm run build # 最適化 + ミニファイ
```

## 配布（Tampermonkey）
- UserScript ヘッダーの `@updateURL` / `@downloadURL` は GitHub Raw の `dist/main.js` を指しています。
- `npm run build` 後にリポジトリへ push（とタグ付け）すれば配布が更新されます。

ヘッダー例（抜粋）:
```javascript
// ==UserScript==
// @name         td_mute_helper
// @namespace    http://tampermonkey.net/
// @version      （ビルド時に package.json の version を自動挿入）
// @match        https://tweetdeck.twitter.com
// @match        https://twitter.com/i/tweetdeck
// @match        https://x.com/i/tweetdeck
// @updateURL    https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL  https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==
```

## 使い方
1. TweetDeck でヘッダの `.visible-in-contracted-header` 要素をクリック
2. 統合ダイアログが表示されます
3. 左のタブで操作タイプを選択、右側で対象を入力
4. 「実行」ボタンで確定（Enter では実行されません）

入力のコツ:
- 正規表現: `/.../` のスラッシュは不要（内部で補完）
- ユーザーキーワード: `ユーザー名|キーワード` の 1 本パイプで区切る
- URL: 通常 URL と `https://t.co/...` に対応

## npm scripts（抜粋）
- `npm run dev`: 開発モード（ウォッチ）
- `npm run build`: 本番ビルド
- `npm run test`: テスト一式
- `npm run clean`: `dist/` をクリア

## 技術スタック
- バンドラー: esbuild（IIFE 出力、ES2017 目標）
- モジュール: ES Modules（CommonJS は不使用）
- HTML/CSS ロード: `.html`/`.css` を text ローダーで取り込み、最終的に単一ファイルへインライン
- バージョン管理: package.json の version を単一ソースとし、ビルド時にヘッダーと `VERSION` に自動注入

## ライセンス
MIT License

