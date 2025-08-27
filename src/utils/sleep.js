/**
 * 指定したミリ秒だけ処理を停止する
 * @param {number} ms - 停止する時間（ミリ秒）
 * @returns {Promise<void>} 指定時間後にresolveされるPromise
 */
export const sleep = ms => new Promise(res => setTimeout(res, ms))