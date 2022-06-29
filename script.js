'use strict';

const textarea = document.querySelector('.textarea');
const button = document.querySelector('.button');
const script = document.querySelector('.script');
const checkbox = document.querySelector('.checkbox');
const messages = [];

function sendMessage() {
  const message = createMessage(textarea.value);
  script.before(message);
  clearTextarea();
}

function createMessage(innerText) {
  const element = document.createElement('div');
  element.className = 'message';
  
  const text = document.createElement('p');
  text.innerHTML = innerText;

  const button = document.createElement('button');
  button.className = 'message__delete-button';
  button.innerHTML = '&#128937';
  button.addEventListener('click', () => console.log(`Вы хотите удалить сообщение № ${messages.findIndex(item => item == element)}`));
  
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
}

function showText() {
  if (checkbox.checked == false) {
    console.log('красный');
  } else {
    console.log('зеленый');
  }
}

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', handleKeyboardEvent);
checkbox.addEventListener('click', showText);