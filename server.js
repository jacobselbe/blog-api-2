const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const {BlogPosts} = require('./models');
// const router = express.Router(); //uncomment if modularized
const app = express();

app.use(morgan('common'));

app.get();

app.post();

app.put();

app.delete();

app.listen();