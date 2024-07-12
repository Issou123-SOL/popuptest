function loadRaydium(url) {
  // Clear existing content
  document.body.innerHTML = '';
  document.head.innerHTML = '';

  // Set title
  document.title = 'Swap Raydium';

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; }
    iframe { border: none; width: 100%; height: 100%; }
  `;
  document.head.appendChild(style);

  // Create and add iframe
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.frameBorder = '0';
  document.body.appendChild(iframe);
}