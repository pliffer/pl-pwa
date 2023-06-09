const fs   = require('fs-extra');
const path = require('path');

(async function(){

    let ok = true;

    if(!global.package.kugel.config.logo){

        console.log('@pl-pwa Requires .config.logo on package.json');
        ok = false;
    
    }
    
    if(!global.package.kugel.config.theme_color){
    
        console.log('@pl-pwa Requires .config.background_color on package.json');
        ok = false;

    }
    
    if(!global.package.kugel.config.background_color){
    
        console.log('@pl-pwa Requires .config.background_color on package.json');
        ok = false;
    
    }
    
    if(!global.package.kugel.config.start_url){
    
        console.log('@pl-pwa Requires .config.start_url on package.json');
        ok = false;
   
    }
    
    if(!process.env.SHORT_NAME){

        console.log('@pl-pwa Requires .env.SHORT_NAME');
        ok = false;

    }

    if(!ok) return;

    const manifest = {

        "short_name": process.env.SHORT_NAME,
        "name": process.env.APP_NAME,
        "theme_color": global.package.kugel.config.theme_color,
        "background_color": global.package.kugel.config.background_color,
        "display": "standalone",
    
        "icons": [
            {  
                "src": global.package.kugel.config.logo,
                "sizes": "1000x1000",
                "type": "image/png"
            }
        ],
    
        "start_url": global.package.kugel.config.start_url
    
    };
    
    const ASSETS_DIR = path.join(__dirname, 'assets');
    
    fs.ensureDirSync(ASSETS_DIR);
    fs.writeJsonSync(path.join(ASSETS_DIR, 'manifest.webmanifest'), manifest);

})();

module.exports = {

    files: {
        "assets": "assets",
        "views/components": "views/components"
    }

}