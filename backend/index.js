const { response } = require('express');
const express = require('express');
const app = express();

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

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
