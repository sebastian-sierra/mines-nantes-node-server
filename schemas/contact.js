let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  _owner: {type: Number, ref: 'User'}
});

module.exports = mongoose.model('Contact', contactSchema);