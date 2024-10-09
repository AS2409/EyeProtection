// background.js

let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let isPaused = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "startTimer" && !isRunning) {
    const startTime = Date.now() - elapsedTime;
    isRunning = true;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updatePopup();
    }, 1000);
  } else if (message.type === "pauseTimer" && isRunning) {
    clearInterval(timerInterval);
    isPaused = true;
    updatePopup();
  } else if (message.type === "resumeTimer" && isPaused) {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updatePopup();
    }, 1000);
    isPaused = false;
    updatePopup();
  } else if (message.type === "resetTimer") {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    isPaused = false;
    updatePopup();
  } else if (message.type === "getTimerState") {
    // Send the current timer state to the popup when requested
    chrome.runtime.sendMessage({
      type: "updateTimer",
      time: formatTime(elapsedTime),
    });
  }
});

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function updatePopup() {
  chrome.runtime.sendMessage({
    type: "updateTimer",
    time: formatTime(elapsedTime),
  });
}
