const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GroceryList = require('./models/groceryList');


require('./db/db');
require('./config/passport');
require('dotenv').config();

const authController = require('./controllers/authController');
const groceryListController = require('./controllers/groceryListController');

app.use(cookieParser());
app.use(session({
  secret: 'coffee mud',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));



app.use('/auth', authController);
app.use('/', groceryListController);

// app.post('/deleteCategory/:id', async (req, res) => {
//   console.log(req.body)
//   const list = await GroceryList.findById(req.params.id)
  
//   // User.findOne({ _id: '55822f34a8394683dd015888' });
//   await console.log(list, 'delete Category')
//   console.log(list, 'list')

//   setTimeout(() => {
//     console.log(list, 'list2000')

//   },2000)
// })

app.post('/deleteCategory/:id', async (req, res) => {
  console.log(req.params.id, 'get list request');
  let id = req.params.id;
  try {
    const getList = await GroceryList.findOne({_id: id})
    console.log(getList, 'getList')
    res.json({
      status: 200,
      data: getList,
    })
  } catch(err) {
    console.log(err);
  }
})




app.listen(process.env.PORT || 9000, () => {
  console.log('Listening on Port 9000!')
});
