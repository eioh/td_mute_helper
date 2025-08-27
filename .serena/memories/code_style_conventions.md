# コードスタイルと規約

## 基本スタイル
- **言語**: JavaScript ES6+
- **文字列**: シングルクォート使用
- **インデント**: タブ文字使用
- **命名規約**: camelCase
- **文末**: セミコロン必須

## 関数定義
- 通常の関数: `function functionName() {}`
- アロー関数: 短い処理で使用 `const sleep = ms => new Promise(res => setTimeout(res, ms))`

## エラーハンドリング
- 統一されたエラー表示関数 `showError(message, error)` を使用
- try-catch ブロックで例外処理
- ユーザーフレンドリーなエラーメッセージ（日本語）

## コメント
- **現状**: JSDocコメントなし
- **UI言語**: 日本語
- **ログメッセージ**: 日本語と英語混在

## 定数
- 大文字のスネークケース（例: `VERSION`, `DELAY_BETWEEN_OPERATIONS`）
- ファイル冒頭で定義

## 非同期処理
- async/await パターンを使用
- Promise ベースの `sleep` ユーティリティ関数

## TamperMonkey固有
- IIFE パターンで全体をラップ
- `'use strict';` 使用
- UserScriptヘッダーコメント必須