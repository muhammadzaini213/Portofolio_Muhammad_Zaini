// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://zaini-portofolio.vercel.app';

const articles = require('../app/data/articles.json');
const projects = require('../app/data/projects.json');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/articles</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/projects</loc><priority>0.8</priority></url>
  ${articles.map(a => `<url><loc>${BASE_URL}/articles/${a.slug}</loc><priority>0.7</priority></url>`).join('\n  ')}
  ${projects.map(p => `<url><loc>${BASE_URL}/projects/${p.slug}</loc><priority>0.7</priority></url>`).join('\n  ')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated!');