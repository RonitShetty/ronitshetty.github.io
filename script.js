// Remove Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5s delay for effect
});


/* --- ADVANCED AI CHATBOT LOGIC --- */
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');

// Toggle Chat Window
function toggleChat() {
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        // Focus input when opened
        setTimeout(() => userInput.focus(), 100);
    } else {
        chatWindow.style.display = 'none';
    }
}

// Handle Enter Key
function handleEnter(event) {
    if (event.key === 'Enter') sendMessage();
}

// Send User Message
function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // Add User Message
    addMessage(text, 'user-msg');
    userInput.value = '';

    // Simulate "Thinking" Delay (makes it feel more real)
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = getSmartResponse(text.toLowerCase());
        addMessage(response, 'bot-msg');
        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

// Add Message to UI
function addMessage(text, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = text; // innerHTML allows links if needed
    chatBody.appendChild(div);
}

// Typing Indicator Visual
function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'bot-msg typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

/* --- KNOWLEDGE BASE --- */
const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "start", "greetings"],
        response: "Hello! I am Ronit's virtual assistant. I can tell you about his <b>Projects</b>, <b>Skills</b>, or how to <b>Contact</b> him."
    },
    {
        keywords: ["citizensafe", "crime", "capstone", "police", "safety"],
        response: "<b>CitizenSafe</b> is Ronit's flagship Capstone project. It uses Multimodal AI (BERT + LSTM) to analyze crime reports and audio distress signals for proactive policing. <a href='https://github.com/RonitShetty' target='_blank' style='color:#64ffda'>Check the repo here.</a>"
    },
    {
        keywords: ["promptfence", "security", "llm", "injection", "hack", "cyber"],
        response: "<b>PromptFence</b> is a research project focusing on LLM Security. It acts as a semantic guardrail to prevent Prompt Injection attacks in Healthcare AI systems."
    },
    {
        keywords: ["skill", "stack", "tech", "python", "java", "react", "language", "code"],
        response: "Ronit's core stack includes:<br>• <b>AI/ML:</b> Python, TensorFlow, PyTorch, BERT<br>• <b>Web:</b> React, Node.js<br>• <b>Data:</b> Apache Hive, Hadoop<br>• <b>Cloud:</b> AWS, Google Cloud"
    },
    {
        keywords: ["contact", "email", "hire", "resume", "reach"],
        response: "You can reach Ronit via email at <a href='mailto:ronitshetty128@nmims.in' style='color:#64ffda'>ronitshetty128@nmims.in</a> or connect on <a href='https://linkedin.com/in/ronit-shetty' target='_blank' style='color:#64ffda'>LinkedIn</a>."
    },
    {
        keywords: ["experience", "work", "job", "internship", "company"],
        response: "Ronit has experience building enterprise-grade AI systems and full-stack applications. Check the <b>About</b> section for his full timeline!"
    },
    {
        keywords: ["big data", "hive", "hadoop", "supply chain"],
        response: "He engineered a <b>Supply Chain Analytics</b> platform using Apache Hive to process large-scale datasets for logistics optimization."
    }
];

// Smart Matching Logic
function getSmartResponse(input) {
    // 1. Check for exact keyword matches
    for (let topic of knowledgeBase) {
        for (let key of topic.keywords) {
            if (input.includes(key)) {
                return topic.response;
            }
        }
    }

    // 2. Fallback for unknown queries
    return "I'm not sure about that yet. Try asking about <b>'Projects'</b>, <b>'Skills'</b>, or <b>'Research'</b>.";
}
// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// 1. Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 80;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    // Init Typewriter
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}

// 2. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// 3. Spotlight Card Effect (Mouse Tracking)
const cards = document.querySelectorAll(".project-card, .small-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});


// 4. Gold Particle Network Background
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#D4AF37'; // Gold color
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#D4AF37';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(212, 175, 55,' + opacityValue + ')'; // Gold connecting lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        initParticles();
    }
);

window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

initParticles();
animate();


/* --- NEURAL SNAKE GAME LOGIC --- */
const modal = document.getElementById("gameModal");
const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");
const scoreElement = document.getElementById("score");

let snake = [{x: 150, y: 150}];
let food = {x: 0, y: 0};
let dx = 10;
let dy = 0;
let score = 0;
let gameInterval;
let isGameRunning = false;

function openGame() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeGame() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    stopGame();
}

function startGame() {
    if(isGameRunning) return;
    isGameRunning = true;
    score = 0;
    scoreElement.innerText = score;
    snake = [{x: 150, y: 150}];
    dx = 10;
    dy = 0;
    createFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(mainGameLoop, 100);
}

function stopGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function mainGameLoop() {
    if (didGameEnd()) {
        alert("System Failure! Data Collection Halted. Score: " + score);
        stopGame();
        return;
    }
    
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    
    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score += 10;
        scoreElement.innerText = score;
        createFood();
    } else {
        snake.pop();
    }
    
    drawGame();
}

function drawGame() {
    // Clear canvas
    gameCtx.fillStyle = "#0a192f";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    // Draw Food
    gameCtx.fillStyle = "#64ffda"; // Green food
    gameCtx.fillRect(food.x, food.y, 10, 10);
    
    // Draw Snake
    snake.forEach(part => {
        gameCtx.fillStyle = "#D4AF37"; // Gold snake
        gameCtx.fillRect(part.x, part.y, 10, 10);
        gameCtx.strokeStyle = "#112240";
        gameCtx.strokeRect(part.x, part.y, 10, 10);
    });
}

function createFood() {
    food.x = Math.floor(Math.random() * (gameCanvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (gameCanvas.height / 10)) * 10;
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

// Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    
    if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -10; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 10; }
}
