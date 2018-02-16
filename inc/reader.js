const fs = require('fs');
const http = require('http');
const https = require('https');

module.exports.get = (input, mode = 'file') => {
    return new Promise(resolve => {
        if (mode === 'file') {
            let external = input.startsWith('http');
            if (external) {
                let protocol = input.startsWith('https') ? https : http;
                protocol.get(input, (response) => {
                    if (response.statusCode !== 200) {
                        resolve('');
                    } else {
                        let content = '';
                        response.on('data', chunk => {
                            content += chunk;
                        });
                        response.on('end', () => {
                            resolve(content);
                        });
                    }
                });
            } else {
                fs.readFile(input, (error, data) => {
                    if (error) {
                        resolve('');
                    } else {
                        resolve(data.toString());
                    }
                });
            }
        } else {
            resolve(input);
        }
    });
};
