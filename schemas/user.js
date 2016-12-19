let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  contacts: [{type: Schema.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('User', userSchema);