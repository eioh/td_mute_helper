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
    const addInput = dialog.querySelector('#add-input')
    const removeInput = dialog.querySelector('#remove-input')

    let currentTab = 'add'

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
      })
    })

    // ダイアログを表示
    dialog.style.display = 'flex'
    
    // 最初の入力欄にフォーカス
    setTimeout(() => addInput.focus(), 100)

    // 閉じる処理
    const closeDialog = () => {
      dialog.remove()
    }

    // 確定処理
    const confirmAction = () => {
      if (currentTab === 'add') {
        const keyword = addInput.value.trim()
        if (keyword === '') {
          addInput.focus()
          return
        }
        closeDialog()
        resolve({ action: 'add', value: keyword })
      } else if (currentTab === 'remove') {
        const count = removeInput.value.trim()
        if (count === '' || isNaN(Number(count)) || Number(count) <= 0) {
          removeInput.focus()
          return
        }
        closeDialog()
        resolve({ action: 'remove', value: Number(count) })
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

    // キーボード操作
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') confirmAction()
      else if (e.key === 'Escape') cancelAction()
    })

    removeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') confirmAction()
      else if (e.key === 'Escape') cancelAction()
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
