'use strict';

// import { CardsApi } from "./api/data";

// CardsApi.setCards().then(res => { console.log(res)});

const textarea = document.querySelector('.textarea');
const button = document.querySelector('.button');
const checkbox = document.querySelector('.checkbox');
const body = document.querySelector('.body');
let messages = [];
const messagesWrapper = document.createElement('div');
const newId = makeIdCounter();
const label = document.querySelector('label');
const selectorMenu = document.querySelector('.selector-menu');

messagesWrapper.classList.add('messages-wrapper');

function showWelcomeScreen() {

  const welcomeScreenWrapper = document.createElement('div');
  welcomeScreenWrapper.classList.add('welcome-screen-wrapper');

  const welcomeText = document.createElement('p');
  
  welcomeText.classList.add('welcome-text');

  const welcomeButton = document.createElement('button');
  welcomeButton.innerHTML = 'Continue';
  welcomeButton.classList.add('welcome-button');
  welcomeButton.addEventListener('click', () => welcomeScreenWrapper.remove());

  welcomeScreenWrapper.append(welcomeText);
  welcomeScreenWrapper.append(welcomeButton);
  body.prepend(welcomeScreenWrapper);

  if (!localStorage.user) {
    let userName = prompt('What\'s your name?');
    localStorage.setItem('user', userName);
  }

  welcomeText.innerText = `Hello, ${localStorage.user}`;
}

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
}

function createMessage(message) {
  const element = document.createElement('div');
  element.className = 'message';
  
  const text = document.createElement('p');
  text.innerHTML = message.text;
  
  const button = document.createElement('button');
  button.className = 'message__delete-button';
  button.innerHTML = '&#128937';
  button.addEventListener('click', () => deleteMessage(message.id));
  
  element.append(text);
  element.append(button);

  element.addEventListener('dblclick', () => {
    return correctMessage(message);
  });
  
  return element;
}

function deleteMessage(id) {
  messages = messages.filter(item => item.id !== id);
  sendMessage();
}

function correctMessage(message) {
  const correctInput = document.createElement('input');
  correctInput.classList.add('correct-input');
  let eventTarget = event.target;

  if (event.target.tagName == "P") {
    eventTarget = event.target.parentNode;
  }

  messagesWrapper.replaceChild(correctInput, eventTarget);
  
  correctInput.value = message.text;
  correctInput.addEventListener('change', () => {
    message.text = correctInput.value;
    sendMessage();
  });
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

function openCloseSelectorMenu() {
  if (!document.querySelector('.selector-menu-ul')) {
    const menu = document.createElement('ul');
    menu.classList.add('selector-menu-ul');
    const options = ['От А до Я', 'От Я до А', 'По возрастанию', 'По убыванию'];
    options.forEach(item => {
    let li = document.createElement('li');
    li.innerText = item;
    menu.append(li);
  })
    selectorMenu.append(menu);
  } else {
    document.querySelector('.selector-menu-ul').remove();
  }
}

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', handleKeyboardEvent);
checkbox.addEventListener('click', changeColorTheme);
document.addEventListener('DOMContentLoaded', showWelcomeScreen);
selectorMenu.addEventListener('click', openCloseSelectorMenu);