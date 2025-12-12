const fs = require('fs');
try {
    const src = 'C:/Users/sinra/.gemini/antigravity/brain/9de53c16-5c46-4639-a4c7-3a5e1245e675/uploaded_image_1765382714491.png';
    const dest = 'c:/wedding/frontend/public/images/hero_main_final_v2.png';
    console.log(`Copying from ${src} to ${dest}`);
    if (!fs.existsSync(src)) {
        console.error('Source file does not exist');
    } else {
        fs.copyFileSync(src, dest);
        console.log('SUCCESS');
    }
} catch (e) {
    console.error('ERROR:', e);
}
