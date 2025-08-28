import { VERSION, INITIALIZATION_DELAY } from './config.js'
import { initializeDialog } from './dialog/dialog-html.js'
import { showMuteDialog } from './dialog/dialog-controller.js'
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
      // クリックイベント（左クリックのみ、統合ダイアログ表示）
      element.addEventListener('click', async function (e) {
        console.log('[TD Mute Helper] Click event triggered')
        try {
          const currentFilterCount = TD.controller.filterManager.getAll().length
          console.log('[TD Mute Helper] Showing unified dialog')
          
          const result = await showMuteDialog()
          console.log('[TD Mute Helper] Dialog result:', result)
          
          if (result.action === 'add' && result.value) {
            // 新しいタブシステムではtypeプロパティが含まれる
            await addMuteFilter(result.value, result.type)
          } else if (result.action === 'remove' && result.value) {
            removeMuteFilters(result.value)
          }
          
        } catch (error) {
          console.log('[TD Mute Helper] Dialog cancelled or error:', error.message)
        }
      })

      // 右クリック（contextmenu）イベントを無効化
      element.addEventListener('contextmenu', (event) => {
        event.preventDefault()
      })
    })
  }, INITIALIZATION_DELAY)
}