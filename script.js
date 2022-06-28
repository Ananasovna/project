'use strict';

const textarea = document.querySelector('textarea');
const button = document.querySelector('button');
const script = document.querySelector('script');

function sendMessage() {
  let message = document.createElement('p');
  message.className = 'message';
  message.innerHTML = textarea.value;
  script.before(message);
}

function sendMessageByEnter(event) {
  if (event.code == 'Enter') {
    sendMessage();
  };
}

button.addEventListener('click', sendMessage);
document.addEventListener('keydown', sendMessageByEnter);