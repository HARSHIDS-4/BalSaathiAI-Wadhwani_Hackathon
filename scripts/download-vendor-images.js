#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';

const OUT_DIR = path.resolve(process.cwd(), 'public', 'assets', 'vendor');
const images = [
  { url: 'https://source.unsplash.com/512x512/?indian-woman,portrait', file: 'worker-1.jpg' },
  { url: 'https://source.unsplash.com/512x512/?indian-girl,portrait,child', file: 'child-1.jpg' },
  { url: 'https://source.unsplash.com/512x512/?indian-boy,portrait,child', file: 'child-2.jpg' },
  { url: 'https://source.unsplash.com/512x512/?child,portrait,smile', file: 'child-3.jpg' },
  { url: 'https://source.unsplash.com/512x512/?child,portrait,candid', file: 'child-4.jpg' },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

function download(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        const status = res.statusCode || 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          // follow redirect
          const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
          res.resume();
          return resolve(download(nextUrl, dest, redirectCount + 1));
        }
        if (status >= 400) {
          res.resume();
          return reject(new Error(`Failed to GET ${url} - Status ${status}`));
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function run() {
  for (const img of images) {
    const outPath = path.join(OUT_DIR, img.file);
    if (fs.existsSync(outPath)) {
      console.log(`${img.file} exists — skipping`);
      continue;
    }
    console.log('Downloading', img.file);
    try {
      await download(img.url, outPath);
      console.log('Saved', outPath);
    } catch (err) {
      console.error('Error downloading', img.url, err.message || err);
    }
  }
  console.log('Done. Images saved to public/assets/vendor/');
}

run();
