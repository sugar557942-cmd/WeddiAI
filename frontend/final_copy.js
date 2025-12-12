const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/samples';

// Ensure directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Map of artifacts -> destination filenames
const mapping = [
    { src: 'sample_01_classic_studio_1765388419067.png', dest: 'sample_01.png' },
    { src: 'sample_02_garden_wedding_1765388435475.png', dest: 'sample_02.png' },
    { src: 'sample_03_close_up_elegant_1765388454553.png', dest: 'sample_03.png' },
    { src: 'sample_04_casual_wedding_1765388490238.png', dest: 'sample_04.png' },
    { src: 'sample_05_cinematic_wedding_1765388507594.png', dest: 'sample_05.png' }
];

console.log('Copying all samples...');

mapping.forEach(m => {
    const srcPath = path.join(sourceDir, m.src);
    const destPath = path.join(destDir, m.dest);

    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${m.dest}`);
        } else {
            console.error(`Source missing: ${srcPath}`);
        }
    } catch (e) {
        console.error(`Failed ${m.dest}:`, e);
    }
});

console.log('Final check of samples dir:', fs.readdirSync(destDir));
