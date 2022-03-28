const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const allEmployeeQuery = 'SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title as Title, role.salary as Salary, department.name AS Department, m.first_name AS Manager FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee m ON employee.manager_id=m.id'


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
        'View All Departments',
        'View All Roles',
        'View All Employees',
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

        case 'View All Departments':
          viewDepartments();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'View All Employees':
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
  
  const addEmployee = () => {
    let manager;
    connection.query("SELECT * FROM employee WHERE role_id = '8'", (err, managerResults) =>{
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
  
  const viewDepartments = () => { 
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      results.forEach((array) => {
        console.log(array.name)
      });
      start();
    });
  };
  
  const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, results) => {
      if (err) throw err;
      results.forEach((array) => {
        console.log(array.title)
      });
      start();
    });
  };
  
  const viewEmployees = () => {
    connection.query(allEmployeeQuery, (err, results) => {
      if (err) throw err;
      console.log('');
      console.table(('All Employees'), results)
      });
      start();
    };

  
  const updateEmployeeRole = () => {
    let employee;
    let role;
  
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
  
      const empChoice = results.map(employee => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        };
      });
  
      inquirer
        .prompt([{
          name: 'employee',
          type: 'list',
          message: 'Select employee to update',
          choices: empChoice
        }])
        .then((data) => {
          employee = data.employee;
          connection.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            const roleChoice = results.map(role => {
              return {
                name: `${role.title}`,
                value: `${role.id}`
              };
            });
  
            inquirer
              .prompt([{
                type: 'list',
                name: 'role',
                message: 'Select new role for employee',
                choices: roleChoice
              }])
              .then((data) => {
                role = data.role
                connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, managers) => {
                  if(err) throw err;
                  const managerChoice = managers.map(employee => {
                    return {
                      name: `${employee.first_name} ${employee.last_name}`,
                      value: employee.id
                    };
                })
                inquirer
                .prompt([{
                  name: 'manager',
                  type: 'list',
                  message: 'Select employee\'s manager',
                  choices: managerChoice
                }])
                .then((data) => {
                  connection.query('UPDATE employee SET ? WHERE ?',
                  [
                    {role_id: role,
                      manager_id: data.manager
                    }
                    ,
                    {id: employee}
                  ],
                  (err, res) => {
                    if (err) throw err;
                    console.log(res)
                    console.log(`${res.affectedRows} Employee successfully updated!`);
                    start();
                   });
                });
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