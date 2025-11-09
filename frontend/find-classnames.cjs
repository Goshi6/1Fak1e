// find-classnames.js

const fs = require('fs');
const path = require('path');

function collectClasses(dir, result = new Set()) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            collectClasses(filePath, result);
        } else if (/\.(js|jsx|ts|tsx|html|css)$/.test(file)) {
            const code = fs.readFileSync(filePath, 'utf8');
            // Находим className="..." и class='...' (React style)
            const reClassName = /className\s*=\s*["'`]{1}([^"'`]+)["'`]{1}/g;
            let match;
            while ((match = reClassName.exec(code))) {
                match[1].split(/\s+/).forEach(cls => cls && result.add(cls));
            }
            // Находим class="..." как в html
            const reClassAttr = /class\s*=\s*["'`]{1}([^"'`]+)["'`]{1}/g;
            while ((match = reClassAttr.exec(code))) {
                match[1].split(/\s+/).forEach(cls => cls && result.add(cls));
            }
        }
    });
    return result;
}

// Путь к папке с исходниками (обычно "src")
const SRC_DIR = './src';

const allClasses = Array.from(collectClasses(SRC_DIR)).filter(Boolean).sort();

fs.writeFileSync('classnames.txt', allClasses.join('\n'), 'utf8');
console.log(`Нашел ${allClasses.length} уникальных className. Список в classnames.txt`);
