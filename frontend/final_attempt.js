const fs = require('fs');
const path = require('path');

// Use forward slashes for consistency
const artifactDir = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675';
const destBase = 'c:/wedding/frontend/public/mysamples';

console.log('--- FINAL COPY ATTEMPT ---');

try {
    if (!fs.existsSync(destBase)) {
        console.log(`Creating ${destBase}`);
        fs.mkdirSync(destBase, { recursive: true });
    }

    const mapping = [
        { src: 'sample_01_classic_studio_1765388419067.png', dest: 's_01.png' },
        { src: 'sample_02_garden_wedding_1765388435475.png', dest: 's_02.png' },
        { src: 'sample_03_close_up_elegant_1765388454553.png', dest: 's_03.png' },
        { src: 'sample_04_casual_wedding_1765388490238.png', dest: 's_04.png' },
        { src: 'sample_05_cinematic_wedding_1765388507594.png', dest: 's_05.png' }
    ];

    mapping.forEach(m => {
        const s = path.join(artifactDir, m.src);
        const d = path.join(destBase, m.dest);

        if (fs.existsSync(s)) {
            fs.copyFileSync(s, d);
            console.log(`Copied to ${d}`);
        } else {
            console.error(`Missing source: ${s}`);
        }
    });

} catch (e) {
    console.error('FATAL ERROR:', e);
}
console.log('--- END ---');
