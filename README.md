# TD Mute Helper

TweetDeck用ミュートフィルター管理TamperMonkeyスクリプト

## 概要

TweetDeckでのミュートフィルター管理を効率化するUserScriptです。HTMLベースのカスタムダイアログでユーザー体験を向上させ、複数のミュートパターン（URL、正規表現、ユーザー名等）に対応しています。

## 主な機能

- **HTMLカスタムダイアログ**: `window.prompt()`をモダンなUIで置き換え
- **多様なミュートパターン対応**:
  - 通常のフレーズ
  - t.co URL
  - 正規表現パターン (`/regex/`)
  - ユーザーキーワード (`@@username`)
  - ユーザー正規表現 (`@username`)
- **一括フィルター削除**: 指定数のフィルターを20秒間隔で削除
- **重複検出**: 重複するフィルターの自動検出と削除

## フォルダ構成

```
td_mute_helper/
├── src/                          # 開発用ソースファイル
│   ├── main.js                  # エントリーポイント（30行）
│   ├── config.js                # 定数・設定（20行）
│   ├── userscript-header.txt    # UserScriptヘッダー
│   ├── utils/                   # ユーティリティ関数
│   │   ├── sleep.js            # Promise-based delay（10行）
│   │   └── error-handling.js   # エラー処理（20行）
│   ├── dialog/                  # ダイアログ関連（250行）
│   │   ├── dialog-html.js      # HTML構造作成
│   │   ├── dialog-styles.js    # CSSスタイル定義
│   │   └── dialog-controller.js # ダイアログ制御とPromise処理
│   ├── filters/                 # フィルター機能（200行）
│   │   ├── mute-patterns.js    # パターン判定・各種mute関数
│   │   ├── mute-operations.js  # メイン操作（add/remove）
│   │   └── duplication.js      # 重複フィルター検索
│   └── initialization.js       # 初期化・イベント設定（50行）
├── dist/                        # ビルド成果物（gitignore対象）
│   └── main.js                 # バンドル済みファイル
├── plan/                        # 実装計画・設計ドキュメント
│   ├── file-splitting-plan.md
│   └── build-process.md
├── main.js                      # リリース用最終ファイル（TamperMonkey配信用）
├── build.js                     # esbuildカスタムビルドスクリプト
├── package.json                 # npm設定とスクリプト
├── .gitignore
└── README.md
```

## 技術スタック

- **バンドラー**: esbuild（高速ビルド）
- **モジュール**: ES6 modules
- **ターゲット**: ES2017（現代ブラウザ対応）
- **出力形式**: IIFE（UserScript形式）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発環境の起動（ウォッチモード）

```bash
npm run dev
```

ファイル変更を監視し、自動で `dist/main.js` にビルドします。

### 3. 本番ビルド

```bash
npm run build
```

ミニファイ・最適化された `dist/main.js` を生成します。

### 4. デプロイ

```bash
npm run deploy
```

`dist/main.js` を `main.js` にコピーしてリリース準備完了です。

## npm scripts

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発モード（ファイル監視・ソースマップ有効） |
| `npm run build` | 本番ビルド（ミニファイ・最適化） |
| `npm run deploy` | dist/main.js → main.js コピー |
| `npm run backup` | main.js のバックアップ作成 |
| `npm run clean` | dist/ ディレクトリクリア |
| `npm run test` | テスト実行 |

## 開発フロー

### 日常的な開発
1. `npm run dev` でウォッチモード開始
2. `src/` 内のファイルを編集
3. 自動で `dist/main.js` がビルドされる
4. TamperMonkeyで `dist/main.js` をテスト

### リリース準備
1. `npm run build` で最終ビルド
2. `dist/main.js` で動作確認
3. `npm run deploy` でリリースファイル準備
4. Gitコミット・プッシュ

## ビルド出力

- **開発版**: ソースマップ付き、非圧縮
- **本番版**: ミニファイ済み、約9.8KB
- **UserScriptヘッダー**: 自動挿入

## TamperMonkey設定

```javascript
// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.4
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==
```

## 使用方法

### ミュートフィルター追加
1. TweetDeckで `.visible-in-contracted-header` 要素をクリック
2. カスタムダイアログでキーワード入力
3. 自動でパターン判定してフィルター追加

### フィルター削除
1. 同要素を右クリック
2. 削除数を入力
3. 20秒間隔で指定数のフィルターを削除

### 対応パターン

| パターン | 例 | 処理内容 |
|----------|-----|----------|
| 通常フレーズ | `テスト` | phraseフィルターとして追加 |
| t.co URL | `https://t.co/abc123` | URL部分を抽出してphrase追加 |
| 正規表現 | `/テスト.*/` | BTD_regexフィルターとして追加 |
| ユーザーキーワード | `@@username` | BTD_mute_user_keywordとして追加 |
| ユーザー正規表現 | `@username` | BTD_user_regexとして追加（重複削除後） |

## トラブルシューティング

### ビルドエラー
- Node.jsバージョン確認（推奨: 16+）
- `npm install` で依存関係再インストール
- `npm run clean` でdistクリア後再ビルド

### 動作しない場合
- ブラウザコンソールでエラー確認
- TweetDeckのDOM構造変更の可能性
- UserScriptの有効化確認

## 貢献・開発

### コード品質
- ESLint設定済み（将来）
- ファイルサイズ監視機能内蔵
- 各モジュールの責務を明確に分離

### 将来の拡張
- TypeScript対応検討
- テストフレームワーク導入
- GitHub Actions CI/CD

## ライセンス

MIT License

---

**Version**: 0.5
**Last Updated**: 2024