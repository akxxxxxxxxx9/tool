import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

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
    // Construct the request for the static asset
    const assetRequest = new Request(new URL(routes[path], event.request.url), event.request);
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(req.url.replace(url.origin, new URL(routes[path], url.origin).origin))
      });
    } catch (e) {
      // If the specific HTML file is not found, return a 404
      return new Response('Tool Not Found', { status: 404 });
    }
  }

  // For any other path, attempt to serve as a static asset
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    // If no route matches and it's not a static asset, return 404
    return new Response('Not Found', { status: 404 });
  }
}