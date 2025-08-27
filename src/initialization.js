import { VERSION, INITIALIZATION_DELAY } from './config.js'
import { initializeDialog } from './dialog/dialog-html.js'
import { customPrompt } from './dialog/dialog-controller.js'
import { addMuteFilter, removeMuteFilters } from './filters/mute-operations.js'

/**
 * アプリケーションの初期化処理
 */
export function initialize() {
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
}