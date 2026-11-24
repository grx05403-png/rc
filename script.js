
const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const highScoreText = document.getElementById("highScore");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let time = 30;
let timer = null;
let playing = false;

let highScore = Number(
    localStorage.getItem("catchBoxRecord")
) || 0;

highScoreText.textContent = highScore;

// Posisi target secara acak
function moveTarget() {
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}

// Mulai permainan
function startGame() {
    if (playing) return;

    score = 0;
    time = 30;
    playing = true;

    scoreText.textContent = score;
    timeText.textContent = time;

    message.style.display = "none";
    target.style.display = "block";

    moveTarget();

    clearInterval(timer);

    timer = setInterval(() => {
        time--;

        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}

// Klik target
target.addEventListener("click", function() {
    if (!playing) return;

    score++;

    scoreText.textContent = score;

    // Efek target berpindah
    moveTarget();

    // Periksa rekor
    if (score > highScore) {
        highScore = score;

        highScoreText.textContent = highScore;

        localStorage.setItem(
            "catchBoxRecord",
            highScore
        );
    }
});

// Akhiri permainan
function endGame() {
    playing = false;

    clearInterval(timer);

    target.style.display = "none";
    message.style.display = "flex";

    message.innerHTML = `
        <h2>⏰ Waktu Habis!</h2>
        <p>Skor akhir kamu: <b>${score}</b></p>
        <p>Rekor tertinggi: <b>${highScore}</b></p>
        <button id="playAgain">MAIN LAGI</button>
    `;

    document.getElementById("playAgain")
        .addEventListener("click", startGame);
}

// Tombol mulai
startBtn.addEventListener("click", startGame);

// Tombol main lagi
restartBtn.addEventListener("click", function() {
    clearInterval(timer);
    playing = false;
    startGame();
});
