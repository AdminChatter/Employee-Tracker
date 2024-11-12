# Employee Tracker

## Description

The **Employee Tracker** is a command-line application designed to manage a company's employee database. This project is aimed at providing an intuitive and efficient way for business owners to view and manage departments, roles, and employees, thus aiding in organizational planning and decision-making. The application leverages Node.js, Inquirer, and PostgreSQL to create a robust Content Management System (CMS).

### Motivation
- Simplify database interactions for non-developers.
- Create a tool to facilitate business operations by providing structured access to employee-related data.

### Problem Solved
- Provides a comprehensive way to manage organizational structure through a user-friendly CLI interface.

### Lessons Learned
- Implementing relational database schemas effectively.
- Integrating Node.js with PostgreSQL for seamless data manipulation.
- Creating dynamic CLI-based interactions using the Inquirer package.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

To set up the project on your local machine, follow these steps:

1. Clone the repository to your local system.
2. Navigate to the project directory.
3. Install the required packages:
   ```bash
   npm install
4. Set up the PostgreSQL database using the provided schema and seed files.

## Usage
1. Start the application:
```bash
npm run start
```

2. Follow the menu prompts to:
- View all departments, roles, or employees.
- Add new departments, roles, or employees.
- Update existing employee roles.
- View employees by manager or department.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.<BR>
Click the license above to learn more about this license.

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)
![Javascript](https://img.shields.io/badge/Javascript-blue.svg)
![CommandLine](https://img.shields.io/badge/CommandLine-green.svg)

## Features
- View all departments, roles, and employees in an organized format.
- Add and update employee data seamlessly.
- Filter employee views by manager or department.
- Calculate the total budget utilization of departments.

## How to Contribute
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-name).
5. Open a Pull Request.