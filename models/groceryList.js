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
});



module.exports = mongoose.model('List', GroceryListSchema);
