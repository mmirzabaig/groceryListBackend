const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  console.log(req.body, ' this is session')

  try {
    const password = req.body.password;
    // Create our hash
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash)
    // Create an object to put into our database into the User Model
    const userEntry = {};
      userEntry.username = req.body.username;
      userEntry.password = passwordHash;

    const createdUser = await User.create(userEntry);
    console.log(createdUser, 'MongoDB data');

    req.session.logged = true;
    req.session.username = req.body.username;


    res.json({
      status: 200,
      data: 'login successful'
    });

  } catch(err) {
    console.log(err);
  }

});






module.exports = router;
