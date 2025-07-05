let is24Hour = false;
let countdownInterval = null;
let clockInterval = null;
let countdownSeconds = 0;

const clockEl = document.getElementById('clock');
const toggleBtn = document.getElementById('toggleFormat');
const secondsInput = document.getElementById('secondsInput');
const startCountdownBtn = document.getElementById('startCountdown');
const stopCountdownBtn = document.getElementById('stopCountdown');

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function showTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = '';

  if (!is24Hour) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
  }

  clockEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}${ampm}`;
}

function startClock() {
  showTime();
  clockInterval = setInterval(showTime, 1000);
}

function stopClock() {
  clearInterval(clockInterval);
}

toggleBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleBtn.textContent = is24Hour ? 'Cambiar a 12h' : 'Cambiar a 24h';
  showTime();
});

function startCountdown() {
  countdownSeconds = parseInt(secondsInput.value, 10);
  if (isNaN(countdownSeconds) || countdownSeconds <= 0) return;
  stopClock();
  clearInterval(countdownInterval);

  updateCountdownDisplay();
  countdownInterval = setInterval(() => {
    countdownSeconds--;
    updateCountdownDisplay();
    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      clockEl.textContent = '¡Tiempo terminado!';
      setTimeout(() => {
        startClock();
      }, 2000);
    }
  }, 1000);
}

function updateCountdownDisplay() {
  let h = Math.floor(countdownSeconds / 3600);
  let m = Math.floor((countdownSeconds % 3600) / 60);
  let s = countdownSeconds % 60;
  clockEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function stopCountdown() {
  clearInterval(countdownInterval);
  startClock();
}

startCountdownBtn.addEventListener('click', startCountdown);
stopCountdownBtn.addEventListener('click', stopCountdown);

// Inicializar