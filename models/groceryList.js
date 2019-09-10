const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  name: String,
  categories: [
    { name: String, items: [] }
  ],
  createdBy: String,
  color: String
});



module.exports = mongoose.model('GroceryList', GroceryListSchema);
