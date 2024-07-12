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
    iframe.style.display = 'none';  // Hide iframe initially
    document.body.appendChild(iframe);
    
    // Set iframe src after a short delay
    setTimeout(() => {
      iframe.src = url;
      iframe.style.display = 'block';  // Show iframe after setting src
    }, 100);
  }