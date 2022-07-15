'use strict';

const textarea = document.querySelector('.textarea');
const button = document.querySelector('.button');
const script = document.querySelector('.script');
const checkbox = document.querySelector('.checkbox');
const body = document.querySelector('.body');
const messages = [];

function sendMessage() {
  const message = createMessage(textarea.value);
  if (/\S/.test(textarea.value)) {
    script.before(message);
    message.dataset.id = newId();
    clearTextarea();
  } 
}

function createMessage(innerText) {
  const element = document.createElement('div');
  element.className = 'message';
  
  const text = document.createElement('p');
  text.innerHTML = innerText;
  
  const button = document.createElement('button');
  button.className = 'message__delete-button';
  button.innerHTML = '&#128937';
  button.addEventListener('click', () => console.log(`Вы хотите удалить сообщение № ${element.dataset.id}`));
  
  element.append(text);
  element.append(button);
  messages.push(element);
  
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

const newId = makeIdCounter();

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', handleKeyboardEvent);
checkbox.addEventListener('click', changeColorTheme);