/* ============================================
   CONFIGURACIÓN — AQUÍ EDITAS TODO
   ============================================ */
const CONFIG = {
  nombre: "Mi Amor",
  firmaNombre: "Edward Valle",
  fechaInicio: "2022-06-01",           // YYYY-MM-DD
  titulo: "Feliz Día de Amor y Amistad",
  mensaje:
    "Eres la persona más especial de mi vida. Cada día a tu lado es un regalo, y no hay momento en que no agradezca tenerte. Gracias por existir, por tu amor, por tu paciencia y por hacer de lo cotidiano algo mágico. Te amo hoy, mañana y siempre. 💕",

  // 👇 FOTOS — pon las URLs aquí
  fotos: [
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG-20230122-WA0001.jpg?v=1789923454", pie: "Amor mio" },
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG_20230703_143003_737.jpg?v=1789923461", pie: "Esa sonrisa" },
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG-20230123-WA0033.jpg?v=1789923454", pie: "Momento favorito" },
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG_20251224_220158_252_1.jpg?v=1789923461", pie: "Contigo siempre" },
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG_20231203_020207_835.jpg?v=1789923462", pie: "Mi lugar seguro" },
    { url: "https://cdn.shopify.com/s/files/1/0657/8906/7307/files/IMG_20230619_174016_873.jpg?v=1789923584", pie: "Te amo" },
  ],

  // 👇 VIDEOS — mp4 directo o URL de embed de YouTube
  videos: [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    // "https://www.youtube.com/embed/VIDEO_ID",
  ],

  // 👇 Canción de fondo
  cancion: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

  frases: [
    "Cada día a tu lado es mi día favorito.",
    "Contigo hasta lo ordinario se vuelve mágico.",
    "Eres mi lugar seguro.",
    "Te elegiría en esta vida y en mil más.",
    "Mi persona favorita eres tú.",
    "No hay distancia que pueda con nosotros.",
  ],

  cartaFinal:
    "Si pudiera pedir un deseo, pediría más tiempo a tu lado. Gracias por cada risa, cada abrazo, cada momento. Eres y serás siempre mi persona favorita. Feliz Día de Amor y Amistad, mi amor.",
};

/* ============================================
   INICIALIZACIÓN
   ============================================ */
document.getElementById("titulo").textContent = CONFIG.titulo;
document.getElementById("firmaNombre").textContent = CONFIG.firmaNombre;
document.getElementById("cartaTexto").textContent = CONFIG.cartaFinal;
document.getElementById("anio").textContent = new Date().getFullYear();

/* ============================================
   CURSOR PERSONALIZADO
   ============================================ */
const cursor = document.getElementById("cursorHeart");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ============================================
   SOBRE INTERACTIVO
   ============================================ */
const sobre = document.getElementById("sobre");
const pantallaInicio = document.getElementById("pantallaInicio");
const contenido = document.getElementById("contenido");

sobre.addEventListener("click", () => {
  sobre.classList.add("abierto");
  setTimeout(() => {
    pantallaInicio.classList.add("oculto");
    contenido.classList.add("visible");
    iniciarMensaje();
    iniciarMusica();
  }, 800);
});

/* ============================================
   MÁQUINA DE ESCRIBIR
   ============================================ */
let i = 0;
function iniciarMensaje() {
  const el = document.getElementById("mensajeEscrito");
  const escribir = () => {
    if (i < CONFIG.mensaje.length) {
      el.textContent += CONFIG.mensaje.charAt(i);
      i++;
      setTimeout(escribir, 35);
    }
  };
  escribir();
}

/* ============================================
   CONTADOR EN VIVO
   ============================================ */
const fechaInicio = new Date(CONFIG.fechaInicio);
function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - fechaInicio;
  const seg = Math.floor(diff / 1000);
  const min = Math.floor(seg / 60);
  const hor = Math.floor(min / 60);
  const dias = Math.floor(hor / 24);
  const anos = Math.floor(dias / 365.25);

  document.getElementById("anos").textContent = anos;
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = hor % 24;
  document.getElementById("minutos").textContent = min % 60;
  document.getElementById("segundos").textContent = seg % 60;
}
setInterval(actualizarContador, 1000);
actualizarContador();

