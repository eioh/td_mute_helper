import { showError } from '../utils/error-handling.js'

/**
 * TweetDeckのフィルターマネージャーにミュートフィルターを追加する
 * @param {string} key - フィルターのタイプ（'phrase', 'BTD_regex', 'BTD_user_regex'など）
 * @param {string} word - フィルターする内容
 * @returns {boolean} フィルター追加の成功可否
 */
function MutePhrase(key, word) {
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
export function detectMutePattern(word) {
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
export function muteUrl(word) {
  const match = word.match(/https?:\/\/t\.co\/(.+)/)
  if (match && match[1].length > 0) {
    MutePhrase('phrase', match[1])
  }
}

/**
 * 正規表現パターンをミュートフィルターに追加する
 * @param {string} word - /pattern/形式の正規表現
 */
export function muteRegex(word) {
  // 新しいタブシステムから来る場合は既にスラッシュ付き（/pattern/）
  // 従来システムから来る場合もスラッシュ付き
  let regex
  if (word.startsWith('/') && word.endsWith('/')) {
    regex = word.match(/^\/(.+)\/$/)[1]
  } else {
    // フォールバック：スラッシュがない場合はそのまま使用
    regex = word
  }
  MutePhrase('BTD_regex', regex)
}

/**
 * ユーザーキーワードをミュートフィルターに追加する
 * @param {string} word - @@username形式のキーワード
 */
export function muteUserKeyword(word) {
  // 新しいタブシステムから来る場合は既に適切な形式（user|keyword）
  // 従来システムから来る場合は@@プレフィックス付き
  let keyword
  if (word.startsWith('@@')) {
    keyword = word.match(/^@@(.+)/)[1]
  } else {
    keyword = word
  }
  MutePhrase('BTD_mute_user_keyword', keyword)
}

/**
 * ユーザー名の正規表現パターンをミュートフィルターに追加する
 * 重複があれば先に削除してから追加
 * @param {string} word - @username形式のパターン
 */
export async function muteUserRegex(word) {
  const { getDuplication } = await import('./duplication.js')
  const { sleep } = await import('../utils/sleep.js')
  const { DELAY_BETWEEN_OPERATIONS } = await import('../config.js')
  
  const dup = getDuplication()
  if (dup.length > 0) {
    try {
      TD.controller.filterManager.removeFilter(dup[0])
      await sleep(DELAY_BETWEEN_OPERATIONS)
    } catch (error) {
      showError('重複フィルター削除に失敗しました', error)
    }
  }
  
  // 新しいタブシステムから来る場合は既に適切な形式
  // 従来システムから来る場合は@プレフィックス付き
  let username
  if (word.startsWith('@')) {
    username = word.match(/^@(.+)/)[1]
  } else {
    username = word
  }
  MutePhrase('BTD_user_regex', username)
}

/**
 * 通常のフレーズをミュートフィルターに追加する
 * @param {string} word - ミュートするフレーズ
 */
export function mutePhrase(word) {
  MutePhrase('phrase', word)
}