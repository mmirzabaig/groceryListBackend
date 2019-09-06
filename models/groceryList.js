const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  name: String,
  category: { Name: String, Items: [] },
  produce: [],
  meats: [],
  deli: [],
  dairy: [],
  frozen: [],
  bakery: [],
  general: [],
  alcohol: [],
  drinks: [],
  dryGoods: [],
  createdBy: String,
  color: String
});



module.exports = mongoose.model('GroceryList', GroceryListSchema);
