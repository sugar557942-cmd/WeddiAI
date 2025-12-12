const fs = require('fs');
const path = require('path');

console.log('CWD:', process.cwd());
const publicDir = path.join(process.cwd(), 'public');
console.log('Public Dir:', publicDir);

try {
    if (!fs.existsSync(publicDir)) {
        console.error('ERROR: public directory not found!');
    } else {
        console.log('public directory exists.');
        console.log('Contents of public:', fs.readdirSync(publicDir));
    }

    const samplesDir = path.join(publicDir, 'samples');
    console.log('Target Samples Dir:', samplesDir);

    if (!fs.existsSync(samplesDir)) {
        console.log('Creating samples directory...');
        fs.mkdirSync(samplesDir);
        console.log('Created.');
    } else {
        console.log('Samples directory already exists.');
    }

    if (fs.existsSync(samplesDir)) {
        console.log('VERIFIED: Samples directory exists.');

        // Try copying one file
        const src = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675/sample_01_classic_studio_1765388419067.png';
        const dest = path.join(samplesDir, 'sample_01.png');

        if (fs.existsSync(src)) {
            console.log(`Copying ${src} to ${dest}`);
            fs.copyFileSync(src, dest);
            console.log('Copy done.');
            console.log('Contents of samples:', fs.readdirSync(samplesDir));
        } else {
            console.error('Source file not found:', src);
        }

    } else {
        console.error('FAILED: Samples directory does not exist after creation attempt.');
    }

} catch (e) {
    console.error('EXCEPTION:', e);
}