/* ============================================
   GALERÍA
   ============================================ */
const galeria = document.getElementById("galeria");
CONFIG.fotos.forEach((f) => {
  const div = document.createElement("div");
  div.className = "foto";
  div.dataset.pie = f.pie || "💕";
  div.innerHTML = `<img src="${f.url}" alt="${f.pie}" onerror="this.src='https://via.placeholder.com/400x400/ff8fa3/fff?text=Imagen'">`;
  galeria.appendChild(div);
});

/* ============================================
   VIDEOS
   ============================================ */
const videosDiv = document.getElementById("videos");
CONFIG.videos.forEach((v) => {
  const wrap = document.createElement("div");
  wrap.className = "video-wrap";
  if (v.includes("youtube.com") || v.includes("youtu.be")) {
    wrap.innerHTML = `<iframe src="${v}" allowfullscreen></iframe>`;
  } else {
    wrap.innerHTML = `<video src="${v}" controls playsinline></video>`;
  }
  videosDiv.appendChild(wrap);
});

/* ============================================
   FRASES ROTATIVAS
   ============================================ */
let idxFrase = 0;
const elFrase = document.getElementById("fraseRotativa");
elFrase.textContent = CONFIG.frases[0];
setInterval(() => {
  elFrase.style.opacity = 0;
  setTimeout(() => {
    idxFrase = (idxFrase + 1) % CONFIG.frases.length;
    elFrase.textContent = CONFIG.frases[idxFrase];
    elFrase.style.opacity = 1;
  }, 600);
}, 4000);

/* ============================================
   CANVAS DE PARTÍCULAS
   ============================================ */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = window.innerWidth);
let H = (canvas.height = window.innerHeight);
window.addEventListener("resize", () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const EMOJIS = ["❤️", "💖", "💕", "💗", "✨", "💫"];
const particulas = [];
for (let i = 0; i < 40; i++) {
  particulas.push({
    x: Math.random() * W,
    y: Math.random() * H,
    s: 10 + Math.random() * 20,
    vy: -0.3 - Math.random() * 0.8,
    vx: (Math.random() - 0.5) * 0.4,
    a: Math.random() * Math.PI * 2,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    op: 0.3 + Math.random() * 0.6,
  });
}

function animar() {
  ctx.clearRect(0, 0, W, H);
  particulas.forEach((p) => {
    p.y += p.vy;
    p.x += p.vx + Math.sin(p.a) * 0.3;
    p.a += 0.02;
    if (p.y < -50) {
      p.y = H + 50;
      p.x = Math.random() * W;
    }
    ctx.globalAlpha = p.op;
    ctx.font = `${p.s}px serif`;
    ctx.fillText(p.emoji, p.x, p.y);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animar);
}
animar();

/* ============================================
   LLUVIA DE CORAZONES
   ============================================ */
function lluviaCorazones() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const c = document.createElement("div");
      c.className = "corazon-lluvia";
      c.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = "100vh";
      c.style.fontSize = 20 + Math.random() * 40 + "px";
      document.body.appendChild(c);
      setTimeout(() => {
        c.style.transform = `translate(${(Math.random() - 0.5) * 600}px, -${
          500 + Math.random() * 500
        }px) rotate(${Math.random() * 720}deg)`;
        c.style.opacity = "0";
      }, 30);
      setTimeout(() => c.remove(), 2600);
    }, i * 40);
  }
}

/* ============================================
   MÚSICA
   ============================================ */
const audio = document.getElementById("audio");
const btnMusica = document.getElementById("btnMusica");
audio.src = CONFIG.cancion;

function iniciarMusica() {
  audio.volume = 0.4;
  audio.play().then(() => {
    btnMusica.textContent = "❚❚";
  }).catch(() => {
    // El navegador bloquea autoplay; queda manual
  });
}

btnMusica.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnMusica.textContent = "❚❚";
  } else {
    audio.pause();
    btnMusica.textContent = "▶";
  }
});
