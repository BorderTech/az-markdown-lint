import * as markdownlint from 'markdownlint';
import * as glob from 'glob';
import { lint } from 'markdownlint/promise' ;
import { lint as lintPromise } from "markdownlint/promise";
import * as tl from 'azure-pipelines-task-lib/task.js';


const pattern = process.argv[2] || '**.md'; // should be users markdown files when running the program
const files = glob.sync(pattern); // glob will work its magic and find the users markdown documents

if (files.length == 0) {
	console.warn (' No lines to lint 🔍:' );
	process.exit(0);
}

const options = {
	files,
	config: {
		default: true,
		MD013: {
			line_length: 160,
		}
	}
};

const results = lintPromise(options);
results.then(handleresults);
function handleresults(lintresults) {
	console.dir(lintresults, { "colors": true, "depth": null });
} 

async function run() {
	try {
         const inputString = tl.getInput('pattern', false);
		  if (inputString == 'bad') {
             tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
             return;
         }
		 console.log('linted results :\n', inputString );
		}
		    catch (error) {
         tl.setResult(tl.TaskResult.Failed, err.message);
     }
 }

 run();
