'use strict';

var chai      = require('chai');
var chaiHttp  = require('chai-http');
var server    = require('../app').server;
var userModel = require('../models/user.model').User;

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

chai.use(chaiHttp);

const nameMinLength = 3;
const nameMaxLenght = 50;
const passwordMinLenght = 3;
const passwordMaxLenght = 255;

describe('Users Unit Tests', function () {

    // Empty the database before each tests
    beforeEach((done) => {

        userModel.deleteMany({}, (err) => {
            if (err) done();
        });

        done();
    });

    describe('/GET /users', () => {

        it('it should list all users', (done) => {

            chai.request(server)
                .get('/users')
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    done();
                });
        });

    });

    describe('/POST /users', () => {

        it('it should returns an error because the "name" field could not be empty', (done) => {

            let user = {
                name: "",
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"name" is not allowed to be empty');
                    
                    done();
                });
        });

        it('it should returns an error because the "name" field is required', (done) => {

            let user = {
                email: "email@email.com",
                password: "aBcDef"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"name" is required');
                    
                    done();
                });
        });

        it('it should returns an error because the "name" field is too short', (done) => {

            let user = {
                name: "Zé"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, `"name" length must be at least ${nameMinLength} characters long`);
                    
                    done();
                });
        });

        it('it should returns an error because the "name" field is too long', (done) => {

            let user = {
                name: "m1FRZnOaIgthORQT018JEZN1MwDbYtgIPf8oHwfbutDRjOJpP1X"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, `"name" length must be less than or equal to ${nameMaxLenght} characters long`);
                    
                    done();
                });
        });

        it('it should returns an error because the "email" field could not be empty', (done) => {

            let user = {
                name: "Random User",
                email: "",
                password: "AbcDef"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"email" is not allowed to be empty');
                    
                    done();
                });
        });

        it('it should returns an error because the "email" field is required', (done) => {

            let user = {
                name: "Random User",
                password: "m1FRZnOaIgthORQT018JEZN1MwDbYtgIPf8oHwfbutDRjOJpP1X"   
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"email" is required');
                    
                    done();
                });
        });

        it('it should returns an error because the "email" address is invalid', (done) => {

            let user = {
                name: "Random User",
                email: "randomEmail",
                password: "m1FRZnOaIgthORQT018JEZN1MwDbYtgIPf8oHwfbutDRjOJpP1X"  
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"email" must be a valid email');
                    
                    done();
                });
        });

        it('it should returns an error because the "password" field could not be empty', (done) => {

            let user = {
                name: "Random User",
                email: "email@email.com",
                password: ""
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"password" is not allowed to be empty');
                    
                    done();
                });
        });

        it('it should returns an error because the "password" field is required', (done) => {

            let user = {
                name: "Random User",
                email: "email@email.com"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, '"password" is required');
                    
                    done();
                });
        });

        it('it should returns an error because the "password" field is too short', (done) => {

            let user = {
                name: "Random User",
                email: "email@email.com",
                password: "zH"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, `"password" length must be at least ${passwordMinLenght} characters long`);
                    
                    done();
                });
        });

        it('it should returns an error because the "password" field is too long', (done) => {

            let user = {
                name: "Random User",
                email: "email@email.com",
                password: "ZWRMsn6FPwqfT6s5blNmChZda9sIMnp91yzr5uGnbSvBI6aGjeJdiKrN9kn4F5ST1C1ylf8MbyRBgbCqQ9W0sxPTseslD4hzdmcVQymOUdVyuev5KvEDEqnAmEHmkEdPNEl7hCo6kOes12dRap1x2mk2NM6jRNBvzLSKMGaKAorkb4YFpOzwFFiQNDKlKypVBzFnDujScHAMgaWHDXNFDoRwBLKpPqFvZOoqjioNp0ootBgsgRuklNSHFyZeeCnQ                "  
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(400);
                    res.error.should.have.property('text');
                    
                    let body = JSON.parse(res.error.text);
                    
                    body.should.have.property('message');

                    assert.equal(body.message, `"password" length must be less than or equal to ${passwordMaxLenght} characters long`);
                    
                    done();
                });
        });

    });

});