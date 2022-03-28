# Employee-Tracker

## Description
Employee Tracker is an application for business owners to view and manage departments, roles, and employees in their company to help them plan and organize their business.  

## Video Demonstration
[![Video Demonstration]](https://drive.google.com/file/d/1Hywd2ZWuJ70gLQf004QS3iHChIlBkS1D/view)

## Table of Contents
* [Installation](#installation)
* [Built With](#built-with)
* [Usage](#usage)
* [License](#license)

## Installation
1. Copy the clone link of the repository from GitHub.
2. Open Bash or Terminal Window.
3. When the console opens, navigate to the directory the repository will be added to. *Remember to use the command cd to change directories.*
4. In the console, type the command <i> git clone </i> and paste the link to repository.
5. Open repository in preferred code editor.
6. Open terminal in code editor.
7. Type in terminal <i>npm i</i> or <i>npm install </i> to install dependency packages needed.

*Ensure the following packages are installed. (To install packages, open the terminal in preferred coder editor and type npm install)*
- Inquirer
- mysql
- console.table

## Built With
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Inquirer](https://www.npmjs.com/package/inquirer) - Dependency for command line
* [MySQL](https://www.mysql.com/) - Relational database
* [console.table](https://www.npmjs.com/package/console.table)

## Usage
1. User will open the terminal and type <i> npm start </i>.
2. User will be presented with a prompt and select to add/view departments, roles, employees or update an employee's role. 
3. Once the user has selected what to do, they will be prompted with additional questions depending on what was selected and perform it's function (viewing parts of the table, inserting data to table or updating an employee's role)