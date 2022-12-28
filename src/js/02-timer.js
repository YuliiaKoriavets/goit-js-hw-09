'use strict';

import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePickerEl = document.querySelector('input[type="text"]');
const startButtonEl = document.querySelector('button[data-start]');
const datesEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startButtonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure(`Please choose a date in the future`);
      startButtonEl.disabled = true;
      selectedDates[0] = new Date();
    } else if (selectedDates[0] > new Date()) {
      startButtonEl.disabled = false;
    }
  },
};

flatpickr(dateTimePickerEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let timerId = null;

function handleStartTimer() {
  startButtonEl.disabled = true;
  dateTimePickerEl.disabled = true;
  timerId = setInterval(() => {
    const timeDifference = new Date(dateTimePickerEl.value) - new Date();
    if (timeDifference < 0) {
      return;
    }
    const timeObj = convertMs(timeDifference);

    datesEl.textContent = addLeadingZero(timeObj.days);
    hoursEl.textContent = addLeadingZero(timeObj.hours);
    minutesEl.textContent = addLeadingZero(timeObj.minutes);
    secondsEl.textContent = addLeadingZero(timeObj.seconds);
  }, 1000);
}

startButtonEl.addEventListener('click', handleStartTimer);
