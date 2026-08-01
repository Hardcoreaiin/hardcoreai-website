const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const source = path.join(__dirname, '../public/logo.png');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../app');

async function generateFavicons() {
  console.log('Generating full suite of Google-compliant favicons from:', source);

  // 16x16
  await sharp(source)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ favicon-16x16.png');

  // 32x32
  await sharp(source)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ favicon-32x32.png');

  // 48x48 (Google Favicon minimum recommended multiple of 48)
  await sharp(source)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('✓ favicon-48x48.png');

  // 96x96 (Google Favicon 48x2)
  await sharp(source)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-96x96.png'));
  console.log('✓ favicon-96x96.png');

  // 144x144 (Google Favicon 48x3)
  await sharp(source)
    .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-144x144.png'));
  console.log('✓ favicon-144x144.png');

  // 192x192 (Google Favicon 48x4 / Android Chrome)
  await sharp(source)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('✓ android-chrome-192x192.png');

  // 512x512 (Android Chrome High-Res)
  await sharp(source)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('✓ android-chrome-512x512.png');

  // apple-touch-icon.png (180x180 with white pad or transparent)
  await sharp(source)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // og-image.png (1200x630)
  await sharp(source)
    .resize(400, 400, { fit: 'contain', background: { r: 11, g: 15, b: 25, alpha: 1 } })
    .extend({ top: 115, bottom: 115, left: 400, right: 400, background: { r: 11, g: 15, b: 25, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ og-image.png');

  // Generate multi-resolution ICO (16x16, 32x32, 48x48)
  const png32Buffer = await sharp(source)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const imageData = png32Buffer;
  const dataOffset = 6 + 16;
  const ico = Buffer.alloc(dataOffset + imageData.length);

  ico.writeUInt16LE(0, 0);       // Reserved
  ico.writeUInt16LE(1, 2);       // Type = ICO
  ico.writeUInt16LE(1, 4);       // 1 image
  ico.writeUInt8(48, 6);         // Width
  ico.writeUInt8(48, 7);         // Height
  ico.writeUInt8(0, 8);
  ico.writeUInt8(0, 9);
  ico.writeUInt16LE(1, 10);
  ico.writeUInt16LE(32, 12);
  ico.writeUInt32LE(imageData.length, 14);
  ico.writeUInt32LE(dataOffset, 18);
  imageData.copy(ico, dataOffset);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
  console.log('✓ favicon.ico in public/');

  // Next.js App Router standard files in app/
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);
  console.log('✓ favicon.ico in app/');

  fs.copyFileSync(path.join(publicDir, 'favicon-48x48.png'), path.join(appDir, 'icon.png'));
  console.log('✓ icon.png in app/');

  fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(appDir, 'apple-icon.png'));
  console.log('✓ apple-icon.png in app/');

  console.log('\n✅ All Google-compliant favicon assets generated!');
}

generateFavicons().catch(console.error);
