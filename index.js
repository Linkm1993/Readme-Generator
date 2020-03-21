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
        type: 'input',
        name: "license",
        message: "Which lisence are you using?"
    },
    {
        type:'input',
        name: "contributing",
        message: "Who worked on this project?"
    }]



    inquirer.prompt(questions).then(answers => {
        let {username} = answers
        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then( response =>{
            let imageURL = response.data.avatar_url
            let callImage = `![User Avatar](${imageURL})`

            fs.writeFile('yourREADME.md', JSON.stringify(answers, null, '  '), function (err) {
                if (err) throw err;
                console.log('File created successfully.');
              })
            
            fs.appendFile('yourREADME.md', callImage, function (err) {
                if (err) throw err;
                console.log('File created successfully.');
              })
        })
    })

