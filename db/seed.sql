-- Insert into department
INSERT INTO department (name)
VALUES  ('Engineering'), 
        ('Finance'), 
        ('Legal'), 
        ('Sales');

-- Ensure the department table was populated correctly
SELECT * FROM department;

-- Insert into role (ensure department_id exists)
INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 1000.00, 1), 
        ('Accountant', 800.00, 2), 
        ('Lawyer', 1200.00, 3), 
        ('Sales Lead', 800.00, 4);

-- Ensure the role table was populated correctly
SELECT * FROM role;

-- Insert into employee (ensure role_id exists)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Jason', 'Wu', 1, NULL), 
        ('Joanna', 'Smith', 2, 1), 
        ('Emily', 'Johnson', 3, 1), 
        ('Chris', 'Lee', 4, 2);

-- Ensure the employee table was populated correctly
SELECT * FROM employee;

