const mongoose = require('mongoose');
const config = require('../utils/config');

const url = config.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error: ', error.message);
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
})

// last parameter is the collection's name on MongoDB
module.exports = mongoose.model('Person', personSchema, 'Persons');