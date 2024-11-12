INSERT INTO department (name)
VALUES  ('Engineering'), 
        ('Finance'), 
        ('Legal'), 
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 1000.00, 1), 
        ('Accountant', 800.00, 2), 
        ('Lawyer', 1200.00, 3), 
        ('Sales Lead', 800.00, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Jason', 'Wu', 1), 
        ('Joanna', 'Fu', 2), 
        ('Bob', 'Li', 3), 
        ('Tommy', 'Gui', 4);
