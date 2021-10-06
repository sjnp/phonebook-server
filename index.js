const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middleware
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date(Date.now()).toString()}</p>`
  );
});

// API
// GET - persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

// GET - persons/id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.statusMessage = `id: ${id} not found`;
    res.status(404).end();
  }
})

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
  if (persons.find(p => p.name === req.body.name)) {
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }
  // Generate new id
  let id = 0;
  do {
    id = Math.floor(Math.random() * 1024) + 1;
  } while (persons.find(p => p.id === id));
  const person = { "id": id, ...req.body };
  persons = persons.concat(person);
  res.json(person);
})

// DELETE - persons/:id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personIndex = persons.findIndex(p => p.id === id);
  if (personIndex > -1) {
    persons.splice(personIndex, 1);
    res.statusMessage = `id: ${id} is deleted`;
    res.status(204).end();
  } else {
    res.statusMessage = `id: ${id} not found`;
    res.status(404).end();
  }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});