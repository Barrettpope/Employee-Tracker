const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Olivander14!",
    database: "employee_tracker"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// Function which prompts the user foor what action they should take
function start() {
    inquirer.prompt({
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department"]
        })
        .then(function (answer) {
            if (answer.userChoice === "View All Employees") {
                viewEmployees();
            } else if (answer.userChoice === "View All Employees By Department") {
                employeesByDepartment();
            } else if (answer.userChoice === "View All Employees By Manager") {
                employeesByManager();
            } else if (answer.userChoice === "Add Employee") {
                addEmployee();
            } else if (answer.userChoice === "Remove Employee") {
                removeEmployee();
            } else if (answer.userChoice === "Update Employee Role") {
                updateRole();
            } else if (answer.userChoice === "Update Employee Manager") {
                updateManager();
            } else if (answer.userChoice === "View All Roles") {
                viewRoles();
            } else if (answer.userChoice === "Add Role") {
                addRole();
            } else if (answer.userChoice === "Remove Role") {
                removeRole();
            } else if (answer.userChoice === "View All Departments") {
                viewDepartments();
            } else if (answer.userChoice === "Add Department") {
                addDepartment();
            } else if (answer.userChoice === "Remove Department") {
                removeDepartment();
            } else {
                connection.end();
            }
        });
}