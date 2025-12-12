const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

const mappings = [
    { src: 'sample_01_classic_studio_1765388419067.png', dest: 'sample_01.png' },
    { src: 'sample_02_garden_wedding_1765388435475.png', dest: 'sample_02.png' },
    { src: 'sample_03_close_up_elegant_1765388454553.png', dest: 'sample_03.png' },
    { src: 'sample_04_casual_wedding_1765388490238.png', dest: 'sample_04.png' },
    { src: 'sample_05_cinematic_wedding_1765388507594.png', dest: 'sample_05.png' }
];

console.log('Starting direct copy...');

mappings.forEach(item => {
    const srcPath = path.join(sourceDir, item.src);
    const destPath = path.join(destDir, item.dest);

    try {
        if (fs.existsSync(srcPath)) {
            const data = fs.readFileSync(srcPath);
            fs.writeFileSync(destPath, data);
            console.log(`Success: ${item.dest}`);
        } else {
            console.error(`Missing source: ${srcPath}`);
        }
    } catch (e) {
        console.error(`Failed ${item.dest}:`, e);
    }
});
console.log('Done.');
