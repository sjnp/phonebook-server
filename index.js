const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

const app = express();

// middleware
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res) => {
  Person.find({})
    .then(result => {
      res.send(
        `<p>Phonebook has info for ${result.length} people</p>
        <p>${Date(Date.now()).toString()}</p>`
      );
    });
});

// API
// GET - persons
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(result => {
      res.json(result);
    });
});

// GET - persons/id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    Person.findById(id)
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.statusMessage = `id: ${id} not found`;
          res.status(404).end();
        }
      });
  } else {
    res.statusMessage = "Invalid id";
    res.status(400).end();
  }
});

// POST - persons
app.post('/api/persons', (req, res) => {
  // Error case
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Name missing'
    })
  }
  if (!req.body.number) {
    return res.status(400).json({
      error: 'Number missing'
    })
  }

  Person.find({ name: req.body.name })
    .then(result => {
      if (result.length) {
        return res.status(400).json({
          error: 'Name must be unique'
        });
      }
      const person = new Person({...req.body});
      person.save().then(savedPerson => {
        res.json(savedPerson);
      });
    });

});

// DELETE - persons/:id
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    Person.findByIdAndRemove(id)
      .then(result => {
        if (result) {
          res.statusMessage = `id: ${id} is deleted`;
          res.status(204).end();
        } else {
          res.statusMessage = `id: ${id} not found`;
          res.status(404).end();
        }
      });

  } else {
    res.statusMessage = "Invalid id";
    res.status(400).end();
  }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});