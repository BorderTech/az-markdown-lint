const path = require('path');
const assert = require('assert');
const ttm = require('azure-pipelines-task-lib/mock-test');

const nodeVersion = 16;

describe('markdown lint tests', function() {
	const timeout = (process.env['TASK_TEST_TIMEOUT'] * 1) || 9000;
	const taskJsonPath = '';
	// process.env['TASK_TEST_TRACE'] = 'true';

	function run(testRunner) {
		return testRunner.runAsync(nodeVersion).then(() => {
			// console.log('testRunner.stdout', testRunner.stdout);
		}).catch(ex => {
			// console.log('testRunner.stderr', testRunner.stderr);
			throw ex;
		});
	}

	it('Should not find any errors in good markdown files', function(done) {
		this.timeout(timeout);

		let tp = path.join(__dirname, 'good_markdown.js');
		let tr = new ttm.MockTestRunner(tp, taskJsonPath);
		run(tr).then(function() {
			assert(tr.succeeded);
			done();
		}).catch(done);
	});

	it('Should find errors in bad markdown files', function(done) {
		this.timeout(timeout);

		let tp = path.join(__dirname, 'bad_markdown.js');
		let tr = new ttm.MockTestRunner(tp, taskJsonPath);
		run(tr).then(function() {
			assert(tr.failed, 'should fail when there are markdown lint violations');
			done();
		}).catch(done);
	});

	it('Should report the specific lint violations', function(done) {
		this.timeout(timeout);

		let tp = path.join(__dirname, 'bad_line_length.js');
		let tr = new ttm.MockTestRunner(tp, taskJsonPath);
		run(tr).then(function() {
			assert(tr.failed, 'should fail when a line length exceeds the maximum');
			assert(tr.stdOutContained('MD013'), 'should give the rule ID');
			assert(tr.stdOutContained('line-length'), 'should give the rule Name');
			assert(tr.stdOutContained('Expected: 160; Actual: 180'), 'should providespecific violation details');
			done();
		}).catch(done);
	});


	it('Should honor the config file', function(done) {
		this.timeout(timeout);

		let tp = path.join(__dirname, 'bad_markdown_with_config.js');
		let tr = new ttm.MockTestRunner(tp, taskJsonPath);
		run(tr).then(function() {
			assert(tr.succeeded, 'Should not fail when the config overrides the failing rules');
			done();
		}).catch(done);
	});

	it('Should traverse subdirectories', function(done) {
		this.timeout(timeout);

		let tp = path.join(__dirname, 'all_markdown.js');
		let tr = new ttm.MockTestRunner(tp, taskJsonPath);
		run(tr).then(function() {
			assert(tr.failed, 'should scan all markdown files, good and bad');
			done();
		}).catch(done);
	});
});
