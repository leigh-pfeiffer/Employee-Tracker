
INSERT INTO department (name)
VALUES 
('Sales'), 
('Engineering'), 
('Legal'), 
('Finance'),
('Management');

INSERT role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1), 
('Salesperson', 80000, 1), 
('Lead Engineer', 150000, 2), 
('Software Engineer', 120000, 2), 
('Accountant', 125000, 4), 
('Legal Team Lead', 250000, 3), 
('Lawyer', 190000, 3),
('Manager', 250000, 5);


INSERT employee (first_name, last_name, role_id)
VALUES 
('Malia', 'Brown', 8), 
('Christian', 'Eckenrode', 8), 
('Ashley', 'Rodriguez', 8), 
('Sarah', 'Lourd', 8);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES  
('Mike', 'Chan', 1, 1), 
('Tom', 'Allen', 2, 1), 
('Tammer', 'Galal', 4, 3), 
('Layla', 'Smith', 4, 3), 
('John', 'Doe', 7, 4), 
('Kevin', 'Tupik', 7, 4);

