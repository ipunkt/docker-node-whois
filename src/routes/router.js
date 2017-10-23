const healthcheck = require('./healthcheck');
const whois = require('./whois');

const apiConfig = require('../config/api');

const router = require('koa-router')({
    prefix: apiConfig.server.prefix
});


router.get('/whois', whois);
router.get('/healthcheck', healthcheck);

module.exports = router;
