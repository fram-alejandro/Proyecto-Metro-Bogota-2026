const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");
let currentIndex = 0;

// Crear puntos indicadores
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(i) {
  currentIndex = i;
  updateSlider();
}

// Auto slide cada 4 segundos
setInterval(nextSlide, 4000);

// Lógica para el botón de Mapa en el Index
const btnMapa = document.getElementById('btn-mapa');
if (btnMapa) {
    btnMapa.onclick = () => {
        // Abre Google Maps en una nueva ventana/pestaña
        window.open('https://www.google.com/maps/search/Metro+de+Bogot%C3%A1', '_blank');
    };
}

// El resto de botones (Ocio, Juegos, etc.) siguen yendo a explora.html
document.querySelectorAll('.cajas_centrales button:not(#btn-mapa)').forEach(boton => {
    boton.onclick = () => {
        window.location.href = 'explora.html';
    };
});

