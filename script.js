'use strict';

const textarea = document.querySelector('.textarea');
const button = document.querySelector('.button');
const script = document.querySelector('.script');
const checkbox = document.querySelector('.checkbox');
const body = document.querySelector('.body');
const messages = [];
const messagesWrapper = document.createElement('div');
const newId = makeIdCounter();

messagesWrapper.classList.add('messages-wrapper');

function Message(id, text) {
  this.id = id;
  this.text = text;
}

function generateMessages() {
  if (textarea.value.trim()) {
  messages.push(new Message(newId(), textarea.value));
  }
}

function sendMessage() {
  if (messagesWrapper) {
    messagesWrapper.innerHTML = '';
  }
  generateMessages();
  messages.forEach(item => {
    messagesWrapper.append(createMessage(item));
    clearTextarea();
    });
  script.before(messagesWrapper);
  console.log(messages);
}

function createMessage(message) {
  const element = document.createElement('div');
  element.className = 'message';
  
  const text = document.createElement('p');
  text.innerHTML = message.text;
  
  const button = document.createElement('button');
  button.className = 'message__delete-button';
  button.innerHTML = '&#128937';
  button.addEventListener('click', () => console.log(`Вы хотите удалить сообщение № ${message.id}`));
  
  element.append(text);
  element.append(button);
  
  return element;
}

function handleKeyboardEvent(event) {
  if (event.code == 'Enter') {
    sendMessage();
  };
}

function clearTextarea() {
  textarea.value = '';
  textarea.focus();
}

function changeColorTheme() {
  checkbox.checked == true ? body.classList.add('body_dark') : body.className = 'body';
}

function makeIdCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', handleKeyboardEvent);
checkbox.addEventListener('click', changeColorTheme);