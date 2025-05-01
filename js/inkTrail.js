document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("inkCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "999";
  canvas.style.pointerEvents = "none";

  const ctx = canvas.getContext("2d");
  let trails = [];

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1.0;
      this.radius = 8;
    }
    draw(ctx) {
      this.life -= 0.02;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
      ctx.fill();
    }
  }

  document.addEventListener("mousemove", (e) => {
    trails.push(new Dot(e.clientX, e.clientY));
  });

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    trails = trails.filter(dot => dot.life > 0);
    trails.forEach(dot => dot.draw(ctx));
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
