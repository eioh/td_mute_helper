// Simple test for detectMutePattern function

// Extract the function for testing
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

// Test cases
const tests = [
	{ input: 'https://t.co/abcd123', expected: 'url' },
	{ input: 'http://t.co/xyz789', expected: 'url' },
	{ input: '/test.*pattern/', expected: 'regex' },
	{ input: '@@username', expected: 'userKeyword' },
	{ input: '@username', expected: 'userRegex' },
	{ input: 'plain text', expected: 'phrase' },
	{ input: 'some keyword', expected: 'phrase' }
];

let passed = 0;
let failed = 0;

console.log('Running tests for detectMutePattern function...\n');

tests.forEach((test, index) => {
	const result = detectMutePattern(test.input);
	const success = result === test.expected;
	
	console.log(`Test ${index + 1}: "${test.input}"`);
	console.log(`  Expected: ${test.expected}`);
	console.log(`  Got: ${result}`);
	console.log(`  Result: ${success ? '✓ PASS' : '✗ FAIL'}`);
	console.log('');
	
	if (success) {
		passed++;
	} else {
		failed++;
	}
});

console.log(`Summary: ${passed} passed, ${failed} failed`);

if (failed === 0) {
	console.log('🎉 All tests passed!');
	process.exit(0);
} else {
	console.log('❌ Some tests failed');
	process.exit(1);
}