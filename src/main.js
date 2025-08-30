/**
 * TD Mute Helper - TweetDeck ミュート拡張 TamperMonkey スクリプト
 *
 * このファイルはesbuildでバンドルされ、単一のUserScriptとして配布されます。
 */

import { initialize } from './initialization.js'

// IIFEでラップしてグローバルスコープの汚染を防ぐ
;(function () {
  'use strict'

  // アプリケーション初期化
  initialize()
})()
