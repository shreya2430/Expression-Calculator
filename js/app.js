// Initialize canvas and context
const canvas = document.getElementById('calculatorCanvas');
const ctx = canvas.getContext('2d');

// Helper function to draw rectangles with text
function drawButton(x, y, width, height, color, text = '', textColor = '#FFFFFF') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
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
function drawWindowControls() {
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(30, 20, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFC107';
    ctx.beginPath();
    ctx.arc(60, 20, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(90, 20, 9, 0, Math.PI * 2);
    ctx.fill();
}

// Draw display area
function drawDisplay() {
    ctx.fillStyle = '#2F2F2F';
    ctx.fillRect(10, 40, 505, 80);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(10, 40, 505, 80);

    // Placeholder text for display content
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('(8/2)*(2+3/3)', 490, 70);
    ctx.font = '28px Arial';
    ctx.fillText('12', 490, 105);
}
const buttons = [
    ['', '', '', '%', '/'],
    ['(', '7', '8', '9', '*'],
    [')', '4', '5', '6', '-'],
    ['Back', '1', '2', '3', '+'],
    ['0', '', '', '.', '=']
];
// Draw calculator buttons
function drawButtons() {
   
    const buttonWidth = 100;
    const buttonHeight = 70;
    const startX = 10;
    const startY = 130;
    const spacing = 1;

    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < buttons[i].length; j++) {
            let width = buttonWidth;
            if (i === 4 && j === 0) {
                // Make the '0' button wider
                width = buttonWidth * 3 + spacing;
            }
            if (i == 1 && j == 4) {
                buttons[i][j] = 'x';
            }

            const x = startX + j * (buttonWidth + spacing);
            const y = startY + i * (buttonHeight + spacing);
            const color = (j === buttons[i].length - 1 || i === buttons.length  && j < 3) ? '#FA8231' : '#4A4F50';

            if (!(i === 4 && (j === 1 || j==2))) { // Skip a column position for wider '0'
                drawButton(x, y, width, buttonHeight, color, buttons[i][j]);
            }
        }
    }
}
//add event listener to the canvas to handle button clicks
let expression = '';
canvas.addEventListener('click', function (event) { 
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y);
    // Check if the click was inside the button area
    if (x > 10 && x < 515 && y > 130 && y < 510) {
        const row = Math.floor((y - 130) / 71);
        const col = Math.floor((x - 10) / 101);

        const button = buttons[row][col];
        if (button === 'Back') {
            expression = expression.slice(0, -1);
        } else if (button === '=') {
            try {
                expression = eval(expression).toString();
            } catch (e) {
                expression = 'Invalid expression';
            }
        } else {
            expression += button;
        }
        drawDisplay();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '28px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(expression, 490, 105);
    }
});

// Draw all elements
function drawCalculator() {
    drawWindowControls();
    drawDisplay();
    drawButtons();
}

drawCalculator();