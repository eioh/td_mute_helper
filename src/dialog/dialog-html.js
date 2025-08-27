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
                    <h3 class="td-dialog-title">キーワード入力ダイアログ</h3>
                    <button class="td-dialog-close">&times;</button>
                </div>
                <div class="td-dialog-body">
                    <p class="td-dialog-message">キーワードを入力してください</p>
                    <input type="text" class="td-dialog-input" placeholder="入力してください">
                </div>
                <div class="td-dialog-footer">
                    <button class="td-dialog-cancel">キャンセル</button>
                    <button class="td-dialog-confirm">OK</button>
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