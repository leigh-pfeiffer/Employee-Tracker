const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'password',
  database: 'employer_tracker',

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
        'Quit'
      ]
    })
    .then((response) => {
      switch (response.options) {
        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Quit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${response.options}`);
          break;

      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter name of the department you will like to add'
    })
    .then((response) => {
      connection.query('INSERT INTO department SET ?', {
          name: response.name
        },
        (err, res) => {
          if (err) throw err;
          console.log('Department successfully added!')
          start();
        });
    });
};
const addRole = () => {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
  
      inquirer
        .prompt([{
            name: 'department',
            type: 'list',
            choices: function () {
              const deptArray = [];
              results.forEach(({
                id,
                name
              }) => {
                deptArray.push({
                  name: name,
                  value: id
                });
              });
              return deptArray;
  
            }
          },
          {
            name: 'title',
            type: 'input',
            message: 'Enter title of role you would like to add'
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter salary for this role'
          }
        ])
        .then((response) => {
          connection.query('INSERT INTO role SET ?', {
              title: response.title,
              salary: response.salary,
              department_id: response.department
            },
            (err, res) => {
              if (err) throw err;
              console.log('Role successfully added!')
              start();
            });
        });
    });
  };
  
  

connection.connect((err) => {
  if (err) throw err;
  start();
});