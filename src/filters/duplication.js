import { showError } from '../utils/error-handling.js'

/**
 * 重複しているミュートフィルターを取得する
 * @returns {Array} 重複しているフィルターのリスト
 */
export function getDuplication() {
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