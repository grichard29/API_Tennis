let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET players', () => {
    it('it should get all players according to their ranks', (done) => {
        chai.request(server)
            .get('/v1/players')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            })
    });
});

describe('/GET/:id player', () => {
    it('it should get a player by its id', (done) => {
        chai.request(server)
            .get('/v1/players/52')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(52);
                res.body.should.have.property('firstname').eql('Novak');
                res.body.should.have.property('lastname').eql('Djokovic');
                res.body.should.have.property('shortname').eql('N.DJO');
                res.body.should.have.property('sex').eql('M');
                res.body.should.have.property('country');
                res.body.should.have.property('picture');
                res.body.should.have.property('data');

                done();
            })
    });
});

describe('/GET/:id player', () => {
    it('it should get a player by not found id', (done) => {
        chai.request(server)
            .get('/v1/players/678')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    });
});

describe('/GET/:id player', () => {
    it('it should get a player by invalid id', (done) => {
        chai.request(server)
            .get('/v1/players/;qj,nzdb')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            })
    });
});

describe('/GET best-country', () => {
    it('it should get the best country according to its latest matches', (done) => {
        chai.request(server)
            .get('/v1/best-ratio-country')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('won').eql(5);
                res.body.should.have.property('played').eql(5);
                res.body.should.have.property('code').eql('SRB');
                done();
            })
    });
});

describe('/GET IMC', () => {
    it('it should get the mean IMC of the data sample', (done) => {
        chai.request(server)
            .get('/v1/mean-imc')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data').eql(0.23357838995505836);
                done();
            })
    });
});


describe('/GET Median', () => {
    it('it should get the median height of the data sample', (done) => {
        chai.request(server)
            .get('/v1/height-median')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data').eql(185);
                done();
            })
    });
});