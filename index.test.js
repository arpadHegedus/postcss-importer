let fs = require('fs'),
    plugin = require('./'),
    postcss = require('postcss'),
    testCode = (code, expected, options = {}, plugins = []) => () => {
        options.outputStyle = 'compressed';
        options.from = undefined;
        if (plugins.length === 0) plugins.push(plugin(options));
        return postcss(plugins).process(code, options)
            .then(result => {
                expect(result.css.replace(/[\n]/ig, '')).toEqual(expected);
            });
    },
    testFile = (file, options = {}, plugins = []) => () => {
        let inputFile = `./tests/${file}`,
            outputFile = `./tests/expected/${file}`,
            input = fs.readFileSync(inputFile, 'utf8').toString(),
            expected = fs.readFileSync(outputFile, 'utf8').toString();
        options.from = inputFile;
        options.to = outputFile;
        if (plugins.length === 0) plugins.push(plugin(options));
        return expect(postcss(plugins).process(input, options)
            .then(result => {
                // console.log(`./tests/expected/${file}`);
                // fs.writeFileSync(`./tests/expected/${file}`, result.css);
                return result.css;
            })
            .catch(error => error)).resolves.toEqual(expected);
    };

it('can import a css file', testFile('import.css'));
it('can import from a folder', testFile('from-folder.css'));
it('can import a file from outside its folder', testFile('ref.css'));
it('can import a file that imports others', testFile('multi-ref.css'));
it('can work with files that do not exist', testFile('non-existent.css'));
it('can import external file', testFile('external.css'));
it(
    'can import from code',
    testCode('@import "tests/_body.css";', 'body { width: 100% }')
);
