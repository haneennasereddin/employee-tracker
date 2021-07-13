//importing the employee/manager/engineer/intern class files
const Employee = require('./java/employee');
const Manager = require('./java/manager');
const Engineer = require('./java/engineer');
const Intern = require('./java/intern');

//importing the manager/engineer/intern question files
const managerQuestions = require('./java/managerq');
const engineerQuestions = require('./java/engineerq');
const internQuestions = require('./java/internq');

//importing the generate file
const generateHTML = require('./java/generate')

//importing inquirerer % fs
const fs = require('fs');
const inquirer = require('inquirer');
const path = require("path")

//array to house myTeam
const myTeam = [];

//inquirer functions
//call prompt for engineer questions, create a new engineer based on responses, add new engineer to the myTeamArray
function addEngineer(){
    inquirer.prompt(engineerQuestions).then(response => {
        const engineer = new Engineer(response.name, response.ID, response.email, response.gitHub);
        myTeam.push(engineer);
        newEmployeeCheck();
    })
}

//call prompt for intern questions, create a new intern based on responses, add new intern to the myTeamArray
function addIntern(){
    inquirer.prompt(internQuestions).then(response => {
        const intern = new Intern(response.name, response.ID, response.email, response.school);
        myTeam.push(intern);
        newEmployeeCheck();
    })
}

//checks what type of employee the user would like to add
function addNewEmployee(){
    inquirer.prompt({
        type: 'list',
        name: 'role',
        message: 'Is the new employee an Eningeer or an Intern?',
        choices: ['Engineer', 'Intern'] 
     })
     .then((response) => {
        switch (response.role){
            case "Engineer":
                addEngineer()
                break;
            case "Intern":
                addIntern()
                break;
        }
     })
}

//checks if user would like to add a new employee then calls addNewEmployee, or generates the HTML file
function newEmployeeCheck(){
    inquirer.prompt(
        {
       type: 'list',
       name: 'answer',
       message: 'Add another Employee?',
       choices: ['yes', 'no'] 
    }
    )
    .then((response)  =>  {
        switch (response.answer){
            case "yes": 
                addNewEmployee();
                break;
            case "no":
                writeToFile("index.html", generate(myTeam));
        }
    })
}

//writes the index.html file from generated HTML
function writeToFile(fileName, data){
    try{
        let test = fs.writeFileSync(path.join(process.cwd(), fileName), data);
        console.log('success!');
        return test;
    }
    catch{
        return console.log('HTML generation failed');
    }
  
}


//initialization 
//initailizes the app, calls inquirer to add a manager, calls newEmployeeCheck
function init(){
    inquirer
    .prompt(managerQuestions).then(response => {
        const manager = new Manager(response.name, response.ID, response.email, response.officeNumber) // this works as intended
        myTeam.push(manager);
        newEmployeeCheck();
    })
}

//calls the initilization function
init();