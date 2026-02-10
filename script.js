/* ================== GLOBAL ================== */
let balloonTimer, galleryInterval, countdownInterval;
const camera = document.getElementById('camera');
const music = document.getElementById('music');

/* ================== CAMERA ================== */
function cameraZoom(scale = 1, y = 0, duration = 1400) {
  camera.style.transition = `transform ${duration}ms cubic-bezier(.22,.61,.36,1)`;
  camera.style.transform = `scale(${scale}) translateY(${y}px)`;
}

/* ================== SCENE ================== */
function showScene(id) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

/* ================== CONFETTI ================== */
function safeConfetti(opt) {
  if (typeof confetti === 'function') {
    try { confetti(opt); } catch {}
  }
}

/* ================== TEXT EFFECT ================== */
function applyGlow(el, level = 0.6) {
  el.style.transition = 'opacity 1s ease, text-shadow 1s ease, transform 1s ease';
  el.style.opacity = 1;
  el.style.transform = 'scale(1)';
  el.style.textShadow = `
    0 0 ${8 * level}px rgba(255,150,180,0.6),
    0 0 ${18 * level}px rgba(255,120,160,0.35)
  `;
}

function fadeOut(el) {
  el.style.opacity = 0;
  el.style.transform = 'scale(0.96)';
  el.style.textShadow = 'none';
}

/* ================== START ================== */
function startSurprise() {
  clearInterval(countdownInterval);
  showScene('scene-countdown');
  cameraZoom(1.08);

  let count = 3;
  const text = document.getElementById('countText');
  text.innerText = count;
  applyGlow(text, 0.7);

  countdownInterval = setInterval(() => {
    count--;
    text.innerText = count >= 0 ? count : '';
    if (count < 0) {
      clearInterval(countdownInterval);
      fadeOut(text);
      cameraZoom(1);
      showBalloons();
    }
  }, 1000);
}

/* ================== BALLOONS ================== */
function showBalloons() {
  clearTimeout(balloonTimer);
  showScene('scene-balloons');
  cameraZoom(1.04);

  const area = document.getElementById('balloons');
  area.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = Math.random() * 85 + '%';
    b.style.background = randomColor();
    area.appendChild(b);
  }

  safeConfetti({ particleCount: 30, spread: 60, origin: { y: 0.9 } });
  balloonTimer = setTimeout(showGreeting, 4200);
}

/* ================== GREETING ================== */
function showGreeting() {
  clearTimeout(balloonTimer);
  showScene('scene-greeting');
  cameraZoom(1.1);

  document.querySelectorAll('#scene-greeting h1, #scene-greeting h2, #scene-greeting p')
    .forEach(el => applyGlow(el, 0.7));

  safeConfetti({ particleCount: 40, spread: 80, origin: { y: 0.5 } });

  if (music) music.play().catch(() => {});
  setTimeout(showCake, 3600);
}

/* ================== CAKE ================== */
function showCake() {
  showScene('scene-cake');
  cameraZoom(1);

  const flame = document.getElementById('flame');
  if (flame) {
    flame.style.opacity = 1;
    flame.style.display = 'block';
  }
}

/* ================== CANDLE ================== */
function blowCandle() {
  const flame = document.getElementById('flame');
  if (!flame) return;

  flame.style.transition = 'opacity 0.6s ease';
  flame.style.opacity = 0;

  cameraZoom(1.15);
  safeConfetti({ particleCount: 20, spread: 50, origin: { y: 0.7 } });

  setTimeout(showMessage, 1200);
}

/* ================== MESSAGE ================== */
function showMessage() {
  if (typeof confetti === 'function') {
    try { confetti.reset(); } catch {}
  }

  showScene('scene-message');
  cameraZoom(1.18);

  const el = document.getElementById('typingText');
  el.innerHTML = '';
  el.style.opacity = 1;

  let i = 0;
  const speed = 44;

  if (el.typingInterval) clearInterval(el.typingInterval);

  el.typingInterval = setInterval(() => {
    el.innerHTML += personalMessage.charAt(i++);
    applyGlow(el, 0.65);

    if (i >= personalMessage.length) {
      clearInterval(el.typingInterval);
      el.typingInterval = null;

      setTimeout(() => {
        fadeOut(el);

        // LANGSUNG KE GALLERY tanpa lyrics
        showGallery();
      }, 600);
    }
  }, speed);
}

/* ================== TEXT ================== */
const personalMessage = `Intan Nur Azizah,

Semoga hari ini
dipenuhi senyum kecil,
ketenangan,
dan rasa hangat yang sederhana.

Terima kasih
sudah menjadi dirimu sendiri 🤍`;

/* ================== GALLERY ================== */
function showGallery() {
  clearInterval(galleryInterval);
  showScene('scene-gallery');
  cameraZoom(1);

  const imgs = document.querySelectorAll('.gallery-track img');
  let y = 0;

  galleryInterval = setInterval(() => {
    y += 0.18;
    imgs.forEach((img, i) => {
      img.style.transform = `translateY(${-y + i * 30}px) rotate(${i % 2 ? 1.5 : -1.5}deg)`;
      img.style.boxShadow = '0 10px 25px rgba(255,120,160,0.25)';
    });
  }, 40);

  safeConfetti({ particleCount: 30, spread: 70, origin: { y: 0.25 } });
  setTimeout(showClosing, 8000);
}

/* ================== CLOSING ================== */
function showClosing() {
  clearInterval(galleryInterval);
  showScene('scene-closing');
  cameraZoom(1);

  const el = document.querySelector('#scene-closing .closing');
  applyGlow(el, 0.9);
}

/* ================== COLOR ================== */
function randomColor() {
  return ['#ff4d6d', '#ffafcc', '#ffc8dd'][Math.floor(Math.random() * 3)];
}
