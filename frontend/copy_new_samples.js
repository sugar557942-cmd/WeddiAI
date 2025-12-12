const fs = require('fs');
const path = require('path');

// Artifacts directory where images were generated
const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
// New destination directory
const destDir = 'c:/wedding/frontend/public/samples';

// Map generated filenames to clean names
const imageMap = [
    { src: 'sample_01_classic_studio_1765388419067.png', dest: 'sample_01.png' },
    { src: 'sample_02_garden_wedding_1765388435475.png', dest: 'sample_02.png' },
    { src: 'sample_03_close_up_elegant_1765388454553.png', dest: 'sample_03.png' },
    { src: 'sample_04_casual_wedding_1765388490238.png', dest: 'sample_04.png' },
    { src: 'sample_05_cinematic_wedding_1765388507594.png', dest: 'sample_05.png' }
];

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    console.log(`Creating directory: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
}

console.log('Starting copy operation...');

imageMap.forEach(img => {
    const srcPath = path.join(sourceDir, img.src);
    const destPath = path.join(destDir, img.dest);

    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Success: Copied ${img.src} -> ${img.dest}`);
        } else {
            console.error(`Error: Source file not found: ${img.src}`);
        }
    } catch (err) {
        console.error(`Error copying ${img.src}:`, err);
    }
});

console.log('Operation complete.');
