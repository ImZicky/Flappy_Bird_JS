// Referências dos assets
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 300;

// Imagens
const bg = new Image();
bg.src = './images/bg.png';

const birdImgs = [
  './images/bird/passaro-bate-asas.png',
  './images/bird/passaro-fecha-asas.png'
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const pipeTop = new Image();
pipeTop.src = './images/canos/cano-cima-baixo-medio.png';
const pipeBottom = new Image();
pipeBottom.src = './images/canos/cano-baixo-cima-medio.png';

// Áudios
const flySound = new Audio('./audios/voa1.wav');
const hitSound = new Audio('./audios/gameover1.wav');
const backGroundSound = new Audio('./audios/musicas/viva-la-vida.wav');

// Controle de animação
let animationId;
let isGameOver = false;

let isAudioReady = false; // Variável para verificar se o áudio está pronto para ser tocado

// Função para carregar o áudio e garantir que ele está pronto
function loadAudio() {
  flySound.load();
  hitSound.load();
  backGroundSound.load();

  flySound.oncanplaythrough = () => {
    isAudioReady = true;  // O áudio está pronto para ser tocado
  };
}

// Ajuste da velocidade de queda do pássaro e do pulo
const bird = {
    x: 40,
    y: 80,
    width: 34,
    height: 24,
    gravity: 0.06,  // Diminui a gravidade para tornar a queda mais lenta
    lift: -2,      // Diminui a força do pulo
    velocity: -1,
    frame: 0,
    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
  
      // Limite inferior
      if (this.y + this.height > canvas.height) {
        this.y = canvas.height - this.height;
        this.velocity = 0;
      }
  
      // Limite superior
      if (this.y < 0) {
        this.y = 0;
        this.velocity = 0;
      }
  
      this.frame = (this.frame + 1) % birdImgs.length;
    },
    draw() {
      const img = birdImgs[this.frame];
  
      // Calcula rotação com base na velocidade
      const angle = Math.min(Math.max(this.velocity * 0.3, -0.5), 1); // de -0.5 (subindo) até 1 (descendo)
  
      // Salva o contexto
      ctx.save();
  
      // Move o ponto de rotação para o centro do pássaro
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(angle);
  
      // Desenha a imagem com o centro ajustado
      ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
  
      // Restaura o contexto
      ctx.restore();
    },
    jump() {
      if (isGameOver || !isAudioReady) return; // Não toca o som se o áudio não estiver pronto
      this.velocity = this.lift;
      flySound.play();
    }
  };

// Ajuste da velocidade dos canos
function updatePipes() {
    for (let i = pipes.length - 1; i >= 0; i--) {
      const pipe = pipes[i];
      pipe.x -= 1; // Reduz a velocidade de movimento dos canos (antes era 2)
  
      // Remove pipe quando sai da tela e soma score
      if (pipe.x + pipeWidth < 0) {
        pipes.splice(i, 1);
        score++;
      }
  
      // Colisão
      if (
        bird.x < pipe.x + pipeWidth &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
      ) {
        if (isAudioReady) {
          hitSound.play();
        }
        document.getElementById("finalScore").innerText = score;
        document.getElementById("gameOverModal").style.display = "flex";
        cancelAnimationFrame(animationId);
        isGameOver = true;
      }
    }
  }

// Ajuste na geração dos canos (diminuindo a frequência)
let frameCount = 0;


// Pipes
const pipes = [];
const pipeGap = 120;
const pipeWidth = 52;
let score = 0;

function spawnPipe() {
  const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 20;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + pipeGap
  });
}

function drawPipes() {
  for (let pipe of pipes) {
    ctx.drawImage(pipeTop, pipe.x, pipe.top - pipeTop.height, pipeWidth, pipeTop.height);
    ctx.drawImage(pipeBottom, pipe.x, pipe.bottom, pipeWidth, pipeBottom.height);
  }
}

function reiniciarJogo() {
  location.reload();
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '24px Arial';
  ctx.fillText('Pontuação: ' + score, 10, 30);
}


// Ajuste para o movimento contínuo do fundo
const bgWidth = canvas.width;
let bgX = 0;  // Posição inicial do fundo

function drawBackground() {
  // Desenha duas imagens do fundo para criar o efeito de repetição
  ctx.drawImage(bg, bgX, 0, bgWidth, canvas.height);
  ctx.drawImage(bg, bgX + bgWidth, 0, bgWidth, canvas.height);
}

function updateBackground() {
  // Move o fundo para a esquerda
  bgX -= 1;

  // Quando o fundo sair da tela, reposiciona-o à direita
  if (bgX <= -bgWidth) {
    bgX = 0;
  }
}

// Atualize a função gameLoop para chamar updateBackground
function gameLoop() {
  if (isGameOver) return;

  backGroundSound.play();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Atualiza a posição do fundo
  updateBackground();
  drawBackground();

  bird.update();
  bird.draw();

  // Aumenta o tempo entre a criação de canos
  if (frameCount % 120 === 0) {  // Antes era 100, agora é 120
    spawnPipe();
  }

  updatePipes();
  drawPipes();
  drawScore();

  frameCount++;
  animationId = requestAnimationFrame(gameLoop);
}

// Controles
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') bird.jump();
});

// Inicializa o áudio
loadAudio();

// Início do jogo
gameLoop();
