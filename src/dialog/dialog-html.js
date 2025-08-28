import { addDialogStyles } from './dialog-styles.js'

/**
 * カスタムダイアログのHTML構造を作成する
 * @returns {HTMLElement} ダイアログ要素
 */
export function createDialogHTML() {
  const dialogHTML = `
        <div id="td-mute-dialog" class="td-dialog-overlay" style="display: none;">
            <div class="td-dialog-container">
                <div class="td-dialog-header">
                    <h3 class="td-dialog-title">ミュート設定</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-main">
                    <div class="td-dialog-sidebar">
                        <nav class="td-dialog-tabs">
                            <button class="td-dialog-tab active" data-tab="phrase">フレーズ</button>
                            <button class="td-dialog-tab" data-tab="regex">正規表現</button>
                            <button class="td-dialog-tab" data-tab="url">URL</button>
                            <button class="td-dialog-tab" data-tab="user-keyword">ユーザーキーワード</button>
                            <button class="td-dialog-tab" data-tab="user-regex">ユーザー正規表現</button>
                            <button class="td-dialog-tab" data-tab="remove">削除</button>
                        </nav>
                    </div>
                    <div class="td-dialog-content">
                        <div class="td-dialog-body">
                            <div class="tab-content active" id="phrase-tab">
                                <p class="td-dialog-message">ミュートするキーワードを入力してください<br>
                                例: "スパム", "広告"</p>
                                <input type="text" class="td-dialog-input" id="phrase-input" placeholder="キーワードを入力してください" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="regex-tab">
                                <p class="td-dialog-message">正規表現パターンを入力してください<br>
                                例: "RT.*セール", ".*限定.*"<br>
                                <small>※ スラッシュ（/）は不要です</small></p>
                                <input type="text" class="td-dialog-input" id="regex-input" placeholder="正規表現パターンを入力してください" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="url-tab">
                                <p class="td-dialog-message">ミュートするURLを入力してください<br>
                                例: "https://example.com"<br>
                                <small>※ Twitter短縮URL（t.co）も対応します</small></p>
                                <input type="text" class="td-dialog-input" id="url-input" placeholder="URLを入力してください" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="user-keyword-tab">
                                <p class="td-dialog-message">特定ユーザーのキーワードをミュートします<br>
                                形式: "ユーザー名|キーワード"<br>
                                例: "spamuser|広告", "botname|宣伝"<br>
                                <small>※ @マークは不要です。必ず「|」で区切ってください</small></p>
                                <input type="text" class="td-dialog-input" id="user-keyword-input" placeholder="ユーザー名|キーワード" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="user-regex-tab">
                                <p class="td-dialog-message">特定ユーザーを正規表現でミュートします<br>
                                例: "spam_.*", "bot[0-9]+"<br>
                                <small>※ @マークは不要です</small></p>
                                <input type="text" class="td-dialog-input" id="user-regex-input" placeholder="ユーザー名パターンを入力してください" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                            <div class="tab-content" id="remove-tab">
                                <p class="td-dialog-message">削除するフィルター数を入力してください<br>
                                （phrase型フィルターを古い順から削除します）</p>
                                <input type="number" class="td-dialog-input" id="remove-input" placeholder="削除数を入力してください" min="1" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="td-dialog-footer">
                    <button class="td-dialog-cancel">キャンセル</button>
                    <button class="td-dialog-confirm">実行</button>
                </div>
            </div>
        </div>
    `

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = dialogHTML
  return tempDiv.firstElementChild
}

/**
 * 初期化時にダイアログのスタイルを設定する
 */
export function initializeDialog() {
  // CSSスタイルが未追加の場合のみ追加
  if (!document.querySelector('style[data-td-dialog]')) {
    addDialogStyles()
    const styleElement = document.querySelector('style:last-of-type')
    if (styleElement) {
      styleElement.setAttribute('data-td-dialog', 'true')
    }
  }
}