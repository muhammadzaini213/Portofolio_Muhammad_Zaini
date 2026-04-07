const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://zaini-portofolio.vercel.app';

const articles = require('../app/data/articles.json');
const projects = require('../app/data/projects.json');

const today = new Date().toISOString();

function urlTag(loc, priority = "0.7") {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlTag(`${BASE_URL}/`, "1.0")}
${urlTag(`${BASE_URL}/articles`, "0.8")}
${urlTag(`${BASE_URL}/projects`, "0.8")}

${articles.map(a => urlTag(`${BASE_URL}/articles/${a.slug}`)).join('')}
${projects.map(p => urlTag(`${BASE_URL}/projects/${p.slug}`)).join('')}

</urlset>`;

fs.writeFileSync(
  path.join(__dirname, '../public/sitemap.xml'),
  sitemap.trim()
);

console.log('✅ Sitemap generated!');