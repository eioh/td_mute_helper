# ビルドプロセス詳細設計

## esbuild設定

### 基本設定
```javascript
// esbuild.config.js
const esbuild = require('esbuild')

const baseConfig = {
  entryPoints: ['src/main.js'],
  bundle: true,
  platform: 'browser',
  target: 'es2017',
  format: 'iife',
}

// 開発用設定
const devConfig = {
  ...baseConfig,
  outfile: 'dist/main.js',
  sourcemap: true,
  watch: true,
}

// 本番用設定
const prodConfig = {
  ...baseConfig,
  outfile: 'dist/main.js',
  minify: true,
  treeShaking: true,
}
```

### UserScript Headerの処理

TamperMonkeyのheaderをビルド時に自動挿入：

```javascript
const banner = `// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.4
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck  
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// ==/UserScript==`

const configWithBanner = {
  ...prodConfig,
  banner: {
    js: banner
  }
}
```

## package.json設定

```json
{
  "name": "td_mute_helper",
  "version": "0.4.0",
  "description": "TweetDeck mute helper TamperMonkey script",
  "scripts": {
    "dev": "node build.js --mode=dev",
    "build": "node build.js --mode=prod", 
    "deploy": "cp dist/main.js main.js",
    "backup": "cp main.js main.backup.js",
    "clean": "rm -rf dist/*",
    "test": "node test.js"
  },
  "devDependencies": {
    "esbuild": "^0.19.0"
  }
}
```

## .gitignore設定

```
# Build outputs
dist/
*.backup.js

# Dependencies
node_modules/

# Logs
*.log

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

## build.js（カスタムビルドスクリプト）

```javascript
const esbuild = require('esbuild')
const fs = require('fs')

const mode = process.argv.includes('--mode=prod') ? 'prod' : 'dev'

const banner = fs.readFileSync('src/userscript-header.txt', 'utf8')

const config = {
  entryPoints: ['src/main.js'],
  bundle: true,
  platform: 'browser', 
  target: 'es2017',
  format: 'iife',
  outfile: 'dist/main.js',
  banner: {
    js: banner
  }
}

if (mode === 'dev') {
  config.sourcemap = true
  config.watch = {
    onRebuild(error) {
      if (error) {
        console.error('Build failed:', error)
      } else {
        console.log('Build succeeded')
      }
    }
  }
} else {
  config.minify = true
  config.treeShaking = true
}

esbuild.build(config).catch(() => process.exit(1))
```

## デプロイ手順

### 日常的な開発
```bash
# 1. 開発モードで起動（ファイル監視）
npm run dev

# 2. src/内のファイルを編集
# → 自動でdist/main.jsがビルドされる

# 3. TamperMonkeyでdist/main.jsをテスト
```

### リリース準備
```bash
# 1. 最終ビルド
npm run build

# 2. 動作確認（dist/main.js）

# 3. デプロイ
npm run deploy

# 4. Gitコミット
git add .
git commit -m "update: ファイル分割後のリリース"
git push
```

## 品質管理

### ファイルサイズ監視
```javascript
// build.js内に追加
const stats = fs.statSync('dist/main.js')
const sizeKB = (stats.size / 1024).toFixed(1)
console.log(`Bundle size: ${sizeKB} KB`)

if (sizeKB > 100) {
  console.warn('Warning: Bundle size is large')
}
```

### 構文チェック
```bash
# ESLintの追加も検討
npm install --save-dev eslint
```

## 今後の拡張ポイント

### TypeScript対応
```bash
npm install --save-dev typescript
# esbuildはTypeScriptをネイティブサポート
```

### テスト環境
```javascript
// Jest等のテストフレームワーク導入
// 各モジュールの単体テスト
```

### 自動化
```bash
# GitHub Actionsでの自動ビルド・テスト
# pre-commitフックでの品質チェック
```