/**
 * TD Mute Helper - TweetDeck ミュート拡張 TamperMonkey スクリプト
 * 
 * このファイルはesbuildでバンドルされ、単一のUserScriptとして配布されます。
 */

import { initialize } from './initialization.js'
import { detectMutePattern } from './filters/mute-patterns.js'

// IIFEでラップしてグローバルスコープの汚染を防ぐ
;(function () {
  'use strict'

  // アプリケーション初期化
  initialize()

  // Node.js環境でのテスト用エクスポート（グローバルオブジェクトとして）
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectMutePattern }
  }
})()