const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();

// middleware
// TODO: move to a separate file
const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', (request, _) => JSON.stringify(request.body));

const appLogger = (request, response, next) => {
    if (request.method === 'POST') {
        const log = morgan(':method :url :status :res[content-length] - :response-time ms :body');
        log(request, response, next);
    } else {
        const compactLogger = morgan('tiny');
        compactLogger(request, response, next);
    }
}


app.use(cors());
app.use(express.json());
app.use(appLogger);

const generateRandomId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

// TODO: array is highly inefficient data structure, replace with map!
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

app.get('/info', (_, response) => {
    const now = new String(new Date());
    const page = `<p>Phonebook has info for ${notes.length} people <br>${now}</p>`;
    response.send(page);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const entity = persons.find(entry => entry.id === id);

    if (entity) {
        response.json(entity);
    } else {
        response.status(404).end();
    }
});

app.get('/api/persons', (_, response) => {
    response.json(persons);
});

app.post('/api/persons', (request, response) => {
    if (!request.body.name || !request.body.number) {
        return response.status(404).json({
            error: 'Both name and number MUST be provided.'
        });
    }

    const isExists = persons.find(entry => entry.name === request.body.name);
    if (isExists) {
        return response.status(404).json({
            error: 'Name MUST be unique value.'
        });
    }

    // TODO: retry on duplicated id
    const personId = generateRandomId();

    const personData = {
        id: personId,
        name: request.body.name,
        number: request.body.number
    };

    persons = persons.concat(personData);
    response.json(personData);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(entry => entry.id !== id);
    response.status(204).end();
});

const PORT = process.env.port || 8080;

app.use(unknownEndpoint);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
