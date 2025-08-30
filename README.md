# TD Mute Helper

TweetDeck用ミュートフィルター管琁EamperMonkeyスクリプト

## 概要E

TweetDeckでのミュートフィルター管琁E��効玁E��するUserScriptです、ETMLベ�Eスのカスタムダイアログでユーザー体験を向上させ、褁E��のミュートパターン�E�ERL、正規表現、ユーザー名等）に対応してぁE��す、E

## 主な機�E

- **6タブ統合ダイアログ**: 左右刁E��レイアウトでタイプ別の専用入力画面
- **匁E��皁E��リチE�Eション機�E**: 入力形式�E詳細検証と刁E��りやすいエラーメチE��ージ
- **多様なミュートパターン対忁E*:
  - **フレーズタチE*: 通常のキーワードミューチE
  - **正規表現タチE*: パターンマッチング (`/regex/` 形弁E
  - **URLタチE*: t.co短縮URLめE��常URL
  - **ユーザーキーワードタチE*: 特定ユーザーのキーワーチE(`user|keyword` 形弁E
  - **ユーザー正規表現タチE*: ユーザー名パターンマッチング
  - **削除タチE*: 持E��数のフィルター一括削除
- **安�Eな操作設訁E*: 実行�EタンクリチE��時�Eみ処琁E��行！Enter誤操作防止�E�E
- **重褁E���E**: 重褁E��るフィルターの自動検�Eと削除

## フォルダ構�E

```
td_mute_helper/
├── src/ # 開発用ソースファイル
  ├── main.js # エントリーポインチE
  ├── config.js # 定数・設宁E
  ├── userscript-header.txt # UserScript ヘッダー
  ├── utils/ # ユーチE��リチE��関数
    ├── sleep.js
    └── error-handling.js
  ├── dialog/ # ダイアログ関連
    ├── dialog.html # HTML チE��プレーチE
    ├── dialog.css # CSS スタイル
    ├── dialog-html.js # ダイアログ生�Eと CSS 挿入
    └── dialog-controller.js # ダイアログ制御
  ├── filters/ # フィルター機�E
    ├── mute-patterns.js
    ├── mute-operations.js
    └── duplication.js
  └── initialization.js
├── dist/ # ビルド�E果物
  └── main.js # バンドル済みファイル
├── build.js # esbuild カスタムビルドスクリプト
├── package.json # npm 設定とスクリプト
├── .gitignore
└── README.md
```

## 技術スタチE��

- **バンドラー**: esbuild�E�高速ビルド！E
- **モジュール**: ES6 modules
- **ターゲチE��**: ES2017�E�現代ブラウザ対応！E
- **出力形弁E*: IIFE�E�EserScript形式！E

## セチE��アチE�E

### 1. 依存関係�Eインスト�Eル

```bash
npm install
```

### 2. 開発環墁E�E起動（ウォチE��モード！E

```bash
npm run dev
```

ファイル変更を監視し、�E動で `dist/main.js` にビルドします、E

### 3. 本番ビルチE

```bash
npm run build
```

ミニファイ・最適化された `dist/main.js` を生成します、E

### 4. �z�z�iGitHub Raw ���Q�Ɓj

Tampermonkey ��  `@updateURL` / `@downloadURL` �� `dist/main.js` ���w���Ă��܂��B`npm run build` ��Ƀv�b�V������Δz�z�����͊����ł��B 



`dist/main.js` めE`main.js` にコピ�Eしてリリース準備完亁E��す、E

## npm scripts

| コマンチE| 説昁E|
|----------|------|
| `npm run dev` | 開発モード（ファイル監視�Eソースマップ有効�E�E|
| `npm run build` | 本番ビルド（ミニファイ・最適化！E|
| �i�폜�j | �ȑO�� deploy�idist��main.js �R�s�[�j�͔p�~ |

|  `npm run clean` | dist/ �f�B���N�g���N���A | 
| `npm run test` | チE��ト実衁E|

## 開発フロー

### 日常皁E��開発
1. `npm run dev` でウォチE��モード開姁E
2. `src/` 冁E�Eファイルを編雁E
3. 自動で `dist/main.js` がビルドされる
4. TamperMonkeyで `dist/main.js` をテスチE

### リリース準備
1. `npm run build` で最終ビルチE
2. `dist/main.js` で動作確誁E
3. `npm run deploy` でリリースファイル準備
3. �i�p�~�j `npm run deploy` �Ń����[�X�t�@�C������ 

## ビルド�E劁E

- **開発牁E*: ソースマップ付き、E��圧縮
- **本番牁E*: ミニファイ済み、紁E.8KB
- **UserScriptヘッダー**: 自動挿入

## TamperMonkey設宁E

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

## 使用方況E

### 統合ダイアログの起勁E
1. TweetDeckで `.visible-in-contracted-header` 要素をクリチE��
2. 6タブ統合ダイアログが表示されめE
3. 左側のタブで処琁E��イプを選抁E

### 吁E��ブ�E使用方況E

| タチE| 入力形弁E| 侁E| 処琁E�E容 |
|------|----------|-----|----------|
| **フレーズ** | 2斁E��以上�EキーワーチE| `スパム`、`庁E��` | 通常のphrase フィルター追加 |
| **正規表現** | 正規表現パターン | `RT.*セール`、`.*限宁E*` | BTD_regex フィルター追加 |
| **URL** | 完�EなURL | `https://example.com`、`https://t.co/abc123` | URL/t.co処琁E��てphrase追加 |
| **ユーザーキーワーチE* | `ユーザー名\|キーワード` | `spamuser\|庁E��` | BTD_mute_user_keyword追加 |
| **ユーザー正規表現** | ユーザー名パターン | `spam_.*`、`bot[0-9]+` | BTD_user_regex追加�E�重褁E��除後！E|
| **削除** | 正の整数 | `5`、`10` | 持E��数のフィルターめE0秒間隔で削除 |

### 操作手頁E
1. **タブ選抁E*: 左側でミュートタイプを選抁E
2. **冁E��入劁E*: 右側の入力欁E��対象を�E劁E
3. **実行確誁E*: 「実行」�EタンクリチE��で処琁E��姁E
4. **エラー対忁E*: バリチE�Eションエラーは詳細メチE��ージで確誁E

### バリチE�Eション機�E
- **入力形式チェチE��**: 吁E��ブで適刁E��形式かを�E動検証
- **詳細エラーメチE��ージ**: 修正方法と例を含む刁E��りやすい説昁E
- **安�E操佁E*: Enterキーでの誤実行を防止、実行�Eタンのみ有効

## トラブルシューチE��ング

### ビルドエラー
- Node.jsバ�Eジョン確認（推奨: 16+�E�E
- `npm install` で依存関係�Eインスト�Eル
- `npm run clean` でdistクリア後�EビルチE

### 動作しなぁE��吁E
- ブラウザコンソールでエラー確誁E
- TweetDeckのDOM構造変更の可能性
- UserScriptの有効化確誁E

## 貢献・開発

### コード品質
- ESLint設定済み�E�封E���E�E
- ファイルサイズ監視機�E冁E��
- 吁E��ジュールの責務を明確に刁E��

### 封E��の拡張
- TypeScript対応検訁E
- チE��トフレームワーク導�E
- GitHub Actions CI/CD

## ライセンス

MIT License
