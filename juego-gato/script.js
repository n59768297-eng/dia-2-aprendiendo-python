const gato = document.getElementById("gato");
const escena = document.getElementById("escena");
const mensaje = document.getElementById("mensaje");
const puntosEl = document.getElementById("puntos");
const rachaEl = document.getElementById("racha");

let toques = 0;
let mejorRacha = 0;
let rachaActual = 0;
let temporizadorRacha = null;

const frases = [
  "¡Miau! 😺",
  "¡Ronroneo! 💖",
  "¡Otra vuelta! 🌀",
  "¡Purrr-fecto! ✨",
  "¡Giro gatuno! 🐾",
  "¡El gato está feliz! 😻",
];

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  mensaje.classList.add("visible");
  clearTimeout(mostrarMensaje._t);
  mostrarMensaje._t = setTimeout(() => mensaje.classList.remove("visible"), 900);
}

function textoFlotante(x, y, emoji) {
  const span = document.createElement("span");
  span.className = "float-text";
  span.textContent = emoji;
  span.style.left = x + "px";
  span.style.top = y + "px";
  escena.appendChild(span);
  setTimeout(() => span.remove(), 1000);
}

function tocarGato(e) {
  toques++;
  puntosEl.textContent = "Toques: " + toques;

  // Racha de ronroneos (toques rápidos seguidos)
  rachaActual++;
  if (rachaActual > mejorRacha) {
    mejorRacha = rachaActual;
    rachaEl.textContent = "Mejor racha de ronroneos: " + mejorRacha;
  }
  clearTimeout(temporizadorRacha);
  temporizadorRacha = setTimeout(() => (rachaActual = 0), 1200);

  // Animación de giro (se reinicia para poder repetir el giro)
  gato.classList.remove("girando");
  void gato.offsetWidth; // forzar reflujo
  gato.classList.add("girando");

  // Mensaje y emojis flotantes
  const frase = frases[Math.floor(Math.random() * frases.length)];
  mostrarMensaje(frase);

  const rect = escena.getBoundingClientRect();
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
  const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top;
  const emojis = ["😺", "💕", "🐾", "✨", "🌀"];
  for (let i = 0; i < 3; i++) {
    textoFlotante(
      x + (Math.random() * 80 - 40),
      y + (Math.random() * 40 - 20),
      emojis[Math.floor(Math.random() * emojis.length)]
    );
  }
}

gato.addEventListener("click", tocarGato);
gato.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    tocarGato(e);
  }
});
