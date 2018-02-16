const postcss = require('postcss');
const reader = require('./reader');
const processor = require('./processor');

module.exports.import = (input, mode = 'file') => {
    return new Promise(resolve => {
        reader.get(input, mode).then(content => {
            if (content === '') {
                resolve('');
            }
            let root = postcss.parse(content, {
                from: mode === 'file' ? input : undefined
            });
            let rules = [];
            root.walkAtRules('import', rule => {
                rules.push(processor.process(rule, mode === 'file' ? input : null));
            });
            Promise.all(rules).then(() => {
                resolve(root.toString());
            });
        });
    });
};
