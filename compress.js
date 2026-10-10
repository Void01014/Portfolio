import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/images';
const files = fs.readdirSync(dir);

console.log(`Starting image conversion in ${dir}...`);

let originalTotal = 0;
let convertedTotal = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpeg', '.jpg'].includes(ext)) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'));

    const originalSize = fs.statSync(inputPath).size;
    originalTotal += originalSize;

    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    const convertedSize = fs.statSync(outputPath).size;
    convertedTotal += convertedSize;

    const savedPercent = ((1 - convertedSize / originalSize) * 100).toFixed(1);
    console.log(
      `✓ ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB) -> ${path.basename(outputPath)} (${(convertedSize / 1024).toFixed(1)} KB) [Saved ${savedPercent}%]`
    );
  }
}

console.log(`\n========================================`);
console.log(`Original total size: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Converted total size: ${(convertedTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Overall reduction: ${((1 - convertedTotal / originalTotal) * 100).toFixed(1)}%`);
console.log(`========================================\n`);
