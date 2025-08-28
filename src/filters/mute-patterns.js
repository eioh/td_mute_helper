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
  try {
    // URLの基本的なバリデーション
    if (!word || word.trim() === '') {
      throw new Error('URLが空です。\n有効なURLを入力してください。\n例: "https://example.com"')
    }
    
    // 基本的なURL形式チェック
    try {
      new URL(word)
    } catch (urlError) {
      // t.co形式の特別チェック
      const match = word.match(/https?:\/\/t\.co\/(.+)/)
      if (!match || !match[1] || match[1].length === 0) {
        throw new Error(`無効なURL形式です: "${word}"\n正しいURL形式で入力してください。\n例: "https://example.com", "https://t.co/abc123"`)
      }
    }
    
    // t.co短縮URLの処理
    const match = word.match(/https?:\/\/t\.co\/(.+)/)
    if (match && match[1].length > 0) {
      MutePhrase('phrase', match[1])
    } else {
      // 通常のURLはそのままミュート
      MutePhrase('phrase', word)
    }
  } catch (error) {
    if (error.message.includes('URL')) {
      // カスタムエラーはそのまま再スロー
      throw error
    } else {
      // その他のエラー
      throw new Error(`URLミュートの追加に失敗しました: ${error.message}`)
    }
  }
}

/**
 * 正規表現パターンをミュートフィルターに追加する
 * @param {string} word - /pattern/形式の正規表現
 */
export function muteRegex(word) {
  try {
    let regex
    
    if (word.startsWith('/') && word.endsWith('/')) {
      const match = word.match(/^\/(.*)\/$/)
      regex = match ? match[1] : ''
    } else {
      // フォールバック：スラッシュがない場合はそのまま使用
      regex = word
    }
    
    // 空の正規表現パターンをチェック
    if (!regex || regex.trim() === '') {
      throw new Error('正規表現パターンが空です。\n有効なパターンを入力してください。\n例: "RT.*セール", ".*限定.*"')
    }
    
    // 正規表現の妥当性を簡単にチェック
    try {
      new RegExp(regex)
    } catch (regexError) {
      throw new Error(`正規表現パターンが無効です: "${regex}"\n正しい正規表現を入力してください。\n例: "RT.*セール", ".*限定.*"`)
    }
    
    MutePhrase('BTD_regex', regex)
  } catch (error) {
    if (error.message.includes('正規表現')) {
      // カスタムエラーはそのまま再スロー
      throw error
    } else {
      // その他のエラー
      throw new Error(`正規表現ミュートの追加に失敗しました: ${error.message}`)
    }
  }
}

/**
 * ユーザーキーワードをミュートフィルターに追加する
 * @param {string} word - @@username形式のキーワード
 */
export function muteUserKeyword(word) {
  try {
    let keyword
    
    if (word.startsWith('@@')) {
      // 従来システムから来る場合
      keyword = word.match(/^@@(.+)/)[1]
    } else {
      // 新しいタブシステムから来る場合
      keyword = word
    }
    
    // user|keyword形式のバリデーション
    if (!keyword.includes('|')) {
      throw new Error('ユーザーキーワード形式が正しくありません。\n正しい形式: "ユーザー名|キーワード"\n例: "spamuser|広告"')
    }
    
    const parts = keyword.split('|')
    if (parts.length !== 2 || parts[0].trim() === '' || parts[1].trim() === '') {
      throw new Error('ユーザーキーワード形式が正しくありません。\nユーザー名とキーワードの両方を入力してください。\n例: "spamuser|広告"')
    }
    
    MutePhrase('BTD_mute_user_keyword', keyword)
  } catch (error) {
    if (error.message.includes('ユーザーキーワード形式')) {
      // カスタムエラーはそのまま再スロー
      throw error
    } else {
      // その他のエラー
      throw new Error(`ユーザーキーワードミュートの追加に失敗しました: ${error.message}`)
    }
  }
}

/**
 * ユーザー名の正規表現パターンをミュートフィルターに追加する
 * 重複があれば先に削除してから追加
 * @param {string} word - @username形式のパターン
 */
export async function muteUserRegex(word) {
  try {
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
    
    let username
    if (word.startsWith('@')) {
      username = word.match(/^@(.+)/)[1]
    } else {
      username = word
    }
    
    // ユーザー名の妥当性チェック
    if (!username || username.trim() === '') {
      throw new Error('ユーザー名が空です。\n有効なユーザー名パターンを入力してください。\n例: "spam_.*", "bot[0-9]+"')
    }
    
    // ユーザー名正規表現の妥当性をチェック
    try {
      new RegExp(username)
    } catch (regexError) {
      throw new Error(`ユーザー名パターンが無効です: "${username}"\n正しい正規表現を入力してください。\n例: "spam_.*", "bot[0-9]+"`)
    }
    
    MutePhrase('BTD_user_regex', username)
  } catch (error) {
    if (error.message.includes('ユーザー名')) {
      // カスタムエラーはそのまま再スロー
      throw error
    } else {
      // その他のエラー
      throw new Error(`ユーザー正規表現ミュートの追加に失敗しました: ${error.message}`)
    }
  }
}

/**
 * 通常のフレーズをミュートフィルターに追加する
 * @param {string} word - ミュートするフレーズ
 */
export function mutePhrase(word) {
  try {
    // フレーズの基本的なバリデーション
    if (!word || word.trim() === '') {
      throw new Error('キーワードが空です。\n有効なキーワードを入力してください。\n例: "スパム", "広告"')
    }
    
    const trimmedWord = word.trim()
    
    // 最小長チェック（あまりに短いキーワードは避ける）
    if (trimmedWord.length < 2) {
      throw new Error('キーワードが短すぎます。\n2文字以上のキーワードを入力してください。\n例: "スパム", "広告"')
    }
    
    MutePhrase('phrase', trimmedWord)
  } catch (error) {
    if (error.message.includes('キーワード')) {
      // カスタムエラーはそのまま再スロー
      throw error
    } else {
      // その他のエラー
      throw new Error(`フレーズミュートの追加に失敗しました: ${error.message}`)
    }
  }
}