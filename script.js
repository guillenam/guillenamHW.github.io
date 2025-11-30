/* SMART WATCH LOGIC */

// --- 1. RELOJ EN TIEMPO REAL ---
function updateClock() {
    const now = new Date();
    
    // Formato HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Formato Fecha
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const dateString = now.toLocaleDateString('en-US', options);

    // Actualizar DOM
    document.getElementById('main-time').innerText = `${hours}:${minutes}:${seconds}`;
    document.getElementById('small-time').innerText = `${hours}:${minutes}`;
    document.getElementById('date-display').innerText = dateString;
}

// Actualizar cada segundo
setInterval(updateClock, 1000);
updateClock(); // Llamada inicial


// --- 2. SISTEMA DE NAVEGACIÓN (APPS) ---
function openApp(appId) {
    // 1. Ocultar todas las apps
    document.querySelectorAll('.app').forEach(app => {
        app.classList.remove('active');
    });
    
    // 2. Mostrar la seleccionada
    document.getElementById(appId).classList.add('active');

    // 3. Actualizar iconos del dock (Visual)
    // Esto es un truco simple para resaltar el icono activo
    /* En un proyecto real haríamos un loop para las clases active del dock */
}

// Botón físico "Home" (Vuelve al reloj)
document.getElementById('home-btn').addEventListener('click', () => {
    openApp('app-clock');
});


// --- 3. LÓGICA DEL CRONÓMETRO ---
let stopwatchInterval;
let elapsedSeconds = 0;
let isRunning = false;

const display = document.getElementById('stopwatch-time');
const startBtn = document.getElementById('start-stop-btn');

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        // INICIAR
        isRunning = true;
        startBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        startBtn.classList.remove('start');
        startBtn.classList.add('stop');
        
        stopwatchInterval = setInterval(() => {
            elapsedSeconds++;
            // Formatear a HH:MM:SS
            const h = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(elapsedSeconds % 60).padStart(2, '0');
            display.innerText = `${h}:${m}:${s}`;
        }, 1000);
    } else {
        // PAUSAR
        isRunning = false;
        clearInterval(stopwatchInterval);
        startBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        startBtn.classList.remove('stop');
        startBtn.classList.add('start');
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    isRunning = false;
    clearInterval(stopwatchInterval);
    elapsedSeconds = 0;
    display.innerText = "00:00:00";
    startBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    startBtn.classList.remove('stop');
    startBtn.classList.add('start');
});


// --- 4. SIMULADOR DE RITMO CARDÍACO ---
const heartIcon = document.getElementById('heart-icon');
const bpmText = document.getElementById('bpm-val');
const measureBtn = document.getElementById('measure-btn');

measureBtn.addEventListener('click', () => {
    bpmText.innerText = "--";
    measureBtn.disabled = true;
    measureBtn.innerText = "Measuring...";
    heartIcon.classList.add('beating'); // Activar animación

    // Simular tiempo de medición (3 segundos)
    setTimeout(() => {
        // 1. Generar número aleatorio
        const randomBPM = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        
        // 2. Actualizar la pantalla de la App Corazón
        bpmText.innerText = randomBPM;
        
        // 3. NUEVO: Actualizar la pantalla principal (Home)
        // Buscamos el elemento por el ID que acabamos de crear y le inyectamos el HTML
        document.getElementById('home-bpm').innerHTML = `<i class="bi bi-heart-fill text-danger"></i> ${randomBPM} bpm`;

        // 4. Restaurar botones
        measureBtn.disabled = false;
        measureBtn.innerText = "Measure Again";
        heartIcon.classList.remove('beating'); 
    }, 3000);
});
