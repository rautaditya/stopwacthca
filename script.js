let startButton = document.getElementById("startStop");
let resetButton = document.getElementById("reset");
let notesTextArea = document.getElementById("notes");
let summary = document.getElementById("summary");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval;
let isRunning = false;

function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    startButton.textContent = "Start";
    startButton.style.backgroundColor = "#2ecc71";
    displaySummary(); // Display time summary when stopped
  } else {
    timerInterval = setInterval(updateTime, 10);
    startButton.textContent = "Stop";
    startButton.style.backgroundColor = "#e74c3c";
  }
  isRunning = !isRunning;
}

function updateTime() {
  milliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
  document.getElementById("milliseconds").textContent = formatTime(milliseconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function reset() {
  clearInterval(timerInterval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("milliseconds").textContent = "00";
  startButton.textContent = "Start";
  startButton.style.backgroundColor = "#2ecc71";
  isRunning = false;
  notesTextArea.value = ""; // Clear the notes when reset
  summary.textContent = ""; // Clear the summary
}

function displaySummary() {
  const noteText = notesTextArea.value.trim();
  const timeSummary = `Total Time: ${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
  summary.innerHTML = `<strong>${timeSummary}</strong><br><br><strong>Notes:</strong><br>${noteText ? noteText : "No notes added"}`;
}
