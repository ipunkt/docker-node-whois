const app = require('./app');
const apiConfig = require('./config/api');
const server = app.listen();
const request = require('supertest').agent(server);

// add your tests here

describe('whois', function() {
    const uri = apiConfig.server.prefix + '/whois';

    it ('should 403 when credentials are missing', function(done) {
        request
            .get(uri)
            .expect(403, done);
    });

    it('should 200 and return whois data', function(done) {
        request
            .get(uri)
            .send({
                "key" : apiConfig.server.key,
                "identifier" : "google.com"
            })
            .expect(200, (err, res) => {
                if (err) return done(err);
                res.body.should.have.property('domainName');
                done();
            });
    });
});


describe('Healthcheck', function() {
    const uri = apiConfig.server.prefix + '/healthcheck';

    it('should 204', (done) => {
        request.get(uri)
            .expect(204, done);
    });
});

// do not add any more test below here!

describe('Shutdown server', function() {
    it('should succeed', (done) => {
        server.close();
        done();
    });
});
