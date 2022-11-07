import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const inputValues = {};
const FIELDVALUES_KEY = 'feedback-form-state';

if (localStorage.getItem(FIELDVALUES_KEY)) {
  try {
    const parcedValues = JSON.parse(localStorage.getItem(FIELDVALUES_KEY));

    // Варіант зі знаходженням окремих елементів
    // const formInputEl = document.querySelector('input');
    // const formTextareaEl = document.querySelector('textarea');
    // formInputEl.value = parcedValues.email;
    // formTextareaEl.value = parcedValues.message;

    // Варіант з використанням властивості elements
    feedbackFormEl.elements.email.value = parcedValues.email;
    feedbackFormEl.elements.message.value = parcedValues.message;
  } catch (error) {
    console.log("Ой-вей, тут помилки, ось такі:");
    console.log(error.name);
    console.log(error.message);
  }
}

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
  localStorage.removeItem(FIELDVALUES_KEY);
  feedbackFormEl.reset();
  console.log(inputValues);
}

feedbackFormEl.addEventListener('input', throttle(onInputHandler, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);