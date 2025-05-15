const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/@pdftron/webviewer/public');
const targetDir = path.join(__dirname, '../public/webviewer');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy files
fs.copySync(sourceDir, targetDir, { overwrite: true });

console.log('WebViewer files copied successfully!'); 