const koaJson = require('koa-json');
const router = require('./routes/router');

const Koa = require('koa');
const app = module.exports = new Koa();

// define middleware
function setupMiddleware(app, middlewares) {
    middlewares.forEach(middleware => {
        app.use(middleware);
});
}

setupMiddleware(app, [
    koaJson({pretty: false}),
    router.routes()
]);

// start the server
if (!module.parent) app.listen(80);
