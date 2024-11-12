import inquirer from 'inquirer';
import { pool, connectToDb } from './db/connection.js';
import { QueryResult } from 'pg';

await connectToDb();

function startClient(): void{
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Would you like to do?',
            choices: [
                'View All Department',
                'View All Roles', 
                'View All Employees',
                'Add A Department', 
                'Add A Role', 
                'Add An Employee', 
                'Update An Employee Role',
                'Update Employee Manager',
                'View Employees By Manager',
                'View Employees By Department',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View Total Utilized Budget By Department'
            ],
        },
    ])
    .then((answers) => {
        switch(answers.options){
            case 'View All Department':
                viewAllDepartment();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View Employees By Manager':
                viewEmployeesByManager();
                break;
            case 'View Employees By Department':
                viewEmployeesByDepartment();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'View Total Utilized Budget By Department':
                viewTotalUtilizedBudgetByDepartment();
                break;
        }
    })
}

function viewAllDepartment(): void{
    pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        console.table(result.rows);
        startClient();
    });
}

function viewAllRoles(): void{
    pool.query('SELECT * FROM role', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        console.table(result.rows);
        startClient();
    });
}

function viewAllEmployees(): void{
    pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        console.table(result.rows);
        startClient();
    });
}

function addDepartment(): void{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ])
    .then((answers) => {
        pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
            if(error){
                console.log(error);
            }
            // Check if the department already exists
            if(result.rows.length === 0 || result.rows.filter((department: any) => department.name === answers.name).length === 0){
                pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name], (error: Error, result: QueryResult) => {
                    if(error){
                        console.log(error);
                    }
                    console.table(result.rows);
                    console.log('Department added successfully.');
                    startClient();
                });
            }
            // If the department already exists
            else{
                console.log('Department already exists.');
                startClient();
            }
        });
    });
}

function addRole(): void{
    pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does the role belong to?',
                choices: result.rows.map((department: any) => department.name),
            },
        ])
        .then((answers) => {
            const departmentId = result.rows.filter((department: any) => department.name === answers.department)[0].id;
            pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, departmentId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                console.table(result.rows);
                console.log('Role added successfully.');
                startClient();
            });
        });
    });
}

function addEmployee(): void{
    pool.query('SELECT * FROM role', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: result.rows.map((role: any) => role.title),
            },
        ])
        .then((answers) => {
            const roleId = result.rows.filter((role: any) => role.title === answers.role)[0].id;
            pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager of the employee?',
                        choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
                    },
                ])
                .then((answers2) => {
                    const managerId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers2.manager)[0].id;
                    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, roleId, managerId], (error: Error, result: QueryResult) => {
                        if(error){
                            console.log(error);
                        }
                        console.table(result.rows);
                        console.log('Employee added successfully.');
                        startClient();
                    });
                });
            });
        });
    });
}

function updateEmployeeRole(): void{
    pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
            },
        ])
        .then((answers) => {
            const employeeId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers.employee)[0].id;
            pool.query('SELECT * FROM role', (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role of the employee?',
                        choices: result.rows.map((role: any) => role.title),
                    },
                ])
                .then((answers2) => {
                    const roleId = result.rows.filter((role: any) => role.title === answers2.role)[0].id;
                    pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId], (error: Error, result: QueryResult) => {
                        if(error){
                            console.log(error);
                        }
                        console.table(result.rows);
                        console.log('Employee role updated successfully.');
                        startClient();
                    });
                });
            });
        });
    });
}

function updateEmployeeManager(): void{
    pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
            },
        ])
        .then((answers) => {
            const employeeId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers.employee)[0].id;
            pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the new manager of the employee?',
                        choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
                    },
                ])
                .then((answers2) => {
                    const managerId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers2.manager)[0].id;
                    pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId], (error: Error, result: QueryResult) => {
                        if(error){
                            console.log(error);
                        }
                        console.table(result.rows);
                        console.log('Employee manager updated successfully.');
                        startClient();
                    });
                });
            });
        });
    });
}

function viewEmployeesByManager(): void{
    pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'manager',
                message: 'Which manager would you like to view employees for?',
                choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
            },
        ])
        .then((answers) => {
            const managerId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers.manager)[0].id;
            pool.query('SELECT * FROM employee WHERE manager_id = $1', [managerId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                console.table(result.rows);
                startClient();
            });
        });
    });
}

function viewEmployeesByDepartment(): void{
    pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view employees for?',
                choices: result.rows.map((department: any) => department.name),
            },
        ])
        .then((answers) => {
            const departmentId = result.rows.filter((department: any) => department.name === answers.department)[0].id;
            pool.query('SELECT * FROM role WHERE department_id = $1', [departmentId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                const roleIds = result.rows.map((role: any) => role.id);
                pool.query('SELECT * FROM employee WHERE role_id = ANY($1)', [roleIds], (error: Error, result: QueryResult) => {
                    if(error){
                        console.log(error);
                    }
                    console.table(result.rows);
                    startClient();
                });
            });
        });
    });
}

function deleteDepartment(): void{
    pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: result.rows.map((department: any) => department.name),
            },
        ])
        .then((answers) => {
            const departmentId = result.rows.filter((department: any) => department.name === answers.department)[0].id;
            pool.query('DELETE FROM department WHERE id = $1', [departmentId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                console.table(result.rows);
                console.log('Department deleted successfully.');
                startClient();
            });
        });
    });
}

function deleteRole(): void{
    pool.query('SELECT * FROM role', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Which role would you like to delete?',
                choices: result.rows.map((role: any) => role.title),
            },
        ])
        .then((answers) => {
            const roleId = result.rows.filter((role: any) => role.title === answers.role)[0].id;
            pool.query('DELETE FROM role WHERE id = $1', [roleId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                console.table(result.rows);
                console.log('Role deleted successfully.');
                startClient();
            });
        });
    });
}

function deleteEmployee(): void{
    pool.query('SELECT * FROM employee', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: result.rows.map((employee: any) => `${employee.first_name} ${employee.last_name}`),
            },
        ])
        .then((answers) => {
            const employeeId = result.rows.filter((employee: any) => `${employee.first_name} ${employee.last_name}` === answers.employee)[0].id;
            pool.query('DELETE FROM employee WHERE id = $1', [employeeId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                console.table(result.rows);
                console.log('Employee deleted successfully.');
                startClient();
            });
        });
    });
}

function viewTotalUtilizedBudgetByDepartment(): void{
    pool.query('SELECT * FROM department', (error: Error, result: QueryResult) => {
        if(error){
            console.log(error);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view the total utilized budget for?',
                choices: result.rows.map((department: any) => department.name),
            },
        ])
        .then((answers) => {
            const departmentId = result.rows.filter((department: any) => department.name === answers.department)[0].id;
            pool.query('SELECT * FROM role WHERE department_id = $1', [departmentId], (error: Error, result: QueryResult) => {
                if(error){
                    console.log(error);
                }
                const roleIds = result.rows.map((role: any) => role.id);
                pool.query('SELECT * FROM employee WHERE role_id = ANY($1)', [roleIds], (error: Error, result: QueryResult) => {
                    if(error){
                        console.log(error);
                    }
                    const totalUtilizedBudget = result.rows.reduce((acc: number, employee: any) => acc + employee.salary, 0);
                    console.log(`Total utilized budget for ${answers.department}: $${totalUtilizedBudget}`);
                    startClient();
                });
            });
        });
    });
}

