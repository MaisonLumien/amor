/* ============================================
   CONFIGURACIÓN — AQUÍ EDITAS TODO
   ============================================ */
const CONFIG = {
  nombre: "Alejandra Vasquez",
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
    "https://youtube.com/shorts/LgmPuGHtgCs?feature=shared",
    // "https://www.youtube.com/embed/VIDEO_ID",
  ],

  // 👇 Canción de fondo
  cancion: "https://www.youtube.com/watch?v=N-RxuIn3SRs&list=RDN-RxuIn3SRs&start_radio=1",

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
   CURSOR PERSONALIZADO — punto dorado con halo
   ============================================ */
const cursor = document.getElementById("cursorHeart");
if (cursor) {
  cursor.textContent = ""; // ya no es emoji, es un punto dorado (CSS)
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Efecto de contracción al hacer clic
  document.addEventListener("mousedown", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  });
  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
  });
}

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
  }, 900);
});

/* ============================================
   MÁQUINA DE ESCRIBIR — con pausas naturales
   ============================================ */
let i = 0;
function iniciarMensaje() {
  const el = document.getElementById("mensajeEscrito");
  const escribir = () => {
    if (i < CONFIG.mensaje.length) {
      el.textContent += CONFIG.mensaje.charAt(i);
      const char = CONFIG.mensaje.charAt(i);
      i++;
      // Pausa más larga en signos de puntuación para dar naturalidad
      let delay = 38;
      if (char === "." || char === "!" || char === "?") delay = 400;
      else if (char === "," || char === ";") delay = 200;
      setTimeout(escribir, delay);
    }
  };
  escribir();
}

/* ============================================
   CONTADOR EN VIVO — años, meses, días precisos
   ============================================ */
const fechaInicio = new Date(CONFIG.fechaInicio);
function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - fechaInicio;
  const seg = Math.floor(diff / 1000);
  const min = Math.floor(seg / 60);
  const hor = Math.floor(min / 60);

  // Cálculo preciso de años y días reales (respeta meses de distinta duración)
  let anos = ahora.getFullYear() - fechaInicio.getFullYear();
  let meses = ahora.getMonth() - fechaInicio.getMonth();
  let diasMes = ahora.getDate() - fechaInicio.getDate();

  if (diasMes < 0) {
    meses--;
    const ultimoMes = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
    diasMes += ultimoMes;
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  // Días totales (para el bloque grande)
  const diasTotales = Math.floor(hor / 24);

  document.getElementById("anos").textContent = anos;
  document.getElementById("dias").textContent = diasTotales;
  document.getElementById("horas").textContent = hor % 24;
  document.getElementById("minutos").textContent = min % 60;
  document.getElementById("segundos").textContent = seg % 60;
}
setInterval(actualizarContador, 1000);
actualizarContador();

/* ============================================
   GALERÍA — con fallback elegante
   ============================================ */
const galeria = document.getElementById("galeria");
CONFIG.fotos.forEach((f, idx) => {
  const div = document.createElement("div");
  div.className = "foto";
  div.dataset.pie = f.pie || "";
  div.style.opacity = "0";
  div.style.transform += " translateY(30px)";

  const img = document.createElement("img");
  img.src = f.url;
  img.alt = f.pie || "Nuestro recuerdo";
  img.loading = "lazy";

  img.onerror = () => {
    // Fallback elegante si la imagen no carga
    div.classList.add("sin-foto");
  };

  div.appendChild(img);
  galeria.appendChild(div);

  // Aparición suave escalonada
  setTimeout(() => {
    div.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    div.style.opacity = "1";
    div.style.transform = div.style.transform.replace(" translateY(30px)", "");
  }, 200 + idx * 150);
});

/* ============================================
   VIDEOS
   ============================================ */
const videosDiv = document.getElementById("videos");
CONFIG.videos.forEach((v) => {
  const wrap = document.createElement("div");
  wrap.className = "video-wrap";
  if (v.includes("youtube.com") || v.includes("youtu.be")) {
    wrap.innerHTML = `<iframe src="${v}" allowfullscreen loading="lazy"></iframe>`;
  } else {
    wrap.innerHTML = `<video src="${v}" controls playsinline preload="metadata"></video>`;
  }
  videosDiv.appendChild(wrap);
});

/* ============================================
   FRASES ROTATIVAS — transición suave
   ============================================ */
let idxFrase = 0;
const elFrase = document.getElementById("fraseRotativa");
elFrase.style.opacity = "0";
elFrase.textContent = CONFIG.frases[0];
setTimeout(() => { elFrase.style.opacity = "1"; }, 300);

setInterval(() => {
  elFrase.style.opacity = "0";
  setTimeout(() => {
    idxFrase = (idxFrase + 1) % CONFIG.frases.length;
    elFrase.textContent = CONFIG.frases[idxFrase];
    elFrase.style.opacity = "1";
  }, 1000);
}, 5000);

