'use strict';

const textarea = document.getElementById('textarea');
const button = document.getElementById('button');

function logText() {
  console.log(textarea.value);
}

button.addEventListener('click', logText);