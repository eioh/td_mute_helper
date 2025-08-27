// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.4
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL   https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// ==/UserScript==

;(function () {
  'use strict'

  const VERSION = '0.4'
  const DELAY_BETWEEN_OPERATIONS = 20 * 1000 // 20秒
  const INITIALIZATION_DELAY = 30 * 1000 // 30秒

  /**
   * 指定したミリ秒だけ処理を停止する
   * @param {number} ms - 停止する時間（ミリ秒）
   * @returns {Promise<void>} 指定時間後にresolveされるPromise
   */
  const sleep = ms => new Promise(res => setTimeout(res, ms))

  /**
   * エラーメッセージをコンソールとアラートで表示する
   * @param {string} message - 表示するエラーメッセージ
   * @param {Error} error - エラーオブジェクト
   */
  function showError (message, error) {
    console.error(`[TD Mute Helper] ${message}:`, error)
    // ユーザーには簡潔なメッセージを表示
    alert(`エラーが発生しました: ${message}`)
  }

  /**
   * カスタムダイアログのHTML構造を作成する
   * @returns {HTMLElement} ダイアログ要素
   */
  function createDialogHTML () {
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
   * ダイアログのCSSスタイルを追加する
   */
  function addDialogStyles () {
    const styles = `
        .td-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .td-dialog-container {
            background: #15202b;
            border: 1px solid #38444d;
            border-radius: 8px;
            min-width: 400px;
            max-width: 500px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .td-dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #38444d;
        }

        .td-dialog-title {
            color: #fff;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .td-dialog-close {
            background: none;
            border: none;
            color: #8b98a5;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .td-dialog-close:hover {
            color: #fff;
        }

        .td-dialog-body {
            padding: 20px;
        }

        .td-dialog-message {
            color: #8b98a5;
            margin: 0 0 16px 0;
            font-size: 14px;
        }

        .td-dialog-input {
            width: 100%;
            padding: 12px;
            background: #192734;
            border: 1px solid #38444d;
            border-radius: 6px;
            color: #fff;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;
        }

        .td-dialog-input:focus {
            border-color: #1d9bf0;
        }

        .td-dialog-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding: 16px 20px;
            border-top: 1px solid #38444d;
        }

        .td-dialog-cancel, .td-dialog-confirm {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            min-width: 80px;
        }

        .td-dialog-cancel {
            background: transparent;
            color: #8b98a5;
            border: 1px solid #38444d;
        }

        .td-dialog-cancel:hover {
            background: #1c2732;
        }

        .td-dialog-confirm {
            background: #1d9bf0;
            color: #fff;
        }

        .td-dialog-confirm:hover {
            background: #1a8cd8;
        }

        .td-dialog-confirm:disabled {
            background: #3c4043;
            color: #5f6368;
            cursor: not-allowed;
        }
    `

    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
  }

  /**
   * カスタムダイアログを表示し、ユーザー入力を取得する
   * @param {string} title - ダイアログのタイトル
   * @param {string} message - 表示するメッセージ
   * @param {string} inputType - 入力タイプ ('text' または 'number')
   * @returns {Promise<string|number>} 入力値のPromise
   */
  function showCustomDialog (title, message, inputType = 'text') {
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
   * 初期化時にダイアログのスタイルを設定する
   */
  function initializeDialog () {
    // CSSスタイルが未追加の場合のみ追加
    if (!document.querySelector('style[data-td-dialog]')) {
      addDialogStyles()
      const styleElement = document.querySelector('style:last-of-type')
      if (styleElement) {
        styleElement.setAttribute('data-td-dialog', 'true')
      }
    }
  }

  /**
   * window.prompt()の代替となるカスタムダイアログ
   * @param {string} message - 表示するメッセージ
   * @param {string} defaultValue - デフォルト値
   * @param {string} inputType - 入力タイプ ('text' または 'number')
   * @returns {Promise<string|null>} 入力値またはnull（キャンセル時）
   */
  async function customPrompt (message, defaultValue = '', inputType = 'text') {
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

  /**
   * TweetDeckのフィルターマネージャーにミュートフィルターを追加する
   * @param {string} key - フィルターのタイプ（'phrase', 'BTD_regex', 'BTD_user_regex'など）
   * @param {string} word - フィルターする内容
   * @returns {boolean} フィルター追加の成功可否
   */
  function MutePhrase (key, word) {
    try {
      TD.controller.filterManager.addFilter(key, word)
    } catch (error) {
      showError(`フィルター追加に失敗しました (${key}: ${word})`, error)
      return false
    }
    return true
  }

  /**
   * 入力されたワードからミュートパターンの種類を判定する
   * @param {string} word - 判定対象のワード
   * @returns {string} パターンタイプ（'url', 'regex', 'userKeyword', 'userRegex', 'phrase'）
   */
  function detectMutePattern (word) {
    if (word.match(/https?:\/\/t\.co\/(.+)/)) {
      return 'url'
    } else if (word.match(/^\/.+\/$/)) {
      return 'regex'
    } else if (word.match(/^@@.+/)) {
      return 'userKeyword'
    } else if (word.match(/^@.+/)) {
      return 'userRegex'
    } else {
      return 'phrase'
    }
  }

  /**
   * t.coのURLをミュートフィルターに追加する
   * @param {string} word - https://t.co/形式のURL
   */
  function muteUrl (word) {
    const match = word.match(/https?:\/\/t\.co\/(.+)/)
    if (match && match[1].length > 0) {
      MutePhrase('phrase', match[1])
    }
  }

  /**
   * 正規表現パターンをミュートフィルターに追加する
   * @param {string} word - /pattern/形式の正規表現
   */
  function muteRegex (word) {
    const regex = word.match(/^\/(.+)\/$/)[1]
    MutePhrase('BTD_regex', regex)
  }

  /**
   * ユーザーキーワードをミュートフィルターに追加する
   * @param {string} word - @@username形式のキーワード
   */
  function muteUserKeyword (word) {
    const keyword = word.match(/^@@(.+)/)[1]
    MutePhrase('BTD_mute_user_keyword', keyword)
  }

  /**
   * ユーザー名の正規表現パターンをミュートフィルターに追加する
   * 重複があれば先に削除してから追加
   * @param {string} word - @username形式のパターン
   */
  async function muteUserRegex (word) {
    const dup = getDuplication()
    if (dup.length > 0) {
      try {
        TD.controller.filterManager.removeFilter(dup[0])
        await sleep(DELAY_BETWEEN_OPERATIONS)
      } catch (error) {
        showError('重複フィルター削除に失敗しました', error)
      }
    }
    const username = word.match(/^@(.+)/)[1]
    MutePhrase('BTD_user_regex', username)
  }

  /**
   * 通常のフレーズをミュートフィルターに追加する
   * @param {string} word - ミュートするフレーズ
   */
  function mutePhrase (word) {
    MutePhrase('phrase', word)
  }

  /**
   * 入力されたワードを解析し、適切なミュートフィルターを追加する
   * @param {*} word - ミュートするワード
   * @returns {Promise<boolean>} フィルター追加の成功可否
   */
  async function addMuteFilter (word) {
    try {
      const pattern = detectMutePattern(word)

      switch (pattern) {
        case 'url':
          muteUrl(word)
          break
        case 'regex':
          muteRegex(word)
          break
        case 'userKeyword':
          muteUserKeyword(word)
          break
        case 'userRegex':
          await muteUserRegex(word)
          break
        case 'phrase':
        default:
          mutePhrase(word)
          break
      }

      return true
    } catch (error) {
      showError(
        `ミュートフィルター追加処理でエラーが発生しました: "${word}"`,
        error
      )
      return false
    }
  }

  /**
   * 指定された数だけミュートフィルターを削除する
   * @param {*} num - 削除するフィルターの数
   * @returns {void}
   */
  function removeMuteFilters (num) {
    if (num <= 0) return

    try {
      var all = TD.controller.filterManager.getAll()
      var words = all.filter(function (v) {
        return v.type == 'phrase' // && v.value.match(/^[a-zA-Z0-9]{10}$/)
      })

      if (words.length === 0) {
        console.log('削除対象のフィルターがありません')
        return
      }

      var r = words[0]
      console.log(num)
      console.log(words.length + '/' + all.length)
      TD.controller.filterManager.removeFilter(r)

      setTimeout(function () {
        removeMuteFilters(num - 1)
      }, DELAY_BETWEEN_OPERATIONS)
    } catch (error) {
      showError(`フィルター削除に失敗しました (残り${num}個)`, error)
    }
  }

  /**
   * 重複しているミュートフィルターを取得する
   * @returns {Array} 重複しているフィルターのリスト
   */
  function getDuplication () {
    try {
      const list = TD.controller.filterManager.getAll()
      const len = list.length
      const ret = []
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (list[i].type == list[j].type && list[i].value == list[j].value) {
            ret.push(list[i])
          }
        }
      }
      return ret
    } catch (error) {
      showError('重複フィルター検索に失敗しました', error)
      return []
    }
  }

  setTimeout(function () {
    console.log('loaded')
    console.log(`[TD Mute Helper] version ${VERSION} loaded`)

    // ダイアログ初期化
    initializeDialog()

    // jQuery の $('.visible-in-contracted-header') をネイティブJSに置換
    const elements = document.querySelectorAll('.visible-in-contracted-header')

    elements.forEach(element => {
      // クリックイベント
      element.addEventListener('click', async function (e) {
        console.log('[TD Mute Helper] Click event triggered')
        try {
          var len = TD.controller.filterManager.getAll().length
          console.log('[TD Mute Helper] Showing dialog for mute filter input')
          var res = await customPrompt(`入力(${len})`, '', 'text')
          console.log('[TD Mute Helper] Dialog result:', res)
          if (res && res.length > 0) {
            addMuteFilter(res).then(v => {})
          }
        } catch (error) {
          console.error('[TD Mute Helper] Error in click handler:', error)
        }
      })

      // 右クリック（コンテキストメニュー）イベント
      element.addEventListener('contextmenu', async function (e) {
        var res = await customPrompt('削除する数を入力', '', 'number')
        if (res && !isNaN(res)) {
          removeMuteFilters(Number(res))
        }
      })
    })
  }, INITIALIZATION_DELAY)

  // Node.js環境でのテスト用エクスポート
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectMutePattern }
  }
})()
