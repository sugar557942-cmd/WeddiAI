const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Need to handle wildcards or find files

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

const map = {
    'sample_01_classic_studio_*.png': 'sample_01.png',
    'sample_02_garden_wedding_*.png': 'sample_02.png',
    'sample_03_close_up_elegant_*.png': 'sample_03.png',
    'sample_04_casual_wedding_*.png': 'sample_04.png',
    'sample_05_cinematic_wedding_*.png': 'sample_05.png'
};

Object.keys(map).forEach(pattern => {
    // Find file matching pattern in sourceDir
    // Simple directory scan since we don't have glob package installed likely
    const files = fs.readdirSync(sourceDir);
    const match = files.find(file => file.startsWith(pattern.replace('*.png', '')));

    if (match) {
        const srcPath = path.join(sourceDir, match);
        const destPath = path.join(destDir, map[pattern]);
        try {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${match} to ${map[pattern]}`);
        } catch (err) {
            console.error(`Error copying ${match}:`, err);
        }
    } else {
        console.error(`No file found matching ${pattern}`);
    }
});
