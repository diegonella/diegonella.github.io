# QRing

Este proyecto es una aplicación web que permite enviar la ubicación y grabaciones de voz a un chat de Telegram al presionar un botón. La aplicación también muestra una cuenta regresiva después de enviar la notificación, durante la cual el usuario no puede presionar el botón nuevamente.

## Características

- Enviar la ubicación actual a un chat de Telegram.
- Grabar y enviar mensajes de voz a un chat de Telegram.
- Mostrar una notificación en la web cuando la notificación ha sido enviada.
- Evitar múltiples envíos en un corto período de tiempo mediante una cuenta regresiva.
- Verificar la compatibilidad del navegador con las funcionalidades de grabación de audio.
- Reproducir mensajes de voz enviados desde Telegram en el navegador.
- Implementación como una Progressive Web App (PWA).

## Requisitos

- Navegador web con soporte para geolocalización y grabación de audio.
- Cuenta de Telegram y un bot configurado para recibir mensajes.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/timbre-qr.git
    cd timbre-qr
    ```

2. Abre el archivo `index.html` en tu navegador.

## Archivos

- `index.html`: El archivo HTML principal que incluye la estructura de la aplicación.
- `telegramBot.js`: Archivo JavaScript que contiene la lógica para enviar la ubicación y los mensajes de voz a Telegram.
- `service-worker.js`: Archivo para manejar la funcionalidad de PWA.
- `manifest.json`: Archivo de configuración para la Progressive Web App (PWA).
- `bell-192x192-opt.jpg` y `bell-512x512-opt.jpg`: Iconos utilizados en la PWA.

## Uso

1. Abre `index.html` en tu navegador.
2. Permite el acceso a la geolocalización y al micrófono cuando el navegador lo solicite.
3. Presiona el botón "Tocar Timbre" para enviar tu ubicación.
4. Usa el botón "Grabar Mensaje" para grabar un mensaje de voz y enviarlo a Telegram.
5. Si se envía una notificación, verás un mensaje que indica "Notificación enviada" y una cuenta regresiva hasta que puedas presionar el botón nuevamente.

## Notas

- Asegúrate de reemplazar los valores de `botToken` y `chatId` en el archivo `telegramBot.js` con los de tu bot de Telegram.
- Si deseas desplegar la aplicación como PWA, asegúrate de que tu servidor web sirva el archivo `service-worker.js` y configure correctamente los encabezados HTTP.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Empuja tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
