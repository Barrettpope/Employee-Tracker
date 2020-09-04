const mysql = require("mysql");
const inquirer = require("inquirer");
const boxen = require("boxen");

// creates the connection information for the sql database
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

// connects to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // runs the start function after the connection is made to prompt the user
    start();
});

// Function which prompts the user for what action they should take
function start() {
    inquirer.prompt([{
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Remove Employee", "Update Employee", "View All Roles", "Add Role", "Remove Role", "Update Role", "View All Departments", "Add Department", "Remove Department", "Update Department",
                "Exit"
            ],
        }])
        .then(function (answer) {
            if (answer.userChoice === "View All Employees") {
                viewEmployees();
            } else if (answer.userChoice === "Add Employee") {
                addEmployee();
            } else if (answer.userChoice === "Remove Employee") {
                removeEmployee();
            } else if (answer.userChoice === "Update Employee") {
                updateEmployee();
            } else if (answer.userChoice === "View All Roles") {
                viewRoles();
            } else if (answer.userChoice === "Add Role") {
                addRole();
            } else if (answer.userChoice === "Remove Role") {
                removeRole();
            } else if (answer.userChoice === "Update Role") {
                updateRole();
            } else if (answer.userChoice === "View All Departments") {
                viewDepartments();
            } else if (answer.userChoice === "Add Department") {
                addDepartment();
            } else if (answer.userChoice === "Remove Department") {
                removeDepartment();
            } else if (answer.userChoice === "Update Department") {
                updateDepartment();
            } else if (answer.userChoice === "Exit") {
                connection.end();
            }

        });
}

function continueOrEnd() {
    inquirer.prompt({
            name: "userChoice",
            type: "list",
            message: "Would you like to continue?",
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            if (answer.userChoice === "Yes") {
                start();
            } else {
                connection.end();
            }
        })
}

// Function to view all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        else {
            console.table(results);
            continueOrEnd();
        };
    });
}

// Function to add a new employee
function addEmployee() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Enter Employee ID:"
            },
            {
                name: "firstName",
                type: "input",
                message: "Enter First Name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter Last Name:"
            },
            {
                name: "role",
                type: "input",
                message: "Enter Role ID:"
            },
            {
                name: "manager",
                type: "input",
                message: "Enter Manager ID:"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?", {
                    id: answer.id,
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                function (err) {
                    if (err) throw err;
                    continueOrEnd();
                }
            );
        });
}

// Function to remove an existing employee
function removeEmployee() {
    connection.query("SELECT concat(id,' ',first_name,' ',last_name) as fullName FROM employee", function (err, results) {
        if (err) throw err;
        let employees = [];
        results.forEach(element => {
            employees.push(element.fullName)
        });
        inquirer
            .prompt({
                name: "employee",
                type: "list",
                message: "Which Employee Would You Like To Remove?",
                choices: employees,
            })
            .then(function (answer) {
                // DELETE FROM employee_tracker.role WHERE id = 4;
                connection.query(`DELETE FROM employee WHERE concat(id,' ',first_name,' ',last_name) = "${answer.employee}"`, function (err) {
                    if (err) throw err;
                    continueOrEnd();
                });
            })
    })
}

function updateEmployee() {
    connection.query("SELECT concat(id,' ',first_name,' ',last_name) as fullName FROM employee", function (err, results) {
        if (err) throw err;
        let employees = [];
        results.forEach(element => {
            employees.push(element.fullName)
        });
        inquirer
            .prompt({
                name: "employee",
                type: "list",
                choices: employees,
                message: "Which Employee Would You Like To Update?"
            })
            .then(function (answer) {
                let id = answer.employee.split(" ");
                inquirer
                    .prompt({
                        name: "employee",
                        type: "list",
                        choices: ["First Name", "Last Name", "Role ID", "Manager ID"],
                        message: "Which Field Would You Like To Update?"
                    })
                    .then(function (answer) {
                        inquirer
                            .prompt({
                                name: "employee",
                                type: "input",
                                message: `Enter New ${answer.employee}:`
                            })
                            .then(function (response) {
                                let field = "";
                                switch (answer.employee) {
                                    case "First Name":
                                        field = "first_name"
                                        break;
                                    case "Last Name":
                                        field = "last_name"
                                        break;
                                    case "Role ID":
                                        field = "role_id"
                                        break;
                                    case "Manager ID":
                                        field = "manager_id"
                                        break;
                                }
                                connection.query(`UPDATE employee SET ${field} = "${response.employee}" WHERE id = ${id[0]}`, function (err) {
                                    if (err) throw err;
                                    continueOrEnd();
                                })

                            })
                    })
            })
    })
}

