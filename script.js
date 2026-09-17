/* =========================================
NOIR//01
ZERO — INTERACTION SYSTEM
========================================= */

const productWrap = document.getElementById(“productWrap”);
const soundControl = document.getElementById(“soundControl”);
const objectProduct = document.querySelector(”.object-product”);
const detailProduct = document.querySelector(”.detail-product”);

/* =========================================
STATE
========================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let scrollTarget = 0;
let scrollCurrent = 0;

let soundEnabled = false;
let ambientAudio = null;

/* =========================================
PRODUCT PARALLAX
========================================= */

function animate() {

currentX +=
(targetX - currentX) * 0.08;

currentY +=
(targetY - currentY) * 0.08;

scrollCurrent +=
(scrollTarget - scrollCurrent) * 0.08;

/* ENTRY PRODUCT */

if (productWrap) {

productWrap.style.transform = `
  translate3d(
    ${currentX}px,
    ${25 + currentY}px,
    0
  )
`;
const entryFade =
  Math.max(
    1 - scrollCurrent / 500,
    0.25
  );
const entryBlur =
  Math.min(
    scrollCurrent / 100,
    4
  );
productWrap.style.opacity =
  entryFade;
productWrap.style.filter =
  `blur(${entryBlur}px)`;

}

/* OBJECT PRODUCT */

if (objectProduct) {

const objectOffset =
  Math.max(
    -scrollCurrent * 0.035,
    -24
  );
objectProduct.style.transform = `
  translate3d(
    0,
    ${objectOffset}px,
    0
  )
  scale(1.08)
`;

}

/* DETAIL PRODUCT */

if (detailProduct) {

const detailOffset =
  Math.min(
    scrollCurrent * 0.025,
    22
  );
detailProduct.style.transform = `
  translate3d(
    0,
    ${detailOffset}px,
    0
  )
  scale(1.22)
  rotate(-4deg)
`;

}

requestAnimationFrame(animate);
}

animate();

/* =========================================
MOUSE MOVEMENT
========================================= */

window.addEventListener(“mousemove”, (event) => {

const x =
event.clientX /
window.innerWidth -
0.5;

const y =
event.clientY /
window.innerHeight -
0.5;

targetX = x * 24;
targetY = y * 18;

});

/* =========================================
TOUCH MOVEMENT
========================================= */

window.addEventListener(
“touchmove”,
(event) => {

if (!event.touches.length) return;
const touch =
  event.touches[0];
const x =
  touch.clientX /
  window.innerWidth -
  0.5;
const y =
  touch.clientY /
  window.innerHeight -
  0.5;
targetX = x * 14;
targetY = y * 10;

},
{ passive: true }
);

/* =========================================
RESET PARALLAX
========================================= */

window.addEventListener(
“mouseleave”,
() => {

targetX = 0;
targetY = 0;

}
);

/* =========================================
SCROLL
========================================= */

window.addEventListener(
“scroll”,
() => {

scrollTarget =
  window.scrollY;

},
{ passive: true }
);

/* =========================================
SOUND SYSTEM
========================================= */

if (soundControl) {

soundControl.addEventListener(
“click”,
() => {

  soundEnabled =
    !soundEnabled;
  soundControl.classList.toggle(
    "active",
    soundEnabled
  );
  soundControl.innerHTML = `
    <span class="sound-dot"></span>
    SOUND ${soundEnabled ? "ON" : "OFF"}
  `;
  /*
     Audio foundation.
     Add your ambient audio file later:
     ambientAudio =
       new Audio("./audio/ambient.mp3");
     ambientAudio.loop = true;
     ambientAudio.volume = 0.25;
  */
  if (
    soundEnabled &&
    ambientAudio
  ) {
    ambientAudio.play()
      .catch(() => {});
  }
  if (
    !soundEnabled &&
    ambientAudio
  ) {
    ambientAudio.pause();
  }
}

);

}