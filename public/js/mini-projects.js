// ===================================
// Mini Projects JavaScript
// ===================================

// Mini Projects Data
const miniProjects = [
    {
        id: 'calculator',
        title: '🔢 Calculadora',
        category: 'tools',
        description: 'Calculadora completa con operaciones básicas',
        icon: 'fas fa-calculator'
    },
    {
        id: 'todo',
        title: '✅ Lista de Tareas',
        category: 'productivity',
        description: 'Administra tus tareas con localStorage',
        icon: 'fas fa-list-check'
    },
    {
        id: 'color-picker',
        title: '🎨 Selector de Colores',
        category: 'design',
        description: 'Generador de paletas de colores',
        icon: 'fas fa-palette'
    },
    {
        id: 'pomodoro',
        title: '⏱️ Pomodoro Timer',
        category: 'productivity',
        description: 'Timer de productividad Pomodoro',
        icon: 'fas fa-clock'
    },
    {
        id: 'weather',
        title: '🌤️ Consulta del Clima',
        category: 'tools',
        description: 'Consulta el clima de cualquier ciudad',
        icon: 'fas fa-cloud-sun'
    },
    {
        id: 'quiz',
        title: '🎯 Quiz Game',
        category: 'games',
        description: 'Juego de preguntas y respuestas',
        icon: 'fas fa-question-circle'
    },
    {
        id: 'memory',
        title: '🃏 Memory Game',
        category: 'games',
        description: 'Juego de memoria con cartas',
        icon: 'fas fa-brain'
    },
    {
        id: 'bmi',
        title: '⚖️ Calculadora IMC',
        category: 'health',
        description: 'Calcula tu índice de masa corporal',
        icon: 'fas fa-heartbeat'
    },
    {
        id: 'currency',
        title: '💱 Conversor de Monedas',
        category: 'tools',
        description: 'Convierte entre diferentes monedas',
        icon: 'fas fa-dollar-sign'
    },
    {
        id: 'markdown',
        title: '📝 Markdown Previewer',
        category: 'productivity',
        description: 'Editor Markdown en tiempo real',
        icon: 'fas fa-markdown'
    }
];

// Initialize Mini Projects
function initializeMiniProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Render mini projects
    renderMiniProjects(miniProjects);
    
    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const filteredProjects = filterValue === 'all' 
                ? miniProjects 
                : miniProjects.filter(p => p.category === filterValue);
            
            projectsGrid.style.opacity = '0';
            setTimeout(() => {
                renderMiniProjects(filteredProjects);
                projectsGrid.style.opacity = '1';
            }, 300);
        });
    });
}

function renderMiniProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <button class="project-link project-link-demo" onclick="openMiniProject('${project.id}')">
                        <i class="fas fa-play"></i> Probar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open Mini Project Modal
function openMiniProject(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const project = miniProjects.find(p => p.id === projectId);
    if (!project) return;
    
    modalTitle.textContent = project.title;
    modalBody.innerHTML = getMiniProjectHTML(projectId);
    modal.classList.add('active');
    
    // Initialize specific project
    setTimeout(() => {
        initializeMiniProject(projectId);
    }, 100);
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
}

// Get Mini Project HTML
function getMiniProjectHTML(projectId) {
    switch(projectId) {
        case 'calculator':
            return getCalculatorHTML();
        case 'todo':
            return getTodoHTML();
        case 'color-picker':
            return getColorPickerHTML();
        case 'pomodoro':
            return getPomodoroHTML();
        case 'weather':
            return getWeatherHTML();
        case 'quiz':
            return getQuizHTML();
        case 'memory':
            return getMemoryHTML();
        case 'bmi':
            return getBMIHTML();
        case 'currency':
            return getCurrencyHTML();
        case 'markdown':
            return getMarkdownHTML();
        default:
            return '<p>Proyecto no encontrado</p>';
    }
}

