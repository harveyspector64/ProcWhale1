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
    amplitude: 10, // Amplitude of the undulation
    frequency: 0.001, // Frequency of the undulation
    bodyWidths: [], // Array to hold the width of each body segment
    moving: false, // Flag to check if the whale is moving
    direction: { x: 0, y: 0 } // Direction of movement
};

// Initialize whale points and constraints
function initializeWhale() {
    for (let i = 0; i < whale.segmentCount; i++) {
        whale.points.push({ x: whale.baseX, y: whale.baseY + i * whale.segmentLength });
        whale.bodyWidths.push(20 + 10 * Math.cos(Math.PI * i / (whale.segmentCount - 1))); // Example body width calculation
    }
    for (let i = 0; i < whale.segmentCount - 1; i++) {
        whale.constraints.push({ a: i, b: i + 1, length: whale.segmentLength });
    }
    debug('Whale initialized');
}

// Apply constraints to ensure natural movement
function applyConstraints() {
    // Apply distance constraints
    for (let constraint of whale.constraints) {
        let pointA = whale.points[constraint.a];
        let pointB = whale.points[constraint.b];
        let dx = pointB.x - pointA.x;
        let dy = pointB.y - pointA.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let difference = (distance - constraint.length) / distance;
        let offsetX = dx * difference * 0.5;
        let offsetY = dy * difference * 0.5;
        pointA.x += offsetX;
        pointA.y += offsetY;
        pointB.x -= offsetX;
        pointB.y -= offsetY;
    }

    // Apply angle constraints to maintain whale shape
    for (let i = 1; i < whale.points.length - 1; i++) {
        let prev = whale.points[i - 1];
        let curr = whale.points[i];
        let next = whale.points[i + 1];

        let dx1 = curr.x - prev.x;
        let dy1 = curr.y - prev.y;
        let dx2 = next.x - curr.x;
        let dy2 = next.y - curr.y;

        let angle1 = Math.atan2(dy1, dx1);
        let angle2 = Math.atan2(dy2, dx2);

        let angleDiff = angle2 - angle1;
        if (Math.abs(angleDiff) > Math.PI / 4) { // Example maximum angle constraint
            let adjustment = (angleDiff > 0 ? 1 : -1) * (Math.abs(angleDiff) - Math.PI / 4);
            curr.x += Math.cos(angle1 + adjustment) * whale.segmentLength;
            curr.y += Math.sin(angle1 + adjustment) * whale.segmentLength;
        }
    }
}

// Update whale points based on undulating motion and apply constraints
function updateWhale() {
    for (let i = 0; i < whale.points.length; i++) {
        let point = whale.points[i];
        if (whale.moving) {
            point.x += whale.direction.x;
            point.y += whale.direction.y + Math.sin(Date.now() * whale.frequency + i) * whale.amplitude;
        } else {
            point.x += whale.direction.x * 0.9; // Damping effect when stopping
            point.y += whale.direction.y * 0.9;
        }
    }
    applyConstraints();
    debug('Whale updated');
}

// Render whale on canvas
function renderWhale() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < whale.points.length - 1; i++) {
        let point = whale.points[i];
        let nextPoint = whale.points[i + 1];
        let width = whale.bodyWidths[i];

        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);

        // Draw ellipse for body segment
        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x));
        ctx.beginPath();
        ctx.ellipse(0, 0, whale.segmentLength, width / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    ctx.strokeStyle = '#000'; // Black color for the whale's body
    ctx.lineWidth = 2; // Thickness of the whale's body
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
