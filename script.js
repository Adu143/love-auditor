/* ================= TOPICS WITH QUESTIONS ================= */

const topics = {
  Love: [
    "What was your first impression of me when you saw me in 2012?",
    "What was our first argument about?",
    "What was my weight when you met me in 2015?",
    "What was my salary when I left the job to go to Germany?",
    "Where did we go for our first dinner date after marriage?",
    "Which was the first place we visited in your BMW car?",
    "What day did we go for Malta?",
    "What is the name of the resort we stayed in Coorg?",
    "Which dish that I prepare do you like the most?"
  ],
  AboutMe: [
    "What is my most annoying habit (that you secretly love)?",
    "What is one thing I always forget?",
    "What is my most repeated dialogue?",
    "When do you feel most connected to me?",
    "What habit of mine surprised you after marriage?"
  ],
  Travel: [
    "Which trip with me felt the most special?",
    "What was the most unplanned trip we ever took?",
    "Which place would you love to revisit together?",
    "What is one travel moment that still makes you laugh?"
  ],
  Parenthood: [
    "What was your first thought when you held our baby?",
    "What moment of me as a father melted your heart?"
  ],
  Us: [
    "What changed the most after we got married?",
    "What does “home” mean to you now?",
    "What would you say to us 10 years from now?"
  ]
};

const topicNames = Object.keys(topics);
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let angle = 0;
let currentTopic = null;
let questionIndex = 0;
let storedAnswers = [];

/* ================= DRAW WHEEL ================= */

function drawWheel() {
  const slice = 2 * Math.PI / topicNames.length;
  ctx.clearRect(0, 0, 300, 300);

  topicNames.forEach((t, i) => {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, i * slice + angle, (i + 1) * slice + angle);
    ctx.fillStyle = `hsl(${i * 70}, 70%, 70%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(i * slice + slice / 2 + angle);
    ctx.fillStyle = "#333";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(t, 90, 0);
    ctx.restore();
  });
}

drawWheel();

/* ================= SPIN ================= */

document.getElementById("spin").onclick = () => {

  // Reset previous session
  storedAnswers = [];
  questionIndex = 0;

  document.getElementById("questionBox").classList.add("hidden");
  removeSummary();

  let spins = Math.random() * 6 + 6;
  let step = 0;

  const spinning = setInterval(() => {
    angle += 0.25;
    drawWheel();
    step += 0.25;

    if (step >= spins) {
      clearInterval(spinning);

      currentTopic = topicNames[Math.floor(Math.random() * topicNames.length)];
      showQuestion();
    }
  }, 30);
};

/* ================= SHOW QUESTION ================= */

function showQuestion() {
  const topicEl = document.getElementById("topic");
  const questionEl = document.getElementById("question");

  const topicQuestions = topics[currentTopic];

  if (questionIndex >= topicQuestions.length) {
    showSummary();
    return;
  }

  topicEl.innerText = currentTopic;
  questionEl.innerText = topicQuestions[questionIndex];

  document.querySelector("textarea").value = "";
  document.getElementById("questionBox").classList.remove("hidden");
}

/* ================= NEXT BUTTON ================= */

// Create Next button dynamically (if not already in HTML)
let nextBtn = document.createElement("button");
nextBtn.innerText = "Next ➡️";
nextBtn.style.marginTop = "15px";
document.getElementById("questionBox").appendChild(nextBtn);

nextBtn.onclick = () => {
  const answerText = document.querySelector("textarea").value;

  storedAnswers.push({
    question: topics[currentTopic][questionIndex],
    answer: answerText
  });

  questionIndex++;
  showQuestion();
};

/* ================= SUMMARY ================= */

function showSummary() {
  document.getElementById("questionBox").classList.add("hidden");

  const summaryDiv = document.createElement("div");
  summaryDiv.id = "summaryPage";
  summaryDiv.style.background = "rgba(255,255,255,0.95)";
  summaryDiv.style.color = "#333";
  summaryDiv.style.padding = "20px";
  summaryDiv.style.borderRadius = "16px";
  summaryDiv.style.marginTop = "20px";

  summaryDiv.innerHTML = `<h2>${currentTopic} – Our Answers 💕</h2>`;

  storedAnswers.forEach(item => {
    summaryDiv.innerHTML += `
      <p><strong>${item.question}</strong></p>
      <p>${item.answer || "❤️"}</p>
      <hr>
    `;
  });

  const spinAgain = document.createElement("button");
  spinAgain.innerText = "🎡 Spin Again";
  spinAgain.onclick = () => {
    summaryDiv.remove();
    document.getElementById("wheelSection")?.classList.remove("hidden");
  };

  summaryDiv.appendChild(spinAgain);

  document.querySelector(".app").appendChild(summaryDiv);
}

function removeSummary() {
  const existing = document.getElementById("summaryPage");
  if (existing) existing.remove();
}

/* ================= MUSIC ================= */

const music = document.getElementById("music");
document.getElementById("musicBtn").onclick = () => {
  music.paused ? music.play() : music.pause();
};