// Function to view all roles
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        else {
            console.table(results);
            continueOrEnd();
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
            connection.query("INSERT INTO role SET ?", {
                    id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID,
                },
                function (err) {
                    if (err) throw err;
                    continueOrEnd();
                }
            );
        });
}

// Function to remove an existing role
function removeRole() {
    connection.query("SELECT title FROM role", function (err, results) {
        if (err) throw err;
        let titles = [];
        results.forEach(element => {
            titles.push(element.title)
        });
        inquirer
            .prompt({
                name: "role",
                type: "list",
                message: "Which Role Would You Like To Remove?",
                choices: titles,
            })
            .then(function (answer) {
                // DELETE FROM employee_tracker.role WHERE id = 4;
                connection.query(`DELETE FROM role WHERE title = "${answer.role}"`, function (err) {
                    if (err) throw err;
                    continueOrEnd();
                });
            })
    })
}

// Function to update an existing role
function updateRole() {
    connection.query("SELECT title FROM role", function (err, results) {
        if (err) throw err;
        let titles = [];
        results.forEach(element => {
            titles.push(element.title)
        });
        inquirer
            .prompt({
                name: "role",
                type: "list",
                choices: titles,
                message: "Which Role Would You Like To Update?"
            })
            .then(function (answer) {
                let id = answer;
                inquirer
                    .prompt({
                        name: "role",
                        type: "list",
                        choices: ["Title", "Salary", "Department ID"],
                        message: "Which Field Would You Like To Update?"
                    })
                    .then(function (answer) {
                        inquirer
                            .prompt({
                                name: "role",
                                type: "input",
                                message: `Enter New ${answer.role}:`
                            })
                            .then(function (response) {
                                let field = "";
                                switch (answer.role) {
                                    case "Title":
                                        field = "title"
                                        break;
                                    case "Salary":
                                        field = "salary"
                                        break;
                                    case "Department ID":
                                        field = "department_id"
                                        break;
                                }
                                connection.query(`UPDATE role SET ${field} = "${response.role}" WHERE id = ${id}`, function (err) {
                                    if (err) throw err;
                                    continueOrEnd();
                                })

                            })
                    })
            })
    })
}

// Function to view all departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        else {
            console.table(results);
            continueOrEnd();
        };
    });
}

// Function to add a new department
function addDepartment() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Enter Department ID:"
            },
            {
                name: "name",
                type: "input",
                message: "Enter Department Name:"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?", {
                    id: answer.id,
                    name: answer.name,
                },
                function (err) {
                    if (err) throw err;
                    continueOrEnd();
                }
            );
        });
}

// Function to remove an existing department
function removeDepartment() {
    connection.query("SELECT name FROM department", function (err, results) {
        if (err) throw err;
        let names = [];
        results.forEach(element => {
            names.push(element.name)
        });
        inquirer
            .prompt({
                name: "department",
                type: "list",
                message: "Which Department Would You Like To Remove?",
                choices: names,
            })
            .then(function (answer) {
                // DELETE FROM employee_tracker.role WHERE id = 4;
                connection.query(`DELETE FROM department WHERE name = "${answer.department}"`, function (err) {
                    if (err) throw err;
                    continueOrEnd();
                });
            })
    })
}

function updateDepartment() {
    connection.query("SELECT name FROM department", function (err, results) {
        if (err) throw err;
        let names = [];
        results.forEach(element => {
            names.push(element.name)
        });
        inquirer
            .prompt({
                name: "department",
                type: "list",
                choices: names,
                message: "Which Department Would You Like To Update?"
            })
            .then(function (answer) {
                let id = answer.name.split(" ");
                inquirer
                    .prompt({
                        name: "department",
                        type: "list",
                        choices: ["Name"],
                        message: "Which Field Would You Like To Update?"
                    })
                    .then(function (answer) {
                        inquirer
                            .prompt({
                                name: "department",
                                type: "input",
                                message: `Enter New ${answer.department}:`
                            })
                            .then(function (response) {
                                let field = "";
                                switch (answer.department) {
                                    case "Name":
                                        field = "name"
                                        break;
                                }
                                connection.query(`UPDATE department SET ${field} = "${response.department}" WHERE id = ${id[0]}`, function (err) {
                                    if (err) throw err;
                                    continueOrEnd();
                                })

                            })
                    })
            })
    })
}



// Remove, update and view by department & by manager functions need to be finalized
// Ensure all functions are correct and working properly