// ===================================
// Calculator
// ===================================
function getCalculatorHTML() {
    return `
        <div class="calculator">
            <div class="calculator-display" id="calcDisplay">0</div>
            <div class="calculator-buttons">
                <button class="calc-btn clear" onclick="calcClear()">C</button>
                <button class="calc-btn operator" onclick="calcAppend('/')">÷</button>
                <button class="calc-btn operator" onclick="calcAppend('*')">×</button>
                <button class="calc-btn" onclick="calcAppend('7')">7</button>
                <button class="calc-btn" onclick="calcAppend('8')">8</button>
                <button class="calc-btn" onclick="calcAppend('9')">9</button>
                <button class="calc-btn operator" onclick="calcAppend('-')">-</button>
                <button class="calc-btn" onclick="calcAppend('4')">4</button>
                <button class="calc-btn" onclick="calcAppend('5')">5</button>
                <button class="calc-btn" onclick="calcAppend('6')">6</button>
                <button class="calc-btn operator" onclick="calcAppend('+')">+</button>
                <button class="calc-btn" onclick="calcAppend('1')">1</button>
                <button class="calc-btn" onclick="calcAppend('2')">2</button>
                <button class="calc-btn" onclick="calcAppend('3')">3</button>
                <button class="calc-btn equals" onclick="calcCalculate()" style="grid-row: span 2">=</button>
                <button class="calc-btn" onclick="calcAppend('0')" style="grid-column: span 2">0</button>
                <button class="calc-btn" onclick="calcAppend('.')">.</button>
            </div>
        </div>
    `;
}

let calcValue = '0';

function initializeMiniProject(projectId) {
    if (projectId === 'calculator') {
        calcValue = '0';
    } else if (projectId === 'todo') {
        loadTodos();
    } else if (projectId === 'color-picker') {
        updateColorDisplay();
    } else if (projectId === 'pomodoro') {
        pomodoroState.minutes = 25;
        pomodoroState.seconds = 0;
        updatePomodoroDisplay();
    } else if (projectId === 'quiz') {
        initializeQuiz();
    } else if (projectId === 'memory') {
        initMemoryGame();
    }
}

function calcAppend(value) {
    if (calcValue === '0' && value !== '.') {
        calcValue = value;
    } else {
        calcValue += value;
    }
    document.getElementById('calcDisplay').textContent = calcValue;
}

function calcClear() {
    calcValue = '0';
    document.getElementById('calcDisplay').textContent = calcValue;
}

function calcCalculate() {
    try {
        const result = eval(calcValue.replace('×', '*').replace('÷', '/'));
        calcValue = result.toString();
        document.getElementById('calcDisplay').textContent = calcValue;
    } catch (e) {
        document.getElementById('calcDisplay').textContent = 'Error';
        calcValue = '0';
    }
}

// ===================================
// Todo List
// ===================================
function getTodoHTML() {
    return `
        <div class="todo-app">
            <div class="todo-input-group">
                <input type="text" class="todo-input" id="todoInput" placeholder="Nueva tarea...">
                <button class="todo-add-btn" onclick="addTodo()">
                    <i class="fas fa-plus"></i> Agregar
                </button>
            </div>
            <ul class="todo-list" id="todoList"></ul>
        </div>
    `;
}

let todos = [];

