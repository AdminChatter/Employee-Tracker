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

