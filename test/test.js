// Simple test for detectMutePattern function

// Import the function from src/filters/mute-patterns.js
import { detectMutePattern } from '../src/filters/mute-patterns.js';

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
