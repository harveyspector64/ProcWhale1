// File: whale.js

// Initialize canvas and context
const canvas = document.getElementById('whaleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Debug function
function debug(message) {
    console.log(message);
}

// Whale body structure
let whale = {
    points: [], // Array to hold points of the whale's spine
    constraints: [], // Array to hold distance constraints
    segmentCount: 10, // Number of segments in the whale's spine
    segmentLength: 20, // Length of each segment
    baseX: canvas.width / 2, // Base X position of the whale
    baseY: canvas.height / 2, // Base Y position of the whale
    amplitude: 30, // Amplitude of the undulation
    frequency: 0.02 // Frequency of the undulation
};

// Initialize whale points and constraints
function initializeWhale() {
    for (let i = 0; i < whale.segmentCount; i++) {
        whale.points.push({ x: whale.baseX, y: whale.baseY + i * whale.segmentLength });
    }
    for (let i = 0; i < whale.segmentCount - 1; i++) {
        whale.constraints.push({ a: i, b: i + 1, length: whale.segmentLength });
    }
    debug('Whale initialized');
}

// Update whale points based on undulating motion
function updateWhale() {
    for (let i = 0; i < whale.points.length; i++) {
        let point = whale.points[i];
        point.y = whale.baseY + i * whale.segmentLength + Math.sin(Date.now() * whale.frequency + i) * whale.amplitude;
    }
    debug('Whale updated');
}

// Render whale on canvas
function renderWhale() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < whale.points.length - 1; i++) {
        ctx.moveTo(whale.points[i].x, whale.points[i].y);
        ctx.lineTo(whale.points[i + 1].x, whale.points[i + 1].y);
    }
    ctx.strokeStyle = '#000'; // Black color for the whale's body
    ctx.lineWidth = 5; // Thickness of the whale's body
    ctx.stroke();
    debug('Whale rendered');
}

// Animation loop
function animate() {
    updateWhale();
    renderWhale();
    requestAnimationFrame(animate);
}

// Initialize and start animation
initializeWhale();
animate();
