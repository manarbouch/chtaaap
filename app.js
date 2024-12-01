document.addEventListener("DOMContentLoaded", () => {
  // Element references
  const landingPage = document.getElementById("landing-page");
  const chatApp = document.getElementById("chat-app");
  const nameForm = document.getElementById("name-form");
  const firstUserInput = document.getElementById("first-user");
  const secondUserInput = document.getElementById("second-user");
  const userButtons = document.querySelectorAll(".user-button");
  const chatHeader = document.querySelector(".chat-header");
  const chatInput = document.querySelector(".chat-input");
  const chatInputForm = document.querySelector(".chat-input-form");
  const chatMessages = document.querySelector(".chat-messages");
  const clearChatButton = document.querySelector(".clear-chat-button");

  
  let user1Name = "User 1";
  let user2Name = "User 2";

  // Event listener for the name form submission
  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    user1Name = firstUserInput.value || "User 1";
    user2Name = secondUserInput.value || "User 2";
    let activeUser = user1Name;
    // Update button labels and header
    document.getElementById("User1-selector").textContent = user1Name;
    document.getElementById("User2-selector").textContent = user2Name;
    chatHeader.textContent = `${activeUser} writing...`;
    chatInput.placeholder = `Type here, ${user1Name}...`;

    // Hide landing page and show chat app
    landingPage.style.display = "none";
    chatApp.style.display = "block";
  });

  // Event listener for user button switching
  userButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Remove active state from all buttons
      userButtons.forEach((btn) => btn.classList.remove("active-person"));

      // Add active state to clicked button
      e.target.classList.add("active-person");

      // Update active user and placeholders
      if (e.target.id === "User1-selector") {
        activeUser = user1Name;
      } else {
        activeUser = user2Name;
      }

      chatHeader.textContent = `${activeUser} writing...`;
      chatInput.placeholder = `Type here, ${activeUser}...`;
    });
  });

  // Event listener for chat form submission
  chatInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const messageText = chatInput.value.trim();
    if (messageText) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add(activeUser === user1Name ? "blue-bg" : "gray-bg");

      messageDiv.innerHTML = `
        <div class="message-sender">${activeUser}</div>
        <div class="message-text">${messageText}</div>
        <div class="message-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      `;

      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
      chatInput.value = ""; // Clear input
    }
  });

  // Event listener for clearing chat
  clearChatButton.addEventListener("click", () => {
    chatMessages.innerHTML = ""; // Clear all messages
  });
});
