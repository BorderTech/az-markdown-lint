const glob = require('glob');
const tl = require('azure-pipelines-task-lib/task');

function getOptions(markdownlint) {
	return new Promise(win => {
		const pattern = tl.getInput('pattern', false) || '**/*.md';
		const configPath = tl.getPathInput('config', false, true);
		const files = glob.sync(pattern);
		const options = {
			files,
			config: {
				default: true,
				MD013: {
					line_length: 160,
				}
			}
		};

		if (configPath) {
			return markdownlint.readConfig(configPath).then(loadedConfig => {
				options.config = loadedConfig;
				win(options);
			});
		} else {
			win(options);
		}
	});
}

function handleResult(lintResults) {
	let errorCount = 0;
	const items = Object.entries(lintResults);
	items.forEach(([markdownFile, issues]) => {
		console.log('Checking results for', markdownFile);
		if (issues.length) {
			try {
				issues.forEach(issue => {
					errorCount++;
					tl.logIssue(
						tl.IssueType.Error,
						issue?.ruleNames[0],
						markdownFile,
						issue?.lineNumber,
						issue?.errorRange[0]
					);
				});
			} catch(ex) {
				console.error(ex);
			}

		}
	});
	if (errorCount) {
		tl.setResult(tl.TaskResult.Failed, `Found lint ${errorCount} issues`);
	} else {
		tl.setResult(tl.TaskResult.Succeeded, `Linted ${items.length} files`);
	}
}

function setWorkingDir() {
	const workingDir = tl.getVariable('build.sourcesDirectory') || __dirname;
	console.log(`working folder: ${workingDir}`);
	tl.cd(workingDir);
	process.chdir(workingDir);
}

async function run() {
	return import('markdownlint/promise').then(module => {
		const lintPromise = module.lint;
		setWorkingDir();
		return getOptions(module).then(options => {
			if (options.files.length) {
				return lintPromise(options).then(lintResults => {
					console.dir(lintResults, { 'colors': true, 'depth': null });
					handleResult(lintResults);
				}).catch(err => {
					tl.setResult(tl.TaskResult.Failed, err.message);
				});
			}
			tl.setResult(tl.TaskResult.SucceededWithIssues, 'No markdown files to scan');
			tl.warning('No markdown files to scan');
		});
	});
}

run();
