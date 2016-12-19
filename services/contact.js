'use strict';

let Schemas = require('../schemas');
let Contact = Schemas.Contact;

var exports = module.exports;

exports.addContact = (contact, callback) => {
  let newContact = new Contact(contact);
  newContact.save((err, result) => {
    console.log(err);
    callback(err, result);
  });
};

exports.getContacts = callback => {
  Contact.find().populate('_contact').exec(callback);
};

exports.getContact = (_id, callback) => {
  Contact.findOne({_id}).exec(callback);
};

exports.updateContact = (_id, contact, callback) => {
  Contact.findOneAndUpdate(
    {_id},
    contact,
    {upsert: true},
    callback
  );
};

exports.removeContact = (_id, callback) => {
  Contact.findOneAndRemove(
    {_id},
    callback
  );
};

exports.removeAllContacts = callback => {
  Contact.remove(
    {},
    callback
  );
};
