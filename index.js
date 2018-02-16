const postcss = require('postcss');
const importer = require('./inc/importer');

module.exports = postcss.plugin('postcss-importer', () => (root, result) => {
    let file = result.opts.from ? result.opts.from : undefined;
    let options = { from: file };
    let mode = file ? 'file' : 'code';
    return importer.import(file ? file : root.toString(), mode).then(content => {
        result.root = postcss.parse(content, options);
    });
});
