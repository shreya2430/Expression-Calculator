# Expression Calculator Using HTML Canvas

## Project Description

This project is an interactive calculator built using the HTML Canvas API, JavaScript, and SCSS. The calculator emulates a real-world calculator's appearance and functionality, allowing users to input and evaluate expressions directly on the canvas. The project showcases the use of JavaScript's Canvas API to render a dynamic, interactive interface without the use of frameworks.

## Functionality

- **Expression Evaluation**: Users can input arithmetic expressions and evaluate them by clicking the `=` button.
- **Backspace**: A `Back` button allows users to delete the last character in the current expression.
- **Error Handling**: If the user enters a malformed expression, an "Invalid Expression" message is shown.
- **Arithmetic Operations**: Supports basic operations including addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulus (`%`).
- **Clear Expression**: The `CE` button clears the entire input.

## Technologies Used

- **HTML**: Structure of the web page.
- **SCSS**: Styling of the application, providing an organized way to write CSS.
- **JavaScript**: Core logic and interaction using the Canvas API to handle rendering and user input.
- **Node.js**: For running scripts to compile SCSS into CSS.

## Instructions to Run the Project

1. **Ensure Node.js is installed**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Clone the repository**:

    ```bash
    git clone <repository-url>
    ```

3. **Navigate to the project directory**:

    ```bash
    cd <project-directory>
    ```

4. **Install project dependencies**:

    ```bash
    npm install
    ```

5. **Compile SCSS to CSS**:

    ```bash
    npm run sass
    ```

6. **Open `index.html` in your web browser**.

## Project Structure

- **index.html**: Contains the main structure and canvas element.
- **styles.scss**: Styles for the calculator interface.
- **styles.css**: Compiled CSS file generated from `styles.scss`.
- **app.js**: The main JavaScript file that contains the logic for rendering the calculator, handling user inputs, and evaluating expressions.
- **package.json**: Contains scripts and project metadata.
- **.gitignore**: Specifies files and directories to be ignored by Git (e.g., `node_modules`, `*.log`).
- **README.md**: Project documentation.

## How to Use the Calculator

1. Click on the buttons displayed on the canvas to input numbers and arithmetic operators.
2. Use the `Back` button to remove the last character.
3. Click `=` to evaluate the expression.
4. Press `CE` to clear the current input.
5. If an invalid expression is detected, the display will show "Invalid Expression".

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_4kfLwGr)
