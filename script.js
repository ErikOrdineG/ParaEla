const musicas = [
  {
    titulo: "Terça de Tarde",
    source: "musicas/terca-de-tarde.mp3",
    img: "img/terca-de-tarde.jpg",
  },
  {
    titulo: "Girl With",
    source: "musicas/tattoo.mp3",
    img: "img/girl-with.jpeg",
  },
  {
    titulo: "Thinking Out Loud",
    source: "musicas/ed-sherem.mp3",
    img: "img/ed-sherem.jpg",
  },
  {
    titulo: "Sem Medo de Amar",
    source: "musicas/sem-medo-de-amar.mp3",
    img: "img/sem-medo-de-amar.jpg",
  },
  {
    titulo: "All of Me",
    source: "musicas/shawn-mendes.mp3",
    img: "img/shawn-mendes.jpg",
  },
  {
    titulo: "Never Be Alone",
    source: "musicas/all-of-me.mp3",
    img: "img/all-of-me.jpg",
  },
];

// INICIO
let musica = document.querySelector("audio");
let musicaIndex = 0;

let nomeMusica = document.querySelector(".descricao h2");
let imagemMusica = document.querySelector(".music-player img"); // Apenas a imagem do player
let tempoDecorrido = document.querySelector(".tempo .inicio");
let duracaoMusica = document.querySelector(".tempo .fim");
let barraProgresso = document.querySelector("progress");

// Define a primeira música ao carregar a página
renderizarMusica(musicaIndex);

// EVENTOS
document.querySelector(".botao-play").addEventListener("click", tocarMusica);
document.querySelector(".botao-pause").addEventListener("click", pausarMusica);
musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".anterior").addEventListener("click", () => {
  musicaIndex--;
  if (musicaIndex < 0) {
    musicaIndex = musicas.length - 1; // Volta para a última música
  }
  renderizarMusica(musicaIndex);
});

document.querySelector(".proximo").addEventListener("click", () => {
  musicaIndex++;
  if (musicaIndex >= musicas.length) {
    musicaIndex = 0; // Volta para a primeira música
  }
  renderizarMusica(musicaIndex);
});

// FUNÇÕES

function renderizarMusica(index) {
  musica.src = musicas[index].source;

  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[index].titulo;
    imagemMusica.src = musicas[index].img; // Atualiza apenas a imagem do player
    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });

  pausarMusica(); // Garante que a música não toque automaticamente ao trocar
}

function tocarMusica() {
  musica.play();
  document.querySelector(".botao-play").style.display = "none";
  document.querySelector(".botao-pause").style.display = "block";
}

function pausarMusica() {
  musica.pause();
  document.querySelector(".botao-play").style.display = "block";
  document.querySelector(".botao-pause").style.display = "none";
}

function segundosParaMinutos(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  if (segundosRestantes < 10) {
    segundosRestantes = "0" + segundosRestantes;
  }
  return `${minutos}:${segundosRestantes}`;
}

function atualizarBarra() {
  let barra = document.querySelector("progress");
  let ponto = document.querySelector(".ponto"); // Seleciona a bolinha

  if (!isNaN(musica.duration) && isFinite(musica.duration)) {
    let progresso = (musica.currentTime / musica.duration) * 100;

    // Atualiza a barra de progresso
    barra.value = progresso;

    // Move a bolinha na barra
    ponto.style.left = `${progresso}%`;

    // Atualiza o tempo decorrido
    tempoDecorrido.textContent = segundosParaMinutos(
      Math.floor(musica.currentTime)
    );
  }
}

function segundosParaMinutos(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  if (segundosRestantes < 10) {
    segundosRestantes = "0" + segundosRestantes;
  }
  return minutos + ":" + segundosRestantes;
}

// ========================== TROCA AUTOMÁTICA DE IMAGENS ==========================
let time = 3000, // Tempo de troca (3 segundos)
  currentImageIndex = 0,
  images = document.querySelectorAll(".gallery-container img"),
  max = images.length;


function nextImage() {
  images[currentImageIndex].classList.remove("active");

  currentImageIndex++;
  if (currentImageIndex >= max) {
    currentImageIndex = 0;
  }

  images[currentImageIndex].classList.add("active");
}

function startImageSlider() {
  setInterval(() => {
    nextImage();
  }, time);
}

window.addEventListener("load", startImageSlider);

