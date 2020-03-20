const fs = require('fs');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const axios = require("axios");
const util = require('util')


let questions = [
    {
      type: 'input',
      name: 'user_name',
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
        type: 'input',
        name: 'table',
        message: "Tables"
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
    console.log(JSON.stringify(answers, null, '  '));
    fs.writeFile('newfile.txt', JSON.stringify(answers, null, '  '), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      })
    })