#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Compresses and converts images in public/images to WebP format
 * while keeping originals as fallbacks.
 *
 * Usage: node scripts/optimize-images.mjs [--dry-run]
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const IMAGES_DIR = join(ROOT_DIR, 'public', 'images');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'images-optimized');

// Configuration
const CONFIG = {
  // Quality settings (0-100)
  quality: {
    webp: 80,
    jpeg: 80,
    png: 80,
  },
  // Max dimensions for different image types
  maxDimensions: {
    hero: { width: 1920, height: 1080 },
    card: { width: 800, height: 600 },
    member: { width: 400, height: 400 },
    thumbnail: { width: 200, height: 200 },
    default: { width: 1200, height: 1200 },
  },
  // File size thresholds (in bytes)
  minSizeToOptimize: 10 * 1024, // 10KB - skip tiny images
  targetMaxSize: 200 * 1024, // 200KB target max
};

// Determine image type based on directory
function getImageType(filePath) {
  const dir = dirname(filePath).toLowerCase();
  if (dir.includes('cover') || dir.includes('hero') || dir.includes('about')) return 'hero';
  if (dir.includes('member')) return 'member';
  if (dir.includes('program') || dir.includes('card')) return 'card';
  if (dir.includes('logo') || dir.includes('icon')) return 'thumbnail';
  return 'default';
}

// Get all image files recursively
async function getImageFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await getImageFiles(fullPath, files);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Optimize a single image
async function optimizeImage(inputPath, dryRun = false) {
  const stats = await stat(inputPath);
  const originalSize = stats.size;

  // Skip tiny images
  if (originalSize < CONFIG.minSizeToOptimize) {
    return { skipped: true, reason: 'too small', originalSize };
  }

  const relativePath = inputPath.replace(IMAGES_DIR, '');
  const outputPathWebp = join(OUTPUT_DIR, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  const outputPathOriginal = join(OUTPUT_DIR, relativePath);

  // Create output directory
  const outputDirPath = dirname(outputPathWebp);
  if (!existsSync(outputDirPath)) {
    if (!dryRun) {
      await mkdir(outputDirPath, { recursive: true });
    }
  }

  const imageType = getImageType(inputPath);
  const maxDims = CONFIG.maxDimensions[imageType];

  if (dryRun) {
    return {
      input: relativePath,
      outputWebp: outputPathWebp.replace(OUTPUT_DIR, ''),
      originalSize,
      imageType,
      maxDims,
      dryRun: true,
    };
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Determine if resize is needed
    const needsResize = (metadata.width && metadata.width > maxDims.width) ||
                       (metadata.height && metadata.height > maxDims.height);

    let pipeline = image;

    if (needsResize) {
      pipeline = pipeline.resize(maxDims.width, maxDims.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Generate WebP version
    const webpBuffer = await pipeline
      .webp({ quality: CONFIG.quality.webp })
      .toBuffer();

    // Generate optimized original format
    const ext = extname(inputPath).toLowerCase();
    let originalBuffer;

    if (ext === '.png') {
      originalBuffer = await sharp(inputPath)
        .resize(maxDims.width, maxDims.height, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: CONFIG.quality.png, compressionLevel: 9 })
        .toBuffer();
    } else {
      originalBuffer = await sharp(inputPath)
        .resize(maxDims.width, maxDims.height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: CONFIG.quality.jpeg, mozjpeg: true })
        .toBuffer();
    }

    // Write files
    await sharp(webpBuffer).toFile(outputPathWebp);
    await sharp(originalBuffer).toFile(outputPathOriginal);

    const webpSize = webpBuffer.length;
    const optimizedSize = originalBuffer.length;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    return {
      input: relativePath,
      originalSize,
      webpSize,
      optimizedSize,
      savings: `${savings}%`,
      resized: needsResize,
      dimensions: metadata.width && metadata.height
        ? `${metadata.width}x${metadata.height}`
        : 'unknown',
    };
  } catch (error) {
    return {
      input: relativePath,
      error: error.message,
    };
  }
}

// Main function
async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('🖼️  Image Optimization Script');
  console.log('================================');
  console.log(`Source: ${IMAGES_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes)' : 'OPTIMIZE'}`);
  console.log('');

  if (!existsSync(IMAGES_DIR)) {
    console.error('❌ Images directory not found:', IMAGES_DIR);
    process.exit(1);
  }

  // Get all images
  const files = await getImageFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to process\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const result = await optimizeImage(file, dryRun);

    if (result.error) {
      console.log(`❌ ${result.input}: ${result.error}`);
      errors++;
    } else if (result.skipped) {
      skipped++;
    } else if (result.dryRun) {
      console.log(`📄 ${result.input}`);
      console.log(`   Type: ${result.imageType}, Max: ${result.maxDims.width}x${result.maxDims.height}`);
      console.log(`   Size: ${formatBytes(result.originalSize)}`);
      totalOriginal += result.originalSize;
      processed++;
    } else {
      console.log(`✅ ${result.input}`);
      console.log(`   ${formatBytes(result.originalSize)} → ${formatBytes(result.webpSize)} (WebP: ${result.savings} saved)`);
      if (result.resized) {
        console.log(`   Resized from ${result.dimensions}`);
      }
      totalOriginal += result.originalSize;
      totalOptimized += result.webpSize;
      processed++;
    }
  }

  console.log('\n================================');
  console.log('📊 Summary:');
  console.log(`   Processed: ${processed} images`);
  console.log(`   Skipped: ${skipped} (too small)`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Original total: ${formatBytes(totalOriginal)}`);

  if (!dryRun && totalOptimized > 0) {
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log(`   Optimized total: ${formatBytes(totalOptimized)}`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log(`\n✨ Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('\nNext steps:');
    console.log('1. Review the optimized images');
    console.log('2. Replace public/images with public/images-optimized');
    console.log('3. Or update your image paths to use the optimized versions');
  }
}

main().catch(console.error);
