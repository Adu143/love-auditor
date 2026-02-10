const topics = {
  Love: ["What was your first impression of me in 2012?"],
  Travel: ["Which trip felt the most special?"],
  Us: ["What does home mean to you now?"]
};

const topicNames = Object.keys(topics);
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let rotation = 0;

/* Draw wheel */
function drawWheel() {
  const angle = (2 * Math.PI) / topicNames.length;
  ctx.clearRect(0, 0, 320, 320);

  topicNames.forEach((t, i) => {
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.arc(160, 160, 160, i * angle + rotation, (i + 1) * angle + rotation);
    ctx.fillStyle = `hsl(${i * 120}, 70%, 70%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(160, 160);
    ctx.rotate(i * angle + angle / 2 + rotation);
    ctx.fillStyle = "#333";
    ctx.fillText(t, 60, 0);
    ctx.restore();
  });
}

drawWheel();

/* Spin */
document.getElementById("spinBtn").onclick = () => {
  const spin = Math.random() * 6 + 6;
  let step = 0;

  const interval = setInterval(() => {
    rotation += 0.3;
    drawWheel();
    step += 0.3;
    if (step > spin) {
      clearInterval(interval);
      alert("Topic: " + topicNames[Math.floor(Math.random() * topicNames.length)]);
    }
  }, 30);
};

/* Music */
const music = document.getElementById("bgMusic");
document.getElementById("musicToggle").onclick = () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
};
