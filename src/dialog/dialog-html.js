import dialogHTML from './dialog.html'
import styles from './dialog.css'

/**
 * カスタムダイアログのHTML構造を作成する
 * @returns {HTMLElement} ダイアログ要素
 */
export function createDialogHTML() {
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
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    styleElement.setAttribute('data-td-dialog', 'true')
    document.head.appendChild(styleElement)
  }
}

