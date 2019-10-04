const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  collabs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroceryList' }]
});



module.exports = mongoose.model('User', UserSchema);
