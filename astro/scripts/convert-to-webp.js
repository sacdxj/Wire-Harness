const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.match(/\.(jpg|jpeg)$/i) && !entry.name.includes('-original')) {
      const webpPath = fullPath.replace(/\.(jpg|jpeg)$/i, '.webp');

      // Skip if webp already exists
      if (fs.existsSync(webpPath)) {
        console.log('SKIP (exists):', path.relative(imagesDir, fullPath));
        continue;
      }

      sharp(fullPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath)
        .then(info => {
          const originalSize = fs.statSync(fullPath).size;
          const savings = Math.round((1 - info.size / originalSize) * 100);
          console.log('OK:', path.relative(imagesDir, fullPath),
            '->', Math.round(info.size / 1024) + 'KB',
            '(' + savings + '% saved)');
        })
        .catch(err => console.error('ERROR:', fullPath, err.message));
    }
  }
}

console.log('Converting images to WebP...');
processDirectory(imagesDir);
console.log('Done!');
