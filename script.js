const topics = {
  "Love at First Sight": [
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
  "About Me": [
    "What is my most annoying habit (that you secretly love)?",
    "What is one thing I always forget?",
    "What is my most repeated dialogue?",
    "When do you feel most connected to me?",
    "What habit of mine surprised you after marriage?"
  ],
  "Travel": [
    "Which trip with me felt the most special?",
    "What was the most unplanned trip we ever took?",
    "Which place would you love to revisit together?",
    "What is one travel moment that still makes you laugh?"
  ],
  "Parenthood": [
    "What was your first thought when you held our baby?",
    "What moment of me as a father melted your heart?"
  ],
  "Us": [
    "What changed the most after we got married?",
    "What does “home” mean to you now?",
    "What would you say to us 10 years from now?"
  ]
};

const answers = [];
let currentTopic, currentQuestions, qIndex = 0;
let timerInterval;
const timePerQuestion = 180;

/* ================= MUSIC + KEN BURNS SYNC ================= */
const music = document.getElementById("bgMusic");
const bg = document.querySelector(".background");

document.getElementById("musicToggle").onclick = () => {
  music.paused ? music.play() : music.pause();
};

function syncKenBurns() {
  bg.style.animationDuration = music.paused ? "60s" : "40s";
}

music.addEventListener("play", syncKenBurns);
music.addEventListener("pause", syncKenBurns);

/* ================= WHEEL ================= */
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const topicNames = Object.keys(topics);

function drawWheel() {
  const angle = (2 * Math.PI) / topicNames.length;
  topicNames.forEach((t, i) => {
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.arc(160, 160, 160, i * angle, (i + 1) * angle);
    ctx.fillStyle = `hsl(${i * 60}, 70%, 75%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(160, 160);
    ctx.rotate(i * angle + angle / 2);
    ctx.fillStyle = "#333";
    ctx.fillText(t, 60, 0);
    ctx.restore();
  });
}
drawWheel();

/* ================= FLOW ================= */
document.getElementById("spinBtn").onclick = () => {
  currentTopic = topicNames[Math.floor(Math.random() * topicNames.length)];
  currentQuestions = topics[currentTopic];
  qIndex = 0;

  document.getElementById("wheelSection").classList.add("hidden");
  document.getElementById("questionSection").classList.remove("hidden");

  loadQuestion();
};

function loadQuestion() {
  if (qIndex >= currentQuestions.length) {
    showSummary();
    return;
  }

  document.body.className = "";
  if (currentTopic.toLowerCase().includes("love")) {
    document.body.classList.add("love");
  } else if (currentTopic.toLowerCase().includes("travel")) {
    document.body.classList.add("travel");
  } else if (currentTopic.toLowerCase().includes("parent")) {
    document.body.classList.add("parenthood");
  }

  document.getElementById("topicTitle").innerText = currentTopic;
  document.getElementById("questionText").innerText = currentQuestions[qIndex];
  document.getElementById("answerInput").value = "";

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  let timeLeft = timePerQuestion;
  document.getElementById("timeLeft").innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").innerText = timeLeft;
    if (timeLeft <= 0) clearInterval(timerInterval);
  }, 1000);
}

document.getElementById("nextBtn").onclick = () => {
  answers.push({
    topic: currentTopic,
    question: currentQuestions[qIndex],
    answer: document.getElementById("answerInput").value
  });

  qIndex++;
  loadQuestion();
};

function showSummary() {
  document.getElementById("questionSection").classList.add("hidden");
  document.getElementById("summarySection").classList.remove("hidden");

  const summary = document.getElementById("summaryContent");
  summary.innerHTML = "";

  answers.forEach(item => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${item.question}</strong><br>${item.answer || "❤️"}`;
    summary.appendChild(p);
  });
}
