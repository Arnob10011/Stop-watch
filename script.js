const btnStart = document.querySelector(".btn--start");
const btnLap = document.querySelector(".btn--lap");
const btnPause = document.querySelector(".btn--pause");
const btnReset = document.querySelector(".btn--reset");
const hourEl = document.querySelector("#hour span");
const minEl = document.querySelector("#min span");
const secondEl = document.querySelector("#second span");
const millisecondEl = document.querySelector("#millisecond span");
const labsContent = document.querySelector(".labs--content");
let [hour, min, second, millisecond] = [0, 0, 0, 0];
let timer;
let timerListArr = [];
function startTimer() {
  timer = setInterval(getTimer, 10);
}

function getTimer() {
  millisecond += 10;
  // for second
  if (millisecond === 1000) {
    millisecond = 0;
    second += 1;
    // for min
    if (second === 60) {
      second = 0;
      min += 1;
      // for hour
      if (min === 60) {
        min = 0;
        hour += 1;
      }
    }
  }

  showTimer();
}

// show timer
function showTimer() {
  hourEl.innerHTML = forPadStart(hour, 2);
  minEl.innerHTML = forPadStart(min, 2);
  secondEl.innerHTML = forPadStart(second, 2);
  // this on is in 3 digits
  millisecondEl.innerHTML = forPadStart(millisecond, 3);
}

// TODO: set the localStroage
function getTimerLap() {
  const html = `
  <div class="lab">
    <div class="lab--timer">${forPadStart(hour, 2)}:</div>
    <div class="lab--timer">${forPadStart(min, 2)}:</div>
    <div class="lab--timer">${forPadStart(second, 2)}:</div>
    <div class="lab--timer">${forPadStart(millisecond, 3)}</div>
  </div>`;
  labsContent.insertAdjacentHTML("afterbegin", html);
}
function forPadStart(element, number) {
  return element.toString().padStart(`${number}`, `0`);
}
// pause the timer
function pause() {
  clearInterval(timer);
}

// TODO: remove localStroage
function reset() {
  // pause the timer
  pause();
  [hour, min, second, millisecond] = [0, 0, 0, 0];
  showTimer();
  // remove the elements
  Array.from(labsContent.children).forEach((lab) => lab.remove());
}

// btns
btnStart.addEventListener("click", startTimer);
btnLap.addEventListener("click", getTimerLap);
btnPause.addEventListener("click", pause);
btnReset.addEventListener("click", reset);
