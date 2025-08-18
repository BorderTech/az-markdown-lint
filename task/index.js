const glob = require('glob');
const { lintpromise } = require('markdownlint/promise');
const tl = require('azure-pipelines-task-lib/task.js');

function read() {
	const pattern = process.argv[2] || '**.md';
	const files = glob.sync(pattern);
	if (files.length == 0) {
		console.warn(' No lines to lint 🔍:');
		process.exit(0);
	}
	return files;




	function options() {
		return {
			read,
			config: {
				default: true,
				MD013: {
					line_length: 160,
				}
			}
		};
	};


	const results = lintpromise(options);
	results.then(handleresults);
	function handleresults(lintresults) {
		console.dir(lintresults, { 'colors': true, 'depth': null });
	};



};


async function run() {
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

};

module.exports = { run };
module.exports = { read };



