/* ----This is a p5js library where I have edited the code to what I wanted to achieve. When the arrow moves, it makes a lines which connects to the previous lines depending on the time that the other dots on the line have been on the screen---- */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const maxDotRadius = 8;
const lineThreshold = 100;

canvas.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  const dot = { x: clientX, y: clientY, radius: 1 };
  dots.push(dot);
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    dot.radius += 0.1;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    
    dots.forEach((otherDot) => {
      if (dot !== otherDot) {
        const dx = dot.x - otherDot.x;
        const dy = dot.y - otherDot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < lineThreshold) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(otherDot.x, otherDot.y);
          const opacity = 1 - distance / lineThreshold;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    });

    if (dot.radius > maxDotRadius) {
      dots.shift();
    }
  });
}

animate();