var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
document.addEventListener('keydown', changeDirection);

var box = 20;
let snake = []; // Array to store snake segments

var game;
snake[0] = { x: 10 * box, y: 10 * box };

let score = 0;

var direction = "RIGHT";
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function eatFood() {
    // Create a new segment for the snake's head
    const newHead = {
        x: snake[0].x, // Calculate new x position
        y: snake[0].y, // Calculate new y position
    };

    snake.unshift(newHead); // Add the new segment to the beginning of the array

    // ... (existing code to check for collision with food and update food position) ...
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, 16 * box, 16 * box);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw each segment of the snake
    snake.forEach(segment => {
        // Draw each segment at its respective position
        context.fillStyle = "green"; // Set color for snake segments
        context.fillRect(segment.x, segment.y, box, box); // Draw segment
    });

    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

function update() {
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // Check if the snake has hit the sides
    if (snakeX < 0 || snakeY < 0 || snakeX > canvas.width || snakeY > canvas.height) {
        clearInterval(game);
        alert('Game Over');
    }

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        eatFood();
    } else {
        snake.pop();
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

game = setInterval(function () {
    update();
    draw();
}, 100);

function changeDirection(event) {
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    var keyPressed = event.keyCode;
    var goingUp = direction === "UP";
    var goingDown = direction === "DOWN";
    var goingRight = direction === "RIGHT";
    var goingLeft = direction === "LEFT";

    if (keyPressed === LEFT_KEY && !goingRight) {
        direction = "LEFT";
    }

    if (keyPressed === UP_KEY && !goingDown) {
        direction = "UP";
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        direction = "RIGHT";
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        direction = "DOWN";
    }
}