/* ============================================
   CANVAS DE PARTÍCULAS — símbolos finos y elegantes
   ============================================ */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = window.innerWidth);
let H = (canvas.height = window.innerHeight);

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }, 150);
});

// Símbolos elegantes en tonos suaves — nada infantil
const SIMBOLOS = ["❦", "❧", "✦", "✧", "♡", "❀", "✿", "·"];
const COLORES = [
  "rgba(212, 175, 122, 0.9)",  // dorado
  "rgba(201, 107, 132, 0.85)", // rosa empolvado
  "rgba(232, 213, 176, 0.7)",  // dorado suave
  "rgba(246, 239, 233, 0.6)",  // crema
];

const particulas = [];
for (let i = 0; i < 45; i++) {
  particulas.push({
    x: Math.random() * W,
    y: Math.random() * H,
    s: 9 + Math.random() * 16,
    vy: -0.15 - Math.random() * 0.5,        // más lento = más elegante
    vx: (Math.random() - 0.5) * 0.25,
    a: Math.random() * Math.PI * 2,
    sim: SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)],
    op: 0.25 + Math.random() * 0.5,
    color: COLORES[Math.floor(Math.random() * COLORES.length)],
    rot: (Math.random() - 0.5) * 0.01,
  });
}

function animar() {
  ctx.clearRect(0, 0, W, H);
  particulas.forEach((p) => {
    p.y += p.vy;
    p.x += p.vx + Math.sin(p.a) * 0.2;
    p.a += 0.008;
    p.rot += 0.001;

    if (p.y < -50) {
      p.y = H + 50;
      p.x = Math.random() * W;
    }
    if (p.x < -50) p.x = W + 50;
    if (p.x > W + 50) p.x = -50;

    ctx.save();
    ctx.globalAlpha = p.op;
    ctx.fillStyle = p.color;
    ctx.font = `${p.s}px "Cormorant Garamond", serif`;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillText(p.sim, 0, 0);
    ctx.restore();
  });
  requestAnimationFrame(animar);
}
animar();

/* ============================================
   LLUVIA DE PÉTALOS Y SÍMBOLOS
   ============================================ */
function lluviaCorazones() {
  const SIMBOLOS_LLUVIA = ["❦", "♡", "❧", "✦", "✧", "❀", "✿"];
  const COLORES_LLUVIA = ["#d4af7a", "#c96b84", "#e8d5b0", "#e8c5ce"];

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const c = document.createElement("div");
      c.className = "corazon-lluvia";
      c.textContent = SIMBOLOS_LLUVIA[Math.floor(Math.random() * SIMBOLOS_LLUVIA.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = "100vh";
      c.style.fontSize = 18 + Math.random() * 30 + "px";
      c.style.color = COLORES_LLUVIA[Math.floor(Math.random() * COLORES_LLUVIA.length)];
      c.style.fontFamily = '"Cormorant Garamond", serif';
      document.body.appendChild(c);

      setTimeout(() => {
        c.style.transform = `translate(${(Math.random() - 0.5) * 500}px, -${
          500 + Math.random() * 600
        }px) rotate(${(Math.random() - 0.5) * 360}deg)`;
        c.style.opacity = "0";
      }, 30);
      setTimeout(() => c.remove(), 3200);
    }, i * 60);
  }
}

/* ============================================
   MÚSICA — con fade-in elegante
   ============================================ */
const audio = document.getElementById("audio");
const btnMusica = document.getElementById("btnMusica");
audio.src = CONFIG.cancion;
audio.volume = 0;
audio.loop = true;

let fadeInterval = null;

function fadeInAudio(volumenObjetivo = 0.4, duracion = 2500) {
  clearInterval(fadeInterval);
  const paso = volumenObjetivo / (duracion / 50);
  fadeInterval = setInterval(() => {
    if (audio.volume + paso < volumenObjetivo) {
      audio.volume += paso;
    } else {
      audio.volume = volumenObjetivo;
      clearInterval(fadeInterval);
    }
  }, 50);
}

function fadeOutAudio(duracion = 1500) {
  clearInterval(fadeInterval);
  const paso = audio.volume / (duracion / 50);
  fadeInterval = setInterval(() => {
    if (audio.volume - paso > 0) {
      audio.volume -= paso;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fadeInterval);
    }
  }, 50);
}

function iniciarMusica() {
  audio.play().then(() => {
    fadeInAudio(0.4, 3000);
    btnMusica.textContent = "❚❚";
  }).catch(() => {
    // El navegador bloquea autoplay; queda en modo manual
    btnMusica.textContent = "▶";
  });
}

btnMusica.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => {
      fadeInAudio(0.4, 1500);
      btnMusica.textContent = "❚❚";
    });
  } else {
    fadeOutAudio(800);
    btnMusica.textContent = "▶";
  }
});
