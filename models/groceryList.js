const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  name: String,
  category: [],
  createdBy: String,
  color: String
});



module.exports = mongoose.model('GroceryList', GroceryListSchema);
