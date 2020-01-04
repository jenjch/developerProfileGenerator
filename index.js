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
    name: "github"
    message: "What is your GitHub username?"
},
{ 
    type: "list",
    name: "color",
    message: "What color do you choose?",
    choices: ["green", "blue", "pink", "red"]
} 
];

function writeToFile(fileName, data) {
 
}

function init() {

init();

// axios
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
