/**
 * エラーメッセージをコンソールとアラートで表示する
 * @param {string} message - 表示するエラーメッセージ
 * @param {Error} error - エラーオブジェクト
 */
export function showError(message, error) {
  console.error(`[TD Mute Helper] ${message}:`, error)
  // ユーザーには簡潔なメッセージを表示
  alert(`エラーが発生しました: ${message}`)
}