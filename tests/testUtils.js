/*
	These are utils for tests (not tests for utils).
 */
const path = require('path');
let taskPath; // cache the result of getTaskPath

function getTaskPath() {
	if (taskPath) {
		return taskPath;
	}
	const packageJsonPath = process.env.npm_package_json;
	const packageJsonDir = path.dirname(packageJsonPath);

	const packageJson = require(packageJsonPath);
	taskPath = path.join(packageJsonDir, packageJson.main);
	return taskPath;
}

module.exports = {
	getTaskPath
};