function loadTodos() {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map((todo, index) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" class="todo-checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${index})">
            <span class="todo-text">${todo.text}</span>
            <button class="todo-delete" onclick="deleteTodo(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// ===================================
// Color Picker
// ===================================
function getColorPickerHTML() {
    return `
        <div class="color-picker-app">
            <div class="color-display" id="colorDisplay">#667EEA</div>
            <div class="color-controls">
                <div class="color-control">
                    <label>R:</label>
                    <input type="range" class="color-slider" min="0" max="255" value="102" id="redSlider" oninput="updateColorDisplay()">
                    <span class="color-value" id="redValue">102</span>
                </div>
                <div class="color-control">
                    <label>G:</label>
                    <input type="range" class="color-slider" min="0" max="255" value="126" id="greenSlider" oninput="updateColorDisplay()">
                    <span class="color-value" id="greenValue">126</span>
                </div>
                <div class="color-control">
                    <label>B:</label>
                    <input type="range" class="color-slider" min="0" max="255" value="234" id="blueSlider" oninput="updateColorDisplay()">
                    <span class="color-value" id="blueValue">234</span>
                </div>
            </div>
            <button class="todo-add-btn" onclick="generateRandomColor()">
                <i class="fas fa-random"></i> Color Aleatorio
            </button>
        </div>
    `;
}

function updateColorDisplay() {
    const r = document.getElementById('redSlider').value;
    const g = document.getElementById('greenSlider').value;
    const b = document.getElementById('blueSlider').value;
    
    document.getElementById('redValue').textContent = r;
    document.getElementById('greenValue').textContent = g;
    document.getElementById('blueValue').textContent = b;
    
    const hex = rgbToHex(r, g, b);
    const display = document.getElementById('colorDisplay');
    display.style.backgroundColor = hex;
    display.textContent = hex;
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('').toUpperCase();
}

function generateRandomColor() {
    document.getElementById('redSlider').value = Math.floor(Math.random() * 256);
    document.getElementById('greenSlider').value = Math.floor(Math.random() * 256);
    document.getElementById('blueSlider').value = Math.floor(Math.random() * 256);
    updateColorDisplay();
}

// ===================================
// Pomodoro Timer
// ===================================
function getPomodoroHTML() {
    return `
        <div class="pomodoro-app">
            <div class="timer-mode">
                <button class="mode-btn active" onclick="setTimerMode('work')">Trabajo</button>
                <button class="mode-btn" onclick="setTimerMode('short')">Descanso Corto</button>
                <button class="mode-btn" onclick="setTimerMode('long')">Descanso Largo</button>
            </div>
            <div class="timer-display" id="timerDisplay">25:00</div>
            <div class="timer-controls">
                <button class="timer-btn start" onclick="startTimer()">
                    <i class="fas fa-play"></i> Iniciar
                </button>
                <button class="timer-btn pause" onclick="pauseTimer()">
                    <i class="fas fa-pause"></i> Pausar
                </button>
                <button class="timer-btn reset" onclick="resetTimer()">
                    <i class="fas fa-redo"></i> Reiniciar
                </button>
            </div>
        </div>
    `;
}

const pomodoroState = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    interval: null,
    mode: 'work'
};

function setTimerMode(mode) {
    pauseTimer();
    pomodoroState.mode = mode;
    
    const modes = { work: 25, short: 5, long: 15 };
    pomodoroState.minutes = modes[mode];
    pomodoroState.seconds = 0;
    
    updatePomodoroDisplay();
    
    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function startTimer() {
    if (pomodoroState.isRunning) return;
    
    pomodoroState.isRunning = true;
    pomodoroState.interval = setInterval(() => {
        if (pomodoroState.seconds === 0) {
            if (pomodoroState.minutes === 0) {
                pauseTimer();
                alert('¡Tiempo terminado!');
                return;
            }
            pomodoroState.minutes--;
            pomodoroState.seconds = 59;
        } else {
            pomodoroState.seconds--;
        }
        updatePomodoroDisplay();
    }, 1000);
}

function pauseTimer() {
    pomodoroState.isRunning = false;
    if (pomodoroState.interval) {
        clearInterval(pomodoroState.interval);
    }
}

function resetTimer() {
    pauseTimer();
    const modes = { work: 25, short: 5, long: 15 };
    pomodoroState.minutes = modes[pomodoroState.mode];
    pomodoroState.seconds = 0;
    updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        const mins = String(pomodoroState.minutes).padStart(2, '0');
        const secs = String(pomodoroState.seconds).padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
    }
}

