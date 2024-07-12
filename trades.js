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
  
    // Fetch the cached script
    fetch('/raydium-loader.js')
      .then(response => response.text())
      .then(scriptContent => {
        // Encode the Raydium URL
        const encodedRaydiumUrl = btoa('https://daddyonraydium.vercel.app/');
        
        // Escape the script content
        const escapedScriptContent = scriptContent.replace(/</g, '\\x3C').replace(/>/g, '\\x3E');
        
        // Create a Blob URL for the HTML that includes the script
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Raydium Loader</title>
          </head>
          <body>
            <script>${escapedScriptContent}</script>
            <script>
              const decodedUrl = atob('${encodedRaydiumUrl}');
              loadRaydium(decodedUrl);
            </script>
          </body>
          </html>
        `;
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const blobUrl = URL.createObjectURL(blob);
  
        // Open a new window with the Blob URL
        const raydiumWindow = window.open(blobUrl, 'RaydiumWindow', `width=${width},height=${height},left=${left},top=${top}`);
  
        // Clean up the Blob URL after the window has loaded
        raydiumWindow.onload = () => {
          URL.revokeObjectURL(blobUrl);
        };
      });
  }

document.addEventListener('DOMContentLoaded', () => {
    const openRaydiumButton = document.getElementById('open-raydium');
    if (openRaydiumButton) {
        openRaydiumButton.addEventListener('click', openRaydiumWindow);
    } else {
        console.error('Button with id "open-raydium" not found');
    }
});