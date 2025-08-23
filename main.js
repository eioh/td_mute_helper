// ==UserScript==
// @name td_mute_helper
// @namespace http://tampermonkey.net/
// @version 0.4
// @description try to take over the world!
// @author You
// @match https://tweetdeck.twitter.com
// @match https://twitter.com/i/tweetdeck
// @match https://x.com/i/tweetdeck
// @updateURL   https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// @downloadURL https://raw.githubusercontent.com/eioh/td_mute_helper/main/main.js
// ==/UserScript==

(function() {
'use strict';

const VERSION = '0.4';
const DELAY_BETWEEN_OPERATIONS = 20 * 1000; // 20秒
const INITIALIZATION_DELAY = 30 * 1000; // 30秒

/**
 * 指定したミリ秒だけ処理を停止する
 * @param {number} ms - 停止する時間（ミリ秒）
 * @returns {Promise<void>} 指定時間後にresolveされるPromise
 */
const sleep = ms => new Promise(res => setTimeout(res, ms))

/**
 * エラーメッセージをコンソールとアラートで表示する
 * @param {string} message - 表示するエラーメッセージ
 * @param {Error} error - エラーオブジェクト
 */
function showError(message, error) {
	console.error(`[TD Mute Helper] ${message}:`, error);
	// ユーザーには簡潔なメッセージを表示
	alert(`エラーが発生しました: ${message}`);
}


/**
 * TweetDeckのフィルターマネージャーにミュートフィルターを追加する
 * @param {string} key - フィルターのタイプ（'phrase', 'BTD_regex', 'BTD_user_regex'など）
 * @param {string} word - フィルターする内容
 * @returns {boolean} フィルター追加の成功可否
 */
function MutePhrase(key, word) {
	try {
		TD.controller.filterManager.addFilter(key, word);
	} catch (error) {
		showError(`フィルター追加に失敗しました (${key}: ${word})`, error);
		return false;
	}
	return true;
}

/**
 * 入力されたワードからミュートパターンの種類を判定する
 * @param {string} word - 判定対象のワード
 * @returns {string} パターンタイプ（'url', 'regex', 'userKeyword', 'userRegex', 'phrase'）
 */
function detectMutePattern(word) {
	if (word.match(/https?:\/\/t\.co\/(.+)/)) {
		return 'url';
	} else if (word.match(/^\/.+\/$/)) {
		return 'regex';
	} else if (word.match(/^@@.+/)) {
		return 'userKeyword';
	} else if (word.match(/^@.+/)) {
		return 'userRegex';
	} else {
		return 'phrase';
	}
}

/**
 * t.coのURLをミュートフィルターに追加する
 * @param {string} word - https://t.co/形式のURL
 */
function muteUrl(word) {
	const match = word.match(/https?:\/\/t\.co\/(.+)/);
	if (match && match[1].length > 0) {
		MutePhrase('phrase', match[1]);
	}
}

/**
 * 正規表現パターンをミュートフィルターに追加する
 * @param {string} word - /pattern/形式の正規表現
 */
function muteRegex(word) {
	const regex = word.match(/^\/(.+)\/$/)[1];
	MutePhrase('BTD_regex', regex);
}

/**
 * ユーザーキーワードをミュートフィルターに追加する
 * @param {string} word - @@username形式のキーワード
 */
function muteUserKeyword(word) {
	const keyword = word.match(/^@@(.+)/)[1];
	MutePhrase('BTD_mute_user_keyword', keyword);
}

/**
 * ユーザー名の正規表現パターンをミュートフィルターに追加する
 * 重複があれば先に削除してから追加
 * @param {string} word - @username形式のパターン
 */
async function muteUserRegex(word) {
	const dup = getDuplication();
	if (dup.length > 0) {
		try {
			TD.controller.filterManager.removeFilter(dup[0]);
			await sleep(DELAY_BETWEEN_OPERATIONS);
		} catch (error) {
			showError('重複フィルター削除に失敗しました', error);
		}
	}
	const username = word.match(/^@(.+)/)[1];
	MutePhrase('BTD_user_regex', username);
}

/**
 * 通常のフレーズをミュートフィルターに追加する
 * @param {string} word - ミュートするフレーズ
 */
function mutePhrase(word) {
	MutePhrase('phrase', word);
}

/**
 * 入力されたワードを解析し、適切なミュートフィルターを追加する
 * @param {*} word - ミュートするワード
 * @returns {Promise<boolean>} フィルター追加の成功可否
 */
async function addMuteFilter(word) {
	try {
		const pattern = detectMutePattern(word);

		switch (pattern) {
			case 'url':
				muteUrl(word);
				break;
			case 'regex':
				muteRegex(word);
				break;
			case 'userKeyword':
				muteUserKeyword(word);
				break;
			case 'userRegex':
				await muteUserRegex(word);
				break;
			case 'phrase':
			default:
				mutePhrase(word);
				break;
		}

		return true;
	} catch (error) {
		showError(`ミュートフィルター追加処理でエラーが発生しました: "${word}"`, error);
		return false;
	}
}

/**
 * 指定された数だけミュートフィルターを削除する
 * @param {*} num - 削除するフィルターの数
 * @returns {void}
 */
function removeMuteFilters(num) {
	if(num <= 0) return;

	try {
		var all = TD.controller.filterManager.getAll()
		var words = all.filter(function(v) {
			return v.type == "phrase"// && v.value.match(/^[a-zA-Z0-9]{10}$/)
		})

		if (words.length === 0) {
			console.log('削除対象のフィルターがありません');
			return;
		}

		var r = words[0]
		console.log(num)
		console.log(words.length + "/" + all.length)
		TD.controller.filterManager.removeFilter(r)

		setTimeout(function(){
			removeMuteFilters(num-1)
		}, DELAY_BETWEEN_OPERATIONS)
	} catch (error) {
		showError(`フィルター削除に失敗しました (残り${num}個)`, error);
	}
}

/**
 * 重複しているミュートフィルターを取得する
 * @returns {Array} 重複しているフィルターのリスト
 */
function getDuplication() {
    try {
        const list = TD.controller.filterManager.getAll();
        const len = list.length
        const ret = [];
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (list[i].type == list[j].type && list[i].value == list[j].value) {
                    ret.push(list[i])
                }
            }
        }
        return ret;
    } catch (error) {
        showError('重複フィルター検索に失敗しました', error);
        return [];
    }
}

setTimeout(function() {
	console.log("loaded");
	console.log(`[TD Mute Helper] version ${VERSION} loaded`)

	// jQuery の $('.visible-in-contracted-header') をネイティブJSに置換
	const elements = document.querySelectorAll('.visible-in-contracted-header');

	elements.forEach(element => {
		// クリックイベント
		element.addEventListener('click', function(e) {
			var len = TD.controller.filterManager.getAll().length;
			var res = window.prompt("入力(" + len + ")");
			if (res && res.length > 0) {
				addMuteFilter(res).then(v => {});
			}
		});

		// 右クリック（コンテキストメニュー）イベント
		element.addEventListener('contextmenu', function(e) {
			var res = window.prompt("削除する数を入力");
			if (res && !isNaN(res)) {
				removeMuteFilters(Number(res));
			}
		});
	});
}, INITIALIZATION_DELAY);

// Node.js環境でのテスト用エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectMutePattern };
}

})();