// ===================================
// Weather App
// ===================================
function getWeatherHTML() {
    return `
        <div class="weather-app">
            <div class="weather-search">
                <input type="text" class="weather-input" id="weatherInput" placeholder="Ingresa una ciudad...">
                <button class="weather-btn" onclick="searchWeather()">
                    <i class="fas fa-search"></i> Buscar
                </button>
            </div>
            <div class="weather-display" id="weatherDisplay">
                <div class="weather-icon"><i class="fas fa-cloud-sun"></i></div>
                <div class="weather-temp">22°C</div>
                <div class="weather-desc">Parcialmente Nublado</div>
                <div class="weather-location">Santiago, Chile</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <div class="weather-detail-label">Humedad</div>
                        <div class="weather-detail-value">65%</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail-label">Viento</div>
                        <div class="weather-detail-value">12 km/h</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function searchWeather() {
    const input = document.getElementById('weatherInput');
    const city = input.value.trim();
    
    if (!city) return;
    
    // Simulated weather data
    const weatherData = {
        temp: Math.floor(Math.random() * 20) + 10,
        desc: ['Soleado', 'Nublado', 'Parcialmente Nublado', 'Lluvioso'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        wind: Math.floor(Math.random() * 20) + 5
    };
    
    const display = document.getElementById('weatherDisplay');
    display.innerHTML = `
        <div class="weather-icon"><i class="fas fa-cloud-sun"></i></div>
        <div class="weather-temp">${weatherData.temp}°C</div>
        <div class="weather-desc">${weatherData.desc}</div>
        <div class="weather-location">${city}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <div class="weather-detail-label">Humedad</div>
                <div class="weather-detail-value">${weatherData.humidity}%</div>
            </div>
            <div class="weather-detail">
                <div class="weather-detail-label">Viento</div>
                <div class="weather-detail-value">${weatherData.wind} km/h</div>
            </div>
        </div>
    `;
}

// ===================================
// Quiz Game
// ===================================
function getQuizHTML() {
    return `
        <div class="quiz-app" id="quizContainer">
            <!-- Quiz will be rendered here -->
        </div>
    `;
}

const quizQuestions = [
    {
        question: '¿Cuál es el lenguaje de programación más popular en 2024?',
        options: ['Python', 'JavaScript', 'Java', 'C++'],
        correct: 1
    },
    {
        question: '¿Qué significa HTML?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correct: 0
    },
    {
        question: '¿Cuál NO es un framework de JavaScript?',
        options: ['React', 'Angular', 'Vue', 'Django'],
        correct: 3
    },
    {
        question: '¿Qué es CSS?',
        options: ['Un lenguaje de programación', 'Un lenguaje de estilos', 'Una base de datos', 'Un framework'],
        correct: 1
    },
    {
        question: '¿Cuál es el puerto por defecto de HTTP?',
        options: ['443', '8080', '80', '3000'],
        correct: 2
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    answered: false
};

function initializeQuiz() {
    quizState = { currentQuestion: 0, score: 0, answered: false };
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('quizContainer');
    const q = quizQuestions[quizState.currentQuestion];
    
    if (!q) {
        showQuizResult();
        return;
    }
    
    container.innerHTML = `
        <div class="quiz-question">
            <div class="quiz-progress">Pregunta ${quizState.currentQuestion + 1} de ${quizQuestions.length}</div>
            <h3 class="quiz-question-text">${q.question}</h3>
        </div>
        <div class="quiz-options">
            ${q.options.map((option, index) => `
                <button class="quiz-option" data-answer="${index}" id="option-${index}">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to options
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const selected = parseInt(option.getAttribute('data-answer'));
            selectQuizAnswer(selected);
        });
    });
}

function selectQuizAnswer(selected) {
    if (quizState.answered) return;
    
    quizState.answered = true;
    const correct = quizQuestions[quizState.currentQuestion].correct;
    
    document.getElementById(`option-${selected}`).classList.add(selected === correct ? 'correct' : 'incorrect');
    document.getElementById(`option-${correct}`).classList.add('correct');
    
    if (selected === correct) {
        quizState.score++;
    }
    
    setTimeout(() => {
        quizState.currentQuestion++;
        quizState.answered = false;
        renderQuizQuestion();
    }, 1500);
}

function showQuizResult() {
    const container = document.getElementById('quizContainer');
    const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
    
    container.innerHTML = `
        <div class="quiz-result">
            <h2>¡Quiz Completado!</h2>
            <div class="quiz-score">${quizState.score}/${quizQuestions.length}</div>
            <p>Obtuviste un ${percentage}% de respuestas correctas</p>
            <button class="quiz-restart" id="quizRestartBtn">Jugar de Nuevo</button>
        </div>
    `;
    
    // Add event listener to restart button
    document.getElementById('quizRestartBtn').addEventListener('click', initializeQuiz);
}

// ===================================
// Memory Game
// ===================================
function getMemoryHTML() {
    return `
        <div class="memory-game">
            <div class="memory-stats">
                <div class="memory-stat">
                    <div class="memory-stat-label">Movimientos</div>
                    <div class="memory-stat-value" id="memoryMoves">0</div>
                </div>
                <div class="memory-stat">
                    <div class="memory-stat-label">Parejas</div>
                    <div class="memory-stat-value" id="memoryMatches">0/8</div>
                </div>
            </div>
            <div class="memory-board" id="memoryBoard"></div>
            <button class="todo-add-btn" style="margin-top: 1rem;" onclick="initMemoryGame()">
                <i class="fas fa-redo"></i> Nueva Partida
            </button>
        </div>
    `;
}

const memoryEmojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺'];
let memoryState = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0
};

function initMemoryGame() {
    // Create pairs and shuffle
    const cards = [...memoryEmojis, ...memoryEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
    
    memoryState = { cards, flipped: [], matched: [], moves: 0 };
    renderMemoryBoard();
    updateMemoryStats();
}

function renderMemoryBoard() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = memoryState.cards.map((card, index) => `
        <div class="memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}" 
             onclick="flipMemoryCard(${index})">
            ${card.flipped || card.matched ? card.emoji : ''}
        </div>
    `).join('');
}

function flipMemoryCard(index) {
    if (memoryState.flipped.length >= 2) return;
    if (memoryState.cards[index].flipped || memoryState.cards[index].matched) return;
    
    memoryState.cards[index].flipped = true;
    memoryState.flipped.push(index);
    renderMemoryBoard();
    
    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        updateMemoryStats();
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [first, second] = memoryState.flipped;
    const card1 = memoryState.cards[first];
    const card2 = memoryState.cards[second];
    
    if (card1.emoji === card2.emoji) {
        card1.matched = true;
        card2.matched = true;
        memoryState.matched.push(first, second);
        memoryState.flipped = [];
        renderMemoryBoard();
        updateMemoryStats();
        
        if (memoryState.matched.length === memoryState.cards.length) {
            setTimeout(() => {
                alert(`¡Ganaste! Completaste el juego en ${memoryState.moves} movimientos.`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            memoryState.flipped = [];
            renderMemoryBoard();
        }, 1000);
    }
}

function updateMemoryStats() {
    const moves = document.getElementById('memoryMoves');
    const matches = document.getElementById('memoryMatches');
    if (moves) moves.textContent = memoryState.moves;
    if (matches) matches.textContent = `${memoryState.matched.length / 2}/8`;
}

// ===================================
// BMI Calculator
// ===================================
function getBMIHTML() {
    return `
        <div class="bmi-app">
            <div class="bmi-form">
                <div class="bmi-input-group">
                    <label>Peso (kg)</label>
                    <input type="number" class="bmi-input" id="bmiWeight" placeholder="70">
                </div>
                <div class="bmi-input-group">
                    <label>Altura (cm)</label>
                    <input type="number" class="bmi-input" id="bmiHeight" placeholder="170">
                </div>
                <button class="bmi-calculate" onclick="calculateBMI()">
                    <i class="fas fa-calculator"></i> Calcular IMC
                </button>
            </div>
            <div class="bmi-result" id="bmiResult" style="display: none;"></div>
        </div>
    `;
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Por favor ingresa valores válidos');
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Bajo Peso';
        color = '#3b82f6';
    } else if (bmi < 25) {
        category = 'Peso Normal';
        color = '#10b981';
    } else if (bmi < 30) {
        category = 'Sobrepeso';
        color = '#f59e0b';
    } else {
        category = 'Obesidad';
        color = '#ef4444';
    }
    
    const result = document.getElementById('bmiResult');
    result.style.display = 'block';
    result.innerHTML = `
        <div class="bmi-value" style="color: ${color}">${bmi}</div>
        <div class="bmi-category" style="color: ${color}">${category}</div>
        <div class="bmi-description">
            Tu índice de masa corporal es ${bmi}
        </div>
    `;
}

// ===================================
// Currency Converter
// ===================================
function getCurrencyHTML() {
    return `
        <div class="currency-app">
            <div class="currency-form">
                <div class="currency-input-group">
                    <label>Monto</label>
                    <div class="currency-input-wrapper">
                        <input type="number" class="currency-input" id="currencyAmount" placeholder="100">
                        <select class="currency-select" id="currencyFrom">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="CLP">CLP</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>
                </div>
                <div class="currency-input-group">
                    <label>Convertir a</label>
                    <select class="currency-select" id="currencyTo" style="width: 100%;">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CLP" selected>CLP</option>
                        <option value="ARS">ARS</option>
                    </select>
                </div>
                <button class="currency-convert" onclick="convertCurrency()">
                    <i class="fas fa-exchange-alt"></i> Convertir
                </button>
            </div>
            <div class="currency-result" id="currencyResult" style="display: none;"></div>
        </div>
    `;
}

const exchangeRates = {
    'USD-EUR': 0.92,
    'USD-GBP': 0.79,
    'USD-CLP': 950,
    'USD-ARS': 850,
    'EUR-USD': 1.09,
    'EUR-GBP': 0.86,
    'EUR-CLP': 1034,
    'EUR-ARS': 926,
    'GBP-USD': 1.27,
    'GBP-EUR': 1.16,
    'GBP-CLP': 1203,
    'GBP-ARS': 1076,
    'CLP-USD': 0.00105,
    'CLP-EUR': 0.00097,
    'CLP-GBP': 0.00083,
    'CLP-ARS': 0.89,
    'ARS-USD': 0.00118,
    'ARS-EUR': 0.00108,
    'ARS-GBP': 0.00093,
    'ARS-CLP': 1.12
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    
    if (!amount || amount <= 0) {
        alert('Por favor ingresa un monto válido');
        return;
    }
    
    if (from === to) {
        alert('Selecciona monedas diferentes');
        return;
    }
    
    const rate = exchangeRates[`${from}-${to}`] || 1;
    const result = (amount * rate).toFixed(2);
    
    const resultDiv = document.getElementById('currencyResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="currency-amount">${result} ${to}</div>
        <div class="currency-rate">1 ${from} = ${rate} ${to}</div>
    `;
}

// ===================================
// Markdown Previewer
// ===================================
function getMarkdownHTML() {
    return `
        <div class="markdown-app">
            <div class="markdown-editor">
                <label class="markdown-label">Markdown</label>
                <textarea class="markdown-textarea" id="markdownInput" 
                          oninput="updateMarkdownPreview()"># Título

## Subtítulo

- Lista item 1
- Lista item 2

**Texto en negrita**
*Texto en cursiva*

[Link](https://example.com)</textarea>
            </div>
            <div class="markdown-preview">
                <label class="markdown-label">Preview</label>
                <div class="markdown-preview-content" id="markdownPreview"></div>
            </div>
        </div>
    `;
}

function updateMarkdownPreview() {
    const input = document.getElementById('markdownInput').value;
    const preview = document.getElementById('markdownPreview');
    
    // Simple markdown parser (básico)
    let html = input
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n/gim, '<br>');
    
    preview.innerHTML = html;
}

// Initialize markdown preview
setTimeout(() => {
    if (document.getElementById('markdownInput')) {
        updateMarkdownPreview();
    }
}, 100);

// Export functions to global scope
window.openMiniProject = openMiniProject;
window.closeModal = closeModal;
window.initializeMiniProjects = initializeMiniProjects;
window.calcAppend = calcAppend;
window.calcClear = calcClear;
window.calcCalculate = calcCalculate;
window.addTodo = addTodo;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.generateRandomColor = generateRandomColor;
window.setTimerMode = setTimerMode;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.searchWeather = searchWeather;
window.selectQuizAnswer = selectQuizAnswer;
window.initializeQuiz = initializeQuiz;
window.initMemoryGame = initMemoryGame;
window.flipMemoryCard = flipMemoryCard;
window.calculateBMI = calculateBMI;
window.convertCurrency = convertCurrency;
window.updateMarkdownPreview = updateMarkdownPreview;
