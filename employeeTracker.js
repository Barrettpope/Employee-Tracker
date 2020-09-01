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

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

function employeesByDepartment() {
    inquirer
        .prompt({
            name: "employeeDepartment",
            type: "list",
            message: "Select Department ID",
            choices: ["1", "2", "3", "4"]
        })
        .then(function (answer) {
            if (answer.employeeDepartment === "1") {

            } else if (answer.employeeDepartment === "2") {

            } else if (answer.employeeDepartment === "3") {

            } else if (answer.employeeDepartment === "4") {

            } else {
                connection.end();
            }
        });
}

function employeesByManager() {
    inquirer
        .prompt({
            name: "employeeManager",
            type: "list",
            message: "Select Manager ID",
            choices: ["Accounting", "Marketing", "Engineering", "Operations"]
        })
        .then(function (answer) {
            if (answer.employeeDepartment === "Accounting") {

            } else if (answer.employeeDepartment === "Marketing") {

            } else if (answer.employeeDepartment === "Engineering") {

            } else if (answer.employeeDepartment === "Operations") {

            } else {
                connection.end();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Enter Employee ID"
            },
            {
                name: "firstName",
                type: "input",
                message: "Enter Employee's First Name"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter Employee's Last Name"
            },
            {
                name: "role",
                type: "input",
                message: "Enter Role ID"
            },
            {
                name: "manager",
                type: "input",
                message: "Enter Manager ID"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET", {
                id: answer.id,
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.role,
                manager_id: answer.manager
            })
        })
}

function removeEmployee() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt({
                name: "employee",
                type: "rawlist",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {

                    }
                },
                message: "Which Employee Would You Like To Remove?"
            })
    })
}

function updateRole() {

}

function updateManager() {

}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

function addRole() {

}

function removeRole() {

}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

function addDepartment() {

}

function removeDepartment() {

}