// Utils
const generateRandomNumber = () => Math.random();
const listSize = (xs) => xs.length;
const head = (xs) => xs[0];
const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((value, func) => func(value), arg);
const multBy =
  (factor = 1) =>
  (value = 1) =>
    factor * value;

//  Business Functions

const generateRandomIntegerByArraySize = compose(
  Math.floor,
  (value) => multBy(generateRandomNumber())(value),
  listSize
);

const getRandomPhrase = (xs) =>
  compose((index) => xs[index], generateRandomIntegerByArraySize)(xs);

// DOM manipulation

const getHtmlElements = (xs) => xs.map((x) => document.querySelector(x));
const setTextIntoHtml = (text) => (element) => (element.innerText = text);
const [btnSnack, btnAnotherSnack] = getHtmlElements([
  ".closed-snack-button",
  "#btn-another-snack",
]);

function toggleHide() {
  const [screen1, screen2] = getHtmlElements([
    ".closed-snack",
    ".opened-snack",
  ]);
  screen1.classList.add("hide");
  screen2.classList.remove("hide");
}

function setNewPhrase(phrase) {
  const [span] = getHtmlElements([".opened-snack > span"]);
  span.innerText = phrase;
}

const generateNewLucky = compose(setNewPhrase, getRandomPhrase);

const handleGetSnack = (phrases) => (event) => {
  event.preventDefault();
  toggleHide();
  generateNewLucky(phrases);
};

const handleGetAnotherSnack = (phrases) => (event) => {
  event.preventDefault();
  generateNewLucky(phrases);
};

const phrases = [
  "Fortune favors the bold, get lucky today.",
  "Get lucky or go home.",
  "Lady Luck is waiting, time to get lucky.",
  "It only takes one moment to get lucky.",
  "Unleash your inner lucky charm.",
  "Finding luck is easier than you think.",
  "Make your own luck, get started now.",
  "Lucky things happen to those who seek them.",
  "Turn your luck around, today is your day.",
  "You can't win if you don't try, get lucky.",
];

btnSnack.addEventListener("click", handleGetSnack(phrases));
btnAnotherSnack.addEventListener("click", handleGetAnotherSnack(phrases));
