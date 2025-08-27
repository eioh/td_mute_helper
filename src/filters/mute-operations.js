import { showError } from '../utils/error-handling.js'
import { DELAY_BETWEEN_OPERATIONS } from '../config.js'
import { 
  detectMutePattern, 
  muteUrl, 
  muteRegex, 
  muteUserKeyword, 
  muteUserRegex, 
  mutePhrase 
} from './mute-patterns.js'

/**
 * 入力されたワードを解析し、適切なミュートフィルターを追加する
 * @param {*} word - ミュートするワード
 * @returns {Promise<boolean>} フィルター追加の成功可否
 */
export async function addMuteFilter(word) {
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
export function removeMuteFilters(num) {
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