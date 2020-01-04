const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');
const generateHTML = require ('./generateHTML');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
{
    type:"input",
    name: "github",
    message: "What is your GitHub username?"
},
{ 
    type: "list",
    name: "color",
    message: "What color do you choose?",
    choices: ["green", "blue", "pink", "red"]
} 
];

function promptUser() {
    return inquirer.prompt(questions);
}
// get response
// change html file (try the color first)
// then axios call to gather additional github response info
// create html file
// convert to pdf using html-pdf

/**
 * Filename represents the name of the file user wants to call their pdf file 
 * Data is the information given to construct our pdf, the html file we created.
 * @param {String} fileName 
 * @param {Object} data 
 */

async function init() {
    console.log("hi")
    try {
      const data = await promptUser();
  
      const html = generateHTML(data);
  
      await writeFileAsync("index.html", html);
  
      console.log("Successfully wrote to index.html");
    } catch(err) {
      console.log(err);
    }
  }


// function writeToFile(fileName, data) {
 
// }

// function init() {
//     // compiles all function calls
// }

init();

// axios from mini project is below
// const fs = require("fs");
// const axios = require("axios");
// const inquirer = require("inquirer");

// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//     axios.get(queryUrl).then(function(res) {
//       const repoNames = res.data.map(function(repo) {
//         return repo.name;
//       });

//       const repoNamesStr = repoNames.join("\n");

//       fs.writeFile("repos.txt", repoNamesStr, function(err) {
//         if (err) {
//           throw err;
//         }

//         console.log(`Saved ${repoNames.length} repos`);
//       });
//     });
//   });
