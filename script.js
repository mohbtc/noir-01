/* =========================================
   NOIR//01
   THE ENTRY — INTERACTION
========================================= */

const productWrap = document.getElementById("productWrap");
const soundControl = document.getElementById("soundControl");
const entry = document.getElementById("entry");


/* =========================================
   PRODUCT PARALLAX
========================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

function animateProduct() {

  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  productWrap.style.transform = `
    translate3d(
      ${currentX}px,
      ${25 + currentY}px,
      0
    )
  `;

  requestAnimationFrame(animateProduct);
}

animateProduct();


/* =========================================
   MOUSE MOVEMENT
========================================= */

window.addEventListener("mousemove", (event) => {

  const x =
    (event.clientX / window.innerWidth - 0.5);

  const y =
    (event.clientY / window.innerHeight - 0.5);

  targetX = x * 24;
  targetY = y * 18;

});


/* =========================================
   TOUCH MOVEMENT
========================================= */

window.addEventListener(
  "touchmove",
  (event) => {

    if (!event.touches.length) return;

    const touch = event.touches[0];

    const x =
      (touch.clientX / window.innerWidth - 0.5);

    const y =
      (touch.clientY / window.innerHeight - 0.5);

    targetX = x * 14;
    targetY = y * 10;

  },
  { passive: true }
);


/* =========================================
   RESET POSITION
========================================= */

window.addEventListener("mouseleave", () => {

  targetX = 0;
  targetY = 0;

});


/* =========================================
   SOUND SYSTEM FOUNDATION
========================================= */

let soundEnabled = false;

let ambientAudio = null;


/*
   We are intentionally not loading
   the ambient track yet.

   Once the audio file exists, we'll
   connect it here.
*/

soundControl.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  soundControl.classList.toggle(
    "active",
    soundEnabled
  );

  soundControl.innerHTML = `
    <span class="sound-dot"></span>
    SOUND ${soundEnabled ? "ON" : "OFF"}
  `;

});


/* =========================================
   SCROLL RESPONSE
========================================= */

window.addEventListener(
  "scroll",
  () => {

    const scrollY = window.scrollY;

    if (scrollY <= 0) {
      return;
    }

    const movement =
      Math.min(scrollY * 0.18, 80);

    productWrap.style.opacity =
      Math.max(1 - scrollY / 500, 0.25);

    productWrap.style.filter =
      `blur(${Math.min(scrollY / 100, 4)}px)`;

  },
  { passive: true }
);