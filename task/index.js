const glob = require('glob');
const { lintpromise } = require('markdownlint/promise');
const tl = require('azure-pipelines-task-lib/task.js');


export function pattern() {
	return process.argv[2] || '**.md';
};

export function files() {
	return glob.sync(pattern);
	if (files.length == 0) {
		console.warn(' No lines to lint 🔍:');
		process.exit(0);
	}
	return files;
}


export function options() {
	return {
		files,
		config: {
			default: true,
			MD013: {
				line_length: 160,
			}
		}
	};
};

export function linter() {
	const results = lintpromise(options);
	results.then(handleresults);
	function handleresults(lintresults) {
		console.dir(lintresults, { 'colors': true, 'depth': null });
	};


};


export async function run() {
	try {
		const inputString = tl.getInput('pattern', false);
		if (inputString == 'bad') {
			tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
			return;
		}
		console.log('linted results :\n', inputString);
	} catch(err) {
		tl.setResult(tl.TaskResult.Failed, err.message);

	};
	run();
};

