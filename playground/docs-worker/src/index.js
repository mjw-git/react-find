const xmlHeaders = {
  'content-type': 'application/xml; charset=UTF-8',
  'cache-control': 'public, max-age=300',
};

const renderSitemap = origin => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
  </url>
</urlset>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/sitemap.xml') {
      return new Response(renderSitemap(url.origin), { headers: xmlHeaders });
    }

    if (!env.ASSETS) {
      return new Response('ASSETS binding is missing.', { status: 500 });
    }

    return env.ASSETS.fetch(request);
  },
};
