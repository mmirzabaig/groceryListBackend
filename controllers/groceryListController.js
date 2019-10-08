const express = require('express');
const router = express.Router();
const GroceryList = require('../models/groceryList');
const User = require('../models/user');
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');

//Create List Color
router.post('/listcolor', async (req, res) => {
  // console.log(req.body)
  const updateColor = await GroceryList.findByIdAndUpdate(req.body.listID);
  updateColor.color = req.body.color;
  await updateColor.save();

})

//Edit List Name
router.post('/edit', async(req, res) => {
    const editList = await GroceryList.findByIdAndUpdate(req.body.listID);
    editList.name = req.body.name;
    await editList.save();
    // await console.log(editList);
    res.status(200).json({messgae: 'Successfull!'})
})

//Create List
router.post('/create', async (req, res) => {
  console.log(req.body, '!@#!@!@#!@#!#@!@#')
  try {
    if (req.session.logged) {
      req.body.createdBy = req.session.username;
      let createdList = await GroceryList.create(req.body);
      res.json({
        status: 200,
        data: createdList
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

//Add Category
router.post('/addCategory', async(req, res) => {
  console.log(req.body, 'BODY')
  try {
    let findList = await GroceryList.findByIdAndUpdate(req.body.id);
    let category = {name: req.body.name, items: []}
    console.log(findList);
    findList.categories.push(category);
    findList.save();
    res.json({
      status: 200,
      data: findList
    })
    return
  } catch (err) {
    console.log(err);
  }
})

//Delete Category
router.post('/deleteCategory', async (req, res) => {
  try {
    const deletedCategory = await GroceryList.findByIdAndUpdate(req.body.listID);
    await console.log(deletedCategory, '45678987');
    await deletedCategory.categories.forEach((item, index) => {
      if (item.name === req.body.category) {
        deletedCategory.categories.splice(index, 1);
      }
    });
    // await console.log(deletedCategory, 'updated List');
    await deletedCategory.save();
    await res.json({
      status: 200,
      data: deletedCategory
    });
  } catch (err) {
    res.send(err)
  }
})

// Delete List
router.delete('/:id', async (req, res) => {
  //console.log(req.params.id, '1g23456789');
  try {
     const deletedList = await GroceryList.findByIdAndRemove(req.params.id);
     console.log(deletedList, ' this is deleted');
     res.json({
            status: 200,
            data: deletedList
          });
  } catch(err){
    res.send(err);
  }
});

//Add Item
router.post('/addItem', async (req, res) => {
  console.log('addItem')
  // console.log('LIST FOUND', req.body);
  try{
    const findList = await GroceryList.findByIdAndUpdate(req.body.listID);

    let item = findList.categories[req.body.categoryIndex];
    await item.items.push(req.body.item);
    await findList.save();
    await res.json({
              status: 200,
              data: item
          })
  } catch(err) {
    console.log(err)
  }
})

// Collaborators
router.post('/collab', async (req, res) => {
  console.log(req.body, '1212')
  try{
    const findUser = await User.find({username: req.body.name});

    // let item = findList.categories[req.body.categoryIndex];
    // await item.items.push(req.body.item);
    // await findList.save();
    await res.json({
              status: 200,
              data: findUser
          })
  } catch(err) {
    console.log(err)
  }
})

router.post('/confirmCollab', async (req, res) => {
  console.log(req.body, '1212')
  try{
    const findUser = await User.findOne({username: req.body.username});
    // await console.log(findUser, '1221')
    await findUser.collabs.push(req.body.listID);
    await findUser.save();
    await console.log(findUser, '1221')

    // let item = findList.categories[req.body.categoryIndex];
    // await item.items.push(req.body.item);
    // await findList.save();
    await res.json({
              status: 200,
              data: findUser
          })
  } catch(err) {
    console.log(err)
  }
})


//Delete Item
router.post('/deleteItem', async (req, res) => {
  console.log('Delete item')
  try {
    let {item, list, catId, categoryIndex, categoryItemIndex, categories} = req.body
    const deleteItem = await GroceryList.findByIdAndUpdate(list);
    await deleteItem.categories[categoryIndex].items.splice(categoryItemIndex, 1);
    await deleteItem.save();
    await res.json({
      status: 200,
      data: deleteItem.categories[categoryIndex]
    })
  } catch (err) {
    console.log(err.message)
  }
})

//Find List
router.get('/findLists', async (req, res) => {
  // console.log(req.session, 'IT WORKS ')
  try {

    if (req.session.logged) {
      const foundLists = await GroceryList.find({createdBy: req.session.username});
      const foundUser = await User.findOne({username: req.session.username})
      .populate('collabs')
      .exec((err, lists) =>  {
        if (err) return handleError(err);
        console.log(lists, 'iuy8');
        const data = {foundLists: foundLists, foundCollabs: lists.collabs, username: req.session.username}
        res.json({
          status: 200,
          data: data
        })
      });

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

//Get List ID
router.get('/:id', async (req, res) => {
  console.log(req.params.id, 'get list request');
  try {
    const getList = await GroceryList.findById(req.params.id)
    // console.log(getList, 'getList')
    res.json({
      status: 200,
      data: getList,
    })
  } catch(err) {
    console.log(err);
  }
})




module.exports = router;
