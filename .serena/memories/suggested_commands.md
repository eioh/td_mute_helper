# 推奨コマンド

## Windows環境での基本コマンド
```powershell
# ディレクトリ一覧
dir
ls  # PowerShell 5.0+ または Git Bash

# ファイル内容表示
type filename.txt
cat filename.txt  # Git Bash

# ファイル検索
findstr "pattern" *.js
grep "pattern" *.js  # Git Bash

# ディレクトリ移動
cd path\to\directory
```

## テスト実行
```bash
node test.js
```

## Git操作
```bash
# 状態確認
git status

# 変更をステージング
git add main.js

# コミット（日本語説明 + 英語プレフィックス）
git commit -m "fix: エラーハンドリング機能を改善"

# リモートにプッシュ
git push origin main
```

## ファイル操作
```bash
# ファイル編集（推奨エディタ）
code main.js          # VS Code
notepad main.js       # メモ帳

# ファイルバックアップ
copy main.js main.js.bak
```

## TamperMonkey開発
1. main.js を編集
2. TamperMonkeyダッシュボードでスクリプト更新
3. TweetDeckで動作確認

## 重要な注意点
- Node.js は開発/テスト用のみ（package.json なし）
- 実際の実行環境はブラウザ内TamperMonkey
- リンター/フォーマッター設定なし（手動コードレビュー）