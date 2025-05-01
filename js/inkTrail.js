const canvas = document.getElementById("inkCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trails = [];

class Ink {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 1.0;
    this.radius = Math.random() * 15 + 5;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
  }
  draw(ctx) {
    this.x += this.dx;
    this.y += this.dy;
    this.life -= 0.01;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * this.life})`;
    ctx.fill();
  }
}

canvas.addEventListener("mousemove", function(e) {
  for (let i = 0; i < 5; i++) {
    trails.push(new Ink(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  trails = trails.filter(t => t.life > 0);
  trails.forEach(t => t.draw(ctx));
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
