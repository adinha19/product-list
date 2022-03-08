const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
require('./utils/passport')
require('dotenv').config()
const user = require('./routes/user.route')
const list = require('./routes/list.route')

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
//parse url encoded data

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
// port is 5000.

mongoose
    .connect(mongoUri)
    .then(console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());
//initialize passport

app.use('/user', user)
app.use('/list', list)
//open the routes