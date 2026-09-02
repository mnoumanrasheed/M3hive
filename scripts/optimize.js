import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HERO_DIR = path.join(__dirname, '../public/assets/heroes');

async function optimizeImages() {
  try {
    const files = await fs.readdir(HERO_DIR);
    const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

    for (const file of jpgFiles) {
      const inputPath = path.join(HERO_DIR, file);
      const parsed = path.parse(file);
      
      const avifPath = path.join(HERO_DIR, `${parsed.name}.avif`);
      const webpPath = path.join(HERO_DIR, `${parsed.name}.webp`);

      console.log(`Optimizing ${file}...`);

      // We don't resize because the user said: "Do not alter image dimensions/aspect ratios in a way that changes the design."
      // WebP
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      
      // AVIF
      await sharp(inputPath)
        .avif({ quality: 65, effort: 6 })
        .toFile(avifPath);

      console.log(`Generated .webp and .avif for ${file}`);
    }

    console.log('Image optimization complete.');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
