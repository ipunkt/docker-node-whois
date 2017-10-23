const process = require('process');

let prefix = process.env.API_PREFIX || '/api/v1';

const key = process.env.API_KEY;
if (typeof prefix === 'undefined') {
    throw new Error('No API_KEY defined')
}

module.exports = {
    server: {
        prefix,
        key
    }
};
