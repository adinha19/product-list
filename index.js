const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
require('./utils/passport')
const user = require('./routes/user.route')
const list = require('./routes/list.route')
require('dotenv').config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

mongoose
    .connect(mongoUri)
    .then(console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());

app.use('/user', user)
app.use('/list', list)
//app.use('/product', product)