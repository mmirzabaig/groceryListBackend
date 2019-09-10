const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  name: String,
  categories: [
    { name: String, items: [] }
  ],
  createdBy: String,
  color: { type: String, default: 'rgba(243,249,251,.5)' }
});



module.exports = mongoose.model('GroceryList', GroceryListSchema);
