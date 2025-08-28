// バリデーション機能のテスト

import { 
  mutePhrase, 
  muteRegex, 
  muteUrl, 
  muteUserKeyword, 
  muteUserRegex 
} from './src/filters/mute-patterns.js';

// モックのMutePhrase関数とTD.controller.filterManager
global.TD = {
  controller: {
    filterManager: {
      addFilter: () => {},
      removeFilter: () => {},
      getAll: () => []
    }
  }
};

// MutePhraseのモック
global.MutePhrase = (type, value) => {
  console.log(`Mock MutePhrase called: ${type} = ${value}`);
};

let passed = 0;
let failed = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`✓ ${testName}: PASS`);
    passed++;
  } catch (error) {
    console.log(`✗ ${testName}: FAIL - ${error.message}`);
    failed++;
  }
}

function expectError(fn, expectedMessage) {
  try {
    fn();
    throw new Error('Expected error was not thrown');
  } catch (error) {
    if (!error.message.includes(expectedMessage)) {
      throw new Error(`Expected error message to contain "${expectedMessage}", but got "${error.message}"`);
    }
  }
}

console.log('Running validation tests...\n');

// === mutePhrase テスト ===
console.log('--- mutePhrase Tests ---');

runTest('mutePhrase: 正常なキーワード', () => {
  mutePhrase('テストキーワード');
});

runTest('mutePhrase: 空文字列でエラー', () => {
  expectError(() => mutePhrase(''), 'キーワードが空です');
});

runTest('mutePhrase: 空白のみでエラー', () => {
  expectError(() => mutePhrase('   '), 'キーワードが空です');
});

runTest('mutePhrase: 1文字でエラー', () => {
  expectError(() => mutePhrase('あ'), 'キーワードが短すぎます');
});

runTest('mutePhrase: nullでエラー', () => {
  expectError(() => mutePhrase(null), 'キーワードが空です');
});

// === muteRegex テスト ===
console.log('\n--- muteRegex Tests ---');

runTest('muteRegex: 正常な正規表現（スラッシュ付き）', () => {
  muteRegex('/test.*/');
});

runTest('muteRegex: 正常な正規表現（スラッシュなし）', () => {
  muteRegex('test.*');
});

runTest('muteRegex: 空文字列でエラー', () => {
  expectError(() => muteRegex(''), '正規表現パターンが空です');
});

runTest('muteRegex: 無効な正規表現でエラー', () => {
  expectError(() => muteRegex('/[invalid/'), '正規表現パターンが無効です');
});

runTest('muteRegex: スラッシュのみでエラー', () => {
  expectError(() => muteRegex('//'), '正規表現パターンが空です');
});

// === muteUrl テスト ===
console.log('\n--- muteUrl Tests ---');

runTest('muteUrl: 正常なHTTPS URL', () => {
  muteUrl('https://example.com');
});

runTest('muteUrl: 正常なt.co URL', () => {
  muteUrl('https://t.co/abc123');
});

runTest('muteUrl: 正常なHTTP URL', () => {
  muteUrl('http://example.com');
});

runTest('muteUrl: 空文字列でエラー', () => {
  expectError(() => muteUrl(''), 'URLが空です');
});

runTest('muteUrl: 無効なURL形式でエラー', () => {
  expectError(() => muteUrl('invalid-url'), '無効なURL形式です');
});

runTest('muteUrl: nullでエラー', () => {
  expectError(() => muteUrl(null), 'URLが空です');
});

// === muteUserKeyword テスト ===
console.log('\n--- muteUserKeyword Tests ---');

runTest('muteUserKeyword: 正常なuser|keyword形式', () => {
  muteUserKeyword('testuser|testkeyword');
});

runTest('muteUserKeyword: @@プレフィックス付きで正常', () => {
  muteUserKeyword('@@testuser|testkeyword');
});

runTest('muteUserKeyword: パイプなしでエラー', () => {
  expectError(() => muteUserKeyword('testuser'), 'ユーザーキーワード形式が正しくありません');
});

runTest('muteUserKeyword: ユーザー名が空でエラー', () => {
  expectError(() => muteUserKeyword('|keyword'), 'ユーザーキーワード形式が正しくありません');
});

runTest('muteUserKeyword: キーワードが空でエラー', () => {
  expectError(() => muteUserKeyword('user|'), 'ユーザーキーワード形式が正しくありません');
});

runTest('muteUserKeyword: 複数のパイプでエラー', () => {
  expectError(() => muteUserKeyword('user|key|word'), 'ユーザーキーワード形式が正しくありません');
});

runTest('muteUserKeyword: 空文字列でエラー', () => {
  expectError(() => muteUserKeyword(''), 'ユーザーキーワード形式が正しくありません');
});

// === muteUserRegex テスト ===
console.log('\n--- muteUserRegex Tests ---');

runTest('muteUserRegex: 正常なユーザー正規表現', async () => {
  await muteUserRegex('test.*');
});

runTest('muteUserRegex: @プレフィックス付きで正常', async () => {
  await muteUserRegex('@test.*');
});

runTest('muteUserRegex: 空文字列でエラー', async () => {
  try {
    await muteUserRegex('');
    throw new Error('Expected error was not thrown');
  } catch (error) {
    if (!error.message.includes('ユーザー名が空です')) {
      throw new Error(`Expected error message to contain "ユーザー名が空です", but got "${error.message}"`);
    }
  }
});

runTest('muteUserRegex: 無効な正規表現でエラー', async () => {
  try {
    await muteUserRegex('[invalid');
    throw new Error('Expected error was not thrown');
  } catch (error) {
    if (!error.message.includes('ユーザー名パターンが無効です')) {
      throw new Error(`Expected error message to contain "ユーザー名パターンが無効です", but got "${error.message}"`);
    }
  }
});

// テスト結果の表示
console.log(`\n--- Test Results ---`);
console.log(`Total: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
  console.log('🎉 All validation tests passed!');
  process.exit(0);
} else {
  console.log('❌ Some validation tests failed');
  process.exit(1);
}