const path = require('path');
const postcss = require('postcss');
const importer = require('./importer');

module.exports.process = (rule, file) => {
    return new Promise(resolve => {
        let importing = rule.params.slice(1, -1);
        if (!importing.startsWith('http')) {
            importing = path.join(file ? path.dirname(file) : '', importing);
            if (
                !importing.endsWith('.scss') &&
                !importing.endsWith('.css') &&
                file
            ) {
                importing += path.extname(file);
            }
        }
        importer.import(importing, 'file').then(content => {
            if (content === '') {
                let where = file ? file : 'the code';
                console.log('\x1b[33m' +
                    'Failed to @import ' +
                    rule.params +
                    ' in ' +
                    where +
                    ' on line ' +
                    rule.source.start.line +
                    ', column ' +
                    rule.source.start.column +
                    '\x1b[0m');
            } else {
                rule.before(postcss.parse(content, { from: importing }));
                rule.remove();
            }
            resolve();
        });
    });
};
