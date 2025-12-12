const fs = require('fs');
const path = require('path');

const destDir = 'c:/wedding/frontend/public/images';

// Base64 strings for the 5 sample images (truncated for brevity in this viewing, but will be full in execution)
// I will read them from the artifacts I created earlier or re-generate if needed.
// Actually, since I cannot easily "read" the artifacts into this script content dynamically without a previous read step, 
// I will use a script that reads the .b64 files I created in the workspace and writes them to the public dir.

const sourceDir = 'c:/wedding/frontend';
const files = ['sample_01', 'sample_02', 'sample_03', 'sample_04', 'sample_05'];

files.forEach(name => {
    const b64Path = path.join(sourceDir, `${name}.b64`);
    const pngPath = path.join(destDir, `${name}.png`);

    if (fs.existsSync(b64Path)) {
        try {
            const b64Data = fs.readFileSync(b64Path, 'utf8').trim();
            const buffer = Buffer.from(b64Data, 'base64');
            fs.writeFileSync(pngPath, buffer);
            console.log(`Successfully wrote ${name}.png`);
        } catch (err) {
            console.error(`Error processing ${name}:`, err);
        }
    } else {
        console.error(`Base64 file not found for ${name}`);
    }
});
