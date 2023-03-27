'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  await Book.create({
    title: '1984',
    description: 'hardcore stuff',
    status: true,
  },
  {
    title: 'something',
    description: 'second instance',
    status: true
  },
  {
    title: '3rd object',
    description: 'third instance',
    status: false
  }
  );

  console.log('1984 was created');
  mongoose.disconnect();
}

seed();
