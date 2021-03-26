const fs = require('fs');
const path = require('path');
/**
 * Sync Files Recursive Collector
 *
 * @param dirname <String>
 * @param ext <String[]>
 * @param exclude <String[]>
 * @return <String[]>
 */
const collectFilesSync = (dirname, ext = [], exclude = []) => {
    const res = [];

    const files = fs.readdirSync(dirname);

    files.forEach(file => {
        const isDirectory = fs.lstatSync(path.join(dirname, file)).isDirectory();

        if (isDirectory) {
            res.push(...collectFilesSync(path.join(dirname, file), ext, exclude));
            return;
        }

        if (ext.length
            && ext.some(str => (file.indexOf(str) !== -1))
            && !exclude.some(el => el === file)
        ) {
            res.push(path.join(dirname, file));
        }
    })

    return res;
};

module.exports = Object.freeze({
    collectFilesSync,
})
