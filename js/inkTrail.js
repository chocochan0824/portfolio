<script>
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("inkCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1";
  canvas.style.pointerEvents = "none";

  const ctx = canvas.getContext("2d");

  let trails = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let cursor = { x: mouse.x, y: mouse.y };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1.0;
      this.radius = 4;
    }
    draw(ctx) {
      this.life -= 0.02;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
      ctx.fill();
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 缓慢追踪鼠标
    cursor.x += (mouse.x - cursor.x) * 0.2;
    cursor.y += (mouse.y - cursor.y) * 0.2;

    // 在“缓动点”位置生成残影
    trails.push(new Dot(cursor.x, cursor.y));

    // 渲染残影
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
</script>
