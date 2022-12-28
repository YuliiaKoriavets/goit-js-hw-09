'use strict';
import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const data = {
    position,
    delay,
  };

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const inputEl = event.currentTarget.elements;

  let delay = Number(inputEl.delay.value);
  let step = Number(inputEl.step.value);
  let amount = Number(inputEl.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  formEl.reset();
}

formEl.addEventListener('submit', handleSubmit);
