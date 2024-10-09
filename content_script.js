// Listen for changes to the dark mode setting in the background script
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.darkMode) {
    const isDark = changes.darkMode.newValue;
    toggleDarkMode(isDark);
  }
});

// Apply dark mode based on stored value when the content script loads
chrome.storage.sync.get("darkMode", function (data) {
  if (data.darkMode !== undefined) {
    // Check if the value exists
    toggleDarkMode(data.darkMode);
  }
});

// Function to toggle dark mode styles on the page
function toggleDarkMode(isDark) {
  if (isDark) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
    // Additional styles can be added here
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
    // Reset additional styles here
  }
}

// Function to execute the 20-20-20 rule
function executeTwentyTwentyTwentyRule() {
  // Get all the elements on the page
  const elements = document.getElementsByTagName("*");

  // Iterate through each element
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // Iterate through each child node to find text nodes
    for (let j = 0; j < element.childNodes.length; j++) {
      const childNode = element.childNodes[j];

      // Check if the child node is a text node
      if (childNode.nodeType === Node.TEXT_NODE) {
        const text = childNode.textContent;

        // Split the text into words
        const words = text.split(" ");

        // Modify words longer than 3 characters
        for (let k = 0; k < words.length; k++) {
          const word = words[k];

          if (word.length > 3) {
            // Replace the word with the modified word
            words[k] = word.substring(0, 3) + "-" + word.substring(3);
          }
        }

        // Join the modified words back into a single string
        const modifiedText = words.join(" ");

        // Replace the original text with the modified text
        childNode.textContent = modifiedText;
      }
    }
  }
}

// Execute the 20-20-20 rule when the page finishes loading
window.addEventListener("load", executeTwentyTwentyTwentyRule);
