const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

const files = [
    'uploaded_image_1765382354297.png',
    'uploaded_image_0_1765382573845.png',
    'uploaded_image_1_1765382573845.png',
    'uploaded_image_1765382714491.png'
];

files.forEach((file, index) => {
    try {
        fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, `sample_0${index + 1}.png`));
        console.log(`Copied ${file} to sample_0${index + 1}.png`);
    } catch (e) {
        console.error(`Error copying ${file}:`, e);
    }
});

// Create 5th sample by reusing the first one
try {
    fs.copyFileSync(path.join(sourceDir, files[0]), path.join(destDir, 'sample_05.png'));
    console.log('Created sample_05.png');
} catch (e) {
    console.error('Error creating sample_05.png:', e);
}
