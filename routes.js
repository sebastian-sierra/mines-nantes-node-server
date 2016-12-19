'use strict';

let express = require('express');
let Joi = require('joi');
let contactService = require('./services').contact;
let contactValidator = require('./validators').contact();
let router = express.Router();


router.get('/', (req, res) => {
  contactService.getContacts((err, results)=> {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

router.get('/:id', (req, res) => {
  contactService.getContact(req.params.id, (err, result) => {
    res.setHeader('Content-Type', 'application/json');

    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404).send();
    }

  });
});

router.post('/', (req, res) => {

  Joi.validate(req.body, contactValidator, err => {
    if (err) {
      res.send(422);
    } else {
      contactService.addContact(req.body, (err, newContact) => {
        let status = err ? 404 : 201;
        res.setHeader('Content-Type', 'application/json');
        res.status(status).send(JSON.stringify(newContact));
      });
    }
  });


});

router.put('/:id', (req, res) => {

  Joi.validate(req.body, contactValidator, err => {
    if (err) {
      console.log(err);
      res.send(422);
    } else {
      contactService.updateContact(req.params.id, req.body, (err) => {
        let status = err ? 404 : 204;
        res.send(status);
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  contactService.removeContact(req.params.id, (err) => {
    let status = err ? 404 : 204;
    res.send(status);
  });
});

router.delete('/', (req, res) => {
  contactService.removeAllContacts((err) => {
    let status = err ? 404 : 204;
    res.send(status);
  });
});

module.exports = router;