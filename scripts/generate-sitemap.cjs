// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://zaini-portofolio.vercel.app';

// Data artikel langsung di sini
const articles = [
  {
    slug: "audio-system-design",
    title: "Designing an Audio System You Don’t Need to Remember",
    desc: "How I built an audio system so intuitive I only remember how to use it, not how it works.",
    content: `I built an audio system with one goal: remove thinking.

Instead of remembering structure, I focused on usage.

Play("SFX_HIT")
Play("BGM_BATTLE")

No lookup. No confusion.

System handles:
- pooling
- priority
- layering

Result:
I forgot how it works internally.
But I can use it instantly.`
  },
  {
    slug: "game-feel-principles",
    title: "Game Feel Is Not Juice",
    desc: "Breaking down feedback, timing, and player perception.",
    content: `Game feel is structure.

Not particles.
Not screenshake.

It is:
- response time
- input buffering
- feedback clarity

Juice is decoration.
Feel is system.`
  }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/articles</loc><priority>0.8</priority></url>
  ${articles.map(a => `<url><loc>${BASE_URL}/articles/${a.slug}</loc><priority>0.7</priority></url>`).join('')}
  <url><loc>${BASE_URL}/projects</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/#contact</loc><priority>0.6</priority></url>
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated!');