# ファイル分割実装計画

## 現状分析
- **現在のファイルサイズ**: main.js（557行）
- **主要機能**: HTMLダイアログ、ミュートフィルター処理、初期化
- **問題**: 1ファイルが長くなり保守性が低下

## 採用方針
**Node.js + esbuild + dist分離方式**

### 理由
- 自分専用なので柔軟性重視
- dist/main.jsでテスト → main.jsにデプロイの2段階運用
- 高速ビルド（esbuild）
- 将来のTypeScript対応可能

## 最終ディレクトリ構成

```
td_mute_helper/
├── src/                     # 開発用ソースファイル
│   ├── main.js             # エントリーポイント（30行）
│   ├── config.js           # VERSION, DELAY等の定数（20行）
│   ├── utils/
│   │   ├── sleep.js        # sleep関数（10行）
│   │   └── error-handling.js # showError（20行）
│   ├── dialog/
│   │   ├── dialog-html.js  # createDialogHTML（50行）
│   │   ├── dialog-styles.js # addDialogStyles（100行）
│   │   └── dialog-controller.js # showCustomDialog, customPrompt（100行）
│   ├── filters/
│   │   ├── mute-patterns.js # detectMutePattern, 各mute関数（150行）
│   │   ├── mute-operations.js # addMuteFilter, removeMuteFilters（100行）
│   │   └── duplication.js  # getDuplication（30行）
│   └── initialization.js   # イベント設定・初期化（50行）
├── dist/                   # ビルド成果物（gitignore対象）
│   └── main.js            # バンドル済みファイル
├── plan/                  # 実装計画・ドキュメント
│   ├── file-splitting-plan.md
│   └── build-process.md
├── main.js                # 現在のファイル（リリース用最終版）
├── package.json
├── .gitignore
└── README.md
```

## 開発フロー

### npm scripts設定
```json
{
  "scripts": {
    "dev": "esbuild src/main.js --bundle --watch --outfile=dist/main.js --sourcemap",
    "build": "esbuild src/main.js --bundle --outfile=dist/main.js --minify",
    "deploy": "cp dist/main.js main.js",
    "clean": "rm -rf dist/*"
  }
}
```

### 作業フロー
1. **開発**: `src/`ディレクトリで分割ファイルを編集
2. **テスト**: `npm run dev`でdist/main.jsを生成、TamperMonkeyでテスト
3. **ビルド**: `npm run build`で最適化版をdist/main.jsに出力
4. **デプロイ**: `npm run deploy`でmain.jsに反映、Gitコミット

## ファイル分割の方針

### 1. エントリーポイント（src/main.js）
```javascript
// UserScript header
// 各モジュールのimport
// IIFEでラップ
```

### 2. 設定・定数（src/config.js）
```javascript
export const VERSION = '0.4'
export const DELAY_BETWEEN_OPERATIONS = 20 * 1000
export const INITIALIZATION_DELAY = 30 * 1000
```

### 3. ユーティリティ（src/utils/）
- **sleep.js**: Promise-based delay function
- **error-handling.js**: showError function

### 4. ダイアログ関連（src/dialog/）
- **dialog-html.js**: createDialogHTML, initializeDialog
- **dialog-styles.js**: addDialogStyles, CSS定義
- **dialog-controller.js**: showCustomDialog, customPrompt

### 5. フィルター機能（src/filters/）
- **mute-patterns.js**: detectMutePattern, muteUrl, muteRegex等
- **mute-operations.js**: addMuteFilter, removeMuteFilters
- **duplication.js**: getDuplication

### 6. 初期化（src/initialization.js）
- イベントリスナー設定
- setTimeout処理
- TweetDeck連携

## 移行手順

### Phase 1: 環境構築
1. package.jsonとesbuild設定
2. .gitignore設定
3. ディレクトリ構造作成

### Phase 2: ファイル分割
1. 現在のmain.jsをバックアップ
2. src/ディレクトリに機能別ファイル作成
3. 各モジュールのexport/import設定

### Phase 3: ビルドシステム構築
1. esbuild設定
2. npm scripts定義
3. 動作テスト

### Phase 4: 検証・調整
1. dist/main.jsでの動作確認
2. デバッグログの調整
3. 最終テスト

## 期待される効果

### 開発効率向上
- 各ファイルのサイズが適切（10-150行）
- 機能ごとの責務が明確
- 並行開発が可能

### 保守性向上
- 変更影響範囲の限定
- テストコードの記述が容易
- ドキュメント化の促進

### 拡張性向上
- 新機能の追加が容易
- TypeScript移行の準備
- テストフレームワーク導入の土台