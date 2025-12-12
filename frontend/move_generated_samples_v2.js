const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

const map = {
    'sample_01_classic_studio': 'sample_01.png',
    'sample_02_garden_wedding': 'sample_02.png',
    'sample_03_close_up_elegant': 'sample_03.png',
    'sample_04_casual_wedding': 'sample_04.png',
    'sample_05_cinematic_wedding': 'sample_05.png'
};

try {
    const files = fs.readdirSync(sourceDir);

    Object.keys(map).forEach(prefix => {
        const match = files.find(file => file.startsWith(prefix) && file.endsWith('.png'));

        if (match) {
            const srcPath = path.join(sourceDir, match);
            const destPath = path.join(destDir, map[prefix]);
            try {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${match} to ${map[prefix]}`);
            } catch (err) {
                console.error(`Error copying ${match}:`, err);
            }
        } else {
            console.error(`No file found starting with ${prefix}`);
        }
    });
} catch (e) {
    console.error("Error reading source directory:", e);
}
