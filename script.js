function startSurprise() {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('countdown').classList.remove('hidden');

  let count = 3;
  const text = document.getElementById('countText');

  const interval = setInterval(() => {
    count--;
    text.innerText = count;

    if (count === 0) {
      clearInterval(interval);
      document.getElementById('countdown').classList.add('hidden');
      showBalloons();
    }
  }, 1000);
}

function showBalloons() {
  const area = document.getElementById('balloons');
  area.classList.remove('hidden');

  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 90 + '%';
    balloon.style.background = randomColor();

    balloon.onclick = () => popBalloon(balloon);
    area.appendChild(balloon);
  }
}

function popBalloon(balloon) {
  balloon.remove();

  if (typeof confetti === 'function') {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
}


  if (document.querySelectorAll('.balloon').length === 0) {
    showMessage();
  }
}

function showMessage() {
  dramaticRibbonExplosion();

  document.body.classList.add('shake');

  const flash = document.getElementById('flash');
  flash.classList.add('active');

  setTimeout(() => {
    document.body.classList.remove('shake');
    flash.classList.remove('active');

    document.getElementById('message').classList.remove('hidden');
    document.getElementById('cakeSection').classList.remove('hidden');

    const music = document.getElementById('music');
    if (music) {
      music.play().catch(() => {
        console.log('Autoplay blocked, user interaction required');
      });
    }
  }, 800);
}



function randomColor() {
  const colors = ['#ff4d6d', '#ffafcc', '#ffc8dd', '#ffcad4'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function dramaticRibbonExplosion() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 120,
      startVelocity: 55,
      gravity: 0.8,
      ticks: 300,
      origin: { x: 0.5, y: 0.5 },
      shapes: ['square'],
      scalar: 1.4,
      colors: ['#ff4d6d', '#ffafcc', '#ffc8dd', '#ffd6e0']
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 120,
      startVelocity: 55,
      gravity: 0.8,
      ticks: 300,
      origin: { x: 0.5, y: 0.5 },
      shapes: ['square'],
      scalar: 1.4,
      colors: ['#ff4d6d', '#ffafcc', '#ffc8dd', '#ffd6e0']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function blowCandle() {
  const flame = document.getElementById('flame');
  flame.style.display = 'none';

  confetti({
    particleCount: 60,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#ffafcc', '#ffc8dd', '#ffd6e0']
  });

  document.querySelector('.hint').innerText =
    'Semoga semua harapanmu terkabul 🤍';

  setTimeout(() => {
    document.getElementById('typingSection').classList.remove('hidden');
    typeText(personalMessage, 'typingText', 45);
  }, 800);
}


const personalMessage = `
Intan Nur Azizah,

Di hari spesial ini,
semoga kamu selalu dikelilingi
hal-hal baik yang kamu pantas dapatkan.

Terima kasih sudah menjadi
pribadi yang tulus,
kuat,
dan selalu membawa senyum.

Semoga setiap langkahmu
dipenuhi kebahagiaan.
🤍
`;

function typeText(text, elementId, speed = 50) {
  const element = document.getElementById(elementId);
  element.innerHTML = '';
  let i = 0;

  const typing = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      showGallery();
    }
  }, speed);
}

function showGallery() {
  setTimeout(() => {
    document.getElementById('gallerySection').classList.remove('hidden');
  }, 600);

  setTimeout(() => {
    document.getElementById('closingText').classList.remove('hidden');
  }, 2200);
}


