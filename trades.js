function openRaydiumWindow() {
    const raydiumUrl = 'https://daddyonraydium.vercel.app/';
    const width = 400;
    const height = 600;
    const right = 20;
    const top = Math.round(window.screen.height / 2 - height / 2);
    const left = window.screen.width - width - right;
    
    // Create a new window with minimal features
    const raydiumWindow = window.open('about:blank', 'RaydiumWindow', `width=${width},height=${height},left=${left},top=${top}`);
    
    if (raydiumWindow) {
        const currentPath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        
        // Fetch the content of alert.js
        fetch(`${currentPath}alert.js`)
            .then(response => response.text())
            .then(scriptContent => {
                raydiumWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Swap Raydium</title>
                        <style>
                            body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; }
                            iframe { border: none; width: 100%; height: 100%; }
                        </style>
                        <script>${scriptContent}</script>
                    </head>
                    <body>
                        <iframe src="${raydiumUrl}" frameborder="0"></iframe>
                    </body>
                    </html>
                `);
                raydiumWindow.document.close();
            })
            .catch(error => {
                console.error('Error loading alert.js:', error);
                // Fallback in case of error: write the HTML without the script
                raydiumWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Swap Raydium</title>
                        <style>
                            body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; }
                            iframe { border: none; width: 100%; height: 100%; }
                        </style>
                    </head>
                    <body>
                        <iframe src="${raydiumUrl}" frameborder="0"></iframe>
                    </body>
                    </html>
                `);
                raydiumWindow.document.close();
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const openRaydiumButton = document.getElementById('open-raydium');
    if (openRaydiumButton) {
        openRaydiumButton.addEventListener('click', openRaydiumWindow);
    } else {
        console.error('Button with id "open-raydium" not found');
    }
});