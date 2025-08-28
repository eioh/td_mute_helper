# TD Mute Helper

TweetDeck用ミュートフィルター管理TamperMonkeyスクリプト

## 概要

TweetDeckでのミュートフィルター管理を効率化するUserScriptです。HTMLベースのカスタムダイアログでユーザー体験を向上させ、複数のミュートパターン（URL、正規表現、ユーザー名等）に対応しています。

## 主な機能

- **6タブ統合ダイアログ**: 左右分割レイアウトでタイプ別の専用入力画面
- **包括的バリデーション機能**: 入力形式の詳細検証と分かりやすいエラーメッセージ
- **多様なミュートパターン対応**:
  - **フレーズタブ**: 通常のキーワードミュート
  - **正規表現タブ**: パターンマッチング (`/regex/` 形式)
  - **URLタブ**: t.co短縮URLや通常URL
  - **ユーザーキーワードタブ**: 特定ユーザーのキーワード (`user|keyword` 形式)
  - **ユーザー正規表現タブ**: ユーザー名パターンマッチング
  - **削除タブ**: 指定数のフィルター一括削除
- **安全な操作設計**: 実行ボタンクリック時のみ処理実行（Enter誤操作防止）
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

### 統合ダイアログの起動
1. TweetDeckで `.visible-in-contracted-header` 要素をクリック
2. 6タブ統合ダイアログが表示される
3. 左側のタブで処理タイプを選択

### 各タブの使用方法

| タブ | 入力形式 | 例 | 処理内容 |
|------|----------|-----|----------|
| **フレーズ** | 2文字以上のキーワード | `スパム`、`広告` | 通常のphrase フィルター追加 |
| **正規表現** | 正規表現パターン | `RT.*セール`、`.*限定.*` | BTD_regex フィルター追加 |
| **URL** | 完全なURL | `https://example.com`、`https://t.co/abc123` | URL/t.co処理してphrase追加 |
| **ユーザーキーワード** | `ユーザー名\|キーワード` | `spamuser\|広告` | BTD_mute_user_keyword追加 |
| **ユーザー正規表現** | ユーザー名パターン | `spam_.*`、`bot[0-9]+` | BTD_user_regex追加（重複削除後） |
| **削除** | 正の整数 | `5`、`10` | 指定数のフィルターを20秒間隔で削除 |

### 操作手順
1. **タブ選択**: 左側でミュートタイプを選択
2. **内容入力**: 右側の入力欄で対象を入力
3. **実行確認**: 「実行」ボタンクリックで処理開始
4. **エラー対応**: バリデーションエラーは詳細メッセージで確認

### バリデーション機能
- **入力形式チェック**: 各タブで適切な形式かを自動検証
- **詳細エラーメッセージ**: 修正方法と例を含む分かりやすい説明
- **安全操作**: Enterキーでの誤実行を防止、実行ボタンのみ有効

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