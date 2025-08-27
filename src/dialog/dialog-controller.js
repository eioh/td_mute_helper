import { createDialogHTML } from './dialog-html.js'

/**
 * カスタムダイアログを表示し、ユーザー入力を取得する
 * @param {string} title - ダイアログのタイトル
 * @param {string} message - 表示するメッセージ
 * @param {string} inputType - 入力タイプ ('text' または 'number')
 * @returns {Promise<string|number>} 入力値のPromise
 */
export function showCustomDialog(title, message, inputType = 'text') {
  return new Promise((resolve, reject) => {
    // 既存のダイアログがあれば削除
    let dialog = document.getElementById('td-mute-dialog')
    if (dialog) {
      dialog.remove()
    }

    // 新しいダイアログを作成
    dialog = createDialogHTML()
    document.body.appendChild(dialog)

    // ダイアログの各要素を取得
    const titleElement = dialog.querySelector('.td-dialog-title')
    const messageElement = dialog.querySelector('.td-dialog-message')
    const inputElement = dialog.querySelector('.td-dialog-input')
    const cancelButton = dialog.querySelector('.td-dialog-cancel')
    const confirmButton = dialog.querySelector('.td-dialog-confirm')
    const closeButton = dialog.querySelector('.td-dialog-close')

    // タイトルとメッセージを設定
    titleElement.textContent = title
    messageElement.textContent = message

    // 入力タイプを設定
    inputElement.type = inputType
    if (inputType === 'number') {
      inputElement.placeholder = '数値を入力してください'
    }

    // ダイアログを表示
    dialog.style.display = 'flex'

    // 入力フィールドにフォーカス
    setTimeout(() => inputElement.focus(), 100)

    // クリーンアップ関数
    const cleanup = () => {
      dialog.remove()
    }

    // OKボタンのイベント
    const handleConfirm = () => {
      const value = inputElement.value.trim()
      if (value === '') {
        inputElement.focus()
        return
      }

      // 数値タイプの場合は数値検証
      if (inputType === 'number' && isNaN(Number(value))) {
        inputElement.focus()
        return
      }

      cleanup()
      resolve(inputType === 'number' ? Number(value) : value)
    }

    // キャンセルボタンのイベント
    const handleCancel = () => {
      cleanup()
      reject(new Error('User cancelled'))
    }

    // イベントリスナーを設定
    confirmButton.addEventListener('click', handleConfirm)
    cancelButton.addEventListener('click', handleCancel)
    closeButton.addEventListener('click', handleCancel)

    // Enterキーで確定、Escapeキーでキャンセル
    inputElement.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handleConfirm()
      } else if (e.key === 'Escape') {
        handleCancel()
      }
    })

    // オーバーレイクリックでキャンセル
    dialog.addEventListener('click', e => {
      if (e.target === dialog) {
        handleCancel()
      }
    })
  })
}

/**
 * window.prompt()の代替となるカスタムダイアログ
 * @param {string} message - 表示するメッセージ
 * @param {string} defaultValue - デフォルト値
 * @param {string} inputType - 入力タイプ ('text' または 'number')
 * @returns {Promise<string|null>} 入力値またはnull（キャンセル時）
 */
export async function customPrompt(message, defaultValue = '', inputType = 'text') {
  console.log('[TD Mute Helper] customPrompt called with:', { message, defaultValue, inputType })
  try {
    const result = await showCustomDialog('入力', message, inputType)
    console.log('[TD Mute Helper] showCustomDialog resolved with:', result)
    return result.toString()
  } catch (error) {
    console.log('[TD Mute Helper] showCustomDialog rejected:', error.message)
    // キャンセルされた場合
    return null
  }
}