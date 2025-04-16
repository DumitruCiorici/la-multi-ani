// ========================
// EFECTE FELICITARE
// ========================

// Funcție pentru generarea confetti
function createConfetti() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.querySelector('.confetti-container').appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: `translate(0, 0) rotate(${Math.random() * 360}deg)` },
        { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 720}deg)` }
    ], {
        duration: Math.random() * 2000 + 3000,
        easing: 'cubic-bezier(.37,0,.63,1)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// Funcție pentru a porni animația confetti
function startConfetti() {
    for(let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 100);
    }
}

// ========================
// NAVIGARE ÎNTRE SECȚIUNI
// ========================

// Referințe la secțiuni și butoane
const greetingSection = document.getElementById('greeting-section');
const gamesSection = document.getElementById('games-section');
const gallerySection = document.getElementById('gallery-section');
const nextButton = document.getElementById('next-button');
const finalButton = document.getElementById('final-button');
const restartButton = document.getElementById('restart-button');

// Adăugăm interactivitate la card
document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('open');
    if(this.classList.contains('open')) {
        startConfetti();
        // Afișăm butonul "Mergi mai departe" după 1.5 secunde
        setTimeout(() => {
            nextButton.classList.add('show');
        }, 1500);
    } else {
        nextButton.classList.remove('show');
    }
});

// Navigare către secțiunea de jocuri
nextButton.addEventListener('click', function() {
    greetingSection.style.opacity = '0';
    setTimeout(() => {
        greetingSection.style.display = 'none';
        gamesSection.classList.add('active');
        startConfetti();
    }, 500);
});

// Navigare către secțiunea de galerie
finalButton.addEventListener('click', function() {
    // Redirecționăm către pagina de galerie dacă toate jocurile sunt completate
    if (completedGames.game1 && completedGames.game2 && completedGames.game3) {
        // Redirecționăm către pagina gallery.html
        window.location.href = "gallery.html";
    } else {
        // Indicăm utilizatorului că trebuie să termine toate jocurile
        alert('Trebuie să finalizați toate cele 3 jocuri pentru a debloca accesul la galerie!');
    }
});

// Restart - revenim la felicitare
restartButton.addEventListener('click', function() {
    gallerySection.classList.remove('active');
    setTimeout(() => {
        greetingSection.style.display = 'flex';
        setTimeout(() => {
            greetingSection.style.opacity = '1';
            // Închidem cardul
            document.querySelector('.card').classList.remove('open');
            startConfetti();
        }, 100);
    }, 500);
});

// Adăugăm sunet la click pe cutia cadou
document.querySelector('.gift-box').addEventListener('click', function() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.play();
    startConfetti();
});

// Adăugăm efect de strălucire la hover pe lumânare
document.querySelector('.flame').addEventListener('mouseover', function() {
    this.style.boxShadow = '0 0 20px #ff9900, 0 0 40px #ff9900, 0 0 60px #ff9900';
});

document.querySelector('.flame').addEventListener('mouseout', function() {
    this.style.boxShadow = '0 0 10px #ff9900, 0 0 20px #ff9900, 0 0 30px #ff9900';
});

// ========================
// JOCURI INTERACTIVE
// ========================

// Referințe la elementele jocurilor
const gameCards = document.querySelectorAll('.game-card');
const gameContents = document.querySelectorAll('.game-content');
const backButtons = document.querySelectorAll('.back-to-games');

// Adăugăm tracking pentru jocuri completate
let completedGames = {
    game1: false,
    game2: false,
    game3: false
};

function checkAllGamesCompleted() {
    if (completedGames.game1 && completedGames.game2 && completedGames.game3) {
        // Toate jocurile sunt completate, afișăm butonul și actualizăm mesajul
        document.getElementById('final-button').classList.remove('disabled');
        document.getElementById('games-message').textContent = 'Felicitări! Ați completat toate jocurile! Puteți accesa acum galeria.';
        document.getElementById('games-message').classList.add('success-message');
        
        // Facem butonul mai vizibil când toate jocurile sunt gata
        document.getElementById('final-button').style.transform = 'scale(1.1)';
        document.getElementById('final-button').style.boxShadow = '0 0 20px rgba(229, 46, 113, 0.5)';
        
        // Asigurăm că containerul butonului este vizibil
        document.querySelector('.gallery-button-container').style.display = 'flex';
        
        // Adăugăm animație pentru a atrage atenția
        startConfetti();
    } else {
        // Calculăm câte jocuri au fost completate
        const completedCount = Object.values(completedGames).filter(Boolean).length;
        document.getElementById('games-message').textContent = `Trebuie să finalizați toate cele 3 jocuri pentru a debloca accesul. (${completedCount}/3 completate)`;
        document.getElementById('games-message').classList.remove('success-message');
        document.getElementById('final-button').classList.add('disabled');
        
        // Resetăm stilul butonului
        document.getElementById('final-button').style.transform = '';
        document.getElementById('final-button').style.boxShadow = '';
    }
    
    // Ne asigurăm că butonul e vizibil în orice caz
    document.getElementById('final-button').style.display = 'block';
    document.getElementById('final-button').style.opacity = '1';
}

function markGameAsCompleted(gameId) {
    completedGames[gameId] = true;
    const gameCard = document.getElementById(gameId);
    gameCard.classList.add('completed');
    checkAllGamesCompleted();
    
    // Salvăm progresul în localStorage pentru a păstra starea între reîncărcări
    localStorage.setItem('completedGames', JSON.stringify(completedGames));
}

// Adăugăm funcția de inițializare pentru a configura butonul de galerie
function initializeGamesSection() {
    // Încărcăm progresul salvat anterior (dacă există)
    const savedProgress = localStorage.getItem('completedGames');
    if (savedProgress) {
        completedGames = JSON.parse(savedProgress);
        
        // Marcăm cardurile jocurilor completate
        Object.entries(completedGames).forEach(([gameId, isCompleted]) => {
            if (isCompleted) {
                const gameCard = document.getElementById(gameId);
                if (gameCard) {
                    gameCard.classList.add('completed');
                }
            }
        });
    }
    
    // Verificăm starea butonului de galerie
    checkAllGamesCompleted();
}

// Afișarea jocului selectat
gameCards.forEach(card => {
    card.addEventListener('click', function() {
        const gameId = this.id;
        const gameContent = document.getElementById(`${gameId}-content`);
        
        // Ascundem cardurile de joc
        document.querySelector('.games-container').style.display = 'none';
        
        // Ascundem temporar butonul și containerul final în timpul jocului
        document.querySelector('.gallery-button-container').style.display = 'none'; 
        
        // Afișăm jocul selectat
        gameContent.style.display = 'flex';
        
        // Inițializăm jocul
        if (gameId === 'game1') {
            initQuiz();
        } else if (gameId === 'game2') {
            initMemoryGame();
        } else if (gameId === 'game3') {
            initCodePuzzle();
        }
    });
});

// Înapoi la lista de jocuri
backButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Ascundem toate jocurile
        gameContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Afișăm din nou cardurile de joc
        document.querySelector('.games-container').style.display = 'flex';
        
        // Afișăm din nou butonul final și containerul său
        document.querySelector('.gallery-button-container').style.display = 'flex';
    });
});

// Joc 1: Quiz Web
const quizQuestions = [
    {
        question: "Care dintre următoarele este un limbaj de marcare?",
        options: ["HTML", "JavaScript", "Python", "PHP"],
        correctIndex: 0
    },
    {
        question: "Care proprietate CSS se folosește pentru a schimba culoarea textului?",
        options: ["text-color", "color", "font-color", "text-style"],
        correctIndex: 1
    },
    {
        question: "Care tag HTML creează un paragraf?",
        options: ["<paragraph>", "<p>", "<para>", "<text>"],
        correctIndex: 1
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

function initQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    showQuestion(currentQuestionIndex);
    
    document.getElementById('next-question').addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showQuizResult();
        }
    });
}

function showQuestion(index) {
    const question = quizQuestions[index];
    document.getElementById('question-text').textContent = question.question;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, i) => {
        option.textContent = question.options[i];
        option.classList.remove('correct', 'incorrect');
        option.dataset.correct = i === question.correctIndex;
        
        // Resetăm event listeners
        option.replaceWith(option.cloneNode(true));
    });
    
    // Adăugăm event listeners din nou
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', handleQuizAnswer);
    });
    
    document.getElementById('quiz-result').textContent = '';
    document.getElementById('next-question').style.display = 'none';
}

function handleQuizAnswer(e) {
    const selectedOption = e.target;
    const isCorrect = selectedOption.dataset.correct === 'true';
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.removeEventListener('click', handleQuizAnswer);
        
        if (option.dataset.correct === 'true') {
            option.classList.add('correct');
        } else if (option === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        quizScore++;
        document.getElementById('quiz-result').textContent = 'Corect! Bravo!';
    } else {
        document.getElementById('quiz-result').textContent = 'Incorect. Încercați din nou!';
    }
    
    document.getElementById('next-question').style.display = 'block';
}

function showQuizResult() {
    const questionContainer = document.getElementById('question-container');
    const score = Math.round((quizScore / quizQuestions.length) * 100);
    
    questionContainer.innerHTML = `
        <h3>Rezultat Quiz</h3>
        <p>Ai răspuns corect la ${quizScore} din ${quizQuestions.length} întrebări!</p>
        <div class="quiz-score">
            <span>${score}%</span>
        </div>
    `;
    
    document.getElementById('quiz-result').textContent = '';
    
    if (quizScore === quizQuestions.length) {
        markGameAsCompleted('game1');
        document.getElementById('next-question').textContent = 'Înapoi la Jocuri';
    } else {
        document.getElementById('quiz-result').textContent = 'Nu ai obținut scorul maxim. Încearcă din nou!';
        document.getElementById('next-question').textContent = 'Încearcă din nou';
    }
    
    document.getElementById('next-question').style.display = 'block';
    
    document.getElementById('next-question').addEventListener('click', function() {
        if (quizScore === quizQuestions.length) {
            // Revenim la lista de jocuri dacă jocul e completat
            gameContents.forEach(content => {
                content.style.display = 'none';
            });
            document.querySelector('.games-container').style.display = 'flex';
            document.querySelector('.gallery-button-container').style.display = 'flex';
        } else {
            // Reîncepem quiz-ul dacă nu e completat
            initQuiz();
        }
    }, { once: true });
}

// Joc 2: Memory Match
const memorySymbols = [
    '🎂', '🎈', '🎁', '🎊',
    '🎵', '🎉', '🌟', '❤️'
];

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

function initMemoryGame() {
    // Reset
    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
    document.getElementById('pairs-found').textContent = matchedPairs;
    document.getElementById('attempts').textContent = attempts;
    
    // Creăm perechi de simboluri
    const allSymbols = [...memorySymbols, ...memorySymbols];
    
    // Amestecăm simbolurile
    for (let i = allSymbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allSymbols[i], allSymbols[j]] = [allSymbols[j], allSymbols[i]];
    }
    
    // Creăm cărțile
    const memoryContainer = document.getElementById('memory-container');
    memoryContainer.innerHTML = '';
    
    allSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        // Create front and back of card
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = '❓';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = symbol;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', flipCard);
        memoryContainer.appendChild(card);
    });
    
    memoryCards = document.querySelectorAll('.memory-card');
}

function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        attempts++;
        document.getElementById('attempts').textContent = attempts;
        
        if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
            matchedPairs++;
            document.getElementById('pairs-found').textContent = matchedPairs;
            
            flippedCards.forEach(card => {
                card.classList.add('matched');
                card.removeEventListener('click', flipCard);
            });
            
            flippedCards = [];
            
            if (matchedPairs === memorySymbols.length) {
                setTimeout(() => {
                    markGameAsCompleted('game2');
                    const restartContainer = document.createElement('div');
                    restartContainer.className = 'memory-result';
                    restartContainer.innerHTML = `
                        <p class="success-message">Felicitări! Ai terminat jocul cu ${attempts} încercări!</p>
                        <button class="quiz-button" id="memory-finish">Înapoi la Jocuri</button>
                    `;
                    document.querySelector('.memory-game').appendChild(restartContainer);
                    
                    document.getElementById('memory-finish').addEventListener('click', () => {
                        gameContents.forEach(content => {
                            content.style.display = 'none';
                        });
                        document.querySelector('.games-container').style.display = 'flex';
                        document.querySelector('.gallery-button-container').style.display = 'flex';
                    });
                }, 500);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                });
                flippedCards = [];
            }, 1000);
        }
    }
}

// Joc 3: Code Puzzle
const codeLines = [
    '<button class="btn">Click Me</button>',
    '.btn {',
    '  background-color: #4CAF50;',
    '  color: white;',
    '  padding: 15px 32px;',
    '  text-align: center;',
    '  cursor: pointer;',
    '}'
];

// Variabile pentru touch events
let touchDraggedElement = null;
let touchPlaceholder = null;
let touchStartY = 0;
let previousTouchY = 0;
let currentTouchY = 0;

function initCodePuzzle() {
    const codeContainer = document.getElementById('code-container');
    codeContainer.innerHTML = '';
    
    // Adăugăm instrucțiuni pentru dispozitive mobile
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        // Verificăm dacă există deja un mesaj de instrucțiuni
        if (!document.querySelector('.mobile-instructions')) {
            const instructionsDiv = document.createElement('div');
            instructionsDiv.className = 'mobile-instructions';
            instructionsDiv.innerHTML = `
                <p><i class="fa-solid fa-hand-pointer"></i> Ține apăsat și glisează liniile de cod pentru a le aranja</p>
            `;
            
            const codePuzzleSection = document.querySelector('.code-puzzle');
            const instructionsP = codePuzzleSection.querySelector('p');
            codePuzzleSection.insertBefore(instructionsDiv, instructionsP.nextSibling);
        }
    }
    
    // Amestecăm liniile
    const shuffledLines = [...codeLines];
    for (let i = shuffledLines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLines[i], shuffledLines[j]] = [shuffledLines[j], shuffledLines[i]];
    }
    
    // Creăm elementele draggable
    shuffledLines.forEach((line, index) => {
        const codeLineElement = document.createElement('div');
        codeLineElement.className = 'code-line';
        codeLineElement.textContent = line;
        codeLineElement.draggable = true;
        codeLineElement.dataset.index = index;
        codeLineElement.dataset.correctIndex = codeLines.indexOf(line);
        
        // Desktop drag events
        codeLineElement.addEventListener('dragstart', dragStart);
        codeLineElement.addEventListener('dragover', dragOver);
        codeLineElement.addEventListener('drop', drop);
        codeLineElement.addEventListener('dragenter', dragEnter);
        codeLineElement.addEventListener('dragleave', dragLeave);
        
        // Mobile touch events
        codeLineElement.addEventListener('touchstart', touchStart, {passive: false});
        codeLineElement.addEventListener('touchmove', touchMove, {passive: false});
        codeLineElement.addEventListener('touchend', touchEnd, {passive: false});
        
        codeContainer.appendChild(codeLineElement);
    });
    
    document.getElementById('check-code').addEventListener('click', checkCodeOrder);
}

// Desktop drag and drop
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function dragLeave() {
    this.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const sourceIndex = e.dataTransfer.getData('text/plain');
    const sourceElement = document.querySelector(`.code-line[data-index="${sourceIndex}"]`);
    const targetElement = this;
    
    if (sourceElement !== targetElement) {
        swapElements(sourceElement, targetElement);
    }
}

// Mobile touch events
function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartY = touch.clientY;
    previousTouchY = touchStartY;
    touchDraggedElement = this;
    
    // Creem un placeholder și aplicăm stil
    touchDraggedElement.classList.add('being-dragged');
    touchDraggedElement.style.opacity = '0.8';
    touchDraggedElement.style.position = 'relative';
    
    // Salvăm poziția inițială
    const rect = touchDraggedElement.getBoundingClientRect();
    touchDraggedElement._originalTop = rect.top;
}

function touchMove(e) {
    if (!touchDraggedElement) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    currentTouchY = touch.clientY;
    
    // Calculăm diferența
    const deltaY = currentTouchY - previousTouchY;
    
    // Mișcăm elementul
    touchDraggedElement.style.top = (parseFloat(touchDraggedElement.style.top || 0) + deltaY) + 'px';
    
    // Adăugăm transformare pentru un efect mai pronunțat
    touchDraggedElement.style.transform = 'scale(1.03)';
    touchDraggedElement.style.zIndex = '1000';
    
    // Verificăm dacă am trecut peste alt element
    const elementsBelow = document.elementsFromPoint(touch.clientX, touch.clientY);
    let targetElement = null;
    
    for (let el of elementsBelow) {
        if (el.classList.contains('code-line') && el !== touchDraggedElement) {
            targetElement = el;
            break;
        }
    }
    
    // Curățăm stilurile de hover
    document.querySelectorAll('.code-line').forEach(el => {
        el.classList.remove('drag-over');
    });
    
    // Adăugăm stil de hover la țintă și facem loc pentru elementul tras
    if (targetElement) {
        targetElement.classList.add('drag-over');
        
        // Adăugăm efect de vibrație subtilă pe mobil pentru feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(20); // vibrație scurtă
        }
    }
    
    previousTouchY = currentTouchY;
}

function touchEnd(e) {
    if (!touchDraggedElement) return;
    e.preventDefault();
    
    // Identificăm elementul țintă
    const elementsBelow = document.elementsFromPoint(
        e.changedTouches[0].clientX, 
        e.changedTouches[0].clientY
    );
    
    let targetElement = null;
    for (let el of elementsBelow) {
        if (el.classList.contains('code-line') && el !== touchDraggedElement) {
            targetElement = el;
            break;
        }
    }
    
    // Curățăm stilurile
    touchDraggedElement.classList.remove('being-dragged');
    touchDraggedElement.style.opacity = '';
    touchDraggedElement.style.position = '';
    touchDraggedElement.style.top = '';
    touchDraggedElement.style.transform = '';
    touchDraggedElement.style.zIndex = '';
    
    // Facem schimbul dacă avem țintă
    if (targetElement) {
        targetElement.classList.remove('drag-over');
        swapElements(touchDraggedElement, targetElement);
        
        // Feedback vizual de succes
        targetElement.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 300,
            iterations: 1
        });
    } else {
        // Animație de revenire dacă nu avem țintă
        touchDraggedElement.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-5px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 200,
            iterations: 1
        });
    }
    
    touchDraggedElement = null;
}

// Funcție pentru a schimba poziția elementelor
function swapElements(sourceElement, targetElement) {
    const codeContainer = document.getElementById('code-container');
    const allCodeLines = Array.from(codeContainer.children);
    const sourcePosition = allCodeLines.indexOf(sourceElement);
    const targetPosition = allCodeLines.indexOf(targetElement);
    
    if (sourcePosition < targetPosition) {
        codeContainer.insertBefore(sourceElement, targetElement.nextSibling);
    } else {
        codeContainer.insertBefore(sourceElement, targetElement);
    }
}

function checkCodeOrder() {
    const codeLines = document.querySelectorAll('.code-line');
    let allCorrect = true;
    
    codeLines.forEach((line, index) => {
        const correctIndex = parseInt(line.dataset.correctIndex);
        
        if (index === correctIndex) {
            line.classList.add('correct');
            line.classList.remove('incorrect');
        } else {
            line.classList.add('incorrect');
            line.classList.remove('correct');
            allCorrect = false;
        }
    });
    
    const resultElement = document.getElementById('code-result');
    const restartButton = document.getElementById('restart-puzzle');
    
    if (allCorrect) {
        resultElement.textContent = 'Felicitări! Codul este în ordinea corectă!';
        resultElement.style.color = '#28a745';
        markGameAsCompleted('game3');
        
        // Adăugăm buton de finalizare
        if (!document.getElementById('finish-puzzle')) {
            const finishButton = document.createElement('button');
            finishButton.id = 'finish-puzzle';
            finishButton.className = 'quiz-button';
            finishButton.textContent = 'Înapoi la Jocuri';
            document.querySelector('.code-puzzle').appendChild(finishButton);
            
            finishButton.addEventListener('click', () => {
                gameContents.forEach(content => {
                    content.style.display = 'none';
                });
                document.querySelector('.games-container').style.display = 'flex';
                document.querySelector('.gallery-button-container').style.display = 'flex';
            });
        }
    } else {
        resultElement.textContent = 'Ordinea nu este corectă. Încearcă din nou!';
        resultElement.style.color = '#dc3545';
        
        // Adăugăm buton de restart dacă nu există
        if (!document.getElementById('restart-puzzle')) {
            const restartButton = document.createElement('button');
            restartButton.id = 'restart-puzzle';
            restartButton.className = 'quiz-button';
            restartButton.style.marginTop = '10px';
            restartButton.textContent = 'Încearcă din nou';
            document.querySelector('.code-puzzle').appendChild(restartButton);
            
            restartButton.addEventListener('click', () => {
                initCodePuzzle();
            });
        }
    }
}

// Butonul de înapoi pentru Quiz
document.querySelector('.quiz-back').addEventListener('click', function() {
    document.getElementById('game1-content').style.display = 'none';
    document.querySelector('.games-container').style.display = 'flex';
    document.getElementById('final-button').style.opacity = '1';
});

// Butonul de înapoi pentru Memory Game
document.querySelector('.memory-back').addEventListener('click', function() {
    document.getElementById('game2-content').style.display = 'none';
    document.querySelector('.games-container').style.display = 'flex';
    document.getElementById('final-button').style.opacity = '1';
});

// Butonul de înapoi pentru Code Puzzle
document.querySelector('.code-back').addEventListener('click', function() {
    document.getElementById('game3-content').style.display = 'none';
    document.querySelector('.games-container').style.display = 'flex';
    document.getElementById('final-button').style.opacity = '1';
});

// Adăugăm event listener pentru butonul de galerie
document.getElementById('final-button').addEventListener('click', function(e) {
    if (!this.classList.contains('disabled')) {
        // În loc să afișăm secțiunea din aceeași pagină, redirectăm către gallery.html
        window.location.href = 'gallery.html';
    } else {
        e.preventDefault();
        alert('Trebuie să finalizați toate cele 3 jocuri pentru a accesa galeria!');
    }
});

// Inițializăm confetti și pagina la încărcarea paginii
window.addEventListener('load', () => {
    startConfetti();
    initializeGamesSection();
    
    // Adăugăm event listener pentru butonul de întoarcere la prima pagină
    document.getElementById('back-to-home').addEventListener('click', function() {
        // Ascundem galeria
        gallerySection.classList.remove('active');
        
        // Afișăm felicitarea
        setTimeout(() => {
            greetingSection.style.display = 'flex';
            setTimeout(() => {
                greetingSection.style.opacity = '1';
                // Închidem cardul pentru experiența inițială
                document.querySelector('.card').classList.remove('open');
                startConfetti();
            }, 100);
        }, 500);
    });
}); 