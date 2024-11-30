// Select elements
const startChatButton = document.querySelector('#start-chat-button');
const landingPage = document.querySelector('#landing-page');
const chatApp = document.querySelector('#chat-app');
const nameForm = document.querySelector('#name-form');
const linaNameInput = document.querySelector('#lina-name');
const lisaNameInput = document.querySelector('#lisa-name');

const linaButton = document.querySelector('#Lina-selector');
const lisaButton = document.querySelector('#Lisa-selector');
const header = document.querySelector('.chat-header');
const messagesContainer = document.querySelector('.chat-messages');
const inputForm = document.querySelector('.chat-input-form');
const inputField = document.querySelector('.chat-input');
const clearChatButton = document.querySelector('.clear-chat-button');

let storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

const createMessageElement = (message) => `
  <div class="message ${message.sender === 'Lina' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

const updateSender = (name) => {
  currentSender = name;
  header.innerText = `${currentSender} chatting...`;
  inputField.placeholder = `Type here, ${currentSender}...`;

  if (name === 'Lina') {
    linaButton.classList.add('active-person');
    lisaButton.classList.remove('active-person');
  }
  if (name === 'Lisa') {
    linaButton.classList.remove('active-person');
    lisaButton.classList.add('active-person');
  }

  inputField.focus();
};

// Show chat app and hide landing page when button is clicked
startChatButton.addEventListener('click', (e) => {
  e.preventDefault();

  const linaName = linaNameInput.value.trim();
  const lisaName = lisaNameInput.value.trim();

  if (linaName && lisaName) {
    // Set custom names for Lina and Lisa
    linaButton.textContent = linaName;
    lisaButton.textContent = lisaName;

    // Hide the landing page and show the chat app
    landingPage.style.display = 'none';
    chatApp.style.display = 'block';

    // Default sender is the first user (Lina by default)
    updateSender(linaName);
  }
});

let currentSender = 'Lina';

const sendChatMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const newMessage = {
    sender: currentSender,
    text: inputField.value,
    timestamp,
  };

  storedMessages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(storedMessages));

  messagesContainer.innerHTML += createMessageElement(newMessage);
  inputForm.reset();
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

inputForm.addEventListener('submit', sendChatMessage);

clearChatButton.addEventListener('click', () => {
  localStorage.clear();
  messagesContainer.innerHTML = '';
});

// Select the default user based on button click
linaButton.onclick = () => updateSender(linaButton.textContent);
lisaButton.onclick = () => updateSender(lisaButton.textContent);

// Initialize the chat with stored messages
window.onload = () => {
  storedMessages.forEach((message) => {
    messagesContainer.innerHTML += createMessageElement(message);
  });
};
