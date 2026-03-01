/* PARTICLE BACKGROUND + PARALLAX */

const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.8;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 20000); // responsive density
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 - distance / 800})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

/* SECTION REVEAL ON SCROLL */
const sections = document.querySelectorAll("section");

function revealSections() {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealSections);
revealSections();

/* PARALLAX EFFECT FOR HERO PHOTO */
const heroPhoto = document.querySelector(".hero-photo img");
window.addEventListener("mousemove", e => {
  if (!heroPhoto) return;
  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;
  heroPhoto.style.transform = `translate(${ -x }px, ${ -y }px)`;
});
