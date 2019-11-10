'use strict';

var chai      = require('chai');
var chaiHttp  = require('chai-http');
var server    = require('../app').server;
var userModel = require('../models/user.model').User;

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

chai.use(chaiHttp);

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

        it('it should returns an error due to the data validation', (done) => {

            let user = {
                name: "Zé"
            };

            chai.request(server)
                .post('/users')
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {

                    if (err) done(err);

                    res.should.have.status(422);
                    res.should.have.status(422);

                    done();
                });
        });

    });

});