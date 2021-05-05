const lighters = document.querySelectorAll('.lighter');
const lightContainer = document.querySelector('.light-container');
let intervalId;
let timeoutId;
let flashed = false;
class UI {
  // Select lighters
  static flash = false;

  static clearLoop() {
    if (intervalId) {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      intervalId = null;
      this.turnOffLighter(lighters);
    }
  }

  static toggleLighter(lighters) {
    // If it flashing
    for (let i = 0; i < lighters.length; i++) {
      lighters[i].classList.toggle(`on`);
    }
  }

  static turnOnLighter(lighters) {
    for (let i = 0; i < lighters.length; i++) {
      lighters[i].classList.add(`on`);
    }
  }

  static turnOffLighter(lighters) {
    for (let i = 0; i < lighters.length; i++) {
      lighters[i].classList.remove(`on`);
    }
  }

  static toggleFlashLight(oddLighters, evenLighters, intervalValue) {
    // If user have not clicked the flash yet

    // Make the even light first so, we can toggle odd and even
    this.turnOnLighter(evenLighters);
    this.turnOffLighter(oddLighters);
    // User already click the flash button

    clearInterval(intervalId);

    intervalId = setInterval(() => {
      this.toggleLighter(oddLighters);
      this.toggleLighter(evenLighters);
    }, intervalValue);
  }
}

// Event: Turn light on
const toggleButton = document.querySelector('.button--toggle');
toggleButton.addEventListener('click', () => {
  // Validate
  UI.clearLoop();
  // Turn on
  UI.toggleLighter(lighters);
});

// Get the odd and even lighter
let oddLighters = [];
let evenLighters = [];
for (let i = 0; i < lighters.length; i++) {
  if (i % 2 == 0) {
    oddLighters.push(lighters[i]);
  } else {
    evenLighters.push(lighters[i]);
  }
}

// Event: Flash Light
const flashButton = document.querySelector('.button--flash');
// interval value
const interval = document.getElementById('interval-change');
interval.defaultValue = '500';
flashButton.addEventListener('click', () => {
  // Flash
  UI.toggleFlashLight(oddLighters, evenLighters, interval.value);
});
