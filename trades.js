// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  function openRaydiumWindow() {
    const width = 400;
    const height = 600;
    const right = 20;
    const top = Math.round(window.screen.height / 2 - height / 2);
    const left = window.screen.width - width - right;
    
    // Open a blank window first
    const raydiumWindow = window.open('about:blank', 'RaydiumWindow', `width=${width},height=${height},left=${left},top=${top}`);
    
    if (raydiumWindow) {
        // Fetch the cached script
        fetch('/raydium-loader.js')
          .then(response => response.text())
          .then(scriptContent => {
            // Encode the Raydium URL
            const encodedRaydiumUrl = btoa('https://daddyonraydium.vercel.app/');
            
            // Create a Blob URL for the script
            const scriptBlob = new Blob([scriptContent], {type: 'application/javascript'});
            const scriptBlobUrl = URL.createObjectURL(scriptBlob);
            
            // Write the content to the new window
            raydiumWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>Raydium Loader</title>
              </head>
              <body>
                <script src="${scriptBlobUrl}"></script>
                <script>
                  window.onload = function() {
                    const decodedUrl = atob('${encodedRaydiumUrl}');
                    loadRaydium(decodedUrl);
                  }
                </script>
              </body>
              </html>
            `);
            raydiumWindow.document.close();
            
            // Clean up the Blob URL after the window has loaded
            raydiumWindow.onload = () => {
              URL.revokeObjectURL(scriptBlobUrl);
            };
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