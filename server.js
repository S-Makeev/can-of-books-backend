'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const Book = require('./models/book.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

app.post('/books', postBooks);


async function postBooks(request, response, next){
  try {

    let createdBook = await Book.create(request.body);
    response.status(201).send(createdBook);

  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookID', delBook);

async function delBook(request, response, next){
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book deleted!');
  } catch (error) {
    next(error);
  }
}

app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next){
  try {
    let id = request.params.bookID;
    let data = request.body;

    const updatedBook = await Book.findByIdAndUpdate(id, data, {new: true, overwrite: true});

    response.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}


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
