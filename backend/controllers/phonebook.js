const phonebookRouter = require('express').Router();
const Person = require('../models/phonebook');


phonebookRouter.get('/info', (_, response) => {
  const now = new String(new Date());
  const page = `<p>Server is up and running <br>${now}</p>`;
  response.send(page);
});

phonebookRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findById(id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end({ error: `Couldn't find a person with id ${id}` });
    }
  })
    .catch(error => next(error));
});

phonebookRouter.get('/', (_, response, next) => {
  Person.find({}).then(list => {
    response.json(list);
  })
    .catch(error => next(error));
});

phonebookRouter.post('/', (request, response, next) => {
  const personName = request.body.name;
  const personNumber = request.body.number;

  const newPerson = new Person({
    name: personName,
    number: personNumber
  });

  newPerson.save().then(savedData => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    response.json(savedData);
  })
    .catch(error => next(error));
});

// TODO: we can send only the person's number here and reduce traffic.
phonebookRouter.put('/:id', (request, response, next) => {
  const id = request.params.id;
  const personName = request.body.name;
  const personNumber = request.body.number;

  const personData = {
    name: personName,
    number: personNumber
  };

  Person.findByIdAndUpdate(id, personData, { new: true, runValidators: true, context: 'query' })
    .then(updatedData => response.json(updatedData))
    .catch(error => next(error));
});


phonebookRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    console.log(`Person with id ${request.params.id} has been deleted successfully.`);
    response.status(204).end();
  }).catch(error => next(error));
});


module.exports = phonebookRouter;