import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const FIELDVALUES_KEY = 'feedback-form-state';
let inputValues = JSON.parse(localStorage.getItem(FIELDVALUES_KEY)) || {};

// Варіант зі знаходженням окремих елементів
// const formInputEl = document.querySelector('input');
// const formTextareaEl = document.querySelector('textarea');
// formInputEl.value = inputValues.email;
// formTextareaEl.value = inputValues.message;

// Варіант з використанням властивості elements
feedbackFormEl.elements.email.value = inputValues.email || '';
feedbackFormEl.elements.message.value = inputValues.message || '';

function onInputHandler(event) {
  if (event.target.nodeName === 'INPUT') {
    inputValues.email = event.target.value;
  } else if (event.target.nodeName === 'TEXTAREA') {
    inputValues.message = event.target.value;
  }
  localStorage.setItem(FIELDVALUES_KEY, JSON.stringify(inputValues));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(inputValues);
  localStorage.removeItem(FIELDVALUES_KEY);
  feedbackFormEl.reset();
  inputValues = {};
}

feedbackFormEl.addEventListener('input', throttle(onInputHandler, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);
