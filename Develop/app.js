const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
var allEmployees = [];
//Program Starts Here
askUserForEmployeeData();

function employeeCreator(employeeData) {
  var e;
  if (employeeData.role == "Manager") {
    e = new Manager(
      employeeData.name,
      allEmployees.length,
      employeeData.email,
      employeeData.extraField
    );
  } else if (employeeData.role == "Engineer") {
    e = new Engineer(
      employeeData.name,
      allEmployees.length,
      employeeData.email,
      employeeData.extraField
    );
  } else if (employeeData.role == "Intern") {
    e = new Intern(
      employeeData.name,
      allEmployees.length,
      employeeData.email,
      employeeData.extraField
    );
  }
  allEmployees.push(e);
  console.log(allEmployees);
  askToContinue();
}
function askUserForEmployeeData() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "list",
        message: "What is your Job Role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
      {
        type: "input",
        message: "What is your email address?",
        name: "email",
      },
    ])
    .then(function (data) {
      var messageContent;
      if (data.role == "Manager") {
        messageContent = "OfficeNumber";
      } else if (data.role == "Engineer") {
        messageContent = "GitHubAccount";
      } else if (data.role == "Intern") {
        messageContent = "School";
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "extraField",
            message: `What is your ${messageContent} ?`,
          },
        ])
        .then(function (dataTwo) {
          console.log(data, dataTwo);
          // Data from two sets of prompts is being stored and parsed between Data and DataTwo. DataTwo consists of separate series of questions based on the role
          var employeeData = {
            ...data,
            ...dataTwo,
          };
          employeeCreator(employeeData);
        });
    });
}
function askToContinue() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "keepGoing",
        message: "Do you want to add another employee?",
      },
    ])
    .then(function (data) {
      console.log(data);
      if (data.keepGoing) {
        askUserForEmployeeData();
      } else {
        console.log(allEmployees);
        //Process Data and output HTML File
        renderEmployees();
      }
    });
}
function renderEmployees() {
  // var filename = data.name.toLowerCase().split(" ").join("") + ".json";
  var htmlFile = render(allEmployees);
  console.log(htmlFile);

  fs.writeFile(outputPath, htmlFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!");
  });
}
