const fs = require('fs');
const https = require('https');
const path = require('path');

const destDir = 'c:/wedding/frontend/public/images';

const samples = [
    { name: 'sample_01.png', url: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=640' }, // Classic
    { name: 'sample_02.png', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=640' }, // Garden
    { name: 'sample_03.png', url: 'https://images.unsplash.com/photo-1522673607200-1645062cd95c?auto=format&fit=crop&q=80&w=640' }, // Elegant
    { name: 'sample_04.png', url: 'https://images.unsplash.com/photo-1529636721157-d4d3d5e24a87?auto=format&fit=crop&q=80&w=640' }, // Casual
    { name: 'sample_05.png', url: 'https://images.unsplash.com/photo-1606216794074-735e91aa5c92?auto=format&fit=crop&q=80&w=640' }  // Romantic
];

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

samples.forEach((sample) => {
    const file = fs.createWriteStream(path.join(destDir, sample.name));
    console.log(`Downloading ${sample.name}...`);
    https.get(sample.url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => {
                console.log(`Saved ${sample.name}`);
            });
        });
    }).on('error', function (err) {
        fs.unlink(path.join(destDir, sample.name));
        console.error(`Error downloading ${sample.name}: ${err.message}`);
    });
});
