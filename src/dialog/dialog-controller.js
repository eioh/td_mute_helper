import { createDialogHTML } from './dialog-html.js'

/**
 * タブ機能付きダイアログを表示し、ユーザー入力を取得する
 * @returns {Promise<{action: 'add'|'remove', value: string|number}>} アクション結果のPromise
 */
export function showCustomDialog () {
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
    const cancelButton = dialog.querySelector('.td-dialog-cancel')
    const confirmButton = dialog.querySelector('.td-dialog-confirm')
    const closeButton = dialog.querySelector('.td-dialog-close')
    const tabs = dialog.querySelectorAll('.td-dialog-tab')
    const tabContents = dialog.querySelectorAll('.tab-content')
    
    // 各タブの入力フィールドを取得
    const inputs = {
      phrase: dialog.querySelector('#phrase-input'),
      regex: dialog.querySelector('#regex-input'),
      url: dialog.querySelector('#url-input'),
      userKeyword: dialog.querySelector('#user-keyword-input'),
      userRegex: dialog.querySelector('#user-regex-input'),
      remove: dialog.querySelector('#remove-input')
    }

    let currentTab = 'phrase'

    // タブ切り替え処理
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab
        currentTab = tabName
        
        // タブの状態更新
        tabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')
        
        // コンテンツの表示切り替え
        tabContents.forEach(content => {
          content.classList.remove('active')
        })
        dialog.querySelector(`#${tabName}-tab`).classList.add('active')
        
        // 対応する入力フィールドにフォーカス
        const activeInput = getCurrentInput()
        if (activeInput) {
          setTimeout(() => activeInput.focus(), 100)
        }
      })
    })

    // 現在のタブの入力フィールドを取得する関数
    const getCurrentInput = () => {
      switch (currentTab) {
        case 'phrase': return inputs.phrase
        case 'regex': return inputs.regex
        case 'url': return inputs.url
        case 'user-keyword': return inputs.userKeyword
        case 'user-regex': return inputs.userRegex
        case 'remove': return inputs.remove
        default: return null
      }
    }

    // 入力値を検証する関数
    const validateInput = (tab, value) => {
      switch (tab) {
        case 'phrase':
        case 'regex':
        case 'url':
        case 'user-keyword':
        case 'user-regex':
          return value.trim() !== ''
        case 'remove':
          return value.trim() !== '' && !isNaN(Number(value)) && Number(value) > 0
        default:
          return false
      }
    }

    // 入力値を処理用の形式に変換する関数
    const formatInputValue = (tab, value) => {
      const trimmedValue = value.trim()
      switch (tab) {
        case 'phrase':
          return trimmedValue
        case 'regex':
          return `/${trimmedValue}/`
        case 'url':
          return trimmedValue
        case 'user-keyword':
          return `@@${trimmedValue}`
        case 'user-regex':
          return `@${trimmedValue}`
        case 'remove':
          return Number(trimmedValue)
        default:
          return trimmedValue
      }
    }

    // ダイアログを表示
    dialog.style.display = 'flex'
    
    // 最初の入力欄にフォーカス
    setTimeout(() => inputs.phrase.focus(), 100)

    // 閉じる処理
    const closeDialog = () => {
      dialog.remove()
    }

    // 確定処理
    const confirmAction = () => {
      const currentInput = getCurrentInput()
      if (!currentInput) return

      const inputValue = currentInput.value
      
      if (!validateInput(currentTab, inputValue)) {
        currentInput.focus()
        return
      }

      closeDialog()
      
      if (currentTab === 'remove') {
        resolve({ action: 'remove', value: Number(inputValue.trim()) })
      } else {
        const formattedValue = formatInputValue(currentTab, inputValue)
        resolve({ action: 'add', value: formattedValue, type: currentTab })
      }
    }

    // キャンセル処理
    const cancelAction = () => {
      closeDialog()
      reject(new Error('User cancelled'))
    }

    // イベントリスナー
    confirmButton.addEventListener('click', confirmAction)
    cancelButton.addEventListener('click', cancelAction)
    closeButton.addEventListener('click', cancelAction)

    // 全ての入力フィールドにキーボード操作を追加
    Object.values(inputs).forEach(input => {
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') confirmAction()
          else if (e.key === 'Escape') cancelAction()
        })
      }
    })

    // オーバーレイクリックで閉じる
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) cancelAction()
    })
  })
}

/**
 * 統合ダイアログを表示し、結果を取得する
 * @returns {Promise<{action: 'add'|'remove', value: string|number}>} アクション結果のPromise
 */
export async function showMuteDialog() {
  console.log('[TD Mute Helper] showMuteDialog called')
  try {
    const result = await showCustomDialog()
    console.log('[TD Mute Helper] showCustomDialog resolved with:', result)
    return result
  } catch (error) {
    console.log('[TD Mute Helper] showCustomDialog rejected:', error.message)
    throw error
  }
}
