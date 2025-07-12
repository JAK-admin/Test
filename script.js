const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = {
  width: 75,
  height: 10,
  x: (canvas.width - 75) / 2,
  dx: 7
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
  dx: 2,
  dy: -2
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off walls
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      // Game over - reset ball
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 30;
      ball.dx = 2;
      ball.dy = -2;
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && paddle.x > 0) {
    paddle.x -= paddle.dx;
  } else if (e.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) {
    paddle.x += paddle.dx;
  }
});

setInterval(draw, 10);
