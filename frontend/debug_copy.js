const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destDir = 'c:/wedding/frontend/public/images';

console.log('--- START DIAGNOSTIC ---');
console.log('Source:', sourceDir);
console.log('Dest:', destDir);

try {
    if (!fs.existsSync(sourceDir)) {
        console.error('Source dir does not exist!');
    } else {
        console.log('Source dir exists.');
        const files = fs.readdirSync(sourceDir);
        console.log(`Found ${files.length} files in source.`);

        // Filter for sample images
        const samples = files.filter(f => f.startsWith('sample_') && f.endsWith('.png'));
        console.log('Sample files found:', samples);

        if (samples.length > 0) {
            // Try copying the first one
            const first = samples[0];
            const srcFile = path.join(sourceDir, first);
            const destFile = path.join(destDir, 'debug_sample.png');
            console.log(`Attempting copy: ${srcFile} -> ${destFile}`);
            fs.copyFileSync(srcFile, destFile);
            console.log('Copy successful!');
        } else {
            console.error('No sample files found to copy.');
        }
    }
} catch (e) {
    console.error('EXCEPTION:', e);
}
console.log('--- END DIAGNOSTIC ---');
