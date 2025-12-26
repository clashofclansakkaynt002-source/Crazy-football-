let score = 0;
let attempts = 0;
const maxAttempts = 5;

const ball = document.getElementById('ball');
const gk = document.getElementById('goalkeeper');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const dots = document.querySelectorAll('.dot');
const overlay = document.getElementById('overlay');
const finalResult = document.getElementById('final-result');

let isMoving = false;

function shoot(direction) {
    if (isMoving || attempts >= maxAttempts) return;
    isMoving = true;

    const options = ['left', 'center', 'right'];
    const gkChoice = options[Math.floor(Math.random() * options.length)];
    
    // Рух воротаря
    if (gkChoice === 'left') gk.style.transform = 'translateX(-130px) translateY(-20px) rotate(-30deg)';
    else if (gkChoice === 'right') gk.style.transform = 'translateX(70px) translateY(-20px) rotate(30deg)';
    else gk.style.transform = 'translateX(-50%) translateY(-40px) scale(1.1)';

    // Удар м'яча
    ball.style.bottom = '70%'; 
    ball.style.transform = 'scale(0.4) rotate(720deg)';
    
    if (direction === 'left') ball.style.left = '32%';
    else if (direction === 'right') ball.style.left = '62%';
    else ball.style.left = '50%';

    // Перевірка через 600мс
    setTimeout(() => {
        const currentDot = dots[attempts];
        
        if (direction === gkChoice) {
            message.textContent = "ВІДБИТО!";
            currentDot.classList.add('miss'); // Червоний
        } else {
            message.textContent = "ГОООООЛ!";
            currentDot.classList.add('hit'); // Зелений
            score++;
            scoreDisplay.textContent = score;
        }

        attempts++;
        
        if (attempts < maxAttempts) {
            setTimeout(resetPositions, 1200);
        } else {
            setTimeout(showFinalScreen, 1200);
        }
    }, 600);
}

function resetPositions() {
    ball.style.bottom = '20%';
    ball.style.left = '50%';
    ball.style.transform = 'scale(1) rotate(0deg)';
    gk.style.transform = 'translateX(-50%)';
    message.textContent = `УДАР ${attempts + 1}`;
    isMoving = false;
}

function showFinalScreen() {
    overlay.style.display = 'flex';
    finalResult.textContent = `РЕЗУЛЬТАТ: ${score} / 5`;
    if (score >= 3) {
        message.textContent = "ТИ ПЕРЕМІГ! 🏆";
    } else {
        message.textContent = "ПОТРІБНО БІЛЬШЕ ТРЕНУВАНЬ! ⚽";
    }
}
