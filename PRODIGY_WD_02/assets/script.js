let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapTimes = [];

const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsElement = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    displayElement.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapTimes = [];
    displayElement.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsElement.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapsElement.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
