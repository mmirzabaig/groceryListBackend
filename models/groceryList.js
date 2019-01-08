const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  name: String,
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
  createdBy: String
});



module.exports = mongoose.model('GroceryList', GroceryListSchema);
