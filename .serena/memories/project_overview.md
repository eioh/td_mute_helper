# TD Mute Helper プロジェクト概要

## プロジェクトの目的
TweetDeck用のTamperMonkeyスクリプト。ミュートフィルターの管理を簡単にするユーザースクリプト。

## 主要機能
- URLパターン、正規表現、ユーザーキーワード等の自動検出と適切なフィルター追加
- 一括ミュートフィルター削除機能
- 重複フィルター検出と管理
- TweetDeckの既存UIに統合（ヘッダー要素のクリック/右クリックイベント）

## 技術スタック
- **言語**: JavaScript (ES6+)
- **実行環境**: TamperMonkey (ブラウザ拡張)
- **依存関係**: TweetDeckの `TD.controller.filterManager` API
- **テスト**: Node.js で単体テスト実行可能

## プロジェクト構造
```
td_mute_helper/
├── main.js          # メインスクリプト（TamperMonkey用）
├── test.js          # 単体テスト
├── CLAUDE.md        # プロジェクト指示書・設定
├── .gitignore       # Git除外ファイル設定
└── README.md        # （存在しない）
```

## 配布方法
GitHub Rawファイル経由でTamperMonkeyに自動更新配信