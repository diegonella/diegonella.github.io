// Función para inicializar la aplicación
function initApp() {
    return {
        loading: false,
        countdownVisible: false,
        notificationSent: false,
        countdown: 20,
        
        // Función para enviar la ubicación a Telegram
        sendLocation() {
            if (navigator.geolocation) {
                this.loading = true;
                this.countdownVisible = false;
                this.notificationSent = false;
                
                // Obtener la ubicación actual
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // Aquí se simularía el envío a Telegram (reemplazar con la lógica real)
                    setTimeout(() => {
                        // Simulación de respuesta después de 2 segundos
                        this.loading = false;
                        this.countdownVisible = true;
                        this.startCountdown();
                    }, 2000);
                }, error => {
                    console.error('Error obteniendo la ubicación:', error);
                    alert('No se pudo obtener la ubicación.');
                    this.loading = false;
                });
            } else {
                alert('Tu navegador no soporta geolocalización.');
            }
        },
        
        // Función para iniciar la cuenta regresiva
        startCountdown() {
            let interval = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(interval);
                    this.countdownVisible = false;
                    this.notificationSent = true;
                }
            }, 1000); // Contar hacia abajo cada segundo
        }
    };
}

// Inicializar la aplicación Alpine.js
window.onload = function() {
    Alpine.data('app', initApp);
};
