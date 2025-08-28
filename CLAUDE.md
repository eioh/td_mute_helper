# CLAUDE.md

TweetDeckミュート拡張TamperMonkeyスクリプト

## 概要
TamperMonkey用スクリプト
TamperMokey側の記述は以下の通り。
``` js
// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version <version>
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/dist/main.js
// ==/UserScript==
```

## 主要関数
- `addMuteFilter(word)`: URL/正規表現/ユーザーパターンを処理してミュートフィルターを追加
- `removeMuteFilters(num)`: フィルター一括削除（20秒間隔）
- `getDuplication()`: 重複フィルター検索

## 実行環境
- TweetDeckの`TD.controller.filterManager`に依存
- 日本語UI

## AI回答設定
- 日本語で回答すること

## ブランチ運用ルール

### ブランチ構成
- **main**: リリース専用ブランチ（本番環境）
  - TamperMonkeyユーザーが直接ダウンロードするスクリプトを配信
  - developからのマージのみ許可
  - 直接コミット禁止
  - 十分にテスト済みの安定したコードのみ

- **develop**: 開発メインブランチ
  - 新機能開発・バグ修正・リファクタリングを実施
  - 機能ブランチからのマージを受け入れ
  - mainへのマージ前に動作確認とテストを実施

- **feature/xxx**: 機能開発ブランチ（任意）
  - 大きな機能追加時に使用
  - developから分岐、developにマージ
  - 完了後は削除

### 運用フロー
1. **通常の開発**: developブランチで作業
2. **大きな機能**: feature/xxxブランチを作成→develop
3. **リリース**: developで十分テスト→mainにマージ
4. **緊急修正**: develop→テスト→main（hotfixブランチは必要に応じて）

### マージルール
- **main**: developからのPull Requestのみ
- **develop**: 直接コミットまたはfeatureブランチからのマージ
- マージ前に動作確認必須（TweetDeck環境でのテスト）

### リリース手順
1. developブランチでテスト完了
2. mainにPull Request作成
3. 最終動作確認
4. mainにマージ
5. GitHubのraw URLから自動更新配信

### ブランチ保護とマージルールの推奨設定

#### mainブランチ保護設定（GitHub）
```
Settings > Branches > Add rule
- Branch name pattern: main
- Restrict pushes that create files: チェック
- Require a pull request before merging: チェック
  - Require approvals: 1 (ソロ開発の場合は0でも可)
  - Dismiss stale reviews: チェック
- Require status checks: チェック（CIがある場合）
- Require linear history: チェック（推奨）
- Include administrators: チェック
```

#### 推奨GitHubワークフロー
1. **日常開発**: developブランチで作業・コミット・プッシュ
2. **リリース準備**: developで最終テスト完了後
3. **リリースPR**: develop → main のPull Request作成
4. **レビュー**: PR内容確認とTweetDeck環境での動作テスト
5. **マージ**: Squash and mergeまたはMerge commit
6. **確認**: main更新後、TamperMonkeyが`dist/main.js`から自動更新することを確認

### 緊急時のhotfix運用
- 本番（main）で緊急バグ発見時
- `hotfix/issue-name` ブランチをmainから作成
- 修正後、mainとdevelopの両方にマージ

## コミットメッセージルール
- プレフィックスは英語 (add, fix, refactor, update等)
- 説明部分は日本語
- 例
```
add: 新機能の実装
fix: バグ修正とエラーハンドリング追加
refactor: 関数を分割してコードを整理
update: 依存関係を最新バージョンに更新
```