const express = require('express');
const router = express.Router();
const GroceryList = require('../models/groceryList');

router.post('/create', async (req, res) => {
  console.log(req.session);
  try {

    if (req.session.logged) {
      req.body.createdBy = req.session.username;
      const createdList = await GroceryList.create(req.body);
      console.log(createdList);
      res.json({
        status: 200,
        data: createdList._id
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
router.post('/deleteItem', async (req, res) => {
  console.log(req.body, 'MIRZA')
  try {
    const deleteItem = await GroceryList.findById(req.body.id);
    console.log(deleteItem, 'Delete Item LIST Found ')
    for (let key in deleteItem) {
      if(key === req.body.category) {
        let index = deleteItem[key].indexOf(req.body.item);
        deleteItem[key].splice(index, 1);
        deleteItem.save();
        console.log(deleteItem);
      }
    }
  } catch (err) {
    console.log(err.message)
  }
})

router.post('/addItem', async (req, res) => {
  console.log('LIST FOUND', req.body);
  try{
    const findList = await GroceryList.findById(req.body._id);
    console.log(findList, 'LIST FOUND')
    const a = req.body;
    const b = findList;
    for (let i in b) {
      if (a.category === i && !b[i].includes(a.name)) {
        console.log(b[i].includes('Pete'));
        console.log(b[i], 'MIRZA');
        b[i].push(a.name)
        console.log(b);
        b.save();
        return b;
      }
    }
    res.json({
      status: 200,
      data: 'added Item'
    })
  } catch(err) {
    console.log(err)
  }
})

router.get('/findLists', async (req, res) => {
  console.log(req.session, 'IT WORKS ')
  try {

    if (req.session.logged) {
      console.log('poop');
      const foundLists = await GroceryList.find({createdBy: req.session.username});
      console.log(foundLists);
      res.json({
        status: 200,
        data: foundLists
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

router.post('/deleteItem', (req, res) => {
  console.log(req.body, '123455425347891739812379813275')
  // try {
  //   const deletedItem = await GroceryList.findByIdAndUpdate(req.body.id);
  //   console.log(req.body.id);
  //   res.json({
  //     status: 200,
  //     data: deletedItem
  //   });
  //
  // } catch(err) {
  //   console.log(err);
  // }
})

router.get('/:id', async (req, res) => {
  console.log(req.params.id, 'get list request');
  try {
    const getList = await GroceryList.findById(req.params.id)
    res.json({
      status: 200,
      data: getList,
    })
  } catch(err) {
    console.log(err);
  }
})






module.exports = router;
