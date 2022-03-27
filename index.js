const mysql = require('mysql2');
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
        .then((response) => {
            connection.query('INSERT INTO department SET ?', {
                name: response.name
            },
                (err, res) => {
                    if (err) throw err;
                    console.log('department added')
                    start();
                })

        })
}
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
  
  const addEmployee = () => {
    let manager;
    connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, managerResults) =>{
      if (err) throw err;
      
      const managerChoice = managerResults.map(employee => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        };
      });
      inquirer
        .prompt([{
          name: 'manager',
          type: 'list',
          message: 'Select employee\'s manager',
          choices: managerChoice
        }])
        .then ((data) => {
          manager = data.manager
  
          connection.query('SELECT * FROM role', (err, results) => {
            if(err) throw err;
  
            inquirer
            .prompt([
              {
                name: 'role',
                type: 'list',
                message: 'Enter employee\'s role',
                choices: function () {
                  const roleArray = [];
                  results.forEach(({
                    title,
                    id
                  }) => {
                    roleArray.push({
                      name: title, 
                      value: id
                    });
                  });
                  return roleArray
                },
              },
              {
                name: 'firstName', 
                type: 'input', 
                message: 'Enter employee\'s first name'
              },
              {
                name: 'lastName',
                type: 'input',
                message: 'Enter employee\'s last name'
              }
            ])
          .then((answer) => {
            connection.query('INSERT INTO employee SET ?', {
              first_name: answer.firstName, 
              last_name: answer.lastName,
              role_id: answer.role,
              manager_id: manager
            },
            (err, res) => {
              if(err) throw err;
              console.log('Employee successfully added!');
              start();
            });
          });
        });
      });
    });
  };
  
 
  connection.connect((err) => {
    if (err) throw err;
    start();
  });