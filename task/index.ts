import * as tl from "azure-pipelines-task-lib/task";
import * as path from "path";
import * as fs from "fs";
import * as markdownlint from "markdownlint";
import * as glob from "glob";
import type { Options, Configuration } from "markdownlint";

const pattern  = process.argv[2]||"**.md"; // should be users markdown files when running the program
const files = glob.sync(pattern); // glob will work its magic and find the users markdown documents

if (files.length== 0){
console.warn (' No lines to lint 🔍:' );
process.exit(0);

}




const options: Options = {  // I have taken this out of my configeration file and just put it hear as it makes alot more sense
  config: {
    default: true,
    MD013: {
      line_length: 160,
    }

  }

};

const results = (markdownlint as any).sync(options); // unsure of this line of code due to it being a work around for sync not working

if (results.Tostring()){
  console.error("There appears to be some linting issues....\n"+ results.ToString())
  process.exit(1);
}else{
  console.log("Markdown is looking all correct. Keep up the good work 😎");
}






