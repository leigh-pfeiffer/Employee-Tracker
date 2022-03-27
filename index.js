const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',
    database: 'employee_tracker',

});

const start = () => {
    inquirer
        .prompt({
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add Department',
                'Add Role',
                'Add Employee',
                'View Departments',
                'View Roles',
                'View Employees',
                'Update Employee Role',
                'Update Employee Manager',
                'View employees by manager',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View the total utilized budget of a department'
            ]
        })
        .then((responce) => {
            switch (responce.options) {
                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case "view Departments":
                    viewDepartment();
                    break;

                case 'View Roles':
                    break;
                case 'View Employees':
                    break;
                case 'View Employee Role':
                    break;
                case 'View Employee Manager':
                    break;
                case 'View Employees by Manager':
                    break;
                case 'Delete Department':
                    break;
                case 'Delete Role':
                    break;
                case 'Delete Employee':
                    break;
                case 'View the total utilized budget of a deptment':
                    break;
                case 'Quit':
                    break;
                default:
                    console.log('Invalid action: ${responce.options}');
                    break;

            }
        })
}

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter name of the department you will like to add'
        })
        .then((Responce) => {
            connection.query('INSERT INTO department SET ?', {
                name: responce.name
            },
                (err, res) => {
                    if (err) throw err;
                    consloe.log('department added')
                    start();
                })

        })
}
const addRole = () => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "departemnt",
                type: 'rawlist',
                choices: function () {
                    const deptArray = [];
                    results.forEach(({
                        name
                    }) => {
                        deptArray.push(name);
                    });
                    return deptArray;
                }
            },

            ])

    })
}
connection.connect((err) => {
    if (err) throw err;

})