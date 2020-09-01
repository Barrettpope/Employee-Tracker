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

// Function which prompts the user for what action they should take
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

// Function to view all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

// Function to view employees by department
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

// Function to view employees by manager
function employeesByManager() {
    inquirer
        .prompt({
            name: "employeeManager",
            type: "list",
            message: "Select Manager ID",
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

// Function to add a new employee
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
                message: "Enter First Name"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter Last Name"
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
                },
                function (err) {
                    if (err) throw err;
                    start();
                }
            );
        });
}

// Function to remove an existing employee
function removeEmployee() {
    connection.query("DELETE * FROM employee", function (err, results) {
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

// Function to view all roles
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

// Function to add a new role
function addRole() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Enter Role ID"
            },
            {
                name: "title",
                type: "input",
                message: "Enter Title"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter Salary"
            },
            {
                name: "departmentID",
                type: "input",
                message: "Enter Department ID"
            },
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET", {
                    id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID,
                },
                function (err) {
                    if (err) throw err;
                    start();
                }
            );
        });
}

// Function to remove an existing role
function removeRole() {
    connection.query("DELETE * FROM role", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt({
                name: "role",
                type: "rawlist",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {

                    }
                },
                message: "Which Role Would You Like To Remove?"
            })
    })
}

// Function to view all departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        else {
            return results;
        };
    });
}

// Function to add a new department
function addDepartment() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Enter Department ID"
            },
            {
                name: "name",
                type: "input",
                message: "Enter Department Name"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET", {
                    id: answer.id,
                    name: answer.name,
                },
                function (err) {
                    if (err) throw err;
                    start();
                }
            );
        });
}

// Function to remove an existing department
function removeDepartment() {
    connection.query("DELETE * FROM department", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt({
                name: "department",
                type: "rawlist",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {

                    }
                },
                message: "Which Department Would You Like To Remove?"
            })
    })
}