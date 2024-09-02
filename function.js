
const time = document.querySelector('.time');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.querySelector('.laps');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
        time.classList.remove('running');
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        isRunning = true;
        time.classList.add('running');
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const formattedTime = new Date(time).toISOString().substr(11, 8);
    document.querySelector('.time').textContent = formattedTime;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(elapsedTime);
    startStopBtn.textContent = 'Start';
    isRunning = false;
    lapCount = 0;
    lapsContainer.innerHTML = '';
    time.classList.remove('running');
}

function lap() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.querySelector('.time').textContent;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-time');
        lapElement.innerHTML = `<span>Lap ${lapCount}</span><span>${lapTime}</span>`;
        lapsContainer.prepend(lapElement);

        lapElement.style.opacity = '0';
        lapElement.style.transform = 'translateY(-20px)';
        lapElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            lapElement.style.opacity = '1';
            lapElement.style.transform = 'translateY(0)';
        }, 10);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
