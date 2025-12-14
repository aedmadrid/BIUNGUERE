const cursor = document.getElementById("cursor");

// Posición inicial (centro)
let lastX = window.innerWidth / 2;
let lastY = window.innerHeight / 2;

// Ángulo actual que se muestra y el objetivo calculado
let displayedAngle = 0;
let targetAngle = 0;

// Factor de suavizado (0‑1). 0.1 = 10 % del nuevo ángulo cada frame
const SMOOTH = 0.15;

// Captura la posición del ratón y calcula el ángulo objetivo
document.addEventListener("mousemove", (e) => {
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;
  targetAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  // Mueve el cursor visualmente (sin rotación)
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // Actualiza la última posición para el próximo cálculo
  lastX = e.clientX;
  lastY = e.clientY;
});

// Animación por frame: suaviza la rotación
function animate() {
  // Interpolación simple (low‑pass)
  displayedAngle += (targetAngle - displayedAngle) * SMOOTH;

  // Aplica la rotación
  cursor.style.transform = `rotate(${displayedAngle}deg)`;

  requestAnimationFrame(animate);
}

// Inicia el loop
requestAnimationFrame(animate);
