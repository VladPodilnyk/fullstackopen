require('dotenv').config()

const cors = require('cors');
const appLogger = require('./middleware/logging');
const unknownEndpoint = require('./middleware/unknown');
const errorHandler = require('./middleware/errors');
const express = require('express');

const mongo = require('mongoose');
const Person = require('./models/phonebook');

const app = express();

app.use(cors());
app.use(express.json());
app.use(appLogger);
app.use(express.static('build'));


app.get('/info', (_, response) => {
    const now = new String(new Date());
    const page = `<p>Server is up and running <br>${now}</p>`;
    response.send(page);
});

app.get('/api/persons/:id', (request, response, next) => {
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

app.get('/api/persons', (_, response, next) => {
    Person.find({}).then(list => {
        response.json(list);
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const personName = request.body.name;
    const personNumber = request.body.number;

    if (!personName || !personNumber) {
        return response.status(404).json({
            error: 'Both name and number MUST be provided.'
        });
    }

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
app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const personName = request.body.name;
    const personNumber = request.body.number;

    if (!personName || !personNumber) {
        return response.status(404).json({
            error: 'Both name and number MUST be provided.'
        });
    }
 
    const personData = {
        name: personName,
        number: personNumber
    }

    Person.findByIdAndUpdate(id, personData, { new: true })
        .then(updatedData => response.json(updatedData))
        .catch(error => next(error));
});


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(() => {
        console.log(`Person with id ${request.params.id} has been deleted successfully.`);
        response.status(204).end();
    }).catch(error => next(error));
});

const PORT = process.env.PORT;

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('closing server gracefully...');
    mongo.connection.close();
});
