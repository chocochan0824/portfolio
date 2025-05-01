
  <script>
const canvas = document.getElementById("inkCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 追踪位置改为缓动
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let cursor = { x: mouse.x, y: mouse.y };
let trails = [];

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Ink {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 1.0;
    this.radius = Math.random() * 8 + 3;
    this.alpha = 0.6;
    this.dx = (Math.random() - 0.5) * 1.2;
    this.dy = (Math.random() - 0.5) * 1.2;
  }
  draw(ctx) {
    this.x += this.dx;
    this.y += this.dy;
    this.life -= 0.015;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * this.life})`;
    ctx.fill();
  }
}

function animate() {
  // 清除背景但保留轨迹
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 缓动跟随鼠标
  cursor.x += (mouse.x - cursor.x) * 0.15;
  cursor.y += (mouse.y - cursor.y) * 0.15;

  for (let i = 0; i < 2; i++) {
    trails.push(new Ink(cursor.x, cursor.y));
  }

  trails = trails.filter(p => p.life > 0);
  trails.forEach(p => p.draw(ctx));

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

</script>
