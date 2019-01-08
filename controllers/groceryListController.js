const express = require('express');
const router = express.Router();
const GroceryList = require('../models/groceryList');

router.post('/create', async (req, res) => {
  try {

    if (req.session.logged) {
      req.body.createdBy = req.session.username;
      const createdList = await GroceryList.create(req.body);

      res.json({
        status: 200,
        data: 'created list'
      })
    } else {
      res.json({
        status: 200,
        data: 'Log in required'
      })
    }

  } catch (err) {
    console.log(err);
  }
})


module.exports = router;
