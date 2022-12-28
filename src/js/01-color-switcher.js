'use strict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
let timerId = null;
stopButtonEl.disabled = true;

startButtonEl.addEventListener('click', () => {
  stopButtonEl.disabled = false;
  startButtonEl.disabled = true;

  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});

stopButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  clearInterval(timerId);
});
