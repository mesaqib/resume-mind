import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.resumind.xyz';

const staticRoutes = [
  '/',
  '/auth',
  '/upload',
  '/resume/123', // Sample dynamic route (for Google to understand the pattern)
  '/wipe',
];

const sitemapEntries = staticRoutes.map(route => {
  return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</urlset>`;

const publicDir = path.resolve('./public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ sitemap.xml generated!');
