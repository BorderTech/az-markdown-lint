import * as path from "path";
import * as fs from "fs";
import * as markdownlint from "markdownlint";
import * as glob from "glob";


const pattern  = process.argv[2]||"**.md"; // should be users markdown files when running the program
const files = glob.sync(pattern); // glob will work its magic and find the users markdown documents

if (files.length== 0){
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

const results = (markdownlint).sync(options);
if (results.Tostring()){
  console.error("There appears to be some linting issues....\n"+ results.ToString());
  process.exit(1);
}else{
  console.log("Markdown is looking all correct. Keep up the good work 😎");
}








