const TIME_PER_QUESTION = 60;
let musicStarted = false;

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

/* MUSIC */
function startMusicOnce() {
  if (!musicStarted) {
    bgMusic.volume = 0.4;
    bgMusic.play();
    musicToggle.innerText = "🔊";
    musicStarted = true;
  }
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.innerText = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.innerText = "🔈";
  }
}

/* TOPICS */
const topics = {
  love: {
    title: "Love at First Sight 💕",
    questions: [
      "What was your first impression of me when you saw me in 2012?",
      "What was our first argument about?",
      "What was my weight when you met me in 2015?",
      "What was my salary when I left the job to go to Germany?",
      "Where did we go for our first dinner date after marriage?",
      "Which was the first place we visited in our BMW car?",
      "What day did we go for Malta?",
      "What is the name of the resort we stayed in Coorg?",
      "Which dish that I prepare do you like the most?"
    ]
  },
  about: {
    title: "About Me 😄",
    questions: [
      "What is my most annoying habit (that you secretly love)?",
      "What is one thing I always forget?",
      "What is my most repeated dialogue?",
      "When do you feel most connected to me?",
      "What is your favorite everyday moment with me?",
      "What is one thing I do that makes you feel most loved?",
      "What habit of mine surprised you after marriage?"
    ]
  },
  travel: {
    title: "Travel 🌍",
    questions: [
      "Which trip with me felt the most special to you?",
      "What was the most unplanned trip we ever took?",
      "Which place would you love to revisit together?",
      "What is one travel moment that still makes you laugh?",
      "Where did we have our most relaxed vacation?"
    ]
  },
  parenthood: {
    title: "Parenthood 👶",
    questions: [
      "What was your first thought when you held our baby?",
      "What moment of me as a father melted your heart?",
      "What is your favorite routine with our baby?",
      "What is one thing you want our child to learn from us?"
    ]
  },
  us: {
    title: "Us ❤️",
    questions: [
      "What changed the most after we got married?",
      "What does “home” mean to you now?",
      "What is your favorite “us” moment that no one else knows?",
      "What would you change if you time travel to our initial years of love?",
      "What would you say to us 10 years from now?"
    ]
  }
};

/* STATE */
let currentTopicKey;
let currentIndex;
let timer;
let timeLeft;
let answers = [];

/* NAV */
function openPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome() {
  clearInterval(timer);
  openPage("home");
}

/* QUESTIONS */
function startTopic(key) {
  currentTopicKey = key;
  currentIndex = 0;
  document.getElementById("topicTitle").innerText = topics[key].title;
  openPage("questions");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = TIME_PER_QUESTION;
  document.getElementById("timer").innerText = `⏳ ${timeLeft}`;

  document.getElementById("questionBox").innerHTML = `
    <p>${topics[currentTopicKey].questions[currentIndex]}</p>
    <input id="answerInput" type="text" placeholder="Write your answer here ❤️">
  `;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏳ ${timeLeft}`;
    if (timeLeft <= 0) clearInterval(timer);
  }, 1000);
}

function nextQuestion() {
  const input = document.getElementById("answerInput");
  answers.push({
    topic: topics[currentTopicKey].title,
    question: topics[currentTopicKey].questions[currentIndex],
    answer: input.value || "(No answer)"
  });

  if (currentIndex < topics[currentTopicKey].questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    showSummary();
  }
}

/* SUMMARY */
function showSummary() {
  clearInterval(timer);
  openPage("summary");

  const container = document.getElementById("summaryContent");
  container.innerHTML = "";

  const grouped = {};
  answers.forEach(a => {
    if (!grouped[a.topic]) grouped[a.topic] = [];
    grouped[a.topic].push(a);
  });

  Object.keys(grouped).forEach(topic => {
    const section = document.createElement("div");
    section.className = "summary-topic";
    section.innerHTML = `<h3>${topic}</h3>`;

    grouped[topic].forEach(item => {
      section.innerHTML += `
        <div class="summary-item">
          <div class="summary-q">${item.question}</div>
          <div class="summary-a">❤️ ${item.answer}</div>
        </div>
      `;
    });

    container.appendChild(section);
  });
}

function copySummary() {
  let text = "Our Memories ❤️\n\n";
  answers.forEach(a => {
    text += `${a.topic}\nQ: ${a.question}\nA: ${a.answer}\n\n`;
  });
  navigator.clipboard.writeText(text);
  alert("Copied with love ❤️");
}

/* WHEEL */
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const keys = Object.keys(topics);
const colors = ["#f6c1cc", "#f9d5a7", "#cde7e3", "#d6e6b5", "#e7c6ff"];
let angle = 0;

function drawWheel() {
  const slice = (2 * Math.PI) / keys.length;
  keys.forEach((k, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, angle + i * slice, angle + (i + 1) * slice);
    ctx.fill();
  });
}

function spinWheel() {
  startMusicOnce();
  let spins = Math.random() * 3000 + 2000;
  let start = null;

  function animate(ts) {
    if (!start) start = ts;
    angle += 0.1;
    ctx.clearRect(0, 0, 300, 300);
    drawWheel();

    if (ts - start < spins) {
      requestAnimationFrame(animate);
    } else {
      const index = Math.floor(
        (keys.length - (angle / (2 * Math.PI)) % keys.length) % keys.length
      );
      startTopic(keys[index]);
    }
  }
  requestAnimationFrame(animate);
}

drawWheel();

