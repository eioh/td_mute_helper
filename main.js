(function() {
'use strict';

const DELAY_BETWEEN_OPERATIONS = 20 * 1000; // 20秒
const INITIALIZATION_DELAY = 30 * 1000; // 30秒

const sleep = ms => new Promise(res => setTimeout(res, ms))

function showError(message, error) {
	console.error(`[TD Mute Helper] ${message}:`, error);
	// ユーザーには簡潔なメッセージを表示
	alert(`エラーが発生しました: ${message}`);
}


function MutePhrase(key, word) {
	try {
		TD.controller.filterManager.addFilter(key, word);
	} catch (error) {
		showError(`フィルター追加に失敗しました (${key}: ${word})`, error);
		return false;
	}
	return true;
}

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

function muteUrl(word) {
	const match = word.match(/https?:\/\/t\.co\/(.+)/);
	if (match && match[1].length > 0) {
		MutePhrase('phrase', match[1]);
	}
}

function muteRegex(word) {
	const regex = word.match(/^\/(.+)\/$/)[1];
	MutePhrase('BTD_regex', regex);
}

function muteUserKeyword(word) {
	const keyword = word.match(/^@@(.+)/)[1];
	MutePhrase('BTD_mute_user_keyword', keyword);
}

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

function mutePhrase(word) {
	MutePhrase('phrase', word);
}

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

function removePicture(num) {
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
			removePicture(num-1)
		}, DELAY_BETWEEN_OPERATIONS)
	} catch (error) {
		showError(`フィルター削除に失敗しました (残り${num}個)`, error);
	}
}

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
	$('.visible-in-contracted-header')
		.on('click', function(e) {
		    var len = TD.controller.filterManager.getAll().length;
		    var res = window.prompt("入力(" + len + ")");
		    if (res && res.length > 0) {
			    addMuteFilter(res).then(v => {});
		    }
	    }).on('contextmenu', function(e) {
	        var res = window.prompt("削除する数を入力");
		    if (res && !isNaN(res)) {
			    removePicture(Number(res));
		    }
	    });
}, INITIALIZATION_DELAY);

})();