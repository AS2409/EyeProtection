function executeTwentyTwentyTwentyRule() {
  const elements = document.getElementsByTagName("*");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // Exclude script, style, and certain other tags
    if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
      continue;
    }

    for (let j = 0; j < element.childNodes.length; j++) {
      const childNode = element.childNodes[j];

      if (childNode.nodeType === Node.TEXT_NODE) {
        let text = childNode.textContent;
        const words = text.split(" ");

        for (let k = 0; k < words.length; k++) {
          const word = words[k];

          if (word.length > 3) {
            words[k] = word.substring(0, 3) + "-" + word.substring(3);
          }
        }

        childNode.textContent = words.join(" ");
      }
    }
  }
}

// Execute the 20-20-20 rule when the page finishes loading
window.addEventListener("load", executeTwentyTwentyTwentyRule);
