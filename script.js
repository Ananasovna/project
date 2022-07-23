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
const welcomeText = document.querySelector('.welcome-text');

messagesWrapper.classList.add('messages-wrapper');

function showWelcomeText() {
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

const selectorMenu = {
  node: document.querySelector('.selector-menu'),
  options: ['None', 'От А до Я', 'От Я до А', 'По возрастанию', 'По убыванию'],
  isOpen: false,

  openCloseSelectorMenu() {
    if (!this.isOpen) {
      this.menu = document.createElement('ul'),
      this.menu.classList.add('selector-menu-ul'),

      selectorMenu.options.forEach(item => {
      let li = document.createElement('li');
      li.innerText = item;
      this.menu.append(li);
      li.addEventListener('click', () => selectorMenu.chooseSelector.call(selectorMenu));
    })

      selectorMenu.node.append(this.menu);
      this.isOpen = true;
    } else {
      this.menu.remove();
      this.isOpen = false;
    }
  },

  chooseSelector() {
    event.target.innerText == 'None' ? this.node.innerText = 'Сортировать по' : this.node.innerText = event.target.innerText;
  },
};

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', handleKeyboardEvent);
checkbox.addEventListener('click', changeColorTheme);
document.addEventListener('DOMContentLoaded', showWelcomeText);
selectorMenu.node.addEventListener('click', selectorMenu.openCloseSelectorMenu);