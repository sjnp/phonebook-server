const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/info', (request, response) => {
  Person.find({})
    .then(result => {
      response.send(
        `<p>Phonebook has info for ${result.length} people<p>
        <p>${Date(Date.now()).toString()}<p>`
      );
    });
});

personsRouter.get('/api/persons', (request, response) => {
  Person.find({})
    .then(result => {
      response.json(result);
    });
});

personsRouter.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then(result => {
      if (result) {
        response.json(result);
      } else {
        response.statusMessage = `id: ${id} not found`;
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// // POST - persons
// app.post('/api/persons', (req, res) => {
//   // Error case
//   if (!req.body.name) {
//     return res.status(400).json({
//       error: 'Name missing'
//     })
//   }
//   if (!req.body.number) {
//     return res.status(400).json({
//       error: 'Number missing'
//     })
//   }

//   Person.find({ name: req.body.name })
//     .then(result => {
//       if (result.length) {
//         return res.status(400).json({
//           error: 'Name must be unique'
//         });
//       }
//       const person = new Person({...req.body});
//       person.save().then(savedPerson => {
//         res.json(savedPerson);
//       });
//     });

// });

// // DELETE - persons/:id
// app.delete('/api/persons/:id', (req, res) => {
//   const id = req.params.id;
//   if (mongoose.isValidObjectId(id)) {
//     Person.findByIdAndRemove(id)
//       .then(result => {
//         if (result) {
//           res.statusMessage = `id: ${id} is deleted`;
//           res.status(204).end();
//         } else {
//           res.statusMessage = `id: ${id} not found`;
//           res.status(404).end();
//         }
//       });

//   } else {
//     res.statusMessage = "Invalid id";
//     res.status(400).end();
//   }
// })