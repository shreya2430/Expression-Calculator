// Initialize canvas and context
const canvas = document.getElementById('calculatorCanvas');
const ctx = canvas.getContext('2d');

function drawWindowControls() {

    // Draw close button (red circle)
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(30, 30, 9, 0, Math.PI * 2);
    ctx.fill();

    // Draw minimize button (yellow circle)
    ctx.fillStyle = '#FFC107';
    ctx.beginPath();
    ctx.arc(60, 30, 9, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw maximize button (green circle)
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(90, 30, 9, 0, Math.PI * 2);
    ctx.fill();
}

drawWindowControls();