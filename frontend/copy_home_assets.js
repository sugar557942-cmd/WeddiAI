const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

// Map generated filenames to clean names
const imageMap = [
    { src: 'intro_feature_wedding_planning_1765419507331.png', dest: 'intro_feature.png' },
    { src: 'step_icon_01_upload_1765419522565.png', dest: 'step_01.png' },
    { src: 'step_icon_02_select_1765419544074.png', dest: 'step_02.png' },
    { src: 'step_icon_03_magic_1765419562206.png', dest: 'step_03.png' }
];

console.log('Starting asset copy...');

imageMap.forEach(img => {
    const srcPath = path.join(sourceDir, img.src);
    const destPath = path.join(destDir, img.dest);

    try {
        if (fs.existsSync(srcPath)) {
            // Using copyFileSync which we know works if permissions allow
            fs.copyFileSync(srcPath, destPath);
            console.log(`Success: Copied ${img.dest}`);
        } else {
            console.error(`Error: Source file not found: ${img.src}`);
        }
    } catch (err) {
        console.error(`Error copying ${img.src}:`, err);
    }
});
