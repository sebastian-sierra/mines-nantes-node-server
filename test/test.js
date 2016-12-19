'use strict';

let mongoose = require('mongoose');
let request = require('supertest');
let appBuilder = require('../application');

let should = require('chai').should();

let app = appBuilder();

let id;

describe('Contacts REST API', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/test/contacts').then(() => {
      request(app)
        .delete('/contacts')
        .end(done);
    });
  });

  after(done =>  {
    request(app)
      .delete('/contacts')
      .end(done);
  });

  describe('GET /', () => {

    it('should get empty contacts', (done) => {
      request(app)
        .get('/contacts')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }
          res.body.should.be.a('Array');
          done();
        });
    });
  });
  describe('POST', () => {
    let contact = {
      name: 'Sebastian',
      lastName: 'Sierra'
    };
    it('should create a new contact', done => {
      request(app)
        .post('/contacts')
        .send(contact)
        .expect(201)
        .end((err, res) => {
          if (err) { return done(err); }
          res.body.should.have.property('_id');
          id = res.body._id;
          done();
        });
    });
    it('should not create a new contact', done => {
      request(app)
        .post('/contacts')
        .expect(422)
        .end(err => {
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe('GET by id', () => {
    it('should find the created contact', done => {
      request(app)
        .get('/contacts/' + id)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }
          res.body._id.should.be.equal(id);
          done();
        });
    });

    it('should not find any contact', done => {
      request(app)
        .get('/contacts/123')
        .expect(404)
        .end(err => {
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe('Put', () => {

    it('should edit the created contact', done => {
      let contact = {
        name: 'Seb',
        lastName: 'Sierra'
      };
      request(app)
        .put('/contacts/' + id)
        .send(contact)
        .expect(204)
        .end((err) => {
          if (err) { return done(err); }
          done();
        });
    });

    it('should find the edited contact', done => {
      request(app)
        .get('/contacts/' + id)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }
          res.body.name.should.be.equal('Seb');
          done();
        });
    });

    it('should not edit the contact', done => {
      let contact = {
        name: 'Seb',
        lastName: 'Sierra'
      };
      request(app)
        .put('/contacts/123')
        .send(contact)
        .expect(404)
        .end((err) => {
          if (err) { return done(err); }
          done();
        });
    });

  });
  describe('Delete', () => {
    it('should delete the contact', done => {
      request(app)
        .delete('/contacts/' + id)
        .expect(204)
        .end(err => {
          if (err) { return done(err); }
          done();
        });
    });

    it('should not delete the contact', done => {
      request(app)
        .delete('/contacts/123')
        .expect(404)
        .end(err => {
          if (err) { return done(err); }
          done();
        });
    });
  });
});
