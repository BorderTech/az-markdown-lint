/*
	These are utils for tests (not tests for utils).
 */
const path = require('path');

function getTaskPath() {
	return path.join(__dirname, '..', 'task', 'index.js');
}

module.exports = {
	getTaskPath
};
