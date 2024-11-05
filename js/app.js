// Initialize canvas and context
const canvas = document.getElementById('calculatorCanvas');
const ctx = canvas.getContext('2d');

// Helper function to draw rectangles with text
function drawButton(x, y, width, height, color, text = '', textColor = '#FFFFFF') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.lineWidth = 1.2; // Set the border width
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x, y, width, height);

    if (text) {
        ctx.fillStyle = textColor;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + width / 2, y + height / 2);
    }
}

// Draw window controls (red, yellow, green circles)
function drawWindowControls($color, $x) {
    ctx.fillStyle = $color;
    ctx.beginPath();
    ctx.arc($x, 20, 9, 0, Math.PI * 2);
    ctx.fill();
}

// Draw window controls red, yellow, green circles
drawWindowControls('#F44336', 30);
drawWindowControls('#FFC107', 60);
drawWindowControls('#4CAF50', 90);

// Draw display area
function drawDisplay(expression = '0', full_expression = '') {
    ctx.fillStyle = '#2F2F2F';
    ctx.fillRect(10, 45, 504, 80);
    ctx.lineWidth = 1.2; // Set the border width
    ctx.strokeStyle = '#000';
    ctx.strokeRect(10, 45, 504, 80);

    // Placeholder text for display content
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(full_expression, 490, 70);
    ctx.font = '28px Arial';
    ctx.fillText(expression === '' ? '0' : expression, 490, 105);
}
const buttons = [
    ['', '', 'CE', '%', '/'],
    ['(', '7', '8', '9', 'x'],
    [')', '4', '5', '6', '-'],
    ['Back', '1', '2', '3', '+'],
    ['0','.', '=']
];
// Draw calculator buttons
function drawButtons() {
   
    const buttonWidth = 100;
    const buttonHeight = 70;
    const startX = 10;
    const startY = 130;
    const spacing = 1;
    // Iterate over all buttons to draw them
    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < buttons[i].length; j++) {
            let width = buttonWidth;
            if (i === 4 && j === 0) {
                // Make the '0' button wider
                width = buttonWidth * 3 + spacing;
            }
            // Calculate positions explicitly for the '.' and '=' buttons
            let x = startX + j * (buttonWidth + spacing);
            let y = startY + i * (buttonHeight + spacing);

            if (i === 4 && j === 1) { // Position for '.'
                x = startX + (buttonWidth * 3) + (spacing * 3); // Adjust x position for '.'
            } else if (i === 4 && j === 2) { // Position for '='
                x = startX + (buttonWidth * 4) + (spacing * 4); // Adjust x position for '='
            }

            const color = (j === buttons[i].length - 1 || i === buttons.length && j < 3) ? '#FA8231' : '#4A4F50';

            // Draw buttons normally
            drawButton(x, y, width, buttonHeight, color, buttons[i][j]);
        }
    }
}
//add event listener to the canvas to handle button clicks
let expression = '';
let full_expression = '';
let flag = false;

canvas.addEventListener('click', function (event) {
    const buttonWidth = 100;
    const buttonHeight = 70;
    const startX = 10;
    const startY = 130;
    const spacing = 1;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Iterate over all buttons to check if the click is within a button
    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < buttons[i].length; j++) {
            if (i === 0 && (j === 0 || j === 1)) {
                continue; // Skip processing these buttons
            }
            let buttonX = startX + j * (buttonWidth + spacing);
            let buttonY = startY + i * (buttonHeight + spacing);
            let width = buttonWidth;

            // Adjust positions for the last row buttons
            if (i === 4 && j === 0) {
                width = buttonWidth * 3 + spacing; // Adjust width for '0'
            } else if (i === 4 && j === 1) {
                buttonX = startX + (buttonWidth * 3) + (spacing * 3); // Adjust position for '.'
            } else if (i === 4 && j === 2) {
                buttonX = startX + (buttonWidth * 4) + (spacing * 4); // Adjust position for '='
            }

            // Check if the click is within the button boundaries
            if (x > buttonX && x < buttonX + width && y > buttonY && y < buttonY + buttonHeight) {
                // Draw the button with a light white background on click
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Light white background for click effect
                ctx.fillRect(buttonX, buttonY, width, buttonHeight);
                ctx.strokeStyle = '#000'; // Original border color
                ctx.strokeRect(buttonX, buttonY, width, buttonHeight);

                // Redraw the button with its original color after a short delay
                setTimeout(() => {
                    const originalColor = (j === buttons[i].length - 1 || i === buttons.length && j < 3) ? '#FA8231' : '#4A4F50'; // Orange for operator buttons, black for others
                    drawButton(buttonX, buttonY, width, buttonHeight, originalColor, buttons[i][j]);
                }, 150);

                // Call the original button click handling function to process the button's action
                handleButtonClick(buttons[i][j]);
            }
        }
    }
});
//check if the button is a number
function isNumberButton(button) {
    return /^[0-9]$/.test(button);
}
//check if the button is an operator
function isOperatorButton(button) {
    return /^[+\-\/%*]$/.test(button);
}
// Display update and evaluation
function handleButtonClick(button) {
    // Set a maximum length for the input (e.g., 20 characters)
    const maxLength = 30;

    // Check if the expression length exceeds the maximum length
    if (expression.length >= maxLength && button !== 'Back' && button !== 'CE' && button !== '=') {
        alert('Maximum input length reached!');
        return; // Ignore new inputs if the max length is reached, except for backspace and clear
    }

    // Handle button clicks
    if ((button === '=' && expression === '') || (expression === '0' && button === '0') || (button === '' && expression === '')) {
        drawDisplay();
        return;
    }
    else if (button === 'CE') {
        expression = '';
        full_expression = '';
        drawDisplay();
    }
    // Clear the last entry    
    else if (flag && expression !== 'Invalid Expression' && expression !== '') {
        if (button === 'x') { 
                button = '*';
        }
        if (isNumberButton(button)) {
            full_expression = '';
            expression = '';
            expression += button;
            flag = false;
        }
        else if (isOperatorButton(button)) { 
            expression += button;
            flag = false;
        }
    }
    else if (expression === 'Invalid Expression' || flag) {
        expression = ''; // Clear expression if last evaluation was invalid
        full_expression = '';
        drawDisplay();
        flag = false;
        return;
    }
    else if (button === 'x') {
        expression += '*';
    }
    else if (button === 'Back') {
        expression = expression.slice(0, -1);
        if (expression === '') {
            full_expression = '';
        }
    } else if (button === '=') {
        try {
            // Remove leading zeros in numbers to avoid octal interpretation
            expression = expression.replace(/\b0+(?=\d)/g, '');
            full_expression = expression;

            // Evaluate the expression safely
            let result = eval(expression);
            // Limit result to 10 decimal places if it's a floating-point number
            if (result % 1 !== 0) {
                result = parseFloat(result.toFixed(10));
            }
            if (!isFinite(result)) {
                expression = 'Overflow';
            } else {
                expression = result.toString();
            }
            flag = true;
        } catch (e) {
            expression = 'Invalid Expression';
        }
    } else {
        expression += button;
    }
    drawDisplay(expression, full_expression);
}

// Draw all elements
function drawCalculator() {
    drawWindowControls();
    drawDisplay();
    drawButtons();
}

drawCalculator();