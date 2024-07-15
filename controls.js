// File: controls.js

// Handle user input for movement
function handleInput(event) {
    whale.moving = true;
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            whale.direction.y = -1;
            break;
        case 'ArrowDown':
        case 's':
            whale.direction.y = 1;
            break;
        case 'ArrowLeft':
        case 'a':
            whale.direction.x = -1;
            break;
        case 'ArrowRight':
        case 'd':
            whale.direction.x = 1;
            break;
        case 'ArrowUp+ArrowLeft':
        case 'w+a':
            whale.direction.y = -1;
            whale.direction.x = -1;
            break;
        case 'ArrowUp+ArrowRight':
        case 'w+d':
            whale.direction.y = -1;
            whale.direction.x = 1;
            break;
        case 'ArrowDown+ArrowLeft':
        case 's+a':
            whale.direction.y = 1;
            whale.direction.x = -1;
            break;
        case 'ArrowDown+ArrowRight':
        case 's+d':
            whale.direction.y = 1;
            whale.direction.x = 1;
            break;
        default:
            whale.moving = false;
            whale.direction.x = 0;
            whale.direction.y = 0;
            break;
    }
}

// Stop movement when key is released
function stopMovement() {
    whale.moving = false;
    whale.direction.x = 0;
    whale.direction.y = 0;
}

// Add event listeners for user input
window.addEventListener('keydown', handleInput);
window.addEventListener('keyup', stopMovement);
