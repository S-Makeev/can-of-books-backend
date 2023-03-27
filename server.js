'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/book.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});



app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books', getBooks);

async function getBooks (request, response, next){
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    next(error);
  }
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));
