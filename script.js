'use strict';

const textarea = document.querySelector('.textarea');
const button = document.querySelector('.button');
const checkbox = document.querySelector('.checkbox');
const body = document.querySelector('.body');
const messages = [];
const messagesWrapper = document.createElement('div');
const newId = makeIdCounter();
const label = document.querySelector('label');

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
  label.after(messagesWrapper);
  console.log(messages);
}

function createMessage(message) {
  const element = document.createElement('div');
  element.className = 'message';
  element.dataset.id = message.id;
  
  const text = document.createElement('p');
  text.innerHTML = message.text;
  
  const button = document.createElement('button');
  button.className = 'message__delete-button';
  button.innerHTML = '&#128937';
  button.addEventListener('click', deleteMessage);
  
  element.append(text);
  element.append(button);
  
  return element;
}

function deleteMessage() {
  messages.splice(messages.indexOf(messages.find(item => item.id == event.target.parentNode.dataset.id)), 1);
  sendMessage();
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