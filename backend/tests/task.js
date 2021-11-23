let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('POST /get-favorites', () => {
    it('It should get favorites', (done) => {
        chai.request(server)
            .post('/get-favorites')
            .send({ email: "user1@gmail.com" })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eql(2);
                done();

            })
    });
    it('It should not get favorites', (done) => {
        chai.request(server)
            .post('/get-favorites')
            .send({ email: '' })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.length.should.be.eql(0);
                done(err);
            })
    })
});
describe('POST /get-view-receipt', () => {
    it('It should get view-receipt', (done) => {
        const date = new Date();
        chai.request(server)
            .post('/get-view-receipt')
            .send({ date: '2021-10-10 23:18:08' })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eql(1);
                done();
            })
    });
    it('It should not get view-receipt', (done) => {
        chai.request(server)
            .post('/get-view-receipt')
            .send({ date: '' })
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql('Bad Request');
                done(err);
            })
    })
});

describe('POST /update-dishData', () => {
    it('It should update view-receipt', (done) => {
        const date = new Date();
        chai.request(server)
            .post('/update-dishData')
            .send({ dishId: 8 })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    });
    it('It should not update /update-dishData', (done) => {
        chai.request(server)
            .post('/update-dishData')
            .send({ dishId: '' })
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql('Bad Request');
                done(err);
            })
    })
});
describe('POST /set-profile', () => {
    it('It should set-profile', (done) => {
        chai.request(server)
            .post('/set-profile')
            .send({
                name: 'User3',
                email: 'user3@gmail.com',
                phone: 8989898989,
                city: 'San Jose',
                state: 'CA',
                country: 'USA',
                nickName: 'U3',
                custId: 'user3@gmail.com'
            }
            )
            .end((err, response) => {
                response.should.have.status(200);
                // response.body.should.be.a('object');
                done();
            })
    });
    it('It should not update /set-profile', (done) => {
        chai.request(server)
            .post('/set-profile')
            .send({
                name: 'User4',
                email: 'user3@gmail.com',
                phone: '777878686',
                city: 'San Jose',
                state: 'CA',
                country: 'USA',
                nickName: 777,
                custId: 'user2@gmail.com'
            })
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql('No Update');
                done();
            })
    })
});
describe('POST favorites-delete', () => {
    it('It should update favorites-delete', (done) => {
        chai.request(server)
            .post('/favorites-delete')
            .send({
                user: 'liam@gmail.com',
                restaurant: 'dominos@gmail.com'
            })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    });
});
describe('POST /get-address', () => {
    it('It should get-address', (done) => {
        const date = new Date();
        chai.request(server)
            .post('/get-address')
            .send({ custId: 'liam@gmail.com' })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
    });
});