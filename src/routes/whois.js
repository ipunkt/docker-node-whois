const apiConfig = require('../config/api');
const util = require('util');
const tldlist = require('../config/tld.json');
const execFile = util.promisify(require('child_process').execFile);

/**
 *
 * @param identifier
 * @return {Promise}
 */
async function whois(identifier) {

    let tld = identifier.split('.').pop();

    // execFile: executes a file with the specified arguments
    // whois -h mobi.whois-servers.net npr.mobi
    const {error,stdout,stderr } = await execFile('whois', ['-H', '-h', tld+'.whois-servers.net', identifier]);
    if (error) {
        console.log({'stdout': stdout,'stderr': stderr });
    }

    let result = {},
        m,
        reg = /([A-Za-z_][^:]*):([^\r\n]*(?:[\r\n]+(?![A-Za-z_].*:).*)*)/mg;

    while (m = reg.exec(stdout)) {
        result[m[1].trim().toLowerCase()] = m[2].trim();
    }
    return result;
}


/**
 *
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
module.exports = async function(ctx, next) {
    const identifier = ctx.request.query.identifier;
    const key = ctx.request.query.key;

    if (key !== apiConfig.server.key) {
        ctx.status = 403;
        ctx.body = {"error": 'Key missing or not correct'};
        await next();
        return;
    }

    try {
        let result = await whois(identifier);

        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        console.log(err);
    }

};
