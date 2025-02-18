const typedTextSpan = document.querySelector(".typed");
const textArray = ["Hello WorLd", "d3RmcnVkb2luCg=="];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    // Agrega el siguiente carácter al texto
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    // Espera antes de comenzar a borrar
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    // Elimina el último carácter del texto
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    // Avanza al siguiente texto o reinicia
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Inicia el efecto una vez que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length && typedTextSpan) {
    type();
  } else {
    console.error("Asegurate de que exista un texto y un elemento con clase '.typed'");
  }
});


// SKULLS!


function generarCalaveras() {
  const container = document.querySelector(".calavera-shake");
  if (!container) return; // Evita errores si el contenedor no existe

  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas imágenes

  const calaveraSize = 150; // Tamaño de cada calavera
  const numCalaveras = Math.floor(window.innerWidth / calaveraSize); // Calcular cuántas caben
 
  for (let i = 0; i < numCalaveras; i++) {
    const img = document.createElement("img");
    img.src = "static/img/skull.gif";
    img.alt = "Calavera shake";

    // Aplicar la clase para reflejar cada segunda calavera
    if (i % 2 === 1) {
      img.classList.add("invertida");
    }
    container.appendChild(img);
  }
}

// Ejecutar cuando la página cargue y cuando se redimensione la ventana
window.addEventListener("load", generarCalaveras);
window.addEventListener("resize", generarCalaveras);


// Seccion de writeups
// Configuración general
const CONFIG = {
  animation: {
    duration: 100,
    chars: 'qwertyuiopasdfghjkl;zxcvbnm0123456789!@#$%^&*+-{}[]<>?',
  },
};

// Funciones utilitarias
function getRandomChar() {
  const chars = CONFIG.animation.chars;
  return chars[Math.floor(Math.random() * chars.length)];
}

function scrambleText(text) {
  return text.split('').map(() => getRandomChar()).join('');
}

// Inicialización de elementos
document.querySelectorAll('.scramble').forEach(link => {
  const originalText = link.textContent.trim(); // Guarda el texto original del enlace

  link.addEventListener('mouseenter', () => {
    let scrambledText = scrambleText(originalText); // Genera el texto encriptado inicial
    link.textContent = scrambledText; // Reemplaza el contenido del enlace con el texto encriptado

    const interval = setInterval(() => {
      scrambledText = scrambleText(originalText); // Actualiza el texto encriptado
      link.textContent = scrambledText; // Vuelve a reemplazar el contenido del enlace
    }, 100);

    link.addEventListener('mouseleave', () => {
      clearInterval(interval); // Detiene la generación de texto encriptado
      link.textContent = originalText; // Restaura el texto original del enlace
    });
  });
});

// fin writeups

//Calavera Dedsec2
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".calaveradedsec2");
  if (!container) return; // Asegurar que el contenedor exista

  // Crear la imagen y agregarla al div
  const img = document.createElement("img");
  img.src = "static/img/skullglitched.gif";
  img.alt = "DedSec Skull";
  img.classList.add("glitched-skull2"); // Clase opcional para estilos en CSS
  container.appendChild(img);

  let flipped = false;

  setInterval(() => {
      flipped = !flipped;
      img.style.transform = flipped ? "scaleX(-1)" : "scaleX(1)";
  }, 900);

});


//OJITOS !
// Función principal para crear los efectos de cascada
function createRain(containerId, maxItems = 30) {
  const container = document.getElementById(containerId);
  const gifUrl = 'static/img/cascade.gif'; // Ruta del GIF

  function addGif() {
      if (container.children.length >= maxItems) return; // Limita el número de elementos activos

      const gif = document.createElement('img');
      gif.src = gifUrl;
      gif.classList.add('gif-item');

      // Tamaño aleatorio (entre 20px y 100px)
      const randomSize = Math.random() * 80 + 20;
      gif.style.width = `${randomSize}px`;

      // Posición inicial aleatoria (solo en el eje X)
      const randomX = Math.random() * (window.innerWidth - randomSize);
      gif.style.left = `${randomX}px`;
      gif.style.top = `-${randomSize}px`; // Comienza fuera de la pantalla superior

      // Aplicar efectos aleatorios
      applyRandomEffects(gif);

      // Animación de aparición
      setTimeout(() => {
          gif.style.opacity = '1';
      }, 10);

      // Agregar al contenedor
      container.appendChild(gif);

      // Movimiento en cascada con variaciones
      let moveInterval;
      if (Math.random() > 0.9) { // 10% de probabilidad de un movimiento especial
          moveInterval = handleSpecialMovement(gif, randomSize);
      } else {
          moveInterval = handleCascadeMovement(gif, randomSize);
      }

      // Eliminar el GIF cuando salga de la vista
      gif.addEventListener('remove', () => clearInterval(moveInterval));
  }

  // Manejar el movimiento en cascada
  function handleCascadeMovement(gif, size) {
      return setInterval(() => {
          gif.style.top = `${parseFloat(gif.style.top) + Math.random() * 3 + 2}px`; // Caer hacia abajo
          if (parseFloat(gif.style.top) > window.innerHeight + size) {
              gif.remove();
          }
      }, 30);
  }

  // Manejar un movimiento especial (oscilación lateral mientras cae)
  function handleSpecialMovement(gif, size) {
      let directionX = Math.random() > 0.5 ? 1 : -1; // Dirección inicial (izquierda o derecha)
      return setInterval(() => {
          gif.style.top = `${parseFloat(gif.style.top) + Math.random() * 3 + 2}px`; // Caer hacia abajo
          gif.style.left = `${parseFloat(gif.style.left) + directionX * Math.random() * 2}px`; // Oscilar lateralmente

          // Cambiar dirección si llega a los bordes laterales
          if (
              parseFloat(gif.style.left) < -size ||
              parseFloat(gif.style.left) > window.innerWidth
          ) {
              directionX *= -1; // Invertir dirección
          }

          // Eliminar si sale de la pantalla inferior
          if (parseFloat(gif.style.top) > window.innerHeight + size) {
              gif.remove();
          }
      }, 30);
  }

  // Aplicar efectos aleatorios a los GIFs
  function applyRandomEffects(gif) {
      // Color invertido (aleatorio)
      if (Math.random() > 75) {
          gif.style.filter = 'invert(1)';
      }

      // Reproducción al revés (usando CSS animation-direction)
      if (Math.random() > 60) {
          gif.style.animationDirection = 'reverse';
      }

      // Rotación aleatoria (hasta 180 grados)
      const randomRotation = Math.random() * 360 - 180; // Entre -180 y 180 grados
      gif.style.transform = `rotate(${randomRotation}deg)`;
  }

  // Crear nuevos GIFs cada X milisegundos
  setInterval(addGif, Math.random() * 1000 + 500); // Intervalo aleatorio entre 500ms y 1500ms
}

// Iniciar el efecto
createRain('eye-rain-container');





// IMPLEMENTACIONES DE SEGURIDAD
// Validar URLs
function isValidImageUrl(url) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const allowedDomains = ['hackthebox.com']; // Dominios permitidos

  try {
      const parsedUrl = new URL(url);
      const extension = parsedUrl.pathname.split('.').pop().toLowerCase();
      return (
          imageExtensions.includes(extension) &&
          allowedDomains.includes(parsedUrl.hostname)
      );
  } catch (e) {
      return false;
  }
}

console.log(isValidImageUrl('https://example.com/image.jpg')); // true
console.log(isValidImageUrl('https://malicioussite.com/script.js')); // false