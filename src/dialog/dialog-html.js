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
                <div class="td-dialog-tabs">
                    <button class="td-dialog-tab active" data-tab="add">追加</button>
                    <button class="td-dialog-tab" data-tab="remove">削除</button>
                </div>
                <div class="td-dialog-body">
                    <div class="tab-content active" id="add-tab">
                        <p class="td-dialog-message">ミュートするキーワードを入力してください<br>
                        ・通常のキーワード: "example"<br>
                        ・正規表現: "/pattern/"<br>
                        ・ユーザーキーワード: "@@username"<br>
                        ・ユーザー正規表現: "@username"<br>
                        ・URLショートリンク: "https://t.co/..."</p>
                        <input type="text" class="td-dialog-input" id="add-input" placeholder="キーワードを入力してください" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
                    </div>
                    <div class="tab-content" id="remove-tab">
                        <p class="td-dialog-message">削除するフィルター数を入力してください<br>
                        （phrase型フィルターを古い順から削除します）</p>
                        <input type="number" class="td-dialog-input" id="remove-input" placeholder="削除数を入力してください" min="1" autocomplete="off" data-lpignore="true" data-form-type="other" data-1p-ignore>
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