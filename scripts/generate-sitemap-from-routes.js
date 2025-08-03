import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from '../app/routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://www.resumind.xyz';

// Helper to extract paths from route config
const extractPaths = (routes) => {
  return routes.map((route) => {
    if (typeof route === 'string') return '/'; // for index route
    return route.path;
  });
};

// Optionally replace dynamic params with sample values
const formatPath = (path) =>
  path.replace(/:([^/]+)/g, (match, param) => {
    if (param === 'id') return '123'; // example placeholder
    return `sample`;
  });

const generateUrls = (paths) =>
  paths
    .filter((p) => !!p)
    .map((p) => {
      const fullPath = p === '/' ? '' : formatPath(p);
      return `
  <url>
    <loc>${siteUrl}/${fullPath}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('');

const sitemap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const main = () => {
  const paths = extractPaths(routes);
  const urls = generateUrls(paths);
  const sitemapContent = sitemap(urls);
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapContent.trim());
  console.log('✅ sitemap.xml generated at public/sitemap.xml');
};

main();
