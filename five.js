// Tab navigation
function openTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-buttons button");
    tabs.forEach(tab => tab.classList.remove("active"));
    buttons.forEach(button => button.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add("active");
}

// Calculator
let calcDisplay = "";
function calculate(value) {
    if (value === "=") {
        calcDisplay = eval(calcDisplay);
    } else {
        calcDisplay += value;
    }
    document.getElementById("calc-display").value = calcDisplay;
}
function clearCalc() {
    calcDisplay = "";
    document.getElementById("calc-display").value = calcDisplay;
}

// To-Do List
function addToDo() {
    const todoInput = document.getElementById("todo-input");
    const newTask = todoInput.value.trim();
    if (newTask) {
        const li = document.createElement("li");
        li.innerText = newTask;
        document.getElementById("todo-list").appendChild(li);
        todoInput.value = "";
    }
}

// Notes
function addNote() {
    const noteInput = document.getElementById("note-input");
    const newNote = noteInput.value.trim();
    if (newNote) {
        const li = document.createElement("li");
        li.innerText = newNote;
        document.getElementById("notes-list").appendChild(li);
        noteInput.value = "";
    }
}

// Clock - Alarm
let alarmTimeout;
const alarmAudio = document.getElementById("alarm-audio");

function setAlarm() {
    const alarmTime = document.getElementById("alarm-time").value;
    const soundFile = document.getElementById("alarm-sound-upload").files[0];

    if (soundFile) {
        const fileURL = URL.createObjectURL(soundFile);
        alarmAudio.src = fileURL;
    }

    if (alarmTime) {
        const now = new Date();
        const alarmDate = new Date(`${now.toDateString()} ${alarmTime}`);
        if (alarmDate > now) {
            const timeToAlarm = alarmDate - now;
            alarmTimeout = setTimeout(() => {
                alarmAudio.play();
                alert("Alarm ringing!");
            }, timeToAlarm);
            document.getElementById("alarm-status").innerText = `Alarm set for ${alarmTime}`;
        } else {
            alert("Please set a future time for the alarm.");
        }
    } else {
        alert("Please enter a valid time.");
    }
}

function stopAlarm() {
    clearTimeout(alarmTimeout);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    document.getElementById("alarm-status").innerText = "No alarm set";
}

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;
function updateStopwatch() {
    stopwatchTime++;
    const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, "0");
    const seconds = String(stopwatchTime % 60).padStart(2, "0");
    document.getElementById("stopwatch-display").innerText = `${hours}:${minutes}:${seconds}`;
}
function startStopwatch() {
    if (!stopwatchInterval) stopwatchInterval = setInterval(updateStopwatch, 1000);
}
function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}
function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    document.getElementById("stopwatch-display").innerText = "00:00:00";
}

// Timer
let timerInterval;
function startTimer() {
    const timerInput = parseInt(document.getElementById("timer-input").value);
    if (isNaN(timerInput) || timerInput <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }
    let timeRemaining = timerInput;
    function updateTimer() {
        if (timeRemaining > 0) {
            timeRemaining--;
            const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
            const seconds = String(timeRemaining % 60).padStart(2, "0");
            document.getElementById("timer-display").innerText = `${minutes}:${seconds}`;
        } else {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}
