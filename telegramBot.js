function telegramBot() {
    return {
        botToken: '7247263560:AAF6PpVlY9TbO5SpQHnzFGNu0D1HBbSPuhc',
        chatId: '-4286332749',
        latitude: null,
        longitude: null,
        locationGranted: false,
        locationSent: false,
        locationDenied: false,
        countdown: 0,
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
        mediaRecorderSupported: false,
        audioUrl: '',
        initialize() {
            this.getLocation();

            // Verificar compatibilidad de MediaRecorder
            this.mediaRecorderSupported = 'MediaRecorder' in window;
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.locationGranted = true;
                    this.locationDenied = false;
                }, error => {
                    console.error('Error al obtener la geolocalización:', error);
                    this.locationGranted = false;
                    this.locationDenied = true;
                });
            } else {
                console.error('Geolocalización no soportada por este navegador.');
                this.locationGranted = false;
                this.locationDenied = true;
            }
        },
        startRecording() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.start();
                    this.isRecording = true;
                    this.audioChunks = [];
                    this.mediaRecorder.ondataavailable = event => {
                        this.audioChunks.push(event.data);
                    };
                })
                .catch(error => {
                    console.error('Error al acceder al micrófono:', error);
                });
        },
        stopRecording() {
            this.mediaRecorder.stop();
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/ogg; codecs=opus' });
                const formData = new FormData();
                formData.append('chat_id', this.chatId);
                formData.append('voice', audioBlob);
                fetch(`https://api.telegram.org/bot${this.botToken}/sendVoice`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        this.locationSent = true;
                        this.countdown = 20;
                        const timer = setInterval(() => {
                            this.countdown--;
                            if (this.countdown <= 0) {
                                clearInterval(timer);
                            }
                        }, 1000);
                        setTimeout(() => {
                            this.locationSent = false;
                        }, 20000); // 20 segundos

                        this.getAudioUrl(data.result.voice.file_id);
                    } else {
                        console.error('Error al enviar mensaje de voz');
                    }
                })
                .catch(error => {
                    console.error('Error al enviar mensaje de voz:', error);
                });
            };
            this.isRecording = false;
        },
        getAudioUrl(file_id) {
            fetch(`https://api.telegram.org/bot${this.botToken}/getFile?file_id=${file_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        const filePath = data.result.file_path;
                        this.audioUrl = `https://api.telegram.org/file/bot${this.botToken}/${filePath}`;
                    } else {
                        console.error('Error al obtener la URL del archivo');
                    }
                })
                .catch(error => {
                    console.error('Error al obtener la URL del archivo:', error);
                });
        },
        sendLocation() {
            if (this.locationGranted) {
                const now = new Date();
                const date = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`;
                const time = `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;
                
                fetch(`https://api.telegram.org/bot${this.botToken}/sendLocation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: this.chatId,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        caption: `Ubicación enviada el ${date} a las ${time}`
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        this.locationSent = true;
                        this.countdown = 20;
                        const timer = setInterval(() => {
                            this.countdown--;
                            if (this.countdown <= 0) {
                                clearInterval(timer);
                            }
                        }, 1000);
                        setTimeout(() => {
                            this.locationSent = false;
                        }, 20000); // 20 segundos
                    } else {
                        console.error('Error al enviar ubicación');
                    }
                })
                .catch(error => {
                    console.error('Error al enviar ubicación:', error);
                });
            } else {
                console.error('Permisos de geolocalización no concedidos.');
            }
        }
    };
}
