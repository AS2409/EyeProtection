var timerElement = document.getElementById("timer");
var pauseButton = document.getElementById("pause");
var startButton = document.getElementById("start");
var resumeButton = document.getElementById("resume");
var resetButton = document.getElementById("reset");
var isTimerPaused = false;
var isTimerRunning = false;

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", function () {
    // Check if dark mode is already enabled
    chrome.storage.sync.get("darkMode", function (data) {
      const newMode = !data.darkMode;

      // Store the new mode in Chrome storage
      chrome.storage.sync.set({ darkMode: newMode }, function () {
        // Apply the dark mode style to the current tab
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: toggleDarkMode,
              args: [newMode],
            });
          }
        );
      });
    });
  });

// Function to toggle dark mode styles on the current page
function toggleDarkMode(isDark) {
  if (isDark) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "updateTimer") {
    // Update timer display
    timerElement.textContent = message.time;
  }
});

// Start the timer
startButton.addEventListener("click", function () {
  if (!isTimerRunning) {
    chrome.runtime.sendMessage({ type: "startTimer" });
    isTimerRunning = true;
    isTimerPaused = false; // Timer is not paused when starting
  }
});

// Pause the timer
pauseButton.addEventListener("click", function () {
  if (isTimerRunning && !isTimerPaused) {
    chrome.runtime.sendMessage({ type: "pauseTimer" });
    isTimerPaused = true;
  }
});

// Resume the timer
resumeButton.addEventListener("click", function () {
  if (isTimerPaused) {
    chrome.runtime.sendMessage({ type: "resumeTimer" });
    isTimerPaused = false;
  }
});

// Reset the timer
resetButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({ type: "resetTimer" });
  isTimerRunning = false;
  isTimerPaused = false; // Reset the pause state
});

// Start the timer when the page loads
window.addEventListener("load", function () {
  chrome.runtime.sendMessage({ type: "getTimerState" });
});
