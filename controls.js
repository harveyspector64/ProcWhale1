// File: controls.js

// Handle user input for movement
function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            whale.direction.y = -1;
            whale.moving = true;
            break;
        case 'ArrowDown':
            whale.direction.y = 1;
            whale.moving = true;
            break;
        case 'ArrowLeft':
            whale.direction.x = -1;
            whale.moving = true;
            break;
        case 'ArrowRight':
            whale.direction.x = 1;
            whale.moving = true;
            break;
        default:
            whale.direction.x = 0;
            whale.direction.y = 0;
            whale.moving = false;
            break;
    }
}

// Stop movement when key is released
function stopMovement() {
    whale.direction.x = 0;
    whale.direction.y = 0;
    whale.moving = false;
}

// Add event listeners for user input
window.addEventListener('keydown', handleInput);
window.addEventListener('keyup', stopMovement);
