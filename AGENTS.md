## AGENTS: Codex コラボレーションガイド

このリポジトリで Codex（ターミナル型コーディングアシスタント）と協働するための最小限の運用ルールと手順をまとめます。日々の開発で迷いなく動けること、人的レビューの手間を減らすことが目的です。

## プロジェクト概要
- 種別: Tampermonkey 向け UserScript（TweetDeck/X 用ミュート補助）
- バンドル: esbuild（IIFE 出力、ES2017 目標）
- 配布物: `dist/main.js`（Tampermonkey で利用）
- エントリポイント: `src/main.js`

## よく使うコマンド
- 開発ビルド: `npm run dev`（監視 + ソースマップ）
- 本番ビルド: `npm run build`（最適化 + ミニファイ）
- テスト実行: `npm run test`
- 配布反映: `npm run deploy`（`dist/main.js` → `main.js`）

## バージョン管理（Single Source of Truth）
- 変更は原則 `package.json` の `version` のみを更新する。
- `build.js` が以下を自動処理する:
  - `src/userscript-header.txt` の `@version` を `package.json` の version で置換
  - ビルド時定数 `__VERSION__` を定義（`src/config.js` は `export const VERSION = __VERSION__`）
- ドキュメント上のバージョン固定表記は置かない（README に数値を直書きしない）。

## ディレクトリとファイル
- `src/dialog/dialog.html` / `src/dialog/dialog.css`
  - HTML/CSS は JS 直書きせず、esbuild の text ローダーで取り込み
- `src/dialog/dialog-html.js`
  - 上記 HTML/CSS を import し、CSS は `<style data-td-dialog>` へ挿入
- `src/userscript-header.txt`
  - UserScript ヘッダー雛形（@version はビルド時に置換）
- `test/`
  - `test/test.js` と `test/test-validation.js` に単体テストを配置
- `dist/`
  - 出力先（`.gitignore` で除外。ただし `dist/main.js` は許可）

## コーディング指針
- モジュール: ESM（`module.exports` は使用しない）
- 依存: 追加ライブラリは要相談（現状 `esbuild` のみ）
- スタイル: 既存の記法に寄せる（関数名は `camelCase`、セミコロン省略）
- DOM 操作: TweetDeck の DOM 変更に耐えるよう、セレクタは影響最小に
- HTML/CSS 取扱い: `.html`/`.css` は `import` して文字列として扱う（`build.js` がローダー設定済み）

## テスト方針
- 単体テストは `test/` に追加。Node.js で実行できる形にする。
- 既存テストにならい、外部依存（TD APIs 等）は最低限のモックで置換。
- 変更が `src/filters/` に及ぶ場合はテスト追加・更新を推奨。

## コミットとブランチ
- コミットメッセージ: プレフィックスは英語（例: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`）。本文は日本語で簡潔に。
- ブランチ戦略:
  - `main`: リリース用。タグ（`vX.Y.Z`）を付与。
  - `develop`: 統合用。日常開発や PR の取り込み先。
  - 機能追加はトピックブランチを切って `develop` へ PR。
- 配布物: タグ発行時点の `dist/main.js` が最新配布物になるようビルド。

## 追跡除外と秘匿
- `.gitignore` で除外: `.claude/`, `.serena/`, `node_modules/`, ログ／一時ファイル 等
- これらを再度追跡に載せないこと。既存履歴の完全削除が必要な場合は要相談（履歴書き換えが発生）。

## 変更の進め方（Codex へ）
- 小さく安全に:
  - 影響範囲を最小化し、既存構造を尊重する。
  - 目的に直結しない周辺修正は避ける（必要なら別 PR）。
- 検証:
  - 可能な限り `npm run test` を実行。
  - ビルドが必要な変更時は `npm run build` で生成を確認。
- ドキュメント:
  - README は実態差分に合わせて最小限を更新。
  - フォルダ構成や手順のズレが出たら修正。

## 参考: ファイル参照の記法（ドキュメント内）
- クリック可能なパス表記を推奨（例）:
  - `src/main.js:12`
  - `src/dialog/dialog-html.js`
  - `test/test.js:42:3`
- コマンドやパスはバッククォートで囲む（例）: `npm run build`, `dist/main.js`

## よくあるタスクの手順
- HTML/CSS を分離して取り込む:
  1) `.html`/`.css` を `src/dialog/` に追加
  2) JS から `import html from './dialog.html'` / `import css from './dialog.css'`
  3) `<style data-td-dialog>` を生成して `css` を挿入
  4) `npm run build` で単一ファイルにバンドル
- バージョンを上げる:
  1) `package.json` の `version` を更新
  2) `npm run build` でヘッダーと `VERSION` が自動反映
  3) タグ作成: `git tag -a vX.Y.Z -m "vX.Y.Z"` → `git push origin vX.Y.Z`

---
質問や追加の運用ルールが必要な場合は、README か本ファイルに追記してください。

