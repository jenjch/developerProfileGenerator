const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');
const generateHTML = require ('./generateHTML');

const writeFileAsync = util.promisify(fs.writeFile);

// added questions as const
const questions = [
{
    type:"input",
    name: "github",
    message: "What is your GitHub username?"
},
{ 
    // list type gives options for user to select
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

async function init() {
    console.log("hi")
    try {
        // from questions
      const answers = await promptUser();
      console.log(answers);

    //generate html with data from axios
    const queryUrl = `https://api.github.com/users/${answers.github}`
        //  from axios
    const githubData = await axios.get(queryUrl);
    const githubProfile = githubData.data;
    console.log(githubData);

    // need to call another API url for number of stars by others
    const queryUrlStars = `https://api.github.com/users/${answers.github}/repos?per_page=100`

    const githubStars = await axios.get(queryUrlStars);
    
    // use for loop to find total stars across all repos
    let numStars = 0;
    for (let i=0; i < githubStars.data.length; i++) {
        // data.stargazers_count
        numStars += githubStars.data[i].stargazers_count;
        console.log("stars:" + numStars);
    };

   // Create new object combining answers and data from the 2 API calls
   const htmlData = {
    // 2 question answers
    color: answers.color,
    // github api data
    avatar_url: githubProfile.avatar_url,
    name: githubProfile.name,
    company: githubProfile.company,
    location: githubProfile.location,
    html_url: githubProfile.html_url,
    blog: githubProfile.blog,
    bio: githubProfile.bio,
    public_repos: githubProfile.public_repos,
    followers: githubProfile.followers,
    following: githubProfile.following,
    // github stars api data
    stars: numStars
    }

    console.log(htmlData);
  
      const html = generateHTML(htmlData);
      
    // Creates HTML file and uses the generateHTML function from separate file
      await writeFileAsync("index.html", html);
  
      console.log("Successfully wrote to index.html");

    // Uses the code from https://www.npmjs.com/package/html-pdf for PDF conversion
      var useHTML = fs.readFileSync('./index.html', 'utf8');
      var options = { format: 'Letter' };
    
      pdf.create(useHTML, options).toFile('./profile.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
        console.log("Succesfully wrote to profile.pdf"); 
      });

    } catch(err) {
      console.log(err);
    }
  }


  /** Did not ending up using the given code
 * Filename represents the name of the file user wants to call their pdf file 
 * Data is the information given to construct our pdf, the html file we created.
 * @param {String} fileName 
 * @param {Object} data 
 */
// function writeToFile(fileName, data) {
 
// }

// function init() {
//     // compiles all function calls
// }

init();