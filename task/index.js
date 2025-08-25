const glob = require('glob');
const { lintpromise } = require('markdownlint/promise');
const tl = require('azure-pipelines-task-lib/markdown-lint.js');


function files() {
	const pattern = process.argv[2] || '**.md';
	return glob.sync(pattern);
	if (files.length == 0) {
		console.warn(' No lines to lint 🔍:');
		process.exit(0);
	}
	return files;
}


function options() {
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



function lint() {
	const results = lintpromise(options);
	results.then(handleresults);
	function handleresults(lintresults) {
		console.dir(lintresults, { 'colors': true, 'depth': null });
	};
	return lint;
};


async function run() {
	const check = new lint();


	try {
		const inputString = tl.getInput('pattern', false);
		if ( inputstring = check.lintresults[files].length > 0 ) {
			tl.setResult(tl.TaskResult.Failed, 'Bad input was given: \n', lintresults);
			return;
		} else {
			tl.setResults(tl.TaskResult.Succeeded, 'linted results :\n', inputString, lintresults);
		}
	} catch(err) {
		tl.setResult(tl.TaskResult.Failed, err.message);
		console.err(' something went wronge ', err.message);


	};

};

run();





