addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // Define routes for each tool
  const routes = {
    '/': '/tool/index.html', // Index page
    '/vps-fixed-argo': '/tool/vps-fixed-argo.html',
    '/vps-fixed-argo.html': '/tool/vps-fixed-argo.html', // Explicitly handle .html extension
    '/container-nix-fixed-argo': '/tool/container-nix-fixed-argo.html',
    '/vps-temporary-argo': '/tool/vps-temporary-argo.html',
    '/container-nix-script': '/tool/container-nix-script.html',
    '/linux-terminal-fixed-argo': '/tool/linux-terminal-fixed-argo.html',
    '/character-generator': '/tool/character-generator.html',
    '/uuid-generator': '/tool/uuid-generator.html',
    '/qr-code-generator': '/tool/qr-code-generator.html',
    '/image-to-favicon': '/tool/image-to-favicon.html',
    '/pie-chart-generator': '/tool/pie-chart-generator.html',
    '/base64-encoder-decoder': '/tool/base64-encoder-decoder.html',
    '/image-base64-converter': '/tool/image-base64-converter.html',
    // Add other tool routes here
  };

  // Check if the requested path matches a defined route
  if (routes[path]) {
    try {
      // Fetch the specific HTML file
      const htmlResponse = await fetch(new URL(routes[path], event.request.url));

      // If the file is found, return it
      if (htmlResponse.ok) {
        return htmlResponse;
      } else {
        // If the specific HTML file is not found (e.g., 404), return a 404
        return new Response('Tool Not Found', { status: htmlResponse.status });
      }
    } catch (error) {
      // Handle any network or fetch errors
      return new Response('Error loading tool', { status: 500 });
    }
  }
  // If no route matches, return 404
  return new Response('Not Found', { status: 404 });
}
