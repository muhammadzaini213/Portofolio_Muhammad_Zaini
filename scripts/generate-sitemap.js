const fs = require('fs');
const { articles } = require('../app/data/articles'); // path ke data artikelnya

const BASE_URL = 'https://zaini-portofolio.vercel.app';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/articles</loc>
    <priority>0.8</priority>
  </url>
  ${articles
    .map(
      (a) => `
  <url>
    <loc>${BASE_URL}/articles/${a.slug}</loc>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
  <url>
    <loc>${BASE_URL}/projects</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/#contact</loc>
    <priority>0.6</priority>
  </url>
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated!');