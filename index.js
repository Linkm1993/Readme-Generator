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
        message: "Write a short description of your project"
    },

    {
        type: "input",
        name: "installation",
        message: "Enter terminal command for installation"
    },
    {
        type: 'input',
        name: 'usage',
        message: "Enter a brief explantion of how your code works"
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
    },
    {   type: 'input',
        name: 'test',
        message: "Enter terminal command for testing"

    }]



    inquirer.prompt(questions).then(answers => {
        let username = answers.username
        let title =answers.title
        let description = answers.description
        let installation = answers.installation
        let usage = answers.usage
        let license = answers.license
        let contributing = answers.contributing
        let test = answers.test

        let readmeText = 
        `# ${title} 


### Description
>${description} 


### Table of Contents 
>[Installation](###Installation) | [Usage](###Usage) | [License](###License) | [Contributors](###Contributors) | [Testing](###Testing) | [Questions](###Questions)
        
        
### Installation
>${installation}


### Usage
>${usage}


### License
>${license}


### Contributing
>${contributing}


### Testing
>${test}


### Questions
>* ![](https://img.shields.io/badge/Github-${username}-blue) 
        `

        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then( response =>{
            let userimage = `![](${response.data.avatar_url})`
            appendGithub =
            `>* Github Avatar: ${userimage}`

            fs.writeFile('yourREADME.md', readmeText, function (err) {
                if (err) throw err;
                console.log('File created successfully.');
              })

            fs.appendFile('yourREADME.md', "\n" + appendGithub, function(err) {
                if (err) throw err;
                console.log('File created successfully.');
              })

        })
    })