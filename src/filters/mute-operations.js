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
export async function addMuteFilter(word, type = null) {
  try {
    // 新しいタブシステムからtypeが指定されている場合は直接処理
    if (type) {
      switch (type) {
        case 'phrase':
          mutePhrase(word)
          break
        case 'regex':
          muteRegex(word)
          break
        case 'url':
          muteUrl(word)
          break
        case 'user-keyword':
          muteUserKeyword(word)
          break
        case 'user-regex':
          await muteUserRegex(word)
          break
        default:
          mutePhrase(word)
          break
      }
    } else {
      // 従来の自動判定を使用（後方互換性のため）
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
    }

    return true
  } catch (error) {
    // バリデーションエラーの場合は詳細なメッセージを表示
    if (error.message.includes('形式が正しくありません') || 
        error.message.includes('が空です') || 
        error.message.includes('が短すぎます') ||
        error.message.includes('が無効です') ||
        error.message.includes('無効なURL形式') ||
        error.message.includes('無効な正規表現')) {
      showError('入力形式エラー', error)
    } else {
      // その他のエラー（システムエラーなど）
      showError(
        `ミュートフィルター追加処理でエラーが発生しました: "${word}"`,
        error
      )
    }
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