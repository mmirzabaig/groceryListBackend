const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

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



app.listen(process.env.PORT || 9000, () => {
  console.log('Listening on Port 9000!')
});
