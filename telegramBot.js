function initApp() {
    return {
        loading: false,
        countdownVisible: false,
        notificationSent: false,
        countdown: 20,

        sendLocation() {
            if (navigator.geolocation) {
                this.loading = true;
                this.countdownVisible = false;
                this.notificationSent = false;

                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Simulación de envío a Telegram (reemplazar con la lógica real)
                    setTimeout(() => {
                        this.loading = false;
                        this.countdownVisible = true;
                        this.startCountdown();
                    }, 2000); // Simular una respuesta después de 2 segundos
                }, error => {
                    console.error('Error obteniendo la ubicación:', error);
                    alert('No se pudo obtener la ubicación.');
                    this.loading = false;
                });
            } else {
                alert('Tu navegador no soporta geolocalización.');
            }
        },

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
    Alpine.data('initApp', initApp);
};
