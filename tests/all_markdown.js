/*
	This is a mock task run, it is expected to be run from _suite.js,
	which also contains assertions etc.
 */
const tmrm = require('azure-pipelines-task-lib/mock-run');
const { getTaskPath } = require('./testUtils');

let tmr = new tmrm.TaskMockRunner(getTaskPath());
tmr.setInput('pattern', 'tests/resources/**/*.md');
tmr.run();
