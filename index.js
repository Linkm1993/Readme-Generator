const fs = require('fs');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const axios = require("axios");

let questions = [
    {
      type: 'input',
      name: 'username',
      message: "What's your Github username"
    },
    {
        type: 'input',
        name: 'title',
        message: "What is the title of your project?"
    },
    {
        type: 'input',
        name: 'description',
        message: "Please write a short description of your project"
    },

    {
        type: "input",
        name: "installation",
        message: "Enter terminal command for installation"
    },
    {
        type: 'input',
        name: 'usage',
        message: "Please enter a code example"
    },
    {
        type: 'list',
        name: "license",
        message: "Which lisence are you using?",
        choices: [
            "MIT",
            "Unlicense",
            "BSD-2-Clause Plus Patent License"
          ]
    },
    {
        type:'input',
        name: "contributing",
        message: "Who worked on this project?"
    }]



    inquirer.prompt(questions).then(answers => {
        let username = answers.username
        let title =answers.title
        let description = answers.description
        let installation = answers.installation
        let usage = answers.usage
        let license = answers.license
        let contributing = answers.contributing

        let readmeText = `# ${title} 

### Description
>${description} 


### Table of Contents 
>[Installation](#Installation) | [Usage](#Usage) | [License](#License) | [Contributors](#Contributors)
        
        
### Installation
>${installation}


### Usage
>${usage}


### License
>${license}
        `

        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then( response =>{
            let imageURL = response.data.avatar_url


            fs.writeFile('yourREADME.md', readmeText, function (err) {
                if (err) throw err;
                console.log('File created successfully.');
              })

        })
    })