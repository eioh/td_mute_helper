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

    // タイトル横に現在のフィルタ件数を表示（遅延初期化にも対応）
    const countEl = dialog.querySelector('.td-dialog-title-count')
    const refreshCount = () => {
      try {
        if (!countEl) return
        const count = TD.controller.filterManager.getAll()?.length || 0
        countEl.textContent = `(${count}件)`
      } catch (_) {
        // 取得に失敗した場合は無表示のまま
        console.log(
          `[TD Mute Helper] フィルター件数の取得に失敗しました: ${_.message}`
        )
      }
    }
    // 即時 + 少し遅らせて再評価（TDの初期化タイミング対策）
    refreshCount()
    setTimeout(refreshCount, 200)
    setTimeout(refreshCount, 800)

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
        case 'phrase':
          return inputs.phrase
        case 'regex':
          return inputs.regex
        case 'url':
          return inputs.url
        case 'user-keyword':
          return inputs.userKeyword
        case 'user-regex':
          return inputs.userRegex
        case 'remove':
          return inputs.remove
        default:
          return null
      }
    }

    // 指定のURLからユーザー名を抽出するヘルパー
    const extractUsernameFromTwitterUrl = text => {
      try {
        const url = new URL(text)
        const host = (url.hostname || '').toLowerCase()
        if (
          !(
            host === 'twitter.com' ||
            host === 'www.twitter.com' ||
            host === 'x.com' ||
            host === 'www.x.com'
          )
        )
          return null
        const segments = url.pathname.split('/').filter(Boolean)
        if (segments.length === 0) return null
        const username = segments[0]
        if (!/^[A-Za-z0-9_]{1,15}$/.test(username)) return null
        return username
      } catch (_) {
        return null
      }
    }

    // 入力値を検証する関数
    const validateInput = (tab, value) => {
      switch (tab) {
        case 'phrase':
        case 'regex':
        case 'url':
          // URLタブは空チェックのみ。詳細なURL検証はmuteUrl側に委譲
          return value.trim() !== ''
        case 'user-regex': {
          const v = value.trim()
          if (v === '') return false
          if (/^https?:\/\//i.test(v)) {
            const username = extractUsernameFromTwitterUrl(v)
            if (!username) {
              alert(
                '無効なURLです。次の形式で入力してください:\nhttps://twitter.com/<ユーザー名>/... または https://x.com/<ユーザー名>/...'
              )
              return false
            }
          }
          return true
        }
        case 'user-keyword':
          const trimmed = value.trim()
          if (trimmed === '' || !trimmed.includes('|')) {
            return false
          }
          const parts = trimmed.split('|')
          return (
            parts.length === 2 &&
            parts[0].trim() !== '' &&
            parts[1].trim() !== ''
          )
        case 'remove':
          return (
            value.trim() !== '' && !isNaN(Number(value)) && Number(value) > 0
          )
        default:
          return false
      }
    }

    // 入力値を処理用の形式に変換する関数
    const formatInputValue = (tab, value) => {
      const trimmedValue = value.trim()
      switch (tab) {
        case 'phrase':
        case 'url':
        case 'user-keyword':
        case 'user-regex': {
          if (/^https?:\/\//i.test(trimmedValue)) {
            const username = extractUsernameFromTwitterUrl(trimmedValue)
            if (username) return username
          }
          return trimmedValue
        }
        case 'regex':
          return `/${trimmedValue}/`
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

    // 全ての入力フィールドにキーボード操作を追加（Escapeのみ）
    Object.values(inputs).forEach(input => {
      if (input) {
        input.addEventListener('keydown', e => {
          if (e.key === 'Escape') cancelAction()
        })
      }
    })

    // オーバーレイクリックで閉じる
    dialog.addEventListener('click', e => {
      if (e.target === dialog) cancelAction()
    })
  })
}

/**
 * 統合ダイアログを表示し、結果を取得する
 * @returns {Promise<{action: 'add'|'remove', value: string|number}>} アクション結果のPromise
 */
export async function showMuteDialog () {
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
