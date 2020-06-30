const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.post('/register', async (req, res) => {
  console.log(req.body, ' this is register')

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

    req.session.username = req.body.username;
    req.session.logged = true;
    req.session.save();


    res.json({
      status: 200,
      data: {result: 'registration successful', username: req.session.username}
    });

  } catch(err) {
    console.log(err);
  }

});

router.get('/logout', async (req, res) => {

  req.session.username = '';
  req.session.logged = false;
  await req.session.destroy();

  await console.log(req.session, 'SESSION')

  await res.json({
    status: 200,
    data: 'logout successful'
  })
})

router.post('/login', async (req, res) => {
  console.log(req.body, 'this is login');

  try {

    const foundUser = await User.findOne({'username': req.body.username});

    if (foundUser) {

      if ((bcrypt.compareSync(req.body.password, foundUser.password))) {

        req.session.username = req.body.username;
        req.session.logged = true;
        req.session.save();
        console.log(req.session);

        res.json({
          status: 200,
          data: {result: 'login successful', username: req.session.username}
        });


      } else {
        console.log('login unsuccessful');
        res.json({
          status: 200,
          data: {result: 'login unsuccessful'}
        });
      }
    } else {
      console.log('login unsuccessful');
      res.json({
        status: 200,
        data: {result: 'login unsuccessful'}
      });
    }

  } catch(err) {
    console.log(err);
  }
})



module.exports = router;
